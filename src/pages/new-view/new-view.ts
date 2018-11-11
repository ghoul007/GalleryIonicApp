import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { NatureViewService } from '../../services/natureview.service';
import { NatureView } from '../../models/NatureView.model';

@IonicPage()
@Component({
  selector: 'page-new-view',
  templateUrl: 'new-view.html',
})
export class NewViewPage implements OnInit {
  naureViewForm: FormGroup
  latitude: number;
  longitude: number;
  imageUrl: string;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private natureviewService: NatureViewService,
    private camera: Camera,
    private toast: ToastController,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.naureViewForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
      description: ['']
    })
  }


  onTakePhoto() {

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then((data) => {
      if (data) {
        this.imageUrl = normalizeURL(data);
      }
    }).catch((error) => {
      this.toast.create({
        message: error,
        duration: 3000,
        position: 'bottom'
      }).present();

    })
  }

  onSubmitform() {
    let newView = new NatureView(
      this.naureViewForm.get('name').value,
      new Data(),
      this.naureViewForm.get('description').value,
      0,
      0,
      this.imageUrl
    )

    this.natureviewService.addNatureView(newView)
    this.navCtrl.pop();
  }
}
