Page({
  onTap: function(){
    // wx.navigateTo({
    //   url: '../posts/posts',
    // });
    wx.redirectTo({
      url: '../posts/posts',
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