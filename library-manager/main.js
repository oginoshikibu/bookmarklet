javascript: (function () {
	var body = document.getElementsByTagName(`body`)[0];
	function createPanel(panel_id, panel_width, panel_height) {
		var panel, frame, header, display_panel, close_button;/*Q: display_panelの存在意義が不明*/

		body.appendChild(panel = document.createElement(`div`));
		panel.id = panel_id;
		panel.style.cssText = ` position:fixed;
		top:10px;
		left:10px;
		padding:2px;
		width:`+ panel_width + `px;
		height:`+ panel_height + `px;
		opacity:0.8;
		filter:alpha(opacity = 95);
		background:#000;
		border:1px solid #666;
		color:#fff;
		font-size:12px;
		text-align:left;
		z-index:9998;
		-moz-border-radius:5px;`;

		panel.appendChild(header = document.createElement(`div`));
		header.innerHTML = panel_id;
		header.style.cssText = ` padding:0px 10px;
		height:20px;
		line-height:20px;
		color:#fff;
		font-size:12px;
		font-weight:bold;
		text-align:center;
		cursor:move;`;

		display_panel = document.createElement(`div`);
		display_panel.style.cssText = `background:transparent;
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:100%;`;

		panel.appendChild(frame = document.createElement(`div`));
		frame.id = `frame`;
		with (frame.style) {
			height = panel_height - 20 + `px`;
			overflow = `auto`;
			backgroundColor = `#222`;
			color = `#eee`;
			fontSize = `11px`;
			cursor = `auto`;
		}

		panel.appendChild(close_button = document.createElement(`div`));
		close_button.title = `close button`;
		with (close_button.style) {
			border = `#444 solid 1px`;
			position = `absolute`;
			top = "5px";
			left = "5px";
			height = `10px`;
			width = `10px`;
			cursor = `pointer`;
		}
		close_button.onclick = function () {
			body.removeChild(this.parentNode);
		}
			;
		header.onmousedown = function (e) {
			x = (e) ? e.pageX : event.x;
			y = (e) ? e.pageY : event.y;
			ox = x - panel.offsetLeft;
			oy = y - panel.offsetTop;
			panel.appendChild(display_panel);
			return false;
		}
			;
		display_panel.onmousemove = function (e) {
			x = (e) ? e.pageX : event.x;
			y = (e) ? e.pageY : event.y;
			panel.style.left = (x - ox) + `px`;
			panel.style.top = (y - oy) + `px`;
			return false;
		}
			;
		display_panel.onmouseup = function () {
			panel.removeChild(display_panel);
			return false;
		}
			;
		panel.header = header;
		panel.content = frame;
		return panel;
	}


	var panel = createPanel(`hoge`, 200);
	panel.header.innerHTML = `検索パネル`;
	var content = panel.content, tags_input, sbm_button;
	content.appendChild(tags_input = document.createElement(`input`));
	tags_input.style.cssText = ` display:block;
	width:90%;
	margin:6px;
	border:1px solid #666;
	background:transparent;
	color:inherit;
	font-weight:bold;
	font-size:13px;`;


	content.appendChild(sbm_button = document.createElement(`button`));
	with (sbm_button) {
		innerHTML = `Scrapbox へ保存`;
		style.cssText = ` cursor:pointer;
		margin:6px auto;
		display:block;
		clear:both;`;
		onclick = function () {
			try{			
				var title_elm = document.getElementById("productTitle");
				if (!title_elm) var title_elm = document.getElementById("ebooksProductTitle");
				var title = window.prompt(`Scrap "Amazon" to your scrapbox.`, title_elm.innerHTML);
				if (!title) return;

				var images_elm = document.getElementById("imageBlockContainer");
				if (!images_elm) var images_elm = document.getElementById("ebooksImageBlockContainer");
				var images = images_elm.getElementsByTagName("img");
				var image = images[images.length - 1];
				var image_url = image.getAttribute("src");

				var pub = [];
				var authors_elm = document.getElementsByClassName(`author`);
				for (g = 0; g < authors_elm.length; g++) {
					let at = authors_elm[g].innerText.replace(/,/, ``);
					let pu = at.match(/\(.+\)/);
					let ct = at.replace(/\(.+\)/, ``).replace(/ /g, ``);
					pub.push(pu + ` [` + ct + `]`);
				}

				var lines = `[` + image_url + ` ` + window.location.href + `]\n` + pub.join(` `) + `\n#本`;
				var body = encodeURIComponent(lines);
				window.open(`https://scrapbox.io/oginos-reading-record/` + encodeURIComponent(title.trim()) + `?body=` + body)
			} catch (error){
				alert(error);
			}
		}
	}
}
)()