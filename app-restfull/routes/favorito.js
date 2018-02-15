const express = require('express');
const FavoritoController = require('../controllers/favorito');
const api = express.Router();


/*app.get('/prueba/:nombre'=== nos da a entender que el parametro es obligatorio y si 
*no lo introduciomos bloquea la ruta como si no sirviera.
*app.get('/prueba/:nombre?' === con el signo de interrogacion nos da a entender
*que el parametro es opcional y no bloquea esa ruta.
*/
api.get('/prueba/:nombre?', FavoritoController.prueba);
api.get('/favorito/:id', FavoritoController.getFavorito);
api.get('/favoritos', FavoritoController.getFavoritos);
api.post('/favorito', FavoritoController.saveFavorito);
api.delete('/favorito/:id', FavoritoController.deleteFavorito);
api.put('/favorito/:id', FavoritoController.updateFavorito);

module.exports = api;