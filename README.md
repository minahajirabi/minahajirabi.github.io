# Mina Hajirabi — Art portfolio

The source for [minahajirabi.github.io](https://minahajirabi.github.io/), hosted with GitHub Pages. The site uses plain HTML and CSS, with a small JavaScript artwork viewer on `projects/index.html` for navigation and zoom controls.

## Selected portfolio

The site follows the ranked 2026 portfolio order. Artwork is grouped into descriptive folders under `projects/`:

- `silent-splendor-2026/`
- `grape-still-life-2024/`
- `lemon-still-life-2024/`
- `pear-study-2024/`
- `watermelon-study-2024/`
- `still-life-in-red-2024/`
- `ceramic-pot-2024/`
- `green-bottle-study-2025/`
- `ceramic-vase-2025/`
- `geometric-form-studies-2021-2023/`
- `portrait-study-2021/`

Reference photographs and process images are excluded from the website; the public selection uses finished artwork only. Local source material can be kept under the Git-ignored `artwork-source/` directory. New artwork images should use lowercase descriptive names and remain below 1 MB where practical.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish

Push changes to `main`. In the repository's **Settings → Pages**, select **Deploy from a branch**, `main`, and `/ (root)`.
