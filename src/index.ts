import { Options, IOptions } from "./utils/defaults";
import { SliderWrapper } from "./sliderWrapper";
import { Direction } from './utils/defaults';

export class Slider {
  element: HTMLElement;
  options: IOptions;

  constructor(selector: string | HTMLElement, options?: IOptions) {
    this.element = typeof selector === 'string' ? document.querySelector(selector) as HTMLElement : selector;
    this.options = options != null ? Object.assign(Options, options) : Options;
    const wrapperElement = this.element.querySelector(this.options.wrapperSelector) as HTMLUListElement;
    const wrapper = new SliderWrapper(wrapperElement, this.options);
    this._bindMoveArrowEvents(wrapper);
  }
  
  _bindMoveArrowEvents(wrapper: SliderWrapper) {
    const prevBtn = this.element.querySelector(this.options.controls.prevBtnSelector) as HTMLElement;
    const nextBtn = this.element.querySelector(this.options.controls.nextBtnSelector) as HTMLElement;
    if (nextBtn) nextBtn.addEventListener('click', () => wrapper.movedTo = Direction.Next, false);
    if (prevBtn) prevBtn.addEventListener('click', () => wrapper.movedTo = Direction.Prev, false);
  }
}