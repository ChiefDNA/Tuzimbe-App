import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Materials from './pages/Materials';
import NewRecords from './pages/NewRecords';
import Employees from './pages/Employees';
import History from './pages/History';
import './App.css';
import Sidebar from './components/Navbar';
import Home from './pages/Home';
import Attendance from './pages/Attendance';
import Logout from './pages/Logout';
import Administrator from './pages/Administrator';

function App() {

  return (
    <Router>
      <header className="">
      <Sidebar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Logout" element={<Logout data={Sidebar.activeUser} onFetch={Sidebar.handleLogOut} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Materials" element={<Materials data={Sidebar.activeUser} />} />
        <Route path="/NewRecord" element={<NewRecords data={Sidebar.activeUser} />} />
        <Route path="/Administrator" element={<Administrator data={Sidebar.activeUser} />} />
        <Route path="/Attendences" element={<Attendance data={Sidebar.activeUser} />} />
        <Route path="/Employees" element={<Employees data={Sidebar.activeUser} />} />
        <Route path="/History" element={<History data={Sidebar.activeUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
