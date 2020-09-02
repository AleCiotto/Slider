define(['exports'], function (exports) { 'use strict';

  var Options = {
    wrapperSelector: 'ul',
    controls: {
      prevBtnSelector: '.control_prev',
      nextBtnSelector: '.control_next'
    }
  };

  var Classes = {
    next: 'next',
    prev: 'prev'
  };

  var SliderWrapper =
  /** @class */
  function () {
    function SliderWrapper(wrapperElement, options) {
      this._wrapElem = wrapperElement;
      this._options = options;

      this._eventsHandler();
    }

    SliderWrapper.prototype._eventsHandler = function () {
      this._wrapElem.addEventListener('animationend', this._animationEnd.bind(this), false);
    };
    /**
     * moveNext
     */


    SliderWrapper.prototype.moveNext = function () {
      this._wrapElem.classList.add(Classes.next);
    };
    /**
     * movePrev
     */


    SliderWrapper.prototype.movePrev = function () {
      this._wrapElem.classList.add(Classes.prev);
    };

    SliderWrapper.prototype._animationEnd = function () {
      // set the new state switching the slides
      this._wrapElem.classList.remove(Classes.prev);

      this._wrapElem.classList.remove(Classes.next);
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
        this._wrapperElement = this._sliderElement.querySelector(this._options.wrapperSelector);
        this._wrapper = new SliderWrapper(this._wrapperElement, this._options);
        this._prevBtn = document.querySelector(this._options.controls.prevBtnSelector);
        this._nextBtn = document.querySelector(this._options.controls.nextBtnSelector);

        this._init();
      } else {
        console.error("Wrong selector for slider was used: ", selector);
      }
    }

    SimpleSlider.prototype._init = function () {
      if (this._prevBtn) this._prevBtn.addEventListener('click', this.movePrev.bind(this), false);
      if (this._nextBtn) this._nextBtn.addEventListener('click', this.moveNext.bind(this), false);
    };
    /**
     * moveNext
     */


    SimpleSlider.prototype.moveNext = function () {
      if (this._wrapper) {
        this._wrapper.moveNext();
      }
    };
    /**
     * movePrev
     */


    SimpleSlider.prototype.movePrev = function () {
      if (this._wrapper) {
        this._wrapper.movePrev();
      }
    };

    return SimpleSlider;
  }();

  exports.SimpleSlider = SimpleSlider;

  Object.defineProperty(exports, '__esModule', { value: true });

});
