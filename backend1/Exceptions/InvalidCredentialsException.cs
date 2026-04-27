using System.Net;

namespace backend.Exceptions
{
    public class InvalidCredentialsException : BaseException
    {
        public InvalidCredentialsException(string message) : base(message, HttpStatusCode.Unauthorized)
        {
        }
    }
}
