import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'posts-posts-list',
  templateUrl: './posts-list.component.html',
  styles: [
  ]
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this._getPosts();
  }

  private _getPosts() {
    this.postsService
      .getPosts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(posts => this.posts = posts);
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

}
