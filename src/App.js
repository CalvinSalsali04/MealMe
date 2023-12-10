import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [rating, setRating] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({ lat: latitude, lng:longitude});
    });
  }, []);

  useEffect( () => {
    const filteredPlaces = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces);
  }, [places, rating]);

  useEffect(() => {
    if (bounds && bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data);
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4} >
          <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} >
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;