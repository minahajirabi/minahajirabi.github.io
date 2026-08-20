# Mina Hajirabi — Art portfolio

The source for [minahajirabi.github.io](https://minahajirabi.github.io/), hosted with GitHub Pages.

## Add artwork

1. Export each artwork photograph as WebP or JPEG, ideally 1600–2400 px on its longest side and under 1 MB.
2. Put the files in `assets/artworks/` using lowercase descriptive names, for example `blue-still-life.webp`.
3. In `index.html`, replace an `.art-placeholder` block with an image:

   ```html
   <img
       class="art-image"
       src="assets/artworks/blue-still-life.webp"
       alt="Description of the artwork for screen-reader users"
       width="1600"
       height="2000"
       loading="lazy"
   >
   ```

4. Replace the placeholder title, year, medium, and dimensions with the real details.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish

Push changes to `main`. In the repository's **Settings → Pages**, select **Deploy from a branch**, `main`, and `/ (root)`.
