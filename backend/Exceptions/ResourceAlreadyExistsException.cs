using System.Net;

namespace backend.Exceptions
{
    public class ResourceAlreadyExistsException : BaseException
    {
        public ResourceAlreadyExistsException(string message) : base(message, HttpStatusCode.Conflict)
        {
        }
    }
}
