import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESS } from "./constants/address";

const PatientDetails = () => {
    const [patientAddress, setPatientAddress] = useState("");
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [patients, setPatients] = useState([]);
    const [testName, setTestName] = useState("");
    const [showPatientInfo, setShowPatientInfo] = useState(false);

    const { contract } = useContract({CONTRACT_ADDRESS});
    // const { data: patientData, isLoading } = useContractRead(contract, "showPatientDetails", [patientAddress]);
    const { data, isLoadingData } = useContractRead(contract, "showOurPatients", []);


    const handleGenerateReport = () => {
        setShowPatientInfo(true);
    };

    useEffect(() => {
        if (patientData) {
            const [
                address,
                name,
                age,
                diseaseName,
                prescription,
                medicationDelivered,
                testRequested,
                sampleCollected,
                testType,
                observations,
            ] = patientData;

            const formattedPatient = {
                address,
                name,
                age: age.toString(),
                diseaseName,
                prescription: {
                    medicationName: prescription[0],
                    dosage: prescription[1].toString(),
                    instructions: prescription[2],
                },
                medicationDelivered,
                testRequested,
                sampleCollected,
                testType,
                observations,
            };

            setPatient(formattedPatient);
        }
    }, [patientData]);


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


    return (
        <div>
            <h1>Patient Details</h1>
            <input
                type="text"
                placeholder="Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleGenerateReport}
                disabled={loading}
            >
                Generate Report
            </Web3Button>

            {showPatientInfo && patient && (
                <div>
                    <h2>Patient Information</h2>
                    <p>Address: {patient.address}</p>
                    <p>Name: {patient.name}</p>
                    <p>Age: {patient.age}</p>
                    <p>Disease Name: {patient.diseaseName}</p>
                    <p>Medication Delivered: {patient.medicationDelivered.toString()}</p>
                    <p>Test Requested: {patient.testRequested.toString()}</p>
                    <h2>Prescription</h2>
                    <p>Medication Name: {patient.prescription.medicationName}</p>
                    <p>Dosage: {patient.prescription.dosage}</p>
                    <p>Instructions: {patient.prescription.instructions}</p>
                    <p>Sample Collected: {patient.sampleCollected}</p>
                    <p>Test Type: {patient.testType}</p>
                    <p>Observations: {patient.observations}</p>
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
