const app = getApp();
const util = require('../../../utils/util.js');
// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category;
    let baseUrl = '';
    switch (category) {
      case '正在热映': 
      baseUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
      break;
      case '即将上映': 
      baseUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
      break;
      case 'Top250': baseUrl = app.globalData.doubanBase + '/v2/movie/top250';
      break;
    }
    this.data.requestUrl = baseUrl;
    util.http(baseUrl, this.processDoubanData)
    wx.setNavigationBarTitle({
      title: category
    })
  },

  processDoubanData: function (moviesDouban) {
    let movies = [];
    let subjects = moviesDouban.subjects;
    for (let idx in subjects) {
      let subject = subjects[idx];
      let title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      let temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    this.setData({movies});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})