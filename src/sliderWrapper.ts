import { Classes } from "./constants";
import { 
  IOptions,
  ICurrentActors,
  ISlide } from "./defaults";
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
    this._actors = new Actors({
      active: 0,
      next: 1,
      prev: this._slides.length - 1
    });
    this._animating = false;
    this._slide = {
      active: this._slides[this._actors.active],
      prev: this._slides[this._actors.prev],
      next: this._slides[this._actors.next]
    }
    this._updateSlides(this._actors.current());
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
      if (this._slide.prev === this._slide.next) {
        this._resetSlide(this._actors.current().next)
        this._updatePrevSlide(this._actors.current().active + 1);
      }
      this._actors.updateOnPrevMove();
      this._wrapElem.classList.add(Classes.prev);
    }
  }
  
  /**
   * moveNext
   */
  public moveNext() {
    if (!this._animating) {
      this._animating = true;
      this._actors.updateOnNextMove();
      this._wrapElem.classList.add(Classes.next);
    }
  }

  private _animationEnd() {
    this._updateSlides(this._actors.current());
    this._wrapElem.classList.remove(Classes.prev);
    this._wrapElem.classList.remove(Classes.next);
    this._animating = false;
  }

  private _updateSlides(actors: ICurrentActors) {
    this._updateSlide('active', slideId);
    this._updateSlide('prev', slideId);
    this._updateSlide('next', slideId);
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
