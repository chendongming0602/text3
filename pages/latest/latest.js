function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../service/app.setting.js")), e = t(require("../../config/api.config.js")), i = t(require("../../service/service.js"));

getApp();

Page({
    data: {
        pageConfig: null,
        lists: null,
        pageTotal: 0,
        currentPage: 0,
        itemNum: 5
    },
    _init: function() {
        var t = this;
        i.default.getList(e.default.api.hot, {
            page: this.data.currentPage
        }, function(a) {
            if (!a.data.data) return !1;
            t.setData({
                lists: a.data.data.lists,
                currentPage: a.data.data.current_page,
                pageTotal: a.data.data.page_total
            });
        }), this.setData({
            pageConfig: a.default.settings
        }), a.default.setNavBarTitle();
    },
    onLoad: function(t) {
        this._init();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this, a = this.data.currentPage, n = this.data.lists;
        a < this.data.pageTotal && (a++, i.default.getList(e.default.api.hot, {
            page: a
        }, function(e) {
            n.push.apply(n, e.data.data.lists), t.setData({
                lists: n,
                currentPage: a
            });
        }));
    },
    onShareAppMessage: function() {},
    _formSubmit: function(t) {
        var a = t.detail.formId;
        i.default.request({
            url: e.default.api.submit,
            data: {
                formid: a
            }
        });
    },
    _toDetail: function(t) {
        var a = t.currentTarget.dataset.aid;
        wx.navigateTo({
            url: "/pages/article/detail?aid=" + a
        });
    },
    _asideBtnTap: function(t) {
        var a = t.currentTarget.dataset.appid, e = t.currentTarget.dataset.opentype, i = t.currentTarget.dataset.path;
        switch (e) {
          case "page":
            wx.reLaunch({
                url: i
            });
            break;

          case "website":
            wx.redirectTo({
                url: "/pages/gotoUrl/gotoUrl?url=" + encodeURIComponent(i)
            });
            break;

          case "wxapp":
            wx.navigateToMiniProgram({
                appId: a,
                path: i,
                extraData: {
                    fromId: "wish"
                },
                success: function(t) {},
                fail: function(t) {
                    console.log(t), console.log(t);
                }
            });
            break;

          case "qrcode":
            var n = t.currentTarget.dataset.qrcode, r = [];
            r[0] = n, wx.previewImage({
                urls: r
            });
        }
    }
});