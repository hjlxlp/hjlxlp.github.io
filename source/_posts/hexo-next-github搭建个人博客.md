---
title: hexo+next+github搭建个人博客
date: 2019-10-09 14:06:34
description: "搭建博客，一篇教程，简洁明了"
categories:
- hexo
tags:
- hexo
---

# 一、简介
本篇教程使用了hexo+hexo+next+github，hexo是博客框架，next是主题，博客在github上。

# 二、环境准备
1. 安装node.js
2. 安装git
3. 注册github账号
	- 创建仓库GithubPages，仓库名为：<Github账号名称>.github.io
	- 添加ssh密钥
		```
		$ ssh-keygen -t rsa -C "邮箱地址"
		```
	- 复制公有密钥文件内容到github的ssh设置里面
	- 验证是否设置成功，Hi...表示成功
		```
		$ ssh -T git@github.com
		```

# 三、hexo
1. 备份hexo源文件
	- 使用hexo把md文件生成静态页面，提交到github博客项目，访问xxx.github.io就是个人博客，但是hexo源文件在本地，可以备份到github防止丢失
	- 首先在github博客项目生成一个新分支hexo，设为默认分支
	- 拉取博客项目hexo分支到本地，等下hexo生成好的静态页面会自动提交到master分支，hexo分支对应源文件，master分支对应博客文件
2. hexo使用
	- 安装hexo
		```
		$ npm install -g hexo-cli
		$ npm install hexo –save 
		```
	- 安装部署插件
		```
		$ npm install hexo-deployer-git –save
		```
	- 初始化hexo
		```
		$ hexo init
		$ npm install
		```
	- 静态网页生成
		```
		$ hexo genarate 或者 hexo g
		```
	- 服务启动
		```
		$ hexo server 或者 hexo s
		```
	- 本地打开，浏览器打开http://localhost:4000/
	- 项目清理
		```
		$ hexo clean
		```
	- 修改hexo站点配置文件_config.yml，关联github
		```
		deploy:
		  type: git
		  repo: git@github.com:hjlxlp/hjlxlp.github.io.git
		  branch: master
		```
	- 推送到github
		```
		$ hexo deploy 或者 hexo d
		```
	- 创建新文章
		```
		$ hexo new “myblog”
		```
		
# 四、next主题
1. next是hexo使用最多的一个主题，还有很多其他主题，next基本配置跳过了很多，我挑一些重要点的说，首先安装next，我的是7.4版本
	```
	$ git clone https://github.com/theme-next/hexo-theme-next themes/next
	```
2. 修改hexo站点配置文件_config.yml，启用next主题
	```
	theme: next
	```
3. 菜单栏
	- 编辑站点配置文件，启用你需要的菜单栏
		```
		menu:
		  home: 首页
		  archives: 归档
		  categories: 分类
		  tags: 标签
		  search: 搜索
		```
	- 分类和标签菜单栏
		需要在hexo，source文件夹下，建立categories文件夹和tag文件夹，分别在里面建立index.md文件，文件内容如下，注意type一定要写，标签的写tag
		```
		---
		title: categories
		date: 2019-09-18 10:17:42
		type: "categories"
		---
		```
4. 设置分类和标签，在文md章头写，配合菜单栏使用
	```
	categories:
	- hexo
	- xxx
	tags:
	- hexo
	- xxx
	```
5. 首页文章显示简介，在md文章头上加上
	```
	description: "这是简介"
	```
6. 本地搜索
	- 编辑站点配置文件，新增以下内容到任意位置
		```
		search:
		  path: search.xml
		  field: post
		  format: html
		  limit: 10000
		```
	- 编辑主题配置文件，启用本地搜索功能
		```
		search:
		  local_search:
		  enable: true
		```
7. 更换背景图片，路径为\themes\next\source\css\main.styl，加上以下代码
	```
	// 添加背景图片
	body {
		  background: url(/images/bjtp.jpg);//自己喜欢的图片地址
		  background-size: cover;
		  background-repeat: no-repeat;
		  background-attachment: fixed;
		  background-position: 50% 50%;
	}

	// 修改主体透明度
	.main-inner {
		  background: #fff;
		  opacity: 0.9;
	}

	// 修改菜单栏透明度
	.header-inner {
		  opacity: 1;
	}
	```
8. 显示浏览进度在左侧底下，编辑主题配置文件
	```
	back2top:
	  enable: true
	  # Back to top in sidebar.
	  sidebar: true
	  # Scroll percent label in b2t button.
	  scrollpercent: true

	# Reading progress bar
	reading_progress:
	  enable: true
	  # Available values: top | bottom
	  position: top
	  color: "#37c6c0"
	  height: 2px
	```
