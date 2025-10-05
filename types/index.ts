// ===================================
// BASE TYPES
// ===================================

export type ObjectId = string;

export type ApiResponseType<T, E = string> = {
  okay: boolean;
  message?: T;
  error?: E;
  statusCode: number;
};

export type Timestamps = {
  createdAt: string;
  updatedAt: string;
};

// ===================================
// NESTED TYPES
// ===================================

export type UserProfile = {
  fullName?: string;
  bio?: string;
  avatar: string;
  website?: string;
  phoneNumber?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
};

export type UserCounts = {
  posts: number;
  followers: number;
  following: number;
};

export type PostCounts = {
  likes: number;
  comments: number;
  shares: number;
};

export type CommentCounts = {
  likes: number;
  replies: number;
};

export type StoryCounts = {
  views: number;
  replies: number;
};

export type Media = {
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  name?: string;
  coordinates?: Coordinates;
};

export type RecentComment = {
  _id: ObjectId;
  userId: ObjectId;
  username: string;
  userAvatar: string;
  text: string;
  createdAt: string;
};

export type StoryMedia = {
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  duration: number;
};

export type StickerPosition = {
  x: number;
  y: number;
};

export type Sticker = {
  type: "location" | "mention" | "hashtag" | "poll" | "question" | "music";
  data: any;
  position: StickerPosition;
};

export type Participant = {
  userId: ObjectId;
  username: string;
  avatar: string;
  lastReadAt: string;
};

export type LastMessage = {
  text: string;
  senderId: ObjectId;
  createdAt: string;
};

export type MessageContent = {
  text?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sharedPostId?: ObjectId;
  sharedStoryId?: ObjectId;
};

export type ReadReceipt = {
  userId: ObjectId;
  readAt: string;
};

export type TopPost = {
  postId: ObjectId;
  thumbnailUrl: string;
};

// ===================================
// AUTH TYPES
// ===================================

export type LoginRequest = {
  usernameOrEmail: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  fullName: string;
};

// ===================================
// DTO TYPES (Request/Response Data Transfer Objects)
// ===================================

export type CreatePostRequest = {
  media: Media[];
  caption?: string;
  location?: Location;
  hashtags?: string[];
  mentions?: string[];
  isCommentsEnabled?: boolean;
  isLikesVisible?: boolean;
};

export type UpdatePostRequest = {
  caption?: string;
  location?: Location;
  hashtags?: string[];
  mentions?: string[];
  isCommentsEnabled?: boolean;
  isLikesVisible?: boolean;
};

export type GetFeedRequest = {
  page?: number;
  limit?: number;
  userId?: string;
  hashtag?: string;
};

export type GetUserPostsRequest = {
  page?: number;
  limit?: number;
};

export type CreateCommentRequest = {
  text: string;
  parentCommentId?: string;
  mentions?: string[];
};

export type UpdateCommentRequest = {
  text: string;
  mentions?: string[];
};

export type GetCommentsRequest = {
  page?: number;
  limit?: number;
  parentCommentId?: string;
};

export type FollowUserRequest = {
  followingId: string;
};

export type UnfollowUserRequest = {
  followingId: string;
};

export type GetFollowersRequest = {
  page?: number;
  limit?: number;
  userId?: string;
  status?: "pending" | "accepted";
};

export type GetFollowingRequest = {
  page?: number;
  limit?: number;
  userId?: string;
  status?: "pending" | "accepted";
};

export type AcceptFollowRequestRequest = {
  followerId: string;
};

export type RejectFollowRequestRequest = {
  followerId: string;
};

export type CreateLikeRequest = {
  targetType: "post" | "comment";
  targetId: string;
};

export type RemoveLikeRequest = {
  targetType: "post" | "comment";
  targetId: string;
};

export type GetLikesRequest = {
  page?: number;
  limit?: number;
  targetType?: "post" | "comment";
  targetId?: string;
};

export type CheckLikeRequest = {
  targetType: "post" | "comment";
  targetId: string;
};

export type CreateStoryRequest = {
  media: StoryMedia;
  stickers?: Sticker[];
  visibility?: "public" | "followers" | "close_friends";
  allowReplies?: boolean;
};

export type GetStoriesRequest = {
  page?: number;
  limit?: number;
  userId?: string;
};

export type CreateNotificationRequest = {
  recipientId: string;
  type:
    | "like"
    | "comment"
    | "follow"
    | "mention"
    | "story_reply"
    | "follow_request";
  actorId: string;
  message: string;
  postId?: string;
  commentId?: string;
  storyId?: string;
};

export type GetNotificationsRequest = {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
};

export type MarkNotificationReadRequest = {
  notificationId: string;
};

