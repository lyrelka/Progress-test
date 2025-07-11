import { Progress } from "../Progress";
import { EventEmitter } from "../Progress/base/EventEmitter";
import Presenter from "./MVP/Presenter";
import { View } from "./MVP/View";
import style from "./ProgressWidget.css?inline";
import { CheckboxUI } from "./ui/checkbox";
import { InputUI } from "./ui/input";


export class ProgressWidget extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <style>${style}</style>
      <div id="progress-widget" class="progress-widget">
        <h4 class="title">Progress</h4>
        <my-progress 
          id="widget-loader"
          class="widget-loader"
        ></my-progress>
        <form id="settings" class="settings">
          <my-inputui 
            title="Value" 
          ></my-inputui>
          <my-checkboxui 
            title="Animate"
          ></my-checkboxui>
          <my-checkboxui 
            title="Hide"
          ></my-checkboxui>
        </form>
      </div>
    `;

    const events = new EventEmitter();
    const settingsContainer = this.querySelector<HTMLFormElement>('#settings');
    if (settingsContainer) {
      const progress = this.querySelector<Progress>('#widget-loader');
      if (progress) {
        const settings = new View(settingsContainer, events);
        new Presenter(settings, progress.model, events)
      }
    }
  }
}

customElements.define('my-progresswidget', ProgressWidget);