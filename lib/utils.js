const fetch = require('node-fetch');

async function getWeatherData(lat, lon) {
  const apiResp = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.Master_API_Key}&lat=${lat}&lon=${lon}`
  );
  const apiData = await apiResp.json();
  const data = apiData.data.map((item) => {
    return {
      forecast: item.weather.description,
      time: new Date(item.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return data;
}


async function getYelpData(lat, lon) {
  let URL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;
  let bearer = 'Bearer ' + `${process.env.API_key}`;
  const apiResp = await fetch(
    `${URL}`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      }
    }
  );
  const apiData = await apiResp.json();
  const data = apiData.businesses.map((item) => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url
    };
  });
  console.log(data);
  return data;
}


module.exports = {
  getWeatherData,
  getYelpData
};