import { 
  Direction,
  ICurrentActors } from "./utils/defaults";

// TODO: Evaluate if need to move this class
// in worker
/**
 * @description Create the actors that are used to get the index of acting sliders
 */
export class Actors {
  public active: number[] = [];
  public prev: number[] = [];
  public next: number[] = [];
  private _changeActors: (direction: Direction) => ICurrentActors;

  constructor(props: ICurrentActors, lastSlide: number) {
    let active: number[] = props.active;
    let prev: number[] = props.prev;
    let next: number[] = props.next;

    const changeActors = (direction: Direction): ICurrentActors => {
      if (direction === Direction.Next) {
        active = active.map(i => i != lastSlide ? ++i : 0);
        prev = prev.map(i => i != lastSlide ? ++i : 0);
        next = next.map(i => i != lastSlide ? ++i : 0);
      } else {
        active = active.map(i => i ? --i : lastSlide);
        prev = prev.map(i => i ? --i : lastSlide);
        next = next.map(i => i ? --i : lastSlide);
      }
      this.active = active;
      this.prev = prev;
      this.next = next;
  
      return {active, prev, next}
    }

    this._changeActors = changeActors;
  }

  change(direction: Direction): ICurrentActors {
    return this._changeActors(direction);
  }
}