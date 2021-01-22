// 関数の型

// 関数では、戻り値は型推論が可能だが、引数の型は必ず指定する
const add = (n: number, m:number): number => n + m;
const hello = (): void => console.log('Hello!');
console.log(add(2,4)); // 6
console.log(hello()); // Hello!

// 引数と戻り値の型をまとめて定義する方法もある
// 1: インターフェース
interface NumOp {
  (n: number, m: number): number;
}
const add2: NumOp = (n, m) => n + m;
const substract: NumOp = (n, m) => n - m;
console.log(add2(1, 2)); // 3
console.log(substract(5, 3)); // 2
// 2: インライン(アロー型アノテーション)
const add3: (n: number, m: number) => number = (n, m) => n + m;
const substract2: (n: number, m: number) => number = (n, m) => n - m;
console.log(add3(1, 2)); // 3
console.log(substract2(5, 3)); // 2
// インターフェースの方が可読性は高い

// ジェネリクスで関数の型宣言
const toArray = <T>(arg: T, arg2: T): T[] => [arg, arg2];
toArray(8, 3); // [ 8, 3 ]
toArray('foo', 'bar'); // [ 'foo', 'bar' ]
toArray(5, 'bar'); // error TS2345: Argument of type '"bar"' is not assignable to parameter of type'number'.
// <T>は型引数であり、型推論してくれる

// データの型に束縛されないよう型を抽象化してコードの再利用性を向上させつつ、
// 静的型付け言語の持つ型安全性を維持するプログラミング手法を『ジェネリックプログラミング』と呼ぶ。
// そして型引数を用いて表現するデータ構造のことを『ジェネリクス』と呼ぶ。

// 可変長引数を型安全に扱う
const toArrayVariably = <T>(...args: T[]): T[] => [...args];
toArrayVariably(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
toArrayVariably(6, '7', 8); // エラー

