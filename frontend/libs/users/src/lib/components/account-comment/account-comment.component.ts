import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { OrderItem } from '@frontend/orders';
import { MessageService } from 'primeng/api';
import { Comment } from '../../models/comment';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-account-comment',
  templateUrl: './account-comment.component.html'
})
export class AccountCommentComponent implements OnInit {
  @Input() orderItem: OrderItem;
  form: FormGroup;
  isSubmitted = false;
  currentUserId = '';
  arrSuggest = [
    {
      message: 'Chất lượng sản phẩm tuyệt vời',
      select: false
    },
    {
      message: 'Đóng gói sản phẩm rất đẹp và chắc chắn',
      select: false
    },
    {
      message: 'Shop phục vụ rất tốt',
      select: false
    },
    {
      message: 'Rất đáng tiền',
      select: false
    },
    {
      message: 'Thời gian giao hàng rất nhanh',
      select: false
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      rating: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.usersService.observeCurrentUser().subscribe(user => this.currentUserId = user.id);

    const product: any = this.orderItem.product;
    const productId = product.id;

    const description =
      `${this.ratingForm.description.value} ${this.arrSuggest.filter(item => item.select === true).map(item => item.message).join(', ')}`;

    const comment: Comment = {
      product: productId,
      user: this.currentUserId,
      orderItem: this.orderItem.id,
      description: description,
      rating: this.ratingForm.rating.value,
    }

    this.usersService.createComment(comment).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `Đánh giá thành công`
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: 'Vui lòng thử lại'
        });
      }
    );
  }

  handleSelect(i) {
    this.arrSuggest[i].select = !this.arrSuggest[i].select;

  }

  get ratingForm() {
    return this.form.controls;
  }
}
