-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_posts_title ON posts USING gin(to_tsvector('japanese', title));
CREATE INDEX IF NOT EXISTS idx_posts_description ON posts USING gin(to_tsvector('japanese', description));
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Insert sample data
INSERT INTO posts (title, description, category, author) VALUES
('拡大読書器の使用体験', '手元の文字や写真を大きく表示できる拡大読書器を使用してみました。コントラストや明るさの調整が簡単で、長時間の読書も快適です。', '製品', '田中太郎'),
('スマートフォンの音声案内設定', 'iPhoneのVoiceOverとAndroidのTalkBackの設定方法と使い方の違いについて解説します。', '工夫', '鈴木花子'),
('音声図書館サービスの活用法', '全国の図書館で利用できる音声図書サービスの登録方法と使い方について紹介します。', 'サービス', '佐藤次郎')
ON CONFLICT DO NOTHING; 