
var ovr, blk;
var overlay_open = false;
var overlay_height = 0;
var overlay_x, overlay_y;

function value_get(id)
{
	return( (document.getElementById(id)).value );
}

function value_set(id, val)
{
	(document.getElementById(id)).value = val;
}

// ::::::::::::::::::: DIV CENTER
function div_center(Xwidth, Yheight, div_)
{
// First, determine how much the visitor has scrolled
	var scrolledX, scrolledY;
	if( self.pageYOffset ) { scrolledX = self.pageXOffset; scrolledY = self.pageYOffset;}
	else if( document.documentElement && document.documentElement.scrollTop ) { scrolledX = document.documentElement.scrollLeft; scrolledY = document.documentElement.scrollTop; }
	else if( document.body ) { scrolledX = document.body.scrollLeft; scrolledY = document.body.scrollTop; }
	var centerX, centerY;
	if( self.innerHeight ) { centerX = self.innerWidth; centerY = self.innerHeight; }
	else if( document.documentElement && document.documentElement.clientHeight ) { centerX = document.documentElement.clientWidth; centerY = document.documentElement.clientHeight; }
	else if( document.body ) { centerX = document.body.clientWidth; centerY = document.body.clientHeight; }
// Xwidth is the width of the div, Yheight is the height of the
// div passed as arguments to the function:
	var leftOffset = scrolledX + (centerX - Xwidth) / 2;
	var topOffset = scrolledY + (centerY - Yheight) / 2;
// The initial width and height of the div can be set in the
// style sheet with display:none; divid is passed as an argument to // the function

	var r = div_.style;
	r.position = 'absolute';
	overlay_x = topOffset;
	overlay_y = leftOffset;
	r.top = topOffset + 'px';
	r.left = leftOffset + 'px';
	r.display = "block";
}

function overlay_reallign()
{
	div_center(648, overlay_height, ovr);
}

var overlay_shake_pos = 0;
var overlay_shake_x, overlay_shake_y;
function overlay_shake()
{
	var r = ovr.style;

	r.top = (overlay_x + rnd(16) - 8) + 'px';
	r.left = (overlay_y + rnd(16) - 8) + 'px';
	overlay_shake_pos++;
	overlay_shake_pos %= 16;
	if (overlay_shake_pos)
		setTimeout(overlay_shake, 25);
	else
	{
		r.top = overlay_x + 'px';
		r.left = overlay_y + 'px';
	}
}

var contact_name = "";
var contact_email = "";
var contact_subj = "";
var contact_msg = "";

function contact_send()
{
	var xmlhttp;

	if ((document.getElementById("name")).style.color == "black")
		contact_name = value_get("name");
	if ((document.getElementById("email")).style.color == "black")
		contact_email = value_get("email");
	if ((document.getElementById("subject")).style.color == "black")
		contact_subj = value_get("subject");
	if ((document.getElementById("message")).style.color == "black")
		contact_msg = value_get("message");
	
	if (contact_name.length < 3 || contact_email.length < 5 || contact_subj.length == 0 || contact_msg.length < 3)
	{
		overlay_shake();
		return;
	}
	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) { // && (xmlhttp.status == 200 || xmlhttp.status == 400)) {
		notification_on = 1;
		notification_time = -1;
		contact_name = contact_email = contact_subj = contact_msg = "";
		notification_msg = xmlhttp.responseText;
		//ovr.innerHTML =  "status: "+ xmlhttp.status + " -- " + xmlhttp.responseText;
	} }
	xmlhttp.open("POST","contact.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	xmlhttp.send("name="+contact_name+"&email="+contact_email+"&subject="+contact_subj+"&message="+contact_msg);
	
	overlay_close();
}

function contact_check(val, id)
{
	//if (!eval(val).length)
	if ((document.getElementById(id)).style.color == "gray")
	{
		value_set(id, "");
		(document.getElementById(id)).style.color = "black";
	}
}

function input_check(id, val)
{
	if (val.length)
	{
		value_set(id, val);
		(document.getElementById(id)).style.color = "black";
	}
	else
	{
		value_set(id, id);
		(document.getElementById(id)).style.color = "gray";
	}
}

/*
function TabExample(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
    if(evt.keycode == 9) {
    }

}

document.onkeydown = TabExample;
*/

