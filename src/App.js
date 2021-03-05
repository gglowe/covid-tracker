import React from 'react';

// Below import of components is made possible by the index.js file in the components folder - which handles their export
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api'

import coronaImg from './imgs/covid.png'



class App extends React.Component {

  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData })
  }

handleCountryChange = async (country) => {
  
  const fetchedData = await fetchData(country);

  this.setState({ data: fetchedData, country: country });
}




  render() {
    const { data, country } = this.state;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImg} alt="COVID-19"/>
      <Cards data={data}/>
      <CountryPicker handleCountryChange={this.handleCountryChange} />
      <Chart data={data} country={country}/>
    </div>
  );
  }
}

export default App;
