import React from 'react';
import Icon from '@mdi/react'
import {
    mdiWeatherSunny
    , mdiWeatherPartlyCloudy
    , mdiWeatherCloudy
    , mdiWeatherPouring
    , mdiWeatherSnowy
    , mdiWeatherSnowyRainy
    , mdiWeatherPartlyRainy
    , mdiWeatherPartlySnowy
    , mdiWeatherPartlySnowyRainy
    , mdiWeatherLightning
    , mdiWeatherLightningRainy
} from '@mdi/js'

class WeatherImage extends React.Component {

    renderSwitch(param) {
        switch (param) {
            case 'SKY_O01':
                return <Icon path={mdiWeatherSunny} size={2} />;
            case 'SKY_O02':
                return <Icon path={mdiWeatherPartlyCloudy} size={2} />;
            case 'SKY_O03':
                return <Icon path={mdiWeatherPartlyCloudy} size={2} />;
            case 'SKY_O04':
                return <Icon path={mdiWeatherPartlyRainy} size={2} />;
            case 'SKY_O05':
                return <Icon path={mdiWeatherPartlySnowy} size={2} />;
            case 'SKY_O06':
                return <Icon path={mdiWeatherPartlySnowyRainy} size={2} />;
            case 'SKY_O07':
                return <Icon path={mdiWeatherCloudy} size={2} />;
            case 'SKY_O08':
                return <Icon path={mdiWeatherPouring} size={2} />;
            case 'SKY_O09':
                return <Icon path={mdiWeatherSnowy} size={2} />;
            case 'SKY_O10':
                return <Icon path={mdiWeatherSnowyRainy} size={2} />;
            case 'SKY_O11':
                return <Icon path={mdiWeatherLightning} size={2} />;
            case 'SKY_O12':
                return <Icon path={mdiWeatherLightningRainy} size={2} />;
            case 'SKY_O13':
                return <Icon path={mdiWeatherLightningRainy} size={2} />;
            case 'SKY_O14':
                return <Icon path={mdiWeatherLightningRainy} size={2} />;
            case 'SKY_M01':
                return <Icon path={mdiWeatherSunny} size={1} />;
            case 'SKY_M02':
                return <Icon path={mdiWeatherPartlyCloudy} size={1} />;
            case 'SKY_M03':
                return <Icon path={mdiWeatherPartlyCloudy} size={1} />;
            case 'SKY_M04':
                return <Icon path={mdiWeatherCloudy} size={1} />;
            case 'SKY_M05':
                return <Icon path={mdiWeatherPouring} size={1} />;
            case 'SKY_M06':
                return <Icon path={mdiWeatherSnowy} size={1} />;
            case 'SKY_M07':
                return <Icon path={mdiWeatherSnowyRainy} size={1} />;
            case 'SKY_W01':
                return <Icon path={mdiWeatherSunny} size={1} />;
            case 'SKY_W02':
                return <Icon path={mdiWeatherPartlyCloudy} size={1} />;
            case 'SKY_W03':
                return <Icon path={mdiWeatherPartlyCloudy} size={1} />;
            case 'SKY_W04':
                return <Icon path={mdiWeatherCloudy} size={1} />;
            case 'SKY_W07':
                return <Icon path={mdiWeatherPouring} size={1} />;
            case 'SKY_W09':
                return <Icon path={mdiWeatherPartlyRainy} size={1} />;
            case 'SKY_W10':
                return <Icon path={mdiWeatherPouring} size={1} />;
            case 'SKY_W11':
                return <Icon path={mdiWeatherSnowyRainy} size={1} />;
            case 'SKY_W12':
                return <Icon path={mdiWeatherPartlySnowy} size={1} />;
            case 'SKY_W13':
                return <Icon path={mdiWeatherSnowy} size={1} />;
            default:
                return 'foo';
        }
    }
    render() {
        return (
            <div >
                {this.renderSwitch(this.props.sky.code)}
            </div>
        );
    }
}
export default WeatherImage;

