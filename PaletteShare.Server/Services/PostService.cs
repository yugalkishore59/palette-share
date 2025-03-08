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
            CreateIndexes();
        }

        private void CreateIndexes()
        {
            // Create an index on the CreatedAt field in descending order
            var indexKeysDefinition = Builders<Post>.IndexKeys.Descending(post => post.CreatedAt);
            var indexModel = new CreateIndexModel<Post>(indexKeysDefinition);
            _posts.Indexes.CreateOne(indexModel);
        }

        public async Task<List<Post>> GetPostsAsync(int page, int pageSize)
        {
            return await _posts.Find(post => true)
                               .SortByDescending(post => post.CreatedAt)
                               .Skip((page - 1) * pageSize)
                               .Limit(pageSize)
                               .ToListAsync();
        }

        public async Task<Post> GetPostAsync(string id) =>
            await _posts.Find(post => post.Id == id).FirstOrDefaultAsync();

        public async Task<List<Post>> GetPostsByUsernameAsync(string username) =>
            await _posts.Find(post => post.Username == username).ToListAsync();

        public async Task CreatePostAsync(Post post) =>
            await _posts.InsertOneAsync(post);

        public async Task UpdatePostAsync(string id, Post post) =>
            await _posts.ReplaceOneAsync(p => p.Id == id, post);

        public async Task RemovePostAsync(string id) =>
            await _posts.DeleteOneAsync(post => post.Id == id);

        public async Task<List<Post>> GetPostsBySearchTermAsync(string searchTerm)
        {
            var regex = new MongoDB.Bson.BsonRegularExpression(searchTerm, "i");
            var filter = Builders<Post>.Filter.Or(
                Builders<Post>.Filter.Regex(post => post.Description, regex),
                Builders<Post>.Filter.Regex("Tags", regex)
            );
            return await _posts.Find(filter)
                               .SortByDescending(post => post.CreatedAt)
                               .ToListAsync();
        }
    }
}
