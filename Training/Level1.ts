// 1. 関数isPositiveに型をつける
function isPositive(num) {
  return num >= 0;
}

// 使用例
isPositive(3);

// エラー例
isPositive('123');
const numVar: number = isPositive(-5);

// 回答
function isPositive(num: number): boolean {
  return num >= 0;
}
// Good : 型推論を利用して、booleanを省略しても良い

//////////////////////////////////////////////////

// 2. オブジェクトの型Userを定義する
function showUserInfo(user: User) {
  // 省略
}

// 使用例
showUserInfo({
  name: 'John Smith',
  age: 16,
  private: false,
});

// エラー例 1
showUserInfo({
  name: 'Mary Sue',
  private: false,
});
const usr: User = {
  name: 'Gombe Nanashino',
  age: 100,
};

// 回答
type User = {
  name: string;
  age: number;
  private: boolean;
};
// Good : interfaceを使用しても良い

//////////////////////////////////////////////////

// 3. 関数の型を定義する
const isPositive: IsPositiveFunc = num => num >= 0;

// 使用例
isPositive(5);

// エラー例
isPositive('foo');
const res: number = isPositive(123);

// 回答
type IsPositiveFunc = (arg: number) => boolean;
// Good : interface IsPositiveFunc {(arg: number): boolean;} もOK

//////////////////////////////////////////////////

// 4. 関数（引数が配列）に型アノテーションをつける
function sumOfPos(arr) {
  return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
}

// 使用例
const sum: number = sumOfPos([1, 3, -2, 0]);

// エラー例
sumOfPos(123, 456);
sumOfPos([123, "foobar"]);

// 回答
function sumOfPos(arr: number[]): number {
  return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
}
// Good : sumOfPos(arr: Array<number>): number のように書いてもOK