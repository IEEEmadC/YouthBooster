import { FileChooser } from '@ionic-native/file-chooser';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Project } from '../../modals/project.modal';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var window: any;

@Injectable()

export class PictureUtils {
  imagesToSave: Array<any> = new Array;
  filesToSave: Array<any> = new Array;
  

  private takePictureOptions: CameraOptions = {
    allowEdit: false,
    saveToPhotoAlbum: true,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: this.camera.Direction.BACK,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  private galleryOptions: CameraOptions = {
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 720,
    targetHeight: 720,
    correctOrientation: true
  }

  constructor(
    public afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private fileChooser: FileChooser,
    private camera: Camera) {

  }

  //Take a picture and return a promise with the image data
  uploadFromCamera() {
    this.camera.getPicture(this.takePictureOptions).then((imagePath) => {
      alert('got image path ' + imagePath);
      return this.makeFileIntoBlob(imagePath,'image');//convert picture to blob
    }).then((imageBlob) => {
      alert('got image blob ' + imageBlob);
      return this.uploadToFirebase(imageBlob,'image','images/');//upload the blob
    }).then((uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      return this.saveToDatabase(uploadSnapshot);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  //open the gallery and Return a promise with the image data
  uploadFromGallery() {
    this.camera.getPicture(this.galleryOptions).then((imagePath) => {
      alert('got image path ' + imagePath);
      return this.makeFileIntoBlob(imagePath,'image');//convert picture to blob
    }).then((imageBlob) => {
      alert('got image blob ' + imageBlob);
      return this.uploadToFirebase(imageBlob,'image','images/');//upload the blob
    }).then((uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      return this.saveToDatabase(uploadSnapshot);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  //open the gallery and Return a promise with the image data
  uploadFile() {
    this.fileChooser.open().then(filePath => {
      alert('got file path ' + filePath);
      return this.makeFileIntoBlob(filePath,'file');//convert picture to blob
    }).then((fileBlob) => {
      alert('got file blob ' + fileBlob);
      return this.uploadToFirebase(fileBlob,'file',"files/");//upload the blob
    }).then((uploadSnapshot: any) => {
      alert('file uploaded successfully ' + uploadSnapshot.downloadURL);
      return this.saveToDatabase(uploadSnapshot);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }


  makeFileIntoBlob(_imagePath, type:string) {
    // simple check wether it's a pdf or image 
    let mimeType: string;
    let sampleName: string;
    if(type == 'file') {
      mimeType = 'application/pdf';
      sampleName = 'sample.pdf';
    }
    else {
      mimeType = 'image/jpeg';
      sampleName = 'sample.jpg';
    }
    // return the blob 
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: mimeType });
            imgBlob.name = sampleName;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  //Upload picture to the firebase storage
  uploadToFirebase(imgBlob: any, type: string, basePath: string) {
    // simple check wether it's a pdf or image 
    let mimeType: string;
    let fileExtension: string;
    if(type == 'file') {
      mimeType = 'application/pdf';
      fileExtension = '.pdf';
    }
    else {
      mimeType = 'image/jpeg';
      fileExtension = '.jpg';
    }
    var randomNumber = new Date().getTime().toString();
    console.log('Random number : ' + randomNumber);
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(basePath + randomNumber + fileExtension);//Firebase storage main path

      let metadata: firebase.storage.UploadMetadata = {
        contentType: mimeType,
      };

      let uploadTask = storageRef.put(imgBlob, metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // upload in progress
          let progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
          console.log(progress);
        },
        (error) => {
          // upload failed
          console.log(error);
          reject(error);
        },
        () => {
          // upload success
          let url = uploadTask.snapshot.downloadURL
          console.log('Saved picture url', url);
          resolve(uploadTask.snapshot);
        });
    });
  }

  saveToDatabase(uploadSnapshot) {
    /*
    var ref = firebase.database().ref('assets');

    return new Promise((resolve, reject) => {

      // we will save meta data of image in database
      var dataToSave = {
        'URL': uploadSnapshot.downloadURL, // url to access file
        'name': uploadSnapshot.metadata.name, // name of the file
        'lastUpdated': new Date().getTime(),
      };

      ref.push(dataToSave, (response) => {
        resolve(response);
      }).then((error) => {
        reject(error);
      });
    });
    */
  }


  pushToDatabase(project) {
    var ref = firebase.database().ref('projects');

    return new Promise((resolve, reject) => {
      // we will save meta data of image in database
      ref.push(project, (response) => {
        resolve(response);
      }).then((error) => {
        reject(error);
      });
    });
  }

  /*
  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.storage.ref('images');
      let imageRef = storageRef.child(new Date().getTime().toString());
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  
  uploadToStorage(imageURI):Promise<any>{
    let newName = `${new Date().getTime()}.jpg`;
    // let newName = new Date().getTime().toString();

    return new Promise<any>((resolve, reject) => {
      let storageRef = this.storage.ref('images');
      this.encodeImageUri(imageURI, function(image64){
        this.storage.ref(`images/${newName}`).putString(image64)
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })

  }
  */
}
