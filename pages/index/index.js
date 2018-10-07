// 引用百度地图微信小程序JSAPI模块
import bmap from "../../libs/bmap-wx.min";
import { AK } from "../../static/index";
const innerAudioContext = wx.createInnerAudioContext();
const { globalData } = getApp();

Page({
  data: {
    weatherData: "",
    otherWeather: null,
    realTimeTemperature: "",
    proposal: [],
    otherDate: [],
    settings: null,
    musics: true
    // animation: {}
  },

  parseMusic: function() {
    innerAudioContext.stop();
    this.setData({
      musics: false
    });
  },
  playMusic: function() {
    innerAudioContext.play();
    this.setData({
      musics: true
    });
  },
  onLoad: function() {
    var that = this;
    // 新建百度地图对象

    innerAudioContext.autoplay = this.data.musics;
    innerAudioContext.src =
      "http://pcgnine5c.bkt.clouddn.com/%E5%8A%B1%E9%98%B3,%E5%BC%A0%E8%B4%9D%E7%BB%AE%20-%20Where%C2%A0is%C2%A0the%C2%A0love%EF%BC%88remix%EF%BC%89.mp3";
    var BMap = new bmap.BMapWX({
      ak: AK
    });
    var fail = function(data) {
      console.log(data);
    };
    var success = function(data) {
      const weatherData = data.currentWeather[0];
      const otherWeather = data.originalData;
      console.log(otherWeather.results[0].index);
      console.log(globalData);
      console.log(otherWeather.results[0].weather_data.splice(0, 1));
      that.setData({
        settings: globalData,
        weatherData: weatherData,
        realTimeTemperature: weatherData.date
          .split(" ")[2]
          .replace("(实时：", "")
          .replace("℃)", ""),
        otherWeather: otherWeather,
        proposal: data ? otherWeather.results[0].index : "",
        otherDate: data ? otherWeather.results[0].weather_data : ""
      });
      console.log(that.data.settings);
    };
    // 发起weather请求
    BMap.weather({
      fail: fail,
      success: success,
      location: globalData.locations
    });
  }
});
