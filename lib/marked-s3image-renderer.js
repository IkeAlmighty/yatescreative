const renderer = {
  image(href, title, text) {
    // grab the correct url based on href
    // from session data:

    const imageMap = JSON.parse(sessionStorage.getItem("marked-s3-image-map"));
    const url = imageMap[href];

    return `<img class="rounded" src=${url} alt=${title} />`;
  },
};

export default renderer;
