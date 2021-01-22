// オーバーロード
// 同メソッド名だが、引数の型や個数によって異なるメソッドが実行される

class Brooch {
  pentagram = 'Silver Crystal';
}

type Compact = {
  silverCristal: boolean;
};

class CosmicCompact implements Compact {
  silverCristal = true;
  cosmicPower = true;
}

class CrisisCompact implements Compact {
  silverCristal = true;
  moonChalice = true;
}

function transform(): void;
function transform(item: Brooch): void;
function transform(item: Compact): void;
function transform(item?: Brooch | Compact): void {
  if (item instanceof Brooch) {
    console.log('Moon crystal power , make up!!');
  } else if (item instanceof CosmicCompact) {
    console.log('Moon cosmic power , make up!!!');
  } else if (item instanceof CrisisCompact) {
    console.log('Moon crisis , make up!');
  } else if (!item) {
    console.log('Moon prisim power , make up!');
  } else {
    console.log('Item is fake... ');
  }
}
transform();
transform(new Brooch());
transform(new CosmicCompact());
transform(new CrisisCompact());

// 関数宣言の重複はJSでは単に再定義となって上書きされるだけだが、
// TSでは型が異なる宣言を重複させることでオーバーロードができる
// Javaと異なり、中の実装はひとつの関数に集約される
// つまり実装側の関数の引数は、すべてのパターンを網羅できるものにする必要がある

// できるだけ式を使うように書き換え
type Transform = {
  (): void;
  (item: Brooch): void;
  (item: Compact): void;
};
const transform2: Transform = (item?: Brooch | Compact): void => {
  if (item instanceof Brooch) {
    console.log('Moon crystal power , make up!!');
  } else if (item instanceof CosmicCompact) {
    console.log('Moon cosmic power , make up!!!');
  } else if (item instanceof CrisisCompact) {
    console.log('Moon crisis , make up!');
  } else if (!item) {
    console.log('Moon prisim power , make up!');
  } else {
    console.log('Item is fake... ');
  }
};