import React, { useState, useEffect, createRef, forwardRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select  } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ( { places, childClicked, isLoading, setRating } ) => {
  const classes = useStyles();
  const [type, setType] = useState('restaurants');
  const [rating, setLocalRating] = useState('');
  
  
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);
  
  useEffect(() => {
    if (childClicked !== null && elRefs[childClicked]) {
      elRefs[childClicked].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [childClicked, elRefs]);
  
  const handleRatingChange = (e) => {
    setRating(e.target.value); 
  };

  return(
    <div className={classes.container}>
      <Typography variant='h4'>Food Near You</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          
        </Select>
          
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={handleRatingChange}>
        <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3</MenuItem>
          <MenuItem value={4}>Above 4</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
          
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
      {places?.map((place, i) => (
        <Grid item key={i} xs={12}>
          <PlaceDetails 
            place={place} 
            selected={Number(childClicked) === i}
            ref={elRefs[i]}
          />
        </Grid>
      ))}

          
      </Grid>
      </>
      )}
    </div>
  )
}

export default List;