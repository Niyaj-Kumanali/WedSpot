import React from 'react';
import { Box, Typography, alpha, useTheme, Grid, IconButton } from '@mui/material';

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
}

const EMOJI_LIST = [
    { category: 'Smileys', icons: ['😀', '😃', '😄', '😁', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛'] },
    { category: 'Hands', icons: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍'] },
    { category: 'Wedding', icons: ['💍', '💎', '👰', '🤵', '💐', '💒', '🏩', '🌹', '❤️', '💖', '✨', '🥂', '🍰', '🎊', '🎉', '🎁', '🎈', '💌', '📅', '⛪'] },
    { category: 'Objects', icons: ['📷', '🎥', '📞', '💻', '💡', '🔔', '🎵', '🚗', '✈️', '⛵', '🏠', '🔑', '🏷️', '💰', '💳', '📧', '📂', '📍', '📌', '📎'] }
];

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
    const theme = useTheme();

    return (
        <Box sx={{ 
            width: 320, 
            maxHeight: 400, 
            overflowY: 'auto', 
            p: 1,
            bgcolor: 'background.paper',
            borderRadius: '16px',
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-thumb': { bgcolor: alpha(theme.palette.divider, 0.2), borderRadius: 10 }
        }}>
            {EMOJI_LIST.map((group) => (
                <Box key={group.category} sx={{ mb: 2 }}>
                    <Typography 
                        variant="overline" 
                        sx={{ 
                            px: 1, 
                            fontWeight: 800, 
                            color: 'text.disabled', 
                            fontSize: '10px',
                            letterSpacing: '0.1em'
                        }}
                    >
                        {group.category}
                    </Typography>
                    <Grid container spacing={0.5}>
                        {group.icons.map((emoji, idx) => (
                            <Grid item key={idx}>
                                <IconButton 
                                    onClick={() => onSelect(emoji)}
                                    sx={{ 
                                        width: 36, 
                                        height: 36, 
                                        fontSize: '20px',
                                        borderRadius: '8px',
                                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
                                    }}
                                >
                                    {emoji}
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default EmojiPicker;
