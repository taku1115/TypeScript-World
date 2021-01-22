// 型ガード：アサーションより安全にコンパイルを通すため、型を絞り込む

// 値がプリミティブ型の場合(null以外:typeof null === object)
const foo: unknown = '1,2,3,4';
if (typeof foo === 'string') {
  console.log(foo.split(','));
}
console.log(foo.split(',')); // compile error

// クラスのインスタンスの場合
class Base { common = 'common'; }
class Foo extends Base { foo = () => { console.log('foo'); } }
class Bar extends Base { bar = () => { console.log('bar'); } }
const doDivide = (arg: Foo | Bar) => {
  if (arg instanceof Foo) {
    arg.foo();
    arg.bar(); // compile error
  } else {
    arg.bar();
    arg.foo(); // compile error
}
  console.log(arg.common);
};
doDivide(new Foo());
doDivide(new Bar());

{
// ただのオブジェクトの場合
// ユーザー定義の型ガード（User-Defined Type Guard)
type User = { username: string; address: { zipcode: string; town: string } };
const isUser = (arg: unknown): arg is User => {
// 型述語is：関数がtrueを返す場合、引数argの型がUserであることがコンパイラに示唆される
const u = arg as User;
return (
typeof u?.username === 'string' &&
typeof u?.address?.zipcode === 'string' &&
typeof u?.address?.town === 'string'
);
};
const u1: unknown = JSON.parse('{}');
const u2: unknown = JSON.parse('{ "username": "patty", "address": "Maple Town" }');
const u3: unknown = JSON.parse(
'{ "username": "patty", "address": { "zipcode": "111", "town": "Maple Town" } }',
);
[u1, u2, u3].forEach((u) => {
if (isUser(u)) {
console.log(`${u.username} lives in ${u.address.town}`);
} else {
console.log("It's not User");
console.log(`${u.username} lives in ${u.address.town}`); // compile error!
}
});
}
// 条件型などの高度な機能もあるが
// やりすぎると可読性の低い型パズルになるため注意

// 以下が読めればOK

// getUser: (userId: string) => Promise<User>
const data = await withResult(getUser)('patty');
if (data.isErr()) {
  console.error(data.err);
} else {
  const user = data.val;
  console.log(`Hello, ${user.name}!`);
}

type Result<T, E extends Error> = Ok<T, E> | Err<T, E>;

export class Ok<T, E extends Error> {
  constructor(readonly val: T) {}
  isOk = (): this is Ok<T, E> => true;
  isErr = (): this is Err<T, E> => false;
}
export class Err<T, E extends Error> {
  constructor(readonly err: E) {}
  isOk = (): this is Ok<T, E> => false;
  isErr = (): this is Err<T, E> => true;
}
export const withResult = <T, A extends any[], E extends Error>(
  fn: (...args: A) => Promise<T>,
  ) => async (...args: A): Promise<Result<T, E>> => {
    try {
    return new Ok(await fn(...args));
    } catch (error) {
      if (error instanceof Error) {
        return new Err(error as E);
      }
    }
};