import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '@frontend/posts';
import { LocalstorageService, UsersService } from '@frontend/users';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-posts-form',
  templateUrl: './posts-form.component.html',
  styles: [
  ]
})
export class PostsFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentPostId: string;
  userId: string;
  imageDisplay: string | ArrayBuffer;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      user: this.localstorageService.getUserIdFromToken()
    });
    this._getCurrentUser();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid) return;

    const postFormData = new FormData();

    Object.keys(this.postForm).map((key) => {
      postFormData.append(key, this.postForm[key].value);
    })

    if (this.editMode) {
      this._updatePost(postFormData, this.currentPostId);
    } else {
      this._addPost(postFormData);
    }
  }

  private _updatePost(postData: FormData, postsId: string) {
    this.postsService
      .updatePost(postData, postsId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bài viết đã được cập nhật' });
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
      });
  }

  private _addPost(postData: FormData) {
    this.postsService
      .createPost(postData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bài viết mới đã được tạo' });
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
      });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentPostId = params.id;
        this.postsService.getPost(params.id).subscribe(post => {
          this.postForm.title.setValue(post.title);
          this.postForm.description.setValue(post.description);
          this.imageDisplay = post.image;
          this.postForm.image.setValidators([]);
          this.postForm.image.updateValueAndValidity();
        })
      }
    })
  }

  private _getCurrentUser() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
        }
      });
  }

  get postForm() {
    return this.form.controls;
  }

  onCancel() {
    this.location.back();
  }
}
