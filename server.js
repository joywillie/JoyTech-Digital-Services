const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Neon PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Admin access required" });
  next();
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { full_name, email, password, phone_number } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (full_name, email, password_hash, phone_number) VALUES ($1, $2, $3, $4) RETURNING user_id, email, role',
      [full_name, email, hashedPassword, phone_number]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, userResult.rows[0].password_hash);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { user_id: userResult.rows[0].user_id, role: userResult.rows[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    res.json({ token, user: { id: userResult.rows[0].user_id, name: userResult.rows[0].full_name, role: userResult.rows[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVICE ROUTES ---
app.get('/api/services', async (req, res) => {
  try {
    const services = await pool.query('SELECT * FROM services WHERE is_active = true');
    res.json(services.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CLIENT REQUEST & PAYMENTS ROUTES ---
app.post('/api/requests', authenticateToken, async (req, res) => {
  try {
    const { service_id, additional_notes } = req.body;
    const newRequest = await pool.query(
      'INSERT INTO service_requests (user_id, service_id, additional_notes) VALUES ($1, $2, $3) RETURNING *',
      [req.user.user_id, service_id, additional_notes]
    );
    res.status(201).json(newRequest.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/customer/dashboard', authenticateToken, async (req, res) => {
  try {
    const history = await pool.query(
      `SELECT sr.request_id, s.title, sr.status, sr.created_at, p.status as payment_status 
       FROM service_requests sr 
       JOIN services s ON sr.service_id = s.service_id 
       LEFT JOIN payments p ON sr.request_id = p.request_id 
       WHERE sr.user_id = $1 ORDER BY sr.created_at DESC`,
      [req.user.user_id]
    );
    res.json(history.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- M-PESA DARAJA WEBHOOK WEBHOOK ---
app.post('/api/payments/mpesa-callback', async (req, res) => {
  const { Body } = req.body;
  if (Body && Body.stkCallback.ResultCode === 0) {
     const metadata = Body.stkCallback.CallbackMetadata.Item;
     const mpesaReceipt = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
     const amount = metadata.find(item => item.Name === 'Amount').Value;
     const checkoutRequestID = Body.stkCallback.CheckoutRequestID;
     
     // Transaction lookup and matching structure implementation
     await pool.query(
       "UPDATE payments SET status = 'Paid', mpesa_receipt_number = $1, paid_at = CURRENT_TIMESTAMP WHERE payment_id = $2",
       [mpesaReceipt, checkoutRequestID]
     );
  }
  res.status(200).json({ ResultCode: 0, ResultDesc: "Callback Processed Successfully" });
});

// --- ADMIN CONTROL ROUTES ---
app.get('/api/admin/requests', authenticateToken, isAdmin, async (req, res) => {
  try {
    const allRequests = await pool.query(
      `SELECT sr.request_id, u.full_name, s.title, sr.status, sr.created_at 
       FROM service_requests sr 
       JOIN users u ON sr.user_id = u.user_id 
       JOIN services s ON sr.service_id = s.service_id`
    );
    res.json(allRequests.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/requests/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE service_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE request_id = $2', [status, id]);
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`JoyTech Server running on port ${PORT}`));
