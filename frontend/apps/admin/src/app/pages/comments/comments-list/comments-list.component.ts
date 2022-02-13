import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment, CommentsService } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-comments-list',
  templateUrl: './comments-list.component.html',
  styles: [
  ]
})
export class CommentsListComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  endsubs$: Subject<void> = new Subject;

  constructor(
    private commentsService: CommentsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getComments();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getComments() {
    this.commentsService.getComments().pipe(takeUntil(this.endsubs$)).subscribe(comments => this.comments = comments);
  }

  deleteComment(commentId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa không?',
      header: 'Xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentsService
          .deleteComment(commentId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(() => {
            this._getComments();
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đánh giá đã bị xóa' });
          }, () => {
            this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
          });
      }
    });
  }
}