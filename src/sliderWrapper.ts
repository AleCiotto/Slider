import { Classes } from "./constants";
import { 
  IOptions,
  ICurrentActors,
  ISlide, 
  Direction} from "./defaults";
import { Actors } from './actors';

export class SliderWrapper {
  private _wrapElem: HTMLElement;
  private _options: IOptions;
  private _slides: NodeListOf<HTMLElement>;
  private _actors: Actors;
  private _slide: ISlide;
  private _animating: boolean;

  constructor(wrapperElement: HTMLElement, options: IOptions) {
    this._wrapElem = wrapperElement;
    this._options = options;
    this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
    let actors = {
      active: 0,
      next: 1,
      prev: this._slides.length - 1
    }
    this._actors = new Actors(actors);
    this._animating = false;
    this._slide = {
      active: this._slides[actors.active],
      prev: this._slides[actors.prev],
      next: this._slides[actors.next]
    }
    this._updateSlides(actors);
    if (this._slides.length) {
      this._eventsHandler();
    }
  }

  private _eventsHandler() {
    this._wrapElem.addEventListener('transitionend', this._animationEnd.bind(this), false);
  }

  /**
   * movePrev
   */
  public movePrev() {
    if (!this._animating) {
      this._animating = true;
      this._actors.changeActors(Direction.Prev);
      this._wrapElem.classList.add(Classes.prev);
    }
  }
  
  /**
   * moveNext
   */
  public moveNext() {
    if (!this._animating) {
      this._animating = true;
      this._actors.changeActors(Direction.Next);
      this._wrapElem.classList.add(Classes.next);
    }
  }

  private _animationEnd() {
    this._updateSlides(this._actors);
    this._wrapElem.classList.remove(Classes.prev);
    this._wrapElem.classList.remove(Classes.next);
    this._animating = false;
  }

  private _updateSlides(actors: ICurrentActors) {
    this._updateSlide('active', actors.active);
    this._updateSlide('next', actors.next);
    this._updateSlide('prev', actors.prev);
  }

  private _resetSlide(slideId: number) {
    this._slides[slideId].classList.remove(Classes.slides.active);
    this._slides[slideId].classList.remove(Classes.slides.prev);
    this._slides[slideId].classList.remove(Classes.slides.next);
  }

  private _updateSlide(slideName: keyof ISlide, slideId: number) {
    if (!this._slide[slideName]) {
      this._slide[slideName] = this._slides[slideId]
    } else {
      this._slide[slideName].classList.remove(Classes.slides[slideName]);
      this._slide[slideName] = this._slides[slideId];
      this._slide[slideName].classList.add(Classes.slides[slideName]);
    }
  }

  private _clearSlideClasses(slide: HTMLElement) {
    slide.classList.remove(Classes.slides.active);
    slide.classList.remove(Classes.slides.prev);
    slide.classList.remove(Classes.slides.next);
  }
}
