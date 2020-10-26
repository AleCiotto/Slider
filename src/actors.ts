import { 
  Direction,
  ICurrentActors } from "./defaults";

/**
 * @description The index of active, prev and next slider
 * @param Active should be the index of current active slide
 * @param Prev should be the index of previous slider usualy the last slide
 * @param Next should be the index of next slide usualy the next from active
 */
interface IActorsProps {
  active: number,
  prev: number,
  next: number
}

// TODO: Evaluate if need to move this class
// in worker
/**
 * @description Create the actors that are used to get the index of acting sliders
 */
export class Actors {
  public active: number = 0;
  public prev: number = 0;
  public next: number = 0;
  private _changeActors: (direction: Direction) => ICurrentActors;

  constructor(props: IActorsProps) {
    let active = props.active;
    let prev = props.prev;
    let next = props.next;
    let slideLength = props.prev;

    const changeActors = (direction: Direction): ICurrentActors => {
      if (direction === Direction.Next) {
        active = active != slideLength ? ++active : 0;
        prev = prev != slideLength ? ++prev : 0;
        next = next != slideLength ? ++next : 0;
      } else {
        active = active ? --active : slideLength;
        prev = prev ? --prev : slideLength;
        next = next ? --next : slideLength;
      }
      this.active = active;
      this.prev = prev;
      this.next = next;
  
      return {active, prev, next}
    }

    this._changeActors = changeActors;
  }

  changeActors(direction: Direction): ICurrentActors {
    return this._changeActors(direction);
  }
}