import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'posts-new-posts',
  templateUrl: './new-posts.component.html',
  styles: [
  ]
})
export class NewPostsComponent implements OnInit, OnDestroy {
  newPosts: Post[] = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this._getNewPosts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getNewPosts() {
    this.postsService
      .getPosts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(posts => this.newPosts = posts.slice(-4));
  }
}
