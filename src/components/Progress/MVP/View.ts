export class View {
  protected _progressLoader: SVGCircleElement | null;
  
  constructor(protected container: HTMLElement) {
    this._progressLoader = container.querySelector('#progress-loader')
  }

  initialize (value: number, animate: boolean, hide: boolean) {
    this.changeProgress(value);
    this.toggleAnimate(animate);
    this.toggleHide(hide);
  }

  changeProgress (value: number) {
    if (this._progressLoader) {
      const radius = this._progressLoader.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = (value / 100) * circumference;
      this._progressLoader.style.strokeDasharray = `${offset}, ${circumference}`;
    }
  }

  toggleAnimate(force: boolean) {
    if (this._progressLoader) {
      this._progressLoader.classList.toggle('animate', force);
    }
  }

  toggleHide(force: boolean) {
    this.container.classList.toggle('hide', force);
  }
}