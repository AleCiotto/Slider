var SimpleSlider = (function (exports) {
  'use strict';

  var Classes = {
    next: 'next',
    prev: 'prev',
    wrapper: 'slides',
    prevBtn: 'control_prev',
    nextBtn: 'control_next',
    slides: {
      slide: 'slide',
      active: 'slide_active',
      prev: 'slide_prev',
      next: 'slide_next'
    }
  };

  var Options = {
    wrapperSelector: '.'.concat(Classes.wrapper),
    controls: {
      prevBtnSelector: '.'.concat(Classes.prevBtn),
      nextBtnSelector: '.'.concat(Classes.nextBtn)
    },
    slides: {
      slideSelector: '.'.concat(Classes.slides.slide),
      activeSlideSelector: '.'.concat(Classes.slides.active),
      prevSlideSelector: '.'.concat(Classes.slides.prev),
      nextSlideSelector: '.'.concat(Classes.slides.next)
    }
  };
  /**
   * @description Direction where to move the slider
   */

  var Direction;

  (function (Direction) {
    Direction[Direction["Idle"] = 0] = "Idle";
    Direction[Direction["Prev"] = 1] = "Prev";
    Direction[Direction["Next"] = 2] = "Next";
  })(Direction || (Direction = {}));

  var SlideState;

  (function (SlideState) {
    SlideState[SlideState["Idle"] = 0] = "Idle";
    SlideState[SlideState["Active"] = 1] = "Active";
    SlideState[SlideState["Next"] = 2] = "Next";
    SlideState[SlideState["Prev"] = 3] = "Prev";
  })(SlideState || (SlideState = {}));

  // in worker

  /**
   * @description Create the actors that are used to get the index of acting sliders
   */

  var Actors =
  /** @class */
  function () {
    function Actors(props, lastSlideIndex) {
      this._active = [];
      this._prev = [];
      this._next = [];
      this._active = props.active;
      this._prev = props.prev;
      this._next = props.next;
      this._lastIndex = lastSlideIndex;
    }

    Object.defineProperty(Actors.prototype, "active", {
      /**
       * @description get the list of the active elements
       */
      get: function () {
        return this._active;
      },
      set: function (values) {
        this._active = values;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Actors.prototype, "next", {
      /**
       * @description get the list of the next elements
       */
      get: function () {
        return this._next;
      },
      set: function (values) {
        this._next = values;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Actors.prototype, "prev", {
      /**
       * @description get the list of the previous elements
       */
      get: function () {
        return this._prev;
      },
      set: function (values) {
        this._prev = values;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Actors.prototype, "lastIndex", {
      /**
       * @description get the index of the last element
       */
      get: function () {
        return this._lastIndex;
      },
      set: function (value) {
        this._lastIndex = value;
      },
      enumerable: false,
      configurable: true
    });
    /**
     * @description increase by one the values in an array up to the last index if it is bigger then the last index then it becomes zero
     * @param indexes array of numbers
     */

    Actors.prototype._increaseValue = function (indexes) {
      var _this = this;

      return indexes.map(function (i) {
        return i != _this.lastIndex ? ++i : 0;
      });
    };
    /**
     * @description decrease by on the values in an array up to zero if it is lower then zero then it becomes last index
     * @param indexes array of numbers
     */


    Actors.prototype._decreaseValue = function (indexes) {
      var _this = this;

      return indexes.map(function (i) {
        return i ? --i : _this.lastIndex;
      });
    };
    /**
     * @description shift all the values accordingly to the new index
     * @param newIndex target where to jump
     * @param indexes array of number
     */


    Actors.prototype._jumpToValue = function (newIndex, indexes) {
      var _this = this;

      return indexes.map(function (i) {
        return i + newIndex > _this.lastIndex ? i + newIndex - _this.lastIndex - 1 : i + newIndex;
      });
    };

    Object.defineProperty(Actors.prototype, "change", {
      /**
       * @description update the index of slides accordingly to direction to move
       * @param direction direction to go
       * @param lastSlide slider last slide
       */
      set: function (direction) {
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
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Actors.prototype, "changeTo", {
      /**
       * @description change all the actors to a certain value starting from the @index in active
       * @param index root index to change all other
       */
      set: function (index) {
        this.active = this._jumpToValue(index, this.active);
        this.next = this._jumpToValue(index, this.next);
        this.prev = this._jumpToValue(index, this.prev);
      },
      enumerable: false,
      configurable: true
    });
    return Actors;
  }();

  var classAdd = function (elem, className) {
    if (elem) elem.classList.add(className);
  };
  var classRemove = function (elem, className) {
    if (elem) elem.classList.remove(className);
  };

  var SliderWrapper =
  /** @class */
  function () {
    function SliderWrapper(wrapperElement, options) {
      this._wrapElem = wrapperElement;
      this._options = options;

      var slides = this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);

      this._slidesIndex = {
        active: [0],
        next: [1],
        prev: [slides.length - 1]
      };
      this._direction = Direction.Idle;
      this._actors = new Actors(this._slidesIndex, slides.length - 1);
      this._animating = false;
      this._slideList = this._createSlideList(this._slidesIndex);

      this._updateAllSlidesClasses();

      if (slides.length) {
        this._eventsHandler();
      }
    }

    SliderWrapper.prototype._createSlideList = function (slidesIndex) {
      var _this = this;

      return {
        active: slidesIndex.active.map(function (s) {
          return _this._slides[s];
        }),
        prev: slidesIndex.prev.map(function (s) {
          return _this._slides[s];
        }),
        next: slidesIndex.next.map(function (s) {
          return _this._slides[s];
        })
      };
    };

    SliderWrapper.prototype._eventsHandler = function () {
      this._wrapElem.addEventListener('transitionend', this._animationEnd.bind(this), false);
    };

    Object.defineProperty(SliderWrapper.prototype, "movedTo", {
      /**
       * @description Get the slider moved direction
       */
      get: function () {
        return this._direction;
      },

      /**
       * @description Sets where the slider moved to
       */
      set: function (direction) {
        if (!this._animating) {
          this._animating = true;
          this._direction = direction;
          if (direction === Direction.Prev && this._slides.length === 2) this._updateSlidesClasses(this._slideList.prev, Classes.slides.prev);
          classAdd(this._wrapElem, direction === Direction.Prev ? Classes.prev : Classes.next);
        }
      },
      enumerable: false,
      configurable: true
    });

    SliderWrapper.prototype._animationEnd = function () {
      this._actors.change = this.movedTo;

      this._updateAllSlidesClasses();

      classRemove(this._wrapElem, this.movedTo === Direction.Prev ? Classes.prev : Classes.next);
      this._animating = false;
    };

    SliderWrapper.prototype._updateAllSlidesClasses = function () {
      var slideList = this._slideList;

      var tempSlideList = this._createSlideList(this._actors);

      var tempSlideListArr = tempSlideList.active.concat(tempSlideList.next, tempSlideList.prev);
      var idleList = slideList.active.concat(slideList.next, slideList.prev).filter(function (s) {
        return tempSlideListArr.indexOf(s) === -1;
      });
      this._slideList = tempSlideList;

      this._updateSlidesClasses(idleList);

      this._updateSlidesClasses(tempSlideList.active, Classes.slides.active);

      this._updateSlidesClasses(tempSlideList.next, Classes.slides.next);

      if (this._slides.length > 2) this._updateSlidesClasses(tempSlideList.prev, Classes.slides.prev);
    };
    /**
     * @description Graphicaly move the slide in idle/active/next/prev position
     */


    SliderWrapper.prototype._updateSlidesClasses = function (slides, className) {
      if (className === void 0) {
        className = '';
      } // for (const slide of slides) {


      for (var i = 0; i < slides.length; i++) {
        classRemove(slides[i], Classes.slides.active);
        classRemove(slides[i], Classes.slides.next);
        classRemove(slides[i], Classes.slides.prev);
        if (className) classAdd(slides[i], className);
      }
    };

    return SliderWrapper;
  }();

  var Slider =
  /** @class */
  function () {
    function Slider(selector, options) {
      this._options = options != null ? Object.assign(Options, options) : Options;

      if (selector != null) {
        this._sliderElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
        this._wrapperElement = this._sliderElement.querySelector(this._options.wrapperSelector);
        this._wrapper = new SliderWrapper(this._wrapperElement, this._options);
        this._prevBtn = this._sliderElement.querySelector(this._options.controls.prevBtnSelector);
        this._nextBtn = this._sliderElement.querySelector(this._options.controls.nextBtnSelector);

        this._init();
      } else {
        console.error("Wrong selector for slider was used: ", selector);
      }
    }

    Slider.prototype._init = function () {
      if (this._prevBtn) this._prevBtn.addEventListener('click', this.move.bind(this, Direction.Prev), false);
      if (this._nextBtn) this._nextBtn.addEventListener('click', this.move.bind(this, Direction.Next), false);
    };
    /**
     * @description make a single move
     */


    Slider.prototype.move = function (direction) {
      if (this._wrapper) {
        this._wrapper.movedTo = direction;
      }
    };

    return Slider;
  }();

  exports.Slider = Slider;

  return exports;

}({}));
