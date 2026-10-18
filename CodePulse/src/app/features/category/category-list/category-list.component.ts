import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  private categoryService = inject(CategoryService);

  private getAllCategoriesRef = this.categoryService.getAllCategories();

  isLoading = this.getAllCategoriesRef.isLoading;
  isError = this.getAllCategoriesRef.error;
  value = this.getAllCategoriesRef.value;
}
