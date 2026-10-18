import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageSelectorService } from '../../services/image-selector.service';
import { BlogImage } from '../../models/image.model';
import { RouterLink } from '@angular/router';
import { NgStyle } from '../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {

  private imageSelectorService = inject(ImageSelectorService);

  showImageSelector = this.imageSelectorService.showImageSelector.asReadonly();

  id = signal<string | undefined>(undefined);

  imageRef = this.imageSelectorService.getAllImages(this.id);
  isLoading = this.imageRef.isLoading;
  images = this.imageRef.value;

  imageSelectorUploadForm = new FormGroup({
    file: new FormControl<File | null | undefined>(null, {nonNullable:true, validators: [Validators.required]}),
    name: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.maxLength(100)]}),
    title: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.maxLength(100)]})

  })

  hideImageSelector(){
    this.imageSelectorService.hideImageSelector();
  }

  onFileSelected(event: Event){
    const input = event?.target as HTMLInputElement;

    if(!input.files || input.files.length == 0){
      return;
    }

    const file = input.files[0];
    this.imageSelectorUploadForm.patchValue({
      file: file
    });
  }

  onSelectImage(image: BlogImage){
    
    this.imageSelectorService.selectImage(image.url);
  }

  onSubmit(){
    if(this.imageSelectorUploadForm.valid){
      //output
      const formRawValue = this.imageSelectorUploadForm.getRawValue();

      console.log(formRawValue);

      this.imageSelectorService.uploadImage(formRawValue.file!, formRawValue.name, formRawValue.title)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Successful');
          this.id.set(response.id);
          this.imageSelectorUploadForm.reset();
        },

        error: (err) =>{
          alert("Image Upload failed");
          console.error(err);

        }
      });
    }
  }

}
