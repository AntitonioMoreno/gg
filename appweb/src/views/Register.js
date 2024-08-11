import React, { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import MainNabvar from "../components/navbars/MainNavbar";
import 'boxicons';
import { useNavigate } from 'react-router-dom';
import { accountCollection } from '../model/collections';

netlifyIdentity.init();

const Register = () => {
    const [account, setAccount] = useState({ ...accountCollection });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handleChangeAccount = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => {
            const newState = { ...prevState, [name]: value };

            // Check if passwords match
            if (name === 'firstPassword' || name === 'password') {
                setPasswordsMatch(newState.password === newState.firstPassword);
            }

            return newState;
        });
    };

    const handleSignup = () => {
        netlifyIdentity.open('signup');  // This opens the signup modal
    };
    
    netlifyIdentity.on('signup', (user) => {
        console.log('User registered:', user);
        // Redirect the user after successful registration
        navigate('/main');
    });

    return (
        <main className='main-register'>
            <MainNabvar />
            <section className='box-form'>
                <div className='header-register'>
                    <h1>Registrate!</h1>
                    <div className='gg-img'>
                        <img src='/images/logos/logoGG.png' width={100} alt='logo' />
                    </div>
                </div>
                <div className='inputs-item'>
                    <h3>nombre</h3>
                    <input 
                        type='text' 
                        required 
                        name='name' 
                        value={account.name} 
                        onChange={handleChangeAccount}
                        placeholder='introduzca su nombre' 
                        className='border-gradient-purple' 
                    />
                    <h3>apellido</h3>
                    <input 
                        type='text' 
                        required 
                        name='lastName' 
                        value={account.lastName} 
                        onChange={handleChangeAccount}
                        placeholder='introduzca su apellido' 
                    />
                    <h3>email</h3>
                    <input 
                        type='email' 
                        required 
                        name='email' 
                        value={account.email} 
                        onChange={handleChangeAccount}
                        placeholder='introduzca su correo electronico' 
                    />
                    <h3>nombre de usuario</h3>
                    <input 
                        type='text' 
                        required 
                        name='user' 
                        value={account.user} 
                        onChange={handleChangeAccount}
                        placeholder='introduzca su nombre de usuario' 
                    />
                    <h3>crear contraseña</h3>
                    <input 
                        type='password' 
                        required 
                        name='firstPassword'
                        placeholder='introduzca contraseña' 
                        onChange={handleChangeAccount} 
                    />
                    <h3>confirmar contraseña</h3>
                    <input 
                        type='password' 
                        required 
                        name='password' 
                        value={account.password} 
                        onChange={handleChangeAccount}
                        placeholder='introduzca contraseña' 
                    />
                    {!passwordsMatch && <h4 style={{ color: 'red', zIndex: 3 }}>la contraseña no coincide</h4>}
                </div>
                <div className='options-item'>
                    <div>
                        <a href='https://facebook.com/'><i className='bx bxl-facebook-circle bx-burst-hover'></i></a>
                        <a href='https://google.com/'><i className='bx bxl-google bx-burst-hover'></i></a>
                        <a href='https://instagram.com/'><i className='bx bxl-instagram bx-burst-hover'></i></a>
                        <a href='https://x.com/'><i className='bx bxl-twitter bx-burst-hover'></i></a>
                    </div>
                    <div>
                        <h4>Registrate con</h4>
                    </div>
                </div>
                <div className='login-item'>
                    <div>
                        <a href='/login'><i className='bx bx-log-in-circle'></i></a>
                        <h4>iniciar sesion</h4>
                    </div>
                    <button onClick={handleSignup}>crear cuenta</button>
                    <a href='/main'>info</a>
                </div>
            </section>
        </main>
    );
};

export default Register;
