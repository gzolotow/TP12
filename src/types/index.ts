export interface Post {
  id: string;
  imageUrl: string;
  username: string;
  userAvatar: string;
  caption: string;
  likes: number;
  comments: { id: string; username: string; text: string }[];
  timeAgo: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Story {
  id: string;
  username: string;
  avatar: string;
  seen: boolean;
}
