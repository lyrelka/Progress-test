import { EventEmitter } from "./base/EventEmitter";
import { Model } from "./MVP/Model";
import Presenter from "./MVP/Presenter";
import { View } from "./MVP/View";
import style from "./progress.css?inline";

export class Progress extends HTMLElement {
  public model: Model

  constructor() {
    super();

    const additionalColor = this.getAttribute('additional-color');
    this.style.setProperty('--additional-color', additionalColor);
    const accentColor = this.getAttribute('accent-color');
    this.style.setProperty('--accent-color', accentColor);

    this.innerHTML = `
      <style>${style}</style>
      <div id="progress" class="progress-loader-container">
        <svg class="progress-loader-svg">
          <circle class="progress-loader-background" cx="60" cy="60" r="55" />
          <circle id="progress-loader" class="progress-loader" cx="60" cy="60" r="55" />
        </svg>
      </div>
    `

    const events = new EventEmitter();
    this.model = new Model ({
      initialValue: 70, 
      initialAnimate: false, 
      initialHide: false
    }, events);
    const progressContainer = this.querySelector<HTMLElement>('#progress');
    if (progressContainer) {
      const progress = new View(progressContainer);
      new Presenter(progress, this.model, events)
    }
  }
}

customElements.define('my-progress', Progress);