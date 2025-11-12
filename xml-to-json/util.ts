#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { parseString } from 'xml2js';
import { promisify } from 'util';
import { resolve } from 'path';

const parseXml = promisify(parseString);

/**
 * XML 转 JSON 工具
 * 使用方法: node util.ts input.xml
 * 将会生成 output.json 文件
 */
async function convertXmlToJson() {
  try {
    // 获取命令行参数
    const args = process.argv.slice(2);

    if (args.length === 0) {
      console.error('❌ 错误: 请提供 XML 文件路径');
      console.log('使用方法: node util.ts <input.xml>');
      console.log('示例: node util.ts example.xml');
      process.exit(1);
    }

    const inputFile = args[0];
    const outputFile = 'output.json';

    console.log(`📖 正在读取 XML 文件: ${inputFile}`);

    // 读取 XML 文件
    const xmlContent = await readFile(resolve(inputFile), 'utf-8');

    if (!xmlContent.trim()) {
      console.error('❌ 错误: XML 文件为空');
      process.exit(1);
    }

    console.log('🔄 正在解析 XML...');

    // 解析 XML 为 JSON
    const jsonResult = await parseXml(xmlContent, {
      explicitArray: false,    // 单个元素不使用数组
      mergeAttrs: true,        // 合并属性到父对象
      normalizeTags: false,    // 保留原始标签大小写
      trim: true,              // 去除首尾空白
      explicitRoot: true       // 保留根元素
    });

    console.log('💾 正在写入 JSON 文件...');

    // 写入 JSON 文件
    await writeFile(
      resolve(outputFile),
      JSON.stringify(jsonResult, null, 2),
      'utf-8'
    );

    console.log(`✅ 转换成功!`);
    console.log(`   输入文件: ${inputFile}`);
    console.log(`   输出文件: ${outputFile}`);
    console.log(`   JSON 根节点: ${Object.keys(jsonResult)[0]}`);

  } catch (error) {
    if (error instanceof Error) {
      if ('code' in error && error.code === 'ENOENT') {
        console.error(`❌ 错误: 找不到文件 "${args[0]}"`);
      } else if (error.message.includes('XML')) {
        console.error('❌ 错误: XML 解析失败');
        console.error('   详细信息:', error.message);
      } else {
        console.error('❌ 错误:', error.message);
      }
    } else {
      console.error('❌ 未知错误:', error);
    }
    process.exit(1);
  }
}

// 运行转换
convertXmlToJson();
