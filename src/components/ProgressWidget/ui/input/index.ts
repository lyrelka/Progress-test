import style from "./input.css?inline";

export class InputUI extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title');

    this.innerHTML = `
      <style>${style}</style>
      <div class="input-ui">
        <input
          class="input"
          type="number"
          pattern="[0-9]*"
          id="${title}_input"
          title="${title}"
        />
        <label for="${title}_input" class="input-label">
          ${title}
        </label>
      </div>
    `
  }
}