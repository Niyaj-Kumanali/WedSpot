using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/chat")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet("history")]
        public async Task<ActionResult<List<Dictionary<string, object>>>> GetChatHistory()
        {
            var history = await _chatService.GetChatHistory();
            return Ok(history);
        }

        [HttpPost("message")]
        public async Task<ActionResult<Dictionary<string, object>>> SendMessage([FromBody] Dictionary<string, string> payload)
        {
            if (payload.TryGetValue("message", out var message))
            {
                var response = await _chatService.SendMessage(message);
                return Ok(response);
            }
            return BadRequest("Message is required");
        }
    }
}
