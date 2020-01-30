import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
                {forecasts.map(forecast =>
            <tr key={forecast.id}>
                        <td>{forecast.applicable_Date}</td>
                        <td>{forecast.weather_State_Name}</td>
                        <td><img src="https://www.metaweather.com//static/img/weather/sn.svg" /></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Home.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from a .Net Core Api in Azure</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
      const response = await fetch('https://kevinsweatherapi.azurewebsites.net/api/weatherforecast/getbyname?cityname=belfast');
      const data = await response.json();
      //debugger;
      this.setState({ forecasts: data.consolidated_Weather, loading: false });
   
  }
}
