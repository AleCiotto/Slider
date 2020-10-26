import { Options, IOptions } from "./defaults";
import { SliderWrapper } from "./sliderWrapper";

export class Slider {
  private _sliderElement?: HTMLElement;
  private _wrapperElement?: HTMLUListElement;
  private _wrapper?: SliderWrapper;
  private _options: IOptions;
  private _prevBtn?: HTMLElement;
  private _nextBtn?: HTMLElement;


  constructor(selector?: string | HTMLElement, options?: IOptions) {
    this._options = options != null ? Object.assign(Options, options) : Options;
    if (selector != null) {
      this._sliderElement = typeof selector === 'string' ? document.querySelector(selector) as HTMLElement : selector;
      this._wrapperElement = this._sliderElement.querySelector(this._options.wrapperSelector) as HTMLUListElement;
      this._wrapper = new SliderWrapper(this._wrapperElement, this._options);
      this._prevBtn = this._sliderElement.querySelector(this._options.controls.prevBtnSelector) as HTMLElement;
      this._nextBtn = this._sliderElement.querySelector(this._options.controls.nextBtnSelector) as HTMLElement;
      this._init();
    } else {
      console.error("Wrong selector for slider was used: ", selector);
    }
  }

  _init() {
    if (this._prevBtn) this._prevBtn.addEventListener('click', this.movePrev.bind(this), false);
    if (this._nextBtn) this._nextBtn.addEventListener('click', this.moveNext.bind(this), false);
  }

  /**
   * moveNext
   */
  public moveNext() {
    if (this._wrapper) {
      this._wrapper.moveNext();
    }
  }

  /**
   * movePrev
   */
  public movePrev() {
    if (this._wrapper) {
      this._wrapper.movePrev();
    }
  }
}