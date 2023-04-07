javascript: (function () {
	var body = document.getElementsByTagName("body")[0];

	// ここはhttp://bookmarklet.web.fc2.com/bookmarklet_097.htmlから引っ張ってきただけで、ちゃんと理解していない
	function createPanel(panel_id, panel_width, panel_height) {
		var panel, frame, header, display_panel, close_button;

		body.appendChild(panel = document.createElement("div"));
		panel.id = panel_id;
		panel.style.cssText = `
		position:fixed;
		top:10px;
		left:10px;
		padding:2px;
		width:${panel_width}px;
		height:${panel_height}px;
		opacity:0.8;
		filter:alpha(opacity = 95);
		background:#000;
		border:1px solid #666;
		color:#fff;
		font-size:12px;
		text-align:left;
		z-index:9998;
		-moz-border-radius:5px;`;


		panel.appendChild(close_button = document.createElement("div"));
		close_button.title = "close button";
		close_button.style.cssText = `
			position: absolute;
			top: 0;
			right: 0;
			padding: 3px 6px 3px 6px;
			background: #fff;
			border: #444 solid 1px;
			color: #000000;
			cursor: pointer;
			text-align:center`;
		close_button.innerText = "X"

		panel.appendChild(header = document.createElement("div"));
		header.innerHTML = panel_id;
		header.style.cssText = ` padding:0px 10px;
		height:20px;
		line-height:20px;
		color:#fff;
		font-size:12px;
		font-weight:bold;
		text-align:center;
		cursor:move;`;

		//Q: display_panelの存在意義が不明だが、これがないと動かない

		display_panel = document.createElement("div");
		display_panel.style.cssText = `background:transparent;
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:100%;`;

		panel.appendChild(frame = document.createElement("div"));
		frame.id = "frame";
		frame.style.cssText = `
			height: ${panel_height - 20}px;
			overflow: auto;
			backgroundColor: #222;
			color: #eee;
			fontSize: 11px;
			cursor: auto;`;

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
			panel.style.left = (x - ox) + "px";
			panel.style.top = (y - oy) + "px";
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


	var panel = createPanel("論文管理パネル", 300);
	panel.header.innerHTML = "論文管理パネル";
	var content = panel.content, tags_input, sbm_button;
	//tag入力フォーム
	content.appendChild(tags_input = document.createElement("input"));
	tags_input.style.cssText = ` display:block;
	width:90%;
	margin:10px;
	border:1px solid #666;
	background:transparent;
	color:inherit;
	font-weight:bold;
	font-size:13px;`;
	tags_input.focus();

	function generateRadioButtons(arr, id, name) {
		var form = document.createElement("form");
		form.id = `form${id}`
		form.style.cssText = `display:flex;
							  align-items:center;
							  margin:10px 3px 0px 3px;
							  `;
		arr.forEach((value, index) => {
			var label = document.createElement("label");
			label.style.cssText = "width:25%;";
			var radio = document.createElement("input");
			radio.type = "radio";
			radio.name = name;
			radio.value = value;
			radio.style.cssText = "margin-right:3px;";
			label.appendChild(radio);
			label.appendChild(document.createTextNode(value));
			form.appendChild(label);
			if (index === 0) { radio.checked = true; }
		});
		return form;
	}


	function elem_to_link(elem) {
		return "[" + elem.innerText.replace(",","") + "]";
	}

	function elem_to_tag(elem) {
		return "#" + elem.innerText;
	}


	//送信ボタン
	content.appendChild(sbm_button = document.createElement("button"));
	sbm_button.innerHTML = "Scrapbox へ保存";
	sbm_button.style.cssText = ` cursor:pointer;
	margin:8px auto;
	display:block;
	clear:both;`;
	sbm_button.onclick = function () {
		try {
			//タイトル
			var title = document.getElementsByClassName("hlFld-Title")[1].innerText;
			if (!title) return;
			//abstract画像
			var abst_img_url = document.getElementsByClassName("article_abstract")[0].getElementsByTagName("img")[0].src;

			//著者
			var authors = Array.from(document.getElementsByClassName("hlFld-ContribAuthor")).map(elem_to_link);


			//subjects
			if (document.getElementsByClassName("read-more")[0]){throw ("subjects are not shown. please click 'show more' button")}
			var subjects = Array.from(document.getElementsByClassName("rlist--inline loa")[0].children).map(elem_to_link);
			if (document.getElementsByClassName("read-less")){subjects.pop()}

			//入力したタグ
			var tags = tags_input.value.split(/\s+/).map(elem_to_tag);

			//本文
			var lines = "[" + abst_img_url + " " + window.location.href + "]\n"
				+ authors.join(" ") + "\n"
				+ subjects.join(" ") + "\n"
			if (tags_input.value) { lines += tags.join(" ") + "\n" };
			if (document.getElementsByClassName("articleBody_abstractText")[0]) { lines += "\n\n\n[/icons/hr.icon]\nAbstract\n" + document.getElementsByClassName("articleBody_abstractText")[0].innerText };

			var body = encodeURIComponent(lines);
			window.open("https://scrapbox.io/oginos-reading-record/" + encodeURIComponent(title.trim()) + "?body=" + body);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}
})()