import React, { useState, useEffect } from 'react';
import 'primereact/resources/primereact.min.css';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './Landing.css'; // Custom CSS file
import Logo from '../assets/Logo.png';
import MiniLogo from '../assets/MiniLogo.png';
import { signInWithRedirect } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../SwitchTheme'; // Adjust the path accordingly
 



const Landing = () => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
        measurementId: process.env.REACT_APP_measurementId 
    };

    useEffect(() => {
        console.log(firebaseConfig);
    }, [firebaseConfig]);
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    const [visibleGoal, setVisibleGoal] = useState(false);
    const [visibleAbout, setVisibleAbout] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleGoogleLogin = async () => {
        try {
           await signInWithRedirect(auth, provider); // Use signInWithRedirect instead of signInWithPopup
           navigate('/home');
        } catch (error) {
           console.error("Error signing in with Google:", error);
        }
     };
    const startContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            <img src={MiniLogo} alt="Logo" className="landing-mini-logo" />
        </div>
    );

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                <Button label="Login" onClick={handleGoogleLogin} /> 
                <ThemeSwitcher />
            </div>
            {/* onClick={handleGoogleLogin} */}
        </React.Fragment>
    );

    return (
        <div className="landing-container">
            <Toolbar start={startContent} end={endContent} className="toolbar" />
            <div className='landing-center'>
                <img src={Logo} alt="Logo" className="landing-logo"/>
                <div>
                    <Button className='landing-button' onClick={() => setVisibleGoal(true)}>Our Goal</Button>
                    <Button className='landing-button' onClick={() => setVisibleAbout(true)}>About us</Button>
                </div>
            </div>

            {/* Dialog for Our Goal */}
            <Dialog header="Our Goal" visible={visibleGoal} position={'left'} style={{ width: '50vw' }} onHide={() => setVisibleGoal(false)} draggable={false} resizable={false}>
                <p className="m-0">
                    Inventory aims to provide a simple and easy to use inventory management system for people keep track of their soon-to-expire foods and ingredients.
                </p>
            </Dialog>

            {/* Dialog for About Us */}
            <Dialog header="About Us" visible={visibleAbout} position={'right'} style={{ width: '50vw' }} onHide={() => setVisibleAbout(false)} draggable={false} resizable={false}>
                <p className="m-0">
                    This project was made by students of the University of Central Florida for the Knight Hacks VII hackathon in 2024.
                </p>
                <p>
                    This was our first hackathon for the 3 of us and we learned a lot about it, specially about Firebase, DJango, and MongoDB.
                </p>
                <p>
                    We are proud of our project and we hope you like it too.
                </p>
            </Dialog>
        </div>
    );
};

export default Landing;