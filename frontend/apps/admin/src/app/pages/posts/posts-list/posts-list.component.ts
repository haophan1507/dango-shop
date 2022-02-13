import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, PostsService } from '@frontend/posts';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-posts-list',
  templateUrl: './posts-list.component.html',
  styles: [
  ]
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  endsubs$: Subject<void> = new Subject;

  constructor(
    private postsService: PostsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getPosts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deletePost(postId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa không?',
      header: 'Xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postsService
          .deletePost(postId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(() => {
            this._getPosts();
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bài viết đã bị xóa' });
          }, () => {
            this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
          });
      }
    });
  }

  updatePost(postId: string) {
    this.router.navigateByUrl(`posts/form/${postId}`)
  }

  private _getPosts() {
    this.postsService.getPosts().pipe(takeUntil(this.endsubs$)).subscribe(cats => this.posts = cats);
  }

}
