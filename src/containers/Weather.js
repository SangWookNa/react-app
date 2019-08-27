import React from 'react';
import { Today, DayAfterTommorow, Forecast6Days } from '../components/weather';
class Weather extends React.Component {


    render() {

        let weatherForm = <Today weather={this.props.weather} />;

        return (

            <div >
                {weatherForm}
            </div>
        );
    }
}

export default Weather;

