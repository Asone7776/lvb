import React, { useRef, useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
function createGradient(ctx, area) {
    const colorStart = 'transparent';
    const colorEnd = 'rgba(0, 170, 135, 0.15)';

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}
export const data = {
    labels,
    datasets: [
        {
            fill: true,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            pointBackgroundColor: '#1958FA',
            borderColor: '#00AA87',
            radius: 7,
            hoverRadius: 7,
        },
    ],
};

const plugins = [
    {
        afterDraw: chart => {
            if (chart.tooltip._active.length) {
                let x = chart.tooltip._active[0].element.x;
                let y = chart.tooltip._active[0].element.y;
                let yAxis = chart.scales.y;
                let ctx = chart.ctx;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#1958FA';
                ctx.stroke();
                ctx.restore();
            }
        }
    }];

const DashboardChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                backgroundColor: createGradient(chart.ctx, chart.chartArea),
            })),
        };

        setChartData(chartData);
    }, []);
    return <Line ref={chartRef} options={options} data={chartData} plugins={plugins} />;
}
export default DashboardChart;