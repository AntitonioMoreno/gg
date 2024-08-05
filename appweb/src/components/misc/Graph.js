import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Data } from './Data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const LineGraph = () => {
    const options = {
            plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'white', // Cambia el color de las etiquetas de la leyenda
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'white', // Cambia el color de las etiquetas del eje X
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'white', // Cambia el color de las etiquetas del eje Y
                },
            },
        },
      };
    return (
        <Line options={ options } data={ Data }/>
    );
}