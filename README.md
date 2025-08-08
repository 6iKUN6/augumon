"node": "22.12.0",
"pnpm": "9.15.4"

```bash
# 装依赖
pnpm i

# run
pnpm dev
```

代码提交流程

```bash
# 此时在main分支
git pull #拉取main分支新代码
git checkout -b #[your branch]#创建并切换到新分支

#老分支开发
git rebase <branch-name>
git push origin #[your branch]--force-with-lease #变基后强制推送

#写代码
git add .
pnpm commit #美化历史记录
git checkout main #切回主分支
git pull #拉主分支的新代码
git chekout #[your branch] #切换你自己的分支
git merge main #合并主分支新代码
# 解决冲突(如果有)
git push

#上github提pr
```
