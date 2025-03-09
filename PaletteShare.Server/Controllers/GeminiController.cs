using Microsoft.AspNetCore.Mvc;
using PaletteShare.Server.Services;

namespace PaletteShare.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeminiController : Controller
    {
        private readonly GeminiService geminiService;

        public GeminiController(GeminiService geminiService)
        {
            this.geminiService = geminiService;
        }

        [HttpPost("isexplicit")]
        public async Task<IActionResult> IsExplicitContent([FromBody] string content)
        {
            try
            {
                bool isExplicit = await geminiService.ContainsExplicitContent(content);
                return Ok(new { isExplicit });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"An error occurred: {ex.Message}" });
            }
        }

    }
}
