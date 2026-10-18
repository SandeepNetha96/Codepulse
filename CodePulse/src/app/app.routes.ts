import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { AddBlogPostComponent } from './features/blogPost/add-blog-post/add-blog-post.component';
import { BlogPostListComponent } from './features/blogPost/blog-post-list/blog-post-list.component';
import { EditBlogPostComponent } from './features/blogPost/edit-blog-post/edit-blog-post.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

export const routes: Routes = [

    {
        path: '', component: HomeComponent
    },
    {
        path: 'blog/:url', component: BlogDetailsComponent
    },

    {
        path: 'admin/categories', component: CategoryListComponent
    },
    {
        path: 'admin/categories/add', component: AddCategoryComponent
    },
    {
        path: 'admin/categories/edit/:id', component: EditCategoryComponent
    },
    {
        path: 'admin/blogposts', component: BlogPostListComponent
    },
    {
        path: 'admin/blogposts/add', component: AddBlogPostComponent
    },
    {
        path: 'admin/blogposts/edit/:id', component: EditBlogPostComponent
    },

    
];
