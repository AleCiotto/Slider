define(['exports'], function (exports) { 'use strict';

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
  var Direction;

  (function (Direction) {
    Direction[Direction["Prev"] = 0] = "Prev";
    Direction[Direction["Next"] = 1] = "Next";
  })(Direction || (Direction = {}));

  var SliderWrapper =
  /** @class */
  function () {
    function SliderWrapper(wrapperElement, options) {
      this._wrapElem = wrapperElement;
      this._options = options;
      this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
      this._actors = this._createActors();
      this._animating = false;
      this._slide = {
        active: this._slides[this._actors.current().active],
        prev: this._slides[this._actors.current().prev],
        next: this._slides[this._actors.current().next]
      };

      this._updateSlides(this._actors.current());

      if (this._slides.length) {
        this._eventsHandler();
      }
    }

    SliderWrapper.prototype._createActors = function () {
      var _this = this;

      var active = 0;
      var prev = this._slides.length - 1;
      var next = 1;

      var changeActor = function (direction) {
        if (direction === Direction.Prev) {
          active = !active ? _this._slides.length - 1 : --active;
          prev = !prev ? _this._slides.length - 1 : --prev;
          next = !next ? _this._slides.length - 1 : --next;
          console.log('Moving Prev', active, prev, next);
        } else {
          active = active === _this._slides.length - 1 ? 0 : ++active;
          prev = prev === _this._slides.length - 1 ? 0 : ++prev;
          next = next === _this._slides.length - 1 ? 0 : ++next;
          console.log('Moving Next', active, prev, next);
        }
      };

      return {
        updateOnPrevMove: function () {
          changeActor(Direction.Prev);
        },
        updateOnNextMove: function () {
          changeActor(Direction.Next);
        },
        current: function () {
          return {
            active: active,
            prev: prev,
            next: next
          };
        }
      };
    };

    SliderWrapper.prototype._eventsHandler = function () {
      this._wrapElem.addEventListener('transitionend', this._animationEnd.bind(this), false);
    };
    /**
     * movePrev
     */


    SliderWrapper.prototype.movePrev = function () {
      if (!this._animating) {
        this._animating = true;

        if (this._slide.prev === this._slide.next) {
          this._resetSlide(this._actors.current().next);

          this._updatePrevSlide(this._actors.current().active + 1);
        }

        this._actors.updateOnPrevMove();

        this._wrapElem.classList.add(Classes.prev);
      }
    };
    /**
     * moveNext
     */


    SliderWrapper.prototype.moveNext = function () {
      if (!this._animating) {
        this._animating = true;

        this._actors.updateOnNextMove();

        this._wrapElem.classList.add(Classes.next);
      }
    };

    SliderWrapper.prototype._animationEnd = function () {
      this._updateSlides(this._actors.current());

      this._wrapElem.classList.remove(Classes.prev);

      this._wrapElem.classList.remove(Classes.next);

      this._animating = false;
    };

    SliderWrapper.prototype._updateSlides = function (actors) {
      this._updateActiveSlide(actors.active);

      this._updatePrevSlide(actors.prev);

      this._updateNextSlide(actors.next);
    };

    SliderWrapper.prototype._updateActiveSlide = function (slideId) {
      this._updateSlide('active', slideId);
    };

    SliderWrapper.prototype._updatePrevSlide = function (slideId) {
      this._updateSlide('prev', slideId);
    };

    SliderWrapper.prototype._updateNextSlide = function (slideId) {
      this._updateSlide('next', slideId);
    };

    SliderWrapper.prototype._resetSlide = function (slideId) {
      this._slides[slideId].classList.remove(Classes.slides.active);

      this._slides[slideId].classList.remove(Classes.slides.prev);

      this._slides[slideId].classList.remove(Classes.slides.next);
    };

    SliderWrapper.prototype._updateSlide = function (slideName, slideId) {
      if (!this._slide[slideName]) {
        this._slide[slideName] = this._slides[slideId];
      } else {
        this._slide[slideName].classList.remove(Classes.slides[slideName]);

        this._slide[slideName] = this._slides[slideId];

        this._slide[slideName].classList.add(Classes.slides[slideName]);
      }
    };

    SliderWrapper.prototype._clearSlideClasses = function (slide) {
      slide.classList.remove(Classes.slides.active);
      slide.classList.remove(Classes.slides.prev);
      slide.classList.remove(Classes.slides.next);
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
