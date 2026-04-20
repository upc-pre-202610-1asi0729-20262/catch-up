export interface ArticleResource {
  source: { id: string | null; name: string;}
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}
export interface TopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: ArticleResource[];
}
