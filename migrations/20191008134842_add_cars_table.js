
exports.up = function(knex) {
    return  knex.schema.createTable('cars', function(tbl) {
        tbl.increments();
        tbl.string('VIN', 128).notNullable();
        tbl.string('Make', 128).notNullable();
        tbl.string('Model', 128).notNullable();
        tbl.integer('Mileage', 128).notNullable();
        tbl.string('Transmission Type', 128);
        tbl.string('Title Status', 128);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
