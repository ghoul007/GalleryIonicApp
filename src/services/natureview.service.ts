import { NatureView } from "../models/NatureView.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class NatureViewService {

    private natureViewList: NatureView[] = [];

    natureViewList$ = new Subject<NatureView[]>()


    constructor(private storage: Storage) {

    }
    emitList() {
        this.natureViewList$.next(this.natureViewList)
    }

    addNatureView(view: NatureView) {
        this.natureViewList.push(view);
        this.saveList();
        this.emitList();

    }

    saveList() {
        this.storage.set('views', this.natureViewList);
    }

    fetchList() {
        this.storage.get('views').then(
            (list) => {
                if (list && list.length) {
                    this.natureViewList = list.slice();
                }
                this.emitList();
            }
        )

    }

}