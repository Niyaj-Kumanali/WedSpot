package com.wedspot.backend.services.implementation;

import com.wedspot.backend.services.IChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService implements IChatService {

    @Override
    public List<Map<String, Object>> getChatHistory() {
        List<Map<String, Object>> history = new ArrayList<>();
        // Mock history
        Map<String, Object> msg = new HashMap<>();
        msg.put("id", 1);
        msg.put("sender", "bot");
        msg.put("text", "Hello! I'm your WedsSpot assistant. How can I help you?");
        msg.put("timestamp", System.currentTimeMillis());
        history.add(msg);
        
        return history;
    }

    @Override
    public Map<String, Object> sendMessage(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", System.currentTimeMillis());
        response.put("sender", "bot");
        response.put("text", "Thank you for your message: '" + message + "'. I'm still learning, but I'll do my best to help!");
        response.put("timestamp", System.currentTimeMillis());
        
        return response;
    }
}
