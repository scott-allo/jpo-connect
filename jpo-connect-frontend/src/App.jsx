import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MesInscriptions from "./pages/MesInscriptions";
import AdminJPO from "./pages/AdminJPO";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mes-inscriptions" element={<MesInscriptions />} />
            <Route path="/admin-jpo" element={<AdminJPO />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

