import { Classes } from "./utils/constants";
import { 
  IOptions,
  ICurrentActors,
  ISlide, 
  Direction} from "./utils/defaults";
import { Actors } from './actors';
import { classAdd , classRemove } from "./utils/shortcuts";

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
    let slides = this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
    let actors = {
      active: 0,
      next: 1,
      prev: slides.length - 1
    }
    this._actors = new Actors(actors);
    this._animating = false;
    this._slide = {
      active: slides[actors.active],
      prev: slides[actors.prev],
      next: slides[actors.next]
    }
    this._updateSlides(actors);
    if (slides.length) {
      this._eventsHandler();
    }
  }

  private _eventsHandler() {
    this._wrapElem.addEventListener('transitionend', this._animationEnd.bind(this), false);
  }

  /**
   * @description Move the slider to previous position
   */
  public movePrev() {
    if (!this._animating) {
      this._animating = true;
      this._actors.changeActors(Direction.Prev);
      if (this._slides.length === 2)
        this._becomePrev(this._slide.next);
      classAdd(this._wrapElem, Classes.prev);
    }
  }
  
  /**
   * @description Move the slider to next position
   */
  public moveNext() {
    if (!this._animating) {
      this._animating = true;
      this._actors.changeActors(Direction.Next);
      classAdd(this._wrapElem, Classes.next);
    }
  }

  private _animationEnd() {
    this._updateSlides(this._actors);
    classRemove(this._wrapElem, Classes.prev);
    classRemove(this._wrapElem, Classes.next);
    this._animating = false;
  }

  private _updateSlides(actors: ICurrentActors) {
    this._becomeActive(this._slides[actors.active]);
    this._becomeNext(this._slides[actors.next]);
    if (this._slides.length > 2)
      this._becomePrev(this._slides[actors.prev]);
    this._updateSlide(this._slide, actors);
  }

  private _updateSlide(slide: ISlide, actors: ICurrentActors) {
    slide.active = this._slides[actors.active];
    slide.next = this._slides[actors.next];
    slide.prev = this._slides[actors.prev];
  }

  /**
   * @description Graphicaly move the slide in idle position away from the slider
   */
  private _becomeIdle(slide: HTMLElement) {
    classRemove(slide, Classes.slides.active);
    classRemove(slide, Classes.slides.next);
    classRemove(slide, Classes.slides.prev);
  }

  /**
   * @description Graphicaly move the slide in active position of the slider
   */
  private _becomeActive(slide: HTMLElement) {
    classRemove(slide, Classes.slides.prev);
    classRemove(slide, Classes.slides.next);
    classAdd(slide, Classes.slides.active);
  }

  /**
   * @description Graphicaly move the slide a the beggining of the slider
   */
  private _becomePrev(slide: HTMLElement) {
    classRemove(slide, Classes.slides.active);
    classRemove(slide, Classes.slides.next);
    classAdd(slide, Classes.slides.prev);
  }

  /**
   * @description Graphicaly move the slide a the end of the slider
   */
  private _becomeNext(slide: HTMLElement) {
    classRemove(slide, Classes.slides.active);
    classRemove(slide, Classes.slides.prev);
    classAdd(slide, Classes.slides.next);
  }
}
