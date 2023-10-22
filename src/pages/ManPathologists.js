import React from "react";
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"

const ManagePathologists = () => {
    const [addPathologistAddress, setAddPathologistAddress] = useState('');
    const [pathologistName, setPathologistName] = useState('');
    const [pathologistAge, setPathologistAge] = useState('');
    const [pathologists, setPathologists] = useState([]);
    const [removePathologistAddress, setRemovePathologistAddress] = useState('');

    function resetForm() {
        setPathologistName('');
        setAddPathologistAddress('');
        setPathologistAge('');
        setRemovePathologistAddress('');
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurPathologists", []);
    const { mutateAsync: removePathologist, isLoading: removePathologistLoading } = useContractWrite(contract, "removePathologist");

    useEffect(() => {
        if (data) {
            const formattedPathologists = data.map((pathologist) => ({
                address: pathologist.pathologistAddress,
                name: pathologist.name,
                age: pathologist.age.toString(),
            }));

            setPathologists(formattedPathologists);
        }
    }, [data]);

    const handleRemovePathologist = async () => {
        await removePathologist({ args: [removePathologistAddress] });
        resetForm();
    }

    return (
        <div className="admin-page">
            <div className="title-admin">
                <h2 className="welcome-admin">Manage Pathologists</h2>
            </div>

            <h3>Add Pathologist:</h3>
            <input
                type='text'
                placeholder='Ethereum Address'
                value={addPathologistAddress}
                onChange={(e) => setAddPathologistAddress(e.target.value)}
            />
            <input
                type='text'
                placeholder='Name'
                value={pathologistName}
                onChange={(e) => setPathologistName(e.target.value)}
            />
            <input
                type='number'
                placeholder='Age'
                value={pathologistAge}
                onChange={(e) => setPathologistAge(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "addPathologist",
                    [
                        addPathologistAddress,
                        pathologistName,
                        pathologistAge
                    ]
                )}
                onSuccess={() => {
                    resetForm()
                }}
            >
                Add Pathologist
            </Web3Button>

            <h3>Remove Pathologist:</h3>
            <input
                type="text"
                placeholder="Address of the pathologist to remove"
                value={removePathologistAddress}
                onChange={(e) => setRemovePathologistAddress(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleRemovePathologist}
                disabled={removePathologistLoading}
                onSuccess={resetForm}
            >
                Remove Pathologist
            </Web3Button>

            <div className="pathologist-list">
                <h2>List of Pathologists</h2>
                {pathologists.map((pathologist) => (
                    <div className="pathologist-card" key={pathologist.address}>
                        <div className="pathologist-name">
                            <h3>{pathologist.name}</h3>
                        </div>
                        <div className="pathologist-details">
                            <p>Address: {pathologist.address}</p>
                            <p>Age: {pathologist.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagePathologists;
