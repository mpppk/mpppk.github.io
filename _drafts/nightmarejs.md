---
layout: post
title:  "nightmarejs"
---

## nightmarejsのdocument
* わりと雑
* 簡単なサンプルの後、ひたすらAPIの説明b

## 最初のサンプルコードの解説
### goto
### type
### click
### wait
### evaluate

## その他のAPI
### Timeout
コンストラクタでいろいろTimeoutが設定できる
* waitTimeout
waitの許容時間
これを超えるとexceptionが投げられる

* paths
Electronが参照するディレクトリを定義する
(home, downloadsなど)

* typeInterval
typeでのキー入力の感覚を何ミリ秒にするか


## Interact with the Page
* goto
urlを読み込む

## in gusto
* 同意までする
* タイトルの値を取得
* userDataからタイトルに対応する値を取得
* タイトルに対応するブラウザ操作を取得
* タイトルが指定の値になるまでループ
* 

## Tips
### evaluateでquerySelectorから取ってきたDOMが空オブジェクトになる
* なぜかはよくわからないけど、帰り値をDOMにするのではなくfunction内でinnerHTMLなどのメソッドを呼べば良い
* 
