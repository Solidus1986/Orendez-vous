import paper from 'paper';

export default function Sketch() {

   window.onload = function() {
       paper.install(window);
       paper.setup('paper-canvas');

       var width, height, center;
var points = 10;
var path = new Path();
var mousePos = view.center / 2;
path.fillColor = 'black';
initializePath();

function initializePath() {
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
	path.segments = [];
	path.add(view.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(view.bounds.bottomRight);
	path.fullySelected = true;
}
       // draw or call your drawing functions here

       view.onFrame = draw;
   }

   function draw(event) {
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    for (var i = 1; i < points; i++) {
      var sinSeed = event.count + (i + i % 10) * 100;
      var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
      var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
      path.segments[i].point.y = yPos;
    }
    if (smooth)
      path.smooth({ type: 'continuous' });
  }
       
   }

   // Most return null
   return null;
}
