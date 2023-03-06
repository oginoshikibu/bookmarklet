javascript:
alert("ok");



function getScrollPosition() {
    return (document.documentElement.scrollTop || document.body.scrollTop);
}



function eventMouseup() {
    if (intPanelMover == 0) {
        sText = selectedText();
        if (sText) {
            document.getElementById(`txtSearch`).value = sText;
        }
    }
}

function eventMover() {
    intPanelMover = 1;
}
function eventMout() {
    intPanelMover = 0;
}



function panel_close() {
    document.getElementById(`popSearchPnl2013`).style.visibility = "hidden";
    document.getElementById(`popSearchPnl2013`).style.display = "none";
    document.getElementById(`txtSearch`).value = ``;
}

function panel_open() {
    sYPosition = getScrollPosition() + 20;
    document.getElementById(`popSearchPnl2013`).style.top = sYPosition + "px";
    document.getElementById(`popSearchPnl2013`).style.visibility = "visible";
    document.getElementById(`popSearchPnl2013`).style.display = "block";
}

function displayPanel() {

    var sText = selectedText();

    var oPopSearch = document.getElementById(`popSearchPnl2013`);

    if (oPopSearch) {
        panel_open();
    } else {
        var o = document.createElement("div");
        sPanel =
            `<div id="popSearchPnl2013" onmouseover="eventMover()" onmouseout="eventMout()">` +
            `<div class="paneltitle" id="paneltitle"><span>書籍横断検索システム 検索パネル</span></div>` +
            `<form name="main_form" id="main_form" action="http:book.tsuhankensaku.com/cgi-bin/panelsearch.cgi" target="_self" method="post">` +
            `<input type="text" name="ws" value="" class="txtSearch" id="txtSearch" maxlength="256" autocomplete="off"><input type="hidden" name="cc" value="0" id="typeCharSet">` +
            `<div id="btnpanel"><input name="book-shosekioudan" id="shosekioudan" type="submit" value="「書籍横断検索システム」で検索" style="width:232px;border:1px solid #666;border-top:0px;">` +
            `<input name="robo-google" type="submit" value="Google" id="item-yahoo"><input name="item-rakuten" type="submit" value="楽天" id="item-rakuten"><input name="item-amazon" type="submit" value="Amazon" id="item-amazon">` +
            `<input name="pric-kakaku" type="submit" value="価格コム" id="pric-kakaku" style="border-right:1px solid #666;">` +
            `<div style="float:left;"><a class="panelclose" href="javascript:panel_close();" title="パネルを閉じます。ESCキーでパネルを閉じることもできます。">パネルを閉じる</a></div>` +
            `<div style="float:right;margin:3px 10px 0px 0px;">` +
            `<a class="homeicon" href="http:book.tsuhankensaku.com/" title="本・書籍通販検索へ移動">本</a>` +
            `<a class="homeicon" href="http:book.tsuhankensaku.com/hon/" title="書籍横断検索システムへ移動">書</a>` +
            `</div>` +
            `</form>` +
            `</div>` +
            `</div>`;
        o.innerHTML = sPanel;
        document.body.appendChild(o);
        createCss();
        document.getElementById(`txtSearch`).value = sText;
        document.getElementById(`typeCharSet`).value = "utf-8";
        sYPosition = getScrollPosition() + 20;
        document.getElementById(`popSearchPnl2013`).style.top = sYPosition + "px";
        if (sIEdocmode == 7) {
            document.getElementById(`popSearchPnl2013`).style.width = "241px";
            document.getElementById(`txtSearch`).focus();
            document.getElementById(`txtSearch`).blur();
        } else if (sIEdocmode == 5 || sIEdocmode == 6) {
            document.getElementById(`popSearchPnl2013`).style.width = "252px";
            document.getElementById(`txtSearch`).style.width = "232px";
            document.getElementById(`txtSearch`).focus();
            document.getElementById(`txtSearch`).blur();
            for (i = 2; i <= 6; i = i + 1) {
                document.getElementById(`popSearchPnl2013`).getElementsByTagName(`input`).item(i).style.backgroundColor = "#e4bC00";
            }
        }
    }
}


