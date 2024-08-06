import React, { useState } from 'react';
import axios from 'axios';
import { accountCollection } from '../model/collections';
import MainNabvar from "../components/navbars/MainNavbar";
import 'boxicons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [account, setAccount] = useState({ ...accountCollection });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handleChangeAccount = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => {
            const newState = { ...prevState, [name]: value };

            // Comparar los valores de 'password' y 'firstPassword'
            if (newState.password && newState.firstPassword) {
                setPasswordsMatch(newState.password === newState.firstPassword);
            }
            return newState;
        });
        setAccount(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!passwordsMatch) {
                alert('no se ha confirmado la contraseña!');
            }
            else {
                await axios.post('https://good-guys.netlify.app/.netlify/functions/register.js', { ...account });
                alert('cuenta agregada exitosamente');
                setAccount({ ...account });
                navigate('/login');
            }
        } catch (error) {
            alert('Error al agregar usuario, el usuario o correo ya han sido registrados previamente');
        }
    };
    return (
        <main className='main-register'>
            <MainNabvar />
            <section className='box-form'>
                <div className='header-register'>
                    <h1>Registrate!</h1>
                    <div className='gg-img'>
                        <img src='/images/logos/logoGG.png' width={100} alt='logo'></img>
                    </div>
                </div>
                <div className='inputs-item'>
                    <h3>nombre</h3>
                    <input type='text' required name='name' value={account.name} onChange={handleChangeAccount}
                        placeholder='introduzca su nombre' className='border-gradient-purple'></input>
                    <h3>apellido</h3>
                    <input type='text' required name='lastName' value={account.lastName} onChange={handleChangeAccount}
                        placeholder='introduzca su apellido'></input>
                    <h3>email</h3>
                    <input type='email' required name='email' value={account.email} onChange={handleChangeAccount}
                        placeholder='introduzca su correo electronico'></input>
                    <h3>nombre de usuario</h3>
                    <input type='text' required name='user' value={account.user} onChange={handleChangeAccount}
                        placeholder='introduzca su nombre de usuario'></input>
                    <h3>crear contraseña</h3>
                    <input type='password' required name='firstPassword'
                        placeholder='introduzca contraseña' onChange={handleChangeAccount}></input>
                    <h3>confirmar contraseña</h3>
                    <input type='password' required name='password' value={account.password} onChange={handleChangeAccount}
                        placeholder='introduzca contraseña'></input>
                    {!passwordsMatch && <h4 style={{ color: 'red', zIndex: 3 }}>la contraseña no coincide</h4>}
                </div>
                <div className='options-item'>
                    <div>
                        <a href='https://facebook.com/'><i class='bx bxl-facebook-circle bx-burst-hover'></i></a>
                        <a href='https://google.com/'><i class='bx bxl-google bx-burst-hover'></i></a>
                        <a href='https://instagram.com/'><i class='bx bxl-instagram bx-burst-hover'></i></a>
                        <a href='https://x.com/'><i class='bx bxl-twitter bx-burst-hover'></i></a>
                    </div>
                    <div>
                        <h4>Registrate con</h4>
                    </div>
                </div>
                <div className='login-item'>
                    <div>
                        <a href='/login'><i class='bx bx-log-in-circle'></i></a>
                        <h4>iniciar sesion</h4>
                    </div>
                    <button onClick={handleSubmit}>crear cuenta</button>
                    <a href='/main'>info</a>
                </div>
            </section>
        </main>
    );
}

export default Register;