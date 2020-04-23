let http = require('http')
let url = require('url')
let querystring = require('querystring')
let fs = require('fs')

let user = {
  admin: 123456,
}
http.createServer((req, res) => {
  let path, get, post
  if (req.method.toLowerCase() === 'get') {
    let {
      pathname,
      query
    } = url.parse(req.url, true)
    path = pathname
    get = query
    complete()
  } else if (req.method.toLowerCase() === 'post') {
    let arr = []
    path = req.url
    req.on('data', buffer => {
      arr.push(buffer)
    })
    req.on('end', () => {
      post = querystring.parse(Buffer.concat(arr).toString())
      complete()
    })

  }

  function complete() {

    if (path === '/login') {
      res.writeHead(200, {
        'content-Type': 'text/plain;charset=utf-8'
      })
      let {
        username,
        password
      } = get
      if(!user[username]) {
        res.end(JSON.stringify({
          err: 1,
          msg: '用户名不存在'
        }))
      } else if (user[username] != password) {
        res.end(JSON.stringify({
          err: 1,
          msg: '密码错误'
        }))
      } else {
        res.end(JSON.stringify({
          err: 0,
          msg: '登录成功'
        }))
      }
    } else if (path === '/reg') {
      res.writeHead(200, {
        'content-Type': 'text/plain;charset=utf-8'
      })
      let {
        username,
        password
      } = post
      if (user[username]) {
        res.end(JSON.stringify({
          err: 1,
          msg: '账号已经存在'
        }))
      } else {
        user[username] = password
        res.end(JSON.stringify({
          err: 0,
          msg: '注册成功'
        }))
      }
    } else {
      fs.readFile(`./www${path}`, (err, data) => {
        if (err) {
          res.end('404')
        } else {
          res.end(data)
        }
      })
    }
  }
}).listen(8080)

// 富爸爸穷爸爸
// 世界上最神奇的24堂客
// 失落的百年致富圣经

// 李嘉诚自传
// 穿布鞋的马云
// 走在崩溃的边缘
// 有钱人和你想的不一样
// 大败局
// 货币战争
// 思考致富
// 商业本质