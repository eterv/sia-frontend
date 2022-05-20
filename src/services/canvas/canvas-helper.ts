export interface Point {
  x: number;
  y: number;
}

export interface Rect extends Point {
  w: number;
  h: number;
  startX?: number;
  startY?: number;
}

export interface DrawStyle {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

export class CanvasHelper {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.el = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
  }

  drawCircle(center: Point, radius: number, style: Partial<DrawStyle>) {
    const { x, y } = center;
    const { backgroundColor, borderColor, borderWidth } = style;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);

    borderColor && (this.ctx.strokeStyle = borderColor);
    borderWidth && (this.ctx.lineWidth = borderWidth);
    backgroundColor && (this.ctx.fillStyle = backgroundColor);

    this.ctx.fill();
    this.ctx.stroke();
  }

  drawLine(start: Point, end: Point, style: Partial<DrawStyle>) {
    const { x, y } = start;
    const { x: x2, y: y2 } = end;
    const { borderColor, borderWidth } = style;

    this.ctx.beginPath();

    borderColor && (this.ctx.strokeStyle = borderColor);
    borderWidth && (this.ctx.lineWidth = borderWidth);

    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawRect(rect: Rect, style: Partial<DrawStyle>) {
    const { x, y, w, h } = rect;
    const { backgroundColor, borderColor, borderWidth } = style;

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);

    borderColor && (this.ctx.strokeStyle = borderColor);
    borderWidth && (this.ctx.lineWidth = borderWidth);
    backgroundColor && (this.ctx.fillStyle = backgroundColor);

    this.ctx.fill();
    this.ctx.stroke();
  }

  drawAnchors(rect: Rect, style: Partial<DrawStyle>) {
    const start: Point = { x: rect.x + rect.w / 2, y: rect.y };
    const end: Point = { x: start.x, y: start.y - 32 };

    this.drawLine(start, end, style);
    this.drawCircle(end, (16 - 3) / 2, style);

    this.getSizeAnchorRects(rect).forEach((r) => {
      this.drawRect(r, style);
    });
  }

  getSizeAnchorRects(rect: Rect): Rect[] {
    const { x, y, w, h } = rect;
    const rad = (16 - 3) / 2;

    return [
      this.getAroundSqureaRect({ x, y }, rad),
      this.getAroundSqureaRect({ x: x + w / 2, y }, rad),
      this.getAroundSqureaRect({ x: x + w, y }, rad),
      this.getAroundSqureaRect({ x: x + w, y: y + h / 2 }, rad),
      this.getAroundSqureaRect({ x: x + w, y: y + h }, rad),
      this.getAroundSqureaRect({ x: x + w / 2, y: y + h }, rad),
      this.getAroundSqureaRect({ x, y: y + h }, rad),
      this.getAroundSqureaRect({ x, y: y + h / 2 }, rad),
    ];
  }

  getAroundSqureaRect(center: Point, radius: number): Rect {
    return {
      x: center.x - radius,
      y: center.y - radius,
      w: radius * 2,
      h: radius * 2,
    };
  }
}
