namespace backend.Services
{
    public class ChatService : IChatService
    {
        public async Task<List<Dictionary<string, object>>> GetChatHistory()
        {
            // Dummy implementation
            return new List<Dictionary<string, object>>
            {
                new Dictionary<string, object> { { "id", 1 }, { "sender", "System" }, { "message", "Welcome to WedsPot Chat!" } }
            };
        }

        public async Task<Dictionary<string, object>> SendMessage(string message)
        {
            // Dummy implementation
            return new Dictionary<string, object>
            {
                { "id", 2 },
                { "sender", "User" },
                { "message", message },
                { "reply", "Thank you for your message!" }
            };
        }
    }
}
