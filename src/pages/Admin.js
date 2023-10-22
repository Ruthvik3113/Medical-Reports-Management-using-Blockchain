import React from "react";
import {useNavigate, NavLink} from "react-router-dom";
import ManPatients from "./ManPatients";

const Admin = () => {

    const handleDoctorClick = () => {
        <NavLink to="/register">Sign Up</NavLink>
    }

    return(
        <div className="admin-page">
            <div className="title-admin">
                <h2 className="welcome-admin">Welcome Admin!</h2>
            </div>
            <div className="parent-admin">
                <div className="admin-cards">
                    <button className="admin-buttons doctor-card"><p><NavLink to="/doctors">Manage Doctors</NavLink></p></button>
                    <button className="admin-buttons patient-card"><p><NavLink to="/patients">Manage Patients</NavLink></p></button>
                    <button className="admin-buttons pharm-card"><p><NavLink to="/pharmacists">Manage Pharmacists</NavLink></p></button>
                    <button className="admin-buttons path-card"><p><NavLink to="/pathologists">Manage Pathologists</NavLink></p></button>
                </div>
            </div>
            <div className="quote-div">
                <p className="admin-quote">~"Health is the greatest of Human Blessings"~</p>
            </div>
        </div>
    );
}

export default Admin;