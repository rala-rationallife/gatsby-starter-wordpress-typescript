<h1 align="center">
  Gatsby Starter WordPress with Typescript
</h1>

Typescript で作った 「Gatsby x WordPress」 スターターです。

## Gatsby の開発環境を構築するには

以下の記事にて解説しております。
https://ralacode.com/blog/post/build-gatsbyjs-environment/

## Gatsby と WordPress を連携するには

WordPress 側で以下のプラグインが必要です。<br>
・WP Gatsby<br>
・WP GraphQL

以下の記事にて詳しく解説しております。
https://ralacode.com/blog/post/wordpress-gatsbyjs/

## 環境変数を定義する

プロジェクトのルートディレクトリに「.env」という名前のファイルを作ってください。

WordPress サイトの URL に「/graphql」を付け加えます。<br>
これを環境変数としましょう。

```shell
GATSBY_WORDPRESS_BASE_URL=https://(WordPressサイトのドメイン)/graphql
```

例として、「.env.example」というファイルもあらかじめ作っております。<br>
よければ参考にされてください。

これにより、Gatsby と WordPress を連携できます。

## パッケージをインストール

ターミナルで以下のコマンドを実行してください。

```shell
$ npm install
```

または

```shell
$ yarn install
```

これにより、package.json に記載されたパッケージがインストールされます。

そして、以下のコマンドを実行です。

```shell
$ gatsby develop
```

これで、Gatsby の開発サーバーが起動します。
ブラウザで「localhost:8000」にアクセスすると、開発環境で Gatsby サイトが表示されます。
