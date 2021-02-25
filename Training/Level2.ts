// 1. ジェネリクス：myFilterに型アノテーションをつける
function myFilter(arr, predicate) {
  const result = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}

// 使用例
const res = myFilter([1, 2, 3, 4, 5], num => num % 2 === 0);
const res2 = myFilter(['foo', 'hoge', 'bar'], str => str.length >= 4);

// エラー例
myFilter([1, 2, 3, 4, 5], str => str.length >= 4);

// 解答 : 型引数Tを追加する
function myFilter<T>(arr: T[], predicate: (elm: T) => boolean): T[] {
  const result = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}

// 2. 型Speedを定義する
function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

// 使用例
const slowSpeed = getSpeed("slow");
const mediumSpeed = getSpeed("medium");
const fastSpeed = getSpeed("fast");

// エラー例
getSpeed("veryfast");

// 解答: リテラル型を定義する
type Speed = 'slow' | 'medium' | 'fast';

// 3. 関数addEventListenerをdeclareを用いて宣言する

// 2つまたは3つの引数を受け取る関数で、返り値なし
// 1つ目の引数は文字列、2つ目の引数は関数、3つ目の引数は省略可能であり、真偽値またはオブジェクトを渡すことができる。
// オブジェクトに存在可能なプロパティはcapture, once, passiveの3つで、全て真偽値であり、省略可能。

// 使用例
addEventListener("foobar", () => {});
addEventListener("event", () => {}, true);
addEventListener("event2", () => {}, {});
addEventListener("event3", () => {}, {
  capture: true,
  once: false
});

// エラー例
addEventListener("foobar", () => {}, "string");
addEventListener("hoge", () => {}, {
  capture: true,
  once: false,
  excess: true
});

// 解答
type AddEventListenerOptionsObject = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}
declare function addEventListener(
  type: string,
  handler: () => void,
  options?: boolean | AddEventListenerOptionsObject
): void;

