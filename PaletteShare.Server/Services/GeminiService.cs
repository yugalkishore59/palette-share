using DotnetGeminiSDK.Client.Interfaces;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace PaletteShare.Server.Services
{
    public class GeminiService
    {
        private readonly IGeminiClient geminiClient;

        public GeminiService(IGeminiClient geminiClient)
        {
            this.geminiClient = geminiClient;
        }

        public async Task<bool> ContainsExplicitContent(string text)
        {
            var bannedWords = new string[] { "fuck", "shit", "bitch", "asshole", "cunt", "fuddi" };
            var bannedWordsJson = System.Text.Json.JsonSerializer.Serialize(bannedWords);

            var prompt = $@"
You are a content moderation engine tasked with analyzing user-generated text for explicit, harmful, or abusive language. 
The moderation level is medium: creative expression is allowed, but content that is abusive, harmful, or explicitly explicit should be flagged.
Consider the following banned words/phrases as examples: {bannedWordsJson}. Note that this list is not exhaustive—detect any other abusive or harmful language as well.
Evaluate the text provided below.
If the text contains explicit or abusive content (including language not listed in the banned words but that is still harmful), answer with only 'true' or 'false'.
Do not include any additional text, explanation, or formatting.
Text: ""{text}""
";
            try
            {
                var response = await geminiClient.TextPrompt(prompt);
                var responseText = response?.Candidates[0].Content.Parts[0].Text ?? "";

                return responseText.Contains("true");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
    }
}
