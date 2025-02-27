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
  },
  {
    id: 4,
    title: '点字ディスプレイの選び方',
    description: 'パソコンやスマートフォンと接続できる点字ディスプレイの特徴と選び方について、実際の使用経験を交えて解説します。',
    category: '製品',
    author: '山田明子',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    title: '音声認識アプリの比較レビュー',
    description: '様々な音声認識アプリを実際に使用して、精度や使いやすさを比較しました。日常生活での活用シーンも紹介します。',
    category: 'アプリ',
    author: '高橋健一',
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    title: '視覚障害者向けスポーツ施設',
    description: '全国のサウンドテーブルテニスやブラインドサッカーが楽しめる施設の情報をまとめました。',
    category: 'スポーツ',
    author: '中村和子',
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    title: 'スクリーンリーダー対応のWebサイト制作',
    description: 'アクセシブルなWebサイトを作るためのポイントと、実際のコーディング例を紹介します。',
    category: '技術',
    author: '小林正人',
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    title: '便利な生活支援アプリ10選',
    description: '日常生活で役立つスマートフォンアプリを10個厳選して紹介。それぞれの特徴と使い方を解説します。',
    category: 'アプリ',
    author: '渡辺美咲',
    created_at: new Date().toISOString()
  },
  {
    id: 9,
    title: '視覚障害者向け料理教室の体験',
    description: '音声や触覚を活用した料理教室に参加してきました。安全な調理方法や便利な道具について学んだことを共有します。',
    category: '体験',
    author: '木村良子',
    created_at: new Date().toISOString()
  },
  {
    id: 10,
    title: '音声ガイド付き映画情報',
    description: '音声ガイド付き上映や音声解説付きDVDの最新情報をまとめています。',
    category: 'エンタメ',
    author: '斎藤雄二',
    created_at: new Date().toISOString()
  },
  {
    id: 11,
    title: 'OCRアプリの活用術',
    description: '文字認識アプリを使って紙の文書を読み上げる方法や、より正確に認識させるためのコツを紹介します。',
    category: 'アプリ',
    author: '松本さやか',
    created_at: new Date().toISOString()
  },
  {
    id: 12,
    title: '視覚障害者向け旅行プラン',
    description: 'バリアフリー対応の観光地や宿泊施設、移動手段について、実際の旅行経験を基に情報をまとめました。',
    category: '旅行',
    author: '井上康平',
    created_at: new Date().toISOString()
  },
  {
    id: 13,
    title: '便利な音声時計の比較',
    description: '様々な音声時計を実際に使用して、機能や使いやすさを比較。選び方のポイントも解説します。',
    category: '製品',
    author: '加藤理恵',
    created_at: new Date().toISOString()
  },
  {
    id: 14,
    title: '点字学習アプリの紹介',
    description: '点字を効率的に学べるアプリを紹介。初心者から上級者まで、レベルに合わせた学習方法を解説します。',
    category: 'アプリ',
    author: '山本大輔',
    created_at: new Date().toISOString()
  },
  {
    id: 15,
    title: '視覚障害者向けパソコン講座',
    description: 'スクリーンリーダーを使ったパソコン操作の基本から応用まで、ステップバイステップで解説します。',
    category: '講座',
    author: '野田智子',
    created_at: new Date().toISOString()
  },
  {
    id: 16,
    title: '音声書籍サービスの比較',
    description: '主要な音声書籍サービスの特徴、料金プラン、対応端末などを比較。おすすめの活用方法も紹介します。',
    category: 'サービス',
    author: '石田健太',
    created_at: new Date().toISOString()
  },
  {
    id: 17,
    title: '視覚障害者のためのファッション術',
    description: '色や柄の組み合わせ方、洋服の整理方法など、おしゃれを楽しむためのテクニックを紹介します。',
    category: '生活',
    author: '藤田美穂',
    created_at: new Date().toISOString()
  },
  {
    id: 18,
    title: '便利な音声メモアプリ',
    description: '音声でメモを取り、管理できるアプリの使い方と活用例を紹介。仕事や学習での活用方法も解説します。',
    category: 'アプリ',
    author: '岡田隆史',
    created_at: new Date().toISOString()
  },
  {
    id: 19,
    title: '視覚障害者向け防災グッズ',
    description: '災害時に役立つ音声対応の防災グッズや、避難時の注意点についてまとめました。',
    category: '防災',
    author: '中島裕子',
    created_at: new Date().toISOString()
  },
  {
    id: 20,
    title: '音声ナビゲーションアプリの活用',
    description: '外出時に便利な音声ナビゲーションアプリの設定方法と、実際の使用体験について共有します。',
    category: 'アプリ',
    author: '西村拓也',
    created_at: new Date().toISOString()
  }
];

export async function GET() {
  try {
    console.log('GET /api/posts が呼び出されました'); // デバッグ用
    return NextResponse.json(mockPosts, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('投稿の取得中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, author } = body;

    if (!title || !description || !category || !author) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    const newPost = {
      id: mockPosts.length + 1,
      title,
      description,
      category,
      author,
      created_at: new Date().toISOString()
    };

    mockPosts.push(newPost);
    console.log('新しい投稿が作成されました:', newPost); // デバッグ用

    return NextResponse.json(newPost, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('投稿の作成に失敗しました:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 