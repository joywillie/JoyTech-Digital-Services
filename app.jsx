import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('home'); 
  const [services, setServices] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Structural static injection matching pre-seeded database arrays
    const staticCatalog = [
      { id: 1, title: "KRA Returns Support", description: "Filing of annual individual, corporate, or employment income tax returns.", price: "Ksh 1,000", category: "KRA" },
      { id: 2, title: "KRA Assistance & Compliance", description: "PIN registration, tax compliance certificates, and penalty mitigation.", price: "Ksh 2,000", category: "KRA" },
      { id: 3, title: "eCitizen Portal Services", description: "Business registrations, driving license renewals, and Good Conduct applications.", price: "Ksh 1,500", category: "eCitizen" },
      { id: 4, title: "Professional CV Writing", description: "Tailoring dynamic, modern, ATS-compliant professional engineering or corporate resumes.", price: "Ksh 1,200", category: "Applications" },
      { id: 5, title: "Responsive Web Development", description: "Design and programming of highly functional business websites.", price: "Ksh 25,000", category: "Development" },
      { id: 6, title: "Computer Repair & Optimization", description: "Hardware diagnostics, parts restoration, thermal cleaning, and component fixes.", price: "Ksh 2,500", category: "IT Support" }
    ];
    setServices(staticCatalog);
  }, []);

  const triggerAlert = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative antialiased selection:bg-cyan-500 selection:text-slate-900">
      
      {/* GLOBAL TOAST SYSTEM */}
      {feedback && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-cyan-400 font-semibold px-6 py-3.5 rounded-xl shadow-2xl border border-cyan-500/20 animate-bounce">
          {feedback}
        </div>
      )}

      {/* NAVIGATION ARCHITECTURE */}
      <nav className="bg-slate-950 text-white p-4 sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95 border-b border-slate-800 flex justify-between items-center px-6 md:px-12">
        <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => setView('home')}>
          JoyTech <span className="text-cyan-400 font-light">Digital</span>
        </div>
        <div className="space-x-8 flex items-center">
          <button onClick={() => setView('home')} className="hover:text-cyan-400 font-medium text-sm transition">Home</button>
          <button onClick={() => setView('services')} className="hover:text-cyan-400 font-medium text-sm transition">Services</button>
          
          {token ? (
            <>
              <button 
                onClick={() => setView(userRole === 'admin' ? 'admin' : 'dashboard')} 
                className="bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs hover:bg-cyan-400 transition transform active:scale-95"
              >
                {userRole === 'admin' ? 'Owner Cockpit' : 'Workspace Dashboard'}
              </button>
              <button onClick={() => { localStorage.clear(); setToken(''); setUserRole(''); setView('home'); }} className="text-red-400 hover:text-red-300 text-sm font-medium transition">Logout</button>
            </>
          ) : (
            <button onClick={() => setView('login')} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold px-5 py-2 rounded-xl hover:shadow-cyan-500/20 hover:shadow-lg transition text-sm">
              Client Portal
            </button>
          )}
        </div>
      </nav>

      {/* CORE VIEW PORTS */}
      <main className="transition-all duration-300">
        {view === 'home' && <HomeView setView={setView} services={services} />}
        {view === 'services' && <ServicesCatalog services={services} token={token} setView={setView} triggerAlert={triggerAlert} />}
        {view === 'login' && <AuthView setToken={setToken} setUserRole={setUserRole} setView={setView} triggerAlert={triggerAlert} />}
        {view === 'dashboard' && <CustomerDashboard triggerAlert={triggerAlert} />}
        {view === 'admin' && <AdminDashboard triggerAlert={triggerAlert} />}
      </main>

      {/* WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/254745806435?text=Hello%20Joyce,%20I%20am%20visiting%20JoyTech%20Digital%20and%20require%20service%20assistance." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transform hover:scale-110 transition-all duration-200 z-50 flex items-center justify-center border border-emerald-400/30"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.904-6.991a9.783 9.783 0 0 0-6.96-2.843c-5.437 0-9.865 4.421-9.867 9.865 0 1.724.46 3.411 1.332 4.9l-.993 3.626 3.704-.972zm11.233-5.275c-.301-.15-1.78-.878-2.056-.978-.275-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.178-.176.2-.351.225-.652.075-1.02-.515-1.74-.943-2.427-2.119-.18-.31.18-.288.514-.954.058-.117.029-.22-.014-.32-.044-.1-.476-1.146-.652-1.571-.171-.413-.344-.356-.476-.363-.122-.006-.263-.007-.403-.007s-.369.052-.562.26c-.193.207-.737.72-.737 1.754s.751 2.034.856 2.171c.105.137 1.478 2.258 3.58 3.167.5.216.89.346 1.196.442.502.16 1.058.138 1.458.078.446-.067 1.378-.563 1.572-1.104.194-.541.194-1.006.136-1.104-.058-.1-.215-.149-.516-.3z"/>
        </svg>
      </a>
    </div>
  );
}

// --- VIEW COMPONENT BLOCKS ---

function HomeView({ setView, services }) {
  return (
    <div className="animate-fade-in">
      {/* HERO HERO VERTICAL */}
      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-28 px-6 text-center border-b border-slate-800">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none">
          Professional Digital Systems <br/><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Optimized & Delivered</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-normal">
          Enterprise operations for regional compliance setup, web compilation, structural networking solutions, and precision hardware maintenance.
        </p>
        <button onClick={() => setView('services')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 px-8 py-3.5 rounded-xl font-bold text-base hover:shadow-cyan-500/10 hover:shadow-xl transition transform active:scale-95">
          Launch Services Menu
        </button>
      </header>

      {/* COMPONENT CARDS SNAPSHOT */}
      <section className="max-w-6xl mx-auto my-20 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Primary Specialized Matrices</h2>
          <p className="text-slate-500 mt-2">Certified digital execution frameworks built for operational dependability.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map(s => (
            <div key={s.id} className="bg-white p-8 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div>
                <span className="text-xs font-black text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">{s.category}</span>
                <h3 className="text-xl font-bold mt-4 mb-2 text-slate-950">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{s.description}</p>
              </div>
              <span className="font-mono text-xl font-extrabold text-slate-900">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CORPORATE ABOUT SECTION */}
      <section className="bg-slate-900 text-white py-20 px-6 border-y border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-6">Built For Absolute Technical Dependability</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            JoyTech Digital Services coordinates professional tech infrastructure operations. We handle the complete pipeline—from submitting verified legal assets into institutional government portals to configuring routing architectures for distributed workspaces.
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-8">
            <div><h4 className="text-2xl font-black text-cyan-400">100%</h4><p className="text-xs text-slate-500 uppercase font-bold mt-1">Submission Success</p></div>
            <div><h4 className="text-2xl font-black text-cyan-400">24Hr</h4><p className="text-xs text-slate-500 uppercase font-bold mt-1">Turnaround Target</p></div>
            <div><h4 className="text-2xl font-black text-cyan-400">Secure</h4><p className="text-xs text-slate-500 uppercase font-bold mt-1">Data Processing</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT/TRANSACTIONAL TRANSIT */}
      <section className="max-w-3xl mx-auto my-20 px-6 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Dedicated System Customization?</h3>
        <p className="text-slate-500 mb-8">Get in touch directly via our direct support routing channels or submit custom design request cards.</p>
        <button onClick={() => setView('services')} className="bg-slate-950 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-850 transition">
          Initiate Request Lifecycle
        </button>
      </section>
    </div>
  );
}

