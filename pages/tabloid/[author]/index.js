import clientPromise from "../../../utils/mongodb";
import { getSession } from "next-auth/client";
import { useState } from "react";
import { unpublishArticle } from "../../../utils/database-frontend-wrappers";

export default function Author({ articles, author, isAdmin }) {
  const [_articles, setArticles] = useState(articles);

  function unpublishAndRemoveArticleFromRender(article) {
    unpublishArticle(article);
    setArticles(
      _articles.filter((a) => JSON.stringify(a) !== JSON.stringify(article))
    );
  }

  return (
    <div>
      <h1>Articles by {author}</h1>
      {_articles.map((article) => {
        return (
          <div key={`${article.title}`}>
            <a href={`/tabloid/${author}/${article.title}`}>{article.title}</a>
            {isAdmin && article.published && (
              <input
                className="mx-2"
                type="button"
                value="Unpublish"
                onClick={() => unpublishAndRemoveArticleFromRender(article)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { author } = context.query;

  const client = await clientPromise;

  const articles = await client
    .db()
    .collection("articles")
    .aggregate([{ $project: { _id: 0 } }, { $match: { author } }])
    .toArray();

  const session = await getSession(context);
  const isAdmin = session ? session.isAdmin : false;

  return { props: { author, articles, isAdmin } };
}
