import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'posts-post-item-horizontal',
  templateUrl: './post-item-horizontal.component.html',
  styles: [
  ]
})
export class PostItemHorizontalComponent {
  @Input() post: Post;

  constructor(
    private router: Router
  ) {}

  handleNavigatePost(postId) {
    this.router.navigateByUrl(`/posts/${postId}`);
  }
}
