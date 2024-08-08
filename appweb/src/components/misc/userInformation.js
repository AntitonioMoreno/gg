import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'boxicons';
import { Link } from 'react-router-dom';

const Profile = ({ className }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://good-guys.netlify.app/.netlify/functions/userInfo', { withCredentials: true });
        setProfileData(response.data);
        console.log('Perfil obtenido:', response.data);
      } catch (error) {
        setError('Error al obtener datos del perfil');
        console.error('Error:', error);
      }
    };

    fetchProfileData(); // Llama a la función de obtención de datos del perfil al montar el componente
  }, []); // [] asegura que el efecto se ejecute solo una vez, al montar el componente

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`profile ${className}`}>
      <section className='profile-header'>
        <i className='bx bxs-user-circle'></i>
        <h2>{profileData.user}</h2>
        <p>{profileData.email}</p>
        <div>
          <h3>Manage GG account</h3>
          <i className='bx bxs-cog'></i>
        </div>
      </section>
      <section className='information'>
        <Link to={"/Wallet"}>
          <div className='box'>
            <i className='bx bxs-wallet'></i>
            <p>wallet</p>
          </div>
        </Link>
        <div className='box'>
          <i className='bx bx-history'></i>
          <p>history</p>
        </div>
      </section>
      <section className='log-out'>
        <i className='bx bx-log-in'></i>
      </section>
    </div>
  );
};

export default Profile;
