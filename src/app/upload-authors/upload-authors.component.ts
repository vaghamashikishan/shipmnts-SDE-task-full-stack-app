import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-authors',
  templateUrl: './upload-authors.component.html',
  styleUrl: './upload-authors.component.scss'
})
export class UploadAuthorsComponent {

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
        authorName: row[0],
        authorEmail: row[1],
        authorDOB: this.convertDate(row[2]),
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

  convertDate(dateString: string): string {
    if (/^\d+(\.\d+)?$/.test(dateString)) {
      const excelDate = parseFloat(dateString);
      const date = new Date((excelDate - 25569) * 86400 * 1000);
      return date.toISOString().split('T')[0];
    }
    return dateString;
  }
}
