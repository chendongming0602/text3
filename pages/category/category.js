function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../config/api.config.js")), a = e(require("../../service/service.js")), n = e(require("../../service/app.setting.js"));
const APP=getApp();
Page({
    data: {
      categories: null,
      pageConfig: null,
      isPower: true,
      isCheck: false
    },
    loginEvent() {
      this.setData({
        isPower: true
      });
    },
    allS() {
      this.setData({
        isPower: APP.userInfo.isPower,
        isCheck: APP.isCheck
      });
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
    onShow: function() {
      if (APP.isCallback) {
        this.allS();
      } else {
        APP.callbackEvent = res => {
          this.allS();
        };
      };
    },
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index"
        };
    }
});