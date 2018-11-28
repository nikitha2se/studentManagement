

import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {trigger, state, animate, style, transition} from '@angular/core';

@Injectable()
export class ConfigService {
	apiURL:string;
	constructor() {
		this.apiURL = "http://localhost/saNG4-Demo-App/api/";
	}

}

export class ValidationService {

	

	static checkLimit(min: number, max: number): ValidatorFn {
		return (c: AbstractControl): { [key: string]: boolean } | null => {
			if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
				return { 'range': true };
			}
			return null;
		};
	}
}



export function routerTransition() {
	return slideToLeft();
}

function slideToLeft() {
	return trigger('routerTransition', [
		transition(':enter', [
			style({transform: 'translateX(100%)', position:'fixed', width:'100%'}),
			animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
			]),
		transition(':leave', [
			style({transform: 'translateX(0%)', position:'fixed', width:'100%'}),
			animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
			])
		]);
}
