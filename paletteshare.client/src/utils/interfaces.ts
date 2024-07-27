export interface UserType {
  id?: string;
  name: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  coverPhotoUrl: string;
  bio: string;
  location?: string;
  website?: string;
  socialLinks?: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  createdAt: string;
  updatedAt: string;
  following: string[];
  followers: string[];
}

export interface CommentType {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface PostType {
  id?: string;
  description: string;
  userId: string;
  name: string; // name of the user
  username: string; // unique username of the user
  profilePictureUrl: string;
  imageUrl?: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  likes: string[];
  comments: CommentType[];
  license: string;
}

export interface PostsType {
  posts: PostType[];
  page: number;
  isLastPost: boolean;
  loading: boolean;
  error: boolean;
}

export interface PostProps {
  post: PostType;
}

export interface HeaderProps {
  active: string;
}

export interface GalleryProps {
  scrollableRef: React.RefObject<HTMLDivElement>;
}

export interface DropzoneButtonProps {
  setImageUrlBase64: (imageUrlBase64: string) => void;
}
