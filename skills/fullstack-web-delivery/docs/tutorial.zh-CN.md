# Fullstack Web Delivery · 网站完整交付: 使用指南

[English](tutorial.en.md) | 简体中文 · [项目首页](../README.zh-CN.md)

本指南对应 **v0.9.1**.

## 1. 下载与校验

从发行页下载 [`fullstack-web-delivery-complete-v0.9.1.zip`](https://github.com/KarmenLoop/fullstack-web-delivery/releases/tag/v0.9.1)，同时保留校验文件或 manifest。比较完整 SHA-256 后再解压：macOS 使用 shasum -a 256，Linux 使用 sha256sum，PowerShell 使用 Get-FileHash -Algorithm SHA256。校验只能证明字节一致，预期哈希本身也需要可信来源。

## 2. 安装与加载

需要示例与双语指南时选 complete ZIP；较小的 skill ZIP 只包含可移植工作流程。将其中 fullstack-web-delivery 文件夹放入一个宿主支持的技能目录，使用新目录。

刷新宿主发现或开启新会话，明确读取已安装的 SKILL.md，并核对上面版本。不需要为技能另开模型账号；宿主使用自己的模型、工具与权限。

## 3. 配置与第一项任务

SENSU 示例使用 Node 22.13 及以上的 Node 22 和 npm。在 examples/sensu-enterprise 依次运行 npm ci、npm run setup、npm run build、npm start，打开 http://127.0.0.1:4319。setup 生成随机本地访问资料，位于 .local/demo-access.json，请保留为本地私有文件。

提交一条虚构询价，在只读员工视图找到返回的编号，再用管理员角色推进状态，刷新后确认历史仍在。

## 4. 进一步实践

用网站技能完成一次有边界的页面变更，检查真实表单及错误分支后再判定完成。材质研究与历史截图保留原版本记录，不代表新增的设备或性能验收。

保留当前版本、真实命令、退出码、结果与未验证限制。使用合成数据做首次检查。

## 5. 排错、升级与移除

宿主找不到技能时，先检查配置的技能根目录和 SKILL.md 可读性。哈希不一致时停止使用该包并重新核对下载；不要跳过错误。

升级前完成当前写入，分别备份技能与私人任务数据。将新版本解压到新目录，核对后再切换；回退时恢复旧技能，保留较新的用户数据与证据。卸载只移除对应技能目录或发现入口；如曾另行注册调度，应在真实宿主中取消并确认。

## 6. 许可证

[KarmenLoop Source-Available No-Modification License 1.0](../LICENSE). 此处提供简明用户指南；具体使用和再分发条件以许可证原文为准。
