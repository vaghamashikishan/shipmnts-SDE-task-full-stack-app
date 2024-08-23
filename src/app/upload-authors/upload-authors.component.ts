import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-authors',
  templateUrl: './upload-authors.component.html',
  styleUrl: './upload-authors.component.scss'
})
export class UploadAuthorsComponent {

  authorData: any[] = [];
  isValidData: boolean = false;
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

      this.authorData = data.slice(1).map((row, index) => {
        const authorEmail = row[1];
        const authorDOB = this.convertDate1(row[2]);

        if (!this.isValidEmail(authorEmail)) {
          errors.push(`Row ${index + 2}: Invalid email format (${authorEmail})`);
        }

        if (!this.isValidDate(authorDOB)) {
          errors.push(`Row ${index + 2}: Invalid date of birth (${row[2]})`);
        }

        return {
          authorName: row[0],
          authorEmail: authorEmail,
          authorDOB: authorDOB
        };
      });

      if (errors.length > 0) {
        this.authorData = [];
        console.error('Validation Errors:', errors);
        alert('Validation Errors:\n' + errors.join('\n'));
      } else {
        this.isValidData = true;
        console.log('Valid data:', this.authorData);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isValidDate(date: string): boolean {
    return !isNaN(Date.parse(date));
  }

  convertDate(excelDate: any): string {
    return new Date(excelDate).toISOString().split('T')[0];
  }


  onUpload() {
    if (this.authorData.length) {
      console.log('Data ready for upload:', this.authorData);
      alert('Data uploaded successfully!');
    } else {
      alert('Please upload a valid Excel file.');
    }
  }

  convertDate1(dateString: string): string {
    if (/^\d+(\.\d+)?$/.test(dateString)) {
      const excelDate = parseFloat(dateString);
      const date = new Date((excelDate - 25569) * 86400 * 1000);
      return date.toISOString().split('T')[0];
    }
    return dateString;
  }
}
