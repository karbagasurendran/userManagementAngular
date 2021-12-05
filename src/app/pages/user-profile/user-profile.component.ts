import { Component, OnInit, ViewChild } from '@angular/core';
// import { AddEmployeePage } from 'src/app/modals/add-employee/add-employee.page';
// import { BulkImportPage } from 'src/app/modals/bulk-import/bulk-import.page';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UpdateDialogBoxComponent } from '../update-dialog-box/update-dialog-box.component';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { environment } from 'src/environments/environment';

export interface employee {
  id: number;
  image : string;
  name: string;
  mobileNumber: number;
  emailId: string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  displayedColumns: string[] = ['id','image', 'name', 'mobileNumber', 'emailId', 'actions'];
  dataSource = new MatTableDataSource();
  allUserList: object
  userTableArray: employee[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private api: ApiService,
    public router: Router,
    public dialog: MatDialog  ) {
   }

  ngOnInit() {
    this.api.getToken();
    this.userTableArray = [];
    this.api.getuser().subscribe(
      data => {
        this.allUserList = data;
        console.log("tsfile"+data);
        for (const key in this.allUserList) {
          if (this.allUserList.hasOwnProperty(key)) {
            const element = this.allUserList[key]
            this.userTableArray.push(element);
          }
        }
        console.log(this.userTableArray)
        this.dataSource = new MatTableDataSource(this.userTableArray);
        this.dataSource.paginator = this.paginator;
      }
    )
  }
 
  addUser() {
   var dialogRef= this.dialog.open(DialogBoxComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.ngOnInit();
    });
    this.ngOnInit();
  }

  async updateUser(i: any) {
    console.log(i);
    var dialogRef= this.dialog.open(UpdateDialogBoxComponent,{
      data: i,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.ngOnInit();
    });
  }

  async deleteUser(i:any) {
    var dialogRef= this.dialog.open(DeleteDialogBoxComponent,{
      width: '250px',
      data: i,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.ngOnInit();
    });
  }


  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/login');
  }

  opensheet(){
    window.open( 
      environment.sheetlink, "_blank");
  }
}
