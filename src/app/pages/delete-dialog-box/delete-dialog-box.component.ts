import { Component, OnInit,Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  _id:string,
  userName : string,
  password : string,
  mobileNumber : number,
  userId : number,
  emailId : string,
}

@Component({
  selector: 'app-delete-dialog-box',
  templateUrl: './delete-dialog-box.component.html',
  styleUrls: ['./delete-dialog-box.component.css']
})
export class DeleteDialogBoxComponent implements OnInit {
id:any
  constructor(private api : ApiService,public dialogRef: MatDialogRef<DeleteDialogBoxComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
this.id=this.data._id
console.log(this.id);
  }

  userDelete(){
  
this.api.deleteUserById(this.id).subscribe((result)=>{
  console.log(result);
})
  this.dialogRef.close();
  }

}
