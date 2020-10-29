export const classAdd = (elem: HTMLElement, className: string) => {
  if (elem) elem.classList.add(className);
}

export const classRemove = (elem: HTMLElement, className: string) => {
  if (elem) elem.classList.remove(className);
}