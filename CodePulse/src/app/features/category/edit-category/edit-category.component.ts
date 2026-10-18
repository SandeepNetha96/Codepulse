import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {

  /**
   *
   */
  constructor() {
    effect( () => {
      if(this.categoryService.updateCategoryStatus() === 'success'){
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
    })

    effect( () => {
      if(this.categoryService.updateCategoryStatus() === 'error'){
        this.categoryService.updateCategoryStatus.set('idle');
        alert("Something went wrong");
        console.error('Something went wrong');
      }
    })
    
  }


  id = input<string>();
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  categoryResourceRef = this.categoryService.getCategoryById(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, 
          validators:[Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true,
          validators:[Validators.required, Validators.maxLength(100)]
    })
  })

  get nameFormControl(){
    return this.editCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl(){
    return this.editCategoryFormGroup.controls.urlHandle;
  }

  effectRef = effect( ()=> {
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
    this.editCategoryFormGroup.controls.urlHandle.patchValue(
      this.categoryResponse()?.urlHandle ?? ''
    );
  })

  onSubmit(){
    const id = this.id();
    if(!this.editCategoryFormGroup.valid || !id){
      return;
    }
    
    const formRawValue = this.editCategoryFormGroup.getRawValue();

    const updateCategoryRequestDto: UpdateCategoryRequest = {
      name: formRawValue.name,
      urlHandle: formRawValue.urlHandle
    };

    this.categoryService.updateCategoryById(id, updateCategoryRequestDto);
  }


  deleteCategory(){
    const id = this.id();

    if(!id){
      return;
    }

    this.categoryService.deleteCategoryById(id).subscribe({
      next: () => {
        alert("Category DELETED successfully");
        this.router.navigate(['/admin/categories']);
      },
      error: () =>{
        console.error('Something went wrong');
      }
    })
  }

}
