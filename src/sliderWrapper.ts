import { Classes } from "./constants";
import { 
  IOptions, 
  Direction,
  IActors,
  ICurrentActors,
  ISlide } from "./defaults";

export class SliderWrapper {
  private _wrapElem: HTMLElement;
  private _options: IOptions;
  private _slides: NodeListOf<HTMLElement>;
  private _actors: IActors;
  private _slide: ISlide;
  private _animating: boolean;

  constructor(wrapperElement: HTMLElement, options: IOptions) {
    this._wrapElem = wrapperElement;
    this._options = options;
    this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
    this._actors = this._createActors();
    this._animating = false;
    this._slide = {
      active: this._slides[this._actors.current().active],
      prev: this._slides[this._actors.current().prev],
      next: this._slides[this._actors.current().next]
    }
    this._updateSlides(this._actors.current());
    if (this._slides.length) {
      this._eventsHandler();
    }
  }

  private _createActors() {
    let active = 0;
    let prev = this._slides.length - 1;
    let next = 1;
    const changeActor = (direction: Direction) => {
      if (direction === Direction.Prev) {
        active = !active ? this._slides.length - 1 : --active;
        prev = !prev ? this._slides.length - 1 : --prev;
        next = !next ? this._slides.length - 1 : --next;
        console.log('Moving Prev', active, prev, next);
      } else {
        active = active === this._slides.length - 1 ? 0 : ++active;
        prev = prev === this._slides.length - 1 ? 0 : ++prev;
        next = next === this._slides.length - 1 ? 0 : ++next;
        console.log('Moving Next', active, prev, next);

      }
    }

    return {
      updateOnPrevMove: () => {
        changeActor(Direction.Prev);
      },
      updateOnNextMove: () => {
        changeActor(Direction.Next);
      },
      current: () => {
        return {
          active,
          prev,
          next
        }
      }
    }
  }

  private _eventsHandler() {
    this._wrapElem.addEventListener('animationend', this._animationEnd.bind(this), false);
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
    this._updateActiveSlide(actors.active);
    this._updatePrevSlide(actors.prev);
    this._updateNextSlide(actors.next)
  }

  private _updateActiveSlide(slideId: number) {
    this._updateSlide('active', slideId);
  }
  
  private _updatePrevSlide(slideId: number) {
    this._updateSlide('prev', slideId);
  }
  
  private _updateNextSlide(slideId: number) {
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
    } else if (this._slide[slideName] === this._slides[slideId]) {
      return false;
    } else {
      this._slide[slideName].classList.remove(Classes.slides[slideName]);
      this._slide[slideName] = this._slides[slideId];
      this._slide[slideName].classList.add(Classes.slides[slideName]);
    }
  }
}
