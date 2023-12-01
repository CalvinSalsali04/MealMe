import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import useStyles from './styles';





const Map = ({ setCoordinates, setBounds, coordinates, places}) => {
  console.log(places);
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px)');

  

  return(
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAZkaQIz5m8fCpBBf_MrUZVLevi7g7FJ3Y' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng});
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
        }}
        onChildClick={''}

      >
        {Array.isArray(places) && places.map((place, index) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude} 
            lng={place.longitude} 
            key={index}
          >
            <LocationOnOutlinedIcon style={{ color: 'red' }} fontSize="large" />
          </div>
        ))}


      </GoogleMapReact>
    </div>
  )
}

export default Map;