import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'posts-post-page',
  templateUrl: './post-page.component.html',
  styles: [
  ]
})
export class PostPageComponent implements OnInit, OnDestroy {
  post: Post;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.postId) {
        this._getPost(params.postId);
      }
    })
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getPost(id: string) {
    this.postsService
      .getPost(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(post => this.post = post);
  }
}
