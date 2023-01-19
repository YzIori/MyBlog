---
title: '【要約】良いコード/悪いコードで学ぶ設計入門 【11/12章】'
excerpt: '良いコード/悪いコードで学ぶ設計入門の自分用まとめ'
coverImage: '/assets/blog/dynamic-routing/good_bad_code.png'
date: '2022-1-14'
ogImage:
  url: '/assets/blog/dynamic-routing/good_bad_code.png'
tags:
  - '設計'
  - '初心者'
  - 'Java'
---

# 良いコード/悪いコードで学ぶ設計入門　 12 章まとめ

## 12.1 必ず自身のクラスのインスタンス変数を使うこと

### 完全コンストラクタとは

不正状態から防護するための設計パターン。生焼けオブジェクト(引数なしのデフォルトコンストラクタで初期化してあとからインスタンス変数を初期化する方法)を防止するため、インスタンス変数をすべて初期化できるだけの引数をもったコンストラクタを用意する。そして、コンストラクタ内では、ガード節で不正値を弾く。

```Java
import java.util.Currency;

class Money {
  final int amount;
  final Currency currency;

  Money(final int amount, final Currency currency) {
    if (amount < 0) {
      throw new IllegalArgumentException("金額には0以上を指定してください。");
    }
    if (currency == null) {
      throw new NullPointerException("通貨単位を指定してください。");
    }

    this.amount = amount;
    this.currency = currency;
  }

  Money add(final Money other) {
    if (!currency.equals(other.currency)) {
      throw new IllegalArgumentException("通貨単位が違います。");
    }
    return new Money(added, currency);
  }
}
```

## 12.2 不変をベースに予期せぬ動作を防ぐには

不変をベースにする。変更するには、変更値を持った新しいインスタンスを生成する形にする。

```Java
class AttackPower {
  static final int Min = 0;
  final value = 0;

  AttackPower(final int value) {
    if (value < MIN) {
      throw new IllegalArgumentException();
    }

    this.value = value;
  }

  /**
   * 攻撃力を強化する
   * @param increment 攻撃力の増分
   * @return 強化された攻撃力
   **/
  AttackPower reinForce(final AttackPower increment) {
    return new AttackPower(this.value + increment.value);
  }

  /**
   * 無力化する
   * @return 無力化された攻撃力
   **/
  AttackPower disable() {
    return new AttackPower(MIN);
  }
}
```

## 12.3 尋ねるな、命じろ

```Java
public class Person {
  private String name;

  // getter
  public String getName() {
    return name;
  }

  // setter
  public void setName(String newName) {
    name = newName;
  }
}

```

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
