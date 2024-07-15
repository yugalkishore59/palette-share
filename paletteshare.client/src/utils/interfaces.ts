interface HeaderProps {
  active: string;
  setActive: (active: string) => void;
}

interface UserType {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  coverPhotoUrl: string;
  bio: string;
  location: string;
  website: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  createdAt: string;
  updatedAt: string;
  following: string[];
  followers: string[];
  posts: string[];
}

interface CommentType {
  _id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface PostType {
  _id: string;
  description: string;
  userId: string;
  name: string; // name of the user
  username: string; // unique username of the user
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: CommentType[];
  license: string;
}

interface PostsType {
  posts: PostType[];
  page: number;
  loading: boolean;
  error: boolean;
}

export type { HeaderProps, UserType, PostType, PostsType, CommentType };
