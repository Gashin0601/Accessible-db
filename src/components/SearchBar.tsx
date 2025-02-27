import { useState, useEffect, useRef } from 'react';
import { TextField, Autocomplete, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

interface SearchResult {
  id: number;
  title: string;
  category: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm) {
        setOptions([]);
        onSearch('');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        setOptions(response.data);
        onSearch(searchTerm);
      } catch (error) {
        console.error('検索候補の取得に失敗しました:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    // 検索のデバウンス処理
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(fetchSuggestions, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="search-highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <Box 
      role="search" 
      aria-label="情報検索"
      sx={{ width: '100%', position: 'relative' }}
    >
      <Autocomplete
        id="search-box"
        freeSolo
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        loading={loading}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.title
        }
        renderOption={(props, option) => (
          <li {...props}>
            <Box>
              <Typography component="div" variant="body1">
                {highlightMatch(option.title)}
              </Typography>
              <Typography component="div" variant="caption" color="text.secondary">
                カテゴリー: {option.category}
              </Typography>
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="検索"
            placeholder="キーワードを入力"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              'aria-label': '情報を検索',
              'aria-describedby': 'search-description',
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onInputChange={(_, newValue) => setSearchTerm(newValue)}
        onChange={(_, value) => {
          if (typeof value === 'string') {
            setSearchTerm(value);
          } else if (value) {
            setSearchTerm(value.title);
          }
        }}
        aria-label="検索オートコンプリート"
        aria-expanded={open}
        ListboxProps={{
          'aria-label': '検索結果一覧',
          role: 'listbox',
        }}
      />
      <div id="search-description" className="visually-hidden">
        検索キーワードを入力すると、候補が表示されます。
        上下矢印キーで候補を選択し、Enterキーで決定できます。
        Escキーで候補一覧を閉じることができます。
      </div>
    </Box>
  );
} 