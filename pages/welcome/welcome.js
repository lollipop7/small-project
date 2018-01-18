Page({
  onTap: function(){
    // wx.navigateTo({
    //   url: '../posts/posts',
    // });
    wx.switchTab({
      url: '../movies/movies', 
    })
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
})  