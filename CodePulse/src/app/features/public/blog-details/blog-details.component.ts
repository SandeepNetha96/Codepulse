import { Component, inject, input } from '@angular/core';
import { BlogPostService } from '../../blogPost/services/blog-post.service';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {

  url = input<string | undefined>();
  blogPostService = inject(BlogPostService);

  //Fetch the blog details using URL

  blogDetailsRef = this.blogPostService.getBlogPostByUrlHandle(this.url);
  isLoading = this.blogDetailsRef.isLoading;
  blogDetailsResponse = this.blogDetailsRef.value;

}
