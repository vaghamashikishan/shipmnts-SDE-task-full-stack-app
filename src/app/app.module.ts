import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadBooksComponent } from './upload-books/upload-books.component';
import { UploadAuthorsComponent } from './upload-authors/upload-authors.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadBooksComponent,
    UploadAuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
