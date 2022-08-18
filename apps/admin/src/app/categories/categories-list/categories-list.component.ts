import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@aswin/products'
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories : Category[] = [];

  constructor(
    private categoriesServices:CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId:string){
    this.confirmationService.confirm({
      message: 'Do you want to delet this Category..?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesServices.deleteCategory(categoryId).subscribe(()=>{
          this._getCategories();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Category is deleted'
          });
        },
        ()=>{
          this.messageService.add({
            severity:'error', 
            summary:'Error',
            detail:'Category is not deleted'
          });
        })      },
      reject: (type) => {}
  });
    
  }

  private _getCategories(){
    this.categoriesServices.getCategories()
    .subscribe(cats =>{
      this.categories = cats;
    })
  }

}
