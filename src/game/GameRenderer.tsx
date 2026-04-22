import { useEffect, type RefObject } from "react";
import type { AvatarId, Pattern, Variant } from "../types";
import { getSpriteConfig, OBSTACLE_CONFIGS } from "../data/sprites";
import { SPRITE, OBSTACLES } from "../data/game";

const DEBUG = true; // set to false to disable hitboxes

type ObstacleType = "Cone" | "Construction" | "Construction_2";
type Lane = "left" | "mid" | "right";

interface Obstacle {
  id: number;
  type: ObstacleType;
  lane: Lane;
  progress: number;
}

interface GameRendererConfig {
  avatar: AvatarId;
  pattern: Pattern;
  variant: Variant;
  spriteXRef: { current: number };
  startedRef: { current: boolean };
  pathLeftRef: { current: number };
  pathRightRef: { current: number };
  onHit?: (damage: number) => void;
}

let obstacleIdCounter = 0;

const obstacleImages: Record<string, HTMLImageElement> = {};
for (const type of [...OBSTACLES.TYPES]) {
  const img = new Image();
  img.src = `/sprites/obstacles/${type}.png`;
  obstacleImages[type] = img;
}

export function useGameRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: GameRendererConfig,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const idleImg = new Image();
    const walkImg = new Image();
    idleImg.src = `/sprites/avatars/${config.avatar}/${config.avatar}_${config.variant}_${config.pattern}_idle.png`;
    walkImg.src = `/sprites/avatars/${config.avatar}/${config.avatar}_${config.variant}_${config.pattern}_walk.png`;

    let frame = 0;
    let tick = 0;
    let animFrame: number;
    let flipped = false;
    let lastX = config.spriteXRef.current;
    let obstacles: Obstacle[] = [];
    let spawnTimer = 0;
    let lastTs: number | null = null;

    const obstacleFrames: Record<string, number> = {};
    const obstacleTicks: Record<string, number> = {};

    function resize() {
      if (!canvas) return;
      if (
        canvas.width === canvas.offsetWidth &&
        canvas.height === canvas.offsetHeight
      )
        return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function getSpriteSize() {
      if (!canvas) return 100;
      const { width, height } = canvas;
      const isPortrait = height > width;
      const size = isPortrait
        ? width * SPRITE.SIZE_PORTRAIT
        : height * SPRITE.SIZE_LANDSCAPE;
      return Math.min(size, SPRITE.SIZE_MAX);
    }

    function getObsConfig() {
      if (!canvas) return OBSTACLES.PORTRAIT;
      return canvas.height > canvas.width
        ? OBSTACLES.PORTRAIT
        : OBSTACLES.LANDSCAPE;
    }

    function getLaneProps(lane: Lane, cfg: typeof OBSTACLES.PORTRAIT) {
      if (lane === "left")
        return {
          startX: cfg.LEFT_START_X,
          startY: cfg.LEFT_START_Y,
          endX: cfg.LEFT_END_X,
          endY: cfg.LEFT_END_Y,
        };
      if (lane === "right")
        return {
          startX: cfg.RIGHT_START_X,
          startY: cfg.RIGHT_START_Y,
          endX: cfg.RIGHT_END_X,
          endY: cfg.RIGHT_END_Y,
        };
      return {
        startX: cfg.MID_START_X,
        startY: cfg.MID_START_Y,
        endX: cfg.MID_END_X,
        endY: cfg.MID_END_Y,
      };
    }

    function spawnObstacle() {
      const lanes: Lane[] = ["left", "mid", "right"];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const type = OBSTACLES.TYPES[
        Math.floor(Math.random() * OBSTACLES.TYPES.length)
      ] as ObstacleType;
      obstacles.push({ id: ++obstacleIdCounter, type, lane, progress: 0 });
    }

    function updateObstacles(dt: number) {
      if (!config.startedRef.current) return;
      const cfg = getObsConfig();
      spawnTimer += dt;
      if (spawnTimer >= OBSTACLES.SPAWN_INTERVAL) {
        spawnTimer = 0;
        spawnObstacle();
      }
      obstacles = obstacles
        .map((obs) => ({
          ...obs,
          progress: obs.progress + cfg.SPEED * (dt / 1000),
        }))
        .filter((obs) => obs.progress < 1.1);
    }

    function checkCollisions() {
      if (!canvas) return;
      const cfg = getObsConfig();
      const spriteX = config.spriteXRef.current;
      const spriteSize = getSpriteSize();
      const w = canvas.width;
      const h = canvas.height;
      const bottomPos = spriteSize * SPRITE.BOTTOM_RATIO;
      const spriteY = ((h - spriteSize - bottomPos) / h) * 100;

      obstacles = obstacles.filter((obs) => {
        const lane = getLaneProps(obs.lane, cfg);
        const x = lane.startX + (lane.endX - lane.startX) * obs.progress;
        const y = lane.startY + (lane.endY - lane.startY) * obs.progress;
        const scale =
          cfg.START_SCALE + (cfg.END_SCALE - cfg.START_SCALE) * obs.progress;
        const size = cfg.COLLISION_SIZE * scale;
        const dx = Math.abs(x - spriteX) * (w / 100);
        const dy = Math.abs(y - spriteY) * (h / 100);
        const hit = dx < size && dy < size && obs.progress > 0.8;
        if (hit) {
          config.onHit?.(OBSTACLES.DAMAGE);
          return false;
        }
        return true;
      });
    }

    function drawObstacleSprite(
      type: ObstacleType,
      x: number,
      y: number,
      size: number,
    ) {
      const img = obstacleImages[type];
      const spriteCfg = OBSTACLE_CONFIGS[type];
      if (!img || !img.complete || img.naturalWidth === 0 || !spriteCfg) {
        ctx!.fillStyle = "rgba(255,100,100,0.6)";
        ctx!.beginPath();
        ctx!.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "#fff";
        ctx!.font = "10px monospace";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(type, x, y);
        return;
      }

      if (obstacleFrames[type] === undefined) obstacleFrames[type] = 0;
      if (obstacleTicks[type] === undefined) obstacleTicks[type] = 0;
      const ticksPerFrame = Math.round(60 / spriteCfg.fps);
      obstacleTicks[type]++;
      if (obstacleTicks[type] > ticksPerFrame) {
        obstacleTicks[type] = 0;
        obstacleFrames[type] =
          (obstacleFrames[type] + 1) % spriteCfg.totalFrames;
      }

      const col = obstacleFrames[type] % spriteCfg.cols;
      const row = Math.floor(obstacleFrames[type] / spriteCfg.cols);
      const scaleRatio = size / 100;
      const scaledW = spriteCfg.drawW * spriteCfg.scale * scaleRatio;
      const scaledH = spriteCfg.drawH * spriteCfg.scale * scaleRatio;
      const destX = x - scaledW / 2 + spriteCfg.offsetX * scaleRatio;
      const destY = y - scaledH / 2 + spriteCfg.offsetY * scaleRatio;

      ctx!.drawImage(
        img,
        col * spriteCfg.frameW,
        row * spriteCfg.frameH,
        spriteCfg.frameW,
        spriteCfg.frameH,
        destX,
        destY,
        scaledW,
        scaledH,
      );

      if (DEBUG) {
        ctx!.strokeStyle = "rgba(255,0,0,0.8)";
        ctx!.lineWidth = 2;
        ctx!.strokeRect(destX, destY, scaledW, scaledH);
      }
    }

    function drawObstacles() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const cfg = getObsConfig();
      const sorted = [...obstacles].sort((a, b) => a.progress - b.progress);

      for (const obs of sorted) {
        const lane = getLaneProps(obs.lane, cfg);
        const x =
          ((lane.startX + (lane.endX - lane.startX) * obs.progress) / 100) * w;
        const y =
          ((lane.startY + (lane.endY - lane.startY) * obs.progress) / 100) * h;
        const scale =
          cfg.START_SCALE + (cfg.END_SCALE - cfg.START_SCALE) * obs.progress;
        const size = 100 * scale;
        drawObstacleSprite(obs.type, x, y, size);
      }
    }

    function drawSprite() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const started = config.startedRef.current;
      const img = started ? walkImg : idleImg;
      if (!img.complete || img.naturalWidth === 0) return;

      const currentX = config.spriteXRef.current;
      if (currentX > lastX) flipped = true;
      if (currentX < lastX) flipped = false;
      lastX = currentX;

      const spriteSize = getSpriteSize();
      const cfg = getSpriteConfig(
        config.avatar,
        config.variant,
        started ? "walk" : "idle",
      );
      const ticksPerFrame = Math.round(60 / cfg.fps);

      tick++;
      if (tick > ticksPerFrame) {
        tick = 0;
        frame = (frame + 1) % cfg.totalFrames;
      }

      const col = frame % cfg.cols;
      const row = Math.floor(frame / cfg.cols);
      const scaleRatio = spriteSize / 100;
      const scaledW = cfg.drawW * cfg.scale * scaleRatio;
      const scaledH = cfg.drawH * cfg.scale * scaleRatio;
      const bottomPos = spriteSize * SPRITE.BOTTOM_RATIO;
      const destX = (currentX / 100) * w - spriteSize / 2;
      const destY = h - spriteSize - bottomPos;
      const x = cfg.offsetX * scaleRatio + (spriteSize - scaledW) / 2;
      const y = cfg.offsetY * scaleRatio + (spriteSize - scaledH) / 2;

      ctx.save();
      if (flipped) {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(
          img,
          col * cfg.frameW,
          row * cfg.frameH,
          cfg.frameW,
          cfg.frameH,
          w - destX - x - scaledW,
          destY + y,
          scaledW,
          scaledH,
        );
        if (DEBUG) {
          ctx.strokeStyle = "rgba(0,255,0,0.8)";
          ctx.lineWidth = 2;
          ctx.strokeRect(w - destX - x - scaledW, destY + y, scaledW, scaledH);
        }
      } else {
        ctx.drawImage(
          img,
          col * cfg.frameW,
          row * cfg.frameH,
          cfg.frameW,
          cfg.frameH,
          destX + x,
          destY + y,
          scaledW,
          scaledH,
        );
        if (DEBUG) {
          ctx.strokeStyle = "rgba(0,255,0,0.8)";
          ctx.lineWidth = 2;
          ctx.strokeRect(destX + x, destY + y, scaledW, scaledH);
        }
      }
      ctx.restore();
    }

    function loop(ts: number) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;
      resize();
      updateObstacles(dt);
      checkCollisions();
      if (!canvas) return;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      drawObstacles();
      drawSprite();
      animFrame = requestAnimationFrame(loop);
    }

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [config.avatar, config.pattern, config.variant]);
}
