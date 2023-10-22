import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { Web3Button } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./address";


const PatientList = ({ handleTreat }) => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoadingData } = useContractRead(contract, "showOurPatients", []);

    useEffect(() => {
        if (data && !isLoadingData) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
            }));

            setPatients(formattedPatients);
        }
    }, [data, isLoadingData]);

    if (!patients) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-list">
            <h2>List of Patients</h2>
            {patients.map((patient) => (
                <div className="patient-card" key={patient.address}>
                    <h3>{patient.name}</h3>
                    <p>Address: {patient.address}</p>
                    <p>Age: {patient.age}</p>
                    <button onClick={() => navigate(`/treatpatient`)}>Treat</button>
                </div>
            ))}
        </div>
    );
};

export default PatientList;
