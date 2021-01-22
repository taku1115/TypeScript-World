# Hello, TypeScript !!

- Reactの学習ノート「TypeScript 編」
- 教材：大岡由佳さんの著書[『りあクト！ TypeScript で始めるつらくない React 開発 第3版 Ⅰ. 言語・環境編』](https://booth.pm/ja/items/2368045)

## Memo
### TypeScriptがメジャーになった要因
- 静的型付け
- 型推論
- Null安全性
- 上記以外はJavaScriptと同じ構文
- React+TypeScript採用例：Slack,Airbnbなど

### 型推論
```js
const s = '123';
const n = 456;
// jsは暗黙に型変換
s * 3 // 369;
s + n // '123456'

// ts
s * 3 // コンパイルエラー
s + n // '123456'（文字列の連結は致命的な不具合は起きないと判断）
```

### JSと共通の型
- Boolean: boolean
- Number : number
- BigInt : bigint
- String: string
- Symbol: symbol
- Null: null
- Undefined: undefined

### null安全性
デフォルトでは、
```js
const foo: string = null;
const bar: number = undefined;
```
が許与されてしまう

null安全性を保証するためには、
`tsconfig.json`に
```js
"strictNullChecks": true,
```
を追加する必要がある

あえてnullを許容したいときはユニオン型で明示的に表現
```ts
let foo: string | null = 'fuu';
foo = null;
```
```ts
type Resident = {
  familyName: string;
  lastName: string;
  mom?: Resident;
};
const getMomName = (resident: Resident): string => resident.mom.lastName;
// momプロパティが省略可能なため、undifinedになる可能性がある
// テストを書くまでもなく、VSCodeがnullアクセスエラーを未然に防いでくれる
const patty = { familyName: 'Hope-Rabbit', lastName: 'patty' };
getMomName(patty);
```
強引にコンパイルを通すなら、
```ts
// const getMomName = (resident: Resident): string => resident.mom.lastName;
const getMomName = (resident: Resident): string => resident.mom!.lastName;
```
非Nullアサーション演算子（mom!.lastNameの部分）をつけ、
「絶対にnullもundefinedも入りませんよ」とコンパイラを強引に黙らせることもできるが、推奨しない