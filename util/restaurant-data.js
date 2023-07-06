const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

const getStoredRestaurants = () => {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
};

const storeRestaurants = (storableRestaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
};

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants
};
