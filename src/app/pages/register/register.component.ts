import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Router } from '@angular/router';
interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userDataArray : any;
  shortLink: string = "";
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

  constructor(
    private api : ApiService,
    public router: Router,
  ) { }

  ngOnInit() {
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
    console.log(this.adduserForm.value);
    this.api.register(this.adduserForm.value).subscribe(
      async data => {
   console.log("registered");
   this.router.navigateByUrl('/login');
  });
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
    this.router.navigateByUrl('/login');
  }

}
