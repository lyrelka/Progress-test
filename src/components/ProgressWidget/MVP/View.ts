import type { IEvents } from "../../Progress/base/EventEmitter";

export class View {
  protected _input: HTMLInputElement | null;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    container.addEventListener('input', (e: Event) => {
      events.emit('settings:changed', e);
    });

    this._input = container.querySelector<HTMLInputElement>('input');

    if (this._input) {
      this._input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });
    }
  }

  setValidateInput(value: string) {
    value = value.replace(/^[-][^0-9]/g, '');
    if (this._input){
      if (!value) {
        this._input.value = '0'
      }

      value = String(Math.max(0, Math.min(100, Number(value))));
      this._input.value = value;
    }
  }

  get inputValue(): number {
    return this._input ? Number(this._input.value) : 0
  }
}