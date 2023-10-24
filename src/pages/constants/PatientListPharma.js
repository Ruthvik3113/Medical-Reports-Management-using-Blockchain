import React, { useState, useEffect } from "react";
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./address";
import { Web3Button } from "@thirdweb-dev/react";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getPatientsWithMedicationNotDelivered", []);
    const { mutateAsync: markMedicationDelivered, isLoading: isMarkingMedication } = useContractWrite(
        contract,
        "markMedicationDelivered"
    );

    const [patientAddress, setPatientAddress] = useState("");

    useEffect(() => {
        if (data && !isLoading) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
                medicationName: patient.medicationName,
            }));

            setPatients(formattedPatients);
        }
    }, [data, isLoading]);

    const handleMarkMedicationDelivered = async () => {
        try {
            // Call the markMedicationDelivered() function with the patientAddress
            const data = await markMedicationDelivered({ args: [patientAddress] });

            console.info("Medication marked as delivered successfully");

            // You may want to refresh the patient list after marking the medication delivered.
        } catch (err) {
            console.error("Failed to mark medication as delivered", err);
        }
    };

    return (
        <div>
            <h1>List of Patients with Medication Not Delivered</h1>
            {patients.map((patient) => (
                <div key={patient.address}>
                    <h2>{patient.name}</h2>
                    <p>Address: {patient.address}</p>
                    <p>Age: {patient.age}</p>
                    <p>Medication Name: {patient.medicationName}</p>
                </div>
            ))}
            <input
                type="text"
                placeholder="Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleMarkMedicationDelivered}
                disabled={isMarkingMedication}
            >
                Proceed to Deliver
            </Web3Button>
        </div>
    );
};

export default PatientList;
