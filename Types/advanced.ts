// 高度な型表現

// typeof演算子
console.log(typeof 100); // 'number'
const arr = [1, 2, 3];
type NumArr = typeof arr;　// 型NumArr = number[]
const val: NumArr = [4, 5, 6];
const val2: NumArr = ['one', 'two', 'ten']; // コンパイルエラー

// in演算子
const obj = { a: 1, b: 2, c: 3 };
console.log('a' in obj); // true
// 通常の式では指定した値がオブジェクトのキーとして存在するかどうかの真偽値を返す
for (const key in obj) { console.log(key); } // a b c
// for...in文ではオブジェクトからインクリメンタルにキーを抽出する
type Fig = 'one' | 'two' | 'three';
type FigMap = { [k in Fig]?: number };
// 型コンテキストでは、列挙された型の中から各要素の型の値を抜き出してマップ型を作る
const figMap: FigMap = {
one: 1,
two: 2,
three: 3,
};

// keyof演算子
const permissions = {
  r: 0b100,
  w: 0b010,
  x: 0b001,
};
type PermsChar = keyof typeof permissions; // 'r' | 'w' | 'x'
// オブジェクトの型からキーを抜き出す
const readable: PermsChar = 'r';
const writable: PermsChar = 'z'; // コンパイルエラー

// valueofはないが、インデックスアクセス演算子[]を使って値を抜き出せる
const permissions2 = {
  r: 0b100 as const,
  w: 0b010 as const,
  x: 0b001 as const,
};
type PermsChar2 = keyof typeof permissions; // 'r'|'w'|'x'
type PermsNum = typeof permissions2[PermsChar]; // 1 | 2 | 4
// []でプロパティ値にアクセスできる
// 型コンテキストで用いればプロパティ値の型が返ってくる
// 意味的には(permissions[PermsChar])ではなく(typeof permissions)[PermsChar]

// valueOfを自作するパターン
type ValueOf<T> = T[keyof T];
type PermsNum2 = ValueOf<typeof permissions2>; // 1 | 2 | 4
// Constアサーション:定数としての型注釈を付与する
const permissions3 = {
  r: 0b100,
  w: 0b010,
  x: 0b001,
} as const; // まとめて書く方が一般的

// extendsを使った型表現
const override = <T, U extends T>(obj1: T, obj2: U): T & U => ({
  ...obj1,
  ...obj2,
});
// 第2引数obj2の型引数Uが第1引数の型obj1の型Tと同じか拡張したものでなければならない
override({ a: 1 }, { a: 24, b: 8 }); // { a: 24, b: 8 }
override({ a: 15 }, { x: 73 }); // compile error!

// 組み込みユーティリティ型(先ほど作ったValueOf<T>のようなユーティリティ型が用意されている)

// 各プロパディの属性をまとめて変更するもの
// - Partial<T> : Tのプロパティをすべて省略可能にする
// - Required<T> : Tのプロパティをすべて必須にする
// - Readonly<T> : Tのプロパティをすべて読み取り専用にする
// 自作するとしたら、、、
type Partial<T> = { [K in keyof T]?: T[K] };
type Required<T> = { [K in keyof T]: T[K] };
type Readonly<T> = { readonly [K in keyof T]: T[K] };
// readonlyやReadonly<T>は可能な限り使うべき

// オブジェクトの型からプロパティを取捨選択するもの
// Pick<T,K> : TからKが指定するキーのプロパティだけを抜き出す
// Omit<T,K> : TからKが指定するキーのプロパティを省く
type Todo = {
  title: string;
  description: string;
  isDone: boolean;
}
type PickedTodo = Pick<Todo, 'title'|'isDone'>;
type OmittedTodo = Omit<Todo, 'description'>;
// どちらの型も{ title: string; isDone: boolean }になる

// 列挙的な型を加工するもの
// Extract<T,U> : TからUの要素だけを抜き出す
// Exclude<T,U> : TからUの要素を省く
type Permission = 'r' | 'w' | 'x';
type RW1 = Extract<Permission, 'r' | 'w'>;
type RW2 = Exclude<Permission, 'x'>;
// どちらの型も'r'|'w'になる

// 任意の型からnullとundefinedだけを省いてnull非許容にするためのもの
// NonNullable<T> : Tからnullとundefinedを省く
type T1 = NonNullable<string | number | undefined>;
type T2 = NonNullable<number[] | null | undefined>;
const str: T1 = undefined; // コンパイルエラー
const arr: T2 = null; // コンパイルエラー

// 関数を扱うもの
// Parameters<T> : Tの引数の型を抽出し、タプル型を返す
// RetuenType<T> : Tの戻り値の型を返す
const f1 = (a: number, b: string) => { console.log(a, b); };
const f2 = () => ({ x: 'hello', y: true });
type P1 = Parameters<typeof f1>; // [number, string]
type P2 = Parameters<typeof f2>; // []
type R1 = ReturnType<typeof f1>; // void
type R2 = ReturnType<typeof f2>; // { x: string; y: boolean }