import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Fab, alpha, useTheme } from '@mui/material';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CallOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    callerName: string;
    callerAvatar?: string;
    isVideo?: boolean;
}

const CallOverlay: React.FC<CallOverlayProps> = ({ isOpen, onClose, callerName, callerAvatar, isVideo = false }) => {
    const theme = useTheme();
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [callTime, setCallTime] = useState(0);

    useEffect(() => {
        let timer: any;
        if (isOpen) {
            timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
        } else {
            setCallTime(0);
        }
        return () => clearInterval(timer);
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isVideo 
                            ? `linear-gradient(135deg, ${alpha('#000', 0.9)} 0%, ${alpha('#111', 0.95)} 100%)`
                            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Ambient Pulsing Rings */}
                    <Box sx={{ position: 'relative' }}>
                        {[1, 2, 3].map((ring) => (
                            <motion.div
                                key={ring}
                                animate={{
                                    scale: [1, 2],
                                    opacity: [0.3, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: ring * 1,
                                    ease: 'easeOut'
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: 160,
                                    height: 160,
                                    marginLeft: -80,
                                    marginTop: -80,
                                    borderRadius: '50%',
                                    border: `1px solid ${alpha('#fff', 0.4)}`,
                                    pointerEvents: 'none'
                                }}
                            />
                        ))}
                        <Avatar 
                            src={callerAvatar} 
                            sx={{ 
                                width: 140, 
                                height: 140, 
                                border: '4px solid #fff',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                fontSize: '3rem',
                                fontWeight: 900,
                                bgcolor: 'primary.main',
                                color: '#fff'
                            }}
                        >
                            {callerName[0]}
                        </Avatar>
                    </Box>

                    <Box sx={{ mt: 4, textAlign: 'center', color: '#fff' }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>{callerName}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, opacity: 0.8, letterSpacing: '0.1em' }}>
                            {callTime > 0 ? formatTime(callTime) : (isVideo ? 'STARTING VIDEO CALL...' : 'CALLING...')}
                        </Typography>
                    </Box>

                    {/* Action Bar */}
                    <Box sx={{ 
                        position: 'absolute', 
                        bottom: 60, 
                        display: 'flex', 
                        gap: 3, 
                        alignItems: 'center' 
                    }}>
                        <Fab 
                            size="medium" 
                            onClick={() => setIsMuted(!isMuted)}
                            sx={{ 
                                bgcolor: isMuted ? alpha('#fff', 0.2) : alpha('#fff', 0.1),
                                color: '#fff',
                                backdropFilter: 'blur(10px)',
                                '&:hover': { bgcolor: alpha('#fff', 0.25) }
                            }}
                        >
                            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                        </Fab>

                        {isVideo && (
                            <Fab 
                                size="medium" 
                                onClick={() => setIsCameraOff(!isCameraOff)}
                                sx={{ 
                                    bgcolor: isCameraOff ? alpha('#fff', 0.2) : alpha('#fff', 0.1),
                                    color: '#fff',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': { bgcolor: alpha('#fff', 0.25) }
                                }}
                            >
                                {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
                            </Fab>
                        )}

                        <Fab 
                            size="large" 
                            onClick={onClose}
                            sx={{ 
                                bgcolor: 'error.main', 
                                color: '#fff', 
                                width: 72, 
                                height: 72,
                                '&:hover': { bgcolor: 'error.dark' }
                            }}
                        >
                            <PhoneOff size={32} />
                        </Fab>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CallOverlay;
