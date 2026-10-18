import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private http = inject(HttpClient)
  private apiBaseUrl = 'https://localhost:7090';
  
  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  updateCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  //POST::
  addCategory(category: AddCategoryRequest){
    this.addCategoryStatus.set('loading');

    this.http.post<void>('https://localhost:7090/api/Categories', category)
    .subscribe({
      next: () => {this.addCategoryStatus.set('success')},
      error: (err) => {
        this.addCategoryStatus.set('error')
        console.log(err);
      }
    })

  }

  //GET::
  getAllCategories(){
    return httpResource<Category[]>( ()=>`https://localhost:7090/api/Categories`);
  }

  //Get Cateogry by ID
  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<Category>(()=>`${this.apiBaseUrl}/api/categories/${id()}` );
  }

  //Update Category using category id.
  updateCategoryById(id: string, updateCategoryRequestDto : UpdateCategoryRequest){
    this.updateCategoryStatus.set('loading');
    this.http.put<void>(`${this.apiBaseUrl}/api/categories/${id}`, updateCategoryRequestDto)
    .subscribe({
      next: () => {
        this.updateCategoryStatus.set('success');
        alert("Category UPDATED Successfully");
      },
      error: () => {
        this.updateCategoryStatus.set('error');
      }

    })
  }

  //DELETE Category BY ID
  deleteCategoryById(id: string): Observable<void>{
    this.updateCategoryStatus.set('loading');

    return this.http.delete<void>(`${this.apiBaseUrl}/api/categories/${id}`);
  }

}
