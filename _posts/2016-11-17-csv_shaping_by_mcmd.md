---
layout: post
title:  "巨大csvの整形に使える便利パッケージ: MCMD"
---

[qiita版](http://qiita.com/mpppk/items/80cf6478b59a2dd543a9)

# 大規模データの編集つらすぎ問題
最近仕事で10GB以上のcsvファイルを触っています。  
唯一神Excelは100万行を超えるデータは扱えないため、スクリプト言語で適当なコードを書いてましたが、適当に書いたのでちょっとしたデータ整形をするだけでも死ぬほど時間がかかって辛いです。  
処理の一部をsedやawkで置き換えて高速化を図るなど、涙ぐましい努力をしていましたが、MCMDという神ツールの存在を知って膝から崩れ落ちたので共有します。

# MCMDとは
csvデータの編集、抽出、統計量の算出などを行うコマンド群(70種類ぐらいある)です。  
標準入力を受け取って標準出力に結果を表示するので、簡単にパイプで処理を繋げることができます。  
さらにC++で書かれているため、とにかく早い(らしい)です。

# インストール
[公式ページのインストール手順](http://www.nysol.jp/install)を参照してください。  
macなら.dmgを落としてきて実行するだけです。  
windows版はないので、VirtualBox経由で使うのがオフィシャルな方法です。  
最近ならwin10のbash on windowsという手もありますね！

# 使用例
data.csvの5行目から10行目までの日付(date)列をoutput.txtへ出力

```
mcut f=date < data.csv | mbest -q from=5 to=10 > output.txt
```

入力と出力はそれぞれi,oオプションで指定することもできます。
```
mcut f=date i=data.csv | mbest -q from=5 to=10 o=output.txt
```

すごい！！便利！！！！

# 逆引きMCMD
よく使いそうなユースケースをまとめてみました。  
MCMDは統計量の算出なども含めて様々なコマンドを持っていますが、ここではcsv整形の用途に絞って紹介します。  
input/outputオプションは全コマンド共通のため省略するので注意してください。

用途 | コマンド | 参考
---- | ------- | ---
各行を複製(同じ行が連続) | `mduprec n=2` | [mduprec レコードの複写](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mduprec.html)
同一ファイルを複製して結合 | `mcat i=[file],[file],...` | [mcat 併合](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcat.html)
ヘッダを削除 | `sed -e '1d' [file]` | [指定行削除するコマンド(sed](http://takuya-1st.hatenablog.jp/entry/2014/08/07/012422)
ヘッダ付きのcsvを結合 | `mcat` | [mcat 併合](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcat.html)
指定した列を削除 | `mcut f=[col_name1], [col_name2] -r` | [mcut 項目の選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcut.html)
指定した列を抽出 | `mcut f=[col_name1], [col_name2]` | [mcut 項目の選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mcut.html)
ヘッダを持たないcsvにヘッダを追加 | `mfldname -nfni n=[col_name1],[col_name2],...` | [mfldname 項目名の変更](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mfldname.html)
特定の列名を変更 | `$ mfldname f=[before_col_name]:[after_col_name],...` | [mfldname 項目名の変更](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mfldname.html)
指定した値の列を追加 | `msetstr v=[val] a=[new_col_name]` | [msetstr 文字列項目の追加](http://www.nysol.sakura.ne.jp/mcmd/jp/sect-msetstr.html)
指定した範囲の行を抽出 | `mbest -q from=[row_no] to=[row_no] ` | [mbest 指定行の選択](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mbest.html)
処理の途中状態をファイルに出力 | `mtee o=[file]` | [mtee 複数ファイルへのコピー](http://www.nysol.sakura.ne.jp/mcmd2/jp/sect-mtee.html)

---
他にも便利な使い方を発見したら随時追加していきます！