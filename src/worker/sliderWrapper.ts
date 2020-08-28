import { Classes } from "../constants";

export class SliderWrapper {
  private _wrapperElement: HTMLElement;

  constructor(wrapperElement: HTMLElement) {
    this._wrapperElement = wrapperElement;
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