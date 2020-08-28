import { Options } from "./defaults";

export class SimpleSlider {
  private _slider: HTMLElement;

  set slider(selector: HTMLElement) {
    this._slider = selector;
  }

  get slider(): HTMLElement {
    return this._slider;
  }

  constructor(selector: string | HTMLElement, options: Options) {
    if (selector) {
      this.slider = typeof selector === 'string' ? document.querySelector(selector) : selector;
    } else {
      console.error("Wrong selector for slider was used: ", selector);
    }
  }

  /**
   * moveRight
   */
  public moveRight() {
    
  }

  /**
   * moveLeft
   */
  public moveLeft() {
    
  }
}