import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadBooksComponent } from './upload-books/upload-books.component';
import { UploadAuthorsComponent } from './upload-authors/upload-authors.component';

const routes: Routes = [
  { path: '', component: UploadBooksComponent },
  { path: 'books', component: UploadBooksComponent },
  { path: 'authors', component: UploadAuthorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
