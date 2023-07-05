const path = require('path');
const fs = require('fs');

const express = require('express');
const uuid = require('uuid');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/restaurants', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants
  });
});

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', { restaurant: restaurant });
    }
  }

  res.status(404).render('404');
});

app.get('/recommend', (req, res) => {
  res.render('recommend');
});

app.post('/recommend', (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((error, req, res, next) => {
  res.status(500).render('500');
});

app.listen(3000);
