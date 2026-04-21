using System.Net;

namespace backend.Exceptions
{
    public class BadRequestException : BaseException
    {
        public BadRequestException(string message) : base(message, HttpStatusCode.BadRequest)
        {
        }
    }
}
