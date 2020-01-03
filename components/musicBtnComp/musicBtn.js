!function(t) {
    t && t.__esModule;
}(require("../../config/api.config.js"));

var t = t || wx.createInnerAudioContext();

t.autoplay = !0, Component({
    properties: {
        btnPos: {
            type: Object,
            value: ""
        },
        btnImage: {
            type: String,
            value: ""
        },
        bgMusic: {
            type: String,
            value: "",
            observer: "_bgMusicChange"
        }
    },
    data: {
        pos: {
            left: "6%",
            top: "6%"
        },
        btnBgImage: "../../images/icons/music_btn.png",
        bgm: "http://pic.ibaotu.com/00/61/06/80m888piCsay.mp3",
        isPlay: !1
    },
    attached: function() {
        this.properties.btnPos && this.setData({
            pos: this.properties.btnPos
        }), this.properties.btnImage && this.setData({
            btnBgImage: this.properties.btnImage
        });
    },
    detached: function() {
        t.stop();
    },
    methods: {
        _controlMusic: function() {
            this.data.isPlay ? (t.pause(), this.setData({
                isPlay: !1
            })) : (t.play(), this.setData({
                isPlay: !0
            }));
        },
        _formSubmit: function() {},
        _bgMusicChange: function(a, s) {
            var e = this;
            this.setData({
                bgm: a
            }), this.data.bgm ? (t.src = this.data.bgm, t.onCanplay(function() {
                e.setData({
                    isPlay: t.paused
                });
            })) : t.pause();
        }
    }
});