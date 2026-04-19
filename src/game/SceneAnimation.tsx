import { useEffect } from "react";
import type React from "react";

const spd = 1.5;

const VS = `attribute vec2 p;attribute vec2 u;varying vec2 v;void main(){gl_Position=vec4(p,0,1);v=u;}`;
const FS = `precision mediump float;uniform sampler2D t;varying vec2 v;
void main() {
  float y = v.y;
  if (y < 0.5) { gl_FragColor = vec4(0.0); return; }
  
  float perspective = (y - 0.5) * 2.0;
  float width = mix(2.9, 0.5, perspective);
  float x = (v.x - 0.5) / width + 0.5;
  
  if (x < 0.0 || x > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }
  
  gl_FragColor = texture2D(t, vec2(x, v.y));
}`;

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

export function useSceneAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      //alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const offC = document.createElement("canvas");
    const oc = offC.getContext("2d")!;

    const movingPath = new Image();
    movingPath.src = "/scenes/MovingPath.png";

    function mkS(src: string, type: number) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const pr = gl.createProgram()!;
    gl.attachShader(pr, mkS(VS, gl.VERTEX_SHADER));
    gl.attachShader(pr, mkS(FS, gl.FRAGMENT_SHADER));
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const vb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const ap = gl.getAttribLocation(pr, "p");
    const au = gl.getAttribLocation(pr, "u");
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(au);
    gl.vertexAttribPointer(au, 2, gl.FLOAT, false, 16, 8);

    const ut = gl.getUniformLocation(pr, "t");
    const tx = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tx);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((p) =>
      gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE),
    );
    [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach((p) =>
      gl.texParameteri(gl.TEXTURE_2D, p, gl.LINEAR),
    );
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let bgOff = 0;
    let last: number | null = null;
    let animFrame: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      offC.width = canvas.width;
      offC.height = canvas.height;
    }

    function loop(ts: number) {
      if (!last) last = ts;
      const dt = Math.min(ts - last, 50);
      last = ts;
      bgOff += spd * (dt / 16);

      const w = canvas!.width;
      const h = canvas!.height;

      if (w === 0 || h === 0 || offC.width === 0 || offC.height === 0) {
        animFrame = requestAnimationFrame(loop);
        return;
      }

      if (!movingPath.complete || movingPath.naturalWidth === 0) {
        animFrame = requestAnimationFrame(loop);
        return;
      }

      const dynamicBGH = h * 1.5;
      const o = bgOff % dynamicBGH;

      oc.clearRect(0, 0, w, h);
      for (let i = -1; i < 3; i++) {
        oc.drawImage(movingPath, 0, i * dynamicBGH - o, w, dynamicBGH);
      }

      if (offC.width === 0 || offC.height === 0) {
        animFrame = requestAnimationFrame(loop);
        return;
      }

      gl.bindTexture(gl.TEXTURE_2D, tx);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offC);
      gl.uniform1i(ut, 0);
      gl.viewport(0, -h * 0.6, w, h + 98);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animFrame = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (!movingPath.complete || movingPath.naturalWidth === 0) return;
      resize();
      cancelAnimationFrame(animFrame);
      last = null;
      animFrame = requestAnimationFrame(loop);
    }

    movingPath.onload = startLoop;
    movingPath.onerror = () => console.log("movingPath failed");
    if (movingPath.complete && movingPath.naturalWidth > 0) startLoop();

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);
}
