using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IDashboardService
    {
        Task<Dictionary<string, object>> GetDashboardStats();
    }
}
