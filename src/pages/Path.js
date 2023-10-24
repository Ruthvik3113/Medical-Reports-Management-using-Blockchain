import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address";
import { Web3Button } from "@thirdweb-dev/react";

const PathologistPage = () => {
    const [patientAddress, setPatientAddress] = useState("");
    const [sampleCollected, setSampleCollected] = useState("");
    const [observations, setObservations] = useState("");

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { mutateAsync: addObservations, isLoading } = useContractWrite(contract, "addObservations");

    const handleAddObservations = async () => {
        try {
            await addObservations({ args: [patientAddress, sampleCollected, observations] });
            console.info("Observations added successfully");
            // Reset form fields
            setPatientAddress("");
            setSampleCollected("");
            setObservations("");
        } catch (err) {
            console.error("Error adding observations", err);
        }
    };

    return (
        <div>
            <h1>Add Observations</h1>
            <input
                type="text"
                placeholder="Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Sample Collected"
                value={sampleCollected}
                onChange={(e) => setSampleCollected(e.target.value)}
            />
            <input
                type="text"
                placeholder="Observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleAddObservations}
                disabled={isLoading}
            >
                Add Observations
            </Web3Button>
            {sampleCollected && observations && (
                <div>
                    <h2>Added Observations</h2>
                    <p>Sample Collected: {sampleCollected}</p>
                    <p>Observations: {observations}</p>
                </div>
            )}

        </div>
        
        
    );
};

export default PathologistPage;




// doctor will first inspect patient, and then he will request test, and then patho 
// writes his observations, and then he will update his report, doc should be able to see
// that report and then write prescription 
