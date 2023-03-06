javascript: (function () {
	var D = document, B = D.getElementsByTagName(`body`)[0];
	function bmlPanel(id, w, h) {
		var P, F, H, X, DP, CL;
		B.appendChild(P = D.createElement(`div`));
		P.id = id;
		P.style.cssText = ` position:fixed;
		top:10px;
		left:10px;
		padding:2px;
		width:`+ w + `px;
		height:`+ h + `px;
		opacity:0.8;
		filter:alpha(opacity = 80);
		background:#000;
		border:1px solid #666;
		color:#fff;
		font-size:12px;
		text-align:left;
		z-index:9998;
		-moz-border-radius:5px;`;
		P.appendChild(H = D.createElement(`div`));
		H.innerHTML = id;
		H.style.cssText = ` padding:0px 10px;
		height:20px;
		line-height:20px;
		color:#fff;
		font-size:12px;
		font-weight:bold;
		text-align:center;
		cursor:move;`;
		DP = D.createElement(`div`);
		DP.style.cssText = `background:transparent;
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:100%;`;
		P.appendChild(F = D.createElement(`div`));
		with (F.style) {
			height = h - 20 + `px`;
			overflow = `auto`;
			backgroundColor = `#222`;
			color = `#eee`;
			fontSize = `11px`;
			cursor = `auto`;
		}
		P.appendChild(CL = D.createElement(`div`));
		CL.title = `close`;
		with (CL.style) {
			border = `#444 solid 1px`;
			position = `absolute`;
			top = "5px";
			left = "5px";
			height = `10px`;
			width = `10px`;
			cursor = `pointer`;
		}
		CL.onclick = function () {
			B.removeChild(this.parentNode);
		}
			;
		H.onmousedown = function (e) {
			x = (e) ? e.pageX : event.x;
			y = (e) ? e.pageY : event.y;
			ox = x - P.offsetLeft;
			oy = y - P.offsetTop;
			P.appendChild(DP);
			return false;
		}
			;
		DP.onmousemove = function (e) {
			x = (e) ? e.pageX : event.x;
			y = (e) ? e.pageY : event.y;
			P.style.left = (x - ox) + `px`;
			P.style.top = (y - oy) + `px`;
			return false;
		}
			;
		DP.onmouseup = function () {
			P.removeChild(DP);
			return false;
		}
			;
		P.header = H;
		P.content = F;
		return P;
	}

	var t = `` + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);
	if (!t) {
		L = document.location.href;
		if (L.match(/(yahoo\.).+?.*p=([^&]+)/) || L.match(/(amazon\.).+?.*field-keywords=([^&]+)/) || L.match(/(\.wikipedia\.).+\/wiki\/([^\/]+)/) || L.match(/(youtube\.).+search_query=([^&]+)/) || L.match(/(\?.*\b)q=([^&]+)/) || L.match(/(\#search\/)([^\/]+)/)) t = decodeURIComponent(RegExp.$2);
	}
	Es = [[`Amazon`, `http://www.amazon.co.jp/exec/obidos/external-search/?keyword=%%`]];
	var SP = bmlPanel(`sp`, 200);
	SP.header.innerHTML = `検索パネル`;
	var C = SP.content, qt, tc = [], td = [], t, i, sbm, tmp;
	C.appendChild(qt = D.createElement(`input`));
	qt.value = t;
	qt.style.cssText = ` display:block;
	width:90%;
	margin:6px;
	border:1px solid #666;
	background:transparent;
	color:inherit;
	font-weight:bold;
	font-size:13px;`;
	for (i = 0; i < Es.length; i++) {
		C.appendChild(tc[i] = D.createElement(`input`));
		C.appendChild(td[i] = D.createElement(`div`));
		C.appendChild(tmp = D.createElement(`div`));
		td[i].url = Es[i][1];
		tmp.style.cssText = `clear:both`;
		with (tc[i]) {
			type = `checkbox`;
			name = i;
			value = Es[i][1];
			style.cssText = ` float:left;
			clear:left;
			display:block;
			margin:2px 6px;`;
		}
		with (td[i]) {
			style.cssText = ` cursor:pointer;`;
			onmouseover = function () {
				with (this.style) {
					fontWeight = `bold`;
					color = `#ff8`
				}
			}
				;
			onmouseout = function () {
				with (this.style) {
					fontWeight = `inherit`;
					color = `inherit`
				}
			}
				;
			onclick = function () {
				open(this.url.replace(/%%/, qt.value), `_blank`);
			}
				;
			innerHTML = Es[i][0];
		}
	}
	C.appendChild(sbm = D.createElement(`button`));
	with (sbm) {
		innerHTML = `チェックしたサービスで一括検索`;
		style.cssText = ` cursor:pointer;
		margin:6px auto;
		display:block;
		clear:both;`;
		onclick = function () {
            var p = document.getElementById("productTitle");
            if (!p) var p = document.getElementById("ebooksProductTitle");
            var title = window.prompt(`Scrap "Amazon" to your scrapbox.`, p.innerHTML);
            if (!title) return;
            title = `『` + title + `』`;
            var imagecontainer = document.getElementById("imageBlockContainer");
            if (!imagecontainer) var imagecontainer = document.getElementById("ebooksImageBlockContainer");
            var images = imagecontainer.getElementsByTagName("img");
            var image = images[images.length-1];
            var imageurl = image.getAttribute("src");
            var pub = [];
            var c = document.getElementsByClassName(`author`);
            for (g = 0; g < c.length; g++) {
                let at = c[g].innerText.replace(/,/, ``);
                let pu = at.match(/\(.+\)/);
                let ct = at.replace(/\(.+\)/, ``).replace(/ /g, ``);
                pub.push(pu + ` [` + ct + `]`);
            }
            var lines = `[` + imageurl + ` ` + window.location.href + `]\n` + pub.join(` `) + `\n#本`;
            var body = encodeURIComponent(lines);
            window.open(`https://scrapbox.io/oginos-reading-record/` + encodeURIComponent(title.trim()) + `?body=` + body)
        }
	}
}
)()