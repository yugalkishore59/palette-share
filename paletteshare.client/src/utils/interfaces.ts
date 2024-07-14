interface HeaderProps {
  active: string;
  setActive: (active: string) => void;
}

interface UserProps {
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

interface CommentProps {
  userId: string;
  username: string;
  comment: string;
  createdAt: string;
}

interface PostProps {
  _id: string;
  description: string;
  artistId: string;
  name: string;
  username: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: CommentProps[];
  license: string;
}

interface PostsProps {
  posts: PostProps[];
  page: number;
  loading: boolean;
  error: boolean;
}

export type { HeaderProps, UserProps, PostProps, PostsProps, CommentProps };
