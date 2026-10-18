import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { AddBlogPostRequest } from '../models/blogPost.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/Services/category.service';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageSelectorService } from '../../../shared/services/image-selector.service';

@Component({
  selector: 'app-add-blog-post',
  imports: [ReactiveFormsModule, MarkdownComponent,ImageSelectorComponent],
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css'
})
export class AddBlogPostComponent {

  blogPostService = inject(BlogPostService);
  catrgoryService = inject(CategoryService);
  imageSelectorService = inject(ImageSelectorService);
  router = inject(Router);

  private categoryResourceRef = this.catrgoryService.getAllCategories();
  categoryResponse = this.categoryResourceRef.value;

  addBlogPostFormGroup = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),

    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),

    categories: new FormControl<string[]>([]),
    
  });

  onSubmit(){
    const formRawValue = this.addBlogPostFormGroup.getRawValue();

    console.log(formRawValue);

    const requestDto : AddBlogPostRequest = {
      title: formRawValue.title,
      shortDescription: formRawValue.shortDescription,
      content: formRawValue.content,
      author: formRawValue.author,
      featuredImageUrl: formRawValue.featuredImageUrl,
      isVisible: formRawValue.isVisible,
      urlHandle: formRawValue.urlHandle,
      publishedDate: new Date(formRawValue.publishedDate),
      categories: formRawValue.categories ?? []

    };
    console.log (formRawValue)

    this.blogPostService.createBlogPost(requestDto)
    .subscribe({
      next: (response) => {
        console.log(response)

        //navigate to the BLog Post list
        this.router.navigate(['/admin/blogposts'])
      },
      error: (err) => {
        console.error('Something went wrong');
        console.error(err);
      }
    })


  }

  openImageSelector(){
    this.imageSelectorService.displayImageSelector();
  }

}
