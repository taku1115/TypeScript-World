// 型アサーション
// 型を断定してコンパイラに押し付ける
type User = {
  username: string;
  address: { zipcode: string; town: string }
};
const str = `{ "username": "patty", "town": "Maple Town" }`;
const data: unknown = JSON.parse(str);
const user = data as User;
console.log(user.address.town); // TypeError: Cannot read property 'town' of undefined
// undefinedにアクセスしようとして「ぬるぽ」状態
// 型アサーションは型安全性が全く保障されない方法
// Type-Cating
const n = 123;
const s1 = String(n);
console.log(typeof s1); // string
// キャストは値が変化するわけではない
const s2 = n as String; // 型アサーションできない
// T as (U extends T) または (T extends U) as U であるときしか使えない
// 二重アサーションでコンパイルは通るが、実行時エラーになる
const str2 = (123 as unknown) as String;
// 最後の手段
// その前に型ガードを使う
// プリミティブ型の時はtypeofを使う
const foo: unknown = '1, 2, 3, 4';
if (typeof foo === 'string') {
  console.log(foo.split(','));
}
console.log(foo.split(',')); // compile error
// スコープ内での型を保証するチェックを行う
// クラスのインスタンスの時はinstanceofを使う
class Base { common = 'common'; }
class Foo extends Base { foo = () => { console.log('foo'); } }
class Bar extends Base { bar = () => { console.log('bar'); } }
const doDivide = (arg: Foo | Bar) => {
  if (arg instanceof Foo) {
    arg.foo();
    arg.bar(); // compile error!
  } else {
    arg.bar();
    arg.foo(); // compile error!
  }
  console.log(arg.common);
};
doDivide(new Foo());
doDivide(new Bar());