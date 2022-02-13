import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiURLComments = environment.apiUrl + 'comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURLComments);
  }

  getComment(commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiURLComments}/${commentId}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiURLComments, comment);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiURLComments}/${comment.id}`, comment);
  }

  deleteComment(commentId: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiURLComments}/${commentId}`);
  }
}
