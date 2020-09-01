(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SimpleSlider = {}));
}(this, (function (exports) { 'use strict';

  var Options = {
    wrapperSelector: 'ul'
  };

  var Classes = {
    next: 'next',
    prev: 'prev'
  };

  var SliderWrapper =
  /** @class */
  function () {
    function SliderWrapper(wrapperElement, options) {
      this._wrapperElement = wrapperElement;
      this._options = options;
    }
    /**
     * moveRight
     */


    SliderWrapper.prototype.moveRight = function () {
      this._wrapperElement.classList.add(Classes.next);
    };
    /**
     * moveLeft
     */


    SliderWrapper.prototype.moveLeft = function () {
      this._wrapperElement.classList.add(Classes.prev);
    };

    return SliderWrapper;
  }();

  var SimpleSlider =
  /** @class */
  function () {
    function SimpleSlider(selector, options) {
      this._options = options != null ? Object.assign(Options, options) : Options;

      if (selector != null) {
        this._sliderElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
        this._wrapperElement = this._sliderElement.querySelector('ul');
        this._wrapper = new SliderWrapper(this._wrapperElement, this._options);
      } else {
        console.error("Wrong selector for slider was used: ", selector);
      }
    }
    /**
     * moveRight
     */


    SimpleSlider.prototype.moveRight = function () {
      if (this._wrapper) {
        this._wrapper.moveRight();
      }
    };
    /**
     * moveLeft
     */


    SimpleSlider.prototype.moveLeft = function () {
      if (this._wrapper) {
        this._wrapper.moveLeft();
      }
    };

    return SimpleSlider;
  }();

  exports.SimpleSlider = SimpleSlider;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
