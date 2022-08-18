import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@aswin/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form:FormGroup;
  isSubmitted = false;

  constructor(
    private messageService: MessageService, 
    private formBuilder : FormBuilder, 
    private categoriesService:CategoriesService,
    private location: Location,

    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name:['',Validators.required],
      icon: ['',Validators.required],
    })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;

    }
    
    const category : Category = {
      name: this.form.controls.name.value,
      icon: this.form.controls.icon.value,
    };

    this.categoriesService.createCategory(category).subscribe(() =>{
      this.messageService.add({
        severity:'success', 
        summary:'Success', 
        detail:'Category is created'
      });
      timer(2000).toPromise().then(()=>{
        this.location.back();
      })
    },
    ()=>{
      this.messageService.add({
        severity:'error', 
        summary:'Error',
        detail:'Category is not created'
      });

    });
    
  }

}
