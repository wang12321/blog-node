const router = require('koa-router')();
var common = require('../../lib/common');
const api = require('../../api/api');

/**
 * 新增
 */
router.post('/add', async (ctx)=>{
    const data = ctx.request.body;
    const user = common.gettoken(ctx.request.body.token);

    if(!data || !data.wzbt || data.wzbt.length > 50 || data.wzbt.length === 0 ){
        ctx.body = common.fhcode(0,"请输入合法文章标题");
    }
    if(!data || !data.wznr  || data.wznr.length === 0 ){
        ctx.body = common.fhcode(0,"请输入文章内容");
    }
    await api.insertArticles([user.id,data.wzbt,data.wznr]).then(async (result)=>{
        ctx.body = common.fhcode(1,"发布成功");
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})

/**
 * 查询
 */
router.post('/select', async (ctx)=>{
    const user = common.gettoken(ctx.request.body.token);
    await api.selectArticles([user.id]).then(async (result)=>{
        ctx.body = common.fhcode(1,"查询成功",{data:result});
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})
module.exports = router
