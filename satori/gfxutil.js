var RES_X = 1024;
var RES_Y = 768;

var pattern_chess, pattern_chess_n;

var web_gl = 0;

var LINE_2 = 2;

var img_chess, img_chess_n;

FONT_ARIAL_80 = "80px Arial";
FONT_ARIAL_30 = "30px Arial";
FONT_ARIAL_20 = "20px Arial";
FONT_ARIAL_10 = "15px Courier";

function gfxlib_init()
{
	if (!web_gl)
	{
		img_chess = new Image();
		img_chess.src = 'imgs/chess2.png';
		img_chess.onload = function() { pattern_chess = context.createPattern(img_chess, 'repeat'); }

		img_chess_n = new Image();
		img_chess_n.src = 'imgs/nethemba_chess.png';
		img_chess_n.onload = function() { pattern_chess_n = context.createPattern(img_chess_n, 'repeat'); }
	}
	
	X_RES = canvas.width;
	Y_RES = canvas.height;
	X_MID = X_RES/2;
	Y_MID = Y_RES/2;
	FONT_ARIAL_20 = "bold 20px Arial";
	FONT_LUCIDA_20 = "20px Lucida Console";
	FONT_LUCIDA_30 = "30px Lucida Console";
	
	if (!hi_det && !web_gl)
	{
		triangle_pattern = triangle_pattern_canvas_low;
	}
}

function X_REL(percent)
{
	return (X_RES * percent) / 100;
}

function Y_REL(percent)
{
	return (Y_RES * percent) / 100;
}

var imgs_used = 0;
var imgs_loaded = 0;

function load_pic(file, loaded)
{
	img = new Image();
	if (typeof loaded == "undefined")
		img.onload = function func() { imgs_loaded++; }
	else
		img.onload = loaded;
	img.crossOrigin = "anonymous";
	img.src = file;
	imgs_used++;
	return(img);
}

//

