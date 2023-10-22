import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"

const ManagePharmacists = () => {
    const [addPharmacistAddress, setAddPharmacistAddress] = useState('');
    const [pharmacistName, setPharmacistName] = useState('');
    const [pharmacistAge, setPharmacistAge] = useState('');
    const [pharmacists, setPharmacists] = useState([]);
    const [removePharmacistAddress, setRemovePharmacistAddress] = useState('');

    function resetForm() {
        setPharmacistName('');
        setAddPharmacistAddress('');
        setPharmacistAge('');
        setRemovePharmacistAddress('');
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurPharmacists", []);
    const { mutateAsync: removePharmacist, isLoading: removePharmacistLoading } = useContractWrite(contract, "removePharmacist");

    useEffect(() => {
        if (data) {
            const formattedPharmacists = data.map((pharmacist) => ({
                address: pharmacist.pharmacistAddress,
                name: pharmacist.name,
                age: pharmacist.age.toString(),
            }));

            setPharmacists(formattedPharmacists);
        }
    }, [data]);

    const handleRemovePharmacist = async () => {
        await removePharmacist({ args: [removePharmacistAddress] });
        resetForm();
    }

    return (
        <div className="admin-page">
            <div className="title-admin">
                <h2 className="welcome-admin">Manage Pharmacists</h2>
            </div>

            <h3>Add Pharmacist:</h3>
            <input
                type='text'
                placeholder='Ethereum Address'
                value={addPharmacistAddress}
                onChange={(e) => setAddPharmacistAddress(e.target.value)}
            />
            <input
                type='text'
                placeholder='Name'
                value={pharmacistName}
                onChange={(e) => setPharmacistName(e.target.value)}
            />
            <input
                type='number'
                placeholder='Age'
                value={pharmacistAge}
                onChange={(e) => setPharmacistAge(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "addPharmacist",
                    [
                        addPharmacistAddress,
                        pharmacistName,
                        pharmacistAge
                    ]
                )}
                onSuccess={() => {
                    resetForm()
                }}
            >
                Add Pharmacist
            </Web3Button>

            <h3>Remove Pharmacist:</h3>
            <input
                type="text"
                placeholder="Address of the pharmacist to remove"
                value={removePharmacistAddress}
                onChange={(e) => setRemovePharmacistAddress(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleRemovePharmacist}
                disabled={removePharmacistLoading}
                onSuccess={resetForm}
            >
                Remove Pharmacist
            </Web3Button>

            <div className="pharmacist-list">
                <h2>List of Pharmacists</h2>
                {pharmacists.map((pharmacist) => (
                    <div className="pharmacist-card" key={pharmacist.address}>
                        <div className="pharmacist-name">
                            <h3>{pharmacist.name}</h3>
                        </div>
                        <div className="pharmacist-details">
                            <p>Address: {pharmacist.address}</p>
                            <p>Age: {pharmacist.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagePharmacists;
