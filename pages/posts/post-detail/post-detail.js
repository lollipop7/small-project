const postData = require('../../../data/posts-data.js');
//获取全局变量
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.postid;
    const postItem = postData.postList[postId];
    this.setData({
      postItem: postItem,       //当前文章的所有项
      currentPostId: postId     //当前文章的postId
    });
    // const postsCollected = {
    //   1: 'true',

    //   3: 'true',
    // }

    //获取所有的文章收藏缓存状态
    let postsCollected = wx.getStorageSync('posts_collected');
    //获取当前页面的文章收藏缓存状态
    if (Object.keys(postsCollected).length != 0) {
      const postCollected = postsCollected[postId];
      //将当前文章的收藏状态绑定到data中,从而在wxml中读取到它
      this.setData({
        collected: postCollected
      })
    } else {//缓存不存在
      postsCollected = {};
      wx.setStorageSync('posts_collected', postsCollected);
      //让当前的文章状态为false
      postsCollected[postId] = false;
    }

    /* 判断g_isPlayingMusic,它保存全局音乐播放状态,否则什么都不做。
      逻辑,如果全局变量为真,说明音乐正在被播放,同时要改变本地做数据绑定的isPlayingMusic的值,
      而如果全局变量为false,说明音乐没有在播放,那么什么都不用改变,因为本来isPlayingMusic就是false。
      并且播放的全局播放的id就是当前打开页面的id
    */
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == this.data.currentPostId) {
      this.setData({
        isPlayingMusic: true,
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor: function () {
    const that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true,
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })
    // 监听音乐播放。

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false,
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null; //清空
    })
    // 监听音乐暂停。
  },

  //用户点击收藏按钮
  onCollectionTap: function (event) {
    let postsCollected = wx.getStorageSync('posts_collected');
    let postCollected = postsCollected[this.data.currentPostId];
    //取反操作
    postCollected = !postCollected;
    //更新缓存
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.showToast( postCollected);
    // this.showModal(postCollected);
  },

  showToast: function (postCollected) {
    //更新数据绑定变量
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
    });
  },
   
  showModal: function (postCollected) {
    const that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res) {
        if (res.confirm) {
          //更新数据绑定变量
          that.setData({
            collected: postCollected
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 
  onShareTap: function () {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  },
  onMusicTap: function (even) {
    let isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false,
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.postItem.music.url,
        title: this.data.postItem.music.title,
        coverImgUrl: this.data.postItem.music.coverImg
      })
      this.setData({
        isPlayingMusic: true,
      });
    }
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