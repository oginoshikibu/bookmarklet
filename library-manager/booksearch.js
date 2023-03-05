
//表示ページURLの取得と判定
var strDocUrl = document.URL;
var isUrl = strDocUrl.match(/^(http|https):\/\/.+/);

//選択テキストの取得
var selText = selectedText();

//検索パネルマウスオーバー判定用フラグ
var intPanelMover = 0;

//IE互換モードの取得
var sIEdocmode = getIEdocmode();

//パターンマッチ用URL
var aryUrl = new Array(
	'books.rakuten.co.jp\/rb\/.+?\/item\/',
	'www.7netshopping.jp\/books\/detail\/',
	'www.kinokuniya.co.jp\/f\/',
	'www.junkudo.co.jp\/mj\/products\/',
	'honto.jp\/netstore\/pd-book',
	'www.honyaclub.com\/shop\/g\/',
	'shop.tsutaya.co.jp\/book\/product\/',
	'shop.tsutaya.co.jp\/.+?\/product-book-',
	'www.e-hon.ne.jp\/bec\/SA\/Detail',
	'www.bookservice.jp\/ItemDetail',
	'www.yodobashi.com',
	'boox.jp\/index.php\?module\=ecitemdtl',
	'www.hmv.co.jp\/artist_',
	'www.netoff.co.jp\/detail',
	'www.bookoffonline.co.jp\/new\/',
	'www.bookoffonline.co.jp\/old\/',
	'www.furu1online.net\/ItemDetail',
	'www.dmm.com\/mono\/book\/',
	'ci.nii.ac.jp\/ncid\/',
	'calil.jp\/book\/',
	'booklog.jp\/item\/',
	'mediamarker.net\/media\/0\/',
	'www.honzuki.jp\/book\/.+?\/review/'
);
//パターンマッチ用URL(amazon用)
var aryUrlAmazon = new Array(
	'www.amazon.co.jp\/.+?\/dp\/',
	'www.amazon.co.jp\/dp\/',
	'www.amazon.co.jp\/gp\/'
);

//フレームオブジェクト取得
var eFrms = document.getElementsByTagName("frame");
//フレームタグの有無の判定
if (eFrms && eFrms.length > 0) {
    alert("フレーム(frame)が使用されているページでは検索機能は使用できません。");

} else {
	if (selText == "") {
		//テキストが選択されていない場合、URLの判定処理へ移行
		if (isUrl) {
			//URL形式の場合
			if (matchUrl(strDocUrl)) {
				//URLがISBNコード取得対象のURLの場合は、取得処理を実行
				var strUrl = "http://www.tsuhan.me/api/isbn.php?q=" + encodeURIComponent(strDocUrl);
				var objScr = document.createElement("script");
				objScr.setAttribute("type","text/javascript");
				objScr.setAttribute("src", strUrl);
				document.getElementsByTagName("body").item(0).appendChild(objScr);
			} else if(matchUrlAmazon(strDocUrl)) {
				//Amazonの場合は、javascriptでISBNコードを取得
				aryISBN = window.document.body.innerHTML.match(/\d{3}-\d{10}/);
				if (aryISBN) {
					strISBN13 = aryISBN[0].replace("-","");
					loadISBN(strISBN13);
				} else {
					//ISBNコードが取得できなかった場合は、検索パネルを表示
					displayPanel();
				}
				
			} else {
				//取得外のURLの場合は、検索パネルを表示
				displayPanel();
				
			}
		} else {
			//URL形式でない場合は、検索パネルを表示
			displayPanel();
			
		}
	} else {
		//URL形式でない場合は、検索パネルを表示
		displayPanel();
	}
}

//コールバック関数
function loadISBN(data) {
	//デバック用
	//alert(data);
	if (data == -2 || data == -9) {
		//ISBNコードが取得できなかった場合
		displayPanel();

	} else {
		//ISBNコードが取得できた場合
		//値のチェック(978・979～は、ISBNコード)
		var isISBN = data.match(/^[0-9]{9}?[0-9Xx]$|^(978|979)\d{10}$/);
		if(isISBN) {
			//ISBNコードの場合は検索実行
			sUrl = "http://book.tsuhankensaku.com/hon/index.php?t=booksearch&q=" + data;
			location.href = sUrl;
			//window.open(sUrl,"_blank","")
		} else {
			//ISBN形式でない場合は、検索パネルを表示
			displayPanel();
		}
	};
}

//URLのパターンマッチ関数
function matchUrl(str) {
	var result = 0;
	for (var i=0 ; i < aryUrl.length ; i++){
		if(str.match(aryUrl[i])) {
			result = 1;
			break;
		}
	}
	return result;
}

