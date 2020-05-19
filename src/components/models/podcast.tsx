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
  asset_collections: Collection[];
}

export interface VideoList {
  id: number;
  resolution: number;
  video: string;
}

export interface Collection {
  title: string;
  description: string;
  assets: Asset[];
}

export interface Asset {
  src: string;
  cover: string | null;
  type: string;
}
