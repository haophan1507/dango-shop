import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'posts-post-item',
  templateUrl: './post-item.component.html',
  styles: [
  ]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;

  constructor() {}

  ngOnInit(): void {
  }

}
