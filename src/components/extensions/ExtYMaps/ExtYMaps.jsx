import React from 'react';

import {YMaps, Map, Placemark} from 'react-yandex-maps';
import placeIcon from "../../../assets/icons/info-square.svg";;

const ExtYMaps = (props) => {
    return (
        <YMaps>           
            <Map defaultState={{ center: props.center, zoom: props.zoom }}
                 height={props.height} width={props.width}>
                {props.placemarks.map(placemark =>
                    <Placemark
                        geometry={placemark.geometry}
                        properties={{
                          hintContent: placemark.hintContent,
                          balloonContent: placemark.balloonContent
                        }}
                        modules={
                            ['geoObject.addon.balloon', 'geoObject.addon.hint']
                        }                    
                        options={{
                          iconLayout: 'default#image',
                          iconImageHref: placeIcon,
                          iconImageSize: [30, 42],
                          iconImageOffset: [-3, -42]
                        }}
                        onClick={() => placemark.onClick && placemark.onClick()}
                    />
                )}
            </Map>
        </YMaps>
    );
}

export default ExtYMaps;