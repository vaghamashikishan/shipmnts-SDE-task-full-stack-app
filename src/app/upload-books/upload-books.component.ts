import { Component } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-upload-books',
  templateUrl: './upload-books.component.html',
  styleUrl: './upload-books.component.scss'
})
export class UploadBooksComponent {

  bookData: any[] = [];

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

      this.bookData = data.slice(1).map(row => ({
        bookName: row[0],
        isbn: row[1],
        authorId: row[2],
      }));
      console.log(data);

    };
    reader.readAsBinaryString(target.files[0]);
  }

  onUpload() {
    if (this.bookData.length) {
      console.log('Data ready for upload:', this.bookData);
      alert('Data uploaded successfully!');
    } else {
      alert('Please upload a valid Excel file.');
    }
  }

}