export type MarkAllNotificationsReadRequest = {
  // No fields needed
};

export type SavePostRequest = {
  postId: string;
  collectionName?: string;
};

export type UnsavePostRequest = {
  postId: string;
};

export type GetSavedPostsRequest = {
  page?: number;
  limit?: number;
  collectionName?: string;
};

export type CreateCollectionRequest = {
  name: string;
  description?: string;
};

export type GetCollectionsRequest = {
  page?: number;
  limit?: number;
};

export type UpdateUserProfileRequest = {
  fullName?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  phoneNumber?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  isPrivate?: boolean;
  profile?: UpdateUserProfileRequest;
};

export type SearchUsersRequest = {
  query: string;
  limit?: number;
};

export type SearchHashtagsRequest = {
  query: string;
  limit?: number;
};

export type GetTrendingHashtagsRequest = {
  limit?: number;
};

export type GetHashtagPostsRequest = {
  hashtag: string;
  page?: number;
  limit?: number;
};

// ===================================
// MODEL TYPES
// ===================================

export type TModelUser = Timestamps & {
  _id: ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  profile: UserProfile;
  counts: UserCounts;
  isVerified: boolean;
  isPrivate: boolean;
  lastLoginAt?: string;
};

export type TModelPost = Timestamps & {
  _id: ObjectId;
  userId: ObjectId;
  username: string;
  userAvatar: string;
  media: Media[];
  caption?: string;
  location?: Location;
  hashtags: string[];
  mentions: string[];
  counts: PostCounts;
  recentComments: RecentComment[];
  isCommentsEnabled: boolean;
  isLikesVisible: boolean;
};

export type TModelComment = Timestamps & {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  username: string;
  userAvatar: string;
  text: string;
  parentCommentId: ObjectId | null;
  mentions: string[];
  counts: CommentCounts;
};

export type TModelLike = Timestamps & {
  _id: ObjectId;
  userId: ObjectId;
  targetType: "post" | "comment";
  targetId: ObjectId;
};

export type TModelFollow = Timestamps & {
  _id: ObjectId;
  followerId: ObjectId;
  followingId: ObjectId;
  followerUsername: string;
  followingUsername: string;
  status: "pending" | "accepted";
};

export type TModelStory = Timestamps & {
  _id: ObjectId;
  userId: ObjectId;
  username: string;
  userAvatar: string;
  media: StoryMedia;
  stickers: Sticker[];
  counts: StoryCounts;
  viewedBy: ObjectId[];
  expiresAt: string;
};

