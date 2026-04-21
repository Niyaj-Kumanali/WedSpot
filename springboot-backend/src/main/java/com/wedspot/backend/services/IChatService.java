package com.wedspot.backend.services;

import java.util.List;
import java.util.Map;

public interface IChatService {
    List<Map<String, Object>> getChatHistory();
    Map<String, Object> sendMessage(String message);
}
