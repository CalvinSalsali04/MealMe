import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';




export const getPlacesData = async (sw, ne) => {
  try{
    const { data: { data}} = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        
      },
      headers: {
        'X-RapidAPI-Key': '1feb754b00msh39403b508d9db3ap14009fjsnde32d0770579',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    console.log(data);
    return data;
  } catch(error){
    console.log(error);
  }
}


export const getWeatherData = async (query) => {
  try {
    const { data } = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
      params: { q: query },
      headers: {
        'X-RapidAPI-Key': '1feb754b00msh39403b508d9db3ap14009fjsnde32d0770579',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
