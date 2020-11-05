import { Classes } from "./utils/constants";
import { 
  IOptions,
  ICurrentActors,
  ISlide, 
  Direction,
  SlideState } from "./utils/defaults";
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
      active: 0,
      next: 1,
      prev: slides.length - 1
    }
    this._direction = Direction.Idle;
    this._actors = new Actors(this._slidesIndex);
    this._animating = false;
    this._slideList = this._createSlideList(this._slidesIndex);
    this._updateSlides(this._slidesIndex);
    if (slides.length) {
      this._eventsHandler();
    }
  }

  private _createSlideList(slidesIndex: ICurrentActors): ISlide {
    return {
      active: this._slides[slidesIndex.active],
      prev: this._slides[slidesIndex.prev],
      next: this._slides[slidesIndex.next]
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
      let isPrev = direction === Direction.Prev;
      if (isPrev && this._slides.length === 2)
        this._becomePrev(this._slideList.next);
      classAdd(this._wrapElem, isPrev ? Classes.prev : Classes.next);
    }
  }

  private _animationEnd() {
    this._actors.change(this.movedTo);
    
    let slideList = this._slideList;
    let tempSlideList = this._createSlideList(this._actors);
    let tempSlideListArr = [tempSlideList.active, tempSlideList.next, tempSlideList.prev];
    let idleList = [slideList.active, slideList.next, slideList.prev].filter(s => tempSlideListArr.indexOf(s) === -1)
    
    this._slideList = tempSlideList;

    this._becomeIdle(idleList);
    this._becomeActive(this._slides[actors.active]);
    this._becomeNext(this._slides[actors.next]);
    if (this._slides.length > 2)
      this._becomePrev(this._slides[actors.prev]);
    

    // this._updateSlides(this._slidesIndex);
    classRemove(this._wrapElem, Classes.prev);
    classRemove(this._wrapElem, Classes.next);
    this._animating = false;
  }

  // private _updateSlides(actors: ICurrentActors) {
  //   this._becomeActive(this._slides[actors.active]);
  //   this._becomeNext(this._slides[actors.next]);
  //   if (this._slides.length > 2)
  //     this._becomePrev(this._slides[actors.prev]);
  //   this._updateSlideState(this._slideList, actors);
  // }

  private _updateSlideState(slide: ISlide, actors: ICurrentActors) {
    slide.active = this._slides[actors.active];
    slide.next = this._slides[actors.next];
    slide.prev = this._slides[actors.prev];
  }

  /**
   * @description Graphicaly move the slide in idle position away from the slider
   */
  private _becomeIdle(slides: HTMLElement[]) {
    for (const slide of slides) {
      classRemove(slide, Classes.slides.active);
      classRemove(slide, Classes.slides.next);
      classRemove(slide, Classes.slides.prev);
    }
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
