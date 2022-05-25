import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import {Router} from "@angular/router";

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QrcodeComponent implements OnInit {

  @ViewChild(QrScannerComponent, {static: false}) qrScannerComponent!: QrScannerComponent;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0){
        let choosenDev;
        for (const dev of videoDevices){
          if (dev.label.includes('front')){
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      this.router.navigate(["product-details",result]).then(r => {
        console.log(`Going to product ${result}`);
      });
    });
  }
}
