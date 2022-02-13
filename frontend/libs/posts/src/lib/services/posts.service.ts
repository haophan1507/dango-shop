import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  apiURLPosts = environment.apiUrl + 'posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURLPosts);
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiURLPosts}/${postId}`);
  }

  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiURLPosts, postData);
  }

  updatePost(postData: FormData, postId: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiURLPosts}/${postId}`, postData);
  }

  deletePost(postId: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiURLPosts}/${postId}`);
  }
}
