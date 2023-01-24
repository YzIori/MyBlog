---
title: '【要約】良いコード/悪いコードで学ぶ設計入門 【12章 2】'
excerpt: '良いコード/悪いコードで学ぶ設計入門の自分用まとめ'
coverImage: '/assets/blog/dynamic-routing/good_bad_code.png'
date: '2022-1-20'
ogImage:
  url: '/assets/blog/dynamic-routing/good_bad_code.png'
tags:
  - '設計'
  - '初心者'
  - 'Java'
---

# 良いコード/悪いコードで学ぶ設計入門　 12 章まとめ 2

## 12.4 コマンド・クエリ分離

bad code

```Java
int gainAndGetPoint() {
  point += 10;
  return point;
}
```

good code

```Java
/**
* ポイントを増やす(コマンド)
*/
void gainPoint() {
  point += 10;
}

/**
* ポイントを返す(コマンド)
* @return ポイント
*/
int getPoint() {
  return point;
}
```

## 12.6 戻り値

### 12.6.1 「型」を使って戻り値の意図を表明すること。

bad code

プリミティブ型では意味が不明瞭

```Java
class Price {
  // 省略
  int add(final Price other) {
    return amount + other.amount;
  }
}
```

どれが金額か分かりにくい。

```Java
int price = productPrice.add(otherPrice);               // 商品価格の総額
int discountedPrice = calcDisCountedPrice(price);       // 割引金額
int deliveryPrice = calcDeliveryPrice(discountedPrice)  // 配送料

```

挙句の果、値の渡し間違え

```Java
// 配送手数料DeliveryChangeには配送料が渡されるべき
// しかし、商品価格の総額が渡されてしまっている。

DeliveryCharge deliveryCharge = new DeliveryCharge(price);
```

good code

価格を返すことが明瞭

```Java
class Price {
  // 省略
  Price add(final Price other) {
    final int added = amount + other.amount;
    return new Price(added);
  }
}
```

値を間違えた際でもコンパイラで弾ける。

```Java
Price price = productPrice.add(otherPrice);
DiscountedPrice discountedPrice = new DiscountedPrice(price);
DeliveryPrice deliveryPrice = new DeliveryPrice(discountedPrice);

```

### 12.6.3 エラーは戻り値で返さない、例外をスローすること。

bad code

エラーを Location 型の特定の状態で表現している。ダブルミーニングはよくない。

```Java
class Location {
  // 省略

  // 位置を移動する。
  Location shift(final int shiftX, final int shiftY) {
    int nextX = x + shiftX;
    int nextY = y + shiftY;
    if (valid(nextX, nextY)) {
      return new Location(nextX, nextY);
    }
    // (-1, -1)はエラー値
    return new Location(-1, -1);
  }
}
```

good code

エラーは例外をスローする形にする。

```Java
// 位置を表現するクラス
class Location {
  // 省略

  Location(final int x, final int y) {
    if (!valid(x, y)) {
      throw new IllegalArgumentException("不正な位置です。");
    }

    this.x = x;
    this.y = y;
  }

  // 位置を移動する
  Location shift(final int shiftX, final int shiftY) {
    int nextX = x + shiftX;
    int nextY = y + shiftY;

    return new Location(nextX, nextY);
  }
}
```
