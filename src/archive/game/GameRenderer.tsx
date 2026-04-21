import { useEffect } from "react";
import type React from "react";
import type { AvatarId, Pattern, Variant } from "../types";
import { getSpriteConfig } from "../data/sprites";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  type: string;
  lane: number;
}

export interface ObstacleConfig {
  lanes: number[];
  spawnInterval: number;
  speed: number;
  size: number;
  damage: number;
}

interface GameRendererConfig {
  avatar: AvatarId;
  pattern: Pattern;
  variant: Variant;
  spriteXRef: React.MutableRefObject<number>;
  startedRef: React.MutableRefObject<boolean>;
  obstaclesRef: React.MutableRefObject<Obstacle[]>;
  obstacleConfig?: ObstacleConfig;
  onHit?: (damage: number) => void;
}

const DEFAULT_OBSTACLE_CONFIG: ObstacleConfig = {
  lanes: [35, 50, 65],
  spawnInterval: 2000,
  speed: 0.3,
  size: 40,
  damage: 5,
};

let obstacleIdCounter = 0;

export function useGameRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  config: GameRendererConfig,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const obsConfig = config.obstacleConfig ?? DEFAULT_OBSTACLE_CONFIG;

    const idleImg = new Image();
    const walkImg = new Image();
    idleImg.src = `/sprites/avatars/${config.avatar}/${config.avatar}_${config.variant}_${config.pattern}_idle.png`;
    walkImg.src = `/sprites/avatars/${config.avatar}/${config.avatar}_${config.variant}_${config.pattern}_walk.png`;

    let frame = 0;
    let tick = 0;
    let animFrame: number;
    let flipped = false;
    let lastX = config.spriteXRef.current;
    let spawnTimer = 0;
    let lastTs: number | null = null;

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
      const size = isPortrait ? width * 0.4 : height * 0.25;
      return Math.min(size, 150);
    }

    function spawnObstacle() {
      const lanes = obsConfig.lanes;
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const types = ["rock", "bush", "puddle"];
      const type = types[Math.floor(Math.random() * types.length)];
      config.obstaclesRef.current.push({
        id: ++obstacleIdCounter,
        x: lane,
        y: -5,
        type,
        lane,
      });
    }

    function updateObstacles(dt: number) {
      if (!config.startedRef.current) return;

      // spawn
      spawnTimer += dt;
      if (spawnTimer >= obsConfig.spawnInterval) {
        spawnTimer = 0;
        spawnObstacle();
      }

      // move down
      config.obstaclesRef.current = config.obstaclesRef.current
        .map((obs) => ({ ...obs, y: obs.y + obsConfig.speed }))
        .filter((obs) => obs.y < 110);
    }

    function checkCollisions() {
      if (!canvas) return;
      const spriteX = config.spriteXRef.current;
      const spriteSize = getSpriteSize();
      const w = canvas.width;
      const h = canvas.height;
      const bottomPos = spriteSize * 0.2;
      const spriteY = ((h - spriteSize - bottomPos) / h) * 100;

      config.obstaclesRef.current = config.obstaclesRef.current.filter(
        (obs) => {
          const dx = Math.abs(obs.x - spriteX) * (w / 100);
          const dy = Math.abs(obs.y - spriteY) * (h / 100);
          const hit = dx < obsConfig.size && dy < obsConfig.size;
          if (hit) {
            config.onHit?.(obsConfig.damage);
            return false;
          }
          return true;
        },
      );
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
      const bottomPos = spriteSize * 0.2;
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
      }
      ctx.restore();
    }

    function drawObstacles() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      for (const obs of config.obstaclesRef.current) {
        const x = (obs.x / 100) * w;
        const y = (obs.y / 100) * h;
        const size = obsConfig.size;

        ctx.fillStyle = "rgba(255,100,100,0.6)";
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(obs.type, x, y);
      }
    }

    function loop(ts: number) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;

      resize();
      updateObstacles(dt);
      checkCollisions();

      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawObstacles();
      drawSprite();

      animFrame = requestAnimationFrame(loop);
    }

    animFrame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrame);
  }, [config.avatar, config.pattern, config.variant]);
}
