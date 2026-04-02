import React from 'react';
import { Box, Typography, Avatar, IconButton, Badge, alpha, useTheme, Tooltip, InputBase } from '@mui/material';
import { Phone, Video, Info, Search, X, ChevronLeft } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHeaderProps {
    onCall: () => void;
    onVideo: () => void;
    onInfo: () => void;
    onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onCall, onVideo, onInfo, onBack }) => {
    const theme = useTheme();
    const { conversations, activeConversationId } = useChatStore();
    const [isSearching, setIsSearching] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const activeConv = conversations.find((c: any) => c.id === activeConversationId) || {
        name: 'Support Team',
        isOnline: true,
        avatar: ''
    };

    return (
        <Box sx={{ 
            p: { xs: 1, sm: 2 }, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.05),
            zIndex: 1,
            position: 'relative',
            height: '72px',
            overflow: 'hidden'
        }}>
            <AnimatePresence mode="wait">
                {!isSearching ? (
                    <Box 
                        key="info"
                        component={motion.div}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                    >
                        {onBack && (
                            <IconButton 
                                onClick={onBack} 
                                size="small"
                                sx={{ display: { xs: 'flex', md: 'none' }, mr: 0.5, color: 'text.secondary' }}
                            >
                                <ChevronLeft size={20} />
                            </IconButton>
                        )}
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color={activeConv.isOnline ? "success" : "default"}
                            sx={{ '& .MuiBadge-badge': { width: 12, height: 12, borderRadius: '50%', border: '2px solid white' } }}
                        >
                            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', fontWeight: 700, width: 40, height: 40 }}>
                                {activeConv.name[0]}
                            </Avatar>
                        </Badge>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 800, lineHeight: 1.2, color: 'text.primary', maxWidth: { xs: '120px', sm: '200px', md: '300px' } }}>
                                {activeConv.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: activeConv.isOnline ? 'success.main' : 'text.disabled', fontWeight: 700, fontSize: '11px' }}>
                                {activeConv.isOnline ? 'Online now' : 'Last seen Monday'}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Box 
                        key="search"
                        component={motion.div}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            bgcolor: alpha(theme.palette.divider, 0.03),
                            borderRadius: '12px',
                            px: 1.5,
                            mr: 2,
                            flex: 1
                        }}
                    >
                        <Search size={18} color={theme.palette.text.disabled} />
                        <InputBase 
                            autoFocus
                            placeholder="Search in conversation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ ml: 1, flex: 1, fontSize: '14px', fontWeight: 500 }}
                        />
                        <IconButton size="small" onClick={() => { setIsSearching(false); setSearchQuery(''); }}>
                            <X size={16} />
                        </IconButton>
                    </Box>
                )}
            </AnimatePresence>

            <Box sx={{ display: 'flex', gap: { xs: 0, sm: 0.5 }, flexShrink: 0 }}>
                {!isSearching && (
                    <>
                        <Tooltip title="Audio Call">
                            <IconButton onClick={onCall} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) } }}>
                                <Phone size={18} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Video Call">
                            <IconButton onClick={onVideo} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) } }}>
                                <Video size={18} />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
                <Tooltip title="Search Messages">
                    <IconButton onClick={() => setIsSearching(!isSearching)} size="small" sx={{ color: isSearching ? 'primary.main' : 'inherit' }}>
                        <Search size={18} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Conversation Details">
                    <IconButton onClick={onInfo} size="small"><Info size={18} /></IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default ChatHeader;
