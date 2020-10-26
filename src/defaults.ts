import { Classes } from "./constants";

export interface IOptions {
  controlsSelector?: string | HTMLElement,
  wrapperSelector: string,
  controls: IControls,
  slides: ISlides
}

interface IControls {
  prevBtnSelector: string,
  nextBtnSelector: string
}

interface ISlides {
  slideSelector: string,
  activeSlideSelector: string,
  prevSlideSelector: string,
  nextSlideSelector: string
}

export const Options: IOptions = {
  wrapperSelector: '.'.concat(Classes.wrapper),
  controls: {
    prevBtnSelector: '.'.concat(Classes.prevBtn),
    nextBtnSelector: '.'.concat(Classes.nextBtn)
  },
  slides: {
    slideSelector: '.'.concat(Classes.slides.slide),
    activeSlideSelector: '.'.concat(Classes.slides.active),
    prevSlideSelector: '.'.concat(Classes.slides.prev),
    nextSlideSelector: '.'.concat(Classes.slides.next)
  }
}

/**
 * @description Direction where to move the slider
 */
export enum Direction {
  Prev,
  Next
}

export interface ICurrentActors {
  active: number,
  prev: number,
  next: number
}

/**
 * @description Slide state in slider
 * @enum e active prev, next
 */
export interface ISlide {
  active: HTMLElement,
  prev: HTMLElement,
  next: HTMLElement
}
