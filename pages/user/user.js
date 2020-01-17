const APP=getApp();
Page({
    data: {
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
    onLoad: function(n) {},
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
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});