import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../Services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  // 1) Import Reactive Forms Module
  // 2) FormGroups --> FormControls

  /**
   *
   */
  constructor() {
   effect( ()=> {
      if(this.categoryService.addCategoryStatus() === 'success') {
        alert('Category Successfully Added');
        this.categoryService.addCategoryStatus.set('idle');

        //redirect back to category list page
        this.router.navigate(['/admin/categories']);
      }

      if(this.categoryService.addCategoryStatus()==='error'){
        alert('Add Category FAILED');
      }
   })
   
    
  }

  private categoryService = inject(CategoryService);
  private router = inject(Router);

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, 
          validators:[Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true,
          validators:[Validators.required, Validators.maxLength(100)]
    })
  })

  get nameFormControl(){
    return this.addCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl(){
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit(){
    console.log(this.addCategoryFormGroup.getRawValue())
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto : AddCategoryRequest = {
      name : addCategoryFormValue.name,
      urlHandle : addCategoryFormValue.urlHandle
    }

    this.categoryService.addCategory(addCategoryRequestDto);
    
  }

}
