import './App.css';
import Doctor from "./pages/Doctor";
import PatientList from "./pages/constants/PatientList";
import PatientListPatho from "./pages/constants/PatientListPatho";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import Path from "./pages/Path";
import Patient from "./pages/Patient";
import Pharm from "./pages/Pharm";
import ManDoctors from "./pages/ManDoctors.js";
import ManPatients from "./pages/ManPatients.js";
import ManPharmacists from "./pages/ManPharmacists.js";
import ManPathologists from "./pages/ManPathologists.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <h3 className='title'>Medical Report Management and Distribution System on Blockchain</h3> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/treatpatient" element={<Doctor />} />
          <Route path="/doctor" element={<PatientList />} />
          <Route path="/path" element={<PatientListPatho />} />
          <Route path="/conducttest" element={<Path />} />
          <Route path="/pharm" element={<Pharm />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctors" element={<ManDoctors />} />
          <Route path="/patients" element={<ManPatients />} />
          <Route path="/pharmacists" element={<ManPharmacists />} />
          <Route path="/pathologists" element={<ManPathologists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
