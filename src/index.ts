import { Options, OptionsInterface } from "./defaults";
import { SliderWrapper } from "./sliderWrapper";

export class SimpleSlider {
  private _sliderElement?: HTMLElement;
  private _wrapperElement?: HTMLUListElement;
  private _wrapper?: SliderWrapper;
  private _options: OptionsInterface;

  constructor(selector?: string | HTMLElement, options?: OptionsInterface) {
    this._options = options != null ? Object.assign(Options, options) : Options;
    if (selector != null) {
      this._sliderElement = typeof selector === 'string' ? document.querySelector(selector) as HTMLElement : selector;
      this._wrapperElement = this._sliderElement.querySelector('ul') as HTMLUListElement;
      this._wrapper = new SliderWrapper(this._wrapperElement, this._options);
    } else {
      console.error("Wrong selector for slider was used: ", selector);
    }
  }

  /**
   * moveRight
   */
  public moveRight() {
    if (this._wrapper) {
      this._wrapper.moveRight();
    }
  }

  /**
   * moveLeft
   */
  public moveLeft() {
    if (this._wrapper) {
      this._wrapper.moveLeft();
    }
  }
}