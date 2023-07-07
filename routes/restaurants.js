const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', (req, res) => {
  const storedRestaurants = resData.getStoredRestaurants();

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants
  });
});

router.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', { restaurant: restaurant });
    }
  }

  res.status(404).render('404');
});

router.get('/recommend', (req, res) => {
  res.render('recommend');
});

router.post('/recommend', (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/confirm', (req, res) => {
  res.render('confirm');
});

module.exports = router;
