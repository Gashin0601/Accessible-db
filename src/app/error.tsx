'use client';

import { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <Typography variant="h1" component="h1">
          エラーが発生しました
        </Typography>
        <Typography>
          申し訳ありません。予期せぬエラーが発生しました。
        </Typography>
        <Button
          variant="contained"
          onClick={reset}
          aria-label="ページを再読み込みする"
        >
          もう一度試す
        </Button>
      </Box>
    </Container>
  );
} 