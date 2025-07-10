import { EventEmitter } from "./components/base/EventEmitter";
import Presenter from "./components/Presenter";
import { ProgressModel } from "./components/ProgressModel";
import { ProgressView } from "./components/ProgressView";
import { SettingsView } from "./components/SettingsView";
import style from "./ProgressWidget.css?inline";
import { CheckboxUI } from './ui/checkbox';
import { InputUI } from './ui/input';
import { ProgressUI } from './ui/progress';

export class ProgressWidget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const value = Number(this.getAttribute('value')) || 0;
    const animate = this.getAttribute('animate') === "false" ? false : Boolean(this.getAttribute('animate'));
    const hide = this.getAttribute('hide') === "false" ? false : Boolean(this.getAttribute('hide'));
    const backgroundColor = this.getAttribute('background-color');
    this.style.setProperty('--background-color', backgroundColor);
    const additionalColor = this.getAttribute('additional-color');
    this.style.setProperty('--additional-color', additionalColor);
    const accentColor = this.getAttribute('accent-color');
    this.style.setProperty('--accent-color', accentColor);


    this.innerHTML = (`
      <style>${style}</style>
      <div id="progress-widget" class="progress-widget">
        <h4 class="title">Progress</h4>
        <my-progressui class="widget-loader"></my-progressui>
        <form id="settings" class="settings">
          <my-inputui 
            title="Value" 
          ></my-inputui>
          <my-checkboxui 
            title="Animate" 
            ${animate ? 'checked=true' : ''}
          ></my-checkboxui>
          <my-checkboxui 
            title="Hide" 
            ${hide ? 'checked=true' : ''}
          ></my-checkboxui>
        </form>
      </div>
    `)
    
    const events = new EventEmitter();
    const model = new ProgressModel({
      initialValue: value, 
      initialAnimate: animate, 
      initialHide: hide
    }, events);

    const settingsContainer = this.querySelector<HTMLFormElement>('#settings');
    if (settingsContainer) {
      const settings = new SettingsView(settingsContainer, events);
      
      const progressContainer = this.querySelector<HTMLElement>('#progress');
      if (progressContainer) {
        const progress = new ProgressView(progressContainer);

        const presenter = new Presenter(
          settings,
          progress,
          model,
          events
        )
      }
    }
  }
}

customElements.define('my-progresswidget', ProgressWidget);