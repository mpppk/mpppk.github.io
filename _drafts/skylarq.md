---
layout: post
title:  "JavaScriptでブラウザを自動操作できるnightmarejsを使ってガストのクーポンを自動発行する"
---

## 背景
集中するためにカフェに行く方は多いと思いますが、自分は最近ファミレスで作業しています。
その中でもガストを含むすかいらーくグループでは、清算後のレシートにドリンクバーのクーポンが付いていることがあります。
![receipt](/imgs/skylarq/receipt.jpg)

ガストだとドリンクバーは199円なので、74円になると約63%OFFです。すごい。
この画像は74円ですが、無料のクーポンも有るみたいです。
さて、このクーポンですが、使うにはアンケートに答える必要があります。
まずレシートに書かれているQRコードにアクセスします。

![top](/imgs/skylarq/top.png)
アクセスすると表示される画面に、クーポンに書かれている24桁の数字を入力します。
規約に同意すると、こんな感じでアンケートが表示されるので粛々と答えます。
全部で34問あるみたいです。
![question](/imgs/skylarq/question.png)

全ての質問に回答すると、5桁の数字が表示されます
![result](/imgs/skylarq/result.png)

これをレシートに記入すれば、ようやくクーポンとして利用することができます。
ガスト以外に行ったことがないのですが、すかいらーく系列店であるバーミヤン、夢庵、ジョナサンなどでも発行されるはずです。

## 問題点
アンケートの中には、過去の来店経験など、毎回同じ回答になる項目がいくつかあります。
できればそういうのは飛ばして、今回特筆すべき項目への回答に時間をかけたいですよね。
あと、単純に33問分マウスをポチポチして答えるのが大変というのもあります。

## そこでNightmarejs(前置きが長い)
Nightmarejsは、JavaScriptでブラウザを操作するためのライブラリです。
例えば、yahoo検索を行うサンプルコードは以下のようになります。

```yahooSearch.js
const Nightmare = require('nightmare');
const co = require('co');

co(function * (){
  yield Nightmare({show: true})
    .goto('http://yahoo.co.jp')
    .type('input#srchtxt', 'nightmarejs')
    .click('#srchbtn');
});

```

これを実行するとこんな感じになります。

```Shell
$ node yahooSearch.js
```

![nightmarejs_demo](/imgs/skylarq/nightmarejs_demo.gif)


いやーお手軽ですね。
これを使って、ガストのアンケートに自動回答するツールを作ります。

## 実装例
例えば、質問文を抽出するコードはこんな感じになります。

```js
extractQuestions(nightmare){
  return nightmare.evaluate(() => {
    return document.querySelector('.mainQuestion').textContent;
  });
}

extractQuestions(nightmare).then(question){ console.log(question); }
// => 質問内容が表示される
```

evaluateに渡した関数は、ブラウザ上で実行され、返り値はPromiseっぽい感じでthenの引数として得られます。
ここではブラウザ上でDOMにアクセスし、質問内容を返しているわけですね。

nightmarejsはv2からyieldableになったので、メソッドを使うときはこのように同期的に書くことができます。

```js
const question = yield extractQuestions(nightmare);
console.log(question);
```

## ガストのアンケートに自動回答するツール
こんな感じでNightmarejsを使いまくった結果、事前に作っておいた回答ファイルから自動でアンケートに回答するツールができました。

[skylarq](https://github.com/mpppk/skylarq)

以下のコマンドでインストールできます。

```
$ npm install -g skylarq
```

### 使い方
まずアンケートにどのように答えるかを設定するファイルを作成します。
以下のコマンドを実行すると、ホームディレクトリにskylarq.ymlが生成されます。

```Shell
$ skylarq --init
```

`skylarq.yml`には、以下のように質問とその回答が書かれています。
questions以下のanswerを回答したい内容に書き換えていきましょう。
`code`には、レシートに書かれているn桁の番号を入力しておきます。
一度回答してしまえば、二度目からは変わった点を変更するだけで済むようになります。

```yml
code: 018978201611070001085974
questions:  
    今回ガストを利用されて、お客様の全体的な満足度はいかがでしたか？ :
        choices :
            - 大変満足
            - 満足
            - どちらでもない
            - 不満
            - 大変不満
        answer : 大変満足
        ・
        ・
        ・
```

編集が終わったら実行しましょう。
単に`skylarq`コマンドを実行すると、skylarq.ymlの内容に基づいてアンケートに回答し、最後にクーポンコードを表示します。
--browser(or -b)オプションを指定すると、実行中の内容がブラウザに表示されます。

```Shell
$ skylarq
[==============================] 33/33 100% 10.0s 0.0s
coupon code: 12345
```

これでアンケートに回答しまくれますね。

## ぜひ使ってみてください
当然ですが、実行にはレシートにランダムで付与されるガストのクーポンが必要です。
このツールの開発のため毎日ガストに通っていたら、最近は入店時に禁煙か喫煙かを聞かれなくなりました。

それぐらい行ってもテストのためのクーポンが足りないため、skylarq.ymlの質問網羅度は全然足りておらず、存在しない質問が表示された場合は回答が途中で中断されてしまいます。
特にガスト以外が近所にないので、他のすかいらーく系列店は現状質問が全く存在していません。
もし新たな質問文を発見したら、お気軽にissueを立てていただけるとありがたいです。

フィードバックお待ちしてます！
