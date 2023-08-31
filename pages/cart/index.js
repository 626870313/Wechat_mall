import {
    requestUtil,
    getBaseUrl
} from '../../utils/requestUtil.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        address:{},
        cart:[],
        allChecked:false,
        totalPrice:0,
        totalNum:0,
        userInfo:{}
    },

    handleChooseAddress(){
       
        wx.chooseAddress({
          success: (result) => {
              wx.setStorageSync('address', result)
          },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        const baseUrl = getBaseUrl()
        this.setData({
            baseUrl
        })
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
        const userInfo = wx.getStorageSync('user')
        const address = wx.getStorageSync('address')
        const cart = wx.getStorageSync('cart')||[]
        
        this.setData({
            address,
            userInfo
        })
        this.setCart(cart)
    },
    login(){
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success:res=>{
              let user = res.userInfo
              wx.setStorageSync('user', user)
            console.log('授权成功',res)
              this.setData({
                 userInfo:user,
                 
              })
          },
          
        })
        
    },
    // 商品选中事件
    handleItemChange(e){
        const {id} = e.currentTarget.dataset
        let {cart} = this.data
        let index = cart.findIndex(v=>v.id===id)
        cart[index].checked=!cart[index].checked
        this.setCart(cart)
    },

    //商品全选
    handleItemAllCheck(){
        let {cart,allChecked} = this.data
        allChecked = !allChecked
        cart.forEach(v=>v.checked=allChecked)
        this.setCart(cart)
    },

    //商品数量编辑
    handleItemNumEdit(e){
        const {id,operation} = e.currentTarget.dataset
        let {cart} = this.data
        let index = cart.findIndex(v=>v.id===id)
        if(cart[index].num===1&&operation===-1){
            wx.showModal({
                title:'系统提示',
                content:'您是否要删除？',
                cancelColor: 'cancelColor',
                success:(res)=>{
                    if(res.confirm){
                        cart.splice(index,1)
                        this.setCart(cart)
                    }
                }
            })
        }else{
            cart[index].num += operation
            this.setCart(cart)
        }
        

    },

    //点击结算
    handlePay(){
        const {address,totalNum} = this.data
        if(!address){
            wx.showToast({
              title: '您还没选择收获地址',
              icon:'none'
            })
            return
        }
        if(totalNum===0){
            wx.showToast({
              title: '您还没选择商品',
              icon:'none'
            })
            return
        }
        wx.navigateTo({
          url: '/pages/pay/index',
        })

    },

    //设置购物车勾选状态 还有下方的全选、合计、结算数量，并更新Storage
    setCart(cart){
        let allChecked = true
        let totalPrice=0
        let totalNum=0
        cart.forEach(v => {
            if(v.checked){
                totalPrice += v.price*v.num
                totalNum += v.num
            }else{
                allChecked=false
            }
            allChecked=cart.length!=0?allChecked:false
        });
        this.setData({
            cart,
            allChecked,
            totalNum,
            totalPrice
        })

        wx.setStorageSync('cart', cart)
    }


   
})