export type TModelConversation = Timestamps & {
  _id: ObjectId;
  participants: Participant[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  lastMessage?: LastMessage;
};

export type TModelMessage = Timestamps & {
  _id: ObjectId;
  conversationId: ObjectId;
  senderId: ObjectId;
  senderUsername: string;
  type: "text" | "image" | "video" | "post_share" | "story_reply";
  content: MessageContent;
  reactions: Record<string, ObjectId[]>;
  readBy: ReadReceipt[];
  isDeleted: boolean;
};

export type TModelNotification = Timestamps & {
  _id: ObjectId;
  recipientId: ObjectId;
  type:
    | "like"
    | "comment"
    | "follow"
    | "mention"
    | "story_reply"
    | "follow_request";
  actorId: ObjectId;
  actorUsername: string;
  actorAvatar: string;
  postId?: ObjectId;
  commentId?: ObjectId;
  storyId?: ObjectId;
  message: string;
  isRead: boolean;
};

export type TModelSavedPost = Timestamps & {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
  collectionName: string;
};

export type TModelHashtag = {
  _id: string;
  count: number;
  recentCount: number;
  trending: boolean;
  topPost?: TopPost;
  lastUpdated: string;
};

// ===================================
// AUTH MODEL TYPES (Updated with proper TModelUser reference)
// ===================================

export type TModelLoginData = {
  user: TModelUser;
  token: string;
};

export type TModelRegisterData = TModelUser;

// ===================================
// RESPONSE TYPES
// ===================================

export type TResponseUser = ApiResponseType<TModelUser, string>;
export type TResponseUsers = ApiResponseType<TModelUser[], string>;

export type TResponsePost = ApiResponseType<TModelPost, string>;
export type TResponsePosts = ApiResponseType<TModelPost[], string>;

export type TResponseComment = ApiResponseType<TModelComment, string>;
export type TResponseComments = ApiResponseType<TModelComment[], string>;

export type TResponseLike = ApiResponseType<TModelLike, string>;
export type TResponseLikes = ApiResponseType<TModelLike[], string>;

export type TResponseFollow = ApiResponseType<TModelFollow, string>;
export type TResponseFollows = ApiResponseType<TModelFollow[], string>;

export type TResponseStory = ApiResponseType<TModelStory, string>;
export type TResponseStories = ApiResponseType<TModelStory[], string>;

export type TResponseConversation = ApiResponseType<TModelConversation, string>;
export type TResponseConversations = ApiResponseType<
  TModelConversation[],
  string
>;

export type TResponseMessage = ApiResponseType<TModelMessage, string>;
export type TResponseMessages = ApiResponseType<TModelMessage[], string>;

export type TResponseNotification = ApiResponseType<TModelNotification, string>;
export type TResponseNotifications = ApiResponseType<
  TModelNotification[],
  string
>;

export type TResponseSavedPost = ApiResponseType<TModelSavedPost, string>;
export type TResponseSavedPosts = ApiResponseType<TModelSavedPost[], string>;

export type TResponseHashtag = ApiResponseType<TModelHashtag, string>;
export type TResponseHashtags = ApiResponseType<TModelHashtag[], string>;

// Auth Response Types
export type TResponseLogin = ApiResponseType<TModelLoginData, string>;
export type TResponseRegister = ApiResponseType<TModelRegisterData, string>;

// DTO Response Types
export type TResponseCreatePost = ApiResponseType<TModelPost, string>;
export type TResponseUpdatePost = ApiResponseType<TModelPost, string>;
export type TResponseGetFeed = ApiResponseType<TModelPost[], string>;
export type TResponseGetUserPosts = ApiResponseType<TModelPost[], string>;

export type TResponseCreateComment = ApiResponseType<TModelComment, string>;
export type TResponseUpdateComment = ApiResponseType<TModelComment, string>;

export type TResponseCreateFollow = ApiResponseType<TModelFollow, string>;

export type TResponseCreateStory = ApiResponseType<TModelStory, string>;

export type TResponseGetNotifications = ApiResponseType<
  TModelNotification[],
  string
>;
export type TResponseCreateSavedPost = ApiResponseType<TModelSavedPost, string>;

// Comment Response Types
export type TResponseGetComments = ApiResponseType<TModelComment[], string>;

// Follow Response Types
export type TResponseFollowUser = ApiResponseType<TModelFollow, string>;
export type TResponseUnfollowUser = ApiResponseType<boolean, string>;
export type TResponseGetFollowers = ApiResponseType<TModelFollow[], string>;
export type TResponseGetFollowing = ApiResponseType<TModelFollow[], string>;
export type TResponseAcceptFollowRequest = ApiResponseType<
  TModelFollow,
  string
>;
export type TResponseRejectFollowRequest = ApiResponseType<boolean, string>;

// Like Response Types
export type TResponseCreateLike = ApiResponseType<TModelLike, string>;
export type TResponseRemoveLike = ApiResponseType<boolean, string>;
export type TResponseGetLikes = ApiResponseType<TModelLike[], string>;
export type TResponseCheckLike = ApiResponseType<boolean, string>;

// Story Response Types
export type TResponseGetStories = ApiResponseType<TModelStory[], string>;

// Notification Response Types
export type TResponseCreateNotification = ApiResponseType<
  TModelNotification,
  string
>;
export type TResponseMarkNotificationRead = ApiResponseType<boolean, string>;
export type TResponseMarkAllNotificationsRead = ApiResponseType<
  boolean,
  string
>;
export type TResponseGetUnreadCount = ApiResponseType<number, string>;

// SavedPost Response Types
export type TResponseSavePost = ApiResponseType<TModelSavedPost, string>;
export type TResponseUnsavePost = ApiResponseType<boolean, string>;
export type TResponseGetSavedPosts = ApiResponseType<TModelSavedPost[], string>;
export type TResponseCreateCollection = ApiResponseType<
  { name: string; description?: string },
  string
>;
export type TResponseGetCollections = ApiResponseType<string[], string>;
export type TResponseCheckIfSaved = ApiResponseType<boolean, string>;

// User Response Types
export type TResponseUpdateUser = ApiResponseType<TModelUser, string>;
export type TResponseUpdateUserProfile = ApiResponseType<TModelUser, string>;
export type TResponseSearchUsers = ApiResponseType<TModelUser[], string>;
export type TResponseTogglePrivateAccount = ApiResponseType<TModelUser, string>;
export type TResponseGetUserSuggestions = ApiResponseType<TModelUser[], string>;

// Hashtag Response Types
export type TResponseSearchHashtags = ApiResponseType<TModelHashtag[], string>;
export type TResponseGetTrendingHashtags = ApiResponseType<
  TModelHashtag[],
  string
>;
export type TResponseGetHashtagPosts = ApiResponseType<TModelPost[], string>;
export type TResponseGetHashtag = ApiResponseType<TModelHashtag, string>;
