let drawing4 = function(p) {
  let WIDTH = 600;
  let HEIGHT = 600;
  let model;
  let x, y, endx, endy;
  let prevPen = 'down';
  let nextPen;
  let c;

  let setup = function() {
    WIDTH = p.windowWidth;
    HEIGHT = p.windowHeight;
    endx = x = WIDTH/2;
    endy = y = HEIGHT/2;

    model = ml5.sketchRNN('rabbit', modelReady);
    c = p.color(0,0,0);
    p.strokeWeight(1);
  }

  function modelReady() {
    console.log('SketchRNN model loaded');
    model.reset();
    model.generate(gotSketch);
  }

  function gotSketch(err, res) {
    if (err) {
      console.log('Error!');
    }
    else {
      endx = x + res.dx;
      endy = y + res.dy;
      nextPen = res.pen;
    }
  }

  let draw = function() {
    if (x != endx || y != endy) {
      p.stroke(c);
      if (prevPen == 'up') {
        p.line(x,y,endx,endy);
      }
      x = endx;
      y = endy;
      if (prevPen == 'end') {
        model.reset();
        x = WIDTH/2;
        y = HEIGHT/2;
        c = p.color(p.random(0,150), p.random(0,150), p.random(0,150));
      }
      prevPen = nextPen;
      model.generate(gotSketch);
    }
  }

  return {setup, draw};
}
