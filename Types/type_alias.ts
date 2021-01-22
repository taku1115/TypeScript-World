// 型エイリアス

// 型エイリアス vs インターフェース
type Unit = 'USD' | 'EUR' | 'JPY' | 'GBP';
type TCurrency = {
  unit: Unit;
  amount: number;
};
interface ICurrency {
  unit: Unit;
  amount: number;
}
const priceA: TCurrency = { unit: 'JPY', amount: 1000 };
const priceB: ICurrency = { unit: 'USD', amount: 10 };
// TCurrencyとICurrencyをそれぞれVSCode上でホバーするとわかるが、
// インターフェースは型の宣言であるため、型自体には本来の名前が与えられる
// 一方、型エイリアスは無名で作られた型に別名を与えているため、ホバー時に構造まで表示される

// また、インターフェースは拡張に対してオープンな性質がある
interface User {
  name: string;
  }
interface User {
  age: number;
}
interface User {
  species: 'rabbit' | 'bear' | 'fox' | 'dog';
}
const rolley: User = {
  name: 'Rolley Cocker',
  age: 8,
  species: 'dog',
};
// 再宣言（上書き）ではなく、新しいプロパティが追加されていくだけ
// しかし、どこからでも随時拡張できてしまうのはバグに繋がりやすい好ましくない仕様である

// 現在の型エイリアスは、できることが非常に増え、インターフェースを優先して使う必要がなくなった
// 保守性なども考慮して、型エイリアスのみを使うことを推奨
