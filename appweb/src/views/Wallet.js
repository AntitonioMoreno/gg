import UserLoggedNavbar from '../components/navbars/UserLoggedNavbar';
import { LineGraph } from '../components/misc/Graph';

const Wallet = () => {
    /*
    const [showGGP, setShowGGP] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    const handleWallet = () => {
        if (showProfile) {
            setAnimationClass('profile-exit');
            setTimeout(() => {
                setShowGGP(false);
                setAnimationClass('');
            }, 500); // El tiempo debe coincidir con la duración de la animación
        } else {
            setShowGGP(true);
            setAnimationClass('profile-enter');
        }
    }; */
    return (
        <main className='wallet-container'>
            <UserLoggedNavbar />
            <section className='movements-section'>
                <div className='wallet-icon'>
                    <i class='bx bx-wallet'></i>
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
                <div className='graph-container'>
                    <LineGraph />
                    <div className='tittle-graph'>
                        <h1>Grafica de ganancias del mes</h1>
                        <i class='bx bx-line-chart'></i>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Wallet;
