let drawing1 = function(p) {

  let WIDTH = 600;
  let HEIGHT = 600;
  //createCanvas(displayWidth, displayHeight);

  const NB_POINTS = 4;
  let done = false;
  let startX = [];
  let startY = [];
  let phase = [0, 0, 0, 0];
  let INC = 6;
  let dir = [0, 0, 0, 0];
  let length = [-1,-1,-1,-1];

  let setup = function(){
    WIDTH = p.windowWidth;
    HEIGHT = p.windowHeight;

    done = false;
    startX = [];
    startY = [];
    phase = [0, 0, 0, 0];
    INC = 6;
    dir = [0, 0, 0, 0];
    length = [-1,-1,-1,-1];

    // start from left
    startX[0] = 0;
    startY[0] = p.floor(HEIGHT / 8 + HEIGHT / 4 * p.random());
    dir[0] = 1;

    // start from top
    startX[1] = p.floor(WIDTH * 5 / 8 + WIDTH / 4 * p.random());
    startY[1] = - 1500;
    dir[1] = 2;

    // start from right
    startX[2] = WIDTH + 2000;
    startY[2] = p.floor(HEIGHT * 5 / 8 + HEIGHT / 4 * p.random());
    dir[2] = 3;

    // start from bottom
    startX[3] = p.floor(WIDTH * 5 / 8 + WIDTH / 4 * p.random());
    startY[3] = HEIGHT + 2000;
    dir[3] = 0;

    //print(startX);
    //print(startY);
  }

  function getNext(x, y, dir) {
    let resX = x;
    let resY = y;
    let inc = INC + p.random() * INC;
    switch (dir) {
      case 0: // up
        resY -= inc;
        if (resY < 0) {
          return null;
        }
        break;
      case 1: // right
        resX += inc;
        if (resX > WIDTH) {
          return null;
        }
        break;
      case 2: // down
        resY += inc;
        if (resY > HEIGHT) {
          return null;
        }
        break;
      case 3: // left
        resX -= inc;
        if (resX < 0) {
          return null;
        }
        break;
    }
    return {
      endX: resX,
      endY: resY
    };
  }

  let draw = function() {
    p.stroke(0);
    for (let i = 0; i < 4; i++) {
      let res = draw3(startX[i], startY[i], i);
      startX[i] = res.startX;
      startY[i] = res.startY;
    }
  }

  function draw3(startX, startY, i) {
    let endX = startX;
    let endY = startY;

    if (phase[i] == 0) {
      if (((dir[i] == 1) && (startX > (WIDTH - WIDTH/3))) ||
          ((dir[i] == 3) && (startX < (WIDTH/3))) ||
          ((dir[i] % 2 == 0) && (startY > HEIGHT/4 && startY < (HEIGHT - HEIGHT/4)))) {
        phase[i] = 1;
        //p.print("i=" +i + "/startX=" + startX + "/startY=" + startY);
      }
    }

    res = getNext(startX, startY, dir[i]);
    if (res != null) {
      endX = res.endX;
      endY = res.endY;
    }
    //   print("endX = " + endX);
    //   print("endY = " + endY);

    if (dir[i] == 0 || dir[i] == 2) {
      length[i] -= p.abs(startY - endY);
    } else {
      length[i] -= p.abs(startX - endX);
    }
    if (length[i] < 0 || !res) {
      if (phase[i] == 1) {
        dir[i] = p.floor(p.random() * 4);
      }
      length[i] = p.floor(p.random() * 25);
    }

    p.line(startX, startY, endX, endY);
    return {
      startX: endX,
      startY: endY
    };
  }

  return {setup, draw};
}
