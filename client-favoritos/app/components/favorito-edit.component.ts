import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FavoritoService } from '../services/favorito.service';
import { Favorito } from '../models/favorito';
 

@Component({
    selector: 'favorito-edit',
    templateUrl: 'app/views/favorito-add.html',
    providers: [FavoritoService]
})
 
export class FavoritoEditComponent implements OnInit { 
	public titles: string;
	public favorito: Favorito;
	public errorMessage;

	constructor(
			private _favoritoService: FavoritoService,
			private _route: ActivatedRoute,
			private _router: Router
		){
		this.titles = 'Editar Favorito';
	}
	ngOnInit(){
		this.favorito = new Favorito("","","","");
		this.getFavorito();
	}

	getFavorito(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._favoritoService.getFavorito(id).subscribe(
					response => {
						if(!this.favorito){
						alert('error en el servidor');
						this._router.navigate(['/']);
						}else{
							this.favorito = response.favorito;
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
		});
	}

	public onSubmit(){
		console.log(this.favorito);
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._favoritoService.editFavorito(id, this.favorito).subscribe(
				response => {
					if(!this.favorito){
						alert('error en el servidor');
					}else{
						this.favorito = response.favorito;
						this._router.navigate(['/marcador', this.favorito._id]);
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
		});
	}
}