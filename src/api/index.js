import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate, }

    }   catch (error) {
        console.log(error)
    }
}


export const fetchDailyData = async () => {
    // try {
    //     const { data } = await axios.get(`${url}/daily`)

    //     const modifiedData = data.map((dailyData => ({
    //         confimed: dailyData.confirmed.total,
    //         deaths: dailyData.deaths.total,
    //         date: dailyData.reportDate,
    //     })))

    //     return modifiedData
    // } catch (error) {
    // }

    // recovered is no longer reported in the API - maybe trying switching recovered to a different value
        // this will require changing the name on the card when we are displaying the US category to whatever we choose
        // this will also require changing the name on the line graph from recovered to the correct statistic we use, but ONLY when the US is selected

    try {
        const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

        return data.map(({ positive, recovered, death, dateChecked: date, totalTestResults}) => ({ confirmed: positive, recovered, deaths: death, date, totalTestResults }))
    } catch (error) {
        return error;
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`)
        
        return countries.map( (country) => country.name)
    } catch (error) {
        console.log(error)
    }
}