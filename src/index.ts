import { Options } from "./defaults";
import { SliderWrapper } from "./worker/sliderWrapper";

export class SimpleSlider {
  private _sliderElement: HTMLElement;
  private _wrapperElement: HTMLElement;
  private _wrapper: SliderWrapper;

  set slider(selector: HTMLElement) {
    this._sliderElement = selector;
  }
  
  get slider(): HTMLElement {
    return this._sliderElement;
  }
  
  set wrapper(slider: HTMLElement) {
    //TODO: Implement selector case from options
    this._wrapperElement = slider.querySelector('ul');
    this._wrapper = new SliderWrapper(this.wrapper);
  }

  get wrapper(): HTMLElement {
    return this._wrapperElement;
  }

  constructor(selector: string | HTMLElement, options: Options) {
    if (selector) {
      this.slider = typeof selector === 'string' ? document.querySelector(selector) : selector;
      this.wrapper = this.slider;
    } else {
      console.error("Wrong selector for slider was used: ", selector);
    }
  }

  /**
   * moveRight
   */
  public moveRight() {
    this._wrapper.moveRight();
  }

  /**
   * moveLeft
   */
  public moveLeft() {
    this._wrapper.moveLeft();
  }
}