function ServicesCatalog({ services, token, setView, triggerAlert }) {
  const processBooking = () => {
    if (!token) {
      triggerAlert("Identity checkpoint required. Please authenticate.");
      setView('login');
    } else {
      triggerAlert("Service target logged. Proceeding to payment setup.");
      setView('dashboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-16 px-6 animate-fade-in">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Available Digital Pipelines</h2>
        <p className="text-slate-500 mt-2">Select a framework card to file requirements, upload credentials, or clear pending operational fees.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between p-6 border border-slate-200">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-slate-100 px-2.5 py-1 rounded text-slate-600">{s.category}</span>
              <h3 className="text-xl font-bold text-slate-950 mt-3 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xl font-black text-slate-950 font-mono">{s.price}</span>
              <button 
                onClick={processBooking}
                className="bg-slate-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-850 transition transform active:scale-95"
              >
                Request Support
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthView({ setToken, setUserRole, setView, triggerAlert }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');

  const executeAuthBypass = (role) => {
    localStorage.setItem('token', 'mock_jwt_session_token');
    localStorage.setItem('role', role);
    setToken('mock_jwt_session_token');
    setUserRole(role);
    triggerAlert(`Authentication authorized. Role: ${role}`);
    setView(role === 'admin' ? 'admin' : 'dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-24 p-8 bg-white rounded-2xl shadow-xl border border-slate-200/60 animate-fade-in">
      <h2 className="text-2xl font-black text-slate-950 mb-6 text-center tracking-tight">
        {isRegister ? 'Register JoyTech Client Node' : 'Access Central System Port'}
      </h2>
      <div className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">Legal Full Name</label>
            <input type="text" className="w-full p-3 border rounded-xl bg-slate-50 text-sm focus:outline-cyan-500" placeholder="John Doe"/>
          </div>
        )}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">System Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-xl bg-slate-50 text-sm focus:outline-cyan-500" placeholder="name@example.com"/>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">Secure Access Password</label>
          <input type="password" className="w-full p-3 border rounded-xl bg-slate-50 text-sm focus:outline-cyan-500" placeholder="••••••••"/>
        </div>
        
        {/* Conditional Bypass Routing for Quick Platform Operation */}
        <button 
          onClick={() => {
            if (email === 'jw42205769@gmail.com') {
              executeAuthBypass('admin');
            } else {
              executeAuthBypass('customer');
            }
          }} 
          className="w-full bg-slate-950 text-white p-3 rounded-xl font-bold hover:bg-slate-900 transition text-sm tracking-tight shadow-md"
        >
          {isRegister ? 'Complete System Entry' : 'Verify Gate Credentials'}
        </button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase font-bold tracking-widest">Workspace Overrides</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => executeAuthBypass('customer')} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl transition">Client Sandbox</button>
          <button onClick={() => executeAuthBypass('admin')} className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 text-xs font-bold py-2 rounded-xl transition">Joyce Cockpit</button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 cursor-pointer underline hover:text-slate-800" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Existing pipeline active? Sign In' : 'New production client? Establish entity'}
        </p>
      </div>
    </div>
  );
}

function CustomerDashboard({ triggerAlert }) {
  const mockRequests = [
    { id: 7721, service: "KRA Returns Support", status: "In Progress", payment: "Paid", date: "June 08, 2026" },
    { id: 7490, service: "Professional CV Writing", status: "Completed", payment: "Paid", date: "June 02, 2026" }
  ];

  return (
    <div className="max-w-5xl mx-auto my-16 px-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Client Operational Center</h2>
          <p className="text-sm text-slate-500">Track current status parameters, active files, and billing balances.</p>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 shadow-sm">
          <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processing Pipelines</h3>
          <p className="text-3xl font-black mt-1 text-slate-950">1 Active</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm">
          <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completed Files</h3>
          <p className="text-3xl font-black mt-1 text-slate-950">1 Verified</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 border-l-4 border-l-cyan-500 shadow-sm">
          <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Document Registry</h3>
          <p className="text-3xl font-black mt-1 text-slate-950">2 Uploaded</p>
        </div>
      </div>

      {/* RECENT RECORDS DATA MATRIX */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-950 text-white font-bold text-xs tracking-wider uppercase border-b border-slate-800">Operational History Matrix</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase border-b border-slate-200 tracking-wider">
                <th className="p-4">Pipeline ID</th>
                <th className="p-4">Target Service Mapping</th>
                <th className="p-4">Workflow Status</th>
                <th className="p-4">M-Pesa Ledger Record</th>
                <th className="p-4">Submission Date</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {mockRequests.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 text-slate-700 transition">
                  <td className="p-4 font-mono text-xs font-bold text-slate-500">#JY-{r.id}</td>
                  <td className="p-4 font-bold text-slate-950">{r.service}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-black uppercase tracking-wider ${r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-md">{r.payment}</span>
                  </td>
                  <td className="p-4 text-slate-400 text-xs font-medium">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ triggerAlert }) {
  const allRequests = [
    { id: 7721, client: "Alex Mwangi", service: "KRA Returns Support", status: "In Progress" },
    { id: 7810, client: "Grace Beatrice", service: "Responsive Web Development", status: "Pending" }
  ];

  return (
    <div className="max-w-6xl mx-auto my-16 px-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">Platform Owner Cockpit</h2>
          <p className="text-sm text-slate-500 font-medium">Administrator Identity Validated: <span className="text-indigo-600 font-bold">Joyce William</span></p>
        </div>
        <div className="bg-slate-950 text-cyan-400 font-mono text-xs font-bold px-4 py-2 rounded-xl border border-cyan-500/10">
          SYSTEM COMPLIANCE SECURE: ONLINE
        </div>
      </div>

      {/* METRIC CARD DASHBOARD REPORTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gross Earnings</div>
          <div className="text-2xl font-black text-slate-950 mt-1 font-mono">Ksh 26,200</div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pipelines</div>
          <div className="text-2xl font-black text-slate-950 mt-1 font-mono">14</div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support Enquiries</div>
          <div className="text-2xl font-black text-slate-950 mt-1 font-mono">3 Open</div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">M-Pesa Drops</div>
          <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">100% OK</div>
        </div>
      </div>

      {/* ADMINISTRATIVE ACTIONS ENGINE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-slate-900 text-white font-bold text-xs tracking-wider uppercase">Master Incoming Task Allocation Queue</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase border-b border-slate-200 tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Client Identifier</th>
                <th className="p-4">Requested Pipeline</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-center">System State Modification Overrides</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {allRequests.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-mono text-xs font-bold text-slate-400">#JY-{r.id}</td>
                  <td className="p-4 font-bold text-slate-950">{r.client}</td>
                  <td className="p-4 text-slate-600 font-medium">{r.service}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 text-[10px] rounded-full font-black uppercase tracking-wider ${r.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => triggerAlert(`Pipeline #JY-${r.id} mutation marked: COMPLETED`)} className="bg-emerald-600 text-white text-[10px] uppercase tracking-wider font-black px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition">Approve & Close</button>
                    <button onClick={() => triggerAlert(`State fallback toggled for #JY-${r.id}`)} className="bg-slate-800 text-white text-[10px] uppercase tracking-wider font-black px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">Modify Block</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
