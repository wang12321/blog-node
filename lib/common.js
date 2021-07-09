'use strict';

const jwt  = require('jsonwebtoken');
const secret = 'node_token';
module.exports = {

    /**
     * 生成token
     * @param payload
     */
    settoken: function (payload) {
        return jwt.sign(payload, secret);
    },
    gettoken: function (token) {
        return jwt.verify(token, secret);
    },

    /**
     * 生成n位随机数
     * @return {string}
     */
    Random:function(n) {
        const randomArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let value = '';
        for (let i = 0; i < n; i++) {
            value += randomArray[Math.floor(Math.random() * randomArray.length)];
            if(n>0 && i< n-1){
                value += '-'
            }
        }
        return value;
    },
    /**
     *
     * @param code 0表示失败 1，表示成功
     * @param msg  提示信息
     * @param obj  数据格式
     * @param randomIndex  随机数
     * @returns {{msg: string, code, obj: {}, randomIndex: string}}
     */
    fhcode:function(code,msg,obj,randomIndex){
        return {
            code: code,
            msg: msg||"操作成功！",
            obj: obj||{},
            randomIndex: randomIndex||this.Random(4)
        }
    },
    rTime:function(date) {
        var json_date = new Date(date).toJSON();
        return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
}
