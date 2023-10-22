import { useState, useEffect } from "react";
import Web3 from "web3";
import React from "react";
import Model from "react-modal"
import {useNavigate, NavLink} from "react-router-dom";
import {ConnectWallet, connectWallet} from "@thirdweb-dev/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Landing = () => {
    const [visible, setVisible] = useState(false)
    const [actor, setActor] = useState("")
    // const [isConnected, setIsConnected] = useState(false);
    // const [ethBalance, setEthBalance] = useState("");

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

    // const detectCurrentProvider = () => {
    //     let provider;
    //     if(window.ethereum){
    //         provider = window.ethereum;
    //     } else if(window.web3){
    //         provider = window.web3.currentProvider;
    //     } else{
    //         console.log("Non-ethereum browser detected. Please install Metamask.")
    //     }
    //     return provider
    // };

    // const onConnect = async() => {
    //     try{
    //         const currentProvider = detectCurrentProvider();
    //         if(currentProvider){
    //             await currentProvider.request({method: 'eth_requestAccounts'});
    //             const web3 = new Web3(currentProvider);
    //             const userAccount = await web3.eth.getAccounts();
    //             const account = userAccount[0];
    //             let ethBalance = await web3.eth.getBalance(account);
    //             setEthBalance(ethBalance);
    //             setIsConnected(true);
    //         }
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    // const onDisconnect = () => {
    //     setIsConnected(false);
    // }

    return(
        <div className="parent-card">
            <div className="title">
                    <h2>MEDICAL REPORT MANAGEMENT AND DISTRIBUTION SYSTEM</h2>
                    <p>Secure - Transparent - Decentralized</p>
            </div>
            <div className="cards">
                {/* <button className="buttons" onClick={(e)=> {
                        setVisible(true)
                        setActor(e.target.innerText)
                    }}
                >
                    <div className="login-card admin-card"><span>Admin</span></div>
                </button> */}
                {/* <button className="buttons" onClick={(e)=> {
                        setVisible(true)
                        setActor(e.target.innerText)
                    }}
                >
                    <div className="login-card doctor-card"><span>Doctor</span></div>
                </button> */}
                {/* <button className="buttons" onClick={(e)=> {
                        setVisible(true)
                        setActor(e.target.innerText)
                    }}
                >
                    <div className="login-card path-card"><span>Pathologist</span></div>
                </button> */}
                <div className="contents">
                    <h4>Welcome!</h4>
                    <p>Connect to Metamask</p>
                    <ConnectWallet className="connect-wallet"/>
                </div>
                <br/>
                <button className="buttons" onClick={(e)=> {
                        setVisible(true)
                        setActor(e.target.innerText)
                    }}
                >
                    <div className="textclass"><p className="knowmore">Know More</p></div>
                </button>
                {/* <img className="login-card patient-card buttons" src="../images/patient.png"/> */}
                <Model isOpen={visible} onRequestClose={()=>setVisible(false)} style={customStyles}>
                    <button className="close-button" onClick={()=>setVisible(false)}>X</button>
                    <div className="popup-content app">
                        <div className="app-header">
                            <p>Lorem Ipsum</p>
                        </div>
                    </div>
                </Model>
            </div>


            
            {/* <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Medical Report Management and Distribution System on Blockchain</Navbar.Brand>
                </Container>
            </Navbar> */}
            
            
        </div>
    );
}

export default Landing;