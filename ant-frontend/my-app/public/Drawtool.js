!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
            ? define(e)
            : (((t = t || self).TrimbleMapsControl = t.TrimbleMapsControl || {}), (t.TrimbleMapsControl.Draw = e()));
})(this, function () {
    "use strict";
    var t = function (t, e) {
        var n = { drag: [], click: [], mousemove: [], mousedown: [], mouseup: [], mouseout: [], keydown: [], keyup: [], touchstart: [], touchmove: [], touchend: [], tap: [] },
            r = {
                on: function (t, e, r) {
                    if (void 0 === n[t]) throw new Error("Invalid event type: " + t);
                    n[t].push({ selector: e, fn: r });
                },
                render: function (t) {
                    e.store.featureChanged(t);
                },
            },
            o = function (t, o) {
                for (var i = n[t], a = i.length; a--;) {
                    var s = i[a];
                    if (s.selector(o)) {
                        s.fn.call(r, o) || e.store.render(), e.ui.updateMapClasses();
                        break;
                    }
                }
            };
        return (
            t.start.call(r),
            {
                render: t.render,
                stop: function () {
                    t.stop && t.stop();
                },
                trash: function () {
                    t.trash && (t.trash(), e.store.render());
                },
                combineFeatures: function () {
                    t.combineFeatures && t.combineFeatures();
                },
                uncombineFeatures: function () {
                    t.uncombineFeatures && t.uncombineFeatures();
                },
                drag: function (t) {
                    o("drag", t);
                },
                click: function (t) {
                    o("click", t);
                },
                mousemove: function (t) {
                    o("mousemove", t);
                },
                mousedown: function (t) {
                    o("mousedown", t);
                },
                mouseup: function (t) {
                    o("mouseup", t);
                },
                mouseout: function (t) {
                    o("mouseout", t);
                },
                keydown: function (t) {
                    o("keydown", t);
                },
                keyup: function (t) {
                    o("keyup", t);
                },
                touchstart: function (t) {
                    o("touchstart", t);
                },
                touchmove: function (t) {
                    o("touchmove", t);
                },
                touchend: function (t) {
                    o("touchend", t);
                },
                tap: function (t) {
                    o("tap", t);
                },
            }
        );
    },
        e = 6378137;
    function n(t) {
        var e = 0;
        if (t && t.length > 0) {
            e += Math.abs(r(t[0]));
            for (var n = 1; n < t.length; n++) e -= Math.abs(r(t[n]));
        }
        return e;
    }
    function r(t) {
        var n,
            r,
            i,
            a,
            s,
            u,
            c = 0,
            l = t.length;
        if (l > 2) {
            for (u = 0; u < l; u++)
                u === l - 2 ? ((i = l - 2), (a = l - 1), (s = 0)) : u === l - 1 ? ((i = l - 1), (a = 0), (s = 1)) : ((i = u), (a = u + 1), (s = u + 2)), (n = t[i]), (r = t[a]), (c += (o(t[s][0]) - o(n[0])) * Math.sin(o(r[1])));
            c = (c * e * e) / 2;
        }
        return c;
    }
    function o(t) {
        return (t * Math.PI) / 180;
    }
    var i = {
        geometry: function t(e) {
            var r,
                o = 0;
            switch (e.type) {
                case "Polygon":
                    return n(e.coordinates);
                case "MultiPolygon":
                    for (r = 0; r < e.coordinates.length; r++) o += n(e.coordinates[r]);
                    return o;
                case "Point":
                case "MultiPoint":
                case "LineString":
                case "MultiLineString":
                    return 0;
                case "GeometryCollection":
                    for (r = 0; r < e.geometries.length; r++) o += t(e.geometries[r]);
                    return o;
            }
        },
        ring: r,
    },
        a = "trimblemaps-ctrl",
        s = "trimblemaps-draw_ctrl-draw-btn",
        u = "trimblemaps-draw_line",
        c = "trimblemaps-draw_polygon",
        l = "trimblemaps-draw_rectangle",
        h = "trimblemaps-draw_point",
        p = "trimblemaps-draw_trash",
        d = "trimblemaps-draw_combine",
        f = "trimblemaps-draw_uncombine",
        g = "trimblemaps-ctrl-group",
        y = "active",
        m = "trimblemaps-draw_boxselect",
        v = "trimblemaps-draw-hot",
        _ = "trimblemaps-draw-cold",
        b = "add",
        S = "move",
        x = "drag",
        E = "pointer",
        C = "none",
        w = { RECTANGLE: "rectangle", POLYGON: "polygon", LINE: "line_string", POINT: "point" },
        M = "Feature",
        P = "Polygon",
        I = "LineString",
        L = "Point",
        k = "FeatureCollection",
        F = "Multi",
        O = "MultiPoint",
        T = "MultiLineString",
        j = "MultiPolygon",
        A = { DRAW_LINE_STRING: "draw_line_string", DRAW_POLYGON: "draw_polygon", DRAW_POINT: "draw_point", DRAW_RECTANGLE: "draw_rectangle", SIMPLE_SELECT: "simple_select", DIRECT_SELECT: "direct_select", STATIC: "static" },
        N = "draw.create",
        D = "draw.delete",
        R = "draw.update",
        U = "draw.selectionchange",
        V = "draw.modechange",
        $ = "draw.actionable",
        G = "draw.render",
        J = "draw.combine",
        B = "draw.uncombine",
        z = "move",
        W = "change_coordinates",
        q = "feature",
        Y = "midpoint",
        Z = "vertex",
        K = "true",
        X = "false",
        H = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"],
        Q = { Point: 0, LineString: 1, Polygon: 2 };
    function tt(t, e) {
        var n = Q[t.geometry.type] - Q[e.geometry.type];
        return 0 === n && t.geometry.type === P ? t.area - e.area : n;
    }
    function et(t) {
        if (((this._items = {}), (this._nums = {}), (this._length = t ? t.length : 0), t))
            for (var e = 0, n = t.length; e < n; e++) this.add(t[e]), void 0 !== t[e] && ("string" == typeof t[e] ? (this._items[t[e]] = e) : (this._nums[t[e]] = e));
    }
    (et.prototype.add = function (t) {
        return this.has(t) || (this._length++, "string" == typeof t ? (this._items[t] = this._length) : (this._nums[t] = this._length)), this;
    }),
        (et.prototype.delete = function (t) {
            return !1 === this.has(t) || (this._length--, delete this._items[t], delete this._nums[t]), this;
        }),
        (et.prototype.has = function (t) {
            return ("string" == typeof t || "number" == typeof t) && (void 0 !== this._items[t] || void 0 !== this._nums[t]);
        }),
        (et.prototype.values = function () {
            var t = this,
                e = [];
            return (
                Object.keys(this._items).forEach(function (n) {
                    e.push({ k: n, v: t._items[n] });
                }),
                Object.keys(this._nums).forEach(function (n) {
                    e.push({ k: JSON.parse(n), v: t._nums[n] });
                }),
                e
                    .sort(function (t, e) {
                        return t.v - e.v;
                    })
                    .map(function (t) {
                        return t.k;
                    })
            );
        }),
        (et.prototype.clear = function () {
            return (this._length = 0), (this._items = {}), (this._nums = {}), this;
        });
    var nt = [q, Y, Z],
        rt = {
            click: function (t, e, n) {
                return ot(t, e, n, n.options.clickBuffer);
            },
            touch: function (t, e, n) {
                return ot(t, e, n, n.options.touchBuffer);
            },
        };
    function ot(t, e, n, r) {
        if (null === n.map) return [];
        var o = t
            ? (function (t, e) {
                return (
                    void 0 === e && (e = 0),
                    [
                        [t.point.x - e, t.point.y - e],
                        [t.point.x + e, t.point.y + e],
                    ]
                );
            })(t, r)
            : e,
            a = {};
        n.options.styles &&
            (a.layers = n.options.styles.map(function (t) {
                return t.id;
            }));
        var s = n.map.queryRenderedFeatures(o, a).filter(function (t) {
            return -1 !== nt.indexOf(t.properties.meta);
        }),
            u = new et(),
            c = [];
        return (
            s.forEach(function (t) {
                var e = t.properties.id;
                u.has(e) || (u.add(e), c.push(t));
            }),
            (function (t) {
                return t
                    .map(function (t) {
                        return t.geometry.type === P && (t.area = i.geometry({ type: M, property: {}, geometry: t.geometry })), t;
                    })
                    .sort(tt)
                    .map(function (t) {
                        return delete t.area, t;
                    });
            })(c)
        );
    }
    function it(t, e) {
        var n = rt.click(t, null, e),
            r = { mouse: C };
        return n[0] && ((r.mouse = n[0].properties.active === K ? S : E), (r.feature = n[0].properties.meta)), -1 !== e.events.currentModeName().indexOf("draw") && (r.mouse = b), e.ui.queueMapClasses(r), e.ui.updateMapClasses(), n[0];
    }
    function at(t, e) {
        var n = t.x - e.x,
            r = t.y - e.y;
        return Math.sqrt(n * n + r * r);
    }
    function st(t, e, n) {
        void 0 === n && (n = {});
        var r = null != n.fineTolerance ? n.fineTolerance : 4,
            o = null != n.grossTolerance ? n.grossTolerance : 12,
            i = null != n.interval ? n.interval : 500;
        (t.point = t.point || e.point), (t.time = t.time || e.time);
        var a = at(t.point, e.point);
        return a < r || (a < o && e.time - t.time < i);
    }
    function ut(t, e, n) {
        void 0 === n && (n = {});
        var r = null != n.tolerance ? n.tolerance : 25,
            o = null != n.interval ? n.interval : 250;
        return (t.point = t.point || e.point), (t.time = t.time || e.time), at(t.point, e.point) < r && e.time - t.time < o;
    }
    function ct() {
        throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
    }
    function lt(t, e) {
        return t((e = { exports: {} }), e.exports), e.exports;
    }
    var ht = lt(function (t) {
        var e = (t.exports = function (t, n) {
            if ((n || (n = 16), void 0 === t && (t = 128), t <= 0)) return "0";
            for (var r = Math.log(Math.pow(2, t)) / Math.log(n), o = 2; r === 1 / 0; o *= 2) r = (Math.log(Math.pow(2, t / o)) / Math.log(n)) * o;
            var i = r - Math.floor(r),
                a = "";
            for (o = 0; o < Math.floor(r); o++) {
                a = Math.floor(Math.random() * n).toString(n) + a;
            }
            if (i) {
                var s = Math.pow(n, i);
                a = Math.floor(Math.random() * s).toString(n) + a;
            }
            var u = parseInt(a, n);
            return u !== 1 / 0 && u >= Math.pow(2, t) ? e(t, n) : a;
        });
        e.rack = function (t, n, r) {
            var o = function (o) {
                var a = 0;
                do {
                    if (a++ > 10) {
                        if (!r) throw new Error("too many ID collisions, use more bits");
                        t += r;
                    }
                    var s = e(t, n);
                } while (Object.hasOwnProperty.call(i, s));
                return (i[s] = o), s;
            },
                i = (o.hats = {});
            return (
                (o.get = function (t) {
                    return o.hats[t];
                }),
                (o.set = function (t, e) {
                    return (o.hats[t] = e), o;
                }),
                (o.bits = t || 128),
                (o.base = n || 16),
                o
            );
        };
    }),
        pt = function (t, e) {
            (this.ctx = t), (this.properties = e.properties || {}), (this.coordinates = e.geometry.coordinates), (this.id = e.id || ht()), (this.type = e.geometry.type);
        };
    (pt.prototype.changed = function () {
        this.ctx.store.featureChanged(this.id);
    }),
        (pt.prototype.incomingCoords = function (t) {
            this.setCoordinates(t);
        }),
        (pt.prototype.setCoordinates = function (t) {
            (this.coordinates = t), this.changed();
        }),
        (pt.prototype.getCoordinates = function () {
            return JSON.parse(JSON.stringify(this.coordinates));
        }),
        (pt.prototype.setProperty = function (t, e) {
            this.properties[t] = e;
        }),
        (pt.prototype.toGeoJSON = function () {
            return JSON.parse(JSON.stringify({ id: this.id, type: M, properties: this.properties, geometry: { coordinates: this.getCoordinates(), type: this.type } }));
        }),
        (pt.prototype.internal = function (t) {
            var e = { id: this.id, meta: q, "meta:type": this.type, active: X, mode: t };
            if (this.ctx.options.userProperties) for (var n in this.properties) e["user_" + n] = this.properties[n];
            return { type: M, properties: e, geometry: { coordinates: this.getCoordinates(), type: this.type } };
        });
    var dt = function (t, e) {
        pt.call(this, t, e);
    };
    ((dt.prototype = Object.create(pt.prototype)).isValid = function () {
        return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1];
    }),
        (dt.prototype.updateCoordinate = function (t, e, n) {
            (this.coordinates = 3 === arguments.length ? [e, n] : [t, e]), this.changed();
        }),
        (dt.prototype.getCoordinate = function () {
            return this.getCoordinates();
        });
    var ft = function (t, e) {
        pt.call(this, t, e);
    };
    ((ft.prototype = Object.create(pt.prototype)).isValid = function () {
        return this.coordinates.length > 1;
    }),
        (ft.prototype.addCoordinate = function (t, e, n) {
            this.changed();
            var r = parseInt(t, 10);
            this.coordinates.splice(r, 0, [e, n]);
        }),
        (ft.prototype.getCoordinate = function (t) {
            var e = parseInt(t, 10);
            return JSON.parse(JSON.stringify(this.coordinates[e]));
        }),
        (ft.prototype.removeCoordinate = function (t) {
            this.changed(), this.coordinates.splice(parseInt(t, 10), 1);
        }),
        (ft.prototype.updateCoordinate = function (t, e, n) {
            var r = parseInt(t, 10);
            (this.coordinates[r] = [e, n]), this.changed();
        });
    var gt = function (t, e) {
        pt.call(this, t, e),
            (this.coordinates = this.coordinates.map(function (t) {
                return t.slice(0, -1);
            }));
    };
    ((gt.prototype = Object.create(pt.prototype)).isValid = function () {
        return (
            0 !== this.coordinates.length &&
            this.coordinates.every(function (t) {
                return t.length > 2;
            })
        );
    }),
        (gt.prototype.incomingCoords = function (t) {
            (this.coordinates = t.map(function (t) {
                return t.slice(0, -1);
            })),
                this.changed();
        }),
        (gt.prototype.setCoordinates = function (t) {
            (this.coordinates = t), this.changed();
        }),
        (gt.prototype.addCoordinate = function (t, e, n) {
            this.changed();
            var r = t.split(".").map(function (t) {
                return parseInt(t, 10);
            });
            this.coordinates[r[0]].splice(r[1], 0, [e, n]);
        }),
        (gt.prototype.removeCoordinate = function (t) {
            this.changed();
            var e = t.split(".").map(function (t) {
                return parseInt(t, 10);
            }),
                n = this.coordinates[e[0]];
            n && (n.splice(e[1], 1), n.length < 3 && this.coordinates.splice(e[0], 1));
        }),
        (gt.prototype.getCoordinate = function (t) {
            var e = t.split(".").map(function (t) {
                return parseInt(t, 10);
            }),
                n = this.coordinates[e[0]];
            return JSON.parse(JSON.stringify(n[e[1]]));
        }),
        (gt.prototype.getCoordinates = function () {
            return this.coordinates.map(function (t) {
                return t.concat([t[0]]);
            });
        }),
        (gt.prototype.updateCoordinate = function (t, e, n) {
            this.changed();
            var r = t.split("."),
                o = parseInt(r[0], 10),
                i = parseInt(r[1], 10);
            void 0 === this.coordinates[o] && (this.coordinates[o] = []), (this.coordinates[o][i] = [e, n]);
        });
    var yt = { MultiPoint: dt, MultiLineString: ft, MultiPolygon: gt },
        mt = function (t, e, n, r, o) {
            var i = n.split("."),
                a = parseInt(i[0], 10),
                s = i[1] ? i.slice(1).join(".") : null;
            return t[a][e](s, r, o);
        },
        vt = function (t, e) {
            if ((pt.call(this, t, e), delete this.coordinates, (this.model = yt[e.geometry.type]), void 0 === this.model)) throw new TypeError(e.geometry.type + " is not a valid type");
            this.features = this._coordinatesToFeatures(e.geometry.coordinates);
        };
    function _t(t) {
        (this.map = t.map), (this.drawConfig = JSON.parse(JSON.stringify(t.options || {}))), (this._ctx = t);
    }
    ((vt.prototype = Object.create(pt.prototype))._coordinatesToFeatures = function (t) {
        var e = this,
            n = this.model.bind(this);
        return t.map(function (t) {
            return new n(e.ctx, { id: ht(), type: M, properties: {}, geometry: { coordinates: t, type: e.type.replace("Multi", "") } });
        });
    }),
        (vt.prototype.isValid = function () {
            return this.features.every(function (t) {
                return t.isValid();
            });
        }),
        (vt.prototype.setCoordinates = function (t) {
            (this.features = this._coordinatesToFeatures(t)), this.changed();
        }),
        (vt.prototype.getCoordinate = function (t) {
            return mt(this.features, "getCoordinate", t);
        }),
        (vt.prototype.getCoordinates = function () {
            return JSON.parse(
                JSON.stringify(
                    this.features.map(function (t) {
                        return t.type === P ? t.getCoordinates() : t.coordinates;
                    })
                )
            );
        }),
        (vt.prototype.updateCoordinate = function (t, e, n) {
            mt(this.features, "updateCoordinate", t, e, n), this.changed();
        }),
        (vt.prototype.addCoordinate = function (t, e, n) {
            mt(this.features, "addCoordinate", t, e, n), this.changed();
        }),
        (vt.prototype.removeCoordinate = function (t) {
            mt(this.features, "removeCoordinate", t), this.changed();
        }),
        (vt.prototype.getFeatures = function () {
            return this.features;
        }),
        (_t.prototype.setSelected = function (t) {
            return this._ctx.store.setSelected(t);
        }),
        (_t.prototype.setSelectedCoordinates = function (t) {
            var e = this;
            this._ctx.store.setSelectedCoordinates(t),
                t.reduce(function (t, n) {
                    return void 0 === t[n.feature_id] && ((t[n.feature_id] = !0), e._ctx.store.get(n.feature_id).changed()), t;
                }, {});
        }),
        (_t.prototype.getSelected = function () {
            return this._ctx.store.getSelected();
        }),
        (_t.prototype.getSelectedIds = function () {
            return this._ctx.store.getSelectedIds();
        }),
        (_t.prototype.isSelected = function (t) {
            return this._ctx.store.isSelected(t);
        }),
        (_t.prototype.getFeature = function (t) {
            return this._ctx.store.get(t);
        }),
        (_t.prototype.select = function (t) {
            return this._ctx.store.select(t);
        }),
        (_t.prototype.deselect = function (t) {
            return this._ctx.store.deselect(t);
        }),
        (_t.prototype.deleteFeature = function (t, e) {
            return void 0 === e && (e = {}), this._ctx.store.delete(t, e);
        }),
        (_t.prototype.addFeature = function (t) {
            return this._ctx.store.add(t);
        }),
        (_t.prototype.clearSelectedFeatures = function () {
            return this._ctx.store.clearSelected();
        }),
        (_t.prototype.clearSelectedCoordinates = function () {
            return this._ctx.store.clearSelectedCoordinates();
        }),
        (_t.prototype.setActionableState = function (t) {
            void 0 === t && (t = {});
            var e = { trash: t.trash || !1, combineFeatures: t.combineFeatures || !1, uncombineFeatures: t.uncombineFeatures || !1 };
            return this._ctx.events.actionable(e);
        }),
        (_t.prototype.changeMode = function (t, e, n) {
            return void 0 === e && (e = {}), void 0 === n && (n = {}), this._ctx.events.changeMode(t, e, n);
        }),
        (_t.prototype.updateUIClasses = function (t) {
            return this._ctx.ui.queueMapClasses(t);
        }),
        (_t.prototype.activateUIButton = function (t) {
            return this._ctx.ui.setActiveButton(t);
        }),
        (_t.prototype.featuresAt = function (t, e, n) {
            if ((void 0 === n && (n = "click"), "click" !== n && "touch" !== n)) throw new Error("invalid buffer type");
            return rt[n](t, e, this._ctx);
        }),
        (_t.prototype.newFeature = function (t) {
            var e = t.geometry.type;
            return e === L ? new dt(this._ctx, t) : e === I ? new ft(this._ctx, t) : e === P ? new gt(this._ctx, t) : new vt(this._ctx, t);
        }),
        (_t.prototype.isInstanceOf = function (t, e) {
            if (t === L) return e instanceof dt;
            if (t === I) return e instanceof ft;
            if (t === P) return e instanceof gt;
            if ("MultiFeature" === t) return e instanceof vt;
            throw new Error("Unknown feature class: " + t);
        }),
        (_t.prototype.doRender = function (t) {
            return this._ctx.store.featureChanged(t);
        }),
        (_t.prototype.onSetup = function () { }),
        (_t.prototype.onDrag = function () { }),
        (_t.prototype.onClick = function () { }),
        (_t.prototype.onMouseMove = function () { }),
        (_t.prototype.onMouseDown = function () { }),
        (_t.prototype.onMouseUp = function () { }),
        (_t.prototype.onMouseOut = function () { }),
        (_t.prototype.onKeyUp = function () { }),
        (_t.prototype.onKeyDown = function () { }),
        (_t.prototype.onTouchStart = function () { }),
        (_t.prototype.onTouchMove = function () { }),
        (_t.prototype.onTouchEnd = function () { }),
        (_t.prototype.onTap = function () { }),
        (_t.prototype.onStop = function () { }),
        (_t.prototype.onTrash = function () { }),
        (_t.prototype.onCombineFeature = function () { }),
        (_t.prototype.onUncombineFeature = function () { }),
        (_t.prototype.toDisplayFeatures = function () {
            throw new Error("You must overwrite toDisplayFeatures");
        });
    var bt = {
        drag: "onDrag",
        click: "onClick",
        mousemove: "onMouseMove",
        mousedown: "onMouseDown",
        mouseup: "onMouseUp",
        mouseout: "onMouseOut",
        keyup: "onKeyUp",
        keydown: "onKeyDown",
        touchstart: "onTouchStart",
        touchmove: "onTouchMove",
        touchend: "onTouchEnd",
        tap: "onTap",
    },
        St = Object.keys(bt);
    function xt(t) {
        var e = Object.keys(t);
        return function (n, r) {
            void 0 === r && (r = {});
            var o = {},
                i = e.reduce(function (e, n) {
                    return (e[n] = t[n]), e;
                }, new _t(n));
            return {
                start: function () {
                    var e = this;
                    (o = i.onSetup(r)),
                        St.forEach(function (n) {
                            var r,
                                a = bt[n],
                                s = function () {
                                    return !1;
                                };
                            t[a] &&
                                (s = function () {
                                    return !0;
                                }),
                                e.on(
                                    n,
                                    s,
                                    ((r = a),
                                        function (t) {
                                            return i[r](o, t);
                                        })
                                );
                        });
                },
                stop: function () {
                    i.onStop(o);
                },
                trash: function () {
                    i.onTrash(o);
                },
                combineFeatures: function () {
                    i.onCombineFeatures(o);
                },
                uncombineFeatures: function () {
                    i.onUncombineFeatures(o);
                },
                render: function (t, e) {
                    i.toDisplayFeatures(o, t, e);
                },
            };
        };
    }
    function Et(t) {
        return [].concat(t).filter(function (t) {
            return void 0 !== t;
        });
    }
    function Ct() {
        var t = this;
        if (!(t.ctx.map && void 0 !== t.ctx.map.getSource(v))) return u();
        var e = t.ctx.events.currentModeName();
        t.ctx.ui.queueMapClasses({ mode: e });
        var n = [],
            r = [];
        t.isDirty
            ? (r = t.getAllIds())
            : ((n = t.getChangedIds().filter(function (e) {
                return void 0 !== t.get(e);
            })),
                (r = t.sources.hot
                    .filter(function (e) {
                        return e.properties.id && -1 === n.indexOf(e.properties.id) && void 0 !== t.get(e.properties.id);
                    })
                    .map(function (t) {
                        return t.properties.id;
                    }))),
            (t.sources.hot = []);
        var o = t.sources.cold.length;
        t.sources.cold = t.isDirty
            ? []
            : t.sources.cold.filter(function (t) {
                var e = t.properties.id || t.properties.parent;
                return -1 === n.indexOf(e);
            });
        var i = o !== t.sources.cold.length || r.length > 0;
        function a(n, r) {
            var o = t.get(n).internal(e);
            t.ctx.events.currentModeRender(o, function (e) {
                t.sources[r].push(e);
            });
        }
        if (
            (n.forEach(function (t) {
                return a(t, "hot");
            }),
                r.forEach(function (t) {
                    return a(t, "cold");
                }),
                i && t.ctx.map.getSource(_).setData({ type: k, features: t.sources.cold }),
                t.ctx.map.getSource(v).setData({ type: k, features: t.sources.hot }),
                t._emitSelectionChange &&
                (t.ctx.map.fire(U, {
                    features: t.getSelected().map(function (t) {
                        return t.toGeoJSON();
                    }),
                    points: t.getSelectedCoordinates().map(function (t) {
                        return { type: M, properties: {}, geometry: { type: L, coordinates: t.coordinates } };
                    }),
                }),
                    (t._emitSelectionChange = !1)),
                t._deletedFeaturesToEmit.length)
        ) {
            var s = t._deletedFeaturesToEmit.map(function (t) {
                return t.toGeoJSON();
            });
            (t._deletedFeaturesToEmit = []), t.ctx.map.fire(D, { features: s });
        }
        function u() {
            (t.isDirty = !1), t.clearChangedIds();
        }
        u(), t.ctx.map.fire(G, {});
    }
    function wt(t) {
        var e,
            n = this;
        (this._features = {}),
            (this._featureIds = new et()),
            (this._selectedFeatureIds = new et()),
            (this._selectedCoordinates = []),
            (this._changedFeatureIds = new et()),
            (this._deletedFeaturesToEmit = []),
            (this._emitSelectionChange = !1),
            (this._mapInitialConfig = {}),
            (this.ctx = t),
            (this.sources = { hot: [], cold: [] }),
            (this.render = function () {
                e ||
                    (e = requestAnimationFrame(function () {
                        (e = null), Ct.call(n);
                    }));
            }),
            (this.isDirty = !1);
    }
    function Mt(t, e) {
        var n = t._selectedCoordinates.filter(function (e) {
            return t._selectedFeatureIds.has(e.feature_id);
        });
        t._selectedCoordinates.length === n.length || e.silent || (t._emitSelectionChange = !0), (t._selectedCoordinates = n);
    }
    (wt.prototype.createRenderBatch = function () {
        var t = this,
            e = this.render,
            n = 0;
        return (
            (this.render = function () {
                n++;
            }),
            function () {
                (t.render = e), n > 0 && t.render();
            }
        );
    }),
        (wt.prototype.setDirty = function () {
            return (this.isDirty = !0), this;
        }),
        (wt.prototype.featureChanged = function (t) {
            return this._changedFeatureIds.add(t), this;
        }),
        (wt.prototype.getChangedIds = function () {
            return this._changedFeatureIds.values();
        }),
        (wt.prototype.clearChangedIds = function () {
            return this._changedFeatureIds.clear(), this;
        }),
        (wt.prototype.getAllIds = function () {
            return this._featureIds.values();
        }),
        (wt.prototype.add = function (t) {
            return this.featureChanged(t.id), (this._features[t.id] = t), this._featureIds.add(t.id), this;
        }),
        (wt.prototype.delete = function (t, e) {
            var n = this;
            return (
                void 0 === e && (e = {}),
                Et(t).forEach(function (t) {
                    n._featureIds.has(t) &&
                        (n._featureIds.delete(t),
                            n._selectedFeatureIds.delete(t),
                            e.silent || (-1 === n._deletedFeaturesToEmit.indexOf(n._features[t]) && n._deletedFeaturesToEmit.push(n._features[t])),
                            delete n._features[t],
                            (n.isDirty = !0));
                }),
                Mt(this, e),
                this
            );
        }),
        (wt.prototype.get = function (t) {
            return this._features[t];
        }),
        (wt.prototype.getAll = function () {
            var t = this;
            return Object.keys(this._features).map(function (e) {
                return t._features[e];
            });
        }),
        (wt.prototype.select = function (t, e) {
            var n = this;
            return (
                void 0 === e && (e = {}),
                Et(t).forEach(function (t) {
                    n._selectedFeatureIds.has(t) || (n._selectedFeatureIds.add(t), n._changedFeatureIds.add(t), e.silent || (n._emitSelectionChange = !0));
                }),
                this
            );
        }),
        (wt.prototype.deselect = function (t, e) {
            var n = this;
            return (
                void 0 === e && (e = {}),
                Et(t).forEach(function (t) {
                    n._selectedFeatureIds.has(t) && (n._selectedFeatureIds.delete(t), n._changedFeatureIds.add(t), e.silent || (n._emitSelectionChange = !0));
                }),
                Mt(this, e),
                this
            );
        }),
        (wt.prototype.clearSelected = function (t) {
            return void 0 === t && (t = {}), this.deselect(this._selectedFeatureIds.values(), { silent: t.silent }), this;
        }),
        (wt.prototype.setSelected = function (t, e) {
            var n = this;
            return (
                void 0 === e && (e = {}),
                (t = Et(t)),
                this.deselect(
                    this._selectedFeatureIds.values().filter(function (e) {
                        return -1 === t.indexOf(e);
                    }),
                    { silent: e.silent }
                ),
                this.select(
                    t.filter(function (t) {
                        return !n._selectedFeatureIds.has(t);
                    }),
                    { silent: e.silent }
                ),
                this
            );
        }),
        (wt.prototype.setSelectedCoordinates = function (t) {
            return (this._selectedCoordinates = t), (this._emitSelectionChange = !0), this;
        }),
        (wt.prototype.clearSelectedCoordinates = function () {
            return (this._selectedCoordinates = []), (this._emitSelectionChange = !0), this;
        }),
        (wt.prototype.getSelectedIds = function () {
            return this._selectedFeatureIds.values();
        }),
        (wt.prototype.getSelected = function () {
            var t = this;
            return this._selectedFeatureIds.values().map(function (e) {
                return t.get(e);
            });
        }),
        (wt.prototype.getSelectedCoordinates = function () {
            var t = this;
            return this._selectedCoordinates.map(function (e) {
                return { coordinates: t.get(e.feature_id).getCoordinate(e.coord_path) };
            });
        }),
        (wt.prototype.isSelected = function (t) {
            return this._selectedFeatureIds.has(t);
        }),
        (wt.prototype.setFeatureProperty = function (t, e, n) {
            this.get(t).setProperty(e, n), this.featureChanged(t);
        }),
        (wt.prototype.storeMapConfig = function () {
            var t = this;
            H.forEach(function (e) {
                t.ctx.map[e] && (t._mapInitialConfig[e] = t.ctx.map[e].isEnabled());
            });
        }),
        (wt.prototype.restoreMapConfig = function () {
            var t = this;
            Object.keys(this._mapInitialConfig).forEach(function (e) {
                t._mapInitialConfig[e] ? t.ctx.map[e].enable() : t.ctx.map[e].disable();
            });
        }),
        (wt.prototype.getInitialConfigValue = function (t) {
            return void 0 === this._mapInitialConfig[t] || this._mapInitialConfig[t];
        });
    var Pt = function () {
        for (var t = arguments, e = {}, n = 0; n < arguments.length; n++) {
            var r = t[n];
            for (var o in r) It.call(r, o) && (e[o] = r[o]);
        }
        return e;
    },
        It = Object.prototype.hasOwnProperty;
    var Lt = ["mode", "feature", "mouse"];
    function kt(e) {
        var n = null,
            r = null,
            o = {
                onRemove: function () {
                    return (
                        e.map.off("load", o.connect),
                        clearInterval(r),
                        o.removeLayers(),
                        e.store.restoreMapConfig(),
                        e.ui.removeButtons(),
                        e.events.removeEventListeners(),
                        e.ui.clearMapClasses(),
                        (e.map = null),
                        (e.container = null),
                        (e.store = null),
                        n && n.parentNode && n.parentNode.removeChild(n),
                        (n = null),
                        this
                    );
                },
                connect: function () {
                    e.map.off("load", o.connect), clearInterval(r), o.addLayers(), e.store.storeMapConfig(), e.events.addEventListeners();
                },
                onAdd: function (i) {
                    var m = i.fire;
                    return (
                        (i.fire = function (t, e) {
                            var n = arguments;
                            return 1 === m.length && 1 !== arguments.length && (n = [Pt({}, { type: t }, e)]), m.apply(i, n);
                        }),
                        (e.map = i),
                        (e.events = (function (e) {
                            var n = Object.keys(e.options.modes).reduce(function (t, n) {
                                return (t[n] = xt(e.options.modes[n])), t;
                            }, {}),
                                r = {},
                                o = {},
                                i = {},
                                a = null,
                                s = null;
                            (i.drag = function (t, n) {
                                n({ point: t.point, time: new Date().getTime() }) ? (e.ui.queueMapClasses({ mouse: x }), s.drag(t)) : t.originalEvent.stopPropagation();
                            }),
                                (i.mousedrag = function (t) {
                                    i.drag(t, function (t) {
                                        return !st(r, t);
                                    });
                                }),
                                (i.touchdrag = function (t) {
                                    i.drag(t, function (t) {
                                        return !ut(o, t);
                                    });
                                }),
                                (i.mousemove = function (t) {
                                    if (1 === (void 0 !== t.originalEvent.buttons ? t.originalEvent.buttons : t.originalEvent.which)) return i.mousedrag(t);
                                    var n = it(t, e);
                                    (t.featureTarget = n), s.mousemove(t);
                                }),
                                (i.mousedown = function (t) {
                                    r = { time: new Date().getTime(), point: t.point };
                                    var n = it(t, e);
                                    (t.featureTarget = n), s.mousedown(t);
                                }),
                                (i.mouseup = function (t) {
                                    var n = it(t, e);
                                    (t.featureTarget = n), st(r, { point: t.point, time: new Date().getTime() }) ? s.click(t) : s.mouseup(t);
                                }),
                                (i.mouseout = function (t) {
                                    s.mouseout(t);
                                }),
                                (i.touchstart = function (t) {
                                    if ((t.originalEvent.preventDefault(), e.options.touchEnabled)) {
                                        o = { time: new Date().getTime(), point: t.point };
                                        var n = rt.touch(t, null, e)[0];
                                        (t.featureTarget = n), s.touchstart(t);
                                    }
                                }),
                                (i.touchmove = function (t) {
                                    if ((t.originalEvent.preventDefault(), e.options.touchEnabled)) return s.touchmove(t), i.touchdrag(t);
                                }),
                                (i.touchend = function (t) {
                                    if ((t.originalEvent.preventDefault(), e.options.touchEnabled)) {
                                        var n = rt.touch(t, null, e)[0];
                                        (t.featureTarget = n), ut(o, { time: new Date().getTime(), point: t.point }) ? s.tap(t) : s.touchend(t);
                                    }
                                });
                            var u = function (t) {
                                return !(8 === t || 46 === t || (t >= 48 && t <= 57));
                            };
                            function c(r, o, i) {
                                void 0 === i && (i = {}), s.stop();
                                var u = n[r];
                                if (void 0 === u) throw new Error(r + " is not valid");
                                a = r;
                                var c = u(e, o);
                                (s = t(c, e)), i.silent || e.map.fire(V, { mode: r }), e.store.setDirty(), e.store.render();
                            }
                            (i.keydown = function (t) {
                                "trimblemaps-canvas" === (t.srcElement || t.target).classList[0] &&
                                    ((8 !== t.keyCode && 46 !== t.keyCode) || !e.options.controls.trash
                                        ? u(t.keyCode)
                                            ? s.keydown(t)
                                            : 49 === t.keyCode && e.options.controls.point
                                                ? c(A.DRAW_POINT)
                                                : 50 === t.keyCode && e.options.controls.line_string
                                                    ? c(A.DRAW_LINE_STRING)
                                                    : 51 === t.keyCode && e.options.controls.rectangle
                                                        ? c(A.DRAW_RECTANGLE)
                                                        : 52 === t.keyCode && e.options.controls.polygon && c(A.DRAW_POLYGON)
                                        : (t.preventDefault(), s.trash()));
                            }),
                                (i.keyup = function (t) {
                                    u(t.keyCode) && s.keyup(t);
                                }),
                                (i.zoomend = function () {
                                    e.store.changeZoom();
                                }),
                                (i.data = function (t) {
                                    if ("style" === t.dataType) {
                                        var n = e.setup,
                                            r = e.map,
                                            o = e.options,
                                            i = e.store;
                                        o.styles.some(function (t) {
                                            return r.getLayer(t.id);
                                        }) || (n.addLayers(), i.setDirty(), i.render());
                                    }
                                });
                            var l = { trash: !1, combineFeatures: !1, uncombineFeatures: !1 };
                            return {
                                start: function () {
                                    (a = e.options.defaultMode), (s = t(n[a](e), e));
                                },
                                changeMode: c,
                                actionable: function (t) {
                                    var n = !1;
                                    Object.keys(t).forEach(function (e) {
                                        if (void 0 === l[e]) throw new Error("Invalid action type");
                                        l[e] !== t[e] && (n = !0), (l[e] = t[e]);
                                    }),
                                        n && e.map.fire($, { actions: l });
                                },
                                currentModeName: function () {
                                    return a;
                                },
                                currentModeRender: function (t, e) {
                                    return s.render(t, e);
                                },
                                fire: function (t, e) {
                                    i[t] && i[t](e);
                                },
                                addEventListeners: function () {
                                    e.map.on("mousemove", i.mousemove),
                                        e.map.on("mousedown", i.mousedown),
                                        e.map.on("mouseup", i.mouseup),
                                        e.map.on("data", i.data),
                                        e.map.on("touchmove", i.touchmove),
                                        e.map.on("touchstart", i.touchstart),
                                        e.map.on("touchend", i.touchend),
                                        e.container.addEventListener("mouseout", i.mouseout),
                                        e.options.keybindings && (e.container.addEventListener("keydown", i.keydown), e.container.addEventListener("keyup", i.keyup));
                                },
                                removeEventListeners: function () {
                                    e.map.off("mousemove", i.mousemove),
                                        e.map.off("mousedown", i.mousedown),
                                        e.map.off("mouseup", i.mouseup),
                                        e.map.off("data", i.data),
                                        e.map.off("touchmove", i.touchmove),
                                        e.map.off("touchstart", i.touchstart),
                                        e.map.off("touchend", i.touchend),
                                        e.container.removeEventListener("mouseout", i.mouseout),
                                        e.options.keybindings && (e.container.removeEventListener("keydown", i.keydown), e.container.removeEventListener("keyup", i.keyup));
                                },
                                trash: function (t) {
                                    s.trash(t);
                                },
                                combineFeatures: function () {
                                    s.combineFeatures();
                                },
                                uncombineFeatures: function () {
                                    s.uncombineFeatures();
                                },
                                getMode: function () {
                                    return a;
                                },
                            };
                        })(e)),
                        (e.ui = (function (t) {
                            var e = {},
                                n = null,
                                r = { mode: null, feature: null, mouse: null },
                                o = { mode: null, feature: null, mouse: null };
                            function i(t) {
                                o = Pt(o, t);
                            }
                            function m() {
                                var e, n;
                                if (t.container) {
                                    var i = [],
                                        a = [];
                                    Lt.forEach(function (t) {
                                        o[t] !== r[t] && (i.push(t + "-" + r[t]), null !== o[t] && a.push(t + "-" + o[t]));
                                    }),
                                        i.length > 0 && (e = t.container.classList).remove.apply(e, i),
                                        a.length > 0 && (n = t.container.classList).add.apply(n, a),
                                        (r = Pt(r, o));
                                }
                            }
                            function v(t, e) {
                                void 0 === e && (e = {});
                                var r = document.createElement("button");
                                return (
                                    (r.className = s + " " + e.className),
                                    r.setAttribute("title", e.title),
                                    e.container.appendChild(r),
                                    r.addEventListener(
                                        "click",
                                        function (r) {
                                            if ((r.preventDefault(), r.stopPropagation(), r.target === n)) return _(), void e.onDeactivate();
                                            b(t), e.onActivate();
                                        },
                                        !0
                                    ),
                                    r
                                );
                            }
                            function _() {
                                n && (n.classList.remove(y), (n = null));
                            }
                            function b(t) {
                                _();
                                var r = e[t];
                                r && r && "trash" !== t && (r.classList.add(y), (n = r));
                            }
                            return {
                                setActiveButton: b,
                                queueMapClasses: i,
                                updateMapClasses: m,
                                clearMapClasses: function () {
                                    i({ mode: null, feature: null, mouse: null }), m();
                                },
                                addButtons: function () {
                                    var n = t.options.controls,
                                        r = document.createElement("div");
                                    return (
                                        (r.className = g + " " + a),
                                        n
                                            ? (n[w.POINT] &&
                                                (e[w.POINT] = v(w.POINT, {
                                                    container: r,
                                                    className: h,
                                                    title: "Marker tool",
                                                    onActivate: function () {
                                                        return t.events.changeMode(A.DRAW_POINT);
                                                    },
                                                    onDeactivate: function () {
                                                        return t.events.trash();
                                                    },
                                                })),
                                                n[w.LINE] &&
                                                (e[w.LINE] = v(w.LINE, {
                                                    container: r,
                                                    className: u,
                                                    title: "LineString tool",
                                                    onActivate: function () {
                                                        return t.events.changeMode(A.DRAW_LINE_STRING);
                                                    },
                                                    onDeactivate: function () {
                                                        return t.events.trash();
                                                    },
                                                })),
                                                n[w.RECTANGLE] &&
                                                (e[w.RECTANGLE] = v(w.RECTANGLE, {
                                                    container: r,
                                                    className: l,
                                                    title: "Rectangle tool",
                                                    onActivate: function () {
                                                        return t.events.changeMode(A.DRAW_RECTANGLE);
                                                    },
                                                    onDeactivate: function () {
                                                        return t.events.trash();
                                                    },
                                                })),
                                                n[w.POLYGON] &&
                                                (e[w.POLYGON] = v(w.POLYGON, {
                                                    container: r,
                                                    className: c,
                                                    title: "Polygon tool",
                                                    onActivate: function () {
                                                        return t.events.changeMode(A.DRAW_POLYGON);
                                                    },
                                                    onDeactivate: function () {
                                                        return t.events.trash();
                                                    },
                                                })),
                                                n.trash &&
                                                (e.trash = v("trash", {
                                                    container: r,
                                                    className: p,
                                                    title: "Delete",
                                                    onActivate: function () {
                                                        t.events.trash();
                                                    },
                                                })),
                                                n.save &&
                                                (e.save = v("save", {
                                                    container: r,
                                                    className: 'usv-draw_save',
                                                    title: "Save",
                                                    onActivate: function () {
                                                        // Add your save functionality here
                                                        console.log("Save button clicked");
                                                    },
                                                })),
                                                n.combine_features &&
                                                (e.combine_features = v("combineFeatures", {
                                                    container: r,
                                                    className: d,
                                                    title: "Combine",
                                                    onActivate: function () {
                                                        t.events.combineFeatures();
                                                    },
                                                })),
                                                n.uncombine_features &&
                                                (e.uncombine_features = v("uncombineFeatures", {
                                                    container: r,
                                                    className: f,
                                                    title: "Uncombine",
                                                    onActivate: function () {
                                                        t.events.uncombineFeatures();
                                                    },
                                                })),
                                                r)
                                            : r
                                    );
                                },
                                removeButtons: function () {
                                    Object.keys(e).forEach(function (t) {
                                        var n = e[t];
                                        n.parentNode && n.parentNode.removeChild(n), delete e[t];
                                    });
                                },
                            };
                        })(e)),
                        (e.container = i.getContainer()),
                        (e.store = new wt(e)),
                        (n = e.ui.addButtons()),
                        e.options.boxSelect && (i.boxZoom.disable(), i.dragPan.disable(), i.dragPan.enable()),
                        i.loaded()
                            ? o.connect()
                            : (i.on("load", o.connect),
                                (r = setInterval(function () {
                                    i.loaded() && o.connect();
                                }, 16))),
                        e.events.start(),
                        n
                    );
                },
                addLayers: function () {
                    e.map.addSource(_, { data: { type: k, features: [] }, type: "geojson" }),
                        e.map.addSource(v, { data: { type: k, features: [] }, type: "geojson" }),
                        e.options.styles.forEach(function (t) {
                            e.map.addLayer(t);
                        }),
                        e.store.setDirty(!0),
                        e.store.render();
                },
                removeLayers: function () {
                    e.options.styles.forEach(function (t) {
                        e.map.getLayer(t.id) && e.map.removeLayer(t.id);
                    }),
                        e.map.getSource(_) && e.map.removeSource(_),
                        e.map.getSource(v) && e.map.removeSource(v);
                },
            };
        return (e.setup = o), o;
    }
    function Ft(t) {
        return function (e) {
            var n = e.featureTarget;
            return !!n && !!n.properties && n.properties.meta === t;
        };
    }
    function Ot(t) {
        return !!t.featureTarget && !!t.featureTarget.properties && t.featureTarget.properties.active === K && t.featureTarget.properties.meta === q;
    }
    function Tt(t) {
        return !!t.featureTarget && !!t.featureTarget.properties && t.featureTarget.properties.active === X && t.featureTarget.properties.meta === q;
    }
    function jt(t) {
        return void 0 === t.featureTarget;
    }
    function At(t) {
        var e = t.featureTarget;
        return !!e && !!e.properties && e.properties.meta === Z;
    }
    function Nt(t) {
        return !!t.originalEvent && !0 === t.originalEvent.shiftKey;
    }
    function Dt(t) {
        return 27 === t.keyCode;
    }
    function Rt(t) {
        return 13 === t.keyCode;
    }
    var Ut = Vt;
    function Vt(t, e) {
        (this.x = t), (this.y = e);
    }
    function $t(t, e) {
        var n = e.getBoundingClientRect();
        return new Ut(t.clientX - n.left - (e.clientLeft || 0), t.clientY - n.top - (e.clientTop || 0));
    }
    function Gt(t, e, n, r) {
        return { type: M, properties: { meta: Z, parent: t, coord_path: n, active: r ? K : X }, geometry: { type: L, coordinates: e } };
    }
    function Jt(t, e, n) {
        void 0 === e && (e = {}), void 0 === n && (n = null);
        var r,
            o = t.geometry,
            i = o.type,
            a = o.coordinates,
            s = t.properties && t.properties.id,
            u = [];
        function c(t, n) {
            var r = "",
                o = null;
            t.forEach(function (t, i) {
                var a = null != n ? n + "." + i : String(i),
                    c = Gt(s, t, a, l(a));
                if (e.midpoints && o) {
                    var h = (function (t, e, n, r) {
                        var o = e.geometry.coordinates,
                            i = n.geometry.coordinates;
                        if (o[1] > 85 || o[1] < -85 || i[1] > 85 || i[1] < -85) return null;
                        var a = r.project([o[0], o[1]]),
                            s = r.project([i[0], i[1]]),
                            u = r.unproject([(a.x + s.x) / 2, (a.y + s.y) / 2]);
                        return { type: M, properties: { meta: Y, parent: t, lng: u.lng, lat: u.lat, coord_path: n.properties.coord_path }, geometry: { type: L, coordinates: [u.lng, u.lat] } };
                    })(s, o, c, e.map);
                    h && u.push(h);
                }
                o = c;
                var p = JSON.stringify(t);
                r !== p && u.push(c), 0 === i && (r = p);
            });
        }
        function l(t) {
            return !!e.selectedPaths && -1 !== e.selectedPaths.indexOf(t);
        }
        return (
            i === L
                ? u.push(Gt(s, a, n, l(n)))
                : i === P
                    ? a.forEach(function (t, e) {
                        c(t, null !== n ? n + "." + e : String(e));
                    })
                    : i === I
                        ? c(a, n)
                        : 0 === i.indexOf(F) &&
                        ((r = i.replace(F, "")),
                            a.forEach(function (n, o) {
                                var i = { type: M, properties: t.properties, geometry: { type: r, coordinates: n } };
                                u = u.concat(Jt(i, e, o));
                            })),
            u
        );
    }
    (Vt.prototype = {
        clone: function () {
            return new Vt(this.x, this.y);
        },
        add: function (t) {
            return this.clone()._add(t);
        },
        sub: function (t) {
            return this.clone()._sub(t);
        },
        multByPoint: function (t) {
            return this.clone()._multByPoint(t);
        },
        divByPoint: function (t) {
            return this.clone()._divByPoint(t);
        },
        mult: function (t) {
            return this.clone()._mult(t);
        },
        div: function (t) {
            return this.clone()._div(t);
        },
        rotate: function (t) {
            return this.clone()._rotate(t);
        },
        rotateAround: function (t, e) {
            return this.clone()._rotateAround(t, e);
        },
        matMult: function (t) {
            return this.clone()._matMult(t);
        },
        unit: function () {
            return this.clone()._unit();
        },
        perp: function () {
            return this.clone()._perp();
        },
        round: function () {
            return this.clone()._round();
        },
        mag: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        equals: function (t) {
            return this.x === t.x && this.y === t.y;
        },
        dist: function (t) {
            return Math.sqrt(this.distSqr(t));
        },
        distSqr: function (t) {
            var e = t.x - this.x,
                n = t.y - this.y;
            return e * e + n * n;
        },
        angle: function () {
            return Math.atan2(this.y, this.x);
        },
        angleTo: function (t) {
            return Math.atan2(this.y - t.y, this.x - t.x);
        },
        angleWith: function (t) {
            return this.angleWithSep(t.x, t.y);
        },
        angleWithSep: function (t, e) {
            return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e);
        },
        _matMult: function (t) {
            var e = t[0] * this.x + t[1] * this.y,
                n = t[2] * this.x + t[3] * this.y;
            return (this.x = e), (this.y = n), this;
        },
        _add: function (t) {
            return (this.x += t.x), (this.y += t.y), this;
        },
        _sub: function (t) {
            return (this.x -= t.x), (this.y -= t.y), this;
        },
        _mult: function (t) {
            return (this.x *= t), (this.y *= t), this;
        },
        _div: function (t) {
            return (this.x /= t), (this.y /= t), this;
        },
        _multByPoint: function (t) {
            return (this.x *= t.x), (this.y *= t.y), this;
        },
        _divByPoint: function (t) {
            return (this.x /= t.x), (this.y /= t.y), this;
        },
        _unit: function () {
            return this._div(this.mag()), this;
        },
        _perp: function () {
            var t = this.y;
            return (this.y = this.x), (this.x = -t), this;
        },
        _rotate: function (t) {
            var e = Math.cos(t),
                n = Math.sin(t),
                r = e * this.x - n * this.y,
                o = n * this.x + e * this.y;
            return (this.x = r), (this.y = o), this;
        },
        _rotateAround: function (t, e) {
            var n = Math.cos(t),
                r = Math.sin(t),
                o = e.x + n * (this.x - e.x) - r * (this.y - e.y),
                i = e.y + r * (this.x - e.x) + n * (this.y - e.y);
            return (this.x = o), (this.y = i), this;
        },
        _round: function () {
            return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
        },
    }),
        (Vt.convert = function (t) {
            return t instanceof Vt ? t : Array.isArray(t) ? new Vt(t[0], t[1]) : t;
        });
    var Bt = function (t) {
        setTimeout(function () {
            t.map && t.map.doubleClickZoom && t._ctx && t._ctx.store && t._ctx.store.getInitialConfigValue && t._ctx.store.getInitialConfigValue("doubleClickZoom") && t.map.doubleClickZoom.enable();
        }, 0);
    },
        zt = function (t) {
            setTimeout(function () {
                t.map && t.map.doubleClickZoom && t.map.doubleClickZoom.disable();
            }, 0);
        },
        Wt = function (t) {
            if (!t || !t.type) return null;
            var e = qt[t.type];
            if (!e) return null;
            if ("geometry" === e) return { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: t }] };
            if ("feature" === e) return { type: "FeatureCollection", features: [t] };
            if ("featurecollection" === e) return t;
        },
        qt = {
            Point: "geometry",
            MultiPoint: "geometry",
            LineString: "geometry",
            MultiLineString: "geometry",
            Polygon: "geometry",
            MultiPolygon: "geometry",
            GeometryCollection: "geometry",
            Feature: "feature",
            FeatureCollection: "featurecollection",
        };
    var Yt = function (t) {
        if (!t) return [];
        var e = (function t(e) {
            switch ((e && e.type) || null) {
                case "FeatureCollection":
                    return (
                        (e.features = e.features.reduce(function (e, n) {
                            return e.concat(t(n));
                        }, [])),
                        e
                    );
                case "Feature":
                    return e.geometry
                        ? t(e.geometry).map(function (t) {
                            var n = { type: "Feature", properties: JSON.parse(JSON.stringify(e.properties)), geometry: t };
                            return void 0 !== e.id && (n.id = e.id), n;
                        })
                        : e;
                case "MultiPoint":
                    return e.coordinates.map(function (t) {
                        return { type: "Point", coordinates: t };
                    });
                case "MultiPolygon":
                    return e.coordinates.map(function (t) {
                        return { type: "Polygon", coordinates: t };
                    });
                case "MultiLineString":
                    return e.coordinates.map(function (t) {
                        return { type: "LineString", coordinates: t };
                    });
                case "GeometryCollection":
                    return e.geometries.map(t).reduce(function (t, e) {
                        return t.concat(e);
                    }, []);
                case "Point":
                case "Polygon":
                case "LineString":
                    return [e];
            }
        })(Wt(t)),
            n = [];
        return (
            e.features.forEach(function (t) {
                t.geometry &&
                    (n = n.concat(
                        (function t(e) {
                            return Array.isArray(e) && e.length && "number" == typeof e[0]
                                ? [e]
                                : e.reduce(function (e, n) {
                                    return Array.isArray(n) && Array.isArray(n[0]) ? e.concat(t(n)) : (e.push(n), e);
                                }, []);
                        })(t.geometry.coordinates)
                    ));
            }),
            n
        );
    },
        Zt = lt(function (t) {
            var e = (t.exports = function (t) {
                return new n(t);
            });
            function n(t) {
                this.value = t;
            }
            function r(t, e, n) {
                var r = [],
                    a = [],
                    l = !0;
                return (function t(h) {
                    var p = n ? o(h) : h,
                        d = {},
                        f = !0,
                        g = {
                            node: p,
                            node_: h,
                            path: [].concat(r),
                            parent: a[a.length - 1],
                            parents: a,
                            key: r.slice(-1)[0],
                            isRoot: 0 === r.length,
                            level: r.length,
                            circular: null,
                            update: function (t, e) {
                                g.isRoot || (g.parent.node[g.key] = t), (g.node = t), e && (f = !1);
                            },
                            delete: function (t) {
                                delete g.parent.node[g.key], t && (f = !1);
                            },
                            remove: function (t) {
                                s(g.parent.node) ? g.parent.node.splice(g.key, 1) : delete g.parent.node[g.key], t && (f = !1);
                            },
                            keys: null,
                            before: function (t) {
                                d.before = t;
                            },
                            after: function (t) {
                                d.after = t;
                            },
                            pre: function (t) {
                                d.pre = t;
                            },
                            post: function (t) {
                                d.post = t;
                            },
                            stop: function () {
                                l = !1;
                            },
                            block: function () {
                                f = !1;
                            },
                        };
                    if (!l) return g;
                    function y() {
                        if ("object" == typeof g.node && null !== g.node) {
                            (g.keys && g.node_ === g.node) || (g.keys = i(g.node)), (g.isLeaf = 0 == g.keys.length);
                            for (var t = 0; t < a.length; t++)
                                if (a[t].node_ === h) {
                                    g.circular = a[t];
                                    break;
                                }
                        } else (g.isLeaf = !0), (g.keys = null);
                        (g.notLeaf = !g.isLeaf), (g.notRoot = !g.isRoot);
                    }
                    y();
                    var m = e.call(g, g.node);
                    return (
                        void 0 !== m && g.update && g.update(m),
                        d.before && d.before.call(g, g.node),
                        f
                            ? ("object" != typeof g.node ||
                                null === g.node ||
                                g.circular ||
                                (a.push(g),
                                    y(),
                                    u(g.keys, function (e, o) {
                                        r.push(e), d.pre && d.pre.call(g, g.node[e], e);
                                        var i = t(g.node[e]);
                                        n && c.call(g.node, e) && (g.node[e] = i.node), (i.isLast = o == g.keys.length - 1), (i.isFirst = 0 == o), d.post && d.post.call(g, i), r.pop();
                                    }),
                                    a.pop()),
                                d.after && d.after.call(g, g.node),
                                g)
                            : g
                    );
                })(t).node;
            }
            function o(t) {
                if ("object" == typeof t && null !== t) {
                    var e;
                    if (s(t)) e = [];
                    else if ("[object Date]" === a(t)) e = new Date(t.getTime ? t.getTime() : t);
                    else if (
                        (function (t) {
                            return "[object RegExp]" === a(t);
                        })(t)
                    )
                        e = new RegExp(t);
                    else if (
                        (function (t) {
                            return "[object Error]" === a(t);
                        })(t)
                    )
                        e = { message: t.message };
                    else if (
                        (function (t) {
                            return "[object Boolean]" === a(t);
                        })(t)
                    )
                        e = new Boolean(t);
                    else if (
                        (function (t) {
                            return "[object Number]" === a(t);
                        })(t)
                    )
                        e = new Number(t);
                    else if (
                        (function (t) {
                            return "[object String]" === a(t);
                        })(t)
                    )
                        e = new String(t);
                    else if (Object.create && Object.getPrototypeOf) e = Object.create(Object.getPrototypeOf(t));
                    else if (t.constructor === Object) e = {};
                    else {
                        var n = (t.constructor && t.constructor.prototype) || t.__proto__ || {},
                            r = function () { };
                        (r.prototype = n), (e = new r());
                    }
                    return (
                        u(i(t), function (n) {
                            e[n] = t[n];
                        }),
                        e
                    );
                }
                return t;
            }
            (n.prototype.get = function (t) {
                for (var e = this.value, n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (!e || !c.call(e, r)) {
                        e = void 0;
                        break;
                    }
                    e = e[r];
                }
                return e;
            }),
                (n.prototype.has = function (t) {
                    for (var e = this.value, n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (!e || !c.call(e, r)) return !1;
                        e = e[r];
                    }
                    return !0;
                }),
                (n.prototype.set = function (t, e) {
                    for (var n = this.value, r = 0; r < t.length - 1; r++) {
                        var o = t[r];
                        c.call(n, o) || (n[o] = {}), (n = n[o]);
                    }
                    return (n[t[r]] = e), e;
                }),
                (n.prototype.map = function (t) {
                    return r(this.value, t, !0);
                }),
                (n.prototype.forEach = function (t) {
                    return (this.value = r(this.value, t, !1)), this.value;
                }),
                (n.prototype.reduce = function (t, e) {
                    var n = 1 === arguments.length,
                        r = n ? this.value : e;
                    return (
                        this.forEach(function (e) {
                            (this.isRoot && n) || (r = t.call(this, r, e));
                        }),
                        r
                    );
                }),
                (n.prototype.paths = function () {
                    var t = [];
                    return (
                        this.forEach(function (e) {
                            t.push(this.path);
                        }),
                        t
                    );
                }),
                (n.prototype.nodes = function () {
                    var t = [];
                    return (
                        this.forEach(function (e) {
                            t.push(this.node);
                        }),
                        t
                    );
                }),
                (n.prototype.clone = function () {
                    var t = [],
                        e = [];
                    return (function n(r) {
                        for (var a = 0; a < t.length; a++) if (t[a] === r) return e[a];
                        if ("object" == typeof r && null !== r) {
                            var s = o(r);
                            return (
                                t.push(r),
                                e.push(s),
                                u(i(r), function (t) {
                                    s[t] = n(r[t]);
                                }),
                                t.pop(),
                                e.pop(),
                                s
                            );
                        }
                        return r;
                    })(this.value);
                });
            var i =
                Object.keys ||
                function (t) {
                    var e = [];
                    for (var n in t) e.push(n);
                    return e;
                };
            function a(t) {
                return Object.prototype.toString.call(t);
            }
            var s =
                Array.isArray ||
                function (t) {
                    return "[object Array]" === Object.prototype.toString.call(t);
                },
                u = function (t, e) {
                    if (t.forEach) return t.forEach(e);
                    for (var n = 0; n < t.length; n++) e(t[n], n, t);
                };
            u(i(n.prototype), function (t) {
                e[t] = function (e) {
                    var r = [].slice.call(arguments, 1),
                        o = new n(e);
                    return o[t].apply(o, r);
                };
            });
            var c =
                Object.hasOwnProperty ||
                function (t, e) {
                    return e in t;
                };
        }),
        Kt = Xt;
    function Xt(t) {
        if (!(this instanceof Xt)) return new Xt(t);
        (this._bbox = t || [1 / 0, 1 / 0, -1 / 0, -1 / 0]), (this._valid = !!t);
    }
    (Xt.prototype.include = function (t) {
        return (this._valid = !0), (this._bbox[0] = Math.min(this._bbox[0], t[0])), (this._bbox[1] = Math.min(this._bbox[1], t[1])), (this._bbox[2] = Math.max(this._bbox[2], t[0])), (this._bbox[3] = Math.max(this._bbox[3], t[1])), this;
    }),
        (Xt.prototype.equals = function (t) {
            var e;
            return (e = t instanceof Xt ? t.bbox() : t), this._bbox[0] == e[0] && this._bbox[1] == e[1] && this._bbox[2] == e[2] && this._bbox[3] == e[3];
        }),
        (Xt.prototype.center = function (t) {
            return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null;
        }),
        (Xt.prototype.union = function (t) {
            var e;
            return (
                (this._valid = !0),
                (e = t instanceof Xt ? t.bbox() : t),
                (this._bbox[0] = Math.min(this._bbox[0], e[0])),
                (this._bbox[1] = Math.min(this._bbox[1], e[1])),
                (this._bbox[2] = Math.max(this._bbox[2], e[2])),
                (this._bbox[3] = Math.max(this._bbox[3], e[3])),
                this
            );
        }),
        (Xt.prototype.bbox = function () {
            return this._valid ? this._bbox : null;
        }),
        (Xt.prototype.contains = function (t) {
            if (!t) return this._fastContains();
            if (!this._valid) return null;
            var e = t[0],
                n = t[1];
            return this._bbox[0] <= e && this._bbox[1] <= n && this._bbox[2] >= e && this._bbox[3] >= n;
        }),
        (Xt.prototype.intersect = function (t) {
            return this._valid ? ((e = t instanceof Xt ? t.bbox() : t), !(this._bbox[0] > e[2] || this._bbox[2] < e[0] || this._bbox[3] < e[1] || this._bbox[1] > e[3])) : null;
            var e;
        }),
        (Xt.prototype._fastContains = function () {
            if (!this._valid) return new Function("return null;");
            var t = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
            return new Function("ll", t);
        }),
        (Xt.prototype.polygon = function () {
            return this._valid
                ? {
                    type: "Polygon",
                    coordinates: [
                        [
                            [this._bbox[0], this._bbox[1]],
                            [this._bbox[2], this._bbox[1]],
                            [this._bbox[2], this._bbox[3]],
                            [this._bbox[0], this._bbox[3]],
                            [this._bbox[0], this._bbox[1]],
                        ],
                    ],
                }
                : null;
        });
    var Ht = { features: ["FeatureCollection"], coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], geometry: ["Feature"], geometries: ["GeometryCollection"] },
        Qt = Object.keys(Ht),
        te = function (t) {
            return ee(t).bbox();
        };
    function ee(t) {
        for (var e = Kt(), n = Yt(t), r = 0; r < n.length; r++) e.include(n[r]);
        return e;
    }
    (te.polygon = function (t) {
        return ee(t).polygon();
    }),
        (te.bboxify = function (t) {
            return Zt(t).map(function (t) {
                t &&
                    Qt.some(function (e) {
                        return !!t[e] && -1 !== Ht[e].indexOf(t.type);
                    }) &&
                    ((t.bbox = ee(t).bbox()), this.update(t));
            });
        });
    function ne(t, e) {
        var n = -90,
            r = 90,
            o = -90,
            i = 90,
            a = 270,
            s = -270;
        t.forEach(function (t) {
            var e = te(t),
                u = e[1],
                c = e[3],
                l = e[0],
                h = e[2];
            u > n && (n = u), c < r && (r = c), c > o && (o = c), u < i && (i = u), l < a && (a = l), h > s && (s = h);
        });
        var u = e;
        return (
            n + u.lat > 85 && (u.lat = 85 - n),
            o + u.lat > 90 && (u.lat = 90 - o),
            r + u.lat < -85 && (u.lat = -85 - r),
            i + u.lat < -90 && (u.lat = -90 - i),
            a + u.lng <= -270 && (u.lng += 360 * Math.ceil(Math.abs(u.lng) / 360)),
            s + u.lng >= 270 && (u.lng -= 360 * Math.ceil(Math.abs(u.lng) / 360)),
            u
        );
    }
    function re(t, e) {
        var n = ne(
            t.map(function (t) {
                return t.toGeoJSON();
            }),
            e
        );
        t.forEach(function (t) {
            var e,
                r = t.getCoordinates(),
                o = function (t) {
                    var e = { lng: t[0] + n.lng, lat: t[1] + n.lat };
                    return [e.lng, e.lat];
                },
                i = function (t) {
                    return t.map(function (t) {
                        return o(t);
                    });
                };
            t.type === L
                ? (e = o(r))
                : t.type === I || t.type === O
                    ? (e = r.map(o))
                    : t.type === P || t.type === T
                        ? (e = r.map(i))
                        : t.type === j &&
                        (e = r.map(function (t) {
                            return t.map(function (t) {
                                return i(t);
                            });
                        })),
                t.incomingCoords(e);
        });
    }
    var oe = {
        onSetup: function (t) {
            var e = this,
                n = { dragMoveLocation: null, boxSelectStartLocation: null, boxSelectElement: void 0, boxSelecting: !1, canBoxSelect: !1, dragMoving: !1, canDragMove: !1, initiallySelectedFeatureIds: t.featureIds || [] };
            return (
                this.setSelected(
                    n.initiallySelectedFeatureIds.filter(function (t) {
                        return void 0 !== e.getFeature(t);
                    })
                ),
                this.fireActionable(),
                this.setActionableState({ combineFeatures: !0, uncombineFeatures: !0, trash: !0 }),
                n
            );
        },
        fireUpdate: function () {
            this.map.fire(R, {
                action: z,
                features: this.getSelected().map(function (t) {
                    return t.toGeoJSON();
                }),
            });
        },
        fireActionable: function () {
            var t = this,
                e = this.getSelected(),
                n = e.filter(function (e) {
                    return t.isInstanceOf("MultiFeature", e);
                }),
                r = !1;
            if (e.length > 1) {
                r = !0;
                var o = e[0].type.replace("Multi", "");
                e.forEach(function (t) {
                    t.type.replace("Multi", "") !== o && (r = !1);
                });
            }
            var i = n.length > 0,
                a = e.length > 0;
            this.setActionableState({ combineFeatures: r, uncombineFeatures: i, trash: a });
        },
        getUniqueIds: function (t) {
            return t.length
                ? t
                    .map(function (t) {
                        return t.properties.id;
                    })
                    .filter(function (t) {
                        return void 0 !== t;
                    })
                    .reduce(function (t, e) {
                        return t.add(e), t;
                    }, new et())
                    .values()
                : [];
        },
        stopExtendedInteractions: function (t) {
            t.boxSelectElement && (t.boxSelectElement.parentNode && t.boxSelectElement.parentNode.removeChild(t.boxSelectElement), (t.boxSelectElement = null)),
                this.map.dragPan.enable(),
                (t.boxSelecting = !1),
                (t.canBoxSelect = !1),
                (t.dragMoving = !1),
                (t.canDragMove = !1);
        },
        onStop: function () {
            Bt(this);
        },
        onMouseMove: function (t) {
            return this.stopExtendedInteractions(t), !0;
        },
        onMouseOut: function (t) {
            return !t.dragMoving || this.fireUpdate();
        },
    };
    (oe.onTap = oe.onClick = function (t, e) {
        return jt(e)
            ? this.clickAnywhere(t, e)
            : Ft(Z)(e)
                ? this.clickOnVertex(t, e)
                : (function (t) {
                    return !!t.featureTarget && !!t.featureTarget.properties && t.featureTarget.properties.meta === q;
                })(e)
                    ? this.clickOnFeature(t, e)
                    : void 0;
    }),
        (oe.clickAnywhere = function (t) {
            var e = this,
                n = this.getSelectedIds();
            n.length &&
                (this.clearSelectedFeatures(),
                    n.forEach(function (t) {
                        return e.doRender(t);
                    })),
                Bt(this),
                this.stopExtendedInteractions(t);
        }),
        (oe.clickOnVertex = function (t, e) {
            this.changeMode(A.DIRECT_SELECT, { featureId: e.featureTarget.properties.parent, coordPath: e.featureTarget.properties.coord_path, startPos: e.lngLat }), this.updateUIClasses({ mouse: S });
        }),
        (oe.startOnActiveFeature = function (t, e) {
            this.stopExtendedInteractions(t), this.map.dragPan.disable(), this.doRender(e.featureTarget.properties.id), (t.canDragMove = !0), (t.dragMoveLocation = e.lngLat);
        }),
        (oe.clickOnFeature = function (t, e) {
            var n = this;
            zt(this), this.stopExtendedInteractions(t);
            var r = Nt(e),
                o = this.getSelectedIds(),
                i = e.featureTarget.properties.id,
                a = this.isSelected(i);
            if (!r && a && this.getFeature(i).type !== L) return this.changeMode(A.DIRECT_SELECT, { featureId: i });
            a && r
                ? (this.deselect(i), this.updateUIClasses({ mouse: E }), 1 === o.length && Bt(this))
                : !a && r
                    ? (this.select(i), this.updateUIClasses({ mouse: S }))
                    : a ||
                    r ||
                    (o.forEach(function (t) {
                        return n.doRender(t);
                    }),
                        this.setSelected(i),
                        this.updateUIClasses({ mouse: S })),
                this.doRender(i);
        }),
        (oe.onMouseDown = function (t, e) {
            return Ot(e)
                ? this.startOnActiveFeature(t, e)
                : this.drawConfig.boxSelect &&
                    (function (t) {
                        return !!t.originalEvent && !!t.originalEvent.shiftKey && 0 === t.originalEvent.button;
                    })(e)
                    ? this.startBoxSelect(t, e)
                    : void 0;
        }),
        (oe.startBoxSelect = function (t, e) {
            this.stopExtendedInteractions(t), this.map.dragPan.disable(), (t.boxSelectStartLocation = $t(e.originalEvent, this.map.getContainer())), (t.canBoxSelect = !0);
        }),
        (oe.onTouchStart = function (t, e) {
            if (Ot(e)) return this.startOnActiveFeature(t, e);
        }),
        (oe.onDrag = function (t, e) {
            return t.canDragMove ? this.dragMove(t, e) : this.drawConfig.boxSelect && t.canBoxSelect ? this.whileBoxSelect(t, e) : void 0;
        }),
        (oe.whileBoxSelect = function (t, e) {
            (t.boxSelecting = !0),
                this.updateUIClasses({ mouse: b }),
                t.boxSelectElement || ((t.boxSelectElement = document.createElement("div")), t.boxSelectElement.classList.add(m), this.map.getContainer().appendChild(t.boxSelectElement));
            var n = $t(e.originalEvent, this.map.getContainer()),
                r = Math.min(t.boxSelectStartLocation.x, n.x),
                o = Math.max(t.boxSelectStartLocation.x, n.x),
                i = Math.min(t.boxSelectStartLocation.y, n.y),
                a = Math.max(t.boxSelectStartLocation.y, n.y),
                s = "translate(" + r + "px, " + i + "px)";
            (t.boxSelectElement.style.transform = s), (t.boxSelectElement.style.WebkitTransform = s), (t.boxSelectElement.style.width = o - r + "px"), (t.boxSelectElement.style.height = a - i + "px");
        }),
        (oe.dragMove = function (t, e) {
            (t.dragMoving = !0), e.originalEvent.stopPropagation();
            var n = { lng: e.lngLat.lng - t.dragMoveLocation.lng, lat: e.lngLat.lat - t.dragMoveLocation.lat };
            re(this.getSelected(), n), (t.dragMoveLocation = e.lngLat);
        }),
        (oe.onMouseUp = function (t, e) {
            var n = this;
            if (t.dragMoving) this.fireUpdate();
            else if (t.boxSelecting) {
                var r = [t.boxSelectStartLocation, $t(e.originalEvent, this.map.getContainer())],
                    o = this.featuresAt(null, r, "click"),
                    i = this.getUniqueIds(o).filter(function (t) {
                        return !n.isSelected(t);
                    });
                i.length &&
                    (this.select(i),
                        i.forEach(function (t) {
                            return n.doRender(t);
                        }),
                        this.updateUIClasses({ mouse: S }));
            }
            this.stopExtendedInteractions(t);
        }),
        (oe.toDisplayFeatures = function (t, e, n) {
            (e.properties.active = this.isSelected(e.properties.id) ? K : X), n(e), this.fireActionable(), e.properties.active === K && e.geometry.type !== L && Jt(e).forEach(n);
        }),
        (oe.onTrash = function () {
            this.deleteFeature(this.getSelectedIds()), this.fireActionable();
        }),
        (oe.onCombineFeatures = function () {
            var t = this.getSelected();
            if (!(0 === t.length || t.length < 2)) {
                for (var e = [], n = [], r = t[0].type.replace("Multi", ""), o = 0; o < t.length; o++) {
                    var i = t[o];
                    if (i.type.replace("Multi", "") !== r) return;
                    i.type.includes("Multi")
                        ? i.getCoordinates().forEach(function (t) {
                            e.push(t);
                        })
                        : e.push(i.getCoordinates()),
                        n.push(i.toGeoJSON());
                }
                if (n.length > 1) {
                    var a = this.newFeature({ type: M, properties: n[0].properties, geometry: { type: "Multi" + r, coordinates: e } });
                    this.addFeature(a), this.deleteFeature(this.getSelectedIds(), { silent: !0 }), this.setSelected([a.id]), this.map.fire(J, { createdFeatures: [a.toGeoJSON()], deletedFeatures: n });
                }
                this.fireActionable();
            }
        }),
        (oe.onUncombineFeatures = function () {
            var t = this,
                e = this.getSelected();
            if (0 !== e.length) {
                for (
                    var n = [],
                    r = [],
                    o = function (o) {
                        var i = e[o];
                        t.isInstanceOf("MultiFeature", i) &&
                            (i.getFeatures().forEach(function (e) {
                                t.addFeature(e), (e.properties = i.properties), n.push(e.toGeoJSON()), t.select([e.id]);
                            }),
                                t.deleteFeature(i.id, { silent: !0 }),
                                r.push(i.toGeoJSON()));
                    },
                    i = 0;
                    i < e.length;
                    i++
                )
                    o(i);
                n.length > 1 && this.map.fire(B, { createdFeatures: n, deletedFeatures: r }), this.fireActionable();
            }
        });
    var ie = Ft(Z),
        ae = Ft(Y),
        se = {
            fireUpdate: function () {
                this.map.fire(R, {
                    action: W,
                    features: this.getSelected().map(function (t) {
                        return t.toGeoJSON();
                    }),
                });
            },
            fireActionable: function (t) {
                this.setActionableState({ combineFeatures: !1, uncombineFeatures: !1, trash: t.selectedCoordPaths.length > 0 });
            },
            startDragging: function (t, e) {
                this.map.dragPan.disable(), (t.canDragMove = !0), (t.dragMoveLocation = e.lngLat);
            },
            stopDragging: function (t) {
                this.map.dragPan.enable(), (t.dragMoving = !1), (t.canDragMove = !1), (t.dragMoveLocation = null);
            },
            onVertex: function (t, e) {
                this.startDragging(t, e);
                var n = e.featureTarget.properties,
                    r = t.selectedCoordPaths.indexOf(n.coord_path);
                Nt(e) || -1 !== r ? Nt(e) && -1 === r && t.selectedCoordPaths.push(n.coord_path) : (t.selectedCoordPaths = [n.coord_path]);
                var o = this.pathsToCoordinates(t.featureId, t.selectedCoordPaths);
                this.setSelectedCoordinates(o);
            },
            onMidpoint: function (t, e) {
                this.startDragging(t, e);
                var n = e.featureTarget.properties;
                t.feature.addCoordinate(n.coord_path, n.lng, n.lat), this.fireUpdate(), (t.selectedCoordPaths = [n.coord_path]);
            },
            pathsToCoordinates: function (t, e) {
                return e.map(function (e) {
                    return { feature_id: t, coord_path: e };
                });
            },
            onFeature: function (t, e) {
                0 === t.selectedCoordPaths.length ? this.startDragging(t, e) : this.stopDragging(t);
            },
            dragFeature: function (t, e, n) {
                re(this.getSelected(), n), (t.dragMoveLocation = e.lngLat);
            },
            dragVertex: function (t, e, n) {
                for (
                    var r = t.selectedCoordPaths.map(function (e) {
                        return t.feature.getCoordinate(e);
                    }),
                    o = ne(
                        r.map(function (t) {
                            return { type: M, properties: {}, geometry: { type: L, coordinates: t } };
                        }),
                        n
                    ),
                    i = 0;
                    i < r.length;
                    i++
                ) {
                    var a = r[i];
                    t.feature.updateCoordinate(t.selectedCoordPaths[i], a[0] + o.lng, a[1] + o.lat);
                }
            },
            clickNoTarget: function () {
                this.changeMode(A.SIMPLE_SELECT);
            },
            clickInactive: function () {
                this.changeMode(A.SIMPLE_SELECT);
            },
            clickActiveFeature: function (t) {
                (t.selectedCoordPaths = []), this.clearSelectedCoordinates(), t.feature.changed();
            },
            onSetup: function (t) {
                var e = t.featureId,
                    n = this.getFeature(e);
                if (!n) throw new Error("You must provide a featureId to enter direct_select mode");
                if (n.type === L) throw new TypeError("direct_select mode doesn't handle point features");
                var r = { featureId: e, feature: n, dragMoveLocation: t.startPos || null, dragMoving: !1, canDragMove: !1, selectedCoordPaths: t.coordPath ? [t.coordPath] : [] };
                return this.setSelectedCoordinates(this.pathsToCoordinates(e, r.selectedCoordPaths)), this.setSelected(e), zt(this), this.setActionableState({ trash: !0 }), r;
            },
            onStop: function () {
                Bt(this), this.clearSelectedCoordinates();
            },
            toDisplayFeatures: function (t, e, n) {
                t.featureId === e.properties.id ? ((e.properties.active = K), n(e), Jt(e, { map: this.map, midpoints: !0, selectedPaths: t.selectedCoordPaths }).forEach(n)) : ((e.properties.active = X), n(e)), this.fireActionable(t);
            },
            onTrash: function (t) {
                t.selectedCoordPaths
                    .sort(function (t, e) {
                        return e.localeCompare(t, "en", { numeric: !0 });
                    })
                    .forEach(function (e) {
                        return t.feature.removeCoordinate(e);
                    }),
                    this.fireUpdate(),
                    (t.selectedCoordPaths = []),
                    this.clearSelectedCoordinates(),
                    this.fireActionable(t),
                    !1 === t.feature.isValid() && (this.deleteFeature([t.featureId]), this.changeMode(A.SIMPLE_SELECT, {}));
            },
            onMouseMove: function (t, e) {
                var n = Ot(e),
                    r = ie(e),
                    o = 0 === t.selectedCoordPaths.length;
                return (n && o) || (r && !o) ? this.updateUIClasses({ mouse: S }) : this.updateUIClasses({ mouse: C }), this.stopDragging(t), !0;
            },
            onMouseOut: function (t) {
                return t.dragMoving && this.fireUpdate(), !0;
            },
        };
    (se.onTouchStart = se.onMouseDown = function (t, e) {
        return ie(e) ? this.onVertex(t, e) : Ot(e) ? this.onFeature(t, e) : ae(e) ? this.onMidpoint(t, e) : void 0;
    }),
        (se.onDrag = function (t, e) {
            if (!0 === t.canDragMove) {
                (t.dragMoving = !0), e.originalEvent.stopPropagation();
                var n = { lng: e.lngLat.lng - t.dragMoveLocation.lng, lat: e.lngLat.lat - t.dragMoveLocation.lat };
                t.selectedCoordPaths.length > 0 ? this.dragVertex(t, e, n) : this.dragFeature(t, e, n), (t.dragMoveLocation = e.lngLat);
            }
        }),
        (se.onClick = function (t, e) {
            return jt(e) ? this.clickNoTarget(t, e) : Ot(e) ? this.clickActiveFeature(t, e) : Tt(e) ? this.clickInactive(t, e) : void this.stopDragging(t);
        }),
        (se.onTap = function (t, e) {
            return jt(e) ? this.clickNoTarget(t, e) : Ot(e) ? this.clickActiveFeature(t, e) : Tt(e) ? this.clickInactive(t, e) : void 0;
        }),
        (se.onTouchEnd = se.onMouseUp = function (t) {
            t.dragMoving && this.fireUpdate(), this.stopDragging(t);
        });
    var ue = {};
    function ce(t, e) {
        return !!t.lngLat && t.lngLat.lng === e[0] && t.lngLat.lat === e[1];
    }
    (ue.onSetup = function () {
        var t = this.newFeature({ type: M, properties: {}, geometry: { type: L, coordinates: [] } });
        return this.addFeature(t), this.clearSelectedFeatures(), this.updateUIClasses({ mouse: b }), this.activateUIButton(w.POINT), this.setActionableState({ trash: !0 }), { point: t };
    }),
        (ue.stopDrawingAndRemove = function (t) {
            this.deleteFeature([t.point.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT);
        }),
        (ue.onTap = ue.onClick = function (t, e) {
            this.updateUIClasses({ mouse: S }), t.point.updateCoordinate("", e.lngLat.lng, e.lngLat.lat), this.map.fire(N, { features: [t.point.toGeoJSON()] }), this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.point.id] });
        }),
        (ue.onStop = function (t) {
            this.activateUIButton(), t.point.getCoordinate().length || this.deleteFeature([t.point.id], { silent: !0 });
        }),
        (ue.toDisplayFeatures = function (t, e, n) {
            var r = e.properties.id === t.point.id;
            if (((e.properties.active = r ? K : X), !r)) return n(e);
        }),
        (ue.onTrash = ue.stopDrawingAndRemove),
        (ue.onKeyUp = function (t, e) {
            if (Dt(e) || Rt(e)) return this.stopDrawingAndRemove(t, e);
        });
    var le = {
        onSetup: function () {
            var t = this.newFeature({ type: M, properties: {}, geometry: { type: P, coordinates: [[]] } });
            return this.addFeature(t), this.clearSelectedFeatures(), zt(this), this.updateUIClasses({ mouse: b }), this.activateUIButton(w.POLYGON), this.setActionableState({ trash: !0 }), { polygon: t, currentVertexPosition: 0 };
        },
        clickAnywhere: function (t, e) {
            if (t.currentVertexPosition > 0 && ce(e, t.polygon.coordinates[0][t.currentVertexPosition - 1])) return this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.polygon.id] });
            this.updateUIClasses({ mouse: b }),
                t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                t.currentVertexPosition++,
                t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
        },
        clickOnVertex: function (t) {
            return this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.polygon.id] });
        },
        onMouseMove: function (t, e) {
            t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), At(e) && this.updateUIClasses({ mouse: E });
        },
    };
    (le.onTap = le.onClick = function (t, e) {
        return At(e) ? this.clickOnVertex(t, e) : this.clickAnywhere(t, e);
    }),
        (le.onKeyUp = function (t, e) {
            Dt(e) ? (this.deleteFeature([t.polygon.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT)) : Rt(e) && this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.polygon.id] });
        }),
        (le.onStop = function (t) {
            this.updateUIClasses({ mouse: C }),
                Bt(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(t.polygon.id) &&
                (t.polygon.removeCoordinate("0." + t.currentVertexPosition),
                    t.polygon.isValid() ? this.map.fire(N, { features: [t.polygon.toGeoJSON()] }) : (this.deleteFeature([t.polygon.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT, {}, { silent: !0 })));
        }),
        (le.toDisplayFeatures = function (t, e, n) {
            var r = e.properties.id === t.polygon.id;
            if (((e.properties.active = r ? K : X), !r)) return n(e);
            if (0 !== e.geometry.coordinates.length) {
                var o = e.geometry.coordinates[0].length;
                if (!(o < 3)) {
                    if (((e.properties.meta = q), n(Gt(t.polygon.id, e.geometry.coordinates[0][0], "0.0", !1)), o > 3)) {
                        var i = e.geometry.coordinates[0].length - 3;
                        n(Gt(t.polygon.id, e.geometry.coordinates[0][i], "0." + i, !1));
                    }
                    if (o <= 4) {
                        var a = [
                            [e.geometry.coordinates[0][0][0], e.geometry.coordinates[0][0][1]],
                            [e.geometry.coordinates[0][1][0], e.geometry.coordinates[0][1][1]],
                        ];
                        if ((n({ type: M, properties: e.properties, geometry: { coordinates: a, type: I } }), 3 === o)) return;
                    }
                    return n(e);
                }
            }
        }),
        (le.onTrash = function (t) {
            this.deleteFeature([t.polygon.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT);
        });
    var he = {
        onSetup: function (t) {
            var e,
                n,
                r = (t = t || {}).featureId,
                o = "forward";
            if (r) {
                if (!(e = this.getFeature(r))) throw new Error("Could not find a feature with the provided featureId");
                var i = t.from;
                if ((i && "Feature" === i.type && i.geometry && "Point" === i.geometry.type && (i = i.geometry), i && "Point" === i.type && i.coordinates && 2 === i.coordinates.length && (i = i.coordinates), !i || !Array.isArray(i)))
                    throw new Error("Please use the `from` property to indicate which point to continue the line from");
                var a = e.coordinates.length - 1;
                if (e.coordinates[a][0] === i[0] && e.coordinates[a][1] === i[1]) (n = a + 1), e.addCoordinate.apply(e, [n].concat(e.coordinates[a]));
                else {
                    if (e.coordinates[0][0] !== i[0] || e.coordinates[0][1] !== i[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
                    (o = "backwards"), (n = 0), e.addCoordinate.apply(e, [n].concat(e.coordinates[0]));
                }
            } else (e = this.newFeature({ type: M, properties: {}, geometry: { type: I, coordinates: [] } })), (n = 0), this.addFeature(e);
            return this.clearSelectedFeatures(), zt(this), this.updateUIClasses({ mouse: b }), this.activateUIButton(w.LINE), this.setActionableState({ trash: !0 }), { line: e, currentVertexPosition: n, direction: o };
        },
        clickAnywhere: function (t, e) {
            if ((t.currentVertexPosition > 0 && ce(e, t.line.coordinates[t.currentVertexPosition - 1])) || ("backwards" === t.direction && ce(e, t.line.coordinates[t.currentVertexPosition + 1])))
                return this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.line.id] });
            this.updateUIClasses({ mouse: b }),
                t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                "forward" === t.direction ? (t.currentVertexPosition++, t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat)) : t.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
        },
        clickOnVertex: function (t) {
            return this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.line.id] });
        },
        onMouseMove: function (t, e) {
            t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), At(e) && this.updateUIClasses({ mouse: E });
        },
    };
    (he.onTap = he.onClick = function (t, e) {
        if (At(e)) return this.clickOnVertex(t, e);
        this.clickAnywhere(t, e);
    }),
        (he.onKeyUp = function (t, e) {
            Rt(e) ? this.changeMode(A.SIMPLE_SELECT, { featureIds: [t.line.id] }) : Dt(e) && (this.deleteFeature([t.line.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT));
        }),
        (he.onStop = function (t) {
            Bt(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(t.line.id) &&
                (t.line.removeCoordinate("" + t.currentVertexPosition),
                    t.line.isValid() ? this.map.fire(N, { features: [t.line.toGeoJSON()] }) : (this.deleteFeature([t.line.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT, {}, { silent: !0 })));
        }),
        (he.onTrash = function (t) {
            this.deleteFeature([t.line.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT);
        }),
        (he.toDisplayFeatures = function (t, e, n) {
            var r = e.properties.id === t.line.id;
            if (((e.properties.active = r ? K : X), !r)) return n(e);
            e.geometry.coordinates.length < 2 ||
                ((e.properties.meta = q), n(Gt(t.line.id, e.geometry.coordinates["forward" === t.direction ? e.geometry.coordinates.length - 2 : 1], "" + ("forward" === t.direction ? e.geometry.coordinates.length - 2 : 1), !1)), n(e));
        });
    var pe = {
        onSetup: function () {
            var t = this.newFeature({ type: M, properties: {}, geometry: { type: P, coordinates: [[]] } });
            return this.addFeature(t), this.clearSelectedFeatures(), zt(this), this.updateUIClasses({ mouse: b }), this.activateUIButton(w.RECTANGLE), this.setActionableState({ trash: !0 }), { rectangle: t, currentVertexPosition: 0 };
        },
        onMouseMove: function (t, e) {
            t.startPoint &&
                ((t.currentVertexPosition = 0),
                    t.rectangle.updateCoordinate("0." + t.currentVertexPosition, t.startPoint[0], t.startPoint[1]),
                    t.currentVertexPosition++,
                    t.rectangle.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, t.startPoint[1]),
                    t.currentVertexPosition++,
                    t.rectangle.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat),
                    t.currentVertexPosition++,
                    t.rectangle.updateCoordinate("0." + t.currentVertexPosition, t.startPoint[0], e.lngLat.lat),
                    t.currentVertexPosition++,
                    t.rectangle.updateCoordinate("0." + t.currentVertexPosition, t.startPoint[0], t.startPoint[1]));
        },
        onTap: function (t, e) {
            t.startPoint && this.onMouseMove(t, e), this.onClick(t, e);
        },
        onClick: function (t, e) {
            t.startPoint
                ? !0 !== ce(e, t.startPoint) && this.changeMode(A.SIMPLE_SELECT)
                : (this.updateUIClasses({ mouse: b }), (t.startPoint = [e.lngLat.lng, e.lngLat.lat]), t.rectangle.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat));
        },
        onKeyUp: function (t, e) {
            Dt(e) ? this.onTrash(t) : Rt(e) && this.changeMode(A.SIMPLE_SELECT);
        },
        onStop: function (t) {
            this.updateUIClasses({ mouse: C }),
                Bt(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(t.rectangle.id) &&
                (t.rectangle.removeCoordinate("0." + t.currentVertexPosition),
                    t.rectangle.isValid() ? this.map.fire(N, { features: [t.rectangle.toGeoJSON()] }) : (this.deleteFeature([t.rectangle.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT, {}, { silent: !0 })));
        },
        toDisplayFeatures: function (t, e, n) {
            var r = e.properties.id === t.rectangle.id;
            return (e.properties.active = r ? K : X), r ? (t.startPoint ? (n(Gt(t.rectangle.id, e.geometry.coordinates[0][0], "0.0", !1)), n(e)) : void 0) : n(e);
        },
        onTrash: function (t) {
            this.deleteFeature([t.rectangle.id], { silent: !0 }), this.changeMode(A.SIMPLE_SELECT);
        },
    },
        de = { simple_select: oe, direct_select: se, draw_point: ue, draw_polygon: le, draw_line_string: he, draw_rectangle: pe },
        fe = {
            defaultMode: A.SIMPLE_SELECT,
            keybindings: !0,
            touchEnabled: !0,
            clickBuffer: 2,
            touchBuffer: 25,
            boxSelect: !0,
            displayControlsDefault: !0,
            styles: [
                {
                    id: "gl-draw-polygon-fill-inactive",
                    type: "fill",
                    filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                    paint: { "fill-color": "#33C2FF", "fill-outline-color": "#33C2FF", "fill-opacity": 0.25 },
                },
                { id: "gl-draw-polygon-fill-active", type: "fill", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#E555C9", "fill-outline-color": "#E555C9", "fill-opacity": 0.25 } },
                { id: "gl-draw-polygon-midpoint", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]], paint: { "circle-radius": 5, "circle-color": "#E555C9" } },
                {
                    id: "gl-draw-polygon-stroke-inactive",
                    type: "line",
                    filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                    layout: { "line-cap": "round", "line-join": "round" },
                    paint: { "line-color": "#33C2FF", "line-width": 2 },
                },
                {
                    id: "gl-draw-polygon-stroke-active",
                    type: "line",
                    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
                    layout: { "line-cap": "butt", "line-join": "round" },
                    paint: { "line-color": "#E555C9", "line-dasharray": [3, 2], "line-width": 2.5 },
                },
                {
                    id: "gl-draw-line-inactive",
                    type: "line",
                    filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                    layout: { "line-cap": "round", "line-join": "round" },
                    paint: { "line-color": "#33C2FF", "line-width": 2.5 },
                },
                {
                    id: "gl-draw-line-active",
                    type: "line",
                    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
                    layout: { "line-cap": "butt", "line-join": "round" },
                    paint: { "line-color": "#E555C9", "line-dasharray": [3, 2], "line-width": 2.5 },
                },
                { id: "gl-draw-polygon-and-line-vertex-stroke-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 7, "circle-color": "#fff" } },
                { id: "gl-draw-polygon-and-line-vertex-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-color": "#E555C9" } },
                {
                    id: "gl-draw-point-point-stroke-inactive",
                    type: "circle",
                    filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
                    paint: { "circle-radius": 7, "circle-opacity": 1, "circle-color": "#fff" },
                },
                {
                    id: "gl-draw-point-inactive",
                    type: "circle",
                    filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]],
                    paint: { "circle-radius": 5, "circle-color": "#33C2FF" },
                },
                { id: "gl-draw-point-stroke-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]], paint: { "circle-radius": 9, "circle-color": "#fff" } },
                { id: "gl-draw-point-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]], paint: { "circle-radius": 7, "circle-color": "#E555C9" } },
                { id: "gl-draw-polygon-fill-static", type: "fill", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#404040", "fill-outline-color": "#404040", "fill-opacity": 0.1 } },
                {
                    id: "gl-draw-polygon-stroke-static",
                    type: "line",
                    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
                    layout: { "line-cap": "round", "line-join": "round" },
                    paint: { "line-color": "#404040", "line-width": 2.5 },
                },
                {
                    id: "gl-draw-line-static",
                    type: "line",
                    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
                    layout: { "line-cap": "round", "line-join": "round" },
                    paint: { "line-color": "#404040", "line-width": 2.5 },
                },
                { id: "gl-draw-point-static", type: "circle", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]], paint: { "circle-radius": 7, "circle-color": "#404040" } },
            ],
            modes: de,
            controls: {},
            userProperties: !1,
        },
        ge = { point: !0, line_string: !0, polygon: !0, rectangle: !0, trash: !0 },
        ye = { point: !1, line_string: !1, polygon: !1, rectangle: !1, trash: !1 };
    function me(t, e) {
        return t.map(function (t) {
            return t.source ? t : Pt(t, { id: t.id + "." + e, source: "hot" === e ? v : _ });
        });
    }
    var ve = lt(function (t, e) {
        var n = "[object Arguments]",
            r = "[object Map]",
            o = "[object Object]",
            i = "[object Set]",
            a = /^\[object .+?Constructor\]$/,
            s = /^(?:0|[1-9]\d*)$/,
            u = {};
        (u["[object Float32Array]"] = u["[object Float64Array]"] = u["[object Int8Array]"] = u["[object Int16Array]"] = u["[object Int32Array]"] = u["[object Uint8Array]"] = u["[object Uint8ClampedArray]"] = u["[object Uint16Array]"] = u[
            "[object Uint32Array]"
        ] = !0),
            (u[n] = u["[object Array]"] = u["[object ArrayBuffer]"] = u["[object Boolean]"] = u["[object DataView]"] = u["[object Date]"] = u["[object Error]"] = u["[object Function]"] = u[r] = u["[object Number]"] = u[o] = u[
                "[object RegExp]"
            ] = u[i] = u["[object String]"] = u["[object WeakMap]"] = !1);
        var c = "object" == typeof global && global && global.Object === Object && global,
            l = "object" == typeof self && self && self.Object === Object && self,
            h = c || l || Function("return this")(),
            p = e && !e.nodeType && e,
            d = p && t && !t.nodeType && t,
            f = d && d.exports === p,
            g = f && c.process,
            y = (function () {
                try {
                    return g && g.binding && g.binding("util");
                } catch (t) { }
            })(),
            m = y && y.isTypedArray;
        function v(t, e) {
            for (var n = -1, r = null == t ? 0 : t.length; ++n < r;) if (e(t[n], n, t)) return !0;
            return !1;
        }
        function _(t) {
            var e = -1,
                n = Array(t.size);
            return (
                t.forEach(function (t, r) {
                    n[++e] = [r, t];
                }),
                n
            );
        }
        function b(t) {
            var e = -1,
                n = Array(t.size);
            return (
                t.forEach(function (t) {
                    n[++e] = t;
                }),
                n
            );
        }
        var S,
            x,
            E,
            C = Array.prototype,
            w = Function.prototype,
            M = Object.prototype,
            P = h["__core-js_shared__"],
            I = w.toString,
            L = M.hasOwnProperty,
            k = (S = /[^.]+$/.exec((P && P.keys && P.keys.IE_PROTO) || "")) ? "Symbol(src)_1." + S : "",
            F = M.toString,
            O = RegExp(
                "^" +
                I.call(L)
                    .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
            ),
            T = f ? h.Buffer : void 0,
            j = h.Symbol,
            A = h.Uint8Array,
            N = M.propertyIsEnumerable,
            D = C.splice,
            R = j ? j.toStringTag : void 0,
            U = Object.getOwnPropertySymbols,
            V = T ? T.isBuffer : void 0,
            $ =
                ((x = Object.keys),
                    (E = Object),
                    function (t) {
                        return x(E(t));
                    }),
            G = yt(h, "DataView"),
            J = yt(h, "Map"),
            B = yt(h, "Promise"),
            z = yt(h, "Set"),
            W = yt(h, "WeakMap"),
            q = yt(Object, "create"),
            Y = bt(G),
            Z = bt(J),
            K = bt(B),
            X = bt(z),
            H = bt(W),
            Q = j ? j.prototype : void 0,
            tt = Q ? Q.valueOf : void 0;
        function et(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var r = t[e];
                this.set(r[0], r[1]);
            }
        }
        function nt(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var r = t[e];
                this.set(r[0], r[1]);
            }
        }
        function rt(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var r = t[e];
                this.set(r[0], r[1]);
            }
        }
        function ot(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.__data__ = new rt(); ++e < n;) this.add(t[e]);
        }
        function it(t) {
            var e = (this.__data__ = new nt(t));
            this.size = e.size;
        }
        function at(t, e) {
            var n = Et(t),
                r = !n && xt(t),
                o = !n && !r && Ct(t),
                i = !n && !r && !o && Lt(t),
                a = n || r || o || i,
                s = a
                    ? (function (t, e) {
                        for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
                        return r;
                    })(t.length, String)
                    : [],
                u = s.length;
            for (var c in t) (!e && !L.call(t, c)) || (a && ("length" == c || (o && ("offset" == c || "parent" == c)) || (i && ("buffer" == c || "byteLength" == c || "byteOffset" == c)) || _t(c, u))) || s.push(c);
            return s;
        }
        function st(t, e) {
            for (var n = t.length; n--;) if (St(t[n][0], e)) return n;
            return -1;
        }
        function ut(t) {
            return null == t
                ? void 0 === t
                    ? "[object Undefined]"
                    : "[object Null]"
                : R && R in Object(t)
                    ? (function (t) {
                        var e = L.call(t, R),
                            n = t[R];
                        try {
                            t[R] = void 0;
                            var r = !0;
                        } catch (t) { }
                        var o = F.call(t);
                        r && (e ? (t[R] = n) : delete t[R]);
                        return o;
                    })(t)
                    : (function (t) {
                        return F.call(t);
                    })(t);
        }
        function ct(t) {
            return It(t) && ut(t) == n;
        }
        function lt(t, e, a, s, u) {
            return (
                t === e ||
                (null == t || null == e || (!It(t) && !It(e))
                    ? t != t && e != e
                    : (function (t, e, a, s, u, c) {
                        var l = Et(t),
                            h = Et(e),
                            p = l ? "[object Array]" : vt(t),
                            d = h ? "[object Array]" : vt(e),
                            f = (p = p == n ? o : p) == o,
                            g = (d = d == n ? o : d) == o,
                            y = p == d;
                        if (y && Ct(t)) {
                            if (!Ct(e)) return !1;
                            (l = !0), (f = !1);
                        }
                        if (y && !f)
                            return (
                                c || (c = new it()),
                                l || Lt(t)
                                    ? dt(t, e, a, s, u, c)
                                    : (function (t, e, n, o, a, s, u) {
                                        switch (n) {
                                            case "[object DataView]":
                                                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                                (t = t.buffer), (e = e.buffer);
                                            case "[object ArrayBuffer]":
                                                return !(t.byteLength != e.byteLength || !s(new A(t), new A(e)));
                                            case "[object Boolean]":
                                            case "[object Date]":
                                            case "[object Number]":
                                                return St(+t, +e);
                                            case "[object Error]":
                                                return t.name == e.name && t.message == e.message;
                                            case "[object RegExp]":
                                            case "[object String]":
                                                return t == e + "";
                                            case r:
                                                var c = _;
                                            case i:
                                                var l = 1 & o;
                                                if ((c || (c = b), t.size != e.size && !l)) return !1;
                                                var h = u.get(t);
                                                if (h) return h == e;
                                                (o |= 2), u.set(t, e);
                                                var p = dt(c(t), c(e), o, a, s, u);
                                                return u.delete(t), p;
                                            case "[object Symbol]":
                                                if (tt) return tt.call(t) == tt.call(e);
                                        }
                                        return !1;
                                    })(t, e, p, a, s, u, c)
                            );
                        if (!(1 & a)) {
                            var m = f && L.call(t, "__wrapped__"),
                                v = g && L.call(e, "__wrapped__");
                            if (m || v) {
                                var S = m ? t.value() : t,
                                    x = v ? e.value() : e;
                                return c || (c = new it()), u(S, x, a, s, c);
                            }
                        }
                        if (!y) return !1;
                        return (
                            c || (c = new it()),
                            (function (t, e, n, r, o, i) {
                                var a = 1 & n,
                                    s = ft(t),
                                    u = s.length,
                                    c = ft(e).length;
                                if (u != c && !a) return !1;
                                var l = u;
                                for (; l--;) {
                                    var h = s[l];
                                    if (!(a ? h in e : L.call(e, h))) return !1;
                                }
                                var p = i.get(t);
                                if (p && i.get(e)) return p == e;
                                var d = !0;
                                i.set(t, e), i.set(e, t);
                                var f = a;
                                for (; ++l < u;) {
                                    h = s[l];
                                    var g = t[h],
                                        y = e[h];
                                    if (r) var m = a ? r(y, g, h, e, t, i) : r(g, y, h, t, e, i);
                                    if (!(void 0 === m ? g === y || o(g, y, n, r, i) : m)) {
                                        d = !1;
                                        break;
                                    }
                                    f || (f = "constructor" == h);
                                }
                                if (d && !f) {
                                    var v = t.constructor,
                                        _ = e.constructor;
                                    v == _ || !("constructor" in t) || !("constructor" in e) || ("function" == typeof v && v instanceof v && "function" == typeof _ && _ instanceof _) || (d = !1);
                                }
                                return i.delete(t), i.delete(e), d;
                            })(t, e, a, s, u, c)
                        );
                    })(t, e, a, s, lt, u))
            );
        }
        function ht(t) {
            return (
                !(
                    !Pt(t) ||
                    (function (t) {
                        return !!k && k in t;
                    })(t)
                ) && (wt(t) ? O : a).test(bt(t))
            );
        }
        function pt(t) {
            if (((n = (e = t) && e.constructor), (r = ("function" == typeof n && n.prototype) || M), e !== r)) return $(t);
            var e,
                n,
                r,
                o = [];
            for (var i in Object(t)) L.call(t, i) && "constructor" != i && o.push(i);
            return o;
        }
        function dt(t, e, n, r, o, i) {
            var a = 1 & n,
                s = t.length,
                u = e.length;
            if (s != u && !(a && u > s)) return !1;
            var c = i.get(t);
            if (c && i.get(e)) return c == e;
            var l = -1,
                h = !0,
                p = 2 & n ? new ot() : void 0;
            for (i.set(t, e), i.set(e, t); ++l < s;) {
                var d = t[l],
                    f = e[l];
                if (r) var g = a ? r(f, d, l, e, t, i) : r(d, f, l, t, e, i);
                if (void 0 !== g) {
                    if (g) continue;
                    h = !1;
                    break;
                }
                if (p) {
                    if (
                        !v(e, function (t, e) {
                            if (((a = e), !p.has(a) && (d === t || o(d, t, n, r, i)))) return p.push(e);
                            var a;
                        })
                    ) {
                        h = !1;
                        break;
                    }
                } else if (d !== f && !o(d, f, n, r, i)) {
                    h = !1;
                    break;
                }
            }
            return i.delete(t), i.delete(e), h;
        }
        function ft(t) {
            return (function (t, e, n) {
                var r = e(t);
                return Et(t)
                    ? r
                    : (function (t, e) {
                        for (var n = -1, r = e.length, o = t.length; ++n < r;) t[o + n] = e[n];
                        return t;
                    })(r, n(t));
            })(t, kt, mt);
        }
        function gt(t, e) {
            var n,
                r,
                o = t.__data__;
            return ("string" == (r = typeof (n = e)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? o["string" == typeof e ? "string" : "hash"] : o.map;
        }
        function yt(t, e) {
            var n = (function (t, e) {
                return null == t ? void 0 : t[e];
            })(t, e);
            return ht(n) ? n : void 0;
        }
        (et.prototype.clear = function () {
            (this.__data__ = q ? q(null) : {}), (this.size = 0);
        }),
            (et.prototype.delete = function (t) {
                var e = this.has(t) && delete this.__data__[t];
                return (this.size -= e ? 1 : 0), e;
            }),
            (et.prototype.get = function (t) {
                var e = this.__data__;
                if (q) {
                    var n = e[t];
                    return "__lodash_hash_undefined__" === n ? void 0 : n;
                }
                return L.call(e, t) ? e[t] : void 0;
            }),
            (et.prototype.has = function (t) {
                var e = this.__data__;
                return q ? void 0 !== e[t] : L.call(e, t);
            }),
            (et.prototype.set = function (t, e) {
                var n = this.__data__;
                return (this.size += this.has(t) ? 0 : 1), (n[t] = q && void 0 === e ? "__lodash_hash_undefined__" : e), this;
            }),
            (nt.prototype.clear = function () {
                (this.__data__ = []), (this.size = 0);
            }),
            (nt.prototype.delete = function (t) {
                var e = this.__data__,
                    n = st(e, t);
                return !(n < 0) && (n == e.length - 1 ? e.pop() : D.call(e, n, 1), --this.size, !0);
            }),
            (nt.prototype.get = function (t) {
                var e = this.__data__,
                    n = st(e, t);
                return n < 0 ? void 0 : e[n][1];
            }),
            (nt.prototype.has = function (t) {
                return st(this.__data__, t) > -1;
            }),
            (nt.prototype.set = function (t, e) {
                var n = this.__data__,
                    r = st(n, t);
                return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
            }),
            (rt.prototype.clear = function () {
                (this.size = 0), (this.__data__ = { hash: new et(), map: new (J || nt)(), string: new et() });
            }),
            (rt.prototype.delete = function (t) {
                var e = gt(this, t).delete(t);
                return (this.size -= e ? 1 : 0), e;
            }),
            (rt.prototype.get = function (t) {
                return gt(this, t).get(t);
            }),
            (rt.prototype.has = function (t) {
                return gt(this, t).has(t);
            }),
            (rt.prototype.set = function (t, e) {
                var n = gt(this, t),
                    r = n.size;
                return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
            }),
            (ot.prototype.add = ot.prototype.push = function (t) {
                return this.__data__.set(t, "__lodash_hash_undefined__"), this;
            }),
            (ot.prototype.has = function (t) {
                return this.__data__.has(t);
            }),
            (it.prototype.clear = function () {
                (this.__data__ = new nt()), (this.size = 0);
            }),
            (it.prototype.delete = function (t) {
                var e = this.__data__,
                    n = e.delete(t);
                return (this.size = e.size), n;
            }),
            (it.prototype.get = function (t) {
                return this.__data__.get(t);
            }),
            (it.prototype.has = function (t) {
                return this.__data__.has(t);
            }),
            (it.prototype.set = function (t, e) {
                var n = this.__data__;
                if (n instanceof nt) {
                    var r = n.__data__;
                    if (!J || r.length < 199) return r.push([t, e]), (this.size = ++n.size), this;
                    n = this.__data__ = new rt(r);
                }
                return n.set(t, e), (this.size = n.size), this;
            });
        var mt = U
            ? function (t) {
                return null == t
                    ? []
                    : ((t = Object(t)),
                        (function (t, e) {
                            for (var n = -1, r = null == t ? 0 : t.length, o = 0, i = []; ++n < r;) {
                                var a = t[n];
                                e(a, n, t) && (i[o++] = a);
                            }
                            return i;
                        })(U(t), function (e) {
                            return N.call(t, e);
                        }));
            }
            : function () {
                return [];
            },
            vt = ut;
        function _t(t, e) {
            return !!(e = null == e ? 9007199254740991 : e) && ("number" == typeof t || s.test(t)) && t > -1 && t % 1 == 0 && t < e;
        }
        function bt(t) {
            if (null != t) {
                try {
                    return I.call(t);
                } catch (t) { }
                try {
                    return t + "";
                } catch (t) { }
            }
            return "";
        }
        function St(t, e) {
            return t === e || (t != t && e != e);
        }
        ((G && "[object DataView]" != vt(new G(new ArrayBuffer(1)))) || (J && vt(new J()) != r) || (B && "[object Promise]" != vt(B.resolve())) || (z && vt(new z()) != i) || (W && "[object WeakMap]" != vt(new W()))) &&
            (vt = function (t) {
                var e = ut(t),
                    n = e == o ? t.constructor : void 0,
                    a = n ? bt(n) : "";
                if (a)
                    switch (a) {
                        case Y:
                            return "[object DataView]";
                        case Z:
                            return r;
                        case K:
                            return "[object Promise]";
                        case X:
                            return i;
                        case H:
                            return "[object WeakMap]";
                    }
                return e;
            });
        var xt = ct(
            (function () {
                return arguments;
            })()
        )
            ? ct
            : function (t) {
                return It(t) && L.call(t, "callee") && !N.call(t, "callee");
            },
            Et = Array.isArray;
        var Ct =
            V ||
            function () {
                return !1;
            };
        function wt(t) {
            if (!Pt(t)) return !1;
            var e = ut(t);
            return "[object Function]" == e || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e;
        }
        function Mt(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991;
        }
        function Pt(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e);
        }
        function It(t) {
            return null != t && "object" == typeof t;
        }
        var Lt = m
            ? (function (t) {
                return function (e) {
                    return t(e);
                };
            })(m)
            : function (t) {
                return It(t) && Mt(t.length) && !!u[ut(t)];
            };
        function kt(t) {
            return null != (e = t) && Mt(e.length) && !wt(e) ? at(t) : pt(t);
            var e;
        }
        t.exports = function (t, e) {
            return lt(t, e);
        };
    });
    var _e = {};
    function be(t, e) {
        for (var n = 0, r = t.length - 1; r >= 0; r--) {
            var o = t[r];
            "." === o ? t.splice(r, 1) : ".." === o ? (t.splice(r, 1), n++) : n && (t.splice(r, 1), n--);
        }
        if (e) for (; n--; n) t.unshift("..");
        return t;
    }
    var Se = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
        xe = function (t) {
            return Se.exec(t).slice(1);
        };
    function Ee() {
        for (var t = arguments, e = "", n = !1, r = arguments.length - 1; r >= -1 && !n; r--) {
            var o = r >= 0 ? t[r] : "/";
            if ("string" != typeof o) throw new TypeError("Arguments to path.resolve must be strings");
            o && ((e = o + "/" + e), (n = "/" === o.charAt(0)));
        }
        return (
            (n ? "/" : "") +
            (e = be(
                Pe(e.split("/"), function (t) {
                    return !!t;
                }),
                !n
            ).join("/")) || "."
        );
    }
    function Ce(t) {
        var e = we(t),
            n = "/" === Ie(t, -1);
        return (
            (t = be(
                Pe(t.split("/"), function (t) {
                    return !!t;
                }),
                !e
            ).join("/")) ||
            e ||
            (t = "."),
            t && n && (t += "/"),
            (e ? "/" : "") + t
        );
    }
    function we(t) {
        return "/" === t.charAt(0);
    }
    var Me = {
        extname: function (t) {
            return xe(t)[3];
        },
        basename: function (t, e) {
            var n = xe(t)[2];
            return e && n.substr(-1 * e.length) === e && (n = n.substr(0, n.length - e.length)), n;
        },
        dirname: function (t) {
            var e = xe(t),
                n = e[0],
                r = e[1];
            return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : ".";
        },
        sep: "/",
        delimiter: ":",
        relative: function (t, e) {
            function n(t) {
                for (var e = 0; e < t.length && "" === t[e]; e++);
                for (var n = t.length - 1; n >= 0 && "" === t[n]; n--);
                return e > n ? [] : t.slice(e, n - e + 1);
            }
            (t = Ee(t).substr(1)), (e = Ee(e).substr(1));
            for (var r = n(t.split("/")), o = n(e.split("/")), i = Math.min(r.length, o.length), a = i, s = 0; s < i; s++)
                if (r[s] !== o[s]) {
                    a = s;
                    break;
                }
            var u = [];
            for (s = a; s < r.length; s++) u.push("..");
            return (u = u.concat(o.slice(a))).join("/");
        },
        join: function () {
            var t = Array.prototype.slice.call(arguments, 0);
            return Ce(
                Pe(t, function (t, e) {
                    if ("string" != typeof t) throw new TypeError("Arguments to path.join must be strings");
                    return t;
                }).join("/")
            );
        },
        isAbsolute: we,
        normalize: Ce,
        resolve: Ee,
    };
    function Pe(t, e) {
        if (t.filter) return t.filter(e);
        for (var n = [], r = 0; r < t.length; r++) e(t[r], r, t) && n.push(t[r]);
        return n;
    }
    var Ie =
        "b" === "ab".substr(-1)
            ? function (t, e, n) {
                return t.substr(e, n);
            }
            : function (t, e, n) {
                return e < 0 && (e = t.length + e), t.substr(e, n);
            },
        Le = lt(function (t, e) {
            var n = (function () {
                var t = function (t, e, n, r) {
                    for (n = n || {}, r = t.length; r--; n[t[r]] = e);
                    return n;
                },
                    e = [1, 12],
                    n = [1, 13],
                    r = [1, 9],
                    o = [1, 10],
                    i = [1, 11],
                    a = [1, 14],
                    s = [1, 15],
                    u = [14, 18, 22, 24],
                    c = [18, 22],
                    l = [22, 24],
                    h = {
                        trace: function () { },
                        yy: {},
                        symbols_: {
                            error: 2,
                            JSONString: 3,
                            STRING: 4,
                            JSONNumber: 5,
                            NUMBER: 6,
                            JSONNullLiteral: 7,
                            NULL: 8,
                            JSONBooleanLiteral: 9,
                            TRUE: 10,
                            FALSE: 11,
                            JSONText: 12,
                            JSONValue: 13,
                            EOF: 14,
                            JSONObject: 15,
                            JSONArray: 16,
                            "{": 17,
                            "}": 18,
                            JSONMemberList: 19,
                            JSONMember: 20,
                            ":": 21,
                            ",": 22,
                            "[": 23,
                            "]": 24,
                            JSONElementList: 25,
                            $accept: 0,
                            $end: 1,
                        },
                        terminals_: { 2: "error", 4: "STRING", 6: "NUMBER", 8: "NULL", 10: "TRUE", 11: "FALSE", 14: "EOF", 17: "{", 18: "}", 21: ":", 22: ",", 23: "[", 24: "]" },
                        productions_: [0, [3, 1], [5, 1], [7, 1], [9, 1], [9, 1], [12, 2], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [15, 2], [15, 3], [20, 3], [19, 1], [19, 3], [16, 2], [16, 3], [25, 1], [25, 3]],
                        performAction: function (t, e, n, r, o, i, a) {
                            var s = i.length - 1;
                            switch (o) {
                                case 1:
                                    this.$ = t
                                        .replace(/\\(\\|")/g, "$1")
                                        .replace(/\\n/g, "\n")
                                        .replace(/\\r/g, "\r")
                                        .replace(/\\t/g, "\t")
                                        .replace(/\\v/g, "\v")
                                        .replace(/\\f/g, "\f")
                                        .replace(/\\b/g, "\b");
                                    break;
                                case 2:
                                    this.$ = Number(t);
                                    break;
                                case 3:
                                    this.$ = null;
                                    break;
                                case 4:
                                    this.$ = !0;
                                    break;
                                case 5:
                                    this.$ = !1;
                                    break;
                                case 6:
                                    return (this.$ = i[s - 1]);
                                case 13:
                                    (this.$ = {}), Object.defineProperty(this.$, "__line__", { value: this._$.first_line, enumerable: !1 });
                                    break;
                                case 14:
                                case 19:
                                    (this.$ = i[s - 1]), Object.defineProperty(this.$, "__line__", { value: this._$.first_line, enumerable: !1 });
                                    break;
                                case 15:
                                    this.$ = [i[s - 2], i[s]];
                                    break;
                                case 16:
                                    (this.$ = {}), (this.$[i[s][0]] = i[s][1]);
                                    break;
                                case 17:
                                    (this.$ = i[s - 2]),
                                        void 0 !== i[s - 2][i[s][0]] &&
                                        (this.$.__duplicateProperties__ || Object.defineProperty(this.$, "__duplicateProperties__", { value: [], enumerable: !1 }), this.$.__duplicateProperties__.push(i[s][0])),
                                        (i[s - 2][i[s][0]] = i[s][1]);
                                    break;
                                case 18:
                                    (this.$ = []), Object.defineProperty(this.$, "__line__", { value: this._$.first_line, enumerable: !1 });
                                    break;
                                case 20:
                                    this.$ = [i[s]];
                                    break;
                                case 21:
                                    (this.$ = i[s - 2]), i[s - 2].push(i[s]);
                            }
                        },
                        table: [
                            { 3: 5, 4: e, 5: 6, 6: n, 7: 3, 8: r, 9: 4, 10: o, 11: i, 12: 1, 13: 2, 15: 7, 16: 8, 17: a, 23: s },
                            { 1: [3] },
                            { 14: [1, 16] },
                            t(u, [2, 7]),
                            t(u, [2, 8]),
                            t(u, [2, 9]),
                            t(u, [2, 10]),
                            t(u, [2, 11]),
                            t(u, [2, 12]),
                            t(u, [2, 3]),
                            t(u, [2, 4]),
                            t(u, [2, 5]),
                            t([14, 18, 21, 22, 24], [2, 1]),
                            t(u, [2, 2]),
                            { 3: 20, 4: e, 18: [1, 17], 19: 18, 20: 19 },
                            { 3: 5, 4: e, 5: 6, 6: n, 7: 3, 8: r, 9: 4, 10: o, 11: i, 13: 23, 15: 7, 16: 8, 17: a, 23: s, 24: [1, 21], 25: 22 },
                            { 1: [2, 6] },
                            t(u, [2, 13]),
                            { 18: [1, 24], 22: [1, 25] },
                            t(c, [2, 16]),
                            { 21: [1, 26] },
                            t(u, [2, 18]),
                            { 22: [1, 28], 24: [1, 27] },
                            t(l, [2, 20]),
                            t(u, [2, 14]),
                            { 3: 20, 4: e, 20: 29 },
                            { 3: 5, 4: e, 5: 6, 6: n, 7: 3, 8: r, 9: 4, 10: o, 11: i, 13: 30, 15: 7, 16: 8, 17: a, 23: s },
                            t(u, [2, 19]),
                            { 3: 5, 4: e, 5: 6, 6: n, 7: 3, 8: r, 9: 4, 10: o, 11: i, 13: 31, 15: 7, 16: 8, 17: a, 23: s },
                            t(c, [2, 17]),
                            t(c, [2, 15]),
                            t(l, [2, 21]),
                        ],
                        defaultActions: { 16: [2, 6] },
                        parseError: function (t, e) {
                            if (!e.recoverable) {
                                function n(t, e) {
                                    (this.message = t), (this.hash = e);
                                }
                                throw ((n.prototype = Error), new n(t, e));
                            }
                            this.trace(t);
                        },
                        parse: function (t) {
                            var e = this,
                                n = [0],
                                r = [null],
                                o = [],
                                i = this.table,
                                a = "",
                                s = 0,
                                u = 0,
                                c = 2,
                                l = 1,
                                h = o.slice.call(arguments, 1),
                                p = Object.create(this.lexer),
                                d = { yy: {} };
                            for (var f in this.yy) Object.prototype.hasOwnProperty.call(this.yy, f) && (d.yy[f] = this.yy[f]);
                            p.setInput(t, d.yy), (d.yy.lexer = p), (d.yy.parser = this), void 0 === p.yylloc && (p.yylloc = {});
                            var g = p.yylloc;
                            o.push(g);
                            var y = p.options && p.options.ranges;
                            "function" == typeof d.yy.parseError ? (this.parseError = d.yy.parseError) : (this.parseError = Object.getPrototypeOf(this).parseError);
                            for (
                                var m,
                                v,
                                _,
                                b,
                                S,
                                x,
                                E,
                                C,
                                w = function () {
                                    var t;
                                    return "number" != typeof (t = p.lex() || l) && (t = e.symbols_[t] || t), t;
                                },
                                M = {};
                                ;

                            ) {
                                if (((v = n[n.length - 1]), this.defaultActions[v] ? (_ = this.defaultActions[v]) : (null == m && (m = w()), (_ = i[v] && i[v][m])), void 0 === _ || !_.length || !_[0])) {
                                    var P = "";
                                    for (S in ((C = []), i[v])) this.terminals_[S] && S > c && C.push("'" + this.terminals_[S] + "'");
                                    (P = p.showPosition
                                        ? "Parse error on line " + (s + 1) + ":\n" + p.showPosition() + "\nExpecting " + C.join(", ") + ", got '" + (this.terminals_[m] || m) + "'"
                                        : "Parse error on line " + (s + 1) + ": Unexpected " + (m == l ? "end of input" : "'" + (this.terminals_[m] || m) + "'")),
                                        this.parseError(P, { text: p.match, token: this.terminals_[m] || m, line: p.yylineno, loc: g, expected: C });
                                }
                                if (_[0] instanceof Array && _.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + v + ", token: " + m);
                                switch (_[0]) {
                                    case 1:
                                        n.push(m), r.push(p.yytext), o.push(p.yylloc), n.push(_[1]), (m = null), (u = p.yyleng), (a = p.yytext), (s = p.yylineno), (g = p.yylloc);
                                        break;
                                    case 2:
                                        if (
                                            ((x = this.productions_[_[1]][1]),
                                                (M.$ = r[r.length - x]),
                                                (M._$ = { first_line: o[o.length - (x || 1)].first_line, last_line: o[o.length - 1].last_line, first_column: o[o.length - (x || 1)].first_column, last_column: o[o.length - 1].last_column }),
                                                y && (M._$.range = [o[o.length - (x || 1)].range[0], o[o.length - 1].range[1]]),
                                                void 0 !== (b = this.performAction.apply(M, [a, u, s, d.yy, _[1], r, o].concat(h))))
                                        )
                                            return b;
                                        x && ((n = n.slice(0, -1 * x * 2)), (r = r.slice(0, -1 * x)), (o = o.slice(0, -1 * x))),
                                            n.push(this.productions_[_[1]][0]),
                                            r.push(M.$),
                                            o.push(M._$),
                                            (E = i[n[n.length - 2]][n[n.length - 1]]),
                                            n.push(E);
                                        break;
                                    case 3:
                                        return !0;
                                }
                            }
                            return !0;
                        },
                    },
                    p = {
                        EOF: 1,
                        parseError: function (t, e) {
                            if (!this.yy.parser) throw new Error(t);
                            this.yy.parser.parseError(t, e);
                        },
                        setInput: function (t, e) {
                            return (
                                (this.yy = e || this.yy || {}),
                                (this._input = t),
                                (this._more = this._backtrack = this.done = !1),
                                (this.yylineno = this.yyleng = 0),
                                (this.yytext = this.matched = this.match = ""),
                                (this.conditionStack = ["INITIAL"]),
                                (this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }),
                                this.options.ranges && (this.yylloc.range = [0, 0]),
                                (this.offset = 0),
                                this
                            );
                        },
                        input: function () {
                            var t = this._input[0];
                            return (
                                (this.yytext += t),
                                this.yyleng++,
                                this.offset++,
                                (this.match += t),
                                (this.matched += t),
                                t.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++,
                                this.options.ranges && this.yylloc.range[1]++,
                                (this._input = this._input.slice(1)),
                                t
                            );
                        },
                        unput: function (t) {
                            var e = t.length,
                                n = t.split(/(?:\r\n?|\n)/g);
                            (this._input = t + this._input), (this.yytext = this.yytext.substr(0, this.yytext.length - e)), (this.offset -= e);
                            var r = this.match.split(/(?:\r\n?|\n)/g);
                            (this.match = this.match.substr(0, this.match.length - 1)), (this.matched = this.matched.substr(0, this.matched.length - 1)), n.length - 1 && (this.yylineno -= n.length - 1);
                            var o = this.yylloc.range;
                            return (
                                (this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - e,
                                }),
                                this.options.ranges && (this.yylloc.range = [o[0], o[0] + this.yyleng - e]),
                                (this.yyleng = this.yytext.length),
                                this
                            );
                        },
                        more: function () {
                            return (this._more = !0), this;
                        },
                        reject: function () {
                            return this.options.backtrack_lexer
                                ? ((this._backtrack = !0), this)
                                : this.parseError(
                                    "Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(),
                                    { text: "", token: null, line: this.yylineno }
                                );
                        },
                        less: function (t) {
                            this.unput(this.match.slice(t));
                        },
                        pastInput: function () {
                            var t = this.matched.substr(0, this.matched.length - this.match.length);
                            return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "");
                        },
                        upcomingInput: function () {
                            var t = this.match;
                            return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "");
                        },
                        showPosition: function () {
                            var t = this.pastInput(),
                                e = new Array(t.length + 1).join("-");
                            return t + this.upcomingInput() + "\n" + e + "^";
                        },
                        test_match: function (t, e) {
                            var n, r, o;
                            if (
                                (this.options.backtrack_lexer &&
                                    ((o = {
                                        yylineno: this.yylineno,
                                        yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column },
                                        yytext: this.yytext,
                                        match: this.match,
                                        matches: this.matches,
                                        matched: this.matched,
                                        yyleng: this.yyleng,
                                        offset: this.offset,
                                        _more: this._more,
                                        _input: this._input,
                                        yy: this.yy,
                                        conditionStack: this.conditionStack.slice(0),
                                        done: this.done,
                                    }),
                                        this.options.ranges && (o.yylloc.range = this.yylloc.range.slice(0))),
                                    (r = t[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += r.length),
                                    (this.yylloc = {
                                        first_line: this.yylloc.last_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.last_column,
                                        last_column: r ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length,
                                    }),
                                    (this.yytext += t[0]),
                                    (this.match += t[0]),
                                    (this.matches = t),
                                    (this.yyleng = this.yytext.length),
                                    this.options.ranges && (this.yylloc.range = [this.offset, (this.offset += this.yyleng)]),
                                    (this._more = !1),
                                    (this._backtrack = !1),
                                    (this._input = this._input.slice(t[0].length)),
                                    (this.matched += t[0]),
                                    (n = this.performAction.call(this, this.yy, this, e, this.conditionStack[this.conditionStack.length - 1])),
                                    this.done && this._input && (this.done = !1),
                                    n)
                            )
                                return n;
                            if (this._backtrack) {
                                for (var i in o) this[i] = o[i];
                                return !1;
                            }
                            return !1;
                        },
                        next: function () {
                            if (this.done) return this.EOF;
                            var t, e, n, r;
                            this._input || (this.done = !0), this._more || ((this.yytext = ""), (this.match = ""));
                            for (var o = this._currentRules(), i = 0; i < o.length; i++)
                                if ((n = this._input.match(this.rules[o[i]])) && (!e || n[0].length > e[0].length)) {
                                    if (((e = n), (r = i), this.options.backtrack_lexer)) {
                                        if (!1 !== (t = this.test_match(n, o[i]))) return t;
                                        if (this._backtrack) {
                                            e = !1;
                                            continue;
                                        }
                                        return !1;
                                    }
                                    if (!this.options.flex) break;
                                }
                            return e
                                ? !1 !== (t = this.test_match(e, o[r])) && t
                                : "" === this._input
                                    ? this.EOF
                                    : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
                        },
                        lex: function () {
                            var t = this.next();
                            return t || this.lex();
                        },
                        begin: function (t) {
                            this.conditionStack.push(t);
                        },
                        popState: function () {
                            return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
                        },
                        _currentRules: function () {
                            return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
                        },
                        topState: function (t) {
                            return (t = this.conditionStack.length - 1 - Math.abs(t || 0)) >= 0 ? this.conditionStack[t] : "INITIAL";
                        },
                        pushState: function (t) {
                            this.begin(t);
                        },
                        stateStackSize: function () {
                            return this.conditionStack.length;
                        },
                        options: {},
                        performAction: function (t, e, n, r) {
                            switch (n) {
                                case 0:
                                    break;
                                case 1:
                                    return 6;
                                case 2:
                                    return (e.yytext = e.yytext.substr(1, e.yyleng - 2)), 4;
                                case 3:
                                    return 17;
                                case 4:
                                    return 18;
                                case 5:
                                    return 23;
                                case 6:
                                    return 24;
                                case 7:
                                    return 22;
                                case 8:
                                    return 21;
                                case 9:
                                    return 10;
                                case 10:
                                    return 11;
                                case 11:
                                    return 8;
                                case 12:
                                    return 14;
                                case 13:
                                    return "INVALID";
                            }
                        },
                        rules: [
                            /^(?:\s+)/,
                            /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,
                            /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,
                            /^(?:\{)/,
                            /^(?:\})/,
                            /^(?:\[)/,
                            /^(?:\])/,
                            /^(?:,)/,
                            /^(?::)/,
                            /^(?:true\b)/,
                            /^(?:false\b)/,
                            /^(?:null\b)/,
                            /^(?:$)/,
                            /^(?:.)/,
                        ],
                        conditions: { INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], inclusive: !0 } },
                    };
                function d() {
                    this.yy = {};
                }
                return (h.lexer = p), (d.prototype = h), (h.Parser = d), new d();
            })();
            void 0 !== ct &&
                ((e.parser = n),
                    (e.Parser = n.Parser),
                    (e.parse = function () {
                        return n.parse.apply(n, arguments);
                    }),
                    (e.main = function (t) {
                        t[1] || (console.log("Usage: " + t[0] + " FILE"), process.exit(1));
                        var n = _e.readFileSync(Me.normalize(t[1]), "utf8");
                        return e.parser.parse(n);
                    }),
                    ct.main === t && e.main(process.argv.slice(1)));
        });
    Le.parser, Le.Parser, Le.parse, Le.main;
    function ke(t) {
        return (t * Math.PI) / 180;
    }
    function Fe(t) {
        var e = 0;
        if (t.length > 2) for (var n, r, o = 0; o < t.length - 1; o++) (n = t[o]), (e += ke((r = t[o + 1])[0] - n[0]) * (2 + Math.sin(ke(n[1])) + Math.sin(ke(r[1]))));
        return e >= 0;
    }
    function Oe(t) {
        if (t && t.length > 0) {
            if (Fe(t[0])) return !1;
            if (!t.slice(1, t.length).every(Fe)) return !1;
        }
        return !0;
    }
    var Te = function (t, e) {
        (function (t) {
            return "Polygon" === t.type ? Oe(t.coordinates) : "MultiPolygon" === t.type ? t.coordinates.every(Oe) : void 0;
        })(t) || e.push({ message: "Polygons and MultiPolygons should follow the right-hand rule", level: "message", line: t.__line__ });
    };
    var je = {
        hint: function (t, e) {
            var n = [],
                r = 0;
            function o(t) {
                if (
                    ((e && !1 === e.noDuplicateMembers) || !t.__duplicateProperties__ || n.push({ message: "An object contained duplicate members, making parsing ambigous: " + t.__duplicateProperties__.join(", "), line: t.__line__ }),
                        !a(t, "type", "string"))
                )
                    if (p[t.type]) t && p[t.type](t);
                    else {
                        var r = d[t.type.toLowerCase()];
                        void 0 !== r ? n.push({ message: "Expected " + r + " but got " + t.type + " (case sensitive)", line: t.__line__ }) : n.push({ message: "The type " + t.type + " is unknown", line: t.__line__ });
                    }
            }
            function i(t, e) {
                return t.every(function (t) {
                    return null !== t && typeof t === e;
                });
            }
            function a(t, e, r) {
                if (void 0 === t[e]) return n.push({ message: '"' + e + '" member required', line: t.__line__ });
                if ("array" === r) {
                    if (!Array.isArray(t[e])) return n.push({ message: '"' + e + '" member should be an array, but is an ' + typeof t[e] + " instead", line: t.__line__ });
                } else {
                    if ("object" === r && t[e] && t[e].constructor !== Object) return n.push({ message: '"' + e + '" member should be ' + r + ", but is an " + t[e].constructor.name + " instead", line: t.__line__ });
                    if (r && typeof t[e] !== r) return n.push({ message: '"' + e + '" member should be ' + r + ", but is an " + typeof t[e] + " instead", line: t.__line__ });
                }
            }
            function s(t, o) {
                if (!Array.isArray(t)) return n.push({ message: "position should be an array, is a " + typeof t + " instead", line: t.__line__ || o });
                if (t.length < 2) return n.push({ message: "position must have 2 or more elements", line: t.__line__ || o });
                if (t.length > 3) return n.push({ message: "position should not have more than 3 elements", level: "message", line: t.__line__ || o });
                if (!i(t, "number")) return n.push({ message: "each element in a position must be a number", line: t.__line__ || o });
                if (e && e.precisionWarning) {
                    if (10 === r) return (r += 1), n.push({ message: "truncated warnings: we've encountered coordinate precision warning 10 times, no more warnings will be reported", level: "message", line: t.__line__ || o });
                    r < 10 &&
                        t.forEach(function (e) {
                            var i = 0,
                                a = String(e).split(".")[1];
                            if ((void 0 !== a && (i = a.length), i > 6)) return (r += 1), n.push({ message: "precision of coordinates should be reduced", level: "message", line: t.__line__ || o });
                        });
                }
            }
            function u(t, e, r, o) {
                if ((void 0 === o && void 0 !== t.__line__ && (o = t.__line__), 0 === r)) return s(t, o);
                if (1 === r && e)
                    if ("LinearRing" === e) {
                        if (!Array.isArray(t[t.length - 1])) return n.push({ message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply", line: o }), !0;
                        if (
                            (t.length < 4 && n.push({ message: "a LinearRing of coordinates needs to have four or more positions", line: o }),
                                t.length &&
                                (t[t.length - 1].length !== t[0].length ||
                                    !t[t.length - 1].every(function (e, n) {
                                        return t[0][n] === e;
                                    })))
                        )
                            return n.push({ message: "the first and last positions in a LinearRing of coordinates must be the same", line: o }), !0;
                    } else if ("Line" === e && t.length < 2) return n.push({ message: "a line needs to have two or more coordinates to be valid", line: o });
                if (Array.isArray(t))
                    return t
                        .map(function (t) {
                            return u(t, e, r - 1, t.__line__ || o);
                        })
                        .some(function (t) {
                            return t;
                        });
                n.push({ message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply", line: o });
            }
            function c(t) {
                if (t.crs) {
                    "object" == typeof t.crs && t.crs.properties && "urn:ogc:def:crs:OGC:1.3:CRS84" === t.crs.properties.name
                        ? n.push({ message: "old-style crs member is not recommended, this object is equivalent to the default and should be removed", line: t.__line__ })
                        : n.push({ message: "old-style crs member is not recommended", line: t.__line__ });
                }
            }
            function l(t) {
                if (t.bbox)
                    return Array.isArray(t.bbox)
                        ? (i(t.bbox, "number") || n.push({ message: "each element in a bbox member must be a number", line: t.bbox.__line__ }),
                            4 !== t.bbox.length && 6 !== t.bbox.length && n.push({ message: "bbox must contain 4 elements (for 2D) or 6 elements (for 3D)", line: t.bbox.__line__ }),
                            n.length)
                        : void n.push({ message: "bbox member must be an array of numbers, but is a " + typeof t.bbox, line: t.__line__ });
            }
            function h(t) {
                c(t),
                    l(t),
                    void 0 !== t.id && "string" != typeof t.id && "number" != typeof t.id && n.push({ message: 'Feature "id" member must have a string or number value', line: t.__line__ }),
                    void 0 !== t.features && n.push({ message: 'Feature object cannot contain a "features" member', line: t.__line__ }),
                    void 0 !== t.coordinates && n.push({ message: 'Feature object cannot contain a "coordinates" member', line: t.__line__ }),
                    "Feature" !== t.type && n.push({ message: "GeoJSON features must have a type=feature member", line: t.__line__ }),
                    a(t, "properties", "object"),
                    a(t, "geometry", "object") || (t.geometry && o(t.geometry));
            }
            var p = {
                Point: function (t) {
                    var e;
                    c(t),
                        l(t),
                        void 0 !== (e = t).properties && n.push({ message: 'geometry object cannot contain a "properties" member', line: e.__line__ }),
                        void 0 !== e.geometry && n.push({ message: 'geometry object cannot contain a "geometry" member', line: e.__line__ }),
                        void 0 !== e.features && n.push({ message: 'geometry object cannot contain a "features" member', line: e.__line__ }),
                        a(t, "coordinates", "array") || s(t.coordinates);
                },
                Feature: h,
                MultiPoint: function (t) {
                    c(t), l(t), a(t, "coordinates", "array") || u(t.coordinates, "", 1);
                },
                LineString: function (t) {
                    c(t), l(t), a(t, "coordinates", "array") || u(t.coordinates, "Line", 1);
                },
                MultiLineString: function (t) {
                    c(t), l(t), a(t, "coordinates", "array") || u(t.coordinates, "Line", 2);
                },
                FeatureCollection: function (t) {
                    if (
                        (c(t),
                            l(t),
                            void 0 !== t.properties && n.push({ message: 'FeatureCollection object cannot contain a "properties" member', line: t.__line__ }),
                            void 0 !== t.coordinates && n.push({ message: 'FeatureCollection object cannot contain a "coordinates" member', line: t.__line__ }),
                            !a(t, "features", "array"))
                    ) {
                        if (!i(t.features, "object")) return n.push({ message: "Every feature must be an object", line: t.__line__ });
                        t.features.forEach(h);
                    }
                },
                GeometryCollection: function (t) {
                    c(t),
                        l(t),
                        a(t, "geometries", "array") ||
                        (i(t.geometries, "object") || n.push({ message: "The geometries array in a GeometryCollection must contain only geometry objects", line: t.__line__ }),
                            1 === t.geometries.length && n.push({ message: "GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type", line: t.geometries.__line__ }),
                            t.geometries.forEach(function (e) {
                                e && ("GeometryCollection" === e.type && n.push({ message: "GeometryCollection should avoid nested geometry collections", line: t.geometries.__line__ }), o(e));
                            }));
                },
                Polygon: function (t) {
                    c(t), l(t), a(t, "coordinates", "array") || u(t.coordinates, "LinearRing", 2) || Te(t, n);
                },
                MultiPolygon: function (t) {
                    c(t), l(t), a(t, "coordinates", "array") || u(t.coordinates, "LinearRing", 3) || Te(t, n);
                },
            },
                d = Object.keys(p).reduce(function (t, e) {
                    return (t[e.toLowerCase()] = e), t;
                }, {});
            return "object" != typeof t || null == t
                ? (n.push({ message: "The root of a GeoJSON object must be an object.", line: 0 }), n)
                : (o(t),
                    n.forEach(function (t) {
                        ({}.hasOwnProperty.call(t, "line") && void 0 === t.line && delete t.line);
                    }),
                    n);
        },
    };
    var Ae = {
        hint: function (t, e) {
            var n,
                r = [];
            if ("object" == typeof t) n = t;
            else {
                if ("string" != typeof t) return [{ message: "Expected string or object as input", line: 0 }];
                try {
                    n = Le.parse(t);
                } catch (t) {
                    var o = t.message.match(/line (\d+)/);
                    return [{ line: parseInt(o[1], 10) - 1, message: t.message, error: t }];
                }
            }
            return (r = r.concat(je.hint(n, e)));
        },
    },
        Ne = { Polygon: gt, LineString: ft, Point: dt, MultiPolygon: vt, MultiLineString: vt, MultiPoint: vt };
    function De(t, e) {
        return (
            (e.modes = A),
            (e.getFeatureIdsAt = function (e) {
                return rt.click({ point: e }, null, t).map(function (t) {
                    return t.properties.id;
                });
            }),
            (e.getSelectedIds = function () {
                return t.store.getSelectedIds();
            }),
            (e.getSelected = function () {
                return {
                    type: k,
                    features: t.store
                        .getSelectedIds()
                        .map(function (e) {
                            return t.store.get(e);
                        })
                        .map(function (t) {
                            return t.toGeoJSON();
                        }),
                };
            }),
            (e.getSelectedPoints = function () {
                return {
                    type: k,
                    features: t.store.getSelectedCoordinates().map(function (t) {
                        return { type: M, properties: {}, geometry: { type: L, coordinates: t.coordinates } };
                    }),
                };
            }),
            (e.set = function (n) {
                if (void 0 === n.type || n.type !== k || !Array.isArray(n.features)) throw new Error("Invalid FeatureCollection");
                var r = t.store.createRenderBatch(),
                    o = t.store.getAllIds().slice(),
                    i = e.add(n),
                    a = new et(i);
                return (
                    (o = o.filter(function (t) {
                        return !a.has(t);
                    })).length && e.delete(o),
                    r(),
                    i
                );
            }),
            (e.add = function (e) {
                var n = Ae.hint(e, { precisionWarning: !1 }).filter(function (t) {
                    return "message" !== t.level;
                });
                if (n.length) throw new Error(n[0].message);
                var r = JSON.parse(JSON.stringify(Wt(e))).features.map(function (e) {
                    if (((e.id = e.id || ht()), null === e.geometry)) throw new Error("Invalid geometry: null");
                    if (void 0 === t.store.get(e.id) || t.store.get(e.id).type !== e.geometry.type) {
                        var n = Ne[e.geometry.type];
                        if (void 0 === n) throw new Error("Invalid geometry type: " + e.geometry.type + ".");
                        var r = new n(t, e);
                        t.store.add(r);
                    } else {
                        var o = t.store.get(e.id);
                        (o.properties = e.properties), ve(o.getCoordinates(), e.geometry.coordinates) || o.incomingCoords(e.geometry.coordinates);
                    }
                    return e.id;
                });
                return t.store.render(), r;
            }),
            (e.get = function (e) {
                var n = t.store.get(e);
                if (n) return n.toGeoJSON();
            }),
            (e.getAll = function () {
                return {
                    type: k,
                    features: t.store.getAll().map(function (t) {
                        return t.toGeoJSON();
                    }),
                };
            }),
            (e.delete = function (n) {
                return t.store.delete(n, { silent: !0 }), e.getMode() !== A.DIRECT_SELECT || t.store.getSelectedIds().length ? t.store.render() : t.events.changeMode(A.SIMPLE_SELECT, void 0, { silent: !0 }), e;
            }),
            (e.deleteAll = function () {
                return t.store.delete(t.store.getAllIds(), { silent: !0 }), e.getMode() === A.DIRECT_SELECT ? t.events.changeMode(A.SIMPLE_SELECT, void 0, { silent: !0 }) : t.store.render(), e;
            }),
            (e.changeMode = function (n, r) {
                return (
                    void 0 === r && (r = {}),
                    n === A.SIMPLE_SELECT && e.getMode() === A.SIMPLE_SELECT
                        ? ((o = r.featureIds || []),
                            (i = t.store.getSelectedIds()),
                            (o.length === i.length &&
                                JSON.stringify(
                                    o
                                        .map(function (t) {
                                            return t;
                                        })
                                        .sort()
                                ) ===
                                JSON.stringify(
                                    i
                                        .map(function (t) {
                                            return t;
                                        })
                                        .sort()
                                )) ||
                            (t.store.setSelected(r.featureIds, { silent: !0 }), t.store.render()),
                            e)
                        : ((n === A.DIRECT_SELECT && e.getMode() === A.DIRECT_SELECT && r.featureId === t.store.getSelectedIds()[0]) || t.events.changeMode(n, r, { silent: !0 }), e)
                );
                var o, i;
            }),
            (e.getMode = function () {
                return t.events.getMode();
            }),
            (e.trash = function () {
                return t.events.trash({ silent: !0 }), e;
            }),
            (e.combineFeatures = function () {
                return t.events.combineFeatures({ silent: !0 }), e;
            }),
            (e.uncombineFeatures = function () {
                return t.events.uncombineFeatures({ silent: !0 }), e;
            }),
            (e.setFeatureProperty = function (n, r, o) {
                return t.store.setFeatureProperty(n, r, o), e;
            }),
            e
        );
    }
    var Re = function (t, e) {
        var n = {
            options: (t = (function (t) {
                void 0 === t && (t = {});
                var e = Pt(t);
                return t.controls || (e.controls = {}), !1 === t.displayControlsDefault ? (e.controls = Pt(ye, t.controls)) : (e.controls = Pt(ge, t.controls)), ((e = Pt(fe, e)).styles = me(e.styles, "cold").concat(me(e.styles, "hot"))), e;
            })(t)),
        };
        (e = De(n, e)), (n.api = e);
        var r = kt(n);
        return (e.onAdd = r.onAdd), (e.onRemove = r.onRemove), (e.types = w), (e.options = t), e;
    };
    function Ue(t) {
        Re(t, this);
    }
    return (Ue.modes = de), Ue;
});
