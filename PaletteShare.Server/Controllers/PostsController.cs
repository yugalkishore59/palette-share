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
        private readonly PostService postService;

        private readonly GeminiService geminiService;

        public PostsController(PostService postService, GeminiService geminiService)
        {
            this.postService = postService;
            this.geminiService = geminiService;
        }

        [HttpGet("getposts")]
        public async Task<ActionResult<List<Post>>> GetPosts(int page = 1, int pageSize = 10)
        {
            try
            {
                var posts = await postService.GetPostsAsync(page, pageSize);
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

                string content = post.Description + " " + string.Join(" ", post.Tags ?? new List<string>());
                bool isExplicit = await geminiService.ContainsExplicitContent(content);

                if (isExplicit)
                {
                    return BadRequest("Post contains explicit content.");
                }

                await postService.CreatePostAsync(post);

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
            var post = await postService.GetPostAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("getpostsbyusername/{username}")]
        public async Task<ActionResult<List<Post>>> GetPostsByUsername(string username)
        {
            var post = await postService.GetPostsByUsernameAsync(username);
            return Ok(post);
        }

        [HttpPut("updatepost/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(string id, Post updatedPost)
        {
            try
            {
                var existingPost = await postService.GetPostAsync(id);
                if (existingPost == null)
                {
                    return NotFound();
                }

                // Check if description, tags, or comments have changed and check for explicit content
                bool hasDescriptionChanged = existingPost.Description != updatedPost.Description;
                bool haveTagsChanged = !existingPost.Tags.SequenceEqual(updatedPost.Tags);
                // bool haveCommentsChanged = !existingPost.Comments.SequenceEqual(updatedPost.Comments); // check if comments have changed
                bool haveCommentsChanged = (existingPost.Comments.Count < updatedPost.Comments.Count); // only check if new comment is added

                if (hasDescriptionChanged || haveTagsChanged || haveCommentsChanged)
                {
                    string content = (updatedPost.Description ?? "") + " " +
                        string.Join(" ", updatedPost.Tags ?? new List<string>()) + " " +
                        string.Join(" ", updatedPost.Comments?.Select(c => c.Content) ?? new List<string>());


                    bool isExplicit = await geminiService.ContainsExplicitContent(content);

                    if (isExplicit)
                    {
                        return BadRequest("Post contains explicit content.");
                    }
                }

                // Update properties of existingPost with updatedPost
                existingPost.Description = updatedPost.Description ?? "";
                existingPost.ImageUrl = updatedPost.ImageUrl;
                existingPost.Tags = updatedPost.Tags ?? new List<string>();
                existingPost.UpdatedAt = DateTime.UtcNow;
                existingPost.Likes = updatedPost.Likes;
                existingPost.Comments = updatedPost.Comments ?? new List<Comment>();
                existingPost.License = updatedPost.License;

                await postService.UpdatePostAsync(id, existingPost);

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
            var existingPost = await postService.GetPostAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            try
            {
                await postService.RemovePostAsync(id);

                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("getpostsbysearchterm/{searchTerm}")]
        public async Task<ActionResult<List<Post>>> GetpostsBySearchTerm(string searchTerm)
        {
            try
            {
                var posts = await postService.GetPostsBySearchTermAsync(searchTerm);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
