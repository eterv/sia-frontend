import { css } from '@emotion/react';
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { CanvasHelper, DrawStyle, Rect } from '@/services/canvas/canvas-helper';
import { useLabelingStore } from '@/store';

interface PhotoResult {
  url: string;
}

const style = css`
  position: relative;
  flex: 1;
  overflow: auto;

  background: white;

  canvas {
    position: absolute;
    left: 0;
    top: 0;

    &:focus {
      outline: none;
    }

    &.create {
      cursor: crosshair;
    }
  }
`;

const labelStyle: DrawStyle = {
  backgroundColor: 'rgba(86, 104, 217, 0.2)',
  borderColor: '#5668d9',
  borderWidth: 3,
};

const labelAnchorStyle: DrawStyle = {
  ...labelStyle,
  backgroundColor: 'white',
};

export default function Board() {
  const mode = useLabelingStore((s) => s.mode);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [c, setC] = useState<CanvasHelper>(null as any);
  const startPos = useRef([0, 0]);
  const isMouseDown = useRef(false);

  const image = useRef<HTMLImageElement>(new Image());
  const labels = useRef<Rect[]>([]);
  const selectedLabels = useRef<number[]>([]);

  const redraw = useCallback(() => {
    c.clearAll();
    c.ctx.drawImage(image.current, 0, 0);

    labels.current.forEach((labelRect, i) => {
      c.drawRect(labelRect, labelStyle);

      if (selectedLabels.current.includes(i)) {
        c.drawAnchors(labelRect, labelAnchorStyle);
      }
    });
  }, [c]);

  useEffect(() => {
    /* eslint-disable-next-line */
    setC(new CanvasHelper(canvasRef.current!));
  }, []);

  const { isLoading, error, data } = useQuery<PhotoResult[]>(
    'photo',
    async () => {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/albums/1/photos?id=1'
      );
      return res.json();
    }
  );

  useEffect(() => {
    if (isLoading || error || !data) return;

    const img = image.current;

    img.addEventListener('load', () => {
      c.el.width = img.width;
      c.el.height = img.height;

      redraw();
    });

    image.current.src = data[0]?.url;
  }, [c, data, error, isLoading, redraw]);

  const getLabelRectByPoint = (x: number, y: number) => {
    return labels.current.findIndex((r) => {
      const [x2, y2] = [r.x + r.w, r.y + r.h];
      return x > r.x && x < x2 && y > r.y && y < y2;
    });
  };

  const handleMouseDown = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      startPos.current = [x, y];
      isMouseDown.current = true;

      if (mode === 'select') {
        const currIndex = getLabelRectByPoint(x, y);
        if (currIndex >= 0) {
          selectedLabels.current.push(currIndex);

          selectedLabels.current.forEach((index) => {
            const box = labels.current[index];
            box.startX = box.x;
            box.startY = box.y;
          });
        } else {
          selectedLabels.current = [];
        }

        redraw();
      } else {
        labels.current.push({
          x,
          y,
          w: 0,
          h: 0,
        });
      }
    },
    [mode, redraw]
  );

  const handleMouseMove = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (!isMouseDown.current) return;

      const pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

      const d = [pos[0] - startPos.current[0], pos[1] - startPos.current[1]];
      const w = Math.abs(d[0]);
      const h = Math.abs(d[1]);

      if (mode === 'select') {
        selectedLabels.current.forEach((index) => {
          const box = labels.current[index];
          box.x = box.startX! + d[0];
          box.y = box.startY! + d[1];
        });
      } else {
        const last = labels.current[labels.current.length - 1];
        last.x = d[0] > 0 ? startPos.current[0] : pos[0];
        last.y = d[1] > 0 ? startPos.current[1] : pos[1];
        last.w = w;
        last.h = h;
      }

      redraw();
    },
    [mode, redraw]
  );

  const handleMouseUp = useCallback<
    MouseEventHandler<HTMLCanvasElement>
  >(() => {
    if (mode === 'create') {
      const last = labels.current[labels.current.length - 1];
      if (last.w < 5 || last.h < 5) {
        labels.current.pop();
        redraw();
      }
    }

    isMouseDown.current = false;
  }, [mode, redraw]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        selectedLabels.current
          .sort((a, b) => b - a)
          .forEach((index) => {
            labels.current.splice(index, 1);
          });

        selectedLabels.current = [];
        redraw();
      }
    },
    [redraw]
  );

  return (
    <div css={style}>
      <canvas
        className={mode}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
    </div>
  );
}
