const router = require('koa-router')();
var common = require('../lib/common');

const api = require('../api/api');

/**
 * 注册
 */
router.post('/registered', async (ctx)=>{
    const data = ctx.request.body;
    if(!data || !data.userName || data.userName.length > 30 || data.userName.length === 0 ){
        ctx.body = common.fhcode(0,"请输入合法用户名");
    }
    if(!data || !data.password || data.password.length > 20 || data.password.length < 6 ){
        ctx.body = common.fhcode(0,"请输入6-20位密码");
    }
    await api.findUserData([data.userName]).then(async (result)=>{
        if(result && result.length !== 0){
            ctx.body = common.fhcode(0,"该用户名已注册");
        }else {
            await api.insertUser([data.userName,data.password]).then((res)=>{
                ctx.body = common.fhcode(1,"注册成功");
            }).catch(err => {
                console.log(err)
                ctx.body = common.fhcode(0,err);
            })
        }
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})

/**
 * 登入
 */
router.post('/login', async (ctx)=>{
    const data = ctx.request.body;
    if(!data || !data.userName || data.userName.length > 30 || data.userName.length === 0 ){
        ctx.body = common.fhcode(0,"请输入合法用户名");
    }
    if(!data || !data.password || data.password.length > 20 || data.password.length < 6 ){
        ctx.body = common.fhcode(0,"请输入6-20位密码");
    }
    await api.findUserData([data.userName]).then(async (result)=>{
        if(result && result.length !== 0){
            if(result[0].password === data.password){
                ctx.session = {
                    userName: result[0].userName,
                    password: result[0].password
                }
                ctx.body = common.fhcode(1,"登录成功",{token: common.settoken({...result[0]})});
            }else {
                ctx.body = common.fhcode(0,"密码错误");
            }
        }else {
            ctx.body = common.fhcode(0,"该用户名未注册");
        }
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})

/**
 * 忘记密码
 */
router.post('/forgot', async (ctx)=>{
    const data = ctx.request.body;
    if(!data || !data.userName || data.userName.length > 30 || data.userName.length === 0 ){
        ctx.body = common.fhcode(0,"请输入合法用户名");
    }
    if(!data || !data.password || data.password.length > 20 || data.password.length < 6 ){
        ctx.body = common.fhcode(0,"请输入6-20位密码");
    }
    await api.findUserData([data.userName]).then(async (result)=>{
        if(result && result.length !== 0){
            await api.updatePassword([data.password , result[0].id]).then((res)=>{
                console.log(1111,res)
                ctx.body = common.fhcode(1,"修改成功");
            }).catch(err => {
                console.log(err)
                ctx.body = common.fhcode(0,err);
            })
        }else {
            ctx.body = common.fhcode(0,"该用户名未找到");
        }
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})

/**
 * 获取用户信息
 */
router.post('/userinfo', async (ctx)=>{
    const data = common.gettoken(ctx.request.header.token);
    await api.findUserData([data.userName]).then(async (result)=>{
        if(result && result.length !== 0){
            const premisstion = result[0].premisstion === 1 ? [1,2,3]:(result[0].premisstion === 2 ? [2,3]:[3])
            ctx.body = common.fhcode(1,null,{userName:result[0].userName,avator:result[0].avator,premisstion:premisstion,zcsj:common.rTime(result[0].zcsj)});
        }else {
            ctx.body = common.fhcode(0,"获取用户信息失败");
        }
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})
module.exports = router
