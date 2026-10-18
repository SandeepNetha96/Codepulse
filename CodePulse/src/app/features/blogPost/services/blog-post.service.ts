import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, InputSignal } from '@angular/core';
import { AddBlogPostRequest, BlogPost, UpdateBlogPostRequest } from '../models/blogPost.model';
import { Observable } from 'rxjs';
import { environment } from '../../../evnironments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor() { }

  private apiBaseUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  //For Creating a new blogPost
  createBlogPost(data : AddBlogPostRequest) : Observable<BlogPost> {

    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/blogposts`, data)
    
  }

  getAllBlogPosts(): HttpResourceRef<BlogPost[] | undefined>{
    return httpResource<BlogPost[]>(()=> `${this.apiBaseUrl}/api/blogposts`);
  }


  getBlogPostById(id: InputSignal<string | undefined>): HttpResourceRef<BlogPost | undefined> {
    return httpResource<BlogPost>( ()=> `${this.apiBaseUrl}/api/blogposts/${id()}`);
  }

  getBlogPostByUrlHandle(urlHandle: InputSignal<string | undefined>): HttpResourceRef<BlogPost | undefined>{
    return httpResource<BlogPost>( () => `${this.apiBaseUrl}/api/blogposts/${urlHandle()}`);
  }

  editBlogPostById(id:string, body: UpdateBlogPostRequest) : Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`, body);
  }

  deleteBlogPostById(id:string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`);
  }

}
