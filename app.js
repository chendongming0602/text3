function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}
const ald = require('./we7/libs/ald-stat.js');
var e = t(require("./service/service.js")), a = t(require("./config/api.config.js")), s = t(require("./service/app.setting.js"));

App({
    isCallback:false,
    userInfo: {
      isPower: false
    },
    isCheck:false,
    onLaunch: function() {
      Promise.all([this.getUserPic()]).then(res => {
        this.isCheck = s.default.settings.is_check;
        this.isCallback = true;
        if (this.callbackEvent) {
          this.callbackEvent();
        }
      }).catch(err => {
        this.isCallback = true;
        this.userInfo.isPower = true;//已经授权
        if (this.callbackEvent) {
          this.callbackEvent();
        }
      })
    },
    getUserPic(){
      return new Promise((reslove,reject)=>{
        var t = this;
        wx.getSetting({
          success: res => {
            e.default.getUserInfo(function (i) {
              e.default.request({
                url: a.default.api.init,
                data: {},
                success: function (e) {
                  res.errMsg.indexOf("ok") && (t.globalData.authSettings = res.authSetting, t.loginCallBack && t.loginCallBack(e),
                  t.authCallBack && t.authCallBack());
                  wx.getUserInfo({
                    success: (info) => {
                      t.userInfo = {
                        userInfo: info.userInfo,
                        isPower: true,
                        openid: i.memberInfo.openid,
                        sessionid: i.sessionid
                      };
                      try {
                        wx.aldstat.sendOpenid(i.memberInfo.openid);
                      } catch (err) {
                        console.log("阿拉丁记录用户错误", err)
                      }
                      console.log(t.userInfo)
                      reslove()
                    },
                    fail: reslove
                  })

                }
              });
            });
            // if (res.authSetting['scope.userInfo']) {
            //   t.userInfo.isPower = true;//已经授权
          
            // } else {
            //   console.log("app: " + "用户暂时未授权")
            //   reslove()
            // };

          }
        });
      });
    },
    infoE(res){
      return new Promise((reslove, reject)=>{
        var t=this
    
      })
    },
    globalData: {
        authSettings: null,
        version: 1.3
    },
    siteInfo: require("siteinfo.js")
});