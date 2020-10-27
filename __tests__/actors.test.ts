import { Actors } from "../src/actors";
import { 
  Direction,
  ICurrentActors } from "../src/defaults";

const firstSlide: number = 0;
const slidesQuantity: number = 5;

describe('testing the direction change', () => {
  const actors = new Actors({ active: firstSlide, next: firstSlide + 1, prev: slidesQuantity });
  
  test('on next change actors correctly', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Next);
    
    expect(currentActors.active).toBe(firstSlide + 1);
    expect(currentActors.next).toBe(firstSlide + 2);
    expect(currentActors.prev).toBe(firstSlide);
  });
  
  test('on prev change actors correctly', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Prev);
    
    expect(currentActors.active).toBe(firstSlide);
    expect(currentActors.next).toBe(firstSlide + 1);
    expect(currentActors.prev).toBe(slidesQuantity);
  });
});

describe('testing movements from edge to edge', () => {
  const actors = new Actors({active: firstSlide, next: firstSlide + 1, prev: slidesQuantity});

  test('if active is 0 then on move left it should be the last in index of list', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Prev);

    expect(currentActors.active).toBe(slidesQuantity);
    expect(currentActors.next).toBe(firstSlide);
    expect(currentActors.prev).toBe(slidesQuantity - 1);
  });

  test('if active is last then on move rigt it should be with index 0', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Next);

    expect(currentActors.active).toBe(firstSlide);
    expect(currentActors.next).toBe(firstSlide + 1);
    expect(currentActors.prev).toBe(slidesQuantity);
  });
});

describe('testing with two slide only', () => {
  const actors = new Actors({active: firstSlide, next: firstSlide + 1, prev: 1});

  it('previous actor should be the same as next actor on landing', () => {
    expect(actors.next).toBe(actors.prev);
  });

  it('previous actor should be the same as next actor on next move', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Next);

    expect(currentActors.next).toBe(currentActors.prev);
  });

  it('previous actor should be the same as next actor on prev move', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Prev);

    expect(currentActors.next).toBe(currentActors.prev);
  });
});