import { NextResponse } from 'next/server';

const mockPosts = [
  {
    id: 1,
    title: '拡大読書器の使用体験',
    description: '手元の文字や写真を大きく表示できる拡大読書器を使用してみました。コントラストや明るさの調整が簡単で、長時間の読書も快適です。',
    category: '製品',
    author: '田中太郎',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'スマートフォンの音声案内設定',
    description: 'iPhoneのVoiceOverとAndroidのTalkBackの設定方法と使い方の違いについて解説します。',
    category: '工夫',
    author: '鈴木花子',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: '音声図書館サービスの活用法',
    description: '全国の図書館で利用できる音声図書サービスの登録方法と使い方について紹介します。',
    category: 'サービス',
    author: '佐藤次郎',
    created_at: new Date().toISOString()
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const searchResults = mockPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

    return NextResponse.json(searchResults.map(post => ({
      id: post.id,
      title: post.title,
      category: post.category
    })));
  } catch (error) {
    console.error('検索に失敗しました:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 