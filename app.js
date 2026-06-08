import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route 
          path="/" 
          element={<Home />} 
        />


        {/* Authentication */}
        <Route 
          path="/register" 
          element={<Register />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />


        {/* User Area */}
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />


        {/* Services */}
        <Route 
          path="/services" 
          element={<Services />} 
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;
