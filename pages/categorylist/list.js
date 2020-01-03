function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../config/api.config.js")), e = t(require("../../service/service.js")), i = t(require("../../service/app.setting.js"));

Page({
    data: {
        cateList: null,
        title: "",
        current_page: 1,
        page_total: 1,
        cid: 0,
        pageConfig: null
    },
    _init: function() {
        var t = this;
        i.default.request(function(a) {
            var e = i.default.settings;
            t.setData({
                pageConfig: e
            });
        }), this.data.cid && e.default.request({
            url: a.default.api.CategoryList,
            data: {
                cid: this.data.cid,
                page: this.data.current_page
            },
            success: function(a) {
                a.data.data ? t.setData({
                    cateList: a.data.data.lists,
                    current_page: a.data.data.current_page,
                    page_total: a.data.data.page_total
                }) : wx.showModal({
                    title: "系统提示",
                    content: a.data.msg,
                    showCancel: !1
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "系统提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    onLoad: function(t) {
        var a = t.cate;
        this.setData({
            cid: a
        });
        var e = t.title;
        this._init(), this.setData({
            title: t.title || ""
        }), this.data.title && wx.setNavigationBarTitle({
            title: e
        });
    },
    onShow: function() {},
    onReachBottom: function() {
        var t = this, i = this.data.current_page;
        if (i < this.data.page_total) {
            i++;
            var s = this.data.cateList;
            e.default.request({
                url: a.default.api.CategoryList,
                data: {
                    cid: this.data.cid,
                    page: i
                },
                success: function(a) {
                    a.data.data ? t.setData({
                        cateList: s.concat(a.data.data.lists),
                        current_page: a.data.data.current_page,
                        page_total: a.data.data.page_total
                    }) : wx.showModal({
                        title: "系统提示",
                        content: a.data.msg,
                        showCancel: !1
                    });
                },
                fail: function(t) {
                    wx.showModal({
                        title: "系统提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index"
        };
    }
});