// using https://learn.ml5js.org/#/reference/sketchrnn, one SketchRNN model is randomly selected and drawn over and over with different color

let drawing3 = function(p) {
  let WIDTH = 600;
  let HEIGHT = 600;
  let model;
  let x, y, endx, endy;
  let prevPen = 'down';
  let nextPen;
  let c;
  let models = [
    'beeflower',
    'bicycle',
    'bird',
    'book',
    'brain',
    'bridge',
    'bulldozer',
    'bus',
    'butterfly',
    'cactus',
    'calendar',
    'castle',
    'cat',
    'catbus',
    'catpig',
    'chair',
    'couch',
    'crab',
    'crabchair',
    'crabrabbitfacepig',
    'cruise_ship',
    'diving_board',
    'dog',
    'dogbunny',
    'dolphin',
    'duck',
    'elephant',
    'elephantpig',
    'eye',
    'face',
  ];

  let setup = function() {
    WIDTH = p.windowWidth;
    HEIGHT = p.windowHeight;
    endx = x = WIDTH/2;
    endy = y = HEIGHT/2;

    model = ml5.sketchRNN(models[p.floor(p.random(models.length))], modelReady);
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
      if (prevPen == 'down') {
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
