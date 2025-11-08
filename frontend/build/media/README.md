# Media Assets

This folder contains static media files that are served directly by the web server.

## Files

- `marathalli.mp4` - Video showcasing the Marathahalli gym location
- `1714407900720.jpeg` - Poster image for the Marathahalli gym video

## Usage

These files are referenced in the application using absolute paths starting with `/media/`:

- Video: `<source src="/media/marathalli.mp4" type="video/mp4" />`
- Poster: `poster="/media/1714407900720.jpeg"`

## Deployment

When deploying to platforms like Render, ensure this folder is included in the build and deployment process. The files in the `public` folder are automatically served as static assets.
