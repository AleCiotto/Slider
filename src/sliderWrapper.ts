import { Classes } from "./utils/constants";
import { 
  IOptions,
  ICurrentActors,
  ISlide, 
  Direction } from "./utils/defaults";
import { Actors } from './actors';
import { classAdd , classRemove } from "./utils/shortcuts";

export class SliderWrapper {
  private _wrapElem: HTMLElement;
  private _options: IOptions;
  private _slides: NodeListOf<HTMLElement>;
  private _actors: Actors;
  private _slideList: ISlide;
  private _animating: boolean;
  private _direction: Direction;
  private _slidesIndex: ICurrentActors;

  constructor(wrapperElement: HTMLElement, options: IOptions) {
    this._wrapElem = wrapperElement;
    this._options = options;
    let slides = this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
    this._slidesIndex = {
      active: [0],
      next: [1],
      prev: [slides.length - 1]
    };
    this._direction = Direction.Idle;
    this._actors = new Actors(this._slidesIndex, slides.length - 1);
    this._animating = false;
    this._slideList = this._createSlideList(this._slidesIndex);
    this._updateAllSlidesClasses();
    if (slides.length) {
      this._eventsHandler();
    }
  }

  private _createSlideList(slidesIndex: ICurrentActors): ISlide {
    return {
      active: slidesIndex.active.map(s => this._slides[s]),
      prev: slidesIndex.prev.map(s => this._slides[s]),
      next: slidesIndex.next.map(s => this._slides[s])
    }
  }

  private _eventsHandler() {
    this._wrapElem.addEventListener('transitionend', this._animationEnd.bind(this), false);
  }

  /**
   * @description Get the slider moved direction
   */
  get movedTo() {
    return this._direction;
  }

  /**
   * @description Sets where the slider moved to
   */
  set movedTo(direction: Direction) {
    if (!this._animating) {
      this._animating = true;
      this._direction = direction;
      if (direction === Direction.Prev && this._slides.length === 2)
        this._updateSlidesClasses(this._slideList.prev, Classes.slides.prev);
      classAdd(this._wrapElem, direction === Direction.Prev ? Classes.prev : Classes.next);
    }
  }

  private _animationEnd() {
    this._actors.change = this.movedTo;
    this._updateAllSlidesClasses();
    classRemove(this._wrapElem, this.movedTo === Direction.Prev ? Classes.prev : Classes.next);
    this._animating = false;
  }

  private _updateAllSlidesClasses() {
    let slideList = this._slideList;
    let tempSlideList = this._createSlideList(this._actors);
    let tempSlideListArr = tempSlideList.active.concat(tempSlideList.next, tempSlideList.prev);
    let idleList = slideList.active.concat(slideList.next, slideList.prev).filter(s => tempSlideListArr.indexOf(s) === -1);

    this._slideList = tempSlideList;

    this._updateSlidesClasses(idleList);
    this._updateSlidesClasses(tempSlideList.active, Classes.slides.active);
    this._updateSlidesClasses(tempSlideList.next, Classes.slides.next);
    if (this._slides.length > 2)
      this._updateSlidesClasses(tempSlideList.prev, Classes.slides.prev);
  }

  /**
   * @description Graphicaly move the slide in idle/active/next/prev position
   */
  private _updateSlidesClasses(slides: HTMLElement[], className: string = '') {
    // for (const slide of slides) {
    for (let i = 0; i < slides.length; i++) {
      classRemove(slides[i], Classes.slides.active);
      classRemove(slides[i], Classes.slides.next);
      classRemove(slides[i], Classes.slides.prev);
      if (className)
        classAdd(slides[i], className);
    }
  }
}
