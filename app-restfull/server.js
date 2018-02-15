'use strict'

const app = require('./app');
const port = process.env.PORT || 3678;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cursofavoritos',(err, res)=>{

	if(err){
		throw err;	
	}else{
		console.log('Conexion a MongoDB correcta');
		app.listen(port, ()=>{
		console.log(`API REST funcionando en http://localhost:${port}`);
		});
	}


});

