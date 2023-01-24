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
  - 'Go'
---

# 【要約】良いコード/悪いコードで学ぶ設計入門 【11, 12 章】

## はじめに

本記事は「良いコード/悪いコードで学ぶ設計入門」（通称：ミノ駆動本）の 11, 12 章をまとめたものです。本書では Java でプログラムが書かれていますが、本記事では自分の練習を Go でプログラムを書いています。

## 11 章 コメントについて

11 章では、保守と変更の正確性を高める書き方について解説されています。コメントとは本来読み手にコードの理解を促すために記述します。しかし、注意して扱わないと逆にバグの原因となりうるのです。

### コメントは更新されずらい

コードと比べてコメントはメンテナンスされにくい性質を持ちます。理想的にはコードを実装した時にコメントも同時に更新するべきですが、なかなかそうはいかないことが多いのではないでしょうか。本書では<strong>情報が古くなり実装を正しく説明しなくなったコメントを退化コメント</strong>と読んでいます。

```Go
// 毒、麻痺状態の場合に、メンバーの顔を苦しそうな表情に変更する。
if menber.isPainful() {
  face.changeToPainful()
}
```

上記のコードは menber.isPainful メソッドが毒、麻痺の状態を判定しているものと推測できます。しかし、実は実装は以下のようになっていたらどうでしょう。

```Go
type Menber struct {states States}


```