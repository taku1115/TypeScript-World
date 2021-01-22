# TypeScriptのインポート/エクスポート
- ES Modulesを採用
- JSと異なるのは、指定パスの拡張子
- 拡張子を書くとエラー
- モジュール解決に独自のルールを持っているため

```ts
import ber from './bar';
```
1. src / bar.ts 
1. src / bar.tsx
1. src / bar.d.ts
1. src / bar/package.json のtypesまたはtypingsプロパティで設定されている型定義ファイル 
1. src / bar / index.ts
1. src / bar / index.tsx
1. src / bar / index.d.ts
- 以上の順で探索していき、最初に見つかったものが読み込まれる

### TSではインターフェースや型エイリアスもimport / export 対象

```ts
type Kind = 'king' | 'prince';

interface Person {
  name: string;
  age: number;
  kind: Kind;
}

const showKingName = (person: Person): void => {
  if (person.kind === 'King') console.log(person.name);
}

export { Kind, Person. showKingName };
```
### TSでは同じ名前空間に２つの宣言空間がある
- 変数宣言空間
- 型宣言空間

名前の管理が別々のため、変数や関数と、型とで同一の名前を持てる
```ts
const rate: { [unit: string]:number } = {
  USD: 1,
  EUR: 0.9,
  JPY: 108,
  GBP: 0.8,
};

type Unit = keyof typeof rate;
type Currency = {
  unit: Unit;
  amount: number;
}

const Currency = {
  exchange: (currency: Currency, unit: Unit): Currency => {
    const amount = currency.amount / rate[currency.unit]*rate[unit];

    return { unit, amount };
  }
}

export { Currency };
```
- 上記の例では、型エイリアスとオブジェクトが同時に両方ともエクスポートされる
- 型と同じ名前のオブジェクトを定義することを一般的に「コンビネーション」と呼ぶ
- 以下インポート側
```ts
import { Currency } from './currency-export.ts';

const dollers: Currency = {
  unit: 'USD',
  amount: 100,
};

console.log(dollers); // { unit: "USD", amount: 100 }
console.log(Currency.exchange(dollers, 'JPY')); // { unit: "JPY", amount: 10800 }
```

- グループ化して扱うために、意図的にコンビネーションすることがある
- また、片方だけを扱いたい時のために、「型のみのインポート」「型のみのエクスポート」という構文もある
```ts
import type { Foo } from 'bar'
```

### JavaScriptモジュールをTypeScriptから読み込む
- npmのリポジトリで提供されている多くのパッケージは、TypeScript で書かれて
いるものでも、TypeScriptのままで配布されているものはあまりない
- node_modules/ ディレクトリの中を見ると、各パッケージの中のコードはすべて JavaScript形式になっている
- 理由は以下の通り
1. JavaScript環境との相互運用が簡単
1. .tsファイルをコン
パイラが見つけてアプリとともに毎回コンパイルしてしまう
1. TypeScriptのメジャーバージョンアップによってコードの修正が必要になることがある
- 以上の理由で、JavaScriptにコンパイル済みのファイルと、『宣言ファイル（Declaration File）』という TypeScriptの型情報を定義したファイルをパッケージングして配布する

- TypeScriptからJavaScriptモジュールをただインポートすると、実装だけがあって型がない状態になる
- そこで、declare(アンビエント宣言)によって型情報を付加する
- .jsファイルと同名の.d.tsファイルが作成される