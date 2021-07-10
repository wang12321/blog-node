/**
 * @author ff
 * @date 2021/7/9
 * @Description: node 启动文件
 * @update by:
 */

const koa = require('koa');
const app = new koa();
const router = require('koa-router')(); // router
const views = require('koa-views'); // 模板引擎
const bodyparser = require('koa-bodyparser'); // 对post提交数据处理中间件

const staticKoa = require('koa-static'); // 处理静态资源
const session = require('koa-session'); // session管理中间件

const koaBody = require('koa-body'); //解析上传文件的插件
const cors = require('koa2-cors')  // 处理跨域中间件

//跨域
app.use(cors({
    origin: function (ctx) {
        // 这里用 headers 和 header 属性皆可
        return ctx.header.origin;
    }
}))

// 设置cookies 和 session
app.use(async (ctx,next)=>{
    ctx.cookies.set('name','cookiesName',{
        maxAge:60*3600*60
    });
    ctx.session.name = 'sessionName';
    ctx.state={
        name:'stateName'
    };
    await next()
})

// 上传文件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

// 解析post请求数据
app.use(bodyparser());

// 静态文件处理
app.use(staticKoa('static'));

// 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，
// 生成一个类似于key,value的键值对， 然后将key(cookie)返回到浏览器(客户)端，
// 浏览器下次再访问时，携带key(cookie)，找到对应的session(value)。 客户的信息都保存在session中
app.keys = ['asd asdas asda'];  /*cookie的签名*/
const CONFIG = {
    key:'koa:sess',    /*默认*/
    maxAge:60*3600*60,  /*同cookie*/
    overwrite:true,    /*同cookie*/
    httpOnly:true,   /*同cookie*/
    signed:true,    /*默认签名*/
    rolling:false,    /*在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false*/
    renew:false,
}
app.use(session(CONFIG,app));

//配置模板
app.use(views('views',{map:{html:'ejs'}}));

router.get('/',ctx=>{
    ctx.body = '欢迎来到blog后台'
});

router.use('/user', require('./user/index.js').routes());//配置路由
router.use('/articles', require('./user/articles/index.js').routes());//配置路由

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());  // 如果我们不设置router.allowedMethods()在表现上除了ctx.status不会自动设置,以及response header中不会加上Allow之外,不会造成其他影响.

app.listen(8080);


