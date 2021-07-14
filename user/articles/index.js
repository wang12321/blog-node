const router = require('koa-router')();
var common = require('../../lib/common');
const api = require('../../api/api');
const fs = require('fs');
const path = require('path');
/**
 * 新增
 */
router.post('/add', async (ctx)=>{
    const data = ctx.request.body;
    const user = common.gettoken(ctx.request.body.token);

    if(!data || !data.wzbt || data.wzbt.length > 50 || data.wzbt.length === 0 ){
        ctx.body = common.fhcode(0,"请输入合法文章标题");
        return
    }
    if(!data || !data.wznr  || data.wznr.length === 0 ){
        ctx.body = common.fhcode(0,"请输入文章内容");
        return
    }
    await api.selectArticlesjz([user.id,ctx.request.body.wzbt]).then(async (result)=>{
        if(result && result.length !== 0){
            await api.UPDATEArticles([data.wzbt,data.wznr,data.wznrtext,data.fbzt,result[0].id]).then(async (row)=>{
                console.log(1312312,result[0].id)
                ctx.body = common.fhcode(1,"更新保存成功",{id:result[0].id});
            }).catch(err => {
                console.log(err)
                ctx.body = common.fhcode(0,err);
            })
        }else {
            await api.insertArticles([user.id,data.wzbt,data.wznr,data.wznrtext,data.fbzt]).then(async (result)=>{
                console.log(result)
                ctx.body = common.fhcode(1,"保存成功",{id:result.insertId});
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
 * 修改文章状态
 */
router.post('/updataFbzt', async (ctx)=>{
    const data = ctx.request.body;
    await api.UPDATEfbzt([data.fbzt,data.id]).then(async (result)=>{
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
    const page_num = ctx.request.body.page  //当前的num
    const page_size = ctx.request.body.rows  //当前页的数量
    const user = common.gettoken(ctx.request.body.token);
    if(ctx.request.body.wzbt){
        await api.selectArticlesmh([user.id,`%${ctx.request.body.wzbt}%`,(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]).then(async (result)=>{
            result[0].forEach(item=>{
                item.fbsj = common.rTime(item.fbsj)
            })

            ctx.body = common.fhcode(1,"查询成功",{total:result[1][0].total,data:result[0]});
        }).catch(err => {
            console.log(err)
            ctx.body = common.fhcode(0,err);
        })
    }else {
        await api.selectArticles([user.id,(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]).then(async (result)=>{
            result[0].forEach(item=>{
                item.fbsj = common.rTime(item.fbsj)
            })

            ctx.body = common.fhcode(1,"查询成功",{total:result[1][0].total,data:result[0]});
        }).catch(err => {
            console.log(err)
            ctx.body = common.fhcode(0,err);
        })
    }

})

/**
 * 上传图片
 */
router.post('/uploadimg', async (ctx)=>{
    uploadimg(ctx)
})


//上传图片
function uploadimg(ctx){
    // let file = ctx.request; // 获取上传文件
    // console.log(ctx.request.files);
    // 上传多个文件
    const filess = ctx.request.files.files; // 获取上传文件
    let files;

    if (Object.prototype.toString.call(filess) === "[object Array]") {
        console.log('value是数组');
        files = filess;
    }else if(Object.prototype.toString.call(filess)==='[object Object]'){
        console.log('value是对象');
        files = [filess];
    }
    var filesurl = [];

    for (let i = 0; i< files.length; i++) {
        const file = files[i];
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名

        filesurl.push(common.Random(4) +`${file.name}`)
        let filePath = path.join(__dirname, '../../public/upload/') + filesurl[i];
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    return ctx.body = common.fhcode(1,"查询成功",{url:'upload/'+filesurl[0]});
}
/**
 * 修改文章
 */
router.post('/UPDATEArticles', async (ctx)=>{
    const data = ctx.request.body;
    await api.UPDATEArticles([data.wzbt,data.wznr,data.wznrtext,data.fbzt,data.id]).then(async (result)=>{
        ctx.body = common.fhcode(1,"修改成功");
    }).catch(err => {
        console.log(err)
        ctx.body = common.fhcode(0,err);
    })
})

module.exports = router
