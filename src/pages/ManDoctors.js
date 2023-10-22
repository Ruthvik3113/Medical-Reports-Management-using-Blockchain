import React from "react";
// import Model from "react-modal"
import { useState, useEffect } from "react";
import { Web3Button } from '@thirdweb-dev/react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./constants/address"

const ManDoctors = () => {


    const customStyles = {
        content: {
            position: 'absolute',
            width: "500px",
            height: "500px",
            borderRadius: "5%",
            top: '100px',
            left: '500px',
            right: '500px',
            bottom: '100px',
            overflow: 'auto',
            outline: 'none',
            padding: '40px',
        },
    };

    const [addDoctorAddress, setAddDoctorAddress] = useState(''); 
    const [doctorName, setDoctorName] = useState('');
    const [doctorAge, setDoctorAge] = useState('');
    const [doctors, setDoctors] = useState([])
    const [removeDoctorAddress, setRemoveDoctorAddress] = useState('');

    // const [doctorDetails, setDoctorDetails] = useState(null);

    function resetForm() {
        setDoctorName('');
        setAddDoctorAddress(''); 
        setDoctorAge('');
        setRemoveDoctorAddress('');
        // setAddDoctor(false);
    }

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "showOurDoctors", []);
    const { mutateAsync: removeDoctor, isLoading: removeDoctorLoading } = useContractWrite(contract, "removeDoctor")


    useEffect(() => {
        if (data) {
            const formattedDoctors = data.map((doctor) => ({
                address: doctor.newdocaddress,
                name: doctor.name,
                age: doctor.age.toString(),
            }));

            setDoctors(formattedDoctors);
        }
    }, [data]);

    const handleRemoveDoctor = async () => {
        await removeDoctor({ args: [removeDoctorAddress] });
        resetForm();
    }

    
    return(
        <div className="admin-page">
            <div className="title-admin">
                <h2 className="welcome-admin">Manage Doctors</h2>
            </div>

            <div className="quote-div">
                <p className="admin-quote">~"Health is the greatest of Human Blessings"~</p>
            </div>

            <h3>Add Doctor:</h3>
            <input
                type='text'
                placeholder='Ethereum Address (e.g., 0x4c8b12BCAF4EA660279d81E038C196c5bf8C0d3f)'
                value={addDoctorAddress}
                onChange={(e) => setAddDoctorAddress(e.target.value)}
            />
            <input
                type='text'
                placeholder='Name'
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
            />
            <input
                type='number'
                placeholder='Age'
                value={doctorAge}
                onChange={(e) => setDoctorAge(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "addDoctor",
                    [
                        addDoctorAddress,
                        doctorName,
                        doctorAge
                    ]
                )}
                onSuccess={() => {
                    resetForm()
                    // setAddDoctor(false)
                }}
            >
                Add Doctor
            </Web3Button>


            <h3>Remove Doctor:</h3>
            <input
                type="text"
                placeholder="Address of the doctor to remove"
                value={removeDoctorAddress}
                onChange={(e) => setRemoveDoctorAddress(e.target.value)}
            />
            <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={handleRemoveDoctor}
                disabled={removeDoctorLoading}
                onSuccess={resetForm}
            >
                Remove Doctor
            </Web3Button>
        
            <div className="doctor-list">
                <h2>List of Doctors</h2>
                {doctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.address}>
                        <div className="doctor-name">
                            <h3 style={{ color: "#222222" }}>{doctor.name}</h3>
                        </div>
                        <div className="doctor-details">
                            <p style={{ color: "#666666" }}>Address: {doctor.address}</p>
                            <p style={{ color: "#666666" }}>Age: {doctor.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManDoctors;