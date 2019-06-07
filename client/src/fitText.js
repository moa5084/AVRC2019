// 横長のテキストラッパーは高さをフォントサイズに，
// 縦長のテキストラッパーは幅をフォントサイズに．
function fitText(child, parent, forceResize) {
	var h = document.querySelector(parent).clientHeight;
    var w = document.querySelector(parent).clientWidth;
    var resizeFlag = forceResize || false;
    var ratio = 1;
    if (h <= w) {
        document.querySelector(child).style.height = h * ratio + 'px';
        document.querySelector(child).style.fontSize = h * ratio + 'px';
        document.querySelector(child).style.lineHeight = h * ratio + 'px';
        if (resizeFlag || document.querySelector(child).clientWidth > w) {
            document.querySelector(child).style.transform += ' scale(' + (w / document.querySelector(child).clientWidth) + ", 1)";
        }
    } else {
        document.querySelector(child).style.width = w * ratio + 'px';
        document.querySelector(child).style.fontSize = w * ratio + 'px';
        document.querySelector(child).style.lineHeight = w * ratio + 'px';
        if (resizeFlag || document.querySelector(child).clientHeight > h) {
            document.querySelector(child).style.transform += ' scale(1, ' + (h / document.querySelector(child).clientHeight) + ")";
        }
    }
}

export { fitText };