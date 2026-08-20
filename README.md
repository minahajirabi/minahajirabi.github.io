# Mina Hajirabi — Art portfolio

The source for [minahajirabi.github.io](https://minahajirabi.github.io/), hosted with GitHub Pages. The site uses plain HTML and CSS, with a small JavaScript artwork viewer on `projects/index.html` for navigation and zoom controls.

## Projects

Artwork is grouped into descriptive folders under `projects/`:

- `material-rendering-2023/`
- `form-study-2023/`
- `portrait-study-2021/`
- `form-study-2021/`

Reference photographs remain local and are excluded from Git; only Mina's artwork is published. New artwork images should use lowercase descriptive names and remain below 1 MB where practical.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish

Push changes to `main`. In the repository's **Settings → Pages**, select **Deploy from a branch**, `main`, and `/ (root)`.
