const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile')

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('cars')
    .then(cars => {
        res.status(200).json(cars)
    }).catch(error => {
        res.status(500).json(error)
    })  
});

router.get('/:id', validateCarId, (req, res) => {
    db.select('*').from('cars')
    .where('id', '=', req.params.id)
    .first()
    .then(car => {
        res.status(200).json(car)
    }).catch(error => {
        res.status(500).json(error)
    })
});

router.post('/', validateCar, (req, res) => {
    db('cars').insert(req.body, 'id')
    .then(id => {
        // console.log(`id`, id)
        db.select('*').from('cars')
        .where('id', '=', id[0])
        .then(car => {
            // console.log(`car`, car)
            res.status(201).json(car[0])
        }).catch(error => {
            res.status(500).json(error)
        })
    }).catch(error => {
        res.status(500).json(error)
    })
    
});

function validateCarId(req, res, next) {
    db.select('*').from('cars')
    .where('id', '=', req.params.id)
    .first()
    .then(car => {
        if(car) {
            next();
        } else {
            res.status(404).json({Messgae: "invalid car id"})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error: ${error}`})
    )
};

function validateCar(req, res, next) {
    if (req.body) {
        if (req.body.VIN && req.body.Make && req.body.Model && req.body.Mileage) {
            next ();
        } else {
            res.status(400).json({ message: "missing required field"  })
        }
    } else {
        res.status(400).json({ message: "missing car data" })
    }
    
};

module.exports = router;