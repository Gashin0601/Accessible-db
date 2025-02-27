'use client';

import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import AccessibilityMenu from '@/components/AccessibilityMenu';

export default function Home() {
  const [fontSize, setFontSize] = useState('medium');
  const [contrast, setContrast] = useState('normal');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`${contrast === 'high' ? 'high-contrast' : ''}`}>
      {/* スキップリンク - キーボードユーザーのためのアクセシビリティ機能 */}
      <a
        href="#main-content"
        className="skip-link"
      >
        メインコンテンツへスキップ
      </a>

      <header role="banner">
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
            <Typography variant="h1" component="h1" fontSize={fontSize === 'large' ? '2.5rem' : '2rem'}>
              アクセシブル情報データベース
            </Typography>
            <AccessibilityMenu
              fontSize={fontSize}
              setFontSize={setFontSize}
              contrast={contrast}
              setContrast={setContrast}
            />
          </Box>
        </Container>
      </header>

      <main id="main-content" role="main">
        <Container>
          <Box my={4}>
            <SearchBar onSearch={setSearchQuery} />
          </Box>

          <Box my={4}>
            <Typography variant="h2" component="h2" fontSize={fontSize === 'large' ? '2rem' : '1.5rem'}>
              新規投稿
            </Typography>
            <PostForm />
          </Box>

          <Box my={4}>
            <Typography variant="h2" component="h2" fontSize={fontSize === 'large' ? '2rem' : '1.5rem'}>
              投稿一覧
            </Typography>
            <PostList searchQuery={searchQuery} />
          </Box>
        </Container>
      </main>

      <footer role="contentinfo">
        <Container>
          <Box py={4} textAlign="center">
            <Typography variant="body2">
              © 2024 アクセシブル情報データベース All rights reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
    </div>
  );
} 