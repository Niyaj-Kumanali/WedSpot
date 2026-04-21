package com.wedspot.backend.controller;

import com.wedspot.backend.services.IChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final IChatService chatService;

    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getChatHistory() {
        return ResponseEntity.ok(chatService.getChatHistory());
    }

    @PostMapping("/message")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(chatService.sendMessage(payload.get("message")));
    }
}
