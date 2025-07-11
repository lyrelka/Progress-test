import style from "./checkbox.css?inline";

export class CheckboxUI extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const isChecked = this.getAttribute('checked');
    
    this.innerHTML = `
      <style>${style}</style>
      <div class="checkbox-ui">
        <input
          class="checkbox-input"
          type="checkbox"
          id="${title}_checkbox"
          title="${title}"
          ${isChecked ? 'checked' : ''}
        />
        <label for="${title}_checkbox" class="checkbox-label">
          ${title}
        </label>
      </div>
    `
  }
}