
# Table Song 意为 表歌 或 表哥

## 本地开发:
后台管理: localhost:8090

web端: localhost:8080

server端: localhost:3000


## 脚本命令
npm run dev:admin // 本地开发后台管理

npm run dev:client // 本地开发前台页面

npm run build:admin // 项目打包 - 后台管理

npm run build:client // 项目打包 - 前台

npm run analyz  // 查看打包信息

npm run server  // 启动服务


## 注意事项： 
  1. `cnpm run server` 启动服务器
  2. 启动时，记得启动mongodb数据库，账号密码  可以在 server/config.js  文件下进行配置 
  3. `db.createUser({user:"cd",pwd:"123456",roles:[{role:"readWrite",db:'test'}]})` (mongodb 注册用户)
  4. `cnpm run dev:admin` 启动后台管理界面
  5. 登录后台管理界面录制数据
  6. 登录后台管理时需要在数据库 创建 users 集合注册一个账号进行登录
  ```
  db.users.insert({
      "name" : "cd",
      "pwd" : "e10adc3949ba59abbe56e057f20f883e",
      "username" : "admin",
      "roles" : [ 
          "admin"
      ]
  })

  // 账号： admin  密码： 123456
  ```
  7. `cnpm run dev:client` 启动前台页面



**参考仓库地址**
## 本项目foke 从https://github.com/cd-dongzi/vue-node-blog 所以感谢cd-dongzi
