void 0 === window.centovacast && (window.centovacast = {});
void 0 === window.centovacast.options && (window.centovacast.options = {});
void 0 === window.centovacast.loader && (window.centovacast.loader = {
    attempts: 0,
    external_jquery: !1,
    loaded: !1,
    ready: !1,
    widget_definitions: {},
    url: "",
    load_script: function(b) {
        var a = document.createElement("script");
        void 0 !== a && (a.setAttribute("type", "text/javascript"), a.setAttribute("src", b), void 0 !== a && document.getElementsByTagName("head")[0].appendChild(a))
    },
    load_widget: function(b) {
        b = this.widget_definitions[b];
        null === b.ref && (b.ref = b.define(jQuery))
    },
    jq_get_jsonp: function(b, a, c) {
        return jQuery.ajax({
            type: "GET",
            url: b,
            data: a,
            success: c,
            dataType: "jsonp"
        })
    },
    jq_ready: function() { this.ready = !0; for (var b in this.widget_definitions) "function" == typeof this.widget_definitions[b].init && this.widget_definitions[b].init(jQuery) },
    jq_loaded: function() {
        this.external_jquery || jQuery.noConflict();
        jQuery.getJSONP = this.jq_get_jsonp;
        for (var b in this.widget_definitions) this.load_widget(b);
        this.loaded = !0;
        var a = this;
        jQuery(document).ready(function() { a.jq_ready() })
    },
    wait: function() {
        setTimeout(function() { window.centovacast.loader.check() },
            100)
    },
    check: function() { "undefined" === typeof jQuery ? (this.wait(), this.attempts++) : this.jq_loaded() },
    get_script_data: function(b, a, c) {
        var d = jQuery(b),
            e = !1;
        b = {};
        var f, g, h;
        for (h in a) a.hasOwnProperty(h) && (f = a[h], (g = d.data(f)) ? (b[f] = g, e = !0) : b[f] = "");
        g = d.attr("id");
        if (e) "string" != typeof g && (window.centovacast.next_unique_id = window.centovacast.next_unique_id ? window.centovacast.next_unique_id + 1 : 1, g = c + "_" + window.centovacast.next_unique_id, d.attr("id", g));
        else {
            if ("string" != typeof g || g.substr(0, c.length + 1) !=
                c + "_") return null;
            c = g.substr(c.length + 1);
            e = null;
            for (h in a)
                if (a.hasOwnProperty(h)) {
                    f = a[h];
                    null === e && (e = f);
                    var d = new RegExp("_" + h + "-([^_]+)"),
                        k = d.exec(c);
                    k && (b[f] = k[1], c = c.replace(d, ""))
                }
            b[e] = c
        }
        b.id = g;
        return b
    },
    init: function() {
        var b = document.getElementsByTagName("script"),
            b = b[b.length - 1],
            b = void 0 !== b.getAttribute.length ? b.getAttribute("src") : b.getAttribute("src", 2);
        b.match(/^https?:\/\//i) || (b = window.location.href);
        this.url = b.replace(/(\.(?:[a-z]{2,}|[0-9]+)(:[0-9]+)?\/).*$/i, "$1");
        (this.external_jquery =
            "undefined" !== typeof jQuery) || this.load_script(this.url + "/js/jquery-2.1.1.min.js");
        this.check()
    },
    add: function(b, a, c) {
        this.widget_definitions[b] || (this.widget_definitions[b] = { define: c, init: a, ref: null });
        this.loaded && this.load_widget(b);
        this.ready && a(jQuery)
    }
}, window.centovacast.loader.init());
window.centovacast.loader.add("streaminfo", function(b) {
    b.extend(window.centovacast.streaminfo.settings, window.centovacast.options.streaminfo);
    window.centovacast.streaminfo.settings.manual || window.centovacast.streaminfo.run()
}, function(b) {
    window.centovacast.options.streaminfo = b.extend({}, window.centovacast.options.streaminfo, window.centovacast.streaminfo ? window.centovacast.streaminfo.config : null);
    return window.centovacast.streaminfo = {
        pollcount: 0,
        settings: { poll_limit: 60, poll_frequency: 6E4 },
        state: {},
        registry: {},
        check_username: function(a) { a += ""; if (!this.registry[a]) { if (1 == this.registry.length) { for (var b in this.registry) a = b; return a } return "" } return a },
        get_streaminfo_element: function(a, c) { return b("#" + this.registry[a].id[c]) },
        _handle_json: function(a) {
            if (a) {
                var c = this.check_username(a.rid);
                !c.length && a.requestdata && (c = this.check_username(a.requestdata.rid));
                if (c.length)
                    if ("error" == a.type) {
                        if (a = a ? a.error : "No JSON object", this.get_streaminfo_element(c, "song").html('<span title="' + a + '">Unavailable</span>'),
                            "function" == typeof this.settings.on_error_callback) this.settings.on_error_callback(a)
                    } else {
                        var d, e = a.data[0];
                        this.state = e;
                        a.data[0].songchanged = e.song != this.settings.lastsong;
                        "function" == typeof this.settings.before_change_callback && this.settings.before_change_callback(a);
                        for (d in e) "song" == d || "string" != typeof e[d] && "number" != typeof e[d] || this.get_streaminfo_element(c, d).html(e[d]);
                        if ("object" == typeof e.track) {
                            for (d in e.track) "buyurl" == d || "imageurl" == d || "playlist" == d || "string" != typeof e.track[d] &&
                                "number" != typeof e.track[d] || this.get_streaminfo_element(c, "track" + d).html(e.track[d]);
                            this.get_streaminfo_element(c, "playlist").html("object" == typeof e.track.playlist ? e.track.playlist.title : "");
                            d = e.track.buyurl ? e.track.buyurl : "javascript:void(0)";
                            b("img#" + this.registry[c].id.trackimageurl).attr("src", e.track.imageurl);
                            b("a#" + this.registry[c].id.trackbuyurl).attr("href", d)
                        }
                        "function" == typeof this.settings.after_change_callback && this.settings.after_change_callback(a);
                        var f = e.song;
                        f && f != this.registry[c].current_song &&
                            (this.get_streaminfo_element(c, "song").fadeOut("fast", function() {
                                b(this).html(f);
                                b(this).fadeIn("fast")
                            }), this.registry[c].current_song = f)
                    }
            }
        },
        handle_json: function(a, b, d) { a && window.centovacast.streaminfo._handle_json(a) },
        poll: function(a) { b.getJSONP((this.settings.local ? "/" : window.centovacast.loader.url) + "external/rpc.php", { m: "streaminfo.get", username: a, charset: this.registry[a].charset, mountpoint: this.registry[a].mountpoint, rid: a }, this.handle_json) },
        _poll_all: function() {
            for (var a in this.registry) "string" ==
                typeof a && this.poll(a);
            (0 === this.settings.poll_limit || this.pollcount++ < this.settings.poll_limit) && setTimeout(this.poll_all, this.settings.poll_frequency)
        },
        poll_all: function() { window.centovacast.streaminfo._poll_all() },
        register: function(a, b, d, e) {
            this.registry[b] || (this.registry[b] = { charset: d, mountpoint: e, current_song: "", id: {} });
            (d = a.match(/^cc_strinfo_([a-z]+)_/)) && (this.registry[b].id[d[1]] = a)
        },
        load: function() {
            var a = b(this).attr("id");
            if ("string" == typeof a) {
                var c = a.replace(/^cc_strinfo_[a-z]+_/, ""),
                    d = "",
                    e = "",
                    f = /_cs-([A-Za-z0-9\-]+)$/,
                    g = f.exec(c);
                g && (d = g[1], c = c.replace(f, ""));
                f = /_mp-([A-Za-z0-9\-]+)$/;
                if (g = f.exec(c)) e = g[1], c = c.replace(f, "");
                window.centovacast.streaminfo.register(a, c, d, e)
            }
        },
        run: function() {
            b(".cc_streaminfo").each(window.centovacast.streaminfo.load);
            window.centovacast.streaminfo.poll_all()
        }
    }
});