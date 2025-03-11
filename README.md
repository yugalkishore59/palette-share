# PaletteShare

PaletteShare is a modern social media platform designed for artists and designers to share, discover, and interact with artwork. Built with a robust **.NET Core** backend and a dynamic **React** frontend, PaletteShare fosters a secure and engaging environment for creative expression.

## Features

### **Creative Content Sharing**

- Upload and showcase artwork
- Add descriptions and tags
- Engage with other artists through comments and likes

### **Content Discovery & Social Interactions**

- Follow your favorite artists and creators
- Search for users, posts, and hashtags
- Real-time interactions for a seamless social experience

### **AI-Powered Moderation**

- Automated content moderation using **Google Gemini AI**
- Detects explicit or harmful content to maintain a positive community

### **Secure Authentication & User Management**

- OAuth 2.0 authentication powered by **Auth0**
- JWT-based authentication for API security

### **Modern & Responsive UI**

- Fully responsive for desktop and mobile devices
- Dark and light mode support
- Intuitive design using **Mantine UI components**

## Tech Stack

### **Backend**

- **ASP.NET Core** (C#)
- **MongoDB** (NoSQL Database)
- **Google Gemini AI SDK** (Content Moderation)
- **JWT Authentication** (Secure API Access)

### **Frontend**

- **React** (TypeScript)
- **Redux** (State Management)
- **Mantine UI** (Modern UI Components)
- **Auth0 React SDK** (Authentication)

## Getting Started

### **Prerequisites**

Ensure you have the following installed:

- **.NET 8.0** or later
- **Node.js** (Latest LTS)
- **MongoDB** (Locally or via a cloud provider like MongoDB Atlas)
- **Google Gemini API Key**
- **Auth0 Account**

### **Configuration**

#### **Backend Settings (`appsettings.json`)**

```json
{
  "MongoDBSettings": {
    "ConnectionString": "your_mongodb_connection_string",
    "DatabaseName": "your_database_name",
    "UserCollectionName": "users",
    "PostCollectionName": "posts"
  },
  "Auth0": {
    "Domain": "your_auth0_domain",
    "Audience": "your_auth0_audience"
  },
  "Gemini": {
    "ApiKey": "your_gemini_api_key",
    "ImageBaseUrl": "gemini_image_base_url",
    "TextBaseUrl": "gemini_text_base_url"
  }
}
```

#### **Frontend Settings**

- Configure **Auth0 credentials** in `main.tsx`
- Set up **API endpoints** in environment variables

### **Installation & Running the Project**

```sh
cd PaletteShare.Server
 dotnet restore
 dotnet run
```

Frontend will automatically start along.

## API Endpoints

### **Posts**

- `POST /api/Posts/createpost` → Create a new post
- `GET /api/Posts/getposts` → Retrieve posts (paginated)
- `PUT /api/Posts/updatepost/{id}` → Update an existing post
- `GET /api/Posts/getpostsbyusername/{username}` → Retrieve posts by username
- `DELETE /api/Posts/deletepost/{id}` → Delete a post
- `GET /api/Posts/getpostsbysearchterm/{searchTerm}` → Search and get posts by search term

### **User Profiles**

- `GET /api/Users/getuser/{id}` → Retrieve user profile
- `GET /api/Users/getuserbyemail/{email}` → Retrieve user profile by email
- `GET /api/Users/getuserbyusername/{username}` → Retrieve user profile by username
- `POST /api/Users/createuser` → Create a new user profile
- `PUT /api/Users/updateuser/{id}` → Update user profile
- `GET /api/Users/getusersbysearchterm/{searchTerm}` → Search and get user profiles by search term

### **Content Moderation**

- `POST /api/Gemini/isexplicit` → Check if content is explicit

## Screenshots & Live Demo

### **Try PaletteShare Live!**

**Experience PaletteShare in action!** Connect with artists, explore creative posts, and share your own artwork.

🔗 **Live Platform:** [PaletteShare](https://app-paletteshare-dev.azurewebsites.net/)

### **Screenshots**
![Screenshot 2025-03-11 214734](https://github.com/user-attachments/assets/66d110da-1d72-4eda-9f5e-85dde4b0c37d)

![Screenshot 2025-03-11 214942](https://github.com/user-attachments/assets/491c0275-92ed-463e-b17e-dec196939a09)

## Contributing

Follow these steps:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/yourFeature`)
3. **Commit changes** (`git commit -m 'Add feature: yourFeature'`)
4. **Push to branch** (`git push origin feature/yourFeature`)
5. **Create a Pull Request**

## Acknowledgments

- **[Auth0](https://auth0.com/)** for seamless authentication
- **[Mantine UI](https://mantine.dev/)** for UI components
- **[Google Gemini](https://deepmind.google/technologies/gemini/)** for AI moderation
- **[MongoDB](https://www.mongodb.com/)** for scalable data storage

## Show Your Support

If you like this project, consider ⭐ starring the repository!
