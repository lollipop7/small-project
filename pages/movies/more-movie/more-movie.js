const app = getApp();
const util = require('../../../utils/util.js');
// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: '',
    totalCount: 0,
    isEmpty: true,
    movies: {}
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
<<<<<<< HEAD
    this.data.requestUrl = baseUrl;
    util.http(baseUrl, this.processDoubanData);
=======
    this.setData({
      requestUrl: baseUrl
    });
    util.http(baseUrl, this.processDoubanData)
>>>>>>> b732bdde16a11527ad27d99cce413b2c75a0e5f4
    wx.setNavigationBarTitle({
      title: category
    })
  },

<<<<<<< HEAD
  onScrollLower: function (event) {
=======
  // onScrollLower: function (event) {
  //   let nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
  //   util.http(nextUrl, this.processDoubanData);
  //   wx.showNavigationBarLoading();
  // },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function (event) {
>>>>>>> b732bdde16a11527ad27d99cce413b2c75a0e5f4
    let nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
<<<<<<< HEAD
    let refreshUrl = this.data.requestUrl + '?start=0&count=20';
    this.setData({
      movies: {},
      isEmpty: true
=======
    console.log(this.data.movies)
    let refreshUrl = this.data.requestUrl + '?start=0&count=20';
    this.setData({
      movies: {},
      isEmpty: true,
      totalCount: 0
>>>>>>> b732bdde16a11527ad27d99cce413b2c75a0e5f4
    })
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

<<<<<<< HEAD

=======
  //处理数据
>>>>>>> b732bdde16a11527ad27d99cce413b2c75a0e5f4
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
    let totalMovies = {};
<<<<<<< HEAD
    //如果要绑定新加载的数据，那么需要同原有的数据合并在一起
    if(!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({ movies: totalMovies });   
    this.data.totalCount += 20;   
    wx.hideNavigationBarLoading();  
    wx.stopPullDownRefresh();
=======
    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if(!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();  
    // wx.stopPullDownRefresh();  
>>>>>>> b732bdde16a11527ad27d99cce413b2c75a0e5f4
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
<<<<<<< HEAD
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
=======
>>>>>>> b732bdde16a11527ad27d99cce413b2c75a0e5f4
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})