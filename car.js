class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption
  ) {
    this.brand = brand;
    this.model = model;
    this.yearOfManufacturing = yearOfManufacturing;
    this.maxSpeed = maxSpeed;
    this.maxFuelVolume = maxFuelVolume;
    this.fuelConsumption = fuelConsumption;
  }

  get brand() {
    return this.#brand;
  }

  set brand(newBrand) {
    this.#brand = this.validateStringProperty('brand', newBrand, 1, 50);
  }

  get model() {
    return this.#model;
  }

  set model(newModel) {
    this.#model = this.validateStringProperty('model', newModel, 1, 50);
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(newYear) {
    this.#yearOfManufacturing = this.validateNumberProperty(
      'yearOfManufacturing',
      newYear,
      1900,
      new Date().getFullYear()
    );
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(newMaxSpeed) {
    const parsedMaxSpeed = this.validateNumberProperty(
      'maxSpeed',
      newMaxSpeed,
      0,
      300
    );

    if (parsedMaxSpeed < 100) {
      throw new Error('Max speed should be at least 100 km/h');
    }

    this.#maxSpeed = parsedMaxSpeed;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(newMaxFuelVolume) {
    this.#maxFuelVolume = this.validateNumberProperty(
      'maxFuelVolume',
      newMaxFuelVolume,
      5,
      20
    );
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(newFuelConsumption) {
    this.#fuelConsumption = this.validateNumberProperty(
      'fuelConsumption',
      newFuelConsumption
    );
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('The car is already started');
    }

    if (this.#currentFuelVolume === 0) {
      throw new Error('No fuel to start the car');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('The car is not started yet');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(amount) {
    const parsedAmount = this.validateNumberProperty('amount', amount);

    if (parsedAmount <= 0) {
      throw new Error('Invalid amount of fuel to fill up');
    }

    if (this.#isStarted) {
      throw new Error('Cannot fill up fuel while the car is started');
    }

    const totalFuel = this.#currentFuelVolume + parsedAmount;

    if (totalFuel > this.#maxFuelVolume) {
      throw new Error('Fuel tank is full, cannot fill up more');
    }

    this.#currentFuelVolume = totalFuel;
  }

  drive(speed, hours) {
    const parsedSpeed = this.validateNumberProperty('speed', speed, 1);
    const parsedHours = this.validateNumberProperty('hours', hours, 1);

    if (parsedSpeed > this.#maxSpeed) {
      throw new Error('The car cannot drive at such a high speed');
    }

    if (!this.#isStarted) {
      throw new Error('The car must be started to drive');
    }

    const requiredFuel =
      (parsedSpeed / 100) * this.#fuelConsumption * parsedHours;

    if (requiredFuel > this.#currentFuelVolume) {
      throw new Error('Not enough fuel to complete the trip');
    }

    this.#currentFuelVolume -= requiredFuel.toFixed(2);
    this.#mileage += parseFloat((parsedSpeed * parsedHours).toFixed(2));
  }

  validateStringProperty(
    propertyName,
    value,
    minLength = 0,
    maxLength = Number.MAX_SAFE_INTEGER
  ) {
    if (
      typeof value !== 'string' ||
      value.length < minLength ||
      value.length > maxLength
    ) {
      throw new Error(`Invalid value for ${propertyName}`);
    }

    return value;
  }

  validateNumberProperty(
    propertyName,
    value,
    minValue = 0,
    maxValue = Number.MAX_SAFE_INTEGER
  ) {
    const parsedValue = parseFloat(value);

    if (
      isNaN(parsedValue) ||
      parsedValue < minValue ||
      parsedValue > maxValue
    ) {
      throw new Error(`Invalid value for ${propertyName}`);
    }

    return parsedValue;
  }
}

module.exports = Car;
