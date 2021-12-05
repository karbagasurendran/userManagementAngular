import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}
export interface DialogData {
  _id:string,
  userName : string,
  password : string,
  mobileNumber : number,
  userId : number,
  emailId : string,
  image: string
}

@Component({
  selector: 'app-update-dialog-box',
  templateUrl: './update-dialog-box.component.html',
  styleUrls: ['./update-dialog-box.component.css']
})
export class UpdateDialogBoxComponent implements OnInit {
  userDataArray : any
 
  loading: boolean = false; // Flag variable
  images: LocalFile[] = [];
  image:any;
  imagelink:any

  adduserForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    emailId: new FormControl('',[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)]),
    password: new FormControl('',[Validators.required, Validators.minLength(2)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    userId : new FormControl('',[Validators.required, Validators.minLength(1)]),
    image:new FormControl('', Validators.required),
  });
  constructor(private api : ApiService,public dialogRef: MatDialogRef<UpdateDialogBoxComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.adduserForm = new FormGroup({
      userName: new FormControl(this.data['userName']),
      emailId: new FormControl(this.data['emailId']),
      password: new FormControl(this.data['password']),
      mobileNumber: new FormControl(this.data['mobileNumber']),
      userId : new FormControl(this.data['userId']),
      image:new FormControl(this.data['image'], Validators.required),
    });
    this.imagelink=this.data.image
  }

  async takePicture() {
    const options = {
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    };
    const originalPhoto = await Camera.getPhoto(options);
    const savedImageFile = await this.savePicture(originalPhoto);
    console.log(savedImageFile);
  }
  private async savePicture(cameraPhoto: Photo) {
    const fileName = new Date().getTime() + '.jpeg';
this.images.push({
name: fileName,
path: fileName,
data: 'data:image/jpeg;base64,'+cameraPhoto.base64String,
});
for(var i=0;i<this.images.length; i++){
console.log(this.images.length);
console.log(this.images);
this.uploadFile(this.images[i], this.images[i].name);
}
}

async uploadFile( file: LocalFile,fileName:string){
  const response = await fetch(file.data);
const blob = await response.blob();
  const formData = new FormData(); 
  formData.append("file", blob, fileName);
  console.log(formData);
await this.api.saveUserImage(formData).subscribe((data) =>{
   this.imagelink = data;
    console.log(this.image);
    console.log("file successfully uploaded")
    console.log(this.imagelink);
    this.adduserForm.get('image').setValue(this.imagelink);
});
}
  async save() {
    if(this.adduserForm.status === 'INVALID'){
        alert('Please enter details correctly!')
      return;
    }
    this.api.updateUserById(this.data._id,this.adduserForm.value).subscribe(
      async data => {
    
   console.log("updated");
  });
  this.dialogRef.close();
}

get emailId(){
  return this.adduserForm.get('emailId');
}
  get password(){
    return this.adduserForm.get('password');
  }

  get mobileNumber(){
    return this.adduserForm.get('mobileNumber');
  }

  get userId(){
    return this.adduserForm.get('userId');
  }

  get userName(){
    return this.adduserForm.get('userName');
  }
    cancel(){
      this.dialogRef.close();
    }
}