function rgbColor(r,g,b)
{
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function RGB(r,g,b)
{
	this.r = r/255;
	this.g = g/255;
	this.b = b/255;
	this.str = 'rgb(' + r + ',' + g + ',' + b + ')'; //"#"+r.toString(16)+g.toString(16)+b.toString(16)+"00"; //rgbColor(r,g,b);
	return this;
}

function RGB_cross(col1, col2, c)
{
	c *= 255;
	this.r = (col1.r*255 + (col2.r - col1.r) * c);
	this.g = (col1.g*255 + (col2.g - col1.g) * c);
	this.b = (col1.b*255 + (col2.b - col1.b) * c);
	this.str = 'rgb(' + Math.floor(this.r) + ',' + Math.floor(this.g) + ',' + Math.floor(this.b) + ')';

	this.r = this.r / 255;
	this.g = this.g / 255;
	this.b = this.b / 255;
	return this;
}

function measure_text(context, text, font)
{
	context.font = font;
	var res = context.measureText(text);
	return res.width;
}

function draw_text(context, x, y, text, font, col, alfa)
{
	context.globalAlpha = alfa;
	context.fillStyle = col.str;
	context.font = font;
	context.fillText(text, x, y);
}

function draw_text_boxed(context, x, y, border, text, font, colb, colt, alfa)
{
	rect(x, y, measure_text(context, text, font)+(border<<1), 10+(border<<1), colb, alfa);

	context.fillStyle = colt.str;
	context.font = font;
	context.fillText(text, x+5, y+9+border);
}

function draw_text_shadow(context, x, y, text, font, col, col2, alfa)
{
	context.globalAlpha = alfa;
	context.fillStyle = col2.str;
	context.font = font;
	context.fillText(text, x+2, y+2);
	context.fillStyle = col.str;
	context.fillText(text, x, y);
}

function line_canvas(context, xs, ys, xe, ye, col, alfa, line_size)
{
//	line_size = typeof line_size_in != "number" ? 2 : line_size_in;
	context.beginPath();
	context.moveTo(xs, ys);
	context.lineTo(xe, ye);
	context.lineWidth = line_size;
	context.strokeStyle = col.str;
	context.globalAlpha = alfa;
	context.stroke();
}

function triangle_canvas(context, x1, y1, x2, y2, x3, y3, col, alfa)
{
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.lineTo(x1, y1);
	context.strokeStyle = col.str;
	context.lineWidth = 1;
	context.globalAlpha = alfa;
	context.closePath();
	context.fillStyle = col.str;
//        context.fillStyle = pattern_chess;
	//context.stroke();
 	context.fill();
}

function triangle_pattern_canvas(context, x1, y1, x2, y2, x3, y3, col, alfa)
{
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.lineTo(x1, y1);
//	context.strokeStyle = col;
	context.globalAlpha = alfa;
	context.closePath();
//	context.fillStyle = col;
    context.fillStyle = pattern_chess;
  	context.fill();
}

triangle_pattern_canvas_low


function triangle_pattern_canvas_low(context, x1, y1, x2, y2, x3, y3, col, alfa)
{
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.lineTo(x1, y1);
	context.globalAlpha = alfa/2;
	context.closePath();
    context.fillStyle = color_black.str;
  	context.fill();
}


function triangle_pattern2_canvas(context, x1, y1, x2, y2, x3, y3, col, alfa)
{
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.lineTo(x1, y1);
//	context.strokeStyle = col;
	context.globalAlpha = alfa;
	context.closePath();
//	context.fillStyle = col;
    context.fillStyle = pattern_chess_n;
  	context.fill();
}

function rect_canvas(x1, y1, wid, hei, col, alfa)
{
	context.beginPath();
	context.globalAlpha = alfa;
	context.rect(x1, y1, wid, hei);
	context.fillStyle = col.str;
	context.fill(); 
}

function roundRect(ctx, x, y, width, height, radius, col, fill, alfa)
{
//	if (typeof radius === "undefined")
	//	radius = 5;

	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	ctx.globalAlpha = alfa;
	if (!fill)
	{
		ctx.strokeStyle = col.str;
		ctx.stroke();
	}
	else
	{
		ctx.fillStyle = col.str;
		ctx.fill();
	}
}

function polygon_canvas(context, x1, y1, x2, y2, x3, y3, x4, y4, col, alfa)
{
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.lineTo(x3, y3);
	context.lineTo(x4, y4);
	context.lineTo(x1, y1);
	context.strokeStyle = col.str;
	context.globalAlpha = alfa;
	context.closePath();
	context.fillStyle = col;
  	context.fill();
}
	
function circle_canvas(context, x, y, r, col, alfa)
{
	if (r <= 0) return;
	context.globalAlpha = alfa;
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI, false);
	context.lineWidth = 1;
	context.strokeStyle = col.str;
	context.stroke();
}

function circle_fill_canvas(context, x, y, r, col, col_f, lsize, alfa)
{
	if (r <= 0) return;
	context.globalAlpha = lsize;
	context.lineWidth = lsize;
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI, false);
	context.fillStyle = col_f.str;
	context.fill();
	context.strokeStyle = col.str;
	context.stroke();
}

function rnd(n)
{
  return Math.floor( Math.random() * n );
}

/*

      function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
      }
	  
*/

// ----------------------------------------------------------
/*
function scaleImageData(imageData, scale) {
  var cnt = canvas.getContext("2d");
  var scaled = cnt.createImageData(imageData.width * scale, imageData.height * scale);

  for(var row = 0; row < imageData.height; row++) {
    for(var col = 0; col < imageData.width; col++) {
      var sourcePixel = [
        imageData.data[(row * imageData.width + col) * 4 + 0],
        imageData.data[(row * imageData.width + col) * 4 + 1],
        imageData.data[(row * imageData.width + col) * 4 + 2],
        imageData.data[(row * imageData.width + col) * 4 + 3]
      ];
      for(var y = 0; y < scale; y++) {
        var destRow = row * scale + y;
        for(var x = 0; x < scale; x++) {
          var destCol = col * scale + x;
          for(var i = 0; i < 4; i++) {
            scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
              sourcePixel[i];
          }
        }
      }
    }
  }

  return scaled;
}
*/

