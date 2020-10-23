import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';


const Chart = ({ data: { confirmed, deaths, recovered}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    // state = [
    //     dailyData: {}
    // ]

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
    
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length !== 0
        ? (
            <Line
            data={{
                labels: dailyData.map(( { date }) => date),
                datasets: [{
                    data: dailyData.map(( { confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: 'rgba(4, 173, 173, 0.8)',
                    fill: true,
                }, {
                    data: dailyData.map(( { deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'rgba(184, 5, 44, 0.8)',
                    backgroundColor: 'rgba(184, 5, 44, 0.5)',
                    fill: true,
                }],
            }}
            />) : null
    );

    console.log(confirmed, recovered, deaths);

    const barChart = (
        confirmed
        ? (
            <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: 
                    ['rgba(4, 173, 173, 0.5)', 
                    'rgba(11, 134, 27, 0.5)', 
                    'rgba(184, 5, 44, 0.5)'],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: { display: false},
                title: { display: true, text: `Current state in ${country}`}
            }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;