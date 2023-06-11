(self.webpackChunkKeeperNg=self.webpackChunkKeeperNg||[]).push([[319],{4319:(m,A,s)=>{"use strict";s.r(A),s.d(A,{DevelopersPageModule:()=>r});var g=s(6895),h=s(9116),o=s(4650),x=s(5083);class i{constructor(){this.formattedCode=""}ngOnInit(){this.formattedCode=(0,x.highlight)(this.formatCode,x.languages.javascript,"javascript")}}i.\u0275fac=function(a){return new(a||i)},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-code-highlighter"]],inputs:{formatCode:"formatCode"},decls:1,vars:1,consts:[[1,"code",3,"innerHTML"]],template:function(a,u){1&a&&o._UZ(0,"div",0),2&a&&o.Q6J("innerHTML",u.formattedCode,o.oJD)},styles:[".code[_ngcontent-%COMP%]{padding:10px;border-radius:5px;word-wrap:break-word;white-space:pre-wrap}"],changeDetection:0});var v=s(6305),k=s(3546);class S{constructor(){this.codeSnippet="\nconst express = require('express');\nconst axios = require('axios');\nconst bodyParser = require('body-parser');\nconst stream = require('stream');\n\nconst app = express();\n\n// Parse incoming request bodies as a stream\napp.use(bodyParser.raw({ type: 'application/octet-stream' }));\n\napp.post('/upload', (req, res) => {\n  // Get the API key\n  const apiKey = 'YOUR_API_KEY';\n\n  // Create a stream from the request body\n  const requestStream = new stream.PassThrough();\n  requestStream.end(req);\n\n  // Send the file stream to the KeeperCloud API\n  axios({\n    method: 'post',\n    url: 'https://api.keepercloud.com/v1/files',\n    data: requestStream,\n    headers: {\n      'Authorization': `Bearer ${apiKey}`,\n      'Content-Type': 'application/octet-stream'\n    }\n  }).then(apiResponse => {\n    // Return the API response to the client\n    res.send(apiResponse.data);\n  }).catch(error => {\n    console.error(error);\n    res.status(500).send(error);\n  });\n});\n\napp.listen(3000, () => {\n    console.log('Express server listening on port 3000');\n});"}}S.\u0275fac=function(a){return new(a||S)},S.\u0275cmp=o.Xpm({type:S,selectors:[["app-developers-page"]],decls:28,vars:1,consts:[["fadeInContent","",1,"container","mb-5","mt-5"],[1,"mb-5"],[1,"row","mt-5"],[1,"col-12"],[1,"p-3"],[1,"mb-4"],[3,"formatCode"]],template:function(a,u){1&a&&(o.TgZ(0,"div",0)(1,"h1",1),o._uU(2,"Developers"),o.qZA(),o.TgZ(3,"p"),o._uU(4," KeeperCloud also offers an API for developers to easily integrate file storage and sharing capabilities into their own applications or servers. "),o.qZA(),o.TgZ(5,"p"),o._uU(6," Our API documentation and support resources make it easy for developers to get started and build with KeeperCloud. "),o.qZA(),o.TgZ(7,"div",2)(8,"div",3)(9,"mat-card",4)(10,"mat-card-title",5),o._uU(11,"API Key"),o.qZA(),o.TgZ(12,"mat-card-content")(13,"p"),o._uU(14," To use the KeeperCloud API, you will need to obtain an API key. You can obtain an API key by signing up for a KeeperCloud account and navigating to the API Keys section in your account settings. "),o.qZA(),o.TgZ(15,"p"),o._uU(16," Once you have obtained your API key, you can use it to authenticate your API requests by including it as a bearer token in the `Authorization` header of your HTTP request. "),o.qZA(),o.TgZ(17,"pre"),o._uU(18,"Authorization: Bearer YOUR_API_KEY"),o.qZA()()()()(),o.TgZ(19,"div",2)(20,"div",3)(21,"mat-card",4)(22,"mat-card-title",5),o._uU(23,"Upload Files"),o.qZA(),o.TgZ(24,"mat-card-content")(25,"p"),o._uU(26," This Node.js snippet creates an Express server that receives a file stream from a client, adds an API key to the request, and forwards the file stream to the KeeperCloud API using the axios library, returning the API's response to the client. "),o.qZA(),o._UZ(27,"app-code-highlighter",6),o.qZA()()()()()),2&a&&(o.xp6(27),o.Q6J("formatCode",u.codeSnippet))},dependencies:[i,v.$,k.a8,k.dn,k.n5],changeDetection:0});const T=[{path:"",component:S}];class w{}w.\u0275fac=function(a){return new(a||w)},w.\u0275mod=o.oAB({type:w}),w.\u0275inj=o.cJS({imports:[h.Bz.forChild(T),h.Bz]}),s(710),s(1852),s(8668),s(1544);class p{}p.\u0275fac=function(a){return new(a||p)},p.\u0275mod=o.oAB({type:p}),p.\u0275inj=o.cJS({imports:[g.ez]});var t=s(8912),e=s(3457);class r{}r.\u0275fac=function(a){return new(a||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[g.ez,p,t.X,e.p,k.QW,w]})},710:()=>{!function(m){var A=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;m.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+A.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+A.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+A.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+A.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:A,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},m.languages.css.atrule.inside.rest=m.languages.css;var s=m.languages.markup;s&&(s.tag.addInlined("style","css"),s.tag.addAttribute("style","css"))}(Prism)},1852:()=>{Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),Prism.languages.js=Prism.languages.javascript},1544:()=>{Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)?url(?=\()/i,selector:{pattern:/(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-\w]+/,variable:/\$[-\w]+|#\{\$[-\w]+\}/}},property:{pattern:/(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,inside:{variable:/\$[-\w]+|#\{\$[-\w]+\}/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,{pattern:/( )(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.insertBefore("scss","important",{variable:/\$[-\w]+|#\{\$[-\w]+\}/}),Prism.languages.insertBefore("scss","function",{"module-modifier":{pattern:/\b(?:as|hide|show|with)\b/i,alias:"keyword"},placeholder:{pattern:/%[-\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"},operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.languages.scss},8668:()=>{!function(m){m.languages.typescript=m.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),m.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete m.languages.typescript.parameter,delete m.languages.typescript["literal-property"];var A=m.languages.extend("typescript",{});delete A["class-name"],m.languages.typescript["class-name"].inside=A,m.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:A}}}}),m.languages.ts=m.languages.typescript}(Prism)},5083:m=>{var s=function(g){var h=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,o=0,x={},i={manual:g.Prism&&g.Prism.manual,disableWorkerMessageHandler:g.Prism&&g.Prism.disableWorkerMessageHandler,util:{encode:function t(e){return e instanceof v?new v(e.type,t(e.content),e.alias):Array.isArray(e)?e.map(t):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(t){return Object.prototype.toString.call(t).slice(8,-1)},objId:function(t){return t.__id||Object.defineProperty(t,"__id",{value:++o}),t.__id},clone:function t(e,r){var n,a;switch(r=r||{},i.util.type(e)){case"Object":if(a=i.util.objId(e),r[a])return r[a];for(var u in r[a]=n={},e)e.hasOwnProperty(u)&&(n[u]=t(e[u],r));return n;case"Array":return a=i.util.objId(e),r[a]?r[a]:(r[a]=n=[],e.forEach(function(c,l){n[l]=t(c,r)}),n);default:return e}},getLanguage:function(t){for(;t;){var e=h.exec(t.className);if(e)return e[1].toLowerCase();t=t.parentElement}return"none"},setLanguage:function(t,e){t.className=t.className.replace(RegExp(h,"gi"),""),t.classList.add("language-"+e)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(n){var t=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(n.stack)||[])[1];if(t){var e=document.getElementsByTagName("script");for(var r in e)if(e[r].src==t)return e[r]}return null}},isActive:function(t,e,r){for(var n="no-"+e;t;){var a=t.classList;if(a.contains(e))return!0;if(a.contains(n))return!1;t=t.parentElement}return!!r}},languages:{plain:x,plaintext:x,text:x,txt:x,extend:function(t,e){var r=i.util.clone(i.languages[t]);for(var n in e)r[n]=e[n];return r},insertBefore:function(t,e,r,n){var a=(n=n||i.languages)[t],u={};for(var c in a)if(a.hasOwnProperty(c)){if(c==e)for(var l in r)r.hasOwnProperty(l)&&(u[l]=r[l]);r.hasOwnProperty(c)||(u[c]=a[c])}var f=n[t];return n[t]=u,i.languages.DFS(i.languages,function(y,E){E===f&&y!=t&&(this[y]=u)}),u},DFS:function t(e,r,n,a){a=a||{};var u=i.util.objId;for(var c in e)if(e.hasOwnProperty(c)){r.call(e,c,e[c],n||c);var l=e[c],f=i.util.type(l);"Object"!==f||a[u(l)]?"Array"===f&&!a[u(l)]&&(a[u(l)]=!0,t(l,r,c,a)):(a[u(l)]=!0,t(l,r,null,a))}}},plugins:{},highlightAll:function(t,e){i.highlightAllUnder(document,t,e)},highlightAllUnder:function(t,e,r){var n={callback:r,container:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",n),n.elements=Array.prototype.slice.apply(n.container.querySelectorAll(n.selector)),i.hooks.run("before-all-elements-highlight",n);for(var u,a=0;u=n.elements[a++];)i.highlightElement(u,!0===e,n.callback)},highlightElement:function(t,e,r){var n=i.util.getLanguage(t),a=i.languages[n];i.util.setLanguage(t,n);var u=t.parentElement;u&&"pre"===u.nodeName.toLowerCase()&&i.util.setLanguage(u,n);var l={element:t,language:n,grammar:a,code:t.textContent};function f(E){l.highlightedCode=E,i.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,i.hooks.run("after-highlight",l),i.hooks.run("complete",l),r&&r.call(l.element)}if(i.hooks.run("before-sanity-check",l),(u=l.element.parentElement)&&"pre"===u.nodeName.toLowerCase()&&!u.hasAttribute("tabindex")&&u.setAttribute("tabindex","0"),!l.code)return i.hooks.run("complete",l),void(r&&r.call(l.element));if(i.hooks.run("before-highlight",l),l.grammar)if(e&&g.Worker){var y=new Worker(i.filename);y.onmessage=function(E){f(E.data)},y.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else f(i.highlight(l.code,l.grammar,l.language));else f(i.util.encode(l.code))},highlight:function(t,e,r){var n={code:t,grammar:e,language:r};if(i.hooks.run("before-tokenize",n),!n.grammar)throw new Error('The language "'+n.language+'" has no grammar.');return n.tokens=i.tokenize(n.code,n.grammar),i.hooks.run("after-tokenize",n),v.stringify(i.util.encode(n.tokens),n.language)},tokenize:function(t,e){var r=e.rest;if(r){for(var n in r)e[n]=r[n];delete e.rest}var a=new T;return w(a,a.head,t),S(t,a,e,a.head,0),function Z(t){for(var e=[],r=t.head.next;r!==t.tail;)e.push(r.value),r=r.next;return e}(a)},hooks:{all:{},add:function(t,e){var r=i.hooks.all;r[t]=r[t]||[],r[t].push(e)},run:function(t,e){var r=i.hooks.all[t];if(r&&r.length)for(var a,n=0;a=r[n++];)a(e)}},Token:v};function v(t,e,r,n){this.type=t,this.content=e,this.alias=r,this.length=0|(n||"").length}function k(t,e,r,n){t.lastIndex=e;var a=t.exec(r);if(a&&n&&a[1]){var u=a[1].length;a.index+=u,a[0]=a[0].slice(u)}return a}function S(t,e,r,n,a,u){for(var c in r)if(r.hasOwnProperty(c)&&r[c]){var l=r[c];l=Array.isArray(l)?l:[l];for(var f=0;f<l.length;++f){if(u&&u.cause==c+","+f)return;var y=l[f],E=y.inside,q=!!y.lookbehind,_=!!y.greedy,G=y.alias;if(_&&!y.pattern.global){var J=y.pattern.toString().match(/[imsuy]*$/)[0];y.pattern=RegExp(y.pattern.source,J+"g")}for(var H=y.pattern||y,b=n.next,P=a;b!==e.tail&&!(u&&P>=u.reach);P+=b.value.length,b=b.next){var z=b.value;if(e.length>t.length)return;if(!(z instanceof v)){var $,D=1;if(_){if(!($=k(H,P,t,q))||$.index>=t.length)break;var M=$.index,W=$.index+$[0].length,C=P;for(C+=b.value.length;M>=C;)C+=(b=b.next).value.length;if(P=C-=b.value.length,b.value instanceof v)continue;for(var I=b;I!==e.tail&&(C<W||"string"==typeof I.value);I=I.next)D++,C+=I.value.length;D--,z=t.slice(P,C),$.index-=P}else if(!($=k(H,0,z,q)))continue;var R=$[0],L=z.slice(0,M=$.index),K=z.slice(M+R.length),U=P+z.length;u&&U>u.reach&&(u.reach=U);var B=b.prev;if(L&&(B=w(e,B,L),P+=L.length),j(e,B,D),b=w(e,B,new v(c,E?i.tokenize(R,E):R,G,R)),K&&w(e,b,K),D>1){var O={cause:c+","+f,reach:U};S(t,e,r,b.prev,P,O),u&&O.reach>u.reach&&(u.reach=O.reach)}}}}}}function T(){var t={value:null,prev:null,next:null},e={value:null,prev:t,next:null};t.next=e,this.head=t,this.tail=e,this.length=0}function w(t,e,r){var n=e.next,a={value:r,prev:e,next:n};return e.next=a,n.prev=a,t.length++,a}function j(t,e,r){for(var n=e.next,a=0;a<r&&n!==t.tail;a++)n=n.next;e.next=n,n.prev=e,t.length-=a}if(g.Prism=i,v.stringify=function t(e,r){if("string"==typeof e)return e;if(Array.isArray(e)){var n="";return e.forEach(function(f){n+=t(f,r)}),n}var a={type:e.type,content:t(e.content,r),tag:"span",classes:["token",e.type],attributes:{},language:r},u=e.alias;u&&(Array.isArray(u)?Array.prototype.push.apply(a.classes,u):a.classes.push(u)),i.hooks.run("wrap",a);var c="";for(var l in a.attributes)c+=" "+l+'="'+(a.attributes[l]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+c+">"+a.content+"</"+a.tag+">"},!g.document)return g.addEventListener&&(i.disableWorkerMessageHandler||g.addEventListener("message",function(t){var e=JSON.parse(t.data),r=e.language,a=e.immediateClose;g.postMessage(i.highlight(e.code,i.languages[r],r)),a&&g.close()},!1)),i;var F=i.util.currentScript();function d(){i.manual||i.highlightAll()}if(F&&(i.filename=F.src,F.hasAttribute("data-manual")&&(i.manual=!0)),!i.manual){var p=document.readyState;"loading"===p||"interactive"===p&&F&&F.defer?document.addEventListener("DOMContentLoaded",d):window.requestAnimationFrame?window.requestAnimationFrame(d):window.setTimeout(d,16)}return i}(typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{});m.exports&&(m.exports=s),typeof global<"u"&&(global.Prism=s),s.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},s.languages.markup.tag.inside["attr-value"].inside.entity=s.languages.markup.entity,s.languages.markup.doctype.inside["internal-subset"].inside=s.languages.markup,s.hooks.add("wrap",function(g){"entity"===g.type&&(g.attributes.title=g.content.replace(/&amp;/,"&"))}),Object.defineProperty(s.languages.markup.tag,"addInlined",{value:function(h,o){var x={};x["language-"+o]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:s.languages[o]},x.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:x}};i["language-"+o]={pattern:/[\s\S]+/,inside:s.languages[o]};var v={};v[h]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return h}),"i"),lookbehind:!0,greedy:!0,inside:i},s.languages.insertBefore("markup","cdata",v)}}),Object.defineProperty(s.languages.markup.tag,"addAttribute",{value:function(g,h){s.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+g+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[h,"language-"+h],inside:s.languages[h]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),s.languages.html=s.languages.markup,s.languages.mathml=s.languages.markup,s.languages.svg=s.languages.markup,s.languages.xml=s.languages.extend("markup",{}),s.languages.ssml=s.languages.xml,s.languages.atom=s.languages.xml,s.languages.rss=s.languages.xml,function(g){var h=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;g.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+h.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+h.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+h.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+h.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:h,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},g.languages.css.atrule.inside.rest=g.languages.css;var o=g.languages.markup;o&&(o.tag.addInlined("style","css"),o.tag.addAttribute("style","css"))}(s),s.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},s.languages.javascript=s.languages.extend("clike",{"class-name":[s.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),s.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,s.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:s.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:s.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:s.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:s.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:s.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),s.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:s.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),s.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),s.languages.markup&&(s.languages.markup.tag.addInlined("script","javascript"),s.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),s.languages.js=s.languages.javascript,function(){if(!(typeof s>"u"||typeof document>"u")){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var x={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",v="loading",k="loaded",T="pre[data-src]:not(["+i+'="'+k+'"]):not(['+i+'="'+v+'"])';s.hooks.add("before-highlightall",function(F){F.selector+=", "+T}),s.hooks.add("before-sanity-check",function(F){var d=F.element;if(d.matches(T)){F.code="",d.setAttribute(i,v);var p=d.appendChild(document.createElement("CODE"));p.textContent="Loading\u2026";var t=d.getAttribute("data-src"),e=F.language;if("none"===e){var r=(/\.(\w+)$/.exec(t)||[,"none"])[1];e=x[r]||r}s.util.setLanguage(p,e),s.util.setLanguage(d,e);var n=s.plugins.autoloader;n&&n.loadLanguages(e),function w(F,d,p){var t=new XMLHttpRequest;t.open("GET",F,!0),t.onreadystatechange=function(){4==t.readyState&&(t.status<400&&t.responseText?d(t.responseText):p(t.status>=400?function(F,d){return"\u2716 Error "+F+" while fetching file: "+d}(t.status,t.statusText):"\u2716 Error: File does not exist or is empty"))},t.send(null)}(t,function(a){d.setAttribute(i,k);var u=function j(F){var d=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(F||"");if(d){var p=Number(d[1]),e=d[3];return d[2]?e?[p,Number(e)]:[p,void 0]:[p,p]}}(d.getAttribute("data-range"));if(u){var c=a.split(/\r\n?|\n/g),l=u[0],f=null==u[1]?c.length:u[1];l<0&&(l+=c.length),l=Math.max(0,Math.min(l-1,c.length)),f<0&&(f+=c.length),f=Math.max(0,Math.min(f,c.length)),a=c.slice(l,f).join("\n"),d.hasAttribute("data-start")||d.setAttribute("data-start",String(l+1))}p.textContent=a,s.highlightElement(p)},function(a){d.setAttribute(i,"failed"),p.textContent=a})}}),s.plugins.fileHighlight={highlight:function(d){for(var e,p=(d||document).querySelectorAll(T),t=0;e=p[t++];)s.highlightElement(e)}};var Z=!1;s.fileHighlight=function(){Z||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),Z=!0),s.plugins.fileHighlight.highlight.apply(this,arguments)}}}()}}]);