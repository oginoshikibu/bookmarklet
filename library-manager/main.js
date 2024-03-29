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


	var panel = createPanel("蔵書管理パネル", 300);
	panel.header.innerHTML = "蔵書管理パネル";
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

	function getRadioSelectedValue(name) {
		let radios = document.getElementsByName(name);
		let selectedValue;
		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) { selectedValue = radios[i].value; break; }
		}
		return selectedValue;
	}

	// ラジオボタンでタグを強制的に追加（配列のものを選択してそれをタグへ）
	content.appendChild(form1 = generateRadioButtons(["気になる", "欲しい", "家", "実家"], 1, "所在地"));
	content.appendChild(form2 = generateRadioButtons(["未読", "チラ見", "読む", "読んだ"], 2, "状態"));

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
			var title_elm = document.getElementById("productTitle");
			if (!title_elm) var title_elm = document.getElementById("ebooksProductTitle");
			var title = title_elm.innerHTML;
			if (!title) return;
			//表紙画像
			var images_elm = document.getElementById("imageBlockContainer");
			if (!images_elm) var images_elm = document.getElementById("ebooksImageBlockContainer");
			var images = images_elm.getElementsByTagName("img");
			var image = images[images.length - 1];
			var image_url = image.getAttribute("src");

			//著者
			var pub = [];
			var authors_elm = document.getElementsByClassName("author");
			for (g = 0; g < authors_elm.length; g++) {
				let at = authors_elm[g].innerText.replace(/\s+/g, "");
				let pu = at.match(/\(.+\)/);
				let ct = at.replace(/\(.+\)|,/g, "");
				pub.push("[" + ct + "]" + pu);
			}
			//info:出版社、発売年、ランキングのカテゴリ 
			var info = [];
			var infos_elms = document.getElementsByClassName("a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list");
			var about_li = infos_elms[0].getElementsByTagName("li");
			for (idx = 0; idx < about_li.length; idx++) {
				if (about_li[idx].innerText.includes("出版社")) {
					info.push(about_li[idx].innerText.replace(/\s+|\(.+\)|&rlim;/g, ""));
				}
				if (about_li[idx].innerText.includes("発売日")) {
					info.push(about_li[1].innerText.replace(/\s+|\/.*\/.*|&rlim;/g, "").replace("日", "年"));
				}
			}
			var categories_elms = infos_elms[1].childNodes[1].getElementsByTagName("li");
			for (idx = 0; idx < categories_elms.length; idx++) {
				info.push("カテゴリ:" + categories_elms[idx].innerText.replace(/^.*位|\s+/g, ""));
			}
			//入力したタグ
			var tags = tags_input.value.split(/\s+/);

			//説明
			var description = document.getElementById("bookDescription_feature_div").getElementsByClassName("a-expander-content a-expander-partial-collapse-content");
			if (description.length===0&document.getElementById("ebooksDescription_feature_div")) {var description = document.getElementById("ebooksDescription_feature_div").getElementsByClassName("a-expander-content a-expander-partial-collapse-content")};
			if (description.length===0) {var description = document.getElementsByClassName("a-section a-spacing-small a-padding-small")};

			//本文
			var lines = "[" + image_url + " " + window.location.href + "]\n"
				+ pub.join(" ")
				+ "\n#"+getRadioSelectedValue('所在地')+" #"+getRadioSelectedValue('状態');
			if (document.getElementsByClassName("a-icon-alt")) { lines += " #" + document.getElementsByClassName("a-icon-alt")[0].innerHTML.replace("5つ星のうち", "Amazon星") };
			if (info) { lines += " #" + info.join(" #") };
			if (tags_input.value) { lines += "\n#" + tags.join(" #") };
			console.log(description);
			if (description.length>0) { lines += "\n\n\n[/icons/hr.icon]" + description[0].innerText };

			//Scrapboxへ
			var body = encodeURIComponent(lines);
			window.open("https://scrapbox.io/oginos-reading-record/" + encodeURIComponent(title.trim()) + "?body=" + body);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
})()