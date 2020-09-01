export interface IOptions {
  controlsSelector?: string | HTMLElement,
  wrapperSelector: string,
  controls: IControls
}

interface IControls {
  prevBtn: string,
  nextBtn: string
}

export const Options: IOptions = {
  wrapperSelector: 'ul',
  controls: {
    prevBtn: 'control_prev',
    nextBtn: 'control_next'
  }
}