---
layout: post
title:  "複数のGitリポジトリサービスを操作できるCLIツール: hlb"
---

# TL;DR
ターミナルやコマンドプロンプトから、GitHubやGitLabのリポジトリをブラウザで開いたりなんやかんやできるツール [hlb](https://github.com/mpppk/hlb) を作ったので使ってください。

# 背景: GitHubをCLIで操作できるhubコマンドの素晴らしさと課題
GitHubなどのgitリポジトリサービスを使っていると、あるリポジトリをマウスでポチポチしながらブラウザ上で開くのが面倒だったりします。  
そこで、GitHubはhubコマンドというCLIツールを提供しています。
例えば、カレントディレクトリのリポジトリをGitHub上で開くには`hub browse`を実行します。

[華麗にbrowseを紹介するgif]

他にも、GitHubで管理していないGitリポジトリを登録してくれるコマンドがあります

例2) カレントディレクトリのリポジトリをGitHub上に作ってリモートリポジトリとして登録

```
$ git init
$ git add .
$ git commit -m "first commit"
$ hub create # GitHub上にリポジトリが作成される
$ git push origin master # 作ったリポジトリへpushできる!
```

[華麗にcreateを紹介するgif]

このようにhubコマンドはあまりにも便利な事がわかります。

さて、当然ですが、hubコマンドはリモートリポジトリがGitHubである場合にしか使えません。  
私は、家ではmac+GitHub.com、会社ではwindows+GitLab(社内ホスティング)という環境なので、GitLabでもhubコマンドが使いたくなります。  
[GitLab用のコマンド]()を作られている方がいらっしゃるので基本的にはありがたくこれを使わせていただくのですが、こちらは微妙にコマンド体系が異なります。個人的にはGitリポジトリサービスごとにツールが増えたり、使い方をいちいち覚えるのがあまり好みではありません。

# そこでhlb
hlbは様々なGitリポジトリに対応する(予定の)CLIツールで、特徴としては以下の通りです。

* (まずは)GitHub, GitLabをサポート
* マルチプラットフォーム対応
* hubライクなコマンド(既存ユーザの学習コストが低い)

## インストール
mac:

```
$ brew tap mpppk/mpppk
$ brew install hlb
```

バイナリ(for windows, linux, and others):

GitHub Release Pageからダウンロードしてください  
(windowsについては、いずれchoco installできるようにしたいです)

gopher:

`go get github.com/mpppk/hlb`

## 認証
hub同様、初回のコマンド実行時にユーザ名とパスワードを入力すると、設定ファイルにtokenが保存されます。  
ただし、現状GitLabについては手動でtokenを取得する必要があります。  
以下にGitLab.comでの手順を示します。

1. GitLabのPersonal Token Pageへアクセス
1. GitLabの画面上でのtoken発行手順の説明
1. `./hlb.yaml`のoauth_tokenに先ほどのtokenをペースト

## browseコマンド
* `hlb browse`で、カレントディレクトリをリモートリポジトリに登録されたサービス上で開きます
* `hlb browse issues`でissue一覧ページを開きます
* `hlb browse issues 1`で#1のissueページを開きます
* その他、`pull-requests/merge-requests`, `projects/boards`, `milestones`, `wiki`, `commits`などのサブコマンドに対応しています

## listコマンド
* browseコマンドで利用出来るサブコマンドに対応しています

## pecoを組み合わせた応用例
pecoとbrowseコマンドを組み合わせると、いい感じにページを開くことができます。

`$ hlb list issues | peco | awk | xargs hlb browse issues`

[いい感じにページを開くgif]

ちなみに、hlbを含めたgit関連操作をいい感じにやってくれるgicoというツールも作っているので、良ければ試してみてください。特にwindowsとmacを両方使う方だと、それぞれのaliasをいちいち書かなくていいのでオススメです。

# 開発状況
今のところ、コマンドはbrowseとcreate、リポジトリサービスはGitHubとGitLabに対応しています。  
コマンドについては、正直自分はhubでもほとんどこの2つしか使ってないので、よく使うコマンドなどあればissueかコメントで教えていただけると、実装の優先度がわかって嬉しいです。
リポジトリについても、自分はGitHubとGitLabしか使っていないので、よく使われているサービスがあれば教えてください。
