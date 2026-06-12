export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
};
export type ArticleResponse = {
  article: Article;
};
