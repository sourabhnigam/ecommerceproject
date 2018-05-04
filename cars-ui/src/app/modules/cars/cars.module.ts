import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';
import { CarsListingComponent } from './listing/listing.component';
import { CarsDetailsComponent } from  './details/details.component';
import { UploadCarImageComponent } from './upload-image/upload-image.component';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

var carsRoutes = [{
		path :'',
		children:[{
			path: 'listing',
			component: CarsListingComponent
		},
		{
			path: 'details',
			component: CarsDetailsComponent
		},
		{
			path: 'upload-image',
			component: UploadCarImageComponent
		}
	],
		component : CarsComponent
	}]
@NgModule({
  declarations: [
    CarsComponent,
		CarsListingComponent,
		CarsDetailsComponent,
		UploadCarImageComponent
  ],
  imports: [
		RouterModule.forChild(carsRoutes),
		CommonModule,
		FormsModule
  ],
  exports:[RouterModule]
})
export class CarsModule { }
