function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../service/app.setting.js")), e = a(require("../../config/api.config.js")), i = a(require("../../service/service.js")), n = getApp();
const APP=getApp();
Page({
    data: {
        pageConfig: t.default.settings,
        lists: null,
        pageTotal: 0,
        currentPage: 1,
        itemNum: 0,
        bannerList: [],
        adList: [],
        swiperConfig: {
            hasDesc: !0,
            autoHeight: !1,
            height: "300",
            autoplay: !0,
            interval: 3e3
        },
        closeDuration: 8e3,
        hideTag: !1,
        isPower:true,
        isCheck:false
    },
    loginEvent(){
      this.setData({
        isPower:true
      });
    },
    _init: function() {
        var a = this;
        t.default.request(function(e) {
            var i = t.default.settings;
            /*console.log(i),*/ a.setData({
                pageConfig: i,
                itemNum: i.txts.ad_limit || ""
            });
        }), i.default.getList(e.default.api.recommend, {
            page: this.data.currentPage
        }, function(t) {
            if (!t.data.data) return !1;
            a.setData({
                lists: t.data.data.lists,
                currentPage: t.data.data.current_page,
                pageTotal: t.data.data.page_total
            });
        }), i.default.request({
            url: e.default.api.Index,
            success: function(t) {
                t.data.data && a.setData({
                    bannerList: t.data.data.index_banner,
                    adList: t.data.data.top_focus
                });
            }
        });
    },
    onLoad: function(a) {
      
    },
    allS(){
      this.setData({
        isPower: APP.userInfo.isPower,
        isCheck: APP.isCheck
      });
    },
    frameEvent() {//打开收藏提示框
      this.selectComponent('#frame').showEvent();
    },
    onShow: function() {
        var a = this;
        wx.getStorageSync("userInfo") ? this._init() : n.loginCallBack = function(t) {
            a._init();
        };
      if (APP.isCallback) {
        this.allS();
      } else {
        APP.callbackEvent = res => {
          this.allS();
        };
      };
    },
    onHide: function() {},
    onUnload: function() {},
    _nextPage: function() {
        var a = this, t = this.data.currentPage;
        t++, i.default.getList(e.default.api.recommend, {
            page: t
        }, function(e) {
            a.setData({
                lists: e.data.data.lists,
                currentPage: t
            });
        });
    },
    onPullDownRefresh: function() {
        var a = this, t = this.data.currentPage;
        t++, i.default.getList(e.default.api.recommend, {
            page: t
        }, function(e) {
            a.setData({
                lists: e.data.data.lists,
                currentPage: t
            }), wx.stopPullDownRefresh();
        });
    },
    _formSubmit: function(a) {
        var t = a.detail.formId;
        i.default.request({
            url: e.default.api.submit,
            data: {
                formid: t
            }
        });
    },
    _toDetail: function(a) {
        var t = a.currentTarget.dataset.aid;
        wx.navigateTo({
            url: "/pages/article/detail?aid=" + t
        });
    },
    _asideBtnTap: function(a) {
        var t = a.currentTarget.dataset.appid, e = a.currentTarget.dataset.opentype, i = a.currentTarget.dataset.path;
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
                appId: t,
                path: i,
                extraData: {
                    fromId: "wish"
                },
                success: function(a) {},
                fail: function(a) {
                    console.log(a), console.log(a);
                }
            });
            break;

          case "qrcode":
            var n = a.currentTarget.dataset.qrcode, r = [];
            r[0] = n, wx.previewImage({
                urls: r
            });
        }
    },
    onShareAppMessage: function() {
        var a = this.data.pageConfig.txts.share_title;
        return wx.updateShareMenu({
            withShareTicket: !0
        }), {
            title: a,
            imageUrl: this.data.pageConfig.images.share_image ? this.data.pageConfig.images.share_image : ""
        };
    },
    closeTag: function() {
        this.setData({
            hideTag: !0
        });
    }
});