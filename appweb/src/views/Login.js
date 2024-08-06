import React, { useState } from 'react';
import axios from 'axios';
import MainNabvar from "../components/navbars/MainNavbar";
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons';
import { accountCollection } from '../model/collections';



const Login = () => {
    const [account, setAccount] = useState({ ...accountCollection });
    const navigate = useNavigate();

    const handleChangeAccount = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                const response = await axios.post('https://good-guys.netlify.app/.netlify/functions/login', { ...account }, { withCredentials: true });
                alert('sesion iniciada con exito');
                navigate(response.data.redirectURL);
    
        } catch (error) {
            alert('error al iniciar sesion');
        }
    };


    return (
        <main className='main'>
            <MainNabvar />
            <section className='main-box'>
                <div className='header'>
                    <h1>Login</h1>
                    <img src='/images/logos/logoGG.png' width={100} alt='logo'></img>
                </div>
                <div className='item1'>
                    <h3>usuario</h3>
                    <input type='email' name='user' value={account.user} onChange={handleChangeAccount}
                        placeholder='introduzca su nombre de usuario' required></input>
                    <h3>contraseña</h3>
                    <input type='password' name='password' value={account.password} onChange={handleChangeAccount}
                        placeholder='introduzca su contraseña'></input>
                </div>
                <div className='item2'>
                    <div>
                        <a href='https://facebook.com/'><i class='bx bxl-facebook-circle bx-burst-hover'></i></a>
                        <a href='https://google.com/'><i class='bx bxl-google bx-burst-hover'></i></a>
                        <a href='https://instagram.com/'><i class='bx bxl-instagram bx-burst-hover'></i></a>
                        <a href='https://x.com/'><i class='bx bxl-twitter bx-burst-hover'></i></a>
                    </div>
                    <div>
                        <h4>Iniciar sesion con</h4>
                    </div>
                </div>
                <div className='item3'>
                    <button onClick={handleSubmit}>Iniciar sesion</button>
                    <div>

                        <Link to="/register"><i class='bx bxs-user-plus'></i></Link>
                        <h4>crear nueva cuenta</h4>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Login;