import type { IEvents } from "../base/EventEmitter";
import type { View } from "./View";
import type { Model } from "./Model";

class Presenter {
  constructor(private view: View, private model: Model, private events: IEvents) {
    this.view.initialize(model.value, model.animate, model.hide);

    this.events.on('value:changed', () => {
      this.view.changeProgress(this.model.value);
    });

    this.events.on('animate:changed', () => {
      this.view.toggleAnimate(this.model.animate);
    });

    this.events.on('hide:changed', () => {
      this.view.toggleHide(this.model.hide);
    });
  }
}

export default Presenter