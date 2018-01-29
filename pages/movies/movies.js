const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    const comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    const top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieListData(top250Url, 'top250', 'Top250');
  },

  getMovieListData: function (url, settledKey, categoryTitle) {
    const that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settledKey, categoryTitle);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settledKey, categoryTitle) {
    let movies = [];
    let subjects = moviesDouban.subjects;
    for (let idx in subjects ) {
      let subject = subjects[idx];
      let title = subject.title;
      if(title.length >= 6) {
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
    let readyData = {};
    readyData[settledKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  onMoreTap: function (event) {
    const category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
    })
  },

  onBIndConfirm: function (event) {
    console.log(event)
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