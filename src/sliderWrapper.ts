import { Classes } from "./constants";
import { IOptions } from "./defaults";

export class SliderWrapper {
  private _wrapperElement: HTMLElement;
  private _options: IOptions;

  constructor(wrapperElement: HTMLElement, options: IOptions) {
    this._wrapperElement = wrapperElement;
    this._options = options;
  }

  /**
   * moveNext
   */
  public moveNext() {
    this._wrapperElement.classList.add(Classes.next);
  }
  
  /**
   * movePrev
   */
  public movePrev() {
    this._wrapperElement.classList.add(Classes.prev);
  }
}