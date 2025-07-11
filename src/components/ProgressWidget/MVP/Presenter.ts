import type { Model } from "../../Progress/MVP/Model";
import type { IEvents } from "../../Progress/base/EventEmitter";
import type { View } from "./View";

class Presenter {
  constructor(private view: View, private model: Model, private events: IEvents) {
    this.view.setValidateInput(String(model.value));

    this.events.on('settings:changed', this.onSettingsChanged.bind(this));
  }

  onSettingsChanged(data: Event): void {
    const target = data.target as HTMLInputElement;
    switch (target?.title) {
      case "Value":
        this.view.setValidateInput(target.value);
        this.model.value = this.view.inputValue;
        break;
      case "Animate":
        this.model.animate = target.checked;
        break;
      case "Hide":
        this.model.hide = target.checked;
        break;
    }
  }
}

export default Presenter