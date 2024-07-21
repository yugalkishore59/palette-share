using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaletteShare.Server.Models;
using PaletteShare.Server.Services;

namespace PaletteShare.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private readonly PostService _postService;

        public PostsController(PostService postService)
        {
            _postService = postService;
        }

        [HttpGet("getposts")]
        public async Task<ActionResult<List<Post>>> GetPosts(int page = 1, int pageSize = 10)
        {
            try
            {
                var posts = await _postService.GetPostsAsync(page, pageSize);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("createpost")]
        [Authorize]
        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            try
            {
                // Set additional properties before saving if needed
                post.CreatedAt = DateTime.UtcNow;
                post.UpdatedAt = DateTime.UtcNow;

                await _postService.CreatePostAsync(post);

                // Return a 201 Created response with the newly created post
                return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("getpost/{id}")]
        [Authorize]
        public async Task<ActionResult<Post>> GetPost(string id)
        {
            var post = await _postService.GetPostAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("getpostsbyusername/{username}")]
        public async Task<ActionResult<List<Post>>> GetPostsByUsername(string username)
        {
            var post = await _postService.GetPostsByUsernameAsync(username);
            return Ok(post);
        }

        [HttpPut("updatepost/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(string id, Post updatedPost)
        {
            var existingPost = await _postService.GetPostAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            try
            {
                // Update properties of existingPost with updatedPost
                existingPost.Description = updatedPost.Description;
                existingPost.ImageUrl = updatedPost.ImageUrl;
                existingPost.Tags = updatedPost.Tags;
                existingPost.UpdatedAt = DateTime.UtcNow;
                existingPost.Likes = updatedPost.Likes;
                existingPost.Comments = updatedPost.Comments;
                existingPost.License = updatedPost.License;

                await _postService.UpdatePostAsync(id, existingPost);

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("deletepost/{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(string id)
        {
            var existingPost = await _postService.GetPostAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            try
            {
                await _postService.RemovePostAsync(id);

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
