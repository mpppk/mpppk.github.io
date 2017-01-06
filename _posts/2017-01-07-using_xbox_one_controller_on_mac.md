---
layout: post
title:  "Xbox One コントローラをmac上のSteamで使う"
---

この件について調べると、様々なmac用Xbox Controller driverが生まれては死んでいった歴史を感じることができて趣深い。  
それはともかく、2017年1月現在においてXbox oneコントローラを繋ぐには(名前がブレまくっていてこれで正しいのかは分からないが)、[Xbox Controller Driver for macOS](https://github.com/360Controller/360Controller)を使うのが良い。  
DLは[GitHubのrelease page](https://github.com/360Controller/360Controller/releases)から。

ただし、installして有線でmacに繋いでも、driverからは認識されるがSteamのゲームからは見えない。
1. Advancedタブをクリック
1. Spoofing Preferencesの[Pretend to be an Xbox 360 Controller]にチェックを入れる

![xbox360controllers](/imgs/xboxone_controller_on_mac/xbox360controllers.png)

これでSteamからコントローラが認識されるようになり、[Stradew Valley](http://store.steampowered.com/app/413150/?l=japanese)に全ての可処分時間を捧げることができる。


