import { Component, effect, inject, input } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/Services/category.service';
import { UpdateBlogPostRequest } from '../models/blogPost.model';
import { Router } from '@angular/router';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageSelectorService } from '../../../shared/services/image-selector.service';

@Component({
  selector: 'app-edit-blog-post',
  imports: [ReactiveFormsModule, MarkdownComponent, ImageSelectorComponent],
  templateUrl: './edit-blog-post.component.html',
  styleUrl: './edit-blog-post.component.css'
})
export class EditBlogPostComponent {

  id = input<string>();

  blogPostService = inject(BlogPostService);
  categoryService = inject(CategoryService);
  imageSelectorService = inject(ImageSelectorService);

  router = inject(Router)

  private blogPostRef = this.blogPostService.getBlogPostById(this.id);
  blogPostResponse = this.blogPostRef.value;

  private categoryRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoryRef.value;
  
    editBlogPostFormGroup = new FormGroup({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)],
      }),
      shortDescription: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(300)],
      }),
      content: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10)],
      }),
      featuredImageUrl: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(300)],
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

  effectRef = effect(()=> {

    if(this.blogPostResponse()){

      this.editBlogPostFormGroup.patchValue({
        title: this.blogPostResponse()?.title,
        shortDescription: this.blogPostResponse()?.shortDescription,
        content: this.blogPostResponse()?.content,
        author: this.blogPostResponse()?.author,
        featuredImageUrl: this.blogPostResponse()?.featuredImageUrl,
        isVisible: this.blogPostResponse()?.isVisible,
        publishedDate: new Date (this.blogPostResponse()?.publishedDate!).toISOString().split('T')[0],
        urlHandle: this.blogPostResponse()?.urlHandle,
        categories: this.blogPostResponse()?.categories.map(x => x.id)
      })
    }
  });

  selectedImageEffectRef = effect( ()=>{
    const selectedImageUrl = this.imageSelectorService.selectedImage();
    if(selectedImageUrl){
      this.editBlogPostFormGroup.patchValue({
        featuredImageUrl: selectedImageUrl
      });
    }
  });




  onSubmit(){

    //alert('Endtered')
    const id = this.id();

    if(this.editBlogPostFormGroup.valid){
        alert('valid');
    }else{
      alert(this.editBlogPostFormGroup.valid);

      Object.keys(this.editBlogPostFormGroup.controls).forEach(key => {
        const control = this.editBlogPostFormGroup.get(key);

        if(control?.valid){
          console.log('Invalid Control:', key);
          console.log('Error:', control.errors);
          console.log('Value:', control.value);

          alert(key+" Error in: "+JSON.stringify(control.errors));
        }


      });
    }

    if(id && this.editBlogPostFormGroup.valid){
      
      
      const formRawValue = this.editBlogPostFormGroup.getRawValue();
  
      const updateBlogPostRequest : UpdateBlogPostRequest = {
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
  
      this.blogPostService.editBlogPostById(id, updateBlogPostRequest)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Update Successful')

          this.router.navigate(["admin/blogposts"]);

        },
        error: (err) => {
          console.error(err);
          alert('Something went wrong')
        }
      });
    }


  }

  onDelete(){
    const id = this.id();

    if(id){
      this.blogPostService.deleteBlogPostById(id).subscribe({
        next: ()=> {
          alert("BlogPost Successfully Deleted");
          this.router.navigate(["/admin/blogposts"]);
        },

        error: (err)=>{
          alert("ERROR: Could not delete BlogPost");
          console.error(err);
        }
      })
    }
  }

  openImageSelector(){
    this.imageSelectorService.displayImageSelector();
  }

}
