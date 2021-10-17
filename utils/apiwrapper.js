class MethodRouter {
  constructor() {
    this._get = null;
    this._post = null;
    this._delete = null;
    this._patch = null;
  }

  get(func) {
    this._get = func;
  }

  post(func) {
    this._post = func;
  }

  delete(func) {
    this._delete = func;
  }

  patch(func) {
    this._patch = func;
  }
}

function APIWrapper() {
  const router = new MethodRouter();
  const handler = (req, res) => {
    let funcName = "_" + req.method.toLowerCase();

    if (!router.hasOwnProperty(funcName)) {
      console.log(`${funcName} not a valid function name`);
      res.status(400).send(`${funcName} not a valid function name`);
      res.end();
      return;
    }

    router["_" + req.method.toLowerCase()](req, res);

    res.end();
  };

  return { router, handler };
}

export { APIWrapper };
