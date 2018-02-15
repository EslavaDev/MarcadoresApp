'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FavoritoSchema = Schema({
	title: String,
	description: String,
	url: String
},
{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Favorito', FavoritoSchema);