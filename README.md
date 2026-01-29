# 测试用仓库
## 使用方法
### 增加测试case：
在case.json中增加一个新的case，数据结构：
```json
[
  {
    "name": "创建新仓库",
    "envs": {
      "ERName": "$RANDOM",
      "TemplateName": "$RANDOM"
    },
    "repoName": "",
    "requireStatus": "",
    "requireLogTextList": [
      "<<LOG>>step|buildEnd<</LOG>>"
    ]
  }
]
```
### 参数说明
1. name：测试用例名称，用于显示在测试结果中
2. envs：测试用例中需要覆盖的环境变量，格式为：{变量名：变量值}
   1. 如果用test-for-aone-ci，必填RootDirectory
   2. 支持$RANDOM变量，表示随机字符串，其中TemplateName会随机为目前线上的随机模板名
3. repoName：测试用例中使用的仓库名，一般为本仓库test-for-aone-ci。*如果创建新仓库填空字符串。也可填其他仓库。*
4. requireStatus：需求什么构建结果算测试成功，支持SUCCESS、FAIL、CANCEL
5. requireLogTextList：测试用例中存在哪些字符串算构建成功，支持正则表达式
   
### 测试说明
1. 