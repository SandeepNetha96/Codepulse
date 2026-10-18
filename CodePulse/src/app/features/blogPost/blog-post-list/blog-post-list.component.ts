import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-blog-post-list',
  imports: [RouterLink],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})
export class BlogPostListComponent {

  blogPostService = inject(BlogPostService);

  getAllBlogPostRef = this.blogPostService.getAllBlogPosts();

  isLoading = this.getAllBlogPostRef.isLoading;
  error = this.getAllBlogPostRef.error;

  response = this.getAllBlogPostRef.value;
  statusCode = this.getAllBlogPostRef.statusCode;

}
