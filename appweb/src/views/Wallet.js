import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/misc/Footer";
import { Link } from 'react-router-dom';
import UserLoggedNavbar from '../components/navbars/UserLoggedNavbar';

const Wallet = () => {
    return (
        <main className='wallet-container'>
            <UserLoggedNavbar/>
            <section className='movements-section'>
                <div className='wallet-icon'>
                    <i class='bx bx-wallet' ></i>
                </div>
                <div className='total-GGP'>
                    <h2>Creditos totales: 1500GGP</h2>
                    <div>
                        <span class="material-symbols-outlined">payments</span>
                        <h3>Introducir GGP</h3>
                    </div>
                </div>
                <div className='movements-table'>
                    <div className='last-movements'>
                        <h2>Ultimos movimientos</h2>
                    </div>
                    <div className='scroll-div'>
                        <table>
                        <tr>
                            <th>Movimiento</th>
                            <th>Cantidad</th>
                            <th>MM/DD/Y</th>
                            <th>Tiempo</th>
                        </tr>
                        <tr>
                            <td>Introduccion de fichas</td>
                            <td>100GGP</td>
                            <td>Octubre 25 2024</td>
                            <td>14:05:26 CST</td>
                        </tr>
                        <tr>
                            <td>Introduccion de fichas</td>
                            <td>100GGP</td>
                            <td>Octubre 25 2024</td>
                            <td>14:05:26 CST</td>
                        </tr>
                        <tr>
                            <td>Introduccion de fichas</td>
                            <td>100GGP</td>
                            <td>Octubre 25 2024</td>
                            <td>14:05:26 CST</td>
                        </tr>
                        <tr>
                            <td>Introduccion de fichas</td>
                            <td>100GGP</td>
                            <td>Octubre 25 2024</td>
                            <td>14:05:26 CST</td>
                        </tr>
                        <tr>
                            <td>Introduccion de fichas</td>
                            <td>100GGP</td>
                            <td>Octubre 25 2024</td>
                            <td>14:05:26 CST</td>
                        </tr>
                        </table>
                    </div>
                </div>
            </section>
            <section className='graph-section'>
            <h1>Grafica de ganancias del mes</h1>
            </section>
        </main>
    )
}

export default Wallet;
