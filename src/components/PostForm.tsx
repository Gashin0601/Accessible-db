import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

interface FormData {
  title: string;
  description: string;
  category: string;
  author: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function PostForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    author: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // エラーがあれば消去
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // 成功メッセージをクリア
    if (submitStatus === 'success') {
      setSubmitStatus('idle');
    }
  };

  const handleCategoryChange = (e: any) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: '' }));
    }
    if (submitStatus === 'success') {
      setSubmitStatus('idle');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    } else if (formData.title.length > 100) {
      newErrors.title = 'タイトルは100文字以内で入力してください';
    }

    if (!formData.description.trim()) {
      newErrors.description = '説明は必須です';
    } else if (formData.description.length > 1000) {
      newErrors.description = '説明は1000文字以内で入力してください';
    }

    if (!formData.category) {
      newErrors.category = 'カテゴリーは必須です';
    }

    if (!formData.author.trim()) {
      newErrors.author = '投稿者名は必須です';
    } else if (formData.author.length > 50) {
      newErrors.author = '投稿者名は50文字以内で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitStatus('success');
      setFormData({
        title: '',
        description: '',
        category: '',
        author: '',
      });

      // 投稿リストを更新するためにページをリロード
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setSubmitStatus('error');
      console.error('投稿の送信に失敗しました:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 2 }}
      role="form"
      aria-label="新規投稿フォーム"
    >
      {submitStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }} role="alert">
          投稿が完了しました。ページを更新しています...
        </Alert>
      )}
      
      {submitStatus === 'error' && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }} 
          role="alert"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setSubmitStatus('idle')}
            >
              閉じる
            </Button>
          }
        >
          投稿に失敗しました。もう一度お試しください。
        </Alert>
      )}

      <TextField
        fullWidth
        required
        id="title"
        name="title"
        label="タイトル"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        aria-describedby={errors.title ? 'title-error' : undefined}
        disabled={submitStatus === 'submitting'}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        required
        multiline
        rows={4}
        id="description"
        name="description"
        label="説明"
        value={formData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        aria-describedby={errors.description ? 'description-error' : undefined}
        disabled={submitStatus === 'submitting'}
        sx={{ mb: 2 }}
      />

      <FormControl 
        fullWidth 
        required 
        error={!!errors.category} 
        sx={{ mb: 2 }}
        disabled={submitStatus === 'submitting'}
      >
        <InputLabel id="category-label">カテゴリー</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          label="カテゴリー"
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <MenuItem value="製品">製品</MenuItem>
          <MenuItem value="工夫">工夫</MenuItem>
          <MenuItem value="サービス">サービス</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
        {errors.category && (
          <FormHelperText id="category-error">{errors.category}</FormHelperText>
        )}
      </FormControl>

      <TextField
        fullWidth
        required
        id="author"
        name="author"
        label="投稿者名"
        value={formData.author}
        onChange={handleChange}
        error={!!errors.author}
        helperText={errors.author}
        aria-describedby={errors.author ? 'author-error' : undefined}
        disabled={submitStatus === 'submitting'}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={submitStatus === 'submitting'}
        aria-label="投稿を送信"
        sx={{
          position: 'relative',
          '&.Mui-disabled': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        {submitStatus === 'submitting' ? (
          <>
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                left: '50%',
                marginLeft: '-12px',
              }}
            />
            送信中...
          </>
        ) : (
          '投稿する'
        )}
      </Button>
    </Box>
  );
} 