function load_font(data)
{
	this.width = data[0];
	this.height = data[1];
	this.widthb = data[2];
	this.shifts = data[3];
	this.startchar = data[4];
	this.endchar = data[5];
	this.firstshift = data[6];

	c = (this.endchar - this.startchar + 1)*this.widthb*this.height;
	this.data = new Array(c);
	for (a = 0; a < c; a++)
	{
		this.data[a] = data[a+7];
	}
}

function put_pixel(context, x, y, col)
{
//alert(x+"-"+y);

	context.fillStyle = "black";
	context.fillRect(x<<1, y<<1, 1, 1);
	context.globalAlpha = 1;
	return;
	
	line(context, x, y, x+10, y+10, col, 1, 1);
	return;
    var p=context.createImageData(1,1);
	context.globalAlpha = 1;
    p.data[0]=col.r;
    p.data[1]=col.g;
    p.data[2]=col.b;
    p.data[3]=255;//col.a;
    context.putImageData(p,x,y);

}

var put_ch = put_ch_dot;

function put_ch_full(context, x, y, font, ch, col, size, alfa)
{
	var a, b, w = font.shifts ? font.data[font.firstshift + ch] : font.width;
	var bit = [ 128, 64, 32, 16, 8, 4, 2, 1 ];

	context.fillStyle = col.str;
	//context.globalAlpha = 1;
	var alfa2 = 0.25*alfa;
	for (a = 0; a < font.height; a++)
		for (b = 0; b < w; b++)
			if ((font.data[(ch*font.height*font.widthb) + (a*font.widthb) + (b > 7 ? 1 : 0)] & bit[b > 7 ? b - 8 : b]))
//			if ((font.data[(ch*font.height*font.widthb) + (a*font.widthb)] & bit[b]))
			{
				var aa = a*size, bb = b*size;
				if (!web_gl)
				{
					context.globalAlpha = alfa;
					context.fillRect(x + bb, y + aa, size, size);
				}
				else
					rect_gl(x + bb, y + aa, size, size, col, alfa);
			}
}

function put_ch_dot(context, x, y, font, ch, col, size, alfa)
{
	var a, b, w = font.shifts ? font.data[font.firstshift + ch] : font.width;
	var bit = [ 128, 64, 32, 16, 8, 4, 2, 1 ];

	context.fillStyle = col.str;
	var alfa2 = 0.25*alfa;
	for (a = 0; a < font.height; a++)
		for (b = 0; b < w; b++)
			if ((font.data[(ch*font.height*font.widthb) + (a*font.widthb) + (b > 7 ? 1 : 0)] & bit[b > 7 ? b - 8 : b]))
			{
				var aa = a*size, bb = b*size;
				xx = x+bb; yy = y+aa;
			//	rect(xx, yy, 1, 1, col, alfa);
			//	rect(xx+1, yy+1, 1, 1, col, alfa2);
				if (!web_gl)
				{
					context.globalAlpha = alfa;
					context.fillRect(xx, yy, 1, 1);
				}
				else
					pixel_gl(x + bb, y + aa, col, alfa);
	//			else
//					rect(x + bb, y + aa, 1, 1, col, alfa);
					//pixel_gl(xx, yy, col, alfa);
//				rect(xx, yy, 1, 1, col, alfa);
//				context.globalAlpha = alfa2;
//				context.fillRect(1+xx, 1+yy, 1, 1);
			
			}
}

function print_at(context, x, y, font, text, col, size, alfa, rnd_)
{
	var a, xx = x, yy = y, ch;

	var yy_add = font.height * size;
	for (a = 0; a < text.length; a++)
	{
		ch = text.charCodeAt(a);
		switch (ch) {
			case 10:	yy += yy_add;
						xx = x;
				//		if (yy > Y_RES) return;
						break;
			default: put_ch(context, xx, yy, font, ch- font.startchar, col, size, alfa);
						//alert(triangle_gl_num);
				//		triangle_paint_buffer_gl();
						xx += ( font.shifts ? font.data[font.firstshift + (ch - font.startchar)] : font.width ) * size;
						if (rnd_)
							xx += (-1 + rnd(3));	
						break;
		};
	}
}

