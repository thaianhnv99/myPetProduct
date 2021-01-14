import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PetsService} from "../../theme/service/pets.service";
import {PetFormAdoptComponent} from "../pet-form-adopt/pet-form-adopt.component";

@Component({
  selector: 'app-adopt-pet',
  templateUrl: './adopt-pet.component.html',
  styleUrls: ['./adopt-pet.component.css']
})
export class AdoptPetComponent implements OnInit {
  petItem: any = null;
  listPets: any[] = [];

  constructor(
    private route: Router,
    private modal: NgbModal,
    private petsService: PetsService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.petsList();
  }

  goBackHome() {
    this.route.navigate(['/home']);
  }

  petDetail(ev: any){
    this.petsService.setItemPet(ev);
    this.route.navigate(['/pages/pets-detail']);
  }

  petsList() {
    let body = {
      page: 1,
      pageSize: 50
    }
    this.petsService.getAllPet(body).subscribe(res => {
      console.log(res);
      if (res.body.data.length) {
        res.body.data.forEach(item => {
          item['path'] = item.picture;
        })
        this.listPets = res.body.data;
        console.log(this.listPets);
      }
    });
  }
}
