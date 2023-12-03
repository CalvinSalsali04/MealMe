import React, { forwardRef } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const PlaceDetails = forwardRef(({ place, selected }, ref) => {
  const classes = useStyles();
  const selectedStyle = { borderColor: 'blue', borderWidth: 2 };



  return(
    <Card elevation={6} ref={ref} style={selected ? selectedStyle : {}}> 
      <CardMedia 
        style={{height: 350}}
        image={place.photo ? place.photo.images.large.url: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly></Rating>
          <Typography variant='subtitle1'>out of {place.num_reviews}</Typography>
        </Box>


        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        <CardActions>
          <Button size="medium" color="primary" onClick={() => window.open(place.web_url, "_blank")}>
            Website
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  );
});

export default PlaceDetails;