import { Component, inject } from '@angular/core';
import { BlogPostService } from '../../blogPost/services/blog-post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  blogPostService = inject(BlogPostService);

  blogPostsRef = this.blogPostService.getAllBlogPosts();

  isLoading = this.blogPostsRef.isLoading;
  blogPostsResponse = this.blogPostsRef.value;



}
