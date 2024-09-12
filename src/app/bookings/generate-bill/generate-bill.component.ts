// import { Component, Inject } from '@angular/core';
// // import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-generate-bill',
//   templateUrl: './generate-bill.component.html',
//   styleUrl: './generate-bill.component.css'
// })
// export class GenerateBillComponent {
//   customerDetails:any
//   total: number = 0;

//   constructor(@Inject(MAT_DIALOG_DATA) public data:any){
//     this.customerDetails = data
//     console.log('this.customerDetails', this.customerDetails.customerName);

//   }
//   items: Array<{ description: string, amount: any }> = [{ description: '', amount: null }];

//   removeItem(index: number) {
//     this.items.splice(index, 1);
//     this.updateTotal();
//   }

//   addItem() {
//     this.items.push({ description: '', amount: null });
//   }

//   generatePDF() {
//     const billElement:any = document.querySelector('.bill-container')!;
//     html2canvas(billElement).then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf :any = new jsPDF();
//       pdf.addImage(imgData, 'PNG', 0, 0);
//       pdf.save(this.customerDetails.customerName +'.pdf');
//     });
//   }

//   updateTotal() {
//     this.total = this.items.reduce((sum, item) => sum + (item.amount || 0), 0);
//   }

// }
