var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(k){return k.raw=k};$jscomp.createTemplateTagFirstArgWithRaw=function(k,q){k.raw=q;return k};
(function(){function k(b,e,d){var a=document.createElement("form");a.id="form"+e;a.style.cssText="display:flex;\n\t\t\t\t\t\t\t  align-items:center;\n\t\t\t\t\t\t\t  margin:10px 3px 0px 3px;\n\t\t\t\t\t\t\t  ";b.forEach(function(h,c){var m=document.createElement("label");m.style.cssText="width:25%;";var l=document.createElement("input");l.type="radio";l.name=d;l.value=h;l.style.cssText="margin-right:3px;";m.appendChild(l);m.appendChild(document.createTextNode(h));a.appendChild(m);0===c&&(l.checked=
!0)});return a}function q(b){b=document.getElementsByName(b);for(var e,d=0;d<b.length;d++)if(b[d].checked){e=b[d].value;break}return e}var r=document.getElementsByTagName("body")[0],f=function(b,e,d){var a;r.appendChild(a=document.createElement("div"));a.id=b;a.style.cssText=" position:fixed;\n\t\ttop:10px;\n\t\tleft:10px;\n\t\tpadding:2px;\n\t\twidth:"+e+"px;\n\t\theight:"+d+"px;\n\t\topacity:0.8;\n\t\tfilter:alpha(opacity = 95);\n\t\tbackground:#000;\n\t\tborder:1px solid #666;\n\t\tcolor:#fff;\n\t\tfont-size:12px;\n\t\ttext-align:left;\n\t\tz-index:9998;\n\t\t-moz-border-radius:5px;";
a.appendChild(e=document.createElement("div"));e.innerHTML=b;e.style.cssText=" padding:0px 10px;\n\t\theight:20px;\n\t\tline-height:20px;\n\t\tcolor:#fff;\n\t\tfont-size:12px;\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t\tcursor:move;";var h=document.createElement("div");h.style.cssText="background:transparent;\n\t\tposition:fixed;\n\t\ttop:0px;\n\t\tleft:0px;\n\t\twidth:100%;\n\t\theight:100%;";a.appendChild(b=document.createElement("div"));b.id="frame";b.style.cssText="\n\t\t\theight: "+(d-
20)+"px;\n\t\t\toverflow: auto;\n\t\t\tbackgroundColor: #222;\n\t\t\tcolor: #eee;\n\t\t\tfontSize: 11px;\n\t\t\tcursor: auto;";a.appendChild(d=document.createElement("div"));d.title="close button";d.style.cssText='\n\t\t\tborder: #444 solid 1px;\n\t\t\tposition: absolute;\n\t\t\ttop: 5px";\n\t\t\tleft: 5px";\n\t\t\theight: 10px;\n\t\t\twidth: 10px;\n\t\t\tcursor: pointer;';d.onclick=function(){r.removeChild(this.parentNode)};e.onmousedown=function(c){x=c?c.pageX:event.x;y=c?c.pageY:event.y;ox=x-a.offsetLeft;
oy=y-a.offsetTop;a.appendChild(h);return!1};h.onmousemove=function(c){x=c?c.pageX:event.x;y=c?c.pageY:event.y;a.style.left=x-ox+"px";a.style.top=y-oy+"px";return!1};h.onmouseup=function(){a.removeChild(h);return!1};a.header=e;a.content=b;return a}("\u8535\u66f8\u7ba1\u7406\u30d1\u30cd\u30eb",300);f.header.innerHTML="\u8535\u66f8\u7ba1\u7406\u30d1\u30cd\u30eb";f=f.content;var n;f.appendChild(n=document.createElement("input"));n.style.cssText=" display:block;\n\twidth:90%;\n\tmargin:10px;\n\tborder:1px solid #666;\n\tbackground:transparent;\n\tcolor:inherit;\n\tfont-weight:bold;\n\tfont-size:13px;";
n.focus();f.appendChild(form1=k(["\u6c17\u306b\u306a\u308b","\u6b32\u3057\u3044","\u5bb6","\u5b9f\u5bb6"],1,"\u6240\u5728\u5730"));f.appendChild(form2=k(["\u672a\u8aad","\u30c1\u30e9\u898b","\u8aad\u3080","\u8aad\u3093\u3060"],2,"\u72b6\u614b"));f.appendChild(f=document.createElement("button"));f.innerHTML="Scrapbox \u3078\u4fdd\u5b58";f.style.cssText=" cursor:pointer;\n\tmargin:8px auto;\n\tdisplay:block;\n\tclear:both;";f.onclick=function(){try{var b=document.getElementById("productTitle");b||(b=
document.getElementById("ebooksProductTitle"));var e=b.innerHTML;if(e){var d=document.getElementById("imageBlockContainer");d||(d=document.getElementById("ebooksImageBlockContainer"));var a=d.getElementsByTagName("img"),h=a[a.length-1].getAttribute("src");b=[];var c=document.getElementsByClassName("author");for(g=0;g<c.length;g++){var m=c[g].innerText.replace(/\s+/g,""),l=m.match(/\(.+\)/),w=m.replace(/\(.+\)/,"");b.push("["+w+"]"+l)}c=[];var t=document.getElementsByClassName("a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list"),
u=t[0].getElementsByTagName("li");c.push(u[0].innerText.replace(/\s+|\(.+\)|&rlim;/g,""));c.push(u[1].innerText.replace(/\s+|\/.*\/.*|&rlim;/g,"").replace("\u65e5","\u5e74"));var v=t[1].childNodes[1].getElementsByTagName("li");for(idx=0;idx<v.length;idx++)c.push("\u30ab\u30c6\u30b4\u30ea:"+v[idx].innerText.replace(/^.*\u4f4d/,""));var z=n.value.split(/\s+/),p="["+h+" "+window.location.href+"]\n"+b.join(" ")+("\n#"+q("\u6240\u5728\u5730")+" #"+q("\u72b6\u614b"));document.getElementsByClassName("a-icon-alt")&&
(p+=" #"+document.getElementsByClassName("a-icon-alt")[0].innerHTML.replace("5\u3064\u661f\u306e\u3046\u3061","Amazon\u661f"));c&&(p+=" #"+c.join(" #"));n.value&&(p+="\n#"+z.join(" #"));document.getElementsByClassName("a-section a-spacing-small a-padding-small")&&(p+="\n\n\n[/icons/hr.icon]"+document.getElementsByClassName("a-section a-spacing-small a-padding-small")[0].innerText);var A=encodeURIComponent(p);window.open("https://scrapbox.io/oginos-reading-record/"+encodeURIComponent(e.trim())+"?body="+
A)}}catch(B){alert(B)}}})();