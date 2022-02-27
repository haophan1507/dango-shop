import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostsComponent } from './components/new-posts/new-posts.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostsListComponent } from './pages/posts-list/posts-list.component';
import { CardModule } from 'primeng/card';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsListComponent
  },
  {
    path: 'posts/:postId',
    component: PostPageComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PostItemComponent,
    NewPostsComponent,
    PostsListComponent,
    PostPageComponent
  ],
  exports: [
    PostItemComponent,
    NewPostsComponent,
    PostsListComponent,
    PostPageComponent
  ]
})
export class PostsModule {}
