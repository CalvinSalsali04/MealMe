import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';
import { useState, useEffect } from 'react';

import { getWeatherData } from '../../api'; 


const Header = ({setCoordinates}) => {
  const classes = useStyles();
  const [autocomplete, setAutoComplete] = useState(null);
  
  const [weather, setWeather] = useState({});

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = async () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });  
    
    const weatherData = await getWeatherData(`${lat},${lng}`);
    setWeather(weatherData);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      setCoordinates({ lat: latitude, lng: longitude });
  
      try {
        const weatherData = await getWeatherData(`${latitude},${longitude}`);
        setWeather(weatherData);
      } catch (error) {
        console.error(error);
      }
    });
  }, [])
  
  
  return(
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          MealMe
        </Typography>
        <Box display="flex">


        <Typography variant='h6' className={classes.title}>
            Search
          </Typography>

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput}}/>
              </div>
          </Autocomplete>
          <Typography variant='h6' className={classes.title}>
            {weather.current ? `${weather.current.condition.text}, ${weather.current.temp_c}°C` : 'Search'}
          </Typography>
          
          
          
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;