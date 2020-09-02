import { Classes } from "./constants";
import { IOptions } from "./defaults";

export class SliderWrapper {
  private _wrapElem: HTMLElement;
  private _options: IOptions;

  constructor(wrapperElement: HTMLElement, options: IOptions) {
    this._wrapElem = wrapperElement;
    this._options = options;
    this._eventsHandler();
  }

  private _eventsHandler() {
    this._wrapElem.addEventListener('animationend', this._animationEnd.bind(this), false);
  }

  /**
   * moveNext
   */
  public moveNext() {
    this._wrapElem.classList.add(Classes.next);
  }
  
  /**
   * movePrev
   */
  public movePrev() {
    this._wrapElem.classList.add(Classes.prev);
  }

  private _animationEnd() {
    // set the new state switching the slides
    this._wrapElem.classList.remove(Classes.prev);
    this._wrapElem.classList.remove(Classes.next);
  }
}