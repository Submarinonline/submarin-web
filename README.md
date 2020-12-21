# Submarin-web
[Submarin Web](https://submarin.online) 
***version 10***
# License
[MIT License](https://opensource.org/licenses/MIT)
# 使い方
1) このリポジトリをクローン
2) debug>```ionic serve```
3) build>```ionic cordova build [android,ios,browser]```
4) build(本番用)>```ionic cordova build [android,ios,browser] --prod```
# hidefile.json
ダウンロード後、動作させるには/srcにhidefile.jsonを作成する必要があります。下のJSONを参考に作成してください。
```
{
    "pnp": "(pubnubのpubキー)",
    "pns": "(pubnubのsubキー)",
    "reload": "（トークに接続中の全ユーザーをリロードさせる文字列を設定する）",
    "ipinfo":"（https://ipinfo.io/のAPIキーURL）",
    "log":"（入退室表示用文字列を設定）",
    "youtube":"(APIキー)",
    "GIPHY":"(APIキー)",
    "Version":"（バージョン、アクセス時にfirebaseと照合して更新確認をする）"
}
```

# 実装状況
 - [x] オープンチャット
 - [x] GIF(GIPHY)
 - [x] 画像送信
 - [x] シームレスな画像送信 
 - [x] GIF lazyLoading 
 - [x] グループ
 - [x] Firefox/safari向けデザイン調整
 - [ ] グループ検索
 - [x] プロフィールのリアルタイムプレビュー
 - [ ] グループ削除
 - [ ] サイトタイトル（検索エンジン向け）
 - [ ] OGP
 - [ ] グループアイコンの設定
 - [x] アプリからログイン
 - [x] アプリ向け最適化
 - [x] Ctrl + Enterで送信
 - [ ] Twitterでログイン
 - [ ] 動画対応
 - [ ] 怪レい日本語
 - [x] Youtube埋め込み
 - [ ] リンク表示/OGP対応
 - [x] バージョン変数
 - [x] キーを別ファイルに保存
 - [x] アプデ確認
 - [ ] メンション
 - [ ] push通知
 - [x] 通知音
