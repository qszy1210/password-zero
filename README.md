# lock-box(password-zero)
simple lock box with a html page

## 完全离线
完全离线, 一个 html + 一个 json 文件, 仅此而已;
如果需要在多个设备之间同步的话, 可以将这两个文件进行同步; 或者将 html 部署在你自己的服务器上
然后 同步 json 文件;

## 前置条件

> 一个独立的 json 文件, 这个是存放加密后的密文的, 比如 [test-data](./test-data/test-data.json)

格式最好按照其中的进行, 不过也可以不用, 存放任何文本也可以.
不过我的搜索就找不到了 -_-!,  现在是按照我的约定的 json 去查找的~


## 一个 xml 转 json 的工具

详细参考其中的说明, 这里说一下使用方式

```bash
# 会输出一个 output.json
npx tsx util.ts <input.xml>
```


