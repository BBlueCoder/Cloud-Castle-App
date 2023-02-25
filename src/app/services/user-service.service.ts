import { UserResponse } from './response-interfaces/user-response';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http-service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends HttpService {

  constructor(http: HttpClient) { 
    super("http://localhost:3000/api/users/",http);
  }

  signup(body: {}){
    return this.post<UserResponse>("signup",body)
  }

  login(body: {}){
    return this.post<UserResponse>("login",body)
  }
}
