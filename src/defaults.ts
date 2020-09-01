export interface IOptions {
  controlsSelector?: string | HTMLElement,
  wrapperSelector: string,
  controls: IControls
}

interface IControls {
  prevBtnSelector: string,
  nextBtnSelector: string
}

export const Options: IOptions = {
  wrapperSelector: 'ul',
  controls: {
    prevBtnSelector: '.control_prev',
    nextBtnSelector: '.control_next'
  }
}