javascript:(function(){
    var p = document.getElementById("productTitle");
    if (!p) var p = document.getElementById("ebooksProductTitle");
    var title=window.prompt('Scrap "Amazon" to your scrapbox.', p.innerHTML);
    if (!title) return;
    title = '『'+ title +'』';
    var imagecontainer=document.getElementById("imageBlockContainer");
    if (!imagecontainer) var imagecontainer = document.getElementById("ebooksImageBlockContainer");
    var image = imagecontainer.getElementsByTagName("img")[0];
    var imageurl = image.getAttribute("src");
    var pub = [];
var c = document.getElementsByClassName('author');
for (g=0; g < c.length ;g++){
        let at = c[g].innerText.replace(/,/,'');
        let pu = at.match(/\(.+\)/);
        let ct = at.replace(/\(.+\)/,'').replace(/ /g,'');
        pub.push(pu + ' [' + ct + ']');
}
var lines='['+imageurl+' '+window.location.href+']\n'  + pub.join(' ') + '\n#本';  
    var body=encodeURIComponent(lines);
    window.open('https://scrapbox.io/-プロジェクト名/'+encodeURIComponent(title.trim())+'?body='+body)
})(); 