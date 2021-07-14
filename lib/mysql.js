/**
 * @author ff
 * @date 2021/7/9
 * @Description: 数据库配置
 * @update by:
 */
'use strict';
var mysql = require('mysql');
// 数据库配置
module.exports = {
    /**
     * 数据库配置
     */
    config: {
        host: 'localhost',
        port: 3306,
        database: 'blog',
        user: 'root',
        password: '12345678',
        multipleStatements:true
    },
    conn: null,
    /**
     * 创建连接池并连接
     * @param callback
     */
    openConn: function (callback) {
        var me = this;
        if(!me.conn){
            me.conn = mysql.createPool(me.config);
            console.log('连接池并连接')
        }
    },
    /**
     * 释放连接池
     * @param conn
     */
    closeConn: function () {
        var me = this;
        me.conn.end(function (err) {
            console.log(err);
            console.log('释放连接池')
        });
    },
    exec: function (config) {
        const me = this;
        me.openConn();
        return new Promise((res, rej) => {
            me.conn.query(config.sql, config.params, function (err, data) {
                if (err) {
                    rej(err)
                } else if (data) {
                    res(data);
                }
                // 关闭数据库连接
                // me.closeConn();
            });
        });
    }
};
