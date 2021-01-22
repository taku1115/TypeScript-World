# TypeScriptの環境設定
### コンパイルオプション
コンパイラ設定は`tsconfig.json`に書き込む
- デフォルトの設定(create-react-app時)
```js
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true, // 特殊なオプション（詳細以下）
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

strictというオプションを有効にすると、以下のオプションがまとめて有効になる

- ”noImplicitAny”： 暗黙的にanyが指定されている式や宣言があればエラーになる
- ”noImplicitThis”： thisが暗黙的にanyを表現していればエラーになる
- ”alwaysStrict”： すべてのソースファイルの先頭に 'use strict' が記述されているものとみな
し、ECMAScript の strict モードでパースする
- ”strictBindCallApply”： bind()、call()、apply() メソッド使用時に、その関数に渡される引数の型チェックを行う
- ”strictNullChecks”： 他のすべての型から null および undefined が代入不可になる
- ”strictFunctionTypes”： 関数の引数の型チェックが「共変的（Bivariant）」ではなく、「反変的
（Contravariant）」に行われるようになる
- ”strictPropertyInitialization”： 宣言だけで初期化されないクラスプロパティ（＝メンバー変
数）があるとエラーになる（※ strictNullChecks も併せて有効にしておく必要あり）

strictオプションの有効化は、公式で推奨されている

### tsconfig.jsonのカスタマイズ

- target: コンパイル先のJSのバージョン指定（デフォルトではes5, esnextでTSサポートの最新版指定)
- lib: コンパイルに含めるライブラリ指定（dom操作に必要なdomやdom.iterableなど）
- module: コンパイル後モジュール構文のモジュールシステム指定（サーバーサイドがNode.jsならcommonjs）
- noEmit: ファイルを出力しないようにするオプション(CRAによるプロジェクトではBabelがコンパイルを行うためtrue)
- jsx: JSX構文をそのままにしておくかReactの構文に書き換えるかの指定（react指定で<div/>がReact.createElement("div")と変換される）
- include: コンパイル対象となるファイルの指定（デフォルトはsrc、src/ディレクトリにしかtsファイルが置かれないから
- exclude: コンパイル対象から除外するファイル指定

CRAで生成されるtsconfig.jsonはかなり完成度が高いため、デフォルトのままでも十分OK
- おすすめカスタマイズ
```js
"baseUrl": "src",
"downlevelIteration": true
```
- baseUrl: モジュールのインポートを絶対パスで指定可能にし、その起点ディレクトリを指定するオプション
- この設定はVSCodeと相性が悪く認識されないことがあるため、設定後は次のどちらかを行うべき
  1. コマンドパレットから「TypeScript: Reload Project」を選択・実行
  1. コンソールから 'touch tsconfig.json` を実行
- downlevelIteration: コンパイルターゲットがES5以前の指定でも、ES2015の各種イテレータ周りの便利な記述を実行できるよう書き下してくれるオプション
