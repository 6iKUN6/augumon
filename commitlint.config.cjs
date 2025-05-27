// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
  // ignores: [commit => commit.includes("init")],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
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
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: 'Denote the SCOPE of this change (optional):',
      customScope: 'Denote the SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixsSelect: 'Select the ISSUES type of changeList by this change (optional):',
      customFooterPrefixs: 'Input ISSUES prefix:',
      footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
      // 中文版
      // type: "选择你要提交的类型 :",
      // scope: "选择一个提交范围（可选）:",
      // customScope: "请输入自定义的提交范围 :",
      // subject: "填写简短精炼的变更描述 :\n",
      // body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      // breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      // footerPrefixsSelect: "选择关联issue前缀（可选）:",
      // customFooterPrefixs: "输入自定义issue前缀 :",
      // footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      // confirmCommit: "是否提交或修改commit ?"
    },
    types: [
      {
        value: 'feat',
        name: '✨ feat: A new feature',
        emoji: '✨',
      },
      {
        value: 'fix',
        name: '🐛 fix: A bug fix',
        emoji: '🐛',
      },
      {
        value: 'docs',
        name: '📝 docs: Documentation only changes',
        emoji: '📝',
      },
      {
        value: 'style',
        name: '🎨 style: Changes that do not affect the meaning of the code',
        emoji: '🎨',
      },
      {
        value: 'refactor',
        name: '♻️ refactor: A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️',
      },
      {
        value: 'perf',
        name: '⚡️ perf: A code change that improves performance',
        emoji: '⚡️',
      },
      {
        value: 'test',
        name: '✅ test: Adding missing tests or correcting existing tests',
        emoji: '✅',
      },
      {
        value: 'chore',
        name: '🔧 chore: Changes to the build process or auxiliary tools',
        emoji: '🔧',
      },
      {
        value: 'remove',
        name: '🔥 remove: Removing code or files',
        emoji: '🔥',
      },
      {
        value: 'deploy',
        name: '🚀 deploy: Deploying stuff',
        emoji: '🚀',
      },
      {
        value: 'ui',
        name: '💄 ui: Updating the UI and style files',
        emoji: '💄',
      },
      {
        value: 'i18n',
        name: '🌐 i18n: Internationalization and localization',
        emoji: '🌐',
      },
      {
        value: 'breaking',
        name: '💥 breaking: Introducing breaking changes',
        emoji: '💥',
      },
    ],
    useEmoji: true,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix', 'breaking'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
