import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
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
          404 - ページが見つかりません
        </Typography>
        <Typography>
          お探しのページは存在しないか、移動した可能性があります。
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          aria-label="トップページに戻る"
        >
          トップページに戻る
        </Button>
      </Box>
    </Container>
  );
} 