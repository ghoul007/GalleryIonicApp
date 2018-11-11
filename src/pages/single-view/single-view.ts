import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NatureView } from '../../models/NatureView.model';

@IonicPage()
@Component({
  selector: 'page-single-view',
  templateUrl: 'single-view.html',
})
export class SingleViewPage implements OnInit {

  natureView: NatureView;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ngOnInit() {
    this.natureView = this.navParams.get('natureview');
  }

}
