import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { from } from 'rxjs';
import {MaterialsModule} from './modules/materials/materials.module';
import { DialogBoxComponent } from './pages/dialog-box/dialog-box.component';
import { UpdateDialogBoxComponent } from './pages/update-dialog-box/update-dialog-box.component';
import { DeleteDialogBoxComponent } from './pages/delete-dialog-box/delete-dialog-box.component';
// import { AccessService } from './services/access.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    DialogBoxComponent,
    UpdateDialogBoxComponent,
    DeleteDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    MaterialsModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AccessService, multi: true },

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
