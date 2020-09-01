import { Classes } from "./constants";
import { OptionsInterface } from "./defaults";

export class SliderWrapper {
  private _wrapperElement: HTMLElement;
  private _options: OptionsInterface;

  constructor(wrapperElement: HTMLElement, options: OptionsInterface) {
    this._wrapperElement = wrapperElement;
    this._options = options;
  }

  /**
   * moveRight
   */
  public moveRight() {
    this._wrapperElement.classList.add(Classes.next);
  }
  
  /**
   * moveLeft
   */
  public moveLeft() {
    this._wrapperElement.classList.add(Classes.prev);
  }
}