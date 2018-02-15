import { Component, OnInit } from '@angular/core';

import {FavoritoService} from '../services/favorito.service';
import {Favorito} from '../models/favorito';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'favoritos-list',
	templateUrl: 'app/views/favoritos-list.html',
	providers: [FavoritoService]
})

export class FavoritosListComponent implements OnInit{
	public title: string;
	public favoritos: Favorito[];
	public errorMessage;
	public loading: boolean;
	public confirmado;

	constructor(
			private _favoritoService: FavoritoService
		){
		this.title = 'Listado de marcadores';
		this.loading = true;
	}
	ngOnInit(){
		console.log('FavoritosListComponent cargado!!');
		this.getFavoritos();
	}

	getFavoritos(){
		this._favoritoService.getFavoritos().subscribe(
				result => {
					console.log(result);
					this.favoritos = result.favoritos;

					if(!this.favoritos){
						alert('Error en el servidor');
					}else{
						this.loading = false;
						console.log("loading");
					}
				},
				error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert('error de peticion');
					}
				}
			);
	}

	onBorrarConfirm(id){
		this.confirmado = id;
	}

	onCancelarConfirm(id){
		this.confirmado = null;
	}
	onBorrarFavorito(id){
		this._favoritoService.deleteFavorito(id).subscribe(
				result => {
					if(!result.message){
						alert('error en la peticion');
					}else{
						this.getFavoritos();
					}
				},
				error =>{
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert('error de peticion');
					}
				}

			);

	}

}