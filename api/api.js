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


// 发布文章
exports.insertArticles = ( value ) => {
    let _sql = "insert into Articles set userID=?,wzbt=?,wznr=?;"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}


// 查询文章
exports.selectArticles = ( value ) => {
    let _sql = "SELECT * FROM Articles where userID = ?;"
    return mysql.exec({
        sql: _sql,
        params: value,
    });
}

