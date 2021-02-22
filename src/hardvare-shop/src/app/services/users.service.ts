import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = `${environment.serverAddress}/users`;
  private currentUser: BehaviorSubject<User|null> = new BehaviorSubject<User | null>(null);
  private currentUser$: Observable<User | null> = this.currentUser.asObservable();

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  getCurrentUser(): Observable<User | null> {
    if (!this.currentUser.value) {
      const sessionUser: string = sessionStorage.getItem('currentUser') || '';
      if (!!sessionUser) {
        this.currentUser!.next(new User(JSON.parse(sessionUser)));
      }
    }

    return this.currentUser$;
  }

  setCurrentUser(user: User): void {
    this.currentUser.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user.asJSON));
  }

  clearCurrentUser(): void {
    this.currentUser.next(null);
    sessionStorage.removeItem('currentUser');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      map(products => products.map( user => new User(user)))
    );
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(
      this.url,
      user
    );
  }

  updateUser(user: User): Observable<void> {
    this.setCurrentUser(user);
    return this.http.put<void>(
      `${this.url}/${user.id}`,
      user
    );
  }

  deleteUser(user: User): Observable<void> {
    return this.http.delete<void>(`${this.url}/${user.id}`);
  }
}
