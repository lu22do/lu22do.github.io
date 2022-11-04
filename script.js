let sketch = function(p) {
  let d = [
    new drawing1(p),
    new drawing2(p),
    new drawing3(p),
    new drawing4(p),
    new drawing5(p),
  ];
  let index = 4;

  p.setup = function(){
    p.createCanvas(p.displayWidth, p.displayHeight);
    d[index].setup();
  }

  p.draw = function(){
    d[index].draw();
  }

  p.preload = function(){
    if (d[index].preload) {
      d[index].preload();
    }
  }

  p.mouseClicked = function() {
    let go_to_next_drawing = true;

    if (d[index].next) {
      go_to_next_drawing = d[index].next();
    }
    if (go_to_next_drawing) {
      p.clear();
      index++;
      if (index >= d.length) {
        index = 0;
      }
      d[index].setup();
    }
  }
}
