'use strict'
const Favorito = require('../models/favorito');
function prueba(req, res){
	let nombre ="";
	if(req.params.nombre){
		nombre = req.params.nombre;
	}else{
		nombre = "SIN NOMBRE";	
	}
	res.status(200).send({
		data:[2,3,4],
		message: "Hola mundo con NodeJs y Express - "+nombre
	});	
}

function getFavorito(req, res){
	let id = req.params.id;

	Favorito.findById(id, (err,favorito)=>{
		if(err){
			res.status(500).send({message: 'error al devolver el marcador'});	
		}else{
			if(!favorito){
				res.status(404).send({message: 'no hay marcador'});
			}else{
				res.status(200).send({favorito});
			}
		}
	});
}

function getFavoritos(req, res){
	Favorito.find({}).sort('-title').exec((err, favoritos)=>{
		if(err){
			res.status(500).send({message: 'Error al delvolver los marcadores'});
		}else{
			if(!favoritos){
				res.status(404).send({message: 'no hay marcadores'});
			}else{
				res.status(200).send({favoritos});
			}
		}
	});
}
function saveFavorito(req, res){
	let favorito = new Favorito();

	let params = req.body;
	favorito.title = params.title;
	favorito.description = params.description;
	favorito.url = params.url;
	favorito.save((err, favoritoStored)=>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}else{
			res.status(200).send({favorito: favoritoStored});
		}
	});	
}
function updateFavorito(req, res){
	let favoritoId = req.params.id;
	let update = req.body;

	Favorito.findByIdAndUpdate(favoritoId, update, (err,favoritoUpdate) =>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}else{
		res.status(200).send({favorito: favoritoUpdate});
		}
	});
}

function deleteFavorito(req, res){
	let id = req.params.id;

	/*Favorito.findByIdAndRemove(id, (err, favoritoRemove)=>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}
		if(!favoritoRemove){
			res.status(404).send({message: 'no hay marcadores'});
		}
		res.status(200).send({favorito: favoritoRemove});
	});*/

	Favorito.findById(id, (err, favoritoRemove)=>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}else{
		if(!favoritoRemove){
			res.status(404).send({message: 'no hay marcadores'});
		}else{
			favoritoRemove.remove(err => {
				if(err){
					res.status(500).send({message: 'no se pudo eliminar el marcador'});
				}else{
					res.status(200).send({message: 'se elimino correctamente el marcador'});
				}
			});

			}
		}
	});
}
module.exports = {
	prueba,
	getFavorito,
	getFavoritos,
	saveFavorito,
	deleteFavorito,
	updateFavorito,
}