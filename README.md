# First step

- rootへリクエスト
- 認可画面へリダイレクト
  - この時client_idとredirect_uriを持っている必要があるはず
- 認可
  - アプリ側に登録してあるcall back URLにリクエスト
- teplate appのホームへ帰ってくる

# Second step
- /users/meへリクエスト
  - 名前とIDを取得し画面へ表示
- /companiesへリクエスト
  - 一覧取得し、先頭のものを画面に表示
- /account_itemsへリクエスト
  - 一覧取得し、先頭のものを画面に表示
- 取引登録ボタン用意
  - クリックされたら/dealsへ勘定科目IDと金額をもってPOST

# Third step
- ログインしていたら認可をスキップ
- ログアウトを実装

# こまりごと
- redirect uriどこに設定したらいいんだろう
- client_id, secret, redirect_uriの設定どうやるか
