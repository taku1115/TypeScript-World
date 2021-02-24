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
// エラー例 2
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

