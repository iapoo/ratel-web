module.exports = {
  // extends: [require.resolve('@umijs/fabric/dist/eslint')],
  extends: ['alloy', 'alloy/react', 'alloy/typescript',],
  rules: {
    // 禁用alert, confirm, prompt
    'no-alert': 0,
    /*
      在对象中成对使用getter/setter
      const o = {
        set a (value) {
          this.val = value
        },
        get a () {// 缺失getter时报错
          return this.val
        },
      }
    */
    'accessor-pairs': 2,
    // 箭头函数的前后空格： () => {}
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    // 代码块两侧空格：function a(){ console.log('a') }
    'block-spacing': [2, 'always',],
    /*
      代码块换行格式，形如：
      if (foo) {
        bar()
      } else {
        baz()
      }
      或
      if (foo) { bar() } else { baz() }
    */
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    // 驼峰式命名
    camelcase: [
      0,
      {
        properties: 'always',
      },
    ],
    // 结尾逗号
    'comma-dangle': [
      1,
      {
        arrays: 'always',
        objects: 'always',
        imports: 'always',
        exports: 'never',
        functions: 'never',
      },
    ],
    // 逗号前后空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    // 逗号位置
    'comma-style': [2, 'last',],
    // 类继承时需要显式调用super方法
    'constructor-super': 2,
    // 代码块的花括号格式，all - 不可省略，multi - 和语句可同行省略，multi-line - 单行语句可换行省略
    curly: [2, 'all',],
    // 点运算符是否可换行
    'dot-location': [2, 'property',],
    // 文件末尾强制空行
    'eol-last': 2,
    // 使用===，null除外
    eqeqeq: [0, 'allow-null',],
    // 生成器空格
    // function * generator() {}
    // const anonymous = function * () {}
    // const shorthand = { * generator() {} }
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    // 需要处理的回调错误
    'handle-callback-err': [2, '^(err|error)$',],
    indent: [2, 2, {},],
    // jsx引号格式，优先单引号(例外：<a b="'" />)
    'jsx-quotes': [2, 'prefer-single',],
    // Object中key分号的前后空格
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    // 系统关键字的前后空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    // new对象时的命名，const person = new Person()
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    // new对象时的格式
    // const person = new Person()
    // const person = new (Person)()
    'new-parens': 2,
    // 禁用数组构造器
    'no-array-constructor': 2,
    // 禁用arguments.caller
    'no-caller': 2,
    // 禁用console
    'no-console': 'off',
    // class被定义后，不可重新赋值
    'no-class-assign': 2,
    // 禁止在判断语句中使用赋值操作，反例：if(a = 1){}
    'no-cond-assign': 2,
    /* "no-magic-numbers": ["error", {
      "ignoreArrayIndexes": true,
      "ignore": [0, 1],
      "enforceConst": true
    }], */
    // 不使用var声明变量
    'no-var': 2,
    // 使用箭头函数替代普通回调函数
    'prefer-arrow-callback': 1,
    // 常量不可被重新赋值
    'no-const-assign': 2,
    // 禁用ascii控制字符
    'no-control-regex': 0,
    // 禁止对变量使用delete操作
    'no-delete-var': 2,
    // 禁止重名参数
    'no-dupe-args': 2,
    // 禁止类重名成员
    'no-dupe-class-members': 2,
    // 禁止对象重名key
    'no-dupe-keys': 2,
    // 禁止switch语句中的重复条件
    'no-duplicate-case': 2,
    // 正则不允许空字符
    'no-empty-character-class': 2,
    // 对象解构时，禁用空对象
    'no-empty-pattern': 2,
    // 禁用eval
    'no-eval': 2,
    // 禁用catch中的error重赋值
    'no-ex-assign': 2,
    // 禁用原生对象的扩展
    'no-extend-native': 2,
    // bind的作用域非法时报错
    'no-extra-bind': 2,
    // 禁止不必要的Boolean型转换
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号
    'no-extra-parens': [2, 'functions',],
    // 防止switch语句遗漏break时导致的错误
    'no-fallthrough': 2,
    // 浮点型数字需要包含小数点
    'no-floating-decimal': 2,
    // 函数不可重赋值
    'no-func-assign': 2,
    // 避免隐式执行表达式
    'no-implied-eval': 2,
    // 函数声明和可选的变量声明位于程序的根节点或函数的主体中
    'no-inner-declarations': [2, 'functions',],
    // 不允许正则中出现非法表达式
    'no-invalid-regexp': 2,
    // 禁用非法的控制字符
    'no-irregular-whitespace': 2,
    // 禁用__iterator__属性(SpiderMonkey扩展)
    'no-iterator': 2,
    // 避免标签变量共享定义
    'no-label-var': 2,
    // 禁用标签语法(break label)
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    // 避免无效的{}块
    'no-lone-blocks': 2,
    // 禁用空格和制表符混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁用多余空格
    'no-multi-spaces': 2,
    // 避免使用转义符"\"来创建多行字符串
    'no-multi-str': 2,
    // 禁用超过1行的多余空行
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
      },
    ],
    // // ESLint v3.3.0中已弃用，使用no-native-reassign替代
    // // 'no-native-reassign': 2,
    // 禁用原始对象的重赋值(window,document,process)
    'no-global-assign': 2,
    // // ESLint v3.3.0中已弃用，使用no-unsafe-negation替代
    // // 'no-negated-in-lhs': 2,
    // 禁止否定关系运算符的左操作数
    'no-unsafe-negation': 2,
    // 禁用单独的new对象调用
    'no-new-object': 2,
    // 禁止使用new require
    'no-new-require': 2,
    // 禁用new Symbol
    'no-new-symbol': 2,
    // 禁用new包装类型构造器
    'no-new-wrappers': 2,
    // 禁止把对象类当做函数使用
    'no-obj-calls': 2,
    // 禁用8进制语法：071
    'no-octal': 2,
    // 禁用八进制转义："Copyright \251"
    'no-octal-escape': 2,
    // 禁用目录拼接
    'no-path-concat': 2,
    // 禁用__proto__属性
    'no-proto': 2,
    // 禁用变量重定义
    'no-redeclare': 2,
    // 正则表达式中禁止多个空格
    'no-regex-spaces': 2,
    // 禁止return语句中的赋值
    'no-return-assign': [2, 'except-parens',],
    // 禁用自身赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁止逗号运算符
    'no-sequences': 2,
    // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-shadow-restricted-names': 2,
    // // ESLint v3.3.0中已弃用，使用func-call-spacing替代
    // // 'no-spaced-func': 2,
    // 禁止函数调用的空格
    'func-call-spacing': 2,
    // 禁用稀疏数组(与尾逗号冲突)[,,,]
    'no-sparse-arrays': 2,
    // 类实例中禁止super()之前调用this
    'no-this-before-super': 2,
    // 禁止throw语句抛出非Error对象
    'no-throw-literal': 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 变量需定义后使用
    'no-undef': 2,
    // 变量未定义时，不需要赋值undefined
    'no-undef-init': 2,
    // 特殊情况下的分号使用
    /*
      ;() => { // 这里的分号是必须的
        console.log('a')
      }
    */
    'no-unexpected-multiline': 2,
    // 强制循环变量需要在循环内做修改
    'no-unmodified-loop-condition': 2,
    // 禁止无意义的boolean判断const a = x === 2 ? true : false
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false,
      },
    ],
    // 禁用无法访问的语句：return之后
    'no-unreachable': 2,
    // 禁止不安全的finally错误捕获
    'no-unsafe-finally': 2,
    // 禁止未使用的变量
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none',
      },
    ],
    // 禁止无意义的call调用
    'no-useless-call': 2,
    // 禁止无用的计算属性
    'no-useless-computed-key': 2,
    // 禁止无用的构造函数
    'no-useless-constructor': 2,
    // 禁用无意义的转义符
    'no-useless-escape': 0,
    // 属性前禁止空格
    'no-whitespace-before-property': 2,
    // 禁用with语句
    'no-with': 2,
    // 禁止同行定义多个变量
    'one-var': [
      2,
      {
        initialized: 'never',
      },
    ],
    // 运算符的换行规则
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    // 代码块中的空行
    'padded-blocks': [2, 'never',],
    // 引号类型
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true, // 允许字符串使用反引号`
      },
    ],
    // 分号
    semi: [2, 'never',],
    // 分号两侧空格
    'semi-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    // {}块前的空格样式
    'space-before-blocks': [2, 'always',],
    // 函数关键字左右空格
    'space-before-function-paren': [2, 'always',],
    // 括号中的空格
    'space-in-parens': [2, 'never',],
    // 中缀操作符之间的空白(1 + 2)
    'space-infix-ops': 2,
    // 一元运算符之间的空白
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    // 注释两侧的空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ',',
        ],
      },
    ],
    // html模板中花括号两侧空格
    'template-curly-spacing': [2, 'never',],
    // 禁用NaN常量，使用Number.isNaN()代替
    'use-isnan': 2,
    // 验证typeof的比较值
    'valid-typeof': 2,
    // IIFE规则
    'wrap-iife': [2, 'any',],
    // yield语句*左右空格
    'yield-star-spacing': [2, 'both',],
    // 禁用尤达比较：if ('red' === color) {}
    yoda: [2, 'never',],
    // 建议const声明变量
    'prefer-const': 1,
    // 生产环境禁用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 对象花括号空格
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false,
      },
    ],
    // 数组花括号空格
    'array-bracket-spacing': [2, 'always',],
  },
  globals: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
}
