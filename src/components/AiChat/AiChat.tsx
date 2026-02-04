import { useState, type JSX } from 'react';
import api from '../../api/axios';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const AiChat = (): JSX.Element => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const send = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    try {
      const res = await api.post('/ai/design', { ProductType: 'general', Theme: prompt, ColorScheme: '', AdditionalDetails: '' });
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error: ' + (e?.message || 'unknown') }]);
    } finally {
      setPrompt('');
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        AI Assistant
      </Typography>
      <List>
        {messages.map((m, i) => (
          <ListItem key={i}>
            <ListItemText primary={m.role === 'user' ? 'You' : 'AI'} secondary={m.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField fullWidth value={prompt} onChange={(e) => setPrompt(e.target.value)} label="Ask something..." />
        <Button variant="contained" onClick={send}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AiChat;
