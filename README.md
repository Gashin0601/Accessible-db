# アクセシブル情報データベース

視覚障害者（特に網膜色素変性症の方々）が利用しやすい情報データベースのデモサイトです。製品や便利な工夫の情報を投稿・検索できます。

## 主な機能

- 情報の投稿（製品、工夫、サービスなど）
- 投稿の検索（タイトル、説明文、カテゴリーで検索可能）
- アクセシビリティ設定
  - 文字サイズの変更
  - 高コントラストモード
  - キーボード操作の完全サポート
  - スクリーンリーダー対応

## アクセシビリティ対応

- WAI-ARIA 属性の適切な使用
- セマンティックな HTML5 構造
- キーボード操作のサポート
- スキップリンクの実装
- 高コントラストモードの提供
- 文字サイズの調整機能
- アニメーション制御（prefers-reduced-motion 対応）

## 技術スタック

- Next.js 14
- TypeScript
- Material-UI
- Vercel Postgres
- Vercel Edge Functions

## 開発環境のセットアップ

1. リポジトリのクローン:

   ```bash
   git clone https://github.com/yourusername/accessible-db.git
   cd accessible-db
   ```

2. 依存関係のインストール:

   ```bash
   npm install
   ```

3. 環境変数の設定:

   ```bash
   cp .env.example .env.local
   ```

   `.env.local`ファイルを編集し、必要な環境変数を設定してください。

4. データベースのセットアップ:

   ```bash
   npm run db:setup
   ```

5. 開発サーバーの起動:
   ```bash
   npm run dev
   ```

## デプロイ

このプロジェクトは Vercel にデプロイすることを想定しています：

1. Vercel アカウントを作成
2. Vercel CLI をインストール
3. プロジェクトをデプロイ:
   ```bash
   vercel
   ```

## 環境変数

- `POSTGRES_URL`: PostgreSQL データベースの URL
- `POSTGRES_PRISMA_URL`: Prisma 用のデータベース URL
- `POSTGRES_URL_NON_POOLING`: プーリングなしのデータベース URL
- `POSTGRES_USER`: データベースユーザー名
- `POSTGRES_HOST`: データベースホスト
- `POSTGRES_PASSWORD`: データベースパスワード
- `POSTGRES_DATABASE`: データベース名

## ライセンス

MIT

## コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 作者

あなたの名前 - [@yourusername](https://twitter.com/yourusername)

プロジェクトへのリンク: [https://github.com/yourusername/accessible-db](https://github.com/yourusername/accessible-db)
