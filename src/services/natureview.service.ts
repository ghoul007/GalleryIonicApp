import { NatureView } from "../models/NatureView.model";
import { Subject } from "rxjs/Subject";

export class NatureViewService {

    private natureViewList: NatureView[] = [];

    natureViewList$ = new Subject<NatureView[]>()

    emitList() {
        this.natureViewList$.next(this.natureViewList)
    }

    addNatureView(view: NatureView) {
        this.natureViewList.push(view);
        this.emitList();
    }

}