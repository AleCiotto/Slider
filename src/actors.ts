import { 
  Direction,
  ICurrentActors } from "./utils/defaults";

// TODO: Evaluate if need to move this class
// in worker
/**
 * @description Create the actors that are used to get the index of acting sliders
 */
export class Actors {
  private _active: number[] = [];
  private _prev: number[] = [];
  private _next: number[] = [];
  private _lastIndex: number;

  constructor(props: ICurrentActors, lastSlideIndex: number) {
    this._active = props.active;
    this._prev = props.prev;
    this._next = props.next;
    this._lastIndex = lastSlideIndex;
  }

  /**
   * @description get the list of the active elements
   */
  get active() {
    return this._active;
  }

  /**
   * @description get the list of the next elements
   */
  get next() {
    return this._next;
  }

  /**
   * @description get the list of the previous elements
   */
  get prev() {
    return this._prev;
  }

  /**
   * @description get the index of the last element
   */
  get lastIndex() {
    return this._lastIndex;
  }

  set active(values: number[]) {
    this._active = values;
  }

  set next(values: number[]) {
    this._next = values;
  }

  set prev(values: number[]) {
    this._prev = values;
  }

  set lastIndex(value: number) {
    this._lastIndex = value;
  }

  /**
   * @description increase by one the values in an array up to the last index if it is bigger then the last index then it becomes zero
   * @param indexes array of numbers
   */
  _increaseValue(indexes: number[]) {
    return indexes.map(i => i != this.lastIndex ? ++i : 0);
  }

  /**
   * @description decrease by on the values in an array up to zero if it is lower then zero then it becomes last index
   * @param indexes array of numbers
   */
  _decreaseValue(indexes: number[]) {
    return indexes.map(i => i ? --i : this.lastIndex);
  }

  /**
   * @description shift all the values accordingly to the new index
   * @param newIndex target where to jump
   * @param indexes array of number
   */
  _jumpToValue(newIndex: number, indexes: number[]) {
    return indexes.map(i => i + newIndex > this.lastIndex ? i + newIndex - this.lastIndex - 1 : i + newIndex);
  }

  /**
   * @description update the index of slides accordingly to direction to move
   * @param direction direction to go
   * @param lastSlide slider last slide
   */
  set change(direction: Direction) {
    switch (direction) {
      case Direction.Next:
        this.active = this._increaseValue(this.active);
        this.next = this._increaseValue(this.next);
        this.prev = this._increaseValue(this.next);
        break;
      case Direction.Prev:
        this.active = this._decreaseValue(this.active);
        this.next = this._decreaseValue(this.next);
        this.prev = this._decreaseValue(this.next);
        break;
      default:
        break;
    }
  }

  /**
   * @description change all the actors to a certain value starting from the @index in active
   * @param index root index to change all other
   */
  set changeTo(index: number) {
    this.active = this._jumpToValue(index, this.active);
    this.next = this._jumpToValue(index, this.next);
    this.prev = this._jumpToValue(index, this.prev);
  }
}