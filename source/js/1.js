(function ($, undefined) {
    'use strict';
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,
        addClass: '',
        mode: 'slide',
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',
        easing: 'linear', //'for jquery animation',//
        speed: 400, //ms'
        auto: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,
        keyPress: false,
        controls: true,
        prevHtml: '',
        nextHtml: '',
        rtl: false,
        adaptiveHeight: false,
        vertical: false,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',
        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        swipeThreshold: 40,
        responsive: [],
        /* jshint ignore:start */
        onBeforeStart: function ($el) {},
        onSliderLoad: function ($el) {},
        onBeforeSlide: function ($el, scene) {},
        onAfterSlide: function ($el, scene) {},
        onBeforeNextSlide: function ($el, scene) {},
        onBeforePrevSlide: function ($el, scene) {}
        /* jshint ignore:end */
    };
    $.fn.lightSlider = function (options) {
        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).lightSlider(options);
            });
            return this;
        }

        var plugin = {},
            settings = $.extend(true, {}, defaults, options),
            settingsTemp = {},
            $el = this;
        plugin.$el = this;

        if (settings.mode === 'fade') {
            settings.vertical = false;
        }
        var $children = $el.children(),
            windowW = $(window).width(),
            breakpoint = null,
            resposiveObj = null,
            length = 0,
            w = 0,
            on = false,
            elSize = 0,
            $slide = '',
            scene = 0,
            property = (settings.vertical === true) ? 'height' : 'width',
            gutter = (settings.vertical === true) ? 'margin-bottom' : 'margin-right',
            slideValue = 0,
            pagerWidth = 0,
            slideWidth = 0,
            thumbWidth = 0,
            interval = null,
            isTouch = ('ontouchstart' in document.documentElement);
        var refresh = {};

        refresh.chbreakpoint = function () {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item;
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                                settingsTemp[j] = settings[j];
                            }
                            settings[j] = resposiveObj.settings[j];
                        }
                    }
                }
                if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
                    for (var k in settingsTemp) {
                        if (settingsTemp.hasOwnProperty(k)) {
                            settings[k] = settingsTemp[k];
                        }
                    }
                }
                if (settings.autoWidth === false) {
                    if (slideValue > 0 && slideWidth > 0) {
                        if (item !== settings.item) {
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove));
                        }
                    }
                }
            }
        };

        refresh.calSW = function () {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };

        refresh.calWidth = function (cln) {
            var ln = cln === true ? $slide.find('.lslide').length : $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w;
        };
        plugin = {
            doCss: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            keyPress: function () {
                if (settings.keyPress) {
                    $(document).on('keyup.lightslider', function (e) {
                        if (!$(':focus').is('input, textarea')) {
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            if (e.keyCode === 37) {
                                $el.goToPrevSlide();
                                clearInterval(interval);
                            } else if (e.keyCode === 39) {
                                $el.goToNextSlide();
                                clearInterval(interval);
                            }
                        }
                    });
                }
            },
            controls: function () {
                if (settings.controls) {
                    $el.after('<div class="lSAction"><a class="lSPrev">' + settings.prevHtml + '</a><a class="lSNext">' + settings.nextHtml + '</a></div>');
                    if (!settings.autoWidth) {
                        if (length <= settings.item) {
                            $slide.find('.lSAction').hide();
                        }
                    } else {
                        if (refresh.calWidth(false) < elSize) {
                            $slide.find('.lSAction').hide();
                        }
                    }
                    $slide.find('.lSAction a').on('click', function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                        if ($(this).attr('class') === 'lSPrev') {
                            if (settings.rtl === true) {
                                $el.goToNextSlide();
                            }
                            else {
                                $el.goToPrevSlide();
                            }
                        } else {
                            if (settings.rtl === true) {
                                $el.goToPrevSlide();
                            }
                            else {
                                $el.goToNextSlide();
                            }
                        }
                        clearInterval(interval);
                        return false;
                    });
                }
            },
            initialStyle: function () {
                var $this = this;
                if (settings.mode === 'fade') {
                    settings.autoWidth = false;
                    settings.slideEndAnimation = false;
                }
                if (settings.auto) {
                    settings.slideEndAnimation = false;
                }
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1;
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false;
                }
                settings.onBeforeStart.call(this, $el);
                refresh.chbreakpoint();
                $el.addClass('lightSlider').wrap('<div class="lSSlideOuter ' + settings.addClass + '"><div class="lSSlideWrapper"></div></div>');
                $slide = $el.parent('.lSSlideWrapper');
                if (settings.rtl === true) {
                    $slide.parent().addClass('lSrtl');
                }
                if (settings.vertical) {
                    $slide.parent().addClass('vertical');
                    elSize = settings.verticalHeight;
                    $slide.css('height', elSize + 'px');
                } else {
                    elSize = $el.outerWidth();
                }
                $children.addClass('lslide');
                if (settings.loop === true && settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.clone = function () {
                        if (refresh.calWidth(true) > elSize) {
                            /**/
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find('.lslide').eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break;
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI : settings.item;

                            /**/
                            if (tItem < $el.find('.clone.left').length) {
                                for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                                    $children.eq(i).remove();
                                }
                            }
                            if (tItem < $el.find('.clone.right').length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find('.clone.right').length); j--) {
                                    scene--;
                                    $children.eq(j).remove();
                                }
                            }
                            /**/
                            for (var n = $el.find('.clone.right').length; n < tItem; n++) {
                                $el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);
                                scene++;
                            }
                            for (var m = $el.find('.lslide').length - $el.find('.clone.left').length; m > ($el.find('.lslide').length - tItem); m--) {
                                $el.find('.lslide').eq(m - 1).clone().removeClass('lslide').addClass('clone left').prependTo($el);
                            }
                            $children = $el.children();
                        } else {
                            if ($children.hasClass('clone')) {
                                $el.find('.clone').remove();
                                $this.move($el, 0);
                            }
                        }
                    };
                    refresh.clone();
                }
                refresh.sSW = function () {
                    length = $children.length;
                    if (settings.rtl === true && settings.vertical === false) {
                        gutter = 'margin-left';
                    }
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + 'px');
                    }
                    $children.css(gutter, settings.slideMargin + 'px');
                    w = refresh.calWidth(false);
                    $el.css(property, w + 'px');
                    if (settings.loop === true && settings.mode === 'slide') {
                        if (on === false) {
                            scene = $el.find('.clone.left').length;
                        }
                    }
                };
                refresh.calL = function () {
                    $children = $el.children();
                    length = $children.length;
                };
                if (this.doCss()) {
                    $slide.addClass('usingCss');
                }
                refresh.calL();
                if (settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.sSW();
                    if (settings.loop === true) {
                        slideValue = $this.slideValue();
                        this.move($el, slideValue);
                    }
                    if (settings.vertical === false) {
                        this.setHeight($el, false);
                    }

                } else {
                    this.setHeight($el, true);
                    $el.addClass('lSFade');
                    if (!this.doCss()) {
                        $children.fadeOut(0);
                        $children.eq(scene).fadeIn(0);
                    }
                }
                if (settings.loop === true && settings.mode === 'slide') {
                    $children.eq(scene).addClass('active');
                } else {
                    $children.first().addClass('active');
                }
            },
            pager: function () {
                var $this = this;
                refresh.createPager = function () {
                    thumbWidth = (elSize - ((settings.thumbItem * (settings.thumbMargin)) - settings.thumbMargin)) / settings.thumbItem;
                    var $children = $slide.find('.lslide');
                    var length = $slide.find('.lslide').length;
                    var i = 0,
                        pagers = '',
                        v = 0;
                    for (i = 0; i < length; i++) {
                        if (settings.mode === 'slide') {
                            // calculate scene * slide value
                            if (!settings.autoWidth) {
                                v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
                            } else {
                                v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove);
                            }
                        }
                        var thumb = $children.eq(i * settings.slideMove).attr('data-thumb');
                        if (settings.gallery === true) {
                            pagers += '<li style="width:100%;' + property + ':' + thumbWidth + 'px;' + gutter + ':' + settings.thumbMargin + 'px"><a href="#"><img src="' + thumb + '" /></a></li>';
                        } else {
                            pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                        }
                        if (settings.mode === 'slide') {
                            if ((v) >= w - elSize - settings.slideMargin) {
                                i = i + 1;
                                var minPgr = 2;
                                if (settings.autoWidth) {
                                    pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                                    minPgr = 1;
                                }
                                if (i < minPgr) {
                                    pagers = null;
                                    $slide.parent().addClass('noPager');
                                } else {
                                    $slide.parent().removeClass('noPager');
                                }
                                break;
                            }
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find('.lSPager').html(pagers); 
                    if (settings.gallery === true) {
                        if (settings.vertical === true) {
                            // set Gallery thumbnail width
                            $cSouter.find('.lSPager').css('width', settings.vThumbWidth + 'px');
                        }
                        pagerWidth = (i * (settings.thumbMargin + thumbWidth)) + 0.5;
                        $cSouter.find('.lSPager').css({
                            property: pagerWidth + 'px',
                            'transition-duration': settings.speed + 'ms'
                        });
                        if (settings.vertical === true) {
                            $slide.parent().css('padding-right', (settings.vThumbWidth + settings.galleryMargin) + 'px');
                        }
                        $cSouter.find('.lSPager').css(property, pagerWidth + 'px');
                    }
                    var $pager = $cSouter.find('.lSPager').find('li');
                    $pager.first().addClass('active');
                    $pager.on('click', function () {
                        if (settings.loop === true && settings.mode === 'slide') {
                            scene = scene + ($pager.index(this) - $cSouter.find('.lSPager').find('li.active').index());
                        } else {
                            scene = $pager.index(this);
                        }
                        $el.mode(false);
                        if (settings.gallery === true) {
                            $this.slideThumb();
                        }
                        clearInterval(interval);
                        return false;
                    });
                };
                if (settings.pager) {
                    var cl = 'lSpg';
                    if (settings.gallery) {
                        cl = 'lSGallery';
                    }
                    $slide.after('<ul class="lSPager ' + cl + '"></ul>');
                    var gMargin = (settings.vertical) ? 'margin-left' : 'margin-top';
                    $slide.parent().find('.lSPager').css(gMargin, settings.galleryMargin + 'px');
                    refresh.createPager();
                }

                setTimeout(function () {
                    refresh.init();
                }, 0);
            },
            setHeight: function (ob, fade) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children('.lslide ').first();
                } else {
                    obj = ob.children().first();
                }
                var setCss = function () {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    if (fade) {
                        tH = 0;
                        tP = ((tHT) * 100) / elSize;
                    }
                    ob.css({
                        'height': tH + 'px',
                        'padding-bottom': tP + '%'
                    });
                };
                setCss();
                if (obj.find('img').length) {
                    if ( obj.find('img')[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto();
                        }   
                    }else{
                        obj.find('img').load(function () {
                            setTimeout(function () {
                                setCss();
                                if (!interval) {
                                    $this.auto();
                                }
                            }, 100);
                        });
                    }
                }else{
                    if (!interval) {
                        $this.auto();
                    }
                }
            },
            active: function (ob, t) {
                if (this.doCss() && settings.mode === 'fade') {
                    $slide.addClass('on');
                }
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                    }
                    if (t === true) {
                        sc = scene;
                    } else {
                        sc = scene * settings.slideMove;
                    }
                    //t === true ? sc = scene : sc = scene * settings.slideMove;
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl;
                        }
                    }
                    if (settings.loop === true && settings.mode === 'slide') {
                        //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
                        if (t === true) {
                            sc = scene - $el.find('.clone.left').length;
                        } else {
                            sc = scene * settings.slideMove;
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl;
                            } else if (sc + 1 > l) {
                                sc = 0;
                            }
                        }
                    }

                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                    ob.eq(sc).addClass('active');
                } else {
                    ob.removeClass('active');
                    ob.eq(ob.length - 1).addClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                }
            },
            move: function (ob, v) {
                if (settings.rtl === true) {
                    v = -v;
                }
                if (this.doCss()) {
                    if (settings.vertical === true) {
                        ob.css({
                            'transform': 'translate3d(0px, ' + (-v) + 'px, 0px)',
                            '-webkit-transform': 'translate3d(0px, ' + (-v) + 'px, 0px)'
                        });
                    } else {
                        ob.css({
                            'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                            '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)'
                        });
                    }
                } else {
                    if (settings.vertical === true) {
                        ob.css('position', 'relative').animate({
                            top: -v + 'px'
                        }, settings.speed, settings.easing);
                    } else {
                        ob.css('position', 'relative').animate({
                            left: -v + 'px'
                        }, settings.speed, settings.easing);
                    }
                }
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            fade: function () {
                this.active($children, false);
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            slide: function () {
                var $this = this;
                refresh.calSlide = function () {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        $this.active($children, false);
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin;
                        } else if (slideValue < 0) {
                            slideValue = 0;
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true && settings.mode === 'slide') {
                            if (scene >= (length - ($el.find('.clone.left').length / settings.slideMove))) {
                                $this.resetSlide($el.find('.clone.left').length);
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find('.lslide').length);
                            }
                        }
                    }
                };
                refresh.calSlide();
            },
            resetSlide: function (s) {
                var $this = this;
                $slide.find('.lSAction a').addClass('disabled');
                setTimeout(function () {
                    scene = s;
                    $slide.css('transition-duration', '0ms');
                    slideValue = $this.slideValue();
                    $this.active($children, false);
                    plugin.move($el, slideValue);
                    setTimeout(function () {
                        $slide.css('transition-duration', settings.speed + 'ms');
                        $slide.find('.lSAction a').removeClass('disabled');
                    }, 50);
                }, settings.speed + 100);
            },
            slideValue: function () {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin);
                    }
                }
                return _sV;
            },
            slideThumb: function () {
                var position;
                switch (settings.currentPagerPosition) {
                case 'left':
                    position = 0;
                    break;
                case 'middle':
                    position = (elSize / 2) - (thumbWidth / 2);
                    break;
                case 'right':
                    position = elSize - thumbWidth;
                }
                var sc = scene - $el.find('.clone.left').length;
                var $pager = $slide.parent().find('.lSPager');
                if (settings.mode === 'slide' && settings.loop === true) {
                    if (sc >= $pager.children().length) {
                        sc = 0;
                    } else if (sc < 0) {
                        sc = $pager.children().length;
                    }
                }
                var thumbSlide = sc * ((thumbWidth + settings.thumbMargin)) - (position);
                if ((thumbSlide + elSize) > pagerWidth) {
                    thumbSlide = pagerWidth - elSize - settings.thumbMargin;
                }
                if (thumbSlide < 0) {
                    thumbSlide = 0;
                }
                this.move($pager, thumbSlide);
            },
            auto: function () {
                if (settings.auto) {
                    interval = setInterval(function () {
                        $el.goToNextSlide();
                    }, settings.pause);
                }
            },

            touchMove: function (endCoords, startCoords) {
                $slide.css('transition-duration', '0ms');
                if (settings.mode === 'slide') {
                    var distance = endCoords - startCoords;
                    var swipeVal = slideValue - distance;
                    if ((swipeVal) >= w - elSize - settings.slideMargin) {
                        if (settings.freeMove === false) {
                            swipeVal = w - elSize - settings.slideMargin;
                        } else {
                            var swipeValT = w - elSize - settings.slideMargin;
                            swipeVal = swipeValT + ((swipeVal - swipeValT) / 5);

                        }
                    } else if (swipeVal < 0) {
                        if (settings.freeMove === false) {
                            swipeVal = 0;
                        } else {
                            swipeVal = swipeVal / 5;
                        }
                    }
                    this.move($el, swipeVal);
                }
            },

            touchEnd: function (distance) {
                $slide.css('transition-duration', settings.speed + 'ms');
                clearInterval(interval);
                if (settings.mode === 'slide') {
                    var mxVal = false;
                    var _next = true;
                    slideValue = slideValue - distance;
                    if ((slideValue) > w - elSize - settings.slideMargin) {
                        slideValue = w - elSize - settings.slideMargin;
                        if (settings.autoWidth === false) {
                            mxVal = true;
                        }
                    } else if (slideValue < 0) {
                        slideValue = 0;
                    }
                    var gC = function (next) {
                        var ad = 0;
                        if (!mxVal) {
                            if (next) {
                                ad = 1;
                            }
                        }
                        if (!settings.autoWidth) {
                            var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                            scene = parseInt(num) + ad;
                            if (slideValue >= (w - elSize - settings.slideMargin)) {
                                if (num % 1 !== 0) {
                                    scene++;
                                }
                            }
                        } else {
                            var tW = 0;
                            for (var i = 0; i < $children.length; i++) {
                                tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                                scene = i + ad;
                                if (tW >= slideValue) {
                                    break;
                                }
                            }
                        }
                    };
                    if (distance >= settings.swipeThreshold) {
                        gC(false);
                        _next = false;
                    } else if (distance <= -settings.swipeThreshold) {
                        gC(true);
                        _next = false;
                    }
                    $el.mode(_next);
                    this.slideThumb();
                } else {
                    if (distance >= settings.swipeThreshold) {
                        $el.goToPrevSlide();
                    } else if (distance <= -settings.swipeThreshold) {
                        $el.goToNextSlide();
                    }
                }
            },



            enableDrag: function () {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.find('.lightSlider').addClass('lsGrab');
                    $slide.on('mousedown', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        if ($(e.target).attr('class') !== ('lSPrev') && $(e.target).attr('class') !== ('lSNext')) {
                            startCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            isDraging = true;
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            $slide.scrollLeft += 1;
                            $slide.scrollLeft -= 1;
                            // *
                            $slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');
                            clearInterval(interval);
                        }
                    });
                    $(window).on('mousemove', function (e) {
                        if (isDraging) {
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            $this.touchMove(endCoords, startCoords);
                        }
                    });
                    $(window).on('mouseup', function (e) {
                        if (isDraging) {
                            $slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');
                            isDraging = false;
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            var distance = endCoords - startCoords;
                            if (Math.abs(distance) >= settings.swipeThreshold) {
                                $(window).on('click.ls', function (e) {
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.returnValue = false;
                                    }
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    $(window).off('click.ls');
                                });
                            }

                            $this.touchEnd(distance);

                        }
                    });
                }
            },




            enableTouch: function () {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on('touchstart', function (e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                        clearInterval(interval);
                    });
                    $slide.on('touchmove', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                        var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (settings.vertical === true) {
                            if ((yMovement * 3) > xMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageY, startCoords.pageY);
                        } else {
                            if ((xMovement * 3) > yMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageX, startCoords.pageX);
                        }

                    });
                    $slide.on('touchend', function () {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var distance;
                        if (settings.vertical === true) {
                            distance = endCoords.pageY - startCoords.pageY;
                        } else {
                            distance = endCoords.pageX - startCoords.pageX;
                        }
                        $this.touchEnd(distance);
                    });
                }
            },
            build: function () {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {

                    if (settings.enableTouch === true) {
                        $this.enableTouch();
                    }
                    if (settings.enableDrag === true) {
                        $this.enableDrag();
                    }
                }
                $this.pager();
                $this.controls();
                $this.keyPress();
            }
        };
        plugin.build();
        refresh.init = function () {
            refresh.chbreakpoint();
            if (settings.vertical === true) {
                if (settings.item > 1) {
                    elSize = settings.verticalHeight;
                } else {
                    elSize = $children.outerHeight();
                }
                $slide.css('height', elSize + 'px');
            } else {
                elSize = $slide.outerWidth();
            }
            if (settings.loop === true && settings.mode === 'slide') {
                refresh.clone();
            }
            refresh.calL();
            if (settings.mode === 'slide') {
                $el.removeClass('lSSlide');
            }
            if (settings.mode === 'slide') {
                refresh.calSW();
                refresh.sSW();
            }
            setTimeout(function () {
                if (settings.mode === 'slide') {
                    $el.addClass('lSSlide');
                }
            }, 1000);
            if (settings.pager) {
                refresh.createPager();
            }
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (settings.adaptiveHeight === false) {
                if (settings.mode === 'slide') {
                    if (settings.vertical === false) {
                        plugin.setHeight($el, false);
                    }else{
                        plugin.auto();
                    }
                } else {
                    plugin.setHeight($el, true);
                }
            }
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            }
            if (settings.autoWidth === false) {
                if ($children.length <= settings.item) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            } else {
                if ((refresh.calWidth(false) < elSize) && (w !== 0)) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            }
        };
        $el.goToPrevSlide = function () {
            if (scene > 0) {
                settings.onBeforePrevSlide.call(this, $el, scene);
                scene--;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforePrevSlide.call(this, $el, scene);
                    if (settings.mode === 'fade') {
                        var l = (length - 1);
                        scene = parseInt(l / settings.slideMove);
                    }
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('leftEnd');
                    setTimeout(function () {
                        $el.removeClass('leftEnd');
                    }, 400);
                }
            }
        };
        $el.goToNextSlide = function () {
            var nextI = true;
            if (settings.mode === 'slide') {
                var _slideValue = plugin.slideValue();
                nextI = _slideValue < w - elSize - settings.slideMargin;
            }
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                settings.onBeforeNextSlide.call(this, $el, scene);
                scene++;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforeNextSlide.call(this, $el, scene);
                    scene = 0;
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('rightEnd');
                    setTimeout(function () {
                        $el.removeClass('rightEnd');
                    }, 400);
                }
            }
        };
        $el.mode = function (_touch) {
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (on === false) {
                if (settings.mode === 'slide') {
                    if (plugin.doCss()) {
                        $el.addClass('lSSlide');
                        if (settings.speed !== '') {
                            $slide.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $slide.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                } else {
                    if (plugin.doCss()) {
                        if (settings.speed !== '') {
                            $el.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $el.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                }
            }
            if (!_touch) {
                settings.onBeforeSlide.call(this, $el, scene);
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            } else {
                plugin.fade();
            }
            setTimeout(function () {
                if (!_touch) {
                    settings.onAfterSlide.call(this, $el, scene);
                }
            }, settings.speed);
            on = true;
        };
        $el.play = function () {
            clearInterval(interval);
            $el.goToNextSlide();
            interval = setInterval(function () {
                $el.goToNextSlide();
            }, settings.pause);
        };
        $el.pause = function () {
            clearInterval(interval);
        };
        $el.refresh = function () {
            refresh.init();
        };
        $el.getCurrentSlideCount = function () {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find('.lslide').length,
                    cl = $el.find('.clone.left').length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl);
                } else if (scene >= (ln + cl)) {
                    sc = scene - ln - cl;
                } else {
                    sc = scene - cl;
                }
            }
            return sc + 1;
        }; 
        $el.getTotalSlideCount = function () {
            return $slide.find('.lslide').length;
        };
        $el.goToSlide = function (s) {
            if (settings.loop) {
                scene = (s + $el.find('.clone.left').length - 1);
            } else {
                scene = s;
            }
            $el.mode(false);
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
        };
        setTimeout(function () {
            settings.onSliderLoad.call(this, $el);
        }, 10);
        $(window).on('resize orientationchange', function (e) {
            setTimeout(function () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                refresh.init();
            }, 200);
        });
        return this;
    };
}(jQuery));;
(function ($) {
	var is_mobile = false;
	var is_rtl = false;
	var popup_size = 700 ;

	Drupal.behaviors.afpGlobal = {
		attach: function (context, settings) {
			//*************************************************************************
			//DETECT ARABIC
			is_rtl = ( $("html").attr("dir") == "rtl" ) ;

			//We check if language is arabic to have the right display for slideshow
			//According with AFP, prev become next and next become prev (...)

			//*************************************************************************
			//HOME DIAPORAMA SLIDER (home-diaporama.html)
			if ( $( "#diaporama" ).length ) {
				var slider = $("#diaporama > ul").lightSlider({
					useCSS:true,
					item:1,
					//thumbItem:9,
					slideMargin: 0,
					adaptiveHeight:true,
					speed:1000,
					pager:false,
					auto:false,
					loop:true,
					rtl:is_rtl,
					onSliderLoad: function (el) {
						//$slide = el.parent('.lSSlideWrapper')
						//$slide.find('.lSAction').hide();
					}
				});
			}

			//*************************************************************************
			//TOP STORIES  SLIDER info-topstories.html
			if ( $( "#topstories_slider" ).length ) {
				var topstories_slider = $("#topstories_slider > ul").lightSlider({
					useCSS:true,
					item: 5 ,
					//thumbItem:9,
					slideMargin: 10,
					adaptiveHeight:false,
					speed:1000,
					pager:false,
					controls:false,
					auto:false,
					loop:true,
					rtl:is_rtl,
					responsive : [
						//IF MOBILE = 1 // IF TABLET = 2 // IF DESKTOP = 5
						{	breakpoint:770,	settings: {item:1,slideMargin: 0,controls:true,adaptiveHeight:true} } ,
						{	breakpoint:480,	settings: {item:1,slideMargin: 0,controls:true,adaptiveHeight:true} }
					]


				});

				$('#topstories_slider_prev').click(function(){
					if (is_rtl) {
						topstories_slider.goToNextSlide();
					}
					else {
						topstories_slider.goToPrevSlide();
					}
				});
				$('#topstories_slider_next').click(function(){
					if (is_rtl) {
						topstories_slider.goToPrevSlide();
					}
					else {
						topstories_slider.goToNextSlide();
					}
				});
			}

			//*************************************************************************
			//HOME  SLIDER home-topslider.html
			if ( $( "#home_slider" ).length ) {
				var home_slider = $("#home_slider > ul").lightSlider({
					useCSS:true,
					item: 5 ,
					//thumbItem:9,
					slideMargin: 10,
					adaptiveHeight:false,
					speed:1000,
					pager:false,
					controls:false,
					auto:false,
					loop:true,
					rtl:is_rtl,
					responsive : [
						//IF MOBILE = 1 // IF TABLET = 2 // IF DESKTOP = 5
						{	breakpoint:770,	settings: {item:1,slideMargin:0,controls:true,adaptiveHeight:true} } ,
						{	breakpoint:480,	settings: {item:1,slideMargin:0,controls:true,adaptiveHeight:true} }
					]
				});

				$('#home_slider_prev').click(function(){
					if (is_rtl) {
						home_slider.goToNextSlide();
					}
					else {
						home_slider.goToPrevSlide();
					}
				});
				$('#home_slider_next').click(function(){
					if (is_rtl) {
						home_slider.goToPrevSlide();
					}
					else {
						home_slider.goToNextSlide();
					}
				});
			}

			//*************************************************************************
			//ACTU AFP > tabbed_diaporama (actuafp-diaporama.html)
			if ( $( ".tabbed_diaporama" ).length ) {
				if ($('.hidem').css('display') == 'none') {
					$('.tabbed_diaporama .tabbed_diaporama_tabs li').unbind('isactive');
					$('.tabbed_diaporama .tabbed_diaporama_tabs li').on('isactive' , function(){
						$('.tabbed_diaporama .tabbed_diaporama_tabs li').show().removeClass('hide');
						$('.tabbed_diaporama .tabbed_diaporama_tabs li.active').removeClass('active');
						$(this).addClass('active hide').hide();
						var content = $(this).find('.tabbed_diaporama_slide').html();
						$('.tabbed_diaporama_content').hide().html( content ).fadeIn(500);
					});
				}
				else {
					$('.tabbed_diaporama .tabbed_diaporama_tabs li').unbind('isactive');
					$('.tabbed_diaporama .tabbed_diaporama_tabs li').on('isactive', function () {
						$('.tabbed_diaporama .tabbed_diaporama_tabs li').removeClass('active');
						$(this).addClass('active');
						var content = $(this).find('.tabbed_diaporama_slide').html();
						$('.tabbed_diaporama_content').hide().html(content).fadeIn(500);
					});
				}
				$('.tabbed_diaporama .tabbed_diaporama_tabs li').click( function(e){
					$(this).trigger('isactive');
					e.preventDefault();
				});

				function tabbed_diaporama_function()
				{
					if( !$('.tabbed_diaporama:hover').length  )
					{
						//GET ACTIVE
						var current = $('.tabbed_diaporama .tabbed_diaporama_tabs li.active');
						if( current.length == 0 )
							current = $('.tabbed_diaporama .tabbed_diaporama_tabs li').first();
						else
						{
							var next = current.next();
							current = next;
							if( current.length == 0 )
								current = $('.tabbed_diaporama .tabbed_diaporama_tabs li').first();
						}
						current.trigger('isactive');
					}

				};
				var my_timer = window.setInterval( tabbed_diaporama_function , 5000 );
				tabbed_diaporama_function();

				$('div.view-display-id-block_archive_news li.pager-next a').bind('click', function() {
					window.clearInterval(my_timer);
				});
			}

			if ($(".pagination_pager").length > 0) {
				$(".pagination_pager").each(function () {
					var content = $(this).parent('.afp_tab_content').find('.greytab_list_item');
					var perpage = $(this).attr('paginate');

					$(this).paging(content.length, {
						onSelect: function (page) {

							var data = this.slice;

							content.slice(0, $(this).number).addClass('hide')
							content.slice(data[0], data[1]).removeClass('hide')

							return true; // locate!
						},
						onFormat: function (type) {

							switch (type) {

								case 'block':
									if (!this.active)
										return '<a href="#' + this.value + '" class="btn  txtwhite bgblue">' + this.value + '</a>';
									else if (this.value != this.page)
										return '<a href="#' + this.value + '" class="btn  txtwhite bgblue">' + this.value + '</a>';
									return '<a href="#' + this.value + '" class="btn paginact  txtwhite bgblue">' + this.value + '</a>';

								case 'right':
								case 'left':

									if (!this.active) {
										return '';
									}
									return '<a href="#' + this.value + '" class="btn  txtwhite bgblue">' + this.value + '</a>';

								case 'next':

									if (this.active) {
										return '<a href="#' + this.value + '" class="btn  txtwhite bgblue">›</a>';
									}
									return '';

								case 'prev':

									if (this.active) {
										return '<a href="#' + this.value + '" class="btn  bgblue txtwhite ">‹</a>';
									}
									return '';

								case 'first':

									if (this.active) {
										return '<a href="#' + this.value + '" class="btn  bgblue txtwhite " >«</a>';
									}
									return '';

								case 'last':

									if (this.active) {
										return '<a href="#' + this.value + '" class="btn  bgblue txtwhite ">»</a>';
									}
									return '';

								case 'fill':
									if (this.active) {
										return '<a href="#" class="btn  bgblue txtwhite ">...</a>';
									}
							}
							return ""; // return nothing for missing branches
						},
						format: '[< ncnnn >]',
						perpage: perpage,
						inactive: false,
						lapping: 0,
						page: 1
					});
				});
			}
		}
	};

	$(document).ready( function(){

		//*************************************************************************
		//DETECT MOBILES
		function check_mobile(){ if( $('.hidem').css('display')=='none' ){is_mobile = true;}else{is_mobile = false;} }
		window.onresize = function(event) { check_mobile() };
		check_mobile();

		//*************************************************************************


		//*************************************************************************
		//NAVIGATION SUBMENU ON MOBILE
		$("#nav > li > a").click( function(event){

			if( is_mobile )
			{
				$('html,body').animate({scrollTop : 0},0);

				if( $(this).parent().hasClass('active') )
				{
					$("#nav > li").removeClass('active');
				}
				else
				{
					$("#nav > li").removeClass('active');
					$(this).parent().addClass('active');
				}



				$submenu = $(this).next('.nav_submenu');
				if( $submenu.length )
				{
					if( $(this).parent().hasClass('active') )
						$submenu.slideDown(300);
					else
						$submenu.slideUp(300);

					$("#nav > li").each( function(){
						if( !$(this).hasClass('active') )
							$(this).find(".nav_submenu").slideUp(200);
					});

					event.preventDefault();
				}

			};


		});


		//*************************************************************************
		//SEARCH BAR AUTOCOMPLETE
		var header_search_autocomplete_options = {
			serviceUrl: '/autocomplete.json', // << autocomplete script called with : ?query=XXXXXXXX
			onSelect: function (suggestion) {
				console.log('SEARCH SELECTED selected: ' + suggestion.value + ', ' + suggestion.data);
				//SUBMIT URL SEARCH WITH VALUES .... !
				//window.location(url);
			},
			onSearchStart: function(query){	}
		};
		//$('#header_search_autocomplete').autocomplete(header_search_autocomplete_options);


		//*************************************************************************
		//HEADER SLIDER (global/header-slider.html)
		var header_slider = $("#header_slider > ul").lightSlider({
			useCSS:true,
			item:1,
			//thumbItem:9,
			slideMargin: 5,
			adaptiveHeight:false,
			speed:1000,
			pause:4500,
			pager:false,
			controls:false,
			auto:true,
			loop:true,
			rtl:is_rtl

		});

		$('#header_slider_prev').click(function(){
			if (is_rtl) {
				header_slider.goToNextSlide();
			}
			else {
				header_slider.goToPrevSlide();
			}
		});
		$('#header_slider_next').click(function(){
			if (is_rtl) {
				header_slider.goToPrevSlide();
			}
			else {
				header_slider.goToNextSlide();
			}
		});

		//*************************************************************************
		//MOBILES TWEETS SLIDER (home-tweets-mobile.html)
		if ( $( ".tweet_list" ).length ) {
			var twitter_slider = $(".tweet_list > ul").lightSlider({
				useCSS:true,
				item:1,
				//thumbItem:9,
				slideMargin: 50,
				adaptiveHeight:true,
				speed:1000,
				pager:false,
				controls:false,
				auto:false,
				loop:true,
				rtl:is_rtl

			});

			$('#tweet_list_btn_prev').click(function(){
				if (is_rtl) {
					twitter_slider.goToNextSlide();
				}
				else {
					twitter_slider.goToPrevSlide();
				}
			});
			$('#tweet_list_btn_next').click(function(){
				if (is_rtl) {
					twitter_slider.goToPrevSlide();
				}
				else {
					twitter_slider.goToNextSlide();
				}
			});
		}

		//*************************************************************************
		//INFO SLIDER photos videos on mobile
		if ( $( ".pictures_videos_slider" ).length ) {
			var topstories_slider = $(".pictures_videos_slider > ul").lightSlider({
				useCSS:true,
				item: 1 ,
				//thumbItem:9,
				slideMargin: 10,
				adaptiveHeight:true,
				speed:1000,
				pager:false,
				controls:true,
				auto:false,
				loop:true,
				rtl:is_rtl
			});

		}

		//*************************************************************************
		//MEMBER LIST FILTERS
		if ( $( ".member_list_button" ).length ) {
			$(".member_list_button").click(function(){
				if( is_mobile )
				{
					$(this).toggleClass('active');
					$(this).next(".membersList").slideToggle();
				}
			});

		}

		//*************************************************************************
		//CONTACT show form_contact_radio_abonnement FUNCTION
		if ( $( "#edit-submitted-type-of-request-1" ).length ) {

			$('input[name="submitted[type_of_request]"]').change( function(){
				if( $(this).val() == '1' &&  $(this).is(':checked'))
				{
					$("#form_contact_services").fadeIn();
				}
				else
				{
					$("#form_contact_services").fadeOut();
				}

			});
			$("#edit-submitted-type-of-request-1").change( );
		}

		//*************************************************************************
		// AFP DATES MOBILE > dates_diaporama (afpdates-content-mobile.htmll)
		if ( $( "#dates_diaporama" ).length ) {
			//FIRST INIT OF THE SLIDER
			$('.dates_selector_active span').html( $('.dates_selector_choosetext').html() );
			var content = $('.dates_selector_link').first().find('.dates_selector_slide').html();
			$('#dates_diaporama_content').hide().html( content ).fadeIn(900);

			$("#dates_diaporama_content > ul").lightSlider({
				useCSS:true,
				item:1,
				//thumbItem:9,
				slideMargin: 20,
				adaptiveHeight:true,
				speed:1000,
				pager:false,
				auto:false,
				loop:true,
				rtl:is_rtl
			});

			$('.dates_selector_list').slideUp(500);
			//END

			$('.dates_selector_active').click( function(e){
				$('.dates_selector_list').slideToggle(200);
				$(this).toggleClass("active");

				if( $(this).hasClass("active"))
				{
					$('.dates_selector_active span').html( $('.dates_selector_choosetext').html() );
				}
				else
				{
					$('.dates_selector_active span').html( $('.dates_selector_link:active').html() );
				}
			});


			$('.dates_selector_link').click( function(e){
				$('.dates_selector_link').removeClass('active');
				$(this).addClass('active');
				var content = $(this).find('.dates_selector_slide').html();
				$('#dates_diaporama_content').hide().html( content ).fadeIn(900);

				$("#dates_diaporama_content > ul").lightSlider({
					useCSS:true,
					item:1,
					//thumbItem:9,
					slideMargin: 20,
					adaptiveHeight:true,
					speed:1000,
					pager:false,
					auto:false,
					loop:true,
					rtl:is_rtl
				});

				$('.dates_selector_list').slideUp(500);
				$('.dates_selector_active').removeClass("active");
				$('.dates_selector_active span').html( $(this).html() );

				e.preventDefault();
			});

			//$('.dates_selector_link').first().addClass('active').click();
		}

		//*************************************************************************
		//PARTENAIRES TABS partenaires-content.html
		if ( $( "#afp_tabs" ).length ) {
			$(".afp_tab_content").each(function() {
				if (!$(this).hasClass('teasing')) {
					$(this).addClass('hide');
				}
			});

			activeTab = $.urlParam("afp_tab");
			if ( activeTab !== null ) {
				$('#afp_tabs li[id="afp_tab_' + activeTab + '"]').addClass('active');
				$('#afp_tabs li[id="afp_tab_' + activeTab + '"]').siblings().removeClass('active');
			}
			else
			{
				$("#afp_tabs li").eq(0).addClass('active');
			}

			$("#afp_tabs li[class='active']").each(function() {
				var activeTab = $(this).attr('id');
				if ( typeof(activeTab) != 'undefined' )
				{
					activeTab = activeTab.replace('afp_tab_', '')
					$("#afp_tab_content_" + activeTab).removeClass('hide');
				}
				else
				{
					$("#afp_tab_content_0").removeClass('hide');
					$("#afp_tabs li").eq(0).addClass('active');
				}
			});

			$("#afp_tabs li").live('click', function(event) {
				var id = $(this).attr('id').replace('afp_tab_', '');

				$(this).siblings().removeClass('active');
				$(this).addClass('active');

				$(this).parent().parent().siblings('[id^="afp_tab_content"]').addClass('hide');

				$("#afp_tab_content_" + id).removeClass('hide');

				event.preventDefault();

				return false;
			});
		};

		//*************************************************************************
		//MORE CONTENT ACCORDEON
		if ( $( ".content_more" ).length ) {

			$( ".content_more .btn_content_more" ).click( function(){
				$this = $(this);
				$parent = $this.parent(".content_more");
				$parent.addClass('active');
				$parent.find('.content_more_text').stop(false,false).hide().slideDown();
			});
			$( ".content_more .btn_content_less" ).click( function(){
				$this = $(this);
				$parent = $this.parent(".content_more");
				$parent.removeClass('active');
				$parent.find('.content_more_text').stop(false,false).hide();
			});
		};

		//*************************************************************************
		//selector mobile
		$('.selector').click( function(e){
			$(this).next('.selector_list').slideToggle(200);
			$(this).toggleClass("active");
		});


		//*************************************************************************
		//LANGUAGE SWITCHER header-langagesswitcher.html
		$('#language_switcher_btn').bind('click', function() {
			$('#language_switcher').slideToggle(400);$('#nav').slideUp(400);$('#language_switcher_btn').toggleClass('active');
		});

		//*************************************************************************
		//NAV header-nav.html
		$('#nav_mobile_btn').bind('click', function() {
			$('html,body').animate({scrollTop : 0},0);
			$('#nav').slideToggle(400);
			$('#nav li.active').removeClass('active');
			$('#nav .nav_submenu').hide();
			$('#language_switcher').slideUp(400);
			$('#nav_mobile_btn').toggleClass('active');
		});

		//*************************************************************************
		//POPUP FUNCTIONS
		//SHOW POPUP
		function popupShow( contentElement )
		{
			var content = contentElement.html();
			var windowTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			var windowheight = $(document).height(); // returns height of HTML document
			var buffer = is_mobile? 0 : 100 ;

			$('#popup').removeClass("animated fadeInDown");
			$('#popup .popup_content').html( content );

			$('.popup_overlay').css({'height': windowheight+'px'}).stop(true,true).fadeIn(200);
			$('#popup').css({'top': (windowTop+buffer)+'px'});
			//JS ANIM
			// $('#popup').stop(true,true).fadeIn(500);
			//CSS ANIM
			$('#popup').stop(true,true).show().addClass("animated fadeInDown");


			return false;
		}

		//HIDE POPUP
		var popupHide = function ( )
		{
			$('.popup_overlay').stop(true,true).fadeOut(200);
			//JS ANIM
			$('#popup').stop(true,true).fadeOut(500);
			//CSS ANIM
			$('#popup').removeClass("animated fadeInDown");

			$('#popup .popup_content').html( '' );

			return false;
		}


		//DIAPORAMA POPUP SCRIPTS
		function popup_diaporama_loaded(index)
		{
			//PAGINATION total slides
			var total_pictures = $('#diaporama_popup_slider img').length;
			$('.diaporama_popup_slider_total').text(total_pictures);


			//CREATE SLIDER
			var diaporama_slider = $("#diaporama_popup_slider").lightSlider({
				useCSS:true,
				item:1,
				//thumbItem:9,
				slideMargin: 5,
				adaptiveHeight:true,
				speed:1000,
				pager:false,
				controls:false,
				auto:false,
				loop:false,
				rtl:is_rtl,
				onSliderLoad: function (el) {
					el.goToSlide(index);
				},
				onAfterSlide: function (el) {
					// Title and description
					currentSlideID = el.getCurrentSlideCount()-1;
					currentSlide = el.children('.lslide:eq('+currentSlideID+')');
					$('.diaporama_popup_slider_caption').html(currentSlide.find('.description').html());

					// Pagination
					$('.diaporama_popup_slider_current').text(currentSlideID+1);
					$('.diaporama_popup_slider_nav').removeClass('inactive');

					/*if (currentSlideID == 1) {
						$('.diaporama_popup_slider_prev').addClass('inactive');
					} else if (currentSlideID == total_pictures) {
						$('.diaporama_popup_slider_next').addClass('inactive');
					}*/

					if (currentSlideID == 1) {
						if (is_rtl) {$('.diaporama_popup_slider_next').addClass('inactive');}
						else {$('.diaporama_popup_slider_prev').addClass('inactive');}
					}

					else if (currentSlideID == total_pictures) {
						if (is_rtl) {$('.diaporama_popup_slider_prev').addClass('inactive');}
						else {$('.diaporama_popup_slider_next').addClass('inactive');}
					}

					//photoroll current
					$('.diaporama_popup_photoroll_picture').removeClass('current');
					$('.diaporama_popup_photoroll_list ul').children('.diaporama_popup_photoroll_picture:eq('+currentSlideID+')').addClass('current');
				}
			});

			/*$('.diaporama_popup_slider_prev').click(function(event){
				diaporama_slider.goToPrevSlide();
				event.preventDefault();
			});
			$('.diaporama_popup_slider_next').click(function(event){
				diaporama_slider.goToNextSlide();
				event.preventDefault();
			});*/

			$('.diaporama_popup_slider_prev').click(function(event){
				if (is_rtl) { diaporama_slider.goToNextSlide(); }
				else { diaporama_slider.goToPrevSlide(); }
				event.preventDefault();
			});
			$('.diaporama_popup_slider_next').click(function(event){
				if (is_rtl) { diaporama_slider.goToPrevSlide(); }
				else { diaporama_slider.goToNextSlide(); }
				event.preventDefault();
			});

			// Keyboard navigation
			/*$(document).bind('keydown', function(e) {
				if (e.keyCode == 37)
					diaporama_slider.goToPrevSlide();
				else if (e.keyCode == 39)
					diaporama_slider.goToNextSlide();
			});*/

			// Keyboard navigation
			$(document).bind('keydown', function(e) {
				if (e.keyCode == 37) {
					if (is_rtl) { diaporama_slider.goToNextSlide(); } else { diaporama_slider.goToPrevSlide(); }
				}
				else if (e.keyCode == 39) {
					if (is_rtl) { diaporama_slider.goToPrevSlide(); } else { diaporama_slider.goToNextSlide(); }
				}
			});


			// photoroll
			var $photoroll = $('#diaporama_popup_photoroll');
			var openPhotoroll = function(e){
				e.preventDefault();
				$('#diaporama_popup_photoroll .view_all, #diaporama #picture .nav').hide();
				$photoroll.animate({height: '472'}, 500, 'swing', function(){
					$(this).addClass('open');
					$('#diaporama_popup_photoroll .view_all').show();
				});
				$('#diaporama_popup_left_panel, #diaporama_popup_right_panel').animate({opacity: '0.4'}, 500);
				$('.diaporama_popup_photoroll_list').css('height', '470');
				$('.diaporama_popup_photoroll_list ul').animate({'margin-top': '0px'}, 500);
				$('.diaporama_popup_photoroll_list a').bind('click', closePhotoroll);
			}

			var closePhotoroll = function(e){
				e.preventDefault();
				$('#diaporama_popup_photoroll .view_all').hide();
				$photoroll.animate({height: '100'}, 500, 'swing', function(){
					$(this).removeClass('open');
					$('.diaporama_popup_photoroll_list').css('height', '70');
					$('#diaporama_popup_photoroll .view_all, #diaporama #picture .nav').show();
				});
				$('#diaporama_popup_left_panel, #diaporama_popup_right_panel').animate({opacity: '1'}, 500);
				$('.diaporama_popup_photoroll_list a').unbind('click', closePhotoroll);
			}

			$('#diaporama_popup_photoroll .view_all').click(function(e){
				$photoroll.hasClass('open') ? closePhotoroll(e) : openPhotoroll(e);
			});


			$('.diaporama_popup_photoroll_picture').click(function(event){
				var index = $('.diaporama_popup_photoroll_picture').index(this);
				diaporama_slider.goToSlide(index);
				event.preventDefault();
			});

		}


		//AFPMODAL
		$('.afpmodal').live('click', function(event)
		{
			event.preventDefault();
            var index = $(this).data('index');
			if (index == undefined) {
				index = 0;
			}
			//SLIDESHOW AJAX MODAL
			if( $(this).hasClass('slideshow') )
			{
				//WAITING POPUP
				popupShow($('<div><img class="loading center" src="'+ URL_assets +'/img/webcam_loading.gif" /></div>'));

				//AJAX CALL

				ajaxURL = $(this).attr('href');
                //var index = $('li.liindex').attr('name');
				$.get( ajaxURL, function( data ) {
                    //console.log(data);
					popupShow($("<div>"+data+"</div>"));
					$('#popup').css({'width': '950px' , 'margin-left': '-475px'});
					popup_diaporama_loaded(index);
				});
			}
			else if( $(this).hasClass('content_feed') )
			{
				//WAITING POPUP
				popupShow($('<div><img class="loading center" src="'+ URL_assets +'/img/webcam_loading.gif" /></div>'));

				//AJAX CALL
				ajaxURL = $(this).attr('href');
				$.get( ajaxURL, function( data ) {
					popupShow($("<div>"+data+"</div>"));
					$('#popup').css({'width': popup_size+'px' , 'margin-left': '-'+(popup_size/2)+'px'});
				});

			}
			else
			{
				targetID = $(this).attr('rel');
				target = $('#'+targetID) ;
				popupShow(target);
				$('#popup').css({'width': popup_size+'px' , 'margin-left': '-'+(popup_size/2)+'px'});

			}

		});

		//CLOSE POPUP
		$('.popup_close').click( popupHide );
		$('.popup_overlay').click( popupHide );

		//DRUPAL NOT DEFINED IN INTEGRATION ENVIRONMENT ;)
		//Randomize bean listing-right-thumbnail if random value is YES

		 if (typeof(Drupal.settings.listing_right_thumbnail) !== 'undefined' &&
		 typeof(Drupal.settings.listing_right_thumbnail.random) !== 'undefined' &&
		 Drupal.settings.listing_right_thumbnail.random == 1) {
		 if ($('.can_be_randomized').length != 0) {
		 var $ul = $('.can_be_randomized');
		 $('li', $ul).sort(function(){
		 return ( Math.round( Math.random() ) - 0.5 )
		 }).appendTo($ul);
		 }
		 }

	});
}(jQuery));;
