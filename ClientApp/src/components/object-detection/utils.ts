export const draw = (detection: any, ctx: any) => {
  for (let i = 0; i < detection.length; i++) {
    ctx.beginPath();
    ctx.rect(...detection[i].bbox);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FF0000';
    ctx.fillStyle = '#FF0000';
    ctx.stroke();
    ctx.fillText(
      detection[i].score.toFixed(3) + ' ' + detection[i].class, detection[i].bbox[0],
      detection[i].bbox[1] > 10 ? detection[i].bbox[1] - 5 : 10
    );
  }
}
