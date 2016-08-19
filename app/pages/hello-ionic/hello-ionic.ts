import {Component} from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

//import {Camera} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {

  public base64Image: string;
  public barcodeText: string;
  posts: any;
  static get parameters() {
        return [[Http]];
    }

  constructor(private http:Http) {

  }
  takePicture(){
    this.posts = null;
    BarcodeScanner.scan({
          "preferFrontCamera" : true, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          //"orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   ).then((barcodeData) => {
   //  var headers = new Headers();
   //   headers.append('Authorization', 'Bearer ' + this.token);
   this.barcodeText = 'https://script.google.com/macros/s/AKfycbwInvmuSqdMf9LVwkOyTrxLrRUYemsEDFw5iMqSluz5ZgeQUfc/exec?' + encodeURI(barcodeData.text);
   var url = 'https://script.google.com/macros/s/AKfycbwInvmuSqdMf9LVwkOyTrxLrRUYemsEDFw5iMqSluz5ZgeQUfc/exec?' + encodeURI(barcodeData.text);

    var getResponse = this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
    });;
   // console.log(getResponse);
    return getResponse;
  });

    /*
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
    */
  }
}
