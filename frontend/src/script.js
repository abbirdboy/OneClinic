const player = document.querySelector("mux-player");
const video = player.media.nativeEl;
const ambientCtx = document.querySelector("canvas").getContext("2d");
ambientCtx.filter = "blur(40px)";

const poster = document.createElement("img");
poster.src = player.poster;

let width = "100%";
let height = "100%";

video.addEventListener("loadedmetadata", function () {
  width = video.videoWidth / 4;
  height = video.videoHeight / 4;

  ambientCtx.canvas.width = width;
  ambientCtx.canvas.height = height;
  ambientCtx.filter = "blur(40px)";
  ambientCtx.drawImage(poster, 0, 0, width, height);
});

function paintCanvas() {
  if (video.paused || video.ended) {
    return;
  }

  ambientCtx.drawImage(video, 0, 0, width, height);
  video.requestVideoFrameCallback(paintCanvas);
}

video.addEventListener("play", paintCanvas, false);
ambientCtx.drawImage(poster, 0, 0, width, height);
