function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
}

function i(t, e) {
    return t.x * e.x + t.y * e.y;
}

function s(t, s) {
    var h = e(t) * e(s);
    if (0 === h) return 0;
    var n = i(t, s) / h;
    return n > 1 && (n = 1), Math.acos(n);
}

function h(t, e) {
    return t.x * e.y - e.x * t.y;
}

function n(t, e) {
    var i = s(t, e);
    return h(t, e) > 0 && (i *= -1), 180 * i / Math.PI;
}

function o(t, e) {
    var i = new p(t);
    return i.add(e), i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, i, s) {
        return i && t(e.prototype, i), s && t(e, s), e;
    };
}(), l = function() {
    function i() {
        t(this, i), this.preV = {
            x: null,
            y: null
        }, this.pinchStartLen = null, this.scale = 1, this.isDoubleTap = !1;
    }
    return a(i, [ {
        key: "bind",
        value: function(t) {
            this.element = null, this.rotate = o(this.element, t.rotate || u), this.touchStart = o(this.element, t.touchStart || u), 
            this.multipointStart = o(this.element, t.multipointStart || u), this.multipointEnd = o(this.element, t.multipointEnd || u), 
            this.pinch = o(this.element, t.pinch || u), this.swipe = o(this.element, t.swipe || u), 
            this.tap = o(this.element, t.tap || u), this.doubleTap = o(this.element, t.doubleTap || u), 
            this.longTap = o(this.element, t.longTap || u), this.singleTap = o(this.element, t.singleTap || u), 
            this.pressMove = o(this.element, t.pressMove || u), this.touchMove = o(this.element, t.touchMove || u), 
            this.touchEnd = o(this.element, t.touchEnd || u), this.touchCancel = o(this.element, t.touchCancel || u), 
            this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, 
            this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, 
            this.preTapPosition = {
                x: null,
                y: null
            };
        }
    }, {
        key: "start",
        value: function(t) {
            if (t.touches) {
                this.now = Date.now(), this.x1 = null == t.touches[0].pageX ? t.touches[0].x : t.touches[0].pageX, 
                this.y1 = null == t.touches[0].pageY ? t.touches[0].y : t.touches[0].pageY, this.delta = this.now - (this.last || this.now), 
                this.touchStart.dispatch(t), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30), 
                this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
                var i = this.preV;
                if (t.touches.length > 1) {
                    this._cancelLongTap(), this._cancelSingleTap();
                    var s = null == t.touches[1].pageX ? t.touches[1].x : t.touches[1].pageX, h = null == t.touches[1].pageY ? t.touches[1].y : t.touches[1].pageY, n = {
                        x: s - this.x1,
                        y: h - this.y1
                    };
                    i.x = n.x, i.y = n.y, this.pinchStartLen = e(i), this.multipointStart.dispatch(t);
                }
                this.longTapTimeout = setTimeout(function() {
                    t.type = "longTap", this.longTap.dispatch(t);
                }.bind(this), 750);
            }
        }
    }, {
        key: "move",
        value: function(t) {
            if (t.touches) {
                var i = this.preV, s = t.touches.length, h = null == t.touches[0].pageX ? t.touches[0].x : t.touches[0].pageX, o = null == t.touches[0].pageY ? t.touches[0].y : t.touches[0].pageY;
                if (this.isDoubleTap = !1, s > 1) {
                    var a = {
                        x: (null == t.touches[1].pageX ? t.touches[1].x : t.touches[1].pageX) - h,
                        y: (null == t.touches[1].pageY ? t.touches[1].y : t.touches[1].pageY) - o
                    };
                    null !== i.x && (this.pinchStartLen > 0 && (t.scale = e(a) / this.pinchStartLen, 
                    t.type = "pinch", this.pinch.dispatch(t)), t.angle = n(a, i), t.type = "rotate", 
                    this.rotate.dispatch(t)), i.x = a.x, i.y = a.y;
                } else null !== this.x2 ? (t.deltaX = h - this.x2, t.deltaY = o - this.y2) : (t.deltaX = 0, 
                t.deltaY = 0), this.pressMove.dispatch(t);
                this.touchMove.dispatch(t), this._cancelLongTap(), this.x2 = h, this.y2 = o;
            }
        }
    }, {
        key: "end",
        value: function(t) {
            if (t.changedTouches) {
                this._cancelLongTap();
                var e = this;
                t.touches.length < 2 && this.multipointEnd.dispatch(t), this.touchEnd.dispatch(t), 
                this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), 
                this.swipeTimeout = setTimeout(function() {
                    t.type = "swipe", e.swipe.dispatch(t);
                }, 0)) : (this.tapTimeout = setTimeout(function() {
                    console.info("tap"), t.type = "tap", e.tap.dispatch(t), e.isDoubleTap && (t.type = "doubleTap", 
                    e.doubleTap.dispatch(t), clearTimeout(e.singleTapTimeout), e.isDoubleTap = !1);
                }, 0), e.isDoubleTap || (e.singleTapTimeout = setTimeout(function() {
                    e.singleTap.dispatch(t);
                }, 250))), this.preV.x = 0, this.preV.y = 0, this.scale = 1, this.pinchStartLen = null, 
                this.x1 = this.x2 = this.y1 = this.y2 = null;
            }
        }
    }, {
        key: "cancel",
        value: function(t) {
            clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), 
            clearTimeout(this.swipeTimeout), this.touchCancel.dispatch(t);
        }
    }, {
        key: "_cancelLongTap",
        value: function() {
            clearTimeout(this.longTapTimeout);
        }
    }, {
        key: "_cancelSingleTap",
        value: function() {
            clearTimeout(this.singleTapTimeout);
        }
    }, {
        key: "_swipeDirection",
        value: function(t, e, i, s) {
            return Math.abs(t - e) >= Math.abs(i - s) ? t - e > 0 ? "Left" : "Right" : i - s > 0 ? "Up" : "Down";
        }
    }, {
        key: "on",
        value: function(t, e) {
            this[t] && this[t].add(e);
        }
    }, {
        key: "off",
        value: function(t, e) {
            this[t] && this[t].del(e);
        }
    }, {
        key: "destroy",
        value: function() {
            return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), 
            this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), 
            this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), 
            this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), 
            this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), 
            this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), 
            this.singleTap.del(), this.pressMove.del(), this.touchMove.del(), this.touchEnd.del(), 
            this.touchCancel.del(), this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null, 
            null;
        }
    } ]), i;
}(), u = function() {}, p = function(t) {
    this.handlers = [], this.el = t;
};

p.prototype.add = function(t) {
    this.handlers.push(t);
}, p.prototype.del = function(t) {
    t || (this.handlers = []);
    for (var e = this.handlers.length; e >= 0; e--) this.handlers[e] === t && this.handlers.splice(e, 1);
}, p.prototype.dispatch = function() {
    for (var t = 0, e = this.handlers.length; t < e; t++) {
        var i = this.handlers[t];
        "function" == typeof i && i.apply(this.el, arguments);
    }
}, exports.default = l;