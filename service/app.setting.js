function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./service.js")), s = t(require("../config/api.config.js")), i = t(require("../config/assets.config.js"));

exports.default = {
    settings: i.default,
    isExpired: !1,
    storageExpired: 18e5,
    getSetting: function(t, e) {
        var s = wx.getStorageSync("settings");
        s ? (this.isExpired = 1 * wx.getStorageSync("settingUpdate") < 1 * s.verycode_last_update, 
        this.isExpired ? (wx.removeStorageSync("settings"), this.request(t, e)) : (this.settings = s, 
        t && t())) : this.request(t, e);
    },
    request: function(t, i) {
        var a = this;
        e.default.request({
            url: s.default.api.setting,
            data: {},
            success: function(e) {
                a.settings = e.data.data.setting, wx.setStorageSync("settings", a.settings), a.setNavBarTitle(), 
                t && t(e);
            },
            fail: function(t) {
                i && i(t);
            }
        });
    },
    setNavBarTitle: function() {
        var t = "", e = "", s = "";
        "on" == wx.getStorageSync("settings").txts.set_nav_bar && (t = this.settings.txts.nav_bar_title || wx.getStorageSync("settings").txts.nav_bar_title, 
        e = this.settings.txts.nav_bar_bg || wx.getStorageSync("settings").txts.nav_bar_bg, 
        s = this.settings.txts.nav_bar_title_style || wx.getStorageSync("settings").txts.nav_bar_title_style, 
        wx.setNavigationBarTitle({
            title: t
        }), wx.setNavigationBarColor({
            frontColor: s || "#ffffff",
            backgroundColor: e || "#000000"
        }));
    }
};