import { Component, OnInit } from '@angular/core';
import { AuthService } from '@frontend/users';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'admin-responsive-menu',
  templateUrl: './responsive-menu.component.html',
  styles: []
})
export class ResponsiveMenuComponent implements OnInit {
  items: MenuItem[];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dango Shop',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Thống kê',
            icon: 'pi pi-fw pi-home',
            routerLink: "/dashboard",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Sản phẩm',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: "/products",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Danh mục',
            icon: 'pi pi-fw pi-list',
            routerLink: "/categories",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Đơn hàng',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: "/orders",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Đánh giá',
            icon: 'pi pi-fw pi-comment',
            routerLink: "/comments",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Bài viết',
            icon: 'pi pi-fw pi-book',
            routerLink: "/posts",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Người dùng',
            icon: 'pi pi-fw pi-external-link',
            routerLink: "/users",
            command: () => this.items[0].expanded = false
          },
          {
            label: 'Đăng xuất',
            icon: 'pi pi-fw pi-sign-out',
            command: () => this.authService.logout()
          }
        ]
      }
    ]
  }
}
