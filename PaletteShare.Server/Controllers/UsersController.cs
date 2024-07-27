using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaletteShare.Server.Models;
using PaletteShare.Server.Services;

namespace PaletteShare.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getuser/{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userService.GetUserAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("getuserbyemail/{email}")]
        public async Task<ActionResult<User>> GetUserByEmail(string email)
        {
            try
            {
                var user = await _userService.GetUserByEmailAsync(email);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("getuserbyusername/{username}")]
        public async Task<ActionResult<Boolean>> GetUserByUsername(string username)
        {
            try
            {
                var user = await _userService.GetUserByUsernameAsync(username);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("createuser")]
        [Authorize]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            try
            {
                // Set additional properties before saving if needed
                user.CreatedAt = DateTime.UtcNow;
                user.UpdatedAt = DateTime.UtcNow;

                await _userService.CreateUserAsync(user);

                // Return a 201 Created response with the newly created post
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("updateuser/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string id, User updatedUser)
        {
            var existingUser = await _userService.GetUserAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            try
            {
                // Update properties of existingUser with updatedUser
                existingUser.Name = updatedUser.Name;
                existingUser.ProfilePictureUrl = updatedUser.ProfilePictureUrl;
                existingUser.CoverPhotoUrl = updatedUser.CoverPhotoUrl;
                existingUser.Bio = updatedUser.Bio;
                existingUser.Website = updatedUser.Website;
                existingUser.SocialLinks = updatedUser.SocialLinks;
                existingUser.Following = updatedUser.Following;
                existingUser.Followers = updatedUser.Followers;

                await _userService.UpdateUserAsync(id, existingUser);

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("getusersbysearchterm/{searchTerm}")]
        public async Task<ActionResult<List<User>>> GetUsersBySearchTerm(string searchTerm)
        {
            try
            {
                var users = await _userService.GetUsersBySearchTermAsync(searchTerm);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
