# Frame Sequence — How to Add Your Animation

This folder should contain the exploded-view phone animation frames used by
`js/scrollAnimation.js` for the scroll-scrubbed hero animation.

## Naming convention
```
frame-0001.jpg
frame-0002.jpg
frame-0003.jpg
...
frame-0040.jpg
```
(4-digit zero-padded numbers, `.jpg` format, in order from "assembled phone" → "fully exploded parts")

## How to generate frames from a video
If you have a video (non-branded / generic — no Apple or other trademarked
logos, to keep this safe for commercial use), extract frames with ffmpeg:

```bash
ffmpeg -i your_video.mp4 -vf "select=not(mod(n\,8))" -vsync vfr assets/frames/frame-%04d.jpg
```
Adjust the `mod(n,8)` number to control how many frames you extract — lower
number = more frames = smoother animation but more file size.

## After adding frames
Open `js/scrollAnimation.js` and update:
```js
const FRAME_COUNT = 40; // <- set this to your actual frame count
```

## Note on the upgraded loader
The animation script loads frames with browser image loading and
`createImageBitmap()` (for off-main-thread decoding). Live Server is still
recommended, but the frames also load when `index.html` is opened directly.

## Recommended specs
- Resolution: 1280x720 or 1920x1080
- Format: JPG (smaller file size) or PNG (if you need transparency)
- Keep total folder size reasonable (compress images) for fast page load
