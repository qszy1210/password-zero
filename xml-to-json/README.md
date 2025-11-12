# XML 转 JSON 工具

一个简单的命令行工具，用于将 XML 文件转换为 JSON 格式。

## 安装依赖

```bash
npm install
```

## 使用方法

```bash
npx tsx util.ts <input.xml>
```

或者使用 Node.js（需要先编译 TypeScript）：

```bash
node util.ts <input.xml>
```

## 示例

1. 准备一个 XML 文件（例如 `data.xml`）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<passwords>
  <entry>
    <website>example.com</website>
    <username>user123</username>
    <password>secret123</password>
  </entry>
</passwords>
```

2. 运行转换命令：

```bash
npx tsx util.ts data.xml
```

3. 输出文件 `output.json` 将自动生成：

```json
{
  "passwords": {
    "entry": {
      "website": "example.com",
      "username": "user123",
      "password": "secret123"
    }
  }
}
```

## 功能特性

- ✅ 自动解析 XML 文件
- ✅ 智能处理属性和元素
- ✅ 保留原始标签大小写
- ✅ 去除多余空白字符
- ✅ 友好的错误提示
- ✅ 输出格式化的 JSON（带缩进）

## 注意事项

- 输入文件必须是有效的 XML 格式
- 输出文件固定为 `output.json`（会覆盖已存在的文件）
- 工具会自动处理相对路径和绝对路径
