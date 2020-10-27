import { Actors } from "../src/actors";
import { 
  Direction,
  ICurrentActors } from "../src/defaults";

describe('testing the direction change', () => {
  const actors = new Actors({ active: 0, next: 1, prev: 5 });
  
  test('on next change actors correctly', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Next);
    expect(currentActors.active).toBe(1);
    expect(currentActors.next).toBe(2);
    expect(currentActors.prev).toBe(0);
  });
  
  test('on prev change actors correctly', () => {
    let currentActors: ICurrentActors = actors.changeActors(Direction.Prev);
    expect(currentActors.active).toBe(0);
    expect(currentActors.next).toBe(1);
    expect(currentActors.prev).toBe(5);
  })
});

describe('testing movements from edge to edge', () => {
  const actorsConf: ICurrentActors = { active: 0, next: 1, prev: 5 };
  const actors = new Actors(actorsConf);

  test('if active is 0 then on move left it should be the last in index of list', () => {
    let currentActor: ICurrentActors = 
  })
});

