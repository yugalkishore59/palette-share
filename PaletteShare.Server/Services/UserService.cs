using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PaletteShare.Server.Models;

namespace PaletteShare.Server.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        public UserService(IOptions<MongoDBSettings> settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _users = database.GetCollection<User>(settings.Value.UserCollectionName);
        }

        public async Task<List<User>> GetUsersAsync() => await _users.Find(user => true).ToListAsync();

        public async Task<User> GetUserAsync(string id) => await _users.Find<User>(user => user.Id == id).FirstOrDefaultAsync();

        public async Task CreateUserAsync(User user) => await _users.InsertOneAsync(user);

        public async Task UpdateUserAsync(string id, User user) => await _users.ReplaceOneAsync(u => u.Id == id, user);

        public async Task RemoveUserAsync(string id) => await _users.DeleteOneAsync(user => user.Id == id);
    }
}
