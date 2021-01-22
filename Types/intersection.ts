// インターセクション型
// もっぱらオブジェクト型の合成に用いられる
{
  type Some = number&string;
  let id: Some;
  id = 100; // 型 'number' を型 'never' に割り当てることはできません。
}
// 数値かつ文字列なんて型は存在しないためnever型になる

type E = { foo: number };
type F = { bar: string };
type G = {
  foo?: number;
  baz: boolean;
};
type EnF = E & F; // { foo: number, bar: string }
type EnG = E & G; // { foo: number, baz: boolean }
type GnEorF = G & (E | F);
// { foo: number, baz: boolean } or { foo?: number, bar: string, baz: boolean }

{
  type Unit = 'USD' | 'EUR' | 'JPY' | 'GBP';
  interface Currency {
    unit: Unit;
    amount: number;
  }
  interface IPayment extends Currency {
    date: Date;
  }
  type TPayment = Currency & {
    date: Date;
  };
  // extendsによるインターフェース拡張と同等のことが、インターセクション型でできる
  const date = new Date('2020-09-01T12:00+0900');
  const payA: IPayment = { unit: 'JPY', amount: 10000, date };
  const payB: TPayment = { unit: 'USD', amount: 100, date };
}