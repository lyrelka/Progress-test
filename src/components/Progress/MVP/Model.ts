import type { IEvents } from "../base/EventEmitter";

type ProgressModelProps = {
  initialValue?: number;
  initialAnimate?: boolean;
  initialHide?: boolean;
}

export class Model {
  protected _value: number;
  protected _animate: boolean;
  protected _hide: boolean;

  constructor({initialValue, initialAnimate, initialHide}: ProgressModelProps, protected events: IEvents) {
    this._value = initialValue || 0;
    this._animate = initialAnimate || false;
    this._hide = initialHide || false;
  }

  set value( value: number) {
    this._value = value;
    this.events.emit('value:changed');
  }

  set animate( animate: boolean) {
    this._animate = animate;
    this.events.emit('animate:changed');
  }

  set hide( hide: boolean) {
    this._hide = hide;
    this.events.emit('hide:changed');
  }

  get value() {
    return this._value
  }

  get animate() {
    return this._animate
  }

  get hide() {
    return this._hide
  }
}