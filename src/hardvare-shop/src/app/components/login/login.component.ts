import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = []

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  private async fetchUsers(): Promise<void> {
    this.users = await this.usersService.getUsers().toPromise();
  }

  login(user: User): void {
    this.usersService.setCurrentUser(user);
    this.router.navigate(['/home'])
  }
}
