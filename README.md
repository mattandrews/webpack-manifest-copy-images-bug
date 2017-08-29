This repo aims to reproduce an issue encountered with [a fork of `webpack-manifest-plugin`](https://github.com/danethurber/webpack-manifest-plugin/pull/75).

## Instructions

    git clone git@github.com:mattandrews/webpack-manifest-copy-images-bug.git
    cd webpack-manifest-copy-images-bug
    npm install
    webpack

...then check the contents of `./output/manifest.json`:

### Expected output:
    {
      "app.css": "css/styles.1606040f.css",
      "app.css.map": "css/styles.1606040f.css.map",
      "app.js": "out.1606040f.js",
      "app.js.map": "out.1606040f.js.map",
      "images/iss.png": "images/iss.26318e63.png",
      "images/space.jpg": "images/space.35e4c1ec.jpg"
    }
    
### Actual output:
    {
      "app.css": "css/styles.1606040f.css",
      "app.css.map": "css/styles.1606040f.css.map",
      "app.js": "out.1606040f.js",
      "app.js.map": "out.1606040f.js.map",
      "images/iss.26318e63.png": "images/iss.26318e63.png",
      "images/space.jpg": "images/space.35e4c1ec.jpg"
    }
    
(eg. the input path for `images/iss.png` should be its regular path, not the hashed output – this file is not referenced in the CSS (unlike `images/space.jpg`) so is just copied over.