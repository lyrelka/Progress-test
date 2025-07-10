import style from "./progress.css?inline";

export class ProgressUI extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <style>${style}</style>
      <div id="progress" class="progress-loader-container">
        <svg class="progress-loader-svg">
          <circle class="progress-loader-background" cx="60" cy="60" r="55" />
          <circle id="progress-loader" class="progress-loader" cx="60" cy="60" r="55" />
        </svg>
      </div>
    `
  }
}

customElements.define('my-progressui', ProgressUI);