function e(e) {
    for (var t = {}, a = e.split(","), r = 0; r < a.length; r++) t[a[r]] = !0;
    return t;
}

var t = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, a = /^<\/([-A-Za-z0-9_]+)[^>]*>/, r = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, s = e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr,ad,open-data"), n = e("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video,ad,open-data"), o = e("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var,ad,open-data"), i = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), l = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), d = e("wxxxcode-style,script,style,view,scroll-view,block");

module.exports = function(e, c) {
    function f(e, t) {
        if (t) for (t = t.toLowerCase(), a = b.length - 1; a >= 0 && b[a] != t; a--) ; else var a = 0;
        if (a >= 0) {
            for (var r = b.length - 1; r >= a; r--) c.end && c.end(b[r]);
            b.length = a;
        }
    }
    var p, u, h, b = [], m = e;
    for (b.last = function() {
        return this[this.length - 1];
    }; e; ) {
        if (u = !0, b.last() && d[b.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + b.last() + "[^>]*>"), function(e, t) {
            return t = t.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), c.chars && c.chars(t), 
            "";
        }), f(0, b.last()); else if (0 == e.indexOf("\x3c!--") ? (p = e.indexOf("--\x3e")) >= 0 && (c.comment && c.comment(e.substring(4, p)), 
        e = e.substring(p + 3), u = !1) : 0 == e.indexOf("</") ? (h = e.match(a)) && (e = e.substring(h[0].length), 
        h[0].replace(a, f), u = !1) : 0 == e.indexOf("<") && (h = e.match(t)) && (e = e.substring(h[0].length), 
        h[0].replace(t, function(e, t, a, d) {
            if (t = t.toLowerCase(), n[t]) for (;b.last() && o[b.last()]; ) f(0, b.last());
            if (i[t] && b.last() == t && f(0, t), (d = s[t] || !!d) || b.push(t), c.start) {
                var p = [];
                a.replace(r, function(e, t) {
                    var a = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : l[t] ? t : "";
                    p.push({
                        name: t,
                        value: a,
                        escaped: a.replace(/(^|[^\\])"/g, '$1\\"')
                    });
                }), c.start && c.start(t, p, d);
            }
        }), u = !1), u) {
            p = e.indexOf("<");
            for (var g = ""; 0 === p; ) g += "<", p = (e = e.substring(1)).indexOf("<");
            g += p < 0 ? e : e.substring(0, p), e = p < 0 ? "" : e.substring(p), c.chars && c.chars(g);
        }
        if (e == m) throw "Parse Error: " + e;
        m = e;
    }
    f();
};