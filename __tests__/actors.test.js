import { Actors } from "../src/actors";
import { SliderWrapper } from "../src/sliderWrapper";

/**
 * MOCK CLASS
 */

 jest.mock('../src/actors');

 beforeEach(() => {
  Actors.mockClear();
});

it('We can check if the wrapper called the class constructor', () => {
  const wrapper = new SliderWrapper();
  expect(Actors).toHaveBeenCalledTimes(1);
});

// it('Test move to right', () => {

// })