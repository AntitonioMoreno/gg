import React, { useState } from "react";
import { Link } from 'react-router-dom';
import 'boxicons';
import Profile from "../misc/userInformation";


const UserLoggedNavbar = () => {

    const [showProfile, setShowProfile] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    const handleProfileClick = () => {
        if (showProfile) {
            setAnimationClass('profile-exit');
            setTimeout(() => {
                setShowProfile(false);
                setAnimationClass('');
            }, 500); // El tiempo debe coincidir con la duración de la animación
        } else {
            setShowProfile(true);
            setAnimationClass('profile-enter');
        }
    };

    return(
        <nav>
            <img className='main-logo' src="/images/logos/logo_min.png" draggable='false' alt="logo"/>
            <Link to="/profile" >Inicio</Link>
            <Link to="/minigames" >Minijuegos</Link>
            <i class='bx bxs-user-circle user-icon' onClick={handleProfileClick}></i>
            {showProfile && <Profile className={animationClass}/>}
        </nav>
    );
}

export default UserLoggedNavbar;