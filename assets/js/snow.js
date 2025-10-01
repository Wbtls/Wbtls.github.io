<canvas id="sky"></canvas>

<script>
window.onload = function () {
  const canvas = document.getElementById("sky");
  const ctx = canvas.getContext("2d");

  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const maxFlakes = 100;
  const flakes = [];

  // Initialize flakes
  for (let i = 0; i < maxFlakes; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 5 + 2,
      d: Math.random() + 1,
    });
  }

  let angle = 0;

  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "white";
    ctx.shadowColor = "#00faff"; // Glow color
    ctx.shadowBlur = 15;         // Glow intensity
    ctx.beginPath();

    for (let i = 0; i < maxFlakes; i++) {
      const f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }

    ctx.fill();
    ctx.shadowBlur = 0; // Reset glow after drawing
    moveFlakes();
  }

  function moveFlakes() {
    angle += 0.01;
    for (let i = 0; i < maxFlakes; i++) {
      const f = flakes[i];
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 2;

      if (f.y > H) {
        flakes[i] = {
          x: Math.random() * W,
          y: 0,
          r: f.r,
          d: f.d,
        };
      }
    }
  }

  function animate() {
    drawFlakes();
    requestAnimationFrame(animate);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });

  animate();
};
</script>

