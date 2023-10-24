import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./address";

const Component = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getRequestedPatients", []);

    useEffect(() => {
        if (data && !isLoading) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
                testType: patient.testType
            }));

            setPatients(formattedPatients);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>List of Patients with Pending Test Requests</h1>
            {patients.map((patient) => (
                <div key={patient.address}>
                    <h2>{patient.name}</h2>
                    <p>Address: {patient.address}</p>
                    <p>Age: {patient.age}</p>
                    <p>Test Type: {patient.testType}</p>
                    <button onClick={() => navigate(`/conducttest`)}>Conduct Pathology Test</button>
                </div>
            ))}
        </div>
    );
};

export default Component;
