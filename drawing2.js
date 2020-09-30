let drawing2 = function(p) {
  let WIDTH = 600;
  let HEIGHT = 600;
  const INCR = 2;
  let ypos = 0;
  let lines = [];

  let setup = function() {
    WIDTH = p.windowWidth;
    HEIGHT = p.windowHeight;

    p.frameRate(30);
    ypos = 0;
    lines = [];
    init();
  }

  function init() {
    lines.push({sx: 0, sy: 0, ex: WIDTH, ey: 0});
  }

  let draw = function() {
    if (ypos < HEIGHT) {
      let startx = 0;
      let starty = ypos;
      let lineIndex = 0;
      let newLines = [];

      //print("ypos=" + ypos);

      while (startx < WIDTH) {
        const {sx, sy, ex, ey} = lines[lineIndex];
        //print("ex=" + ex + " ey=" + ey);

        let endx = startx + p.floor(p.random()*300);
        let endy = starty;

        if (sy == ey) {
          endy += ((startx == 0) ? 0 : p.floor(p.floor(p.random()*20-10)/9)*10);
        }
        else {
          endy += ey - sy;
        }
        if (endx >= ex) {
          endx = ex;
          lineIndex++;
          //print("lineIndex++");
        }
        p.line(startx, starty, endx, endy);
        if (starty == endy & newLines.length > 0) {
          newLines[newLines.length - 1].ex = endx;
        }
        else {
          newLines.push({sx: startx, sy: starty, ex: endx, ey: endy});
        }
        startx = endx;
        starty = endy;
      }
      if (p.floor(p.floor(p.random()*20)/19) == 1) {
        //print("random9");
        lines = [];
        lines.push({sx: 0, sy: 0, ex: WIDTH, ey: 0});
      } else {
        lines = newLines;
      }
      ypos += INCR;
    }
  }

  return {setup, draw};
}
