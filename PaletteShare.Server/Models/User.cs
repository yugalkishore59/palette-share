using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PaletteShare.Server.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("username")]
        public string Username { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("profilePictureUrl")]
        public string ProfilePictureUrl { get; set; } = string.Empty;

        [BsonElement("coverPhotoUrl")]
        public string CoverPhotoUrl { get; set; } = string.Empty;

        [BsonElement("bio")]
        public string Bio { get; set; } = string.Empty;

        [BsonElement("location")]
        public string Location { get; set; } = string.Empty;

        [BsonElement("website")]
        public string Website { get; set; } = string.Empty;

        [BsonElement("socialLinks")]
        public SocialLinks SocialLinks { get; set; } = new SocialLinks();

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        [BsonElement("following")]
        public List<string> Following { get; set; } = new List<string>();

        [BsonElement("followers")]
        public List<string> Followers { get; set; } = new List<string>();

        [BsonElement("posts")]
        public List<string> Posts { get; set; } = new List<string>();
    }

    [BsonIgnoreExtraElements]
    public class SocialLinks
    {
        [BsonElement("instagram")]
        public string Instagram { get; set; } = string.Empty;

        [BsonElement("twitter")]
        public string Twitter { get; set; } = string.Empty;

        [BsonElement("facebook")]
        public string Facebook { get; set; } = string.Empty;
    }
}
