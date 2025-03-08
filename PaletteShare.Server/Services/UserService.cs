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

        public async Task<User> GetUserByEmailAsync(string email) => await _users.Find(user => user.Email == email).FirstOrDefaultAsync();

        public async Task<User> GetUserByUsernameAsync(string username) => await _users.Find(user => user.Username == username).FirstOrDefaultAsync();

        public async Task<User> GetUserAsync(string id) => await _users.Find<User>(user => user.Id == id).FirstOrDefaultAsync();

        public async Task CreateUserAsync(User user) => await _users.InsertOneAsync(user);

        public async Task UpdateUserAsync(string id, User user) => await _users.ReplaceOneAsync(u => u.Id == id, user);

        public async Task RemoveUserAsync(string id) => await _users.DeleteOneAsync(user => user.Id == id);

        public async Task<List<User>> GetUsersBySearchTermAsync(string searchTerm)
        {
            var regex = new MongoDB.Bson.BsonRegularExpression(searchTerm, "i");
            var filter = Builders<User>.Filter.Or(
                Builders<User>.Filter.Regex(u => u.Username, regex),
                Builders<User>.Filter.Regex(u => u.Name, regex),
                Builders<User>.Filter.Regex(u => u.Email, regex)
            );
            return await _users.Find(filter).ToListAsync();
        }

    }
}
