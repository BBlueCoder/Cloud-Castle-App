import { InterceptorService } from './services/interceptor.service';
import { FileService } from './services/file-service.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilesDisplayComponent } from './files-display/files-display.component';
import { FileItemComponent } from './file-item/file-item.component';
import { UseHttpImagePipe } from './pipes/use-http-image.pipe';
import { MediaPresenterComponent } from './media-presenter/media-presenter.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent,
  children: [
    {
      path: '',
      component: FilesDisplayComponent
    },
    {
      path: 'filetype/:type',
      component: FilesDisplayComponent
    }
  ] }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    FilesDisplayComponent,
    FileItemComponent,
    UseHttpImagePipe,
    MediaPresenterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    DataService,
    FileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
