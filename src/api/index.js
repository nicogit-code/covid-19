import axios from 'axios';

const apiUrl = 'https://covid19.mathdro.id/api';


export const fetchData = async(country) => {
    let changeableUrl = apiUrl;

    if(country) {
        changeableUrl = `${apiUrl}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}


export const fetchDailyData = async () => {

    try {
        const { data } = await axios.get(`${apiUrl}/daily`);

    const modifiedData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
    }));

    return modifiedData;
    } catch(error) {
        console.log(error);
    }
}


export const fetchCountries = async() => {
    try {
        const { data: { countries }} = await axios.get(`${apiUrl}/countries`);

        return countries.map((country) => country.name);

    } catch (error) {
        console.log(error);
    }
}