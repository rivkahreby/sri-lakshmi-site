// ===== Scroll-scrubbed frame sequence animation (upgraded) =====
// Add your exploded-view phone frames to assets/frames/ named:
//   frame-0001.jpg, frame-0002.jpg ... frame-00XX.jpg
// Update FRAME_COUNT below to match how many frames you have.
//
// Upgrades in this version:
//   1. Off-main-thread decode via createImageBitmap() — keeps scrubbing smooth
//   2. Progressive preload — first frame renders immediately, rest load in background
//   3. prefers-reduced-motion fallback — shows a static exploded frame instead of scrubbing
//   4. Smoother frame interpolation using requestAnimationFrame instead of drawing
//      synchronously inside the scroll handler

(function () {
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById("frame-canvas");
  const ctx = canvas.getContext("2d");
  const heroSection = document.querySelector(".hero");
  // ---- CONFIG: update these to match your frame set ----
  const FRAME_COUNT = 40; // total number of frames in assets/frames/
  const FRAME_PATH = "assets/frames/";
  const FRAME_PREFIX = "frame-";
  const FRAME_EXT = ".jpg";
  const PAD_LENGTH = 4; // frame-0001.jpg -> 4-digit padding
  const STATIC_FALLBACK_FRAME = FRAME_COUNT; // which frame to show for reduced-motion users
  // --------------------------------------------------------

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function frameSrc(index) {
    const num = String(index).padStart(PAD_LENGTH, "0");
    return `${FRAME_PATH}${FRAME_PREFIX}${num}${FRAME_EXT}`;
  }

  // Holds decoded bitmaps (or null until loaded)
  const bitmaps = new Array(FRAME_COUNT).fill(null);
  let firstFrameReady = false;

  // Target vs. current frame index — we ease toward the target each rAF tick
  // instead of snapping directly, so rapid scroll doesn't feel jumpy.
  let targetFrame = 1;
  let currentFrameFloat = 1;
  let needsRender = false;

  // ---- Off-main-thread decode + progressive load ----
  async function loadFrame(index) {
    try {
      const response = await fetch(frameSrc(index));
      if (!response.ok) throw new Error(`Frame ${index} missing`);
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob); // decodes off the main thread
      bitmaps[index - 1] = bitmap;

      if (!firstFrameReady) {
        firstFrameReady = true;
        requestRender();
      }
    } catch (err) {
      console.warn(`Frame not found: ${frameSrc(index)}. Add your frames to assets/frames/`);
    }
  }

  function preloadFrames() {
    // Load frame 1 first (blocking-ish, so hero isn't blank), then the rest
    // progressively in the background without blocking scroll interaction.
    loadFrame(1).then(() => {
      for (let i = 2; i <= FRAME_COUNT; i++) {
        loadFrame(i);
      }
    });
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestRender();
  }

  function drawBitmap(bitmap) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = bitmap.width / bitmap.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight);
  }

  function nearestLoadedBitmap(index) {
    // If the exact frame isn't decoded yet, fall back to the closest one
    // that IS loaded, so we never draw a blank frame mid-scrub.
    if (bitmaps[index - 1]) return bitmaps[index - 1];
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (bitmaps[index - 1 - offset]) return bitmaps[index - 1 - offset];
      if (bitmaps[index - 1 + offset]) return bitmaps[index - 1 + offset];
    }
    return null;
  }

  function requestRender() {
    needsRender = true;
  }

  // ---- rAF render loop: eases currentFrameFloat toward targetFrame ----
  function tick() {
    const diff = targetFrame - currentFrameFloat;
    if (Math.abs(diff) > 0.01) {
      currentFrameFloat += diff * 0.25; // easing factor — smooths rapid scroll jumps
      needsRender = true;
    }

    if (needsRender) {
      const roundedIndex = Math.max(1, Math.min(FRAME_COUNT, Math.round(currentFrameFloat)));
      const bitmap = nearestLoadedBitmap(roundedIndex);
      if (bitmap) drawBitmap(bitmap);
      needsRender = false;
    }

    requestAnimationFrame(tick);
  }

  function initScrollTrigger() {
    ScrollTrigger.create({
      // Start at the hero, but keep the frame sequence running until page bottom.
      trigger: heroSection,
      start: "top top",
      end: () => `+=${Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      )}`,
      scrub: true,
      onUpdate: (self) => {
        targetFrame = Math.max(
          1,
          Math.min(FRAME_COUNT, self.progress * (FRAME_COUNT - 1) + 1)
        );
      },
    });
  }

  function initReducedMotionFallback() {
    // Show a single static frame, no scroll-linked animation, no rAF loop.
    loadFrame(STATIC_FALLBACK_FRAME).then(() => {
      const bitmap = bitmaps[STATIC_FALLBACK_FRAME - 1];
      if (bitmap) drawBitmap(bitmap);
    });
  }

  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();

    if (prefersReducedMotion) {
      // Respect the user's OS-level motion preference: no scrubbing, no rAF loop.
      initReducedMotionFallback();
      return;
    }

    preloadFrames();
    initScrollTrigger();
    window.addEventListener("load", () => ScrollTrigger.refresh());
    requestAnimationFrame(tick);
  });
})();
