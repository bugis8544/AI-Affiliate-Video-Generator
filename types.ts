export interface FormData {
  productName: string;
  description: string;
  targetAudience: string;
  contentStyle: 'UGC' | 'Jenaka' | 'Edukatif' | 'Storytelling';
  platform: 'TikTok' | 'Instagram Reels';
}

export interface VideoScene {
  scene_number: number;
  duration_seconds: number;
  description: string;
  narration: string;
}

export interface GeneratedContent {
  videoScript: VideoScene[];
  voiceOver: string;
  caption: string;
  cta: string;
  visualPrompts: string[];
  hashtags: string[];
}
