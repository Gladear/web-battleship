class AdvancedCtx {
  constructor(ctx) {
    this.ctx = ctx;
    this.f = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = 0;
    this.grdOcean;
  }

  getCtx() {
    return this.ctx;
  }

  setCtx(ctx) {
    this.ctx = ctx;
  }

  getF() {
    return this.f;
  }

  setF(f) {
    this.f = f;
  }

  getOffsetX() {
    return this.offsetX;
  }

  setOffsetX(offsetX) {
    this.offsetX = offsetX;
  }

  getOffsetY() {
    return this.offsetY;
  }

  setOffsetY(offsetY) {
    this.offsetY = offsetY;
  }

  setParams(x, y, f, rotation) {
    this.offsetX = x;
    this.offsetY = y;
    this.f = f;
    this.setRotation(rotation);
  }

  getRotation() {
    return (this.rotation / Math.PI) * 180;
  }

  setRotation(rotation) {
    this.rotation = (rotation / 180) * Math.PI;
  }

  xyToDexy(x, y) {
    var dx = x * this.f;
    var dy = y * Math.abs(this.f);

    var dex = dx * Math.cos(this.rotation) - dy * Math.sin(this.rotation);
    var dey = dx * Math.sin(this.rotation) + dy * Math.cos(this.rotation);

    return [dex, dey];
  }

  moveTo(x, y) {
    var dexy = this.xyToDexy(x, y);

    this.ctx.moveTo(dexy[0] + this.offsetX, dexy[1] + this.offsetY);
  }

  lineTo(x, y) {
    var dexy = this.xyToDexy(x, y);

    this.ctx.lineTo(dexy[0] + this.offsetX, dexy[1] + this.offsetY);
  }

  quadraticCurveTo(x1, y1, x2, y2) {
    var dexy1 = this.xyToDexy(x1, y1);
    var dexy2 = this.xyToDexy(x2, y2);

    this.ctx.quadraticCurveTo(
      dexy1[0] + this.offsetX,
      dexy1[1] + this.offsetY,
      dexy2[0] + this.offsetX,
      dexy2[1] + this.offsetY,
    );
  }

  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    var dexy1 = this.xyToDexy(x1, y1);
    var dexy2 = this.xyToDexy(x2, y2);
    var dexy3 = this.xyToDexy(x3, y3);

    this.ctx.bezierCurveTo(
      dexy1[0] + this.offsetX,
      dexy1[1] + this.offsetY,
      dexy2[0] + this.offsetX,
      dexy2[1] + this.offsetY,
      dexy3[0] + this.offsetX,
      dexy3[1] + this.offsetY,
    );
  }

  begin(w, cs, cf) {
    this.ctx.beginPath();
    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = cs;
    this.ctx.fillStyle = cf;
  }

  fillRect(x, y, w, h) {
    var dx = x * this.f;
    var dy = y * this.f;

    var dex = dx * Math.cos(this.rotation) - dy * Math.sin(this.rotation);
    var dey = dy * Math.sin(this.rotation) + dy * Math.cos(this.rotation);

    this.ctx.fillRect(dex + this.offsetX, dey + this.offsetY, w * this.f, h * this.f);
  }

  rect(x, y, w, h) {
    var dx = x * this.f;
    var dy = y * this.f;

    var dex = dx * Math.cos(this.rotation) - dy * Math.sin(this.rotation);
    var dey = dy * Math.sin(this.rotation) + dy * Math.cos(this.rotation);

    this.ctx.rect(dex + this.offsetX, dey + this.offsetY, w * this.f, h * this.f);
  }

  stroke() {
    this.ctx.stroke();
  }

  fill() {
    this.ctx.fill();
  }

  write(txt, c, l, x, y) {
    var dx = x * this.f;
    var dy = y * this.f;

    var dex = dx * Math.cos(this.rotation) - dy * Math.sin(this.rotation);
    var dey = dy * Math.sin(this.rotation) + dy * Math.cos(this.rotation);

    this.ctx.font = l + 'px Arial';
    this.ctx.fillStyle = c;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(txt, dex + this.offsetX, dey + this.offsetY);
  }
}
