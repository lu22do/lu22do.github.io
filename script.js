let sketch = function(p) {
  let d = [
    new drawing1(p),
    new drawing2(p),
    new drawing3(p),
    new drawing4(p),
  ];
  let index = 2;

  p.setup = function(){
    p.createCanvas(p.displayWidth, p.displayHeight);
    d[index].setup();
  }

  p.draw = function(){
    d[index].draw();
  }

  p.mouseClicked = function() {
    p.clear();
    index++;
    if (index >= d.length) {
      index = 0;
    }
    d[index].setup();
  }
}
