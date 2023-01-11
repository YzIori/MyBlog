---
title: 'インストールした Python ライブラリを VSCode 上で読み込めない時の対処法'
excerpt: 'VSCodeで Import "module_name" could not be resolved from 〜の対処法'
coverImage: '/assets/blog/dynamic-routing/python.png'
date: '2022-1-11'
ogImage:
  url: '/assets/blog/dynamic-routing/python.png'
tags:
  - 'python'
  - 'vscode'
---

# インストールした Python ライブラリを VSCode 上で読み込めない時の対処法

## 概要

python で使いたいライブラリをインストールしたが、VSCode 上で Import "module_name" could not be resolved from 〜というエラーが発生する。

### 環境

Ubuntu 22.04.1 LTS
VSCode: 1.71.2

## 原因

VSCode が対象ライブラリのパスを認識できていない。

## 解決策

VSCode にパスを教えてあげればよい。

### ライブラリのパスを確認する

適当にターミナルを開いて対話モードに入ってパスを確認する。

```bash
$ python3  #対話モードに入る
Python 3.8.5 (default, Sep  4 2020, 07:30:14)
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.

>>> import django #パスを確認したいライブラリをimportする
>>> print(django.__file__) #パスを確認
/home/user/anaconda3/lib/python3.8/site-packages/markdown/__init__.py # パスがでる
```

### パスを VSCode に教える

先ほど確認したパスを VSCode に設定する。

```bash
# site-packages/までをコピーする。
/home/user/anaconda3/lib/python3.8/site-packages/markdown/
```

VSCode 上で「ファイル」/「ユーザー設定」/「設定」を開く。（または「Ctrl」＋「,」）<br>

次に、設定の検索か「 extra path 」を入力。<br>

Python › Analysis: Extra Paths という項目があるので、「項目の追加」をクリック。

入力欄が表示されるので、先ほどコピーしたパスをペーストし、OK をクリック。<br>

以上で VSCode がライブラリを認識してくれるはず。
