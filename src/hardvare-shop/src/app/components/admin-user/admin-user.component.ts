import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  user: User | null = null;
  accessR: boolean = false;
  accessW: boolean = false;

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.fetchUser();
  }

  private async fetchUser() {
    const id: number | null = parseInt(this.route.snapshot.paramMap.get('id') || '', 10) || null;
    this.user = (await this.usersService.getUsers().toPromise())
      .find(user => user.id === id) || new User();
    this.accessR = this.user.hasAccessR;
    this.accessW = this.user.hasAccessW;
  }

  async save(): Promise<void> {
    let access: string[] = this.accessR ? ['R'] : [];
    if (this.accessW) { access.push('W'); }
    this.user!.access = access.join(',');

    if (!this.user!.id) {
      await this.usersService.addUser(this.user!).toPromise();
    } else {
      await this.usersService.updateUser(this.user!).toPromise();
    }
    this.router.navigate(['/admin']);
  }
}
