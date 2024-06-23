export interface IBlog {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  authorId: string;
  content: string;
  slug: string;
  createAt?: string;
  updateAt?: string;
}
export interface IBlogStats {
  mouths: string;
  total: number;
  totalMonth: number;
  hashtag: Record<string, number>;
  data: IBlog[];
}
export interface IBlogResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    totalPages: number;
    data: IBlog[];
  };
}
export interface IProfileAuthor {
  id: string;
  name: string;
  email: string;
  SDT: string;
  thumbnail: string;
  posts: IBlog[];
}
