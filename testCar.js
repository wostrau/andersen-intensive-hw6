const Car = require('./car');

const myCar = new Car('Toyota', 'Camry', 2020, 200, 15, 8);

// getting info
console.log(`Brand: ${myCar.brand}`);
console.log(`Model: ${myCar.model}`);
console.log(`Year of Manufacturing: ${myCar.yearOfManufacturing}`);
console.log(`Max Speed: ${myCar.maxSpeed} km/h`);
console.log(`Max Fuel Volume: ${myCar.maxFuelVolume} liters`);
console.log(`Fuel Consumption: ${myCar.fuelConsumption} l/100km`);
console.log(`Current Fuel Volume: ${myCar.currentFuelVolume} liters`);
console.log(`Is Started: ${myCar.isStarted}`);
console.log(`Mileage: ${myCar.mileage} km`);

// starting engine
try {
  myCar.start();
  console.log('Car started successfully');
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// tanking fuel
try {
  myCar.fillUpGasTank(10);
  console.log('Fuel tank filled up successfully');
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// tanking when the car is started
try {
  myCar.start();
  myCar.fillUpGasTank(5);
  console.log('Fuel tank filled up successfully');
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// driving the car
try {
  myCar.drive(50, 2);
  console.log(`Current Fuel Volume: ${myCar.currentFuelVolume} liters`);
  console.log(`Mileage: ${myCar.mileage} km`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
