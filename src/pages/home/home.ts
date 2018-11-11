import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NatureView } from '../../models/NatureView.model';
import { NatureViewService } from '../../services/natureview.service';
import { Subscription } from 'rxjs/Subscription';
import { NewViewPage } from '../new-view/new-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  natureViewList: NatureView[];
  natureViewSubscription: Subscription;
  newViewPage = NewViewPage
  constructor(public navCtrl: NavController, private natureViewService: NatureViewService) {

  }


  ngOnInit() {
    this.natureViewSubscription = this.natureViewService.natureViewList$.subscribe(
      (data) => {
        this.natureViewList = data
      })
    this.natureViewService.emitList();
  }

  ngOnDestroy() {
    this.natureViewSubscription.unsubscribe()
  }

}
