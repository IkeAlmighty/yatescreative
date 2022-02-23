export async function unpublishArticle(article) {
  // TODO
}

export async function publishArticle(title, author) {
  const body = JSON.stringify({
    collection: "articles",
    query: { title, author },
    document: { title, author, published: true },
  });
  return await fetch(`/api/db/mongodb`, {
    method: "PATCH",
    body,
  });
}

export async function saveArticle(title, author, markdown) {
  const body = JSON.stringify({
    mongo: {
      collection: "articles",
      query: { title, author },
      document: { title, author, markdown },
    },
  });
  try {
    await fetch(`http://localhost/api/db/mongodb`, {
      method: "PATCH",
      body,
    });
  } catch (err) {}
}
