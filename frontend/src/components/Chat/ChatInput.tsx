import React, { useState, useRef } from 'react';
import { Box, TextField, IconButton, alpha, useTheme, Tooltip, Popover, Typography } from '@mui/material';
import { Send, Smile, Paperclip, X, FileText, Image as ImageIcon } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

interface ChatInputProps {
    onSend: (message: string) => void;
    onTyping?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onTyping }) => {
    const theme = useTheme();
    const [text, setText] = useState('');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const typingTimeoutRef = useRef<any>(null);

    const handleSend = () => {
        if (text.trim() || selectedFile) {
            // In a real app, you'd upload the file first or send it as multipart
            onSend(text);
            setText('');
            setSelectedFile(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        if (onTyping) {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            onTyping();
            typingTimeoutRef.current = setTimeout(() => {}, 2000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setText(prev => prev + emoji);
        setAnchorEl(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
        // Reset input value so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <Box sx={{ 
            p: 2, 
            bgcolor: 'background.paper', 
            borderTop: '1px solid', 
            borderColor: alpha(theme.palette.divider, 0.05),
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
        }}>
            {/* File Preview */}
            {selectedFile && (
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    p: 1, 
                    px: 1.5,
                    borderRadius: '12px', 
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    alignSelf: 'flex-start',
                    mb: 0.5
                }}>
                    {selectedFile.type.startsWith('image/') ? <ImageIcon size={16} /> : <FileText size={16} />}
                    <Typography variant="caption" noWrap sx={{ fontWeight: 700, color: 'primary.main', maxWidth: 200 }}>
                        {selectedFile.name}
                    </Typography>
                    <IconButton size="small" onClick={() => setSelectedFile(null)} sx={{ p: 0.5 }}>
                        <X size={14} />
                    </IconButton>
                </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Attach file">
                        <IconButton 
                            size="small" 
                            sx={{ color: 'text.secondary' }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip size={20} />
                        </IconButton>
                    </Tooltip>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileSelect} 
                    />

                    <Tooltip title="Emojis">
                        <IconButton 
                            size="small" 
                            sx={{ color: 'text.secondary' }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <Smile size={20} />
                        </IconButton>
                    </Tooltip>
                    
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        PaperProps={{ 
                            sx: { 
                                borderRadius: '16px', 
                                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                mt: -1
                            } 
                        }}
                    >
                        <EmojiPicker onSelect={handleEmojiSelect} />
                    </Popover>
                </Box>

                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type your message..."
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            bgcolor: alpha(theme.palette.divider, 0.03),
                            border: 'none',
                            '& fieldset': { border: 'none' },
                            '&:hover': { bgcolor: alpha(theme.palette.divider, 0.05) },
                            '&.Mui-focused': { bgcolor: 'transparent', boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}` }
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '14px',
                            fontWeight: 500,
                            py: 1
                        }
                    }}
                />

                <IconButton 
                    onClick={handleSend}
                    disabled={!text.trim() && !selectedFile}
                    sx={{ 
                        bgcolor: theme.palette.primary.main, 
                        color: '#fff',
                        borderRadius: '12px',
                        width: 44,
                        height: 44,
                        '&:hover': { bgcolor: theme.palette.primary.dark },
                        '&.Mui-disabled': { bgcolor: alpha(theme.palette.divider, 0.1), color: 'text.disabled' }
                    }}
                >
                    <Send size={20} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatInput;
