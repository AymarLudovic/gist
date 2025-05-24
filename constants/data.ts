// constants/data.ts
import { Video } from 'expo-av';

export interface User {
  id: string;
  username: string;
  profilePicture: string;
  bio: string;
  followers: number;
  following: number;
  likesReceived: number;
  videos: string[]; // URLs of videos uploaded by this user
  likedVideos: string[]; // URLs of videos liked by this user
}

export interface VideoItem {
  id: string;
  videoUri: string;
  description: string;
  hashtags: string[];
  userId: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean; // For current user
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: { id: string; username: string; profilePicture: string };
  video?: { id: string; thumbnail: string; description: string };
  timestamp: string;
  message: string;
}

export const users: User[] = [
  {
    id: 'user1',
    username: 'john_doe',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Software developer | Content creator | React Native enthusiast.',
    followers: 1234,
    following: 56,
    likesReceived: 12345,
    videos: ['video1', 'video3', 'video5'],
    likedVideos: ['video2', 'video4'],
  },
  {
    id: 'user2',
    username: 'jane_smith',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Travel vlogger ✈️ Sharing my adventures around the world!',
    followers: 5678,
    following: 123,
    likesReceived: 56789,
    videos: ['video2', 'video4'],
    likedVideos: ['video1', 'video3'],
  },
  {
    id: 'user3',
    username: 'coding_guru',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Learning and teaching code. Follow for daily dev tips!',
    followers: 987,
    following: 45,
    likesReceived: 9876,
    videos: ['video6', 'video7'],
    likedVideos: ['video5', 'video1'],
  },
  {
    id: 'user4',
    username: 'art_lover',
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
    bio: 'Passionate about art and creativity. Sharing my latest works.',
    followers: 2345,
    following: 78,
    likesReceived: 23456,
    videos: ['video8', 'video9'],
    likedVideos: ['video6', 'video7'],
  },
  {
    id: 'user5',
    username: 'fitness_freak',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
    bio: 'Fitness coach. Helping you achieve your goals!',
    followers: 6789,
    following: 200,
    likesReceived: 67890,
    videos: ['video10', 'video1'],
    likedVideos: ['video2', 'video3'],
  },
];

export const videos: VideoItem[] = [
  {
    id: 'video1',
    videoUri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    description: 'A beautiful sunset over the mountains. #nature #sunset #travel',
    hashtags: ['nature', 'sunset', 'travel'],
    userId: 'user1',
    likes: 1234,
    comments: 56,
    shares: 12,
    timestamp: '2023-10-26T10:00:00Z',
    isLiked: false,
  },
  {
    id: 'video2',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Use a different video source if available, or just reuse
    description: 'My new coding setup! What do you think? #devlife #coding #setup',
    hashtags: ['devlife', 'coding', 'setup'],
    userId: 'user2',
    likes: 2345,
    comments: 78,
    shares: 23,
    timestamp: '2023-10-25T14:30:00Z',
    isLiked: true,
  },
  {
    id: 'video3',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-girl-walking-ahead-in-the-forest-4770-large.mp4',
    description: 'Exploring the serene forest trails this morning. #forest #hiking #peaceful',
    hashtags: ['forest', 'hiking', 'peaceful'],
    userId: 'user1',
    likes: 876,
    comments: 34,
    shares: 5,
    timestamp: '2023-10-24T09:15:00Z',
    isLiked: false,
  },
  {
    id: 'video4',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-person-walking-in-a-snowy-forest-4375-large.mp4',
    description: 'Winter wonderland vibes. So cold but so beautiful! ❄️ #winter #snow #travel',
    hashtags: ['winter', 'snow', 'travel'],
    userId: 'user2',
    likes: 3456,
    comments: 102,
    shares: 30,
    timestamp: '2023-10-23T18:00:00Z',
    isLiked: false,
  },
  {
    id: 'video5',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-a-headscarf-sitting-on-the-sand-29406-large.mp4',
    description: 'Morning meditation by the beach. Find your inner peace. #meditation #beach #mindfulness',
    hashtags: ['meditation', 'beach', 'mindfulness'],
    userId: 'user1',
    likes: 987,
    comments: 40,
    shares: 8,
    timestamp: '2023-10-22T07:45:00Z',
    isLiked: true,
  },
  {
    id: 'video6',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-river-in-a-forest-4029-large.mp4',
    description: 'Drone view of the river winding through the forest. So serene! #drone #nature #river',
    hashtags: ['drone', 'nature', 'river'],
    userId: 'user3',
    likes: 1500,
    comments: 60,
    shares: 15,
    timestamp: '2023-10-21T11:20:00Z',
    isLiked: false,
  },
  {
    id: 'video7',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-landscape-of-the-lake-and-the-forest-4043-large.mp4',
    description: 'Just enjoying the view. Nature at its finest. #landscape #beauty #outdoors',
    hashtags: ['landscape', 'beauty', 'outdoors'],
    userId: 'user3',
    likes: 1800,
    comments: 75,
    shares: 20,
    timestamp: '2023-10-20T16:00:00Z',
    isLiked: false,
  },
  {
    id: 'video8',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-woman-lying-in-the-leaves-2384-large.mp4',
    description: 'Autumn leaves are falling! 🍂 Loving this season. #autumn #leaves #cozy',
    hashtags: ['autumn', 'leaves', 'cozy'],
    userId: 'user4',
    likes: 2000,
    comments: 80,
    shares: 25,
    timestamp: '2023-10-19T13:00:00Z',
    isLiked: true,
  },
  {
    id: 'video9',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-woman-with-her-dog-in-the-forest-3081-large.mp4',
    description: 'My best friend and I enjoying a walk in the woods. #doglover #bestfriend #naturewalk',
    hashtags: ['doglover', 'bestfriend', 'naturewalk'],
    userId: 'user4',
    likes: 2500,
    comments: 90,
    shares: 30,
    timestamp: '2023-10-18T10:30:00Z',
    isLiked: false,
  },
  {
    id: 'video10',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-waves-on-a-rocky-beach-1191-large.mp4',
    description: 'The sound of waves is so calming. #beachlife #waves #ocean',
    hashtags: ['beachlife', 'waves', 'ocean'],
    userId: 'user5',
    likes: 3000,
    comments: 110,
    shares: 35,
    timestamp: '2023-10-17T08:00:00Z',
    isLiked: true,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'notif1',
    type: 'like',
    user: { id: 'user2', username: 'jane_smith', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
    video: { id: 'video1', thumbnail: 'https://via.placeholder.com/100', description: 'A beautiful sunset...' },
    timestamp: '2023-10-26T12:05:00Z',
    message: 'jane_smith a aimé votre vidéo.',
  },
  {
    id: 'notif2',
    type: 'follow',
    user: { id: 'user3', username: 'coding_guru', profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
    timestamp: '2023-10-26T11:30:00Z',
    message: 'coding_guru a commencé à vous suivre.',
  },
  {
    id: 'notif3',
    type: 'comment',
    user: { id: 'user4', username: 'art_lover', profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg' },
    video: { id: 'video3', thumbnail: 'https://via.placeholder.com/100', description: 'Exploring the forest...' },
    timestamp: '2023-10-25T19:00:00Z',
    message: 'art_lover a commenté votre vidéo : "Superbe vidéo !"',
  },
  {
    id: 'notif4',
    type: 'like',
    user: { id: 'user5', username: 'fitness_freak', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg' },
    video: { id: 'video2', thumbnail: 'https://via.placeholder.com/100', description: 'My new coding setup...' },
    timestamp: '2023-10-25T10:00:00Z',
    message: 'fitness_freak a aimé votre vidéo.',
  },
];