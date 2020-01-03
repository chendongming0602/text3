function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../config/api.config.js")), a = e(require("../../service/service.js")), n = e(require("../../service/app.setting.js"));

Page({
    data: {
        categories: null,
        pageConfig: null
    },
    _init: function() {
        var e = this;
        n.default.request(function(t) {
            var a = n.default.settings;
            e.setData({
                pageConfig: a
            });
        }), a.default.request({
            url: t.default.api.Category,
            data: {},
            success: function(t) {
                t.data.data ? e.setData({
                    categories: t.data.data
                }) : wx.showModal({
                    title: "系统提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "系统提示",
                    content: e.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    onLoad: function(e) {
        this._init();
    },
    onReady: function() {},
    onShow: function() {},
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index"
        };
    }
});