9. 字数和阅读时长统计
	- 安装插件
		```
		$ npm install hexo-symbols-count-time --save
		```
	- 编辑主题配置文件，启用功能
		```
		symbols_count_time:
		  separated_meta: true
		  item_text_post: true
		  item_text_total: true
		  awl: 4
		  wpm: 275
		```
		
# 五、其他服务
1. 评论和文章阅读次数统计，使用的是Valine+LeanCloud
	- 注册LeanCloud
		注册之后创建一个应用，选择【设置】->【应用Key】记下你的appid和appkey
	- 新建Class用来专门保存我们博客的文章访问量和评论等数据
		Class名称Comment对应评论
		Class名称Counter对应文章访问量
	- 评论，编辑主题配置文件，填入appid和appkey，启用功能
		```
		valine:
		  enable: true 
		  leancloud adk version.
		  appid: # your app id
		  appkey: # your app key
		  notify: true # 评论回复邮件提醒, See: https://github.com/xCss/Valine/wiki
		  verify: false # 验证码服务
		  placeholder: 留言区 # 评论框占位提示符
		  avatar: mm # 头像配置
		  guest_info: nick,mail,link # 回复要填写的信息
		  pageSize: 10 # 评论列表分页，每页条数
		  visitor: true # 文章访问量统计 
		  comment_count: true # if false, comment count will only be displayed in post page, not in home page
		```
	- 文章阅读次数，编辑主题配置文件，填入appid和appkey，启用功能
		```
		leancloud_visitors:
		  enable: true
		  app_id: jXx2gw87ejpJikXYvPCzLhwY # <app_id>
		  app_key: Dp216GW5qvUWTvLHve55zVVb # <app_key>
		  security: true
		  betterPerformance: false
		```
2. 音乐
	- 访问[Aplayer](https://github.com/MoePlayer/APlayer) 网站，下载源码,解压后将dist文件夹复制到themes\next\source文件夹下
	- 新建themes\next\source\dist\music.js文件，添加内容，我用的是下载好网易云的音乐，你也可以用外链，但是容易失效，
		```
		const ap = new APlayer({
			container: document.getElementById('aplayer'),
			fixed: true,
			autoplay: true,
			audio: [
			  {
				name: "烟火里的尘埃",
				artist: '华晨宇',
				url: '/music/华晨宇 - 烟火里的尘埃.mp3',
				cover: '/images/yhldca.jpg',
			  },
			   {
				name: '我管你',
				artist: '华晨宇',
				url: '/music/华晨宇 - 我管你.mp3',
				cover: '/images/wgn.jpg',
			  },
			  {
				name: '寻',
				artist: '华晨宇',
				url: '/music/华晨宇 - 寻.mp3',
				cover: '/images/x.jpg',
			  }
			]
		});
		```
	- 网易云下载的音乐，ncm格式转mp3格式工具
		下载链接：https://github.com/NoColor2/ncmdump
		下载后，放在任意目录，然后把ncm格式的文件拖到main.exe上面，即可自动在当前目录生成.mp3文件
	- 打开 themes\next\layout\_layout.swig 文件，将下面内容添加到body里面
		```
		<link rel="stylesheet" href="/dist/APlayer.min.css">
		<div id="aplayer"></div>
		<script type="text/javascript" src="/dist/APlayer.min.js"></script>
		<script type="text/javascript" src="/dist/music.js"></script>
		```
3. 添加萌萌哒
	- 安装插件
		```
		npm install --save hexo-helper-live2d
		```
	- 选择你喜欢的模型名字
		[模型地址](https://huaji8.top/post/live2d-plugin-2.0/)
	- 将以下代码添加到主题配置文件_config.yml，修改<你喜欢的模型名字>
		```
		live2d:
		  enable: true
		  scriptFrom: local
		  pluginRootPath: live2dw/
		  pluginJsPath: lib/
		  pluginModelPath: assets/
		  tagMode: false
		  log: false
		  model:
			use: live2d-widget-model-<你喜欢的模型名字>
		  display:
			position: right
			width: 150
			height: 300
		  mobile:
			show: true
		```
	- 在站点目录下建文件夹live2d_models
		再在live2d_models下建文件夹<你喜欢的模型名字>
		再在<你喜欢的模型名字>下建json文件：<你喜欢的模型名字>.model.json
	- 安装模型
		```
		npm install --save live2d-widget-model-<你喜欢的模型名字>
		```
		
# 六、相关链接
- [hexo官网](https://hexo.io/zh-cn/)
- [next中文文档](https://theme-next.iissnan.com/getting-started.html)
- [next最新英文文档](https://theme-next.org/docs/getting-started/)




