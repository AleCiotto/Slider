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

// TODO: Evaluate if need to move this class
// in worker
/**
 * @description Create the actors that are used to get the index of acting sliders
 */
var Actors = /** @class */ (function () {
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
            }
            else {
                active = active ? --active : slideLength;
                prev = prev ? --prev : slideLength;
                next = next ? --next : slideLength;
            }
            _this.active = active;
            _this.prev = prev;
            _this.next = next;
            return { active: active, prev: prev, next: next };
        };
        this._changeActors = changeActors;
    }
    Actors.prototype.change = function (direction) {
        return this._changeActors(direction);
    };
    return Actors;
}());

var classAdd = function (elem, className) {
    if (elem)
        elem.classList.add(className);
};
var classRemove = function (elem, className) {
    if (elem)
        elem.classList.remove(className);
};

var SliderWrapper = /** @class */ (function () {
    function SliderWrapper(wrapperElement, options) {
        this._wrapElem = wrapperElement;
        this._options = options;
        var slides = this._slides = this._wrapElem.querySelectorAll(this._options.slides.slideSelector);
        this._slidesIndex = {
            active: 0,
            next: 1,
            prev: slides.length - 1
        };
        this._direction = Direction.Idle;
        this._actors = new Actors(this._slidesIndex);
        this._animating = false;
        this._slide = {
            active: slides[this._slidesIndex.active],
            prev: slides[this._slidesIndex.prev],
            next: slides[this._slidesIndex.next]
        };
        this._updateSlides(this._slidesIndex);
        if (slides.length) {
            this._eventsHandler();
        }
    }
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
                var isPrev = direction === Direction.Prev;
                if (isPrev && this._slides.length === 2)
                    this._becomePrev(this._slide.next);
                classAdd(this._wrapElem, isPrev ? Classes.prev : Classes.next);
            }
        },
        enumerable: false,
        configurable: true
    });
    SliderWrapper.prototype._animationEnd = function () {
        var toIdle = this._actors.change(Direction.Next);
        this._updateSlides(this._slidesIndex);
        classRemove(this._wrapElem, Classes.prev);
        classRemove(this._wrapElem, Classes.next);
        this._animating = false;
    };
    SliderWrapper.prototype._updateSlides = function (actors) {
        this._becomeActive(this._slides[actors.active]);
        this._becomeNext(this._slides[actors.next]);
        if (this._slides.length > 2)
            this._becomePrev(this._slides[actors.prev]);
        this._updateSlideState(this._slide, actors);
    };
    SliderWrapper.prototype._updateSlideState = function (slide, actors) {
        slide.active = this._slides[actors.active];
        slide.next = this._slides[actors.next];
        slide.prev = this._slides[actors.prev];
    };
    /**
     * @description Graphicaly move the slide in idle position away from the slider
     */
    SliderWrapper.prototype._becomeIdle = function (slide) {
        classRemove(slide, Classes.slides.active);
        classRemove(slide, Classes.slides.next);
        classRemove(slide, Classes.slides.prev);
    };
    /**
     * @description Graphicaly move the slide in active position of the slider
     */
    SliderWrapper.prototype._becomeActive = function (slide) {
        classRemove(slide, Classes.slides.prev);
        classRemove(slide, Classes.slides.next);
        classAdd(slide, Classes.slides.active);
    };
    /**
     * @description Graphicaly move the slide a the beggining of the slider
     */
    SliderWrapper.prototype._becomePrev = function (slide) {
        classRemove(slide, Classes.slides.active);
        classRemove(slide, Classes.slides.next);
        classAdd(slide, Classes.slides.prev);
    };
    /**
     * @description Graphicaly move the slide a the end of the slider
     */
    SliderWrapper.prototype._becomeNext = function (slide) {
        classRemove(slide, Classes.slides.active);
        classRemove(slide, Classes.slides.prev);
        classAdd(slide, Classes.slides.next);
    };
    return SliderWrapper;
}());

var Slider = /** @class */ (function () {
    function Slider(selector, options) {
        this._options = options != null ? Object.assign(Options, options) : Options;
        if (selector != null) {
            this._sliderElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
            this._wrapperElement = this._sliderElement.querySelector(this._options.wrapperSelector);
            this._wrapper = new SliderWrapper(this._wrapperElement, this._options);
            this._prevBtn = this._sliderElement.querySelector(this._options.controls.prevBtnSelector);
            this._nextBtn = this._sliderElement.querySelector(this._options.controls.nextBtnSelector);
            this._init();
        }
        else {
            console.error("Wrong selector for slider was used: ", selector);
        }
    }
    Slider.prototype._init = function () {
        if (this._prevBtn)
            this._prevBtn.addEventListener('click', this.move.bind(this, Direction.Prev), false);
        if (this._nextBtn)
            this._nextBtn.addEventListener('click', this.move.bind(this, Direction.Next), false);
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
}());

export { Slider };