//URLのパターンマッチ関数
function matchUrlAmazon(str) {
	var result = 0;
	for (var i=0 ; i < aryUrlAmazon.length ; i++){
		if(str.match(aryUrlAmazon[i])) {
			result = 1;
			break;
		}
	}
	return result;
}

//選択テキスト取得
function selectedText(){
	var sText = '';
	if(window.getSelection){
		sText = window.getSelection();
	}else if(document.getSelection){
		sText = document.getSelection();
	}else if(document.selection){
		sText = document.selection.createRange().text;
	}
	sText = spaceTrim(sText);
	return sText;
}

//前後のスペースを削除
function spaceTrim(str) {
	str = String(str);
	if (str) {
    	return str.replace(/^[\s　]+|[\s　]+$/g, '');
	} else {
		return '';
	}
}

//選択テキストのエスケープ処理
function escapeString(str) {
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/"/g,"&quot;");
	str = str.replace(/'/g,"&#039;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	return str;
}

//スクロールバーのY座標の取得
function getScrollPosition() {
　　return (document.documentElement.scrollTop || document.body.scrollTop);   
}

//スクロールイベント
//window.onscroll = function()
//{
//    var scrollTop = document.documentElement.scrollTop
//        || document.body.scrollTop;
//	if (scrollTop > 10) {
//		panel_open();
//	};
//	
//}

//フレームタグのチェック
function chkFrame() {
	var frms = document.getElementsByTagName("frame");
	if(frms && frms.length > 0) {
		//フレームが存在する
		return -1;
	} else {
		//フレームが存在しない
		return 1;
	}
}

//選択範囲が変化(マウスアップ)したらテキストを取得
function eventMouseup(){
	if (intPanelMover == 0) {
		sText =selectedText();
		if (sText) {
			document.getElementById('txtSearch').value = sText;
		}
	}
}

//キーダウンイベント
document.onkeydown = function(e) { 
	var sKeyCode;
    // Mozilla(Firefox, NN) and Opera 
    if (e != null) { 
        keycode = e.which; 
    // Internet Explorer 
    } else { 
        keycode = event.keyCode; 
    } 
	sKeyCode = keycode;

	//ESCキーイベント
	if (sKeyCode == "27") {
		if (document.getElementById('popSearchPnl2013').style.visibility == "visible") {
			panel_close();
		} else {
			panel_open();
		}
	}
	//window.status = sKeyCode;
}

//キーアップイベント
document.onkeyup = function(e) { 
	sKeyCode = -1;
}

//mouseup・over・outイベントリスナ設定
if (document.addEventListener) {
	document.addEventListener("mouseup", eventMouseup, false);
} else {
	document.attachEvent("onmouseup", eventMouseup);
	document.getElementById('popSearchPnl2013').attachEvent("onmouseover", eventMover);
	document.getElementById('popSearchPnl2013').attachEvent("onmouseout", eventMout);
}

//検索パネルのマウスオーバー・アウトイベント
function eventMover() {
	intPanelMover = 1;
}
function eventMout() {
	intPanelMover = 0;
}

//IEのバージョン取得
function getIEversion() {
	var msie=navigator.appVersion.toLowerCase();
	msie=(msie.indexOf('msie')>-1)?parseInt(msie.replace(/.*msie[ ]/,'').match(/^[0-9]+/)):0;
	return msie;
}

//IEの互換モードバージョン取得
function getIEdocmode() {
	mode = document.documentMode;
	if (mode) {
		if (mode < 8) {
			return document.documentMode;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//ドキュメントの文字コード取得
function getDocumentCharset() {
	var sCharCode;
	var sCharset;
	if (document.charset) {
		sCharset=document.charset;
	} else {
		sCharset=document.characterSet;
	}
	if (sCharset=="utf-8" || sCharset=="UTF-8") {
		sCharCode="0";
		
	} else if (sCharset=="EUC-JP" || sCharset=="euc-jp") {
		sCharCode="2";
		
	} else if (sCharset=="shift_jis" || sCharset=="Shift_JIS") {
		sCharCode="1";
		
	} else{
		sCharCode="0";
	}
	return sCharCode;

}

//パネルを閉じる
function panel_close() {
	document.getElementById('popSearchPnl2013').style.visibility = "hidden";
	document.getElementById('popSearchPnl2013').style.display = "none";
	//テキストの消去
	document.getElementById('txtSearch').value = '';
}

//パネルを開く
function panel_open() {
	sYPosition = getScrollPosition() + 20;
	document.getElementById('popSearchPnl2013').style.top = sYPosition + "px";
	document.getElementById('popSearchPnl2013').style.visibility = "visible";
	document.getElementById('popSearchPnl2013').style.display = "block";
}

function displayPanel() {
	
	var sText = selectedText();
	
	var oPopSearch = document.getElementById('popSearchPnl2013');
	
	if (oPopSearch) {
		//パネルが存在する場合は、隠れているパネルを表示する
		panel_open();
	} else {
		//パネルが存在しない場合は、パネルを生成
   		var o = document.createElement("div");
		sPanel =
		'<div id="popSearchPnl2013" onmouseover="eventMover()" onmouseout="eventMout()">'+ 
		'<div class="paneltitle" id="paneltitle"><span>書籍横断検索システム 検索パネル</span></div>'+
		'<form name="main_form" id="main_form" action="http://book.tsuhankensaku.com/cgi-bin/panelsearch.cgi" target="_self" method="post">'+
		'<input type="text" name="ws" value="" class="txtSearch" id="txtSearch" maxlength="256" autocomplete="off"><input type="hidden" name="cc" value="0" id="typeCharSet">'+
		'<div id="btnpanel"><input name="book-shosekioudan" id="shosekioudan" type="submit" value="「書籍横断検索システム」で検索" style="width:232px;border:1px solid #666;border-top:0px;">'+
		'<input name="robo-google" type="submit" value="Google" id="item-yahoo"><input name="item-rakuten" type="submit" value="楽天" id="item-rakuten"><input name="item-amazon" type="submit" value="Amazon" id="item-amazon">'+
		'<input name="pric-kakaku" type="submit" value="価格コム" id="pric-kakaku" style="border-right:1px solid #666;">'+
		'<div style="float:left;"><a class="panelclose" href="javascript:panel_close();" title="パネルを閉じます。ESCキーでパネルを閉じることもできます。">パネルを閉じる</a></div>'+
		'<div style="float:right;margin:3px 10px 0px 0px;">'+
		'<a class="homeicon" href="http://book.tsuhankensaku.com/" title="本・書籍通販検索へ移動">本</a>'+
		'<a class="homeicon" href="http://book.tsuhankensaku.com/hon/" title="書籍横断検索システムへ移動">書</a>'+
		'</div>'+
		'</form>'+
		'</div>'+
		'</div>';
		o.innerHTML = sPanel;
		document.body.appendChild(o);
		//CSS生成
		createCss();
		//選択テキストの挿入
		document.getElementById('txtSearch').value = sText;
		//文字コードの挿入
		document.getElementById('typeCharSet').value = getDocumentCharset();
		//Y座標の指定
		sYPosition = getScrollPosition() + 20;
		document.getElementById('popSearchPnl2013').style.top = sYPosition + "px";
		if (sIEdocmode == 7) {
			//互換モード7の場合
			document.getElementById('popSearchPnl2013').style.width = "241px";
			document.getElementById('txtSearch').focus();
			document.getElementById('txtSearch').blur();
		} else if (sIEdocmode == 5 || sIEdocmode == 6) {
			//互換モード7以下の場合
			//パネル本体の幅を拡張
			document.getElementById('popSearchPnl2013').style.width = "252px";
			//テキストボックスの幅を拡張
			document.getElementById('txtSearch').style.width = "232px";
			document.getElementById('txtSearch').focus();
			document.getElementById('txtSearch').blur();
			for (i = 2; i <= 6; i = i +1){
				document.getElementById('popSearchPnl2013').getElementsByTagName('input').item(i).style.backgroundColor = "#e4bC00";
			}
		}
	}
}


//パネル用CSS生成
function createCss() {
    var eWrapper=document.createElement('div');
	sCss =
		'#popSearchPnl2013,#popSearchPnl2013 form, #popSearchPnl2013 input, #popSearchPnl2013 #txtSearch, #popSearchPnl2013 .panelclose, #popSearchPnl2013 .homeicon {'+
				'font-family: "メイリオ","Meiryo","ＭＳ Ｐゴシック", "MS P Gothic","Osaka",Verdana,Arial, Helvetica, sans-serif !important;'+
				'font-size:12px !important;'+
				'margin:0px !important;'+
		'}'+
		'#popSearchPnl2013 {'+
			'width:240px;'+
			'padding:10px 0px 5px 8px;'+
			'text-align:left;'+
			'position:absolute;top:10px; left:10px;'+
			'z-index:2147483647;'+
			'background-color: #aaa;'+
			'font-size:12px;'+
			'border:2px solid #ccc;'+
			'box-shadow: 1px 1px 3px #000;'+
			'-moz-box-shadow: 1px 1px 3px #000;'+
			'-webkit-box-shadow: 1px 1px 3px #000;'+
			'filter:progid:DXImageTransform.Microsoft.Shadow(Color=#000000, Strength=2, Direction=135);'+
			'-webkit-border-radius: 5px;'+
			'-moz-border-radius: 5px;'+
			'border-radius: 5px;'+
		'}'+
		'#popSearchPnl2013 #btnpanel input {'+
			'width:58px;'+
			'height:26px;'+
			'font-size:12px;'+
			'vertical-align:text-bottom;'+
			'box-shadow: 1px 1px 1px #999;'+
			'-moz-box-shadow: 1px 1px 1px #999;'+
			'-webkit-box-shadow: 1px 1px 1px #999;'+
			'padding:0px;'+
			'margin:0px 0px 0px 0px;'+
			'border-style: solid;'+
			'border-width: 0px 0px 1px 1px;'+
			'border-color: #666;'+
			'color: #000;'+
			'text-decoration: none;'+
			'text-align: center;'+
			'background-color:#e4bC00;'+ 
			'filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#F4CC0B,EndColorStr=#e4bC00);'+
			'background: -moz-linear-gradient(top,#F4CC0B 0%,#e4bC00);'+
			'background: -webkit-gradient(linear, left top, left bottom, from(#F4CC0B), to(#e4bC00));'+

		'}'+
		'#popSearchPnl2013 #btnpanel input:hover {'+
			'filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ffffee,EndColorStr=#ffffee);'+
			'background:#ffc;'+
			'cursor:pointer;'+
		'}'+
		'#popSearchPnl2013 .paneltitle {'+
			'width:232px;'+
			'height:23px;'+
			'background-color:#666;'+
			'margin:0px;'+
			'border:0px solid #444;'+
			'padding:4px 0px 0px 0px;'+
			'color:#fff;'+
			'font-weight:bold;'+
			'filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#666666,EndColorStr=#222222);'+
			'background: -moz-linear-gradient(top,#666666 0%,#222222);'+
			'background: -webkit-gradient(linear, left top, left bottom, from(#666666), to(#222222));'+
		'}'+
		'#popSearchPnl2013 .paneltitle span {'+
			'color:#fff;'+
			'text-decoration:none;'+
			'background-color:transparent;'+
			'padding:2px 4px 1px 4px;'+
			'margin:0px 0px 0px 4px;'+
			'-webkit-border-radius: 5px;'+
			'-moz-border-radius: 5px;'+
			'border-radius: 5px;'+
		'}'+
		'#popSearchPnl2013 .panelclose {'+
			'cursor:pointer;'+
			'width:92px;'+
			'border-bottom:1px solid #333;'+
			'margin-top:2px;'+
			'display:block;'+
			'margin-top:4px !important;'+
			'padding:2px 4px 1px 4px;'+
			'color:#fff;'+
			'background-color:#666;'+
			'font-weight:normal;'+
			'text-decoration:none;'+
			'-webkit-border-radius: 5px;'+
			'-moz-border-radius: 5px;'+
			'border-radius: 5px;'+
		'}'+
		'#popSearchPnl2013 .homeicon {'+
			'cursor:pointer;'+
			'border-bottom:1px solid #333;'+
			'display:inline-block;'+
			'margin:0px 0px 0px 2px !important;'+
			'padding:2px 4px 1px 4px !important;'+
			'color:#fff;'+
			'background-color:#666;'+
			'font-weight:normal;'+
			'text-decoration:none;'+
			'-webkit-border-radius: 5px;'+
			'-moz-border-radius: 5px;'+
			'border-radius: 5px;'+
		'}'+
		'#popSearchPnl2013 .panelclose:hover, #popSearchPnl2013 .homeicon:hover {'+
			'color:#000;'+
			'background:#ffc;'+
			'cursor:pointer;'+
		'}'+
		'#popSearchPnl2013 #txtSearch {'+
			'width:230px;'+
			'height:22px;'
			
		//互換モード7以下の場合、テキストボックス上下のマージンを調整		
		if (sIEdocmode == 5 || sIEdocmode == 6) {
			sCss +=　"margin:-1px 0px !important;";
		}

		sCss +=
			'box-shadow: 0px 1px 3px 1px #ccc inset;'+
			'font-size:14px;'+
			'color:#000;'+
			'padding:0px;'+
			'border:1px solid #666;'+
			'background:#fafafa;'+
		'}'
		
    eWrapper.innerHTML='a<style type="text\/css">' + sCss + '<\/style>';
    document.getElementsByTagName('head')[0].appendChild(eWrapper.lastChild);
}