function createCss() {
    var eWrapper = document.createElement(`div`);
    sCss =
        `#popSearchPnl2013,#popSearchPnl2013 form, #popSearchPnl2013 input, #popSearchPnl2013 #txtSearch, #popSearchPnl2013 .panelclose, #popSearchPnl2013 .homeicon {` +
        `font-family: "メイリオ","Meiryo","ＭＳ Ｐゴシック", "MS P Gothic","Osaka",Verdana,Arial, Helvetica, sans-serif !important;` +
        `font-size:12px !important;` +
        `margin:0px !important;` +
        `}` +
        `#popSearchPnl2013 {` +
        `width:240px;` +
        `padding:10px 0px 5px 8px;` +
        `text-align:left;` +
        `position:absolute;top:10px; left:10px;` +
        `z-index:2147483647;` +
        `background-color: #aaa;` +
        `font-size:12px;` +
        `border:2px solid #ccc;` +
        `box-shadow: 1px 1px 3px #000;` +
        `-moz-box-shadow: 1px 1px 3px #000;` +
        `-webkit-box-shadow: 1px 1px 3px #000;` +
        `filter:progid:DXImageTransform.Microsoft.Shadow(Color=#000000, Strength=2, Direction=135);` +
        `-webkit-border-radius: 5px;` +
        `-moz-border-radius: 5px;` +
        `border-radius: 5px;` +
        `}` +
        `#popSearchPnl2013 #btnpanel input {` +
        `width:58px;` +
        `height:26px;` +
        `font-size:12px;` +
        `vertical-align:text-bottom;` +
        `box-shadow: 1px 1px 1px #999;` +
        `-moz-box-shadow: 1px 1px 1px #999;` +
        `-webkit-box-shadow: 1px 1px 1px #999;` +
        `padding:0px;` +
        `margin:0px 0px 0px 0px;` +
        `border-style: solid;` +
        `border-width: 0px 0px 1px 1px;` +
        `border-color: #666;` +
        `color: #000;` +
        `text-decoration: none;` +
        `text-align: center;` +
        `background-color:#e4bC00;` +
        `filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#F4CC0B,EndColorStr=#e4bC00);` +
        `background: -moz-linear-gradient(top,#F4CC0B 0%,#e4bC00);` +
        `background: -webkit-gradient(linear, left top, left bottom, from(#F4CC0B), to(#e4bC00));` +

        `}` +
        `#popSearchPnl2013 #btnpanel input:hover {` +
        `filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ffffee,EndColorStr=#ffffee);` +
        `background:#ffc;` +
        `cursor:pointer;` +
        `}` +
        `#popSearchPnl2013 .paneltitle {` +
        `width:232px;` +
        `height:23px;` +
        `background-color:#666;` +
        `margin:0px;` +
        `border:0px solid #444;` +
        `padding:4px 0px 0px 0px;` +
        `color:#fff;` +
        `font-weight:bold;` +
        `filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#666666,EndColorStr=#222222);` +
        `background: -moz-linear-gradient(top,#666666 0%,#222222);` +
        `background: -webkit-gradient(linear, left top, left bottom, from(#666666), to(#222222));` +
        `}` +
        `#popSearchPnl2013 .paneltitle span {` +
        `color:#fff;` +
        `text-decoration:none;` +
        `background-color:transparent;` +
        `padding:2px 4px 1px 4px;` +
        `margin:0px 0px 0px 4px;` +
        `-webkit-border-radius: 5px;` +
        `-moz-border-radius: 5px;` +
        `border-radius: 5px;` +
        `}` +
        `#popSearchPnl2013 .panelclose {` +
        `cursor:pointer;` +
        `width:92px;` +
        `border-bottom:1px solid #333;` +
        `margin-top:2px;` +
        `display:block;` +
        `margin-top:4px !important;` +
        `padding:2px 4px 1px 4px;` +
        `color:#fff;` +
        `background-color:#666;` +
        `font-weight:normal;` +
        `text-decoration:none;` +
        `-webkit-border-radius: 5px;` +
        `-moz-border-radius: 5px;` +
        `border-radius: 5px;` +
        `}` +
        `#popSearchPnl2013 .homeicon {` +
        `cursor:pointer;` +
        `border-bottom:1px solid #333;` +
        `display:inline-block;` +
        `margin:0px 0px 0px 2px !important;` +
        `padding:2px 4px 1px 4px !important;` +
        `color:#fff;` +
        `background-color:#666;` +
        `font-weight:normal;` +
        `text-decoration:none;` +
        `-webkit-border-radius: 5px;` +
        `-moz-border-radius: 5px;` +
        `border-radius: 5px;` +
        `}` +
        `#popSearchPnl2013 .panelclose:hover, #popSearchPnl2013 .homeicon:hover {` +
        `color:#000;` +
        `background:#ffc;` +
        `cursor:pointer;` +
        `}` +
        `#popSearchPnl2013 #txtSearch {` +
        `width:230px;` +
        `height:22px;`

    if (sIEdocmode == 5 || sIEdocmode == 6) {
        sCss += "margin:-1px 0px !important;";
    }

    sCss +=
        `box-shadow: 0px 1px 3px 1px #ccc inset;` +
        `font-size:14px;` +
        `color:#000;` +
        `padding:0px;` +
        `border:1px solid #666;` +
        `background:#fafafa;` +
        `}`

    eWrapper.innerHTML = `a<style type="text\/css">` + sCss + `<\/style>`;
    document.getElementsByTagName(`head`)[0].appendChild(eWrapper.lastChild);
}

displayPanel();
