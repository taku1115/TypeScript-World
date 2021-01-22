// クラスの型

// JSでは、コンストラクタ内に記述があればメンバー変数が生成される
// TSでは、クラスの最初でメンバー変数の定義をしておく必要がある
class Rectangle {
  readonly name = 'rectangle'; // プロパティ初期化子　
  sideA: number;
  sideB: number;
  constructor(sideA: number, sideB: number) {
    this.sideA = sideA;
    this.sideB = sideB;
  }
  getArea = (): number => this.sideA * this.sideB;
}
// コンストラクタの引数にnameがない場合は初期化を済ませて良い
// アクセス修飾子（public, protected, private)もつけてOK

// 継承は可能だが、合成するスタイルの方が優勢になっている
// １：継承
class Square1 extends Rectangle {
  readonly name = 'square'; // 親クラスのreadonlyを削除しないと動かない
  side: number;
  constructor(side: number) {
    super(side, side);
  }
}
// ２：合成
class Square2 {
  readonly name = 'square';
  side: number;
  constructor(side: number) {
    this.side = side;
  }
  getArea = (): number => new Rectangle(this.side, this.side).getArea();
}
// 継承の方が、抽象度が高くコード量も少ないため正しく見える
// しかし、暗黙に不必要なメンバー変数（sideA, sideB)を継承しておりバグを生む芽になりかねない
// さらに、getArea()の完全共有により、実装を不用意に変更できず、継続的なコード改善の障害となる
// すなわち、継承されたクラスは保守性が悪い
// 合成されたクラスは独立した部品に過ぎず、保守性に優れている
// 最近できたGoやRustでは実装を伴った継承がそもそも存在しない
// Reactでもクラスコンポーネントを作成するときは継承を避けるよう推奨している
// これからは、継承ツリーを設計に持ち込まず、独立性の高い部品を組み合わせていくべき

// クラスの型を抽象化して定義する方法は２つ
// abstractを使い抽象クラスを作る / インターフェースを使う
// 抽象クラスは実装を伴った継承が可能なため、インターフェースを使う

interface Shape {
  readonly name: string;
  getArea: () => number;
}
interface Quadrangle {
  side: number;
}
class Rectangle2 implements Shape, Quadrangle {
  readonly name = 'rectangle';
  side: number;
  sideB: number;
  constructor(side: number, sideB: number) {
    this.side = side;
    this.sideB = sideB;
  }
  getArea = (): number => this.side * this.sideB;
}

// クラスがインターフェースとして扱われる例
class Point {
  x: number = 0;
  y: number = 0;
}
const pointA = new Point();
const pointB: Point = { x: 2, y: 4 };
interface Point3d extends Point {
  z: number;
}
const pointC: Point3d = { x: 5, y: 5, z: 10 };
// TSでクラス定義すると、2つの宣言が同時に実行される
// クラスインスタンスのインターフェース型宣言と、コンストラクタ関数の宣言
// つまりPointクラスには２つの顔があり、
// 型の文脈ではインターフェースとして扱われ、
// 通常の文脈ではコンストラクタ関数として扱われる