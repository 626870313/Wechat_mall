// pages/my/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:'',
        
    },

    logout(){
        wx.clearStorageSync('user')
    },

    login(){
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success:res=>{
              let user = res.userInfo
              wx.setStorageSync('user', user)
              this.setData({
                 userInfo:user,
              })
          },
          
        })
    },

    //进入收货地址管理
    handleEditAddress(){
        wx.chooseAddress({
          success: (result) => {},
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('监听')
        let user = wx.getStorageSync('user')
        this.setData({
            userInfo:user
        })
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})