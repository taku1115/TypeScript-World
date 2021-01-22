// 型アノテーション

// 配列
const numArr: number[] = [1, 2, 3];
const strArr: Array<string> = ['1', '2', '3'];
// 配列では前者の方式[]が推奨される

// オブジェクト
const words: object = ['foo', 'bar', 'baz'];　// objectは広義すぎる（上記も通る）ため使うな
const red: {rgb: string, opacity: number} = {rgb: 'ff0000', opacity: 1};
// プロパティのキー名と値の型を明記して狭義のオブジェクト型とする

// インターフェース
interface Color {
  readonly rgb: string; // readonlyは書き換え不可
  opacity: number;
  name?: string; // ?は省略可能
}
const turquoise: Color = { rgb: '00afcc', opacity: 1 };
turquoise.name = 'Turquoise Blue';
turquoise.rgb = '03c1ff'; // error TS2540: Cannot assign to 'rgb' because it is a read-only property.

// さらにフレキシブルなインターフェース
interface Status {
  level: number;
  maxHP: number;
  maxMP: number;
  [attr: string]: number; // インデックスシグネチャ(キーは文字列が数値のみ)
}
const myStatus: Status = {
  level: 99,
  maxHP: 999,
  maxMP: 999,
  attack: 999, // インデックスシグネチャ
  defense: 999, // インデックスシグネチャ
};

// 列挙の中から一つだけ限定したいときの型（ Enum / リテラル ）

// Enum型
enum Pet { Cat, Dog, Rabbit } 
console.log(Pet.Cat, Pet.Dog, Pet.Rabbit); // 0 1 2 (enumの実体は数値である)
let Tom: Pet = Pet.Cat;
console.log(Tom); // 0
Tom = Pet.Dog;
Tom = 12;
console.log(Tom); // 12 (0, 1, 2以外の数値も入ってしまう)
// 文字列enumで解決できる
enum Pet2 {
  Cat = 'Cat',
  Dog = 'Dog',
  Rabbit = 'Rabbit',
}
let Tom2: Pet = Pet.Cat;
Tom2 = 'Hamster'; // [eval].ts:7:1 - error TS2322: Type '"Hamster"' is not assignable to type 'Pet'.
Tom2 = 'Dog'; // [eval].ts:8:1 - error TS2322: Type '"Dog"' is not assignable to type 'Pet'.

// リテラル型
let Tom3: 'Cat' = 'Cat';
Tom3 = 'Dog'; // [eval].ts:2:1 - error TS2322: Type '"Dog"' is not assignable to type '"Cat"'.
// リテラル型とユニオン型を組み合わせて使う
let Mary: 'Cat' | 'Dog' | 'Rabbit' = 'Cat';
Mary = 'Rabbit';
Mary = 'Parrot'; // [eval].ts:5:1 - error TS2322: Type '"Parrot"' is not assignable to type '"Cat" | "Dog" | "Rabbit"'.

// Enumよりリテラルの方がシンプルで扱いやすい

// タプル型
const charAttrs: [number, string, boolean] = [1, 'patty', true];
// APIの戻り値として複数の異なる値を設定したい時などにインターフェースで使う
const [id, username, isAdmin] = charAttrs;
console.log(id, username, isAdmin); // 1 Patty true

// 何者でもあったり、何者でもない型

const str = `{"id": 1, "username": "john_doe"}`;
// any：いかなる値も受け入れる(JSに戻すようなもの)
const anyUser: any = JSON.parse(str);
console.log(anyUser.id, anyUser.address.zipcode); // コンパイルは通る(Cannot read property 'zipCode' of undefined)
// unknown：anyの安全版
const unknownUser: unknown = JSON.parse(str);
console.log(unknownUser.id, unknownUser.address.zipcode); // 値にアクセスできずコンパイルエラ(「型ガード」で解決可能)
// never: 何も代入できない
const greet = (friend: 'Serval' | 'Caracal' | 'Cheetah') => {
  switch (friend) {
    case 'Serval':
    return `Hello, ${friend}!`;
    case 'Caracal':
    return `Hi, ${friend}!`;
    case 'Cheetah':
    return `Hiya, ${friend}!`;
    default: {
      const check: never = friend;
      // caseを一つ削除するとcheckが型エラーになる
      // caseの漏れを未然にチェックできる
    }
  }
};
console.log(greet('Serval')); // Hello, Serval!




