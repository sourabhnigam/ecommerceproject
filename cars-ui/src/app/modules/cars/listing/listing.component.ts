import { Component , Renderer2, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: '',
  templateUrl: 'listing.component.html' ,
  providers: [ConfigurationService] 
})
export class CarsListingComponent implements OnDestroy {
  title = 'app';
  searchListings:any = [];
  modalRef: BsModalRef;

  apiImageUrl = this.config.getAPIUrl() + 'uploads/';
  allmakes : Object = [];
  selectedModels:any = [];
  carsImages = ['aston.jpg', 'audi.jpg', 'jaguar.jpg', 'mers.jpg'];
  search:any = {};
  constructor(private renderer : Renderer2, private route: ActivatedRoute, private router: Router, private http : HttpClient, private config : ConfigurationService, private modalService: BsModalService){
    this.renderer.addClass(document.body, 'm-listTable');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  doSearch(){
    let self = this;
    this.modalRef.hide();
    self.router.navigate(['cars/listing'],{ queryParams: { make: self.search.make } });
  }

  selectDetails(attr,data){
    let self = this ;
    if(attr == 'make'){
      self.http.get(self.config.getAPIUrl()+ "car/makes/models/"+data).subscribe(models=>{
          self.selectedModels = models;
          console.log(models, "models");
      },error=>{
          console.log(error, "error occured");
      });
    }
  }

  ngOnInit(){
    let self = this ;
    self.http.get(self.config.getAPIUrl()+ "car/makes").subscribe(makes=>{
      self.allmakes = makes;
    },error=>{
        console.log(error, "error occured");
    })
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        self.http.get(self.config.getAPIUrl()+ 'car/makes/models_data/'+params.make+"/1/10" ).subscribe(listings=>{              
              self.searchListings = listings;
        }, 
        error=>{
          console.log("error occured while getting listing");
        })
      });
  }

  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'm-listTable');
  }
}
