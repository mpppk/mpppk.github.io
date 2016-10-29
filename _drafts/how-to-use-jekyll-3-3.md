---
layout: post
title:  "How to use jekyll 3.3"
date:   2016-10-27 23:12:27 +0900
categories: jekyll 
---

* 未来の日付を指定すると、indexには表示されない
* `new post`みたいなコマンドはない

## TODO
- [x] theme変える
    defaultが一番かっこいい
- github.ioにアップする
- revealjsとの連携
    - 読んだ本の一覧

## slide以外は他のテーマを使いたい
1. revealjsをsubmodulesとしてadd
1. _layoutにreveal.htmlを追加
1. _config.ymlに変数を追加
1. 

* 一つのスライドに対して複数のmdを登録できるようにするべきか?
したい場合はどうすれば良いか?
しなくていい気がする
単にhtmlにcontentとしてmdを入れ込む


* layoutを参照すると、layout内のcontentに、呼び出した側のコンテンツが格納される

* sample-slidesを読み込んでいるはずが、なぜかこのファイルが読まれる
    * コメント消したら直った
