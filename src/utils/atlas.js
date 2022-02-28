var tw  = 100; // Texture Atlas Tile Width (pixels)
var th  = 100; // Texture Atlas Tile Height (pixels)
var tx  =  3; // tile index x (relative) (column)
var ty  =  2; // tile index y (relative) (row)
var src = 'http://orteil.dashnet.org/cookieclicker/img/icons.png';

// Calculations -- common code to sub-image of texture atlas
var div = document.getElementById('clip');
var x   = (tx*tw); // tile offset x position (absolute)
var y   = (ty*th); // tile offset y position (absolute)
div.style.width              = tw + 'px';
div.style.height             = th + 'px';
div.style.backgroundImage    = "url('" + src + "')";
div.style.backgroundPosition = '-' + x + 'px -' + y + 'px';

/* // You don't need the remaining parts. They are only to
// show the sub-sprite in relation to the texture atlas
div.style.border             = "1px solid blue"; // only for demo purposes

// highlight where in the original texture the sub sprite is

var rect    = document.getElementById('sprites').parentNode.getBoundingClientRect();
var hi      = document.getElementById('highlight');
hi.style.zIndex   = 999; // force to be on top
hi.style.position = "absolute";
hi.style.width    = tw + 'px';
hi.style.height   = th + 'px';
hi.style.left     = (rect.left     + x) + 'px';
hi.style.top      = (rect.top + th + y) + 'px'; // skip sub-sprite height
hi.style.border   = '1px solid red'; */