import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApisService } from '../apis.service';


@Component({
  selector: 'app-upload-books',
  templateUrl: './upload-books.component.html',
  styleUrl: './upload-books.component.scss'
})
export class UploadBooksComponent {

  bookData: any[] = [];

  constructor(private _service: ApisService) { }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = <any[][]>XLSX.utils.sheet_to_json(ws, { header: 1 });

      const errors: string[] = [];

      this.bookData = data.slice(1).map((row, index) => {
        const bookName = row[0];
        const isbn = row[1];
        const authorId = row[2];

        if (!bookName || !isbn || !authorId) {
          errors.push(`Row ${index + 2}: Missing data for bookName, isbn, or authorId`);
        }

        if (!this.isValidISBN(isbn)) {
          errors.push(`Row ${index + 2}: Invalid ISBN format (${isbn})`);
        }

        return {
          bookName: bookName,
          isbn: isbn,
          authorId: authorId
        };
      });

      if (errors.length > 0) {
        this.bookData = [];
        console.error('Validation Errors:', errors);
        alert('Validation Errors:\n' + errors.join('\n'));
      } else {
        console.log('Valid data:', this.bookData);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  isValidISBN(isbn: string): boolean {
    return isbn.length >= 10;
  }

  onUpload() {
    if (this.bookData.length) {
      console.log('Data ready for upload:', this.bookData);
      this._service.postBooks(this.bookData).subscribe();
      alert('Data uploaded successfully to the database!');
    } else {
      alert('Please upload a valid Excel file.');
    }
  }

}