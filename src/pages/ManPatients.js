import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"

const ManagePatients = () => {
    const [addPatientAddress, setAddPatientAddress] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [diseaseName, setDiseaseName] = useState("");
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [sampleCollected, setSampleCollected] = useState("");
    const [testType, setTestType] = useState("");
    const [observations, setObservations] = useState("");
    const [patients, setPatients] = useState([]);
    const [removePatientAddress, setRemovePatientAddress] = useState('');

    function resetForm() {
        setPatientName('');
        setAddPatientAddress('');
        setPatientAge('');
        setRemovePatientAddress('');
        setDiseaseName("");
        setMedicationName("");
        setDosage("");
        setInstructions("");
        setSampleCollected("");
        setTestType("");
        setObservations("");
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurPatients", []);
    const { mutateAsync: removePatient, isLoading: removePatientLoading } = useContractWrite(contract, "removePatient");

    useEffect(() => {
        if (data) {
            const formattedPatients = data.map((patient) => ({
                address: patient.patientAddress,
                name: patient.name,
                age: patient.age.toString(),
            }));

            setPatients(formattedPatients);
        }
    }, [data]);

    const handleRemovePatient = async () => {
        await removePatient({ args: [removePatientAddress] });
        resetForm();
    }

    return (
        <div className="admin-page">
            <div className="title-admin">
                <h2 className="welcome-admin">Manage Patients</h2>
            </div>

            <h3>Add Patient:</h3>
            <input
                type='text'
                placeholder='Ethereum Address'
                value={addPatientAddress}
                onChange={(e) => setAddPatientAddress(e.target.value)}
            />
            <input
                type='text'
                placeholder='Name'
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
            />
            <input
                type='number'
                placeholder='Age'
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
            />
            <input
                type="text"
                placeholder="Disease Name"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Medication Name"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <input
                type="text"
                placeholder="Sample Collected"
                value={sampleCollected}
                onChange={(e) => setSampleCollected(e.target.value)}
            />
            <input
                type="text"
                placeholder="Test Type"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "addPatient",
                    [
                        addPatientAddress,
                        patientName,
                        patientAge,
                        diseaseName,
                        medicationName,
                        dosage,
                        instructions,
                        sampleCollected,
                        testType,
                        observations
                    ]
                )}
                onSuccess={() => {
                    resetForm()
                }}
            >
                Add Patient
            </Web3Button>

            <h3>Remove Patient:</h3>
            <input
                type="text"
                placeholder="Address of the patient to remove"
                value={removePatientAddress}
                onChange={(e) => setRemovePatientAddress(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleRemovePatient}
                disabled={removePatientLoading}
                onSuccess={resetForm}
            >
                Remove Patient
            </Web3Button>

            <div className="patient-list">
                <h2>List of Patients</h2>
                {patients.map((patient) => (
                    <div className="patient-card" key={patient.address}>
                        <div className="patient-name">
                            <h3>{patient.name}</h3>
                        </div>
                        <div className="patient-details">
                            <p>Address: {patient.address}</p>
                            <p>Age: {patient.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagePatients;
