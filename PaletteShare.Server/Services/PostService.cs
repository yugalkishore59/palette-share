using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PaletteShare.Server.Models;

namespace PaletteShare.Server.Services
{
    public class PostService
    {
        private readonly IMongoCollection<Post> _posts;
        public PostService(IOptions<MongoDBSettings> settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _posts = database.GetCollection<Post>(settings.Value.PostCollectionName);
        }

        public async Task<List<Post>> GetPostsAsync(int page, int pageSize)
        {
            return await _posts.Find(post => true)
                               .Skip((page-1) * pageSize)
                               .Limit(pageSize)
                               .ToListAsync();
        }

        public async Task<Post> GetPostAsync(string id) => await _posts.Find<Post>(post => post.Id == id).FirstOrDefaultAsync();

        public async Task<List<Post>> GetPostsByUsernameAsync(string username) => await _posts.Find<Post>(post => post.Username == username).ToListAsync();

        public async Task CreatePostAsync(Post post) => await _posts.InsertOneAsync(post);

        public async Task UpdatePostAsync(string id, Post post) => await _posts.ReplaceOneAsync(p => p.Id == id, post);

        public async Task RemovePostAsync(string id) => await _posts.DeleteOneAsync(post => post.Id == id);
    }
}
