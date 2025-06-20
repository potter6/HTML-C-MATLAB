/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 9.3.2
 * @date    2021-04-12
 *
 * @license
 * Copyright (C) 2013-2021 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
! function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.math = t() : e.math = t() }(this, (function() {
    return function(e) {
        var t = {};

        function r(n) { if (t[n]) return t[n].exports; var i = t[n] = { i: n, l: !1, exports: {} }; return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports }
        return r.m = e, r.c = t, r.d = function(e, t, n) { r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n }) }, r.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
                for (var i in e) r.d(n, i, function(t) { return e[t] }.bind(null, i));
            return n
        }, r.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return r.d(t, "a", t), t }, r.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, r.p = "", r(r.s = 20)
    }([, function(e, t, r) {
        var n;
        /**
         * @license Complex.js v2.0.11 11/02/2016
         *
         * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
         * Dual licensed under the MIT or GPL Version 2 licenses.
         **/
        ! function(r) {
            "use strict";
            var i = function(e) { return .5 * (Math.exp(e) + Math.exp(-e)) },
                a = function(e) { return .5 * (Math.exp(e) - Math.exp(-e)) },
                o = function() { throw SyntaxError("Invalid Param") };

            function s(e, t) {
                var r = Math.abs(e),
                    n = Math.abs(t);
                return 0 === e ? Math.log(n) : 0 === t ? Math.log(r) : r < 3e3 && n < 3e3 ? .5 * Math.log(e * e + t * t) : Math.log(e / Math.cos(Math.atan2(t, e)))
            }

            function u(e, t) {
                if (!(this instanceof u)) return new u(e, t);
                var r = function(e, t) {
                    var r = { re: 0, im: 0 };
                    if (null == e) r.re = r.im = 0;
                    else if (void 0 !== t) r.re = e, r.im = t;
                    else switch (typeof e) {
                        case "object":
                            if ("im" in e && "re" in e) r.re = e.re, r.im = e.im;
                            else if ("abs" in e && "arg" in e) {
                                if (!Number.isFinite(e.abs) && Number.isFinite(e.arg)) return u.INFINITY;
                                r.re = e.abs * Math.cos(e.arg), r.im = e.abs * Math.sin(e.arg)
                            } else if ("r" in e && "phi" in e) {
                                if (!Number.isFinite(e.r) && Number.isFinite(e.phi)) return u.INFINITY;
                                r.re = e.r * Math.cos(e.phi), r.im = e.r * Math.sin(e.phi)
                            } else 2 === e.length ? (r.re = e[0], r.im = e[1]) : o();
                            break;
                        case "string":
                            r.im = r.re = 0;
                            var n = e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),
                                i = 1,
                                a = 0;
                            null === n && o();
                            for (var s = 0; s < n.length; s++) { var c = n[s]; " " === c || "\t" === c || "\n" === c || ("+" === c ? i++ : "-" === c ? a++ : "i" === c || "I" === c ? (i + a === 0 && o(), " " === n[s + 1] || isNaN(n[s + 1]) ? r.im += parseFloat((a % 2 ? "-" : "") + "1") : (r.im += parseFloat((a % 2 ? "-" : "") + n[s + 1]), s++), i = a = 0) : ((i + a === 0 || isNaN(c)) && o(), "i" === n[s + 1] || "I" === n[s + 1] ? (r.im += parseFloat((a % 2 ? "-" : "") + c), s++) : r.re += parseFloat((a % 2 ? "-" : "") + c), i = a = 0)) }
                            i + a > 0 && o();
                            break;
                        case "number":
                            r.im = 0, r.re = e;
                            break;
                        default:
                            o()
                    }
                    return isNaN(r.re) || isNaN(r.im), r
                }(e, t);
                this.re = r.re, this.im = r.im
            }
            u.prototype = {
                re: 0,
                im: 0,
                sign: function() { var e = this.abs(); return new u(this.re / e, this.im / e) },
                add: function(e, t) { var r = new u(e, t); return this.isInfinite() && r.isInfinite() ? u.NAN : this.isInfinite() || r.isInfinite() ? u.INFINITY : new u(this.re + r.re, this.im + r.im) },
                sub: function(e, t) { var r = new u(e, t); return this.isInfinite() && r.isInfinite() ? u.NAN : this.isInfinite() || r.isInfinite() ? u.INFINITY : new u(this.re - r.re, this.im - r.im) },
                mul: function(e, t) { var r = new u(e, t); return this.isInfinite() && r.isZero() || this.isZero() && r.isInfinite() ? u.NAN : this.isInfinite() || r.isInfinite() ? u.INFINITY : 0 === r.im && 0 === this.im ? new u(this.re * r.re, 0) : new u(this.re * r.re - this.im * r.im, this.re * r.im + this.im * r.re) },
                div: function(e, t) {
                    var r = new u(e, t);
                    if (this.isZero() && r.isZero() || this.isInfinite() && r.isInfinite()) return u.NAN;
                    if (this.isInfinite() || r.isZero()) return u.INFINITY;
                    if (this.isZero() || r.isInfinite()) return u.ZERO;
                    e = this.re, t = this.im;
                    var n, i, a = r.re,
                        o = r.im;
                    return 0 === o ? new u(e / a, t / a) : Math.abs(a) < Math.abs(o) ? new u((e * (i = a / o) + t) / (n = a * i + o), (t * i - e) / n) : new u((e + t * (i = o / a)) / (n = o * i + a), (t - e * i) / n)
                },
                pow: function(e, t) {
                    var r = new u(e, t);
                    if (e = this.re, t = this.im, r.isZero()) return u.ONE;
                    if (0 === r.im) {
                        if (0 === t && e >= 0) return new u(Math.pow(e, r.re), 0);
                        if (0 === e) switch ((r.re % 4 + 4) % 4) {
                            case 0:
                                return new u(Math.pow(t, r.re), 0);
                            case 1:
                                return new u(0, Math.pow(t, r.re));
                            case 2:
                                return new u(-Math.pow(t, r.re), 0);
                            case 3:
                                return new u(0, -Math.pow(t, r.re))
                        }
                    }
                    if (0 === e && 0 === t && r.re > 0 && r.im >= 0) return u.ZERO;
                    var n = Math.atan2(t, e),
                        i = s(e, t);
                    return e = Math.exp(r.re * i - r.im * n), t = r.im * i + r.re * n, new u(e * Math.cos(t), e * Math.sin(t))
                },
                sqrt: function() {
                    var e, t, r = this.re,
                        n = this.im,
                        i = this.abs();
                    if (r >= 0) {
                        if (0 === n) return new u(Math.sqrt(r), 0);
                        e = .5 * Math.sqrt(2 * (i + r))
                    } else e = Math.abs(n) / Math.sqrt(2 * (i - r));
                    return t = r <= 0 ? .5 * Math.sqrt(2 * (i - r)) : Math.abs(n) / Math.sqrt(2 * (i + r)), new u(e, n < 0 ? -t : t)
                },
                exp: function() { var e = Math.exp(this.re); return this.im, new u(e * Math.cos(this.im), e * Math.sin(this.im)) },
                expm1: function() {
                    var e = this.re,
                        t = this.im;
                    return new u(Math.expm1(e) * Math.cos(t) + function(e) { var t = Math.PI / 4; if (e < -t || e > t) return Math.cos(e) - 1; var r = e * e; return r * (r * (1 / 24 + r * (-1 / 720 + r * (1 / 40320 + r * (-1 / 3628800 + r * (1 / 4790014600 + r * (-1 / 87178291200 + r * (1 / 20922789888e3))))))) - .5) }(t), Math.exp(e) * Math.sin(t))
                },
                log: function() {
                    var e = this.re,
                        t = this.im;
                    return new u(s(e, t), Math.atan2(t, e))
                },
                abs: function() { return e = this.re, t = this.im, r = Math.abs(e), n = Math.abs(t), r < 3e3 && n < 3e3 ? Math.sqrt(r * r + n * n) : (r < n ? (r = n, n = e / t) : n = t / e, r * Math.sqrt(1 + n * n)); var e, t, r, n },
                arg: function() { return Math.atan2(this.im, this.re) },
                sin: function() {
                    var e = this.re,
                        t = this.im;
                    return new u(Math.sin(e) * i(t), Math.cos(e) * a(t))
                },
                cos: function() {
                    var e = this.re,
                        t = this.im;
                    return new u(Math.cos(e) * i(t), -Math.sin(e) * a(t))
                },
                tan: function() {
                    var e = 2 * this.re,
                        t = 2 * this.im,
                        r = Math.cos(e) + i(t);
                    return new u(Math.sin(e) / r, a(t) / r)
                },
                cot: function() {
                    var e = 2 * this.re,
                        t = 2 * this.im,
                        r = Math.cos(e) - i(t);
                    return new u(-Math.sin(e) / r, a(t) / r)
                },
                sec: function() {
                    var e = this.re,
                        t = this.im,
                        r = .5 * i(2 * t) + .5 * Math.cos(2 * e);
                    return new u(Math.cos(e) * i(t) / r, Math.sin(e) * a(t) / r)
                },
                csc: function() {
                    var e = this.re,
                        t = this.im,
                        r = .5 * i(2 * t) - .5 * Math.cos(2 * e);
                    return new u(Math.sin(e) * i(t) / r, -Math.cos(e) * a(t) / r)
                },
                asin: function() {
                    var e = this.re,
                        t = this.im,
                        r = new u(t * t - e * e + 1, -2 * e * t).sqrt(),
                        n = new u(r.re - t, r.im + e).log();
                    return new u(n.im, -n.re)
                },
                acos: function() {
                    var e = this.re,
                        t = this.im,
                        r = new u(t * t - e * e + 1, -2 * e * t).sqrt(),
                        n = new u(r.re - t, r.im + e).log();
                    return new u(Math.PI / 2 - n.im, n.re)
                },
                atan: function() {
                    var e = this.re,
                        t = this.im;
                    if (0 === e) { if (1 === t) return new u(0, 1 / 0); if (-1 === t) return new u(0, -1 / 0) }
                    var r = e * e + (1 - t) * (1 - t),
                        n = new u((1 - t * t - e * e) / r, -2 * e / r).log();
                    return new u(-.5 * n.im, .5 * n.re)
                },
                acot: function() {
                    var e = this.re,
                        t = this.im;
                    if (0 === t) return new u(Math.atan2(1, e), 0);
                    var r = e * e + t * t;
                    return 0 !== r ? new u(e / r, -t / r).atan() : new u(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atan()
                },
                asec: function() {
                    var e = this.re,
                        t = this.im;
                    if (0 === e && 0 === t) return new u(0, 1 / 0);
                    var r = e * e + t * t;
                    return 0 !== r ? new u(e / r, -t / r).acos() : new u(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acos()
                },
                acsc: function() {
                    var e = this.re,
                        t = this.im;
                    if (0 === e && 0 === t) return new u(Math.PI / 2, 1 / 0);
                    var r = e * e + t * t;
                    return 0 !== r ? new u(e / r, -t / r).asin() : new u(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asin()
                },
                sinh: function() {
                    var e = this.re,
                        t = this.im;
                    return new u(a(e) * Math.cos(t), i(e) * Math.sin(t))
                },
                cosh: function() {
                    var e = this.re,
                        t = this.im;
                    return new u(i(e) * Math.cos(t), a(e) * Math.sin(t))
                },
                tanh: function() {
                    var e = 2 * this.re,
                        t = 2 * this.im,
                        r = i(e) + Math.cos(t);
                    return new u(a(e) / r, Math.sin(t) / r)
                },
                coth: function() {
                    var e = 2 * this.re,
                        t = 2 * this.im,
                        r = i(e) - Math.cos(t);
                    return new u(a(e) / r, -Math.sin(t) / r)
                },
                csch: function() {
                    var e = this.re,
                        t = this.im,
                        r = Math.cos(2 * t) - i(2 * e);
                    return new u(-2 * a(e) * Math.cos(t) / r, 2 * i(e) * Math.sin(t) / r)
                },
                sech: function() {
                    var e = this.re,
                        t = this.im,
                        r = Math.cos(2 * t) + i(2 * e);
                    return new u(2 * i(e) * Math.cos(t) / r, -2 * a(e) * Math.sin(t) / r)
                },
                asinh: function() {
                    var e = this.im;
                    this.im = -this.re, this.re = e;
                    var t = this.asin();
                    return this.re = -this.im, this.im = e, e = t.re, t.re = -t.im, t.im = e, t
                },
                acosh: function() {
                    var e = this.acos();
                    if (e.im <= 0) {
                        var t = e.re;
                        e.re = -e.im, e.im = t
                    } else {
                        t = e.im;
                        e.im = -e.re, e.re = t
                    }
                    return e
                },
                atanh: function() {
                    var e = this.re,
                        t = this.im,
                        r = e > 1 && 0 === t,
                        n = 1 - e,
                        i = 1 + e,
                        a = n * n + t * t,
                        o = 0 !== a ? new u((i * n - t * t) / a, (t * n + i * t) / a) : new u(-1 !== e ? e / 0 : 0, 0 !== t ? t / 0 : 0),
                        c = o.re;
                    return o.re = s(o.re, o.im) / 2, o.im = Math.atan2(o.im, c) / 2, r && (o.im = -o.im), o
                },
                acoth: function() {
                    var e = this.re,
                        t = this.im;
                    if (0 === e && 0 === t) return new u(0, Math.PI / 2);
                    var r = e * e + t * t;
                    return 0 !== r ? new u(e / r, -t / r).atanh() : new u(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atanh()
                },
                acsch: function() {
                    var e = this.re,
                        t = this.im;
                    if (0 === t) return new u(0 !== e ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);
                    var r = e * e + t * t;
                    return 0 !== r ? new u(e / r, -t / r).asinh() : new u(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asinh()
                },
                asech: function() {
                    var e = this.re,
                        t = this.im;
                    if (this.isZero()) return u.INFINITY;
                    var r = e * e + t * t;
                    return 0 !== r ? new u(e / r, -t / r).acosh() : new u(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acosh()
                },
                inverse: function() {
                    if (this.isZero()) return u.INFINITY;
                    if (this.isInfinite()) return u.ZERO;
                    var e = this.re,
                        t = this.im,
                        r = e * e + t * t;
                    return new u(e / r, -t / r)
                },
                conjugate: function() { return new u(this.re, -this.im) },
                neg: function() { return new u(-this.re, -this.im) },
                ceil: function(e) { return e = Math.pow(10, e || 0), new u(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e) },
                floor: function(e) { return e = Math.pow(10, e || 0), new u(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e) },
                round: function(e) { return e = Math.pow(10, e || 0), new u(Math.round(this.re * e) / e, Math.round(this.im * e) / e) },
                equals: function(e, t) { var r = new u(e, t); return Math.abs(r.re - this.re) <= u.EPSILON && Math.abs(r.im - this.im) <= u.EPSILON },
                clone: function() { return new u(this.re, this.im) },
                toString: function() {
                    var e = this.re,
                        t = this.im,
                        r = "";
                    return this.isNaN() ? "NaN" : this.isZero() ? "0" : this.isInfinite() ? "Infinity" : (0 !== e && (r += e), 0 !== t && (0 !== e ? r += t < 0 ? " - " : " + " : t < 0 && (r += "-"), 1 !== (t = Math.abs(t)) && (r += t), r += "i"), r || "0")
                },
                toVector: function() { return [this.re, this.im] },
                valueOf: function() { return 0 === this.im ? this.re : null },
                isNaN: function() { return isNaN(this.re) || isNaN(this.im) },
                isZero: function() { return !(0 !== this.re && -0 !== this.re || 0 !== this.im && -0 !== this.im) },
                isFinite: function() { return isFinite(this.re) && isFinite(this.im) },
                isInfinite: function() { return !(this.isNaN() || this.isFinite()) }
            }, u.ZERO = new u(0, 0), u.ONE = new u(1, 0), u.I = new u(0, 1), u.PI = new u(Math.PI, 0), u.E = new u(Math.E, 0), u.INFINITY = new u(1 / 0, 1 / 0), u.NAN = new u(NaN, NaN), u.EPSILON = 1e-16, void 0 === (n = function() { return u }.apply(t, [])) || (e.exports = n)
        }()
    }, function(e, t) { e.exports = function() { throw new Error("define cannot be used indirect") } }, function(e, t, r) {
        var n;
        /**
         * @license Fraction.js v4.0.12 09/09/2015
         * http://www.xarg.org/2014/03/rational-numbers-in-javascript/
         *
         * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
         * Dual licensed under the MIT or GPL Version 2 licenses.
         **/
        ! function(r) {
            "use strict";
            var i = { s: 1, n: 0, d: 1 };

            function a(e) {
                function t() {
                    var t = Error.apply(this, arguments);
                    t.name = this.name = e, this.stack = t.stack, this.message = t.message
                }

                function r() {}
                return r.prototype = Error.prototype, t.prototype = new r, t
            }
            var o = p.DivisionByZero = a("DivisionByZero"),
                s = p.InvalidParameter = a("InvalidParameter");

            function u(e, t) { return isNaN(e = parseInt(e, 10)) && c(), e * t }

            function c() { throw new s }
            var f = function(e, t) {
                var r, n = 0,
                    a = 1,
                    s = 1,
                    f = 0,
                    l = 0,
                    p = 0,
                    m = 1,
                    h = 1,
                    d = 0,
                    y = 1,
                    g = 1,
                    v = 1,
                    x = 1e7;
                if (null == e);
                else if (void 0 !== t) s = (n = e) * (a = t);
                else switch (typeof e) {
                    case "object":
                        "d" in e && "n" in e ? (n = e.n, a = e.d, "s" in e && (n *= e.s)) : 0 in e ? (n = e[0], 1 in e && (a = e[1])) : c(), s = n * a;
                        break;
                    case "number":
                        if (e < 0 && (s = e, e = -e), e % 1 == 0) n = e;
                        else if (e > 0) {
                            for (e >= 1 && (e /= h = Math.pow(10, Math.floor(1 + Math.log(e) / Math.LN10))); y <= x && v <= x;) {
                                if (e === (r = (d + g) / (y + v))) { y + v <= x ? (n = d + g, a = y + v) : v > y ? (n = g, a = v) : (n = d, a = y); break }
                                e > r ? (d += g, y += v) : (g += d, v += y), y > x ? (n = g, a = v) : (n = d, a = y)
                            }
                            n *= h
                        } else(isNaN(e) || isNaN(t)) && (a = n = NaN);
                        break;
                    case "string":
                        if (null === (y = e.match(/\d+|./g)) && c(), "-" === y[d] ? (s = -1, d++) : "+" === y[d] && d++, y.length === d + 1 ? l = u(y[d++], s) : "." === y[d + 1] || "." === y[d] ? ("." !== y[d] && (f = u(y[d++], s)), (++d + 1 === y.length || "(" === y[d + 1] && ")" === y[d + 3] || "'" === y[d + 1] && "'" === y[d + 3]) && (l = u(y[d], s), m = Math.pow(10, y[d].length), d++), ("(" === y[d] && ")" === y[d + 2] || "'" === y[d] && "'" === y[d + 2]) && (p = u(y[d + 1], s), h = Math.pow(10, y[d + 1].length) - 1, d += 3)) : "/" === y[d + 1] || ":" === y[d + 1] ? (l = u(y[d], s), m = u(y[d + 2], 1), d += 3) : "/" === y[d + 3] && " " === y[d + 1] && (f = u(y[d], s), l = u(y[d + 2], s), m = u(y[d + 4], 1), d += 5), y.length <= d) { s = n = p + (a = m * h) * f + h * l; break }
                    default:
                        c()
                }
                if (0 === a) throw new o;
                i.s = s < 0 ? -1 : 1, i.n = Math.abs(n), i.d = Math.abs(a)
            };

            function l(e, t) { if (!e) return t; if (!t) return e; for (;;) { if (!(e %= t)) return t; if (!(t %= e)) return e } }

            function p(e, t) {
                if (!(this instanceof p)) return new p(e, t);
                f(e, t), e = p.REDUCE ? l(i.d, i.n) : 1, this.s = i.s, this.n = i.n / e, this.d = i.d / e
            }
            p.REDUCE = 1, p.prototype = {
                s: 1,
                n: 0,
                d: 1,
                abs: function() { return new p(this.n, this.d) },
                neg: function() { return new p(-this.s * this.n, this.d) },
                add: function(e, t) { return f(e, t), new p(this.s * this.n * i.d + i.s * this.d * i.n, this.d * i.d) },
                sub: function(e, t) { return f(e, t), new p(this.s * this.n * i.d - i.s * this.d * i.n, this.d * i.d) },
                mul: function(e, t) { return f(e, t), new p(this.s * i.s * this.n * i.n, this.d * i.d) },
                div: function(e, t) { return f(e, t), new p(this.s * i.s * this.n * i.d, this.d * i.n) },
                clone: function() { return new p(this) },
                mod: function(e, t) { return isNaN(this.n) || isNaN(this.d) ? new p(NaN) : void 0 === e ? new p(this.s * this.n % this.d, 1) : (f(e, t), 0 === i.n && 0 === this.d && p(0, 0), new p(this.s * (i.d * this.n) % (i.n * this.d), i.d * this.d)) },
                gcd: function(e, t) { return f(e, t), new p(l(i.n, this.n) * l(i.d, this.d), i.d * this.d) },
                lcm: function(e, t) { return f(e, t), 0 === i.n && 0 === this.n ? new p : new p(i.n * this.n, l(i.n, this.n) * l(i.d, this.d)) },
                ceil: function(e) { return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new p(NaN) : new p(Math.ceil(e * this.s * this.n / this.d), e) },
                floor: function(e) { return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new p(NaN) : new p(Math.floor(e * this.s * this.n / this.d), e) },
                round: function(e) { return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new p(NaN) : new p(Math.round(e * this.s * this.n / this.d), e) },
                inverse: function() { return new p(this.s * this.d, this.n) },
                pow: function(e) { return e < 0 ? new p(Math.pow(this.s * this.d, -e), Math.pow(this.n, -e)) : new p(Math.pow(this.s * this.n, e), Math.pow(this.d, e)) },
                equals: function(e, t) { return f(e, t), this.s * this.n * i.d == i.s * i.n * this.d },
                compare: function(e, t) { f(e, t); var r = this.s * this.n * i.d - i.s * i.n * this.d; return (0 < r) - (r < 0) },
                simplify: function(e) {
                    if (isNaN(this.n) || isNaN(this.d)) return this;
                    var t = this.abs().toContinued();

                    function r(e) { return 1 === e.length ? new p(e[0]) : r(e.slice(1)).inverse().add(e[0]) }
                    e = e || .001;
                    for (var n = 0; n < t.length; n++) { var i = r(t.slice(0, n + 1)); if (i.sub(this.abs()).abs().valueOf() < e) return i.mul(this.s) }
                    return this
                },
                divisible: function(e, t) { return f(e, t), !(!(i.n * this.d) || this.n * i.d % (i.n * this.d)) },
                valueOf: function() { return this.s * this.n / this.d },
                toFraction: function(e) {
                    var t, r = "",
                        n = this.n,
                        i = this.d;
                    return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && (t = Math.floor(n / i)) > 0 && (r += t, r += " ", n %= i), r += n, r += "/", r += i), r
                },
                toLatex: function(e) {
                    var t, r = "",
                        n = this.n,
                        i = this.d;
                    return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && (t = Math.floor(n / i)) > 0 && (r += t, n %= i), r += "\\frac{", r += n, r += "}{", r += i, r += "}"), r
                },
                toContinued: function() {
                    var e, t = this.n,
                        r = this.d,
                        n = [];
                    if (isNaN(t) || isNaN(r)) return n;
                    do { n.push(Math.floor(t / r)), e = t % r, t = r, r = e } while (1 !== t);
                    return n
                },
                toString: function(e) {
                    var t, r = this.n,
                        n = this.d;
                    if (isNaN(r) || isNaN(n)) return "NaN";
                    p.REDUCE || (r /= t = l(r, n), n /= t), e = e || 15;
                    var i = function(e, t) {
                            for (; t % 2 == 0; t /= 2);
                            for (; t % 5 == 0; t /= 5);
                            if (1 === t) return 0;
                            for (var r = 10 % t, n = 1; 1 !== r; n++)
                                if (r = 10 * r % t, n > 2e3) return 0;
                            return n
                        }(0, n),
                        a = function(e, t, r) {
                            for (var n = 1, i = function(e, t, r) { for (var n = 1; t > 0; e = e * e % r, t >>= 1) 1 & t && (n = n * e % r); return n }(10, r, t), a = 0; a < 300; a++) {
                                if (n === i) return a;
                                n = 10 * n % t, i = 10 * i % t
                            }
                            return 0
                        }(0, n, i),
                        o = -1 === this.s ? "-" : "";
                    if (o += r / n | 0, r %= n, (r *= 10) && (o += "."), i) {
                        for (var s = a; s--;) o += r / n | 0, r %= n, r *= 10;
                        o += "(";
                        for (s = i; s--;) o += r / n | 0, r %= n, r *= 10;
                        o += ")"
                    } else
                        for (s = e; r && s--;) o += r / n | 0, r %= n, r *= 10;
                    return o
                }
            }, void 0 === (n = function() { return p }.apply(t, [])) || (e.exports = n)
        }()
    }, function(e, t) {
        e.exports = function e(t, r) {
            "use strict";
            var n, i, a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
                o = /(^[ ]*|[ ]*$)/g,
                s = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                u = /^0x[0-9a-f]+$/i,
                c = /^0/,
                f = function(t) { return e.insensitive && ("" + t).toLowerCase() || "" + t },
                l = f(t).replace(o, "") || "",
                p = f(r).replace(o, "") || "",
                m = l.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                h = p.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                d = parseInt(l.match(u), 16) || 1 !== m.length && l.match(s) && Date.parse(l),
                y = parseInt(p.match(u), 16) || d && p.match(s) && Date.parse(p) || null;
            if (y) { if (d < y) return -1; if (d > y) return 1 }
            for (var g = 0, v = Math.max(m.length, h.length); g < v; g++) { if (n = !(m[g] || "").match(c) && parseFloat(m[g]) || m[g] || 0, i = !(h[g] || "").match(c) && parseFloat(h[g]) || h[g] || 0, isNaN(n) !== isNaN(i)) return isNaN(n) ? 1 : -1; if (typeof n != typeof i && (n += "", i += ""), n < i) return -1; if (n > i) return 1 }
            return 0
        }
    }, function(e, t) { e.exports = function(e) { return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function() { return e.l } }), Object.defineProperty(e, "id", { enumerable: !0, get: function() { return e.i } }), e.webpackPolyfill = 1), e } }, function(e, t) {
        (function(t) { e.exports = t }).call(this, {})
    }, function(e, t, r) {
        var n;
        ! function(i) {
            "use strict";
            var a, o, s, u = 9e15,
                c = "0123456789abcdef",
                f = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
                l = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
                p = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -u, maxE: u, crypto: !1 },
                m = !0,
                h = "[DecimalError] Invalid argument: ",
                d = Math.floor,
                y = Math.pow,
                g = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
                v = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
                x = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
                b = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
                w = 1e7,
                N = f.length - 1,
                M = l.length - 1,
                S = { name: "[object Decimal]" };

            function E(e) {
                var t, r, n, i = e.length - 1,
                    a = "",
                    o = e[0];
                if (i > 0) {
                    for (a += o, t = 1; t < i; t++)(r = 7 - (n = e[t] + "").length) && (a += D(r)), a += n;
                    (r = 7 - (n = (o = e[t]) + "").length) && (a += D(r))
                } else if (0 === o) return "0";
                for (; o % 10 == 0;) o /= 10;
                return a + o
            }

            function A(e, t, r) { if (e !== ~~e || e < t || e > r) throw Error(h + e) }

            function O(e, t, r, n) { var i, a, o, s; for (a = e[0]; a >= 10; a /= 10) --t; return --t < 0 ? (t += 7, i = 0) : (i = Math.ceil((t + 1) / 7), t %= 7), a = y(10, 7 - t), s = e[i] % a | 0, null == n ? t < 3 ? (0 == t ? s = s / 100 | 0 : 1 == t && (s = s / 10 | 0), o = r < 4 && 99999 == s || r > 3 && 49999 == s || 5e4 == s || 0 == s) : o = (r < 4 && s + 1 == a || r > 3 && s + 1 == a / 2) && (e[i + 1] / a / 100 | 0) == y(10, t - 2) - 1 || (s == a / 2 || 0 == s) && 0 == (e[i + 1] / a / 100 | 0) : t < 4 ? (0 == t ? s = s / 1e3 | 0 : 1 == t ? s = s / 100 | 0 : 2 == t && (s = s / 10 | 0), o = (n || r < 4) && 9999 == s || !n && r > 3 && 4999 == s) : o = ((n || r < 4) && s + 1 == a || !n && r > 3 && s + 1 == a / 2) && (e[i + 1] / a / 1e3 | 0) == y(10, t - 3) - 1, o }

            function C(e, t, r) { for (var n, i, a = [0], o = 0, s = e.length; o < s;) { for (i = a.length; i--;) a[i] *= t; for (a[0] += c.indexOf(e.charAt(o++)), n = 0; n < a.length; n++) a[n] > r - 1 && (void 0 === a[n + 1] && (a[n + 1] = 0), a[n + 1] += a[n] / r | 0, a[n] %= r) } return a.reverse() }
            S.absoluteValue = S.abs = function() { var e = new this.constructor(this); return e.s < 0 && (e.s = 1), T(e) }, S.ceil = function() { return T(new this.constructor(this), this.e + 1, 2) }, S.comparedTo = S.cmp = function(e) {
                var t, r, n, i, a = this,
                    o = a.d,
                    s = (e = new a.constructor(e)).d,
                    u = a.s,
                    c = e.s;
                if (!o || !s) return u && c ? u !== c ? u : o === s ? 0 : !o ^ u < 0 ? 1 : -1 : NaN;
                if (!o[0] || !s[0]) return o[0] ? u : s[0] ? -c : 0;
                if (u !== c) return u;
                if (a.e !== e.e) return a.e > e.e ^ u < 0 ? 1 : -1;
                for (t = 0, r = (n = o.length) < (i = s.length) ? n : i; t < r; ++t)
                    if (o[t] !== s[t]) return o[t] > s[t] ^ u < 0 ? 1 : -1;
                return n === i ? 0 : n > i ^ u < 0 ? 1 : -1
            }, S.cosine = S.cos = function() {
                var e, t, r = this,
                    n = r.constructor;
                return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + 7, n.rounding = 1, r = function(e, t) {
                    var r, n, i = t.d.length;
                    i < 32 ? (r = Math.ceil(i / 3), n = (1 / V(4, r)).toString()) : (r = 16, n = "2.3283064365386962890625e-10");
                    e.precision += r, t = G(e, 1, t.times(n), new e(1));
                    for (var a = r; a--;) {
                        var o = t.times(t);
                        t = o.times(o).minus(o).times(8).plus(1)
                    }
                    return e.precision -= r, t
                }(n, Z(n, r)), n.precision = e, n.rounding = t, T(2 == s || 3 == s ? r.neg() : r, e, t, !0)) : new n(1) : new n(NaN)
            }, S.cubeRoot = S.cbrt = function() {
                var e, t, r, n, i, a, o, s, u, c, f = this,
                    l = f.constructor;
                if (!f.isFinite() || f.isZero()) return new l(f);
                for (m = !1, (a = f.s * y(f.s * f, 1 / 3)) && Math.abs(a) != 1 / 0 ? n = new l(a.toString()) : (r = E(f.d), (a = ((e = f.e) - r.length + 1) % 3) && (r += 1 == a || -2 == a ? "0" : "00"), a = y(r, 1 / 3), e = d((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), (n = new l(r = a == 1 / 0 ? "5e" + e : (r = a.toExponential()).slice(0, r.indexOf("e") + 1) + e)).s = f.s), o = (e = l.precision) + 3;;)
                    if (c = (u = (s = n).times(s).times(s)).plus(f), n = _(c.plus(f).times(s), c.plus(u), o + 2, 1), E(s.d).slice(0, o) === (r = E(n.d)).slice(0, o)) {
                        if ("9999" != (r = r.slice(o - 3, o + 1)) && (i || "4999" != r)) {+r && (+r.slice(1) || "5" != r.charAt(0)) || (T(n, e + 1, 1), t = !n.times(n).times(n).eq(f)); break }
                        if (!i && (T(s, e + 1, 0), s.times(s).times(s).eq(f))) { n = s; break }
                        o += 4, i = 1
                    }
                return m = !0, T(n, e, l.rounding, t)
            }, S.decimalPlaces = S.dp = function() {
                var e, t = this.d,
                    r = NaN;
                if (t) {
                    if (r = 7 * ((e = t.length - 1) - d(this.e / 7)), e = t[e])
                        for (; e % 10 == 0; e /= 10) r--;
                    r < 0 && (r = 0)
                }
                return r
            }, S.dividedBy = S.div = function(e) { return _(this, new this.constructor(e)) }, S.dividedToIntegerBy = S.divToInt = function(e) { var t = this.constructor; return T(_(this, new t(e), 0, 1, 1), t.precision, t.rounding) }, S.equals = S.eq = function(e) { return 0 === this.cmp(e) }, S.floor = function() { return T(new this.constructor(this), this.e + 1, 3) }, S.greaterThan = S.gt = function(e) { return this.cmp(e) > 0 }, S.greaterThanOrEqualTo = S.gte = function(e) { var t = this.cmp(e); return 1 == t || 0 === t }, S.hyperbolicCosine = S.cosh = function() {
                var e, t, r, n, i, a = this,
                    o = a.constructor,
                    s = new o(1);
                if (!a.isFinite()) return new o(a.s ? 1 / 0 : NaN);
                if (a.isZero()) return s;
                r = o.precision, n = o.rounding, o.precision = r + Math.max(a.e, a.sd()) + 4, o.rounding = 1, (i = a.d.length) < 32 ? t = (1 / V(4, e = Math.ceil(i / 3))).toString() : (e = 16, t = "2.3283064365386962890625e-10"), a = G(o, 1, a.times(t), new o(1), !0);
                for (var u, c = e, f = new o(8); c--;) u = a.times(a), a = s.minus(u.times(f.minus(u.times(f))));
                return T(a, o.precision = r, o.rounding = n, !0)
            }, S.hyperbolicSine = S.sinh = function() {
                var e, t, r, n, i = this,
                    a = i.constructor;
                if (!i.isFinite() || i.isZero()) return new a(i);
                if (t = a.precision, r = a.rounding, a.precision = t + Math.max(i.e, i.sd()) + 4, a.rounding = 1, (n = i.d.length) < 3) i = G(a, 2, i, i, !0);
                else { e = (e = 1.4 * Math.sqrt(n)) > 16 ? 16 : 0 | e, i = G(a, 2, i = i.times(1 / V(5, e)), i, !0); for (var o, s = new a(5), u = new a(16), c = new a(20); e--;) o = i.times(i), i = i.times(s.plus(o.times(u.times(o).plus(c)))) }
                return a.precision = t, a.rounding = r, T(i, t, r, !0)
            }, S.hyperbolicTangent = S.tanh = function() {
                var e, t, r = this,
                    n = r.constructor;
                return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, _(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s)
            }, S.inverseCosine = S.acos = function() {
                var e, t = this,
                    r = t.constructor,
                    n = t.abs().cmp(1),
                    i = r.precision,
                    a = r.rounding;
                return -1 !== n ? 0 === n ? t.isNeg() ? B(r, i, a) : new r(0) : new r(NaN) : t.isZero() ? B(r, i + 4, a).times(.5) : (r.precision = i + 6, r.rounding = 1, t = t.asin(), e = B(r, i + 4, a).times(.5), r.precision = i, r.rounding = a, e.minus(t))
            }, S.inverseHyperbolicCosine = S.acosh = function() {
                var e, t, r = this,
                    n = r.constructor;
                return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, m = !1, r = r.times(r).minus(1).sqrt().plus(r), m = !0, n.precision = e, n.rounding = t, r.ln()) : new n(r)
            }, S.inverseHyperbolicSine = S.asinh = function() {
                var e, t, r = this,
                    n = r.constructor;
                return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, m = !1, r = r.times(r).plus(1).sqrt().plus(r), m = !0, n.precision = e, n.rounding = t, r.ln())
            }, S.inverseHyperbolicTangent = S.atanh = function() {
                var e, t, r, n, i = this,
                    a = i.constructor;
                return i.isFinite() ? i.e >= 0 ? new a(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = a.precision, t = a.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? T(new a(i), e, t, !0) : (a.precision = r = n - i.e, i = _(i.plus(1), new a(1).minus(i), r + e, 1), a.precision = e + 4, a.rounding = 1, i = i.ln(), a.precision = e, a.rounding = t, i.times(.5))) : new a(NaN)
            }, S.inverseSine = S.asin = function() {
                var e, t, r, n, i = this,
                    a = i.constructor;
                return i.isZero() ? new a(i) : (t = i.abs().cmp(1), r = a.precision, n = a.rounding, -1 !== t ? 0 === t ? ((e = B(a, r + 4, n).times(.5)).s = i.s, e) : new a(NaN) : (a.precision = r + 6, a.rounding = 1, i = i.div(new a(1).minus(i.times(i)).sqrt().plus(1)).atan(), a.precision = r, a.rounding = n, i.times(2)))
            }, S.inverseTangent = S.atan = function() {
                var e, t, r, n, i, a, o, s, u, c = this,
                    f = c.constructor,
                    l = f.precision,
                    p = f.rounding;
                if (c.isFinite()) { if (c.isZero()) return new f(c); if (c.abs().eq(1) && l + 4 <= M) return (o = B(f, l + 4, p).times(.25)).s = c.s, o } else { if (!c.s) return new f(NaN); if (l + 4 <= M) return (o = B(f, l + 4, p).times(.5)).s = c.s, o }
                for (f.precision = s = l + 10, f.rounding = 1, e = r = Math.min(28, s / 7 + 2 | 0); e; --e) c = c.div(c.times(c).plus(1).sqrt().plus(1));
                for (m = !1, t = Math.ceil(s / 7), n = 1, u = c.times(c), o = new f(c), i = c; - 1 !== e;)
                    if (i = i.times(u), a = o.minus(i.div(n += 2)), i = i.times(u), void 0 !== (o = a.plus(i.div(n += 2))).d[t])
                        for (e = t; o.d[e] === a.d[e] && e--;);
                return r && (o = o.times(2 << r - 1)), m = !0, T(o, f.precision = l, f.rounding = p, !0)
            }, S.isFinite = function() { return !!this.d }, S.isInteger = S.isInt = function() { return !!this.d && d(this.e / 7) > this.d.length - 2 }, S.isNaN = function() { return !this.s }, S.isNegative = S.isNeg = function() { return this.s < 0 }, S.isPositive = S.isPos = function() { return this.s > 0 }, S.isZero = function() { return !!this.d && 0 === this.d[0] }, S.lessThan = S.lt = function(e) { return this.cmp(e) < 0 }, S.lessThanOrEqualTo = S.lte = function(e) { return this.cmp(e) < 1 }, S.logarithm = S.log = function(e) {
                var t, r, n, i, a, o, s, u, c = this.constructor,
                    f = c.precision,
                    l = c.rounding;
                if (null == e) e = new c(10), t = !0;
                else {
                    if (r = (e = new c(e)).d, e.s < 0 || !r || !r[0] || e.eq(1)) return new c(NaN);
                    t = e.eq(10)
                }
                if (r = this.d, this.s < 0 || !r || !r[0] || this.eq(1)) return new c(r && !r[0] ? -1 / 0 : 1 != this.s ? NaN : r ? 0 : 1 / 0);
                if (t)
                    if (r.length > 1) a = !0;
                    else {
                        for (i = r[0]; i % 10 == 0;) i /= 10;
                        a = 1 !== i
                    }
                if (m = !1, o = F(this, s = f + 5), n = t ? I(c, s + 10) : F(e, s), O((u = _(o, n, s, 1)).d, i = f, l))
                    do { if (o = F(this, s += 10), n = t ? I(c, s + 10) : F(e, s), u = _(o, n, s, 1), !a) {+E(u.d).slice(i + 1, i + 15) + 1 == 1e14 && (u = T(u, f + 1, 0)); break } } while (O(u.d, i += 10, l));
                return m = !0, T(u, f, l)
            }, S.minus = S.sub = function(e) {
                var t, r, n, i, a, o, s, u, c, f, l, p, h = this,
                    y = h.constructor;
                if (e = new y(e), !h.d || !e.d) return h.s && e.s ? h.d ? e.s = -e.s : e = new y(e.d || h.s !== e.s ? h : NaN) : e = new y(NaN), e;
                if (h.s != e.s) return e.s = -e.s, h.plus(e);
                if (c = h.d, p = e.d, s = y.precision, u = y.rounding, !c[0] || !p[0]) {
                    if (p[0]) e.s = -e.s;
                    else {
                        if (!c[0]) return new y(3 === u ? -0 : 0);
                        e = new y(h)
                    }
                    return m ? T(e, s, u) : e
                }
                if (r = d(e.e / 7), f = d(h.e / 7), c = c.slice(), a = f - r) {
                    for ((l = a < 0) ? (t = c, a = -a, o = p.length) : (t = p, r = f, o = c.length), a > (n = Math.max(Math.ceil(s / 7), o) + 2) && (a = n, t.length = 1), t.reverse(), n = a; n--;) t.push(0);
                    t.reverse()
                } else {
                    for ((l = (n = c.length) < (o = p.length)) && (o = n), n = 0; n < o; n++)
                        if (c[n] != p[n]) { l = c[n] < p[n]; break }
                    a = 0
                }
                for (l && (t = c, c = p, p = t, e.s = -e.s), o = c.length, n = p.length - o; n > 0; --n) c[o++] = 0;
                for (n = p.length; n > a;) {
                    if (c[--n] < p[n]) { for (i = n; i && 0 === c[--i];) c[i] = w - 1;--c[i], c[n] += w }
                    c[n] -= p[n]
                }
                for (; 0 === c[--o];) c.pop();
                for (; 0 === c[0]; c.shift()) --r;
                return c[0] ? (e.d = c, e.e = q(c, r), m ? T(e, s, u) : e) : new y(3 === u ? -0 : 0)
            }, S.modulo = S.mod = function(e) {
                var t, r = this,
                    n = r.constructor;
                return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? T(new n(r), n.precision, n.rounding) : (m = !1, 9 == n.modulo ? (t = _(r, e.abs(), 0, 3, 1)).s *= e.s : t = _(r, e, 0, n.modulo, 1), t = t.times(e), m = !0, r.minus(t))
            }, S.naturalExponential = S.exp = function() { return U(this) }, S.naturalLogarithm = S.ln = function() { return F(this) }, S.negated = S.neg = function() { var e = new this.constructor(this); return e.s = -e.s, T(e) }, S.plus = S.add = function(e) {
                var t, r, n, i, a, o, s, u, c, f, l = this,
                    p = l.constructor;
                if (e = new p(e), !l.d || !e.d) return l.s && e.s ? l.d || (e = new p(e.d || l.s === e.s ? l : NaN)) : e = new p(NaN), e;
                if (l.s != e.s) return e.s = -e.s, l.minus(e);
                if (c = l.d, f = e.d, s = p.precision, u = p.rounding, !c[0] || !f[0]) return f[0] || (e = new p(l)), m ? T(e, s, u) : e;
                if (a = d(l.e / 7), n = d(e.e / 7), c = c.slice(), i = a - n) {
                    for (i < 0 ? (r = c, i = -i, o = f.length) : (r = f, n = a, o = c.length), i > (o = (a = Math.ceil(s / 7)) > o ? a + 1 : o + 1) && (i = o, r.length = 1), r.reverse(); i--;) r.push(0);
                    r.reverse()
                }
                for ((o = c.length) - (i = f.length) < 0 && (i = o, r = f, f = c, c = r), t = 0; i;) t = (c[--i] = c[i] + f[i] + t) / w | 0, c[i] %= w;
                for (t && (c.unshift(t), ++n), o = c.length; 0 == c[--o];) c.pop();
                return e.d = c, e.e = q(c, n), m ? T(e, s, u) : e
            }, S.precision = S.sd = function(e) { var t, r = this; if (void 0 !== e && e !== !!e && 1 !== e && 0 !== e) throw Error(h + e); return r.d ? (t = k(r.d), e && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t }, S.round = function() {
                var e = this,
                    t = e.constructor;
                return T(new t(e), e.e + 1, t.rounding)
            }, S.sine = S.sin = function() {
                var e, t, r = this,
                    n = r.constructor;
                return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + 7, n.rounding = 1, r = function(e, t) {
                    var r, n = t.d.length;
                    if (n < 3) return G(e, 2, t, t);
                    r = (r = 1.4 * Math.sqrt(n)) > 16 ? 16 : 0 | r, t = t.times(1 / V(5, r)), t = G(e, 2, t, t);
                    for (var i, a = new e(5), o = new e(16), s = new e(20); r--;) i = t.times(t), t = t.times(a.plus(i.times(o.times(i).minus(s))));
                    return t
                }(n, Z(n, r)), n.precision = e, n.rounding = t, T(s > 2 ? r.neg() : r, e, t, !0)) : new n(NaN)
            }, S.squareRoot = S.sqrt = function() {
                var e, t, r, n, i, a, o = this,
                    s = o.d,
                    u = o.e,
                    c = o.s,
                    f = o.constructor;
                if (1 !== c || !s || !s[0]) return new f(!c || c < 0 && (!s || s[0]) ? NaN : s ? o : 1 / 0);
                for (m = !1, 0 == (c = Math.sqrt(+o)) || c == 1 / 0 ? (((t = E(s)).length + u) % 2 == 0 && (t += "0"), c = Math.sqrt(t), u = d((u + 1) / 2) - (u < 0 || u % 2), n = new f(t = c == 1 / 0 ? "5e" + u : (t = c.toExponential()).slice(0, t.indexOf("e") + 1) + u)) : n = new f(c.toString()), r = (u = f.precision) + 3;;)
                    if (n = (a = n).plus(_(o, a, r + 2, 1)).times(.5), E(a.d).slice(0, r) === (t = E(n.d)).slice(0, r)) {
                        if ("9999" != (t = t.slice(r - 3, r + 1)) && (i || "4999" != t)) {+t && (+t.slice(1) || "5" != t.charAt(0)) || (T(n, u + 1, 1), e = !n.times(n).eq(o)); break }
                        if (!i && (T(a, u + 1, 0), a.times(a).eq(o))) { n = a; break }
                        r += 4, i = 1
                    }
                return m = !0, T(n, u, f.rounding, e)
            }, S.tangent = S.tan = function() {
                var e, t, r = this,
                    n = r.constructor;
                return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, (r = r.sin()).s = 1, r = _(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, T(2 == s || 4 == s ? r.neg() : r, e, t, !0)) : new n(NaN)
            }, S.times = S.mul = function(e) {
                var t, r, n, i, a, o, s, u, c, f = this,
                    l = f.constructor,
                    p = f.d,
                    h = (e = new l(e)).d;
                if (e.s *= f.s, !(p && p[0] && h && h[0])) return new l(!e.s || p && !p[0] && !h || h && !h[0] && !p ? NaN : p && h ? 0 * e.s : e.s / 0);
                for (r = d(f.e / 7) + d(e.e / 7), (u = p.length) < (c = h.length) && (a = p, p = h, h = a, o = u, u = c, c = o), a = [], n = o = u + c; n--;) a.push(0);
                for (n = c; --n >= 0;) {
                    for (t = 0, i = u + n; i > n;) s = a[i] + h[n] * p[i - n - 1] + t, a[i--] = s % w | 0, t = s / w | 0;
                    a[i] = (a[i] + t) % w | 0
                }
                for (; !a[--o];) a.pop();
                return t ? ++r : a.shift(), e.d = a, e.e = q(a, r), m ? T(e, l.precision, l.rounding) : e
            }, S.toBinary = function(e, t) { return W(this, 2, e, t) }, S.toDecimalPlaces = S.toDP = function(e, t) {
                var r = this,
                    n = r.constructor;
                return r = new n(r), void 0 === e ? r : (A(e, 0, 1e9), void 0 === t ? t = n.rounding : A(t, 0, 8), T(r, e + r.e + 1, t))
            }, S.toExponential = function(e, t) {
                var r, n = this,
                    i = n.constructor;
                return void 0 === e ? r = z(n, !0) : (A(e, 0, 1e9), void 0 === t ? t = i.rounding : A(t, 0, 8), r = z(n = T(new i(n), e + 1, t), !0, e + 1)), n.isNeg() && !n.isZero() ? "-" + r : r
            }, S.toFixed = function(e, t) {
                var r, n, i = this,
                    a = i.constructor;
                return void 0 === e ? r = z(i) : (A(e, 0, 1e9), void 0 === t ? t = a.rounding : A(t, 0, 8), r = z(n = T(new a(i), e + i.e + 1, t), !1, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r
            }, S.toFraction = function(e) {
                var t, r, n, i, a, o, s, u, c, f, l, p, d = this,
                    g = d.d,
                    v = d.constructor;
                if (!g) return new v(d);
                if (c = r = new v(1), n = u = new v(0), o = (a = (t = new v(n)).e = k(g) - d.e - 1) % 7, t.d[0] = y(10, o < 0 ? 7 + o : o), null == e) e = a > 0 ? t : c;
                else {
                    if (!(s = new v(e)).isInt() || s.lt(c)) throw Error(h + s);
                    e = s.gt(t) ? a > 0 ? t : c : s
                }
                for (m = !1, s = new v(E(g)), f = v.precision, v.precision = a = 7 * g.length * 2; l = _(s, t, 0, 1, 1), 1 != (i = r.plus(l.times(n))).cmp(e);) r = n, n = i, i = c, c = u.plus(l.times(i)), u = i, i = t, t = s.minus(l.times(i)), s = i;
                return i = _(e.minus(r), n, 0, 1, 1), u = u.plus(i.times(c)), r = r.plus(i.times(n)), u.s = c.s = d.s, p = _(c, n, a, 1).minus(d).abs().cmp(_(u, r, a, 1).minus(d).abs()) < 1 ? [c, n] : [u, r], v.precision = f, m = !0, p
            }, S.toHexadecimal = S.toHex = function(e, t) { return W(this, 16, e, t) }, S.toNearest = function(e, t) {
                var r = this,
                    n = r.constructor;
                if (r = new n(r), null == e) {
                    if (!r.d) return r;
                    e = new n(1), t = n.rounding
                } else { if (e = new n(e), void 0 === t ? t = n.rounding : A(t, 0, 8), !r.d) return e.s ? r : e; if (!e.d) return e.s && (e.s = r.s), e }
                return e.d[0] ? (m = !1, r = _(r, e, 0, t, 1).times(e), m = !0, T(r)) : (e.s = r.s, r = e), r
            }, S.toNumber = function() { return +this }, S.toOctal = function(e, t) { return W(this, 8, e, t) }, S.toPower = S.pow = function(e) {
                var t, r, n, i, a, o, s = this,
                    u = s.constructor,
                    c = +(e = new u(e));
                if (!(s.d && e.d && s.d[0] && e.d[0])) return new u(y(+s, c));
                if ((s = new u(s)).eq(1)) return s;
                if (n = u.precision, a = u.rounding, e.eq(1)) return T(s, n, a);
                if ((t = d(e.e / 7)) >= e.d.length - 1 && (r = c < 0 ? -c : c) <= 9007199254740991) return i = R(u, s, r, n), e.s < 0 ? new u(1).div(i) : T(i, n, a);
                if ((o = s.s) < 0) { if (t < e.d.length - 1) return new u(NaN); if (0 == (1 & e.d[t]) && (o = 1), 0 == s.e && 1 == s.d[0] && 1 == s.d.length) return s.s = o, s }
                return (t = 0 != (r = y(+s, c)) && isFinite(r) ? new u(r + "").e : d(c * (Math.log("0." + E(s.d)) / Math.LN10 + s.e + 1))) > u.maxE + 1 || t < u.minE - 1 ? new u(t > 0 ? o / 0 : 0) : (m = !1, u.rounding = s.s = 1, r = Math.min(12, (t + "").length), (i = U(e.times(F(s, n + r)), n)).d && O((i = T(i, n + 5, 1)).d, n, a) && (t = n + 10, +E((i = T(U(e.times(F(s, t + r)), t), t + 5, 1)).d).slice(n + 1, n + 15) + 1 == 1e14 && (i = T(i, n + 1, 0))), i.s = o, m = !0, u.rounding = a, T(i, n, a))
            }, S.toPrecision = function(e, t) {
                var r, n = this,
                    i = n.constructor;
                return void 0 === e ? r = z(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (A(e, 1, 1e9), void 0 === t ? t = i.rounding : A(t, 0, 8), r = z(n = T(new i(n), e, t), e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + r : r
            }, S.toSignificantDigits = S.toSD = function(e, t) { var r = this.constructor; return void 0 === e ? (e = r.precision, t = r.rounding) : (A(e, 1, 1e9), void 0 === t ? t = r.rounding : A(t, 0, 8)), T(new r(this), e, t) }, S.toString = function() {
                var e = this,
                    t = e.constructor,
                    r = z(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
                return e.isNeg() && !e.isZero() ? "-" + r : r
            }, S.truncated = S.trunc = function() { return T(new this.constructor(this), this.e + 1, 1) }, S.valueOf = S.toJSON = function() {
                var e = this,
                    t = e.constructor,
                    r = z(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
                return e.isNeg() ? "-" + r : r
            };
            var _ = function() {
                function e(e, t, r) {
                    var n, i = 0,
                        a = e.length;
                    for (e = e.slice(); a--;) n = e[a] * t + i, e[a] = n % r | 0, i = n / r | 0;
                    return i && e.unshift(i), e
                }

                function t(e, t, r, n) {
                    var i, a;
                    if (r != n) a = r > n ? 1 : -1;
                    else
                        for (i = a = 0; i < r; i++)
                            if (e[i] != t[i]) { a = e[i] > t[i] ? 1 : -1; break } return a
                }

                function r(e, t, r, n) { for (var i = 0; r--;) e[r] -= i, i = e[r] < t[r] ? 1 : 0, e[r] = i * n + e[r] - t[r]; for (; !e[0] && e.length > 1;) e.shift() }
                return function(n, i, a, s, u, c) {
                    var f, l, p, m, h, y, g, v, x, b, N, M, S, E, A, O, C, _, z, q, I = n.constructor,
                        B = n.s == i.s ? 1 : -1,
                        k = n.d,
                        D = i.d;
                    if (!(k && k[0] && D && D[0])) return new I(n.s && i.s && (k ? !D || k[0] != D[0] : D) ? k && 0 == k[0] || !D ? 0 * B : B / 0 : NaN);
                    for (c ? (h = 1, l = n.e - i.e) : (c = w, h = 7, l = d(n.e / h) - d(i.e / h)), z = D.length, C = k.length, b = (x = new I(B)).d = [], p = 0; D[p] == (k[p] || 0); p++);
                    if (D[p] > (k[p] || 0) && l--, null == a ? (E = a = I.precision, s = I.rounding) : E = u ? a + (n.e - i.e) + 1 : a, E < 0) b.push(1), y = !0;
                    else {
                        if (E = E / h + 2 | 0, p = 0, 1 == z) {
                            for (m = 0, D = D[0], E++;
                                (p < C || m) && E--; p++) A = m * c + (k[p] || 0), b[p] = A / D | 0, m = A % D | 0;
                            y = m || p < C
                        } else {
                            for ((m = c / (D[0] + 1) | 0) > 1 && (D = e(D, m, c), k = e(k, m, c), z = D.length, C = k.length), O = z, M = (N = k.slice(0, z)).length; M < z;) N[M++] = 0;
                            (q = D.slice()).unshift(0), _ = D[0], D[1] >= c / 2 && ++_;
                            do { m = 0, (f = t(D, N, z, M)) < 0 ? (S = N[0], z != M && (S = S * c + (N[1] || 0)), (m = S / _ | 0) > 1 ? (m >= c && (m = c - 1), 1 == (f = t(g = e(D, m, c), N, v = g.length, M = N.length)) && (m--, r(g, z < v ? q : D, v, c))) : (0 == m && (f = m = 1), g = D.slice()), (v = g.length) < M && g.unshift(0), r(N, g, M, c), -1 == f && (f = t(D, N, z, M = N.length)) < 1 && (m++, r(N, z < M ? q : D, M, c)), M = N.length) : 0 === f && (m++, N = [0]), b[p++] = m, f && N[0] ? N[M++] = k[O] || 0 : (N = [k[O]], M = 1) } while ((O++ < C || void 0 !== N[0]) && E--);
                            y = void 0 !== N[0]
                        }
                        b[0] || b.shift()
                    }
                    if (1 == h) x.e = l, o = y;
                    else {
                        for (p = 1, m = b[0]; m >= 10; m /= 10) p++;
                        x.e = p + l * h - 1, T(x, u ? a + x.e + 1 : a, s, y)
                    }
                    return x
                }
            }();

            function T(e, t, r, n) {
                var i, a, o, s, u, c, f, l, p, h = e.constructor;
                e: if (null != t) {
                    if (!(l = e.d)) return e;
                    for (i = 1, s = l[0]; s >= 10; s /= 10) i++;
                    if ((a = t - i) < 0) a += 7, o = t, u = (f = l[p = 0]) / y(10, i - o - 1) % 10 | 0;
                    else if ((p = Math.ceil((a + 1) / 7)) >= (s = l.length)) {
                        if (!n) break e;
                        for (; s++ <= p;) l.push(0);
                        f = u = 0, i = 1, o = (a %= 7) - 7 + 1
                    } else {
                        for (f = s = l[p], i = 1; s >= 10; s /= 10) i++;
                        u = (o = (a %= 7) - 7 + i) < 0 ? 0 : f / y(10, i - o - 1) % 10 | 0
                    }
                    if (n = n || t < 0 || void 0 !== l[p + 1] || (o < 0 ? f : f % y(10, i - o - 1)), c = r < 4 ? (u || n) && (0 == r || r == (e.s < 0 ? 3 : 2)) : u > 5 || 5 == u && (4 == r || n || 6 == r && (a > 0 ? o > 0 ? f / y(10, i - o) : 0 : l[p - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), t < 1 || !l[0]) return l.length = 0, c ? (t -= e.e + 1, l[0] = y(10, (7 - t % 7) % 7), e.e = -t || 0) : l[0] = e.e = 0, e;
                    if (0 == a ? (l.length = p, s = 1, p--) : (l.length = p + 1, s = y(10, 7 - a), l[p] = o > 0 ? (f / y(10, i - o) % y(10, o) | 0) * s : 0), c)
                        for (;;) {
                            if (0 == p) {
                                for (a = 1, o = l[0]; o >= 10; o /= 10) a++;
                                for (o = l[0] += s, s = 1; o >= 10; o /= 10) s++;
                                a != s && (e.e++, l[0] == w && (l[0] = 1));
                                break
                            }
                            if (l[p] += s, l[p] != w) break;
                            l[p--] = 0, s = 1
                        }
                    for (a = l.length; 0 === l[--a];) l.pop()
                }
                return m && (e.e > h.maxE ? (e.d = null, e.e = NaN) : e.e < h.minE && (e.e = 0, e.d = [0])), e
            }

            function z(e, t, r) {
                if (!e.isFinite()) return L(e);
                var n, i = e.e,
                    a = E(e.d),
                    o = a.length;
                return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + D(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (a = "0." + D(-i - 1) + a, r && (n = r - o) > 0 && (a += D(n))) : i >= o ? (a += D(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + D(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += D(n))), a
            }

            function q(e, t) { var r = e[0]; for (t *= 7; r >= 10; r /= 10) t++; return t }

            function I(e, t, r) { if (t > N) throw m = !0, r && (e.precision = r), Error("[DecimalError] Precision limit exceeded"); return T(new e(f), t, 1, !0) }

            function B(e, t, r) { if (t > M) throw Error("[DecimalError] Precision limit exceeded"); return T(new e(l), t, r, !0) }

            function k(e) {
                var t = e.length - 1,
                    r = 7 * t + 1;
                if (t = e[t]) { for (; t % 10 == 0; t /= 10) r--; for (t = e[0]; t >= 10; t /= 10) r++ }
                return r
            }

            function D(e) { for (var t = ""; e--;) t += "0"; return t }

            function R(e, t, r, n) {
                var i, a = new e(1),
                    o = Math.ceil(n / 7 + 4);
                for (m = !1;;) {
                    if (r % 2 && J((a = a.times(t)).d, o) && (i = !0), 0 === (r = d(r / 2))) { r = a.d.length - 1, i && 0 === a.d[r] && ++a.d[r]; break }
                    J((t = t.times(t)).d, o)
                }
                return m = !0, a
            }

            function P(e) { return 1 & e.d[e.d.length - 1] }

            function j(e, t, r) {
                for (var n, i = new e(t[0]), a = 0; ++a < t.length;) {
                    if (!(n = new e(t[a])).s) { i = n; break }
                    i[r](n) && (i = n)
                }
                return i
            }

            function U(e, t) {
                var r, n, i, a, o, s, u, c = 0,
                    f = 0,
                    l = 0,
                    p = e.constructor,
                    h = p.rounding,
                    d = p.precision;
                if (!e.d || !e.d[0] || e.e > 17) return new p(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
                for (null == t ? (m = !1, u = d) : u = t, s = new p(.03125); e.e > -2;) e = e.times(s), l += 5;
                for (u += n = Math.log(y(2, l)) / Math.LN10 * 2 + 5 | 0, r = a = o = new p(1), p.precision = u;;) {
                    if (a = T(a.times(e), u, 1), r = r.times(++f), E((s = o.plus(_(a, r, u, 1))).d).slice(0, u) === E(o.d).slice(0, u)) {
                        for (i = l; i--;) o = T(o.times(o), u, 1);
                        if (null != t) return p.precision = d, o;
                        if (!(c < 3 && O(o.d, u - n, h, c))) return T(o, p.precision = d, h, m = !0);
                        p.precision = u += 10, r = a = s = new p(1), f = 0, c++
                    }
                    o = s
                }
            }

            function F(e, t) {
                var r, n, i, a, o, s, u, c, f, l, p, h = 1,
                    d = e,
                    y = d.d,
                    g = d.constructor,
                    v = g.rounding,
                    x = g.precision;
                if (d.s < 0 || !y || !y[0] || !d.e && 1 == y[0] && 1 == y.length) return new g(y && !y[0] ? -1 / 0 : 1 != d.s ? NaN : y ? 0 : d);
                if (null == t ? (m = !1, f = x) : f = t, g.precision = f += 10, n = (r = E(y)).charAt(0), !(Math.abs(a = d.e) < 15e14)) return c = I(g, f + 2, x).times(a + ""), d = F(new g(n + "." + r.slice(1)), f - 10).plus(c), g.precision = x, null == t ? T(d, x, v, m = !0) : d;
                for (; n < 7 && 1 != n || 1 == n && r.charAt(1) > 3;) n = (r = E((d = d.times(e)).d)).charAt(0), h++;
                for (a = d.e, n > 1 ? (d = new g("0." + r), a++) : d = new g(n + "." + r.slice(1)), l = d, u = o = d = _(d.minus(1), d.plus(1), f, 1), p = T(d.times(d), f, 1), i = 3;;) {
                    if (o = T(o.times(p), f, 1), E((c = u.plus(_(o, new g(i), f, 1))).d).slice(0, f) === E(u.d).slice(0, f)) {
                        if (u = u.times(2), 0 !== a && (u = u.plus(I(g, f + 2, x).times(a + ""))), u = _(u, new g(h), f, 1), null != t) return g.precision = x, u;
                        if (!O(u.d, f - 10, v, s)) return T(u, g.precision = x, v, m = !0);
                        g.precision = f += 10, c = o = d = _(l.minus(1), l.plus(1), f, 1), p = T(d.times(d), f, 1), i = s = 1
                    }
                    u = c, i += 2
                }
            }

            function L(e) { return String(e.s * e.s / 0) }

            function H(e, t) {
                var r, n, i;
                for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; 48 === t.charCodeAt(n); n++);
                for (i = t.length; 48 === t.charCodeAt(i - 1); --i);
                if (t = t.slice(n, i)) {
                    if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % 7, r < 0 && (n += 7), n < i) {
                        for (n && e.d.push(+t.slice(0, n)), i -= 7; n < i;) e.d.push(+t.slice(n, n += 7));
                        n = 7 - (t = t.slice(n)).length
                    } else n -= i;
                    for (; n--;) t += "0";
                    e.d.push(+t), m && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]))
                } else e.e = 0, e.d = [0];
                return e
            }

            function $(e, t) {
                var r, n, i, o, s, u, c, f, l;
                if ("Infinity" === t || "NaN" === t) return +t || (e.s = NaN), e.e = NaN, e.d = null, e;
                if (v.test(t)) r = 16, t = t.toLowerCase();
                else if (g.test(t)) r = 2;
                else {
                    if (!x.test(t)) throw Error(h + t);
                    r = 8
                }
                for ((o = t.search(/p/i)) > 0 ? (c = +t.slice(o + 1), t = t.substring(2, o)) : t = t.slice(2), s = (o = t.indexOf(".")) >= 0, n = e.constructor, s && (o = (u = (t = t.replace(".", "")).length) - o, i = R(n, new n(r), o, 2 * o)), o = l = (f = C(t, r, w)).length - 1; 0 === f[o]; --o) f.pop();
                return o < 0 ? new n(0 * e.s) : (e.e = q(f, l), e.d = f, m = !1, s && (e = _(e, i, 4 * u)), c && (e = e.times(Math.abs(c) < 54 ? y(2, c) : a.pow(2, c))), m = !0, e)
            }

            function G(e, t, r, n, i) {
                var a, o, s, u, c = e.precision,
                    f = Math.ceil(c / 7);
                for (m = !1, u = r.times(r), s = new e(n);;) {
                    if (o = _(s.times(u), new e(t++ * t++), c, 1), s = i ? n.plus(o) : n.minus(o), n = _(o.times(u), new e(t++ * t++), c, 1), void 0 !== (o = s.plus(n)).d[f]) { for (a = f; o.d[a] === s.d[a] && a--;); if (-1 == a) break }
                    a = s, s = n, n = o, o = a
                }
                return m = !0, o.d.length = f + 1, o
            }

            function V(e, t) { for (var r = e; --t;) r *= e; return r }

            function Z(e, t) {
                var r, n = t.s < 0,
                    i = B(e, e.precision, 1),
                    a = i.times(.5);
                if ((t = t.abs()).lte(a)) return s = n ? 4 : 1, t;
                if ((r = t.divToInt(i)).isZero()) s = n ? 3 : 2;
                else {
                    if ((t = t.minus(r.times(i))).lte(a)) return s = P(r) ? n ? 2 : 3 : n ? 4 : 1, t;
                    s = P(r) ? n ? 1 : 4 : n ? 3 : 2
                }
                return t.minus(i).abs()
            }

            function W(e, t, r, n) {
                var i, a, s, u, f, l, p, m, h, d = e.constructor,
                    y = void 0 !== r;
                if (y ? (A(r, 1, 1e9), void 0 === n ? n = d.rounding : A(n, 0, 8)) : (r = d.precision, n = d.rounding), e.isFinite()) {
                    for (y ? (i = 2, 16 == t ? r = 4 * r - 3 : 8 == t && (r = 3 * r - 2)) : i = t, (s = (p = z(e)).indexOf(".")) >= 0 && (p = p.replace(".", ""), (h = new d(1)).e = p.length - s, h.d = C(z(h), 10, i), h.e = h.d.length), a = f = (m = C(p, 10, i)).length; 0 == m[--f];) m.pop();
                    if (m[0]) {
                        if (s < 0 ? a-- : ((e = new d(e)).d = m, e.e = a, m = (e = _(e, h, r, n, 0, i)).d, a = e.e, l = o), s = m[r], u = i / 2, l = l || void 0 !== m[r + 1], l = n < 4 ? (void 0 !== s || l) && (0 === n || n === (e.s < 0 ? 3 : 2)) : s > u || s === u && (4 === n || l || 6 === n && 1 & m[r - 1] || n === (e.s < 0 ? 8 : 7)), m.length = r, l)
                            for (; ++m[--r] > i - 1;) m[r] = 0, r || (++a, m.unshift(1));
                        for (f = m.length; !m[f - 1]; --f);
                        for (s = 0, p = ""; s < f; s++) p += c.charAt(m[s]);
                        if (y) {
                            if (f > 1)
                                if (16 == t || 8 == t) { for (s = 16 == t ? 4 : 3, --f; f % s; f++) p += "0"; for (f = (m = C(p, i, t)).length; !m[f - 1]; --f); for (s = 1, p = "1."; s < f; s++) p += c.charAt(m[s]) } else p = p.charAt(0) + "." + p.slice(1);
                            p = p + (a < 0 ? "p" : "p+") + a
                        } else if (a < 0) {
                            for (; ++a;) p = "0" + p;
                            p = "0." + p
                        } else if (++a > f)
                            for (a -= f; a--;) p += "0";
                        else a < f && (p = p.slice(0, a) + "." + p.slice(a))
                    } else p = y ? "0p+0" : "0";
                    p = (16 == t ? "0x" : 2 == t ? "0b" : 8 == t ? "0o" : "") + p
                } else p = L(e);
                return e.s < 0 ? "-" + p : p
            }

            function J(e, t) { if (e.length > t) return e.length = t, !0 }

            function Y(e) { return new this(e).abs() }

            function X(e) { return new this(e).acos() }

            function Q(e) { return new this(e).acosh() }

            function K(e, t) { return new this(e).plus(t) }

            function ee(e) { return new this(e).asin() }

            function te(e) { return new this(e).asinh() }

            function re(e) { return new this(e).atan() }

            function ne(e) { return new this(e).atanh() }

            function ie(e, t) {
                e = new this(e), t = new this(t);
                var r, n = this.precision,
                    i = this.rounding,
                    a = n + 4;
                return e.s && t.s ? e.d || t.d ? !t.d || e.isZero() ? (r = t.s < 0 ? B(this, n, i) : new this(0)).s = e.s : !e.d || t.isZero() ? (r = B(this, a, 1).times(.5)).s = e.s : t.s < 0 ? (this.precision = a, this.rounding = 1, r = this.atan(_(e, t, a, 1)), t = B(this, a, 1), this.precision = n, this.rounding = i, r = e.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan(_(e, t, a, 1)) : (r = B(this, a, 1).times(t.s > 0 ? .25 : .75)).s = e.s : r = new this(NaN), r
            }

            function ae(e) { return new this(e).cbrt() }

            function oe(e) { return T(e = new this(e), e.e + 1, 2) }

            function se(e) {
                if (!e || "object" != typeof e) throw Error("[DecimalError] Object expected");
                var t, r, n, i = !0 === e.defaults,
                    a = ["precision", 1, 1e9, "rounding", 0, 8, "toExpNeg", -u, 0, "toExpPos", 0, u, "maxE", 0, u, "minE", -u, 0, "modulo", 0, 9];
                for (t = 0; t < a.length; t += 3)
                    if (r = a[t], i && (this[r] = p[r]), void 0 !== (n = e[r])) {
                        if (!(d(n) === n && n >= a[t + 1] && n <= a[t + 2])) throw Error(h + r + ": " + n);
                        this[r] = n
                    }
                if (r = "crypto", i && (this[r] = p[r]), void 0 !== (n = e[r])) {
                    if (!0 !== n && !1 !== n && 0 !== n && 1 !== n) throw Error(h + r + ": " + n);
                    if (n) {
                        if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw Error("[DecimalError] crypto unavailable");
                        this[r] = !0
                    } else this[r] = !1
                }
                return this
            }

            function ue(e) { return new this(e).cos() }

            function ce(e) { return new this(e).cosh() }

            function fe(e, t) { return new this(e).div(t) }

            function le(e) { return new this(e).exp() }

            function pe(e) { return T(e = new this(e), e.e + 1, 3) }

            function me() {
                var e, t, r = new this(0);
                for (m = !1, e = 0; e < arguments.length;)
                    if ((t = new this(arguments[e++])).d) r.d && (r = r.plus(t.times(t)));
                    else {
                        if (t.s) return m = !0, new this(1 / 0);
                        r = t
                    }
                return m = !0, r.sqrt()
            }

            function he(e) { return e instanceof a || e && "[object Decimal]" === e.name || !1 }

            function de(e) { return new this(e).ln() }

            function ye(e, t) { return new this(e).log(t) }

            function ge(e) { return new this(e).log(2) }

            function ve(e) { return new this(e).log(10) }

            function xe() { return j(this, arguments, "lt") }

            function be() { return j(this, arguments, "gt") }

            function we(e, t) { return new this(e).mod(t) }

            function Ne(e, t) { return new this(e).mul(t) }

            function Me(e, t) { return new this(e).pow(t) }

            function Se(e) {
                var t, r, n, i, a = 0,
                    o = new this(1),
                    s = [];
                if (void 0 === e ? e = this.precision : A(e, 1, 1e9), n = Math.ceil(e / 7), this.crypto)
                    if (crypto.getRandomValues)
                        for (t = crypto.getRandomValues(new Uint32Array(n)); a < n;)(i = t[a]) >= 429e7 ? t[a] = crypto.getRandomValues(new Uint32Array(1))[0] : s[a++] = i % 1e7;
                    else {
                        if (!crypto.randomBytes) throw Error("[DecimalError] crypto unavailable");
                        for (t = crypto.randomBytes(n *= 4); a < n;)(i = t[a] + (t[a + 1] << 8) + (t[a + 2] << 16) + ((127 & t[a + 3]) << 24)) >= 214e7 ? crypto.randomBytes(4).copy(t, a) : (s.push(i % 1e7), a += 4);
                        a = n / 4
                    }
                else
                    for (; a < n;) s[a++] = 1e7 * Math.random() | 0;
                for (e %= 7, (n = s[--a]) && e && (i = y(10, 7 - e), s[a] = (n / i | 0) * i); 0 === s[a]; a--) s.pop();
                if (a < 0) r = 0, s = [0];
                else {
                    for (r = -1; 0 === s[0]; r -= 7) s.shift();
                    for (n = 1, i = s[0]; i >= 10; i /= 10) n++;
                    n < 7 && (r -= 7 - n)
                }
                return o.e = r, o.d = s, o
            }

            function Ee(e) { return T(e = new this(e), e.e + 1, this.rounding) }

            function Ae(e) { return (e = new this(e)).d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN }

            function Oe(e) { return new this(e).sin() }

            function Ce(e) { return new this(e).sinh() }

            function _e(e) { return new this(e).sqrt() }

            function Te(e, t) { return new this(e).sub(t) }

            function ze(e) { return new this(e).tan() }

            function qe(e) { return new this(e).tanh() }

            function Ie(e) { return T(e = new this(e), e.e + 1, 1) }(a = function e(t) {
                var r, n, i;

                function a(e) { var t, r, n, i = this; if (!(i instanceof a)) return new a(e); if (i.constructor = a, e instanceof a) return i.s = e.s, void(m ? !e.d || e.e > a.maxE ? (i.e = NaN, i.d = null) : e.e < a.minE ? (i.e = 0, i.d = [0]) : (i.e = e.e, i.d = e.d.slice()) : (i.e = e.e, i.d = e.d ? e.d.slice() : e.d)); if ("number" === (n = typeof e)) { if (0 === e) return i.s = 1 / e < 0 ? -1 : 1, i.e = 0, void(i.d = [0]); if (e < 0 ? (e = -e, i.s = -1) : i.s = 1, e === ~~e && e < 1e7) { for (t = 0, r = e; r >= 10; r /= 10) t++; return void(m ? t > a.maxE ? (i.e = NaN, i.d = null) : t < a.minE ? (i.e = 0, i.d = [0]) : (i.e = t, i.d = [e]) : (i.e = t, i.d = [e])) } return 0 * e != 0 ? (e || (i.s = NaN), i.e = NaN, void(i.d = null)) : H(i, e.toString()) } if ("string" !== n) throw Error(h + e); return 45 === (r = e.charCodeAt(0)) ? (e = e.slice(1), i.s = -1) : (43 === r && (e = e.slice(1)), i.s = 1), b.test(e) ? H(i, e) : $(i, e) }
                if (a.prototype = S, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.EUCLID = 9, a.config = a.set = se, a.clone = e, a.isDecimal = he, a.abs = Y, a.acos = X, a.acosh = Q, a.add = K, a.asin = ee, a.asinh = te, a.atan = re, a.atanh = ne, a.atan2 = ie, a.cbrt = ae, a.ceil = oe, a.cos = ue, a.cosh = ce, a.div = fe, a.exp = le, a.floor = pe, a.hypot = me, a.ln = de, a.log = ye, a.log10 = ve, a.log2 = ge, a.max = xe, a.min = be, a.mod = we, a.mul = Ne, a.pow = Me, a.random = Se, a.round = Ee, a.sign = Ae, a.sin = Oe, a.sinh = Ce, a.sqrt = _e, a.sub = Te, a.tan = ze, a.tanh = qe, a.trunc = Ie, void 0 === t && (t = {}), t && !0 !== t.defaults)
                    for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < i.length;) t.hasOwnProperty(n = i[r++]) || (t[n] = this[n]);
                return a.config(t), a
            }(p)).default = a.Decimal = a, f = new a(f), l = new a(l), void 0 === (n = function() { return a }.call(t, r, t, e)) || (e.exports = n)
        }()
    }, function(e, t, r) {
        "use strict";
        var n, i, a;
        i = [], void 0 === (a = "function" == typeof(n = function() {
            function e() { return !0 }

            function t() { return !1 }

            function r() {}
            return function n() {
                var i = [{ name: "number", test: function(e) { return "number" == typeof e } }, { name: "string", test: function(e) { return "string" == typeof e } }, { name: "boolean", test: function(e) { return "boolean" == typeof e } }, { name: "Function", test: function(e) { return "function" == typeof e } }, { name: "Array", test: Array.isArray }, { name: "Date", test: function(e) { return e instanceof Date } }, { name: "RegExp", test: function(e) { return e instanceof RegExp } }, { name: "Object", test: function(e) { return "object" == typeof e && null !== e && e.constructor === Object } }, { name: "null", test: function(e) { return null === e } }, { name: "undefined", test: function(e) { return void 0 === e } }],
                    a = { name: "any", test: e },
                    o = [],
                    s = [],
                    u = { types: i, conversions: s, ignore: o };

                function c(e) { var t = j(u.types, (function(t) { return t.name === e })); if (t) return t; if ("any" === e) return a; var r = j(u.types, (function(t) { return t.name.toLowerCase() === e.toLowerCase() })); throw new TypeError('Unknown type "' + e + '"' + (r ? '. Did you mean "' + r.name + '"?' : "")) }

                function f(e) { return e === a ? 999 : u.types.indexOf(e) }

                function l(e) { var t = j(u.types, (function(t) { return t.test(e) })); if (t) return t.name; throw new TypeError("Value has unknown type. Value: " + e) }

                function p(e) { return e.map((function(e) { var t = e.types.map(b); return (e.restParam ? "..." : "") + t.join("|") })).join(",") }

                function m(e, t) {
                    var r = 0 === e.indexOf("..."),
                        n = (r ? e.length > 3 ? e.slice(3) : "any" : e).split("|").map(q).filter(I).filter(z),
                        i = function(e, t) { var r = {}; return e.forEach((function(e) {-1 !== t.indexOf(e.from) || -1 === t.indexOf(e.to) || r[e.from] || (r[e.from] = e) })), Object.keys(r).map((function(e) { return r[e] })) }(t, n),
                        a = n.map((function(e) { var t = c(e); return { name: e, typeIndex: f(t), test: t.test, conversion: null, conversionIndex: -1 } })),
                        o = i.map((function(e) { var r = c(e.from); return { name: e.from, typeIndex: f(r), test: r.test, conversion: e, conversionIndex: t.indexOf(e) } }));
                    return { types: a.concat(o), restParam: r }
                }

                function h(e) { var t = D(e); return !!t && t.restParam }

                function d(e) { return e.types.some((function(e) { return null != e.conversion })) }

                function y(t) {
                    if (t && 0 !== t.types.length) {
                        if (1 === t.types.length) return c(t.types[0].name).test;
                        if (2 === t.types.length) {
                            var r = c(t.types[0].name).test,
                                n = c(t.types[1].name).test;
                            return function(e) { return r(e) || n(e) }
                        }
                        var i = t.types.map((function(e) { return c(e.name).test }));
                        return function(e) {
                            for (var t = 0; t < i.length; t++)
                                if (i[t](e)) return !0;
                            return !1
                        }
                    }
                    return e
                }

                function g(e) {
                    var t, r, n, i;
                    if (h(e)) {
                        var a = (t = (i = e, i.slice(0, i.length - 1)).map(y)).length,
                            o = y(D(e));
                        return function(e) {
                            for (var r = 0; r < t.length; r++)
                                if (!t[r](e[r])) return !1;
                            return function(e) {
                                for (var t = a; t < e.length; t++)
                                    if (!o(e[t])) return !1;
                                return !0
                            }(e) && e.length >= a + 1
                        }
                    }
                    return 0 === e.length ? function(e) { return 0 === e.length } : 1 === e.length ? (r = y(e[0]), function(e) { return r(e[0]) && 1 === e.length }) : 2 === e.length ? (r = y(e[0]), n = y(e[1]), function(e) { return r(e[0]) && n(e[1]) && 2 === e.length }) : (t = e.map(y), function(e) {
                        for (var r = 0; r < t.length; r++)
                            if (!t[r](e[r])) return !1;
                        return e.length === t.length
                    })
                }

                function v(e, t) { return t < e.params.length ? e.params[t] : h(e.params) ? D(e.params) : null }

                function x(e, t, r) { var n = v(e, t); return (n ? r ? n.types.filter(w) : n.types : []).map(b) }

                function b(e) { return e.name }

                function w(e) { return null === e.conversion || void 0 === e.conversion }

                function N(e, t) { var r = function(e) { for (var t = {}, r = 0; r < e.length; r++) t[e[r]] = !0; return Object.keys(t) }(U(e, (function(e) { return x(e, t, !1) }))); return -1 !== r.indexOf("any") ? ["any"] : r }

                function M(e, t, r) {
                    var n, i, a, o = e || "unnamed",
                        s = r;
                    for (a = 0; a < t.length; a++) { var u = s.filter((function(e) { var r = y(v(e, a)); return (a < e.params.length || h(e.params)) && r(t[a]) })); if (0 === u.length) { if ((i = N(s, a)).length > 0) { var c = l(t[a]); return (n = new TypeError("Unexpected type of argument in function " + o + " (expected: " + i.join(" or ") + ", actual: " + c + ", index: " + a + ")")).data = { category: "wrongType", fn: o, index: a, actual: c, expected: i }, n } } else s = u }
                    var f = s.map((function(e) { return h(e.params) ? 1 / 0 : e.params.length }));
                    if (t.length < Math.min.apply(null, f)) return i = N(s, a), (n = new TypeError("Too few arguments in function " + o + " (expected: " + i.join(" or ") + ", index: " + t.length + ")")).data = { category: "tooFewArgs", fn: o, index: t.length, expected: i }, n;
                    var p = Math.max.apply(null, f);
                    return t.length > p ? ((n = new TypeError("Too many arguments in function " + o + " (expected: " + p + ", actual: " + t.length + ")")).data = { category: "tooManyArgs", fn: o, index: t.length, expectedLength: p }, n) : ((n = new TypeError('Arguments of type "' + t.join(", ") + '" do not match any of the defined signatures of function ' + o + ".")).data = { category: "mismatch", actual: t.map(l) }, n)
                }

                function S(e) { for (var t = 999, r = 0; r < e.types.length; r++) w(e.types[r]) && (t = Math.min(t, e.types[r].typeIndex)); return t }

                function E(e) { for (var t = 999, r = 0; r < e.types.length; r++) w(e.types[r]) || (t = Math.min(t, e.types[r].conversionIndex)); return t }

                function A(e, t) { var r; return 0 != (r = e.restParam - t.restParam) || 0 != (r = d(e) - d(t)) || 0 != (r = S(e) - S(t)) ? r : E(e) - E(t) }

                function O(e, t) {
                    var r, n, i = Math.min(e.params.length, t.params.length);
                    if (0 != (n = e.params.some(d) - t.params.some(d))) return n;
                    for (r = 0; r < i; r++)
                        if (0 != (n = d(e.params[r]) - d(t.params[r]))) return n;
                    for (r = 0; r < i; r++)
                        if (0 !== (n = A(e.params[r], t.params[r]))) return n;
                    return e.params.length - t.params.length
                }

                function C(e) {
                    var t, r, n, i, a = [],
                        o = [];
                    switch (e.types.forEach((function(e) { e.conversion && (a.push(c(e.conversion.from).test), o.push(e.conversion.convert)) })), o.length) {
                        case 0:
                            return function(e) { return e };
                        case 1:
                            return t = a[0], n = o[0],
                                function(e) { return t(e) ? n(e) : e };
                        case 2:
                            return t = a[0], r = a[1], n = o[0], i = o[1],
                                function(e) { return t(e) ? n(e) : r(e) ? i(e) : e };
                        default:
                            return function(e) {
                                for (var t = 0; t < o.length; t++)
                                    if (a[t](e)) return o[t](e);
                                return e
                            }
                    }
                }

                function _(e, t) {
                    return function e(r, n, i) {
                        if (n < r.length) {
                            var a, o = r[n],
                                s = t ? o.types.filter(w) : o.types;
                            if (o.restParam) {
                                var u = s.filter(w);
                                a = u.length < s.length ? [u, s] : [s]
                            } else a = s.map((function(e) { return [e] }));
                            return U(a, (function(t) { return e(r, n + 1, i.concat([t])) }))
                        }
                        return [i.map((function(e, t) { return { types: e, restParam: t === r.length - 1 && h(r) } }))]
                    }(e, 0, [])
                }

                function T(e, n) {
                    if (0 === Object.keys(n).length) throw new SyntaxError("No signatures provided");
                    var i = [];
                    Object.keys(n).map((function(e) { return function(e, t, r) { var n = []; return "" !== e.trim() && (n = e.split(",").map(q).map((function(e, t, n) { var i = m(e, r); if (i.restParam && t !== n.length - 1) throw new SyntaxError('Unexpected rest parameter "' + e + '": only allowed for the last parameter'); return i }))), n.some(k) ? null : { params: n, fn: t } }(e, n[e], u.conversions) })).filter(B).forEach((function(e) {
                        var t = j(i, (function(t) {
                            return function(e, t) {
                                for (var r = Math.max(e.params.length, t.params.length), n = 0; n < r; n++)
                                    if (!P(x(e, n, !0), x(t, n, !0))) return !1;
                                var i = e.params.length,
                                    a = t.params.length,
                                    o = h(e.params),
                                    s = h(t.params);
                                return o ? s ? i === a : a >= i : s ? i >= a : i === a
                            }(t, e)
                        }));
                        if (t) throw new TypeError('Conflicting signatures "' + p(t.params) + '" and "' + p(e.params) + '".');
                        i.push(e)
                    }));
                    var a = U(i, (function(e) { return (e ? _(e.params, !1) : []).map((function(t) { return { params: t, fn: e.fn } })) })).filter(B);
                    a.sort(O);
                    var o = a[0] && a[0].params.length <= 2 && !h(a[0].params),
                        s = a[1] && a[1].params.length <= 2 && !h(a[1].params),
                        c = a[2] && a[2].params.length <= 2 && !h(a[2].params),
                        f = a[3] && a[3].params.length <= 2 && !h(a[3].params),
                        l = a[4] && a[4].params.length <= 2 && !h(a[4].params),
                        v = a[5] && a[5].params.length <= 2 && !h(a[5].params),
                        b = o && s && c && f && l && v,
                        w = a.map((function(e) { return g(e.params) })),
                        N = o ? y(a[0].params[0]) : t,
                        S = s ? y(a[1].params[0]) : t,
                        E = c ? y(a[2].params[0]) : t,
                        A = f ? y(a[3].params[0]) : t,
                        T = l ? y(a[4].params[0]) : t,
                        z = v ? y(a[5].params[0]) : t,
                        I = o ? y(a[0].params[1]) : t,
                        D = s ? y(a[1].params[1]) : t,
                        F = c ? y(a[2].params[1]) : t,
                        L = f ? y(a[3].params[1]) : t,
                        H = l ? y(a[4].params[1]) : t,
                        $ = v ? y(a[5].params[1]) : t,
                        G = a.map((function(e) {
                            return function(e, t) {
                                var r = t;
                                if (e.some(d)) {
                                    var n = h(e),
                                        i = e.map(C);
                                    r = function() { for (var e = [], r = n ? arguments.length - 1 : arguments.length, a = 0; a < r; a++) e[a] = i[a](arguments[a]); return n && (e[r] = arguments[r].map(i[r])), t.apply(this, e) }
                                }
                                var a = r;
                                if (h(e)) {
                                    var o = e.length - 1;
                                    a = function() { return r.apply(this, R(arguments, 0, o).concat([R(arguments, o)])) }
                                }
                                return a
                            }(e.params, e.fn)
                        })),
                        V = o ? G[0] : r,
                        Z = s ? G[1] : r,
                        W = c ? G[2] : r,
                        J = f ? G[3] : r,
                        Y = l ? G[4] : r,
                        X = v ? G[5] : r,
                        Q = o ? a[0].params.length : -1,
                        K = s ? a[1].params.length : -1,
                        ee = c ? a[2].params.length : -1,
                        te = f ? a[3].params.length : -1,
                        re = l ? a[4].params.length : -1,
                        ne = v ? a[5].params.length : -1,
                        ie = b ? 6 : 0,
                        ae = a.length,
                        oe = function() {
                            for (var t = ie; t < ae; t++)
                                if (w[t](arguments)) return G[t].apply(this, arguments);
                            throw M(e, arguments, a)
                        },
                        se = function e(t, r) { return arguments.length === Q && N(t) && I(r) ? V.apply(e, arguments) : arguments.length === K && S(t) && D(r) ? Z.apply(e, arguments) : arguments.length === ee && E(t) && F(r) ? W.apply(e, arguments) : arguments.length === te && A(t) && L(r) ? J.apply(e, arguments) : arguments.length === re && T(t) && H(r) ? Y.apply(e, arguments) : arguments.length === ne && z(t) && $(r) ? X.apply(e, arguments) : oe.apply(e, arguments) };
                    try { Object.defineProperty(se, "name", { value: e }) } catch (e) {}
                    return se.signatures = function(e) { var t = {}; return e.forEach((function(e) { e.params.some(d) || _(e.params, !0).forEach((function(r) { t[p(r)] = e.fn })) })), t }(a), se
                }

                function z(e) { return -1 === u.ignore.indexOf(e) }

                function q(e) { return e.trim() }

                function I(e) { return !!e }

                function B(e) { return null !== e }

                function k(e) { return 0 === e.types.length }

                function D(e) { return e[e.length - 1] }

                function R(e, t, r) { return Array.prototype.slice.call(e, t, r) }

                function P(e, t) {
                    for (var r = 0; r < e.length; r++)
                        if (n = t, i = e[r], -1 !== n.indexOf(i)) return !0;
                    var n, i;
                    return !1
                }

                function j(e, t) {
                    for (var r = 0; r < e.length; r++)
                        if (t(e[r])) return e[r]
                }

                function U(e, t) { return Array.prototype.concat.apply([], e.map(t)) }

                function F(e) {
                    for (var t = "", r = 0; r < e.length; r++) {
                        var n = e[r];
                        if (("object" == typeof n.signatures || "string" == typeof n.signature) && "" !== n.name)
                            if ("" === t) t = n.name;
                            else if (t !== n.name) { var i = new Error("Function names do not match (expected: " + t + ", actual: " + n.name + ")"); throw i.data = { actual: n.name, expected: t }, i }
                    }
                    return t
                }

                function L(e) {
                    var t, r = {};

                    function n(e, n) { if (r.hasOwnProperty(e) && n !== r[e]) throw (t = new Error('Signature "' + e + '" is defined twice')).data = { signature: e }, t }
                    for (var i = 0; i < e.length; i++) {
                        var a = e[i];
                        if ("object" == typeof a.signatures)
                            for (var o in a.signatures) a.signatures.hasOwnProperty(o) && (n(o, a.signatures[o]), r[o] = a.signatures[o]);
                        else {
                            if ("string" != typeof a.signature) throw (t = new TypeError("Function is no typed-function (index: " + i + ")")).data = { index: i }, t;
                            n(a.signature, a), r[a.signature] = a
                        }
                    }
                    return r
                }
                return (u = T("typed", { "string, Object": T, Object: function(e) { var t = []; for (var r in e) e.hasOwnProperty(r) && t.push(e[r]); return T(F(t), e) }, "...Function": function(e) { return T(F(e), L(e)) }, "string, ...Function": function(e, t) { return T(e, L(t)) } })).create = n, u.types = i, u.conversions = s, u.ignore = o, u.convert = function(e, t) { var r = l(e); if (t === r) return e; for (var n = 0; n < u.conversions.length; n++) { var i = u.conversions[n]; if (i.from === r && i.to === t) return i.convert(e) } throw new Error("Cannot convert from " + r + " to " + t) }, u.find = function(e, t) {
                    if (!e.signatures) throw new TypeError("Function is no typed-function");
                    var r;
                    if ("string" == typeof t) { r = t.split(","); for (var n = 0; n < r.length; n++) r[n] = r[n].trim() } else {
                        if (!Array.isArray(t)) throw new TypeError("String array or a comma separated string expected");
                        r = t
                    }
                    var i = r.join(","),
                        a = e.signatures[i];
                    if (a) return a;
                    throw new TypeError("Signature not found (signature: " + (e.name || "unnamed") + "(" + r.join(", ") + "))")
                }, u.addType = function(e, t) {
                    if (!e || "string" != typeof e.name || "function" != typeof e.test) throw new TypeError("Object with properties {name: string, test: function} expected");
                    if (!1 !== t)
                        for (var r = 0; r < u.types.length; r++)
                            if ("Object" === u.types[r].name) return void u.types.splice(r, 0, e);
                    u.types.push(e)
                }, u.addConversion = function(e) {
                    if (!e || "string" != typeof e.from || "string" != typeof e.to || "function" != typeof e.convert) throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
                    u.conversions.push(e)
                }, u
            }()
        }) ? n.apply(t, i) : n) || (e.exports = a)
    }, function(e, t, r) {
        var n = r(12),
            i = r(13),
            a = r(14),
            o = r(15),
            s = r(16),
            u = r(17),
            c = r(18);
        c.alea = n, c.xor128 = i, c.xorwow = a, c.xorshift7 = o, c.xor4096 = s, c.tychei = u, e.exports = c
    }, function(e, t) {
        function r() {}
        r.prototype = {
            on: function(e, t, r) { var n = this.e || (this.e = {}); return (n[e] || (n[e] = [])).push({ fn: t, ctx: r }), this },
            once: function(e, t, r) {
                var n = this;

                function i() { n.off(e, i), t.apply(r, arguments) }
                return i._ = t, this.on(e, i, r)
            },
            emit: function(e) { for (var t = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, i = r.length; n < i; n++) r[n].fn.apply(r[n].ctx, t); return this },
            off: function(e, t) {
                var r = this.e || (this.e = {}),
                    n = r[e],
                    i = [];
                if (n && t)
                    for (var a = 0, o = n.length; a < o; a++) n[a].fn !== t && n[a].fn._ !== t && i.push(n[a]);
                return i.length ? r[e] = i : delete r[e], this
            }
        }, e.exports = r, e.exports.TinyEmitter = r
    }, function(e, t, r) {
        "use strict";
        var n = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var r = arguments[t]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]) } return e },
            i = { "{": "\\{", "}": "\\}", "\\": "\\textbackslash{}", "#": "\\#", $: "\\$", "%": "\\%", "&": "\\&", "^": "\\textasciicircum{}", _: "\\_", "~": "\\textasciitilde{}" },
            a = { "–": "\\--", "—": "\\---", " ": "~", "\t": "\\qquad{}", "\r\n": "\\newline{}", "\n": "\\newline{}" },
            o = function(e, t) { return n({}, e, t) };
        e.exports = function(e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = t.preserveFormatting, s = void 0 !== r && r, u = t.escapeMapFn, c = void 0 === u ? o : u, f = String(e), l = "", p = c(n({}, i), s ? n({}, a) : {}), m = Object.keys(p), h = function() {
                    var e = !1;
                    m.forEach((function(t, r) { e || f.length >= t.length && f.slice(0, t.length) === t && (l += p[m[r]], f = f.slice(t.length, f.length), e = !0) })), e || (l += f.slice(0, 1), f = f.slice(1, f.length))
                }; f;) h();
            return l
        }
    }, function(e, t, r) {
        (function(e) {
            var n;
            ! function(e, i, a) {
                function o(e) {
                    var t, r = this,
                        n = (t = 4022871197, function(e) {
                            e = String(e);
                            for (var r = 0; r < e.length; r++) {
                                var n = .02519603282416938 * (t += e.charCodeAt(r));
                                n -= t = n >>> 0, t = (n *= t) >>> 0, t += 4294967296 * (n -= t)
                            }
                            return 2.3283064365386963e-10 * (t >>> 0)
                        });
                    r.next = function() { var e = 2091639 * r.s0 + 2.3283064365386963e-10 * r.c; return r.s0 = r.s1, r.s1 = r.s2, r.s2 = e - (r.c = 0 | e) }, r.c = 1, r.s0 = n(" "), r.s1 = n(" "), r.s2 = n(" "), r.s0 -= n(e), r.s0 < 0 && (r.s0 += 1), r.s1 -= n(e), r.s1 < 0 && (r.s1 += 1), r.s2 -= n(e), r.s2 < 0 && (r.s2 += 1), n = null
                }

                function s(e, t) { return t.c = e.c, t.s0 = e.s0, t.s1 = e.s1, t.s2 = e.s2, t }

                function u(e, t) {
                    var r = new o(e),
                        n = t && t.state,
                        i = r.next;
                    return i.int32 = function() { return 4294967296 * r.next() | 0 }, i.double = function() { return i() + 11102230246251565e-32 * (2097152 * i() | 0) }, i.quick = i, n && ("object" == typeof n && s(n, r), i.state = function() { return s(r, {}) }), i
                }
                i && i.exports ? i.exports = u : r(2) && r(6) ? void 0 === (n = function() { return u }.call(t, r, t, i)) || (i.exports = n) : this.alea = u
            }(0, e, r(2))
        }).call(this, r(5)(e))
    }, function(e, t, r) {
        (function(e) {
            var n;
            ! function(e, i, a) {
                function o(e) {
                    var t = this,
                        r = "";
                    t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.next = function() { var e = t.x ^ t.x << 11; return t.x = t.y, t.y = t.z, t.z = t.w, t.w ^= t.w >>> 19 ^ e ^ e >>> 8 }, e === (0 | e) ? t.x = e : r += e;
                    for (var n = 0; n < r.length + 64; n++) t.x ^= 0 | r.charCodeAt(n), t.next()
                }

                function s(e, t) { return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t }

                function u(e, t) {
                    var r = new o(e),
                        n = t && t.state,
                        i = function() { return (r.next() >>> 0) / 4294967296 };
                    return i.double = function() { do { var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21) } while (0 === e); return e }, i.int32 = r.next, i.quick = i, n && ("object" == typeof n && s(n, r), i.state = function() { return s(r, {}) }), i
                }
                i && i.exports ? i.exports = u : r(2) && r(6) ? void 0 === (n = function() { return u }.call(t, r, t, i)) || (i.exports = n) : this.xor128 = u
            }(0, e, r(2))
        }).call(this, r(5)(e))
    }, function(e, t, r) {
        (function(e) {
            var n;
            ! function(e, i, a) {
                function o(e) {
                    var t = this,
                        r = "";
                    t.next = function() { var e = t.x ^ t.x >>> 2; return t.x = t.y, t.y = t.z, t.z = t.w, t.w = t.v, (t.d = t.d + 362437 | 0) + (t.v = t.v ^ t.v << 4 ^ e ^ e << 1) | 0 }, t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.v = 0, e === (0 | e) ? t.x = e : r += e;
                    for (var n = 0; n < r.length + 64; n++) t.x ^= 0 | r.charCodeAt(n), n == r.length && (t.d = t.x << 10 ^ t.x >>> 4), t.next()
                }

                function s(e, t) { return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t.v = e.v, t.d = e.d, t }

                function u(e, t) {
                    var r = new o(e),
                        n = t && t.state,
                        i = function() { return (r.next() >>> 0) / 4294967296 };
                    return i.double = function() { do { var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21) } while (0 === e); return e }, i.int32 = r.next, i.quick = i, n && ("object" == typeof n && s(n, r), i.state = function() { return s(r, {}) }), i
                }
                i && i.exports ? i.exports = u : r(2) && r(6) ? void 0 === (n = function() { return u }.call(t, r, t, i)) || (i.exports = n) : this.xorwow = u
            }(0, e, r(2))
        }).call(this, r(5)(e))
    }, function(e, t, r) {
        (function(e) {
            var n;
            ! function(e, i, a) {
                function o(e) {
                    var t = this;
                    t.next = function() {
                            var e, r, n = t.x,
                                i = t.i;
                            return e = n[i], r = (e ^= e >>> 7) ^ e << 24, r ^= (e = n[i + 1 & 7]) ^ e >>> 10, r ^= (e = n[i + 3 & 7]) ^ e >>> 3, r ^= (e = n[i + 4 & 7]) ^ e << 7, e = n[i + 7 & 7], r ^= (e ^= e << 13) ^ e << 9, n[i] = r, t.i = i + 1 & 7, r
                        },
                        function(e, t) {
                            var r, n = [];
                            if (t === (0 | t)) n[0] = t;
                            else
                                for (t = "" + t, r = 0; r < t.length; ++r) n[7 & r] = n[7 & r] << 15 ^ t.charCodeAt(r) + n[r + 1 & 7] << 13;
                            for (; n.length < 8;) n.push(0);
                            for (r = 0; r < 8 && 0 === n[r]; ++r);
                            for (8 == r ? n[7] = -1 : n[r], e.x = n, e.i = 0, r = 256; r > 0; --r) e.next()
                        }(t, e)
                }

                function s(e, t) { return t.x = e.x.slice(), t.i = e.i, t }

                function u(e, t) {
                    null == e && (e = +new Date);
                    var r = new o(e),
                        n = t && t.state,
                        i = function() { return (r.next() >>> 0) / 4294967296 };
                    return i.double = function() { do { var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21) } while (0 === e); return e }, i.int32 = r.next, i.quick = i, n && (n.x && s(n, r), i.state = function() { return s(r, {}) }), i
                }
                i && i.exports ? i.exports = u : r(2) && r(6) ? void 0 === (n = function() { return u }.call(t, r, t, i)) || (i.exports = n) : this.xorshift7 = u
            }(0, e, r(2))
        }).call(this, r(5)(e))
    }, function(e, t, r) {
        (function(e) {
            var n;
            ! function(e, i, a) {
                function o(e) {
                    var t = this;
                    t.next = function() {
                            var e, r, n = t.w,
                                i = t.X,
                                a = t.i;
                            return t.w = n = n + 1640531527 | 0, r = i[a + 34 & 127], e = i[a = a + 1 & 127], r ^= r << 13, e ^= e << 17, r ^= r >>> 15, e ^= e >>> 12, r = i[a] = r ^ e, t.i = a, r + (n ^ n >>> 16) | 0
                        },
                        function(e, t) {
                            var r, n, i, a, o, s = [],
                                u = 128;
                            for (t === (0 | t) ? (n = t, t = null) : (t += "\0", n = 0, u = Math.max(u, t.length)), i = 0, a = -32; a < u; ++a) t && (n ^= t.charCodeAt((a + 32) % t.length)), 0 === a && (o = n), n ^= n << 10, n ^= n >>> 15, n ^= n << 4, n ^= n >>> 13, a >= 0 && (o = o + 1640531527 | 0, i = 0 == (r = s[127 & a] ^= n + o) ? i + 1 : 0);
                            for (i >= 128 && (s[127 & (t && t.length || 0)] = -1), i = 127, a = 512; a > 0; --a) n = s[i + 34 & 127], r = s[i = i + 1 & 127], n ^= n << 13, r ^= r << 17, n ^= n >>> 15, r ^= r >>> 12, s[i] = n ^ r;
                            e.w = o, e.X = s, e.i = i
                        }(t, e)
                }

                function s(e, t) { return t.i = e.i, t.w = e.w, t.X = e.X.slice(), t }

                function u(e, t) {
                    null == e && (e = +new Date);
                    var r = new o(e),
                        n = t && t.state,
                        i = function() { return (r.next() >>> 0) / 4294967296 };
                    return i.double = function() { do { var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21) } while (0 === e); return e }, i.int32 = r.next, i.quick = i, n && (n.X && s(n, r), i.state = function() { return s(r, {}) }), i
                }
                i && i.exports ? i.exports = u : r(2) && r(6) ? void 0 === (n = function() { return u }.call(t, r, t, i)) || (i.exports = n) : this.xor4096 = u
            }(0, e, r(2))
        }).call(this, r(5)(e))
    }, function(e, t, r) {
        (function(e) {
            var n;
            ! function(e, i, a) {
                function o(e) {
                    var t = this,
                        r = "";
                    t.next = function() {
                        var e = t.b,
                            r = t.c,
                            n = t.d,
                            i = t.a;
                        return e = e << 25 ^ e >>> 7 ^ r, r = r - n | 0, n = n << 24 ^ n >>> 8 ^ i, i = i - e | 0, t.b = e = e << 20 ^ e >>> 12 ^ r, t.c = r = r - n | 0, t.d = n << 16 ^ r >>> 16 ^ i, t.a = i - e | 0
                    }, t.a = 0, t.b = 0, t.c = -1640531527, t.d = 1367130551, e === Math.floor(e) ? (t.a = e / 4294967296 | 0, t.b = 0 | e) : r += e;
                    for (var n = 0; n < r.length + 20; n++) t.b ^= 0 | r.charCodeAt(n), t.next()
                }

                function s(e, t) { return t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t }

                function u(e, t) {
                    var r = new o(e),
                        n = t && t.state,
                        i = function() { return (r.next() >>> 0) / 4294967296 };
                    return i.double = function() { do { var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21) } while (0 === e); return e }, i.int32 = r.next, i.quick = i, n && ("object" == typeof n && s(n, r), i.state = function() { return s(r, {}) }), i
                }
                i && i.exports ? i.exports = u : r(2) && r(6) ? void 0 === (n = function() { return u }.call(t, r, t, i)) || (i.exports = n) : this.tychei = u
            }(0, e, r(2))
        }).call(this, r(5)(e))
    }, function(e, t, r) {
        var n;
        ! function(i, a, o) {
            var s, u = o.pow(256, 6),
                c = o.pow(2, 52),
                f = 2 * c;

            function l(e, t, r) {
                var n = [],
                    l = h(function e(t, r) {
                        var n, i = [],
                            a = typeof t;
                        if (r && "object" == a)
                            for (n in t) try { i.push(e(t[n], r - 1)) } catch (e) {}
                        return i.length ? i : "string" == a ? t : t + "\0"
                    }((t = 1 == t ? { entropy: !0 } : t || {}).entropy ? [e, d(a)] : null == e ? function() {
                        try { var e; return s && (e = s.randomBytes) ? e = e(256) : (e = new Uint8Array(256), (i.crypto || i.msCrypto).getRandomValues(e)), d(e) } catch (e) {
                            var t = i.navigator,
                                r = t && t.plugins;
                            return [+new Date, i, r, i.screen, d(a)]
                        }
                    }() : e, 3), n),
                    y = new p(n),
                    g = function() { for (var e = y.g(6), t = u, r = 0; e < c;) e = 256 * (e + r), t *= 256, r = y.g(1); for (; e >= f;) e /= 2, t /= 2, r >>>= 1; return (e + r) / t };
                return g.int32 = function() { return 0 | y.g(4) }, g.quick = function() { return y.g(4) / 4294967296 }, g.double = g, h(d(y.S), a), (t.pass || r || function(e, t, r, n) { return n && (n.S && m(n, y), e.state = function() { return m(y, {}) }), r ? (o.random = e, t) : e })(g, l, "global" in t ? t.global : this == o, t.state)
            }

            function p(e) {
                var t, r = e.length,
                    n = this,
                    i = 0,
                    a = n.i = n.j = 0,
                    o = n.S = [];
                for (r || (e = [r++]); i < 256;) o[i] = i++;
                for (i = 0; i < 256; i++) o[i] = o[a = 255 & a + e[i % r] + (t = o[i])], o[a] = t;
                (n.g = function(e) { for (var t, r = 0, i = n.i, a = n.j, o = n.S; e--;) t = o[i = 255 & i + 1], r = 256 * r + o[255 & (o[i] = o[a = 255 & a + t]) + (o[a] = t)]; return n.i = i, n.j = a, r })(256)
            }

            function m(e, t) { return t.i = e.i, t.j = e.j, t.S = e.S.slice(), t }

            function h(e, t) { for (var r, n = e + "", i = 0; i < n.length;) t[255 & i] = 255 & (r ^= 19 * t[255 & i]) + n.charCodeAt(i++); return d(t) }

            function d(e) { return String.fromCharCode.apply(0, e) }
            if (h(o.random(), a), e.exports) { e.exports = l; try { s = r(19) } catch (e) {} } else void 0 === (n = function() { return l }.call(t, r, t, e)) || (e.exports = n)
        }("undefined" != typeof self ? self : this, [], Math)
    }, function(e, t) {}, function(e, t, r) {
        "use strict";
        r.r(t);
        var n = {};

        function i(e) { return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function a(e) { return "number" == typeof e }

        function o(e) { return e && !0 === e.constructor.prototype.isBigNumber || !1 }

        function s(e) { return e && "object" === i(e) && !0 === Object.getPrototypeOf(e).isComplex || !1 }

        function u(e) { return e && "object" === i(e) && !0 === Object.getPrototypeOf(e).isFraction || !1 }

        function c(e) { return e && !0 === e.constructor.prototype.isUnit || !1 }

        function f(e) { return "string" == typeof e }
        r.r(n), r.d(n, "createTyped", (function() { return nt })), r.d(n, "createResultSet", (function() { return st })), r.d(n, "createBigNumberClass", (function() { return ft })), r.d(n, "createComplexClass", (function() { return ht })), r.d(n, "createFractionClass", (function() { return gt })), r.d(n, "createRangeClass", (function() { return vt })), r.d(n, "createMatrixClass", (function() { return xt })), r.d(n, "createDenseMatrixClass", (function() { return bt })), r.d(n, "createClone", (function() { return wt })), r.d(n, "createIsInteger", (function() { return Ct })), r.d(n, "createIsNegative", (function() { return It })), r.d(n, "createIsNumeric", (function() { return Bt })), r.d(n, "createHasNumericValue", (function() { return kt })), r.d(n, "createIsPositive", (function() { return Dt })), r.d(n, "createIsZero", (function() { return Rt })), r.d(n, "createIsNaN", (function() { return Pt })), r.d(n, "createTypeOf", (function() { return jt })), r.d(n, "createEqualScalar", (function() { return Ft })), r.d(n, "createSparseMatrixClass", (function() { return Lt })), r.d(n, "createNumber", (function() { return Ht })), r.d(n, "createString", (function() { return $t })), r.d(n, "createBoolean", (function() { return Gt })), r.d(n, "createBignumber", (function() { return Vt })), r.d(n, "createComplex", (function() { return Zt })), r.d(n, "createFraction", (function() { return Wt })), r.d(n, "createMatrix", (function() { return Jt })), r.d(n, "createSplitUnit", (function() { return Yt })), r.d(n, "createUnaryMinus", (function() { return br })), r.d(n, "createUnaryPlus", (function() { return wr })), r.d(n, "createAbs", (function() { return Nr })), r.d(n, "createApply", (function() { return Mr })), r.d(n, "createAddScalar", (function() { return Er })), r.d(n, "createCbrt", (function() { return Ar })), r.d(n, "createCeil", (function() { return zr })), r.d(n, "createCube", (function() { return qr })), r.d(n, "createExp", (function() { return Ir })), r.d(n, "createExpm1", (function() { return Br })), r.d(n, "createFix", (function() { return kr })), r.d(n, "createFloor", (function() { return Pr })), r.d(n, "createGcd", (function() { return Hr })), r.d(n, "createLcm", (function() { return Vr })), r.d(n, "createLog10", (function() { return Zr })), r.d(n, "createLog2", (function() { return Wr })), r.d(n, "createMod", (function() { return Qr })), r.d(n, "createMultiplyScalar", (function() { return Kr })), r.d(n, "createMultiply", (function() { return en })), r.d(n, "createNthRoot", (function() { return tn })), r.d(n, "createSign", (function() { return rn })), r.d(n, "createSqrt", (function() { return nn })), r.d(n, "createSquare", (function() { return an })), r.d(n, "createSubtract", (function() { return on })), r.d(n, "createXgcd", (function() { return un })), r.d(n, "createDotMultiply", (function() { return fn })), r.d(n, "createBitAnd", (function() { return On })), r.d(n, "createBitNot", (function() { return Cn })), r.d(n, "createBitOr", (function() { return _n })), r.d(n, "createBitXor", (function() { return zn })), r.d(n, "createArg", (function() { return qn })), r.d(n, "createConj", (function() { return In })), r.d(n, "createIm", (function() { return Bn })), r.d(n, "createRe", (function() { return kn })), r.d(n, "createNot", (function() { return Un })), r.d(n, "createOr", (function() { return Fn })), r.d(n, "createXor", (function() { return Ln })), r.d(n, "createConcat", (function() { return Hn })), r.d(n, "createColumn", (function() { return Gn })), r.d(n, "createCount", (function() { return Vn })), r.d(n, "createCross", (function() { return Zn })), r.d(n, "createDiag", (function() { return Wn })), r.d(n, "createFilter", (function() { return Kn })), r.d(n, "createFlatten", (function() { return ti })), r.d(n, "createForEach", (function() { return ri })), r.d(n, "createGetMatrixDataType", (function() { return ii })), r.d(n, "createIdentity", (function() { return ai })), r.d(n, "createKron", (function() { return oi })), r.d(n, "createMap", (function() { return si })), r.d(n, "createDiff", (function() { return ci })), r.d(n, "createOnes", (function() { return fi })), r.d(n, "createRange", (function() { return hi })), r.d(n, "createReshape", (function() { return di })), r.d(n, "createResize", (function() { return gi })), r.d(n, "createRotate", (function() { return vi })), r.d(n, "createRotationMatrix", (function() { return xi })), r.d(n, "createRow", (function() { return bi })), r.d(n, "createSize", (function() { return wi })), r.d(n, "createSqueeze", (function() { return Ni })), r.d(n, "createSubset", (function() { return zi })), r.d(n, "createTranspose", (function() { return Di })), r.d(n, "createCtranspose", (function() { return Ri })), r.d(n, "createZeros", (function() { return Pi })), r.d(n, "createErf", (function() { return ji })), r.d(n, "createMode", (function() { return Gi })), r.d(n, "createProd", (function() { return Zi })), r.d(n, "createFormat", (function() { return Wi })), r.d(n, "createBin", (function() { return Ji })), r.d(n, "createOct", (function() { return Yi })), r.d(n, "createHex", (function() { return Xi })), r.d(n, "createPrint", (function() { return Qi })), r.d(n, "createTo", (function() { return ea })), r.d(n, "createIsPrime", (function() { return ta })), r.d(n, "createNumeric", (function() { return ra })), r.d(n, "createDivideScalar", (function() { return na })), r.d(n, "createPow", (function() { return ia })), r.d(n, "createRound", (function() { return ca })), r.d(n, "createLog", (function() { return la })), r.d(n, "createLog1p", (function() { return pa })), r.d(n, "createNthRoots", (function() { return ma })), r.d(n, "createDotPow", (function() { return ha })), r.d(n, "createDotDivide", (function() { return da })), r.d(n, "createLsolve", (function() { return ga })), r.d(n, "createUsolve", (function() { return va })), r.d(n, "createLsolveAll", (function() { return wa })), r.d(n, "createUsolveAll", (function() { return Sa })), r.d(n, "createLeftShift", (function() { return Aa })), r.d(n, "createRightArithShift", (function() { return Oa })), r.d(n, "createRightLogShift", (function() { return Ca })), r.d(n, "createAnd", (function() { return _a })), r.d(n, "createCompare", (function() { return Ta })), r.d(n, "createCompareNatural", (function() { return Ia })), r.d(n, "createCompareText", (function() { return Ba })), r.d(n, "createEqual", (function() { return ka })), r.d(n, "createEqualText", (function() { return Da })), r.d(n, "createSmaller", (function() { return Ra })), r.d(n, "createSmallerEq", (function() { return Pa })), r.d(n, "createLarger", (function() { return ja })), r.d(n, "createLargerEq", (function() { return Ua })), r.d(n, "createDeepEqual", (function() { return Fa })), r.d(n, "createUnequal", (function() { return La })), r.d(n, "createPartitionSelect", (function() { return Ha })), r.d(n, "createSort", (function() { return $a })), r.d(n, "createMax", (function() { return Ga })), r.d(n, "createMin", (function() { return Va })), r.d(n, "createImmutableDenseMatrixClass", (function() { return Za })), r.d(n, "createIndexClass", (function() { return Wa })), r.d(n, "createFibonacciHeapClass", (function() { return Ja })), r.d(n, "createSpaClass", (function() { return Ya })), r.d(n, "createUnitClass", (function() { return so })), r.d(n, "createUnitFunction", (function() { return uo })), r.d(n, "createSparse", (function() { return co })), r.d(n, "createCreateUnit", (function() { return fo })), r.d(n, "createAcos", (function() { return lo })), r.d(n, "createAcosh", (function() { return _o })), r.d(n, "createAcot", (function() { return To })), r.d(n, "createAcoth", (function() { return zo })), r.d(n, "createAcsc", (function() { return qo })), r.d(n, "createAcsch", (function() { return Io })), r.d(n, "createAsec", (function() { return Bo })), r.d(n, "createAsech", (function() { return ko })), r.d(n, "createAsin", (function() { return Do })), r.d(n, "createAsinh", (function() { return Ro })), r.d(n, "createAtan", (function() { return Po })), r.d(n, "createAtan2", (function() { return jo })), r.d(n, "createAtanh", (function() { return Uo })), r.d(n, "createCos", (function() { return Fo })), r.d(n, "createCosh", (function() { return Lo })), r.d(n, "createCot", (function() { return Ho })), r.d(n, "createCoth", (function() { return $o })), r.d(n, "createCsc", (function() { return Go })), r.d(n, "createCsch", (function() { return Vo })), r.d(n, "createSec", (function() { return Zo })), r.d(n, "createSech", (function() { return Wo })), r.d(n, "createSin", (function() { return Jo })), r.d(n, "createSinh", (function() { return Yo })), r.d(n, "createTan", (function() { return Xo })), r.d(n, "createTanh", (function() { return Qo })), r.d(n, "createSetCartesian", (function() { return Ko })), r.d(n, "createSetDifference", (function() { return es })), r.d(n, "createSetDistinct", (function() { return ts })), r.d(n, "createSetIntersect", (function() { return rs })), r.d(n, "createSetIsSubset", (function() { return ns })), r.d(n, "createSetMultiplicity", (function() { return is })), r.d(n, "createSetPowerset", (function() { return as })), r.d(n, "createSetSize", (function() { return os })), r.d(n, "createSetSymDifference", (function() { return ss })), r.d(n, "createSetUnion", (function() { return us })), r.d(n, "createAdd", (function() { return cs })), r.d(n, "createHypot", (function() { return fs })), r.d(n, "createNorm", (function() { return ls })), r.d(n, "createDot", (function() { return ps })), r.d(n, "createTrace", (function() { return ms })), r.d(n, "createIndex", (function() { return hs })), r.d(n, "createNode", (function() { return gs })), r.d(n, "createAccessorNode", (function() { return ws })), r.d(n, "createArrayNode", (function() { return Ns })), r.d(n, "createAssignmentNode", (function() { return Cs })), r.d(n, "createBlockNode", (function() { return _s })), r.d(n, "createConditionalNode", (function() { return Ts })), r.d(n, "createConstantNode", (function() { return js })), r.d(n, "createFunctionAssignmentNode", (function() { return Us })), r.d(n, "createIndexNode", (function() { return Hs })), r.d(n, "createObjectNode", (function() { return Gs })), r.d(n, "createOperatorNode", (function() { return Vs })), r.d(n, "createParenthesisNode", (function() { return Zs })), r.d(n, "createRangeNode", (function() { return Ws })), r.d(n, "createRelationalNode", (function() { return Js })), r.d(n, "createSymbolNode", (function() { return Ys })), r.d(n, "createFunctionNode", (function() { return Ks })), r.d(n, "createParse", (function() { return tu })), r.d(n, "createCompile", (function() { return ru })), r.d(n, "createEvaluate", (function() { return nu })), r.d(n, "createParserClass", (function() { return iu })), r.d(n, "createParser", (function() { return au })), r.d(n, "createLup", (function() { return ou })), r.d(n, "createQr", (function() { return uu })), r.d(n, "createSlu", (function() { return wu })), r.d(n, "createLusolve", (function() { return Su })), r.d(n, "createHelpClass", (function() { return Au })), r.d(n, "createChainClass", (function() { return Cu })), r.d(n, "createHelp", (function() { return qu })), r.d(n, "createChain", (function() { return Iu })), r.d(n, "createDet", (function() { return Bu })), r.d(n, "createInv", (function() { return ku })), r.d(n, "createEigs", (function() { return Du })), r.d(n, "createExpm", (function() { return Ru })), r.d(n, "createSqrtm", (function() { return Pu })), r.d(n, "createDivide", (function() { return ju })), r.d(n, "createDistance", (function() { return Uu })), r.d(n, "createIntersect", (function() { return Fu })), r.d(n, "createSum", (function() { return Lu })), r.d(n, "createMean", (function() { return Hu })), r.d(n, "createMedian", (function() { return $u })), r.d(n, "createMad", (function() { return Gu })), r.d(n, "createVariance", (function() { return Vu })), r.d(n, "createQuantileSeq", (function() { return Zu })), r.d(n, "createStd", (function() { return Wu })), r.d(n, "createCombinations", (function() { return Xu })), r.d(n, "createCombinationsWithRep", (function() { return Ku })), r.d(n, "createGamma", (function() { return ic })), r.d(n, "createFactorial", (function() { return ac })), r.d(n, "createKldivergence", (function() { return oc })), r.d(n, "createMultinomial", (function() { return sc })), r.d(n, "createPermutations", (function() { return uc })), r.d(n, "createPickRandom", (function() { return hc })), r.d(n, "createRandom", (function() { return yc })), r.d(n, "createRandomInt", (function() { return gc })), r.d(n, "createStirlingS2", (function() { return vc })), r.d(n, "createBellNumbers", (function() { return xc })), r.d(n, "createCatalan", (function() { return bc })), r.d(n, "createComposition", (function() { return wc })), r.d(n, "createSimplify", (function() { return Oc })), r.d(n, "createDerivative", (function() { return Cc })), r.d(n, "createRationalize", (function() { return _c })), r.d(n, "createReviver", (function() { return Tc })), r.d(n, "createReplacer", (function() { return zc })), r.d(n, "createE", (function() { return Lc })), r.d(n, "createUppercaseE", (function() { return Qc })), r.d(n, "createFalse", (function() { return Dc })), r.d(n, "createI", (function() { return Yc })), r.d(n, "createInfinity", (function() { return Pc })), r.d(n, "createLN10", (function() { return Gc })), r.d(n, "createLN2", (function() { return $c })), r.d(n, "createLOG10E", (function() { return Zc })), r.d(n, "createLOG2E", (function() { return Vc })), r.d(n, "createNaN", (function() { return jc })), r.d(n, "createNull", (function() { return Rc })), r.d(n, "createPhi", (function() { return Hc })), r.d(n, "createPi", (function() { return Uc })), r.d(n, "createUppercasePi", (function() { return Xc })), r.d(n, "createSQRT1_2", (function() { return Wc })), r.d(n, "createSQRT2", (function() { return Jc })), r.d(n, "createTau", (function() { return Fc })), r.d(n, "createTrue", (function() { return kc })), r.d(n, "createVersion", (function() { return Kc })), r.d(n, "createAtomicMass", (function() { return zf })), r.d(n, "createAvogadro", (function() { return qf })), r.d(n, "createBohrMagneton", (function() { return lf })), r.d(n, "createBohrRadius", (function() { return gf })), r.d(n, "createBoltzmann", (function() { return If })), r.d(n, "createClassicalElectronRadius", (function() { return vf })), r.d(n, "createConductanceQuantum", (function() { return pf })), r.d(n, "createCoulomb", (function() { return cf })), r.d(n, "createDeuteronMass", (function() { return Sf })), r.d(n, "createEfimovFactor", (function() { return Tf })), r.d(n, "createElectricConstant", (function() { return sf })), r.d(n, "createElectronMass", (function() { return xf })), r.d(n, "createElementaryCharge", (function() { return ff })), r.d(n, "createFaraday", (function() { return Bf })), r.d(n, "createFermiCoupling", (function() { return bf })), r.d(n, "createFineStructure", (function() { return wf })), r.d(n, "createFirstRadiation", (function() { return kf })), r.d(n, "createGasConstant", (function() { return Rf })), r.d(n, "createGravitationConstant", (function() { return rf })), r.d(n, "createGravity", (function() { return Vf })), r.d(n, "createHartreeEnergy", (function() { return Nf })), r.d(n, "createInverseConductanceQuantum", (function() { return mf })), r.d(n, "createKlitzing", (function() { return yf })), r.d(n, "createLoschmidt", (function() { return Df })), r.d(n, "createMagneticConstant", (function() { return of })), r.d(n, "createMagneticFluxQuantum", (function() { return hf })), r.d(n, "createMolarMass", (function() { return $f })), r.d(n, "createMolarMassC12", (function() { return Gf })), r.d(n, "createMolarPlanckConstant", (function() { return Pf })), r.d(n, "createMolarVolume", (function() { return jf })), r.d(n, "createNeutronMass", (function() { return Ef })), r.d(n, "createNuclearMagneton", (function() { return df })), r.d(n, "createPlanckCharge", (function() { return Yf })), r.d(n, "createPlanckConstant", (function() { return nf })), r.d(n, "createPlanckLength", (function() { return Zf })), r.d(n, "createPlanckMass", (function() { return Wf })), r.d(n, "createPlanckTemperature", (function() { return Xf })), r.d(n, "createPlanckTime", (function() { return Jf })), r.d(n, "createProtonMass", (function() { return Mf })), r.d(n, "createQuantumOfCirculation", (function() { return Af })), r.d(n, "createReducedPlanckConstant", (function() { return af })), r.d(n, "createRydberg", (function() { return Of })), r.d(n, "createSackurTetrode", (function() { return Uf })), r.d(n, "createSecondRadiation", (function() { return Ff })), r.d(n, "createSpeedOfLight", (function() { return tf })), r.d(n, "createStefanBoltzmann", (function() { return Lf })), r.d(n, "createThomsonCrossSection", (function() { return Cf })), r.d(n, "createVacuumImpedance", (function() { return uf })), r.d(n, "createWeakMixingAngle", (function() { return _f })), r.d(n, "createWienDisplacement", (function() { return Hf })), r.d(n, "createApplyTransform", (function() { return el })), r.d(n, "createColumnTransform", (function() { return tl })), r.d(n, "createFilterTransform", (function() { return nl })), r.d(n, "createForEachTransform", (function() { return al })), r.d(n, "createIndexTransform", (function() { return ol })), r.d(n, "createMapTransform", (function() { return sl })), r.d(n, "createMaxTransform", (function() { return fl })), r.d(n, "createMeanTransform", (function() { return ll })), r.d(n, "createMinTransform", (function() { return pl })), r.d(n, "createRangeTransform", (function() { return ml })), r.d(n, "createRowTransform", (function() { return hl })), r.d(n, "createSubsetTransform", (function() { return dl })), r.d(n, "createConcatTransform", (function() { return yl })), r.d(n, "createDiffTransform", (function() { return gl })), r.d(n, "createStdTransform", (function() { return vl })), r.d(n, "createSumTransform", (function() { return xl })), r.d(n, "createVarianceTransform", (function() { return bl }));
        var l = Array.isArray;

        function p(e) { return e && !0 === e.constructor.prototype.isMatrix || !1 }

        function m(e) { return Array.isArray(e) || p(e) }

        function h(e) { return e && e.isDenseMatrix && !0 === e.constructor.prototype.isMatrix || !1 }

        function d(e) { return e && e.isSparseMatrix && !0 === e.constructor.prototype.isMatrix || !1 }

        function y(e) { return e && !0 === e.constructor.prototype.isRange || !1 }

        function g(e) { return e && !0 === e.constructor.prototype.isIndex || !1 }

        function v(e) { return "boolean" == typeof e }

        function x(e) { return e && !0 === e.constructor.prototype.isResultSet || !1 }

        function b(e) { return e && !0 === e.constructor.prototype.isHelp || !1 }

        function w(e) { return "function" == typeof e }

        function N(e) { return e instanceof Date }

        function M(e) { return e instanceof RegExp }

        function S(e) { return !(!e || "object" !== i(e) || e.constructor !== Object || s(e) || u(e)) }

        function E(e) { return null === e }

        function A(e) { return void 0 === e }

        function O(e) { return e && !0 === e.isAccessorNode && !0 === e.constructor.prototype.isNode || !1 }

        function C(e) { return e && !0 === e.isArrayNode && !0 === e.constructor.prototype.isNode || !1 }

        function _(e) { return e && !0 === e.isAssignmentNode && !0 === e.constructor.prototype.isNode || !1 }

        function T(e) { return e && !0 === e.isBlockNode && !0 === e.constructor.prototype.isNode || !1 }

        function z(e) { return e && !0 === e.isConditionalNode && !0 === e.constructor.prototype.isNode || !1 }

        function q(e) { return e && !0 === e.isConstantNode && !0 === e.constructor.prototype.isNode || !1 }

        function I(e) { return e && !0 === e.isFunctionAssignmentNode && !0 === e.constructor.prototype.isNode || !1 }

        function B(e) { return e && !0 === e.isFunctionNode && !0 === e.constructor.prototype.isNode || !1 }

        function k(e) { return e && !0 === e.isIndexNode && !0 === e.constructor.prototype.isNode || !1 }

        function D(e) { return e && !0 === e.isNode && !0 === e.constructor.prototype.isNode || !1 }

        function R(e) { return e && !0 === e.isObjectNode && !0 === e.constructor.prototype.isNode || !1 }

        function P(e) { return e && !0 === e.isOperatorNode && !0 === e.constructor.prototype.isNode || !1 }

        function j(e) { return e && !0 === e.isParenthesisNode && !0 === e.constructor.prototype.isNode || !1 }

        function U(e) { return e && !0 === e.isRangeNode && !0 === e.constructor.prototype.isNode || !1 }

        function F(e) { return e && !0 === e.isSymbolNode && !0 === e.constructor.prototype.isNode || !1 }

        function L(e) { return e && !0 === e.constructor.prototype.isChain || !1 }

        function H(e) { var t = i(e); return "object" === t ? null === e ? "null" : Array.isArray(e) ? "Array" : e instanceof Date ? "Date" : e instanceof RegExp ? "RegExp" : o(e) ? "BigNumber" : s(e) ? "Complex" : u(e) ? "Fraction" : p(e) ? "Matrix" : c(e) ? "Unit" : g(e) ? "Index" : y(e) ? "Range" : x(e) ? "ResultSet" : D(e) ? e.type : L(e) ? "Chain" : b(e) ? "Help" : "Object" : "function" === t ? "Function" : t }
        var $ = r(8),
            G = r.n($);

        function V(e) { return "boolean" == typeof e || !!isFinite(e) && e === Math.round(e) }
        var Z = Math.sign || function(e) { return e > 0 ? 1 : e < 0 ? -1 : 0 },
            W = Math.log2 || function(e) { return Math.log(e) / Math.LN2 },
            J = Math.log10 || function(e) { return Math.log(e) / Math.LN10 },
            Y = Math.log1p || function(e) { return Math.log(e + 1) },
            X = Math.cbrt || function(e) { if (0 === e) return e; var t, r = e < 0; return r && (e = -e), t = isFinite(e) ? (e / ((t = Math.exp(Math.log(e) / 3)) * t) + 2 * t) / 3 : e, r ? -t : t },
            Q = Math.expm1 || function(e) { return e >= 2e-4 || e <= -2e-4 ? Math.exp(e) - 1 : e + e * e / 2 + e * e * e / 6 };

        function K(e, t, r) {
            var n = { 2: "0b", 8: "0o", 16: "0x" }[t],
                i = "";
            if (r) {
                if (r < 1) throw new Error("size must be in greater than 0");
                if (!V(r)) throw new Error("size must be an integer");
                if (e > Math.pow(2, r - 1) - 1 || e < -Math.pow(2, r - 1)) throw new Error("Value must be in range [-2^".concat(r - 1, ", 2^").concat(r - 1, "-1]"));
                if (!V(e)) throw new Error("Value must be an integer");
                e < 0 && (e += Math.pow(2, r)), i = "i".concat(r)
            }
            var a = "";
            return e < 0 && (e = -e, a = "-"), "".concat(a).concat(n).concat(e.toString(t)).concat(i)
        }

        function ee(e, t) {
            if ("function" == typeof t) return t(e);
            if (e === 1 / 0) return "Infinity";
            if (e === -1 / 0) return "-Infinity";
            if (isNaN(e)) return "NaN";
            var r, n, i = "auto";
            if (t && (t.notation && (i = t.notation), a(t) ? r = t : a(t.precision) && (r = t.precision), t.wordSize && "number" != typeof(n = t.wordSize))) throw new Error('Option "wordSize" must be a number');
            switch (i) {
                case "fixed":
                    return re(e, r);
                case "exponential":
                    return ne(e, r);
                case "engineering":
                    return function(e, t) {
                        if (isNaN(e) || !isFinite(e)) return String(e);
                        var r = ie(te(e), t),
                            n = r.exponent,
                            i = r.coefficients,
                            o = n % 3 == 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3;
                        if (a(t))
                            for (; t > i.length || n - o + 1 > i.length;) i.push(0);
                        else
                            for (var s = Math.abs(n - o) - (i.length - 1), u = 0; u < s; u++) i.push(0);
                        var c = Math.abs(n - o),
                            f = 1;
                        for (; c > 0;) f++, c--;
                        var l = i.slice(f).join(""),
                            p = a(t) && l.length || l.match(/[1-9]/) ? "." + l : "",
                            m = i.slice(0, f).join("") + p + "e" + (n >= 0 ? "+" : "") + o.toString();
                        return r.sign + m
                    }(e, r);
                case "bin":
                    return K(e, 2, n);
                case "oct":
                    return K(e, 8, n);
                case "hex":
                    return K(e, 16, n);
                case "auto":
                    return function(e, t, r) {
                        if (isNaN(e) || !isFinite(e)) return String(e);
                        var n = r && void 0 !== r.lowerExp ? r.lowerExp : -3,
                            i = r && void 0 !== r.upperExp ? r.upperExp : 5,
                            a = te(e),
                            o = t ? ie(a, t) : a;
                        if (o.exponent < n || o.exponent >= i) return ne(e, t);
                        var s = o.coefficients,
                            u = o.exponent;
                        s.length < t && (s = s.concat(ae(t - s.length))), s = s.concat(ae(u - s.length + 1 + (s.length < t ? t - s.length : 0))), s = ae(-u).concat(s);
                        var c = u > 0 ? u : 0;
                        return c < s.length - 1 && s.splice(c + 1, 0, "."), o.sign + s.join("")
                    }(e, r, t && t).replace(/((\.\d*?)(0+))($|e)/, (function() {
                        var e = arguments[2],
                            t = arguments[4];
                        return "." !== e ? e + t : t
                    }));
                default:
                    throw new Error('Unknown notation "' + i + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')
            }
        }

        function te(e) {
            var t = String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
            if (!t) throw new SyntaxError("Invalid number " + e);
            var r = t[1],
                n = t[2],
                i = parseFloat(t[4] || "0"),
                a = n.indexOf(".");
            i += -1 !== a ? a - 1 : n.length - 1;
            var o = n.replace(".", "").replace(/^0*/, (function(e) { return i -= e.length, "" })).replace(/0*$/, "").split("").map((function(e) { return parseInt(e) }));
            return 0 === o.length && (o.push(0), i++), { sign: r, coefficients: o, exponent: i }
        }

        function re(e, t) {
            if (isNaN(e) || !isFinite(e)) return String(e);
            var r = te(e),
                n = "number" == typeof t ? ie(r, r.exponent + 1 + t) : r,
                i = n.coefficients,
                a = n.exponent + 1,
                o = a + (t || 0);
            return i.length < o && (i = i.concat(ae(o - i.length))), a < 0 && (i = ae(1 - a).concat(i), a = 1), a < i.length && i.splice(a, 0, 0 === a ? "0." : "."), n.sign + i.join("")
        }

        function ne(e, t) {
            if (isNaN(e) || !isFinite(e)) return String(e);
            var r = te(e),
                n = t ? ie(r, t) : r,
                i = n.coefficients,
                a = n.exponent;
            i.length < t && (i = i.concat(ae(t - i.length)));
            var o = i.shift();
            return n.sign + o + (i.length > 0 ? "." + i.join("") : "") + "e" + (a >= 0 ? "+" : "") + a
        }

        function ie(e, t) { for (var r = { sign: e.sign, coefficients: e.coefficients, exponent: e.exponent }, n = r.coefficients; t <= 0;) n.unshift(0), r.exponent++, t++; if (n.length > t && n.splice(t, n.length - t)[0] >= 5) { var i = t - 1; for (n[i]++; 10 === n[i];) n.pop(), 0 === i && (n.unshift(0), r.exponent++, i++), n[--i]++ } return r }

        function ae(e) { for (var t = [], r = 0; r < e; r++) t.push(0); return t }
        var oe = Number.EPSILON || 2220446049250313e-31;

        function se(e, t, r) { if (null == r) return e === t; if (e === t) return !0; if (isNaN(e) || isNaN(t)) return !1; if (isFinite(e) && isFinite(t)) { var n = Math.abs(e - t); return n < oe || n <= Math.max(Math.abs(e), Math.abs(t)) * r } return !1 }
        var ue = Math.acosh || function(e) { return Math.log(Math.sqrt(e * e - 1) + e) },
            ce = Math.asinh || function(e) { return Math.log(Math.sqrt(e * e + 1) + e) },
            fe = Math.atanh || function(e) { return Math.log((1 + e) / (1 - e)) / 2 },
            le = Math.cosh || function(e) { return (Math.exp(e) + Math.exp(-e)) / 2 },
            pe = Math.sinh || function(e) { return (Math.exp(e) - Math.exp(-e)) / 2 },
            me = Math.tanh || function(e) { var t = Math.exp(2 * e); return (t - 1) / (t + 1) };

        function he(e, t, r) {
            var n = new(0, e.constructor)(2),
                i = "";
            if (r) {
                if (r < 1) throw new Error("size must be in greater than 0");
                if (!V(r)) throw new Error("size must be an integer");
                if (e.greaterThan(n.pow(r - 1).sub(1)) || e.lessThan(n.pow(r - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(r - 1, ", 2^").concat(r - 1, "-1]"));
                if (!e.isInteger()) throw new Error("Value must be an integer");
                e.lessThan(0) && (e = e.add(n.pow(r))), i = "i".concat(r)
            }
            switch (t) {
                case 2:
                    return "".concat(e.toBinary()).concat(i);
                case 8:
                    return "".concat(e.toOctal()).concat(i);
                case 16:
                    return "".concat(e.toHexadecimal()).concat(i);
                default:
                    throw new Error("Base ".concat(t, " not supported "))
            }
        }

        function de(e, t) {
            if ("function" == typeof t) return t(e);
            if (!e.isFinite()) return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";
            var r, n, i = "auto";
            if (void 0 !== t && (t.notation && (i = t.notation), "number" == typeof t ? r = t : t.precision && (r = t.precision), t.wordSize && "number" != typeof(n = t.wordSize))) throw new Error('Option "wordSize" must be a number');
            switch (i) {
                case "fixed":
                    return function(e, t) { return e.toFixed(t) }(e, r);
                case "exponential":
                    return ye(e, r);
                case "engineering":
                    return function(e, t) {
                        var r = e.e,
                            n = r % 3 == 0 ? r : r < 0 ? r - 3 - r % 3 : r - r % 3,
                            i = e.mul(Math.pow(10, -n)),
                            a = i.toPrecision(t); - 1 !== a.indexOf("e") && (a = i.toString());
                        return a + "e" + (r >= 0 ? "+" : "") + n.toString()
                    }(e, r);
                case "bin":
                    return he(e, 2, n);
                case "oct":
                    return he(e, 8, n);
                case "hex":
                    return he(e, 16, n);
                case "auto":
                    var a = t && void 0 !== t.lowerExp ? t.lowerExp : -3,
                        o = t && void 0 !== t.upperExp ? t.upperExp : 5;
                    if (e.isZero()) return "0";
                    var s = e.toSignificantDigits(r),
                        u = s.e;
                    return (u >= a && u < o ? s.toFixed() : ye(e, r)).replace(/((\.\d*?)(0+))($|e)/, (function() {
                        var e = arguments[2],
                            t = arguments[4];
                        return "." !== e ? e + t : t
                    }));
                default:
                    throw new Error('Unknown notation "' + i + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')
            }
        }

        function ye(e, t) { return void 0 !== t ? e.toExponential(t - 1) : e.toExponential() }

        function ge(e) { return (ge = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function ve(e, t) {
            var r = e.length - t.length,
                n = e.length;
            return e.substring(r, n) === t
        }

        function xe(e, t) { return "number" == typeof e ? ee(e, t) : o(e) ? de(e, t) : function(e) { return e && "object" === ge(e) && "number" == typeof e.s && "number" == typeof e.n && "number" == typeof e.d || !1 }(e) ? t && "decimal" === t.fraction ? e.toString() : e.s * e.n + "/" + e.d : Array.isArray(e) ? function e(t, r) { if (Array.isArray(t)) { for (var n = "[", i = t.length, a = 0; a < i; a++) 0 !== a && (n += ", "), n += e(t[a], r); return n += "]" } return xe(t, r) }(e, t) : f(e) ? '"' + e + '"' : "function" == typeof e ? e.syntax ? String(e.syntax) : "function" : e && "object" === ge(e) ? "function" == typeof e.format ? e.format(t) : e && e.toString(t) !== {}.toString() ? e.toString(t) : "{" + Object.keys(e).map((function(r) { return '"' + r + '": ' + xe(e[r], t) })).join(", ") + "}" : String(e) }

        function be(e) { for (var t = String(e), r = "", n = 0; n < t.length;) { var i = t.charAt(n); "\\" === i ? (r += i, n++, "" !== (i = t.charAt(n)) && -1 !== '"\\/bfnrtu'.indexOf(i) || (r += "\\"), r += i) : r += '"' === i ? '\\"' : i, n++ } return '"' + r + '"' }

        function we(e) { var t = String(e); return t = t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") }

        function Ne(e, t) { if (!f(e)) throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + H(e) + ", index: 0)"); if (!f(t)) throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + H(t) + ", index: 1)"); return e === t ? 0 : e > t ? 1 : -1 }

        function Me(e, t, r) {
            if (!(this instanceof Me)) throw new SyntaxError("Constructor must be called with the new operator");
            this.actual = e, this.expected = t, this.relation = r, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(t) ? "[" + t.join(", ") + "]" : t) + ")", this.stack = (new Error).stack
        }

        function Se(e, t, r) {
            if (!(this instanceof Se)) throw new SyntaxError("Constructor must be called with the new operator");
            this.index = e, arguments.length < 3 ? (this.min = 0, this.max = t) : (this.min = t, this.max = r), void 0 !== this.min && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : void 0 !== this.max && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = (new Error).stack
        }

        function Ee(e) { for (var t = []; Array.isArray(e);) t.push(e.length), e = e[0]; return t }

        function Ae(e, t) {
            if (0 === t.length) { if (Array.isArray(e)) throw new Me(e.length, 0) } else ! function e(t, r, n) {
                var i, a = t.length;
                if (a !== r[n]) throw new Me(a, r[n]);
                if (n < r.length - 1) {
                    var o = n + 1;
                    for (i = 0; i < a; i++) {
                        var s = t[i];
                        if (!Array.isArray(s)) throw new Me(r.length - 1, r.length, "<");
                        e(t[i], r, o)
                    }
                } else
                    for (i = 0; i < a; i++)
                        if (Array.isArray(t[i])) throw new Me(r.length + 1, r.length, ">")
            }(e, t, 0)
        }

        function Oe(e, t) { if (!a(e) || !V(e)) throw new TypeError("Index must be an integer (value: " + e + ")"); if (e < 0 || "number" == typeof t && e >= t) throw new Se(e, t) }

        function Ce(e, t, r) {
            if (!Array.isArray(e) || !Array.isArray(t)) throw new TypeError("Array expected");
            if (0 === t.length) throw new Error("Resizing to scalar is not supported");
            return t.forEach((function(e) { if (!a(e) || !V(e) || e < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + xe(t) + ")") })),
                function e(t, r, n, i) {
                    var a, o, s = t.length,
                        u = r[n],
                        c = Math.min(s, u);
                    if (t.length = u, n < r.length - 1) { var f = n + 1; for (a = 0; a < c; a++) o = t[a], Array.isArray(o) || (o = [o], t[a] = o), e(o, r, f, i); for (a = c; a < u; a++) o = [], t[a] = o, e(o, r, f, i) } else {
                        for (a = 0; a < c; a++)
                            for (; Array.isArray(t[a]);) t[a] = t[a][0];
                        for (a = c; a < u; a++) t[a] = i
                    }
                }(e, t, 0, void 0 !== r ? r : 0), e
        }

        function _e(e, t) {
            var r = Be(e),
                n = r.length;
            if (!Array.isArray(e) || !Array.isArray(t)) throw new TypeError("Array expected");
            if (0 === t.length) throw new Me(0, n, "!=");
            var i = ze(t = Te(t, n));
            if (n !== i) throw new Me(i, n, "!=");
            try {
                return function(e, t) {
                    for (var r, n = e, i = t.length - 1; i > 0; i--) {
                        var a = t[i];
                        r = [];
                        for (var o = n.length / a, s = 0; s < o; s++) r.push(n.slice(s * a, (s + 1) * a));
                        n = r
                    }
                    return n
                }(r, t)
            } catch (e) { if (e instanceof Me) throw new Me(i, n, "!="); throw e }
        }

        function Te(e, t) {
            var r = ze(e),
                n = e.slice(),
                i = e.indexOf(-1);
            if (e.indexOf(-1, i + 1) >= 0) throw new Error("More than one wildcard in sizes");
            if (i >= 0) {
                if (!(t % r == 0)) throw new Error("Could not replace wildcard, since " + t + " is no multiple of " + -r);
                n[i] = -t / r
            }
            return n
        }

        function ze(e) { return e.reduce((function(e, t) { return e * t }), 1) }

        function qe(e, t) {
            for (var r = t || Ee(e); Array.isArray(e) && 1 === e.length;) e = e[0], r.shift();
            for (var n = r.length; 1 === r[n - 1];) n--;
            return n < r.length && (e = function e(t, r, n) {
                var i, a;
                if (n < r) { var o = n + 1; for (i = 0, a = t.length; i < a; i++) t[i] = e(t[i], r, o) } else
                    for (; Array.isArray(t);) t = t[0];
                return t
            }(e, n, 0), r.length = n), e
        }

        function Ie(e, t, r, n) {
            var i = n || Ee(e);
            if (r)
                for (var a = 0; a < r; a++) e = [e], i.unshift(1);
            for (e = function e(t, r, n) {
                    var i, a;
                    if (Array.isArray(t)) { var o = n + 1; for (i = 0, a = t.length; i < a; i++) t[i] = e(t[i], r, o) } else
                        for (var s = n; s < r; s++) t = [t];
                    return t
                }(e, t, 0); i.length < t;) i.push(1);
            return e
        }

        function Be(e) { if (!Array.isArray(e)) return e; var t = []; return e.forEach((function e(r) { Array.isArray(r) ? r.forEach(e) : t.push(r) })), t }

        function ke(e, t) { return Array.prototype.map.call(e, t) }

        function De(e, t) { Array.prototype.forEach.call(e, t) }

        function Re(e, t) { if (1 !== Ee(e).length) throw new Error("Only one dimensional matrices supported"); return Array.prototype.filter.call(e, t) }

        function Pe(e, t) { if (1 !== Ee(e).length) throw new Error("Only one dimensional matrices supported"); return Array.prototype.filter.call(e, (function(e) { return t.test(e) })) }

        function je(e, t) { return Array.prototype.join.call(e, t) }

        function Ue(e) {
            if (!Array.isArray(e)) throw new TypeError("Array input expected");
            if (0 === e.length) return e;
            var t = [],
                r = 0;
            t[0] = { value: e[0], identifier: 0 };
            for (var n = 1; n < e.length; n++) e[n] === e[n - 1] ? r++ : r = 0, t.push({ value: e[n], identifier: r });
            return t
        }

        function Fe(e) { if (!Array.isArray(e)) throw new TypeError("Array input expected"); if (0 === e.length) return e; for (var t = [], r = 0; r < e.length; r++) t.push(e[r].value); return t }

        function Le(e, t) {
            for (var r, n = 0, i = 0; i < e.length; i++) {
                var a = e[i],
                    o = Array.isArray(a);
                if (0 === i && o && (n = a.length), o && a.length !== n) return;
                var s = o ? Le(a, t) : t(a);
                if (void 0 === r) r = s;
                else if (r !== s) return "mixed"
            }
            return r
        }

        function He(e, t) { return -1 !== e.indexOf(t) }

        function $e(e) { return ($e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function Ge(e) { var t = $e(e); if ("number" === t || "string" === t || "boolean" === t || null == e) return e; if ("function" == typeof e.clone) return e.clone(); if (Array.isArray(e)) return e.map((function(e) { return Ge(e) })); if (e instanceof Date) return new Date(e.valueOf()); if (o(e)) return e; if (e instanceof RegExp) throw new TypeError("Cannot clone " + e); return Ve(e, Ge) }

        function Ve(e, t) { var r = {}; for (var n in e) Xe(e, n) && (r[n] = t(e[n])); return r }

        function Ze(e, t) { for (var r in t) Xe(t, r) && (e[r] = t[r]); return e }

        function We(e, t) {
            var r, n, i;
            if (Array.isArray(e)) {
                if (!Array.isArray(t)) return !1;
                if (e.length !== t.length) return !1;
                for (n = 0, i = e.length; n < i; n++)
                    if (!We(e[n], t[n])) return !1;
                return !0
            }
            if ("function" == typeof e) return e === t;
            if (e instanceof Object) {
                if (Array.isArray(t) || !(t instanceof Object)) return !1;
                for (r in e)
                    if (!(r in t) || !We(e[r], t[r])) return !1;
                for (r in t)
                    if (!(r in e) || !We(e[r], t[r])) return !1;
                return !0
            }
            return e === t
        }

        function Je(e) {
            var t = {};
            return function e(t, r) {
                for (var n in t)
                    if (Xe(t, n)) { var i = t[n]; "object" === $e(i) && null !== i ? e(i, r) : r[n] = i }
            }(e, t), t
        }

        function Ye(e, t, r) {
            var n, i = !0;
            Object.defineProperty(e, t, { get: function() { return i && (n = r(), i = !1), n }, set: function(e) { n = e, i = !1 }, configurable: !0, enumerable: !0 })
        }

        function Xe(e, t) { return e && Object.hasOwnProperty.call(e, t) }

        function Qe(e) { return Object.keys(e).map((function(t) { return e[t] })) }

        function Ke(e, t, r, n) {
            function i(n) {
                var i = function(e, t) {
                    for (var r = {}, n = 0; n < t.length; n++) {
                        var i = t[n],
                            a = e[i];
                        void 0 !== a && (r[i] = a)
                    }
                    return r
                }(n, t.map(tt));
                return function(e, t, r) { if (!t.filter((function(e) { return ! function(e) { return e && "?" === e[0] }(e) })).every((function(e) { return void 0 !== r[e] }))) { var n = t.filter((function(e) { return void 0 === r[e] })); throw new Error('Cannot create function "'.concat(e, '", ') + "some dependencies are missing: ".concat(n.map((function(e) { return '"'.concat(e, '"') })).join(", "), ".")) } }(e, t, n), r(i)
            }
            return i.isFactory = !0, i.fn = e, i.dependencies = t.slice().sort(), n && (i.meta = n), i
        }

        function et(e) { return "function" == typeof e && "string" == typeof e.fn && Array.isArray(e.dependencies) }

        function tt(e) { return e && "?" === e[0] ? e.slice(1) : e }
        Me.prototype = new RangeError, Me.prototype.constructor = RangeError, Me.prototype.name = "DimensionError", Me.prototype.isDimensionError = !0, Se.prototype = new RangeError, Se.prototype.constructor = RangeError, Se.prototype.name = "IndexError", Se.prototype.isIndexError = !0;
        var rt = function() { return rt = G.a.create, G.a },
            nt = Ke("typed", ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], (function(e) {
                var t = e.BigNumber,
                    r = e.Complex,
                    n = e.DenseMatrix,
                    i = e.Fraction,
                    m = rt();
                return m.types = [{ name: "number", test: a }, { name: "Complex", test: s }, { name: "BigNumber", test: o }, { name: "Fraction", test: u }, { name: "Unit", test: c }, { name: "string", test: f }, { name: "Chain", test: L }, { name: "Array", test: l }, { name: "Matrix", test: p }, { name: "DenseMatrix", test: h }, { name: "SparseMatrix", test: d }, { name: "Range", test: y }, { name: "Index", test: g }, { name: "boolean", test: v }, { name: "ResultSet", test: x }, { name: "Help", test: b }, { name: "function", test: w }, { name: "Date", test: N }, { name: "RegExp", test: M }, { name: "null", test: E }, { name: "undefined", test: A }, { name: "AccessorNode", test: O }, { name: "ArrayNode", test: C }, { name: "AssignmentNode", test: _ }, { name: "BlockNode", test: T }, { name: "ConditionalNode", test: z }, { name: "ConstantNode", test: q }, { name: "FunctionNode", test: B }, { name: "FunctionAssignmentNode", test: I }, { name: "IndexNode", test: k }, { name: "Node", test: D }, { name: "ObjectNode", test: R }, { name: "OperatorNode", test: P }, { name: "ParenthesisNode", test: j }, { name: "RangeNode", test: U }, { name: "SymbolNode", test: F }, { name: "Object", test: S }], m.conversions = [{ from: "number", to: "BigNumber", convert: function(e) { if (t || it(e), e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + e + "). Use function bignumber(x) to convert to BigNumber."); return new t(e) } }, { from: "number", to: "Complex", convert: function(e) { return r || at(e), new r(e, 0) } }, { from: "number", to: "string", convert: function(e) { return e + "" } }, { from: "BigNumber", to: "Complex", convert: function(e) { return r || at(e), new r(e.toNumber(), 0) } }, { from: "Fraction", to: "BigNumber", convert: function(e) { throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.") } }, { from: "Fraction", to: "Complex", convert: function(e) { return r || at(e), new r(e.valueOf(), 0) } }, { from: "number", to: "Fraction", convert: function(e) { i || ot(e); var t = new i(e); if (t.valueOf() !== e) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + e + "). Use function fraction(x) to convert to Fraction."); return t } }, { from: "string", to: "number", convert: function(e) { var t = Number(e); if (isNaN(t)) throw new Error('Cannot convert "' + e + '" to a number'); return t } }, { from: "string", to: "BigNumber", convert: function(e) { t || it(e); try { return new t(e) } catch (t) { throw new Error('Cannot convert "' + e + '" to BigNumber') } } }, { from: "string", to: "Fraction", convert: function(e) { i || ot(e); try { return new i(e) } catch (t) { throw new Error('Cannot convert "' + e + '" to Fraction') } } }, { from: "string", to: "Complex", convert: function(e) { r || at(e); try { return new r(e) } catch (t) { throw new Error('Cannot convert "' + e + '" to Complex') } } }, { from: "boolean", to: "number", convert: function(e) { return +e } }, { from: "boolean", to: "BigNumber", convert: function(e) { return t || it(e), new t(+e) } }, { from: "boolean", to: "Fraction", convert: function(e) { return i || ot(e), new i(+e) } }, { from: "boolean", to: "string", convert: function(e) { return String(e) } }, { from: "Array", to: "Matrix", convert: function(e) { return n || function() { throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided") }(), new n(e) } }, { from: "Matrix", to: "Array", convert: function(e) { return e.valueOf() } }], m
            }));

        function it(e) { throw new Error("Cannot convert value ".concat(e, " into a BigNumber: no class 'BigNumber' provided")) }

        function at(e) { throw new Error("Cannot convert value ".concat(e, " into a Complex number: no class 'Complex' provided")) }

        function ot(e) { throw new Error("Cannot convert value ".concat(e, " into a Fraction, no class 'Fraction' provided.")) }
        var st = Ke("ResultSet", [], (function() {
                function e(t) {
                    if (!(this instanceof e)) throw new SyntaxError("Constructor must be called with the new operator");
                    this.entries = t || []
                }
                return e.prototype.type = "ResultSet", e.prototype.isResultSet = !0, e.prototype.valueOf = function() { return this.entries }, e.prototype.toString = function() { return "[" + this.entries.join(", ") + "]" }, e.prototype.toJSON = function() { return { mathjs: "ResultSet", entries: this.entries } }, e.fromJSON = function(t) { return new e(t.entries) }, e
            }), { isClass: !0 }),
            ut = r(7),
            ct = r.n(ut),
            ft = Ke("BigNumber", ["?on", "config"], (function(e) {
                var t = e.on,
                    r = e.config,
                    n = ct.a.clone({ precision: r.precision, modulo: 9 });
                return n.prototype.type = "BigNumber", n.prototype.isBigNumber = !0, n.prototype.toJSON = function() { return { mathjs: "BigNumber", value: this.toString() } }, n.fromJSON = function(e) { return new n(e.value) }, t && t("config", (function(e, t) { e.precision !== t.precision && n.config({ precision: e.precision }) })), n
            }), { isClass: !0 }),
            lt = r(1),
            pt = r.n(lt);

        function mt(e) { return (mt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }
        var ht = Ke("Complex", [], (function() {
                return pt.a.prototype.type = "Complex", pt.a.prototype.isComplex = !0, pt.a.prototype.toJSON = function() { return { mathjs: "Complex", re: this.re, im: this.im } }, pt.a.prototype.toPolar = function() { return { r: this.abs(), phi: this.arg() } }, pt.a.prototype.format = function(e) {
                    var t = this.im,
                        r = this.re,
                        n = ee(this.re, e),
                        i = ee(this.im, e),
                        o = a(e) ? e : e ? e.precision : null;
                    if (null !== o) {
                        var s = Math.pow(10, -o);
                        Math.abs(r / t) < s && (r = 0), Math.abs(t / r) < s && (t = 0)
                    }
                    return 0 === t ? n : 0 === r ? 1 === t ? "i" : -1 === t ? "-i" : i + "i" : t < 0 ? -1 === t ? n + " - i" : n + " - " + i.substring(1) + "i" : 1 === t ? n + " + i" : n + " + " + i + "i"
                }, pt.a.fromPolar = function(e) {
                    switch (arguments.length) {
                        case 1:
                            var t = arguments[0];
                            if ("object" === mt(t)) return pt()(t);
                            throw new TypeError("Input has to be an object with r and phi keys.");
                        case 2:
                            var r = arguments[0],
                                n = arguments[1];
                            if (a(r)) { if (c(n) && n.hasBase("ANGLE") && (n = n.toNumber("rad")), a(n)) return new pt.a({ r: r, phi: n }); throw new TypeError("Phi is not a number nor an angle unit.") }
                            throw new TypeError("Radius r is not a number.");
                        default:
                            throw new SyntaxError("Wrong number of arguments in function fromPolar")
                    }
                }, pt.a.prototype.valueOf = pt.a.prototype.toString, pt.a.fromJSON = function(e) { return new pt.a(e) }, pt.a.compare = function(e, t) { return e.re > t.re ? 1 : e.re < t.re ? -1 : e.im > t.im ? 1 : e.im < t.im ? -1 : 0 }, pt.a
            }), { isClass: !0 }),
            dt = r(3),
            yt = r.n(dt),
            gt = Ke("Fraction", [], (function() { return yt.a.prototype.type = "Fraction", yt.a.prototype.isFraction = !0, yt.a.prototype.toJSON = function() { return { mathjs: "Fraction", n: this.s * this.n, d: this.d } }, yt.a.fromJSON = function(e) { return new yt.a(e) }, yt.a }), { isClass: !0 }),
            vt = Ke("Range", [], (function() {
                function e(t, r, n) {
                    if (!(this instanceof e)) throw new SyntaxError("Constructor must be called with the new operator");
                    var i = null != t,
                        a = null != r,
                        s = null != n;
                    if (i)
                        if (o(t)) t = t.toNumber();
                        else if ("number" != typeof t) throw new TypeError("Parameter start must be a number");
                    if (a)
                        if (o(r)) r = r.toNumber();
                        else if ("number" != typeof r) throw new TypeError("Parameter end must be a number");
                    if (s)
                        if (o(n)) n = n.toNumber();
                        else if ("number" != typeof n) throw new TypeError("Parameter step must be a number");
                    this.start = i ? parseFloat(t) : 0, this.end = a ? parseFloat(r) : 0, this.step = s ? parseFloat(n) : 1
                }
                return e.prototype.type = "Range", e.prototype.isRange = !0, e.parse = function(t) {
                    if ("string" != typeof t) return null;
                    var r = t.split(":").map((function(e) { return parseFloat(e) }));
                    if (r.some((function(e) { return isNaN(e) }))) return null;
                    switch (r.length) {
                        case 2:
                            return new e(r[0], r[1]);
                        case 3:
                            return new e(r[0], r[2], r[1]);
                        default:
                            return null
                    }
                }, e.prototype.clone = function() { return new e(this.start, this.end, this.step) }, e.prototype.size = function() {
                    var e = 0,
                        t = this.start,
                        r = this.step,
                        n = this.end - t;
                    return Z(r) === Z(n) ? e = Math.ceil(n / r) : 0 === n && (e = 0), isNaN(e) && (e = 0), [e]
                }, e.prototype.min = function() { var e = this.size()[0]; return e > 0 ? this.step > 0 ? this.start : this.start + (e - 1) * this.step : void 0 }, e.prototype.max = function() { var e = this.size()[0]; return e > 0 ? this.step > 0 ? this.start + (e - 1) * this.step : this.start : void 0 }, e.prototype.forEach = function(e) {
                    var t = this.start,
                        r = this.step,
                        n = this.end,
                        i = 0;
                    if (r > 0)
                        for (; t < n;) e(t, [i], this), t += r, i++;
                    else if (r < 0)
                        for (; t > n;) e(t, [i], this), t += r, i++
                }, e.prototype.map = function(e) { var t = []; return this.forEach((function(r, n, i) { t[n[0]] = e(r, n, i) })), t }, e.prototype.toArray = function() { var e = []; return this.forEach((function(t, r) { e[r[0]] = t })), e }, e.prototype.valueOf = function() { return this.toArray() }, e.prototype.format = function(e) { var t = ee(this.start, e); return 1 !== this.step && (t += ":" + ee(this.step, e)), t += ":" + ee(this.end, e) }, e.prototype.toString = function() { return this.format() }, e.prototype.toJSON = function() { return { mathjs: "Range", start: this.start, end: this.end, step: this.step } }, e.fromJSON = function(t) { return new e(t.start, t.end, t.step) }, e
            }), { isClass: !0 }),
            xt = Ke("Matrix", [], (function() {
                function e() { if (!(this instanceof e)) throw new SyntaxError("Constructor must be called with the new operator") }
                return e.prototype.type = "Matrix", e.prototype.isMatrix = !0, e.prototype.storage = function() { throw new Error("Cannot invoke storage on a Matrix interface") }, e.prototype.datatype = function() { throw new Error("Cannot invoke datatype on a Matrix interface") }, e.prototype.create = function(e, t) { throw new Error("Cannot invoke create on a Matrix interface") }, e.prototype.subset = function(e, t, r) { throw new Error("Cannot invoke subset on a Matrix interface") }, e.prototype.get = function(e) { throw new Error("Cannot invoke get on a Matrix interface") }, e.prototype.set = function(e, t, r) { throw new Error("Cannot invoke set on a Matrix interface") }, e.prototype.resize = function(e, t) { throw new Error("Cannot invoke resize on a Matrix interface") }, e.prototype.reshape = function(e, t) { throw new Error("Cannot invoke reshape on a Matrix interface") }, e.prototype.clone = function() { throw new Error("Cannot invoke clone on a Matrix interface") }, e.prototype.size = function() { throw new Error("Cannot invoke size on a Matrix interface") }, e.prototype.map = function(e, t) { throw new Error("Cannot invoke map on a Matrix interface") }, e.prototype.forEach = function(e) { throw new Error("Cannot invoke forEach on a Matrix interface") }, e.prototype.toArray = function() { throw new Error("Cannot invoke toArray on a Matrix interface") }, e.prototype.valueOf = function() { throw new Error("Cannot invoke valueOf on a Matrix interface") }, e.prototype.format = function(e) { throw new Error("Cannot invoke format on a Matrix interface") }, e.prototype.toString = function() { throw new Error("Cannot invoke toString on a Matrix interface") }, e
            }), { isClass: !0 }),
            bt = Ke("DenseMatrix", ["Matrix"], (function(e) {
                var t = e.Matrix;

                function r(e, t) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (t && !f(t)) throw new Error("Invalid datatype: " + t);
                    if (p(e)) "DenseMatrix" === e.type ? (this._data = Ge(e._data), this._size = Ge(e._size), this._datatype = t || e._datatype) : (this._data = e.toArray(), this._size = e.size(), this._datatype = t || e._datatype);
                    else if (e && l(e.data) && l(e.size)) this._data = e.data, this._size = e.size, Ae(this._data, this._size), this._datatype = t || e.datatype;
                    else if (l(e)) this._data = function e(t) {
                        for (var r = 0, n = t.length; r < n; r++) {
                            var i = t[r];
                            l(i) ? t[r] = e(i) : i && !0 === i.isMatrix && (t[r] = e(i.valueOf()))
                        }
                        return t
                    }(e), this._size = Ee(this._data), Ae(this._data, this._size), this._datatype = t;
                    else {
                        if (e) throw new TypeError("Unsupported type of data (" + H(e) + ")");
                        this._data = [], this._size = [0], this._datatype = t
                    }
                }

                function n(e, t) {
                    if (!g(t)) throw new TypeError("Invalid index");
                    if (t.isScalar()) return e.get(t.min());
                    var n = t.size();
                    if (n.length !== e._size.length) throw new Me(n.length, e._size.length);
                    for (var i = t.min(), a = t.max(), o = 0, s = e._size.length; o < s; o++) Oe(i[o], e._size[o]), Oe(a[o], e._size[o]);
                    return new r(function e(t, r, n, i) {
                        var a = i === n - 1,
                            o = r.dimension(i);
                        return a ? o.map((function(e) { return Oe(e, t.length), t[e] })).valueOf() : o.map((function(a) { Oe(a, t.length); var o = t[a]; return e(o, r, n, i + 1) })).valueOf()
                    }(e._data, t, n.length, 0), e._datatype)
                }

                function i(e, t, r, n) {
                    if (!t || !0 !== t.isIndex) throw new TypeError("Invalid index");
                    var i, a = t.size(),
                        o = t.isScalar();
                    if (p(r) ? (i = r.size(), r = r.valueOf()) : i = Ee(r), o) {
                        if (0 !== i.length) throw new TypeError("Scalar expected");
                        e.set(t.min(), r, n)
                    } else {
                        if (a.length < e._size.length) throw new Me(a.length, e._size.length, "<");
                        if (i.length < a.length) {
                            for (var s = 0, c = 0; 1 === a[s] && 1 === i[s];) s++;
                            for (; 1 === a[s];) c++, s++;
                            r = Ie(r, a.length, c, i)
                        }
                        if (!We(a, i)) throw new Me(a, i, ">");
                        u(e, t.max().map((function(e) { return e + 1 })), n);
                        var f = a.length;
                        ! function e(t, r, n, i, a) {
                            var o = a === i - 1,
                                s = r.dimension(a);
                            o ? s.forEach((function(e, r) { Oe(e), t[e] = n[r[0]] })) : s.forEach((function(o, s) { Oe(o), e(t[o], r, n[s[0]], i, a + 1) }))
                        }(e._data, t, r, f, 0)
                    }
                    return e
                }

                function s(e, t, r) { if (0 === t.length) { for (var n = e._data; l(n);) n = n[0]; return n } return e._size = t.slice(0), e._data = Ce(e._data, e._size, r), e }

                function u(e, t, r) {
                    for (var n = e._size.slice(0), i = !1; n.length < t.length;) n.push(0), i = !0;
                    for (var a = 0, o = t.length; a < o; a++) t[a] > n[a] && (n[a] = t[a], i = !0);
                    i && s(e, n, r)
                }
                return r.prototype = new t, r.prototype.createDenseMatrix = function(e, t) { return new r(e, t) }, r.prototype.type = "DenseMatrix", r.prototype.isDenseMatrix = !0, r.prototype.getDataType = function() { return Le(this._data, H) }, r.prototype.storage = function() { return "dense" }, r.prototype.datatype = function() { return this._datatype }, r.prototype.create = function(e, t) { return new r(e, t) }, r.prototype.subset = function(e, t, r) {
                    switch (arguments.length) {
                        case 1:
                            return n(this, e);
                        case 2:
                        case 3:
                            return i(this, e, t, r);
                        default:
                            throw new SyntaxError("Wrong number of arguments")
                    }
                }, r.prototype.get = function(e) {
                    if (!l(e)) throw new TypeError("Array expected");
                    if (e.length !== this._size.length) throw new Me(e.length, this._size.length);
                    for (var t = 0; t < e.length; t++) Oe(e[t], this._size[t]);
                    for (var r = this._data, n = 0, i = e.length; n < i; n++) {
                        var a = e[n];
                        Oe(a, r.length), r = r[a]
                    }
                    return r
                }, r.prototype.set = function(e, t, r) {
                    if (!l(e)) throw new TypeError("Array expected");
                    if (e.length < this._size.length) throw new Me(e.length, this._size.length, "<");
                    var n, i, a;
                    u(this, e.map((function(e) { return e + 1 })), r);
                    var o = this._data;
                    for (n = 0, i = e.length - 1; n < i; n++) Oe(a = e[n], o.length), o = o[a];
                    return Oe(a = e[e.length - 1], o.length), o[a] = t, this
                }, r.prototype.resize = function(e, t, r) { if (!m(e)) throw new TypeError("Array or Matrix expected"); var n = e.valueOf().map((function(e) { return Array.isArray(e) && 1 === e.length ? e[0] : e })); return s(r ? this.clone() : this, n, t) }, r.prototype.reshape = function(e, t) {
                    var r = t ? this.clone() : this;
                    r._data = _e(r._data, e);
                    var n = r._size.reduce((function(e, t) { return e * t }));
                    return r._size = Te(e, n), r
                }, r.prototype.clone = function() { return new r({ data: Ge(this._data), size: Ge(this._size), datatype: this._datatype }) }, r.prototype.size = function() { return this._size.slice(0) }, r.prototype.map = function(e) {
                    var t = this,
                        n = function r(n, i) { return l(n) ? n.map((function(e, t) { return r(e, i.concat(t)) })) : e(n, i, t) }(this._data, []);
                    return new r(n, void 0 !== this._datatype ? Le(n, H) : void 0)
                }, r.prototype.forEach = function(e) { var t = this;! function r(n, i) { l(n) ? n.forEach((function(e, t) { r(e, i.concat(t)) })) : e(n, i, t) }(this._data, []) }, r.prototype.toArray = function() { return Ge(this._data) }, r.prototype.valueOf = function() { return this._data }, r.prototype.format = function(e) { return xe(this._data, e) }, r.prototype.toString = function() { return xe(this._data) }, r.prototype.toJSON = function() { return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype } }, r.prototype.diagonal = function(e) { if (e) { if (o(e) && (e = e.toNumber()), !a(e) || !V(e)) throw new TypeError("The parameter k must be an integer number") } else e = 0; for (var t = e > 0 ? e : 0, n = e < 0 ? -e : 0, i = this._size[0], s = this._size[1], u = Math.min(i - n, s - t), c = [], f = 0; f < u; f++) c[f] = this._data[f + n][f + t]; return new r({ data: c, size: [u], datatype: this._datatype }) }, r.diagonal = function(e, t, n, i) {
                    if (!l(e)) throw new TypeError("Array expected, size parameter");
                    if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");
                    if (e = e.map((function(e) { if (o(e) && (e = e.toNumber()), !a(e) || !V(e) || e < 1) throw new Error("Size values must be positive integers"); return e })), n) { if (o(n) && (n = n.toNumber()), !a(n) || !V(n)) throw new TypeError("The parameter k must be an integer number") } else n = 0;
                    var s, u = n > 0 ? n : 0,
                        c = n < 0 ? -n : 0,
                        f = e[0],
                        m = e[1],
                        h = Math.min(f - c, m - u);
                    if (l(t)) {
                        if (t.length !== h) throw new Error("Invalid value array length");
                        s = function(e) { return t[e] }
                    } else if (p(t)) {
                        var d = t.size();
                        if (1 !== d.length || d[0] !== h) throw new Error("Invalid matrix length");
                        s = function(e) { return t.get([e]) }
                    } else s = function() { return t };
                    i || (i = o(s(0)) ? s(0).mul(0) : 0);
                    var y = [];
                    if (e.length > 0) { y = Ce(y, e, i); for (var g = 0; g < h; g++) y[g + c][g + u] = s(g) }
                    return new r({ data: y, size: [f, m] })
                }, r.fromJSON = function(e) { return new r(e) }, r.prototype.swapRows = function(e, t) { if (!(a(e) && V(e) && a(t) && V(t))) throw new Error("Row index must be positive integers"); if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported"); return Oe(e, this._size[0]), Oe(t, this._size[0]), r._swapRows(e, t, this._data), this }, r._swapRows = function(e, t, r) {
                    var n = r[e];
                    r[e] = r[t], r[t] = n
                }, r
            }), { isClass: !0 }),
            wt = Ke("clone", ["typed"], (function(e) { return (0, e.typed)("clone", { any: Ge }) }));

        function Nt(e) {
            for (var t = 0; t < e.length; t++)
                if (m(e[t])) return !0;
            return !1
        }

        function Mt(e, t) {
            p(e) && (e = e.valueOf());
            for (var r = 0, n = e.length; r < n; r++) {
                var i = e[r];
                Array.isArray(i) ? Mt(i, t) : t(i)
            }
        }

        function St(e, t, r) { return e && "function" == typeof e.map ? e.map((function(e) { return St(e, t, r) })) : t(e) }

        function Et(e, t, r) { var n = Array.isArray(e) ? Ee(e) : e.size(); if (t < 0 || t >= n.length) throw new Se(t, n.length); return p(e) ? e.create(At(e.valueOf(), t, r)) : At(e, t, r) }

        function At(e, t, r) {
            var n, i, a, o;
            if (t <= 0) {
                if (Array.isArray(e[0])) {
                    for (o = function(e) {
                            var t, r, n = e.length,
                                i = e[0].length,
                                a = [];
                            for (r = 0; r < i; r++) {
                                var o = [];
                                for (t = 0; t < n; t++) o.push(e[t][r]);
                                a.push(o)
                            }
                            return a
                        }(e), i = [], n = 0; n < o.length; n++) i[n] = At(o[n], t - 1, r);
                    return i
                }
                for (a = e[0], n = 1; n < e.length; n++) a = r(a, e[n]);
                return a
            }
            for (i = [], n = 0; n < e.length; n++) i[n] = At(e[n], t - 1, r);
            return i
        }

        function Ot(e, t, r, n, i, a, o, s, u, c, f) {
            var l, p, m, h, d = e._values,
                y = e._index,
                g = e._ptr;
            if (n)
                for (p = g[t], m = g[t + 1], l = p; l < m; l++) r[h = y[l]] !== a ? (r[h] = a, o.push(h), c ? (n[h] = u ? s(d[l], f) : s(f, d[l]), i[h] = a) : n[h] = d[l]) : (n[h] = u ? s(d[l], n[h]) : s(n[h], d[l]), i[h] = a);
            else
                for (p = g[t], m = g[t + 1], l = p; l < m; l++) r[h = y[l]] !== a ? (r[h] = a, o.push(h)) : i[h] = a
        }
        var Ct = Ke("isInteger", ["typed"], (function(e) { return (0, e.typed)("isInteger", { number: V, BigNumber: function(e) { return e.isInt() }, Fraction: function(e) { return 1 === e.d && isFinite(e.n) }, "Array | Matrix": function(e) { return St(e, this) } }) }));

        function _t(e) { return e < 0 }

        function Tt(e) { return e > 0 }

        function zt(e) { return 0 === e }

        function qt(e) { return Number.isNaN(e) }
        _t.signature = "number", Tt.signature = "number", zt.signature = "number", qt.signature = "number";
        var It = Ke("isNegative", ["typed"], (function(e) { return (0, e.typed)("isNegative", { number: _t, BigNumber: function(e) { return e.isNeg() && !e.isZero() && !e.isNaN() }, Fraction: function(e) { return e.s < 0 }, Unit: function(e) { return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Bt = Ke("isNumeric", ["typed"], (function(e) { return (0, e.typed)("isNumeric", { "number | BigNumber | Fraction | boolean": function() { return !0 }, "Complex | Unit | string | null | undefined | Node": function() { return !1 }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            kt = Ke("hasNumericValue", ["typed", "isNumeric"], (function(e) {
                var t = e.typed,
                    r = e.isNumeric;
                return t("hasNumericValue", { string: function(e) { return e.trim().length > 0 && !isNaN(Number(e)) }, any: function(e) { return r(e) } })
            })),
            Dt = Ke("isPositive", ["typed"], (function(e) { return (0, e.typed)("isPositive", { number: Tt, BigNumber: function(e) { return !e.isNeg() && !e.isZero() && !e.isNaN() }, Fraction: function(e) { return e.s > 0 && e.n > 0 }, Unit: function(e) { return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Rt = Ke("isZero", ["typed"], (function(e) { return (0, e.typed)("isZero", { number: zt, BigNumber: function(e) { return e.isZero() }, Complex: function(e) { return 0 === e.re && 0 === e.im }, Fraction: function(e) { return 1 === e.d && 0 === e.n }, Unit: function(e) { return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Pt = Ke("isNaN", ["typed"], (function(e) { return (0, e.typed)("isNaN", { number: qt, BigNumber: function(e) { return e.isNaN() }, Fraction: function(e) { return !1 }, Complex: function(e) { return e.isNaN() }, Unit: function(e) { return Number.isNaN(e.value) }, "Array | Matrix": function(e) { return St(e, Number.isNaN) } }) })),
            jt = Ke("typeOf", ["typed"], (function(e) { return (0, e.typed)("typeOf", { any: H }) }));

        function Ut(e, t, r) { if (null == r) return e.eq(t); if (e.eq(t)) return !0; if (e.isNaN() || t.isNaN()) return !1; if (e.isFinite() && t.isFinite()) { var n = e.minus(t).abs(); if (n.isZero()) return !0; var i = e.constructor.max(e.abs(), t.abs()); return n.lte(i.times(r)) } return !1 }
        var Ft = Ke("equalScalar", ["typed", "config"], (function(e) {
                var t = e.typed,
                    r = e.config;
                return t("equalScalar", { "boolean, boolean": function(e, t) { return e === t }, "number, number": function(e, t) { return se(e, t, r.epsilon) }, "BigNumber, BigNumber": function(e, t) { return e.eq(t) || Ut(e, t, r.epsilon) }, "Fraction, Fraction": function(e, t) { return e.equals(t) }, "Complex, Complex": function(e, t) { return function(e, t, r) { return se(e.re, t.re, r) && se(e.im, t.im, r) }(e, t, r.epsilon) }, "Unit, Unit": function(e, t) { if (!e.equalBase(t)) throw new Error("Cannot compare units with different base"); return this(e.value, t.value) } })
            })),
            Lt = (Ke("equalScalar", ["typed", "config"], (function(e) {
                var t = e.typed,
                    r = e.config;
                return t("equalScalar", { "number, number": function(e, t) { return se(e, t, r.epsilon) } })
            })), Ke("SparseMatrix", ["typed", "equalScalar", "Matrix"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar,
                    n = e.Matrix;

                function i(e, t) {
                    if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (t && !f(t)) throw new Error("Invalid datatype: " + t);
                    if (p(e)) ! function(e, t, r) { "SparseMatrix" === t.type ? (e._values = t._values ? Ge(t._values) : void 0, e._index = Ge(t._index), e._ptr = Ge(t._ptr), e._size = Ge(t._size), e._datatype = r || t._datatype) : s(e, t.valueOf(), r || t._datatype) }(this, e, t);
                    else if (e && l(e.index) && l(e.ptr) && l(e.size)) this._values = e.values, this._index = e.index, this._ptr = e.ptr, this._size = e.size, this._datatype = t || e.datatype;
                    else if (l(e)) s(this, e, t);
                    else {
                        if (e) throw new TypeError("Unsupported type of data (" + H(e) + ")");
                        this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = t
                    }
                }

                function s(e, n, i) {
                    e._values = [], e._index = [], e._ptr = [], e._datatype = i;
                    var a = n.length,
                        o = 0,
                        s = r,
                        u = 0;
                    if (f(i) && (s = t.find(r, [i, i]) || r, u = t.convert(0, i)), a > 0) {
                        var c = 0;
                        do {
                            e._ptr.push(e._index.length);
                            for (var p = 0; p < a; p++) {
                                var m = n[p];
                                if (l(m)) {
                                    if (0 === c && o < m.length && (o = m.length), c < m.length) {
                                        var h = m[c];
                                        s(h, u) || (e._values.push(h), e._index.push(p))
                                    }
                                } else 0 === c && o < 1 && (o = 1), s(m, u) || (e._values.push(m), e._index.push(p))
                            }
                            c++
                        } while (c < o)
                    }
                    e._ptr.push(e._index.length), e._size = [a, o]
                }

                function u(e, t) {
                    if (!g(t)) throw new TypeError("Invalid index");
                    if (t.isScalar()) return e.get(t.min());
                    var r, n, a, o, s = t.size();
                    if (s.length !== e._size.length) throw new Me(s.length, e._size.length);
                    var u = t.min(),
                        c = t.max();
                    for (r = 0, n = e._size.length; r < n; r++) Oe(u[r], e._size[r]), Oe(c[r], e._size[r]);
                    var f = e._values,
                        l = e._index,
                        p = e._ptr,
                        m = t.dimension(0),
                        h = t.dimension(1),
                        d = [],
                        y = [];
                    m.forEach((function(e, t) { y[e] = t[0], d[e] = !0 }));
                    var v = f ? [] : void 0,
                        x = [],
                        b = [];
                    return h.forEach((function(e) { for (b.push(x.length), a = p[e], o = p[e + 1]; a < o; a++) r = l[a], !0 === d[r] && (x.push(y[r]), v && v.push(f[a])) })), b.push(x.length), new i({ values: v, index: x, ptr: b, size: s, datatype: e._datatype })
                }

                function c(e, t, r, n) {
                    if (!t || !0 !== t.isIndex) throw new TypeError("Invalid index");
                    var i, a = t.size(),
                        o = t.isScalar();
                    if (p(r) ? (i = r.size(), r = r.toArray()) : i = Ee(r), o) {
                        if (0 !== i.length) throw new TypeError("Scalar expected");
                        e.set(t.min(), r, n)
                    } else {
                        if (1 !== a.length && 2 !== a.length) throw new Me(a.length, e._size.length, "<");
                        if (i.length < a.length) {
                            for (var s = 0, u = 0; 1 === a[s] && 1 === i[s];) s++;
                            for (; 1 === a[s];) u++, s++;
                            r = Ie(r, a.length, u, i)
                        }
                        if (!We(a, i)) throw new Me(a, i, ">");
                        for (var c = t.min()[0], f = t.min()[1], l = i[0], m = i[1], h = 0; h < l; h++)
                            for (var d = 0; d < m; d++) {
                                var y = r[h][d];
                                e.set([h + c, d + f], y, n)
                            }
                    }
                    return e
                }

                function h(e, t, r, n) {
                    if (r - t == 0) return r;
                    for (var i = t; i < r; i++)
                        if (n[i] === e) return i;
                    return t
                }

                function d(e, t, r, n, i, a, o) { i.splice(e, 0, n), a.splice(e, 0, t); for (var s = r + 1; s < o.length; s++) o[s]++ }

                function y(e, n, i, a) {
                    var o = a || 0,
                        s = r,
                        u = 0;
                    f(e._datatype) && (s = t.find(r, [e._datatype, e._datatype]) || r, u = t.convert(0, e._datatype), o = t.convert(o, e._datatype));
                    var c, l, p, m = !s(o, u),
                        h = e._size[0],
                        d = e._size[1];
                    if (i > d) {
                        for (l = d; l < i; l++)
                            if (e._ptr[l] = e._values.length, m)
                                for (c = 0; c < h; c++) e._values.push(o), e._index.push(c);
                        e._ptr[i] = e._values.length
                    } else i < d && (e._ptr.splice(i + 1, d - i), e._values.splice(e._ptr[i], e._values.length), e._index.splice(e._ptr[i], e._index.length));
                    if (d = i, n > h) {
                        if (m) {
                            var y = 0;
                            for (l = 0; l < d; l++) { e._ptr[l] = e._ptr[l] + y, p = e._ptr[l + 1] + y; var g = 0; for (c = h; c < n; c++, g++) e._values.splice(p + g, 0, o), e._index.splice(p + g, 0, c), y++ }
                            e._ptr[d] = e._values.length
                        }
                    } else if (n < h) {
                        var v = 0;
                        for (l = 0; l < d; l++) {
                            e._ptr[l] = e._ptr[l] - v;
                            var x = e._ptr[l],
                                b = e._ptr[l + 1] - v;
                            for (p = x; p < b; p++)(c = e._index[p]) > n - 1 && (e._values.splice(p, 1), e._index.splice(p, 1), v++)
                        }
                        e._ptr[l] = e._values.length
                    }
                    return e._size[0] = n, e._size[1] = i, e
                }

                function v(e, t, r, n, i) {
                    var a, o, s = n[0],
                        u = n[1],
                        c = [];
                    for (a = 0; a < s; a++)
                        for (c[a] = [], o = 0; o < u; o++) c[a][o] = 0;
                    for (o = 0; o < u; o++)
                        for (var f = r[o], l = r[o + 1], p = f; p < l; p++) c[a = t[p]][o] = e ? i ? Ge(e[p]) : e[p] : 1;
                    return c
                }
                return i.prototype = new n, i.prototype.createSparseMatrix = function(e, t) { return new i(e, t) }, i.prototype.type = "SparseMatrix", i.prototype.isSparseMatrix = !0, i.prototype.getDataType = function() { return Le(this._values, H) }, i.prototype.storage = function() { return "sparse" }, i.prototype.datatype = function() { return this._datatype }, i.prototype.create = function(e, t) { return new i(e, t) }, i.prototype.density = function() {
                    var e = this._size[0],
                        t = this._size[1];
                    return 0 !== e && 0 !== t ? this._index.length / (e * t) : 0
                }, i.prototype.subset = function(e, t, r) {
                    if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
                    switch (arguments.length) {
                        case 1:
                            return u(this, e);
                        case 2:
                        case 3:
                            return c(this, e, t, r);
                        default:
                            throw new SyntaxError("Wrong number of arguments")
                    }
                }, i.prototype.get = function(e) {
                    if (!l(e)) throw new TypeError("Array expected");
                    if (e.length !== this._size.length) throw new Me(e.length, this._size.length);
                    if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
                    var t = e[0],
                        r = e[1];
                    Oe(t, this._size[0]), Oe(r, this._size[1]);
                    var n = h(t, this._ptr[r], this._ptr[r + 1], this._index);
                    return n < this._ptr[r + 1] && this._index[n] === t ? this._values[n] : 0
                }, i.prototype.set = function(e, n, i) {
                    if (!l(e)) throw new TypeError("Array expected");
                    if (e.length !== this._size.length) throw new Me(e.length, this._size.length);
                    if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
                    var a = e[0],
                        o = e[1],
                        s = this._size[0],
                        u = this._size[1],
                        c = r,
                        p = 0;
                    f(this._datatype) && (c = t.find(r, [this._datatype, this._datatype]) || r, p = t.convert(0, this._datatype)), (a > s - 1 || o > u - 1) && (y(this, Math.max(a + 1, s), Math.max(o + 1, u), i), s = this._size[0], u = this._size[1]), Oe(a, s), Oe(o, u);
                    var m = h(a, this._ptr[o], this._ptr[o + 1], this._index);
                    return m < this._ptr[o + 1] && this._index[m] === a ? c(n, p) ? function(e, t, r, n, i) { r.splice(e, 1), n.splice(e, 1); for (var a = t + 1; a < i.length; a++) i[a]-- }(m, o, this._values, this._index, this._ptr) : this._values[m] = n : d(m, a, o, n, this._values, this._index, this._ptr), this
                }, i.prototype.resize = function(e, t, r) { if (!m(e)) throw new TypeError("Array or Matrix expected"); var n = e.valueOf().map((function(e) { return Array.isArray(e) && 1 === e.length ? e[0] : e })); if (2 !== n.length) throw new Error("Only two dimensions matrix are supported"); return n.forEach((function(e) { if (!a(e) || !V(e) || e < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + xe(n) + ")") })), y(r ? this.clone() : this, n[0], n[1], t) }, i.prototype.reshape = function(e, t) {
                    if (!l(e)) throw new TypeError("Array expected");
                    if (2 !== e.length) throw new Error("Sparse matrices can only be reshaped in two dimensions");
                    e.forEach((function(t) { if (!a(t) || !V(t) || t <= -2 || 0 === t) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + xe(e) + ")") }));
                    var r = this._size[0] * this._size[1];
                    if (r !== (e = Te(e, r))[0] * e[1]) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
                    var n = t ? this.clone() : this;
                    if (this._size[0] === e[0] && this._size[1] === e[1]) return n;
                    for (var i = [], o = 0; o < n._ptr.length; o++)
                        for (var s = 0; s < n._ptr[o + 1] - n._ptr[o]; s++) i.push(o);
                    for (var u = n._values.slice(), c = n._index.slice(), f = 0; f < n._index.length; f++) {
                        var p = c[f],
                            m = i[f],
                            y = p * n._size[1] + m;
                        i[f] = y % e[1], c[f] = Math.floor(y / e[1])
                    }
                    n._values.length = 0, n._index.length = 0, n._ptr.length = e[1] + 1, n._size = e.slice();
                    for (var g = 0; g < n._ptr.length; g++) n._ptr[g] = 0;
                    for (var v = 0; v < u.length; v++) {
                        var x = c[v],
                            b = i[v],
                            w = u[v];
                        d(h(x, n._ptr[b], n._ptr[b + 1], n._index), x, b, w, n._values, n._index, n._ptr)
                    }
                    return n
                }, i.prototype.clone = function() { return new i({ values: this._values ? Ge(this._values) : void 0, index: Ge(this._index), ptr: Ge(this._ptr), size: Ge(this._size), datatype: this._datatype }) }, i.prototype.size = function() { return this._size.slice(0) }, i.prototype.map = function(e, n) {
                    if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
                    var a = this;
                    return function(e, n, a, o, s, u, c) {
                        var l = [],
                            p = [],
                            m = [],
                            h = r,
                            d = 0;
                        f(e._datatype) && (h = t.find(r, [e._datatype, e._datatype]) || r, d = t.convert(0, e._datatype));
                        for (var y = function(e, t, r) { e = u(e, t, r), h(e, d) || (l.push(e), p.push(t)) }, g = o; g <= s; g++) {
                            m.push(l.length);
                            var v = e._ptr[g],
                                x = e._ptr[g + 1];
                            if (c)
                                for (var b = v; b < x; b++) {
                                    var w = e._index[b];
                                    w >= n && w <= a && y(e._values[b], w - n, g - o)
                                } else {
                                    for (var N = {}, M = v; M < x; M++) {
                                        var S = e._index[M];
                                        N[S] = e._values[M]
                                    }
                                    for (var E = n; E <= a; E++) {
                                        var A = E in N ? N[E] : 0;
                                        y(A, E - n, g - o)
                                    }
                                }
                        }
                        return m.push(l.length), new i({ values: l, index: p, ptr: m, size: [a - n + 1, s - o + 1] })
                    }(this, 0, this._size[0] - 1, 0, this._size[1] - 1, (function(t, r, n) { return e(t, [r, n], a) }), n)
                }, i.prototype.forEach = function(e, t) {
                    if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
                    for (var r = this._size[0], n = this._size[1], i = 0; i < n; i++) {
                        var a = this._ptr[i],
                            o = this._ptr[i + 1];
                        if (t)
                            for (var s = a; s < o; s++) {
                                var u = this._index[s];
                                e(this._values[s], [u, i], this)
                            } else { for (var c = {}, f = a; f < o; f++) { c[this._index[f]] = this._values[f] } for (var l = 0; l < r; l++) { e(l in c ? c[l] : 0, [l, i], this) } }
                    }
                }, i.prototype.toArray = function() { return v(this._values, this._index, this._ptr, this._size, !0) }, i.prototype.valueOf = function() { return v(this._values, this._index, this._ptr, this._size, !1) }, i.prototype.format = function(e) {
                    for (var t = this._size[0], r = this._size[1], n = this.density(), i = "Sparse Matrix [" + xe(t, e) + " x " + xe(r, e) + "] density: " + xe(n, e) + "\n", a = 0; a < r; a++)
                        for (var o = this._ptr[a], s = this._ptr[a + 1], u = o; u < s; u++) { i += "\n    (" + xe(this._index[u], e) + ", " + xe(a, e) + ") ==> " + (this._values ? xe(this._values[u], e) : "X") }
                    return i
                }, i.prototype.toString = function() { return xe(this.toArray()) }, i.prototype.toJSON = function() { return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype } }, i.prototype.diagonal = function(e) {
                    if (e) { if (o(e) && (e = e.toNumber()), !a(e) || !V(e)) throw new TypeError("The parameter k must be an integer number") } else e = 0;
                    var t = e > 0 ? e : 0,
                        r = e < 0 ? -e : 0,
                        n = this._size[0],
                        s = this._size[1],
                        u = Math.min(n - r, s - t),
                        c = [],
                        f = [],
                        l = [];
                    l[0] = 0;
                    for (var p = t; p < s && c.length < u; p++)
                        for (var m = this._ptr[p], h = this._ptr[p + 1], d = m; d < h; d++) { var y = this._index[d]; if (y === p - t + r) { c.push(this._values[d]), f[c.length - 1] = y - r; break } }
                    return l.push(c.length), new i({ values: c, index: f, ptr: l, size: [u, 1] })
                }, i.fromJSON = function(e) { return new i(e) }, i.diagonal = function(e, n, s, u, c) {
                    if (!l(e)) throw new TypeError("Array expected, size parameter");
                    if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");
                    if (e = e.map((function(e) { if (o(e) && (e = e.toNumber()), !a(e) || !V(e) || e < 1) throw new Error("Size values must be positive integers"); return e })), s) { if (o(s) && (s = s.toNumber()), !a(s) || !V(s)) throw new TypeError("The parameter k must be an integer number") } else s = 0;
                    var m = r,
                        h = 0;
                    f(c) && (m = t.find(r, [c, c]) || r, h = t.convert(0, c));
                    var d, y = s > 0 ? s : 0,
                        g = s < 0 ? -s : 0,
                        v = e[0],
                        x = e[1],
                        b = Math.min(v - g, x - y);
                    if (l(n)) {
                        if (n.length !== b) throw new Error("Invalid value array length");
                        d = function(e) { return n[e] }
                    } else if (p(n)) {
                        var w = n.size();
                        if (1 !== w.length || w[0] !== b) throw new Error("Invalid matrix length");
                        d = function(e) { return n.get([e]) }
                    } else d = function() { return n };
                    for (var N = [], M = [], S = [], E = 0; E < x; E++) {
                        S.push(N.length);
                        var A = E - y;
                        if (A >= 0 && A < b) {
                            var O = d(A);
                            m(O, h) || (M.push(A + g), N.push(O))
                        }
                    }
                    return S.push(N.length), new i({ values: N, index: M, ptr: S, size: [v, x] })
                }, i.prototype.swapRows = function(e, t) { if (!(a(e) && V(e) && a(t) && V(t))) throw new Error("Row index must be positive integers"); if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported"); return Oe(e, this._size[0]), Oe(t, this._size[0]), i._swapRows(e, t, this._size[1], this._values, this._index, this._ptr), this }, i._forEachRow = function(e, t, r, n, i) { for (var a = n[e], o = n[e + 1], s = a; s < o; s++) i(r[s], t[s]) }, i._swapRows = function(e, t, r, n, i, a) {
                    for (var o = 0; o < r; o++) {
                        var s = a[o],
                            u = a[o + 1],
                            c = h(e, s, u, i),
                            f = h(t, s, u, i);
                        if (c < u && f < u && i[c] === e && i[f] === t) {
                            if (n) {
                                var l = n[c];
                                n[c] = n[f], n[f] = l
                            }
                        } else if (c < u && i[c] === e && (f >= u || i[f] !== t)) {
                            var p = n ? n[c] : void 0;
                            i.splice(f, 0, t), n && n.splice(f, 0, p), i.splice(f <= c ? c + 1 : c, 1), n && n.splice(f <= c ? c + 1 : c, 1)
                        } else if (f < u && i[f] === t && (c >= u || i[c] !== e)) {
                            var m = n ? n[f] : void 0;
                            i.splice(c, 0, e), n && n.splice(c, 0, m), i.splice(c <= f ? f + 1 : f, 1), n && n.splice(c <= f ? f + 1 : f, 1)
                        }
                    }
                }, i
            }), { isClass: !0 }));
        var Ht = Ke("number", ["typed"], (function(e) {
                var t = (0, e.typed)("number", {
                    "": function() { return 0 },
                    number: function(e) { return e },
                    string: function(e) {
                        if ("NaN" === e) return NaN;
                        var t, r, n = (r = (t = e).match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/)) ? { input: t, radix: { "0b": 2, "0o": 8, "0x": 16 }[r[1]], integerPart: r[2], fractionalPart: r[3] } : null;
                        if (n) return function(e) { for (var t = parseInt(e.integerPart, e.radix), r = 0, n = 0; n < e.fractionalPart.length; n++) { r += parseInt(e.fractionalPart[n], e.radix) / Math.pow(e.radix, n + 1) } var i = t + r; if (isNaN(i)) throw new SyntaxError('String "' + e.input + '" is no valid number'); return i }(n);
                        var i = 0,
                            a = e.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
                        a && (i = Number(a[2]), e = a[1]);
                        var o = Number(e);
                        if (isNaN(o)) throw new SyntaxError('String "' + e + '" is no valid number');
                        if (a) {
                            if (o > Math.pow(2, i) - 1) throw new SyntaxError('String "'.concat(e, '" is out of range'));
                            o >= Math.pow(2, i - 1) && (o -= Math.pow(2, i))
                        }
                        return o
                    },
                    BigNumber: function(e) { return e.toNumber() },
                    Fraction: function(e) { return e.valueOf() },
                    Unit: function(e) { throw new Error("Second argument with valueless unit expected") },
                    null: function(e) { return 0 },
                    "Unit, string | Unit": function(e, t) { return e.toNumber(t) },
                    "Array | Matrix": function(e) { return St(e, this) }
                });
                return t.fromJSON = function(e) { return parseFloat(e.value) }, t
            })),
            $t = Ke("string", ["typed"], (function(e) { return (0, e.typed)("string", { "": function() { return "" }, number: ee, null: function(e) { return "null" }, boolean: function(e) { return e + "" }, string: function(e) { return e }, "Array | Matrix": function(e) { return St(e, this) }, any: function(e) { return String(e) } }) })),
            Gt = Ke("boolean", ["typed"], (function(e) { return (0, e.typed)("boolean", { "": function() { return !1 }, boolean: function(e) { return e }, number: function(e) { return !!e }, null: function(e) { return !1 }, BigNumber: function(e) { return !e.isZero() }, string: function(e) { var t = e.toLowerCase(); if ("true" === t) return !0; if ("false" === t) return !1; var r = Number(e); if ("" !== e && !isNaN(r)) return !!r; throw new Error('Cannot convert "' + e + '" to a boolean') }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Vt = Ke("bignumber", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("bignumber", {
                    "": function() { return new r(0) },
                    number: function(e) { return new r(e + "") },
                    string: function(e) {
                        var t = e.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
                        if (t) {
                            var n = t[2],
                                i = r(t[1]),
                                a = new r(2).pow(Number(n));
                            if (i.gt(a.sub(1))) throw new SyntaxError('String "'.concat(e, '" is out of range'));
                            var o = new r(2).pow(Number(n) - 1);
                            return i.gte(o) ? i.sub(a) : i
                        }
                        return new r(e)
                    },
                    BigNumber: function(e) { return e },
                    Fraction: function(e) { return new r(e.n).div(e.d).times(e.s) },
                    null: function(e) { return new r(0) },
                    "Array | Matrix": function(e) { return St(e, this) }
                })
            })),
            Zt = Ke("complex", ["typed", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.Complex;
                return t("complex", { "": function() { return r.ZERO }, number: function(e) { return new r(e, 0) }, "number, number": function(e, t) { return new r(e, t) }, "BigNumber, BigNumber": function(e, t) { return new r(e.toNumber(), t.toNumber()) }, Fraction: function(e) { return new r(e.valueOf(), 0) }, Complex: function(e) { return e.clone() }, string: function(e) { return r(e) }, null: function(e) { return r(0) }, Object: function(e) { if ("re" in e && "im" in e) return new r(e.re, e.im); if ("r" in e && "phi" in e || "abs" in e && "arg" in e) return new r(e); throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)") }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Wt = Ke("fraction", ["typed", "Fraction"], (function(e) {
                var t = e.typed,
                    r = e.Fraction;
                return t("fraction", { number: function(e) { if (!isFinite(e) || isNaN(e)) throw new Error(e + " cannot be represented as a fraction"); return new r(e) }, string: function(e) { return new r(e) }, "number, number": function(e, t) { return new r(e, t) }, null: function(e) { return new r(0) }, BigNumber: function(e) { return new r(e.toString()) }, Fraction: function(e) { return e }, Object: function(e) { return new r(e) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Jt = Ke("matrix", ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], (function(e) {
                var t = e.typed,
                    r = (e.Matrix, e.DenseMatrix),
                    n = e.SparseMatrix;
                return t("matrix", { "": function() { return i([]) }, string: function(e) { return i([], e) }, "string, string": function(e, t) { return i([], e, t) }, Array: function(e) { return i(e) }, Matrix: function(e) { return i(e, e.storage()) }, "Array | Matrix, string": i, "Array | Matrix, string, string": i });

                function i(e, t, i) { if ("dense" === t || "default" === t || void 0 === t) return new r(e, i); if ("sparse" === t) return new n(e, i); throw new TypeError("Unknown matrix type " + JSON.stringify(t) + ".") }
            })),
            Yt = Ke("splitUnit", ["typed"], (function(e) { return (0, e.typed)("splitUnit", { "Unit, Array": function(e, t) { return e.splitUnit(t) } }) })),
            Xt = "number, number";

        function Qt(e) { return Math.abs(e) }

        function Kt(e, t) { return e + t }

        function er(e, t) { return e * t }

        function tr(e) { return -e }

        function rr(e) { return e }

        function nr(e) { return X(e) }

        function ir(e) { return Math.ceil(e) }

        function ar(e) { return e * e * e }

        function or(e) { return Math.exp(e) }

        function sr(e) { return Q(e) }

        function ur(e, t) { if (!V(e) || !V(t)) throw new Error("Parameters in function gcd must be integer numbers"); for (var r; 0 !== t;) r = e % t, e = t, t = r; return e < 0 ? -e : e }

        function cr(e, t) { if (!V(e) || !V(t)) throw new Error("Parameters in function lcm must be integer numbers"); if (0 === e || 0 === t) return 0; for (var r, n = e * t; 0 !== t;) t = e % (r = t), e = r; return Math.abs(n / e) }

        function fr(e) { return Math.log(e) }

        function lr(e) { return J(e) }

        function pr(e) { return W(e) }

        function mr(e, t) { if (t > 0) return e - t * Math.floor(e / t); if (0 === t) return e; throw new Error("Cannot calculate mod for a negative divisor") }

        function hr(e, t) { var r = t < 0; if (r && (t = -t), 0 === t) throw new Error("Root must be non-zero"); if (e < 0 && Math.abs(t) % 2 != 1) throw new Error("Root must be odd when a is negative."); if (0 === e) return r ? 1 / 0 : 0; if (!isFinite(e)) return r ? 0 : e; var n = Math.pow(Math.abs(e), 1 / t); return n = e < 0 ? -n : n, r ? 1 / n : n }

        function dr(e) { return Z(e) }

        function yr(e) { return e * e }

        function gr(e, t) {
            var r, n, i, a = 0,
                o = 1,
                s = 1,
                u = 0;
            if (!V(e) || !V(t)) throw new Error("Parameters in function xgcd must be integer numbers");
            for (; t;) i = e - (n = Math.floor(e / t)) * t, r = a, a = o - n * a, o = r, r = s, s = u - n * s, u = r, e = t, t = i;
            return e < 0 ? [-e, -o, -u] : [e, e ? o : 0, u]
        }

        function vr(e, t) { return e * e < 1 && t === 1 / 0 || e * e > 1 && t === -1 / 0 ? 0 : Math.pow(e, t) }

        function xr(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0; return parseFloat(re(e, t)) }
        Qt.signature = "number", Kt.signature = Xt, er.signature = Xt, tr.signature = "number", rr.signature = "number", nr.signature = "number", ir.signature = "number", ar.signature = "number", or.signature = "number", sr.signature = "number", ur.signature = Xt, cr.signature = Xt, fr.signature = "number", lr.signature = "number", pr.signature = "number", mr.signature = Xt, hr.signature = Xt, dr.signature = "number", yr.signature = "number", gr.signature = Xt, vr.signature = Xt, xr.signature = Xt;
        var br = Ke("unaryMinus", ["typed"], (function(e) { return (0, e.typed)("unaryMinus", { number: tr, Complex: function(e) { return e.neg() }, BigNumber: function(e) { return e.neg() }, Fraction: function(e) { return e.neg() }, Unit: function(e) { var t = e.clone(); return t.value = this(e.value), t }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            wr = Ke("unaryPlus", ["typed", "config", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.BigNumber;
                return t("unaryPlus", { number: rr, Complex: function(e) { return e }, BigNumber: function(e) { return e }, Fraction: function(e) { return e }, Unit: function(e) { return e.clone() }, "Array | Matrix": function(e) { return St(e, this, !0) }, "boolean | string": function(e) { return "BigNumber" === r.number ? new n(+e) : +e } })
            })),
            Nr = Ke("abs", ["typed"], (function(e) { return (0, e.typed)("abs", { number: Qt, Complex: function(e) { return e.abs() }, BigNumber: function(e) { return e.abs() }, Fraction: function(e) { return e.abs() }, "Array | Matrix": function(e) { return St(e, this, !0) }, Unit: function(e) { return e.abs() } }) })),
            Mr = Ke("apply", ["typed", "isInteger"], (function(e) {
                var t = e.typed,
                    r = e.isInteger;
                return t("apply", { "Array | Matrix, number | BigNumber, function": function(e, t, n) { if (!r(t)) throw new TypeError("Integer number expected for dimension"); var i = Array.isArray(e) ? Ee(e) : e.size(); if (t < 0 || t >= i.length) throw new Se(t, i.length); return p(e) ? e.create(Sr(e.valueOf(), t, n)) : Sr(e, t, n) } })
            }));

        function Sr(e, t, r) {
            var n, i, a;
            if (t <= 0) {
                if (Array.isArray(e[0])) {
                    for (a = function(e) {
                            var t, r, n = e.length,
                                i = e[0].length,
                                a = [];
                            for (r = 0; r < i; r++) {
                                var o = [];
                                for (t = 0; t < n; t++) o.push(e[t][r]);
                                a.push(o)
                            }
                            return a
                        }(e), i = [], n = 0; n < a.length; n++) i[n] = Sr(a[n], t - 1, r);
                    return i
                }
                return r(e)
            }
            for (i = [], n = 0; n < e.length; n++) i[n] = Sr(e[n], t - 1, r);
            return i
        }
        var Er = Ke("addScalar", ["typed"], (function(e) { return (0, e.typed)("addScalar", { "number, number": Kt, "Complex, Complex": function(e, t) { return e.add(t) }, "BigNumber, BigNumber": function(e, t) { return e.plus(t) }, "Fraction, Fraction": function(e, t) { return e.add(t) }, "Unit, Unit": function(e, t) { if (null === e.value || void 0 === e.value) throw new Error("Parameter x contains a unit with undefined value"); if (null === t.value || void 0 === t.value) throw new Error("Parameter y contains a unit with undefined value"); if (!e.equalBase(t)) throw new Error("Units do not match"); var r = e.clone(); return r.value = this(r.value, t.value), r.fixPrefix = !1, r } }) })),
            Ar = Ke("cbrt", ["config", "typed", "isNegative", "unaryMinus", "matrix", "Complex", "BigNumber", "Fraction"], (function(e) {
                var t = e.config,
                    r = e.typed,
                    n = e.isNegative,
                    i = e.unaryMinus,
                    a = e.matrix,
                    c = e.Complex,
                    f = e.BigNumber,
                    l = e.Fraction;
                return r("cbrt", {
                    number: nr,
                    Complex: p,
                    "Complex, boolean": p,
                    BigNumber: function(e) { return e.cbrt() },
                    Unit: function(e) {
                        if (e.value && s(e.value)) { var t = e.clone(); return t.value = 1, (t = t.pow(1 / 3)).value = p(e.value), t }
                        var r, a = n(e.value);
                        a && (e.value = i(e.value)), r = o(e.value) ? new f(1).div(3) : u(e.value) ? new l(1, 3) : 1 / 3;
                        var c = e.pow(r);
                        return a && (c.value = i(c.value)), c
                    },
                    "Array | Matrix": function(e) { return St(e, this, !0) }
                });

                function p(e, r) {
                    var n = e.arg() / 3,
                        i = e.abs(),
                        o = new c(nr(i), 0).mul(new c(0, n).exp());
                    if (r) { var s = [o, new c(nr(i), 0).mul(new c(0, n + 2 * Math.PI / 3).exp()), new c(nr(i), 0).mul(new c(0, n - 2 * Math.PI / 3).exp())]; return "Array" === t.matrix ? s : a(s) }
                    return o
                }
            })),
            Or = Ke("algorithm11", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i, a) {
                    var o = e._values,
                        s = e._index,
                        u = e._ptr,
                        c = e._size,
                        f = e._datatype;
                    if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
                    var l, p = c[0],
                        m = c[1],
                        h = r,
                        d = 0,
                        y = i;
                    "string" == typeof f && (l = f, h = t.find(r, [l, l]), d = t.convert(0, l), n = t.convert(n, l), y = t.find(i, [l, l]));
                    for (var g = [], v = [], x = [], b = 0; b < m; b++) {
                        x[b] = v.length;
                        for (var w = u[b], N = u[b + 1], M = w; M < N; M++) {
                            var S = s[M],
                                E = a ? y(n, o[M]) : y(o[M], n);
                            h(E, d) || (v.push(S), g.push(E))
                        }
                    }
                    return x[m] = v.length, e.createSparseMatrix({ values: g, index: v, ptr: x, size: [p, m], datatype: l })
                }
            })),
            Cr = Ke("algorithm14", ["typed"], (function(e) {
                var t = e.typed;
                return function(e, r, n, i) {
                    var a, o = e._data,
                        s = e._size,
                        u = e._datatype,
                        c = n;
                    "string" == typeof u && (a = u, r = t.convert(r, a), c = t.find(n, [a, a]));
                    var f = s.length > 0 ? function e(t, r, n, i, a, o, s) {
                        var u = [];
                        if (r === n.length - 1)
                            for (var c = 0; c < i; c++) u[c] = s ? t(o, a[c]) : t(a[c], o);
                        else
                            for (var f = 0; f < i; f++) u[f] = e(t, r + 1, n, n[r + 1], a[f], o, s);
                        return u
                    }(c, 0, s, s[0], o, r, i) : [];
                    return e.createDenseMatrix({ data: f, size: Ge(s), datatype: a })
                }
            }));

        function _r(e, t) {
            return function(e) { if (Array.isArray(e)) return e }(e) || function(e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
                var r = [],
                    n = !0,
                    i = !1,
                    a = void 0;
                try { for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0); } catch (e) { i = !0, a = e } finally { try { n || null == s.return || s.return() } finally { if (i) throw a } }
                return r
            }(e, t) || function(e, t) { if (!e) return; if ("string" == typeof e) return Tr(e, t); var r = Object.prototype.toString.call(e).slice(8, -1); "Object" === r && e.constructor && (r = e.constructor.name); if ("Map" === r || "Set" === r) return Array.from(e); if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Tr(e, t) }(e, t) || function() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }()
        }

        function Tr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }
        var zr = Ke("ceil", ["typed", "config", "round", "matrix", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.round,
                    i = e.matrix,
                    a = e.equalScalar,
                    o = Or({ typed: t, equalScalar: a }),
                    s = Cr({ typed: t });
                return t("ceil", {
                    number: function(e) { return se(e, n(e), r.epsilon) ? n(e) : ir(e) },
                    "number, number": function(e, t) {
                        if (se(e, n(e, t), r.epsilon)) return n(e, t);
                        var i = _r("".concat(e, "e").split("e"), 2),
                            a = i[0],
                            o = i[1],
                            s = Math.ceil(Number("".concat(a, "e").concat(Number(o) + t))),
                            u = _r("".concat(s, "e").split("e"), 2);
                        return a = u[0], o = u[1], Number("".concat(a, "e").concat(Number(o) - t))
                    },
                    Complex: function(e) { return e.ceil() },
                    "Complex, number": function(e, t) { return e.ceil(t) },
                    BigNumber: function(e) { return Ut(e, n(e), r.epsilon) ? n(e) : e.ceil() },
                    "BigNumber, BigNumber": function(e, t) { return Ut(e, n(e, t), r.epsilon) ? n(e, t) : e.toDecimalPlaces(t.toNumber(), ct.a.ROUND_CEIL) },
                    Fraction: function(e) { return e.ceil() },
                    "Fraction, number": function(e, t) { return e.ceil(t) },
                    "Array | Matrix": function(e) { return St(e, this, !0) },
                    "Array | Matrix, number": function(e, t) { var r = this; return St(e, (function(e) { return r(e, t) }), !0) },
                    "SparseMatrix, number | BigNumber": function(e, t) { return o(e, t, this, !1) },
                    "DenseMatrix, number | BigNumber": function(e, t) { return s(e, t, this, !1) },
                    "number | Complex | BigNumber, Array": function(e, t) { return s(i(t), e, this, !0).valueOf() }
                })
            })),
            qr = Ke("cube", ["typed"], (function(e) { return (0, e.typed)("cube", { number: ar, Complex: function(e) { return e.mul(e).mul(e) }, BigNumber: function(e) { return e.times(e).times(e) }, Fraction: function(e) { return e.pow(3) }, "Array | Matrix": function(e) { return St(e, this, !0) }, Unit: function(e) { return e.pow(3) } }) })),
            Ir = Ke("exp", ["typed"], (function(e) { return (0, e.typed)("exp", { number: or, Complex: function(e) { return e.exp() }, BigNumber: function(e) { return e.exp() }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Br = Ke("expm1", ["typed", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.Complex;
                return t("expm1", { number: sr, Complex: function(e) { var t = Math.exp(e.re); return new r(t * Math.cos(e.im) - 1, t * Math.sin(e.im)) }, BigNumber: function(e) { return e.exp().minus(1) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            kr = Ke("fix", ["typed", "Complex", "matrix", "ceil", "floor"], (function(e) {
                var t = e.typed,
                    r = e.Complex,
                    n = e.matrix,
                    i = e.ceil,
                    a = e.floor,
                    o = Cr({ typed: t });
                return t("fix", { number: function(e) { return e > 0 ? a(e) : i(e) }, "number, number | BigNumber": function(e, t) { return e > 0 ? a(e, t) : i(e, t) }, Complex: function(e) { return new r(e.re > 0 ? Math.floor(e.re) : Math.ceil(e.re), e.im > 0 ? Math.floor(e.im) : Math.ceil(e.im)) }, "Complex, number | BigNumber": function(e, t) { return new r(e.re > 0 ? a(e.re, t) : i(e.re, t), e.im > 0 ? a(e.im, t) : i(e.im, t)) }, BigNumber: function(e) { return e.isNegative() ? i(e) : a(e) }, "BigNumber, number | BigNumber": function(e, t) { return e.isNegative() ? i(e, t) : a(e, t) }, Fraction: function(e) { return e.s < 0 ? e.ceil() : e.floor() }, "Fraction, number | BigNumber": function(e, t) { return e.s < 0 ? e.ceil(t) : e.floor(t) }, "Array | Matrix": function(e) { return St(e, this, !0) }, "Array | Matrix, number | BigNumber": function(e, t) { var r = this; return St(e, (function(e) { return r(e, t) }), !0) }, "number | Complex | BigNumber, Array": function(e, t) { return o(n(t), e, this, !0).valueOf() } })
            }));

        function Dr(e, t) {
            return function(e) { if (Array.isArray(e)) return e }(e) || function(e, t) {
                if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
                var r = [],
                    n = !0,
                    i = !1,
                    a = void 0;
                try { for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0); } catch (e) { i = !0, a = e } finally { try { n || null == s.return || s.return() } finally { if (i) throw a } }
                return r
            }(e, t) || function(e, t) { if (!e) return; if ("string" == typeof e) return Rr(e, t); var r = Object.prototype.toString.call(e).slice(8, -1); "Object" === r && e.constructor && (r = e.constructor.name); if ("Map" === r || "Set" === r) return Array.from(e); if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Rr(e, t) }(e, t) || function() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }()
        }

        function Rr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }
        var Pr = Ke("floor", ["typed", "config", "round", "matrix", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.round,
                    i = e.matrix,
                    a = e.equalScalar,
                    o = Or({ typed: t, equalScalar: a }),
                    s = Cr({ typed: t });
                return t("floor", {
                    number: function(e) { return se(e, n(e), r.epsilon) ? n(e) : Math.floor(e) },
                    "number, number": function(e, t) {
                        if (se(e, n(e, t), r.epsilon)) return n(e, t);
                        var i = Dr("".concat(e, "e").split("e"), 2),
                            a = i[0],
                            o = i[1],
                            s = Math.floor(Number("".concat(a, "e").concat(Number(o) + t))),
                            u = Dr("".concat(s, "e").split("e"), 2);
                        return a = u[0], o = u[1], Number("".concat(a, "e").concat(Number(o) - t))
                    },
                    Complex: function(e) { return e.floor() },
                    "Complex, number": function(e, t) { return e.floor(t) },
                    BigNumber: function(e) { return Ut(e, n(e), r.epsilon) ? n(e) : e.floor() },
                    "BigNumber, BigNumber": function(e, t) { return Ut(e, n(e, t), r.epsilon) ? n(e, t) : e.toDecimalPlaces(t.toNumber(), ct.a.ROUND_FLOOR) },
                    Fraction: function(e) { return e.floor() },
                    "Fraction, number": function(e, t) { return e.floor(t) },
                    "Array | Matrix": function(e) { return St(e, this, !0) },
                    "Array | Matrix, number": function(e, t) { var r = this; return St(e, (function(e) { return r(e, t) }), !0) },
                    "SparseMatrix, number | BigNumber": function(e, t) { return o(e, t, this, !1) },
                    "DenseMatrix, number | BigNumber": function(e, t) { return s(e, t, this, !1) },
                    "number | Complex | BigNumber, Array": function(e, t) { return s(i(t), e, this, !0).valueOf() }
                })
            })),
            jr = Ke("algorithm01", ["typed"], (function(e) {
                var t = e.typed;
                return function(e, r, n, i) {
                    var a = e._data,
                        o = e._size,
                        s = e._datatype,
                        u = r._values,
                        c = r._index,
                        f = r._ptr,
                        l = r._size,
                        p = r._datatype;
                    if (o.length !== l.length) throw new Me(o.length, l.length);
                    if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
                    if (!u) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
                    var m, h, d = o[0],
                        y = o[1],
                        g = "string" == typeof s && s === p ? s : void 0,
                        v = g ? t.find(n, [g, g]) : n,
                        x = [];
                    for (m = 0; m < d; m++) x[m] = [];
                    var b = [],
                        w = [];
                    for (h = 0; h < y; h++) { for (var N = h + 1, M = f[h], S = f[h + 1], E = M; E < S; E++) b[m = c[E]] = i ? v(u[E], a[m][h]) : v(a[m][h], u[E]), w[m] = N; for (m = 0; m < d; m++) w[m] === N ? x[m][h] = b[m] : x[m][h] = a[m][h] }
                    return e.createDenseMatrix({ data: x, size: [d, y], datatype: g })
                }
            })),
            Ur = Ke("algorithm04", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i) {
                    var a = e._values,
                        o = e._index,
                        s = e._ptr,
                        u = e._size,
                        c = e._datatype,
                        f = n._values,
                        l = n._index,
                        p = n._ptr,
                        m = n._size,
                        h = n._datatype;
                    if (u.length !== m.length) throw new Me(u.length, m.length);
                    if (u[0] !== m[0] || u[1] !== m[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + m + ")");
                    var d, y = u[0],
                        g = u[1],
                        v = r,
                        x = 0,
                        b = i;
                    "string" == typeof c && c === h && (d = c, v = t.find(r, [d, d]), x = t.convert(0, d), b = t.find(i, [d, d]));
                    var w, N, M, S, E, A = a && f ? [] : void 0,
                        O = [],
                        C = [],
                        _ = a && f ? [] : void 0,
                        T = a && f ? [] : void 0,
                        z = [],
                        q = [];
                    for (N = 0; N < g; N++) {
                        C[N] = O.length;
                        var I = N + 1;
                        for (S = s[N], E = s[N + 1], M = S; M < E; M++) w = o[M], O.push(w), z[w] = I, _ && (_[w] = a[M]);
                        for (S = p[N], E = p[N + 1], M = S; M < E; M++)
                            if (z[w = l[M]] === I) {
                                if (_) {
                                    var B = b(_[w], f[M]);
                                    v(B, x) ? z[w] = null : _[w] = B
                                }
                            } else O.push(w), q[w] = I, T && (T[w] = f[M]);
                        if (_ && T)
                            for (M = C[N]; M < O.length;) z[w = O[M]] === I ? (A[M] = _[w], M++) : q[w] === I ? (A[M] = T[w], M++) : O.splice(M, 1)
                    }
                    return C[g] = O.length, e.createSparseMatrix({ values: A, index: O, ptr: C, size: [y, g], datatype: d })
                }
            })),
            Fr = Ke("algorithm10", ["typed", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.DenseMatrix;
                return function(e, n, i, a) {
                    var o = e._values,
                        s = e._index,
                        u = e._ptr,
                        c = e._size,
                        f = e._datatype;
                    if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
                    var l, p = c[0],
                        m = c[1],
                        h = i;
                    "string" == typeof f && (l = f, n = t.convert(n, l), h = t.find(i, [l, l]));
                    for (var d = [], y = [], g = [], v = 0; v < m; v++) {
                        for (var x = v + 1, b = u[v], w = u[v + 1], N = b; N < w; N++) {
                            var M = s[N];
                            y[M] = o[N], g[M] = x
                        }
                        for (var S = 0; S < p; S++) 0 === v && (d[S] = []), g[S] === x ? d[S][v] = a ? h(n, y[S]) : h(y[S], n) : d[S][v] = n
                    }
                    return new r({ data: d, size: [p, m], datatype: l })
                }
            })),
            Lr = Ke("algorithm13", ["typed"], (function(e) {
                var t = e.typed;
                return function(e, r, n) {
                    var i, a = e._data,
                        o = e._size,
                        s = e._datatype,
                        u = r._data,
                        c = r._size,
                        f = r._datatype,
                        l = [];
                    if (o.length !== c.length) throw new Me(o.length, c.length);
                    for (var p = 0; p < o.length; p++) {
                        if (o[p] !== c[p]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");
                        l[p] = o[p]
                    }
                    var m = n;
                    "string" == typeof s && s === f && (i = s, m = t.find(n, [i, i]));
                    var h = l.length > 0 ? function e(t, r, n, i, a, o) {
                        var s = [];
                        if (r === n.length - 1)
                            for (var u = 0; u < i; u++) s[u] = t(a[u], o[u]);
                        else
                            for (var c = 0; c < i; c++) s[c] = e(t, r + 1, n, n[r + 1], a[c], o[c]);
                        return s
                    }(m, 0, l, l[0], a, u) : [];
                    return e.createDenseMatrix({ data: h, size: l, datatype: i })
                }
            })),
            Hr = Ke("gcd", ["typed", "matrix", "equalScalar", "BigNumber", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.BigNumber,
                    a = e.DenseMatrix,
                    o = jr({ typed: t }),
                    s = Ur({ typed: t, equalScalar: n }),
                    u = Fr({ typed: t, DenseMatrix: a }),
                    c = Lr({ typed: t }),
                    f = Cr({ typed: t });
                return t("gcd", {
                    "number, number": ur,
                    "BigNumber, BigNumber": function(e, t) {
                        if (!e.isInt() || !t.isInt()) throw new Error("Parameters in function gcd must be integer numbers");
                        var r = new i(0);
                        for (; !t.isZero();) {
                            var n = e.mod(t);
                            e = t, t = n
                        }
                        return e.lt(r) ? e.neg() : e
                    },
                    "Fraction, Fraction": function(e, t) { return e.gcd(t) },
                    "SparseMatrix, SparseMatrix": function(e, t) { return s(e, t, this) },
                    "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, this, !0) },
                    "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, this, !1) },
                    "DenseMatrix, DenseMatrix": function(e, t) { return c(e, t, this) },
                    "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() },
                    "Array, Matrix": function(e, t) { return this(r(e), t) },
                    "Matrix, Array": function(e, t) { return this(e, r(t)) },
                    "SparseMatrix, number | BigNumber": function(e, t) { return u(e, t, this, !1) },
                    "DenseMatrix, number | BigNumber": function(e, t) { return f(e, t, this, !1) },
                    "number | BigNumber, SparseMatrix": function(e, t) { return u(t, e, this, !0) },
                    "number | BigNumber, DenseMatrix": function(e, t) { return f(t, e, this, !0) },
                    "Array, number | BigNumber": function(e, t) { return f(r(e), t, this, !1).valueOf() },
                    "number | BigNumber, Array": function(e, t) { return f(r(t), e, this, !0).valueOf() },
                    "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function(e, t, r) { for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]); return n }
                })
            })),
            $r = Ke("algorithm02", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i, a) {
                    var o = e._data,
                        s = e._size,
                        u = e._datatype,
                        c = n._values,
                        f = n._index,
                        l = n._ptr,
                        p = n._size,
                        m = n._datatype;
                    if (s.length !== p.length) throw new Me(s.length, p.length);
                    if (s[0] !== p[0] || s[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + p + ")");
                    if (!c) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
                    var h, d = s[0],
                        y = s[1],
                        g = r,
                        v = 0,
                        x = i;
                    "string" == typeof u && u === m && (h = u, g = t.find(r, [h, h]), v = t.convert(0, h), x = t.find(i, [h, h]));
                    for (var b = [], w = [], N = [], M = 0; M < y; M++) {
                        N[M] = w.length;
                        for (var S = l[M], E = l[M + 1], A = S; A < E; A++) {
                            var O = f[A],
                                C = a ? x(c[A], o[O][M]) : x(o[O][M], c[A]);
                            g(C, v) || (w.push(O), b.push(C))
                        }
                    }
                    return N[y] = w.length, n.createSparseMatrix({ values: b, index: w, ptr: N, size: [d, y], datatype: h })
                }
            })),
            Gr = Ke("algorithm06", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i) {
                    var a = e._values,
                        o = e._size,
                        s = e._datatype,
                        u = n._values,
                        c = n._size,
                        f = n._datatype;
                    if (o.length !== c.length) throw new Me(o.length, c.length);
                    if (o[0] !== c[0] || o[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");
                    var l, p = o[0],
                        m = o[1],
                        h = r,
                        d = 0,
                        y = i;
                    "string" == typeof s && s === f && (l = s, h = t.find(r, [l, l]), d = t.convert(0, l), y = t.find(i, [l, l]));
                    for (var g = a && u ? [] : void 0, v = [], x = [], b = g ? [] : void 0, w = [], N = [], M = 0; M < m; M++) {
                        x[M] = v.length;
                        var S = M + 1;
                        if (Ot(e, M, w, b, N, S, v, y), Ot(n, M, w, b, N, S, v, y), b)
                            for (var E = x[M]; E < v.length;) {
                                var A = v[E];
                                if (N[A] === S) {
                                    var O = b[A];
                                    h(O, d) ? v.splice(E, 1) : (g.push(O), E++)
                                } else v.splice(E, 1)
                            } else
                                for (var C = x[M]; C < v.length;) { N[v[C]] !== S ? v.splice(C, 1) : C++ }
                    }
                    return x[m] = v.length, e.createSparseMatrix({ values: g, index: v, ptr: x, size: [p, m], datatype: l })
                }
            })),
            Vr = Ke("lcm", ["typed", "matrix", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = $r({ typed: t, equalScalar: n }),
                    a = Gr({ typed: t, equalScalar: n }),
                    o = Or({ typed: t, equalScalar: n }),
                    s = Lr({ typed: t }),
                    u = Cr({ typed: t });
                return t("lcm", {
                    "number, number": cr,
                    "BigNumber, BigNumber": function(e, t) {
                        if (!e.isInt() || !t.isInt()) throw new Error("Parameters in function lcm must be integer numbers");
                        if (e.isZero()) return e;
                        if (t.isZero()) return t;
                        var r = e.times(t);
                        for (; !t.isZero();) {
                            var n = t;
                            t = e.mod(n), e = n
                        }
                        return r.div(e).abs()
                    },
                    "Fraction, Fraction": function(e, t) { return e.lcm(t) },
                    "SparseMatrix, SparseMatrix": function(e, t) { return a(e, t, this) },
                    "SparseMatrix, DenseMatrix": function(e, t) { return i(t, e, this, !0) },
                    "DenseMatrix, SparseMatrix": function(e, t) { return i(e, t, this, !1) },
                    "DenseMatrix, DenseMatrix": function(e, t) { return s(e, t, this) },
                    "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() },
                    "Array, Matrix": function(e, t) { return this(r(e), t) },
                    "Matrix, Array": function(e, t) { return this(e, r(t)) },
                    "SparseMatrix, number | BigNumber": function(e, t) { return o(e, t, this, !1) },
                    "DenseMatrix, number | BigNumber": function(e, t) { return u(e, t, this, !1) },
                    "number | BigNumber, SparseMatrix": function(e, t) { return o(t, e, this, !0) },
                    "number | BigNumber, DenseMatrix": function(e, t) { return u(t, e, this, !0) },
                    "Array, number | BigNumber": function(e, t) { return u(r(e), t, this, !1).valueOf() },
                    "number | BigNumber, Array": function(e, t) { return u(r(t), e, this, !0).valueOf() },
                    "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function(e, t, r) { for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]); return n }
                })
            })),
            Zr = Ke("log10", ["typed", "config", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex;
                return t("log10", { number: function(e) { return e >= 0 || r.predictable ? lr(e) : new n(e, 0).log().div(Math.LN10) }, Complex: function(e) { return new n(e).log().div(Math.LN10) }, BigNumber: function(e) { return !e.isNegative() || r.predictable ? e.log() : new n(e.toNumber(), 0).log().div(Math.LN10) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Wr = Ke("log2", ["typed", "config", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex;
                return t("log2", { number: function(e) { return e >= 0 || r.predictable ? pr(e) : i(new n(e, 0)) }, Complex: i, BigNumber: function(e) { return !e.isNegative() || r.predictable ? e.log(2) : i(new n(e.toNumber(), 0)) }, "Array | Matrix": function(e) { return St(e, this) } });

                function i(e) { var t = Math.sqrt(e.re * e.re + e.im * e.im); return new n(Math.log2 ? Math.log2(t) : Math.log(t) / Math.LN2, Math.atan2(e.im, e.re) / Math.LN2) }
            })),
            Jr = Ke("algorithm03", ["typed"], (function(e) {
                var t = e.typed;
                return function(e, r, n, i) {
                    var a = e._data,
                        o = e._size,
                        s = e._datatype,
                        u = r._values,
                        c = r._index,
                        f = r._ptr,
                        l = r._size,
                        p = r._datatype;
                    if (o.length !== l.length) throw new Me(o.length, l.length);
                    if (o[0] !== l[0] || o[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + l + ")");
                    if (!u) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
                    var m, h = o[0],
                        d = o[1],
                        y = 0,
                        g = n;
                    "string" == typeof s && s === p && (m = s, y = t.convert(0, m), g = t.find(n, [m, m]));
                    for (var v = [], x = 0; x < h; x++) v[x] = [];
                    for (var b = [], w = [], N = 0; N < d; N++) {
                        for (var M = N + 1, S = f[N], E = f[N + 1], A = S; A < E; A++) {
                            var O = c[A];
                            b[O] = i ? g(u[A], a[O][N]) : g(a[O][N], u[A]), w[O] = M
                        }
                        for (var C = 0; C < h; C++) w[C] === M ? v[C][N] = b[C] : v[C][N] = i ? g(y, a[C][N]) : g(a[C][N], y)
                    }
                    return e.createDenseMatrix({ data: v, size: [h, d], datatype: m })
                }
            })),
            Yr = Ke("algorithm05", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i) {
                    var a = e._values,
                        o = e._index,
                        s = e._ptr,
                        u = e._size,
                        c = e._datatype,
                        f = n._values,
                        l = n._index,
                        p = n._ptr,
                        m = n._size,
                        h = n._datatype;
                    if (u.length !== m.length) throw new Me(u.length, m.length);
                    if (u[0] !== m[0] || u[1] !== m[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + m + ")");
                    var d, y = u[0],
                        g = u[1],
                        v = r,
                        x = 0,
                        b = i;
                    "string" == typeof c && c === h && (d = c, v = t.find(r, [d, d]), x = t.convert(0, d), b = t.find(i, [d, d]));
                    var w, N, M, S, E = a && f ? [] : void 0,
                        A = [],
                        O = [],
                        C = E ? [] : void 0,
                        _ = E ? [] : void 0,
                        T = [],
                        z = [];
                    for (N = 0; N < g; N++) {
                        O[N] = A.length;
                        var q = N + 1;
                        for (M = s[N], S = s[N + 1]; M < S; M++) w = o[M], A.push(w), T[w] = q, C && (C[w] = a[M]);
                        for (M = p[N], S = p[N + 1]; M < S; M++) T[w = l[M]] !== q && A.push(w), z[w] = q, _ && (_[w] = f[M]);
                        if (E)
                            for (M = O[N]; M < A.length;) {
                                var I = T[w = A[M]],
                                    B = z[w];
                                if (I === q || B === q) {
                                    var k = b(I === q ? C[w] : x, B === q ? _[w] : x);
                                    v(k, x) ? A.splice(M, 1) : (E.push(k), M++)
                                }
                            }
                    }
                    return O[g] = A.length, e.createSparseMatrix({ values: E, index: A, ptr: O, size: [y, g], datatype: d })
                }
            })),
            Xr = Ke("algorithm12", ["typed", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.DenseMatrix;
                return function(e, n, i, a) {
                    var o = e._values,
                        s = e._index,
                        u = e._ptr,
                        c = e._size,
                        f = e._datatype;
                    if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
                    var l, p = c[0],
                        m = c[1],
                        h = i;
                    "string" == typeof f && (l = f, n = t.convert(n, l), h = t.find(i, [l, l]));
                    for (var d = [], y = [], g = [], v = 0; v < m; v++) {
                        for (var x = v + 1, b = u[v], w = u[v + 1], N = b; N < w; N++) {
                            var M = s[N];
                            y[M] = o[N], g[M] = x
                        }
                        for (var S = 0; S < p; S++) 0 === v && (d[S] = []), g[S] === x ? d[S][v] = a ? h(n, y[S]) : h(y[S], n) : d[S][v] = a ? h(n, 0) : h(0, n)
                    }
                    return new r({ data: d, size: [p, m], datatype: l })
                }
            })),
            Qr = Ke("mod", ["typed", "matrix", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.DenseMatrix,
                    a = $r({ typed: t, equalScalar: n }),
                    o = Jr({ typed: t }),
                    s = Yr({ typed: t, equalScalar: n }),
                    u = Or({ typed: t, equalScalar: n }),
                    c = Xr({ typed: t, DenseMatrix: i }),
                    f = Lr({ typed: t }),
                    l = Cr({ typed: t });
                return t("mod", { "number, number": mr, "BigNumber, BigNumber": function(e, t) { if (t.isNeg()) throw new Error("Cannot calculate mod for a negative divisor"); return t.isZero() ? e : e.mod(t) }, "Fraction, Fraction": function(e, t) { if (t.compare(0) < 0) throw new Error("Cannot calculate mod for a negative divisor"); return e.compare(0) >= 0 ? e.mod(t) : e.mod(t).add(t).mod(t) }, "SparseMatrix, SparseMatrix": function(e, t) { return s(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return f(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return u(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return l(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return c(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return l(t, e, this, !0) }, "Array, any": function(e, t) { return l(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return l(r(t), e, this, !0).valueOf() } })
            })),
            Kr = Ke("multiplyScalar", ["typed"], (function(e) { return (0, e.typed)("multiplyScalar", { "number, number": er, "Complex, Complex": function(e, t) { return e.mul(t) }, "BigNumber, BigNumber": function(e, t) { return e.times(t) }, "Fraction, Fraction": function(e, t) { return e.mul(t) }, "number | Fraction | BigNumber | Complex, Unit": function(e, t) { var r = t.clone(); return r.value = null === r.value ? r._normalize(e) : this(r.value, e), r }, "Unit, number | Fraction | BigNumber | Complex": function(e, t) { var r = e.clone(); return r.value = null === r.value ? r._normalize(t) : this(r.value, t), r }, "Unit, Unit": function(e, t) { return e.multiply(t) } }) })),
            en = Ke("multiply", ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.addScalar,
                    i = e.multiplyScalar,
                    a = e.equalScalar,
                    o = e.dot,
                    s = Or({ typed: t, equalScalar: a }),
                    u = Cr({ typed: t });

                function c(e, t) {
                    switch (e.length) {
                        case 1:
                            switch (t.length) {
                                case 1:
                                    if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
                                    break;
                                case 2:
                                    if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + e[0] + ") must match Matrix rows (" + t[0] + ")");
                                    break;
                                default:
                                    throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)")
                            }
                            break;
                        case 2:
                            switch (t.length) {
                                case 1:
                                    if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + e[1] + ") must match Vector length (" + t[0] + ")");
                                    break;
                                case 2:
                                    if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + e[1] + ") must match Matrix B rows (" + t[0] + ")");
                                    break;
                                default:
                                    throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)")
                            }
                            break;
                        default:
                            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + e.length + " dimensions)")
                    }
                }

                function f(e, r) {
                    if ("dense" !== r.storage()) throw new Error("Support for SparseMatrix not implemented");
                    return function(e, r) {
                        var a, o = e._data,
                            s = e._size,
                            u = e._datatype,
                            c = r._data,
                            f = r._size,
                            l = r._datatype,
                            p = s[0],
                            m = f[1],
                            h = n,
                            d = i;
                        u && l && u === l && "string" == typeof u && (a = u, h = t.find(n, [a, a]), d = t.find(i, [a, a]));
                        for (var y = [], g = 0; g < m; g++) {
                            for (var v = d(o[0], c[0][g]), x = 1; x < p; x++) v = h(v, d(o[x], c[x][g]));
                            y[g] = v
                        }
                        return e.createDenseMatrix({ data: y, size: [m], datatype: a })
                    }(e, r)
                }
                var l = t("_multiplyMatrixVector", {
                        "DenseMatrix, any": function(e, r) {
                            var a, o = e._data,
                                s = e._size,
                                u = e._datatype,
                                c = r._data,
                                f = r._datatype,
                                l = s[0],
                                p = s[1],
                                m = n,
                                h = i;
                            u && f && u === f && "string" == typeof u && (a = u, m = t.find(n, [a, a]), h = t.find(i, [a, a]));
                            for (var d = [], y = 0; y < l; y++) {
                                for (var g = o[y], v = h(g[0], c[0]), x = 1; x < p; x++) v = m(v, h(g[x], c[x]));
                                d[y] = v
                            }
                            return e.createDenseMatrix({ data: d, size: [l], datatype: a })
                        },
                        "SparseMatrix, any": function(e, r) {
                            var o = e._values,
                                s = e._index,
                                u = e._ptr,
                                c = e._datatype;
                            if (!o) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
                            var f, l = r._data,
                                p = r._datatype,
                                m = e._size[0],
                                h = r._size[0],
                                d = [],
                                y = [],
                                g = [],
                                v = n,
                                x = i,
                                b = a,
                                w = 0;
                            c && p && c === p && "string" == typeof c && (f = c, v = t.find(n, [f, f]), x = t.find(i, [f, f]), b = t.find(a, [f, f]), w = t.convert(0, f));
                            var N = [],
                                M = [];
                            g[0] = 0;
                            for (var S = 0; S < h; S++) {
                                var E = l[S];
                                if (!b(E, w))
                                    for (var A = u[S], O = u[S + 1], C = A; C < O; C++) {
                                        var _ = s[C];
                                        M[_] ? N[_] = v(N[_], x(E, o[C])) : (M[_] = !0, y.push(_), N[_] = x(E, o[C]))
                                    }
                            }
                            for (var T = y.length, z = 0; z < T; z++) {
                                var q = y[z];
                                d[z] = N[q]
                            }
                            return g[1] = y.length, e.createSparseMatrix({ values: d, index: y, ptr: g, size: [m, 1], datatype: f })
                        }
                    }),
                    m = t("_multiplyMatrixMatrix", {
                        "DenseMatrix, DenseMatrix": function(e, r) {
                            var a, o = e._data,
                                s = e._size,
                                u = e._datatype,
                                c = r._data,
                                f = r._size,
                                l = r._datatype,
                                p = s[0],
                                m = s[1],
                                h = f[1],
                                d = n,
                                y = i;
                            u && l && u === l && "string" == typeof u && (a = u, d = t.find(n, [a, a]), y = t.find(i, [a, a]));
                            for (var g = [], v = 0; v < p; v++) {
                                var x = o[v];
                                g[v] = [];
                                for (var b = 0; b < h; b++) {
                                    for (var w = y(x[0], c[0][b]), N = 1; N < m; N++) w = d(w, y(x[N], c[N][b]));
                                    g[v][b] = w
                                }
                            }
                            return e.createDenseMatrix({ data: g, size: [p, h], datatype: a })
                        },
                        "DenseMatrix, SparseMatrix": function(e, r) {
                            var o = e._data,
                                s = e._size,
                                u = e._datatype,
                                c = r._values,
                                f = r._index,
                                l = r._ptr,
                                p = r._size,
                                m = r._datatype;
                            if (!c) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
                            var h, d = s[0],
                                y = p[1],
                                g = n,
                                v = i,
                                x = a,
                                b = 0;
                            u && m && u === m && "string" == typeof u && (h = u, g = t.find(n, [h, h]), v = t.find(i, [h, h]), x = t.find(a, [h, h]), b = t.convert(0, h));
                            for (var w = [], N = [], M = [], S = r.createSparseMatrix({ values: w, index: N, ptr: M, size: [d, y], datatype: h }), E = 0; E < y; E++) {
                                M[E] = N.length;
                                var A = l[E],
                                    O = l[E + 1];
                                if (O > A)
                                    for (var C = 0, _ = 0; _ < d; _++) {
                                        for (var T = _ + 1, z = void 0, q = A; q < O; q++) {
                                            var I = f[q];
                                            C !== T ? (z = v(o[_][I], c[q]), C = T) : z = g(z, v(o[_][I], c[q]))
                                        }
                                        C !== T || x(z, b) || (N.push(_), w.push(z))
                                    }
                            }
                            return M[y] = N.length, S
                        },
                        "SparseMatrix, DenseMatrix": function(e, r) {
                            var o = e._values,
                                s = e._index,
                                u = e._ptr,
                                c = e._datatype;
                            if (!o) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
                            var f, l = r._data,
                                p = r._datatype,
                                m = e._size[0],
                                h = r._size[0],
                                d = r._size[1],
                                y = n,
                                g = i,
                                v = a,
                                x = 0;
                            c && p && c === p && "string" == typeof c && (f = c, y = t.find(n, [f, f]), g = t.find(i, [f, f]), v = t.find(a, [f, f]), x = t.convert(0, f));
                            for (var b = [], w = [], N = [], M = e.createSparseMatrix({ values: b, index: w, ptr: N, size: [m, d], datatype: f }), S = [], E = [], A = 0; A < d; A++) {
                                N[A] = w.length;
                                for (var O = A + 1, C = 0; C < h; C++) {
                                    var _ = l[C][A];
                                    if (!v(_, x))
                                        for (var T = u[C], z = u[C + 1], q = T; q < z; q++) {
                                            var I = s[q];
                                            E[I] !== O ? (E[I] = O, w.push(I), S[I] = g(_, o[q])) : S[I] = y(S[I], g(_, o[q]))
                                        }
                                }
                                for (var B = N[A], k = w.length, D = B; D < k; D++) {
                                    var R = w[D];
                                    b[D] = S[R]
                                }
                            }
                            return N[d] = w.length, M
                        },
                        "SparseMatrix, SparseMatrix": function(e, r) {
                            var a, o = e._values,
                                s = e._index,
                                u = e._ptr,
                                c = e._datatype,
                                f = r._values,
                                l = r._index,
                                p = r._ptr,
                                m = r._datatype,
                                h = e._size[0],
                                d = r._size[1],
                                y = o && f,
                                g = n,
                                v = i;
                            c && m && c === m && "string" == typeof c && (a = c, g = t.find(n, [a, a]), v = t.find(i, [a, a]));
                            for (var x, b, w, N, M, S, E, A, O = y ? [] : void 0, C = [], _ = [], T = e.createSparseMatrix({ values: O, index: C, ptr: _, size: [h, d], datatype: a }), z = y ? [] : void 0, q = [], I = 0; I < d; I++) {
                                _[I] = C.length;
                                var B = I + 1;
                                for (M = p[I], S = p[I + 1], N = M; N < S; N++)
                                    if (A = l[N], y)
                                        for (b = u[A], w = u[A + 1], x = b; x < w; x++) E = s[x], q[E] !== B ? (q[E] = B, C.push(E), z[E] = v(f[N], o[x])) : z[E] = g(z[E], v(f[N], o[x]));
                                    else
                                        for (b = u[A], w = u[A + 1], x = b; x < w; x++) E = s[x], q[E] !== B && (q[E] = B, C.push(E));
                                if (y)
                                    for (var k = _[I], D = C.length, R = k; R < D; R++) {
                                        var P = C[R];
                                        O[R] = z[P]
                                    }
                            }
                            return _[d] = C.length, T
                        }
                    });
                return t("multiply", Ze({
                    "Array, Array": function(e, t) { c(Ee(e), Ee(t)); var n = this(r(e), r(t)); return p(n) ? n.valueOf() : n },
                    "Matrix, Matrix": function(e, t) {
                        var r = e.size(),
                            n = t.size();
                        return c(r, n), 1 === r.length ? 1 === n.length ? function(e, t, r) { if (0 === r) throw new Error("Cannot multiply two empty vectors"); return o(e, t) }(e, t, r[0]) : f(e, t) : 1 === n.length ? l(e, t) : m(e, t)
                    },
                    "Matrix, Array": function(e, t) { return this(e, r(t)) },
                    "Array, Matrix": function(e, t) { return this(r(e, t.storage()), t) },
                    "SparseMatrix, any": function(e, t) { return s(e, t, i, !1) },
                    "DenseMatrix, any": function(e, t) { return u(e, t, i, !1) },
                    "any, SparseMatrix": function(e, t) { return s(t, e, i, !0) },
                    "any, DenseMatrix": function(e, t) { return u(t, e, i, !0) },
                    "Array, any": function(e, t) { return u(r(e), t, i, !1).valueOf() },
                    "any, Array": function(e, t) { return u(r(t), e, i, !0).valueOf() },
                    "any, any": i,
                    "any, any, ...any": function(e, t, r) { for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]); return n }
                }, i.signatures))
            })),
            tn = Ke("nthRoot", ["typed", "matrix", "equalScalar", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.BigNumber,
                    a = jr({ typed: t }),
                    o = $r({ typed: t, equalScalar: n }),
                    s = Gr({ typed: t, equalScalar: n }),
                    u = Or({ typed: t, equalScalar: n }),
                    c = Lr({ typed: t }),
                    f = Cr({ typed: t }),
                    l = "Complex number not supported in function nthRoot. Use nthRoots instead.";
                return t("nthRoot", { number: function(e) { return hr(e, 2) }, "number, number": hr, BigNumber: function(e) { return p(e, new i(2)) }, Complex: function(e) { throw new Error(l) }, "Complex, number": function(e, t) { throw new Error(l) }, "BigNumber, BigNumber": p, "Array | Matrix": function(e) { return this(e, 2) }, "SparseMatrix, SparseMatrix": function(e, t) { if (1 === t.density()) return s(e, t, this); throw new Error("Root must be non-zero") }, "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { if (1 === t.density()) return a(e, t, this, !1); throw new Error("Root must be non-zero") }, "DenseMatrix, DenseMatrix": function(e, t) { return c(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, number | BigNumber": function(e, t) { return u(e, t, this, !1) }, "DenseMatrix, number | BigNumber": function(e, t) { return f(e, t, this, !1) }, "number | BigNumber, SparseMatrix": function(e, t) { if (1 === t.density()) return u(t, e, this, !0); throw new Error("Root must be non-zero") }, "number | BigNumber, DenseMatrix": function(e, t) { return f(t, e, this, !0) }, "Array, number | BigNumber": function(e, t) { return this(r(e), t).valueOf() }, "number | BigNumber, Array": function(e, t) { return this(e, r(t)).valueOf() } });

                function p(e, t) {
                    var r = i.precision,
                        n = i.clone({ precision: r + 2 }),
                        a = new i(0),
                        o = new n(1),
                        s = t.isNegative();
                    if (s && (t = t.neg()), t.isZero()) throw new Error("Root must be non-zero");
                    if (e.isNegative() && !t.abs().mod(2).equals(1)) throw new Error("Root must be odd when a is negative.");
                    if (e.isZero()) return s ? new n(1 / 0) : 0;
                    if (!e.isFinite()) return s ? a : e;
                    var u = e.abs().pow(o.div(t));
                    return u = e.isNeg() ? u.neg() : u, new i((s ? o.div(u) : u).toPrecision(r))
                }
            })),
            rn = Ke("sign", ["typed", "BigNumber", "Fraction", "complex"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber,
                    n = e.complex,
                    i = e.Fraction;
                return t("sign", { number: dr, Complex: function(e) { return 0 === e.im ? n(dr(e.re)) : e.sign() }, BigNumber: function(e) { return new r(e.cmp(0)) }, Fraction: function(e) { return new i(e.s, 1) }, "Array | Matrix": function(e) { return St(e, this, !0) }, Unit: function(e) { return this(e.value) } })
            })),
            nn = Ke("sqrt", ["config", "typed", "Complex"], (function(e) {
                var t = e.config,
                    r = e.typed,
                    n = e.Complex;
                return r("sqrt", { number: i, Complex: function(e) { return e.sqrt() }, BigNumber: function(e) { return !e.isNegative() || t.predictable ? e.sqrt() : i(e.toNumber()) }, "Array | Matrix": function(e) { return St(e, this, !0) }, Unit: function(e) { return e.pow(.5) } });

                function i(e) { return isNaN(e) ? NaN : e >= 0 || t.predictable ? Math.sqrt(e) : new n(e, 0).sqrt() }
            })),
            an = Ke("square", ["typed"], (function(e) { return (0, e.typed)("square", { number: yr, Complex: function(e) { return e.mul(e) }, BigNumber: function(e) { return e.times(e) }, Fraction: function(e) { return e.mul(e) }, "Array | Matrix": function(e) { return St(e, this, !0) }, Unit: function(e) { return e.pow(2) } }) })),
            on = Ke("subtract", ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.addScalar,
                    a = e.unaryMinus,
                    o = e.DenseMatrix,
                    s = jr({ typed: t }),
                    u = Jr({ typed: t }),
                    c = Yr({ typed: t, equalScalar: n }),
                    f = Fr({ typed: t, DenseMatrix: o }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("subtract", { "number, number": function(e, t) { return e - t }, "Complex, Complex": function(e, t) { return e.sub(t) }, "BigNumber, BigNumber": function(e, t) { return e.minus(t) }, "Fraction, Fraction": function(e, t) { return e.sub(t) }, "Unit, Unit": function(e, t) { if (null === e.value) throw new Error("Parameter x contains a unit with undefined value"); if (null === t.value) throw new Error("Parameter y contains a unit with undefined value"); if (!e.equalBase(t)) throw new Error("Units do not match"); var r = e.clone(); return r.value = this(r.value, t.value), r.fixPrefix = !1, r }, "SparseMatrix, SparseMatrix": function(e, t) { return sn(e, t), c(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return sn(e, t), u(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return sn(e, t), s(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return sn(e, t), l(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return f(e, a(t), i) }, "DenseMatrix, any": function(e, t) { return p(e, t, this) }, "any, SparseMatrix": function(e, t) { return f(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return p(t, e, this, !0) }, "Array, any": function(e, t) { return p(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return p(r(t), e, this, !0).valueOf() } })
            }));

        function sn(e, t) {
            var r = e.size(),
                n = t.size();
            if (r.length !== n.length) throw new Me(r.length, n.length)
        }
        var un = Ke("xgcd", ["typed", "config", "matrix", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.BigNumber;
                return t("xgcd", {
                    "number, number": function(e, t) { var i = gr(e, t); return "Array" === r.matrix ? i : n(i) },
                    "BigNumber, BigNumber": function(e, t) {
                        var a, o, s, u, c = new i(0),
                            f = new i(1),
                            l = c,
                            p = f,
                            m = f,
                            h = c;
                        if (!e.isInt() || !t.isInt()) throw new Error("Parameters in function xgcd must be integer numbers");
                        for (; !t.isZero();) o = e.div(t).floor(), s = e.mod(t), a = l, l = p.minus(o.times(l)), p = a, a = m, m = h.minus(o.times(m)), h = a, e = t, t = s;
                        u = e.lt(c) ? [e.neg(), p.neg(), h.neg()] : [e, e.isZero() ? 0 : p, h];
                        return "Array" === r.matrix ? u : n(u)
                    }
                })
            })),
            cn = Ke("algorithm09", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i) {
                    var a = e._values,
                        o = e._index,
                        s = e._ptr,
                        u = e._size,
                        c = e._datatype,
                        f = n._values,
                        l = n._index,
                        p = n._ptr,
                        m = n._size,
                        h = n._datatype;
                    if (u.length !== m.length) throw new Me(u.length, m.length);
                    if (u[0] !== m[0] || u[1] !== m[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + m + ")");
                    var d, y = u[0],
                        g = u[1],
                        v = r,
                        x = 0,
                        b = i;
                    "string" == typeof c && c === h && (d = c, v = t.find(r, [d, d]), x = t.convert(0, d), b = t.find(i, [d, d]));
                    var w, N, M, S, E, A = a && f ? [] : void 0,
                        O = [],
                        C = [],
                        _ = A ? [] : void 0,
                        T = [];
                    for (N = 0; N < g; N++) {
                        C[N] = O.length;
                        var z = N + 1;
                        if (_)
                            for (S = p[N], E = p[N + 1], M = S; M < E; M++) T[w = l[M]] = z, _[w] = f[M];
                        for (S = s[N], E = s[N + 1], M = S; M < E; M++)
                            if (w = o[M], _) {
                                var q = T[w] === z ? _[w] : x,
                                    I = b(a[M], q);
                                v(I, x) || (O.push(w), A.push(I))
                            } else O.push(w)
                    }
                    return C[g] = O.length, e.createSparseMatrix({ values: A, index: O, ptr: C, size: [y, g], datatype: d })
                }
            })),
            fn = Ke("dotMultiply", ["typed", "matrix", "equalScalar", "multiplyScalar"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.multiplyScalar,
                    a = $r({ typed: t, equalScalar: n }),
                    o = cn({ typed: t, equalScalar: n }),
                    s = Or({ typed: t, equalScalar: n }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("dotMultiply", { "any, any": i, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, i, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, i, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, i, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, i) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, i, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, i, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, i, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, i, !0) }, "Array, any": function(e, t) { return c(r(e), t, i, !1).valueOf() }, "any, Array": function(e, t) { return c(r(t), e, i, !0).valueOf() } })
            }));

        function ln(e, t) { if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitAnd"); var r = e.constructor; if (e.isNaN() || t.isNaN()) return new r(NaN); if (e.isZero() || t.eq(-1) || e.eq(t)) return e; if (t.isZero() || e.eq(-1)) return t; if (!e.isFinite() || !t.isFinite()) { if (!e.isFinite() && !t.isFinite()) return e.isNegative() === t.isNegative() ? e : new r(0); if (!e.isFinite()) return t.isNegative() ? e : e.isNegative() ? new r(0) : t; if (!t.isFinite()) return e.isNegative() ? t : t.isNegative() ? new r(0) : e } return hn(e, t, (function(e, t) { return e & t })) }

        function pn(e) {
            if (e.isFinite() && !e.isInteger()) throw new Error("Integer expected in function bitNot");
            var t = e.constructor,
                r = t.precision;
            t.config({ precision: 1e9 });
            var n = e.plus(new t(1));
            return n.s = -n.s || null, t.config({ precision: r }), n
        }

        function mn(e, t) { if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitOr"); var r = e.constructor; if (e.isNaN() || t.isNaN()) return new r(NaN); var n = new r(-1); return e.isZero() || t.eq(n) || e.eq(t) ? t : t.isZero() || e.eq(n) ? e : e.isFinite() && t.isFinite() ? hn(e, t, (function(e, t) { return e | t })) : !e.isFinite() && !e.isNegative() && t.isNegative() || e.isNegative() && !t.isNegative() && !t.isFinite() ? n : e.isNegative() && t.isNegative() ? e.isFinite() ? e : t : e.isFinite() ? t : e }

        function hn(e, t, r) {
            var n, i, a, o, s, u = e.constructor,
                c = +(e.s < 0),
                f = +(t.s < 0);
            if (c) { n = dn(pn(e)); for (var l = 0; l < n.length; ++l) n[l] ^= 1 } else n = dn(e);
            if (f) { i = dn(pn(t)); for (var p = 0; p < i.length; ++p) i[p] ^= 1 } else i = dn(t);
            n.length <= i.length ? (a = n, o = i, s = c) : (a = i, o = n, s = f);
            var m = a.length,
                h = o.length,
                d = 1 ^ r(c, f),
                y = new u(1 ^ d),
                g = new u(1),
                v = new u(2),
                x = u.precision;
            for (u.config({ precision: 1e9 }); m > 0;) r(a[--m], o[--h]) === d && (y = y.plus(g)), g = g.times(v);
            for (; h > 0;) r(s, o[--h]) === d && (y = y.plus(g)), g = g.times(v);
            return u.config({ precision: x }), 0 === d && (y.s = -y.s), y
        }

        function dn(e) {
            for (var t = e.d, r = t[0] + "", n = 1; n < t.length; ++n) {
                for (var i = t[n] + "", a = 7 - i.length; a--;) i = "0" + i;
                r += i
            }
            for (var o = r.length;
                "0" === r.charAt(o);) o--;
            var s = e.e,
                u = r.slice(0, o + 1 || 1),
                c = u.length;
            if (s > 0)
                if (++s > c)
                    for (s -= c; s--;) u += "0";
                else s < c && (u = u.slice(0, s) + "." + u.slice(s));
            for (var f = [0], l = 0; l < u.length;) {
                for (var p = f.length; p--;) f[p] *= 10;
                f[0] += parseInt(u.charAt(l++));
                for (var m = 0; m < f.length; ++m) f[m] > 1 && (null !== f[m + 1] && void 0 !== f[m + 1] || (f[m + 1] = 0), f[m + 1] += f[m] >> 1, f[m] &= 1)
            }
            return f.reverse()
        }

        function yn(e, t) { if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitXor"); var r = e.constructor; if (e.isNaN() || t.isNaN()) return new r(NaN); if (e.isZero()) return t; if (t.isZero()) return e; if (e.eq(t)) return new r(0); var n = new r(-1); return e.eq(n) ? pn(t) : t.eq(n) ? pn(e) : e.isFinite() && t.isFinite() ? hn(e, t, (function(e, t) { return e ^ t })) : e.isFinite() || t.isFinite() ? new r(e.isNegative() === t.isNegative() ? 1 / 0 : -1 / 0) : n }

        function gn(e, t) { if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function leftShift"); var r = e.constructor; return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : e.isFinite() || t.isFinite() ? t.lt(55) ? e.times(Math.pow(2, t.toNumber()) + "") : e.times(new r(2).pow(t)) : new r(NaN) }

        function vn(e, t) { if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function rightArithShift"); var r = e.constructor; return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : t.isFinite() ? t.lt(55) ? e.div(Math.pow(2, t.toNumber()) + "").floor() : e.div(new r(2).pow(t)).floor() : e.isNegative() ? new r(-1) : e.isFinite() ? new r(0) : new r(NaN) }
        var xn = "number, number";

        function bn(e, t) { if (!V(e) || !V(t)) throw new Error("Integers expected in function bitAnd"); return e & t }

        function wn(e) { if (!V(e)) throw new Error("Integer expected in function bitNot"); return ~e }

        function Nn(e, t) { if (!V(e) || !V(t)) throw new Error("Integers expected in function bitOr"); return e | t }

        function Mn(e, t) { if (!V(e) || !V(t)) throw new Error("Integers expected in function bitXor"); return e ^ t }

        function Sn(e, t) { if (!V(e) || !V(t)) throw new Error("Integers expected in function leftShift"); return e << t }

        function En(e, t) { if (!V(e) || !V(t)) throw new Error("Integers expected in function rightArithShift"); return e >> t }

        function An(e, t) { if (!V(e) || !V(t)) throw new Error("Integers expected in function rightLogShift"); return e >>> t }
        bn.signature = xn, wn.signature = "number", Nn.signature = xn, Mn.signature = xn, Sn.signature = xn, En.signature = xn, An.signature = xn;
        var On = Ke("bitAnd", ["typed", "matrix", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = $r({ typed: t, equalScalar: n }),
                    a = Gr({ typed: t, equalScalar: n }),
                    o = Or({ typed: t, equalScalar: n }),
                    s = Lr({ typed: t }),
                    u = Cr({ typed: t });
                return t("bitAnd", { "number, number": bn, "BigNumber, BigNumber": ln, "SparseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return i(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return i(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return s(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return u(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return o(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return u(t, e, this, !0) }, "Array, any": function(e, t) { return u(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return u(r(t), e, this, !0).valueOf() } })
            })),
            Cn = Ke("bitNot", ["typed"], (function(e) { return (0, e.typed)("bitNot", { number: wn, BigNumber: pn, "Array | Matrix": function(e) { return St(e, this) } }) })),
            _n = Ke("bitOr", ["typed", "matrix", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.DenseMatrix,
                    a = jr({ typed: t }),
                    o = Ur({ typed: t, equalScalar: n }),
                    s = Fr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("bitOr", { "number, number": Nn, "BigNumber, BigNumber": mn, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, this, !0) }, "Array, any": function(e, t) { return c(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return c(r(t), e, this, !0).valueOf() } })
            })),
            Tn = Ke("algorithm07", ["typed", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.DenseMatrix;
                return function(e, i, a) {
                    var o = e._size,
                        s = e._datatype,
                        u = i._size,
                        c = i._datatype;
                    if (o.length !== u.length) throw new Me(o.length, u.length);
                    if (o[0] !== u[0] || o[1] !== u[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + u + ")");
                    var f, l, p, m = o[0],
                        h = o[1],
                        d = 0,
                        y = a;
                    "string" == typeof s && s === c && (f = s, d = t.convert(0, f), y = t.find(a, [f, f]));
                    var g = [];
                    for (l = 0; l < m; l++) g[l] = [];
                    var v = [],
                        x = [],
                        b = [],
                        w = [];
                    for (p = 0; p < h; p++) {
                        var N = p + 1;
                        for (n(e, p, b, v, N), n(i, p, w, x, N), l = 0; l < m; l++) {
                            var M = b[l] === N ? v[l] : d,
                                S = w[l] === N ? x[l] : d;
                            g[l][p] = y(M, S)
                        }
                    }
                    return new r({ data: g, size: [m, h], datatype: f })
                };

                function n(e, t, r, n, i) {
                    for (var a = e._values, o = e._index, s = e._ptr, u = s[t], c = s[t + 1]; u < c; u++) {
                        var f = o[u];
                        r[f] = i, n[f] = a[u]
                    }
                }
            })),
            zn = Ke("bitXor", ["typed", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.DenseMatrix,
                    i = Jr({ typed: t }),
                    a = Tn({ typed: t, DenseMatrix: n }),
                    o = Xr({ typed: t, DenseMatrix: n }),
                    s = Lr({ typed: t }),
                    u = Cr({ typed: t });
                return t("bitXor", { "number, number": Mn, "BigNumber, BigNumber": yn, "SparseMatrix, SparseMatrix": function(e, t) { return a(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return i(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return i(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return s(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return u(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return o(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return u(t, e, this, !0) }, "Array, any": function(e, t) { return u(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return u(r(t), e, this, !0).valueOf() } })
            })),
            qn = Ke("arg", ["typed"], (function(e) { return (0, e.typed)("arg", { number: function(e) { return Math.atan2(0, e) }, BigNumber: function(e) { return e.constructor.atan2(0, e) }, Complex: function(e) { return e.arg() }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            In = Ke("conj", ["typed"], (function(e) { return (0, e.typed)("conj", { number: function(e) { return e }, BigNumber: function(e) { return e }, Complex: function(e) { return e.conjugate() }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Bn = Ke("im", ["typed"], (function(e) { return (0, e.typed)("im", { number: function(e) { return 0 }, BigNumber: function(e) { return e.mul(0) }, Complex: function(e) { return e.im }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            kn = Ke("re", ["typed"], (function(e) { return (0, e.typed)("re", { number: function(e) { return e }, BigNumber: function(e) { return e }, Complex: function(e) { return e.re }, "Array | Matrix": function(e) { return St(e, this) } }) }));

        function Dn(e) { return !e }

        function Rn(e, t) { return !(!e && !t) }

        function Pn(e, t) { return !!e != !!t }

        function jn(e, t) { return !(!e || !t) }
        Dn.signature = "number", Rn.signature = "number, number", Pn.signature = "number, number", jn.signature = "number, number";
        var Un = Ke("not", ["typed"], (function(e) { return (0, e.typed)("not", { number: Dn, Complex: function(e) { return 0 === e.re && 0 === e.im }, BigNumber: function(e) { return e.isZero() || e.isNaN() }, Unit: function(e) { return null === e.value || this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Fn = Ke("or", ["typed", "matrix", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Yr({ typed: t, equalScalar: n }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("or", { "number, number": Rn, "Complex, Complex": function(e, t) { return 0 !== e.re || 0 !== e.im || 0 !== t.re || 0 !== t.im }, "BigNumber, BigNumber": function(e, t) { return !e.isZero() && !e.isNaN() || !t.isZero() && !t.isNaN() }, "Unit, Unit": function(e, t) { return this(e.value || 0, t.value || 0) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, this, !0) }, "Array, any": function(e, t) { return c(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return c(r(t), e, this, !0).valueOf() } })
            })),
            Ln = Ke("xor", ["typed", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.DenseMatrix,
                    i = Jr({ typed: t }),
                    a = Tn({ typed: t, DenseMatrix: n }),
                    o = Xr({ typed: t, DenseMatrix: n }),
                    s = Lr({ typed: t }),
                    u = Cr({ typed: t });
                return t("xor", { "number, number": Pn, "Complex, Complex": function(e, t) { return (0 !== e.re || 0 !== e.im) != (0 !== t.re || 0 !== t.im) }, "BigNumber, BigNumber": function(e, t) { return (!e.isZero() && !e.isNaN()) != (!t.isZero() && !t.isNaN()) }, "Unit, Unit": function(e, t) { return this(e.value || 0, t.value || 0) }, "SparseMatrix, SparseMatrix": function(e, t) { return a(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return i(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return i(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return s(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return u(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return o(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return u(t, e, this, !0) }, "Array, any": function(e, t) { return u(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return u(r(t), e, this, !0).valueOf() } })
            })),
            Hn = Ke("concat", ["typed", "matrix", "isInteger"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.isInteger;
                return t("concat", {
                    "...Array | Matrix | number | BigNumber": function(e) {
                        var t, i, s = e.length,
                            u = -1,
                            c = !1,
                            f = [];
                        for (t = 0; t < s; t++) {
                            var l = e[t];
                            if (p(l) && (c = !0), a(l) || o(l)) { if (t !== s - 1) throw new Error("Dimension must be specified as last argument"); if (i = u, u = l.valueOf(), !n(u)) throw new TypeError("Integer number expected for dimension"); if (u < 0 || t > 0 && u > i) throw new Se(u, i + 1) } else {
                                var m = Ge(l).valueOf(),
                                    h = Ee(m);
                                if (f[t] = m, i = u, u = h.length - 1, t > 0 && u !== i) throw new Me(i + 1, u + 1)
                            }
                        }
                        if (0 === f.length) throw new SyntaxError("At least one matrix expected");
                        for (var d = f.shift(); f.length;) d = $n(d, f.shift(), u, 0);
                        return c ? r(d) : d
                    },
                    "...string": function(e) { return e.join("") }
                })
            }));

        function $n(e, t, r, n) { if (n < r) { if (e.length !== t.length) throw new Me(e.length, t.length); for (var i = [], a = 0; a < e.length; a++) i[a] = $n(e[a], t[a], r, n + 1); return i } return e.concat(t) }
        var Gn = Ke("column", ["typed", "Index", "matrix", "range"], (function(e) {
                var t = e.typed,
                    r = e.Index,
                    n = e.matrix,
                    i = e.range;
                return t("column", { "Matrix, number": a, "Array, number": function(e, t) { return a(n(Ge(e)), t).valueOf() } });

                function a(e, t) {
                    if (2 !== e.size().length) throw new Error("Only two dimensional matrix is supported");
                    Oe(t, e.size()[1]);
                    var n = i(0, e.size()[0]),
                        a = new r(n, t);
                    return e.subset(a)
                }
            })),
            Vn = Ke("count", ["typed", "size", "prod"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.prod;
                return t("count", { string: function(e) { return e.length }, "Matrix | Array": function(e) { return n(r(e)) } })
            })),
            Zn = Ke("cross", ["typed", "matrix", "subtract", "multiply"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.subtract,
                    i = e.multiply;
                return t("cross", { "Matrix, Matrix": function(e, t) { return r(a(e.toArray(), t.toArray())) }, "Matrix, Array": function(e, t) { return r(a(e.toArray(), t)) }, "Array, Matrix": function(e, t) { return r(a(e, t.toArray())) }, "Array, Array": a });

                function a(e, t) {
                    var r = Math.max(Ee(e).length, Ee(t).length);
                    e = qe(e), t = qe(t);
                    var a = Ee(e),
                        o = Ee(t);
                    if (1 !== a.length || 1 !== o.length || 3 !== a[0] || 3 !== o[0]) throw new RangeError("Vectors with length 3 expected (Size A = [" + a.join(", ") + "], B = [" + o.join(", ") + "])");
                    var s = [n(i(e[1], t[2]), i(e[2], t[1])), n(i(e[2], t[0]), i(e[0], t[2])), n(i(e[0], t[1]), i(e[1], t[0]))];
                    return r > 1 ? [s] : s
                }
            })),
            Wn = Ke("diag", ["typed", "matrix", "DenseMatrix", "SparseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.DenseMatrix,
                    i = e.SparseMatrix;
                return t("diag", { Array: function(e) { return a(e, 0, Ee(e), null) }, "Array, number": function(e, t) { return a(e, t, Ee(e), null) }, "Array, BigNumber": function(e, t) { return a(e, t.toNumber(), Ee(e), null) }, "Array, string": function(e, t) { return a(e, 0, Ee(e), t) }, "Array, number, string": function(e, t, r) { return a(e, t, Ee(e), r) }, "Array, BigNumber, string": function(e, t, r) { return a(e, t.toNumber(), Ee(e), r) }, Matrix: function(e) { return a(e, 0, e.size(), e.storage()) }, "Matrix, number": function(e, t) { return a(e, t, e.size(), e.storage()) }, "Matrix, BigNumber": function(e, t) { return a(e, t.toNumber(), e.size(), e.storage()) }, "Matrix, string": function(e, t) { return a(e, 0, e.size(), t) }, "Matrix, number, string": function(e, t, r) { return a(e, t, e.size(), r) }, "Matrix, BigNumber, string": function(e, t, r) { return a(e, t.toNumber(), e.size(), r) } });

                function a(e, t, a, o) {
                    if (!V(t)) throw new TypeError("Second parameter in function diag must be an integer");
                    var s = t > 0 ? t : 0,
                        u = t < 0 ? -t : 0;
                    switch (a.length) {
                        case 1:
                            return function(e, t, r, a, o, s) { var u = [a + o, a + s]; if (r && "sparse" !== r && "dense" !== r) throw new TypeError("Unknown matrix type ".concat(r, '"')); var c = "sparse" === r ? i.diagonal(u, e, t) : n.diagonal(u, e, t); return null !== r ? c : c.valueOf() }(e, t, o, a[0], u, s);
                        case 2:
                            return function(e, t, n, i, a, o) { if (p(e)) { var s = e.diagonal(t); return null !== n ? n !== s.storage() ? r(s, n) : s : s.valueOf() } for (var u = Math.min(i[0] - a, i[1] - o), c = [], f = 0; f < u; f++) c[f] = e[f + a][f + o]; return null !== n ? r(c) : c }(e, t, o, a, u, s)
                    }
                    throw new RangeError("Matrix for function diag must be 2 dimensional")
                }
            }));

        function Jn(e) {
            var t = 0,
                r = 1,
                n = Object.create(null),
                i = Object.create(null),
                a = 0,
                o = function(e) { var o = i[e]; if (o && (delete n[o], delete i[e], --t, r === o)) { if (!t) return a = 0, void(r = 1); for (; !hasOwnProperty.call(n, ++r);); } };
            return e = Math.abs(e), {
                hit: function(s) {
                    var u = i[s],
                        c = ++a;
                    if (n[c] = s, i[s] = c, !u) { if (++t <= e) return; return s = n[r], o(s), s }
                    if (delete n[u], r === u)
                        for (; !hasOwnProperty.call(n, ++r););
                },
                delete: o,
                clear: function() { t = a = 0, r = 1, n = Object.create(null), i = Object.create(null) }
            }
        }

        function Yn(e) { return (Yn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function Xn(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                r = t.hasher,
                n = t.limit;
            return n = null == n ? Number.POSITIVE_INFINITY : n, r = null == r ? JSON.stringify : r,
                function t() { "object" !== Yn(t.cache) && (t.cache = { values: new Map, lru: Jn(n || Number.POSITIVE_INFINITY) }); for (var i = [], a = 0; a < arguments.length; a++) i[a] = arguments[a]; var o = r(i); if (t.cache.values.has(o)) return t.cache.lru.hit(o), t.cache.values.get(o); var s = e.apply(e, i); return t.cache.values.set(o, s), t.cache.values.delete(t.cache.lru.hit(o)), s }
        }

        function Qn(e) { return Object.keys(e.signatures || {}).reduce((function(e, t) { var r = (t.match(/,/g) || []).length + 1; return Math.max(e, r) }), -1) }
        var Kn = Ke("filter", ["typed"], (function(e) { return (0, e.typed)("filter", { "Array, function": ei, "Matrix, function": function(e, t) { return e.create(ei(e.toArray(), t)) }, "Array, RegExp": Pe, "Matrix, RegExp": function(e, t) { return e.create(Pe(e.toArray(), t)) } }) }));

        function ei(e, t) { var r = Qn(t); return Re(e, (function(e, n, i) { return 1 === r ? t(e) : 2 === r ? t(e, [n]) : t(e, [n], i) })) }
        var ti = Ke("flatten", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix;
                return t("flatten", { Array: function(e) { return Be(Ge(e)) }, Matrix: function(e) { var t = Be(Ge(e.toArray())); return r(t) } })
            })),
            ri = Ke("forEach", ["typed"], (function(e) { return (0, e.typed)("forEach", { "Array, function": ni, "Matrix, function": function(e, t) { return e.forEach(t) } }) }));

        function ni(e, t) { var r = Qn(t);! function n(i, a) { Array.isArray(i) ? De(i, (function(e, t) { n(e, a.concat(t)) })) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e) }(e, []) }
        var ii = Ke("getMatrixDataType", ["typed"], (function(e) { return (0, e.typed)("getMatrixDataType", { Array: function(e) { return Le(e, H) }, Matrix: function(e) { return e.getDataType() } }) })),
            ai = Ke("identity", ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.BigNumber,
                    a = e.DenseMatrix,
                    s = e.SparseMatrix;
                return t("identity", { "": function() { return "Matrix" === r.matrix ? n([]) : [] }, string: function(e) { return n(e) }, "number | BigNumber": function(e) { return c(e, e, "Matrix" === r.matrix ? "dense" : void 0) }, "number | BigNumber, string": function(e, t) { return c(e, e, t) }, "number | BigNumber, number | BigNumber": function(e, t) { return c(e, t, "Matrix" === r.matrix ? "dense" : void 0) }, "number | BigNumber, number | BigNumber, string": function(e, t, r) { return c(e, t, r) }, Array: function(e) { return u(e) }, "Array, string": function(e, t) { return u(e, t) }, Matrix: function(e) { return u(e.valueOf(), e.storage()) }, "Matrix, string": function(e, t) { return u(e.valueOf(), t) } });

                function u(e, t) {
                    switch (e.length) {
                        case 0:
                            return t ? n(t) : [];
                        case 1:
                            return c(e[0], e[0], t);
                        case 2:
                            return c(e[0], e[1], t);
                        default:
                            throw new Error("Vector containing two values expected")
                    }
                }

                function c(e, t, r) {
                    var n = o(e) || o(t) ? i : null;
                    if (o(e) && (e = e.toNumber()), o(t) && (t = t.toNumber()), !V(e) || e < 1) throw new Error("Parameters in function identity must be positive integers");
                    if (!V(t) || t < 1) throw new Error("Parameters in function identity must be positive integers");
                    var u = n ? new i(1) : 1,
                        c = n ? new n(0) : 0,
                        f = [e, t];
                    if (r) { if ("sparse" === r) return s.diagonal(f, u, 0, c); if ("dense" === r) return a.diagonal(f, u, 0, c); throw new TypeError('Unknown matrix type "'.concat(r, '"')) }
                    for (var l = Ce([], f, c), p = e < t ? e : t, m = 0; m < p; m++) l[m][m] = u;
                    return l
                }
            })),
            oi = Ke("kron", ["typed", "matrix", "multiplyScalar"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.multiplyScalar;
                return t("kron", { "Matrix, Matrix": function(e, t) { return r(i(e.toArray(), t.toArray())) }, "Matrix, Array": function(e, t) { return r(i(e.toArray(), t)) }, "Array, Matrix": function(e, t) { return r(i(e, t.toArray())) }, "Array, Array": i });

                function i(e, t) {
                    if (1 === Ee(e).length && (e = [e]), 1 === Ee(t).length && (t = [t]), Ee(e).length > 2 || Ee(t).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(e.length) + ", y = " + JSON.stringify(t.length) + ")");
                    var r = [],
                        i = [];
                    return e.map((function(e) { return t.map((function(t) { return i = [], r.push(i), e.map((function(e) { return t.map((function(t) { return i.push(n(e, t)) })) })) })) })) && r
                }
            })),
            si = Ke("map", ["typed"], (function(e) { return (0, e.typed)("map", { "Array, function": ui, "Matrix, function": function(e, t) { return e.map(t) } }) }));

        function ui(e, t) { var r = Qn(t); return function n(i, a) { return Array.isArray(i) ? i.map((function(e, t) { return n(e, a.concat(t)) })) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e) }(e, []) }
        var ci = Ke("diff", ["typed", "matrix", "subtract", "number"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.subtract,
                    i = e.number;
                return t("diff", { "Array | Matrix": function(e) { return p(e) ? r(o(e.toArray())) : o(e) }, "Array | Matrix, number": function(e, t) { if (!V(t)) throw new RangeError("Dimension must be a whole number"); return p(e) ? r(a(e.toArray(), t)) : a(e, t) }, "Array | Matrix, BigNumber": function(e, t) { return this(e, i(t)) } });

                function a(e, t) { if (p(e) && (e = e.toArray()), !Array.isArray(e)) throw RangeError("Array/Matrix does not have that many dimensions"); if (t > 0) { var r = []; return e.forEach((function(e) { r.push(a(e, t - 1)) })), r } if (0 === t) return o(e); throw RangeError("Cannot have negative dimension") }

                function o(e) {
                    var t = [],
                        r = e.length;
                    if (r < 2) return e;
                    for (var n = 1; n < r; n++) t.push(s(e[n - 1], e[n]));
                    return t
                }

                function s(e, t) {
                    p(e) && (e = e.toArray()), p(t) && (t = t.toArray());
                    var r = Array.isArray(e),
                        i = Array.isArray(t);
                    if (r && i) return function(e, t) { if (e.length !== t.length) throw RangeError("Not all sub-arrays have the same length"); for (var r = [], n = e.length, i = 0; i < n; i++) r.push(s(e[i], t[i])); return r }(e, t);
                    if (!r && !i) return n(t, e);
                    throw TypeError("Cannot calculate difference between 1 array and 1 non-array")
                }
            })),
            fi = Ke("ones", ["typed", "config", "matrix", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.BigNumber;
                return t("ones", { "": function() { return "Array" === r.matrix ? a([]) : a([], "default") }, "...number | BigNumber | string": function(e) { if ("string" == typeof e[e.length - 1]) { var t = e.pop(); return a(e, t) } return "Array" === r.matrix ? a(e) : a(e, "default") }, Array: a, Matrix: function(e) { var t = e.storage(); return a(e.valueOf(), t) }, "Array | Matrix, string": function(e, t) { return a(e.valueOf(), t) } });

                function a(e, t) { var r = function(e) { var t = !1; return e.forEach((function(e, r, n) { o(e) && (t = !0, n[r] = e.toNumber()) })), t }(e) ? new i(1) : 1; if (function(e) { e.forEach((function(e) { if ("number" != typeof e || !V(e) || e < 0) throw new Error("Parameters in function ones must be positive integers") })) }(e), t) { var a = n(t); return e.length > 0 ? a.resize(e, r) : a } var s = []; return e.length > 0 ? Ce(s, e, r) : s }
            }));

        function li() { throw new Error('No "bignumber" implementation available') }

        function pi() { throw new Error('No "fraction" implementation available') }

        function mi() { throw new Error('No "matrix" implementation available') }
        var hi = Ke("range", ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.bignumber,
                    a = e.smaller,
                    o = e.smallerEq,
                    s = e.larger,
                    u = e.largerEq;
                return t("range", { string: f, "string, boolean": f, "number, number": function(e, t) { return c(l(e, t, 1)) }, "number, number, number": function(e, t, r) { return c(l(e, t, r)) }, "number, number, boolean": function(e, t, r) { return c(r ? p(e, t, 1) : l(e, t, 1)) }, "number, number, number, boolean": function(e, t, r, n) { return c(n ? p(e, t, r) : l(e, t, r)) }, "BigNumber, BigNumber": function(e, t) { return c(m(e, t, new(0, e.constructor)(1))) }, "BigNumber, BigNumber, BigNumber": function(e, t, r) { return c(m(e, t, r)) }, "BigNumber, BigNumber, boolean": function(e, t, r) { var n = e.constructor; return c(r ? h(e, t, new n(1)) : m(e, t, new n(1))) }, "BigNumber, BigNumber, BigNumber, boolean": function(e, t, r, n) { return c(n ? h(e, t, r) : m(e, t, r)) } });

                function c(e) { return "Matrix" === r.matrix ? n ? n(e) : mi() : e }

                function f(e, t) {
                    var n = function(e) {
                        var t = e.split(":").map((function(e) { return Number(e) }));
                        if (t.some((function(e) { return isNaN(e) }))) return null;
                        switch (t.length) {
                            case 2:
                                return { start: t[0], end: t[1], step: 1 };
                            case 3:
                                return { start: t[0], end: t[2], step: t[1] };
                            default:
                                return null
                        }
                    }(e);
                    if (!n) throw new SyntaxError('String "' + e + '" is no valid range');
                    return "BigNumber" === r.number ? (void 0 === i && li(), c((t ? h : m)(i(n.start), i(n.end), i(n.step)))) : c((t ? p : l)(n.start, n.end, n.step))
                }

                function l(e, t, r) {
                    var n = [],
                        i = e;
                    if (r > 0)
                        for (; a(i, t);) n.push(i), i += r;
                    else if (r < 0)
                        for (; s(i, t);) n.push(i), i += r;
                    return n
                }

                function p(e, t, r) {
                    var n = [],
                        i = e;
                    if (r > 0)
                        for (; o(i, t);) n.push(i), i += r;
                    else if (r < 0)
                        for (; u(i, t);) n.push(i), i += r;
                    return n
                }

                function m(e, t, r) {
                    var n = i(0),
                        o = [],
                        u = e;
                    if (r.gt(n))
                        for (; a(u, t);) o.push(u), u = u.plus(r);
                    else if (r.lt(n))
                        for (; s(u, t);) o.push(u), u = u.plus(r);
                    return o
                }

                function h(e, t, r) {
                    var n = i(0),
                        a = [],
                        s = e;
                    if (r.gt(n))
                        for (; o(s, t);) a.push(s), s = s.plus(r);
                    else if (r.lt(n))
                        for (; u(s, t);) a.push(s), s = s.plus(r);
                    return a
                }
            })),
            di = Ke("reshape", ["typed", "isInteger", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.isInteger;
                return t("reshape", { "Matrix, Array": function(e, t) { return e.reshape(t) }, "Array, Array": function(e, t) { return t.forEach((function(e) { if (!r(e)) throw new TypeError("Invalid size for dimension: " + e) })), _e(e, t) } })
            }));

        function yi(e, t, r, n) {
            if (!(this instanceof yi)) throw new SyntaxError("Constructor must be called with the new operator");
            this.fn = e, this.count = t, this.min = r, this.max = n, this.message = "Wrong number of arguments in function " + e + " (" + t + " provided, " + r + (null != n ? "-" + n : "") + " expected)", this.stack = (new Error).stack
        }
        yi.prototype = new Error, yi.prototype.constructor = Error, yi.prototype.name = "ArgumentsError", yi.prototype.isArgumentsError = !0;
        var gi = Ke("resize", ["config", "matrix"], (function(e) {
                var t = e.config,
                    r = e.matrix;
                return function(e, i, a) {
                    if (2 !== arguments.length && 3 !== arguments.length) throw new yi("resize", arguments.length, 2, 3);
                    if (p(i) && (i = i.valueOf()), o(i[0]) && (i = i.map((function(e) { return o(e) ? e.toNumber() : e }))), p(e)) return e.resize(i, a, !0);
                    if ("string" == typeof e) return n(e, i, a);
                    var s = !Array.isArray(e) && "Array" !== t.matrix;
                    if (0 === i.length) { for (; Array.isArray(e);) e = e[0]; return Ge(e) }
                    Array.isArray(e) || (e = [e]);
                    var u = Ce(e = Ge(e), i, a);
                    return s ? r(u) : u
                };

                function n(e, t, r) { if (void 0 !== r) { if ("string" != typeof r || 1 !== r.length) throw new TypeError("Single character expected as defaultValue") } else r = " "; if (1 !== t.length) throw new Me(t.length, 1); var n = t[0]; if ("number" != typeof n || !V(n)) throw new TypeError("Invalid size, must contain positive integers (size: " + xe(t) + ")"); if (e.length > n) return e.substring(0, n); if (e.length < n) { for (var i = e, a = 0, o = n - e.length; a < o; a++) i += r; return i } return e }
            })),
            vi = Ke("rotate", ["typed", "multiply", "rotationMatrix"], (function(e) {
                var t = e.typed,
                    r = e.multiply,
                    n = e.rotationMatrix;
                return t("rotate", { "Array , number | BigNumber | Complex | Unit": function(e, t) { return i(e, 2), r(n(t), e).toArray() }, "Matrix , number | BigNumber | Complex | Unit": function(e, t) { return i(e, 2), r(n(t), e) }, "Array, number | BigNumber | Complex | Unit, Array | Matrix": function(e, t, a) { return i(e, 3), r(n(t, a), e) }, "Matrix, number | BigNumber | Complex | Unit, Array | Matrix": function(e, t, a) { return i(e, 3), r(n(t, a), e) } });

                function i(e, t) { var r = Array.isArray(e) ? Ee(e) : e.size(); if (r.length > 2) throw new RangeError("Vector must be of dimensions 1x".concat(t)); if (2 === r.length && 1 !== r[1]) throw new RangeError("Vector must be of dimensions 1x".concat(t)); if (r[0] !== t) throw new RangeError("Vector must be of dimensions 1x".concat(t)) }
            })),
            xi = Ke("rotationMatrix", ["typed", "config", "multiplyScalar", "addScalar", "unaryMinus", "norm", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix", "cos", "sin"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.multiplyScalar,
                    i = e.addScalar,
                    a = e.unaryMinus,
                    s = e.norm,
                    u = e.BigNumber,
                    c = e.matrix,
                    f = e.DenseMatrix,
                    l = e.SparseMatrix,
                    p = e.cos,
                    m = e.sin;
                return t("rotationMatrix", { "": function() { return "Matrix" === r.matrix ? c([]) : [] }, string: function(e) { return c(e) }, "number | BigNumber | Complex | Unit": function(e) { return h(e, "Matrix" === r.matrix ? "dense" : void 0) }, "number | BigNumber | Complex | Unit, string": function(e, t) { return h(e, t) }, "number | BigNumber | Complex | Unit, Array": function(e, t) { var r = c(t); return d(r), v(e, r, void 0) }, "number | BigNumber | Complex | Unit, Matrix": function(e, t) { d(t); var n = t.storage() || ("Matrix" === r.matrix ? "dense" : void 0); return v(e, t, n) }, "number | BigNumber | Complex | Unit, Array, string": function(e, t, r) { var n = c(t); return d(n), v(e, n, r) }, "number | BigNumber | Complex | Unit, Matrix, string": function(e, t, r) { return d(t), v(e, t, r) } });

                function h(e, t) {
                    var r = o(e) ? new u(-1) : -1,
                        i = p(e),
                        a = m(e);
                    return g([
                        [i, n(r, a)],
                        [a, i]
                    ], t)
                }

                function d(e) { var t = e.size(); if (t.length < 1 || 3 !== t[0]) throw new RangeError("Vector must be of dimensions 1x3") }

                function y(e) { return e.reduce((function(e, t) { return n(e, t) })) }

                function g(e, t) { if (t) { if ("sparse" === t) return new l(e); if ("dense" === t) return new f(e); throw new TypeError('Unknown matrix type "'.concat(t, '"')) } return e }

                function v(e, t, r) {
                    var n = s(t);
                    if (0 === n) throw new RangeError("Rotation around zero vector");
                    var c = o(e) ? u : null,
                        f = c ? new c(1) : 1,
                        l = c ? new c(-1) : -1,
                        h = c ? new c(t.get([0]) / n) : t.get([0]) / n,
                        d = c ? new c(t.get([1]) / n) : t.get([1]) / n,
                        v = c ? new c(t.get([2]) / n) : t.get([2]) / n,
                        x = p(e),
                        b = i(f, a(x)),
                        w = m(e);
                    return g([
                        [i(x, y([h, h, b])), i(y([h, d, b]), y([l, v, w])), i(y([h, v, b]), y([d, w]))],
                        [i(y([h, d, b]), y([v, w])), i(x, y([d, d, b])), i(y([d, v, b]), y([l, h, w]))],
                        [i(y([h, v, b]), y([l, d, w])), i(y([d, v, b]), y([h, w])), i(x, y([v, v, b]))]
                    ], r)
                }
            })),
            bi = Ke("row", ["typed", "Index", "matrix", "range"], (function(e) {
                var t = e.typed,
                    r = e.Index,
                    n = e.matrix,
                    i = e.range;
                return t("row", { "Matrix, number": a, "Array, number": function(e, t) { return a(n(Ge(e)), t).valueOf() } });

                function a(e, t) {
                    if (2 !== e.size().length) throw new Error("Only two dimensional matrix is supported");
                    Oe(t, e.size()[0]);
                    var n = i(0, e.size()[1]),
                        a = new r(t, n);
                    return e.subset(a)
                }
            })),
            wi = Ke("size", ["typed", "config", "?matrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix;
                return t("size", { Matrix: function(e) { return e.create(e.size()) }, Array: Ee, string: function(e) { return "Array" === r.matrix ? [e.length] : n([e.length]) }, "number | Complex | BigNumber | Unit | boolean | null": function(e) { return "Array" === r.matrix ? [] : n ? n([]) : mi() } })
            })),
            Ni = Ke("squeeze", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix;
                return t("squeeze", { Array: function(e) { return qe(Ge(e)) }, Matrix: function(e) { var t = qe(e.toArray()); return Array.isArray(t) ? r(t) : t }, any: function(e) { return Ge(e) } })
            }));

        function Mi(e) { return (Mi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function Si(e, t) { if (Ci(e) && Ai(e, t)) return e[t]; if ("function" == typeof e[t] && Oi(e, t)) throw new Error('Cannot access method "' + t + '" as a property'); throw new Error('No access to property "' + t + '"') }

        function Ei(e, t, r) { if (Ci(e) && Ai(e, t)) return e[t] = r, r; throw new Error('No access to property "' + t + '"') }

        function Ai(e, t) { return !(!e || "object" !== Mi(e)) && (!!Xe(_i, t) || !(t in Object.prototype) && !(t in Function.prototype)) }

        function Oi(e, t) { return null != e && "function" == typeof e[t] && (!(Xe(e, t) && Object.getPrototypeOf && t in Object.getPrototypeOf(e)) && (!!Xe(Ti, t) || !(t in Object.prototype) && !(t in Function.prototype))) }

        function Ci(e) { return "object" === Mi(e) && e && e.constructor === Object }
        var _i = { length: !0, name: !0 },
            Ti = { toString: !0, valueOf: !0, toLocaleString: !0 },
            zi = Ke("subset", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix;
                return t("subset", { "Array, Index": function(e, t) { var n = r(e).subset(t); return t.isScalar() ? n : n.valueOf() }, "Matrix, Index": function(e, t) { return e.subset(t) }, "Object, Index": Bi, "string, Index": qi, "Array, Index, any": function(e, t, n) { return r(Ge(e)).subset(t, n, void 0).valueOf() }, "Array, Index, any, any": function(e, t, n, i) { return r(Ge(e)).subset(t, n, i).valueOf() }, "Matrix, Index, any": function(e, t, r) { return e.clone().subset(t, r) }, "Matrix, Index, any, any": function(e, t, r, n) { return e.clone().subset(t, r, n) }, "string, Index, string": Ii, "string, Index, string, string": Ii, "Object, Index, any": ki })
            }));

        function qi(e, t) {
            if (!g(t)) throw new TypeError("Index expected");
            if (1 !== t.size().length) throw new Me(t.size().length, 1);
            var r = e.length;
            Oe(t.min()[0], r), Oe(t.max()[0], r);
            var n = t.dimension(0),
                i = "";
            return n.forEach((function(t) { i += e.charAt(t) })), i
        }

        function Ii(e, t, r, n) {
            if (!t || !0 !== t.isIndex) throw new TypeError("Index expected");
            if (1 !== t.size().length) throw new Me(t.size().length, 1);
            if (void 0 !== n) { if ("string" != typeof n || 1 !== n.length) throw new TypeError("Single character expected as defaultValue") } else n = " ";
            var i = t.dimension(0);
            if (i.size()[0] !== r.length) throw new Me(i.size()[0], r.length);
            var a = e.length;
            Oe(t.min()[0]), Oe(t.max()[0]);
            for (var o = [], s = 0; s < a; s++) o[s] = e.charAt(s);
            if (i.forEach((function(e, t) { o[e] = r.charAt(t[0]) })), o.length > a)
                for (var u = a - 1, c = o.length; u < c; u++) o[u] || (o[u] = n);
            return o.join("")
        }

        function Bi(e, t) { if (1 !== t.size().length) throw new Me(t.size(), 1); var r = t.dimension(0); if ("string" != typeof r) throw new TypeError("String expected as index to retrieve an object property"); return Si(e, r) }

        function ki(e, t, r) { if (1 !== t.size().length) throw new Me(t.size(), 1); var n = t.dimension(0); if ("string" != typeof n) throw new TypeError("String expected as index to retrieve an object property"); var i = Ge(e); return Ei(i, n, r), i }
        var Di = Ke("transpose", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix;
                return t("transpose", {
                    Array: function(e) { return this(r(e)).valueOf() },
                    Matrix: function(e) {
                        var t, r = e.size();
                        switch (r.length) {
                            case 1:
                                t = e.clone();
                                break;
                            case 2:
                                var n = r[0],
                                    i = r[1];
                                if (0 === i) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + xe(r) + ")");
                                switch (e.storage()) {
                                    case "dense":
                                        t = function(e, t, r) { for (var n, i = e._data, a = [], o = 0; o < r; o++) { n = a[o] = []; for (var s = 0; s < t; s++) n[s] = Ge(i[s][o]) } return e.createDenseMatrix({ data: a, size: [r, t], datatype: e._datatype }) }(e, n, i);
                                        break;
                                    case "sparse":
                                        t = function(e, t, r) {
                                            for (var n, i, a, o = e._values, s = e._index, u = e._ptr, c = o ? [] : void 0, f = [], l = [], p = [], m = 0; m < t; m++) p[m] = 0;
                                            for (n = 0, i = s.length; n < i; n++) p[s[n]]++;
                                            for (var h = 0, d = 0; d < t; d++) l.push(h), h += p[d], p[d] = l[d];
                                            for (l.push(h), a = 0; a < r; a++)
                                                for (var y = u[a], g = u[a + 1], v = y; v < g; v++) {
                                                    var x = p[s[v]]++;
                                                    f[x] = a, o && (c[x] = Ge(o[v]))
                                                }
                                            return e.createSparseMatrix({ values: c, index: f, ptr: l, size: [r, t], datatype: e._datatype })
                                        }(e, n, i)
                                }
                                break;
                            default:
                                throw new RangeError("Matrix must be a vector or two dimensional (size: " + xe(this._size) + ")")
                        }
                        return t
                    },
                    any: function(e) { return Ge(e) }
                })
            })),
            Ri = Ke("ctranspose", ["typed", "transpose", "conj"], (function(e) {
                var t = e.typed,
                    r = e.transpose,
                    n = e.conj;
                return t("ctranspose", { any: function(e) { return n(r(e)) } })
            })),
            Pi = Ke("zeros", ["typed", "config", "matrix", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.BigNumber;
                return t("zeros", { "": function() { return "Array" === r.matrix ? a([]) : a([], "default") }, "...number | BigNumber | string": function(e) { if ("string" == typeof e[e.length - 1]) { var t = e.pop(); return a(e, t) } return "Array" === r.matrix ? a(e) : a(e, "default") }, Array: a, Matrix: function(e) { var t = e.storage(); return a(e.valueOf(), t) }, "Array | Matrix, string": function(e, t) { return a(e.valueOf(), t) } });

                function a(e, t) { var r = function(e) { var t = !1; return e.forEach((function(e, r, n) { o(e) && (t = !0, n[r] = e.toNumber()) })), t }(e) ? new i(0) : 0; if (function(e) { e.forEach((function(e) { if ("number" != typeof e || !V(e) || e < 0) throw new Error("Parameters in function zeros must be positive integers") })) }(e), t) { var a = n(t); return e.length > 0 ? a.resize(e, r) : a } var s = []; return e.length > 0 ? Ce(s, e, r) : s }
            })),
            ji = Ke("erf", ["typed"], (function(e) {
                return (0, e.typed)("name", {
                    number: function(e) {
                        var t = Math.abs(e);
                        return t >= $i ? Z(e) : t <= Ui ? Z(e) * function(e) {
                            var t, r = e * e,
                                n = Li[0][4] * r,
                                i = r;
                            for (t = 0; t < 3; t += 1) n = (n + Li[0][t]) * r, i = (i + Hi[0][t]) * r;
                            return e * (n + Li[0][3]) / (i + Hi[0][3])
                        }(t) : t <= 4 ? Z(e) * (1 - function(e) {
                            var t, r = Li[1][8] * e,
                                n = e;
                            for (t = 0; t < 7; t += 1) r = (r + Li[1][t]) * e, n = (n + Hi[1][t]) * e;
                            var i = (r + Li[1][7]) / (n + Hi[1][7]),
                                a = parseInt(16 * e) / 16,
                                o = (e - a) * (e + a);
                            return Math.exp(-a * a) * Math.exp(-o) * i
                        }(t)) : Z(e) * (1 - function(e) {
                            var t, r = 1 / (e * e),
                                n = Li[2][5] * r,
                                i = r;
                            for (t = 0; t < 4; t += 1) n = (n + Li[2][t]) * r, i = (i + Hi[2][t]) * r;
                            var a = r * (n + Li[2][4]) / (i + Hi[2][4]);
                            a = (Fi - a) / e, r = parseInt(16 * e) / 16;
                            var o = (e - r) * (e + r);
                            return Math.exp(-r * r) * Math.exp(-o) * a
                        }(t))
                    },
                    "Array | Matrix": function(e) { return St(e, this) }
                })
            })),
            Ui = .46875,
            Fi = .5641895835477563,
            Li = [
                [3.1611237438705655, 113.86415415105016, 377.485237685302, 3209.3775891384694, .18577770618460315],
                [.5641884969886701, 8.883149794388377, 66.11919063714163, 298.6351381974001, 881.952221241769, 1712.0476126340707, 2051.0783778260716, 1230.3393547979972, 2.1531153547440383e-8],
                [.30532663496123236, .36034489994980445, .12578172611122926, .016083785148742275, .0006587491615298378, .016315387137302097]
            ],
            Hi = [
                [23.601290952344122, 244.02463793444417, 1282.6165260773723, 2844.236833439171],
                [15.744926110709835, 117.6939508913125, 537.1811018620099, 1621.3895745666903, 3290.7992357334597, 4362.619090143247, 3439.3676741437216, 1230.3393548037495],
                [2.568520192289822, 1.8729528499234604, .5279051029514285, .06051834131244132, .0023352049762686918]
            ],
            $i = Math.pow(2, 53),
            Gi = Ke("mode", ["typed", "isNaN", "isNumeric"], (function(e) {
                var t = e.typed,
                    r = e.isNaN,
                    n = e.isNumeric;
                return t("mode", { "Array | Matrix": i, "...": function(e) { return i(e) } });

                function i(e) {
                    if (0 === (e = Be(e.valueOf())).length) throw new Error("Cannot calculate mode of an empty array");
                    for (var t = {}, i = [], a = 0, o = 0; o < e.length; o++) {
                        var s = e[o];
                        if (n(s) && r(s)) throw new Error("Cannot calculate mode of an array containing NaN values");
                        s in t || (t[s] = 0), t[s]++, t[s] === a ? i.push(s) : t[s] > a && (a = t[s], i = [s])
                    }
                    return i
                }
            }));

        function Vi(e, t, r) { var n; return -1 !== String(e).indexOf("Unexpected type") ? (n = arguments.length > 2 ? " (type: " + H(r) + ", value: " + JSON.stringify(r) + ")" : " (type: " + e.data.actual + ")", new TypeError("Cannot calculate " + t + ", unexpected type of argument" + n)) : -1 !== String(e).indexOf("complex numbers") ? (n = arguments.length > 2 ? " (type: " + H(r) + ", value: " + JSON.stringify(r) + ")" : "", new TypeError("Cannot calculate " + t + ", no ordering relation is defined for complex numbers" + n)) : e }
        var Zi = Ke("prod", ["typed", "config", "multiplyScalar", "numeric"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.multiplyScalar,
                    i = e.numeric;
                return t("prod", { "Array | Matrix": a, "Array | Matrix, number | BigNumber": function(e, t) { throw new Error("prod(A, dim) is not yet supported") }, "...": function(e) { return a(e) } });

                function a(e) { var t; if (Mt(e, (function(e) { try { t = void 0 === t ? e : n(t, e) } catch (t) { throw Vi(t, "prod", e) } })), "string" == typeof t && (t = i(t, r.number)), void 0 === t) throw new Error("Cannot calculate prod of an empty array"); return t }
            })),
            Wi = Ke("format", ["typed"], (function(e) { return (0, e.typed)("format", { any: xe, "any, Object | function | number": xe }) })),
            Ji = Ke("bin", ["typed", "format"], (function(e) {
                var t = e.typed,
                    r = e.format;
                return t("bin", { "number | BigNumber": function(e) { return r(e, { notation: "bin" }) }, "number | BigNumber, number": function(e, t) { return r(e, { notation: "bin", wordSize: t }) } })
            })),
            Yi = Ke("oct", ["typed", "format"], (function(e) {
                var t = e.typed,
                    r = e.format;
                return t("oct", { "number | BigNumber": function(e) { return r(e, { notation: "oct" }) }, "number | BigNumber, number": function(e, t) { return r(e, { notation: "oct", wordSize: t }) } })
            })),
            Xi = Ke("hex", ["typed", "format"], (function(e) {
                var t = e.typed,
                    r = e.format;
                return t("hex", { "number | BigNumber": function(e) { return r(e, { notation: "hex" }) }, "number | BigNumber, number": function(e, t) { return r(e, { notation: "hex", wordSize: t }) } })
            })),
            Qi = Ke("print", ["typed"], (function(e) { return (0, e.typed)("print", { "string, Object | Array": Ki, "string, Object | Array, number | Object": Ki }) }));

        function Ki(e, t, r) {
            return e.replace(/\$([\w.]+)/g, (function(e, n) {
                for (var i = n.split("."), a = t[i.shift()]; i.length && void 0 !== a;) {
                    var o = i.shift();
                    a = o ? a[o] : a + "."
                }
                return void 0 !== a ? f(a) ? a : xe(a, r) : e
            }))
        }
        var ea = Ke("to", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = Lr({ typed: t }),
                    i = Cr({ typed: t });
                return t("to", { "Unit, Unit | string": function(e, t) { return e.to(t) }, "Matrix, Matrix": function(e, t) { return n(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "Matrix, any": function(e, t) { return i(e, t, this, !1) }, "any, Matrix": function(e, t) { return i(t, e, this, !0) }, "Array, any": function(e, t) { return i(r(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return i(r(t), e, this, !0).valueOf() } })
            })),
            ta = Ke("isPrime", ["typed"], (function(e) {
                return (0, e.typed)("isPrime", {
                    number: function(e) {
                        if (0 * e != 0) return !1;
                        if (e <= 3) return e > 1;
                        if (e % 2 == 0 || e % 3 == 0) return !1;
                        for (var t = 5; t * t <= e; t += 6)
                            if (e % t == 0 || e % (t + 2) == 0) return !1;
                        return !0
                    },
                    BigNumber: function(e) {
                        if (0 * e.toNumber() != 0) return !1;
                        if (e.lte(3)) return e.gt(1);
                        if (e.mod(2).eq(0) || e.mod(3).eq(0)) return !1;
                        if (e.lt(Math.pow(2, 32))) {
                            for (var t = e.toNumber(), r = 5; r * r <= t; r += 6)
                                if (t % r == 0 || t % (r + 2) == 0) return !1;
                            return !0
                        }

                        function n(e, t, r) { for (var n = 1; !t.eq(0);) t.mod(2).eq(0) ? (t = t.div(2), e = e.mul(e).mod(r)) : (t = t.sub(1), n = e.mul(n).mod(r)); return n }
                        for (var i = e.constructor.clone({ precision: 2 * e.toFixed(0).length }), a = 0, o = (e = new i(e)).sub(1); o.mod(2).eq(0);) o = o.div(2), a += 1;
                        var s = null;
                        if (e.lt("3317044064679887385961981")) s = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41].filter((function(t) { return t < e }));
                        else {
                            var u = Math.min(e.toNumber() - 2, Math.floor(2 * Math.pow(e.toFixed(0).length * Math.log(10), 2)));
                            s = [];
                            for (var c = 2; c <= u; c += 1) s.push(u)
                        }
                        for (var f = 0; f < s.length; f += 1) {
                            var l = s[f],
                                p = n(e.sub(e).add(l), o, e);
                            if (!p.eq(1))
                                for (var m = 0, h = p; !h.eq(e.sub(1)); m += 1, h = h.mul(h).mod(e))
                                    if (m === a - 1) return !1
                        }
                        return !0
                    },
                    "Array | Matrix": function(e) { return St(e, this) }
                })
            })),
            ra = Ke("numeric", ["number", "?bignumber", "?fraction"], (function(e) {
                var t = e.number,
                    r = e.bignumber,
                    n = e.fraction,
                    i = { string: !0, number: !0, BigNumber: !0, Fraction: !0 },
                    a = { number: function(e) { return t(e) }, BigNumber: r ? function(e) { return r(e) } : li, Fraction: n ? function(e) { return n(e) } : pi };
                return function(e, t) { var r = H(e); if (!(r in i)) throw new TypeError("Cannot convert " + e + ' of type "' + r + '"; valid input types are ' + Object.keys(i).join(", ")); if (!(t in a)) throw new TypeError("Cannot convert " + e + ' to type "' + t + '"; valid output types are ' + Object.keys(a).join(", ")); return t === r ? e : a[t](e) }
            })),
            na = Ke("divideScalar", ["typed", "numeric"], (function(e) {
                var t = e.typed,
                    r = e.numeric;
                return t("divideScalar", {
                    "number, number": function(e, t) { return e / t },
                    "Complex, Complex": function(e, t) { return e.div(t) },
                    "BigNumber, BigNumber": function(e, t) { return e.div(t) },
                    "Fraction, Fraction": function(e, t) { return e.div(t) },
                    "Unit, number | Fraction | BigNumber": function(e, t) {
                        var n = e.clone(),
                            i = r(1, H(t));
                        return n.value = this(null === n.value ? n._normalize(i) : n.value, t), n
                    },
                    "number | Fraction | BigNumber, Unit": function(e, t) {
                        var n = t.clone();
                        n = n.pow(-1);
                        var i = r(1, H(e));
                        return n.value = this(e, null === t.value ? t._normalize(i) : t.value), n
                    },
                    "Unit, Unit": function(e, t) { return e.divide(t) }
                })
            })),
            ia = Ke("pow", ["typed", "config", "identity", "multiply", "matrix", "fraction", "number", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.identity,
                    i = e.multiply,
                    a = e.matrix,
                    o = e.number,
                    s = e.fraction,
                    u = e.Complex;
                return t("pow", { "number, number": c, "Complex, Complex": function(e, t) { return e.pow(t) }, "BigNumber, BigNumber": function(e, t) { return t.isInteger() || e >= 0 || r.predictable ? e.pow(t) : new u(e.toNumber(), 0).pow(t.toNumber(), 0) }, "Fraction, Fraction": function(e, t) { if (1 !== t.d) { if (r.predictable) throw new Error("Function pow does not support non-integer exponents for fractions."); return c(e.valueOf(), t.valueOf()) } return e.pow(t) }, "Array, number": f, "Array, BigNumber": function(e, t) { return f(e, t.toNumber()) }, "Matrix, number": l, "Matrix, BigNumber": function(e, t) { return l(e, t.toNumber()) }, "Unit, number | BigNumber": function(e, t) { return e.pow(t) } });

                function c(e, t) {
                    if (r.predictable && !V(t) && e < 0) try {
                        var n = s(t),
                            i = o(n);
                        if ((t === i || Math.abs((t - i) / t) < 1e-14) && n.d % 2 == 1) return (n.n % 2 == 0 ? 1 : -1) * Math.pow(-e, t)
                    } catch (e) {}
                    return r.predictable && (e < -1 && t === 1 / 0 || e > -1 && e < 0 && t === -1 / 0) ? NaN : V(t) || e >= 0 || r.predictable ? vr(e, t) : e * e < 1 && t === 1 / 0 || e * e > 1 && t === -1 / 0 ? 0 : new u(e, 0).pow(t, 0)
                }

                function f(e, t) { if (!V(t) || t < 0) throw new TypeError("For A^b, b must be a positive integer (value is " + t + ")"); var r = Ee(e); if (2 !== r.length) throw new Error("For A^b, A must be 2 dimensional (A has " + r.length + " dimensions)"); if (r[0] !== r[1]) throw new Error("For A^b, A must be square (size is " + r[0] + "x" + r[1] + ")"); for (var a = n(r[0]).valueOf(), o = e; t >= 1;) 1 == (1 & t) && (a = i(o, a)), t >>= 1, o = i(o, o); return a }

                function l(e, t) { return a(f(e.valueOf(), t)) }
            }));

        function aa(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), r.push.apply(r, n)
            }
            return r
        }

        function oa(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? aa(Object(r), !0).forEach((function(t) { sa(e, t, r[t]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : aa(Object(r)).forEach((function(t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t)) }))
            }
            return e
        }

        function sa(e, t, r) { return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e }
        var ua = "Number of decimals in function round must be an integer",
            ca = Ke("round", ["typed", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.zeros,
                    a = e.BigNumber,
                    o = e.DenseMatrix,
                    s = Or({ typed: t, equalScalar: n }),
                    u = Xr({ typed: t, DenseMatrix: o }),
                    c = Cr({ typed: t });
                return t("round", oa(oa({}, fa), {}, { Complex: function(e) { return e.round() }, "Complex, number": function(e, t) { if (t % 1) throw new TypeError(ua); return e.round(t) }, "Complex, BigNumber": function(e, t) { if (!t.isInteger()) throw new TypeError(ua); var r = t.toNumber(); return e.round(r) }, "number, BigNumber": function(e, t) { if (!t.isInteger()) throw new TypeError(ua); return new a(e).toDecimalPlaces(t.toNumber()) }, BigNumber: function(e) { return e.toDecimalPlaces(0) }, "BigNumber, BigNumber": function(e, t) { if (!t.isInteger()) throw new TypeError(ua); return e.toDecimalPlaces(t.toNumber()) }, Fraction: function(e) { return e.round() }, "Fraction, number": function(e, t) { if (t % 1) throw new TypeError(ua); return e.round(t) }, "Array | Matrix": function(e) { return St(e, this, !0) }, "SparseMatrix, number | BigNumber": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, number | BigNumber": function(e, t) { return c(e, t, this, !1) }, "number | Complex | BigNumber, SparseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : u(t, e, this, !0) }, "number | Complex | BigNumber, DenseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : c(t, e, this, !0) }, "Array, number | BigNumber": function(e, t) { return c(r(e), t, this, !1).valueOf() }, "number | Complex | BigNumber, Array": function(e, t) { return c(r(t), e, this, !0).valueOf() } }))
            })),
            fa = { number: xr, "number, number": function(e, t) { if (!V(t)) throw new TypeError(ua); if (t < 0 || t > 15) throw new Error("Number of decimals in function round must be in te range of 0-15"); return xr(e, t) } },
            la = Ke("log", ["config", "typed", "divideScalar", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.divideScalar,
                    i = e.Complex;
                return t("log", { number: function(e) { return e >= 0 || r.predictable ? fr(e) : new i(e, 0).log() }, Complex: function(e) { return e.log() }, BigNumber: function(e) { return !e.isNegative() || r.predictable ? e.ln() : new i(e.toNumber(), 0).log() }, "Array | Matrix": function(e) { return St(e, this) }, "any, any": function(e, t) { return n(this(e), this(t)) } })
            })),
            pa = Ke("log1p", ["typed", "config", "divideScalar", "log", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.divideScalar,
                    i = e.log,
                    a = e.Complex;
                return t("log1p", { number: function(e) { return e >= -1 || r.predictable ? Y(e) : o(new a(e, 0)) }, Complex: o, BigNumber: function(e) { var t = e.plus(1); return !t.isNegative() || r.predictable ? t.ln() : o(new a(e.toNumber(), 0)) }, "Array | Matrix": function(e) { return St(e, this) }, "any, any": function(e, t) { return n(this(e), i(t)) } });

                function o(e) { var t = e.re + 1; return new a(Math.log(Math.sqrt(t * t + e.im * e.im)), Math.atan2(e.im, t)) }
            })),
            ma = Ke("nthRoots", ["config", "typed", "divideScalar", "Complex"], (function(e) {
                var t = e.typed,
                    r = (e.config, e.divideScalar, e.Complex),
                    n = [function(e) { return new r(e, 0) }, function(e) { return new r(0, e) }, function(e) { return new r(-e, 0) }, function(e) { return new r(0, -e) }];

                function i(e, t) {
                    if (t < 0) throw new Error("Root must be greater than zero");
                    if (0 === t) throw new Error("Root must be non-zero");
                    if (t % 1 != 0) throw new Error("Root must be an integer");
                    if (0 === e || 0 === e.abs()) return [new r(0, 0)];
                    var i, a = "number" == typeof e;
                    (a || 0 === e.re || 0 === e.im) && (i = a ? 2 * +(e < 0) : 0 === e.im ? 2 * +(e.re < 0) : 2 * +(e.im < 0) + 1);
                    for (var o = e.arg(), s = e.abs(), u = [], c = Math.pow(s, 1 / t), f = 0; f < t; f++) {
                        var l = (i + 4 * f) / t;
                        l !== Math.round(l) ? u.push(new r({ r: c, phi: (o + 2 * Math.PI * f) / t })) : u.push(n[l % 4](c))
                    }
                    return u
                }
                return t("nthRoots", { Complex: function(e) { return i(e, 2) }, "Complex, number": i })
            })),
            ha = Ke("dotPow", ["typed", "equalScalar", "matrix", "pow", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar,
                    n = e.matrix,
                    i = e.pow,
                    a = e.DenseMatrix,
                    o = Jr({ typed: t }),
                    s = Tn({ typed: t, DenseMatrix: a }),
                    u = Or({ typed: t, equalScalar: r }),
                    c = Xr({ typed: t, DenseMatrix: a }),
                    f = Lr({ typed: t }),
                    l = Cr({ typed: t });
                return t("dotPow", { "any, any": i, "SparseMatrix, SparseMatrix": function(e, t) { return s(e, t, i, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, i, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, i, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return f(e, t, i) }, "Array, Array": function(e, t) { return this(n(e), n(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(n(e), t) }, "Matrix, Array": function(e, t) { return this(e, n(t)) }, "SparseMatrix, any": function(e, t) { return u(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return l(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return c(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return l(t, e, this, !0) }, "Array, any": function(e, t) { return l(n(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return l(n(t), e, this, !0).valueOf() } })
            })),
            da = Ke("dotDivide", ["typed", "matrix", "equalScalar", "divideScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.divideScalar,
                    a = e.DenseMatrix,
                    o = $r({ typed: t, equalScalar: n }),
                    s = Jr({ typed: t }),
                    u = Tn({ typed: t, DenseMatrix: a }),
                    c = Or({ typed: t, equalScalar: n }),
                    f = Xr({ typed: t, DenseMatrix: a }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("dotDivide", { "any, any": i, "SparseMatrix, SparseMatrix": function(e, t) { return u(e, t, i, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, i, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return s(e, t, i, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return l(e, t, i) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return c(e, t, i, !1) }, "DenseMatrix, any": function(e, t) { return p(e, t, i, !1) }, "any, SparseMatrix": function(e, t) { return f(t, e, i, !0) }, "any, DenseMatrix": function(e, t) { return p(t, e, i, !0) }, "Array, any": function(e, t) { return p(r(e), t, i, !1).valueOf() }, "any, Array": function(e, t) { return p(r(t), e, i, !0).valueOf() } })
            }));

        function ya(e) {
            var t = e.DenseMatrix;
            return function(e, r, n) {
                var i = e.size();
                if (2 !== i.length) throw new RangeError("Matrix must be two dimensional (size: " + xe(i) + ")");
                var a = i[0];
                if (a !== i[1]) throw new RangeError("Matrix must be square (size: " + xe(i) + ")");
                var o = [];
                if (p(r)) {
                    var s = r.size(),
                        u = r._data;
                    if (1 === s.length) { if (s[0] !== a) throw new RangeError("Dimension mismatch. Matrix columns must match vector length."); for (var c = 0; c < a; c++) o[c] = [u[c]]; return new t({ data: o, size: [a, 1], datatype: r._datatype }) }
                    if (2 === s.length) { if (s[0] !== a || 1 !== s[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length."); if (h(r)) { if (n) { o = []; for (var f = 0; f < a; f++) o[f] = [u[f][0]]; return new t({ data: o, size: [a, 1], datatype: r._datatype }) } return r } if (d(r)) { for (var m = 0; m < a; m++) o[m] = [0]; for (var y = r._values, g = r._index, v = r._ptr, x = v[1], b = v[0]; b < x; b++) { o[g[b]][0] = y[b] } return new t({ data: o, size: [a, 1], datatype: r._datatype }) } }
                    throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.")
                }
                if (l(r)) { var w = Ee(r); if (1 === w.length) { if (w[0] !== a) throw new RangeError("Dimension mismatch. Matrix columns must match vector length."); for (var N = 0; N < a; N++) o[N] = [r[N]]; return new t({ data: o, size: [a, 1] }) } if (2 === w.length) { if (w[0] !== a || 1 !== w[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length."); for (var M = 0; M < a; M++) o[M] = [r[M][0]]; return new t({ data: o, size: [a, 1] }) } throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.") }
            }
        }
        var ga = Ke("lsolve", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.divideScalar,
                    i = e.multiplyScalar,
                    a = e.subtract,
                    o = e.equalScalar,
                    s = e.DenseMatrix,
                    u = ya({ DenseMatrix: s });
                return t("lsolve", {
                    "SparseMatrix, Array | Matrix": function(e, t) {
                        return function(e, t) {
                            for (var r = (t = u(e, t, !0))._data, c = e._size[0], f = e._size[1], l = e._values, p = e._index, m = e._ptr, h = [], d = 0; d < f; d++) {
                                var y = r[d][0] || 0;
                                if (o(y, 0)) h[d] = [0];
                                else {
                                    for (var g = 0, v = [], x = [], b = m[d], w = m[d + 1], N = b; N < w; N++) {
                                        var M = p[N];
                                        M === d ? g = l[N] : M > d && (v.push(l[N]), x.push(M))
                                    }
                                    if (o(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                                    for (var S = n(y, g), E = 0, A = x.length; E < A; E++) {
                                        var O = x[E];
                                        r[O] = [a(r[O][0] || 0, i(S, v[E]))]
                                    }
                                    h[d] = [S]
                                }
                            }
                            return new s({ data: h, size: [c, 1] })
                        }(e, t)
                    },
                    "DenseMatrix, Array | Matrix": function(e, t) { return c(e, t) },
                    "Array, Array | Matrix": function(e, t) { return c(r(e), t).valueOf() }
                });

                function c(e, t) {
                    for (var r = (t = u(e, t, !0))._data, c = e._size[0], f = e._size[1], l = [], p = e._data, m = 0; m < f; m++) {
                        var h = r[m][0] || 0,
                            d = void 0;
                        if (o(h, 0)) d = 0;
                        else {
                            var y = p[m][m];
                            if (o(y, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                            d = n(h, y);
                            for (var g = m + 1; g < c; g++) r[g] = [a(r[g][0] || 0, i(d, p[g][m]))]
                        }
                        l[m] = [d]
                    }
                    return new s({ data: l, size: [c, 1] })
                }
            })),
            va = Ke("usolve", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.divideScalar,
                    i = e.multiplyScalar,
                    a = e.subtract,
                    o = e.equalScalar,
                    s = e.DenseMatrix,
                    u = ya({ DenseMatrix: s });
                return t("usolve", {
                    "SparseMatrix, Array | Matrix": function(e, t) {
                        return function(e, t) {
                            for (var r = (t = u(e, t, !0))._data, c = e._size[0], f = e._size[1], l = e._values, p = e._index, m = e._ptr, h = [], d = f - 1; d >= 0; d--) {
                                var y = r[d][0] || 0;
                                if (o(y, 0)) h[d] = [0];
                                else {
                                    for (var g = 0, v = [], x = [], b = m[d], w = m[d + 1] - 1; w >= b; w--) {
                                        var N = p[w];
                                        N === d ? g = l[w] : N < d && (v.push(l[w]), x.push(N))
                                    }
                                    if (o(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                                    for (var M = n(y, g), S = 0, E = x.length; S < E; S++) {
                                        var A = x[S];
                                        r[A] = [a(r[A][0], i(M, v[S]))]
                                    }
                                    h[d] = [M]
                                }
                            }
                            return new s({ data: h, size: [c, 1] })
                        }(e, t)
                    },
                    "DenseMatrix, Array | Matrix": function(e, t) { return c(e, t) },
                    "Array, Array | Matrix": function(e, t) { return c(r(e), t).valueOf() }
                });

                function c(e, t) {
                    for (var r = (t = u(e, t, !0))._data, c = e._size[0], f = e._size[1], l = [], p = e._data, m = f - 1; m >= 0; m--) {
                        var h = r[m][0] || 0,
                            d = void 0;
                        if (o(h, 0)) d = 0;
                        else {
                            var y = p[m][m];
                            if (o(y, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                            d = n(h, y);
                            for (var g = m - 1; g >= 0; g--) r[g] = [a(r[g][0] || 0, i(d, p[g][m]))]
                        }
                        l[m] = [d]
                    }
                    return new s({ data: l, size: [c, 1] })
                }
            }));

        function xa(e) { return function(e) { if (Array.isArray(e)) return ba(e) }(e) || function(e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || function(e, t) { if (!e) return; if ("string" == typeof e) return ba(e, t); var r = Object.prototype.toString.call(e).slice(8, -1); "Object" === r && e.constructor && (r = e.constructor.name); if ("Map" === r || "Set" === r) return Array.from(e); if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ba(e, t) }(e) || function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() }

        function ba(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }
        var wa = Ke("lsolveAll", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], (function(e) {
            var t = e.typed,
                r = e.matrix,
                n = e.divideScalar,
                i = e.multiplyScalar,
                a = e.subtract,
                o = e.equalScalar,
                s = e.DenseMatrix,
                u = ya({ DenseMatrix: s });
            return t("lsolveAll", {
                "SparseMatrix, Array | Matrix": function(e, t) {
                    return function(e, t) {
                        for (var r = [u(e, t, !0)._data.map((function(e) { return e[0] }))], c = e._size[0], f = e._size[1], l = e._values, p = e._index, m = e._ptr, h = 0; h < f; h++)
                            for (var d = r.length, y = 0; y < d; y++) {
                                for (var g = r[y], v = [], x = [], b = m[h], w = m[h + 1], N = 0, M = b; M < w; M++) {
                                    var S = p[M];
                                    S === h ? N = l[M] : S > h && (v.push(l[M]), x.push(S))
                                }
                                if (o(N, 0))
                                    if (o(g[h], 0)) {
                                        if (0 === y) {
                                            var E = xa(g);
                                            E[h] = 1;
                                            for (var A = 0, O = x.length; A < O; A++) {
                                                var C = x[A];
                                                E[C] = a(E[C], v[A])
                                            }
                                            r.push(E)
                                        }
                                    } else {
                                        if (0 === y) return [];
                                        r.splice(y, 1), y -= 1, d -= 1
                                    }
                                else {
                                    g[h] = n(g[h], N);
                                    for (var _ = 0, T = x.length; _ < T; _++) {
                                        var z = x[_];
                                        g[z] = a(g[z], i(g[h], v[_]))
                                    }
                                }
                            }
                        return r.map((function(e) { return new s({ data: e.map((function(e) { return [e] })), size: [c, 1] }) }))
                    }(e, t)
                },
                "DenseMatrix, Array | Matrix": function(e, t) { return c(e, t) },
                "Array, Array | Matrix": function(e, t) { return c(r(e), t).map((function(e) { return e.valueOf() })) }
            });

            function c(e, t) {
                for (var r = [u(e, t, !0)._data.map((function(e) { return e[0] }))], c = e._data, f = e._size[0], l = e._size[1], p = 0; p < l; p++)
                    for (var m = r.length, h = 0; h < m; h++) {
                        var d = r[h];
                        if (o(c[p][p], 0))
                            if (o(d[p], 0)) {
                                if (0 === h) {
                                    var y = xa(d);
                                    y[p] = 1;
                                    for (var g = p + 1; g < l; g++) y[g] = a(y[g], c[g][p]);
                                    r.push(y)
                                }
                            } else {
                                if (0 === h) return [];
                                r.splice(h, 1), h -= 1, m -= 1
                            }
                        else { d[p] = n(d[p], c[p][p]); for (var v = p + 1; v < l; v++) d[v] = a(d[v], i(d[p], c[v][p])) }
                    }
                return r.map((function(e) { return new s({ data: e.map((function(e) { return [e] })), size: [f, 1] }) }))
            }
        }));

        function Na(e) { return function(e) { if (Array.isArray(e)) return Ma(e) }(e) || function(e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || function(e, t) { if (!e) return; if ("string" == typeof e) return Ma(e, t); var r = Object.prototype.toString.call(e).slice(8, -1); "Object" === r && e.constructor && (r = e.constructor.name); if ("Map" === r || "Set" === r) return Array.from(e); if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ma(e, t) }(e) || function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() }

        function Ma(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }
        var Sa = Ke("usolveAll", ["typed", "matrix", "divideScalar", "multiplyScalar", "subtract", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.divideScalar,
                    i = e.multiplyScalar,
                    a = e.subtract,
                    o = e.equalScalar,
                    s = e.DenseMatrix,
                    u = ya({ DenseMatrix: s });
                return t("usolveAll", {
                    "SparseMatrix, Array | Matrix": function(e, t) {
                        return function(e, t) {
                            for (var r = [u(e, t, !0)._data.map((function(e) { return e[0] }))], c = e._size[0], f = e._size[1], l = e._values, p = e._index, m = e._ptr, h = f - 1; h >= 0; h--)
                                for (var d = r.length, y = 0; y < d; y++) {
                                    for (var g = r[y], v = [], x = [], b = m[h], w = m[h + 1], N = 0, M = w - 1; M >= b; M--) {
                                        var S = p[M];
                                        S === h ? N = l[M] : S < h && (v.push(l[M]), x.push(S))
                                    }
                                    if (o(N, 0))
                                        if (o(g[h], 0)) {
                                            if (0 === y) {
                                                var E = Na(g);
                                                E[h] = 1;
                                                for (var A = 0, O = x.length; A < O; A++) {
                                                    var C = x[A];
                                                    E[C] = a(E[C], v[A])
                                                }
                                                r.push(E)
                                            }
                                        } else {
                                            if (0 === y) return [];
                                            r.splice(y, 1), y -= 1, d -= 1
                                        }
                                    else {
                                        g[h] = n(g[h], N);
                                        for (var _ = 0, T = x.length; _ < T; _++) {
                                            var z = x[_];
                                            g[z] = a(g[z], i(g[h], v[_]))
                                        }
                                    }
                                }
                            return r.map((function(e) { return new s({ data: e.map((function(e) { return [e] })), size: [c, 1] }) }))
                        }(e, t)
                    },
                    "DenseMatrix, Array | Matrix": function(e, t) { return c(e, t) },
                    "Array, Array | Matrix": function(e, t) { return c(r(e), t).map((function(e) { return e.valueOf() })) }
                });

                function c(e, t) {
                    for (var r = [u(e, t, !0)._data.map((function(e) { return e[0] }))], c = e._data, f = e._size[0], l = e._size[1] - 1; l >= 0; l--)
                        for (var p = r.length, m = 0; m < p; m++) {
                            var h = r[m];
                            if (o(c[l][l], 0))
                                if (o(h[l], 0)) {
                                    if (0 === m) {
                                        var d = Na(h);
                                        d[l] = 1;
                                        for (var y = l - 1; y >= 0; y--) d[y] = a(d[y], c[y][l]);
                                        r.push(d)
                                    }
                                } else {
                                    if (0 === m) return [];
                                    r.splice(m, 1), m -= 1, p -= 1
                                }
                            else { h[l] = n(h[l], c[l][l]); for (var g = l - 1; g >= 0; g--) h[g] = a(h[g], i(h[l], c[g][l])) }
                        }
                    return r.map((function(e) { return new s({ data: e.map((function(e) { return [e] })), size: [f, 1] }) }))
                }
            })),
            Ea = Ke("algorithm08", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return function(e, n, i) {
                    var a = e._values,
                        o = e._index,
                        s = e._ptr,
                        u = e._size,
                        c = e._datatype,
                        f = n._values,
                        l = n._index,
                        p = n._ptr,
                        m = n._size,
                        h = n._datatype;
                    if (u.length !== m.length) throw new Me(u.length, m.length);
                    if (u[0] !== m[0] || u[1] !== m[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + m + ")");
                    if (!a || !f) throw new Error("Cannot perform operation on Pattern Sparse Matrices");
                    var d, y = u[0],
                        g = u[1],
                        v = r,
                        x = 0,
                        b = i;
                    "string" == typeof c && c === h && (d = c, v = t.find(r, [d, d]), x = t.convert(0, d), b = t.find(i, [d, d]));
                    for (var w, N, M, S, E = [], A = [], O = [], C = [], _ = [], T = 0; T < g; T++) {
                        O[T] = A.length;
                        var z = T + 1;
                        for (N = s[T], M = s[T + 1], w = N; w < M; w++) _[S = o[w]] = z, C[S] = a[w], A.push(S);
                        for (N = p[T], M = p[T + 1], w = N; w < M; w++) _[S = l[w]] === z && (C[S] = b(C[S], f[w]));
                        for (w = O[T]; w < A.length;) {
                            var q = C[S = A[w]];
                            v(q, x) ? A.splice(w, 1) : (E.push(q), w++)
                        }
                    }
                    return O[g] = A.length, e.createSparseMatrix({ values: E, index: A, ptr: O, size: [y, g], datatype: d })
                }
            })),
            Aa = Ke("leftShift", ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.zeros,
                    a = e.DenseMatrix,
                    o = jr({ typed: t }),
                    s = $r({ typed: t, equalScalar: n }),
                    u = Ea({ typed: t, equalScalar: n }),
                    c = Fr({ typed: t, DenseMatrix: a }),
                    f = Or({ typed: t, equalScalar: n }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("leftShift", { "number, number": Sn, "BigNumber, BigNumber": gn, "SparseMatrix, SparseMatrix": function(e, t) { return u(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return s(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return l(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, number | BigNumber": function(e, t) { return n(t, 0) ? e.clone() : f(e, t, this, !1) }, "DenseMatrix, number | BigNumber": function(e, t) { return n(t, 0) ? e.clone() : p(e, t, this, !1) }, "number | BigNumber, SparseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : c(t, e, this, !0) }, "number | BigNumber, DenseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : p(t, e, this, !0) }, "Array, number | BigNumber": function(e, t) { return this(r(e), t).valueOf() }, "number | BigNumber, Array": function(e, t) { return this(e, r(t)).valueOf() } })
            })),
            Oa = Ke("rightArithShift", ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.zeros,
                    a = e.DenseMatrix,
                    o = jr({ typed: t }),
                    s = $r({ typed: t, equalScalar: n }),
                    u = Ea({ typed: t, equalScalar: n }),
                    c = Fr({ typed: t, DenseMatrix: a }),
                    f = Or({ typed: t, equalScalar: n }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("rightArithShift", { "number, number": En, "BigNumber, BigNumber": vn, "SparseMatrix, SparseMatrix": function(e, t) { return u(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return s(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return l(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, number | BigNumber": function(e, t) { return n(t, 0) ? e.clone() : f(e, t, this, !1) }, "DenseMatrix, number | BigNumber": function(e, t) { return n(t, 0) ? e.clone() : p(e, t, this, !1) }, "number | BigNumber, SparseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : c(t, e, this, !0) }, "number | BigNumber, DenseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : p(t, e, this, !0) }, "Array, number | BigNumber": function(e, t) { return this(r(e), t).valueOf() }, "number | BigNumber, Array": function(e, t) { return this(e, r(t)).valueOf() } })
            })),
            Ca = Ke("rightLogShift", ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.zeros,
                    a = e.DenseMatrix,
                    o = jr({ typed: t }),
                    s = $r({ typed: t, equalScalar: n }),
                    u = Ea({ typed: t, equalScalar: n }),
                    c = Fr({ typed: t, DenseMatrix: a }),
                    f = Or({ typed: t, equalScalar: n }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("rightLogShift", { "number, number": An, "SparseMatrix, SparseMatrix": function(e, t) { return u(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return s(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return l(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, number | BigNumber": function(e, t) { return n(t, 0) ? e.clone() : f(e, t, this, !1) }, "DenseMatrix, number | BigNumber": function(e, t) { return n(t, 0) ? e.clone() : p(e, t, this, !1) }, "number | BigNumber, SparseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : c(t, e, this, !0) }, "number | BigNumber, DenseMatrix": function(e, t) { return n(e, 0) ? i(t.size(), t.storage()) : p(t, e, this, !0) }, "Array, number | BigNumber": function(e, t) { return this(r(e), t).valueOf() }, "number | BigNumber, Array": function(e, t) { return this(e, r(t)).valueOf() } })
            })),
            _a = Ke("and", ["typed", "matrix", "equalScalar", "zeros", "not"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.zeros,
                    a = e.not,
                    o = $r({ typed: t, equalScalar: n }),
                    s = Gr({ typed: t, equalScalar: n }),
                    u = Or({ typed: t, equalScalar: n }),
                    c = Lr({ typed: t }),
                    f = Cr({ typed: t });
                return t("and", { "number, number": jn, "Complex, Complex": function(e, t) { return !(0 === e.re && 0 === e.im || 0 === t.re && 0 === t.im) }, "BigNumber, BigNumber": function(e, t) { return !(e.isZero() || t.isZero() || e.isNaN() || t.isNaN()) }, "Unit, Unit": function(e, t) { return this(e.value || 0, t.value || 0) }, "SparseMatrix, SparseMatrix": function(e, t) { return s(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return c(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return a(t) ? i(e.size(), e.storage()) : u(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return a(t) ? i(e.size(), e.storage()) : f(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return a(e) ? i(e.size(), e.storage()) : u(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return a(e) ? i(e.size(), e.storage()) : f(t, e, this, !0) }, "Array, any": function(e, t) { return this(r(e), t).valueOf() }, "any, Array": function(e, t) { return this(e, r(t)).valueOf() } })
            })),
            Ta = Ke("compare", ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.equalScalar,
                    i = e.matrix,
                    a = e.BigNumber,
                    o = e.Fraction,
                    s = e.DenseMatrix,
                    u = Jr({ typed: t }),
                    c = Yr({ typed: t, equalScalar: n }),
                    f = Xr({ typed: t, DenseMatrix: s }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("compare", { "boolean, boolean": function(e, t) { return e === t ? 0 : e > t ? 1 : -1 }, "number, number": function(e, t) { return se(e, t, r.epsilon) ? 0 : e > t ? 1 : -1 }, "BigNumber, BigNumber": function(e, t) { return Ut(e, t, r.epsilon) ? new a(0) : new a(e.cmp(t)) }, "Fraction, Fraction": function(e, t) { return new o(e.compare(t)) }, "Complex, Complex": function() { throw new TypeError("No ordering relation is defined for complex numbers") }, "Unit, Unit": function(e, t) { if (!e.equalBase(t)) throw new Error("Cannot compare units with different base"); return this(e.value, t.value) }, "SparseMatrix, SparseMatrix": function(e, t) { return c(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return u(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return u(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return l(e, t, this) }, "Array, Array": function(e, t) { return this(i(e), i(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(i(e), t) }, "Matrix, Array": function(e, t) { return this(e, i(t)) }, "SparseMatrix, any": function(e, t) { return f(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return p(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return f(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return p(t, e, this, !0) }, "Array, any": function(e, t) { return p(i(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return p(i(t), e, this, !0).valueOf() } })
            })),
            za = r(4),
            qa = r.n(za),
            Ia = Ke("compareNatural", ["typed", "compare"], (function(e) {
                var t = e.typed,
                    r = e.compare,
                    n = r.signatures["boolean,boolean"];
                return t("compareNatural", {
                    "any, any": function(e, t) {
                        var a, o = H(e),
                            s = H(t);
                        if (!("number" !== o && "BigNumber" !== o && "Fraction" !== o || "number" !== s && "BigNumber" !== s && "Fraction" !== s)) return "0" !== (a = r(e, t)).toString() ? a > 0 ? 1 : -1 : qa()(o, s);
                        if ("Array" === o || "Matrix" === o || "Array" === s || "Matrix" === s) return 0 !== (a = function e(t, r, n) { if (d(r) && d(n)) return i(t, r.toJSON().values, n.toJSON().values); if (d(r)) return e(t, r.toArray(), n); if (d(n)) return e(t, r, n.toArray()); if (h(r)) return e(t, r.toJSON().data, n); if (h(n)) return e(t, r, n.toJSON().data); if (!Array.isArray(r)) return e(t, [r], n); if (!Array.isArray(n)) return e(t, r, [n]); return i(t, r, n) }(this, e, t)) ? a : qa()(o, s);
                        if (o !== s) return qa()(o, s);
                        if ("Complex" === o) return function(e, t) { if (e.re > t.re) return 1; if (e.re < t.re) return -1; if (e.im > t.im) return 1; if (e.im < t.im) return -1; return 0 }(e, t);
                        if ("Unit" === o) return e.equalBase(t) ? this(e.value, t.value) : i(this, e.formatUnits(), t.formatUnits());
                        if ("boolean" === o) return n(e, t);
                        if ("string" === o) return qa()(e, t);
                        if ("Object" === o) return function(e, t, r) {
                            var n = Object.keys(t),
                                a = Object.keys(r);
                            n.sort(qa.a), a.sort(qa.a);
                            var o = i(e, n, a);
                            if (0 !== o) return o;
                            for (var s = 0; s < n.length; s++) { var u = e(t[n[s]], r[a[s]]); if (0 !== u) return u }
                            return 0
                        }(this, e, t);
                        if ("null" === o) return 0;
                        if ("undefined" === o) return 0;
                        throw new TypeError('Unsupported type of value "' + o + '"')
                    }
                });

                function i(e, t, r) { for (var n = 0, i = Math.min(t.length, r.length); n < i; n++) { var a = e(t[n], r[n]); if (0 !== a) return a } return t.length > r.length ? 1 : t.length < r.length ? -1 : 0 }
            }));
        var Ba = Ke("compareText", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = Lr({ typed: t }),
                    i = Cr({ typed: t });
                return t("compareText", { "any, any": Ne, "DenseMatrix, DenseMatrix": function(e, t) { return n(e, t, Ne) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "DenseMatrix, any": function(e, t) { return i(e, t, Ne, !1) }, "any, DenseMatrix": function(e, t) { return i(t, e, Ne, !0) }, "Array, any": function(e, t) { return i(r(e), t, Ne, !1).valueOf() }, "any, Array": function(e, t) { return i(r(t), e, Ne, !0).valueOf() } })
            })),
            ka = Ke("equal", ["typed", "matrix", "equalScalar", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Tn({ typed: t, DenseMatrix: i }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("equal", { "any, any": function(e, t) { return null === e ? null === t : null === t ? null === e : void 0 === e ? void 0 === t : void 0 === t ? void 0 === e : n(e, t) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, n) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, n, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, n, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, n) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, n, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, n, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, n, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, n, !0) }, "Array, any": function(e, t) { return c(r(e), t, n, !1).valueOf() }, "any, Array": function(e, t) { return c(r(t), e, n, !0).valueOf() } })
            })),
            Da = (Ke("equal", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return t("equal", { "any, any": function(e, t) { return null === e ? null === t : null === t ? null === e : void 0 === e ? void 0 === t : void 0 === t ? void 0 === e : r(e, t) } })
            })), Ke("equalText", ["typed", "compareText", "isZero"], (function(e) {
                var t = e.typed,
                    r = e.compareText,
                    n = e.isZero;
                return t("equalText", { "any, any": function(e, t) { return n(r(e, t)) } })
            }))),
            Ra = Ke("smaller", ["typed", "config", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Tn({ typed: t, DenseMatrix: i }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("smaller", { "boolean, boolean": function(e, t) { return e < t }, "number, number": function(e, t) { return e < t && !se(e, t, r.epsilon) }, "BigNumber, BigNumber": function(e, t) { return e.lt(t) && !Ut(e, t, r.epsilon) }, "Fraction, Fraction": function(e, t) { return -1 === e.compare(t) }, "Complex, Complex": function(e, t) { throw new TypeError("No ordering relation is defined for complex numbers") }, "Unit, Unit": function(e, t) { if (!e.equalBase(t)) throw new Error("Cannot compare units with different base"); return this(e.value, t.value) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, this) }, "Array, Array": function(e, t) { return this(n(e), n(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(n(e), t) }, "Matrix, Array": function(e, t) { return this(e, n(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, this, !0) }, "Array, any": function(e, t) { return c(n(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return c(n(t), e, this, !0).valueOf() } })
            })),
            Pa = Ke("smallerEq", ["typed", "config", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Tn({ typed: t, DenseMatrix: i }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("smallerEq", { "boolean, boolean": function(e, t) { return e <= t }, "number, number": function(e, t) { return e <= t || se(e, t, r.epsilon) }, "BigNumber, BigNumber": function(e, t) { return e.lte(t) || Ut(e, t, r.epsilon) }, "Fraction, Fraction": function(e, t) { return 1 !== e.compare(t) }, "Complex, Complex": function() { throw new TypeError("No ordering relation is defined for complex numbers") }, "Unit, Unit": function(e, t) { if (!e.equalBase(t)) throw new Error("Cannot compare units with different base"); return this(e.value, t.value) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, this) }, "Array, Array": function(e, t) { return this(n(e), n(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(n(e), t) }, "Matrix, Array": function(e, t) { return this(e, n(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, this, !0) }, "Array, any": function(e, t) { return c(n(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return c(n(t), e, this, !0).valueOf() } })
            })),
            ja = Ke("larger", ["typed", "config", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Tn({ typed: t, DenseMatrix: i }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("larger", { "boolean, boolean": function(e, t) { return e > t }, "number, number": function(e, t) { return e > t && !se(e, t, r.epsilon) }, "BigNumber, BigNumber": function(e, t) { return e.gt(t) && !Ut(e, t, r.epsilon) }, "Fraction, Fraction": function(e, t) { return 1 === e.compare(t) }, "Complex, Complex": function() { throw new TypeError("No ordering relation is defined for complex numbers") }, "Unit, Unit": function(e, t) { if (!e.equalBase(t)) throw new Error("Cannot compare units with different base"); return this(e.value, t.value) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, this) }, "Array, Array": function(e, t) { return this(n(e), n(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(n(e), t) }, "Matrix, Array": function(e, t) { return this(e, n(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, this, !0) }, "Array, any": function(e, t) { return c(n(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return c(n(t), e, this, !0).valueOf() } })
            })),
            Ua = Ke("largerEq", ["typed", "config", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Tn({ typed: t, DenseMatrix: i }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("largerEq", { "boolean, boolean": function(e, t) { return e >= t }, "number, number": function(e, t) { return e >= t || se(e, t, r.epsilon) }, "BigNumber, BigNumber": function(e, t) { return e.gte(t) || Ut(e, t, r.epsilon) }, "Fraction, Fraction": function(e, t) { return -1 !== e.compare(t) }, "Complex, Complex": function() { throw new TypeError("No ordering relation is defined for complex numbers") }, "Unit, Unit": function(e, t) { if (!e.equalBase(t)) throw new Error("Cannot compare units with different base"); return this(e.value, t.value) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, this) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, this) }, "Array, Array": function(e, t) { return this(n(e), n(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(n(e), t) }, "Matrix, Array": function(e, t) { return this(e, n(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, this, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, this, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, this, !0) }, "Array, any": function(e, t) { return c(n(e), t, this, !1).valueOf() }, "any, Array": function(e, t) { return c(n(t), e, this, !0).valueOf() } })
            })),
            Fa = Ke("deepEqual", ["typed", "equal"], (function(e) {
                var t = e.typed,
                    r = e.equal;
                return t("deepEqual", {
                    "any, any": function(e, t) {
                        return function e(t, n) {
                            if (Array.isArray(t)) {
                                if (Array.isArray(n)) {
                                    var i = t.length;
                                    if (i !== n.length) return !1;
                                    for (var a = 0; a < i; a++)
                                        if (!e(t[a], n[a])) return !1;
                                    return !0
                                }
                                return !1
                            }
                            return !Array.isArray(n) && r(t, n)
                        }(e.valueOf(), t.valueOf())
                    }
                })
            })),
            La = Ke("unequal", ["typed", "config", "equalScalar", "matrix", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = (e.config, e.equalScalar),
                    n = e.matrix,
                    i = e.DenseMatrix,
                    a = Jr({ typed: t }),
                    o = Tn({ typed: t, DenseMatrix: i }),
                    s = Xr({ typed: t, DenseMatrix: i }),
                    u = Lr({ typed: t }),
                    c = Cr({ typed: t });
                return t("unequal", { "any, any": function(e, t) { return null === e ? null !== t : null === t ? null !== e : void 0 === e ? void 0 !== t : void 0 === t ? void 0 !== e : f(e, t) }, "SparseMatrix, SparseMatrix": function(e, t) { return o(e, t, f) }, "SparseMatrix, DenseMatrix": function(e, t) { return a(t, e, f, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return a(e, t, f, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return u(e, t, f) }, "Array, Array": function(e, t) { return this(n(e), n(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(n(e), t) }, "Matrix, Array": function(e, t) { return this(e, n(t)) }, "SparseMatrix, any": function(e, t) { return s(e, t, f, !1) }, "DenseMatrix, any": function(e, t) { return c(e, t, f, !1) }, "any, SparseMatrix": function(e, t) { return s(t, e, f, !0) }, "any, DenseMatrix": function(e, t) { return c(t, e, f, !0) }, "Array, any": function(e, t) { return c(n(e), t, f, !1).valueOf() }, "any, Array": function(e, t) { return c(n(t), e, f, !0).valueOf() } });

                function f(e, t) { return !r(e, t) }
            })),
            Ha = (Ke("unequal", ["typed", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.equalScalar;
                return t("unequal", { "any, any": function(e, t) { return null === e ? null !== t : null === t ? null !== e : void 0 === e ? void 0 !== t : void 0 === t ? void 0 !== e : !r(e, t) } })
            })), Ke("partitionSelect", ["typed", "isNumeric", "isNaN", "compare"], (function(e) {
                var t = e.typed,
                    r = e.isNumeric,
                    n = e.isNaN,
                    i = e.compare,
                    a = i,
                    o = function(e, t) { return -i(e, t) };
                return t("partitionSelect", { "Array | Matrix, number": function(e, t) { return s(e, t, a) }, "Array | Matrix, number, string": function(e, t, r) { if ("asc" === r) return s(e, t, a); if ("desc" === r) return s(e, t, o); throw new Error('Compare string must be "asc" or "desc"') }, "Array | Matrix, number, function": s });

                function s(e, t, r) { if (!V(t) || t < 0) throw new Error("k must be a non-negative integer"); if (p(e)) { if (e.size().length > 1) throw new Error("Only one dimensional matrices supported"); return u(e.valueOf(), t, r) } if (Array.isArray(e)) return u(e, t, r) }

                function u(e, t, i) {
                    if (t >= e.length) throw new Error("k out of bounds");
                    for (var a = 0; a < e.length; a++)
                        if (r(e[a]) && n(e[a])) return e[a];
                    for (var o = 0, s = e.length - 1; o < s;) {
                        for (var u = o, c = s, f = e[Math.floor(Math.random() * (s - o + 1)) + o]; u < c;)
                            if (i(e[u], f) >= 0) {
                                var l = e[c];
                                e[c] = e[u], e[u] = l, --c
                            } else ++u;
                        i(e[u], f) > 0 && --u, t <= u ? s = u : o = u + 1
                    }
                    return e[t]
                }
            }))),
            $a = Ke("sort", ["typed", "matrix", "compare", "compareNatural"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.compare,
                    i = e.compareNatural,
                    a = n,
                    o = function(e, t) { return -n(e, t) };
                return t("sort", { Array: function(e) { return u(e), e.sort(a) }, Matrix: function(e) { return c(e), r(e.toArray().sort(a), e.storage()) }, "Array, function": function(e, t) { return u(e), e.sort(t) }, "Matrix, function": function(e, t) { return c(e), r(e.toArray().sort(t), e.storage()) }, "Array, string": function(e, t) { return u(e), e.sort(s(t)) }, "Matrix, string": function(e, t) { return c(e), r(e.toArray().sort(s(t)), e.storage()) } });

                function s(e) { if ("asc" === e) return a; if ("desc" === e) return o; if ("natural" === e) return i; throw new Error('String "asc", "desc", or "natural" expected') }

                function u(e) { if (1 !== Ee(e).length) throw new Error("One dimensional array expected") }

                function c(e) { if (1 !== e.size().length) throw new Error("One dimensional matrix expected") }
            })),
            Ga = Ke("max", ["typed", "config", "numeric", "larger"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.numeric,
                    i = e.larger;
                return t("max", { "Array | Matrix": o, "Array | Matrix, number | BigNumber": function(e, t) { return Et(e, t.valueOf(), a) }, "...": function(e) { if (Nt(e)) throw new TypeError("Scalar values expected in function max"); return o(e) } });

                function a(e, t) { try { return i(e, t) ? e : t } catch (e) { throw Vi(e, "max", t) } }

                function o(e) { var t; if (Mt(e, (function(e) { try { isNaN(e) && "number" == typeof e ? t = NaN : (void 0 === t || i(e, t)) && (t = e) } catch (t) { throw Vi(t, "max", e) } })), void 0 === t) throw new Error("Cannot calculate max of an empty array"); return "string" == typeof t && (t = n(t, r.number)), t }
            })),
            Va = Ke("min", ["typed", "config", "numeric", "smaller"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.numeric,
                    i = e.smaller;
                return t("min", { "Array | Matrix": o, "Array | Matrix, number | BigNumber": function(e, t) { return Et(e, t.valueOf(), a) }, "...": function(e) { if (Nt(e)) throw new TypeError("Scalar values expected in function min"); return o(e) } });

                function a(e, t) { try { return i(e, t) ? e : t } catch (e) { throw Vi(e, "min", t) } }

                function o(e) { var t; if (Mt(e, (function(e) { try { isNaN(e) && "number" == typeof e ? t = NaN : (void 0 === t || i(e, t)) && (t = e) } catch (t) { throw Vi(t, "min", e) } })), void 0 === t) throw new Error("Cannot calculate min of an empty array"); return "string" == typeof t && (t = n(t, r.number)), t }
            })),
            Za = Ke("ImmutableDenseMatrix", ["smaller", "DenseMatrix"], (function(e) {
                var t = e.smaller,
                    r = e.DenseMatrix;

                function n(e, t) {
                    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (t && !f(t)) throw new Error("Invalid datatype: " + t);
                    if (p(e) || l(e)) {
                        var i = new r(e, t);
                        this._data = i._data, this._size = i._size, this._datatype = i._datatype, this._min = null, this._max = null
                    } else if (e && l(e.data) && l(e.size)) this._data = e.data, this._size = e.size, this._datatype = e.datatype, this._min = void 0 !== e.min ? e.min : null, this._max = void 0 !== e.max ? e.max : null;
                    else {
                        if (e) throw new TypeError("Unsupported type of data (" + H(e) + ")");
                        this._data = [], this._size = [0], this._datatype = t, this._min = null, this._max = null
                    }
                }
                return n.prototype = new r, n.prototype.type = "ImmutableDenseMatrix", n.prototype.isImmutableDenseMatrix = !0, n.prototype.subset = function(e) {
                    switch (arguments.length) {
                        case 1:
                            var t = r.prototype.subset.call(this, e);
                            return p(t) ? new n({ data: t._data, size: t._size, datatype: t._datatype }) : t;
                        case 2:
                        case 3:
                            throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
                        default:
                            throw new SyntaxError("Wrong number of arguments")
                    }
                }, n.prototype.set = function() { throw new Error("Cannot invoke set on an Immutable Matrix instance") }, n.prototype.resize = function() { throw new Error("Cannot invoke resize on an Immutable Matrix instance") }, n.prototype.reshape = function() { throw new Error("Cannot invoke reshape on an Immutable Matrix instance") }, n.prototype.clone = function() { return new n({ data: Ge(this._data), size: Ge(this._size), datatype: this._datatype }) }, n.prototype.toJSON = function() { return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype } }, n.fromJSON = function(e) { return new n(e) }, n.prototype.swapRows = function() { throw new Error("Cannot invoke swapRows on an Immutable Matrix instance") }, n.prototype.min = function() {
                    if (null === this._min) {
                        var e = null;
                        this.forEach((function(r) {
                            (null === e || t(r, e)) && (e = r)
                        })), this._min = null !== e ? e : void 0
                    }
                    return this._min
                }, n.prototype.max = function() {
                    if (null === this._max) {
                        var e = null;
                        this.forEach((function(r) {
                            (null === e || t(e, r)) && (e = r)
                        })), this._max = null !== e ? e : void 0
                    }
                    return this._max
                }, n
            }), { isClass: !0 }),
            Wa = Ke("Index", ["ImmutableDenseMatrix"], (function(e) {
                var t = e.ImmutableDenseMatrix;

                function r(e) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    this._dimensions = [], this._isScalar = !0;
                    for (var t = 0, i = arguments.length; t < i; t++) {
                        var a = arguments[t];
                        if (y(a)) this._dimensions.push(a), this._isScalar = !1;
                        else if (Array.isArray(a) || p(a)) {
                            var o = n(a.valueOf());
                            this._dimensions.push(o);
                            var s = o.size();
                            1 === s.length && 1 === s[0] || (this._isScalar = !1)
                        } else if ("number" == typeof a) this._dimensions.push(n([a]));
                        else {
                            if ("string" != typeof a) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
                            this._dimensions.push(a)
                        }
                    }
                }

                function n(e) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if ("number" != typeof e[r] || !V(e[r])) throw new TypeError("Index parameters must be positive integer numbers");
                    return new t(e)
                }
                return r.prototype.type = "Index", r.prototype.isIndex = !0, r.prototype.clone = function() { var e = new r; return e._dimensions = Ge(this._dimensions), e._isScalar = this._isScalar, e }, r.create = function(e) { var t = new r; return r.apply(t, e), t }, r.prototype.size = function() {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e[t] = "string" == typeof n ? 1 : n.size()[0]
                    }
                    return e
                }, r.prototype.max = function() {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e[t] = "string" == typeof n ? n : n.max()
                    }
                    return e
                }, r.prototype.min = function() {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e[t] = "string" == typeof n ? n : n.min()
                    }
                    return e
                }, r.prototype.forEach = function(e) { for (var t = 0, r = this._dimensions.length; t < r; t++) e(this._dimensions[t], t, this) }, r.prototype.dimension = function(e) { return this._dimensions[e] || null }, r.prototype.isObjectProperty = function() { return 1 === this._dimensions.length && "string" == typeof this._dimensions[0] }, r.prototype.getObjectProperty = function() { return this.isObjectProperty() ? this._dimensions[0] : null }, r.prototype.isScalar = function() { return this._isScalar }, r.prototype.toArray = function() {
                    for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) {
                        var n = this._dimensions[t];
                        e.push("string" == typeof n ? n : n.toArray())
                    }
                    return e
                }, r.prototype.valueOf = r.prototype.toArray, r.prototype.toString = function() { for (var e = [], t = 0, r = this._dimensions.length; t < r; t++) { var n = this._dimensions[t]; "string" == typeof n ? e.push(JSON.stringify(n)) : e.push(n.toString()) } return "[" + e.join(", ") + "]" }, r.prototype.toJSON = function() { return { mathjs: "Index", dimensions: this._dimensions } }, r.fromJSON = function(e) { return r.create(e.dimensions) }, r
            }), { isClass: !0 }),
            Ja = Ke("FibonacciHeap", ["smaller", "larger"], (function(e) {
                var t = e.smaller,
                    r = e.larger,
                    n = 1 / Math.log((1 + Math.sqrt(5)) / 2);

                function i() {
                    if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                    this._minimum = null, this._size = 0
                }

                function a(e, t, r) { t.left.right = t.right, t.right.left = t.left, r.degree--, r.child === t && (r.child = t.right), 0 === r.degree && (r.child = null), t.left = e, t.right = e.right, e.right = t, t.right.left = t, t.parent = null, t.mark = !1 }
                i.prototype.type = "FibonacciHeap", i.prototype.isFibonacciHeap = !0, i.prototype.insert = function(e, r) {
                    var n = { key: e, value: r, degree: 0 };
                    if (this._minimum) {
                        var i = this._minimum;
                        n.left = i, n.right = i.right, i.right = n, n.right.left = n, t(e, i.key) && (this._minimum = n)
                    } else n.left = n, n.right = n, this._minimum = n;
                    return this._size++, n
                }, i.prototype.size = function() { return this._size }, i.prototype.clear = function() { this._minimum = null, this._size = 0 }, i.prototype.isEmpty = function() { return 0 === this._size }, i.prototype.extractMinimum = function() {
                    var e = this._minimum;
                    if (null === e) return e;
                    for (var i = this._minimum, a = e.degree, s = e.child; a > 0;) {
                        var u = s.right;
                        s.left.right = s.right, s.right.left = s.left, s.left = i, s.right = i.right, i.right = s, s.right.left = s, s.parent = null, s = u, a--
                    }
                    return e.left.right = e.right, e.right.left = e.left, i = e === e.right ? null : function(e, i) {
                        var a, s = Math.floor(Math.log(i) * n) + 1,
                            u = new Array(s),
                            c = 0,
                            f = e;
                        if (f)
                            for (c++, f = f.right; f !== e;) c++, f = f.right;
                        for (; c > 0;) {
                            for (var l = f.degree, p = f.right; a = u[l];) {
                                if (r(f.key, a.key)) {
                                    var m = a;
                                    a = f, f = m
                                }
                                o(a, f), u[l] = null, l++
                            }
                            u[l] = f, f = p, c--
                        }
                        e = null;
                        for (var h = 0; h < s; h++)(a = u[h]) && (e ? (a.left.right = a.right, a.right.left = a.left, a.left = e, a.right = e.right, e.right = a, a.right.left = a, t(a.key, e.key) && (e = a)) : e = a);
                        return e
                    }(i = e.right, this._size), this._size--, this._minimum = i, e
                }, i.prototype.remove = function(e) {
                    this._minimum = function(e, r, n) {
                        r.key = n;
                        var i = r.parent;
                        i && t(r.key, i.key) && (a(e, r, i), function e(t, r) {
                            var n = r.parent;
                            if (!n) return;
                            r.mark ? (a(t, r, n), e(n)) : r.mark = !0
                        }(e, i));
                        t(r.key, e.key) && (e = r);
                        return e
                    }(this._minimum, e, -1), this.extractMinimum()
                };
                var o = function(e, t) { e.left.right = e.right, e.right.left = e.left, e.parent = t, t.child ? (e.left = t.child, e.right = t.child.right, t.child.right = e, e.right.left = e) : (t.child = e, e.right = e, e.left = e), t.degree++, e.mark = !1 };
                return i
            }), { isClass: !0 }),
            Ya = Ke("Spa", ["addScalar", "equalScalar", "FibonacciHeap"], (function(e) {
                var t = e.addScalar,
                    r = e.equalScalar,
                    n = e.FibonacciHeap;

                function i() {
                    if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                    this._values = [], this._heap = new n
                }
                return i.prototype.type = "Spa", i.prototype.isSpa = !0, i.prototype.set = function(e, t) {
                    if (this._values[e]) this._values[e].value = t;
                    else {
                        var r = this._heap.insert(e, t);
                        this._values[e] = r
                    }
                }, i.prototype.get = function(e) { var t = this._values[e]; return t ? t.value : 0 }, i.prototype.accumulate = function(e, r) {
                    var n = this._values[e];
                    n ? n.value = t(n.value, r) : (n = this._heap.insert(e, r), this._values[e] = n)
                }, i.prototype.forEach = function(e, t, n) {
                    var i = this._heap,
                        a = this._values,
                        o = [],
                        s = i.extractMinimum();
                    for (s && o.push(s); s && s.key <= t;) s.key >= e && (r(s.value, 0) || n(s.key, s.value, this)), (s = i.extractMinimum()) && o.push(s);
                    for (var u = 0; u < o.length; u++) {
                        var c = o[u];
                        a[(s = i.insert(c.key, c.value)).key] = s
                    }
                }, i.prototype.swap = function(e, t) {
                    var r = this._values[e],
                        n = this._values[t];
                    if (!r && n) r = this._heap.insert(e, n.value), this._heap.remove(n), this._values[e] = r, this._values[t] = void 0;
                    else if (r && !n) n = this._heap.insert(t, r.value), this._heap.remove(r), this._values[t] = n, this._values[e] = void 0;
                    else if (r && n) {
                        var i = r.value;
                        r.value = n.value, n.value = i
                    }
                }, i
            }), { isClass: !0 }),
            Xa = Xn((function(e) { return new e(1).exp() }), { hasher: to }),
            Qa = Xn((function(e) { return new e(1).plus(new e(5).sqrt()).div(2) }), { hasher: to }),
            Ka = Xn((function(e) { return e.acos(-1) }), { hasher: to }),
            eo = Xn((function(e) { return Ka(e).times(2) }), { hasher: to });

        function to(e) { return e[0].precision }

        function ro(e) { return (ro = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function no() { return (no = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var r = arguments[t]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]) } return e }).apply(this, arguments) }

        function io(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), r.push.apply(r, n)
            }
            return r
        }

        function ao(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? io(Object(r), !0).forEach((function(t) { oo(e, t, r[t]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : io(Object(r)).forEach((function(t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t)) }))
            }
            return e
        }

        function oo(e, t, r) { return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e }
        var so = Ke("Unit", ["?on", "config", "addScalar", "subtract", "multiplyScalar", "divideScalar", "pow", "abs", "fix", "round", "equal", "isNumeric", "format", "number", "Complex", "BigNumber", "Fraction"], (function(e) {
                var t, r, n, i = e.on,
                    a = e.config,
                    o = e.addScalar,
                    u = e.subtract,
                    f = e.multiplyScalar,
                    l = e.divideScalar,
                    p = e.pow,
                    m = e.abs,
                    h = e.fix,
                    d = e.round,
                    y = e.equal,
                    g = e.isNumeric,
                    v = e.format,
                    x = e.number,
                    b = e.Complex,
                    w = e.BigNumber,
                    N = e.Fraction,
                    M = x;

                function S(e, t) {
                    if (!(this instanceof S)) throw new Error("Constructor must be called with the new operator");
                    if (null != e && !g(e) && !s(e)) throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");
                    if (void 0 !== t && ("string" != typeof t || "" === t)) throw new TypeError("Second parameter in Unit constructor must be a string");
                    if (void 0 !== t) {
                        var r = S.parse(t);
                        this.units = r.units, this.dimensions = r.dimensions
                    } else { this.units = [{ unit: P, prefix: B.NONE, power: 0 }], this.dimensions = []; for (var n = 0; n < k.length; n++) this.dimensions[n] = 0 }
                    this.value = null != e ? this._normalize(e) : null, this.fixPrefix = !1, this.skipAutomaticSimplification = !0
                }

                function E() {
                    for (;
                        " " === n || "\t" === n;) O()
                }

                function A(e) { return e >= "0" && e <= "9" }

                function O() { r++, n = t.charAt(r) }

                function C(e) { r = e, n = t.charAt(r) }

                function _() {
                    var e = "",
                        t = r;
                    if ("+" === n ? O() : "-" === n && (e += n, O()), ! function(e) { return e >= "0" && e <= "9" || "." === e }(n)) return C(t), null;
                    if ("." === n) { if (e += n, O(), !A(n)) return C(t), null } else { for (; A(n);) e += n, O(); "." === n && (e += n, O()) }
                    for (; A(n);) e += n, O();
                    if ("E" === n || "e" === n) {
                        var i = "",
                            a = r;
                        if (i += n, O(), "+" !== n && "-" !== n || (i += n, O()), !A(n)) return C(a), e;
                        for (e += i; A(n);) e += n, O()
                    }
                    return e
                }

                function T() { for (var e = ""; A(n) || S.isValidAlpha(n);) e += n, O(); var t = e.charAt(0); return S.isValidAlpha(t) ? e : null }

                function z(e) { return n === e ? (O(), e) : null }
                S.prototype.type = "Unit", S.prototype.isUnit = !0, S.parse = function(e, i) {
                    if (i = i || {}, r = -1, n = "", "string" != typeof(t = e)) throw new TypeError("Invalid argument in Unit.parse, string expected");
                    var o = new S;
                    o.units = [];
                    var s = 1,
                        u = !1;
                    O(), E();
                    var c = _(),
                        f = null;
                    if (c) {
                        if ("BigNumber" === a.number) f = new w(c);
                        else if ("Fraction" === a.number) try { f = new N(c) } catch (e) { f = parseFloat(c) } else f = parseFloat(c);
                        E(), z("*") ? (s = 1, u = !0) : z("/") && (s = -1, u = !0)
                    }
                    for (var l = [], p = 1;;) {
                        for (E();
                            "(" === n;) l.push(s), p *= s, s = 1, O(), E();
                        var m = void 0;
                        if (!n) break;
                        var h = n;
                        if (null === (m = T())) throw new SyntaxError('Unexpected "' + h + '" in "' + t + '" at index ' + r.toString());
                        var d = q(m);
                        if (null === d) throw new SyntaxError('Unit "' + m + '" not found.');
                        var y = s * p;
                        if (E(), z("^")) {
                            E();
                            var g = _();
                            if (null === g) throw new SyntaxError('In "' + e + '", "^" must be followed by a floating-point number');
                            y *= g
                        }
                        o.units.push({ unit: d.unit, prefix: d.prefix, power: y });
                        for (var v = 0; v < k.length; v++) o.dimensions[v] += (d.unit.dimensions[v] || 0) * y;
                        for (E();
                            ")" === n;) {
                            if (0 === l.length) throw new SyntaxError('Unmatched ")" in "' + t + '" at index ' + r.toString());
                            p /= l.pop(), O(), E()
                        }
                        if (u = !1, z("*") ? (s = 1, u = !0) : z("/") ? (s = -1, u = !0) : s = 1, d.unit.base) {
                            var x = d.unit.base.key;
                            L.auto[x] = { unit: d.unit, prefix: d.prefix }
                        }
                    }
                    if (E(), n) throw new SyntaxError('Could not parse: "' + e + '"');
                    if (u) throw new SyntaxError('Trailing characters: "' + e + '"');
                    if (0 !== l.length) throw new SyntaxError('Unmatched "(" in "' + t + '"');
                    if (0 === o.units.length && !i.allowNoUnits) throw new SyntaxError('"' + e + '" contains no units');
                    return o.value = void 0 !== f ? o._normalize(f) : null, o
                }, S.prototype.clone = function() {
                    var e = new S;
                    e.fixPrefix = this.fixPrefix, e.skipAutomaticSimplification = this.skipAutomaticSimplification, e.value = Ge(this.value), e.dimensions = this.dimensions.slice(0), e.units = [];
                    for (var t = 0; t < this.units.length; t++)
                        for (var r in e.units[t] = {}, this.units[t]) Xe(this.units[t], r) && (e.units[t][r] = this.units[t][r]);
                    return e
                }, S.prototype._isDerived = function() { return 0 !== this.units.length && (this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15) }, S.prototype._normalize = function(e) {
                    var t, r, n, i, a;
                    if (null == e || 0 === this.units.length) return e;
                    if (this._isDerived()) {
                        var s = e;
                        a = S._getNumberConverter(H(e));
                        for (var u = 0; u < this.units.length; u++) t = a(this.units[u].unit.value), i = a(this.units[u].prefix.value), n = a(this.units[u].power), s = f(s, p(f(t, i), n));
                        return s
                    }
                    return t = (a = S._getNumberConverter(H(e)))(this.units[0].unit.value), r = a(this.units[0].unit.offset), i = a(this.units[0].prefix.value), f(o(e, r), f(t, i))
                }, S.prototype._denormalize = function(e, t) {
                    var r, n, i, a, o;
                    if (null == e || 0 === this.units.length) return e;
                    if (this._isDerived()) {
                        var s = e;
                        o = S._getNumberConverter(H(e));
                        for (var c = 0; c < this.units.length; c++) r = o(this.units[c].unit.value), a = o(this.units[c].prefix.value), i = o(this.units[c].power), s = l(s, p(f(r, a), i));
                        return s
                    }
                    return r = (o = S._getNumberConverter(H(e)))(this.units[0].unit.value), a = o(this.units[0].prefix.value), n = o(this.units[0].unit.offset), u(l(l(e, r), null == t ? a : t), n)
                };
                var q = Xn((function(e) {
                    if (Xe(j, e)) { var t = j[e]; return { unit: t, prefix: t.prefixes[""] } }
                    for (var r in j)
                        if (Xe(j, r) && ve(e, r)) {
                            var n = j[r],
                                i = e.length - r.length,
                                a = e.substring(0, i),
                                o = Xe(n.prefixes, a) ? n.prefixes[a] : void 0;
                            if (void 0 !== o) return { unit: n, prefix: o }
                        }
                    return null
                }), { hasher: function(e) { return e[0] }, limit: 100 });

                function I(e) { return e.equalBase(D.NONE) && null !== e.value && !a.predictable ? e.value : e }
                S.isValuelessUnit = function(e) { return null !== q(e) }, S.prototype.hasBase = function(e) {
                    if ("string" == typeof e && (e = D[e]), !e) return !1;
                    for (var t = 0; t < k.length; t++)
                        if (Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0)) > 1e-12) return !1;
                    return !0
                }, S.prototype.equalBase = function(e) {
                    for (var t = 0; t < k.length; t++)
                        if (Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0)) > 1e-12) return !1;
                    return !0
                }, S.prototype.equals = function(e) { return this.equalBase(e) && y(this.value, e.value) }, S.prototype.multiply = function(e) {
                    for (var t = this.clone(), r = 0; r < k.length; r++) t.dimensions[r] = (this.dimensions[r] || 0) + (e.dimensions[r] || 0);
                    for (var n = 0; n < e.units.length; n++) {
                        var i = ao({}, e.units[n]);
                        t.units.push(i)
                    }
                    if (null !== this.value || null !== e.value) {
                        var a = null === this.value ? this._normalize(1) : this.value,
                            o = null === e.value ? e._normalize(1) : e.value;
                        t.value = f(a, o)
                    } else t.value = null;
                    return t.skipAutomaticSimplification = !1, I(t)
                }, S.prototype.divide = function(e) {
                    for (var t = this.clone(), r = 0; r < k.length; r++) t.dimensions[r] = (this.dimensions[r] || 0) - (e.dimensions[r] || 0);
                    for (var n = 0; n < e.units.length; n++) {
                        var i = ao(ao({}, e.units[n]), {}, { power: -e.units[n].power });
                        t.units.push(i)
                    }
                    if (null !== this.value || null !== e.value) {
                        var a = null === this.value ? this._normalize(1) : this.value,
                            o = null === e.value ? e._normalize(1) : e.value;
                        t.value = l(a, o)
                    } else t.value = null;
                    return t.skipAutomaticSimplification = !1, I(t)
                }, S.prototype.pow = function(e) { for (var t = this.clone(), r = 0; r < k.length; r++) t.dimensions[r] = (this.dimensions[r] || 0) * e; for (var n = 0; n < t.units.length; n++) t.units[n].power *= e; return null !== t.value ? t.value = p(t.value, e) : t.value = null, t.skipAutomaticSimplification = !1, I(t) }, S.prototype.abs = function() { var e = this.clone(); for (var t in e.value = null !== e.value ? m(e.value) : null, e.units) "VA" !== e.units[t].unit.name && "VAR" !== e.units[t].unit.name || (e.units[t].unit = j.W); return e }, S.prototype.to = function(e) { var t, r = null === this.value ? this._normalize(1) : this.value; if ("string" == typeof e) { if (t = S.parse(e), !this.equalBase(t)) throw new Error("Units do not match ('".concat(t.toString(), "' != '").concat(this.toString(), "')")); if (null !== t.value) throw new Error("Cannot convert to a unit with a value"); return t.value = Ge(r), t.fixPrefix = !0, t.skipAutomaticSimplification = !0, t } if (c(e)) { if (!this.equalBase(e)) throw new Error("Units do not match ('".concat(e.toString(), "' != '").concat(this.toString(), "')")); if (null !== e.value) throw new Error("Cannot convert to a unit with a value"); return (t = e.clone()).value = Ge(r), t.fixPrefix = !0, t.skipAutomaticSimplification = !0, t } throw new Error("String or Unit expected as parameter") }, S.prototype.toNumber = function(e) { return M(this.toNumeric(e)) }, S.prototype.toNumeric = function(e) { var t; return (t = e ? this.to(e) : this.clone())._isDerived() || 0 === t.units.length ? t._denormalize(t.value) : t._denormalize(t.value, t.units[0].prefix.value) }, S.prototype.toString = function() { return this.format() }, S.prototype.toJSON = function() { return { mathjs: "Unit", value: this._denormalize(this.value), unit: this.formatUnits(), fixPrefix: this.fixPrefix } }, S.fromJSON = function(e) { var t = new S(e.value, e.unit); return t.fixPrefix = e.fixPrefix || !1, t }, S.prototype.valueOf = S.prototype.toString, S.prototype.simplify = function() {
                    var e, t, r = this.clone(),
                        n = [];
                    for (var i in $)
                        if (Xe($, i) && r.hasBase(D[i])) { e = i; break }
                    if ("NONE" === e) r.units = [];
                    else if (e && Xe($, e) && (t = $[e]), t) r.units = [{ unit: t.unit, prefix: t.prefix, power: 1 }];
                    else {
                        for (var a = !1, o = 0; o < k.length; o++) {
                            var s = k[o];
                            Math.abs(r.dimensions[o] || 0) > 1e-12 && (Xe($, s) ? n.push({ unit: $[s].unit, prefix: $[s].prefix, power: r.dimensions[o] || 0 }) : a = !0)
                        }
                        n.length < r.units.length && !a && (r.units = n)
                    }
                    return r
                }, S.prototype.toSI = function() {
                    for (var e = this.clone(), t = [], r = 0; r < k.length; r++) {
                        var n = k[r];
                        if (Math.abs(e.dimensions[r] || 0) > 1e-12) {
                            if (!Xe(L.si, n)) throw new Error("Cannot express custom unit " + n + " in SI units");
                            t.push({ unit: L.si[n].unit, prefix: L.si[n].prefix, power: e.dimensions[r] || 0 })
                        }
                    }
                    return e.units = t, e.fixPrefix = !0, e.skipAutomaticSimplification = !0, e
                }, S.prototype.formatUnits = function() {
                    for (var e = "", t = "", r = 0, n = 0, i = 0; i < this.units.length; i++) this.units[i].power > 0 ? (r++, e += " " + this.units[i].prefix.name + this.units[i].unit.name, Math.abs(this.units[i].power - 1) > 1e-15 && (e += "^" + this.units[i].power)) : this.units[i].power < 0 && n++;
                    if (n > 0)
                        for (var a = 0; a < this.units.length; a++) this.units[a].power < 0 && (r > 0 ? (t += " " + this.units[a].prefix.name + this.units[a].unit.name, Math.abs(this.units[a].power + 1) > 1e-15 && (t += "^" + -this.units[a].power)) : (t += " " + this.units[a].prefix.name + this.units[a].unit.name, t += "^" + this.units[a].power));
                    e = e.substr(1), t = t.substr(1), r > 1 && n > 0 && (e = "(" + e + ")"), n > 1 && r > 0 && (t = "(" + t + ")");
                    var o = e;
                    return r > 0 && n > 0 && (o += " / "), o += t
                }, S.prototype.format = function(e) {
                    var t = this.skipAutomaticSimplification || null === this.value ? this.clone() : this.simplify(),
                        r = !1;
                    for (var n in void 0 !== t.value && null !== t.value && s(t.value) && (r = Math.abs(t.value.re) < 1e-14), t.units) Xe(t.units, n) && t.units[n].unit && ("VA" === t.units[n].unit.name && r ? t.units[n].unit = j.VAR : "VAR" !== t.units[n].unit.name || r || (t.units[n].unit = j.VA));
                    1 !== t.units.length || t.fixPrefix || Math.abs(t.units[0].power - Math.round(t.units[0].power)) < 1e-14 && (t.units[0].prefix = t._bestPrefix());
                    var i = t._denormalize(t.value),
                        a = null !== t.value ? v(i, e || {}) : "",
                        o = t.formatUnits();
                    return t.value && s(t.value) && (a = "(" + a + ")"), o.length > 0 && a.length > 0 && (a += " "), a += o
                }, S.prototype._bestPrefix = function() {
                    if (1 !== this.units.length) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
                    if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) >= 1e-14) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
                    var e = null !== this.value ? m(this.value) : 0,
                        t = m(this.units[0].unit.value),
                        r = this.units[0].prefix;
                    if (0 === e) return r;
                    var n = this.units[0].power,
                        i = Math.log(e / Math.pow(r.value * t, n)) / Math.LN10 - 1.2;
                    if (i > -2.200001 && i < 1.800001) return r;
                    i = Math.abs(i);
                    var a = this.units[0].unit.prefixes;
                    for (var o in a)
                        if (Xe(a, o)) {
                            var s = a[o];
                            if (s.scientific) {
                                var u = Math.abs(Math.log(e / Math.pow(s.value * t, n)) / Math.LN10 - 1.2);
                                (u < i || u === i && s.name.length < r.name.length) && (r = s, i = u)
                            }
                        }
                    return r
                }, S.prototype.splitUnit = function(e) {
                    for (var t = this.clone(), r = [], n = 0; n < e.length && (t = t.to(e[n]), n !== e.length - 1); n++) {
                        var i = t.toNumeric(),
                            a = d(i),
                            s = new S(y(a, i) ? a : h(t.toNumeric()), e[n].toString());
                        r.push(s), t = u(t, s)
                    }
                    for (var c = 0, f = 0; f < r.length; f++) c = o(c, r[f].value);
                    return y(c, this.value) && (t.value = 0), r.push(t), r
                };
                var B = { NONE: { "": { name: "", value: 1, scientific: !0 } }, SHORT: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 10, scientific: !1 }, h: { name: "h", value: 100, scientific: !1 }, k: { name: "k", value: 1e3, scientific: !0 }, M: { name: "M", value: 1e6, scientific: !0 }, G: { name: "G", value: 1e9, scientific: !0 }, T: { name: "T", value: 1e12, scientific: !0 }, P: { name: "P", value: 1e15, scientific: !0 }, E: { name: "E", value: 1e18, scientific: !0 }, Z: { name: "Z", value: 1e21, scientific: !0 }, Y: { name: "Y", value: 1e24, scientific: !0 }, d: { name: "d", value: .1, scientific: !1 }, c: { name: "c", value: .01, scientific: !1 }, m: { name: "m", value: .001, scientific: !0 }, u: { name: "u", value: 1e-6, scientific: !0 }, n: { name: "n", value: 1e-9, scientific: !0 }, p: { name: "p", value: 1e-12, scientific: !0 }, f: { name: "f", value: 1e-15, scientific: !0 }, a: { name: "a", value: 1e-18, scientific: !0 }, z: { name: "z", value: 1e-21, scientific: !0 }, y: { name: "y", value: 1e-24, scientific: !0 } }, LONG: { "": { name: "", value: 1, scientific: !0 }, deca: { name: "deca", value: 10, scientific: !1 }, hecto: { name: "hecto", value: 100, scientific: !1 }, kilo: { name: "kilo", value: 1e3, scientific: !0 }, mega: { name: "mega", value: 1e6, scientific: !0 }, giga: { name: "giga", value: 1e9, scientific: !0 }, tera: { name: "tera", value: 1e12, scientific: !0 }, peta: { name: "peta", value: 1e15, scientific: !0 }, exa: { name: "exa", value: 1e18, scientific: !0 }, zetta: { name: "zetta", value: 1e21, scientific: !0 }, yotta: { name: "yotta", value: 1e24, scientific: !0 }, deci: { name: "deci", value: .1, scientific: !1 }, centi: { name: "centi", value: .01, scientific: !1 }, milli: { name: "milli", value: .001, scientific: !0 }, micro: { name: "micro", value: 1e-6, scientific: !0 }, nano: { name: "nano", value: 1e-9, scientific: !0 }, pico: { name: "pico", value: 1e-12, scientific: !0 }, femto: { name: "femto", value: 1e-15, scientific: !0 }, atto: { name: "atto", value: 1e-18, scientific: !0 }, zepto: { name: "zepto", value: 1e-21, scientific: !0 }, yocto: { name: "yocto", value: 1e-24, scientific: !0 } }, SQUARED: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 100, scientific: !1 }, h: { name: "h", value: 1e4, scientific: !1 }, k: { name: "k", value: 1e6, scientific: !0 }, M: { name: "M", value: 1e12, scientific: !0 }, G: { name: "G", value: 1e18, scientific: !0 }, T: { name: "T", value: 1e24, scientific: !0 }, P: { name: "P", value: 1e30, scientific: !0 }, E: { name: "E", value: 1e36, scientific: !0 }, Z: { name: "Z", value: 1e42, scientific: !0 }, Y: { name: "Y", value: 1e48, scientific: !0 }, d: { name: "d", value: .01, scientific: !1 }, c: { name: "c", value: 1e-4, scientific: !1 }, m: { name: "m", value: 1e-6, scientific: !0 }, u: { name: "u", value: 1e-12, scientific: !0 }, n: { name: "n", value: 1e-18, scientific: !0 }, p: { name: "p", value: 1e-24, scientific: !0 }, f: { name: "f", value: 1e-30, scientific: !0 }, a: { name: "a", value: 1e-36, scientific: !0 }, z: { name: "z", value: 1e-42, scientific: !0 }, y: { name: "y", value: 1e-48, scientific: !0 } }, CUBIC: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 1e3, scientific: !1 }, h: { name: "h", value: 1e6, scientific: !1 }, k: { name: "k", value: 1e9, scientific: !0 }, M: { name: "M", value: 1e18, scientific: !0 }, G: { name: "G", value: 1e27, scientific: !0 }, T: { name: "T", value: 1e36, scientific: !0 }, P: { name: "P", value: 1e45, scientific: !0 }, E: { name: "E", value: 1e54, scientific: !0 }, Z: { name: "Z", value: 1e63, scientific: !0 }, Y: { name: "Y", value: 1e72, scientific: !0 }, d: { name: "d", value: .001, scientific: !1 }, c: { name: "c", value: 1e-6, scientific: !1 }, m: { name: "m", value: 1e-9, scientific: !0 }, u: { name: "u", value: 1e-18, scientific: !0 }, n: { name: "n", value: 1e-27, scientific: !0 }, p: { name: "p", value: 1e-36, scientific: !0 }, f: { name: "f", value: 1e-45, scientific: !0 }, a: { name: "a", value: 1e-54, scientific: !0 }, z: { name: "z", value: 1e-63, scientific: !0 }, y: { name: "y", value: 1e-72, scientific: !0 } }, BINARY_SHORT_SI: { "": { name: "", value: 1, scientific: !0 }, k: { name: "k", value: 1e3, scientific: !0 }, M: { name: "M", value: 1e6, scientific: !0 }, G: { name: "G", value: 1e9, scientific: !0 }, T: { name: "T", value: 1e12, scientific: !0 }, P: { name: "P", value: 1e15, scientific: !0 }, E: { name: "E", value: 1e18, scientific: !0 }, Z: { name: "Z", value: 1e21, scientific: !0 }, Y: { name: "Y", value: 1e24, scientific: !0 } }, BINARY_SHORT_IEC: { "": { name: "", value: 1, scientific: !0 }, Ki: { name: "Ki", value: 1024, scientific: !0 }, Mi: { name: "Mi", value: Math.pow(1024, 2), scientific: !0 }, Gi: { name: "Gi", value: Math.pow(1024, 3), scientific: !0 }, Ti: { name: "Ti", value: Math.pow(1024, 4), scientific: !0 }, Pi: { name: "Pi", value: Math.pow(1024, 5), scientific: !0 }, Ei: { name: "Ei", value: Math.pow(1024, 6), scientific: !0 }, Zi: { name: "Zi", value: Math.pow(1024, 7), scientific: !0 }, Yi: { name: "Yi", value: Math.pow(1024, 8), scientific: !0 } }, BINARY_LONG_SI: { "": { name: "", value: 1, scientific: !0 }, kilo: { name: "kilo", value: 1e3, scientific: !0 }, mega: { name: "mega", value: 1e6, scientific: !0 }, giga: { name: "giga", value: 1e9, scientific: !0 }, tera: { name: "tera", value: 1e12, scientific: !0 }, peta: { name: "peta", value: 1e15, scientific: !0 }, exa: { name: "exa", value: 1e18, scientific: !0 }, zetta: { name: "zetta", value: 1e21, scientific: !0 }, yotta: { name: "yotta", value: 1e24, scientific: !0 } }, BINARY_LONG_IEC: { "": { name: "", value: 1, scientific: !0 }, kibi: { name: "kibi", value: 1024, scientific: !0 }, mebi: { name: "mebi", value: Math.pow(1024, 2), scientific: !0 }, gibi: { name: "gibi", value: Math.pow(1024, 3), scientific: !0 }, tebi: { name: "tebi", value: Math.pow(1024, 4), scientific: !0 }, pebi: { name: "pebi", value: Math.pow(1024, 5), scientific: !0 }, exi: { name: "exi", value: Math.pow(1024, 6), scientific: !0 }, zebi: { name: "zebi", value: Math.pow(1024, 7), scientific: !0 }, yobi: { name: "yobi", value: Math.pow(1024, 8), scientific: !0 } }, BTU: { "": { name: "", value: 1, scientific: !0 }, MM: { name: "MM", value: 1e6, scientific: !0 } } };
                B.SHORTLONG = no({}, B.SHORT, B.LONG), B.BINARY_SHORT = no({}, B.BINARY_SHORT_SI, B.BINARY_SHORT_IEC), B.BINARY_LONG = no({}, B.BINARY_LONG_SI, B.BINARY_LONG_IEC);
                var k = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"],
                    D = { NONE: { dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0] }, MASS: { dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0] }, LENGTH: { dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0] }, TIME: { dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0] }, CURRENT: { dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0] }, TEMPERATURE: { dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0] }, LUMINOUS_INTENSITY: { dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0] }, AMOUNT_OF_SUBSTANCE: { dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0] }, FORCE: { dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0] }, SURFACE: { dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0] }, VOLUME: { dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0] }, ENERGY: { dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0] }, POWER: { dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0] }, PRESSURE: { dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0] }, ELECTRIC_CHARGE: { dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0] }, ELECTRIC_CAPACITANCE: { dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0] }, ELECTRIC_POTENTIAL: { dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0] }, ELECTRIC_RESISTANCE: { dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0] }, ELECTRIC_INDUCTANCE: { dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0] }, ELECTRIC_CONDUCTANCE: { dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0] }, MAGNETIC_FLUX: { dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0] }, MAGNETIC_FLUX_DENSITY: { dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0] }, FREQUENCY: { dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0] }, ANGLE: { dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0] }, BIT: { dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1] } };
                for (var R in D) Xe(D, R) && (D[R].key = R);
                var P = { name: "", base: {}, value: 1, offset: 0, dimensions: k.map((function(e) { return 0 })) },
                    j = { meter: { name: "meter", base: D.LENGTH, prefixes: B.LONG, value: 1, offset: 0 }, inch: { name: "inch", base: D.LENGTH, prefixes: B.NONE, value: .0254, offset: 0 }, foot: { name: "foot", base: D.LENGTH, prefixes: B.NONE, value: .3048, offset: 0 }, yard: { name: "yard", base: D.LENGTH, prefixes: B.NONE, value: .9144, offset: 0 }, mile: { name: "mile", base: D.LENGTH, prefixes: B.NONE, value: 1609.344, offset: 0 }, link: { name: "link", base: D.LENGTH, prefixes: B.NONE, value: .201168, offset: 0 }, rod: { name: "rod", base: D.LENGTH, prefixes: B.NONE, value: 5.0292, offset: 0 }, chain: { name: "chain", base: D.LENGTH, prefixes: B.NONE, value: 20.1168, offset: 0 }, angstrom: { name: "angstrom", base: D.LENGTH, prefixes: B.NONE, value: 1e-10, offset: 0 }, m: { name: "m", base: D.LENGTH, prefixes: B.SHORT, value: 1, offset: 0 }, in: { name: "in", base: D.LENGTH, prefixes: B.NONE, value: .0254, offset: 0 }, ft: { name: "ft", base: D.LENGTH, prefixes: B.NONE, value: .3048, offset: 0 }, yd: { name: "yd", base: D.LENGTH, prefixes: B.NONE, value: .9144, offset: 0 }, mi: { name: "mi", base: D.LENGTH, prefixes: B.NONE, value: 1609.344, offset: 0 }, li: { name: "li", base: D.LENGTH, prefixes: B.NONE, value: .201168, offset: 0 }, rd: { name: "rd", base: D.LENGTH, prefixes: B.NONE, value: 5.02921, offset: 0 }, ch: { name: "ch", base: D.LENGTH, prefixes: B.NONE, value: 20.1168, offset: 0 }, mil: { name: "mil", base: D.LENGTH, prefixes: B.NONE, value: 254e-7, offset: 0 }, m2: { name: "m2", base: D.SURFACE, prefixes: B.SQUARED, value: 1, offset: 0 }, sqin: { name: "sqin", base: D.SURFACE, prefixes: B.NONE, value: 64516e-8, offset: 0 }, sqft: { name: "sqft", base: D.SURFACE, prefixes: B.NONE, value: .09290304, offset: 0 }, sqyd: { name: "sqyd", base: D.SURFACE, prefixes: B.NONE, value: .83612736, offset: 0 }, sqmi: { name: "sqmi", base: D.SURFACE, prefixes: B.NONE, value: 2589988.110336, offset: 0 }, sqrd: { name: "sqrd", base: D.SURFACE, prefixes: B.NONE, value: 25.29295, offset: 0 }, sqch: { name: "sqch", base: D.SURFACE, prefixes: B.NONE, value: 404.6873, offset: 0 }, sqmil: { name: "sqmil", base: D.SURFACE, prefixes: B.NONE, value: 6.4516e-10, offset: 0 }, acre: { name: "acre", base: D.SURFACE, prefixes: B.NONE, value: 4046.86, offset: 0 }, hectare: { name: "hectare", base: D.SURFACE, prefixes: B.NONE, value: 1e4, offset: 0 }, m3: { name: "m3", base: D.VOLUME, prefixes: B.CUBIC, value: 1, offset: 0 }, L: { name: "L", base: D.VOLUME, prefixes: B.SHORT, value: .001, offset: 0 }, l: { name: "l", base: D.VOLUME, prefixes: B.SHORT, value: .001, offset: 0 }, litre: { name: "litre", base: D.VOLUME, prefixes: B.LONG, value: .001, offset: 0 }, cuin: { name: "cuin", base: D.VOLUME, prefixes: B.NONE, value: 16387064e-12, offset: 0 }, cuft: { name: "cuft", base: D.VOLUME, prefixes: B.NONE, value: .028316846592, offset: 0 }, cuyd: { name: "cuyd", base: D.VOLUME, prefixes: B.NONE, value: .764554857984, offset: 0 }, teaspoon: { name: "teaspoon", base: D.VOLUME, prefixes: B.NONE, value: 5e-6, offset: 0 }, tablespoon: { name: "tablespoon", base: D.VOLUME, prefixes: B.NONE, value: 15e-6, offset: 0 }, drop: { name: "drop", base: D.VOLUME, prefixes: B.NONE, value: 5e-8, offset: 0 }, gtt: { name: "gtt", base: D.VOLUME, prefixes: B.NONE, value: 5e-8, offset: 0 }, minim: { name: "minim", base: D.VOLUME, prefixes: B.NONE, value: 6.161152e-8, offset: 0 }, fluiddram: { name: "fluiddram", base: D.VOLUME, prefixes: B.NONE, value: 36966911e-13, offset: 0 }, fluidounce: { name: "fluidounce", base: D.VOLUME, prefixes: B.NONE, value: 2957353e-11, offset: 0 }, gill: { name: "gill", base: D.VOLUME, prefixes: B.NONE, value: .0001182941, offset: 0 }, cc: { name: "cc", base: D.VOLUME, prefixes: B.NONE, value: 1e-6, offset: 0 }, cup: { name: "cup", base: D.VOLUME, prefixes: B.NONE, value: .0002365882, offset: 0 }, pint: { name: "pint", base: D.VOLUME, prefixes: B.NONE, value: .0004731765, offset: 0 }, quart: { name: "quart", base: D.VOLUME, prefixes: B.NONE, value: .0009463529, offset: 0 }, gallon: { name: "gallon", base: D.VOLUME, prefixes: B.NONE, value: .003785412, offset: 0 }, beerbarrel: { name: "beerbarrel", base: D.VOLUME, prefixes: B.NONE, value: .1173478, offset: 0 }, oilbarrel: { name: "oilbarrel", base: D.VOLUME, prefixes: B.NONE, value: .1589873, offset: 0 }, hogshead: { name: "hogshead", base: D.VOLUME, prefixes: B.NONE, value: .238481, offset: 0 }, fldr: { name: "fldr", base: D.VOLUME, prefixes: B.NONE, value: 36966911e-13, offset: 0 }, floz: { name: "floz", base: D.VOLUME, prefixes: B.NONE, value: 2957353e-11, offset: 0 }, gi: { name: "gi", base: D.VOLUME, prefixes: B.NONE, value: .0001182941, offset: 0 }, cp: { name: "cp", base: D.VOLUME, prefixes: B.NONE, value: .0002365882, offset: 0 }, pt: { name: "pt", base: D.VOLUME, prefixes: B.NONE, value: .0004731765, offset: 0 }, qt: { name: "qt", base: D.VOLUME, prefixes: B.NONE, value: .0009463529, offset: 0 }, gal: { name: "gal", base: D.VOLUME, prefixes: B.NONE, value: .003785412, offset: 0 }, bbl: { name: "bbl", base: D.VOLUME, prefixes: B.NONE, value: .1173478, offset: 0 }, obl: { name: "obl", base: D.VOLUME, prefixes: B.NONE, value: .1589873, offset: 0 }, g: { name: "g", base: D.MASS, prefixes: B.SHORT, value: .001, offset: 0 }, gram: { name: "gram", base: D.MASS, prefixes: B.LONG, value: .001, offset: 0 }, ton: { name: "ton", base: D.MASS, prefixes: B.SHORT, value: 907.18474, offset: 0 }, t: { name: "t", base: D.MASS, prefixes: B.SHORT, value: 1e3, offset: 0 }, tonne: { name: "tonne", base: D.MASS, prefixes: B.LONG, value: 1e3, offset: 0 }, grain: { name: "grain", base: D.MASS, prefixes: B.NONE, value: 6479891e-11, offset: 0 }, dram: { name: "dram", base: D.MASS, prefixes: B.NONE, value: .0017718451953125, offset: 0 }, ounce: { name: "ounce", base: D.MASS, prefixes: B.NONE, value: .028349523125, offset: 0 }, poundmass: { name: "poundmass", base: D.MASS, prefixes: B.NONE, value: .45359237, offset: 0 }, hundredweight: { name: "hundredweight", base: D.MASS, prefixes: B.NONE, value: 45.359237, offset: 0 }, stick: { name: "stick", base: D.MASS, prefixes: B.NONE, value: .115, offset: 0 }, stone: { name: "stone", base: D.MASS, prefixes: B.NONE, value: 6.35029318, offset: 0 }, gr: { name: "gr", base: D.MASS, prefixes: B.NONE, value: 6479891e-11, offset: 0 }, dr: { name: "dr", base: D.MASS, prefixes: B.NONE, value: .0017718451953125, offset: 0 }, oz: { name: "oz", base: D.MASS, prefixes: B.NONE, value: .028349523125, offset: 0 }, lbm: { name: "lbm", base: D.MASS, prefixes: B.NONE, value: .45359237, offset: 0 }, cwt: { name: "cwt", base: D.MASS, prefixes: B.NONE, value: 45.359237, offset: 0 }, s: { name: "s", base: D.TIME, prefixes: B.SHORT, value: 1, offset: 0 }, min: { name: "min", base: D.TIME, prefixes: B.NONE, value: 60, offset: 0 }, h: { name: "h", base: D.TIME, prefixes: B.NONE, value: 3600, offset: 0 }, second: { name: "second", base: D.TIME, prefixes: B.LONG, value: 1, offset: 0 }, sec: { name: "sec", base: D.TIME, prefixes: B.LONG, value: 1, offset: 0 }, minute: { name: "minute", base: D.TIME, prefixes: B.NONE, value: 60, offset: 0 }, hour: { name: "hour", base: D.TIME, prefixes: B.NONE, value: 3600, offset: 0 }, day: { name: "day", base: D.TIME, prefixes: B.NONE, value: 86400, offset: 0 }, week: { name: "week", base: D.TIME, prefixes: B.NONE, value: 604800, offset: 0 }, month: { name: "month", base: D.TIME, prefixes: B.NONE, value: 2629800, offset: 0 }, year: { name: "year", base: D.TIME, prefixes: B.NONE, value: 31557600, offset: 0 }, decade: { name: "decade", base: D.TIME, prefixes: B.NONE, value: 315576e3, offset: 0 }, century: { name: "century", base: D.TIME, prefixes: B.NONE, value: 315576e4, offset: 0 }, millennium: { name: "millennium", base: D.TIME, prefixes: B.NONE, value: 315576e5, offset: 0 }, hertz: { name: "Hertz", base: D.FREQUENCY, prefixes: B.LONG, value: 1, offset: 0, reciprocal: !0 }, Hz: { name: "Hz", base: D.FREQUENCY, prefixes: B.SHORT, value: 1, offset: 0, reciprocal: !0 }, rad: { name: "rad", base: D.ANGLE, prefixes: B.SHORT, value: 1, offset: 0 }, radian: { name: "radian", base: D.ANGLE, prefixes: B.LONG, value: 1, offset: 0 }, deg: { name: "deg", base: D.ANGLE, prefixes: B.SHORT, value: null, offset: 0 }, degree: { name: "degree", base: D.ANGLE, prefixes: B.LONG, value: null, offset: 0 }, grad: { name: "grad", base: D.ANGLE, prefixes: B.SHORT, value: null, offset: 0 }, gradian: { name: "gradian", base: D.ANGLE, prefixes: B.LONG, value: null, offset: 0 }, cycle: { name: "cycle", base: D.ANGLE, prefixes: B.NONE, value: null, offset: 0 }, arcsec: { name: "arcsec", base: D.ANGLE, prefixes: B.NONE, value: null, offset: 0 }, arcmin: { name: "arcmin", base: D.ANGLE, prefixes: B.NONE, value: null, offset: 0 }, A: { name: "A", base: D.CURRENT, prefixes: B.SHORT, value: 1, offset: 0 }, ampere: { name: "ampere", base: D.CURRENT, prefixes: B.LONG, value: 1, offset: 0 }, K: { name: "K", base: D.TEMPERATURE, prefixes: B.NONE, value: 1, offset: 0 }, degC: { name: "degC", base: D.TEMPERATURE, prefixes: B.NONE, value: 1, offset: 273.15 }, degF: { name: "degF", base: D.TEMPERATURE, prefixes: B.NONE, value: 1 / 1.8, offset: 459.67 }, degR: { name: "degR", base: D.TEMPERATURE, prefixes: B.NONE, value: 1 / 1.8, offset: 0 }, kelvin: { name: "kelvin", base: D.TEMPERATURE, prefixes: B.NONE, value: 1, offset: 0 }, celsius: { name: "celsius", base: D.TEMPERATURE, prefixes: B.NONE, value: 1, offset: 273.15 }, fahrenheit: { name: "fahrenheit", base: D.TEMPERATURE, prefixes: B.NONE, value: 1 / 1.8, offset: 459.67 }, rankine: { name: "rankine", base: D.TEMPERATURE, prefixes: B.NONE, value: 1 / 1.8, offset: 0 }, mol: { name: "mol", base: D.AMOUNT_OF_SUBSTANCE, prefixes: B.SHORT, value: 1, offset: 0 }, mole: { name: "mole", base: D.AMOUNT_OF_SUBSTANCE, prefixes: B.LONG, value: 1, offset: 0 }, cd: { name: "cd", base: D.LUMINOUS_INTENSITY, prefixes: B.SHORT, value: 1, offset: 0 }, candela: { name: "candela", base: D.LUMINOUS_INTENSITY, prefixes: B.LONG, value: 1, offset: 0 }, N: { name: "N", base: D.FORCE, prefixes: B.SHORT, value: 1, offset: 0 }, newton: { name: "newton", base: D.FORCE, prefixes: B.LONG, value: 1, offset: 0 }, dyn: { name: "dyn", base: D.FORCE, prefixes: B.SHORT, value: 1e-5, offset: 0 }, dyne: { name: "dyne", base: D.FORCE, prefixes: B.LONG, value: 1e-5, offset: 0 }, lbf: { name: "lbf", base: D.FORCE, prefixes: B.NONE, value: 4.4482216152605, offset: 0 }, poundforce: { name: "poundforce", base: D.FORCE, prefixes: B.NONE, value: 4.4482216152605, offset: 0 }, kip: { name: "kip", base: D.FORCE, prefixes: B.LONG, value: 4448.2216, offset: 0 }, kilogramforce: { name: "kilogramforce", base: D.FORCE, prefixes: B.NONE, value: 9.80665, offset: 0 }, J: { name: "J", base: D.ENERGY, prefixes: B.SHORT, value: 1, offset: 0 }, joule: { name: "joule", base: D.ENERGY, prefixes: B.SHORT, value: 1, offset: 0 }, erg: { name: "erg", base: D.ENERGY, prefixes: B.NONE, value: 1e-7, offset: 0 }, Wh: { name: "Wh", base: D.ENERGY, prefixes: B.SHORT, value: 3600, offset: 0 }, BTU: { name: "BTU", base: D.ENERGY, prefixes: B.BTU, value: 1055.05585262, offset: 0 }, eV: { name: "eV", base: D.ENERGY, prefixes: B.SHORT, value: 1602176565e-28, offset: 0 }, electronvolt: { name: "electronvolt", base: D.ENERGY, prefixes: B.LONG, value: 1602176565e-28, offset: 0 }, W: { name: "W", base: D.POWER, prefixes: B.SHORT, value: 1, offset: 0 }, watt: { name: "watt", base: D.POWER, prefixes: B.LONG, value: 1, offset: 0 }, hp: { name: "hp", base: D.POWER, prefixes: B.NONE, value: 745.6998715386, offset: 0 }, VAR: { name: "VAR", base: D.POWER, prefixes: B.SHORT, value: b.I, offset: 0 }, VA: { name: "VA", base: D.POWER, prefixes: B.SHORT, value: 1, offset: 0 }, Pa: { name: "Pa", base: D.PRESSURE, prefixes: B.SHORT, value: 1, offset: 0 }, psi: { name: "psi", base: D.PRESSURE, prefixes: B.NONE, value: 6894.75729276459, offset: 0 }, atm: { name: "atm", base: D.PRESSURE, prefixes: B.NONE, value: 101325, offset: 0 }, bar: { name: "bar", base: D.PRESSURE, prefixes: B.SHORTLONG, value: 1e5, offset: 0 }, torr: { name: "torr", base: D.PRESSURE, prefixes: B.NONE, value: 133.322, offset: 0 }, mmHg: { name: "mmHg", base: D.PRESSURE, prefixes: B.NONE, value: 133.322, offset: 0 }, mmH2O: { name: "mmH2O", base: D.PRESSURE, prefixes: B.NONE, value: 9.80665, offset: 0 }, cmH2O: { name: "cmH2O", base: D.PRESSURE, prefixes: B.NONE, value: 98.0665, offset: 0 }, coulomb: { name: "coulomb", base: D.ELECTRIC_CHARGE, prefixes: B.LONG, value: 1, offset: 0 }, C: { name: "C", base: D.ELECTRIC_CHARGE, prefixes: B.SHORT, value: 1, offset: 0 }, farad: { name: "farad", base: D.ELECTRIC_CAPACITANCE, prefixes: B.LONG, value: 1, offset: 0 }, F: { name: "F", base: D.ELECTRIC_CAPACITANCE, prefixes: B.SHORT, value: 1, offset: 0 }, volt: { name: "volt", base: D.ELECTRIC_POTENTIAL, prefixes: B.LONG, value: 1, offset: 0 }, V: { name: "V", base: D.ELECTRIC_POTENTIAL, prefixes: B.SHORT, value: 1, offset: 0 }, ohm: { name: "ohm", base: D.ELECTRIC_RESISTANCE, prefixes: B.SHORTLONG, value: 1, offset: 0 }, henry: { name: "henry", base: D.ELECTRIC_INDUCTANCE, prefixes: B.LONG, value: 1, offset: 0 }, H: { name: "H", base: D.ELECTRIC_INDUCTANCE, prefixes: B.SHORT, value: 1, offset: 0 }, siemens: { name: "siemens", base: D.ELECTRIC_CONDUCTANCE, prefixes: B.LONG, value: 1, offset: 0 }, S: { name: "S", base: D.ELECTRIC_CONDUCTANCE, prefixes: B.SHORT, value: 1, offset: 0 }, weber: { name: "weber", base: D.MAGNETIC_FLUX, prefixes: B.LONG, value: 1, offset: 0 }, Wb: { name: "Wb", base: D.MAGNETIC_FLUX, prefixes: B.SHORT, value: 1, offset: 0 }, tesla: { name: "tesla", base: D.MAGNETIC_FLUX_DENSITY, prefixes: B.LONG, value: 1, offset: 0 }, T: { name: "T", base: D.MAGNETIC_FLUX_DENSITY, prefixes: B.SHORT, value: 1, offset: 0 }, b: { name: "b", base: D.BIT, prefixes: B.BINARY_SHORT, value: 1, offset: 0 }, bits: { name: "bits", base: D.BIT, prefixes: B.BINARY_LONG, value: 1, offset: 0 }, B: { name: "B", base: D.BIT, prefixes: B.BINARY_SHORT, value: 8, offset: 0 }, bytes: { name: "bytes", base: D.BIT, prefixes: B.BINARY_LONG, value: 8, offset: 0 } },
                    U = { meters: "meter", inches: "inch", feet: "foot", yards: "yard", miles: "mile", links: "link", rods: "rod", chains: "chain", angstroms: "angstrom", lt: "l", litres: "litre", liter: "litre", liters: "litre", teaspoons: "teaspoon", tablespoons: "tablespoon", minims: "minim", fluiddrams: "fluiddram", fluidounces: "fluidounce", gills: "gill", cups: "cup", pints: "pint", quarts: "quart", gallons: "gallon", beerbarrels: "beerbarrel", oilbarrels: "oilbarrel", hogsheads: "hogshead", gtts: "gtt", grams: "gram", tons: "ton", tonnes: "tonne", grains: "grain", drams: "dram", ounces: "ounce", poundmasses: "poundmass", hundredweights: "hundredweight", sticks: "stick", lb: "lbm", lbs: "lbm", kips: "kip", kgf: "kilogramforce", acres: "acre", hectares: "hectare", sqfeet: "sqft", sqyard: "sqyd", sqmile: "sqmi", sqmiles: "sqmi", mmhg: "mmHg", mmh2o: "mmH2O", cmh2o: "cmH2O", seconds: "second", secs: "second", minutes: "minute", mins: "minute", hours: "hour", hr: "hour", hrs: "hour", days: "day", weeks: "week", months: "month", years: "year", decades: "decade", centuries: "century", millennia: "millennium", hertz: "hertz", radians: "radian", degrees: "degree", gradians: "gradian", cycles: "cycle", arcsecond: "arcsec", arcseconds: "arcsec", arcminute: "arcmin", arcminutes: "arcmin", BTUs: "BTU", watts: "watt", joules: "joule", amperes: "ampere", coulombs: "coulomb", volts: "volt", ohms: "ohm", farads: "farad", webers: "weber", teslas: "tesla", electronvolts: "electronvolt", moles: "mole", bit: "bits", byte: "bytes" };

                function F(e) {
                    if ("BigNumber" === e.number) {
                        var t = Ka(w);
                        j.rad.value = new w(1), j.deg.value = t.div(180), j.grad.value = t.div(200), j.cycle.value = t.times(2), j.arcsec.value = t.div(648e3), j.arcmin.value = t.div(10800)
                    } else j.rad.value = 1, j.deg.value = Math.PI / 180, j.grad.value = Math.PI / 200, j.cycle.value = 2 * Math.PI, j.arcsec.value = Math.PI / 648e3, j.arcmin.value = Math.PI / 10800;
                    j.radian.value = j.rad.value, j.degree.value = j.deg.value, j.gradian.value = j.grad.value
                }
                F(a), i && i("config", (function(e, t) { e.number !== t.number && F(e) }));
                var L = { si: { NONE: { unit: P, prefix: B.NONE[""] }, LENGTH: { unit: j.m, prefix: B.SHORT[""] }, MASS: { unit: j.g, prefix: B.SHORT.k }, TIME: { unit: j.s, prefix: B.SHORT[""] }, CURRENT: { unit: j.A, prefix: B.SHORT[""] }, TEMPERATURE: { unit: j.K, prefix: B.SHORT[""] }, LUMINOUS_INTENSITY: { unit: j.cd, prefix: B.SHORT[""] }, AMOUNT_OF_SUBSTANCE: { unit: j.mol, prefix: B.SHORT[""] }, ANGLE: { unit: j.rad, prefix: B.SHORT[""] }, BIT: { unit: j.bits, prefix: B.SHORT[""] }, FORCE: { unit: j.N, prefix: B.SHORT[""] }, ENERGY: { unit: j.J, prefix: B.SHORT[""] }, POWER: { unit: j.W, prefix: B.SHORT[""] }, PRESSURE: { unit: j.Pa, prefix: B.SHORT[""] }, ELECTRIC_CHARGE: { unit: j.C, prefix: B.SHORT[""] }, ELECTRIC_CAPACITANCE: { unit: j.F, prefix: B.SHORT[""] }, ELECTRIC_POTENTIAL: { unit: j.V, prefix: B.SHORT[""] }, ELECTRIC_RESISTANCE: { unit: j.ohm, prefix: B.SHORT[""] }, ELECTRIC_INDUCTANCE: { unit: j.H, prefix: B.SHORT[""] }, ELECTRIC_CONDUCTANCE: { unit: j.S, prefix: B.SHORT[""] }, MAGNETIC_FLUX: { unit: j.Wb, prefix: B.SHORT[""] }, MAGNETIC_FLUX_DENSITY: { unit: j.T, prefix: B.SHORT[""] }, FREQUENCY: { unit: j.Hz, prefix: B.SHORT[""] } } };
                L.cgs = JSON.parse(JSON.stringify(L.si)), L.cgs.LENGTH = { unit: j.m, prefix: B.SHORT.c }, L.cgs.MASS = { unit: j.g, prefix: B.SHORT[""] }, L.cgs.FORCE = { unit: j.dyn, prefix: B.SHORT[""] }, L.cgs.ENERGY = { unit: j.erg, prefix: B.NONE[""] }, L.us = JSON.parse(JSON.stringify(L.si)), L.us.LENGTH = { unit: j.ft, prefix: B.NONE[""] }, L.us.MASS = { unit: j.lbm, prefix: B.NONE[""] }, L.us.TEMPERATURE = { unit: j.degF, prefix: B.NONE[""] }, L.us.FORCE = { unit: j.lbf, prefix: B.NONE[""] }, L.us.ENERGY = { unit: j.BTU, prefix: B.BTU[""] }, L.us.POWER = { unit: j.hp, prefix: B.NONE[""] }, L.us.PRESSURE = { unit: j.psi, prefix: B.NONE[""] }, L.auto = JSON.parse(JSON.stringify(L.si));
                var $ = L.auto;
                for (var G in S.setUnitSystem = function(e) {
                        if (!Xe(L, e)) throw new Error("Unit system " + e + " does not exist. Choices are: " + Object.keys(L).join(", "));
                        $ = L[e]
                    }, S.getUnitSystem = function() {
                        for (var e in L)
                            if (Xe(L, e) && L[e] === $) return e
                    }, S.typeConverters = { BigNumber: function(e) { return new w(e + "") }, Fraction: function(e) { return new N(e) }, Complex: function(e) { return e }, number: function(e) { return e } }, S._getNumberConverter = function(e) { if (!S.typeConverters[e]) throw new TypeError('Unsupported type "' + e + '"'); return S.typeConverters[e] }, j)
                    if (Xe(j, G)) {
                        var V = j[G];
                        V.dimensions = V.base.dimensions
                    }
                for (var Z in U)
                    if (Xe(U, Z)) {
                        var W = j[U[Z]],
                            J = {};
                        for (var Y in W) Xe(W, Y) && (J[Y] = W[Y]);
                        J.name = Z, j[Z] = J
                    }
                return S.isValidAlpha = function(e) { return /^[a-zA-Z]$/.test(e) }, S.createUnit = function(e, t) {
                    if ("object" !== ro(e)) throw new TypeError("createUnit expects first parameter to be of type 'Object'");
                    if (t && t.override)
                        for (var r in e)
                            if (Xe(e, r) && S.deleteUnit(r), e[r].aliases)
                                for (var n = 0; n < e[r].aliases.length; n++) S.deleteUnit(e[r].aliases[n]);
                    var i;
                    for (var a in e) Xe(e, a) && (i = S.createUnitSingle(a, e[a]));
                    return i
                }, S.createUnitSingle = function(e, t, r) {
                    if (null == t && (t = {}), "string" != typeof e) throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");
                    if (Xe(j, e)) throw new Error('Cannot create unit "' + e + '": a unit with that name already exists');
                    ! function(e) { for (var t = 0; t < e.length; t++) { if (n = e.charAt(t), 0 === t && !S.isValidAlpha(n)) throw new Error('Invalid unit name (must begin with alpha character): "' + e + '"'); if (t > 0 && !S.isValidAlpha(n) && !A(n)) throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + e + '"') } }(e);
                    var i, a, o, s = null,
                        u = [],
                        c = 0;
                    if (t && "Unit" === t.type) s = t.clone();
                    else if ("string" == typeof t) "" !== t && (i = t);
                    else {
                        if ("object" !== ro(t)) throw new TypeError('Cannot create unit "' + e + '" from "' + t.toString() + '": expecting "string" or "Unit" or "Object"');
                        i = t.definition, a = t.prefixes, c = t.offset, o = t.baseName, t.aliases && (u = t.aliases.valueOf())
                    }
                    if (u)
                        for (var f = 0; f < u.length; f++)
                            if (Xe(j, u[f])) throw new Error('Cannot create alias "' + u[f] + '": a unit with that name already exists');
                    if (i && "string" == typeof i && !s) try { s = S.parse(i, { allowNoUnits: !0 }) } catch (t) { throw t.message = 'Could not create unit "' + e + '" from "' + i + '": ' + t.message, t } else i && "Unit" === i.type && (s = i.clone());
                    u = u || [], c = c || 0, a = a && a.toUpperCase && B[a.toUpperCase()] || B.NONE;
                    var l = {};
                    if (s) {
                        l = { name: e, value: s.value, dimensions: s.dimensions.slice(0), prefixes: a, offset: c };
                        var p = !1;
                        for (var m in D)
                            if (Xe(D, m)) {
                                for (var h = !0, d = 0; d < k.length; d++)
                                    if (Math.abs((l.dimensions[d] || 0) - (D[m].dimensions[d] || 0)) > 1e-12) { h = !1; break }
                                if (h) { p = !0, l.base = D[m]; break }
                            }
                        if (!p) {
                            o = o || e + "_STUFF";
                            var y = { dimensions: s.dimensions.slice(0) };
                            y.key = o, D[o] = y, $[o] = { unit: l, prefix: B.NONE[""] }, l.base = D[o]
                        }
                    } else {
                        if (o = o || e + "_STUFF", k.indexOf(o) >= 0) throw new Error('Cannot create new base unit "' + e + '": a base unit with that name already exists (and cannot be overridden)');
                        for (var g in k.push(o), D) Xe(D, g) && (D[g].dimensions[k.length - 1] = 0);
                        for (var v = { dimensions: [] }, x = 0; x < k.length; x++) v.dimensions[x] = 0;
                        v.dimensions[k.length - 1] = 1, v.key = o, D[o] = v, l = { name: e, value: 1, dimensions: D[o].dimensions.slice(0), prefixes: a, offset: c, base: D[o] }, $[o] = { unit: l, prefix: B.NONE[""] }
                    }
                    S.UNITS[e] = l;
                    for (var b = 0; b < u.length; b++) {
                        var w = u[b],
                            N = {};
                        for (var M in l) Xe(l, M) && (N[M] = l[M]);
                        N.name = w, S.UNITS[w] = N
                    }
                    return delete q.cache, new S(null, e)
                }, S.deleteUnit = function(e) { delete S.UNITS[e] }, S.PREFIXES = B, S.BASE_DIMENSIONS = k, S.BASE_UNITS = D, S.UNIT_SYSTEMS = L, S.UNITS = j, S
            }), { isClass: !0 }),
            uo = Ke("unit", ["typed", "Unit"], (function(e) {
                var t = e.typed,
                    r = e.Unit;
                return t("unit", { Unit: function(e) { return e.clone() }, string: function(e) { return r.isValuelessUnit(e) ? new r(null, e) : r.parse(e, { allowNoUnits: !0 }) }, "number | BigNumber | Fraction | Complex, string": function(e, t) { return new r(e, t) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            co = Ke("sparse", ["typed", "SparseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.SparseMatrix;
                return t("sparse", { "": function() { return new r([]) }, string: function(e) { return new r([], e) }, "Array | Matrix": function(e) { return new r(e) }, "Array | Matrix, string": function(e, t) { return new r(e, t) } })
            })),
            fo = Ke("createUnit", ["typed", "Unit"], (function(e) {
                var t = e.typed,
                    r = e.Unit;
                return t("createUnit", { "Object, Object": function(e, t) { return r.createUnit(e, t) }, Object: function(e) { return r.createUnit(e, {}) }, "string, Unit | string | Object, Object": function(e, t, n) { var i = {}; return i[e] = t, r.createUnit(i, n) }, "string, Unit | string | Object": function(e, t) { var n = {}; return n[e] = t, r.createUnit(n, {}) }, string: function(e) { var t = {}; return t[e] = {}, r.createUnit(t, {}) } })
            })),
            lo = Ke("acos", ["typed", "config", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex;
                return t("acos", { number: function(e) { return e >= -1 && e <= 1 || r.predictable ? Math.acos(e) : new n(e, 0).acos() }, Complex: function(e) { return e.acos() }, BigNumber: function(e) { return e.acos() }, "Array | Matrix": function(e) { return St(e, this) } })
            }));

        function po(e) { return ue(e) }

        function mo(e) { return Math.atan(1 / e) }

        function ho(e) { return isFinite(e) ? (Math.log((e + 1) / e) + Math.log(e / (e - 1))) / 2 : 0 }

        function yo(e) { return Math.asin(1 / e) }

        function go(e) { var t = 1 / e; return Math.log(t + Math.sqrt(t * t + 1)) }

        function vo(e) { return Math.acos(1 / e) }

        function xo(e) {
            var t = 1 / e,
                r = Math.sqrt(t * t - 1);
            return Math.log(r + t)
        }

        function bo(e) { return ce(e) }

        function wo(e) { return fe(e) }

        function No(e) { return 1 / Math.tan(e) }

        function Mo(e) { var t = Math.exp(2 * e); return (t + 1) / (t - 1) }

        function So(e) { return 1 / Math.sin(e) }

        function Eo(e) { return 0 === e ? Number.POSITIVE_INFINITY : Math.abs(2 / (Math.exp(e) - Math.exp(-e))) * Z(e) }

        function Ao(e) { return 1 / Math.cos(e) }

        function Oo(e) { return 2 / (Math.exp(e) + Math.exp(-e)) }

        function Co(e) { return pe(e) }
        po.signature = "number", mo.signature = "number", ho.signature = "number", yo.signature = "number", go.signature = "number", vo.signature = "number", xo.signature = "number", bo.signature = "number", wo.signature = "number", No.signature = "number", Mo.signature = "number", So.signature = "number", Eo.signature = "number", Ao.signature = "number", Oo.signature = "number", Co.signature = "number";
        var _o = Ke("acosh", ["typed", "config", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex;
                return t("acosh", { number: function(e) { return e >= 1 || r.predictable ? po(e) : e <= -1 ? new n(Math.log(Math.sqrt(e * e - 1) - e), Math.PI) : new n(e, 0).acosh() }, Complex: function(e) { return e.acosh() }, BigNumber: function(e) { return e.acosh() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            To = Ke("acot", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("acot", { number: mo, Complex: function(e) { return e.acot() }, BigNumber: function(e) { return new r(1).div(e).atan() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            zo = Ke("acoth", ["typed", "config", "Complex", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex,
                    i = e.BigNumber;
                return t("acoth", { number: function(e) { return e >= 1 || e <= -1 || r.predictable ? ho(e) : new n(e, 0).acoth() }, Complex: function(e) { return e.acoth() }, BigNumber: function(e) { return new i(1).div(e).atanh() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            qo = Ke("acsc", ["typed", "config", "Complex", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex,
                    i = e.BigNumber;
                return t("acsc", { number: function(e) { return e <= -1 || e >= 1 || r.predictable ? yo(e) : new n(e, 0).acsc() }, Complex: function(e) { return e.acsc() }, BigNumber: function(e) { return new i(1).div(e).asin() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Io = Ke("acsch", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("acsch", { number: go, Complex: function(e) { return e.acsch() }, BigNumber: function(e) { return new r(1).div(e).asinh() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Bo = Ke("asec", ["typed", "config", "Complex", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex,
                    i = e.BigNumber;
                return t("asec", { number: function(e) { return e <= -1 || e >= 1 || r.predictable ? vo(e) : new n(e, 0).asec() }, Complex: function(e) { return e.asec() }, BigNumber: function(e) { return new i(1).div(e).acos() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            ko = Ke("asech", ["typed", "config", "Complex", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex,
                    i = e.BigNumber;
                return t("asech", { number: function(e) { if (e <= 1 && e >= -1 || r.predictable) { var t = 1 / e; if (t > 0 || r.predictable) return xo(e); var i = Math.sqrt(t * t - 1); return new n(Math.log(i - t), Math.PI) } return new n(e, 0).asech() }, Complex: function(e) { return e.asech() }, BigNumber: function(e) { return new i(1).div(e).acosh() }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Do = Ke("asin", ["typed", "config", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex;
                return t("asin", { number: function(e) { return e >= -1 && e <= 1 || r.predictable ? Math.asin(e) : new n(e, 0).asin() }, Complex: function(e) { return e.asin() }, BigNumber: function(e) { return e.asin() }, "Array | Matrix": function(e) { return St(e, this, !0) } })
            })),
            Ro = Ke("asinh", ["typed"], (function(e) { return (0, e.typed)("asinh", { number: bo, Complex: function(e) { return e.asinh() }, BigNumber: function(e) { return e.asinh() }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            Po = Ke("atan", ["typed"], (function(e) { return (0, e.typed)("atan", { number: function(e) { return Math.atan(e) }, Complex: function(e) { return e.atan() }, BigNumber: function(e) { return e.atan() }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            jo = Ke("atan2", ["typed", "matrix", "equalScalar", "BigNumber", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.equalScalar,
                    i = e.BigNumber,
                    a = e.DenseMatrix,
                    o = $r({ typed: t, equalScalar: n }),
                    s = Jr({ typed: t }),
                    u = cn({ typed: t, equalScalar: n }),
                    c = Or({ typed: t, equalScalar: n }),
                    f = Xr({ typed: t, DenseMatrix: a }),
                    l = Lr({ typed: t }),
                    p = Cr({ typed: t });
                return t("atan2", { "number, number": Math.atan2, "BigNumber, BigNumber": function(e, t) { return i.atan2(e, t) }, "SparseMatrix, SparseMatrix": function(e, t) { return u(e, t, this, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, this, !0) }, "DenseMatrix, SparseMatrix": function(e, t) { return s(e, t, this, !1) }, "DenseMatrix, DenseMatrix": function(e, t) { return l(e, t, this) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "SparseMatrix, number | BigNumber": function(e, t) { return c(e, t, this, !1) }, "DenseMatrix, number | BigNumber": function(e, t) { return p(e, t, this, !1) }, "number | BigNumber, SparseMatrix": function(e, t) { return f(t, e, this, !0) }, "number | BigNumber, DenseMatrix": function(e, t) { return p(t, e, this, !0) }, "Array, number | BigNumber": function(e, t) { return p(r(e), t, this, !1).valueOf() }, "number | BigNumber, Array": function(e, t) { return p(r(t), e, this, !0).valueOf() } })
            })),
            Uo = Ke("atanh", ["typed", "config", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.Complex;
                return t("atanh", { number: function(e) { return e <= 1 && e >= -1 || r.predictable ? wo(e) : new n(e, 0).atanh() }, Complex: function(e) { return e.atanh() }, BigNumber: function(e) { return e.atanh() }, "Array | Matrix": function(e) { return St(e, this, !0) } })
            })),
            Fo = Ke("cos", ["typed"], (function(e) { return (0, e.typed)("cos", { number: Math.cos, Complex: function(e) { return e.cos() }, BigNumber: function(e) { return e.cos() }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cos is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Lo = Ke("cosh", ["typed"], (function(e) { return (0, e.typed)("cosh", { number: le, Complex: function(e) { return e.cosh() }, BigNumber: function(e) { return e.cosh() }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cosh is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } }) })),
            Ho = Ke("cot", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("cot", { number: No, Complex: function(e) { return e.cot() }, BigNumber: function(e) { return new r(1).div(e.tan()) }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            $o = Ke("coth", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("coth", { number: Mo, Complex: function(e) { return e.coth() }, BigNumber: function(e) { return new r(1).div(e.tanh()) }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function coth is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Go = Ke("csc", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("csc", { number: So, Complex: function(e) { return e.csc() }, BigNumber: function(e) { return new r(1).div(e.sin()) }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csc is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Vo = Ke("csch", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("csch", { number: Eo, Complex: function(e) { return e.csch() }, BigNumber: function(e) { return new r(1).div(e.sinh()) }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csch is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Zo = Ke("sec", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("sec", { number: Ao, Complex: function(e) { return e.sec() }, BigNumber: function(e) { return new r(1).div(e.cos()) }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sec is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Wo = Ke("sech", ["typed", "BigNumber"], (function(e) {
                var t = e.typed,
                    r = e.BigNumber;
                return t("sech", { number: Oo, Complex: function(e) { return e.sech() }, BigNumber: function(e) { return new r(1).div(e.cosh()) }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sech is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            Jo = Ke("sin", ["typed"], (function(e) { return (0, e.typed)("sin", { number: Math.sin, Complex: function(e) { return e.sin() }, BigNumber: function(e) { return e.sin() }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sin is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            Yo = Ke("sinh", ["typed"], (function(e) { return (0, e.typed)("sinh", { number: Co, Complex: function(e) { return e.sinh() }, BigNumber: function(e) { return e.sinh() }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sinh is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            Xo = Ke("tan", ["typed"], (function(e) { return (0, e.typed)("tan", { number: Math.tan, Complex: function(e) { return e.tan() }, BigNumber: function(e) { return e.tan() }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tan is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            Qo = Ke("tanh", ["typed"], (function(e) { return (0, e.typed)("tanh", { number: me, Complex: function(e) { return e.tanh() }, BigNumber: function(e) { return e.tanh() }, Unit: function(e) { if (!e.hasBase(e.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tanh is no angle"); return this(e.value) }, "Array | Matrix": function(e) { return St(e, this, !0) } }) })),
            Ko = Ke("setCartesian", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index,
                    o = e.DenseMatrix;
                return t("setCartesian", {
                    "Array | Matrix, Array | Matrix": function(e, t) {
                        var s = [];
                        if (0 !== n(r(e), new a(0)) && 0 !== n(r(t), new a(0))) {
                            var u = Be(Array.isArray(e) ? e : e.toArray()).sort(i),
                                c = Be(Array.isArray(t) ? t : t.toArray()).sort(i);
                            s = [];
                            for (var f = 0; f < u.length; f++)
                                for (var l = 0; l < c.length; l++) s.push([u[f], c[l]])
                        }
                        return Array.isArray(e) && Array.isArray(t) ? s : new o(s)
                    }
                })
            })),
            es = Ke("setDifference", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index,
                    o = e.DenseMatrix;
                return t("setDifference", {
                    "Array | Matrix, Array | Matrix": function(e, t) {
                        var s;
                        if (0 === n(r(e), new a(0))) s = [];
                        else {
                            if (0 === n(r(t), new a(0))) return Be(e.toArray());
                            var u, c = Ue(Be(Array.isArray(e) ? e : e.toArray()).sort(i)),
                                f = Ue(Be(Array.isArray(t) ? t : t.toArray()).sort(i));
                            s = [];
                            for (var l = 0; l < c.length; l++) {
                                u = !1;
                                for (var p = 0; p < f.length; p++)
                                    if (0 === i(c[l].value, f[p].value) && c[l].identifier === f[p].identifier) { u = !0; break }
                                u || s.push(c[l])
                            }
                        }
                        return Array.isArray(e) && Array.isArray(t) ? Fe(s) : new o(Fe(s))
                    }
                })
            })),
            ts = Ke("setDistinct", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index,
                    o = e.DenseMatrix;
                return t("setDistinct", {
                    "Array | Matrix": function(e) {
                        var t;
                        if (0 === n(r(e), new a(0))) t = [];
                        else {
                            var s = Be(Array.isArray(e) ? e : e.toArray()).sort(i);
                            (t = []).push(s[0]);
                            for (var u = 1; u < s.length; u++) 0 !== i(s[u], s[u - 1]) && t.push(s[u])
                        }
                        return Array.isArray(e) ? t : new o(t)
                    }
                })
            })),
            rs = Ke("setIntersect", ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index,
                    o = e.DenseMatrix;
                return t("setIntersect", {
                    "Array | Matrix, Array | Matrix": function(e, t) {
                        var s;
                        if (0 === n(r(e), new a(0)) || 0 === n(r(t), new a(0))) s = [];
                        else {
                            var u = Ue(Be(Array.isArray(e) ? e : e.toArray()).sort(i)),
                                c = Ue(Be(Array.isArray(t) ? t : t.toArray()).sort(i));
                            s = [];
                            for (var f = 0; f < u.length; f++)
                                for (var l = 0; l < c.length; l++)
                                    if (0 === i(u[f].value, c[l].value) && u[f].identifier === c[l].identifier) { s.push(u[f]); break }
                        }
                        return Array.isArray(e) && Array.isArray(t) ? Fe(s) : new o(Fe(s))
                    }
                })
            })),
            ns = Ke("setIsSubset", ["typed", "size", "subset", "compareNatural", "Index"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index;
                return t("setIsSubset", {
                    "Array | Matrix, Array | Matrix": function(e, t) {
                        if (0 === n(r(e), new a(0))) return !0;
                        if (0 === n(r(t), new a(0))) return !1;
                        for (var o, s = Ue(Be(Array.isArray(e) ? e : e.toArray()).sort(i)), u = Ue(Be(Array.isArray(t) ? t : t.toArray()).sort(i)), c = 0; c < s.length; c++) {
                            o = !1;
                            for (var f = 0; f < u.length; f++)
                                if (0 === i(s[c].value, u[f].value) && s[c].identifier === u[f].identifier) { o = !0; break }
                            if (!1 === o) return !1
                        }
                        return !0
                    }
                })
            })),
            is = Ke("setMultiplicity", ["typed", "size", "subset", "compareNatural", "Index"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index;
                return t("setMultiplicity", { "number | BigNumber | Fraction | Complex, Array | Matrix": function(e, t) { if (0 === n(r(t), new a(0))) return 0; for (var o = Be(Array.isArray(t) ? t : t.toArray()), s = 0, u = 0; u < o.length; u++) 0 === i(o[u], e) && s++; return s } })
            })),
            as = Ke("setPowerset", ["typed", "size", "subset", "compareNatural", "Index"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.subset,
                    i = e.compareNatural,
                    a = e.Index;
                return t("setPowerset", {
                    "Array | Matrix": function(e) {
                        if (0 === n(r(e), new a(0))) return [];
                        for (var t = Be(Array.isArray(e) ? e : e.toArray()).sort(i), s = [], u = 0; u.toString(2).length <= t.length;) s.push(o(t, u.toString(2).split("").reverse())), u++;
                        return function(e) {
                            for (var t = [], r = e.length - 1; r > 0; r--)
                                for (var n = 0; n < r; n++) e[n].length > e[n + 1].length && (t = e[n], e[n] = e[n + 1], e[n + 1] = t);
                            return e
                        }(s)
                    }
                });

                function o(e, t) { for (var r = [], n = 0; n < t.length; n++) "1" === t[n] && r.push(e[n]); return r }
            })),
            os = Ke("setSize", ["typed", "compareNatural"], (function(e) {
                var t = e.typed,
                    r = e.compareNatural;
                return t("setSize", { "Array | Matrix": function(e) { return Array.isArray(e) ? Be(e).length : Be(e.toArray()).length }, "Array | Matrix, boolean": function(e, t) { if (!1 === t || 0 === e.length) return Array.isArray(e) ? Be(e).length : Be(e.toArray()).length; for (var n = Be(Array.isArray(e) ? e : e.toArray()).sort(r), i = 1, a = 1; a < n.length; a++) 0 !== r(n[a], n[a - 1]) && i++; return i } })
            })),
            ss = Ke("setSymDifference", ["typed", "size", "concat", "subset", "setDifference", "Index"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.concat,
                    i = e.subset,
                    a = e.setDifference,
                    o = e.Index;
                return t("setSymDifference", {
                    "Array | Matrix, Array | Matrix": function(e, t) {
                        if (0 === i(r(e), new o(0))) return Be(t);
                        if (0 === i(r(t), new o(0))) return Be(e);
                        var s = Be(e),
                            u = Be(t);
                        return n(a(s, u), a(u, s))
                    }
                })
            })),
            us = Ke("setUnion", ["typed", "size", "concat", "subset", "setIntersect", "setSymDifference", "Index"], (function(e) {
                var t = e.typed,
                    r = e.size,
                    n = e.concat,
                    i = e.subset,
                    a = e.setIntersect,
                    o = e.setSymDifference,
                    s = e.Index;
                return t("setUnion", {
                    "Array | Matrix, Array | Matrix": function(e, t) {
                        if (0 === i(r(e), new s(0))) return Be(t);
                        if (0 === i(r(t), new s(0))) return Be(e);
                        var u = Be(e),
                            c = Be(t);
                        return n(o(u, c), a(u, c))
                    }
                })
            })),
            cs = Ke("add", ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.addScalar,
                    i = e.equalScalar,
                    a = e.DenseMatrix,
                    o = (e.SparseMatrix, jr({ typed: t })),
                    s = Ur({ typed: t, equalScalar: i }),
                    u = Fr({ typed: t, DenseMatrix: a }),
                    c = Lr({ typed: t }),
                    f = Cr({ typed: t });
                return t("add", Ze({ "DenseMatrix, DenseMatrix": function(e, t) { return c(e, t, n) }, "DenseMatrix, SparseMatrix": function(e, t) { return o(e, t, n, !1) }, "SparseMatrix, DenseMatrix": function(e, t) { return o(t, e, n, !0) }, "SparseMatrix, SparseMatrix": function(e, t) { return s(e, t, n) }, "Array, Array": function(e, t) { return this(r(e), r(t)).valueOf() }, "Array, Matrix": function(e, t) { return this(r(e), t) }, "Matrix, Array": function(e, t) { return this(e, r(t)) }, "DenseMatrix, any": function(e, t) { return f(e, t, n, !1) }, "SparseMatrix, any": function(e, t) { return u(e, t, n, !1) }, "any, DenseMatrix": function(e, t) { return f(t, e, n, !0) }, "any, SparseMatrix": function(e, t) { return u(t, e, n, !0) }, "Array, any": function(e, t) { return f(r(e), t, n, !1).valueOf() }, "any, Array": function(e, t) { return f(r(t), e, n, !0).valueOf() }, "any, any": n, "any, any, ...any": function(e, t, r) { for (var n = this(e, t), i = 0; i < r.length; i++) n = this(n, r[i]); return n } }, n.signatures))
            })),
            fs = Ke("hypot", ["typed", "abs", "addScalar", "divideScalar", "multiplyScalar", "sqrt", "smaller", "isPositive"], (function(e) {
                var t = e.typed,
                    r = e.abs,
                    n = e.addScalar,
                    i = e.divideScalar,
                    a = e.multiplyScalar,
                    o = e.sqrt,
                    s = e.smaller,
                    u = e.isPositive;
                return t("hypot", {
                    "... number | BigNumber": function(e) {
                        for (var t = 0, c = 0, f = 0; f < e.length; f++) {
                            var l = r(e[f]);
                            s(c, l) ? (t = a(t, a(i(c, l), i(c, l))), t = n(t, 1), c = l) : t = n(t, u(l) ? a(i(l, c), i(l, c)) : l)
                        }
                        return a(c, o(t))
                    },
                    Array: function(e) { return this.apply(this, Be(e)) },
                    Matrix: function(e) { return this.apply(this, Be(e.toArray())) }
                })
            })),
            ls = Ke("norm", ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], (function(e) {
                var t = e.typed,
                    r = e.abs,
                    n = e.add,
                    i = e.pow,
                    a = e.conj,
                    o = e.sqrt,
                    s = e.multiply,
                    u = e.equalScalar,
                    c = e.larger,
                    f = e.smaller,
                    l = e.matrix,
                    p = e.ctranspose,
                    m = e.eigs;
                return t("norm", { number: Math.abs, Complex: function(e) { return e.abs() }, BigNumber: function(e) { return e.abs() }, boolean: function(e) { return Math.abs(e) }, Array: function(e) { return y(l(e), 2) }, Matrix: function(e) { return y(e, 2) }, "number | Complex | BigNumber | boolean, number | BigNumber | string": function(e) { return this(e) }, "Array, number | BigNumber | string": function(e, t) { return y(l(e), t) }, "Matrix, number | BigNumber | string": function(e, t) { return y(e, t) } });

                function h(e, t) {
                    if (t === Number.POSITIVE_INFINITY || "inf" === t) return function(e) {
                        var t = 0;
                        return e.forEach((function(e) {
                            var n = r(e);
                            c(n, t) && (t = n)
                        }), !0), t
                    }(e);
                    if (t === Number.NEGATIVE_INFINITY || "-inf" === t) return function(e) {
                        var t;
                        return e.forEach((function(e) {
                            var n = r(e);
                            t && !f(n, t) || (t = n)
                        }), !0), t || 0
                    }(e);
                    if ("fro" === t) return y(e, 2);
                    if ("number" == typeof t && !isNaN(t)) { if (!u(t, 0)) { var a = 0; return e.forEach((function(e) { a = n(i(r(e), t), a) }), !0), i(a, 1 / t) } return Number.POSITIVE_INFINITY }
                    throw new Error("Unsupported parameter value")
                }

                function d(e, t) {
                    if (1 === t) return function(e) {
                        var t = [],
                            i = 0;
                        return e.forEach((function(e, a) {
                            var o = a[1],
                                s = n(t[o] || 0, r(e));
                            c(s, i) && (i = s), t[o] = s
                        }), !0), i
                    }(e);
                    if (t === Number.POSITIVE_INFINITY || "inf" === t) return function(e) {
                        var t = [],
                            i = 0;
                        return e.forEach((function(e, a) {
                            var o = a[0],
                                s = n(t[o] || 0, r(e));
                            c(s, i) && (i = s), t[o] = s
                        }), !0), i
                    }(e);
                    if ("fro" === t) return function(e) { var t = 0; return e.forEach((function(e, r) { t = n(t, s(e, a(e))) })), r(o(t)) }(e);
                    if (2 === t) return function(e) {
                        var t = e.size();
                        if (t[0] !== t[1]) throw new RangeError("Invalid matrix dimensions");
                        var n = p(e),
                            i = s(n, e),
                            a = m(i).values,
                            u = a.get([a.size()[0] - 1]);
                        return r(o(u))
                    }(e);
                    throw new Error("Unsupported parameter value " + t)
                }

                function y(e, t) { var r = e.size(); if (1 === r.length) return h(e, t); if (2 === r.length) { if (r[0] && r[1]) return d(e, t); throw new RangeError("Invalid matrix dimensions") } }
            })),
            ps = Ke("dot", ["typed", "addScalar", "multiplyScalar", "conj", "size"], (function(e) {
                var t = e.typed,
                    r = e.addScalar,
                    n = e.multiplyScalar,
                    i = e.conj,
                    a = e.size;
                return t("dot", {
                    "Array | DenseMatrix, Array | DenseMatrix": function(e, a) {
                        var u = o(e, a),
                            c = p(e) ? e._data : e,
                            f = p(e) ? e._datatype : void 0,
                            l = p(a) ? a._data : a,
                            m = p(a) ? a._datatype : void 0,
                            h = 2 === s(e).length,
                            d = 2 === s(a).length,
                            y = r,
                            g = n;
                        if (f && m && f === m && "string" == typeof f) {
                            var v = f;
                            y = t.find(r, [v, v]), g = t.find(n, [v, v])
                        }
                        if (!h && !d) { for (var x = g(i(c[0]), l[0]), b = 1; b < u; b++) x = y(x, g(i(c[b]), l[b])); return x }
                        if (!h && d) { for (var w = g(i(c[0]), l[0][0]), N = 1; N < u; N++) w = y(w, g(i(c[N]), l[N][0])); return w }
                        if (h && !d) { for (var M = g(i(c[0][0]), l[0]), S = 1; S < u; S++) M = y(M, g(i(c[S][0]), l[S])); return M }
                        if (h && d) { for (var E = g(i(c[0][0]), l[0][0]), A = 1; A < u; A++) E = y(E, g(i(c[A][0]), l[A][0])); return E }
                    },
                    "SparseMatrix, SparseMatrix": function(e, t) {
                        o(e, t);
                        var i = e._index,
                            a = e._values,
                            s = t._index,
                            u = t._values,
                            c = 0,
                            f = r,
                            l = n,
                            p = 0,
                            m = 0;
                        for (; p < i.length && m < s.length;) {
                            var h = i[p],
                                d = s[m];
                            h < d ? p++ : h > d ? m++ : h === d && (c = f(c, l(a[p], u[m])), p++, m++)
                        }
                        return c
                    }
                });

                function o(e, t) {
                    var r, n, i = s(e),
                        a = s(t);
                    if (1 === i.length) r = i[0];
                    else {
                        if (2 !== i.length || 1 !== i[1]) throw new RangeError("Expected a column vector, instead got a matrix of size (" + i.join(", ") + ")");
                        r = i[0]
                    }
                    if (1 === a.length) n = a[0];
                    else {
                        if (2 !== a.length || 1 !== a[1]) throw new RangeError("Expected a column vector, instead got a matrix of size (" + a.join(", ") + ")");
                        n = a[0]
                    }
                    if (r !== n) throw new RangeError("Vectors must have equal length (" + r + " != " + n + ")");
                    if (0 === r) throw new RangeError("Cannot calculate the dot product of empty vectors");
                    return r
                }

                function s(e) { return p(e) ? e.size() : a(e) }
            })),
            ms = Ke("trace", ["typed", "matrix", "add"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.add;
                return t("trace", {
                    Array: function(e) { return i(r(e)) },
                    SparseMatrix: function(e) {
                        var t = e._values,
                            r = e._index,
                            i = e._ptr,
                            a = e._size,
                            o = a[0],
                            s = a[1];
                        if (o === s) {
                            var u = 0;
                            if (t.length > 0)
                                for (var c = 0; c < s; c++)
                                    for (var f = i[c], l = i[c + 1], p = f; p < l; p++) { var m = r[p]; if (m === c) { u = n(u, t[p]); break } if (m > c) break }
                            return u
                        }
                        throw new RangeError("Matrix must be square (size: " + xe(a) + ")")
                    },
                    DenseMatrix: i,
                    any: Ge
                });

                function i(e) {
                    var t = e._size,
                        r = e._data;
                    switch (t.length) {
                        case 1:
                            if (1 === t[0]) return Ge(r[0]);
                            throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                        case 2:
                            var i = t[0];
                            if (i === t[1]) { for (var a = 0, o = 0; o < i; o++) a = n(a, r[o][o]); return a }
                            throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                        default:
                            throw new RangeError("Matrix must be two dimensional (size: " + xe(t) + ")")
                    }
                }
            })),
            hs = Ke("index", ["typed", "Index"], (function(e) {
                var t = e.typed,
                    r = e.Index;
                return t("index", {
                    "...number | string | BigNumber | Range | Array | Matrix": function(e) {
                        var t = e.map((function(e) { return o(e) ? e.toNumber() : Array.isArray(e) || p(e) ? e.map((function(e) { return o(e) ? e.toNumber() : e })) : e })),
                            n = new r;
                        return r.apply(n, t), n
                    }
                })
            })),
            ds = { end: !0 };

        function ys(e) { return (ys = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }
        var gs = Ke("Node", ["mathWithTransform"], (function(e) {
            var t = e.mathWithTransform;

            function r() { if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator") }
            return r.prototype.evaluate = function(e) { return this.compile().evaluate(e) }, r.prototype.type = "Node", r.prototype.isNode = !0, r.prototype.comment = "", r.prototype.compile = function() {
                var e = this._compile(t, {}),
                    r = {};
                return {
                    evaluate: function(t) {
                        var n = t || {};
                        return function(e) {
                            for (var t in e)
                                if (Xe(e, t) && t in ds) throw new Error('Scope contains an illegal symbol, "' + t + '" is a reserved keyword')
                        }(n), e(n, r, null)
                    }
                }
            }, r.prototype._compile = function(e, t) { throw new Error("Method _compile should be implemented by type " + this.type) }, r.prototype.forEach = function(e) { throw new Error("Cannot run forEach on a Node interface") }, r.prototype.map = function(e) { throw new Error("Cannot run map on a Node interface") }, r.prototype._ifNode = function(e) { if (!D(e)) throw new TypeError("Callback function must return a Node"); return e }, r.prototype.traverse = function(e) {
                e(this, null, null),
                    function e(t, r) { t.forEach((function(t, n, i) { r(t, n, i), e(t, r) })) }(this, e)
            }, r.prototype.transform = function(e) { return function t(r, n, i) { var a = e(r, n, i); return a !== r ? a : r.map(t) }(this, null, null) }, r.prototype.filter = function(e) { var t = []; return this.traverse((function(r, n, i) { e(r, n, i) && t.push(r) })), t }, r.prototype.clone = function() { throw new Error("Cannot clone a Node interface") }, r.prototype.cloneDeep = function() { return this.map((function(e) { return e.cloneDeep() })) }, r.prototype.equals = function(e) { return !!e && We(this, e) }, r.prototype.toString = function(e) { var t = this._getCustomString(e); return void 0 !== t ? t : this._toString(e) }, r.prototype.toJSON = function() { throw new Error("Cannot serialize object: toJSON not implemented by " + this.type) }, r.prototype.toHTML = function(e) { var t = this._getCustomString(e); return void 0 !== t ? t : this.toHTML(e) }, r.prototype._toString = function() { throw new Error("_toString not implemented for " + this.type) }, r.prototype.toTex = function(e) { var t = this._getCustomString(e); return void 0 !== t ? t : this._toTex(e) }, r.prototype._toTex = function(e) { throw new Error("_toTex not implemented for " + this.type) }, r.prototype._getCustomString = function(e) {
                if (e && "object" === ys(e)) switch (ys(e.handler)) {
                    case "object":
                    case "undefined":
                        return;
                    case "function":
                        return e.handler(this, e);
                    default:
                        throw new TypeError("Object or function expected as callback")
                }
            }, r.prototype.getIdentifier = function() { return this.type }, r.prototype.getContent = function() { return this }, r
        }), { isClass: !0, isNode: !0 });

        function vs(e) { return e && e.isIndexError ? new Se(e.index + 1, e.min + 1, void 0 !== e.max ? e.max + 1 : void 0) : e }

        function xs(e) { return (xs = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function bs(e) { var t = e.subset; return function(e, r) { try { if (Array.isArray(e)) return t(e, r); if (e && "function" == typeof e.subset) return e.subset(r); if ("string" == typeof e) return t(e, r); if ("object" === xs(e)) { if (!r.isObjectProperty()) throw new TypeError("Cannot apply a numeric index as object property"); return Si(e, r.getObjectProperty()) } throw new TypeError("Cannot apply index: unsupported type of object") } catch (e) { throw vs(e) } } }
        var ws = Ke("AccessorNode", ["subset", "Node"], (function(e) {
                var t = e.subset,
                    r = e.Node,
                    n = bs({ subset: t });

                function i(e, t) {
                    if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!D(e)) throw new TypeError('Node expected for parameter "object"');
                    if (!k(t)) throw new TypeError('IndexNode expected for parameter "index"');
                    this.object = e || null, this.index = t, Object.defineProperty(this, "name", { get: function() { return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "" }.bind(this), set: function() { throw new Error("Cannot assign a new name, name is read-only") } })
                }

                function a(e) { return !(O(e) || C(e) || q(e) || B(e) || R(e) || j(e) || F(e)) }
                return i.prototype = new r, i.prototype.type = "AccessorNode", i.prototype.isAccessorNode = !0, i.prototype._compile = function(e, t) {
                    var r = this.object._compile(e, t),
                        i = this.index._compile(e, t);
                    if (this.index.isObjectProperty()) { var a = this.index.getObjectProperty(); return function(e, t, n) { return Si(r(e, t, n), a) } }
                    return function(e, t, a) {
                        var o = r(e, t, a),
                            s = i(e, t, o);
                        return n(o, s)
                    }
                }, i.prototype.forEach = function(e) { e(this.object, "object", this), e(this.index, "index", this) }, i.prototype.map = function(e) { return new i(this._ifNode(e(this.object, "object", this)), this._ifNode(e(this.index, "index", this))) }, i.prototype.clone = function() { return new i(this.object, this.index) }, i.prototype._toString = function(e) { var t = this.object.toString(e); return a(this.object) && (t = "(" + t + ")"), t + this.index.toString(e) }, i.prototype.toHTML = function(e) { var t = this.object.toHTML(e); return a(this.object) && (t = '<span class="math-parenthesis math-round-parenthesis">(</span>' + t + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t + this.index.toHTML(e) }, i.prototype._toTex = function(e) { var t = this.object.toTex(e); return a(this.object) && (t = "\\left(' + object + '\\right)"), t + this.index.toTex(e) }, i.prototype.toJSON = function() { return { mathjs: "AccessorNode", object: this.object, index: this.index } }, i.fromJSON = function(e) { return new i(e.object, e.index) }, i
            }), { isClass: !0, isNode: !0 }),
            Ns = Ke("ArrayNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e) { if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator"); if (this.items = e || [], !Array.isArray(this.items) || !this.items.every(D)) throw new TypeError("Array containing Nodes expected") }
                return r.prototype = new t, r.prototype.type = "ArrayNode", r.prototype.isArrayNode = !0, r.prototype._compile = function(e, t) { var r = ke(this.items, (function(r) { return r._compile(e, t) })); if ("Array" !== e.config.matrix) { var n = e.matrix; return function(e, t, i) { return n(ke(r, (function(r) { return r(e, t, i) }))) } } return function(e, t, n) { return ke(r, (function(r) { return r(e, t, n) })) } }, r.prototype.forEach = function(e) { for (var t = 0; t < this.items.length; t++) { e(this.items[t], "items[" + t + "]", this) } }, r.prototype.map = function(e) { for (var t = [], n = 0; n < this.items.length; n++) t[n] = this._ifNode(e(this.items[n], "items[" + n + "]", this)); return new r(t) }, r.prototype.clone = function() { return new r(this.items.slice(0)) }, r.prototype._toString = function(e) { return "[" + this.items.map((function(t) { return t.toString(e) })).join(", ") + "]" }, r.prototype.toJSON = function() { return { mathjs: "ArrayNode", items: this.items } }, r.fromJSON = function(e) { return new r(e.items) }, r.prototype.toHTML = function(e) { return '<span class="math-parenthesis math-square-parenthesis">[</span>' + this.items.map((function(t) { return t.toHTML(e) })).join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>' }, r.prototype._toTex = function(e) { var t = "\\begin{bmatrix}"; return this.items.forEach((function(r) { r.items ? t += r.items.map((function(t) { return t.toTex(e) })).join("&") : t += r.toTex(e), t += "\\\\" })), t += "\\end{bmatrix}" }, r
            }), { isClass: !0, isNode: !0 });

        function Ms(e) { return (Ms = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }
        var Ss = [{ AssignmentNode: {}, FunctionAssignmentNode: {} }, { ConditionalNode: { latexLeftParens: !1, latexRightParens: !1, latexParens: !1 } }, { "OperatorNode:or": { associativity: "left", associativeWith: [] } }, { "OperatorNode:xor": { associativity: "left", associativeWith: [] } }, { "OperatorNode:and": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitOr": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitXor": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitAnd": { associativity: "left", associativeWith: [] } }, { "OperatorNode:equal": { associativity: "left", associativeWith: [] }, "OperatorNode:unequal": { associativity: "left", associativeWith: [] }, "OperatorNode:smaller": { associativity: "left", associativeWith: [] }, "OperatorNode:larger": { associativity: "left", associativeWith: [] }, "OperatorNode:smallerEq": { associativity: "left", associativeWith: [] }, "OperatorNode:largerEq": { associativity: "left", associativeWith: [] }, RelationalNode: { associativity: "left", associativeWith: [] } }, { "OperatorNode:leftShift": { associativity: "left", associativeWith: [] }, "OperatorNode:rightArithShift": { associativity: "left", associativeWith: [] }, "OperatorNode:rightLogShift": { associativity: "left", associativeWith: [] } }, { "OperatorNode:to": { associativity: "left", associativeWith: [] } }, { RangeNode: {} }, { "OperatorNode:add": { associativity: "left", associativeWith: ["OperatorNode:add", "OperatorNode:subtract"] }, "OperatorNode:subtract": { associativity: "left", associativeWith: [] } }, { "OperatorNode:multiply": { associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"] }, "OperatorNode:divide": { associativity: "left", associativeWith: [], latexLeftParens: !1, latexRightParens: !1, latexParens: !1 }, "OperatorNode:dotMultiply": { associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"] }, "OperatorNode:dotDivide": { associativity: "left", associativeWith: [] }, "OperatorNode:mod": { associativity: "left", associativeWith: [] } }, { "OperatorNode:unaryPlus": { associativity: "right" }, "OperatorNode:unaryMinus": { associativity: "right" }, "OperatorNode:bitNot": { associativity: "right" }, "OperatorNode:not": { associativity: "right" } }, { "OperatorNode:pow": { associativity: "right", associativeWith: [], latexRightParens: !1 }, "OperatorNode:dotPow": { associativity: "right", associativeWith: [] } }, { "OperatorNode:factorial": { associativity: "left" } }, { "OperatorNode:transpose": { associativity: "left" } }];

        function Es(e, t) {
            var r = e;
            "keep" !== t && (r = e.getContent());
            for (var n = r.getIdentifier(), i = 0; i < Ss.length; i++)
                if (n in Ss[i]) return i;
            return null
        }

        function As(e, t) {
            var r = e;
            "keep" !== t && (r = e.getContent());
            var n = r.getIdentifier(),
                i = Es(r, t);
            if (null === i) return null;
            var a = Ss[i][n];
            if (Xe(a, "associativity")) { if ("left" === a.associativity) return "left"; if ("right" === a.associativity) return "right"; throw Error("'" + n + "' has the invalid associativity '" + a.associativity + "'.") }
            return null
        }

        function Os(e, t, r) {
            var n = "keep" !== r ? e.getContent() : e,
                i = "keep" !== r ? e.getContent() : t,
                a = n.getIdentifier(),
                o = i.getIdentifier(),
                s = Es(n, r);
            if (null === s) return null;
            var u = Ss[s][a];
            if (Xe(u, "associativeWith") && u.associativeWith instanceof Array) {
                for (var c = 0; c < u.associativeWith.length; c++)
                    if (u.associativeWith[c] === o) return !0;
                return !1
            }
            return null
        }
        var Cs = Ke("AssignmentNode", ["subset", "?matrix", "Node"], (function(e) {
                var t = e.subset,
                    r = e.matrix,
                    n = e.Node,
                    i = bs({ subset: t }),
                    a = function(e) {
                        var t = e.subset,
                            r = e.matrix;
                        return function(e, n, i) { try { if (Array.isArray(e)) return r(e).subset(n, i).valueOf(); if (e && "function" == typeof e.subset) return e.subset(n, i); if ("string" == typeof e) return t(e, n, i); if ("object" === Ms(e)) { if (!n.isObjectProperty()) throw TypeError("Cannot apply a numeric index as object property"); return Ei(e, n.getObjectProperty(), i), e } throw new TypeError("Cannot apply index: unsupported type of object") } catch (e) { throw vs(e) } }
                    }({ subset: t, matrix: r });

                function o(e, t, r) {
                    if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (this.object = e, this.index = r ? t : null, this.value = r || t, !F(e) && !O(e)) throw new TypeError('SymbolNode or AccessorNode expected as "object"');
                    if (F(e) && "end" === e.name) throw new Error('Cannot assign to symbol "end"');
                    if (this.index && !k(this.index)) throw new TypeError('IndexNode expected as "index"');
                    if (!D(this.value)) throw new TypeError('Node expected as "value"');
                    Object.defineProperty(this, "name", { get: function() { return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "" }.bind(this), set: function() { throw new Error("Cannot assign a new name, name is read-only") } })
                }

                function s(e, t) {
                    t || (t = "keep");
                    var r = Es(e, t),
                        n = Es(e.value, t);
                    return "all" === t || null !== n && n <= r
                }
                return o.prototype = new n, o.prototype.type = "AssignmentNode", o.prototype.isAssignmentNode = !0, o.prototype._compile = function(e, t) {
                    var r = this.object._compile(e, t),
                        n = this.index ? this.index._compile(e, t) : null,
                        o = this.value._compile(e, t),
                        s = this.object.name;
                    if (this.index) {
                        if (this.index.isObjectProperty()) {
                            var u = this.index.getObjectProperty();
                            return function(e, t, n) {
                                var i = r(e, t, n),
                                    a = o(e, t, n);
                                return Ei(i, u, a)
                            }
                        }
                        if (F(this.object)) return function(e, t, i) {
                            var u = r(e, t, i),
                                c = o(e, t, i),
                                f = n(e, t, u);
                            return Ei(e, s, a(u, f, c)), c
                        };
                        var c = this.object.object._compile(e, t);
                        if (this.object.index.isObjectProperty()) {
                            var f = this.object.index.getObjectProperty();
                            return function(e, t, r) {
                                var i = c(e, t, r),
                                    s = Si(i, f),
                                    u = n(e, t, s),
                                    l = o(e, t, r);
                                return Ei(i, f, a(s, u, l)), l
                            }
                        }
                        var l = this.object.index._compile(e, t);
                        return function(e, t, r) {
                            var s = c(e, t, r),
                                u = l(e, t, s),
                                f = i(s, u),
                                p = n(e, t, f),
                                m = o(e, t, r);
                            return a(s, u, a(f, p, m)), m
                        }
                    }
                    if (!F(this.object)) throw new TypeError("SymbolNode expected as object");
                    return function(e, t, r) { return Ei(e, s, o(e, t, r)) }
                }, o.prototype.forEach = function(e) { e(this.object, "object", this), this.index && e(this.index, "index", this), e(this.value, "value", this) }, o.prototype.map = function(e) { return new o(this._ifNode(e(this.object, "object", this)), this.index ? this._ifNode(e(this.index, "index", this)) : null, this._ifNode(e(this.value, "value", this))) }, o.prototype.clone = function() { return new o(this.object, this.index, this.value) }, o.prototype._toString = function(e) {
                    var t = this.object.toString(e),
                        r = this.index ? this.index.toString(e) : "",
                        n = this.value.toString(e);
                    return s(this, e && e.parenthesis) && (n = "(" + n + ")"), t + r + " = " + n
                }, o.prototype.toJSON = function() { return { mathjs: "AssignmentNode", object: this.object, index: this.index, value: this.value } }, o.fromJSON = function(e) { return new o(e.object, e.index, e.value) }, o.prototype.toHTML = function(e) {
                    var t = this.object.toHTML(e),
                        r = this.index ? this.index.toHTML(e) : "",
                        n = this.value.toHTML(e);
                    return s(this, e && e.parenthesis) && (n = '<span class="math-paranthesis math-round-parenthesis">(</span>' + n + '<span class="math-paranthesis math-round-parenthesis">)</span>'), t + r + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + n
                }, o.prototype._toTex = function(e) {
                    var t = this.object.toTex(e),
                        r = this.index ? this.index.toTex(e) : "",
                        n = this.value.toTex(e);
                    return s(this, e && e.parenthesis) && (n = "\\left(".concat(n, "\\right)")), t + r + ":=" + n
                }, o
            }), { isClass: !0, isNode: !0 }),
            _s = Ke("BlockNode", ["ResultSet", "Node"], (function(e) {
                var t = e.ResultSet,
                    r = e.Node;

                function n(e) {
                    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!Array.isArray(e)) throw new Error("Array expected");
                    this.blocks = e.map((function(e) {
                        var t = e && e.node,
                            r = !e || void 0 === e.visible || e.visible;
                        if (!D(t)) throw new TypeError('Property "node" must be a Node');
                        if ("boolean" != typeof r) throw new TypeError('Property "visible" must be a boolean');
                        return { node: t, visible: r }
                    }))
                }
                return n.prototype = new r, n.prototype.type = "BlockNode", n.prototype.isBlockNode = !0, n.prototype._compile = function(e, r) {
                    var n = ke(this.blocks, (function(t) { return { evaluate: t.node._compile(e, r), visible: t.visible } }));
                    return function(e, r, i) {
                        var a = [];
                        return De(n, (function(t) {
                            var n = t.evaluate(e, r, i);
                            t.visible && a.push(n)
                        })), new t(a)
                    }
                }, n.prototype.forEach = function(e) { for (var t = 0; t < this.blocks.length; t++) e(this.blocks[t].node, "blocks[" + t + "].node", this) }, n.prototype.map = function(e) {
                    for (var t = [], r = 0; r < this.blocks.length; r++) {
                        var i = this.blocks[r],
                            a = this._ifNode(e(i.node, "blocks[" + r + "].node", this));
                        t[r] = { node: a, visible: i.visible }
                    }
                    return new n(t)
                }, n.prototype.clone = function() { return new n(this.blocks.map((function(e) { return { node: e.node, visible: e.visible } }))) }, n.prototype._toString = function(e) { return this.blocks.map((function(t) { return t.node.toString(e) + (t.visible ? "" : ";") })).join("\n") }, n.prototype.toJSON = function() { return { mathjs: "BlockNode", blocks: this.blocks } }, n.fromJSON = function(e) { return new n(e.blocks) }, n.prototype.toHTML = function(e) { return this.blocks.map((function(t) { return t.node.toHTML(e) + (t.visible ? "" : '<span class="math-separator">;</span>') })).join('<span class="math-separator"><br /></span>') }, n.prototype._toTex = function(e) { return this.blocks.map((function(t) { return t.node.toTex(e) + (t.visible ? "" : ";") })).join("\\;\\;\n") }, n
            }), { isClass: !0, isNode: !0 }),
            Ts = Ke("ConditionalNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e, t, n) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!D(e)) throw new TypeError("Parameter condition must be a Node");
                    if (!D(t)) throw new TypeError("Parameter trueExpr must be a Node");
                    if (!D(n)) throw new TypeError("Parameter falseExpr must be a Node");
                    this.condition = e, this.trueExpr = t, this.falseExpr = n
                }
                return r.prototype = new t, r.prototype.type = "ConditionalNode", r.prototype.isConditionalNode = !0, r.prototype._compile = function(e, t) {
                    var r = this.condition._compile(e, t),
                        n = this.trueExpr._compile(e, t),
                        i = this.falseExpr._compile(e, t);
                    return function(e, t, a) { return function(e) { if ("number" == typeof e || "boolean" == typeof e || "string" == typeof e) return !!e; if (e) { if (o(e)) return !e.isZero(); if (s(e)) return !(!e.re && !e.im); if (c(e)) return !!e.value } if (null == e) return !1; throw new TypeError('Unsupported type of condition "' + H(e) + '"') }(r(e, t, a)) ? n(e, t, a) : i(e, t, a) }
                }, r.prototype.forEach = function(e) { e(this.condition, "condition", this), e(this.trueExpr, "trueExpr", this), e(this.falseExpr, "falseExpr", this) }, r.prototype.map = function(e) { return new r(this._ifNode(e(this.condition, "condition", this)), this._ifNode(e(this.trueExpr, "trueExpr", this)), this._ifNode(e(this.falseExpr, "falseExpr", this))) }, r.prototype.clone = function() { return new r(this.condition, this.trueExpr, this.falseExpr) }, r.prototype._toString = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = Es(this, t),
                        n = this.condition.toString(e),
                        i = Es(this.condition, t);
                    ("all" === t || "OperatorNode" === this.condition.type || null !== i && i <= r) && (n = "(" + n + ")");
                    var a = this.trueExpr.toString(e),
                        o = Es(this.trueExpr, t);
                    ("all" === t || "OperatorNode" === this.trueExpr.type || null !== o && o <= r) && (a = "(" + a + ")");
                    var s = this.falseExpr.toString(e),
                        u = Es(this.falseExpr, t);
                    return ("all" === t || "OperatorNode" === this.falseExpr.type || null !== u && u <= r) && (s = "(" + s + ")"), n + " ? " + a + " : " + s
                }, r.prototype.toJSON = function() { return { mathjs: "ConditionalNode", condition: this.condition, trueExpr: this.trueExpr, falseExpr: this.falseExpr } }, r.fromJSON = function(e) { return new r(e.condition, e.trueExpr, e.falseExpr) }, r.prototype.toHTML = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = Es(this, t),
                        n = this.condition.toHTML(e),
                        i = Es(this.condition, t);
                    ("all" === t || "OperatorNode" === this.condition.type || null !== i && i <= r) && (n = '<span class="math-parenthesis math-round-parenthesis">(</span>' + n + '<span class="math-parenthesis math-round-parenthesis">)</span>');
                    var a = this.trueExpr.toHTML(e),
                        o = Es(this.trueExpr, t);
                    ("all" === t || "OperatorNode" === this.trueExpr.type || null !== o && o <= r) && (a = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a + '<span class="math-parenthesis math-round-parenthesis">)</span>');
                    var s = this.falseExpr.toHTML(e),
                        u = Es(this.falseExpr, t);
                    return ("all" === t || "OperatorNode" === this.falseExpr.type || null !== u && u <= r) && (s = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s + '<span class="math-parenthesis math-round-parenthesis">)</span>'), n + '<span class="math-operator math-conditional-operator">?</span>' + a + '<span class="math-operator math-conditional-operator">:</span>' + s
                }, r.prototype._toTex = function(e) { return "\\begin{cases} {" + this.trueExpr.toTex(e) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(e) + "}\\\\{" + this.falseExpr.toTex(e) + "}, &\\quad{\\text{otherwise}}\\end{cases}" }, r
            }), { isClass: !0, isNode: !0 }),
            zs = r(11),
            qs = r.n(zs),
            Is = { Alpha: "A", alpha: "\\alpha", Beta: "B", beta: "\\beta", Gamma: "\\Gamma", gamma: "\\gamma", Delta: "\\Delta", delta: "\\delta", Epsilon: "E", epsilon: "\\epsilon", varepsilon: "\\varepsilon", Zeta: "Z", zeta: "\\zeta", Eta: "H", eta: "\\eta", Theta: "\\Theta", theta: "\\theta", vartheta: "\\vartheta", Iota: "I", iota: "\\iota", Kappa: "K", kappa: "\\kappa", varkappa: "\\varkappa", Lambda: "\\Lambda", lambda: "\\lambda", Mu: "M", mu: "\\mu", Nu: "N", nu: "\\nu", Xi: "\\Xi", xi: "\\xi", Omicron: "O", omicron: "o", Pi: "\\Pi", pi: "\\pi", varpi: "\\varpi", Rho: "P", rho: "\\rho", varrho: "\\varrho", Sigma: "\\Sigma", sigma: "\\sigma", varsigma: "\\varsigma", Tau: "T", tau: "\\tau", Upsilon: "\\Upsilon", upsilon: "\\upsilon", Phi: "\\Phi", phi: "\\phi", varphi: "\\varphi", Chi: "X", chi: "\\chi", Psi: "\\Psi", psi: "\\psi", Omega: "\\Omega", omega: "\\omega", true: "\\mathrm{True}", false: "\\mathrm{False}", i: "i", inf: "\\infty", Inf: "\\infty", infinity: "\\infty", Infinity: "\\infty", oo: "\\infty", lim: "\\lim", undefined: "\\mathbf{?}" },
            Bs = { transpose: "^\\top", ctranspose: "^H", factorial: "!", pow: "^", dotPow: ".^\\wedge", unaryPlus: "+", unaryMinus: "-", bitNot: "\\~", not: "\\neg", multiply: "\\cdot", divide: "\\frac", dotMultiply: ".\\cdot", dotDivide: ".:", mod: "\\mod", add: "+", subtract: "-", to: "\\rightarrow", leftShift: "<<", rightArithShift: ">>", rightLogShift: ">>>", equal: "=", unequal: "\\neq", smaller: "<", larger: ">", smallerEq: "\\leq", largerEq: "\\geq", bitAnd: "\\&", bitXor: "\\underline{|}", bitOr: "|", and: "\\wedge", xor: "\\veebar", or: "\\vee" },
            ks = { abs: { 1: "\\left|${args[0]}\\right|" }, add: { 2: "\\left(${args[0]}".concat(Bs.add, "${args[1]}\\right)") }, cbrt: { 1: "\\sqrt[3]{${args[0]}}" }, ceil: { 1: "\\left\\lceil${args[0]}\\right\\rceil" }, cube: { 1: "\\left(${args[0]}\\right)^3" }, divide: { 2: "\\frac{${args[0]}}{${args[1]}}" }, dotDivide: { 2: "\\left(${args[0]}".concat(Bs.dotDivide, "${args[1]}\\right)") }, dotMultiply: { 2: "\\left(${args[0]}".concat(Bs.dotMultiply, "${args[1]}\\right)") }, dotPow: { 2: "\\left(${args[0]}".concat(Bs.dotPow, "${args[1]}\\right)") }, exp: { 1: "\\exp\\left(${args[0]}\\right)" }, expm1: "\\left(e".concat(Bs.pow, "{${args[0]}}-1\\right)"), fix: { 1: "\\mathrm{${name}}\\left(${args[0]}\\right)" }, floor: { 1: "\\left\\lfloor${args[0]}\\right\\rfloor" }, gcd: "\\gcd\\left(${args}\\right)", hypot: "\\hypot\\left(${args}\\right)", log: { 1: "\\ln\\left(${args[0]}\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}\\right)" }, log10: { 1: "\\log_{10}\\left(${args[0]}\\right)" }, log1p: { 1: "\\ln\\left(${args[0]}+1\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}+1\\right)" }, log2: "\\log_{2}\\left(${args[0]}\\right)", mod: { 2: "\\left(${args[0]}".concat(Bs.mod, "${args[1]}\\right)") }, multiply: { 2: "\\left(${args[0]}".concat(Bs.multiply, "${args[1]}\\right)") }, norm: { 1: "\\left\\|${args[0]}\\right\\|", 2: void 0 }, nthRoot: { 2: "\\sqrt[${args[1]}]{${args[0]}}" }, nthRoots: { 2: "\\{y : $y^{args[1]} = {${args[0]}}\\}" }, pow: { 2: "\\left(${args[0]}\\right)".concat(Bs.pow, "{${args[1]}}") }, round: { 1: "\\left\\lfloor${args[0]}\\right\\rceil", 2: void 0 }, sign: { 1: "\\mathrm{${name}}\\left(${args[0]}\\right)" }, sqrt: { 1: "\\sqrt{${args[0]}}" }, square: { 1: "\\left(${args[0]}\\right)^2" }, subtract: { 2: "\\left(${args[0]}".concat(Bs.subtract, "${args[1]}\\right)") }, unaryMinus: { 1: "".concat(Bs.unaryMinus, "\\left(${args[0]}\\right)") }, unaryPlus: { 1: "".concat(Bs.unaryPlus, "\\left(${args[0]}\\right)") }, bitAnd: { 2: "\\left(${args[0]}".concat(Bs.bitAnd, "${args[1]}\\right)") }, bitNot: { 1: Bs.bitNot + "\\left(${args[0]}\\right)" }, bitOr: { 2: "\\left(${args[0]}".concat(Bs.bitOr, "${args[1]}\\right)") }, bitXor: { 2: "\\left(${args[0]}".concat(Bs.bitXor, "${args[1]}\\right)") }, leftShift: { 2: "\\left(${args[0]}".concat(Bs.leftShift, "${args[1]}\\right)") }, rightArithShift: { 2: "\\left(${args[0]}".concat(Bs.rightArithShift, "${args[1]}\\right)") }, rightLogShift: { 2: "\\left(${args[0]}".concat(Bs.rightLogShift, "${args[1]}\\right)") }, bellNumbers: { 1: "\\mathrm{B}_{${args[0]}}" }, catalan: { 1: "\\mathrm{C}_{${args[0]}}" }, stirlingS2: { 2: "\\mathrm{S}\\left(${args}\\right)" }, arg: { 1: "\\arg\\left(${args[0]}\\right)" }, conj: { 1: "\\left(${args[0]}\\right)^*" }, im: { 1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace" }, re: { 1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace" }, and: { 2: "\\left(${args[0]}".concat(Bs.and, "${args[1]}\\right)") }, not: { 1: Bs.not + "\\left(${args[0]}\\right)" }, or: { 2: "\\left(${args[0]}".concat(Bs.or, "${args[1]}\\right)") }, xor: { 2: "\\left(${args[0]}".concat(Bs.xor, "${args[1]}\\right)") }, cross: { 2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)" }, ctranspose: { 1: "\\left(${args[0]}\\right)".concat(Bs.ctranspose) }, det: { 1: "\\det\\left(${args[0]}\\right)" }, dot: { 2: "\\left(${args[0]}\\cdot${args[1]}\\right)" }, expm: { 1: "\\exp\\left(${args[0]}\\right)" }, inv: { 1: "\\left(${args[0]}\\right)^{-1}" }, sqrtm: { 1: "{${args[0]}}".concat(Bs.pow, "{\\frac{1}{2}}") }, trace: { 1: "\\mathrm{tr}\\left(${args[0]}\\right)" }, transpose: { 1: "\\left(${args[0]}\\right)".concat(Bs.transpose) }, combinations: { 2: "\\binom{${args[0]}}{${args[1]}}" }, combinationsWithRep: { 2: "\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)" }, factorial: { 1: "\\left(${args[0]}\\right)".concat(Bs.factorial) }, gamma: { 1: "\\Gamma\\left(${args[0]}\\right)" }, equal: { 2: "\\left(${args[0]}".concat(Bs.equal, "${args[1]}\\right)") }, larger: { 2: "\\left(${args[0]}".concat(Bs.larger, "${args[1]}\\right)") }, largerEq: { 2: "\\left(${args[0]}".concat(Bs.largerEq, "${args[1]}\\right)") }, smaller: { 2: "\\left(${args[0]}".concat(Bs.smaller, "${args[1]}\\right)") }, smallerEq: { 2: "\\left(${args[0]}".concat(Bs.smallerEq, "${args[1]}\\right)") }, unequal: { 2: "\\left(${args[0]}".concat(Bs.unequal, "${args[1]}\\right)") }, erf: { 1: "erf\\left(${args[0]}\\right)" }, max: "\\max\\left(${args}\\right)", min: "\\min\\left(${args}\\right)", variance: "\\mathrm{Var}\\left(${args}\\right)", acos: { 1: "\\cos^{-1}\\left(${args[0]}\\right)" }, acosh: { 1: "\\cosh^{-1}\\left(${args[0]}\\right)" }, acot: { 1: "\\cot^{-1}\\left(${args[0]}\\right)" }, acoth: { 1: "\\coth^{-1}\\left(${args[0]}\\right)" }, acsc: { 1: "\\csc^{-1}\\left(${args[0]}\\right)" }, acsch: { 1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)" }, asec: { 1: "\\sec^{-1}\\left(${args[0]}\\right)" }, asech: { 1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)" }, asin: { 1: "\\sin^{-1}\\left(${args[0]}\\right)" }, asinh: { 1: "\\sinh^{-1}\\left(${args[0]}\\right)" }, atan: { 1: "\\tan^{-1}\\left(${args[0]}\\right)" }, atan2: { 2: "\\mathrm{atan2}\\left(${args}\\right)" }, atanh: { 1: "\\tanh^{-1}\\left(${args[0]}\\right)" }, cos: { 1: "\\cos\\left(${args[0]}\\right)" }, cosh: { 1: "\\cosh\\left(${args[0]}\\right)" }, cot: { 1: "\\cot\\left(${args[0]}\\right)" }, coth: { 1: "\\coth\\left(${args[0]}\\right)" }, csc: { 1: "\\csc\\left(${args[0]}\\right)" }, csch: { 1: "\\mathrm{csch}\\left(${args[0]}\\right)" }, sec: { 1: "\\sec\\left(${args[0]}\\right)" }, sech: { 1: "\\mathrm{sech}\\left(${args[0]}\\right)" }, sin: { 1: "\\sin\\left(${args[0]}\\right)" }, sinh: { 1: "\\sinh\\left(${args[0]}\\right)" }, tan: { 1: "\\tan\\left(${args[0]}\\right)" }, tanh: { 1: "\\tanh\\left(${args[0]}\\right)" }, to: { 2: "\\left(${args[0]}".concat(Bs.to, "${args[1]}\\right)") }, numeric: function(e, t) { return e.args[0].toTex() }, number: { 0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)" }, string: { 0: '\\mathtt{""}', 1: "\\mathrm{string}\\left(${args[0]}\\right)" }, bignumber: { 0: "0", 1: "\\left(${args[0]}\\right)" }, complex: { 0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)+".concat(Is.i, "\\cdot\\left(${args[1]}\\right)\\right)") }, matrix: { 0: "\\begin{bmatrix}\\end{bmatrix}", 1: "\\left(${args[0]}\\right)", 2: "\\left(${args[0]}\\right)" }, sparse: { 0: "\\begin{bsparse}\\end{bsparse}", 1: "\\left(${args[0]}\\right)" }, unit: { 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)" } },
            Ds = { deg: "^\\circ" };

        function Rs(e) { return qs()(e, { preserveFormatting: !0 }) }

        function Ps(e, t) { return (t = void 0 !== t && t) ? Xe(Ds, e) ? Ds[e] : "\\mathrm{" + Rs(e) + "}" : Xe(Is, e) ? Is[e] : Rs(e) }
        var js = Ke("ConstantNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    this.value = e
                }
                return r.prototype = new t, r.prototype.type = "ConstantNode", r.prototype.isConstantNode = !0, r.prototype._compile = function(e, t) { var r = this.value; return function() { return r } }, r.prototype.forEach = function(e) {}, r.prototype.map = function(e) { return this.clone() }, r.prototype.clone = function() { return new r(this.value) }, r.prototype._toString = function(e) { return xe(this.value, e) }, r.prototype.toHTML = function(e) {
                    var t = this._toString(e);
                    switch (H(this.value)) {
                        case "number":
                        case "BigNumber":
                        case "Fraction":
                            return '<span class="math-number">' + t + "</span>";
                        case "string":
                            return '<span class="math-string">' + t + "</span>";
                        case "boolean":
                            return '<span class="math-boolean">' + t + "</span>";
                        case "null":
                            return '<span class="math-null-symbol">' + t + "</span>";
                        case "undefined":
                            return '<span class="math-undefined">' + t + "</span>";
                        default:
                            return '<span class="math-symbol">' + t + "</span>"
                    }
                }, r.prototype.toJSON = function() { return { mathjs: "ConstantNode", value: this.value } }, r.fromJSON = function(e) { return new r(e.value) }, r.prototype._toTex = function(e) {
                    var t = this._toString(e);
                    switch (H(this.value)) {
                        case "string":
                            return "\\mathtt{" + Rs(t) + "}";
                        case "number":
                        case "BigNumber":
                            if (!isFinite(this.value)) return this.value.valueOf() < 0 ? "-\\infty" : "\\infty";
                            var r = t.toLowerCase().indexOf("e");
                            return -1 !== r ? t.substring(0, r) + "\\cdot10^{" + t.substring(r + 1) + "}" : t;
                        case "Fraction":
                            return this.value.toLatex();
                        default:
                            return t
                    }
                }, r
            }), { isClass: !0, isNode: !0 }),
            Us = Ke("FunctionAssignmentNode", ["typed", "Node"], (function(e) {
                var t = e.typed,
                    r = e.Node;

                function n(e, t, r) {
                    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                    if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');
                    if (!Array.isArray(t)) throw new TypeError('Array containing strings or objects expected for parameter "params"');
                    if (!D(r)) throw new TypeError('Node expected for parameter "expr"');
                    if (e in ds) throw new Error('Illegal function name, "' + e + '" is a reserved keyword');
                    this.name = e, this.params = t.map((function(e) { return e && e.name || e })), this.types = t.map((function(e) { return e && e.type || "any" })), this.expr = r
                }

                function i(e, t) {
                    var r = Es(e, t),
                        n = Es(e.expr, t);
                    return "all" === t || null !== n && n <= r
                }
                return n.prototype = new r, n.prototype.type = "FunctionAssignmentNode", n.prototype.isFunctionAssignmentNode = !0, n.prototype._compile = function(e, r) {
                    var n = Object.create(r);
                    De(this.params, (function(e) { n[e] = !0 }));
                    var i = this.expr._compile(e, n),
                        a = this.name,
                        o = this.params,
                        s = je(this.types, ","),
                        u = a + "(" + je(this.params, ", ") + ")";
                    return function(e, r, n) {
                        var c = {};
                        c[s] = function() { for (var t = Object.create(r), a = 0; a < o.length; a++) t[o[a]] = arguments[a]; return i(e, t, n) };
                        var f = t(a, c);
                        return f.syntax = u, Ei(e, a, f), f
                    }
                }, n.prototype.forEach = function(e) { e(this.expr, "expr", this) }, n.prototype.map = function(e) { var t = this._ifNode(e(this.expr, "expr", this)); return new n(this.name, this.params.slice(0), t) }, n.prototype.clone = function() { return new n(this.name, this.params.slice(0), this.expr) }, n.prototype._toString = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = this.expr.toString(e);
                    return i(this, t) && (r = "(" + r + ")"), this.name + "(" + this.params.join(", ") + ") = " + r
                }, n.prototype.toJSON = function() { var e = this.types; return { mathjs: "FunctionAssignmentNode", name: this.name, params: this.params.map((function(t, r) { return { name: t, type: e[r] } })), expr: this.expr } }, n.fromJSON = function(e) { return new n(e.name, e.params, e.expr) }, n.prototype.toHTML = function(e) { for (var t = e && e.parenthesis ? e.parenthesis : "keep", r = [], n = 0; n < this.params.length; n++) r.push('<span class="math-symbol math-parameter">' + we(this.params[n]) + "</span>"); var a = this.expr.toHTML(e); return i(this, t) && (a = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a + '<span class="math-parenthesis math-round-parenthesis">)</span>'), '<span class="math-function">' + we(this.name) + '</span><span class="math-parenthesis math-round-parenthesis">(</span>' + r.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + a }, n.prototype._toTex = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = this.expr.toTex(e);
                    return i(this, t) && (r = "\\left(".concat(r, "\\right)")), "\\mathrm{" + this.name + "}\\left(" + this.params.map(Ps).join(",") + "\\right):=" + r
                }, n
            }), { isClass: !0, isNode: !0 });

        function Fs(e) { return function(e) { if (Array.isArray(e)) return Ls(e) }(e) || function(e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || function(e, t) { if (!e) return; if ("string" == typeof e) return Ls(e, t); var r = Object.prototype.toString.call(e).slice(8, -1); "Object" === r && e.constructor && (r = e.constructor.name); if ("Map" === r || "Set" === r) return Array.from(e); if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ls(e, t) }(e) || function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() }

        function Ls(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }
        var Hs = Ke("IndexNode", ["Range", "Node", "size"], (function(e) {
            var t = e.Range,
                r = e.Node,
                n = e.size;

            function i(e, t) { if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator"); if (this.dimensions = e, this.dotNotation = t || !1, !Array.isArray(e) || !e.every(D)) throw new TypeError('Array containing Nodes expected for parameter "dimensions"'); if (this.dotNotation && !this.isObjectProperty()) throw new Error("dotNotation only applicable for object properties") }

            function a(e, r, n) { return new t(o(e) ? e.toNumber() : e, o(r) ? r.toNumber() : r, o(n) ? n.toNumber() : n) }
            return i.prototype = new r, i.prototype.type = "IndexNode", i.prototype.isIndexNode = !0, i.prototype._compile = function(e, t) {
                var r = ke(this.dimensions, (function(r, i) {
                        if (U(r)) {
                            if (r.needsEnd()) {
                                var o = Object.create(t);
                                o.end = !0;
                                var s = r.start._compile(e, o),
                                    u = r.end._compile(e, o),
                                    c = r.step ? r.step._compile(e, o) : function() { return 1 };
                                return function(e, t, r) {
                                    var o = n(r).valueOf(),
                                        f = Object.create(t);
                                    return f.end = o[i], a(s(e, f, r), u(e, f, r), c(e, f, r))
                                }
                            }
                            var f = r.start._compile(e, t),
                                l = r.end._compile(e, t),
                                p = r.step ? r.step._compile(e, t) : function() { return 1 };
                            return function(e, t, r) { return a(f(e, t, r), l(e, t, r), p(e, t, r)) }
                        }
                        if (F(r) && "end" === r.name) {
                            var m = Object.create(t);
                            m.end = !0;
                            var h = r._compile(e, m);
                            return function(e, t, r) {
                                var a = n(r).valueOf(),
                                    o = Object.create(t);
                                return o.end = a[i], h(e, o, r)
                            }
                        }
                        var d = r._compile(e, t);
                        return function(e, t, r) { return d(e, t, r) }
                    })),
                    i = Si(e, "index");
                return function(e, t, n) { var a = ke(r, (function(r) { return r(e, t, n) })); return i.apply(void 0, Fs(a)) }
            }, i.prototype.forEach = function(e) { for (var t = 0; t < this.dimensions.length; t++) e(this.dimensions[t], "dimensions[" + t + "]", this) }, i.prototype.map = function(e) { for (var t = [], r = 0; r < this.dimensions.length; r++) t[r] = this._ifNode(e(this.dimensions[r], "dimensions[" + r + "]", this)); return new i(t, this.dotNotation) }, i.prototype.clone = function() { return new i(this.dimensions.slice(0), this.dotNotation) }, i.prototype.isObjectProperty = function() { return 1 === this.dimensions.length && q(this.dimensions[0]) && "string" == typeof this.dimensions[0].value }, i.prototype.getObjectProperty = function() { return this.isObjectProperty() ? this.dimensions[0].value : null }, i.prototype._toString = function(e) { return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]" }, i.prototype.toJSON = function() { return { mathjs: "IndexNode", dimensions: this.dimensions, dotNotation: this.dotNotation } }, i.fromJSON = function(e) { return new i(e.dimensions, e.dotNotation) }, i.prototype.toHTML = function(e) { for (var t = [], r = 0; r < this.dimensions.length; r++) t[r] = this.dimensions[r].toHTML(); return this.dotNotation ? '<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">' + we(this.getObjectProperty()) + "</span>" : '<span class="math-parenthesis math-square-parenthesis">[</span>' + t.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>' }, i.prototype._toTex = function(e) { var t = this.dimensions.map((function(t) { return t.toTex(e) })); return this.dotNotation ? "." + this.getObjectProperty() : "_{" + t.join(",") + "}" }, i
        }), { isClass: !0, isNode: !0 });

        function $s(e) { return ($s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }
        var Gs = Ke("ObjectNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e) { if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator"); if (this.properties = e || {}, e && ("object" !== $s(e) || !Object.keys(e).every((function(t) { return D(e[t]) })))) throw new TypeError("Object containing Nodes expected") }
                return r.prototype = new t, r.prototype.type = "ObjectNode", r.prototype.isObjectNode = !0, r.prototype._compile = function(e, t) {
                    var r = {};
                    for (var n in this.properties)
                        if (Xe(this.properties, n)) {
                            var i = be(n),
                                a = JSON.parse(i);
                            if (!Ai(this.properties, a)) throw new Error('No access to property "' + a + '"');
                            r[a] = this.properties[n]._compile(e, t)
                        }
                    return function(e, t, n) { var i = {}; for (var a in r) Xe(r, a) && (i[a] = r[a](e, t, n)); return i }
                }, r.prototype.forEach = function(e) { for (var t in this.properties) Xe(this.properties, t) && e(this.properties[t], "properties[" + be(t) + "]", this) }, r.prototype.map = function(e) { var t = {}; for (var n in this.properties) Xe(this.properties, n) && (t[n] = this._ifNode(e(this.properties[n], "properties[" + be(n) + "]", this))); return new r(t) }, r.prototype.clone = function() { var e = {}; for (var t in this.properties) Xe(this.properties, t) && (e[t] = this.properties[t]); return new r(e) }, r.prototype._toString = function(e) { var t = []; for (var r in this.properties) Xe(this.properties, r) && t.push(be(r) + ": " + this.properties[r].toString(e)); return "{" + t.join(", ") + "}" }, r.prototype.toJSON = function() { return { mathjs: "ObjectNode", properties: this.properties } }, r.fromJSON = function(e) { return new r(e.properties) }, r.prototype.toHTML = function(e) { var t = []; for (var r in this.properties) Xe(this.properties, r) && t.push('<span class="math-symbol math-property">' + we(r) + '</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[r].toHTML(e)); return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + t.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>' }, r.prototype._toTex = function(e) { var t = []; for (var r in this.properties) Xe(this.properties, r) && t.push("\\mathbf{" + r + ":} & " + this.properties[r].toTex(e) + "\\\\"); return "\\left\\{\\begin{array}{ll}".concat(t.join("\n"), "\\end{array}\\right\\}") }, r
            }), { isClass: !0, isNode: !0 }),
            Vs = Ke("OperatorNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e, t, n, i) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if ("string" != typeof e) throw new TypeError('string expected for parameter "op"');
                    if ("string" != typeof t) throw new TypeError('string expected for parameter "fn"');
                    if (!Array.isArray(n) || !n.every(D)) throw new TypeError('Array containing Nodes expected for parameter "args"');
                    this.implicit = !0 === i, this.op = e, this.fn = t, this.args = n || []
                }

                function n(e, t, r, n, i) {
                    var a, o = Es(e, t),
                        s = As(e, t);
                    if ("all" === t || n.length > 2 && "OperatorNode:add" !== e.getIdentifier() && "OperatorNode:multiply" !== e.getIdentifier()) return n.map((function(e) {
                        switch (e.getContent().type) {
                            case "ArrayNode":
                            case "ConstantNode":
                            case "SymbolNode":
                            case "ParenthesisNode":
                                return !1;
                            default:
                                return !0
                        }
                    }));
                    switch (n.length) {
                        case 0:
                            a = [];
                            break;
                        case 1:
                            var u = Es(n[0], t);
                            if (i && null !== u) { var c, f; if ("keep" === t ? (c = n[0].getIdentifier(), f = e.getIdentifier()) : (c = n[0].getContent().getIdentifier(), f = e.getContent().getIdentifier()), !1 === Ss[o][f].latexLeftParens) { a = [!1]; break } if (!1 === Ss[u][c].latexParens) { a = [!1]; break } }
                            if (null === u) { a = [!1]; break }
                            if (u <= o) { a = [!0]; break }
                            a = [!1];
                            break;
                        case 2:
                            var l, p, m = Es(n[0], t),
                                h = Os(e, n[0], t);
                            l = null !== m && (m === o && "right" === s && !h || m < o);
                            var d, y, g, v = Es(n[1], t),
                                x = Os(e, n[1], t);
                            if (p = null !== v && (v === o && "left" === s && !x || v < o), i) "keep" === t ? (d = e.getIdentifier(), y = e.args[0].getIdentifier(), g = e.args[1].getIdentifier()) : (d = e.getContent().getIdentifier(), y = e.args[0].getContent().getIdentifier(), g = e.args[1].getContent().getIdentifier()), null !== m && (!1 === Ss[o][d].latexLeftParens && (l = !1), !1 === Ss[m][y].latexParens && (l = !1)), null !== v && (!1 === Ss[o][d].latexRightParens && (p = !1), !1 === Ss[v][g].latexParens && (p = !1));
                            a = [l, p];
                            break;
                        default:
                            "OperatorNode:add" !== e.getIdentifier() && "OperatorNode:multiply" !== e.getIdentifier() || (a = n.map((function(r) {
                                var n = Es(r, t),
                                    i = Os(e, r, t),
                                    a = As(r, t);
                                return null !== n && (o === n && s === a && !i || n < o)
                            })))
                    }
                    return n.length >= 2 && "OperatorNode:multiply" === e.getIdentifier() && e.implicit && "auto" === t && "hide" === r && (a = n.map((function(e, t) { var r = "ParenthesisNode" === e.getIdentifier(); return !(!a[t] && !r) }))), a
                }
                return r.prototype = new t, r.prototype.type = "OperatorNode", r.prototype.isOperatorNode = !0, r.prototype._compile = function(e, t) {
                    if ("string" != typeof this.fn || !Oi(e, this.fn)) throw e[this.fn] ? new Error('No access to function "' + this.fn + '"') : new Error("Function " + this.fn + ' missing in provided namespace "math"');
                    var r = Si(e, this.fn),
                        n = ke(this.args, (function(r) { return r._compile(e, t) }));
                    if (1 === n.length) { var i = n[0]; return function(e, t, n) { return r(i(e, t, n)) } }
                    if (2 === n.length) {
                        var a = n[0],
                            o = n[1];
                        return function(e, t, n) { return r(a(e, t, n), o(e, t, n)) }
                    }
                    return function(e, t, i) { return r.apply(null, ke(n, (function(r) { return r(e, t, i) }))) }
                }, r.prototype.forEach = function(e) { for (var t = 0; t < this.args.length; t++) e(this.args[t], "args[" + t + "]", this) }, r.prototype.map = function(e) { for (var t = [], n = 0; n < this.args.length; n++) t[n] = this._ifNode(e(this.args[n], "args[" + n + "]", this)); return new r(this.op, this.fn, t, this.implicit) }, r.prototype.clone = function() { return new r(this.op, this.fn, this.args.slice(0), this.implicit) }, r.prototype.isUnary = function() { return 1 === this.args.length }, r.prototype.isBinary = function() { return 2 === this.args.length }, r.prototype._toString = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = e && e.implicit ? e.implicit : "hide",
                        i = this.args,
                        a = n(this, t, r, i, !1);
                    if (1 === i.length) {
                        var o = As(this, t),
                            s = i[0].toString(e);
                        a[0] && (s = "(" + s + ")");
                        var u = /[a-zA-Z]+/.test(this.op);
                        return "right" === o ? this.op + (u ? " " : "") + s : "left" === o ? s + (u ? " " : "") + this.op : s + this.op
                    }
                    if (2 === i.length) {
                        var c = i[0].toString(e),
                            f = i[1].toString(e);
                        return a[0] && (c = "(" + c + ")"), a[1] && (f = "(" + f + ")"), this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === r ? c + " " + f : c + " " + this.op + " " + f
                    }
                    if (i.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) { var l = i.map((function(t, r) { return t = t.toString(e), a[r] && (t = "(" + t + ")"), t })); return this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === r ? l.join(" ") : l.join(" " + this.op + " ") }
                    return this.fn + "(" + this.args.join(", ") + ")"
                }, r.prototype.toJSON = function() { return { mathjs: "OperatorNode", op: this.op, fn: this.fn, args: this.args, implicit: this.implicit } }, r.fromJSON = function(e) { return new r(e.op, e.fn, e.args, e.implicit) }, r.prototype.toHTML = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = e && e.implicit ? e.implicit : "hide",
                        i = this.args,
                        a = n(this, t, r, i, !1);
                    if (1 === i.length) {
                        var o = As(this, t),
                            s = i[0].toHTML(e);
                        return a[0] && (s = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s + '<span class="math-parenthesis math-round-parenthesis">)</span>'), "right" === o ? '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + we(this.op) + "</span>" + s : s + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + we(this.op) + "</span>"
                    }
                    if (2 === i.length) {
                        var u = i[0].toHTML(e),
                            c = i[1].toHTML(e);
                        return a[0] && (u = '<span class="math-parenthesis math-round-parenthesis">(</span>' + u + '<span class="math-parenthesis math-round-parenthesis">)</span>'), a[1] && (c = '<span class="math-parenthesis math-round-parenthesis">(</span>' + c + '<span class="math-parenthesis math-round-parenthesis">)</span>'), this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === r ? u + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + c : u + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + we(this.op) + "</span>" + c
                    }
                    var f = i.map((function(t, r) { return t = t.toHTML(e), a[r] && (t = '<span class="math-parenthesis math-round-parenthesis">(</span>' + t + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t }));
                    return i.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier()) ? this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === r ? f.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>') : f.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + we(this.op) + "</span>") : '<span class="math-function">' + we(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + f.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>'
                }, r.prototype._toTex = function(e) {
                    var t = e && e.parenthesis ? e.parenthesis : "keep",
                        r = e && e.implicit ? e.implicit : "hide",
                        i = this.args,
                        a = n(this, t, r, i, !0),
                        o = Bs[this.fn];
                    if (o = void 0 === o ? this.op : o, 1 === i.length) {
                        var s = As(this, t),
                            u = i[0].toTex(e);
                        return a[0] && (u = "\\left(".concat(u, "\\right)")), "right" === s ? o + u : u + o
                    }
                    if (2 === i.length) {
                        var c = i[0],
                            f = c.toTex(e);
                        a[0] && (f = "\\left(".concat(f, "\\right)"));
                        var l, p = i[1].toTex(e);
                        switch (a[1] && (p = "\\left(".concat(p, "\\right)")), l = "keep" === t ? c.getIdentifier() : c.getContent().getIdentifier(), this.getIdentifier()) {
                            case "OperatorNode:divide":
                                return o + "{" + f + "}{" + p + "}";
                            case "OperatorNode:pow":
                                switch (f = "{" + f + "}", p = "{" + p + "}", l) {
                                    case "ConditionalNode":
                                    case "OperatorNode:divide":
                                        f = "\\left(".concat(f, "\\right)")
                                }
                                break;
                            case "OperatorNode:multiply":
                                if (this.implicit && "hide" === r) return f + "~" + p
                        }
                        return f + o + p
                    }
                    if (i.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) { var m = i.map((function(t, r) { return t = t.toTex(e), a[r] && (t = "\\left(".concat(t, "\\right)")), t })); return "OperatorNode:multiply" === this.getIdentifier() && this.implicit ? m.join("~") : m.join(o) }
                    return "\\mathrm{" + this.fn + "}\\left(" + i.map((function(t) { return t.toTex(e) })).join(",") + "\\right)"
                }, r.prototype.getIdentifier = function() { return this.type + ":" + this.fn }, r
            }), { isClass: !0, isNode: !0 }),
            Zs = Ke("ParenthesisNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!D(e)) throw new TypeError('Node expected for parameter "content"');
                    this.content = e
                }
                return r.prototype = new t, r.prototype.type = "ParenthesisNode", r.prototype.isParenthesisNode = !0, r.prototype._compile = function(e, t) { return this.content._compile(e, t) }, r.prototype.getContent = function() { return this.content.getContent() }, r.prototype.forEach = function(e) { e(this.content, "content", this) }, r.prototype.map = function(e) { return new r(e(this.content, "content", this)) }, r.prototype.clone = function() { return new r(this.content) }, r.prototype._toString = function(e) { return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "(" + this.content.toString(e) + ")" : this.content.toString(e) }, r.prototype.toJSON = function() { return { mathjs: "ParenthesisNode", content: this.content } }, r.fromJSON = function(e) { return new r(e.content) }, r.prototype.toHTML = function(e) { return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(e) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : this.content.toHTML(e) }, r.prototype._toTex = function(e) { return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "\\left(".concat(this.content.toTex(e), "\\right)") : this.content.toTex(e) }, r
            }), { isClass: !0, isNode: !0 }),
            Ws = Ke("RangeNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e, t, n) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!D(e)) throw new TypeError("Node expected");
                    if (!D(t)) throw new TypeError("Node expected");
                    if (n && !D(n)) throw new TypeError("Node expected");
                    if (arguments.length > 3) throw new Error("Too many arguments");
                    this.start = e, this.end = t, this.step = n || null
                }

                function n(e, t) {
                    var r = Es(e, t),
                        n = {},
                        i = Es(e.start, t);
                    if (n.start = null !== i && i <= r || "all" === t, e.step) {
                        var a = Es(e.step, t);
                        n.step = null !== a && a <= r || "all" === t
                    }
                    var o = Es(e.end, t);
                    return n.end = null !== o && o <= r || "all" === t, n
                }
                return r.prototype = new t, r.prototype.type = "RangeNode", r.prototype.isRangeNode = !0, r.prototype.needsEnd = function() { return this.filter((function(e) { return F(e) && "end" === e.name })).length > 0 }, r.prototype._compile = function(e, t) {
                    var r = e.range,
                        n = this.start._compile(e, t),
                        i = this.end._compile(e, t);
                    if (this.step) { var a = this.step._compile(e, t); return function(e, t, o) { return r(n(e, t, o), i(e, t, o), a(e, t, o)) } }
                    return function(e, t, a) { return r(n(e, t, a), i(e, t, a)) }
                }, r.prototype.forEach = function(e) { e(this.start, "start", this), e(this.end, "end", this), this.step && e(this.step, "step", this) }, r.prototype.map = function(e) { return new r(this._ifNode(e(this.start, "start", this)), this._ifNode(e(this.end, "end", this)), this.step && this._ifNode(e(this.step, "step", this))) }, r.prototype.clone = function() { return new r(this.start, this.end, this.step && this.step) }, r.prototype._toString = function(e) {
                    var t, r = n(this, e && e.parenthesis ? e.parenthesis : "keep"),
                        i = this.start.toString(e);
                    if (r.start && (i = "(" + i + ")"), t = i, this.step) {
                        var a = this.step.toString(e);
                        r.step && (a = "(" + a + ")"), t += ":" + a
                    }
                    var o = this.end.toString(e);
                    return r.end && (o = "(" + o + ")"), t += ":" + o
                }, r.prototype.toJSON = function() { return { mathjs: "RangeNode", start: this.start, end: this.end, step: this.step } }, r.fromJSON = function(e) { return new r(e.start, e.end, e.step) }, r.prototype.toHTML = function(e) {
                    var t, r = n(this, e && e.parenthesis ? e.parenthesis : "keep"),
                        i = this.start.toHTML(e);
                    if (r.start && (i = '<span class="math-parenthesis math-round-parenthesis">(</span>' + i + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t = i, this.step) {
                        var a = this.step.toHTML(e);
                        r.step && (a = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t += '<span class="math-operator math-range-operator">:</span>' + a
                    }
                    var o = this.end.toHTML(e);
                    return r.end && (o = '<span class="math-parenthesis math-round-parenthesis">(</span>' + o + '<span class="math-parenthesis math-round-parenthesis">)</span>'), t += '<span class="math-operator math-range-operator">:</span>' + o
                }, r.prototype._toTex = function(e) {
                    var t = n(this, e && e.parenthesis ? e.parenthesis : "keep"),
                        r = this.start.toTex(e);
                    if (t.start && (r = "\\left(".concat(r, "\\right)")), this.step) {
                        var i = this.step.toTex(e);
                        t.step && (i = "\\left(".concat(i, "\\right)")), r += ":" + i
                    }
                    var a = this.end.toTex(e);
                    return t.end && (a = "\\left(".concat(a, "\\right)")), r += ":" + a
                }, r
            }), { isClass: !0, isNode: !0 }),
            Js = Ke("RelationalNode", ["Node"], (function(e) {
                var t = e.Node;

                function r(e, t) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!Array.isArray(e)) throw new TypeError("Parameter conditionals must be an array");
                    if (!Array.isArray(t)) throw new TypeError("Parameter params must be an array");
                    if (e.length !== t.length - 1) throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");
                    this.conditionals = e, this.params = t
                }
                return r.prototype = new t, r.prototype.type = "RelationalNode", r.prototype.isRelationalNode = !0, r.prototype._compile = function(e, t) {
                    var r = this,
                        n = this.params.map((function(r) { return r._compile(e, t) }));
                    return function(t, i, a) { for (var o, s = n[0](t, i, a), u = 0; u < r.conditionals.length; u++) { if (o = s, s = n[u + 1](t, i, a), !Si(e, r.conditionals[u])(o, s)) return !1 } return !0 }
                }, r.prototype.forEach = function(e) {
                    var t = this;
                    this.params.forEach((function(r, n) { return e(r, "params[" + n + "]", t) }), this)
                }, r.prototype.map = function(e) { var t = this; return new r(this.conditionals.slice(), this.params.map((function(r, n) { return t._ifNode(e(r, "params[" + n + "]", t)) }), this)) }, r.prototype.clone = function() { return new r(this.conditionals, this.params) }, r.prototype._toString = function(e) { for (var t = e && e.parenthesis ? e.parenthesis : "keep", r = Es(this, t), n = this.params.map((function(n, i) { var a = Es(n, t); return "all" === t || null !== a && a <= r ? "(" + n.toString(e) + ")" : n.toString(e) })), i = { equal: "==", unequal: "!=", smaller: "<", larger: ">", smallerEq: "<=", largerEq: ">=" }, a = n[0], o = 0; o < this.conditionals.length; o++) a += " " + i[this.conditionals[o]] + " " + n[o + 1]; return a }, r.prototype.toJSON = function() { return { mathjs: "RelationalNode", conditionals: this.conditionals, params: this.params } }, r.fromJSON = function(e) { return new r(e.conditionals, e.params) }, r.prototype.toHTML = function(e) { for (var t = e && e.parenthesis ? e.parenthesis : "keep", r = Es(this, t), n = this.params.map((function(n, i) { var a = Es(n, t); return "all" === t || null !== a && a <= r ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + n.toHTML(e) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : n.toHTML(e) })), i = { equal: "==", unequal: "!=", smaller: "<", larger: ">", smallerEq: "<=", largerEq: ">=" }, a = n[0], o = 0; o < this.conditionals.length; o++) a += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + we(i[this.conditionals[o]]) + "</span>" + n[o + 1]; return a }, r.prototype._toTex = function(e) { for (var t = e && e.parenthesis ? e.parenthesis : "keep", r = Es(this, t), n = this.params.map((function(n, i) { var a = Es(n, t); return "all" === t || null !== a && a <= r ? "\\left(" + n.toTex(e) + "\right)" : n.toTex(e) })), i = n[0], a = 0; a < this.conditionals.length; a++) i += Bs[this.conditionals[a]] + n[a + 1]; return i }, r
            }), { isClass: !0, isNode: !0 }),
            Ys = Ke("SymbolNode", ["math", "?Unit", "Node"], (function(e) {
                var t = e.math,
                    r = e.Unit,
                    n = e.Node;

                function i(e) { return !!r && r.isValuelessUnit(e) }

                function a(e) {
                    if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");
                    if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');
                    this.name = e
                }
                return a.prototype = new n, a.prototype.type = "SymbolNode", a.prototype.isSymbolNode = !0, a.prototype._compile = function(e, t) { var n = this.name; if (!0 === t[n]) return function(e, t, r) { return t[n] }; if (n in e) return function(t, r, i) { return Si(n in t ? t : e, n) }; var o = i(n); return function(e, t, i) { return n in e ? Si(e, n) : o ? new r(null, n) : a.onUndefinedSymbol(n) } }, a.prototype.forEach = function(e) {}, a.prototype.map = function(e) { return this.clone() }, a.onUndefinedSymbol = function(e) { throw new Error("Undefined symbol " + e) }, a.prototype.clone = function() { return new a(this.name) }, a.prototype._toString = function(e) { return this.name }, a.prototype.toHTML = function(e) { var t = we(this.name); return "true" === t || "false" === t ? '<span class="math-symbol math-boolean">' + t + "</span>" : "i" === t ? '<span class="math-symbol math-imaginary-symbol">' + t + "</span>" : "Infinity" === t ? '<span class="math-symbol math-infinity-symbol">' + t + "</span>" : "NaN" === t ? '<span class="math-symbol math-nan-symbol">' + t + "</span>" : "null" === t ? '<span class="math-symbol math-null-symbol">' + t + "</span>" : "undefined" === t ? '<span class="math-symbol math-undefined-symbol">' + t + "</span>" : '<span class="math-symbol">' + t + "</span>" }, a.prototype.toJSON = function() { return { mathjs: "SymbolNode", name: this.name } }, a.fromJSON = function(e) { return new a(e.name) }, a.prototype._toTex = function(e) {
                    var r = !1;
                    void 0 === t[this.name] && i(this.name) && (r = !0);
                    var n = Ps(this.name, r);
                    return "\\" === n[0] ? n : " " + n
                }, a
            }), { isClass: !0, isNode: !0 });

        function Xs(e) { return (Xs = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function Qs() { return (Qs = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var r = arguments[t]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]) } return e }).apply(this, arguments) }
        var Ks = Ke("FunctionNode", ["math", "Node", "SymbolNode"], (function(e) {
            var t = e.math,
                r = e.Node,
                n = e.SymbolNode;

            function i(e, t) {
                if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
                if ("string" == typeof e && (e = new n(e)), !D(e)) throw new TypeError('Node expected as parameter "fn"');
                if (!Array.isArray(t) || !t.every(D)) throw new TypeError('Array containing Nodes expected for parameter "args"');
                this.fn = e, this.args = t || [], Object.defineProperty(this, "name", { get: function() { return this.fn.name || "" }.bind(this), set: function() { throw new Error("Cannot assign a new name, name is read-only") } })
            }
            i.prototype = new r, i.prototype.type = "FunctionNode", i.prototype.isFunctionNode = !0, i.prototype._compile = function(e, t) {
                if (!(this instanceof i)) throw new TypeError("No valid FunctionNode");
                var r = ke(this.args, (function(r) { return r._compile(e, t) }));
                if (F(this.fn)) {
                    var n = function(t) { return a in t ? Si(t, a) : a in e ? Si(e, a) : i.onUndefinedFunction(a) },
                        a = this.fn.name,
                        o = a in e ? Si(e, a) : void 0;
                    if ("function" == typeof o && !0 === o.rawArgs) { var s = this.args; return function(t, r, i) { return n(t)(s, e, Qs({}, t, r)) } }
                    if (1 === r.length) { var u = r[0]; return function(e, t, r) { return n(e)(u(e, t, r)) } }
                    if (2 === r.length) {
                        var c = r[0],
                            f = r[1];
                        return function(e, t, r) { return n(e)(c(e, t, r), f(e, t, r)) }
                    }
                    return function(e, t, i) { return n(e).apply(null, ke(r, (function(r) { return r(e, t, i) }))) }
                }
                if (O(this.fn) && k(this.fn.index) && this.fn.index.isObjectProperty()) {
                    var l = this.fn.object._compile(e, t),
                        p = this.fn.index.getObjectProperty(),
                        m = this.args;
                    return function(t, n, i) { var a = l(t, n, i); return function(e, t) { if (!Oi(e, t)) throw new Error('No access to method "' + t + '"') }(a, p), a[p] && a[p].rawArgs ? a[p](m, e, Qs({}, t, n)) : a[p].apply(a, ke(r, (function(e) { return e(t, n, i) }))) }
                }
                var h = this.fn._compile(e, t),
                    d = this.args;
                return function(t, n, i) { var a = h(t, n, i); return a && a.rawArgs ? a(d, e, Qs({}, t, n)) : a.apply(a, ke(r, (function(e) { return e(t, n, i) }))) }
            }, i.prototype.forEach = function(e) { e(this.fn, "fn", this); for (var t = 0; t < this.args.length; t++) e(this.args[t], "args[" + t + "]", this) }, i.prototype.map = function(e) { for (var t = this._ifNode(e(this.fn, "fn", this)), r = [], n = 0; n < this.args.length; n++) r[n] = this._ifNode(e(this.args[n], "args[" + n + "]", this)); return new i(t, r) }, i.prototype.clone = function() { return new i(this.fn, this.args.slice(0)) }, i.onUndefinedFunction = function(e) { throw new Error("Undefined function " + e) };
            var a = i.prototype.toString;

            function o(e, t, r) {
                for (var n, i = "", a = /\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi, o = 0; null !== (n = a.exec(e));)
                    if (i += e.substring(o, n.index), o = n.index, "$$" === n[0]) i += "$", o++;
                    else {
                        o += n[0].length;
                        var s = t[n[1]];
                        if (!s) throw new ReferenceError("Template: Property " + n[1] + " does not exist.");
                        if (void 0 === n[2]) switch (Xs(s)) {
                            case "string":
                                i += s;
                                break;
                            case "object":
                                if (D(s)) i += s.toTex(r);
                                else {
                                    if (!Array.isArray(s)) throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes");
                                    i += s.map((function(e, t) { if (D(e)) return e.toTex(r); throw new TypeError("Template: " + n[1] + "[" + t + "] is not a Node.") })).join(",")
                                }
                                break;
                            default:
                                throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes")
                        } else {
                            if (!D(s[n[2]] && s[n[2]])) throw new TypeError("Template: " + n[1] + "[" + n[2] + "] is not a Node.");
                            i += s[n[2]].toTex(r)
                        }
                    }
                return i += e.slice(o)
            }
            i.prototype.toString = function(e) { var t, r = this.fn.toString(e); return e && "object" === Xs(e.handler) && Xe(e.handler, r) && (t = e.handler[r](this, e)), void 0 !== t ? t : a.call(this, e) }, i.prototype._toString = function(e) { var t = this.args.map((function(t) { return t.toString(e) })); return (I(this.fn) ? "(" + this.fn.toString(e) + ")" : this.fn.toString(e)) + "(" + t.join(", ") + ")" }, i.prototype.toJSON = function() { return { mathjs: "FunctionNode", fn: this.fn, args: this.args } }, i.fromJSON = function(e) { return new i(e.fn, e.args) }, i.prototype.toHTML = function(e) { var t = this.args.map((function(t) { return t.toHTML(e) })); return '<span class="math-function">' + we(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + t.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>' };
            var s = i.prototype.toTex;
            return i.prototype.toTex = function(e) { var t; return e && "object" === Xs(e.handler) && Xe(e.handler, this.name) && (t = e.handler[this.name](this, e)), void 0 !== t ? t : s.call(this, e) }, i.prototype._toTex = function(e) {
                var r, n, i = this.args.map((function(t) { return t.toTex(e) }));
                switch (ks[this.name] && (r = ks[this.name]), !t[this.name] || "function" != typeof t[this.name].toTex && "object" !== Xs(t[this.name].toTex) && "string" != typeof t[this.name].toTex || (r = t[this.name].toTex), Xs(r)) {
                    case "function":
                        n = r(this, e);
                        break;
                    case "string":
                        n = o(r, this, e);
                        break;
                    case "object":
                        switch (Xs(r[i.length])) {
                            case "function":
                                n = r[i.length](this, e);
                                break;
                            case "string":
                                n = o(r[i.length], this, e)
                        }
                }
                return void 0 !== n ? n : o("\\mathrm{${name}}\\left(${args}\\right)", this, e)
            }, i.prototype.getIdentifier = function() { return this.type + ":" + this.name }, i
        }), { isClass: !0, isNode: !0 });

        function eu() { return (eu = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var r = arguments[t]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]) } return e }).apply(this, arguments) }
        var tu = Ke("parse", ["typed", "numeric", "config", "AccessorNode", "ArrayNode", "AssignmentNode", "BlockNode", "ConditionalNode", "ConstantNode", "FunctionAssignmentNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "RangeNode", "RelationalNode", "SymbolNode"], (function(e) {
                var t = e.typed,
                    r = e.numeric,
                    n = e.config,
                    i = e.AccessorNode,
                    a = e.ArrayNode,
                    o = e.AssignmentNode,
                    s = e.BlockNode,
                    u = e.ConditionalNode,
                    c = e.ConstantNode,
                    f = e.FunctionAssignmentNode,
                    l = e.FunctionNode,
                    p = e.IndexNode,
                    m = e.ObjectNode,
                    h = e.OperatorNode,
                    d = e.ParenthesisNode,
                    y = e.RangeNode,
                    g = e.RelationalNode,
                    v = e.SymbolNode,
                    x = t("parse", { string: function(e) { return $(e, {}) }, "Array | Matrix": function(e) { return b(e, {}) }, "string, Object": function(e, t) { return $(e, void 0 !== t.nodes ? t.nodes : {}) }, "Array | Matrix, Object": b });

                function b(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = void 0 !== t.nodes ? t.nodes : {};
                    return St(e, (function(e) { if ("string" != typeof e) throw new TypeError("String expected"); return $(e, r) }))
                }
                var w = 0,
                    N = 1,
                    M = 2,
                    S = 3,
                    E = 4,
                    A = { ",": !0, "(": !0, ")": !0, "[": !0, "]": !0, "{": !0, "}": !0, '"': !0, "'": !0, ";": !0, "+": !0, "-": !0, "*": !0, ".*": !0, "/": !0, "./": !0, "%": !0, "^": !0, ".^": !0, "~": !0, "!": !0, "&": !0, "|": !0, "^|": !0, "=": !0, ":": !0, "?": !0, "==": !0, "!=": !0, "<": !0, ">": !0, "<=": !0, ">=": !0, "<<": !0, ">>": !0, ">>>": !0 },
                    C = { mod: !0, to: !0, in: !0, and: !0, xor: !0, or: !0, not: !0 },
                    _ = { true: !0, false: !1, null: null, undefined: void 0 },
                    T = ["NaN", "Infinity"];

                function z(e, t) { return e.expression.substr(e.index, t) }

                function I(e) { return z(e, 1) }

                function k(e) { e.index++ }

                function D(e) { return e.expression.charAt(e.index - 1) }

                function R(e) { return e.expression.charAt(e.index + 1) }

                function j(e) {
                    for (e.tokenType = w, e.token = "", e.comment = ""; x.isWhitespace(I(e), e.nestingLevel);) k(e);
                    if ("#" === I(e))
                        for (;
                            "\n" !== I(e) && "" !== I(e);) e.comment += I(e), k(e);
                    if ("" !== I(e)) {
                        if ("\n" === I(e) && !e.nestingLevel) return e.tokenType = N, e.token = I(e), void k(e);
                        var t = I(e),
                            r = z(e, 2),
                            n = z(e, 3);
                        if (3 === n.length && A[n]) return e.tokenType = N, e.token = n, k(e), k(e), void k(e);
                        if (2 === r.length && A[r]) return e.tokenType = N, e.token = r, k(e), void k(e);
                        if (A[t]) return e.tokenType = N, e.token = t, void k(e);
                        if (x.isDigitDot(t)) {
                            e.tokenType = M;
                            var i = z(e, 2);
                            if ("0b" === i || "0o" === i || "0x" === i) {
                                for (e.token += I(e), k(e), e.token += I(e), k(e); x.isHexDigit(I(e));) e.token += I(e), k(e);
                                if ("." === I(e))
                                    for (e.token += ".", k(e); x.isHexDigit(I(e));) e.token += I(e), k(e);
                                else if ("i" === I(e))
                                    for (e.token += "i", k(e); x.isDigit(I(e));) e.token += I(e), k(e);
                                return
                            }
                            if ("." === I(e)) e.token += I(e), k(e), x.isDigit(I(e)) || (e.tokenType = N);
                            else {
                                for (; x.isDigit(I(e));) e.token += I(e), k(e);
                                x.isDecimalMark(I(e), R(e)) && (e.token += I(e), k(e))
                            }
                            for (; x.isDigit(I(e));) e.token += I(e), k(e);
                            if ("E" === I(e) || "e" === I(e))
                                if (x.isDigit(R(e)) || "-" === R(e) || "+" === R(e)) { if (e.token += I(e), k(e), "+" !== I(e) && "-" !== I(e) || (e.token += I(e), k(e)), !x.isDigit(I(e))) throw le(e, 'Digit expected, got "' + I(e) + '"'); for (; x.isDigit(I(e));) e.token += I(e), k(e); if (x.isDecimalMark(I(e), R(e))) throw le(e, 'Digit expected, got "' + I(e) + '"') } else if ("." === R(e)) throw k(e), le(e, 'Digit expected, got "' + I(e) + '"')
                        } else {
                            if (!x.isAlpha(I(e), D(e), R(e))) {
                                for (e.tokenType = E;
                                    "" !== I(e);) e.token += I(e), k(e);
                                throw le(e, 'Syntax error in part "' + e.token + '"')
                            }
                            for (; x.isAlpha(I(e), D(e), R(e)) || x.isDigit(I(e));) e.token += I(e), k(e);
                            Xe(C, e.token) ? e.tokenType = N : e.tokenType = S
                        }
                    } else e.tokenType = N
                }

                function U(e) { do { j(e) } while ("\n" === e.token) }

                function L(e) { e.nestingLevel++ }

                function H(e) { e.nestingLevel-- }

                function $(e, t) {
                    var r = { extraNodes: {}, expression: "", comment: "", index: 0, token: "", tokenType: w, nestingLevel: 0, conditionalLevel: null };
                    eu(r, { expression: e, extraNodes: t }), j(r);
                    var n = function(e) {
                        var t, r, n = [];
                        "" !== e.token && "\n" !== e.token && ";" !== e.token && ((t = G(e)).comment = e.comment);
                        for (;
                            "\n" === e.token || ";" === e.token;) 0 === n.length && t && (r = ";" !== e.token, n.push({ node: t, visible: r })), j(e), "\n" !== e.token && ";" !== e.token && "" !== e.token && ((t = G(e)).comment = e.comment, r = ";" !== e.token, n.push({ node: t, visible: r }));
                        return n.length > 0 ? new s(n) : (t || ((t = new c(void 0)).comment = e.comment), t)
                    }(r);
                    if ("" !== r.token) throw r.tokenType === N ? pe(r, "Unexpected operator " + r.token) : le(r, 'Unexpected part "' + r.token + '"');
                    return n
                }

                function G(e) {
                    var t, r, n, i, a = function(e) {
                        var t = function(e) {
                            var t = V(e);
                            for (;
                                "or" === e.token;) U(e), t = new h("or", "or", [t, V(e)]);
                            return t
                        }(e);
                        for (;
                            "?" === e.token;) {
                            var r = e.conditionalLevel;
                            e.conditionalLevel = e.nestingLevel, U(e);
                            var n = t,
                                i = G(e);
                            if (":" !== e.token) throw le(e, "False part of conditional expression expected");
                            e.conditionalLevel = null, U(e);
                            var a = G(e);
                            t = new u(n, i, a), e.conditionalLevel = r
                        }
                        return t
                    }(e);
                    if ("=" === e.token) { if (F(a)) return t = a.name, U(e), n = G(e), new o(new v(t), n); if (O(a)) return U(e), n = G(e), new o(a.object, a.index, n); if (B(a) && F(a.fn) && (i = !0, r = [], t = a.name, a.args.forEach((function(e, t) { F(e) ? r[t] = e.name : i = !1 })), i)) return U(e), n = G(e), new f(t, r, n); throw le(e, "Invalid left hand side of assignment operator =") }
                    return a
                }

                function V(e) {
                    for (var t = Z(e);
                        "xor" === e.token;) U(e), t = new h("xor", "xor", [t, Z(e)]);
                    return t
                }

                function Z(e) {
                    for (var t = W(e);
                        "and" === e.token;) U(e), t = new h("and", "and", [t, W(e)]);
                    return t
                }

                function W(e) {
                    for (var t = J(e);
                        "|" === e.token;) U(e), t = new h("|", "bitOr", [t, J(e)]);
                    return t
                }

                function J(e) {
                    for (var t = Y(e);
                        "^|" === e.token;) U(e), t = new h("^|", "bitXor", [t, Y(e)]);
                    return t
                }

                function Y(e) {
                    for (var t = X(e);
                        "&" === e.token;) U(e), t = new h("&", "bitAnd", [t, X(e)]);
                    return t
                }

                function X(e) {
                    for (var t = [Q(e)], r = [], n = { "==": "equal", "!=": "unequal", "<": "smaller", ">": "larger", "<=": "smallerEq", ">=": "largerEq" }; Xe(n, e.token);) {
                        var i = { name: e.token, fn: n[e.token] };
                        r.push(i), U(e), t.push(Q(e))
                    }
                    return 1 === t.length ? t[0] : 2 === t.length ? new h(r[0].name, r[0].fn, t) : new g(r.map((function(e) { return e.fn })), t)
                }

                function Q(e) {
                    var t, r, n, i;
                    t = K(e);
                    for (var a = { "<<": "leftShift", ">>": "rightArithShift", ">>>": "rightLogShift" }; Xe(a, e.token);) n = a[r = e.token], U(e), i = [t, K(e)], t = new h(r, n, i);
                    return t
                }

                function K(e) {
                    var t, r, n, i;
                    t = ee(e);
                    for (var a = { to: "to", in: "to" }; Xe(a, e.token);) n = a[r = e.token], U(e), "in" === r && "" === e.token ? t = new h("*", "multiply", [t, new v("in")], !0) : (i = [t, ee(e)], t = new h(r, n, i));
                    return t
                }

                function ee(e) {
                    var t, r = [];
                    if (t = ":" === e.token ? new c(1) : te(e), ":" === e.token && e.conditionalLevel !== e.nestingLevel) {
                        for (r.push(t);
                            ":" === e.token && r.length < 3;) U(e), ")" === e.token || "]" === e.token || "," === e.token || "" === e.token ? r.push(new v("end")) : r.push(te(e));
                        t = 3 === r.length ? new y(r[0], r[2], r[1]) : new y(r[0], r[1])
                    }
                    return t
                }

                function te(e) {
                    var t, r, n, i;
                    t = re(e);
                    for (var a = { "+": "add", "-": "subtract" }; Xe(a, e.token);) n = a[r = e.token], U(e), i = [t, re(e)], t = new h(r, n, i);
                    return t
                }

                function re(e) {
                    var t, r, n, i;
                    r = t = ne(e);
                    for (var a = { "*": "multiply", ".*": "dotMultiply", "/": "divide", "./": "dotDivide", "%": "mod", mod: "mod" }; Xe(a, e.token);) i = a[n = e.token], U(e), r = ne(e), t = new h(n, i, [t, r]);
                    return t
                }

                function ne(e) { var t, r; for (r = t = ie(e); e.tokenType === S || "in" === e.token && q(t) || !(e.tokenType !== M || q(r) || P(r) && "!" !== r.op) || "(" === e.token;) r = ie(e), t = new h("*", "multiply", [t, r], !0); return t }

                function ie(e) {
                    for (var t = ae(e), r = t, n = [];
                        "/" === e.token && q(r);) {
                        if (n.push(eu({}, e)), U(e), e.tokenType !== M) { eu(e, n.pop()); break }
                        if (n.push(eu({}, e)), U(e), e.tokenType !== S && "(" !== e.token) { n.pop(), eu(e, n.pop()); break }
                        eu(e, n.pop()), n.pop(), r = ae(e), t = new h("/", "divide", [t, r])
                    }
                    return t
                }

                function ae(e) {
                    var t, i, o, s = { "-": "unaryMinus", "+": "unaryPlus", "~": "bitNot", not: "not" };
                    return Xe(s, e.token) ? (o = s[e.token], t = e.token, U(e), i = [ae(e)], new h(t, o, i)) : function(e) {
                        var t, i, o, s;
                        t = function(e) {
                            var t, i, o;
                            t = function(e) {
                                var t = [];
                                if (e.tokenType === S && Xe(e.extraNodes, e.token)) {
                                    var i = e.extraNodes[e.token];
                                    if (j(e), "(" === e.token) {
                                        if (t = [], L(e), j(e), ")" !== e.token)
                                            for (t.push(G(e));
                                                "," === e.token;) j(e), t.push(G(e));
                                        if (")" !== e.token) throw le(e, "Parenthesis ) expected");
                                        H(e), j(e)
                                    }
                                    return new i(t)
                                }
                                return function(e) {
                                    var t, i;
                                    if (e.tokenType === S || e.tokenType === N && e.token in C) return i = e.token, j(e), t = Xe(_, i) ? new c(_[i]) : -1 !== T.indexOf(i) ? new c(r(i, "number")) : new v(i), t = oe(e, t);
                                    return function(e) {
                                        var t, i;
                                        if ('"' === e.token) return i = se(e), t = new c(i), t = oe(e, t);
                                        return function(e) {
                                            var t, i;
                                            if ("'" === e.token) return i = ue(e), t = new c(i), t = oe(e, t);
                                            return function(e) {
                                                var t, i, o, s;
                                                if ("[" === e.token) {
                                                    if (L(e), j(e), "]" !== e.token) {
                                                        var u = ce(e);
                                                        if (";" === e.token) {
                                                            for (o = 1, i = [u];
                                                                ";" === e.token;) j(e), i[o] = ce(e), o++;
                                                            if ("]" !== e.token) throw le(e, "End of matrix ] expected");
                                                            H(e), j(e), s = i[0].items.length;
                                                            for (var f = 1; f < o; f++)
                                                                if (i[f].items.length !== s) throw pe(e, "Column dimensions mismatch (" + i[f].items.length + " !== " + s + ")");
                                                            t = new a(i)
                                                        } else {
                                                            if ("]" !== e.token) throw le(e, "End of matrix ] expected");
                                                            H(e), j(e), t = u
                                                        }
                                                    } else H(e), j(e), t = new a([]);
                                                    return oe(e, t)
                                                }
                                                return function(e) {
                                                    if ("{" === e.token) {
                                                        var t;
                                                        L(e);
                                                        var i = {};
                                                        do {
                                                            if (j(e), "}" !== e.token) {
                                                                if ('"' === e.token) t = se(e);
                                                                else if ("'" === e.token) t = ue(e);
                                                                else {
                                                                    if (!(e.tokenType === S || e.tokenType === N && e.token in C)) throw le(e, "Symbol or string expected as object key");
                                                                    t = e.token, j(e)
                                                                }
                                                                if (":" !== e.token) throw le(e, "Colon : expected after object key");
                                                                j(e), i[t] = G(e)
                                                            }
                                                        } while ("," === e.token);
                                                        if ("}" !== e.token) throw le(e, "Comma , or bracket } expected after object value");
                                                        H(e), j(e);
                                                        var a = new m(i);
                                                        return a = oe(e, a)
                                                    }
                                                    return function(e) { var t; if (e.tokenType === M) return t = e.token, j(e), new c(r(t, n.number)); return function(e) { var t; if ("(" === e.token) { if (L(e), j(e), t = G(e), ")" !== e.token) throw le(e, "Parenthesis ) expected"); return H(e), j(e), t = new d(t), t = oe(e, t) } return function(e) { throw "" === e.token ? le(e, "Unexpected end of expression") : le(e, "Value expected") }(e) }(e) }(e)
                                                }(e)
                                            }(e)
                                        }(e)
                                    }(e)
                                }(e)
                            }(e);
                            var s = { "!": "factorial", "'": "ctranspose" };
                            for (; Xe(s, e.token);) i = e.token, o = s[i], j(e), t = new h(i, o, [t]), t = oe(e, t);
                            return t
                        }(e), ("^" === e.token || ".^" === e.token) && (i = e.token, o = "^" === i ? "pow" : "dotPow", U(e), s = [t, ae(e)], t = new h(i, o, s));
                        return t
                    }(e)
                }

                function oe(e, t, r) {
                    for (var n; !("(" !== e.token && "[" !== e.token && "." !== e.token || r && -1 === r.indexOf(e.token));)
                        if (n = [], "(" === e.token) {
                            if (!F(t) && !O(t)) return t;
                            if (L(e), j(e), ")" !== e.token)
                                for (n.push(G(e));
                                    "," === e.token;) j(e), n.push(G(e));
                            if (")" !== e.token) throw le(e, "Parenthesis ) expected");
                            H(e), j(e), t = new l(t, n)
                        } else if ("[" === e.token) {
                        if (L(e), j(e), "]" !== e.token)
                            for (n.push(G(e));
                                "," === e.token;) j(e), n.push(G(e));
                        if ("]" !== e.token) throw le(e, "Parenthesis ] expected");
                        H(e), j(e), t = new i(t, new p(n))
                    } else {
                        if (j(e), e.tokenType !== S) throw le(e, "Property name expected after dot");
                        n.push(new c(e.token)), j(e);
                        t = new i(t, new p(n, !0))
                    }
                    return t
                }

                function se(e) {
                    for (var t = "";
                        "" !== I(e) && '"' !== I(e);) "\\" === I(e) && (t += I(e), k(e)), t += I(e), k(e);
                    if (j(e), '"' !== e.token) throw le(e, 'End of string " expected');
                    return j(e), JSON.parse('"' + t + '"')
                }

                function ue(e) {
                    for (var t = "";
                        "" !== I(e) && "'" !== I(e);) "\\" === I(e) && (t += I(e), k(e)), t += I(e), k(e);
                    if (j(e), "'" !== e.token) throw le(e, "End of string ' expected");
                    return j(e), JSON.parse('"' + t + '"')
                }

                function ce(e) {
                    for (var t = [G(e)], r = 1;
                        "," === e.token;) j(e), t[r] = G(e), r++;
                    return new a(t)
                }

                function fe(e) { return e.index - e.token.length + 1 }

                function le(e, t) {
                    var r = fe(e),
                        n = new SyntaxError(t + " (char " + r + ")");
                    return n.char = r, n
                }

                function pe(e, t) {
                    var r = fe(e),
                        n = new SyntaxError(t + " (char " + r + ")");
                    return n.char = r, n
                }
                return x.isAlpha = function(e, t, r) { return x.isValidLatinOrGreek(e) || x.isValidMathSymbol(e, r) || x.isValidMathSymbol(t, e) }, x.isValidLatinOrGreek = function(e) { return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(e) }, x.isValidMathSymbol = function(e, t) { return /^[\uD835]$/.test(e) && /^[\uDC00-\uDFFF]$/.test(t) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(t) }, x.isWhitespace = function(e, t) { return " " === e || "\t" === e || "\n" === e && t > 0 }, x.isDecimalMark = function(e, t) { return "." === e && "/" !== t && "*" !== t && "^" !== t }, x.isDigitDot = function(e) { return e >= "0" && e <= "9" || "." === e }, x.isDigit = function(e) { return e >= "0" && e <= "9" }, x.isHexDigit = function(e) { return e >= "0" && e <= "9" || e >= "a" && e <= "f" || e >= "A" && e <= "F" }, x
            })),
            ru = Ke("compile", ["typed", "parse"], (function(e) {
                var t = e.typed,
                    r = e.parse;
                return t("compile", { string: function(e) { return r(e).compile() }, "Array | Matrix": function(e) { return St(e, (function(e) { return r(e).compile() })) } })
            })),
            nu = Ke("evaluate", ["typed", "parse"], (function(e) {
                var t = e.typed,
                    r = e.parse;
                return t("evaluate", { string: function(e) { return r(e).compile().evaluate({}) }, "string, Object": function(e, t) { return r(e).compile().evaluate(t) }, "Array | Matrix": function(e) { var t = {}; return St(e, (function(e) { return r(e).compile().evaluate(t) })) }, "Array | Matrix, Object": function(e, t) { return St(e, (function(e) { return r(e).compile().evaluate(t) })) } })
            })),
            iu = Ke("Parser", ["parse"], (function(e) {
                var t = e.parse;

                function r() {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    this.scope = {}
                }
                return r.prototype.type = "Parser", r.prototype.isParser = !0, r.prototype.evaluate = function(e) { return t(e).compile().evaluate(this.scope) }, r.prototype.get = function(e) { return e in this.scope ? Si(this.scope, e) : void 0 }, r.prototype.getAll = function() { return Ze({}, this.scope) }, r.prototype.set = function(e, t) { return Ei(this.scope, e, t) }, r.prototype.remove = function(e) { delete this.scope[e] }, r.prototype.clear = function() { for (var e in this.scope) Xe(this.scope, e) && delete this.scope[e] }, r
            }), { isClass: !0 }),
            au = Ke("parser", ["typed", "Parser"], (function(e) {
                var t = e.typed,
                    r = e.Parser;
                return t("parser", { "": function() { return new r } })
            })),
            ou = Ke("lup", ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtract", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.abs,
                    i = e.addScalar,
                    a = e.divideScalar,
                    o = e.multiplyScalar,
                    s = e.subtract,
                    u = e.larger,
                    c = e.equalScalar,
                    f = e.unaryMinus,
                    l = e.DenseMatrix,
                    p = e.SparseMatrix,
                    m = e.Spa;
                return t("lup", { DenseMatrix: function(e) { return h(e) }, SparseMatrix: function(e) { return d(e) }, Array: function(e) { var t = h(r(e)); return { L: t.L.valueOf(), U: t.U.valueOf(), p: t.p } } });

                function h(e) {
                    var t, r, f, p = e._size[0],
                        m = e._size[1],
                        h = Math.min(p, m),
                        d = Ge(e._data),
                        y = [],
                        g = [p, h],
                        v = [],
                        x = [h, m],
                        b = [];
                    for (t = 0; t < p; t++) b[t] = t;
                    for (r = 0; r < m; r++) {
                        if (r > 0)
                            for (t = 0; t < p; t++) {
                                var w = Math.min(t, r),
                                    N = 0;
                                for (f = 0; f < w; f++) N = i(N, o(d[t][f], d[f][r]));
                                d[t][r] = s(d[t][r], N)
                            }
                        var M = r,
                            S = 0,
                            E = 0;
                        for (t = r; t < p; t++) {
                            var A = d[t][r],
                                O = n(A);
                            u(O, S) && (M = t, S = O, E = A)
                        }
                        if (r !== M && (b[r] = [b[M], b[M] = b[r]][0], l._swapRows(r, M, d)), r < p)
                            for (t = r + 1; t < p; t++) {
                                var C = d[t][r];
                                c(C, 0) || (d[t][r] = a(d[t][r], E))
                            }
                    }
                    for (r = 0; r < m; r++)
                        for (t = 0; t < p; t++) 0 === r && (t < m && (v[t] = []), y[t] = []), t < r ? (t < m && (v[t][r] = d[t][r]), r < p && (y[t][r] = 0)) : t !== r ? (t < m && (v[t][r] = 0), r < p && (y[t][r] = d[t][r])) : (t < m && (v[t][r] = d[t][r]), r < p && (y[t][r] = 1));
                    var _ = new l({ data: y, size: g }),
                        T = new l({ data: v, size: x }),
                        z = [];
                    for (t = 0, h = b.length; t < h; t++) z[b[t]] = t;
                    return { L: _, U: T, p: z, toString: function() { return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p } }
                }

                function d(e) {
                    var t, r, i, s = e._size[0],
                        l = e._size[1],
                        h = Math.min(s, l),
                        d = e._values,
                        y = e._index,
                        g = e._ptr,
                        v = [],
                        x = [],
                        b = [],
                        w = [s, h],
                        N = [],
                        M = [],
                        S = [],
                        E = [h, l],
                        A = [],
                        O = [];
                    for (t = 0; t < s; t++) A[t] = t, O[t] = t;
                    var C = function() {
                        var e = new m;
                        r < s && (b.push(v.length), v.push(1), x.push(r)), S.push(N.length);
                        var l = g[r],
                            h = g[r + 1];
                        for (i = l; i < h; i++) t = y[i], e.set(A[t], d[i]);
                        r > 0 && e.forEach(0, r - 1, (function(t, r) { p._forEachRow(t, v, x, b, (function(n, i) { n > t && e.accumulate(n, f(o(i, r))) })) }));
                        var C, _, T, z, q = r,
                            I = e.get(r),
                            B = n(I);
                        e.forEach(r + 1, s - 1, (function(e, t) {
                            var r = n(t);
                            u(r, B) && (q = e, B = r, I = t)
                        })), r !== q && (p._swapRows(r, q, w[1], v, x, b), p._swapRows(r, q, E[1], N, M, S), e.swap(r, q), _ = q, T = O[C = r], z = O[_], A[T] = _, A[z] = C, O[C] = z, O[_] = T), e.forEach(0, s - 1, (function(e, t) { e <= r ? (N.push(t), M.push(e)) : (t = a(t, I), c(t, 0) || (v.push(t), x.push(e))) }))
                    };
                    for (r = 0; r < l; r++) C();
                    return S.push(N.length), b.push(v.length), { L: new p({ values: v, index: x, ptr: b, size: w }), U: new p({ values: N, index: M, ptr: S, size: E }), p: A, toString: function() { return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p } }
                }
            }));

        function su() { return (su = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var r = arguments[t]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]) } return e }).apply(this, arguments) }
        var uu = Ke("qr", ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtract", "complex"], (function(e) {
            var t = e.typed,
                r = e.matrix,
                n = e.zeros,
                i = e.identity,
                a = e.isZero,
                o = e.equal,
                s = e.sign,
                u = e.sqrt,
                c = e.conj,
                f = e.unaryMinus,
                l = e.addScalar,
                p = e.divideScalar,
                m = e.multiplyScalar,
                h = e.subtract,
                d = e.complex;
            return su(t("qr", { DenseMatrix: function(e) { return g(e) }, SparseMatrix: function(e) { return function(e) { throw new Error("qr not implemented for sparse matrices yet") }() }, Array: function(e) { var t = g(r(e)); return { Q: t.Q.valueOf(), R: t.R.valueOf() } } }), { _denseQRimpl: y });

            function y(e) {
                var t, r, d, y = e._size[0],
                    g = e._size[1],
                    v = i([y], "dense"),
                    x = v._data,
                    b = e.clone(),
                    w = b._data,
                    N = n([y], "");
                for (d = 0; d < Math.min(g, y); ++d) {
                    var M = w[d][d],
                        S = f(o(M, 0) ? 1 : s(M)),
                        E = c(S),
                        A = 0;
                    for (t = d; t < y; t++) A = l(A, m(w[t][d], c(w[t][d])));
                    var O = m(S, u(A));
                    if (!a(O)) {
                        var C = h(M, O);
                        for (N[d] = 1, t = d + 1; t < y; t++) N[t] = p(w[t][d], C);
                        var _ = f(c(p(C, O))),
                            T = void 0;
                        for (r = d; r < g; r++) { for (T = 0, t = d; t < y; t++) T = l(T, m(c(N[t]), w[t][r])); for (T = m(T, _), t = d; t < y; t++) w[t][r] = m(h(w[t][r], m(N[t], T)), E) }
                        for (t = 0; t < y; t++) { for (T = 0, r = d; r < y; r++) T = l(T, m(x[t][r], N[r])); for (T = m(T, _), r = d; r < y; ++r) x[t][r] = p(h(x[t][r], m(T, c(N[r]))), E) }
                    }
                }
                return { Q: v, R: b, toString: function() { return "Q: " + this.Q.toString() + "\nR: " + this.R.toString() } }
            }

            function g(e) {
                var t = y(e),
                    r = t.R._data;
                if (e._data.length > 0)
                    for (var n = "Complex" === r[0][0].type ? d(0) : 0, i = 0; i < r.length; ++i)
                        for (var a = 0; a < i && a < (r[0] || []).length; ++a) r[i][a] = n;
                return t
            }
        }));

        function cu(e, t, r, n, i, a, o) {
            var s = 0;
            for (r[o] = e; s >= 0;) {
                var u = r[o + s],
                    c = r[n + u]; - 1 === c ? (s--, a[t++] = u) : (r[n + u] = r[i + c], r[o + ++s] = c)
            }
            return t
        }

        function fu(e) { return -e - 2 }
        var lu = Ke("csAmd", ["add", "multiply", "transpose"], (function(e) {
            var t = e.add,
                r = e.multiply,
                n = e.transpose;
            return function(e, o) {
                if (!o || e <= 0 || e > 3) return null;
                var s = o._size,
                    u = s[0],
                    c = s[1],
                    f = 0,
                    l = Math.max(16, 10 * Math.sqrt(c)),
                    p = function(e, i, a, o, s) {
                        var u = n(i);
                        if (1 === e && o === a) return t(i, u);
                        if (2 === e) {
                            for (var c = u._index, f = u._ptr, l = 0, p = 0; p < a; p++) {
                                var m = f[p];
                                if (f[p] = l, !(f[p + 1] - m > s))
                                    for (var h = f[p + 1]; m < h; m++) c[l++] = c[m]
                            }
                            return f[a] = l, i = n(u), r(u, i)
                        }
                        return r(u, i)
                    }(e, o, u, c, l = Math.min(c - 2, l));
                ! function(e, t, r) {
                    for (var n = e._values, i = e._index, a = e._ptr, o = e._size[1], s = 0, u = 0; u < o; u++) { var c = a[u]; for (a[u] = s; c < a[u + 1]; c++) t(i[c], u, n ? n[c] : 1, r) && (i[s] = i[c], n && (n[s] = n[c]), s++) }
                    a[o] = s, i.splice(s, i.length - s), n && n.splice(s, n.length - s)
                }(p, a, null);
                for (var m, h, d, y, g, v, x, b, w, N, M, S, E, A, O, C, _ = p._index, T = p._ptr, z = T[c], q = [], I = [], B = c + 1, k = 2 * (c + 1), D = 3 * (c + 1), R = 4 * (c + 1), P = 5 * (c + 1), j = 6 * (c + 1), U = 7 * (c + 1), F = q, L = function(e, t, r, n, a, o, s, u, c, f, l, p) {
                        for (var m = 0; m < e; m++) r[n + m] = t[m + 1] - t[m];
                        r[n + e] = 0;
                        for (var h = 0; h <= e; h++) r[a + h] = -1, o[h] = -1, r[s + h] = -1, r[u + h] = -1, r[c + h] = 1, r[f + h] = 1, r[l + h] = 0, r[p + h] = r[n + h];
                        var d = i(0, 0, r, f, e);
                        return r[l + e] = -2, t[e] = -1, r[f + e] = 0, d
                    }(c, T, I, 0, D, F, k, U, B, j, R, P), H = function(e, t, r, n, i, a, o, s, u, c, f) {
                        for (var l = 0, p = 0; p < e; p++) {
                            var m = r[n + p];
                            if (0 === m) r[i + p] = -2, l++, t[p] = -1, r[a + p] = 0;
                            else if (m > o) r[s + p] = 0, r[i + p] = -1, l++, t[p] = fu(e), r[s + e]++;
                            else { var h = r[u + m]; - 1 !== h && (c[h] = p), r[f + p] = r[u + m], r[u + m] = p }
                        }
                        return l
                    }(c, T, I, P, R, j, l, B, D, F, k), $ = 0; H < c;) {
                    for (d = -1; $ < c && -1 === (d = I[D + $]); $++); - 1 !== I[k + d] && (F[I[k + d]] = -1), I[D + $] = I[k + d];
                    var G = I[R + d],
                        V = I[B + d];
                    H += V;
                    var Z = 0;
                    I[B + d] = -V;
                    var W = T[d],
                        J = 0 === G ? W : z,
                        Y = J;
                    for (y = 1; y <= G + 1; y++) {
                        for (y > G ? (v = d, x = W, b = I[0 + d] - G) : (x = T[v = _[W++]], b = I[0 + v]), g = 1; g <= b; g++)(w = I[B + (m = _[x++])]) <= 0 || (Z += w, I[B + m] = -w, _[Y++] = m, -1 !== I[k + m] && (F[I[k + m]] = F[m]), -1 !== F[m] ? I[k + F[m]] = I[k + m] : I[D + I[P + m]] = I[k + m]);
                        v !== d && (T[v] = fu(d), I[j + v] = 0)
                    }
                    for (0 !== G && (z = Y), I[P + d] = Z, T[d] = J, I[0 + d] = Y - J, I[R + d] = -2, L = i(L, f, I, j, c), N = J; N < Y; N++)
                        if (!((M = I[R + (m = _[N])]) <= 0)) { var X = L - (w = -I[B + m]); for (W = T[m], S = T[m] + M - 1; W <= S; W++) I[j + (v = _[W])] >= L ? I[j + v] -= w : 0 !== I[j + v] && (I[j + v] = I[P + v] + X) }
                    for (N = J; N < Y; N++) {
                        for (E = (S = T[m = _[N]]) + I[R + m] - 1, A = S, O = 0, C = 0, W = S; W <= E; W++)
                            if (0 !== I[j + (v = _[W])]) {
                                var Q = I[j + v] - L;
                                Q > 0 ? (C += Q, _[A++] = v, O += v) : (T[v] = fu(d), I[j + v] = 0)
                            }
                        I[R + m] = A - S + 1;
                        var K = A,
                            ee = S + I[0 + m];
                        for (W = E + 1; W < ee; W++) {
                            var te = I[B + (h = _[W])];
                            te <= 0 || (C += te, _[A++] = h, O += h)
                        }
                        0 === C ? (T[m] = fu(d), Z -= w = -I[B + m], V += w, H += w, I[B + m] = 0, I[R + m] = -1) : (I[P + m] = Math.min(I[P + m], C), _[A] = _[K], _[K] = _[S], _[S] = d, I[0 + m] = A - S + 1, O = (O < 0 ? -O : O) % c, I[k + m] = I[U + O], I[U + O] = m, F[m] = O)
                    }
                    for (I[P + d] = Z, L = i(L + (f = Math.max(f, Z)), f, I, j, c), N = J; N < Y; N++)
                        if (!(I[B + (m = _[N])] >= 0))
                            for (m = I[U + (O = F[m])], I[U + O] = -1; - 1 !== m && -1 !== I[k + m]; m = I[k + m], L++) {
                                for (b = I[0 + m], M = I[R + m], W = T[m] + 1; W <= T[m] + b - 1; W++) I[j + _[W]] = L;
                                var re = m;
                                for (h = I[k + m]; - 1 !== h;) {
                                    var ne = I[0 + h] === b && I[R + h] === M;
                                    for (W = T[h] + 1; ne && W <= T[h] + b - 1; W++) I[j + _[W]] !== L && (ne = 0);
                                    ne ? (T[h] = fu(m), I[B + m] += I[B + h], I[B + h] = 0, I[R + h] = -1, h = I[k + h], I[k + re] = h) : (re = h, h = I[k + h])
                                }
                            }
                    for (W = J, N = J; N < Y; N++)(w = -I[B + (m = _[N])]) <= 0 || (I[B + m] = w, C = I[P + m] + Z - w, -1 !== I[D + (C = Math.min(C, c - H - w))] && (F[I[D + C]] = m), I[k + m] = I[D + C], F[m] = -1, I[D + C] = m, $ = Math.min($, C), I[P + m] = C, _[W++] = m);
                    I[B + d] = V, 0 == (I[0 + d] = W - J) && (T[d] = -1, I[j + d] = 0), 0 !== G && (z = W)
                }
                for (m = 0; m < c; m++) T[m] = fu(T[m]);
                for (h = 0; h <= c; h++) I[D + h] = -1;
                for (h = c; h >= 0; h--) I[B + h] > 0 || (I[k + h] = I[D + T[h]], I[D + T[h]] = h);
                for (v = c; v >= 0; v--) I[B + v] <= 0 || -1 !== T[v] && (I[k + v] = I[D + T[v]], I[D + T[v]] = v);
                for (d = 0, m = 0; m <= c; m++) - 1 === T[m] && (d = cu(m, d, I, D, k, q, j));
                return q.splice(q.length - 1, 1), q
            };

            function i(e, t, r, n, i) {
                if (e < 2 || e + t < 0) {
                    for (var a = 0; a < i; a++) 0 !== r[n + a] && (r[n + a] = 1);
                    e = 2
                }
                return e
            }

            function a(e, t) { return e !== t }
        }));

        function pu(e, t, r, n, i, a, o) {
            var s, u, c, f = 0;
            if (e <= t || r[n + t] <= r[i + e]) return -1;
            r[i + e] = r[n + t];
            var l = r[a + e];
            if (r[a + e] = t, -1 === l) f = 1, c = e;
            else { for (f = 2, c = l; c !== r[o + c]; c = r[o + c]); for (s = l; s !== c; s = u) u = r[o + s], r[o + s] = c }
            return { jleaf: f, q: c }
        }
        var mu = Ke("csCounts", ["transpose"], (function(e) {
                var t = e.transpose;
                return function(e, r, n, i) {
                    if (!e || !r || !n) return null;
                    var a, o, s, u, c, f, l, p = e._size,
                        m = p[0],
                        h = p[1],
                        d = 4 * h + (i ? h + m + 1 : 0),
                        y = [],
                        g = h,
                        v = 2 * h,
                        x = 3 * h,
                        b = 4 * h,
                        w = 5 * h + 1;
                    for (s = 0; s < d; s++) y[s] = -1;
                    var N = [],
                        M = t(e),
                        S = M._index,
                        E = M._ptr;
                    for (s = 0; s < h; s++)
                        for (N[o = n[s]] = -1 === y[x + o] ? 1 : 0; - 1 !== o && -1 === y[x + o]; o = r[o]) y[x + o] = s;
                    if (i) {
                        for (s = 0; s < h; s++) y[n[s]] = s;
                        for (a = 0; a < m; a++) {
                            for (s = h, f = E[a], l = E[a + 1], c = f; c < l; c++) s = Math.min(s, y[S[c]]);
                            y[w + a] = y[b + s], y[b + s] = a
                        }
                    }
                    for (a = 0; a < h; a++) y[0 + a] = a;
                    for (s = 0; s < h; s++) {
                        for (-1 !== r[o = n[s]] && N[r[o]]--, u = i ? y[b + s] : o; - 1 !== u; u = i ? y[w + u] : -1)
                            for (c = E[u]; c < E[u + 1]; c++) {
                                var A = pu(a = S[c], o, y, x, g, v, 0);
                                A.jleaf >= 1 && N[o]++, 2 === A.jleaf && N[A.q]--
                            } - 1 !== r[o] && (y[0 + o] = r[o])
                    }
                    for (o = 0; o < h; o++) - 1 !== r[o] && (N[r[o]] += N[o]);
                    return N
                }
            })),
            hu = Ke("csSqr", ["add", "multiply", "transpose"], (function(e) {
                var t = e.add,
                    r = e.multiply,
                    n = e.transpose,
                    i = lu({ add: t, multiply: r, transpose: n }),
                    a = mu({ transpose: n });
                return function(e, t, r) {
                    var n, o = t._ptr,
                        s = t._size[1],
                        u = {};
                    if (u.q = i(e, t), e && !u.q) return null;
                    if (r) {
                        var c = e ? function(e, t, r, n) {
                            for (var i = e._values, a = e._index, o = e._ptr, s = e._size, u = e._datatype, c = s[0], f = s[1], l = n && e._values ? [] : null, p = [], m = [], h = 0, d = 0; d < f; d++) {
                                m[d] = h;
                                for (var y = r ? r[d] : d, g = o[y], v = o[y + 1], x = g; x < v; x++) {
                                    var b = t ? t[a[x]] : a[x];
                                    p[h] = b, l && (l[h] = i[x]), h++
                                }
                            }
                            return m[f] = h, e.createSparseMatrix({ values: l, index: p, ptr: m, size: [c, f], datatype: u })
                        }(t, null, u.q, 0) : t;
                        u.parent = function(e, t) {
                            if (!e) return null;
                            var r, n, i = e._index,
                                a = e._ptr,
                                o = e._size,
                                s = o[0],
                                u = o[1],
                                c = [],
                                f = [],
                                l = u;
                            if (t)
                                for (r = 0; r < s; r++) f[l + r] = -1;
                            for (var p = 0; p < u; p++) {
                                c[p] = -1, f[0 + p] = -1;
                                for (var m = a[p], h = a[p + 1], d = m; d < h; d++) {
                                    var y = i[d];
                                    for (r = t ? f[l + y] : y; - 1 !== r && r < p; r = n) n = f[0 + r], f[0 + r] = p, -1 === n && (c[r] = p);
                                    t && (f[l + y] = p)
                                }
                            }
                            return c
                        }(c, 1);
                        var f = function(e, t) {
                            if (!e) return null;
                            var r, n = 0,
                                i = [],
                                a = [],
                                o = t,
                                s = 2 * t;
                            for (r = 0; r < t; r++) a[0 + r] = -1;
                            for (r = t - 1; r >= 0; r--) - 1 !== e[r] && (a[o + r] = a[0 + e[r]], a[0 + e[r]] = r);
                            for (r = 0; r < t; r++) - 1 === e[r] && (n = cu(r, n, a, 0, o, i, s));
                            return i
                        }(u.parent, s);
                        if (u.cp = a(c, u.parent, f, 1), c && u.parent && u.cp && function(e, t) {
                                var r = e._ptr,
                                    n = e._index,
                                    i = e._size,
                                    a = i[0],
                                    o = i[1];
                                t.pinv = [], t.leftmost = [];
                                var s, u, c, f, l, p = t.parent,
                                    m = t.pinv,
                                    h = t.leftmost,
                                    d = [],
                                    y = a,
                                    g = a + o,
                                    v = a + 2 * o;
                                for (u = 0; u < o; u++) d[y + u] = -1, d[g + u] = -1, d[v + u] = 0;
                                for (s = 0; s < a; s++) h[s] = -1;
                                for (u = o - 1; u >= 0; u--)
                                    for (f = r[u], l = r[u + 1], c = f; c < l; c++) h[n[c]] = u;
                                for (s = a - 1; s >= 0; s--) m[s] = -1, -1 !== (u = h[s]) && (0 == d[v + u]++ && (d[g + u] = s), d[0 + s] = d[y + u], d[y + u] = s);
                                for (t.lnz = 0, t.m2 = a, u = 0; u < o; u++)
                                    if (s = d[y + u], t.lnz++, s < 0 && (s = t.m2++), m[s] = u, !(--v[u] <= 0)) { t.lnz += d[v + u]; var x = p[u]; - 1 !== x && (0 === d[v + x] && (d[g + x] = d[g + u]), d[0 + d[g + u]] = d[y + x], d[y + x] = d[0 + s], d[v + x] += d[v + u]) }
                                for (s = 0; s < a; s++) m[s] < 0 && (m[s] = u++);
                                return !0
                            }(c, u))
                            for (u.unz = 0, n = 0; n < s; n++) u.unz += u.cp[n]
                    } else u.unz = 4 * o[s] + s, u.lnz = u.unz;
                    return u
                }
            }));

        function du(e, t) { return e[t] < 0 }

        function yu(e, t) { e[t] = fu(e[t]) }

        function gu(e) { return e < 0 ? fu(e) : e }

        function vu(e, t, r, n, i) {
            var a, o, s, u = t._index,
                c = t._ptr,
                f = t._size[1],
                l = 0;
            for (n[0] = e; l >= 0;) {
                e = n[l];
                var p = i ? i[e] : e;
                du(c, e) || (yu(c, e), n[f + l] = p < 0 ? 0 : gu(c[p]));
                var m = 1;
                for (o = n[f + l], s = p < 0 ? 0 : gu(c[p + 1]); o < s; o++)
                    if (!du(c, a = u[o])) { n[f + l] = o, n[++l] = a, m = 0; break }
                m && (l--, n[--r] = e)
            }
            return r
        }
        var xu = Ke("csSpsolve", ["divideScalar", "multiply", "subtract"], (function(e) {
                var t = e.divideScalar,
                    r = e.multiply,
                    n = e.subtract;
                return function(e, i, a, o, s, u, c) {
                    var f, l, p, m, h = e._values,
                        d = e._index,
                        y = e._ptr,
                        g = e._size[1],
                        v = i._values,
                        x = i._index,
                        b = i._ptr,
                        w = function(e, t, r, n, i) {
                            var a, o, s, u = e._ptr,
                                c = e._size,
                                f = t._index,
                                l = t._ptr,
                                p = c[1],
                                m = p;
                            for (o = l[r], s = l[r + 1], a = o; a < s; a++) {
                                var h = f[a];
                                du(u, h) || (m = vu(h, e, m, n, i))
                            }
                            for (a = m; a < p; a++) yu(u, n[a]);
                            return m
                        }(e, i, a, o, u);
                    for (f = w; f < g; f++) s[o[f]] = 0;
                    for (l = b[a], p = b[a + 1], f = l; f < p; f++) s[x[f]] = v[f];
                    for (var N = w; N < g; N++) {
                        var M = o[N],
                            S = u ? u[M] : M;
                        if (!(S < 0))
                            for (l = y[S], p = y[S + 1], s[M] = t(s[M], h[c ? l : p - 1]), f = c ? l + 1 : l, m = c ? p : p - 1; f < m; f++) {
                                var E = d[f];
                                s[E] = n(s[E], r(h[f], s[M]))
                            }
                    }
                    return w
                }
            })),
            bu = Ke("csLu", ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], (function(e) {
                var t = e.abs,
                    r = e.divideScalar,
                    n = e.multiply,
                    i = e.subtract,
                    a = e.larger,
                    o = e.largerEq,
                    s = e.SparseMatrix,
                    u = xu({ divideScalar: r, multiply: n, subtract: i });
                return function(e, i, c) {
                    if (!e) return null;
                    var f, l = e._size[1],
                        p = 100,
                        m = 100;
                    i && (f = i.q, p = i.lnz || p, m = i.unz || m);
                    var h, d, y = [],
                        g = [],
                        v = [],
                        x = new s({ values: y, index: g, ptr: v, size: [l, l] }),
                        b = [],
                        w = [],
                        N = [],
                        M = new s({ values: b, index: w, ptr: N, size: [l, l] }),
                        S = [],
                        E = [],
                        A = [];
                    for (h = 0; h < l; h++) E[h] = 0, S[h] = -1, v[h + 1] = 0;
                    p = 0, m = 0;
                    for (var O = 0; O < l; O++) {
                        v[O] = p, N[O] = m;
                        var C = f ? f[O] : O,
                            _ = u(x, e, C, A, E, S, 1),
                            T = -1,
                            z = -1;
                        for (d = _; d < l; d++)
                            if (S[h = A[d]] < 0) {
                                var q = t(E[h]);
                                a(q, z) && (z = q, T = h)
                            } else w[m] = S[h], b[m++] = E[h];
                        if (-1 === T || z <= 0) return null;
                        S[C] < 0 && o(t(E[C]), n(z, c)) && (T = C);
                        var I = E[T];
                        for (w[m] = O, b[m++] = I, S[T] = O, g[p] = T, y[p++] = 1, d = _; d < l; d++) S[h = A[d]] < 0 && (g[p] = h, y[p++] = r(E[h], I)), E[h] = 0
                    }
                    for (v[l] = p, N[l] = m, d = 0; d < p; d++) g[d] = S[g[d]];
                    return y.splice(p, y.length - p), g.splice(p, g.length - p), b.splice(m, b.length - m), w.splice(m, w.length - m), { L: x, U: M, pinv: S }
                }
            })),
            wu = Ke("slu", ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], (function(e) {
                var t = e.typed,
                    r = e.abs,
                    n = e.add,
                    i = e.multiply,
                    a = e.transpose,
                    o = e.divideScalar,
                    s = e.subtract,
                    u = e.larger,
                    c = e.largerEq,
                    f = e.SparseMatrix,
                    l = hu({ add: n, multiply: i, transpose: a }),
                    p = bu({ abs: r, divideScalar: o, multiply: i, subtract: s, larger: u, largerEq: c, SparseMatrix: f });
                return t("slu", {
                    "SparseMatrix, number, number": function(e, t, r) {
                        if (!V(t) || t < 0 || t > 3) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
                        if (r < 0 || r > 1) throw new Error("Partial pivoting threshold must be a number from 0 to 1");
                        var n = l(t, e, !1),
                            i = p(e, n, r);
                        return { L: i.L, U: i.U, p: i.pinv, q: n.q, toString: function() { return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\np: " + this.p.toString() + (this.q ? "\nq: " + this.q.toString() : "") + "\n" } }
                    }
                })
            }));

        function Nu(e, t) {
            var r, n = t.length,
                i = [];
            if (e)
                for (r = 0; r < n; r++) i[e[r]] = t[r];
            else
                for (r = 0; r < n; r++) i[r] = t[r];
            return i
        }
        var Mu = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"],
            Su = Ke("lusolve", Mu, (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.lup,
                    i = e.slu,
                    a = e.usolve,
                    o = e.lsolve,
                    s = ya({ DenseMatrix: e.DenseMatrix });
                return t("lusolve", { "Array, Array | Matrix": function(e, t) { e = r(e); var i = n(e); return c(i.L, i.U, i.p, null, t).valueOf() }, "DenseMatrix, Array | Matrix": function(e, t) { var r = n(e); return c(r.L, r.U, r.p, null, t) }, "SparseMatrix, Array | Matrix": function(e, t) { var r = n(e); return c(r.L, r.U, r.p, null, t) }, "SparseMatrix, Array | Matrix, number, number": function(e, t, r, n) { var a = i(e, r, n); return c(a.L, a.U, a.p, a.q, t) }, "Object, Array | Matrix": function(e, t) { return c(e.L, e.U, e.p, e.q, t) } });

                function u(e) { if (p(e)) return e; if (l(e)) return r(e); throw new TypeError("Invalid Matrix LU decomposition") }

                function c(e, t, r, n, i) {
                    e = u(e), t = u(t), r && ((i = s(e, i, !0))._data = Nu(r, i._data));
                    var c = o(e, i),
                        f = a(t, c);
                    return n && (f._data = Nu(n, f._data)), f
                }
            })),
            Eu = ["parse"],
            Au = Ke("Help", Eu, (function(e) {
                var t = e.parse;

                function r(e) {
                    if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");
                    if (!e) throw new Error('Argument "doc" missing');
                    this.doc = e
                }
                return r.prototype.type = "Help", r.prototype.isHelp = !0, r.prototype.toString = function() {
                    var e = this.doc || {},
                        r = "\n";
                    if (e.name && (r += "Name: " + e.name + "\n\n"), e.category && (r += "Category: " + e.category + "\n\n"), e.description && (r += "Description:\n    " + e.description + "\n\n"), e.syntax && (r += "Syntax:\n    " + e.syntax.join("\n    ") + "\n\n"), e.examples) {
                        r += "Examples:\n";
                        for (var n = {}, i = 0; i < e.examples.length; i++) {
                            var a = e.examples[i];
                            r += "    " + a + "\n";
                            var o = void 0;
                            try { o = t(a).compile().evaluate(n) } catch (e) { o = e }
                            void 0 === o || b(o) || (r += "        " + xe(o, { precision: 14 }) + "\n")
                        }
                        r += "\n"
                    }
                    return e.seealso && e.seealso.length && (r += "See also: " + e.seealso.join(", ") + "\n"), r
                }, r.prototype.toJSON = function() { var e = Ge(this.doc); return e.mathjs = "Help", e }, r.fromJSON = function(e) { var t = {}; return Object.keys(e).filter((function(e) { return "mathjs" !== e })).forEach((function(r) { t[r] = e[r] })), new r(t) }, r.prototype.valueOf = r.prototype.toString, r
            }), { isClass: !0 }),
            Ou = ["?on", "math"],
            Cu = Ke("Chain", Ou, (function(e) {
                var t = e.on,
                    r = e.math;

                function n(e) {
                    if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
                    L(e) ? this.value = e.value : this.value = e
                }

                function i(e, t) { Ye(n.prototype, e, (function() { var e = t(); if ("function" == typeof e) return a(e) })) }

                function a(e) { return function() { for (var t = [this.value], r = 0; r < arguments.length; r++) t[r + 1] = arguments[r]; return new n(e.apply(e, t)) } }
                n.prototype.type = "Chain", n.prototype.isChain = !0, n.prototype.done = function() { return this.value }, n.prototype.valueOf = function() { return this.value }, n.prototype.toString = function() { return xe(this.value) }, n.prototype.toJSON = function() { return { mathjs: "Chain", value: this.value } }, n.fromJSON = function(e) { return new n(e.value) }, n.createProxy = function(e, t) {
                    if ("string" == typeof e) u = e, "function" == typeof(c = t) && (n.prototype[u] = a(c));
                    else { var r = function(t) { Xe(e, t) && void 0 === o[t] && i(t, (function() { return e[t] })) }; for (var s in e) r(s) }
                    var u, c
                };
                var o = { expression: !0, docs: !0, type: !0, classes: !0, json: !0, error: !0, isChain: !0 };
                return n.createProxy(r), t && t("import", (function(e, t, r) { r || i(e, t) })), n
            }), { isClass: !0 }),
            _u = { name: "pi", category: "Constants", syntax: ["pi"], description: "The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159", examples: ["pi", "sin(pi/2)"], seealso: ["tau"] },
            Tu = { name: "e", category: "Constants", syntax: ["e"], description: "Euler's number, the base of the natural logarithm. Approximately equal to 2.71828", examples: ["e", "e ^ 2", "exp(2)", "log(e)"], seealso: ["exp"] },
            zu = { bignumber: { name: "bignumber", category: "Construction", syntax: ["bignumber(x)"], description: "Create a big number from a number or string.", examples: ["0.1 + 0.2", "bignumber(0.1) + bignumber(0.2)", 'bignumber("7.2")', 'bignumber("7.2e500")', "bignumber([0.1, 0.2, 0.3])"], seealso: ["boolean", "complex", "fraction", "index", "matrix", "string", "unit"] }, boolean: { name: "boolean", category: "Construction", syntax: ["x", "boolean(x)"], description: "Convert a string or number into a boolean.", examples: ["boolean(0)", "boolean(1)", "boolean(3)", 'boolean("true")', 'boolean("false")', "boolean([1, 0, 1, 1])"], seealso: ["bignumber", "complex", "index", "matrix", "number", "string", "unit"] }, complex: { name: "complex", category: "Construction", syntax: ["complex()", "complex(re, im)", "complex(string)"], description: "Create a complex number.", examples: ["complex()", "complex(2, 3)", 'complex("7 - 2i")'], seealso: ["bignumber", "boolean", "index", "matrix", "number", "string", "unit"] }, createUnit: { name: "createUnit", category: "Construction", syntax: ["createUnit(definitions)", "createUnit(name, definition)"], description: "Create a user-defined unit and register it with the Unit type.", examples: ['createUnit("foo")', 'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})', 'createUnit("mph", "1 mile/hour")'], seealso: ["unit", "splitUnit"] }, fraction: { name: "fraction", category: "Construction", syntax: ["fraction(num)", "fraction(num,den)"], description: "Create a fraction from a number or from a numerator and denominator.", examples: ["fraction(0.125)", "fraction(1, 3) + fraction(2, 5)"], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "string", "unit"] }, index: { name: "index", category: "Construction", syntax: ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"], description: "Create an index to get or replace a subset of a matrix", examples: ["[]", "[1, 2, 3]", "A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[0:2, 0:2] = ones(2, 2)"], seealso: ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"] }, matrix: { name: "matrix", category: "Construction", syntax: ["[]", "[a1, b1, ...; a2, b2, ...]", "matrix()", 'matrix("dense")', "matrix([...])"], description: "Create a matrix.", examples: ["[]", "[1, 2, 3]", "[1, 2, 3; 4, 5, 6]", "matrix()", "matrix([3, 4])", 'matrix([3, 4; 5, 6], "sparse")', 'matrix([3, 4; 5, 6], "sparse", "number")'], seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "sparse"] }, number: { name: "number", category: "Construction", syntax: ["x", "number(x)", "number(unit, valuelessUnit)"], description: "Create a number or convert a string or boolean into a number.", examples: ["2", "2e3", "4.05", "number(2)", 'number("7.2")', "number(true)", "number([true, false, true, true])", 'number(unit("52cm"), "m")'], seealso: ["bignumber", "boolean", "complex", "fraction", "index", "matrix", "string", "unit"] }, sparse: { name: "sparse", category: "Construction", syntax: ["sparse()", "sparse([a1, b1, ...; a1, b2, ...])", 'sparse([a1, b1, ...; a1, b2, ...], "number")'], description: "Create a sparse matrix.", examples: ["sparse()", "sparse([3, 4; 5, 6])", 'sparse([3, 0; 5, 0], "number")'], seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "matrix"] }, splitUnit: { name: "splitUnit", category: "Construction", syntax: ["splitUnit(unit: Unit, parts: Unit[])"], description: "Split a unit in an array of units whose sum is equal to the original unit.", examples: ['splitUnit(1 m, ["feet", "inch"])'], seealso: ["unit", "createUnit"] }, string: { name: "string", category: "Construction", syntax: ['"text"', "string(x)"], description: "Create a string or convert a value to a string", examples: ['"Hello World!"', "string(4.2)", "string(3 + 2i)"], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "unit"] }, unit: { name: "unit", category: "Construction", syntax: ["value unit", "unit(value, unit)", "unit(string)"], description: "Create a unit.", examples: ["5.5 mm", "3 inch", 'unit(7.1, "kilogram")', 'unit("23 deg")'], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "string"] }, e: Tu, E: Tu, false: { name: "false", category: "Constants", syntax: ["false"], description: "Boolean value false", examples: ["false"], seealso: ["true"] }, i: { name: "i", category: "Constants", syntax: ["i"], description: "Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.", examples: ["i", "i * i", "sqrt(-1)"], seealso: [] }, Infinity: { name: "Infinity", category: "Constants", syntax: ["Infinity"], description: "Infinity, a number which is larger than the maximum number that can be handled by a floating point number.", examples: ["Infinity", "1 / 0"], seealso: [] }, LN2: { name: "LN2", category: "Constants", syntax: ["LN2"], description: "Returns the natural logarithm of 2, approximately equal to 0.693", examples: ["LN2", "log(2)"], seealso: [] }, LN10: { name: "LN10", category: "Constants", syntax: ["LN10"], description: "Returns the natural logarithm of 10, approximately equal to 2.302", examples: ["LN10", "log(10)"], seealso: [] }, LOG2E: { name: "LOG2E", category: "Constants", syntax: ["LOG2E"], description: "Returns the base-2 logarithm of E, approximately equal to 1.442", examples: ["LOG2E", "log(e, 2)"], seealso: [] }, LOG10E: { name: "LOG10E", category: "Constants", syntax: ["LOG10E"], description: "Returns the base-10 logarithm of E, approximately equal to 0.434", examples: ["LOG10E", "log(e, 10)"], seealso: [] }, NaN: { name: "NaN", category: "Constants", syntax: ["NaN"], description: "Not a number", examples: ["NaN", "0 / 0"], seealso: [] }, null: { name: "null", category: "Constants", syntax: ["null"], description: "Value null", examples: ["null"], seealso: ["true", "false"] }, pi: _u, PI: _u, phi: { name: "phi", category: "Constants", syntax: ["phi"], description: "Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...", examples: ["phi"], seealso: [] }, SQRT1_2: { name: "SQRT1_2", category: "Constants", syntax: ["SQRT1_2"], description: "Returns the square root of 1/2, approximately equal to 0.707", examples: ["SQRT1_2", "sqrt(1/2)"], seealso: [] }, SQRT2: { name: "SQRT2", category: "Constants", syntax: ["SQRT2"], description: "Returns the square root of 2, approximately equal to 1.414", examples: ["SQRT2", "sqrt(2)"], seealso: [] }, tau: { name: "tau", category: "Constants", syntax: ["tau"], description: "Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.", examples: ["tau", "2 * pi"], seealso: ["pi"] }, true: { name: "true", category: "Constants", syntax: ["true"], description: "Boolean value true", examples: ["true"], seealso: ["false"] }, version: { name: "version", category: "Constants", syntax: ["version"], description: "A string with the version number of math.js", examples: ["version"], seealso: [] }, speedOfLight: { description: "Speed of light in vacuum", examples: ["speedOfLight"] }, gravitationConstant: { description: "Newtonian constant of gravitation", examples: ["gravitationConstant"] }, planckConstant: { description: "Planck constant", examples: ["planckConstant"] }, reducedPlanckConstant: { description: "Reduced Planck constant", examples: ["reducedPlanckConstant"] }, magneticConstant: { description: "Magnetic constant (vacuum permeability)", examples: ["magneticConstant"] }, electricConstant: { description: "Electric constant (vacuum permeability)", examples: ["electricConstant"] }, vacuumImpedance: { description: "Characteristic impedance of vacuum", examples: ["vacuumImpedance"] }, coulomb: { description: "Coulomb's constant", examples: ["coulomb"] }, elementaryCharge: { description: "Elementary charge", examples: ["elementaryCharge"] }, bohrMagneton: { description: "Borh magneton", examples: ["bohrMagneton"] }, conductanceQuantum: { description: "Conductance quantum", examples: ["conductanceQuantum"] }, inverseConductanceQuantum: { description: "Inverse conductance quantum", examples: ["inverseConductanceQuantum"] }, magneticFluxQuantum: { description: "Magnetic flux quantum", examples: ["magneticFluxQuantum"] }, nuclearMagneton: { description: "Nuclear magneton", examples: ["nuclearMagneton"] }, klitzing: { description: "Von Klitzing constant", examples: ["klitzing"] }, bohrRadius: { description: "Borh radius", examples: ["bohrRadius"] }, classicalElectronRadius: { description: "Classical electron radius", examples: ["classicalElectronRadius"] }, electronMass: { description: "Electron mass", examples: ["electronMass"] }, fermiCoupling: { description: "Fermi coupling constant", examples: ["fermiCoupling"] }, fineStructure: { description: "Fine-structure constant", examples: ["fineStructure"] }, hartreeEnergy: { description: "Hartree energy", examples: ["hartreeEnergy"] }, protonMass: { description: "Proton mass", examples: ["protonMass"] }, deuteronMass: { description: "Deuteron Mass", examples: ["deuteronMass"] }, neutronMass: { description: "Neutron mass", examples: ["neutronMass"] }, quantumOfCirculation: { description: "Quantum of circulation", examples: ["quantumOfCirculation"] }, rydberg: { description: "Rydberg constant", examples: ["rydberg"] }, thomsonCrossSection: { description: "Thomson cross section", examples: ["thomsonCrossSection"] }, weakMixingAngle: { description: "Weak mixing angle", examples: ["weakMixingAngle"] }, efimovFactor: { description: "Efimov factor", examples: ["efimovFactor"] }, atomicMass: { description: "Atomic mass constant", examples: ["atomicMass"] }, avogadro: { description: "Avogadro's number", examples: ["avogadro"] }, boltzmann: { description: "Boltzmann constant", examples: ["boltzmann"] }, faraday: { description: "Faraday constant", examples: ["faraday"] }, firstRadiation: { description: "First radiation constant", examples: ["firstRadiation"] }, loschmidt: { description: "Loschmidt constant at T=273.15 K and p=101.325 kPa", examples: ["loschmidt"] }, gasConstant: { description: "Gas constant", examples: ["gasConstant"] }, molarPlanckConstant: { description: "Molar Planck constant", examples: ["molarPlanckConstant"] }, molarVolume: { description: "Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa", examples: ["molarVolume"] }, sackurTetrode: { description: "Sackur-Tetrode constant at T=1 K and p=101.325 kPa", examples: ["sackurTetrode"] }, secondRadiation: { description: "Second radiation constant", examples: ["secondRadiation"] }, stefanBoltzmann: { description: "Stefan-Boltzmann constant", examples: ["stefanBoltzmann"] }, wienDisplacement: { description: "Wien displacement law constant", examples: ["wienDisplacement"] }, molarMass: { description: "Molar mass constant", examples: ["molarMass"] }, molarMassC12: { description: "Molar mass constant of carbon-12", examples: ["molarMassC12"] }, gravity: { description: "Standard acceleration of gravity (standard acceleration of free-fall on Earth)", examples: ["gravity"] }, planckLength: { description: "Planck length", examples: ["planckLength"] }, planckMass: { description: "Planck mass", examples: ["planckMass"] }, planckTime: { description: "Planck time", examples: ["planckTime"] }, planckCharge: { description: "Planck charge", examples: ["planckCharge"] }, planckTemperature: { description: "Planck temperature", examples: ["planckTemperature"] }, derivative: { name: "derivative", category: "Algebra", syntax: ["derivative(expr, variable)", "derivative(expr, variable, {simplify: boolean})"], description: "Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.", examples: ['derivative("2x^3", "x")', 'derivative("2x^3", "x", {simplify: false})', 'derivative("2x^2 + 3x + 4", "x")', 'derivative("sin(2x)", "x")', 'f = parse("x^2 + x")', 'x = parse("x")', "df = derivative(f, x)", "df.evaluate({x: 3})"], seealso: ["simplify", "parse", "evaluate"] }, lsolve: { name: "lsolve", category: "Algebra", syntax: ["x=lsolve(L, b)"], description: "Finds one solution of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"], seealso: ["lsolveAll", "lup", "lusolve", "usolve", "matrix", "sparse"] }, lsolveAll: { name: "lsolveAll", category: "Algebra", syntax: ["x=lsolveAll(L, b)"], description: "Finds all solutions of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"], seealso: ["lsolve", "lup", "lusolve", "usolve", "matrix", "sparse"] }, lup: { name: "lup", category: "Algebra", syntax: ["lup(m)"], description: "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U", examples: ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"], seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu", "qr"] }, lusolve: { name: "lusolve", category: "Algebra", syntax: ["x=lusolve(A, b)", "x=lusolve(lu, b)"], description: "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"], seealso: ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"] }, simplify: { name: "simplify", category: "Algebra", syntax: ["simplify(expr)", "simplify(expr, rules)"], description: "Simplify an expression tree.", examples: ['simplify("3 + 2 / 4")', 'simplify("2x + x")', 'f = parse("x * (x + 2 + x)")', "simplified = simplify(f)", "simplified.evaluate({x: 2})"], seealso: ["derivative", "parse", "evaluate"] }, rationalize: { name: "rationalize", category: "Algebra", syntax: ["rationalize(expr)", "rationalize(expr, scope)", "rationalize(expr, scope, detailed)"], description: "Transform a rationalizable expression in a rational fraction. If rational fraction is one variable polynomial then converts the numerator and denominator in canonical form, with decreasing exponents, returning the coefficients of numerator.", examples: ['rationalize("2x/y - y/(x+1)")', 'rationalize("2x/y - y/(x+1)", true)'], seealso: ["simplify"] }, slu: { name: "slu", category: "Algebra", syntax: ["slu(A, order, threshold)"], description: "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U", examples: ["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"], seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup", "qr"] }, usolve: { name: "usolve", category: "Algebra", syntax: ["x=usolve(U, b)"], description: "Finds one solution of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.", examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"], seealso: ["usolveAll", "lup", "lusolve", "lsolve", "matrix", "sparse"] }, usolveAll: { name: "usolveAll", category: "Algebra", syntax: ["x=usolve(U, b)"], description: "Finds all solutions of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.", examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"], seealso: ["usolve", "lup", "lusolve", "lsolve", "matrix", "sparse"] }, qr: { name: "qr", category: "Algebra", syntax: ["qr(A)"], description: "Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.", examples: ["qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])"], seealso: ["lup", "slu", "matrix"] }, abs: { name: "abs", category: "Arithmetic", syntax: ["abs(x)"], description: "Compute the absolute value.", examples: ["abs(3.5)", "abs(-4.2)"], seealso: ["sign"] }, add: { name: "add", category: "Operators", syntax: ["x + y", "add(x, y)"], description: "Add two values.", examples: ["a = 2.1 + 3.6", "a - 3.6", "3 + 2i", "3 cm + 2 inch", '"2.3" + "4"'], seealso: ["subtract"] }, cbrt: { name: "cbrt", category: "Arithmetic", syntax: ["cbrt(x)", "cbrt(x, allRoots)"], description: "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned", examples: ["cbrt(64)", "cube(4)", "cbrt(-8)", "cbrt(2 + 3i)", "cbrt(8i)", "cbrt(8i, true)", "cbrt(27 m^3)"], seealso: ["square", "sqrt", "cube", "multiply"] }, ceil: { name: "ceil", category: "Arithmetic", syntax: ["ceil(x)"], description: "Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.", examples: ["ceil(3.2)", "ceil(3.8)", "ceil(-4.2)"], seealso: ["floor", "fix", "round"] }, cube: { name: "cube", category: "Arithmetic", syntax: ["cube(x)"], description: "Compute the cube of a value. The cube of x is x * x * x.", examples: ["cube(2)", "2^3", "2 * 2 * 2"], seealso: ["multiply", "square", "pow"] }, divide: { name: "divide", category: "Operators", syntax: ["x / y", "divide(x, y)"], description: "Divide two values.", examples: ["a = 2 / 3", "a * 3", "4.5 / 2", "3 + 4 / 2", "(3 + 4) / 2", "18 km / 4.5"], seealso: ["multiply"] }, dotDivide: { name: "dotDivide", category: "Operators", syntax: ["x ./ y", "dotDivide(x, y)"], description: "Divide two values element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a ./ b"], seealso: ["multiply", "dotMultiply", "divide"] }, dotMultiply: { name: "dotMultiply", category: "Operators", syntax: ["x .* y", "dotMultiply(x, y)"], description: "Multiply two values element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a .* b"], seealso: ["multiply", "divide", "dotDivide"] }, dotPow: { name: "dotPow", category: "Operators", syntax: ["x .^ y", "dotPow(x, y)"], description: "Calculates the power of x to y element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "a .^ 2"], seealso: ["pow"] }, exp: { name: "exp", category: "Arithmetic", syntax: ["exp(x)"], description: "Calculate the exponent of a value.", examples: ["exp(1.3)", "e ^ 1.3", "log(exp(1.3))", "x = 2.4", "(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"], seealso: ["expm", "expm1", "pow", "log"] }, expm: { name: "expm", category: "Arithmetic", syntax: ["exp(x)"], description: "Compute the matrix exponential, expm(A) = e^A. The matrix must be square. Not to be confused with exp(a), which performs element-wise exponentiation.", examples: ["expm([[0,2],[0,0]])"], seealso: ["exp"] }, expm1: { name: "expm1", category: "Arithmetic", syntax: ["expm1(x)"], description: "Calculate the value of subtracting 1 from the exponential value.", examples: ["expm1(2)", "pow(e, 2) - 1", "log(expm1(2) + 1)"], seealso: ["exp", "pow", "log"] }, fix: { name: "fix", category: "Arithmetic", syntax: ["fix(x)"], description: "Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.", examples: ["fix(3.2)", "fix(3.8)", "fix(-4.2)", "fix(-4.8)"], seealso: ["ceil", "floor", "round"] }, floor: { name: "floor", category: "Arithmetic", syntax: ["floor(x)"], description: "Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.", examples: ["floor(3.2)", "floor(3.8)", "floor(-4.2)"], seealso: ["ceil", "fix", "round"] }, gcd: { name: "gcd", category: "Arithmetic", syntax: ["gcd(a, b)", "gcd(a, b, c, ...)"], description: "Compute the greatest common divisor.", examples: ["gcd(8, 12)", "gcd(-4, 6)", "gcd(25, 15, -10)"], seealso: ["lcm", "xgcd"] }, hypot: { name: "hypot", category: "Arithmetic", syntax: ["hypot(a, b, c, ...)", "hypot([a, b, c, ...])"], description: "Calculate the hypotenusa of a list with values. ", examples: ["hypot(3, 4)", "sqrt(3^2 + 4^2)", "hypot(-2)", "hypot([3, 4, 5])"], seealso: ["abs", "norm"] }, lcm: { name: "lcm", category: "Arithmetic", syntax: ["lcm(x, y)"], description: "Compute the least common multiple.", examples: ["lcm(4, 6)", "lcm(6, 21)", "lcm(6, 21, 5)"], seealso: ["gcd"] }, log: { name: "log", category: "Arithmetic", syntax: ["log(x)", "log(x, base)"], description: "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).", examples: ["log(3.5)", "a = log(2.4)", "exp(a)", "10 ^ 4", "log(10000, 10)", "log(10000) / log(10)", "b = log(1024, 2)", "2 ^ b"], seealso: ["exp", "log1p", "log2", "log10"] }, log2: { name: "log2", category: "Arithmetic", syntax: ["log2(x)"], description: "Calculate the 2-base of a value. This is the same as calculating `log(x, 2)`.", examples: ["log2(0.03125)", "log2(16)", "log2(16) / log2(2)", "pow(2, 4)"], seealso: ["exp", "log1p", "log", "log10"] }, log1p: { name: "log1p", category: "Arithmetic", syntax: ["log1p(x)", "log1p(x, base)"], description: "Calculate the logarithm of a `value+1`", examples: ["log1p(2.5)", "exp(log1p(1.4))", "pow(10, 4)", "log1p(9999, 10)", "log1p(9999) / log(10)"], seealso: ["exp", "log", "log2", "log10"] }, log10: { name: "log10", category: "Arithmetic", syntax: ["log10(x)"], description: "Compute the 10-base logarithm of a value.", examples: ["log10(0.00001)", "log10(10000)", "10 ^ 4", "log(10000) / log(10)", "log(10000, 10)"], seealso: ["exp", "log"] }, mod: { name: "mod", category: "Operators", syntax: ["x % y", "x mod y", "mod(x, y)"], description: "Calculates the modulus, the remainder of an integer division.", examples: ["7 % 3", "11 % 2", "10 mod 4", "isOdd(x) = x % 2", "isOdd(2)", "isOdd(3)"], seealso: ["divide"] }, multiply: { name: "multiply", category: "Operators", syntax: ["x * y", "multiply(x, y)"], description: "multiply two values.", examples: ["a = 2.1 * 3.4", "a / 3.4", "2 * 3 + 4", "2 * (3 + 4)", "3 * 2.1 km"], seealso: ["divide"] }, norm: { name: "norm", category: "Arithmetic", syntax: ["norm(x)", "norm(x, p)"], description: "Calculate the norm of a number, vector or matrix.", examples: ["abs(-3.5)", "norm(-3.5)", "norm(3 - 4i)", "norm([1, 2, -3], Infinity)", "norm([1, 2, -3], -Infinity)", "norm([3, 4], 2)", "norm([[1, 2], [3, 4]], 1)", 'norm([[1, 2], [3, 4]], "inf")', 'norm([[1, 2], [3, 4]], "fro")'] }, nthRoot: { name: "nthRoot", category: "Arithmetic", syntax: ["nthRoot(a)", "nthRoot(a, root)"], description: 'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".', examples: ["4 ^ 3", "nthRoot(64, 3)", "nthRoot(9, 2)", "sqrt(9)"], seealso: ["nthRoots", "pow", "sqrt"] }, nthRoots: { name: "nthRoots", category: "Arithmetic", syntax: ["nthRoots(A)", "nthRoots(A, root)"], description: 'Calculate the nth roots of a value. An nth root of a positive real number A, is a positive real solution of the equation "x^root = A". This function returns an array of complex values.', examples: ["nthRoots(1)", "nthRoots(1, 3)"], seealso: ["sqrt", "pow", "nthRoot"] }, pow: { name: "pow", category: "Operators", syntax: ["x ^ y", "pow(x, y)"], description: "Calculates the power of x to y, x^y.", examples: ["2^3", "2*2*2", "1 + e ^ (pi * i)"], seealso: ["multiply", "nthRoot", "nthRoots", "sqrt"] }, round: { name: "round", category: "Arithmetic", syntax: ["round(x)", "round(x, n)"], description: "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.", examples: ["round(3.2)", "round(3.8)", "round(-4.2)", "round(-4.8)", "round(pi, 3)", "round(123.45678, 2)"], seealso: ["ceil", "floor", "fix"] }, sign: { name: "sign", category: "Arithmetic", syntax: ["sign(x)"], description: "Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.", examples: ["sign(3.5)", "sign(-4.2)", "sign(0)"], seealso: ["abs"] }, sqrt: { name: "sqrt", category: "Arithmetic", syntax: ["sqrt(x)"], description: "Compute the square root value. If x = y * y, then y is the square root of x.", examples: ["sqrt(25)", "5 * 5", "sqrt(-1)"], seealso: ["square", "sqrtm", "multiply", "nthRoot", "nthRoots", "pow"] }, sqrtm: { name: "sqrtm", category: "Arithmetic", syntax: ["sqrtm(x)"], description: "Calculate the principal square root of a square matrix. The principal square root matrix `X` of another matrix `A` is such that `X * X = A`.", examples: ["sqrtm([[1, 2], [3, 4]])"], seealso: ["sqrt", "abs", "square", "multiply"] }, square: { name: "square", category: "Arithmetic", syntax: ["square(x)"], description: "Compute the square of a value. The square of x is x * x.", examples: ["square(3)", "sqrt(9)", "3^2", "3 * 3"], seealso: ["multiply", "pow", "sqrt", "cube"] }, subtract: { name: "subtract", category: "Operators", syntax: ["x - y", "subtract(x, y)"], description: "subtract two values.", examples: ["a = 5.3 - 2", "a + 2", "2/3 - 1/6", "2 * 3 - 3", "2.1 km - 500m"], seealso: ["add"] }, unaryMinus: { name: "unaryMinus", category: "Operators", syntax: ["-x", "unaryMinus(x)"], description: "Inverse the sign of a value. Converts booleans and strings to numbers.", examples: ["-4.5", "-(-5.6)", '-"22"'], seealso: ["add", "subtract", "unaryPlus"] }, unaryPlus: { name: "unaryPlus", category: "Operators", syntax: ["+x", "unaryPlus(x)"], description: "Converts booleans and strings to numbers.", examples: ["+true", '+"2"'], seealso: ["add", "subtract", "unaryMinus"] }, xgcd: { name: "xgcd", category: "Arithmetic", syntax: ["xgcd(a, b)"], description: "Calculate the extended greatest common divisor for two values. The result is an array [d, x, y] with 3 entries, where d is the greatest common divisor, and d = x * a + y * b.", examples: ["xgcd(8, 12)", "gcd(8, 12)", "xgcd(36163, 21199)"], seealso: ["gcd", "lcm"] }, bitAnd: { name: "bitAnd", category: "Bitwise", syntax: ["x & y", "bitAnd(x, y)"], description: "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0", examples: ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"], seealso: ["bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] }, bitNot: { name: "bitNot", category: "Bitwise", syntax: ["~x", "bitNot(x)"], description: "Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.", examples: ["~1", "~2", "bitNot([2, -3, 4])"], seealso: ["bitAnd", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] }, bitOr: { name: "bitOr", category: "Bitwise", syntax: ["x | y", "bitOr(x, y)"], description: "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.", examples: ["5 | 3", "bitOr([1, 2, 3], 4)"], seealso: ["bitAnd", "bitNot", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] }, bitXor: { name: "bitXor", category: "Bitwise", syntax: ["bitXor(x, y)"], description: "Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.", examples: ["bitOr(1, 2)", "bitXor([2, 3, 4], 4)"], seealso: ["bitAnd", "bitNot", "bitOr", "leftShift", "rightArithShift", "rightLogShift"] }, leftShift: { name: "leftShift", category: "Bitwise", syntax: ["x << y", "leftShift(x, y)"], description: "Bitwise left logical shift of a value x by y number of bits.", examples: ["4 << 1", "8 >> 1"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "rightArithShift", "rightLogShift"] }, rightArithShift: { name: "rightArithShift", category: "Bitwise", syntax: ["x >> y", "rightArithShift(x, y)"], description: "Bitwise right arithmetic shift of a value x by y number of bits.", examples: ["8 >> 1", "4 << 1", "-12 >> 2"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightLogShift"] }, rightLogShift: { name: "rightLogShift", category: "Bitwise", syntax: ["x >>> y", "rightLogShift(x, y)"], description: "Bitwise right logical shift of a value x by y number of bits.", examples: ["8 >>> 1", "4 << 1", "-12 >>> 2"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift"] }, bellNumbers: { name: "bellNumbers", category: "Combinatorics", syntax: ["bellNumbers(n)"], description: "The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.", examples: ["bellNumbers(3)", "bellNumbers(8)"], seealso: ["stirlingS2"] }, catalan: { name: "catalan", category: "Combinatorics", syntax: ["catalan(n)"], description: "The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.", examples: ["catalan(3)", "catalan(8)"], seealso: ["bellNumbers"] }, composition: { name: "composition", category: "Combinatorics", syntax: ["composition(n, k)"], description: "The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.", examples: ["composition(5, 3)"], seealso: ["combinations"] }, stirlingS2: { name: "stirlingS2", category: "Combinatorics", syntax: ["stirlingS2(n, k)"], description: "he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.", examples: ["stirlingS2(5, 3)"], seealso: ["bellNumbers"] }, config: { name: "config", category: "Core", syntax: ["config()", "config(options)"], description: "Get configuration or change configuration.", examples: ["config()", "1/3 + 1/4", 'config({number: "Fraction"})', "1/3 + 1/4"], seealso: [] }, import: { name: "import", category: "Core", syntax: ["import(functions)", "import(functions, options)"], description: "Import functions or constants from an object.", examples: ["import({myFn: f(x)=x^2, myConstant: 32 })", "myFn(2)", "myConstant"], seealso: [] }, typed: { name: "typed", category: "Core", syntax: ["typed(signatures)", "typed(name, signatures)"], description: "Create a typed function.", examples: ['double = typed({ "number, number": f(x)=x+x })', "double(2)", 'double("hello")'], seealso: [] }, arg: { name: "arg", category: "Complex", syntax: ["arg(x)"], description: "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).", examples: ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"], seealso: ["re", "im", "conj", "abs"] }, conj: { name: "conj", category: "Complex", syntax: ["conj(x)"], description: "Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.", examples: ["conj(2 + 3i)", "conj(2 - 3i)", "conj(-5.2i)"], seealso: ["re", "im", "abs", "arg"] }, re: { name: "re", category: "Complex", syntax: ["re(x)"], description: "Get the real part of a complex number.", examples: ["re(2 + 3i)", "im(2 + 3i)", "re(-5.2i)", "re(2.4)"], seealso: ["im", "conj", "abs", "arg"] }, im: { name: "im", category: "Complex", syntax: ["im(x)"], description: "Get the imaginary part of a complex number.", examples: ["im(2 + 3i)", "re(2 + 3i)", "im(-5.2i)", "im(2.4)"], seealso: ["re", "conj", "abs", "arg"] }, evaluate: { name: "evaluate", category: "Expression", syntax: ["evaluate(expression)", "evaluate([expr1, expr2, expr3, ...])"], description: "Evaluate an expression or an array with expressions.", examples: ['evaluate("2 + 3")', 'evaluate("sqrt(" + 4 + ")")'], seealso: [] }, help: { name: "help", category: "Expression", syntax: ["help(object)", "help(string)"], description: "Display documentation on a function or data type.", examples: ["help(sqrt)", 'help("complex")'], seealso: [] }, distance: { name: "distance", category: "Geometry", syntax: ["distance([x1, y1], [x2, y2])", "distance([[x1, y1], [x2, y2]])"], description: "Calculates the Euclidean distance between two points.", examples: ["distance([0,0], [4,4])", "distance([[0,0], [4,4]])"], seealso: [] }, intersect: { name: "intersect", category: "Geometry", syntax: ["intersect(expr1, expr2, expr3, expr4)", "intersect(expr1, expr2, expr3)"], description: "Computes the intersection point of lines and/or planes.", examples: ["intersect([0, 0], [10, 10], [10, 0], [0, 10])", "intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"], seealso: [] }, and: { name: "and", category: "Logical", syntax: ["x and y", "and(x, y)"], description: "Logical and. Test whether two values are both defined with a nonzero/nonempty value.", examples: ["true and false", "true and true", "2 and 4"], seealso: ["not", "or", "xor"] }, not: { name: "not", category: "Logical", syntax: ["not x", "not(x)"], description: "Logical not. Flips the boolean value of given argument.", examples: ["not true", "not false", "not 2", "not 0"], seealso: ["and", "or", "xor"] }, or: { name: "or", category: "Logical", syntax: ["x or y", "or(x, y)"], description: "Logical or. Test if at least one value is defined with a nonzero/nonempty value.", examples: ["true or false", "false or false", "0 or 4"], seealso: ["not", "and", "xor"] }, xor: { name: "xor", category: "Logical", syntax: ["x xor y", "xor(x, y)"], description: "Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.", examples: ["true xor false", "false xor false", "true xor true", "0 xor 4"], seealso: ["not", "and", "or"] }, concat: { name: "concat", category: "Matrix", syntax: ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"], description: "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.", examples: ["A = [1, 2; 5, 6]", "B = [3, 4; 7, 8]", "concat(A, B)", "concat(A, B, 1)", "concat(A, B, 2)"], seealso: ["det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, count: { name: "count", category: "Matrix", syntax: ["count(x)"], description: "Count the number of elements of a matrix, array or string.", examples: ["a = [1, 2; 3, 4; 5, 6]", "count(a)", "size(a)", 'count("hello world")'], seealso: ["size"] }, cross: { name: "cross", category: "Matrix", syntax: ["cross(A, B)"], description: "Calculate the cross product for two vectors in three dimensional space.", examples: ["cross([1, 1, 0],  [0, 1, 1])", "cross([3, -3, 1], [4, 9, 2])", "cross([2, 3, 4],  [5, 6, 7])"], seealso: ["multiply", "dot"] }, column: { name: "column", category: "Matrix", syntax: ["column(x, index)"], description: "Return a column from a matrix or array.", examples: ["A = [[1, 2], [3, 4]]", "column(A, 1)", "column(A, 2)"], seealso: ["row"] }, ctranspose: { name: "ctranspose", category: "Matrix", syntax: ["x'", "ctranspose(x)"], description: "Complex Conjugate and Transpose a matrix", examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "ctranspose(a)"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"] }, det: { name: "det", category: "Matrix", syntax: ["det(x)"], description: "Calculate the determinant of a matrix", examples: ["det([1, 2; 3, 4])", "det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"], seealso: ["concat", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, diag: { name: "diag", category: "Matrix", syntax: ["diag(x)", "diag(x, k)"], description: "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.", examples: ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"], seealso: ["concat", "det", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, diff: { name: "diff", category: "Matrix", syntax: ["diff(arr)", "diff(arr, dim)"], description: ["Create a new matrix or array with the difference of the passed matrix or array.", "Dim parameter is optional and used to indicant the dimension of the array/matrix to apply the difference", "If no dimension parameter is passed it is assumed as dimension 0", "Dimension is zero-based in javascript and one-based in the parser", "Arrays must be 'rectangular' meaning arrays like [1, 2]", "If something is passed as a matrix it will be returned as a matrix but other than that all matrices are converted to arrays"], examples: ["diff([1, 2, 4, 7, 0])", "diff([1, 2, 4, 7, 0], 0)", "diff(matrix([1, 2, 4, 7, 0]))", "diff([[1, 2], [3, 4]])", "diff([[1, 2], [3, 4]], 0)", "diff([[1, 2], [3, 4]], 1)", "diff([[1, 2], [3, 4]], bignumber(1))", "diff(matrix([[1, 2], [3, 4]]), 1)", "diff([[1, 2], matrix([3, 4])], 1)"], seealso: ["subtract", "partitionSelect"] }, dot: { name: "dot", category: "Matrix", syntax: ["dot(A, B)", "A * B"], description: "Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn", examples: ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"], seealso: ["multiply", "cross"] }, getMatrixDataType: { name: "getMatrixDataType", category: "Matrix", syntax: ["getMatrixDataType(x)"], description: 'Find the data type of all elements in a matrix or array, for example "number" if all items are a number and "Complex" if all values are complex numbers. If a matrix contains more than one data type, it will return "mixed".', examples: ["getMatrixDataType([1, 2, 3])", "getMatrixDataType([[5 cm], [2 inch]])", 'getMatrixDataType([1, "text"])', "getMatrixDataType([1, bignumber(4)])"], seealso: ["matrix", "sparse", "typeOf"] }, identity: { name: "identity", category: "Matrix", syntax: ["identity(n)", "identity(m, n)", "identity([m, n])"], description: "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.", examples: ["identity(3)", "identity(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "identity(size(a))"], seealso: ["concat", "det", "diag", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, filter: { name: "filter", category: "Matrix", syntax: ["filter(x, test)"], description: "Filter items in a matrix.", examples: ["isPositive(x) = x > 0", "filter([6, -2, -1, 4, 3], isPositive)", "filter([6, -2, 0, 1, 0], x != 0)"], seealso: ["sort", "map", "forEach"] }, flatten: { name: "flatten", category: "Matrix", syntax: ["flatten(x)"], description: "Flatten a multi dimensional matrix into a single dimensional matrix.", examples: ["a = [1, 2, 3; 4, 5, 6]", "size(a)", "b = flatten(a)", "size(b)"], seealso: ["concat", "resize", "size", "squeeze"] }, forEach: { name: "forEach", category: "Matrix", syntax: ["forEach(x, callback)"], description: "Iterates over all elements of a matrix/array, and executes the given callback function.", examples: ["forEach([1, 2, 3], function(val) { console.log(val) })"], seealso: ["map", "sort", "filter"] }, inv: { name: "inv", category: "Matrix", syntax: ["inv(x)"], description: "Calculate the inverse of a matrix", examples: ["inv([1, 2; 3, 4])", "inv(4)", "1 / 4"], seealso: ["concat", "det", "diag", "identity", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, eigs: { name: "eigs", category: "Matrix", syntax: ["eigs(x)"], description: "Calculate the eigenvalues and eigenvectors of a real symmetric matrix", examples: ["eigs([[5, 2.3], [2.3, 1]])"], seealso: ["inv"] }, kron: { name: "kron", category: "Matrix", syntax: ["kron(x, y)"], description: "Calculates the kronecker product of 2 matrices or vectors.", examples: ["kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])", "kron([1,1], [2,3,4])"], seealso: ["multiply", "dot", "cross"] }, map: { name: "map", category: "Matrix", syntax: ["map(x, callback)"], description: "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.", examples: ["map([1, 2, 3], square)"], seealso: ["filter", "forEach"] }, ones: { name: "ones", category: "Matrix", syntax: ["ones(m)", "ones(m, n)", "ones(m, n, p, ...)", "ones([m])", "ones([m, n])", "ones([m, n, p, ...])"], description: "Create a matrix containing ones.", examples: ["ones(3)", "ones(3, 5)", "ones([2,3]) * 4.5", "a = [1, 2, 3; 4, 5, 6]", "ones(size(a))"], seealso: ["concat", "det", "diag", "identity", "inv", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, partitionSelect: { name: "partitionSelect", category: "Matrix", syntax: ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"], description: "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.", examples: ["partitionSelect([5, 10, 1], 2)", 'partitionSelect(["C", "B", "A", "D"], 1)'], seealso: ["sort"] }, range: { name: "range", category: "Type", syntax: ["start:end", "start:step:end", "range(start, end)", "range(start, end, step)", "range(string)"], description: "Create a range. Lower bound of the range is included, upper bound is excluded.", examples: ["1:5", "3:-1:-3", "range(3, 7)", "range(0, 12, 2)", 'range("4:10")', "a = [1, 2, 3, 4; 5, 6, 7, 8]", "a[1:2, 1:2]"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "size", "squeeze", "subset", "trace", "transpose", "zeros"] }, resize: { name: "resize", category: "Matrix", syntax: ["resize(x, size)", "resize(x, size, defaultValue)"], description: "Resize a matrix.", examples: ["resize([1,2,3,4,5], [3])", "resize([1,2,3], [5])", "resize([1,2,3], [5], -1)", "resize(2, [2, 3])", 'resize("hello", [8], "!")'], seealso: ["size", "subset", "squeeze", "reshape"] }, reshape: { name: "reshape", category: "Matrix", syntax: ["reshape(x, sizes)"], description: "Reshape a multi dimensional array to fit the specified dimensions.", examples: ["reshape([1, 2, 3, 4, 5, 6], [2, 3])", "reshape([[1, 2], [3, 4]], [1, 4])", "reshape([[1, 2], [3, 4]], [4])"], seealso: ["size", "squeeze", "resize"] }, rotate: { name: "rotate", category: "Matrix", syntax: ["rotate(w, theta)", "rotate(w, theta, v)"], description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.", examples: ["rotate([1, 0], math.pi / 2)", 'rotate(matrix([1, 0]), unit("35deg"))', 'rotate([1, 0, 0], unit("90deg"), [0, 0, 1])', 'rotate(matrix([1, 0, 0]), unit("90deg"), matrix([0, 0, 1]))'], seealso: ["matrix", "rotationMatrix"] }, rotationMatrix: { name: "rotationMatrix", category: "Matrix", syntax: ["rotationMatrix(theta)", "rotationMatrix(theta, v)", "rotationMatrix(theta, v, format)"], description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.", examples: ["rotationMatrix(pi / 2)", 'rotationMatrix(unit("45deg"), [0, 0, 1])', 'rotationMatrix(1, matrix([0, 0, 1]), "sparse")'], seealso: ["cos", "sin"] }, row: { name: "row", category: "Matrix", syntax: ["row(x, index)"], description: "Return a row from a matrix or array.", examples: ["A = [[1, 2], [3, 4]]", "row(A, 1)", "row(A, 2)"], seealso: ["column"] }, size: { name: "size", category: "Matrix", syntax: ["size(x)"], description: "Calculate the size of a matrix.", examples: ["size(2.3)", 'size("hello world")', "a = [1, 2; 3, 4; 5, 6]", "size(a)", "size(1:6)"], seealso: ["concat", "count", "det", "diag", "identity", "inv", "ones", "range", "squeeze", "subset", "trace", "transpose", "zeros"] }, sort: { name: "sort", category: "Matrix", syntax: ["sort(x)", "sort(x, compare)"], description: 'Sort the items in a matrix. Compare can be a string "asc", "desc", "natural", or a custom sort function.', examples: ["sort([5, 10, 1])", 'sort(["C", "B", "A", "D"])', "sortByLength(a, b) = size(a)[1] - size(b)[1]", 'sort(["Langdon", "Tom", "Sara"], sortByLength)', 'sort(["10", "1", "2"], "natural")'], seealso: ["map", "filter", "forEach"] }, squeeze: { name: "squeeze", category: "Matrix", syntax: ["squeeze(x)"], description: "Remove inner and outer singleton dimensions from a matrix.", examples: ["a = zeros(3,2,1)", "size(squeeze(a))", "b = zeros(1,1,3)", "size(squeeze(b))"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "subset", "trace", "transpose", "zeros"] }, subset: { name: "subset", category: "Matrix", syntax: ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"], description: "Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.", examples: ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"] }, trace: { name: "trace", category: "Matrix", syntax: ["trace(A)"], description: "Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.", examples: ["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]", "trace(A)"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "transpose", "zeros"] }, transpose: { name: "transpose", category: "Matrix", syntax: ["x'", "transpose(x)"], description: "Transpose a matrix", examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "transpose(a)"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"] }, zeros: { name: "zeros", category: "Matrix", syntax: ["zeros(m)", "zeros(m, n)", "zeros(m, n, p, ...)", "zeros([m])", "zeros([m, n])", "zeros([m, n, p, ...])"], description: "Create a matrix containing zeros.", examples: ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"], seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose"] }, combinations: { name: "combinations", category: "Probability", syntax: ["combinations(n, k)"], description: "Compute the number of combinations of n items taken k at a time", examples: ["combinations(7, 5)"], seealso: ["combinationsWithRep", "permutations", "factorial"] }, combinationsWithRep: { name: "combinationsWithRep", category: "Probability", syntax: ["combinationsWithRep(n, k)"], description: "Compute the number of combinations of n items taken k at a time with replacements.", examples: ["combinationsWithRep(7, 5)"], seealso: ["combinations", "permutations", "factorial"] }, factorial: { name: "factorial", category: "Probability", syntax: ["n!", "factorial(n)"], description: "Compute the factorial of a value", examples: ["5!", "5 * 4 * 3 * 2 * 1", "3!"], seealso: ["combinations", "combinationsWithRep", "permutations", "gamma"] }, gamma: { name: "gamma", category: "Probability", syntax: ["gamma(n)"], description: "Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.", examples: ["gamma(4)", "3!", "gamma(1/2)", "sqrt(pi)"], seealso: ["factorial"] }, kldivergence: { name: "kldivergence", category: "Probability", syntax: ["kldivergence(x, y)"], description: "Calculate the Kullback-Leibler (KL) divergence  between two distributions.", examples: ["kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"], seealso: [] }, multinomial: { name: "multinomial", category: "Probability", syntax: ["multinomial(A)"], description: "Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai > 0.", examples: ["multinomial([1, 2, 1])"], seealso: ["combinations", "factorial"] }, permutations: { name: "permutations", category: "Probability", syntax: ["permutations(n)", "permutations(n, k)"], description: "Compute the number of permutations of n items taken k at a time", examples: ["permutations(5)", "permutations(5, 3)"], seealso: ["combinations", "combinationsWithRep", "factorial"] }, pickRandom: { name: "pickRandom", category: "Probability", syntax: ["pickRandom(array)", "pickRandom(array, number)", "pickRandom(array, weights)", "pickRandom(array, number, weights)", "pickRandom(array, weights, number)"], description: "Pick a random entry from a given array.", examples: ["pickRandom(0:10)", "pickRandom([1, 3, 1, 6])", "pickRandom([1, 3, 1, 6], 2)", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"], seealso: ["random", "randomInt"] }, random: { name: "random", category: "Probability", syntax: ["random()", "random(max)", "random(min, max)", "random(size)", "random(size, max)", "random(size, min, max)"], description: "Return a random number.", examples: ["random()", "random(10, 20)", "random([2, 3])"], seealso: ["pickRandom", "randomInt"] }, randomInt: { name: "randomInt", category: "Probability", syntax: ["randomInt(max)", "randomInt(min, max)", "randomInt(size)", "randomInt(size, max)", "randomInt(size, min, max)"], description: "Return a random integer number", examples: ["randomInt(10, 20)", "randomInt([2, 3], 10)"], seealso: ["pickRandom", "random"] }, compare: { name: "compare", category: "Relational", syntax: ["compare(x, y)"], description: "Compare two values. Returns 1 when x > y, -1 when x < y, and 0 when x == y.", examples: ["compare(2, 3)", "compare(3, 2)", "compare(2, 2)", "compare(5cm, 40mm)", "compare(2, [1, 2, 3])"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compareNatural", "compareText"] }, compareNatural: { name: "compareNatural", category: "Relational", syntax: ["compareNatural(x, y)"], description: "Compare two values of any type in a deterministic, natural way. Returns 1 when x > y, -1 when x < y, and 0 when x == y.", examples: ["compareNatural(2, 3)", "compareNatural(3, 2)", "compareNatural(2, 2)", "compareNatural(5cm, 40mm)", 'compareNatural("2", "10")', "compareNatural(2 + 3i, 2 + 4i)", "compareNatural([1, 2, 4], [1, 2, 3])", "compareNatural([1, 5], [1, 2, 3])", "compareNatural([1, 2], [1, 2])", "compareNatural({a: 2}, {a: 4})"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare", "compareText"] }, compareText: { name: "compareText", category: "Relational", syntax: ["compareText(x, y)"], description: "Compare two strings lexically. Comparison is case sensitive. Returns 1 when x > y, -1 when x < y, and 0 when x == y.", examples: ['compareText("B", "A")', 'compareText("A", "B")', 'compareText("A", "A")', 'compareText("2", "10")', 'compare("2", "10")', "compare(2, 10)", 'compareNatural("2", "10")', 'compareText("B", ["A", "B", "C"])'], seealso: ["compare", "compareNatural"] }, deepEqual: { name: "deepEqual", category: "Relational", syntax: ["deepEqual(x, y)"], description: "Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.", examples: ["deepEqual([1,3,4], [1,3,4])", "deepEqual([1,3,4], [1,3])"], seealso: ["equal", "unequal", "smaller", "larger", "smallerEq", "largerEq", "compare"] }, equal: { name: "equal", category: "Relational", syntax: ["x == y", "equal(x, y)"], description: "Check equality of two values. Returns true if the values are equal, and false if not.", examples: ["2+2 == 3", "2+2 == 4", "a = 3.2", "b = 6-2.8", "a == b", "50cm == 0.5m"], seealso: ["unequal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual", "equalText"] }, equalText: { name: "equalText", category: "Relational", syntax: ["equalText(x, y)"], description: "Check equality of two strings. Comparison is case sensitive. Returns true if the values are equal, and false if not.", examples: ['equalText("Hello", "Hello")', 'equalText("a", "A")', 'equal("2e3", "2000")', 'equalText("2e3", "2000")', 'equalText("B", ["A", "B", "C"])'], seealso: ["compare", "compareNatural", "compareText", "equal"] }, larger: { name: "larger", category: "Relational", syntax: ["x > y", "larger(x, y)"], description: "Check if value x is larger than y. Returns true if x is larger than y, and false if not.", examples: ["2 > 3", "5 > 2*2", "a = 3.3", "b = 6-2.8", "(a > b)", "(b < a)", "5 cm > 2 inch"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"] }, largerEq: { name: "largerEq", category: "Relational", syntax: ["x >= y", "largerEq(x, y)"], description: "Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.", examples: ["2 >= 1+1", "2 > 1+1", "a = 3.2", "b = 6-2.8", "(a >= b)"], seealso: ["equal", "unequal", "smallerEq", "smaller", "compare"] }, smaller: { name: "smaller", category: "Relational", syntax: ["x < y", "smaller(x, y)"], description: "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.", examples: ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"], seealso: ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"] }, smallerEq: { name: "smallerEq", category: "Relational", syntax: ["x <= y", "smallerEq(x, y)"], description: "Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.", examples: ["2 <= 1+1", "2 < 1+1", "a = 3.2", "b = 6-2.8", "(a <= b)"], seealso: ["equal", "unequal", "larger", "smaller", "largerEq", "compare"] }, unequal: { name: "unequal", category: "Relational", syntax: ["x != y", "unequal(x, y)"], description: "Check unequality of two values. Returns true if the values are unequal, and false if they are equal.", examples: ["2+2 != 3", "2+2 != 4", "a = 3.2", "b = 6-2.8", "a != b", "50cm != 0.5m", "5 cm != 2 inch"], seealso: ["equal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"] }, setCartesian: { name: "setCartesian", category: "Set", syntax: ["setCartesian(set1, set2)"], description: "Create the cartesian product of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.", examples: ["setCartesian([1, 2], [3, 4])"], seealso: ["setUnion", "setIntersect", "setDifference", "setPowerset"] }, setDifference: { name: "setDifference", category: "Set", syntax: ["setDifference(set1, set2)"], description: "Create the difference of two (multi)sets: every element of set1, that is not the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.", examples: ["setDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"], seealso: ["setUnion", "setIntersect", "setSymDifference"] }, setDistinct: { name: "setDistinct", category: "Set", syntax: ["setDistinct(set)"], description: "Collect the distinct elements of a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.", examples: ["setDistinct([1, 1, 1, 2, 2, 3])"], seealso: ["setMultiplicity"] }, setIntersect: { name: "setIntersect", category: "Set", syntax: ["setIntersect(set1, set2)"], description: "Create the intersection of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.", examples: ["setIntersect([1, 2, 3, 4], [3, 4, 5, 6])", "setIntersect([[1, 2], [3, 4]], [[3, 4], [5, 6]])"], seealso: ["setUnion", "setDifference"] }, setIsSubset: { name: "setIsSubset", category: "Set", syntax: ["setIsSubset(set1, set2)"], description: "Check whether a (multi)set is a subset of another (multi)set: every element of set1 is the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.", examples: ["setIsSubset([1, 2], [3, 4, 5, 6])", "setIsSubset([3, 4], [3, 4, 5, 6])"], seealso: ["setUnion", "setIntersect", "setDifference"] }, setMultiplicity: { name: "setMultiplicity", category: "Set", syntax: ["setMultiplicity(element, set)"], description: "Count the multiplicity of an element in a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.", examples: ["setMultiplicity(1, [1, 2, 2, 4])", "setMultiplicity(2, [1, 2, 2, 4])"], seealso: ["setDistinct", "setSize"] }, setPowerset: { name: "setPowerset", category: "Set", syntax: ["setPowerset(set)"], description: "Create the powerset of a (multi)set: the powerset contains very possible subsets of a (multi)set. A multi-dimension array will be converted to a single-dimension array before the operation.", examples: ["setPowerset([1, 2, 3])"], seealso: ["setCartesian"] }, setSize: { name: "setSize", category: "Set", syntax: ["setSize(set)", "setSize(set, unique)"], description: 'Count the number of elements of a (multi)set. When the second parameter "unique" is true, count only the unique values. A multi-dimension array will be converted to a single-dimension array before the operation.', examples: ["setSize([1, 2, 2, 4])", "setSize([1, 2, 2, 4], true)"], seealso: ["setUnion", "setIntersect", "setDifference"] }, setSymDifference: { name: "setSymDifference", category: "Set", syntax: ["setSymDifference(set1, set2)"], description: "Create the symmetric difference of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.", examples: ["setSymDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"], seealso: ["setUnion", "setIntersect", "setDifference"] }, setUnion: { name: "setUnion", category: "Set", syntax: ["setUnion(set1, set2)"], description: "Create the union of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.", examples: ["setUnion([1, 2, 3, 4], [3, 4, 5, 6])", "setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]])"], seealso: ["setIntersect", "setDifference"] }, erf: { name: "erf", category: "Special", syntax: ["erf(x)"], description: "Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x", examples: ["erf(0.2)", "erf(-0.5)", "erf(4)"], seealso: [] }, mad: { name: "mad", category: "Statistics", syntax: ["mad(a, b, c, ...)", "mad(A)"], description: "Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.", examples: ["mad(10, 20, 30)", "mad([1, 2, 3])"], seealso: ["mean", "median", "std", "abs"] }, max: { name: "max", category: "Statistics", syntax: ["max(a, b, c, ...)", "max(A)", "max(A, dim)"], description: "Compute the maximum value of a list of values.", examples: ["max(2, 3, 4, 1)", "max([2, 3, 4, 1])", "max([2, 5; 4, 3])", "max([2, 5; 4, 3], 1)", "max([2, 5; 4, 3], 2)", "max(2.7, 7.1, -4.5, 2.0, 4.1)", "min(2.7, 7.1, -4.5, 2.0, 4.1)"], seealso: ["mean", "median", "min", "prod", "std", "sum", "variance"] }, mean: { name: "mean", category: "Statistics", syntax: ["mean(a, b, c, ...)", "mean(A)", "mean(A, dim)"], description: "Compute the arithmetic mean of a list of values.", examples: ["mean(2, 3, 4, 1)", "mean([2, 3, 4, 1])", "mean([2, 5; 4, 3])", "mean([2, 5; 4, 3], 1)", "mean([2, 5; 4, 3], 2)", "mean([1.0, 2.7, 3.2, 4.0])"], seealso: ["max", "median", "min", "prod", "std", "sum", "variance"] }, median: { name: "median", category: "Statistics", syntax: ["median(a, b, c, ...)", "median(A)"], description: "Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.", examples: ["median(5, 2, 7)", "median([3, -1, 5, 7])"], seealso: ["max", "mean", "min", "prod", "std", "sum", "variance", "quantileSeq"] }, min: { name: "min", category: "Statistics", syntax: ["min(a, b, c, ...)", "min(A)", "min(A, dim)"], description: "Compute the minimum value of a list of values.", examples: ["min(2, 3, 4, 1)", "min([2, 3, 4, 1])", "min([2, 5; 4, 3])", "min([2, 5; 4, 3], 1)", "min([2, 5; 4, 3], 2)", "min(2.7, 7.1, -4.5, 2.0, 4.1)", "max(2.7, 7.1, -4.5, 2.0, 4.1)"], seealso: ["max", "mean", "median", "prod", "std", "sum", "variance"] }, mode: { name: "mode", category: "Statistics", syntax: ["mode(a, b, c, ...)", "mode(A)", "mode(A, a, b, B, c, ...)"], description: "Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.", examples: ["mode(2, 1, 4, 3, 1)", "mode([1, 2.7, 3.2, 4, 2.7])", "mode(1, 4, 6, 1, 6)"], seealso: ["max", "mean", "min", "median", "prod", "std", "sum", "variance"] }, prod: { name: "prod", category: "Statistics", syntax: ["prod(a, b, c, ...)", "prod(A)"], description: "Compute the product of all values.", examples: ["prod(2, 3, 4)", "prod([2, 3, 4])", "prod([2, 5; 4, 3])"], seealso: ["max", "mean", "min", "median", "min", "std", "sum", "variance"] }, quantileSeq: { name: "quantileSeq", category: "Statistics", syntax: ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"], description: "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.", examples: ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"], seealso: ["mean", "median", "min", "max", "prod", "std", "sum", "variance"] }, std: { name: "std", category: "Statistics", syntax: ["std(a, b, c, ...)", "std(A)", "std(A, normalization)"], description: 'Compute the standard deviation of all values, defined as std(A) = sqrt(variance(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".', examples: ["std(2, 4, 6)", "std([2, 4, 6, 8])", 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', "std([1, 2, 3; 4, 5, 6])"], seealso: ["max", "mean", "min", "median", "prod", "sum", "variance"] }, sum: { name: "sum", category: "Statistics", syntax: ["sum(a, b, c, ...)", "sum(A)"], description: "Compute the sum of all values.", examples: ["sum(2, 3, 4, 1)", "sum([2, 3, 4, 1])", "sum([2, 5; 4, 3])"], seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "variance"] }, variance: { name: "variance", category: "Statistics", syntax: ["variance(a, b, c, ...)", "variance(A)", "variance(A, normalization)"], description: 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".', examples: ["variance(2, 4, 6)", "variance([2, 4, 6, 8])", 'variance([2, 4, 6, 8], "uncorrected")', 'variance([2, 4, 6, 8], "biased")', "variance([1, 2, 3; 4, 5, 6])"], seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"] }, acos: { name: "acos", category: "Trigonometry", syntax: ["acos(x)"], description: "Compute the inverse cosine of a value in radians.", examples: ["acos(0.5)", "acos(cos(2.3))"], seealso: ["cos", "atan", "asin"] }, acosh: { name: "acosh", category: "Trigonometry", syntax: ["acosh(x)"], description: "Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.", examples: ["acosh(1.5)"], seealso: ["cosh", "asinh", "atanh"] }, acot: { name: "acot", category: "Trigonometry", syntax: ["acot(x)"], description: "Calculate the inverse cotangent of a value.", examples: ["acot(0.5)", "acot(cot(0.5))", "acot(2)"], seealso: ["cot", "atan"] }, acoth: { name: "acoth", category: "Trigonometry", syntax: ["acoth(x)"], description: "Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.", examples: ["acoth(2)", "acoth(0.5)"], seealso: ["acsch", "asech"] }, acsc: { name: "acsc", category: "Trigonometry", syntax: ["acsc(x)"], description: "Calculate the inverse cotangent of a value.", examples: ["acsc(2)", "acsc(csc(0.5))", "acsc(0.5)"], seealso: ["csc", "asin", "asec"] }, acsch: { name: "acsch", category: "Trigonometry", syntax: ["acsch(x)"], description: "Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.", examples: ["acsch(0.5)"], seealso: ["asech", "acoth"] }, asec: { name: "asec", category: "Trigonometry", syntax: ["asec(x)"], description: "Calculate the inverse secant of a value.", examples: ["asec(0.5)", "asec(sec(0.5))", "asec(2)"], seealso: ["acos", "acot", "acsc"] }, asech: { name: "asech", category: "Trigonometry", syntax: ["asech(x)"], description: "Calculate the inverse secant of a value.", examples: ["asech(0.5)"], seealso: ["acsch", "acoth"] }, asin: { name: "asin", category: "Trigonometry", syntax: ["asin(x)"], description: "Compute the inverse sine of a value in radians.", examples: ["asin(0.5)", "asin(sin(0.5))"], seealso: ["sin", "acos", "atan"] }, asinh: { name: "asinh", category: "Trigonometry", syntax: ["asinh(x)"], description: "Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.", examples: ["asinh(0.5)"], seealso: ["acosh", "atanh"] }, atan: { name: "atan", category: "Trigonometry", syntax: ["atan(x)"], description: "Compute the inverse tangent of a value in radians.", examples: ["atan(0.5)", "atan(tan(0.5))"], seealso: ["tan", "acos", "asin"] }, atanh: { name: "atanh", category: "Trigonometry", syntax: ["atanh(x)"], description: "Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.", examples: ["atanh(0.5)"], seealso: ["acosh", "asinh"] }, atan2: { name: "atan2", category: "Trigonometry", syntax: ["atan2(y, x)"], description: "Computes the principal value of the arc tangent of y/x in radians.", examples: ["atan2(2, 2) / pi", "angle = 60 deg in rad", "x = cos(angle)", "y = sin(angle)", "atan2(y, x)"], seealso: ["sin", "cos", "tan"] }, cos: { name: "cos", category: "Trigonometry", syntax: ["cos(x)"], description: "Compute the cosine of x in radians.", examples: ["cos(2)", "cos(pi / 4) ^ 2", "cos(180 deg)", "cos(60 deg)", "sin(0.2)^2 + cos(0.2)^2"], seealso: ["acos", "sin", "tan"] }, cosh: { name: "cosh", category: "Trigonometry", syntax: ["cosh(x)"], description: "Compute the hyperbolic cosine of x in radians.", examples: ["cosh(0.5)"], seealso: ["sinh", "tanh", "coth"] }, cot: { name: "cot", category: "Trigonometry", syntax: ["cot(x)"], description: "Compute the cotangent of x in radians. Defined as 1/tan(x)", examples: ["cot(2)", "1 / tan(2)"], seealso: ["sec", "csc", "tan"] }, coth: { name: "coth", category: "Trigonometry", syntax: ["coth(x)"], description: "Compute the hyperbolic cotangent of x in radians.", examples: ["coth(2)", "1 / tanh(2)"], seealso: ["sech", "csch", "tanh"] }, csc: { name: "csc", category: "Trigonometry", syntax: ["csc(x)"], description: "Compute the cosecant of x in radians. Defined as 1/sin(x)", examples: ["csc(2)", "1 / sin(2)"], seealso: ["sec", "cot", "sin"] }, csch: { name: "csch", category: "Trigonometry", syntax: ["csch(x)"], description: "Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)", examples: ["csch(2)", "1 / sinh(2)"], seealso: ["sech", "coth", "sinh"] }, sec: { name: "sec", category: "Trigonometry", syntax: ["sec(x)"], description: "Compute the secant of x in radians. Defined as 1/cos(x)", examples: ["sec(2)", "1 / cos(2)"], seealso: ["cot", "csc", "cos"] }, sech: { name: "sech", category: "Trigonometry", syntax: ["sech(x)"], description: "Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)", examples: ["sech(2)", "1 / cosh(2)"], seealso: ["coth", "csch", "cosh"] }, sin: { name: "sin", category: "Trigonometry", syntax: ["sin(x)"], description: "Compute the sine of x in radians.", examples: ["sin(2)", "sin(pi / 4) ^ 2", "sin(90 deg)", "sin(30 deg)", "sin(0.2)^2 + cos(0.2)^2"], seealso: ["asin", "cos", "tan"] }, sinh: { name: "sinh", category: "Trigonometry", syntax: ["sinh(x)"], description: "Compute the hyperbolic sine of x in radians.", examples: ["sinh(0.5)"], seealso: ["cosh", "tanh"] }, tan: { name: "tan", category: "Trigonometry", syntax: ["tan(x)"], description: "Compute the tangent of x in radians.", examples: ["tan(0.5)", "sin(0.5) / cos(0.5)", "tan(pi / 4)", "tan(45 deg)"], seealso: ["atan", "sin", "cos"] }, tanh: { name: "tanh", category: "Trigonometry", syntax: ["tanh(x)"], description: "Compute the hyperbolic tangent of x in radians.", examples: ["tanh(0.5)", "sinh(0.5) / cosh(0.5)"], seealso: ["sinh", "cosh"] }, to: { name: "to", category: "Units", syntax: ["x to unit", "to(x, unit)"], description: "Change the unit of a value.", examples: ["5 inch to cm", "3.2kg to g", "16 bytes in bits"], seealso: [] }, clone: { name: "clone", category: "Utils", syntax: ["clone(x)"], description: "Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices", examples: ["clone(3.5)", "clone(2 - 4i)", "clone(45 deg)", "clone([1, 2; 3, 4])", 'clone("hello world")'], seealso: [] }, format: { name: "format", category: "Utils", syntax: ["format(value)", "format(value, precision)"], description: "Format a value of any type as string.", examples: ["format(2.3)", "format(3 - 4i)", "format([])", "format(pi, 3)"], seealso: ["print"] }, bin: { name: "bin", category: "Utils", syntax: ["bin(value)"], description: "Format a number as binary", examples: ["bin(2)"], seealso: ["oct", "hex"] }, oct: { name: "oct", category: "Utils", syntax: ["oct(value)"], description: "Format a number as octal", examples: ["oct(56)"], seealso: ["bin", "hex"] }, hex: { name: "hex", category: "Utils", syntax: ["hex(value)"], description: "Format a number as hexadecimal", examples: ["hex(240)"], seealso: ["bin", "oct"] }, isNaN: { name: "isNaN", category: "Utils", syntax: ["isNaN(x)"], description: "Test whether a value is NaN (not a number)", examples: ["isNaN(2)", "isNaN(0 / 0)", "isNaN(NaN)", "isNaN(Infinity)"], seealso: ["isNegative", "isNumeric", "isPositive", "isZero"] }, isInteger: { name: "isInteger", category: "Utils", syntax: ["isInteger(x)"], description: "Test whether a value is an integer number.", examples: ["isInteger(2)", "isInteger(3.5)", "isInteger([3, 0.5, -2])"], seealso: ["isNegative", "isNumeric", "isPositive", "isZero"] }, isNegative: { name: "isNegative", category: "Utils", syntax: ["isNegative(x)"], description: "Test whether a value is negative: smaller than zero.", examples: ["isNegative(2)", "isNegative(0)", "isNegative(-4)", "isNegative([3, 0.5, -2])"], seealso: ["isInteger", "isNumeric", "isPositive", "isZero"] }, isNumeric: { name: "isNumeric", category: "Utils", syntax: ["isNumeric(x)"], description: "Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.", examples: ["isNumeric(2)", 'isNumeric("2")', 'hasNumericValue("2")', "isNumeric(0)", "isNumeric(bignumber(500))", "isNumeric(fraction(0.125))", "isNumeric(2 + 3i)", 'isNumeric([2.3, "foo", false])'], seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "hasNumericValue"] }, hasNumericValue: { name: "hasNumericValue", category: "Utils", syntax: ["hasNumericValue(x)"], description: "Test whether a value is an numeric value. In case of a string, true is returned if the string contains a numeric value.", examples: ["hasNumericValue(2)", 'hasNumericValue("2")', 'isNumeric("2")', "hasNumericValue(0)", "hasNumericValue(bignumber(500))", "hasNumericValue(fraction(0.125))", "hasNumericValue(2 + 3i)", 'hasNumericValue([2.3, "foo", false])'], seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "isNumeric"] }, isPositive: { name: "isPositive", category: "Utils", syntax: ["isPositive(x)"], description: "Test whether a value is positive: larger than zero.", examples: ["isPositive(2)", "isPositive(0)", "isPositive(-4)", "isPositive([3, 0.5, -2])"], seealso: ["isInteger", "isNumeric", "isNegative", "isZero"] }, isPrime: { name: "isPrime", category: "Utils", syntax: ["isPrime(x)"], description: "Test whether a value is prime: has no divisors other than itself and one.", examples: ["isPrime(3)", "isPrime(-2)", "isPrime([2, 17, 100])"], seealso: ["isInteger", "isNumeric", "isNegative", "isZero"] }, isZero: { name: "isZero", category: "Utils", syntax: ["isZero(x)"], description: "Test whether a value is zero.", examples: ["isZero(2)", "isZero(0)", "isZero(-4)", "isZero([3, 0, -2, 0])"], seealso: ["isInteger", "isNumeric", "isNegative", "isPositive"] }, typeOf: { name: "typeOf", category: "Utils", syntax: ["typeOf(x)"], description: "Get the type of a variable.", examples: ["typeOf(3.5)", "typeOf(2 - 4i)", "typeOf(45 deg)", 'typeOf("hello world")'], seealso: ["getMatrixDataType"] }, numeric: { name: "numeric", category: "Utils", syntax: ["numeric(x)"], description: "Convert a numeric input to a specific numeric type: number, BigNumber, or Fraction.", examples: ['numeric("4")', 'numeric("4", "number")', 'numeric("4", "BigNumber")', 'numeric("4", "Fraction)', 'numeric(4, "Fraction")', 'numeric(fraction(2, 5), "number)'], seealso: ["number", "fraction", "bignumber", "string", "format"] } },
            qu = Ke("help", ["typed", "mathWithTransform", "Help"], (function(e) {
                var t = e.typed,
                    r = e.mathWithTransform,
                    n = e.Help;
                return t("help", {
                    any: function(e) {
                        var t, i = e;
                        if ("string" != typeof e)
                            for (t in r)
                                if (Xe(r, t) && e === r[t]) { i = t; break }
                        var a = Si(zu, i);
                        if (!a) { var o = "function" == typeof i ? i.name : i; throw new Error('No documentation found on "' + o + '"') }
                        return new n(a)
                    }
                })
            })),
            Iu = Ke("chain", ["typed", "Chain"], (function(e) {
                var t = e.typed,
                    r = e.Chain;
                return t("chain", { "": function() { return new r }, any: function(e) { return new r(e) } })
            })),
            Bu = Ke("det", ["typed", "matrix", "subtract", "multiply", "unaryMinus", "lup"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.subtract,
                    i = e.multiply,
                    a = e.unaryMinus,
                    o = e.lup;
                return t("det", {
                    any: function(e) { return Ge(e) },
                    "Array | Matrix": function(e) {
                        var t;
                        switch ((t = p(e) ? e.size() : Array.isArray(e) ? (e = r(e)).size() : []).length) {
                            case 0:
                                return Ge(e);
                            case 1:
                                if (1 === t[0]) return Ge(e.valueOf()[0]);
                                throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                            case 2:
                                var s = t[0],
                                    u = t[1];
                                if (s === u) return function(e, t, r) {
                                    if (1 === t) return Ge(e[0][0]);
                                    if (2 === t) return n(i(e[0][0], e[1][1]), i(e[1][0], e[0][1]));
                                    for (var s = o(e), u = s.U[0][0], c = 1; c < t; c++) u = i(u, s.U[c][c]);
                                    for (var f = 0, l = 0, p = [];;) {
                                        for (; p[l];) l++;
                                        if (l >= t) break;
                                        for (var m = l, h = 0; !p[s.p[m]];) p[s.p[m]] = !0, m = s.p[m], h++;
                                        h % 2 == 0 && f++
                                    }
                                    return f % 2 == 0 ? u : a(u)
                                }(e.clone().valueOf(), s);
                                throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                            default:
                                throw new RangeError("Matrix must be two dimensional (size: " + xe(t) + ")")
                        }
                    }
                })
            })),
            ku = Ke("inv", ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.divideScalar,
                    i = e.addScalar,
                    a = e.multiply,
                    o = e.unaryMinus,
                    s = e.det,
                    u = e.identity,
                    c = e.abs;
                return t("inv", {
                    "Array | Matrix": function(e) {
                        var t = p(e) ? e.size() : Ee(e);
                        switch (t.length) {
                            case 1:
                                if (1 === t[0]) return p(e) ? r([n(1, e.valueOf()[0])]) : [n(1, e[0])];
                                throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                            case 2:
                                var i = t[0],
                                    a = t[1];
                                if (i === a) return p(e) ? r(f(e.valueOf(), i, a), e.storage()) : f(e, i, a);
                                throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                            default:
                                throw new RangeError("Matrix must be two dimensional (size: " + xe(t) + ")")
                        }
                    },
                    any: function(e) { return n(1, e) }
                });

                function f(e, t, r) {
                    var f, l, p, m, h;
                    if (1 === t) {
                        if (0 === (m = e[0][0])) throw Error("Cannot calculate inverse, determinant is zero");
                        return [
                            [n(1, m)]
                        ]
                    }
                    if (2 === t) {
                        var d = s(e);
                        if (0 === d) throw Error("Cannot calculate inverse, determinant is zero");
                        return [
                            [n(e[1][1], d), n(o(e[0][1]), d)],
                            [n(o(e[1][0]), d), n(e[0][0], d)]
                        ]
                    }
                    var y = e.concat();
                    for (f = 0; f < t; f++) y[f] = y[f].concat();
                    for (var g = u(t).valueOf(), v = 0; v < r; v++) {
                        var x = c(y[v][v]),
                            b = v;
                        for (f = v + 1; f < t;) c(y[f][v]) > x && (x = c(y[f][v]), b = f), f++;
                        if (0 === x) throw Error("Cannot calculate inverse, determinant is zero");
                        (f = b) !== v && (h = y[v], y[v] = y[f], y[f] = h, h = g[v], g[v] = g[f], g[f] = h);
                        var w = y[v],
                            N = g[v];
                        for (f = 0; f < t; f++) {
                            var M = y[f],
                                S = g[f];
                            if (f !== v) { if (0 !== M[v]) { for (p = n(o(M[v]), w[v]), l = v; l < r; l++) M[l] = i(M[l], a(p, w[l])); for (l = 0; l < r; l++) S[l] = i(S[l], a(p, N[l])) } } else { for (p = w[v], l = v; l < r; l++) M[l] = n(M[l], p); for (l = 0; l < r; l++) S[l] = n(S[l], p) }
                        }
                    }
                    return g
                }
            })),
            Du = Ke("eigs", ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "inv", "bignumber", "multiply", "add"], (function(e) {
                var t = e.config,
                    r = e.typed,
                    n = e.matrix,
                    i = e.addScalar,
                    a = e.subtract,
                    o = e.equal,
                    s = e.abs,
                    u = e.atan,
                    c = e.cos,
                    f = e.sin,
                    l = e.multiplyScalar,
                    p = e.inv,
                    m = e.bignumber,
                    h = e.multiply,
                    d = e.add;
                return r("eigs", {
                    Array: function(e) {
                        var t = n(e),
                            r = t.size();
                        if (2 !== r.length || r[0] !== r[1]) throw new RangeError("Matrix must be square (size: " + xe(r) + ")");
                        var i = y(t, r[0]);
                        return { values: i[0], vectors: i[1] }
                    },
                    Matrix: function(e) { var t = e.size(); if (2 !== t.length || t[0] !== t[1]) throw new RangeError("Matrix must be square (size: " + xe(t) + ")"); var r = y(e, t[0]); return { values: n(r[0]), vectors: n(r[1]) } }
                });

                function y(e, r) {
                    var n = e.datatype();
                    if (void 0 === n && (n = e.getDataType()), "number" !== n && "BigNumber" !== n && "Fraction" !== n) throw "mixed" === n ? new TypeError("Mixed matrix element type is not supported") : new TypeError("Matrix element type not supported (" + n + ")");
                    if (function(e, t) {
                            for (var r = 0; r < t; r++)
                                for (var n = r; n < t; n++)
                                    if (!o(e[r][n], e[n][r])) throw new TypeError("Input matrix is not symmetric")
                        }(e.toArray(), r), "number" === n) return g(e.toArray());
                    if ("Fraction" === n) {
                        for (var i = e.toArray(), a = 0; a < r; a++)
                            for (var u = a; u < r; u++) i[a][u] = i[a][u].valueOf(), i[u][a] = i[a][u];
                        return g(e.toArray())
                    }
                    return "BigNumber" === n ? function(e) {
                        for (var r, n = e.length, i = s(t.epsilon / n), a = new Array(n), o = 0; o < n; o++) a[o] = O(n, 0), a[o][o] = 1;
                        var u = E(e);
                        for (; s(u[1]) >= s(i);) {
                            var c = u[0][0],
                                f = u[0][1];
                            r = x(e[c][c], e[f][f], e[c][f]), e = N(e, r, c, f), a = w(a, r, c, f), u = E(e)
                        }
                        for (var l = O(n, 0), p = 0; p < n; p++) l[p] = e[p][p];
                        return A(Ge(l), Ge(a))
                    }(e.toArray()) : void 0
                }

                function g(e) {
                    for (var r, n = e.length, i = Math.abs(t.epsilon / n), a = new Array(n), o = 0; o < n; o++) a[o] = O(n, 0), a[o][o] = 1;
                    for (var s = S(e); Math.abs(s[1]) >= Math.abs(i);) {
                        var u = s[0][0],
                            c = s[0][1];
                        e = M(e, r = v(e[u][u], e[c][c], e[u][c]), u, c), a = b(a, r, u, c), s = S(e)
                    }
                    for (var f = O(n, 0), l = 0; l < n; l++) f[l] = e[l][l];
                    return A(Ge(f), Ge(a))
                }

                function v(e, r, n) { var i = r - e; return Math.abs(i) <= t.epsilon ? Math.PI / 4 : .5 * Math.atan(2 * n / (r - e)) }

                function x(e, r, n) { var i = a(r, e); return s(i) <= t.epsilon ? m(-1).acos().div(4) : l(.5, u(h(2, n, p(i)))) }

                function b(e, t, r, n) { for (var i = e.length, a = Math.cos(t), o = Math.sin(t), s = O(i, 0), u = O(i, 0), c = 0; c < i; c++) s[c] = a * e[c][r] - o * e[c][n], u[c] = o * e[c][r] + a * e[c][n]; for (var f = 0; f < i; f++) e[f][r] = s[f], e[f][n] = u[f]; return e }

                function w(e, t, r, n) { for (var o = e.length, s = c(t), u = f(t), p = O(o, m(0)), h = O(o, m(0)), d = 0; d < o; d++) p[d] = a(l(s, e[d][r]), l(u, e[d][n])), h[d] = i(l(u, e[d][r]), l(s, e[d][n])); for (var y = 0; y < o; y++) e[y][r] = p[y], e[y][n] = h[y]; return e }

                function N(e, t, r, n) {
                    for (var o = e.length, s = m(c(t)), u = m(f(t)), p = l(s, s), y = l(u, u), g = O(o, m(0)), v = O(o, m(0)), x = h(m(2), s, u, e[r][n]), b = i(a(l(p, e[r][r]), x), l(y, e[n][n])), w = d(l(y, e[r][r]), x, l(p, e[n][n])), N = 0; N < o; N++) g[N] = a(l(s, e[r][N]), l(u, e[n][N])), v[N] = i(l(u, e[r][N]), l(s, e[n][N]));
                    e[r][r] = b, e[n][n] = w, e[r][n] = m(0), e[n][r] = m(0);
                    for (var M = 0; M < o; M++) M !== r && M !== n && (e[r][M] = g[M], e[M][r] = g[M], e[n][M] = v[M], e[M][n] = v[M]);
                    return e
                }

                function M(e, t, r, n) {
                    for (var i = e.length, a = Math.cos(t), o = Math.sin(t), s = a * a, u = o * o, c = O(i, 0), f = O(i, 0), l = s * e[r][r] - 2 * a * o * e[r][n] + u * e[n][n], p = u * e[r][r] + 2 * a * o * e[r][n] + s * e[n][n], m = 0; m < i; m++) c[m] = a * e[r][m] - o * e[n][m], f[m] = o * e[r][m] + a * e[n][m];
                    e[r][r] = l, e[n][n] = p, e[r][n] = 0, e[n][r] = 0;
                    for (var h = 0; h < i; h++) h !== r && h !== n && (e[r][h] = c[h], e[h][r] = c[h], e[n][h] = f[h], e[h][n] = f[h]);
                    return e
                }

                function S(e) {
                    for (var t = e.length, r = 0, n = [0, 1], i = 0; i < t; i++)
                        for (var a = i + 1; a < t; a++) Math.abs(r) < Math.abs(e[i][a]) && (r = Math.abs(e[i][a]), n = [i, a]);
                    return [n, r]
                }

                function E(e) {
                    for (var t = e.length, r = 0, n = [0, 1], i = 0; i < t; i++)
                        for (var a = i + 1; a < t; a++) s(r) < s(e[i][a]) && (r = s(e[i][a]), n = [i, a]);
                    return [n, r]
                }

                function A(e, t) {
                    for (var r = e.length, n = Array(r), i = Array(r), a = 0; a < r; a++) i[a] = Array(r);
                    for (var o = 0; o < r; o++) {
                        for (var s = 0, u = e[0], c = 0; c < e.length; c++) e[c] < u && (u = e[s = c]);
                        n[o] = e.splice(s, 1)[0];
                        for (var f = 0; f < r; f++) i[f][o] = t[f][s], t[f].splice(s, 1)
                    }
                    return [Ge(n), Ge(i)]
                }

                function O(e, t) { for (var r = new Array(e), n = 0; n < e; n++) r[n] = t; return r }
            })),
            Ru = Ke("expm", ["typed", "abs", "add", "identity", "inv", "multiply"], (function(e) {
                var t = e.typed,
                    r = e.abs,
                    n = e.add,
                    i = e.identity,
                    a = e.inv,
                    o = e.multiply;
                return t("expm", {
                    Matrix: function(e) {
                        var t = e.size();
                        if (2 !== t.length || t[0] !== t[1]) throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                        for (var u = t[0], c = function(e, t) {
                                for (var r = 0; r < 30; r++)
                                    for (var n = 0; n <= r; n++) { var i = r - n; if (s(e, n, i) < t) return { q: n, j: i } }
                                throw new Error("Could not find acceptable parameters to compute the matrix exponential (try increasing maxSearchSize in expm.js)")
                            }(function(e) {
                                for (var t = e.size()[0], n = 0, i = 0; i < t; i++) {
                                    for (var a = 0, o = 0; o < t; o++) a += r(e.get([i, o]));
                                    n = Math.max(a, n)
                                }
                                return n
                            }(e), 1e-15), f = c.q, l = c.j, p = o(e, Math.pow(2, -l)), m = i(u), h = i(u), y = 1, g = p, v = -1, x = 1; x <= f; x++) x > 1 && (g = o(g, p), v = -v), m = n(m, o(y = y * (f - x + 1) / ((2 * f - x + 1) * x), g)), h = n(h, o(y * v, g));
                        for (var b = o(a(h), m), w = 0; w < l; w++) b = o(b, b);
                        return d(e) ? e.createSparseMatrix(b) : b
                    }
                });

                function s(e, t, r) { for (var n = 1, i = 2; i <= t; i++) n *= i; for (var a = n, o = t + 1; o <= 2 * t; o++) a *= o; var s = a * (2 * t + 1); return 8 * Math.pow(e / Math.pow(2, r), 2 * t) * n * n / (a * s) }
            })),
            Pu = Ke("sqrtm", ["typed", "abs", "add", "multiply", "sqrt", "subtract", "inv", "size", "max", "identity"], (function(e) {
                var t = e.typed,
                    r = e.abs,
                    n = e.add,
                    i = e.multiply,
                    a = e.sqrt,
                    o = e.subtract,
                    s = e.inv,
                    u = e.size,
                    c = e.max,
                    f = e.identity;

                function l(e) {
                    var t, a = 0,
                        l = e,
                        p = f(u(e));
                    do { var m = l; if (l = i(.5, n(m, s(p))), p = i(.5, n(p, s(m))), (t = c(r(o(l, m)))) > 1e-6 && ++a > 1e3) throw new Error("computing square root of matrix: iterative method could not converge") } while (t > 1e-6);
                    return l
                }
                return t("sqrtm", {
                    "Array | Matrix": function(e) {
                        var t = p(e) ? e.size() : Ee(e);
                        switch (t.length) {
                            case 1:
                                if (1 === t[0]) return a(e);
                                throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                            case 2:
                                if (t[0] === t[1]) return l(e);
                                throw new RangeError("Matrix must be square (size: " + xe(t) + ")");
                            default:
                                throw new RangeError("Matrix must be at most two dimensional (size: " + xe(t) + ")")
                        }
                    }
                })
            })),
            ju = Ke("divide", ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.multiply,
                    i = e.equalScalar,
                    a = e.divideScalar,
                    o = e.inv,
                    s = Or({ typed: t, equalScalar: i }),
                    u = Cr({ typed: t });
                return t("divide", Ze({ "Array | Matrix, Array | Matrix": function(e, t) { return n(e, o(t)) }, "DenseMatrix, any": function(e, t) { return u(e, t, a, !1) }, "SparseMatrix, any": function(e, t) { return s(e, t, a, !1) }, "Array, any": function(e, t) { return u(r(e), t, a, !1).valueOf() }, "any, Array | Matrix": function(e, t) { return n(e, o(t)) } }, a.signatures))
            })),
            Uu = Ke("distance", ["typed", "addScalar", "subtract", "divideScalar", "multiplyScalar", "unaryMinus", "sqrt", "abs"], (function(e) {
                var t = e.typed,
                    r = e.addScalar,
                    n = e.subtract,
                    i = e.multiplyScalar,
                    a = e.divideScalar,
                    s = e.unaryMinus,
                    u = e.sqrt,
                    c = e.abs;
                return t("distance", {
                    "Array, Array, Array": function(e, t, r) {
                        if (2 === e.length && 2 === t.length && 2 === r.length) {
                            if (!l(e)) throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
                            if (!l(t)) throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
                            if (!l(r)) throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
                            var o = a(n(r[1], r[0]), n(t[1], t[0])),
                                u = i(i(o, o), t[0]),
                                c = s(i(o, t[0])),
                                f = e[1];
                            return y(e[0], e[1], u, c, f)
                        }
                        throw new TypeError("Invalid Arguments: Try again")
                    },
                    "Object, Object, Object": function(e, t, r) {
                        if (2 === Object.keys(e).length && 2 === Object.keys(t).length && 2 === Object.keys(r).length) {
                            if (!l(e)) throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
                            if (!l(t)) throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers or BigNumbers");
                            if (!l(r)) throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers or BigNumbers");
                            if ("pointX" in e && "pointY" in e && "lineOnePtX" in t && "lineOnePtY" in t && "lineTwoPtX" in r && "lineTwoPtY" in r) {
                                var o = a(n(r.lineTwoPtY, r.lineTwoPtX), n(t.lineOnePtY, t.lineOnePtX)),
                                    u = i(i(o, o), t.lineOnePtX),
                                    c = s(i(o, t.lineOnePtX)),
                                    f = e.pointX;
                                return y(e.pointX, e.pointY, u, c, f)
                            }
                            throw new TypeError("Key names do not match")
                        }
                        throw new TypeError("Invalid Arguments: Try again")
                    },
                    "Array, Array": function(e, t) { if (2 === e.length && 3 === t.length) { if (!l(e)) throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument"); if (!p(t)) throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument"); return y(e[0], e[1], t[0], t[1], t[2]) } if (3 === e.length && 6 === t.length) { if (!p(e)) throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument"); if (!h(t)) throw new TypeError("Array with 6 numbers or BigNumbers expected for second argument"); return g(e[0], e[1], e[2], t[0], t[1], t[2], t[3], t[4], t[5]) } if (e.length === t.length && e.length > 0) { if (!m(e)) throw new TypeError("All values of an array should be numbers or BigNumbers"); if (!m(t)) throw new TypeError("All values of an array should be numbers or BigNumbers"); return v(e, t) } throw new TypeError("Invalid Arguments: Try again") },
                    "Object, Object": function(e, t) { if (2 === Object.keys(e).length && 3 === Object.keys(t).length) { if (!l(e)) throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers"); if (!p(t)) throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers or BigNumbers"); if ("pointX" in e && "pointY" in e && "xCoeffLine" in t && "yCoeffLine" in t && "constant" in t) return y(e.pointX, e.pointY, t.xCoeffLine, t.yCoeffLine, t.constant); throw new TypeError("Key names do not match") } if (3 === Object.keys(e).length && 6 === Object.keys(t).length) { if (!p(e)) throw new TypeError("Values of pointX, pointY and pointZ should be numbers or BigNumbers"); if (!h(t)) throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers or BigNumbers"); if ("pointX" in e && "pointY" in e && "x0" in t && "y0" in t && "z0" in t && "a" in t && "b" in t && "c" in t) return g(e.pointX, e.pointY, e.pointZ, t.x0, t.y0, t.z0, t.a, t.b, t.c); throw new TypeError("Key names do not match") } if (2 === Object.keys(e).length && 2 === Object.keys(t).length) { if (!l(e)) throw new TypeError("Values of pointOneX and pointOneY should be numbers or BigNumbers"); if (!l(t)) throw new TypeError("Values of pointTwoX and pointTwoY should be numbers or BigNumbers"); if ("pointOneX" in e && "pointOneY" in e && "pointTwoX" in t && "pointTwoY" in t) return v([e.pointOneX, e.pointOneY], [t.pointTwoX, t.pointTwoY]); throw new TypeError("Key names do not match") } if (3 === Object.keys(e).length && 3 === Object.keys(t).length) { if (!p(e)) throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers or BigNumbers"); if (!p(t)) throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers or BigNumbers"); if ("pointOneX" in e && "pointOneY" in e && "pointOneZ" in e && "pointTwoX" in t && "pointTwoY" in t && "pointTwoZ" in t) return v([e.pointOneX, e.pointOneY, e.pointOneZ], [t.pointTwoX, t.pointTwoY, t.pointTwoZ]); throw new TypeError("Key names do not match") } throw new TypeError("Invalid Arguments: Try again") },
                    Array: function(e) {
                        if (! function(e) { if (2 === e[0].length && f(e[0][0]) && f(e[0][1])) { if (e.some((function(e) { return 2 !== e.length || !f(e[0]) || !f(e[1]) }))) return !1 } else { if (!(3 === e[0].length && f(e[0][0]) && f(e[0][1]) && f(e[0][2]))) return !1; if (e.some((function(e) { return 3 !== e.length || !f(e[0]) || !f(e[1]) || !f(e[2]) }))) return !1 } return !0 }(e)) throw new TypeError("Incorrect array format entered for pairwise distance calculation");
                        return function(e) {
                            for (var t = [], r = [], n = [], i = 0; i < e.length - 1; i++)
                                for (var a = i + 1; a < e.length; a++) 2 === e[0].length ? (r = [e[i][0], e[i][1]], n = [e[a][0], e[a][1]]) : 3 === e[0].length && (r = [e[i][0], e[i][1], e[i][2]], n = [e[a][0], e[a][1], e[a][2]]), t.push(v(r, n));
                            return t
                        }(e)
                    }
                });

                function f(e) { return "number" == typeof e || o(e) }

                function l(e) { return e.constructor !== Array && (e = d(e)), f(e[0]) && f(e[1]) }

                function p(e) { return e.constructor !== Array && (e = d(e)), f(e[0]) && f(e[1]) && f(e[2]) }

                function m(e) { return Array.isArray(e) || (e = d(e)), e.every(f) }

                function h(e) { return e.constructor !== Array && (e = d(e)), f(e[0]) && f(e[1]) && f(e[2]) && f(e[3]) && f(e[4]) && f(e[5]) }

                function d(e) { for (var t = Object.keys(e), r = [], n = 0; n < t.length; n++) r.push(e[t[n]]); return r }

                function y(e, t, n, o, s) {
                    var f = c(r(r(i(n, e), i(o, t)), s)),
                        l = u(r(i(n, n), i(o, o)));
                    return a(f, l)
                }

                function g(e, t, o, s, c, f, l, p, m) {
                    var h = [n(i(n(c, t), m), i(n(f, o), p)), n(i(n(f, o), l), i(n(s, e), m)), n(i(n(s, e), p), i(n(c, t), l))];
                    h = u(r(r(i(h[0], h[0]), i(h[1], h[1])), i(h[2], h[2])));
                    var d = u(r(r(i(l, l), i(p, p)), i(m, m)));
                    return a(h, d)
                }

                function v(e, t) { for (var a = e.length, o = 0, s = 0, c = 0; c < a; c++) s = n(e[c], t[c]), o = r(i(s, s), o); return u(o) }
            })),
            Fu = Ke("intersect", ["typed", "config", "abs", "add", "addScalar", "matrix", "multiply", "multiplyScalar", "divideScalar", "subtract", "smaller", "equalScalar"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.abs,
                    i = e.add,
                    a = e.addScalar,
                    s = e.matrix,
                    u = e.multiply,
                    c = e.multiplyScalar,
                    f = e.divideScalar,
                    l = e.subtract,
                    p = e.smaller,
                    m = e.equalScalar;
                return t("intersect", {
                    "Array, Array, Array": function(e, t, r) {
                        if (!y(e)) throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
                        if (!y(t)) throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
                        if (! function(e) { return 4 === e.length && h(e[0]) && h(e[1]) && h(e[2]) && h(e[3]) }(r)) throw new TypeError("Array with 4 numbers expected as third argument");
                        return function(e, t, r, n, i, o, s, u, p, m) {
                            var h = c(e, s),
                                d = c(n, s),
                                y = c(t, u),
                                g = c(i, u),
                                v = c(r, p),
                                x = c(o, p),
                                b = f(l(l(l(m, h), y), v), l(l(l(a(a(d, g), x), h), y), v)),
                                w = a(e, c(b, l(n, e))),
                                N = a(t, c(b, l(i, t))),
                                M = a(r, c(b, l(o, r)));
                            return [w, N, M]
                        }(e[0], e[1], e[2], t[0], t[1], t[2], r[0], r[1], r[2], r[3])
                    },
                    "Array, Array, Array, Array": function(e, t, o, s) {
                        if (2 === e.length) {
                            if (!d(e)) throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
                            if (!d(t)) throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
                            if (!d(o)) throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
                            if (!d(s)) throw new TypeError("Array with 2 numbers or BigNumbers expected for fourth argument");
                            return function(e, t, o, s) {
                                var m = e,
                                    h = o,
                                    d = l(m, t),
                                    y = l(h, s),
                                    g = l(c(d[0], y[1]), c(y[0], d[1]));
                                if (p(n(g), r.epsilon)) return null;
                                var v = c(y[0], m[1]),
                                    x = c(y[1], m[0]),
                                    b = c(y[0], h[1]),
                                    w = c(y[1], h[0]),
                                    N = f(a(l(l(v, x), b), w), g);
                                return i(u(d, N), m)
                            }(e, t, o, s)
                        }
                        if (3 === e.length) { if (!y(e)) throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument"); if (!y(t)) throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument"); if (!y(o)) throw new TypeError("Array with 3 numbers or BigNumbers expected for third argument"); if (!y(s)) throw new TypeError("Array with 3 numbers or BigNumbers expected for fourth argument"); return h = e[0], v = e[1], x = e[2], b = t[0], w = t[1], N = t[2], M = o[0], S = o[1], E = o[2], A = s[0], O = s[1], C = s[2], _ = g(h, M, A, M, v, S, O, S, x, E, C, E), T = g(A, M, b, h, O, S, w, v, C, E, N, x), z = g(h, M, b, h, v, S, w, v, x, E, N, x), q = g(A, M, A, M, O, S, O, S, C, E, C, E), I = g(b, h, b, h, w, v, w, v, N, x, N, x), B = f(l(c(_, T), c(z, q)), l(c(I, q), c(T, T))), k = f(a(_, c(B, T)), q), D = a(h, c(B, l(b, h))), R = a(v, c(B, l(w, v))), P = a(x, c(B, l(N, x))), j = a(M, c(k, l(A, M))), U = a(S, c(k, l(O, S))), F = a(E, c(k, l(C, E))), m(D, j) && m(R, U) && m(P, F) ? [D, R, P] : null }
                        throw new TypeError("Arrays with two or thee dimensional points expected");
                        var h, v, x, b, w, N, M, S, E, A, O, C, _, T, z, q, I, B, k, D, R, P, j, U, F
                    },
                    "Matrix, Matrix, Matrix": function(e, t, r) { return s(this(e.valueOf(), t.valueOf(), r.valueOf())) },
                    "Matrix, Matrix, Matrix, Matrix": function(e, t, r, n) { return s(this(e.valueOf(), t.valueOf(), r.valueOf(), n.valueOf())) }
                });

                function h(e) { return "number" == typeof e || o(e) }

                function d(e) { return 2 === e.length && h(e[0]) && h(e[1]) }

                function y(e) { return 3 === e.length && h(e[0]) && h(e[1]) && h(e[2]) }

                function g(e, t, r, n, i, o, s, u, f, p, m, h) {
                    var d = c(l(e, t), l(r, n)),
                        y = c(l(i, o), l(s, u)),
                        g = c(l(f, p), l(m, h));
                    return a(a(d, y), g)
                }
            })),
            Lu = Ke("sum", ["typed", "config", "add", "numeric"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.add,
                    i = e.numeric;
                return t("sum", { "Array | Matrix": a, "Array | Matrix, number | BigNumber": function(e, t) { try { return Et(e, t, n) } catch (e) { throw Vi(e, "sum") } }, "...": function(e) { if (Nt(e)) throw new TypeError("Scalar values expected in function sum"); return a(e) } });

                function a(e) { var t; return Mt(e, (function(e) { try { t = void 0 === t ? e : n(t, e) } catch (t) { throw Vi(t, "sum", e) } })), void 0 === t && (t = i(0, r.number)), "string" == typeof t && (t = i(t, r.number)), t }
            })),
            Hu = Ke("mean", ["typed", "add", "divide"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.divide;
                return t("mean", {
                    "Array | Matrix": i,
                    "Array | Matrix, number | BigNumber": function(e, t) {
                        try {
                            var i = Et(e, t, r),
                                a = Array.isArray(e) ? Ee(e) : e.size();
                            return n(i, a[t])
                        } catch (e) { throw Vi(e, "mean") }
                    },
                    "...": function(e) { if (Nt(e)) throw new TypeError("Scalar values expected in function mean"); return i(e) }
                });

                function i(e) { var t, i = 0; if (Mt(e, (function(e) { try { t = void 0 === t ? e : r(t, e), i++ } catch (t) { throw Vi(t, "mean", e) } })), 0 === i) throw new Error("Cannot calculate the mean of an empty array"); return n(t, i) }
            })),
            $u = Ke("median", ["typed", "add", "divide", "compare", "partitionSelect"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.divide,
                    i = e.compare,
                    a = e.partitionSelect;

                function o(e) { try { var t = (e = Be(e.valueOf())).length; if (0 === t) throw new Error("Cannot calculate median of an empty array"); if (t % 2 == 0) { for (var r = t / 2 - 1, n = a(e, r + 1), o = e[r], c = 0; c < r; ++c) i(e[c], o) > 0 && (o = e[c]); return u(o, n) } var f = a(e, (t - 1) / 2); return s(f) } catch (e) { throw Vi(e, "median") } }
                var s = t({ "number | BigNumber | Complex | Unit": function(e) { return e } }),
                    u = t({ "number | BigNumber | Complex | Unit, number | BigNumber | Complex | Unit": function(e, t) { return n(r(e, t), 2) } });
                return t("median", { "Array | Matrix": o, "Array | Matrix, number | BigNumber": function(e, t) { throw new Error("median(A, dim) is not yet supported") }, "...": function(e) { if (Nt(e)) throw new TypeError("Scalar values expected in function median"); return o(e) } })
            })),
            Gu = Ke("mad", ["typed", "abs", "map", "median", "subtract"], (function(e) {
                var t = e.typed,
                    r = e.abs,
                    n = e.map,
                    i = e.median,
                    a = e.subtract;
                return t("mad", { "Array | Matrix": o, "...": function(e) { return o(e) } });

                function o(e) { if (0 === (e = Be(e.valueOf())).length) throw new Error("Cannot calculate median absolute deviation (mad) of an empty array"); try { var t = i(e); return i(n(e, (function(e) { return r(a(e, t)) }))) } catch (e) { throw e instanceof TypeError && -1 !== e.message.indexOf("median") ? new TypeError(e.message.replace("median", "mad")) : Vi(e, "mad") } }
            })),
            Vu = Ke("variance", ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.subtract,
                    i = e.multiply,
                    a = e.divide,
                    s = e.apply,
                    u = e.isNaN;
                return t("variance", { "Array | Matrix": function(e) { return c(e, "unbiased") }, "Array | Matrix, string": c, "Array | Matrix, number | BigNumber": function(e, t) { return f(e, t, "unbiased") }, "Array | Matrix, number | BigNumber, string": f, "...": function(e) { return c(e, "unbiased") } });

                function c(e, t) {
                    var s, c = 0;
                    if (0 === e.length) throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
                    if (Mt(e, (function(e) { try { s = void 0 === s ? e : r(s, e), c++ } catch (t) { throw Vi(t, "variance", e) } })), 0 === c) throw new Error("Cannot calculate variance of an empty array");
                    var f = a(s, c);
                    if (s = void 0, Mt(e, (function(e) {
                            var t = n(e, f);
                            s = void 0 === s ? i(t, t) : r(s, i(t, t))
                        })), u(s)) return s;
                    switch (t) {
                        case "uncorrected":
                            return a(s, c);
                        case "biased":
                            return a(s, c + 1);
                        case "unbiased":
                            var l = o(s) ? s.mul(0) : 0;
                            return 1 === c ? l : a(s, c - 1);
                        default:
                            throw new Error('Unknown normalization "' + t + '". Choose "unbiased" (default), "uncorrected", or "biased".')
                    }
                }

                function f(e, t, r) { try { if (0 === e.length) throw new SyntaxError("Function variance requires one or more parameters (0 provided)"); return s(e, t, (function(e) { return c(e, r) })) } catch (e) { throw Vi(e, "variance") } }
            })),
            Zu = Ke("quantileSeq", ["typed", "add", "multiply", "partitionSelect", "compare"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.multiply,
                    i = e.partitionSelect,
                    s = e.compare;

                function u(e, t, o) {
                    var u = Be(e),
                        f = u.length;
                    if (0 === f) throw new Error("Cannot calculate quantile of an empty sequence");
                    if (a(t)) {
                        var l = t * (f - 1),
                            p = l % 1;
                        if (0 === p) { var m = o ? u[l] : i(u, l); return c(m), m }
                        var h, d, y = Math.floor(l);
                        if (o) h = u[y], d = u[y + 1];
                        else { d = i(u, y + 1), h = u[y]; for (var g = 0; g < y; ++g) s(u[g], h) > 0 && (h = u[g]) }
                        return c(h), c(d), r(n(h, 1 - p), n(d, p))
                    }
                    var v = t.times(f - 1);
                    if (v.isInteger()) { v = v.toNumber(); var x = o ? u[v] : i(u, v); return c(x), x }
                    var b, w, N = v.floor(),
                        M = v.minus(N),
                        S = N.toNumber();
                    if (o) b = u[S], w = u[S + 1];
                    else { w = i(u, S + 1), b = u[S]; for (var E = 0; E < S; ++E) s(u[E], b) > 0 && (b = u[E]) }
                    c(b), c(w);
                    var A = new M.constructor(1);
                    return r(n(b, A.minus(M)), n(w, M))
                }
                var c = t({ "number | BigNumber | Unit": function(e) { return e } });
                return function(e, t, r) {
                    var n, i, s;
                    if (arguments.length < 2 || arguments.length > 3) throw new SyntaxError("Function quantileSeq requires two or three parameters");
                    if (m(e)) {
                        if ("boolean" == typeof(r = r || !1)) {
                            if (i = e.valueOf(), a(t)) {
                                if (t < 0) throw new Error("N/prob must be non-negative");
                                if (t <= 1) return u(i, t, r);
                                if (t > 1) {
                                    if (!V(t)) throw new Error("N must be a positive integer");
                                    var c = t + 1;
                                    n = new Array(t);
                                    for (var f = 0; f < t;) n[f] = u(i, ++f / c, r);
                                    return n
                                }
                            }
                            if (o(t)) {
                                var l = t.constructor;
                                if (t.isNegative()) throw new Error("N/prob must be non-negative");
                                if (s = new l(1), t.lte(s)) return new l(u(i, t, r));
                                if (t.gt(s)) {
                                    if (!t.isInteger()) throw new Error("N must be a positive integer");
                                    var p = t.toNumber();
                                    if (p > 4294967295) throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");
                                    var h = new l(p + 1);
                                    n = new Array(p);
                                    for (var d = 0; d < p;) n[d] = new l(u(i, new l(++d).div(h), r));
                                    return n
                                }
                            }
                            if (Array.isArray(t)) {
                                n = new Array(t.length);
                                for (var y = 0; y < n.length; ++y) {
                                    var g = t[y];
                                    if (a(g)) { if (g < 0 || g > 1) throw new Error("Probability must be between 0 and 1, inclusive") } else { if (!o(g)) throw new TypeError("Unexpected type of argument in function quantileSeq"); if (s = new g.constructor(1), g.isNegative() || g.gt(s)) throw new Error("Probability must be between 0 and 1, inclusive") }
                                    n[y] = u(i, g, r)
                                }
                                return n
                            }
                            throw new TypeError("Unexpected type of argument in function quantileSeq")
                        }
                        throw new TypeError("Unexpected type of argument in function quantileSeq")
                    }
                    throw new TypeError("Unexpected type of argument in function quantileSeq")
                }
            })),
            Wu = Ke("std", ["typed", "sqrt", "variance"], (function(e) {
                var t = e.typed,
                    r = e.sqrt,
                    n = e.variance;
                return t("std", { "Array | Matrix": i, "Array | Matrix, string": i, "Array | Matrix, number | BigNumber": i, "Array | Matrix, number | BigNumber, string": i, "...": function(e) { return i(e) } });

                function i(e, t) { if (0 === e.length) throw new SyntaxError("Function std requires one or more parameters (0 provided)"); try { return r(n.apply(null, arguments)) } catch (e) { throw e instanceof TypeError && -1 !== e.message.indexOf(" variance") ? new TypeError(e.message.replace(" variance", " std")) : e } }
            }));

        function Ju(e, t) { if (t < e) return 1; if (t === e) return t; var r = t + e >> 1; return Ju(e, r) * Ju(r + 1, t) }

        function Yu(e, t) { if (!V(e) || e < 0) throw new TypeError("Positive integer value expected in function combinations"); if (!V(t) || t < 0) throw new TypeError("Positive integer value expected in function combinations"); if (t > e) throw new TypeError("k must be less than or equal to n"); var r = e - t; return t < r ? Ju(r + 1, e) / Ju(1, t) : Ju(t + 1, e) / Ju(1, r) }
        Yu.signature = "number, number";
        var Xu = Ke("combinations", ["typed"], (function(e) {
            return (0, e.typed)("combinations", {
                "number, number": Yu,
                "BigNumber, BigNumber": function(e, t) {
                    var r, n, i = e.constructor,
                        a = e.minus(t),
                        o = new i(1);
                    if (!Qu(e) || !Qu(t)) throw new TypeError("Positive integer value expected in function combinations");
                    if (t.gt(e)) throw new TypeError("k must be less than n in function combinations");
                    if (r = o, t.lt(a))
                        for (n = o; n.lte(a); n = n.plus(o)) r = r.times(t.plus(n)).dividedBy(n);
                    else
                        for (n = o; n.lte(t); n = n.plus(o)) r = r.times(a.plus(n)).dividedBy(n);
                    return r
                }
            })
        }));

        function Qu(e) { return e.isInteger() && e.gte(0) }
        var Ku = Ke("combinationsWithRep", ["typed"], (function(e) {
            return (0, e.typed)("combinationsWithRep", {
                "number, number": function(e, t) { if (!V(e) || e < 0) throw new TypeError("Positive integer value expected in function combinationsWithRep"); if (!V(t) || t < 0) throw new TypeError("Positive integer value expected in function combinationsWithRep"); if (e < 1) throw new TypeError("k must be less than or equal to n + k - 1"); return t < e - 1 ? Ju(e, e + t - 1) / Ju(1, t) : Ju(t + 1, e + t - 1) / Ju(1, e - 1) },
                "BigNumber, BigNumber": function(e, t) {
                    var r, n, i = new(0, e.constructor)(1),
                        a = e.minus(i);
                    if (!ec(e) || !ec(t)) throw new TypeError("Positive integer value expected in function combinationsWithRep");
                    if (e.lt(i)) throw new TypeError("k must be less than or equal to n + k - 1 in function combinationsWithRep");
                    if (r = i, t.lt(a))
                        for (n = i; n.lte(a); n = n.plus(i)) r = r.times(t.plus(n)).dividedBy(n);
                    else
                        for (n = i; n.lte(t); n = n.plus(i)) r = r.times(a.plus(n)).dividedBy(n);
                    return r
                }
            })
        }));

        function ec(e) { return e.isInteger() && e.gte(0) }

        function tc(e) {
            var t;
            if (V(e)) return e <= 0 ? isFinite(e) ? 1 / 0 : NaN : e > 171 ? 1 / 0 : Ju(1, e - 1);
            if (e < .5) return Math.PI / (Math.sin(Math.PI * e) * tc(1 - e));
            if (e >= 171.35) return 1 / 0;
            if (e > 85) {
                var r = e * e,
                    n = r * e,
                    i = n * e,
                    a = i * e;
                return Math.sqrt(2 * Math.PI / e) * Math.pow(e / Math.E, e) * (1 + 1 / (12 * e) + 1 / (288 * r) - 139 / (51840 * n) - 571 / (2488320 * i) + 163879 / (209018880 * a) + 5246819 / (75246796800 * a * e))
            }--e, t = nc[0];
            for (var o = 1; o < nc.length; ++o) t += nc[o] / (e + o);
            var s = e + rc + .5;
            return Math.sqrt(2 * Math.PI) * Math.pow(s, e + .5) * Math.exp(-s) * t
        }
        tc.signature = "number";
        var rc = 4.7421875,
            nc = [.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22],
            ic = Ke("gamma", ["typed", "config", "multiplyScalar", "pow", "BigNumber", "Complex"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.multiplyScalar,
                    i = e.pow,
                    a = e.BigNumber,
                    o = e.Complex;
                return t("gamma", {
                    number: tc,
                    Complex: function(e) {
                        if (0 === e.im) return this(e.re);
                        e = new o(e.re - 1, e.im);
                        for (var t = new o(nc[0], 0), r = 1; r < nc.length; ++r) {
                            var a = e.re + r,
                                s = a * a + e.im * e.im;
                            0 !== s ? (t.re += nc[r] * a / s, t.im += -nc[r] * e.im / s) : t.re = nc[r] < 0 ? -1 / 0 : 1 / 0
                        }
                        var u = new o(e.re + rc + .5, e.im),
                            c = Math.sqrt(2 * Math.PI);
                        e.re += .5;
                        var f = i(u, e);
                        0 === f.im ? f.re *= c : (0 === f.re || (f.re *= c), f.im *= c);
                        var l = Math.exp(-u.re);
                        return u.re = l * Math.cos(-u.im), u.im = l * Math.sin(-u.im), n(n(f, u), t)
                    },
                    BigNumber: function(e) {
                        if (e.isInteger()) return e.isNegative() || e.isZero() ? new a(1 / 0) : function e(t) {
                            if (t < 8) return new a([1, 1, 2, 6, 24, 120, 720, 5040][t]);
                            var n = r.precision + (0 | Math.log(t.toNumber())),
                                i = a.clone({ precision: n });
                            if (t % 2 == 1) return t.times(e(new a(t - 1)));
                            var o = t,
                                s = new i(t),
                                u = t.toNumber();
                            for (; o > 2;) u += o -= 2, s = s.times(u);
                            return new a(s.toPrecision(a.precision))
                        }(e.minus(1));
                        if (!e.isFinite()) return new a(e.isNegative() ? NaN : 1 / 0);
                        throw new Error("Integer BigNumber expected")
                    },
                    "Array | Matrix": function(e) { return St(e, this) }
                })
            })),
            ac = Ke("factorial", ["typed", "gamma"], (function(e) {
                var t = e.typed,
                    r = e.gamma;
                return t("factorial", { number: function(e) { if (e < 0) throw new Error("Value must be non-negative"); return r(e + 1) }, BigNumber: function(e) { if (e.isNegative()) throw new Error("Value must be non-negative"); return r(e.plus(1)) }, "Array | Matrix": function(e) { return St(e, this) } })
            })),
            oc = Ke("kldivergence", ["typed", "matrix", "divide", "sum", "multiply", "dotDivide", "log", "isNumeric"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.divide,
                    i = e.sum,
                    a = e.multiply,
                    o = e.dotDivide,
                    s = e.log,
                    u = e.isNumeric;
                return t("kldivergence", { "Array, Array": function(e, t) { return c(r(e), r(t)) }, "Matrix, Array": function(e, t) { return c(e, r(t)) }, "Array, Matrix": function(e, t) { return c(r(e), t) }, "Matrix, Matrix": function(e, t) { return c(e, t) } });

                function c(e, t) {
                    var r = t.size().length,
                        c = e.size().length;
                    if (r > 1) throw new Error("first object must be one dimensional");
                    if (c > 1) throw new Error("second object must be one dimensional");
                    if (r !== c) throw new Error("Length of two vectors must be equal");
                    if (0 === i(e)) throw new Error("Sum of elements in first object must be non zero");
                    if (0 === i(t)) throw new Error("Sum of elements in second object must be non zero");
                    var f = n(e, i(e)),
                        l = n(t, i(t)),
                        p = i(a(f, s(o(f, l))));
                    return u(p) ? p : Number.NaN
                }
            })),
            sc = Ke("multinomial", ["typed", "add", "divide", "multiply", "factorial", "isInteger", "isPositive"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.divide,
                    i = e.multiply,
                    a = e.factorial,
                    o = e.isInteger,
                    s = e.isPositive;
                return t("multinomial", {
                    "Array | Matrix": function(e) {
                        var t = 0,
                            u = 1;
                        return Mt(e, (function(e) {
                            if (!o(e) || !s(e)) throw new TypeError("Positive integer value expected in function multinomial");
                            t = r(t, e), u = i(u, a(e))
                        })), n(a(t), u)
                    }
                })
            })),
            uc = Ke("permutations", ["typed", "factorial"], (function(e) { return (0, e.typed)("permutations", { "number | BigNumber": e.factorial, "number, number": function(e, t) { if (!V(e) || e < 0) throw new TypeError("Positive integer value expected in function permutations"); if (!V(t) || t < 0) throw new TypeError("Positive integer value expected in function permutations"); if (t > e) throw new TypeError("second argument k must be less than or equal to first argument n"); return Ju(e - t + 1, e) }, "BigNumber, BigNumber": function(e, t) { var r, n; if (!cc(e) || !cc(t)) throw new TypeError("Positive integer value expected in function permutations"); if (t.gt(e)) throw new TypeError("second argument k must be less than or equal to first argument n"); for (r = e.mul(0).add(1), n = e.minus(t).plus(1); n.lte(e); n = n.plus(1)) r = r.times(n); return r } }) }));

        function cc(e) { return e.isInteger() && e.gte(0) }
        var fc = r(9),
            lc = r.n(fc),
            pc = lc()(Date.now());

        function mc(e) {
            var t, r;
            return t = null === (r = e) ? pc : lc()(String(r)),
                function() { return t() }
        }
        var hc = Ke("pickRandom", ["typed", "config", "?on"], (function(e) {
            var t = e.typed,
                r = e.config,
                n = e.on,
                i = mc(r.randomSeed);
            return n && n("config", (function(e, t) { e.randomSeed !== t.randomSeed && (i = mc(e.randomSeed)) })), t({ "Array | Matrix": function(e) { return o(e, {}) }, "Array | Matrix, Object": function(e, t) { return o(e, t) }, "Array | Matrix, number": function(e, t) { return o(e, { number: t }) }, "Array | Matrix, Array | Matrix": function(e, t) { return o(e, { weights: t }) }, "Array | Matrix, Array | Matrix, number": function(e, t, r) { return o(e, { number: r, weights: t }) }, "Array | Matrix, number, Array | Matrix": function(e, t, r) { return o(e, { number: t, weights: r }) } });

            function o(e, t) {
                var r = t.number,
                    n = t.weights,
                    o = t.elementWise,
                    s = void 0 === o || o,
                    u = void 0 === r;
                u && (r = 1);
                var c = p(e) ? e.create : p(n) ? n.create : null;
                e = e.valueOf(), n && (n = n.valueOf()), !0 === s && (e = Be(e), n = Be(n));
                var f = 0;
                if (void 0 !== n) {
                    if (n.length !== e.length) throw new Error("Weights must have the same length as possibles");
                    for (var l = 0, m = n.length; l < m; l++) {
                        if (!a(n[l]) || n[l] < 0) throw new Error("Weights must be an array of positive numbers");
                        f += n[l]
                    }
                }
                for (var h, d = e.length, y = []; y.length < r;) {
                    if (void 0 === n) h = e[Math.floor(i() * d)];
                    else
                        for (var g = i() * f, v = 0, x = e.length; v < x; v++)
                            if ((g -= n[v]) < 0) { h = e[v]; break }
                    y.push(h)
                }
                return u ? y[0] : c ? c(y) : y
            }
        }));

        function dc(e, t) {
            var r = [];
            if ((e = e.slice(0)).length > 1)
                for (var n = 0, i = e.shift(); n < i; n++) r.push(dc(e, t));
            else
                for (var a = 0, o = e.shift(); a < o; a++) r.push(t());
            return r
        }
        var yc = Ke("random", ["typed", "config", "?on"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.on,
                    i = mc(r.randomSeed);
                return n && n("config", (function(e, t) { e.randomSeed !== t.randomSeed && (i = mc(e.randomSeed)) })), t("random", { "": function() { return o(0, 1) }, number: function(e) { return o(0, e) }, "number, number": function(e, t) { return o(e, t) }, "Array | Matrix": function(e) { return a(e, 0, 1) }, "Array | Matrix, number": function(e, t) { return a(e, 0, t) }, "Array | Matrix, number, number": function(e, t, r) { return a(e, t, r) } });

                function a(e, t, r) { var n = dc(e.valueOf(), (function() { return o(t, r) })); return p(e) ? e.create(n) : n }

                function o(e, t) { return e + i() * (t - e) }
            })),
            gc = Ke("randomInt", ["typed", "config", "?on"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.on,
                    i = mc(r.randomSeed);
                return n && n("config", (function(e, t) { e.randomSeed !== t.randomSeed && (i = mc(e.randomSeed)) })), t("randomInt", { "": function() { return o(0, 1) }, number: function(e) { return o(0, e) }, "number, number": function(e, t) { return o(e, t) }, "Array | Matrix": function(e) { return a(e, 0, 1) }, "Array | Matrix, number": function(e, t) { return a(e, 0, t) }, "Array | Matrix, number, number": function(e, t, r) { return a(e, t, r) } });

                function a(e, t, r) { var n = dc(e.valueOf(), (function() { return o(t, r) })); return p(e) ? e.create(n) : n }

                function o(e, t) { return Math.floor(e + i() * (t - e)) }
            })),
            vc = Ke("stirlingS2", ["typed", "addScalar", "subtract", "multiplyScalar", "divideScalar", "pow", "factorial", "combinations", "isNegative", "isInteger", "larger"], (function(e) {
                var t = e.typed,
                    r = e.addScalar,
                    n = e.subtract,
                    i = e.multiplyScalar,
                    a = e.divideScalar,
                    o = e.pow,
                    s = e.factorial,
                    u = e.combinations,
                    c = e.isNegative,
                    f = e.isInteger,
                    l = e.larger;
                return t("stirlingS2", {
                    "number | BigNumber, number | BigNumber": function(e, t) {
                        if (!f(e) || c(e) || !f(t) || c(t)) throw new TypeError("Non-negative integer value expected in function stirlingS2");
                        if (l(t, e)) throw new TypeError("k must be less than or equal to n in function stirlingS2");
                        for (var p = s(t), m = 0, h = 0; h <= t; h++) {
                            var d = o(-1, n(t, h)),
                                y = u(t, h),
                                g = o(h, e);
                            m = r(m, i(i(y, g), d))
                        }
                        return a(m, p)
                    }
                })
            })),
            xc = Ke("bellNumbers", ["typed", "addScalar", "isNegative", "isInteger", "stirlingS2"], (function(e) {
                var t = e.typed,
                    r = e.addScalar,
                    n = e.isNegative,
                    i = e.isInteger,
                    a = e.stirlingS2;
                return t("bellNumbers", { "number | BigNumber": function(e) { if (!i(e) || n(e)) throw new TypeError("Non-negative integer value expected in function bellNumbers"); for (var t = 0, o = 0; o <= e; o++) t = r(t, a(e, o)); return t } })
            })),
            bc = Ke("catalan", ["typed", "addScalar", "divideScalar", "multiplyScalar", "combinations", "isNegative", "isInteger"], (function(e) {
                var t = e.typed,
                    r = e.addScalar,
                    n = e.divideScalar,
                    i = e.multiplyScalar,
                    a = e.combinations,
                    o = e.isNegative,
                    s = e.isInteger;
                return t("catalan", { "number | BigNumber": function(e) { if (!s(e) || o(e)) throw new TypeError("Non-negative integer value expected in function catalan"); return n(a(i(e, 2), e), r(e, 1)) } })
            })),
            wc = Ke("composition", ["typed", "addScalar", "combinations", "isNegative", "isPositive", "isInteger", "larger"], (function(e) {
                var t = e.typed,
                    r = e.addScalar,
                    n = e.combinations,
                    i = e.isPositive,
                    a = (e.isNegative, e.isInteger),
                    o = e.larger;
                return t("composition", { "number | BigNumber, number | BigNumber": function(e, t) { if (!(a(e) && i(e) && a(t) && i(t))) throw new TypeError("Positive integer value expected in function composition"); if (o(t, e)) throw new TypeError("k must be less than or equal to n in function composition"); return n(r(e, -1), r(t, -1)) } })
            })),
            Nc = Ke("simplifyUtil", ["FunctionNode", "OperatorNode", "SymbolNode"], (function(e) {
                var t = e.FunctionNode,
                    r = e.OperatorNode,
                    n = e.SymbolNode,
                    i = { add: !0, multiply: !0 },
                    a = { add: !0, multiply: !0 };

                function o(e, t) { if (!P(e)) return !1; var r = e.fn.toString(); return t && Xe(t, r) && Xe(t[r], "associative") ? t[r].associative : a[r] || !1 }

                function s(e) {
                    var t, r = [];
                    return o(e) ? (t = e.op, function e(n) {
                        for (var i = 0; i < n.args.length; i++) {
                            var a = n.args[i];
                            P(a) && t === a.op ? e(a) : r.push(a)
                        }
                    }(e), r) : e.args
                }

                function u(e) { return P(e) ? function(t) { try { return new r(e.op, e.fn, t, e.implicit) } catch (e) { return console.error(e), [] } } : function(r) { return new t(new n(e.name), r) } }
                return {
                    createMakeNodeFunction: u,
                    isCommutative: function(e, t) { if (!P(e)) return !0; var r = e.fn.toString(); return t && Xe(t, r) && Xe(t[r], "commutative") ? t[r].commutative : i[r] || !1 },
                    isAssociative: o,
                    flatten: function e(t) {
                        if (!t.args || 0 === t.args.length) return t;
                        t.args = s(t);
                        for (var r = 0; r < t.args.length; r++) e(t.args[r])
                    },
                    allChildren: s,
                    unflattenr: function e(t) {
                        if (t.args && 0 !== t.args.length) {
                            for (var r = u(t), n = t.args.length, i = 0; i < n; i++) e(t.args[i]);
                            if (n > 2 && o(t)) {
                                for (var a = t.args.pop(); t.args.length > 0;) a = r([t.args.pop(), a]);
                                t.args = a.args
                            }
                        }
                    },
                    unflattenl: function e(t) {
                        if (t.args && 0 !== t.args.length) {
                            for (var r = u(t), n = t.args.length, i = 0; i < n; i++) e(t.args[i]);
                            if (n > 2 && o(t)) {
                                for (var a = t.args.shift(); t.args.length > 0;) a = r([a, t.args.shift()]);
                                t.args = a.args
                            }
                        }
                    }
                }
            })),
            Mc = Ke("simplifyCore", ["equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "ConstantNode", "OperatorNode", "FunctionNode", "ParenthesisNode"], (function(e) {
                var t = e.equal,
                    r = e.isZero,
                    n = e.add,
                    i = e.subtract,
                    a = e.multiply,
                    o = e.divide,
                    s = e.pow,
                    u = e.ConstantNode,
                    c = e.OperatorNode,
                    f = e.FunctionNode,
                    l = e.ParenthesisNode,
                    p = new u(0),
                    m = new u(1);
                return function e(h) {
                    if (P(h) && h.isUnary()) { var d = e(h.args[0]); if ("+" === h.op) return d; if ("-" === h.op) { if (P(d)) { if (d.isUnary() && "-" === d.op) return d.args[0]; if (d.isBinary() && "subtract" === d.fn) return new c("-", "subtract", [d.args[1], d.args[0]]) } return new c(h.op, h.fn, [d]) } } else if (P(h) && h.isBinary()) {
                        var y = e(h.args[0]),
                            g = e(h.args[1]);
                        if ("+" === h.op) { if (q(y)) { if (r(y.value)) return g; if (q(g)) return new u(n(y.value, g.value)) } return q(g) && r(g.value) ? y : P(g) && g.isUnary() && "-" === g.op ? new c("-", "subtract", [y, g.args[0]]) : new c(h.op, h.fn, g ? [y, g] : [y]) }
                        if ("-" === h.op) { if (q(y) && g) { if (q(g)) return new u(i(y.value, g.value)); if (r(y.value)) return new c("-", "unaryMinus", [g]) } if ("subtract" === h.fn) return q(g) && r(g.value) ? y : P(g) && g.isUnary() && "-" === g.op ? e(new c("+", "add", [y, g.args[0]])) : new c(h.op, h.fn, [y, g]) } else { if ("*" === h.op) { if (q(y)) { if (r(y.value)) return p; if (t(y.value, 1)) return g; if (q(g)) return new u(a(y.value, g.value)) } if (q(g)) { if (r(g.value)) return p; if (t(g.value, 1)) return y; if (P(y) && y.isBinary() && y.op === h.op) { var v = y.args[0]; if (q(v)) { var x = new u(a(v.value, g.value)); return new c(h.op, h.fn, [x, y.args[1]], h.implicit) } } return new c(h.op, h.fn, [g, y], h.implicit) } return new c(h.op, h.fn, [y, g], h.implicit) } if ("/" === h.op) { if (q(y)) { if (r(y.value)) return p; if (q(g) && (t(g.value, 1) || t(g.value, 2) || t(g.value, 4))) return new u(o(y.value, g.value)) } return new c(h.op, h.fn, [y, g]) } if ("^" === h.op) { if (q(g)) { if (r(g.value)) return m; if (t(g.value, 1)) return y; if (q(y)) return new u(s(y.value, g.value)); if (P(y) && y.isBinary() && "^" === y.op) { var b = y.args[1]; if (q(b)) return new c(h.op, h.fn, [y.args[0], new u(a(b.value, g.value))]) } } return new c(h.op, h.fn, [y, g]) } }
                    } else { if (j(h)) { var w = e(h.content); return j(w) || F(w) || q(w) ? w : new l(w) } if (B(h)) { var N = h.args.map(e).map((function(e) { return j(e) ? e.content : e })); return new f(e(h.fn), N) } }
                    return h
                }
            })),
            Sc = Ke("simplifyConstant", ["typed", "config", "mathWithTransform", "?fraction", "?bignumber", "ConstantNode", "OperatorNode", "FunctionNode", "SymbolNode"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.mathWithTransform,
                    i = e.fraction,
                    a = e.bignumber,
                    o = e.ConstantNode,
                    s = e.OperatorNode,
                    c = e.FunctionNode,
                    f = e.SymbolNode,
                    l = Nc({ FunctionNode: c, OperatorNode: s, SymbolNode: f }),
                    p = l.isCommutative,
                    m = l.isAssociative,
                    h = l.allChildren,
                    d = l.createMakeNodeFunction;

                function y(e, t, r) { try { return x(n[e].apply(null, t), r) } catch (i) { return t = t.map((function(e) { return u(e) ? e.valueOf() : e })), x(n[e].apply(null, t), r) } }
                var g = t({
                    Fraction: function(e) {
                        var t, r = e.s * e.n;
                        t = r < 0 ? new s("-", "unaryMinus", [new o(-r)]) : new o(r);
                        if (1 === e.d) return t;
                        return new s("/", "divide", [t, new o(e.d)])
                    },
                    number: function(e) { return e < 0 ? b(new o(-e)) : new o(e) },
                    BigNumber: function(e) { return e < 0 ? b(new o(-e)) : new o(e) },
                    Complex: function(e) { throw new Error("Cannot convert Complex number to Node") }
                });

                function v(e, t) {
                    if (t && !1 !== t.exactFractions && isFinite(e) && i) {
                        var r = i(e),
                            n = t && "number" == typeof t.fractionsLimit ? t.fractionsLimit : 1 / 0;
                        if (r.valueOf() === e && r.n < n && r.d < n) return r
                    }
                    return e
                }
                var x = t({ "string, Object": function(e, t) { return "BigNumber" === r.number ? (void 0 === a && li(), a(e)) : "Fraction" === r.number ? (void 0 === i && pi(), i(e)) : v(parseFloat(e), t) }, "Fraction, Object": function(e, t) { return e }, "BigNumber, Object": function(e, t) { return e }, "number, Object": function(e, t) { return v(e, t) }, "Complex, Object": function(e, t) { return 0 !== e.im ? e : v(e.re, t) } });

                function b(e) { return new s("-", "unaryMinus", [e]) }

                function w(e, t, r, n) {
                    return t.reduce((function(t, i) {
                        if (D(t) || D(i)) D(t) ? D(i) || (i = g(i)) : t = g(t);
                        else {
                            try { return y(e, [t, i], n) } catch (e) {}
                            t = g(t), i = g(i)
                        }
                        return r([t, i])
                    }))
                }
                return function(e, t) {
                    var r = function e(t, r) {
                        switch (t.type) {
                            case "SymbolNode":
                                return t;
                            case "ConstantNode":
                                return "number" != typeof t.value && isNaN(t.value) ? t : x(t.value, r);
                            case "FunctionNode":
                                if (n[t.name] && n[t.name].rawArgs) return t;
                                if (-1 === ["add", "multiply"].indexOf(t.name)) {
                                    var i = t.args.map((function(t) { return e(t, r) }));
                                    if (!i.some(D)) try { return y(t.name, i, r) } catch (e) {}
                                    return i = i.map((function(e) { return D(e) ? e : g(e) })), new c(t.name, i)
                                }
                            case "OperatorNode":
                                var a, o, s = t.fn.toString(),
                                    u = d(t);
                                if (P(t) && t.isUnary()) a = [e(t.args[0], r)], o = D(a[0]) ? u(a) : y(s, a, r);
                                else if (m(t))
                                    if (a = (a = h(t)).map((function(t) { return e(t, r) })), p(s)) {
                                        for (var f = [], l = [], v = 0; v < a.length; v++) D(a[v]) ? l.push(a[v]) : f.push(a[v]);
                                        f.length > 1 ? (o = w(s, f, u, r), l.unshift(o), o = w(s, l, u, r)) : o = w(s, a, u, r)
                                    } else o = w(s, a, u, r);
                                else a = t.args.map((function(t) { return e(t, r) })), o = w(s, a, u, r);
                                return o;
                            case "ParenthesisNode":
                                return e(t.content, r);
                            case "AccessorNode":
                            case "ArrayNode":
                            case "AssignmentNode":
                            case "BlockNode":
                            case "FunctionAssignmentNode":
                            case "IndexNode":
                            case "ObjectNode":
                            case "RangeNode":
                            case "ConditionalNode":
                            default:
                                throw new Error("Unimplemented node type in simplifyConstant: ".concat(t.type))
                        }
                    }(e, t);
                    return D(r) ? r : g(r)
                }
            })),
            Ec = Ke("resolve", ["parse", "FunctionNode", "OperatorNode", "ParenthesisNode"], (function(e) {
                var t = e.parse,
                    r = e.FunctionNode,
                    n = e.OperatorNode,
                    i = e.ParenthesisNode;
                return function e(a, o) { if (!o) return a; if (F(a)) { var s = o[a.name]; if (D(s)) return e(s, o); if ("number" == typeof s) return t(String(s)) } else { if (P(a)) { var u = a.args.map((function(t) { return e(t, o) })); return new n(a.op, a.fn, u, a.implicit) } if (j(a)) return new i(e(a.content, o)); if (B(a)) { var c = a.args.map((function(t) { return e(t, o) })); return new r(a.name, c) } } return a }
            }));

        function Ac(e) { return (Ac = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }
        var Oc = Ke("simplify", ["config", "typed", "parse", "add", "subtract", "multiply", "divide", "pow", "isZero", "equal", "?fraction", "?bignumber", "mathWithTransform", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], (function(e) {
                var t = e.config,
                    r = e.typed,
                    n = e.parse,
                    i = e.add,
                    a = e.subtract,
                    o = e.multiply,
                    s = e.divide,
                    u = e.pow,
                    c = e.isZero,
                    f = e.equal,
                    l = e.fraction,
                    p = e.bignumber,
                    m = e.mathWithTransform,
                    h = e.ConstantNode,
                    d = e.FunctionNode,
                    y = e.OperatorNode,
                    g = e.ParenthesisNode,
                    v = e.SymbolNode,
                    x = Sc({ typed: r, config: t, mathWithTransform: m, fraction: l, bignumber: p, ConstantNode: h, OperatorNode: y, FunctionNode: d, SymbolNode: v }),
                    b = Mc({ equal: f, isZero: c, add: i, subtract: a, multiply: o, divide: s, pow: u, ConstantNode: h, OperatorNode: y, FunctionNode: d, ParenthesisNode: g }),
                    w = Ec({ parse: n, FunctionNode: d, OperatorNode: y, ParenthesisNode: g }),
                    N = Nc({ FunctionNode: d, OperatorNode: y, SymbolNode: v }),
                    M = N.isCommutative,
                    S = N.isAssociative,
                    E = N.flatten,
                    A = N.unflattenr,
                    O = N.unflattenl,
                    C = N.createMakeNodeFunction,
                    _ = r("simplify", {
                        string: function(e) { return this(n(e), this.rules, {}, {}) },
                        "string, Object": function(e, t) { return this(n(e), this.rules, t, {}) },
                        "string, Object, Object": function(e, t, r) { return this(n(e), this.rules, t, r) },
                        "string, Array": function(e, t) { return this(n(e), t, {}, {}) },
                        "string, Array, Object": function(e, t, r) { return this(n(e), t, r, {}) },
                        "string, Array, Object, Object": function(e, t, r, i) { return this(n(e), t, r, i) },
                        "Node, Object": function(e, t) { return this(e, this.rules, t, {}) },
                        "Node, Object, Object": function(e, t, r) { return this(e, this.rules, t, r) },
                        Node: function(e) { return this(e, this.rules, {}, {}) },
                        "Node, Array": function(e, t) { return this(e, t, {}, {}) },
                        "Node, Array, Object": function(e, t, r) { return this(e, t, r, {}) },
                        "Node, Array, Object, Object": function(e, t, r, i) {
                            t = function(e) {
                                for (var t = [], r = 0; r < e.length; r++) {
                                    var i = e[r],
                                        a = void 0,
                                        o = Ac(i);
                                    switch (o) {
                                        case "string":
                                            var s = i.split("->");
                                            if (2 !== s.length) throw SyntaxError("Could not parse rule: " + i);
                                            i = { l: s[0], r: s[1] };
                                        case "object":
                                            if (a = { l: T(n(i.l)), r: T(n(i.r)) }, i.context && (a.evaluate = i.context), i.evaluate && (a.evaluate = n(i.evaluate)), S(a.l)) {
                                                var u = C(a.l),
                                                    c = new v("_p" + I++);
                                                a.expanded = {}, a.expanded.l = u([a.l.clone(), c]), E(a.expanded.l), A(a.expanded.l), a.expanded.r = u([a.r, c])
                                            }
                                            break;
                                        case "function":
                                            a = i;
                                            break;
                                        default:
                                            throw TypeError("Unsupported type of rule: " + o)
                                    }
                                    t.push(a)
                                }
                                return t
                            }(t);
                            for (var a = w(e, r), o = {}, s = (a = T(a)).toString({ parenthesis: "all" }); !o[s];) {
                                o[s] = !0, I = 0;
                                for (var u = 0; u < t.length; u++) "function" == typeof t[u] ? a = t[u](a, i) : (E(a), a = B(a, t[u])), O(a);
                                s = a.toString({ parenthesis: "all" })
                            }
                            return a
                        }
                    });

                function T(e) { return e.transform((function(e, t, r) { return j(e) ? T(e.content) : e })) }
                _.simplifyCore = b, _.resolve = w;
                var z = { true: !0, false: !0, e: !0, i: !0, Infinity: !0, LN2: !0, LN10: !0, LOG2E: !0, LOG10E: !0, NaN: !0, phi: !0, pi: !0, SQRT1_2: !0, SQRT2: !0, tau: !0 };
                _.rules = [b, { l: "log(e)", r: "1" }, { l: "n-n1", r: "n+-n1" }, { l: "-(c*v)", r: "(-c) * v" }, { l: "-v", r: "(-1) * v" }, { l: "n/n1^n2", r: "n*n1^-n2" }, { l: "n/n1", r: "n*n1^-1" }, { l: "(n ^ n1) ^ n2", r: "n ^ (n1 * n2)" }, { l: "n*n", r: "n^2" }, { l: "n * n^n1", r: "n^(n1+1)" }, { l: "n^n1 * n^n2", r: "n^(n1+n2)" }, { l: "n+n", r: "2*n" }, { l: "n+-n", r: "0" }, { l: "n1*n2 + n2", r: "(n1+1)*n2" }, { l: "n1*n3 + n2*n3", r: "(n1+n2)*n3" }, { l: "n1 + -1 * (n2 + n3)", r: "n1 + -1 * n2 + -1 * n3" }, x, { l: "(-n)*n1", r: "-(n*n1)" }, { l: "c+v", r: "v+c", context: { add: { commutative: !1 } } }, { l: "v*c", r: "c*v", context: { multiply: { commutative: !1 } } }, { l: "n+-n1", r: "n-n1" }, { l: "n*(n1^-1)", r: "n/n1" }, { l: "n*n1^-n2", r: "n/n1^n2" }, { l: "n1^-1", r: "1/n1" }, { l: "n*(n1/n2)", r: "(n*n1)/n2" }, { l: "n-(n1+n2)", r: "n-n1-n2" }, { l: "1*n", r: "n" }, { l: "n1/(n2/n3)", r: "(n1*n3)/n2" }];
                var I = 0;
                var B = r("applyRule", {
                    "Node, Object": function(e, t) {
                        var r = e;
                        if (r instanceof y || r instanceof d) {
                            if (r.args)
                                for (var n = 0; n < r.args.length; n++) r.args[n] = B(r.args[n], t)
                        } else r instanceof g && r.content && (r.content = B(r.content, t));
                        var i = t.r,
                            a = R(t.l, r)[0];
                        if (!a && t.expanded && (i = t.expanded.r, a = R(t.expanded.l, r)[0]), a) {
                            var o = r.implicit;
                            r = i.clone(), o && "implicit" in i && (r.implicit = !0), r = r.transform((function(e) { return e.isSymbolNode && Xe(a.placeholders, e.name) ? a.placeholders[e.name].clone() : e }))
                        }
                        return r
                    }
                });

                function k(e, t) {
                    var r = { placeholders: {} };
                    if (!e.placeholders && !t.placeholders) return r;
                    if (!e.placeholders) return t;
                    if (!t.placeholders) return e;
                    for (var n in e.placeholders)
                        if (Xe(e.placeholders, n) && (r.placeholders[n] = e.placeholders[n], Xe(t.placeholders, n) && !P(e.placeholders[n], t.placeholders[n]))) return null;
                    for (var i in t.placeholders) Xe(t.placeholders, i) && (r.placeholders[i] = t.placeholders[i]);
                    return r
                }

                function D(e, t) {
                    var r, n = [];
                    if (0 === e.length || 0 === t.length) return n;
                    for (var i = 0; i < e.length; i++)
                        for (var a = 0; a < t.length; a++)(r = k(e[i], t[a])) && n.push(r);
                    return n
                }

                function R(e, t, r) {
                    var n = [{ placeholders: {} }];
                    if (e instanceof y && t instanceof y || e instanceof d && t instanceof d) {
                        if (e instanceof y) { if (e.op !== t.op || e.fn !== t.fn) return [] } else if (e instanceof d && e.name !== t.name) return [];
                        if (!(1 === t.args.length && 1 === e.args.length || !S(t) && t.args.length === e.args.length || r)) {
                            if (t.args.length >= 2 && 2 === e.args.length) {
                                for (var i = function(e, t) {
                                        var r, n, i = [],
                                            a = C(e);
                                        if (M(e, t))
                                            for (var o = 0; o < e.args.length; o++)(n = e.args.slice(0)).splice(o, 1), r = 1 === n.length ? n[0] : a(n), i.push(a([e.args[o], r]));
                                        else r = 1 === (n = e.args.slice(1)).length ? n[0] : a(n), i.push(a([e.args[0], r]));
                                        return i
                                    }(t, e.context), a = [], o = 0; o < i.length; o++) {
                                    var s = R(e, i[o], !0);
                                    a = a.concat(s)
                                }
                                return a
                            }
                            if (e.args.length > 2) throw Error("Unexpected non-binary associative function: " + e.toString());
                            return []
                        }
                        for (var u = [], c = 0; c < e.args.length; c++) {
                            var l = R(e.args[c], t.args[c]);
                            if (0 === l.length) return [];
                            u.push(l)
                        }
                        n = function(e) {
                            if (0 === e.length) return e;
                            for (var t = e.reduce(D), r = [], n = {}, i = 0; i < t.length; i++) {
                                var a = JSON.stringify(t[i]);
                                n[a] || (n[a] = !0, r.push(t[i]))
                            }
                            return r
                        }(u)
                    } else if (e instanceof v) {
                        if (0 === e.name.length) throw new Error("Symbol in rule has 0 length...!?");
                        if (z[e.name]) { if (e.name !== t.name) return [] } else if ("n" === e.name[0] || "_p" === e.name.substring(0, 2)) n[0].placeholders[e.name] = t;
                        else if ("v" === e.name[0]) {
                            if (q(t)) return [];
                            n[0].placeholders[e.name] = t
                        } else {
                            if ("c" !== e.name[0]) throw new Error("Invalid symbol in rule: " + e.name);
                            if (!(t instanceof h)) return [];
                            n[0].placeholders[e.name] = t
                        }
                    } else { if (!(e instanceof h)) return []; if (!f(e.value, t.value)) return [] }
                    return n
                }

                function P(e, t) {
                    if (e instanceof h && t instanceof h) { if (!f(e.value, t.value)) return !1 } else if (e instanceof v && t instanceof v) { if (e.name !== t.name) return !1 } else {
                        if (!(e instanceof y && t instanceof y || e instanceof d && t instanceof d)) return !1;
                        if (e instanceof y) { if (e.op !== t.op || e.fn !== t.fn) return !1 } else if (e instanceof d && e.name !== t.name) return !1;
                        if (e.args.length !== t.args.length) return !1;
                        for (var r = 0; r < e.args.length; r++)
                            if (!P(e.args[r], t.args[r])) return !1
                    }
                    return !0
                }
                return _
            })),
            Cc = Ke("derivative", ["typed", "config", "parse", "simplify", "equal", "isZero", "numeric", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.parse,
                    i = e.simplify,
                    a = e.equal,
                    o = e.isZero,
                    s = e.numeric,
                    u = e.ConstantNode,
                    c = e.FunctionNode,
                    f = e.OperatorNode,
                    l = e.ParenthesisNode,
                    p = e.SymbolNode,
                    m = t("derivative", {
                        "Node, SymbolNode, Object": function(e, t, r) {
                            var n = {};
                            d(n, e, t.name);
                            var a = y(e, n);
                            return r.simplify ? i(a) : a
                        },
                        "Node, SymbolNode": function(e, t) { return this(e, t, { simplify: !0 }) },
                        "string, SymbolNode": function(e, t) { return this(n(e), t) },
                        "string, SymbolNode, Object": function(e, t, r) { return this(n(e), t, r) },
                        "string, string": function(e, t) { return this(n(e), n(t)) },
                        "string, string, Object": function(e, t, r) { return this(n(e), n(t), r) },
                        "Node, string": function(e, t) { return this(e, n(t)) },
                        "Node, string, Object": function(e, t, r) { return this(e, n(t), r) }
                    });
                m._simplify = !0, m.toTex = function(e) { return h.apply(null, e.args) };
                var h = t("_derivTex", { "Node, SymbolNode": function(e, t) { return q(e) && "string" === H(e.value) ? h(n(e.value).toString(), t.toString(), 1) : h(e.toString(), t.toString(), 1) }, "Node, ConstantNode": function(e, t) { if ("string" === H(t.value)) return h(e, n(t.value)); throw new Error("The second parameter to 'derivative' is a non-string constant") }, "Node, SymbolNode, ConstantNode": function(e, t, r) { return h(e.toString(), t.name, r.value) }, "string, string, number": function(e, t, r) { return (1 === r ? "{d\\over d" + t + "}" : "{d^{" + r + "}\\over d" + t + "^{" + r + "}}") + "\\left[".concat(e, "\\right]") } }),
                    d = t("constTag", { "Object, ConstantNode, string": function(e, t) { return e[t] = !0, !0 }, "Object, SymbolNode, string": function(e, t, r) { return t.name !== r && (e[t] = !0, !0) }, "Object, ParenthesisNode, string": function(e, t, r) { return d(e, t.content, r) }, "Object, FunctionAssignmentNode, string": function(e, t, r) { return -1 === t.params.indexOf(r) ? (e[t] = !0, !0) : d(e, t.expr, r) }, "Object, FunctionNode | OperatorNode, string": function(e, t, r) { if (t.args.length > 0) { for (var n = d(e, t.args[0], r), i = 1; i < t.args.length; ++i) n = d(e, t.args[i], r) && n; if (n) return e[t] = !0, !0 } return !1 } }),
                    y = t("_derivative", {
                        "ConstantNode, Object": function(e) { return g(0) },
                        "SymbolNode, Object": function(e, t) { return void 0 !== t[e] ? g(0) : g(1) },
                        "ParenthesisNode, Object": function(e, t) { return new l(y(e.content, t)) },
                        "FunctionAssignmentNode, Object": function(e, t) { return void 0 !== t[e] ? g(0) : y(e.expr, t) },
                        "FunctionNode, Object": function(e, t) {
                            if (1 !== e.args.length && function(e) { if (("log" === e.name || "nthRoot" === e.name || "pow" === e.name) && 2 === e.args.length) return; for (var t = 0; t < e.args.length; ++t) e.args[t] = g(0); throw e.compile().evaluate(), new Error("Expected TypeError, but none found") }(e), void 0 !== t[e]) return g(0);
                            var r, n, i, a, o = e.args[0],
                                s = !1,
                                u = !1;
                            switch (e.name) {
                                case "cbrt":
                                    s = !0, n = new f("*", "multiply", [g(3), new f("^", "pow", [o, new f("/", "divide", [g(2), g(3)])])]);
                                    break;
                                case "sqrt":
                                case "nthRoot":
                                    if (1 === e.args.length) s = !0, n = new f("*", "multiply", [g(2), new c("sqrt", [o])]);
                                    else if (2 === e.args.length) return t[r = new f("/", "divide", [g(1), e.args[1]])] = t[e.args[1]], y(new f("^", "pow", [o, r]), t);
                                    break;
                                case "log10":
                                    r = g(10);
                                case "log":
                                    if (r || 1 !== e.args.length) {
                                        if (1 === e.args.length && r || 2 === e.args.length && void 0 !== t[e.args[1]]) n = new f("*", "multiply", [o.clone(), new c("log", [r || e.args[1]])]), s = !0;
                                        else if (2 === e.args.length) return y(new f("/", "divide", [new c("log", [o]), new c("log", [e.args[1]])]), t)
                                    } else n = o.clone(), s = !0;
                                    break;
                                case "pow":
                                    return t[r] = t[e.args[1]], y(new f("^", "pow", [o, e.args[1]]), t);
                                case "exp":
                                    n = new c("exp", [o.clone()]);
                                    break;
                                case "sin":
                                    n = new c("cos", [o.clone()]);
                                    break;
                                case "cos":
                                    n = new f("-", "unaryMinus", [new c("sin", [o.clone()])]);
                                    break;
                                case "tan":
                                    n = new f("^", "pow", [new c("sec", [o.clone()]), g(2)]);
                                    break;
                                case "sec":
                                    n = new f("*", "multiply", [e, new c("tan", [o.clone()])]);
                                    break;
                                case "csc":
                                    u = !0, n = new f("*", "multiply", [e, new c("cot", [o.clone()])]);
                                    break;
                                case "cot":
                                    u = !0, n = new f("^", "pow", [new c("csc", [o.clone()]), g(2)]);
                                    break;
                                case "asin":
                                    s = !0, n = new c("sqrt", [new f("-", "subtract", [g(1), new f("^", "pow", [o.clone(), g(2)])])]);
                                    break;
                                case "acos":
                                    s = !0, u = !0, n = new c("sqrt", [new f("-", "subtract", [g(1), new f("^", "pow", [o.clone(), g(2)])])]);
                                    break;
                                case "atan":
                                    s = !0, n = new f("+", "add", [new f("^", "pow", [o.clone(), g(2)]), g(1)]);
                                    break;
                                case "asec":
                                    s = !0, n = new f("*", "multiply", [new c("abs", [o.clone()]), new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [o.clone(), g(2)]), g(1)])])]);
                                    break;
                                case "acsc":
                                    s = !0, u = !0, n = new f("*", "multiply", [new c("abs", [o.clone()]), new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [o.clone(), g(2)]), g(1)])])]);
                                    break;
                                case "acot":
                                    s = !0, u = !0, n = new f("+", "add", [new f("^", "pow", [o.clone(), g(2)]), g(1)]);
                                    break;
                                case "sinh":
                                    n = new c("cosh", [o.clone()]);
                                    break;
                                case "cosh":
                                    n = new c("sinh", [o.clone()]);
                                    break;
                                case "tanh":
                                    n = new f("^", "pow", [new c("sech", [o.clone()]), g(2)]);
                                    break;
                                case "sech":
                                    u = !0, n = new f("*", "multiply", [e, new c("tanh", [o.clone()])]);
                                    break;
                                case "csch":
                                    u = !0, n = new f("*", "multiply", [e, new c("coth", [o.clone()])]);
                                    break;
                                case "coth":
                                    u = !0, n = new f("^", "pow", [new c("csch", [o.clone()]), g(2)]);
                                    break;
                                case "asinh":
                                    s = !0, n = new c("sqrt", [new f("+", "add", [new f("^", "pow", [o.clone(), g(2)]), g(1)])]);
                                    break;
                                case "acosh":
                                    s = !0, n = new c("sqrt", [new f("-", "subtract", [new f("^", "pow", [o.clone(), g(2)]), g(1)])]);
                                    break;
                                case "atanh":
                                    s = !0, n = new f("-", "subtract", [g(1), new f("^", "pow", [o.clone(), g(2)])]);
                                    break;
                                case "asech":
                                    s = !0, u = !0, n = new f("*", "multiply", [o.clone(), new c("sqrt", [new f("-", "subtract", [g(1), new f("^", "pow", [o.clone(), g(2)])])])]);
                                    break;
                                case "acsch":
                                    s = !0, u = !0, n = new f("*", "multiply", [new c("abs", [o.clone()]), new c("sqrt", [new f("+", "add", [new f("^", "pow", [o.clone(), g(2)]), g(1)])])]);
                                    break;
                                case "acoth":
                                    s = !0, u = !0, n = new f("-", "subtract", [g(1), new f("^", "pow", [o.clone(), g(2)])]);
                                    break;
                                case "abs":
                                    n = new f("/", "divide", [new c(new p("abs"), [o.clone()]), o.clone()]);
                                    break;
                                case "gamma":
                                default:
                                    throw new Error('Function "' + e.name + '" is not supported by derivative, or a wrong number of arguments is passed')
                            }
                            s ? (i = "/", a = "divide") : (i = "*", a = "multiply");
                            var l = y(o, t);
                            return u && (l = new f("-", "unaryMinus", [l])), new f(i, a, [l, n])
                        },
                        "OperatorNode, Object": function(e, t) {
                            if (void 0 !== t[e]) return g(0);
                            if ("+" === e.op) return new f(e.op, e.fn, e.args.map((function(e) { return y(e, t) })));
                            if ("-" === e.op) { if (e.isUnary()) return new f(e.op, e.fn, [y(e.args[0], t)]); if (e.isBinary()) return new f(e.op, e.fn, [y(e.args[0], t), y(e.args[1], t)]) }
                            if ("*" === e.op) {
                                var r = e.args.filter((function(e) { return void 0 !== t[e] }));
                                if (r.length > 0) {
                                    var n = e.args.filter((function(e) { return void 0 === t[e] })),
                                        i = 1 === n.length ? n[0] : new f("*", "multiply", n),
                                        s = r.concat(y(i, t));
                                    return new f("*", "multiply", s)
                                }
                                return new f("+", "add", e.args.map((function(r) { return new f("*", "multiply", e.args.map((function(e) { return e === r ? y(e, t) : e.clone() }))) })))
                            }
                            if ("/" === e.op && e.isBinary()) {
                                var u = e.args[0],
                                    l = e.args[1];
                                return void 0 !== t[l] ? new f("/", "divide", [y(u, t), l]) : void 0 !== t[u] ? new f("*", "multiply", [new f("-", "unaryMinus", [u]), new f("/", "divide", [y(l, t), new f("^", "pow", [l.clone(), g(2)])])]) : new f("/", "divide", [new f("-", "subtract", [new f("*", "multiply", [y(u, t), l.clone()]), new f("*", "multiply", [u.clone(), y(l, t)])]), new f("^", "pow", [l.clone(), g(2)])])
                            }
                            if ("^" === e.op && e.isBinary()) {
                                var p = e.args[0],
                                    m = e.args[1];
                                if (void 0 !== t[p]) return q(p) && (o(p.value) || a(p.value, 1)) ? g(0) : new f("*", "multiply", [e, new f("*", "multiply", [new c("log", [p.clone()]), y(m.clone(), t)])]);
                                if (void 0 !== t[m]) { if (q(m)) { if (o(m.value)) return g(0); if (a(m.value, 1)) return y(p, t) } var h = new f("^", "pow", [p.clone(), new f("-", "subtract", [m, g(1)])]); return new f("*", "multiply", [m.clone(), new f("*", "multiply", [y(p, t), h])]) }
                                return new f("*", "multiply", [new f("^", "pow", [p.clone(), m.clone()]), new f("+", "add", [new f("*", "multiply", [y(p, t), new f("/", "divide", [m.clone(), p.clone()])]), new f("*", "multiply", [y(m, t), new c("log", [p.clone()])])])])
                            }
                            throw new Error('Operator "' + e.op + '" is not supported by derivative, or a wrong number of arguments is passed')
                        }
                    });

                function g(e, t) { return new u(s(e, t || r.number)) }
                return m
            })),
            _c = Ke("rationalize", ["config", "typed", "equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "parse", "simplify", "?bignumber", "?fraction", "mathWithTransform", "ConstantNode", "OperatorNode", "FunctionNode", "SymbolNode", "ParenthesisNode"], (function(e) {
                var t = e.config,
                    r = e.typed,
                    n = e.equal,
                    i = e.isZero,
                    a = e.add,
                    o = e.subtract,
                    s = e.multiply,
                    u = e.divide,
                    c = e.pow,
                    f = e.parse,
                    l = e.simplify,
                    p = e.fraction,
                    m = e.bignumber,
                    h = e.mathWithTransform,
                    d = e.ConstantNode,
                    y = e.OperatorNode,
                    g = e.FunctionNode,
                    v = e.SymbolNode,
                    x = e.ParenthesisNode,
                    b = Sc({ typed: r, config: t, mathWithTransform: h, fraction: p, bignumber: m, ConstantNode: d, OperatorNode: y, FunctionNode: g, SymbolNode: v }),
                    w = Mc({ equal: n, isZero: i, add: a, subtract: o, multiply: s, divide: u, pow: c, ConstantNode: d, OperatorNode: y, FunctionNode: g, ParenthesisNode: x });
                return r("rationalize", {
                    string: function(e) { return this(f(e), {}, !1) },
                    "string, boolean": function(e, t) { return this(f(e), {}, t) },
                    "string, Object": function(e, t) { return this(f(e), t, !1) },
                    "string, Object, boolean": function(e, t, r) { return this(f(e), t, r) },
                    Node: function(e) { return this(e, {}, !1) },
                    "Node, boolean": function(e, t) { return this(e, {}, t) },
                    "Node, Object": function(e, t) { return this(e, t, !1) },
                    "Node, Object, boolean": function(e, t, r) {
                        var n = function() {
                                var e = [w, { l: "n+n", r: "2*n" }, { l: "n+-n", r: "0" }, b, { l: "n*(n1^-1)", r: "n/n1" }, { l: "n*n1^-n2", r: "n/n1^n2" }, { l: "n1^-1", r: "1/n1" }, { l: "n*(n1/n2)", r: "(n*n1)/n2" }, { l: "1*n", r: "n" }],
                                    t = [{ l: "(-n1)/(-n2)", r: "n1/n2" }, { l: "(-n1)*(-n2)", r: "n1*n2" }, { l: "n1--n2", r: "n1+n2" }, { l: "n1-n2", r: "n1+(-n2)" }, { l: "(n1+n2)*n3", r: "(n1*n3 + n2*n3)" }, { l: "n1*(n2+n3)", r: "(n1*n2+n1*n3)" }, { l: "c1*n + c2*n", r: "(c1+c2)*n" }, { l: "c1*n + n", r: "(c1+1)*n" }, { l: "c1*n - c2*n", r: "(c1-c2)*n" }, { l: "c1*n - n", r: "(c1-1)*n" }, { l: "v/c", r: "(1/c)*v" }, { l: "v/-c", r: "-(1/c)*v" }, { l: "-v*-c", r: "c*v" }, { l: "-v*c", r: "-c*v" }, { l: "v*-c", r: "-c*v" }, { l: "v*c", r: "c*v" }, { l: "-(-n1*n2)", r: "(n1*n2)" }, { l: "-(n1*n2)", r: "(-n1*n2)" }, { l: "-(-n1+n2)", r: "(n1-n2)" }, { l: "-(n1+n2)", r: "(-n1-n2)" }, { l: "(n1^n2)^n3", r: "(n1^(n2*n3))" }, { l: "-(-n1/n2)", r: "(n1/n2)" }, { l: "-(n1/n2)", r: "(-n1/n2)" }],
                                    r = [{ l: "(n1/(n2/n3))", r: "((n1*n3)/n2)" }, { l: "(n1/n2/n3)", r: "(n1/(n2*n3))" }],
                                    n = {};
                                return n.firstRules = e.concat(t, r), n.distrDivRules = [{ l: "(n1/n2 + n3/n4)", r: "((n1*n4 + n3*n2)/(n2*n4))" }, { l: "(n1/n2 + n3)", r: "((n1 + n3*n2)/n2)" }, { l: "(n1 + n2/n3)", r: "((n1*n3 + n2)/n3)" }], n.sucDivRules = r, n.firstRulesAgain = e.concat(t), n.finalRules = [w, { l: "n*-n", r: "-n^2" }, { l: "n*n", r: "n^2" }, b, { l: "n*-n^n1", r: "-n^(n1+1)" }, { l: "n*n^n1", r: "n^(n1+1)" }, { l: "n^n1*-n^n2", r: "-n^(n1+n2)" }, { l: "n^n1*n^n2", r: "n^(n1+n2)" }, { l: "n^n1*-n", r: "-n^(n1+1)" }, { l: "n^n1*n", r: "n^(n1+1)" }, { l: "n^n1/-n", r: "-n^(n1-1)" }, { l: "n^n1/n", r: "n^(n1-1)" }, { l: "n/-n^n1", r: "-n^(1-n1)" }, { l: "n/n^n1", r: "n^(1-n1)" }, { l: "n^n1/-n^n2", r: "n^(n1-n2)" }, { l: "n^n1/n^n2", r: "n^(n1-n2)" }, { l: "n1+(-n2*n3)", r: "n1-n2*n3" }, { l: "v*(-c)", r: "-c*v" }, { l: "n1+-n2", r: "n1-n2" }, { l: "v*c", r: "c*v" }, { l: "(n1^n2)^n3", r: "(n1^(n2*n3))" }], n
                            }(),
                            i = function(e, t, r, n) {
                                var i = [],
                                    a = l(e, n, t, { exactFractions: !1 }),
                                    o = "+-*" + ((r = !!r) ? "/" : "");
                                ! function e(t) {
                                    var r = t.type;
                                    if ("FunctionNode" === r) throw new Error("There is an unsolved function call");
                                    if ("OperatorNode" === r)
                                        if ("^" === t.op) {
                                            if ("ConstantNode" !== t.args[1].type || !V(parseFloat(t.args[1].value))) throw new Error("There is a non-integer exponent");
                                            e(t.args[0])
                                        } else { if (-1 === o.indexOf(t.op)) throw new Error("Operator " + t.op + " invalid in polynomial expression"); for (var n = 0; n < t.args.length; n++) e(t.args[n]) }
                                    else if ("SymbolNode" === r) { var a = t.name; - 1 === i.indexOf(a) && i.push(a) } else if ("ParenthesisNode" === r) e(t.content);
                                    else if ("ConstantNode" !== r) throw new Error("type " + r + " is not allowed in polynomial expression")
                                }(a);
                                var s = {};
                                return s.expression = a, s.variables = i, s
                            }(e, t, !0, n.firstRules),
                            a = i.variables.length;
                        if (e = i.expression, a >= 1) {
                            var o, s;
                            e = function e(t, r, n) {
                                var i = t.type,
                                    a = arguments.length > 1;
                                if ("OperatorNode" === i && t.isBinary()) {
                                    var o, s = !1;
                                    if ("^" === t.op && ("ParenthesisNode" !== t.args[0].type && "OperatorNode" !== t.args[0].type || "ConstantNode" !== t.args[1].type || (o = parseFloat(t.args[1].value), s = o >= 2 && V(o))), s) {
                                        if (o > 2) {
                                            var u = t.args[0],
                                                c = new y("^", "pow", [t.args[0].cloneDeep(), new d(o - 1)]);
                                            t = new y("*", "multiply", [u, c])
                                        } else t = new y("*", "multiply", [t.args[0], t.args[0].cloneDeep()]);
                                        a && ("content" === n ? r.content = t : r.args[n] = t)
                                    }
                                }
                                if ("ParenthesisNode" === i) e(t.content, t, "content");
                                else if ("ConstantNode" !== i && "SymbolNode" !== i)
                                    for (var f = 0; f < t.args.length; f++) e(t.args[f], t, f);
                                if (!a) return t
                            }(e);
                            var u, c = !0,
                                f = !1;
                            for (e = l(e, n.firstRules, {}, { exactFractions: !1 }); s = c ? n.distrDivRules : n.sucDivRules, c = !c, (u = (e = l(e, s)).toString()) !== o;) f = !0, o = u;
                            f && (e = l(e, n.firstRulesAgain, {}, { exactFractions: !1 })), e = l(e, n.finalRules, {}, { exactFractions: !1 })
                        }
                        var p = [],
                            m = {};
                        return "OperatorNode" === e.type && e.isBinary() && "/" === e.op ? (1 === a && (e.args[0] = N(e.args[0], p), e.args[1] = N(e.args[1])), r && (m.numerator = e.args[0], m.denominator = e.args[1])) : (1 === a && (e = N(e, p)), r && (m.numerator = e, m.denominator = null)), r ? (m.coefficients = p, m.variables = i.variables, m.expression = e, m) : e
                    }
                });

                function N(e, t) {
                    void 0 === t && (t = []), t[0] = 0;
                    var r = { cte: 1, oper: "+", fire: "" },
                        n = 0,
                        i = "";
                    ! function e(r, a, o) {
                        var s = r.type;
                        if ("FunctionNode" === s) throw new Error("There is an unsolved function call");
                        if ("OperatorNode" === s) { if (-1 === "+-*^".indexOf(r.op)) throw new Error("Operator " + r.op + " invalid"); if (null !== a) { if (("unaryMinus" === r.fn || "pow" === r.fn) && "add" !== a.fn && "subtract" !== a.fn && "multiply" !== a.fn) throw new Error("Invalid " + r.op + " placing"); if (("subtract" === r.fn || "add" === r.fn || "multiply" === r.fn) && "add" !== a.fn && "subtract" !== a.fn) throw new Error("Invalid " + r.op + " placing"); if (("subtract" === r.fn || "add" === r.fn || "unaryMinus" === r.fn) && 0 !== o.noFil) throw new Error("Invalid " + r.op + " placing") } "^" !== r.op && "*" !== r.op || (o.fire = r.op); for (var u = 0; u < r.args.length; u++) "unaryMinus" === r.fn && (o.oper = "-"), "+" !== r.op && "subtract" !== r.fn || (o.fire = "", o.cte = 1, o.oper = 0 === u ? "+" : r.op), o.noFil = u, e(r.args[u], r, o) } else if ("SymbolNode" === s) { if (r.name !== i && "" !== i) throw new Error("There is more than one variable"); if (i = r.name, null === a) return void(t[1] = 1); if ("^" === a.op && 0 !== o.noFil) throw new Error("In power the variable should be the first parameter"); if ("*" === a.op && 1 !== o.noFil) throw new Error("In multiply the variable should be the second parameter"); "" !== o.fire && "*" !== o.fire || (n < 1 && (t[1] = 0), t[1] += o.cte * ("+" === o.oper ? 1 : -1), n = Math.max(1, n)) } else {
                            if ("ConstantNode" !== s) throw new Error("Type " + s + " is not allowed");
                            var c = parseFloat(r.value);
                            if (null === a) return void(t[0] = c);
                            if ("^" === a.op) { if (1 !== o.noFil) throw new Error("Constant cannot be powered"); if (!V(c) || c <= 0) throw new Error("Non-integer exponent is not allowed"); for (var f = n + 1; f < c; f++) t[f] = 0; return c > n && (t[c] = 0), t[c] += o.cte * ("+" === o.oper ? 1 : -1), void(n = Math.max(c, n)) }
                            o.cte = c, "" === o.fire && (t[0] += o.cte * ("+" === o.oper ? 1 : -1))
                        }
                    }(e, null, r);
                    for (var a, o = !0, s = n = t.length - 1; s >= 0; s--)
                        if (0 !== t[s]) {
                            var u = new d(o ? t[s] : Math.abs(t[s])),
                                c = t[s] < 0 ? "-" : "+";
                            if (s > 0) {
                                var f = new v(i);
                                if (s > 1) {
                                    var l = new d(s);
                                    f = new y("^", "pow", [f, l])
                                }
                                u = -1 === t[s] && o ? new y("-", "unaryMinus", [f]) : 1 === Math.abs(t[s]) ? f : new y("*", "multiply", [u, f])
                            }
                            a = o ? u : "+" === c ? new y("+", "add", [a, u]) : new y("-", "subtract", [a, u]), o = !1
                        }
                    return o ? new d(0) : a
                }
            })),
            Tc = Ke("reviver", ["classes"], (function(e) { var t = e.classes; return function(e, r) { var n = t[r && r.mathjs]; return n && "function" == typeof n.fromJSON ? n.fromJSON(r) : r } })),
            zc = Ke("replacer", [], (function() { return function(e, t) { return "number" != typeof t || isFinite(t) && !isNaN(t) ? t : { mathjs: "number", value: String(t) } } })),
            qc = Math.PI,
            Ic = 2 * Math.PI,
            Bc = Math.E,
            kc = Ke("true", [], (function() { return !0 })),
            Dc = Ke("false", [], (function() { return !1 })),
            Rc = Ke("null", [], (function() { return null })),
            Pc = ef("Infinity", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(1 / 0) : 1 / 0
            })),
            jc = ef("NaN", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(NaN) : NaN
            })),
            Uc = ef("pi", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? Ka(r) : qc
            })),
            Fc = ef("tau", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? eo(r) : Ic
            })),
            Lc = ef("e", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? Xa(r) : Bc
            })),
            Hc = ef("phi", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? Qa(r) : 1.618033988749895
            })),
            $c = ef("LN2", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(2).ln() : Math.LN2
            })),
            Gc = ef("LN10", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(10).ln() : Math.LN10
            })),
            Vc = ef("LOG2E", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(1).div(new r(2).ln()) : Math.LOG2E
            })),
            Zc = ef("LOG10E", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(1).div(new r(10).ln()) : Math.LOG10E
            })),
            Wc = ef("SQRT1_2", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r("0.5").sqrt() : Math.SQRT1_2
            })),
            Jc = ef("SQRT2", ["config", "?BigNumber"], (function(e) {
                var t = e.config,
                    r = e.BigNumber;
                return "BigNumber" === t.number ? new r(2).sqrt() : Math.SQRT2
            })),
            Yc = ef("i", ["Complex"], (function(e) { return e.Complex.I })),
            Xc = Ke("PI", ["pi"], (function(e) { return e.pi })),
            Qc = Ke("E", ["e"], (function(e) { return e.e })),
            Kc = Ke("version", [], (function() { return "9.3.2" }));

        function ef(e, t, r) { return Ke(e, t, r, { recreateOnConfigChange: !0 }) }
        var tf = Qf("speedOfLight", "299792458", "m s^-1"),
            rf = Qf("gravitationConstant", "6.67430e-11", "m^3 kg^-1 s^-2"),
            nf = Qf("planckConstant", "6.62607015e-34", "J s"),
            af = Qf("reducedPlanckConstant", "1.0545718176461565e-34", "J s"),
            of = Qf("magneticConstant", "1.25663706212e-6", "N A^-2"),
            sf = Qf("electricConstant", "8.8541878128e-12", "F m^-1"),
            uf = Qf("vacuumImpedance", "376.730313667", "ohm"),
            cf = Qf("coulomb", "8.987551792261171e9", "N m^2 C^-2"),
            ff = Qf("elementaryCharge", "1.602176634e-19", "C"),
            lf = Qf("bohrMagneton", "9.2740100783e-24", "J T^-1"),
            pf = Qf("conductanceQuantum", "7.748091729863649e-5", "S"),
            mf = Qf("inverseConductanceQuantum", "12906.403729652257", "ohm"),
            hf = Qf("magneticFluxQuantum", "2.0678338484619295e-15", "Wb"),
            df = Qf("nuclearMagneton", "5.0507837461e-27", "J T^-1"),
            yf = Qf("klitzing", "25812.807459304513", "ohm"),
            gf = Qf("bohrRadius", "5.29177210903e-11", "m"),
            vf = Qf("classicalElectronRadius", "2.8179403262e-15", "m"),
            xf = Qf("electronMass", "9.1093837015e-31", "kg"),
            bf = Qf("fermiCoupling", "1.1663787e-5", "GeV^-2"),
            wf = Kf("fineStructure", .0072973525693),
            Nf = Qf("hartreeEnergy", "4.3597447222071e-18", "J"),
            Mf = Qf("protonMass", "1.67262192369e-27", "kg"),
            Sf = Qf("deuteronMass", "3.3435830926e-27", "kg"),
            Ef = Qf("neutronMass", "1.6749271613e-27", "kg"),
            Af = Qf("quantumOfCirculation", "3.6369475516e-4", "m^2 s^-1"),
            Of = Qf("rydberg", "10973731.568160", "m^-1"),
            Cf = Qf("thomsonCrossSection", "6.6524587321e-29", "m^2"),
            _f = Kf("weakMixingAngle", .2229),
            Tf = Kf("efimovFactor", 22.7),
            zf = Qf("atomicMass", "1.66053906660e-27", "kg"),
            qf = Qf("avogadro", "6.02214076e23", "mol^-1"),
            If = Qf("boltzmann", "1.380649e-23", "J K^-1"),
            Bf = Qf("faraday", "96485.33212331001", "C mol^-1"),
            kf = Qf("firstRadiation", "3.7417718521927573e-16", "W m^2"),
            Df = Qf("loschmidt", "2.686780111798444e25", "m^-3"),
            Rf = Qf("gasConstant", "8.31446261815324", "J K^-1 mol^-1"),
            Pf = Qf("molarPlanckConstant", "3.990312712893431e-10", "J s mol^-1"),
            jf = Qf("molarVolume", "0.022413969545014137", "m^3 mol^-1"),
            Uf = Kf("sackurTetrode", -1.16487052358),
            Ff = Qf("secondRadiation", "0.014387768775039337", "m K"),
            Lf = Qf("stefanBoltzmann", "5.67037441918443e-8", "W m^-2 K^-4"),
            Hf = Qf("wienDisplacement", "2.897771955e-3", "m K"),
            $f = Qf("molarMass", "0.99999999965e-3", "kg mol^-1"),
            Gf = Qf("molarMassC12", "11.9999999958e-3", "kg mol^-1"),
            Vf = Qf("gravity", "9.80665", "m s^-2"),
            Zf = Qf("planckLength", "1.616255e-35", "m"),
            Wf = Qf("planckMass", "2.176435e-8", "kg"),
            Jf = Qf("planckTime", "5.391245e-44", "s"),
            Yf = Qf("planckCharge", "1.87554603778e-18", "C"),
            Xf = Qf("planckTemperature", "1.416785e+32", "K");

        function Qf(e, t, r) {
            return Ke(e, ["config", "Unit", "BigNumber"], (function(e) {
                var n = e.config,
                    i = e.Unit,
                    a = e.BigNumber,
                    o = new i("BigNumber" === n.number ? new a(t) : parseFloat(t), r);
                return o.fixPrefix = !0, o
            }))
        }

        function Kf(e, t) {
            return Ke(e, ["config", "BigNumber"], (function(e) {
                var r = e.config,
                    n = e.BigNumber;
                return "BigNumber" === r.number ? new n(t) : t
            }))
        }
        var el = Ke("apply", ["typed", "isInteger"], (function(e) {
                var t = e.typed,
                    r = e.isInteger,
                    n = Mr({ typed: t, isInteger: r });
                return t("apply", {
                    "...any": function(e) {
                        var t = e[1];
                        a(t) ? e[1] = t - 1 : o(t) && (e[1] = t.minus(1));
                        try { return n.apply(null, e) } catch (e) { throw vs(e) }
                    }
                })
            }), { isTransformFunction: !0 }),
            tl = Ke("column", ["typed", "Index", "matrix", "range"], (function(e) {
                var t = e.typed,
                    r = e.Index,
                    n = e.matrix,
                    i = e.range,
                    o = Gn({ typed: t, Index: r, matrix: n, range: i });
                return t("column", {
                    "...any": function(e) {
                        var t = e.length - 1,
                            r = e[t];
                        a(r) && (e[t] = r - 1);
                        try { return o.apply(null, e) } catch (e) { throw vs(e) }
                    }
                })
            }), { isTransformFunction: !0 });

        function rl(e, t, r) {
            var n = e.filter((function(e) { return F(e) && !(e.name in t) && !(e.name in r) }))[0];
            if (!n) throw new Error('No undefined variable found in inline expression "' + e + '"');
            var i = n.name,
                a = Object.create(r),
                o = e.compile();
            return function(e) { return a[i] = e, o.evaluate(a) }
        }
        var nl = Ke("filter", ["typed"], (function(e) {
            var t = e.typed;

            function r(e, t, r) { var i, a; return e[0] && (i = e[0].compile().evaluate(r)), e[1] && (a = F(e[1]) || I(e[1]) ? e[1].compile().evaluate(r) : rl(e[1], t, r)), n(i, a) }
            r.rawArgs = !0;
            var n = t("filter", { "Array, function": il, "Matrix, function": function(e, t) { return e.create(il(e.toArray(), t)) }, "Array, RegExp": Pe, "Matrix, RegExp": function(e, t) { return e.create(Pe(e.toArray(), t)) } });
            return r
        }), { isTransformFunction: !0 });

        function il(e, t) { var r = Qn(t); return Re(e, (function(e, n, i) { return 1 === r ? t(e) : 2 === r ? t(e, [n + 1]) : t(e, [n + 1], i) })) }
        var al = Ke("forEach", ["typed"], (function(e) {
                var t = e.typed;

                function r(e, t, r) { var i, a; return e[0] && (i = e[0].compile().evaluate(r)), e[1] && (a = F(e[1]) || I(e[1]) ? e[1].compile().evaluate(r) : rl(e[1], t, r)), n(i, a) }
                r.rawArgs = !0;
                var n = t("forEach", { "Array | Matrix, function": function(e, t) { var r = Qn(t);! function n(i, a) { Array.isArray(i) ? De(i, (function(e, t) { n(e, a.concat(t + 1)) })) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e) }(e.valueOf(), []) } });
                return r
            }), { isTransformFunction: !0 }),
            ol = Ke("index", ["Index"], (function(e) {
                var t = e.Index;
                return function() {
                    for (var e = [], r = 0, n = arguments.length; r < n; r++) {
                        var i = arguments[r];
                        if (y(i)) i.start--, i.end -= i.step > 0 ? 0 : 2;
                        else if (i && !0 === i.isSet) i = i.map((function(e) { return e - 1 }));
                        else if (l(i) || p(i)) i = i.map((function(e) { return e - 1 }));
                        else if (a(i)) i--;
                        else if (o(i)) i = i.toNumber() - 1;
                        else if ("string" != typeof i) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
                        e[r] = i
                    }
                    var s = new t;
                    return t.apply(s, e), s
                }
            }), { isTransformFunction: !0 }),
            sl = Ke("map", ["typed"], (function(e) {
                var t = e.typed;

                function r(e, t, r) { var i, a; return e[0] && (i = e[0].compile().evaluate(r)), e[1] && (a = F(e[1]) || I(e[1]) ? e[1].compile().evaluate(r) : rl(e[1], t, r)), n(i, a) }
                r.rawArgs = !0;
                var n = t("map", { "Array, function": function(e, t) { return ul(e, t, e) }, "Matrix, function": function(e, t) { return e.create(ul(e.valueOf(), t, e)) } });
                return r
            }), { isTransformFunction: !0 });

        function ul(e, t, r) { var n = Qn(t); return function e(i, a) { return Array.isArray(i) ? ke(i, (function(t, r) { return e(t, a.concat(r + 1)) })) : 1 === n ? t(i) : 2 === n ? t(i, a) : t(i, a, r) }(e, []) }

        function cl(e) {
            if (2 === e.length && m(e[0])) {
                var t = (e = e.slice())[1];
                a(t) ? e[1] = t - 1 : o(t) && (e[1] = t.minus(1))
            }
            return e
        }
        var fl = Ke("max", ["typed", "config", "numeric", "larger"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.numeric,
                    i = e.larger,
                    a = Ga({ typed: t, config: r, numeric: n, larger: i });
                return t("max", { "...any": function(e) { e = cl(e); try { return a.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            ll = Ke("mean", ["typed", "add", "divide"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.divide,
                    i = Hu({ typed: t, add: r, divide: n });
                return t("mean", { "...any": function(e) { e = cl(e); try { return i.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            pl = Ke("min", ["typed", "config", "numeric", "smaller"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.numeric,
                    i = e.smaller,
                    a = Va({ typed: t, config: r, numeric: n, smaller: i });
                return t("min", { "...any": function(e) { e = cl(e); try { return a.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            ml = Ke("range", ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.matrix,
                    i = e.bignumber,
                    a = e.smaller,
                    o = e.smallerEq,
                    s = e.larger,
                    u = e.largerEq,
                    c = hi({ typed: t, config: r, matrix: n, bignumber: i, smaller: a, smallerEq: o, larger: s, largerEq: u });
                return t("range", { "...any": function(e) { return "boolean" != typeof e[e.length - 1] && e.push(!0), c.apply(null, e) } })
            }), { isTransformFunction: !0 }),
            hl = Ke("row", ["typed", "Index", "matrix", "range"], (function(e) {
                var t = e.typed,
                    r = e.Index,
                    n = e.matrix,
                    i = e.range,
                    o = bi({ typed: t, Index: r, matrix: n, range: i });
                return t("row", {
                    "...any": function(e) {
                        var t = e.length - 1,
                            r = e[t];
                        a(r) && (e[t] = r - 1);
                        try { return o.apply(null, e) } catch (e) { throw vs(e) }
                    }
                })
            }), { isTransformFunction: !0 }),
            dl = Ke("subset", ["typed", "matrix"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = zi({ typed: t, matrix: r });
                return t("subset", { "...any": function(e) { try { return n.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            yl = Ke("concat", ["typed", "matrix", "isInteger"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.isInteger,
                    i = Hn({ typed: t, matrix: r, isInteger: n });
                return t("concat", {
                    "...any": function(e) {
                        var t = e.length - 1,
                            r = e[t];
                        a(r) ? e[t] = r - 1 : o(r) && (e[t] = r.minus(1));
                        try { return i.apply(null, e) } catch (e) { throw vs(e) }
                    }
                })
            }), { isTransformFunction: !0 }),
            gl = Ke("diff", ["typed", "matrix", "subtract", "number", "bignumber"], (function(e) {
                var t = e.typed,
                    r = e.matrix,
                    n = e.subtract,
                    i = e.number,
                    a = e.bignumber,
                    o = ci({ typed: t, matrix: r, subtract: n, number: i, bignumber: a });
                return t("diff", { "...any": function(e) { e = cl(e); try { return o.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            vl = Ke("std", ["typed", "sqrt", "variance"], (function(e) {
                var t = e.typed,
                    r = e.sqrt,
                    n = e.variance,
                    i = Wu({ typed: t, sqrt: r, variance: n });
                return t("std", { "...any": function(e) { e = cl(e); try { return i.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            xl = Ke("sum", ["typed", "config", "add", "numeric"], (function(e) {
                var t = e.typed,
                    r = e.config,
                    n = e.add,
                    i = e.numeric,
                    a = Lu({ typed: t, config: r, add: n, numeric: i });
                return t("sum", { "...any": function(e) { e = cl(e); try { return a.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            bl = Ke("variance", ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"], (function(e) {
                var t = e.typed,
                    r = e.add,
                    n = e.subtract,
                    i = e.multiply,
                    a = e.divide,
                    o = e.apply,
                    s = e.isNaN,
                    u = Vu({ typed: t, add: r, subtract: n, multiply: i, divide: a, apply: o, isNaN: s });
                return t("variance", { "...any": function(e) { e = cl(e); try { return u.apply(null, e) } catch (e) { throw vs(e) } } })
            }), { isTransformFunction: !0 }),
            wl = r(10),
            Nl = r.n(wl);

        function Ml(e) { return (Ml = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function Sl(e, t, r, n) {
            function i(t, i, o) {
                var s;
                if (o.wrap && "function" == typeof i && (i = function(e) {
                        var t = function() {
                            for (var t = [], n = 0, i = arguments.length; n < i; n++) {
                                var a = arguments[n];
                                t[n] = a && a.valueOf()
                            }
                            return e.apply(r, t)
                        };
                        e.transform && (t.transform = e.transform);
                        return t
                    }(i)), "function" == typeof(s = i) && "string" == typeof s.signature && (i = e(t, function(e, t, r) { return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e }({}, i.signature, i))), h(r[t]) && h(i)) return i = o.override ? e(t, i.signatures) : e(r[t], i), r[t] = i, delete n[t], a(t, i), void r.emit("import", t, (function() { return i }));
                if (void 0 === r[t] || o.override) return r[t] = i, delete n[t], a(t, i), void r.emit("import", t, (function() { return i }));
                if (!o.silent) throw new Error('Cannot import "' + t + '": already exists')
            }

            function a(e, t) { t && "function" == typeof t.transform ? (r.expression.transform[e] = t.transform, d(e) && (r.expression.mathWithTransform[e] = t.transform)) : (delete r.expression.transform[e], d(e) && (r.expression.mathWithTransform[e] = t)) }

            function f(e) { delete r.expression.transform[e], d(e) ? r.expression.mathWithTransform[e] = r[e] : delete r.expression.mathWithTransform[e] }

            function l(t, i) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t.fn;
                if (He(a, ".")) throw new Error("Factory name should not contain a nested path. Name: " + JSON.stringify(a));
                var o = g(t) ? r.expression.transform : r,
                    s = a in r.expression.transform,
                    u = Xe(o, a) ? o[a] : void 0,
                    c = function() {
                        var n = {};
                        t.dependencies.map(tt).forEach((function(e) { if (He(e, ".")) throw new Error("Factory dependency should not contain a nested path. Name: " + JSON.stringify(e)); "math" === e ? n.math = r : "mathWithTransform" === e ? n.mathWithTransform = r.expression.mathWithTransform : "classes" === e ? n.classes = r : n[e] = r[e] }));
                        var o = t(n);
                        if (o && "function" == typeof o.transform) throw new Error('Transforms cannot be attached to factory functions. Please create a separate function for it with exports.path="expression.transform"');
                        if (void 0 === u || i.override) return o;
                        if (h(u) && h(o)) return e(u, o);
                        if (i.silent) return u;
                        throw new Error('Cannot import "' + a + '": already exists')
                    };
                t.meta && !1 === t.meta.lazy ? (o[a] = c(), u && s ? f(a) : (g(t) || y(t)) && Ye(r.expression.mathWithTransform, a, (function() { return o[a] }))) : (Ye(o, a, c), u && s ? f(a) : (g(t) || y(t)) && Ye(r.expression.mathWithTransform, a, (function() { return o[a] }))), n[a] = t, r.emit("import", a, c)
            }

            function m(e) { return "function" == typeof e || "number" == typeof e || "string" == typeof e || "boolean" == typeof e || null === e || c(e) || s(e) || o(e) || u(e) || p(e) || Array.isArray(e) }

            function h(e) { return "function" == typeof e && "object" === Ml(e.signatures) }

            function d(e) { return !Xe(v, e) }

            function y(e) { return !(-1 !== e.fn.indexOf(".") || Xe(v, e.fn) || e.meta && e.meta.isClass) }

            function g(e) { return void 0 !== e && void 0 !== e.meta && !0 === e.meta.isTransformFunction || !1 }
            var v = { expression: !0, type: !0, docs: !0, error: !0, json: !0, chain: !0 };
            return function(e, t) {
                var r = arguments.length;
                if (1 !== r && 2 !== r) throw new yi("import", r, 1, 2);

                function n(e, r, i) {
                    if (Array.isArray(r)) r.forEach((function(t) { return n(e, t) }));
                    else if ("object" === Ml(r))
                        for (var a in r) Xe(r, a) && n(e, r[a], a);
                    else if (et(r) || void 0 !== i) {
                        var o = et(r) ? g(r) ? r.fn + ".transform" : r.fn : i;
                        if (Xe(e, o) && e[o] !== r && !t.silent) throw new Error('Cannot import "' + o + '" twice');
                        e[o] = r
                    } else if (!t.silent) throw new TypeError("Factory, Object, or Array expected")
                }
                t || (t = {});
                var a = {};
                for (var o in n(a, e), a)
                    if (Xe(a, o)) {
                        var s = a[o];
                        if (et(s)) l(s, t);
                        else if (m(s)) i(o, s, t);
                        else if (!t.silent) throw new TypeError("Factory, Object, or Array expected")
                    }
            }
        }
        var El = { epsilon: 1e-12, matrix: "Matrix", number: "number", precision: 64, predictable: !1, randomSeed: null },
            Al = ["Matrix", "Array"],
            Ol = ["number", "BigNumber", "Fraction"];

        function Cl(e, t) {
            function r(r) {
                if (r) {
                    var n = Ve(e, Ge);
                    _l(r, "matrix", Al), _l(r, "number", Ol),
                        function e(t, r) {
                            if (Array.isArray(r)) throw new TypeError("Arrays are not supported by deepExtend");
                            for (var n in r)
                                if (Xe(r, n) && !(n in Object.prototype) && !(n in Function.prototype))
                                    if (r[n] && r[n].constructor === Object) void 0 === t[n] && (t[n] = {}), t[n] && t[n].constructor === Object ? e(t[n], r[n]) : t[n] = r[n];
                                    else {
                                        if (Array.isArray(r[n])) throw new TypeError("Arrays are not supported by deepExtend");
                                        t[n] = r[n]
                                    }
                            return t
                        }(e, r);
                    var i = Ve(e, Ge),
                        a = Ve(r, Ge);
                    return t("config", i, n, a), i
                }
                return Ve(e, Ge)
            }
            return r.MATRIX_OPTIONS = Al, r.NUMBER_OPTIONS = Ol, Object.keys(El).forEach((function(t) { Object.defineProperty(r, t, { get: function() { return e[t] }, enumerable: !0, configurable: !0 }) })), r
        }

        function _l(e, t, r) {
            var n, i;
            void 0 !== e[t] && (n = r, i = e[t], -1 === n.indexOf(i)) && console.warn('Warning: Unknown value "' + e[t] + '" for configuration option "' + t + '". Available options: ' + r.map((function(e) { return JSON.stringify(e) })).join(", ") + ".")
        }

        function Tl() { return (Tl = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var r = arguments[t]; for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]) } return e }).apply(this, arguments) }
        t.default = function e(t, r) {
            var n = Tl({}, El, r);
            if ("function" != typeof Object.create) throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");
            var i, H, $ = (i = { isNumber: a, isComplex: s, isBigNumber: o, isFraction: u, isUnit: c, isString: f, isArray: l, isMatrix: p, isCollection: m, isDenseMatrix: h, isSparseMatrix: d, isRange: y, isIndex: g, isBoolean: v, isResultSet: x, isHelp: b, isFunction: w, isDate: N, isRegExp: M, isObject: S, isNull: E, isUndefined: A, isAccessorNode: O, isArrayNode: C, isAssignmentNode: _, isBlockNode: T, isConditionalNode: z, isConstantNode: q, isFunctionAssignmentNode: I, isFunctionNode: B, isIndexNode: k, isNode: D, isObjectNode: R, isOperatorNode: P, isParenthesisNode: j, isRangeNode: U, isSymbolNode: F, isChain: L }, H = new Nl.a, i.on = H.on.bind(H), i.off = H.off.bind(H), i.once = H.once.bind(H), i.emit = H.emit.bind(H), i);
            $.config = Cl(n, $.emit), $.expression = { transform: {}, mathWithTransform: { config: $.config } };
            var G = {},
                V = Sl((function() { for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r]; return $.typed.apply($.typed, t) }), 0, $, G);
            return $.import = V, $.on("config", (function() { Qe(G).forEach((function(e) { e && e.meta && e.meta.recreateOnConfigChange && V(e, { override: !0 }) })) })), $.create = e.bind(null, t), $.factory = Ke, $.import(Qe(Je(t))), $.ArgumentsError = yi, $.DimensionError = Me, $.IndexError = Se, $
        }(n)
    }]).default
}));
//# sourceMappingURL=math.js.map