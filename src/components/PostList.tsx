import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';

interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  created_at: string;
}

interface PostListProps {
  searchQuery: string;
}

export default function PostList({ searchQuery }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('取得したデータ:', data); // デバッグ用
      setPosts(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error('投稿の取得に失敗しました:', err);
      setError('投稿の読み込みに失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('PostListコンポーネントがマウントされました'); // デバッグ用
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower) ||
      post.author.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
        role="status"
        aria-label="投稿を読み込み中"
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          投稿を読み込んでいます...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ my: 2 }} 
        role="alert"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={fetchPosts}
          >
            再読み込み
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (!Array.isArray(filteredPosts) || filteredPosts.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }} role="status">
        {searchQuery ? '検索条件に一致する投稿が見つかりませんでした。' : 'まだ投稿がありません。新しい投稿を作成してください。'}
      </Alert>
    );
  }

  return (
    <Box
      role="feed"
      aria-label={searchQuery ? `「${searchQuery}」の検索結果` : '投稿一覧'}
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
      }}
    >
      {filteredPosts.map((post) => (
        <Card
          key={post.id}
          sx={{ height: '100%' }}
          component="article"
          aria-labelledby={`post-title-${post.id}`}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="h3"
              id={`post-title-${post.id}`}
              gutterBottom
            >
              {post.title}
            </Typography>
            
            <Chip
              label={post.category}
              size="small"
              sx={{ mb: 1 }}
              aria-label={`カテゴリー: ${post.category}`}
            />
            
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1,
              }}
            >
              {post.description}
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 'auto',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                投稿者: {post.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.created_at).toLocaleDateString('ja-JP')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 