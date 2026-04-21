using System.Net;

namespace backend.Exceptions
{
    public class ResourceNotFoundException : BaseException
    {
        public ResourceNotFoundException(string message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}
