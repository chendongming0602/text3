function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("./service/service.js")), a = t(require("./config/api.config.js"));

App({
    onLaunch: function() {
        var t = this;
        e.default.getUserInfo(function(i) {
            e.default.request({
                url: a.default.api.init,
                data: {},
                success: function(e) {
                    wx.getSetting({
                        success: function(a) {
                            a.errMsg.indexOf("ok") && (t.globalData.authSettings = a.authSetting, t.loginCallBack && t.loginCallBack(e), 
                            t.authCallBack && t.authCallBack());
                        }
                    });
                }
            });
        });
    },
    globalData: {
        authSettings: null,
        version: 5.2
    },
    siteInfo: require("siteinfo.js")
});