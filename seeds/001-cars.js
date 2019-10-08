
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 0000000, Model: "Batmobile", Make: "WayneTech", Mileage: 20000, Transmission: 'Automatic' },
        {VIN: 5353535, Model: "Bug", Make: "VW", Mileage: 100000},
        {VIN: 6236290, Model: "1973 Ford Falcon XB GT Pursuit Special", Make: "Ford", Mileage: 150000, Transmission: 'Manual', Title: 'Anything but clean'}
      ]);
    });
};
