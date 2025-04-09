# BeriBeri(べりべり)

 简体中文 | [繁体中文](README-zh_TW.md) | [廣東話](README-jyut.md)

<p align="center" style="margin-bottom: 0px !important;">
<img width="300" alt="BewlyBewly icon" src="./assets/icon-512.png"><br/>
</p>

<p align="center">只需对您的 BiliBili 主页进行一些小更改即可。</p>
<p align="center">该 GitHub 仓库是唯一发布渠道。</p>
<p align="center">本项目是基于 <a href="https://github.com/BewlyBewly/BewlyBewly">BewlyBewly</a> 的二改版。</p>

<!-- ![min1](https://github.com/hakadao/BewlyBewly/assets/33394391/951f9e2a-d0e1-452c-83a9-dc6d85c4d441)
![min2](https://github.com/hakadao/BewlyBewly/assets/33394391/3e75dd20-f60b-4645-b434-23a24c72959c) -->

## 👋 介绍

> [!IMPORTANT]
> BeriBeri 主要专注页面的调整和优化，而不是完善功能和提升效率。
>
> 由于效率和维护难度的原因，暗色模式只会适应常用页面，而不会适应不常用的页面。

> [!CAUTION]
> 如果您正在安装此扩展程序，您的浏览器可能会提示它可以读取您的浏览历史记录。
>
> 这是因为 BeriBeri 使用了["tabs" 权限](https://developer.chrome.com/docs/extensions/reference/api/tabs)，该权限也可用于读取每个标签页，从而了解浏览历史，但在这里并未使用。
>
> **一些浏览器会提到最坏的情况和最高的风险，以确保您在安装后的安全。**
> 此外，这个项目是开源的，所以您可以看到它究竟做了什么。

BeriBeri 是一个用于 BiliBili 的浏览器扩展，旨在通过重新设计 BiliBili 用户界面来提升用户体验。设计灵感来自于 YouTube、Vision OS 和 iOS，从而实现了更具视觉吸引力和用户友好性的界面。

该项目使用 [vitesse-webext](https://github.com/antfu/vitesse-webext) 模板进行开发。如果没有这个模板，可能无法开发出这个项目。

#### 给 Firefox 使用者的提示

> [!WARNING]
> 使用 Firefox 浏览器时，请记得启用下图所示的所有权限，以便正常使用 BeriBeri

<br/> <img width="655" alt="firefox" src="./docs/firefox.png">

## ⬇️ 安装

### 本地安装

[CI](https://github.com/TC999/BeriBeri/actions)：使用最新代码自动构建

[发行版](https://github.com/TC999/BeriBeri/releases)：稳定版

<details>
 <summary> Edge & Chrome 的另一种安装方法 </summary>

#### Edge

> 确保您下载了 [extension.zip](https://github.com/TC999/BeriBeri/releases) 并解压缩该文件。

1. 在地址栏输入 `edge://extensions/` 并按回车
2. 打开 `开发者模式` 并点击 `加载已解压的拓展程序` <br/> <img width="655" alt="image" src="./docs/edge.png">
3. 在浏览器中加载解压后的扩展文件夹

#### Chrome

> 确保您下载了 [extension.zip](https://github.com/TC999/BeriBeri/releases) 并解压缩该文件。

1. 在地址栏输入 `chrome://extensions/` 并按回车
2. 打开 `开发者模式` 并点击 `加载已解压的拓展程序` <br/> <img width="655" alt="Chromium" src="./docs/chromium.png">
3. 在浏览器中加载解压后的扩展文件夹

</details>

## 🤝 贡献与构建项目

查看 [CONTRIBUTING.md](docs/CONTRIBUTING-cmn_CN.md)

### 贡献者

[![Contributors](https://contrib.rocks/image?repo=TC999/BeriBeri)](https://github.com/TC999/BeriBeri/graphs/contributors)

## ❤️ 鸣谢

- [BewlyBewly](https://github.com/BewlyBewly/BewlyBewly) - 原项目
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - 该项目使用的模板
- [UserScripts/bilibiliHome](https://github.com/indefined/UserScripts/tree/master/bilibiliHome),
[bilibili-app-recommend](https://github.com/magicdawn/bilibili-app-recommend) - 获取访问密钥的参考来源
- [Bilibili-Evolved](https://github.com/the1812/Bilibili-Evolved) - 部分功能实现
- [bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
