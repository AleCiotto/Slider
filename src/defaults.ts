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

export enum Direction {
  Prev,
  Next
}

export interface IActors {
  updateOnPrevMove: any,
  updateOnNextMove: any,
  current: any
}

export interface ICurrentActors {
  active: number,
  prev: number,
  next: number
}

export interface ISlide {
  active: HTMLElement,
  prev: HTMLElement,
  next: HTMLElement
}
