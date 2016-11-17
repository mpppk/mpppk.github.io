---
layout: post
title:  "巨大csvの整形に使える便利パッケージ:MCMD"
---

# 背景
* でかいcsvファイルの整形つらい
    * 適当なスクリプト言語で適当に書くと時間かかりすぎて死ぬのでできるだけ早いやつを使いたい
        * Rで13GBのファイルをfreadで読み込むと15分ぐらいかかる
    * Excelは100万行ちょっとを超えると読み込めなくなる

# MCMDとは
* csvデータの編集、抽出、統計量の算出などを行うコマンド群
* とにかく早い(らしい)

# 例

# インストール
* ここ見て

# コマンド一覧
* ここではcsv整形の用途に絞って紹介
* inputとoutputは全コマンド共通なので省略
    * inputはi=, outputはo=
    * inputはコマンドによって複数ファイル指定可能

用途 | コマンド | 参考
---- | ------- | ---
各行を複製(同じ行が連続) | `mduprec n=2` | [mduprec レコードの複写](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mduprec.html)
同一ファイルを複製して結合 | `mcat i=[file],[file],...` | [mcat 併合](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcat.html)
ヘッダを削除 | `sed -e '1d' [file]` | [指定行削除するコマンド(sed](http://takuya-1st.hatenablog.jp/entry/2014/08/07/012422)
ヘッダ付きのcsvを結合 | `mcat` | [mcat 併合](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcat.html)
指定した列を削除 | `mcut f=[col_name1], [col_name2] -r` | [mcut 項目の選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcut.html)
指定した列を抽出 | `mcut f=[col_name1], [col_name2]` | [mcut 項目の選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcut.html)
指定した範囲の日付データを抽出 | 日付をunixtimeにして`mselnum f=[col_name] c='[unixtime1,unixtime2]'` | [mselnum 数値範囲による行選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mselnum.html)
ヘッダを持たないcsvにヘッダを追加 | `mfldname -nfni n=[col_name1],[col_name2],...` | [mfldname 項目名の変更](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mfldname.html)
特定の列名を変更 | `$ mfldname f=[before_col_name]:[after_col_name],...` | [mfldname 項目名の変更](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mfldname.html)
指定した値の列を追加 | `msetstr v=[val] a=[new_col_name]` | [msetstr 文字列項目の追加](http://www.nysol.sakura.ne.jp/mcmd/jp/sect-msetstr.html)
指定した範囲の行を抽出 | `mbest -q from=[row_no] to=[row_no] ` | [mbest 指定行の選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mbest.html)
処理の途中状態をファイルに出力 | `mtee o=[file]` | [mtee 複数ファイルへのコピー](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mtee.html)
hoge | `` | []()