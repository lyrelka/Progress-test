import type { IEvents } from "./base/EventEmitter";
import type { ProgressView } from "./ProgressView";
import type { ProgressModel } from "./ProgressModel";
import type { SettingsView } from "./SettingsView";

class Presenter {
  constructor(private settingsView: SettingsView, private progressView: ProgressView, private model: ProgressModel, private events: IEvents) {
    this.settingsView.setValidateInput(String(model.value));
    this.progressView.initialize(model.value, model.animate, model.hide);
    
    this.events.on('settings:changed', this.onSettingsChanged.bind(this));

    this.events.on('value:changed', () => {
      this.progressView.changeProgress(this.model.value);
    });

    this.events.on('animate:changed', () => {
      this.progressView.toggleAnimate(this.model.animate);
    });

    this.events.on('hide:changed', () => {
      this.progressView.toggleHide(this.model.hide);
    });
  }

  onSettingsChanged(data: Event): void {
    const target = data.target as HTMLInputElement;
    switch (target?.title) {
      case "Value":
        this.settingsView.setValidateInput(target.value);
        this.model.value = this.settingsView.inputValue;
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