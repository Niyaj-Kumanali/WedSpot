using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IChatService
    {
        Task<List<Dictionary<string, object>>> GetChatHistory();
        Task<Dictionary<string, object>> SendMessage(string message);
    }
}
