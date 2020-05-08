export interface AbstractPlaylist {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  cover: string;
  url: string;
}

export interface Playlist {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  cover: string;
  videos: Video[];
}

export interface Video {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  cover: string;
  duration: number;
  original_text: string;
  video_list: VideoList[];
  subtitle: string;
}

export interface VideoList {
  id: number;
  resolution: number;
  video: string;
}
