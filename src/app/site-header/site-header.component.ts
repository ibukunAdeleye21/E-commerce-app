import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { IUser } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  cartLength: number = 0;
  user: IUser | null = null;
  showMenu: boolean = false;
  showChangePasswordMenu: boolean = false;

  constructor(private cartService: CartService, private userService: UserService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cartLength = cart.length
    });
    this.userService.getUser().subscribe({
      next: (user) => { this.user = user }
    });
  }

  toggleSignOutMenu() {
    this.showMenu = !this.showMenu;
    this.showChangePasswordMenu = !this.showChangePasswordMenu;
  }

  signOut() {
    this.userService.signOut();
    this.showMenu = false;
    this.userService.isUserLoggedIn.next(false);
  }
}