function clear_canvas_canvas(col, alfa)
{
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = col.str;
	context.globalAlpha = alfa;
	context.fill();

	/*context.lineWidth = 0;
	context.strokeStyle = '#FFFFFF';
	context.stroke();*/
}

function image_set_draw_canvas(image)
{
}

function image_end_draw_canvas()
{
}

function image_draw_canvas(context, x, y, wid, hei, img, alfa)
{
		context.globalAlpha = alfa;
		context.drawImage(img, x, y, wid, hei);
}

//

var line = line_canvas;
var triangle = triangle_canvas;
var triangle_pattern = triangle_pattern_canvas;
var triangle_pattern2 = triangle_pattern2_canvas;
var rect = rect_canvas;
var polygon = polygon_canvas;
var clear_canvas = clear_canvas_canvas;
var image_draw = image_draw_canvas;
var image_set_draw = image_set_draw_canvas;
var image_end_draw = image_end_draw_canvas;
var circle = circle_canvas;
var circle_fill = circle_fill_canvas;

var data_font6x6 = [
6, 6, 1, 0, 32, 127, 0,
0,0,0,0,0,0,32,32,32,0,32,0,80,80,0,0,0,0,80,248,80,248,80,0,112,160,112,40,112,0,200,208,32,88,152,0,48,80,96,112,152,224,32,32,0,0,0,0,16,32,
32,32,16,0,32,16,16,16,32,0,80,32,248,32,80,0,32,32,248,32,32,0,0,0,0,32,32,64,0,0,120,0,0,0,0,0,0,0,32,0,8,16,32,64,128,0,48,72,72,72,
48,0,32,96,32,32,112,0,112,8,48,64,120,0,112,8,48,8,112,0,80,80,112,16,16,0,120,64,120,8,120,0,120,64,120,72,120,0,120,8,16,32,32,0,120,72,120,72,120,0,
120,72,120,8,8,0,0,32,0,32,0,0,0,32,0,32,32,64,16,32,64,32,16,0,0,120,0,120,0,0,64,32,16,32,64,0,112,16,48,0,32,0,112,136,184,184,128,120,48,72,
120,72,72,0,112,72,112,72,112,0,56,64,64,64,56,0,112,72,72,72,112,0,120,64,112,64,120,0,120,64,112,64,64,0,120,64,88,72,120,0,72,72,120,72,72,0,112,32,32,32,
112,0,8,8,8,72,48,0,72,80,96,80,72,0,64,64,64,64,120,0,136,216,168,136,136,0,72,104,88,72,72,0,48,72,72,72,48,0,112,72,112,64,64,0,48,72,72,80,40,0,
112,72,112,72,72,0,56,64,48,8,112,0,248,32,32,32,32,0,72,72,72,72,48,0,72,72,72,48,48,0,136,136,168,216,136,0,72,72,48,72,72,0,136,136,80,32,32,0,120,16,
32,64,120,0,48,32,32,32,48,0,128,64,32,16,8,0,48,16,16,16,48,0,32,80,136,0,0,0,0,0,0,0,252,0,32,80,32,0,0,0,0,56,72,72,56,0,64,112,72,72,
112,0,0,56,64,64,56,0,8,56,72,72,56,0,0,48,88,96,56,0,48,32,112,32,32,0,0,56,72,56,8,112,64,112,72,72,72,0,32,0,32,32,32,0,16,0,16,16,80,32,
64,64,80,96,80,0,32,32,32,32,32,0,0,208,168,168,136,0,0,112,72,72,72,0,0,48,72,72,48,0,0,112,72,72,112,64,0,56,72,72,56,8,0,80,104,64,64,0,0,56,
96,24,112,0,32,112,32,32,32,0,0,72,72,72,48,0,0,72,72,80,32,0,0,136,168,168,216,0,0,72,48,48,72,0,0,72,72,56,8,112,0,120,16,32,120,0,16,32,16,32,
16,0,32,32,32,32,32,32,32,16,32,16,32,0,0,40,80,0,0,0,32,80,136,136,248,0
];

var font6x6 = new load_font(data_font6x6);
