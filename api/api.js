var mysql= require('../lib/mysql');

// 查找通用
exports.findALLData = (sql, value ) => {
    return mysql.exec({
        sql: sql,
        params: value,
    });
}

// 注册用户
exports.insertUser = ( value ) => {
    let _sql = "insert into users set userName=?,password=?;"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}

// 查找用户
exports.findUserData = ( name ) => {
    let _sql = "SELECT * FROM users where userName = ?;"
    return mysql.exec({
        sql: _sql,
        params: name,
    });
}

// 忘记密码
exports.updatePassword = ( vuale ) => {
    let _sql = "UPDATE users SET password = ?  WHERE id = ?"
    return mysql.exec({
        sql: _sql,
        params: vuale,
    });
}


// 保存文章
exports.insertArticles = ( value ) => {
    let _sql = "insert into Articles set userID=?,wzbt=?,wznr=?,wznrtext=?,fbzt=?;"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}

// 修改发布状态
exports.UPDATEfbzt = ( value ) => {
    let _sql = "UPDATE Articles SET fbzt = ? WHERE id = ?"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}
// 修改文章
exports.UPDATEArticles = ( value ) => {
    let _sql = "UPDATE Articles SET wzbt=?,wznr=?,wznrtext=?,fbzt=? WHERE id = ?"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}
// 查询文章all
exports.selectArticles = ( value ) => {
    let _sql = "SELECT * FROM Articles where userID = ? and fbzt != 2 limit ?,?;SELECT count(*) as total FROM Articles"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}
// 查询文章标题精准
exports.selectArticlesjz = ( value ) => {
    let _sql = "SELECT * FROM Articles where userID = ? and wzbt = ? and fbzt != 2"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}


// 查询文章标题模糊
exports.selectArticlesmh = ( value ) => {
    let _sql = "SELECT * FROM Articles where userID = ? and wzbt like ? and fbzt != 2 limit ?,?;SELECT count(*) as total FROM Articles"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}

// 获取用户列表
exports.findUserList = ( name ) => {
    let _sql = "SELECT * FROM users where premisstion >= ? limit ?,?;SELECT count(*) as total FROM users"
    return mysql.exec({
        sql: _sql,
        params: name,
    });
}
// 获取用户
exports.findUserListMH = ( name ) => {
    let _sql = "SELECT * FROM users where premisstion >= ? and userName like ? limit ?,?;SELECT count(*) as total FROM users"
    return mysql.exec({
        sql: _sql,
        params: name,
    });
}
