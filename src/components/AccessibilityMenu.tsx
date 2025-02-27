import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  Modal,
  Paper,
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ContrastIcon from '@mui/icons-material/Contrast';
import KeyboardIcon from '@mui/icons-material/Keyboard';

interface AccessibilityMenuProps {
  fontSize: string;
  setFontSize: (size: string) => void;
  contrast: string;
  setContrast: (contrast: string) => void;
}

export default function AccessibilityMenu({
  fontSize,
  setFontSize,
  contrast,
  setContrast,
}: AccessibilityMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleKeyboardShortcuts = () => {
    setShowKeyboardShortcuts(!showKeyboardShortcuts);
  };

  // キーボードショートカットの設定
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Altキーとの組み合わせ
      if (event.altKey) {
        switch (event.key) {
          case '1':
            setFontSize('medium');
            break;
          case '2':
            setFontSize('large');
            break;
          case 'c':
            setContrast(contrast === 'normal' ? 'high' : 'normal');
            break;
          case 'k':
            toggleKeyboardShortcuts();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [contrast, setContrast, setFontSize]);

  return (
    <Box role="group" aria-label="アクセシビリティ設定">
      <Tooltip title="アクセシビリティメニューを開く">
        <IconButton
          onClick={handleClick}
          aria-controls="accessibility-menu"
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          aria-label="アクセシビリティ設定を開く"
        >
          <AccessibilityNewIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="accessibility-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-label': 'アクセシビリティ設定メニュー',
        }}
      >
        <MenuItem disableRipple>
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>文字サイズ設定</Typography>
            <ButtonGroup aria-label="文字サイズ設定" size="small" sx={{ width: '100%' }}>
              <Button
                onClick={() => setFontSize('medium')}
                variant={fontSize === 'medium' ? 'contained' : 'outlined'}
                aria-pressed={fontSize === 'medium'}
                aria-label="標準文字サイズ"
                startIcon={<FormatSizeIcon />}
              >
                標準 (Alt+1)
              </Button>
              <Button
                onClick={() => setFontSize('large')}
                variant={fontSize === 'large' ? 'contained' : 'outlined'}
                aria-pressed={fontSize === 'large'}
                aria-label="大きい文字サイズ"
                startIcon={<FormatSizeIcon sx={{ transform: 'scale(1.2)' }} />}
              >
                大きい (Alt+2)
              </Button>
            </ButtonGroup>
          </Box>
        </MenuItem>

        <MenuItem disableRipple>
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>コントラスト設定</Typography>
            <ButtonGroup aria-label="コントラスト設定" size="small" sx={{ width: '100%' }}>
              <Button
                onClick={() => setContrast('normal')}
                variant={contrast === 'normal' ? 'contained' : 'outlined'}
                aria-pressed={contrast === 'normal'}
                aria-label="標準コントラスト"
                startIcon={<ContrastIcon />}
              >
                標準
              </Button>
              <Button
                onClick={() => setContrast('high')}
                variant={contrast === 'high' ? 'contained' : 'outlined'}
                aria-pressed={contrast === 'high'}
                aria-label="高コントラスト"
                startIcon={<ContrastIcon sx={{ transform: 'rotate(180deg)' }} />}
              >
                高コントラスト (Alt+C)
              </Button>
            </ButtonGroup>
          </Box>
        </MenuItem>

        <MenuItem disableRipple>
          <Box sx={{ width: '100%' }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toggleKeyboardShortcuts();
                handleClose();
              }}
              variant="text"
              startIcon={<KeyboardIcon />}
              fullWidth
              aria-expanded={showKeyboardShortcuts}
              aria-controls="keyboard-shortcuts-panel"
            >
              キーボードショートカット (Alt+K)
            </Button>
          </Box>
        </MenuItem>
      </Menu>

      {showKeyboardShortcuts && (
        <Modal
          open={showKeyboardShortcuts}
          onClose={toggleKeyboardShortcuts}
          aria-labelledby="keyboard-shortcuts-title"
        >
          <Paper
            elevation={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
              maxHeight: '90vh',
              overflow: 'auto',
              p: 4,
              outline: 'none',
              borderRadius: 2,
            }}
            className={contrast === 'high' ? 'high-contrast' : ''}
          >
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              id="keyboard-shortcuts-title"
              className={fontSize === 'large' ? 'large-text' : ''}
              sx={{ mb: 3 }}
            >
              キーボードショートカット一覧
            </Typography>
            <Box
              component="dl"
              sx={{
                mt: 2,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
                gap: { xs: 1, sm: 2 },
                '& dt': {
                  fontWeight: 'bold',
                  mb: { xs: 0.5, sm: 2 },
                },
                '& dd': {
                  margin: 0,
                  mb: { xs: 2, sm: 2 },
                },
              }}
              className={fontSize === 'large' ? 'large-text' : ''}
            >
              <dt>Alt + 1</dt>
              <dd>標準文字サイズに設定</dd>
              <dt>Alt + 2</dt>
              <dd>大きい文字サイズに設定</dd>
              <dt>Alt + C</dt>
              <dd>コントラストモードの切り替え</dd>
              <dt>Alt + K</dt>
              <dd>このショートカット一覧の表示/非表示</dd>
              <dt>Tab</dt>
              <dd>次の要素にフォーカスを移動</dd>
              <dt>Shift + Tab</dt>
              <dd>前の要素にフォーカスを移動</dd>
              <dt>Enter</dt>
              <dd>選択した要素を実行</dd>
              <dt>Esc</dt>
              <dd>メニューやダイアログを閉じる</dd>
            </Box>
            <Box sx={{ mt: 3, textAlign: 'right' }}>
              <Button
                onClick={toggleKeyboardShortcuts}
                variant="contained"
                size={fontSize === 'large' ? 'large' : 'medium'}
              >
                閉じる
              </Button>
            </Box>
          </Paper>
        </Modal>
      )}
    </Box>
  );
} 