export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
};
export type ArticleResponse = {
  article: Article;
};
