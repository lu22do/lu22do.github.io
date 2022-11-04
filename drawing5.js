let drawing5 = function(p) {
  let WIDTH = 600;
  let HEIGHT = 600;
  let img = [];
  let current = 0;

  let setup = function() {
    WIDTH = p.windowWidth;
    HEIGHT = p.windowHeight;
  }

  let preload = function() {
    for (let i = 0; i < 10; i++) {
      img[i] = p.loadImage('assets/' + (i + 1) + '.png');
    }
  }

  let draw = function() {
    p.image(img[current], WIDTH/2-200, HEIGHT/2-400, 400, 800);
  }
 
  let next = function() {
   if (current < img.length-1) {
     current++;
     draw();
     return false;
   }
   return true;
  }

  return {setup, draw, preload, next};
}