function overlay_contact()
{
	if (!ovr) return;
	
	if(ovr.style.display == "none")
	{
		ovr.style.position="absolute";
		blk.style.visibility = "visible";
		blk.style.display = "";
		ovr.style.visibility = "visible";
		ovr.style.display = "";
		//ovr.style.width ='500px';
		var contact_form = "<table bgcolor='#404040'><tr><td></td><td></td></tr><tr><td width=160 class=name_ovr>&nbsp;Your name:</td><td width=400><input id='name' onselect=contact_check('contact_name','name') onclick=contact_check('contact_name','name') onkeydown=contact_check('contact_name','name') type='string' size='30' maxlength='40'></td></tr><td class=name_ovr>&nbsp;Email:</td><td><input id='email' onselect=contact_check('contact_email','email') onclick=contact_check('contact_email','email') onkeydown=contact_check('contact_email','email') type='string' size='30' maxlength='40'></td></tr><td class=name_ovr>&nbsp;Subject:</td><td><input id='subject' onselect=contact_check('contact_subj','subject') onclick=contact_check('contact_subj','subject') onkeydown=contact_check('contact_subj','subject') type='string' size='30' maxlength='40'></td></tr><td class=name_ovr valign=top>&nbsp;Message:</td><td><textarea id='message' onkeydown=contact_check('contact_msg','message') onclick=contact_check('contact_msg','message') cols='40' rows='10'></textarea></td></tr><tr><td></td><td><input class=btn type='button' value='Send' onclick='contact_send()'></td><//tr><tr><td></td><td></td></tr></table>";
		ovr.innerHTML = "<table id=contact><tr><td width=500><table><tr><td class=name_ovr width=478><img src=space.gif width=8>Contact</td><td class=date_ovr width=138></td><td width=32 align=right><a href='#' onclick='return overlay_close();'><img src=close.png border=0 onmouseover='this.src=close_h_pic.src' onmouseout='this.src=close_pic.src'></a></td></tr></table></td></tr><tr><td align=center>"+contact_form+"</td></tr></table>";
		overlay_open = true;

		input_check("name", contact_name);
		input_check("email", contact_email);
		input_check("subject", contact_subj);
		input_check("message", contact_msg);
		var wid = (document.getElementById('contact')).clientWidth;
		var hei = (document.getElementById('contact')).clientHeight ;
		ovr.style.width = wid+'px';
		ovr.style.height=hei+'px';
		div_center(wid, hei, ovr);
	}

	return false;
}

function overlay_video(data)
{
	height = 480;

	if (!ovr) return;
	
	if(ovr.style.display == "none")
	{
		ovr.style.position="absolute";
		blk.style.visibility = "visible";
		blk.style.display = "";
		ovr.style.visibility = "visible";
		ovr.style.display = "";

		switch(data.aspect)
		{
			case "16x9" : height = 360; break;
			case "4x3" : height = 480; break;
			case "2x1" : height = 320; break;
			case "ega" : height = 400; break;
			case "pal" : height = 512; break;
		}
		ovr.style.width='648px';
		overlay_height = (42+height);
		ovr.style.height=overlay_height+'px';
		div_center(648, height, ovr);
		switch(data.embed)
		{
			case "YT":
				iframe = "<iframe width=640 height="+height+" src='http://www.youtube.com/embed/"+data.link+"' frameborder=0 allowfullscreen></iframe>";
				break;
			case "VM":
				iframe = "<iframe src='http://player.vimeo.com/video/"+data.link+"' width=640 height="+height+" frameborder=0 webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
				break;
		}
//		ovr.innerHTML = "<table><tr><td width=648><table><tr><td class=name_ovr width=478><img src=images/space.gif width=8>"+data.name+"</td><td class=date_ovr width=138>"+data.date+"</td><td width=32 align=right><a href='javascript://' onclick='overlay_close();'><img src=images/close.png border=0 onmouseover='this.src=close_h_pic.src' onmouseout='this.src=close_pic.src'></a></td></tr></table></td></tr><tr><td align=center>"+iframe+"</td></tr></table>";
		ovr.innerHTML = "<table class=wait_indi><tr><td width=648><table><tr><td class=name_ovr width=478><img src=space.gif width=8>"+data.name+"</td><td class=date_ovr width=138>"+data.date+"</td><td width=32 align=right><a href='#' onclick='return overlay_close();'><img src=close.png border=0 onmouseover='this.src=close_h_pic.src' onmouseout='this.src=close_pic.src'></a></td></tr></table></td></tr><tr><td align=center>"+iframe+"</td></tr></table>";
//		ovr.innerHTML = "<iframe width=240 height=135 src='http://www.youtube.com/embed/Cmby65lzr8c' frameborder=0 allowfullscreen></iframe><a href='#' onclick='overlay_close();'>CLOSE WINDOW</a>";
		overlay_open = true;
	}

	/*else{
	//	thediv.style.display = "none";
	//	thediv.innerHTML = '';
	//	thediv.style.visibility = "hidden";
	}*/
	return false;
}

// ::::::::::::::::::: OVERLAY
function overlay_close()
{
	blk.style.visibility = "hidden";
	ovr.style.display = "none";
	ovr.style.visibility = "hidden";
	ovr.innerHTML = "";
	overlay_open = false;
	return false;
}

function overlay_hide()
{
	ovr.style.display = "none";

	ovr.style.visibility = "hidden";
	ovr.innerHTML = "";
	overlay_open = false;
	return false;
}

var close_pic = new Image();
close_pic.src = "close.png";
var close_h_pic = new Image();
close_h_pic.src = "close_h.png";

function draw_notification(time_)
{
	var m = NOTIFICATION_DURATION >> 1;
	var al;

	if (time_ < m)
		al = time_/m;
	else
	{
		time_ -= m;
		al = 1 - (time_/m);
	}

	var len = measure_text(context, notification_msg, FONT_ARIAL_30)+130+14;
	roundRect(context, 16, 48, 24+len, 48, 10, col_black, true, al);
	roundRect(context, 16, 48, 24+len, 48, 10, col_orange2, false, al);
	draw_text_boxed(context, 32, 63, 4, "Notification", FONT_ARIAL_10, col_orange2, col_black, al);
	//rect(16, 48, 24+len, 48, col_black, 0.5*al);
	//context.strokeStyle = col_white.str;
	//context.stroke(); 
	draw_text(context, 130+28, 64+18, notification_msg, FONT_ARIAL_30, col_white, al);
}