using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<APIResponse>> GetUser(long id)
        {
            var response = await _userService.GetUser(id);
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<APIResponse>> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            return Ok(response);
        }

        [HttpPut("profile/{id}")]
        public async Task<ActionResult<APIResponse>> UpdateProfile(long id, [FromBody] UpdateUserRequest request)
        {
            var response = await _userService.UpdateUser(id, request);
            return Ok(response);
        }

        [HttpPut("password/{id}")]
        public async Task<ActionResult<APIResponse>> UpdatePassword(long id, [FromBody] UpdatePasswordRequest request)
        {
            var response = await _userService.UpdatePassword(id, request);
            return Ok(response);
        }
    }
}
