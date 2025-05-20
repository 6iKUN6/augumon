module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(:\w+:|[\u{1F300}-\u{1F9FF}]) (\w+)(?:\(([\w$.\-*/ ]*)\))?: (.+)/u,
            headerCorrespondence: ['type', 'scope', 'subject'],
        },
    },
    rules: {
        'type-enum': [
            2,
            'always',
            [
                // Emoji 类型列表
                '✨', // feat      - 新功能
                '🐛', // fix       - Bug修复
                '📝', // docs      - 文档
                '🎨', // style     - 代码样式
                '♻️', // refactor  - 重构
                '⚡️', // perf      - 性能优化
                '✅', // test      - 测试
                '🔧', // chore     - 配置/工具
                '🔥', // remove    - 删除代码
                '🚀', // deploy    - 部署
                '💄', // ui        - UI调整
                '🌐', // i18n      - 国际化
                '💥', // breaking  - 重大变更
            ],
        ],
        'scope-case': [2, 'always', 'lower-case'], // scope 小写
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case']],
        'subject-empty': [2, 'never'], // 禁止空 subject
        'subject-full-stop': [2, 'never', '.'], // 结尾不加句号
        'body-leading-blank': [1, 'always'], // body 前空行
        'footer-leading-blank': [1, 'always'], // footer 前空行
    },
};
