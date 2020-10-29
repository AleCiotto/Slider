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
    Direction[Direction["Prev"] = 0] = "Prev";
    Direction[Direction["Next"] = 1] = "Next";
  })(Direction || (Direction = {}));

  // in worker

  /**
   * @description Create the actors that are used to get the index of acting sliders
   */

  var Actors =
  /** @class */
  function () {
    function Actors(props) {
      var _this = this;

      this.active = 0;
      this.prev = 0;
      this.next = 0;
      var active = props.active;
      var prev = props.prev;
      var next = props.next;
      var slideLength = props.prev;

      var changeActors = function (direction) {
        if (direction === Direction.Next) {
          active = active != slideLength ? ++active : 0;
          prev = prev != slideLength ? ++prev : 0;
          next = next != slideLength ? ++next : 0;
        } else {
          active = active ? --active : slideLength;
          prev = prev ? --prev : slideLength;
          next = next ? --next : slideLength;
        }

        _this.active = active;
        _this.prev = prev;
        _this.next = next;
        return {
          active: active,
          prev: prev,
          next: next
        };
      };

      this._changeActors = changeActors;
    }

    Actors.prototype.changeActors = function (direction) {
      return this._changeActors(direction);
    };

    return Actors;
  }();

  var SliderWrapper =
  /** @class */
  function () {
    function SliderWrapper(wrapperElement, options) {
      this._wrapElem = wrapperElement;
      this._options = options;
      this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
      var actors = {
        active: 0,
        next: 1,
        prev: this._slides.length - 1
      };
      this._actors = new Actors(actors);
      this._animating = false;
      this._slide = {
        active: this._slides[actors.active],
        prev: this._slides[actors.prev],
        next: this._slides[actors.next]
      };

      this._updateSlides(actors);

      if (this._slides.length) {
        this._eventsHandler();
      }
    }

    SliderWrapper.prototype._eventsHandler = function () {
      this._wrapElem.addEventListener('transitionend', this._animationEnd.bind(this), false);
    };
    /**
     * movePrev
     */


    SliderWrapper.prototype.movePrev = function () {
      if (!this._animating) {
        this._animating = true;

        this._actors.changeActors(Direction.Prev);

        if (this._slides.length === 2) this._becomePrev(this._slide.next);

        this._wrapElem.classList.add(Classes.prev);
      }
    };
    /**
     * moveNext
     */


    SliderWrapper.prototype.moveNext = function () {
      if (!this._animating) {
        this._animating = true;

        this._actors.changeActors(Direction.Next);

        this._wrapElem.classList.add(Classes.next);
      }
    };

    SliderWrapper.prototype._animationEnd = function () {
      this._updateSlides(this._actors);

      this._wrapElem.classList.remove(Classes.prev);

      this._wrapElem.classList.remove(Classes.next);

      this._animating = false;
    };

    SliderWrapper.prototype._updateSlides = function (actors) {
      this._becomeActive(this._slides[actors.active]);

      this._becomeNext(this._slides[actors.next]);

      if (this._slides.length > 2) this._becomePrev(this._slides[actors.prev]);

      this._updateSlide(this._slide, actors);
    };

    SliderWrapper.prototype._resetSlide = function (slideId) {
      this._slides[slideId].classList.remove(Classes.slides.active);

      this._slides[slideId].classList.remove(Classes.slides.prev);

      this._slides[slideId].classList.remove(Classes.slides.next);
    };

    SliderWrapper.prototype._updateSlide = function (slide, actors) {
      slide.active = this._slides[actors.active];
      slide.next = this._slides[actors.next];
      slide.prev = this._slides[actors.prev];
    };

    SliderWrapper.prototype._clearSlideClasses = function (slide) {
      slide.classList.remove(Classes.slides.active);
      slide.classList.remove(Classes.slides.prev);
      slide.classList.remove(Classes.slides.next);
    };
    /**
     * @description Graphicaly move the slide in active position of the slider
     */


    SliderWrapper.prototype._becomeActive = function (slide) {
      slide.classList.remove(Classes.slides.prev);
      slide.classList.remove(Classes.slides.next);
      slide.classList.add(Classes.slides.active);
    };
    /**
     * @description Graphicaly move the slide a the beggining of the slider
     */


    SliderWrapper.prototype._becomePrev = function (slide) {
      slide.classList.remove(Classes.slides.active);
      slide.classList.remove(Classes.slides.next);
      slide.classList.add(Classes.slides.prev);
    };
    /**
     * @description Graphicaly move the slide a the end of the slider
     */


    SliderWrapper.prototype._becomeNext = function (slide) {
      slide.classList.remove(Classes.slides.active);
      slide.classList.remove(Classes.slides.prev);
      slide.classList.add(Classes.slides.next);
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
      if (this._prevBtn) this._prevBtn.addEventListener('click', this.movePrev.bind(this), false);
      if (this._nextBtn) this._nextBtn.addEventListener('click', this.moveNext.bind(this), false);
    };
    /**
     * moveNext
     */


    Slider.prototype.moveNext = function () {
      if (this._wrapper) {
        this._wrapper.moveNext();
      }
    };
    /**
     * movePrev
     */


    Slider.prototype.movePrev = function () {
      if (this._wrapper) {
        this._wrapper.movePrev();
      }
    };

    return Slider;
  }();

  exports.Slider = Slider;

  return exports;

}({}));
