/* 
    Aluk Query Library
    (c)2023 Flutas,Reserved.
    (Powered by Xbodw)

    Linense MIT
*/

var aluk = function(select) {
    if(select == undefined || select == '') {
        if(aluk.language != 'zh-cn') {
            throw new Error('Your Selector was empty or undefined,please.');
        } else {
            throw new Error('您的选择器为空或未定义');
        }
    }
    return new querylist(select);
};
aluk.version = '1.4.2';
aluk.language = 'zh-cn';

querylist = function(selector) {
    var ce;
    if(typeof(selector) == 'string' && aluk.checkHtml(selector) === false) {
        ce = document.querySelectorAll(selector)
    } else {
        if(typeof(selector) == 'number') {
            if(aluk.language != 'zh-cn') {
                throw new Error('Your Query Selector Must be string or Object,Please.');
            } else {
                throw new Error('您的选择器必须为string或者object类型');
            }
        } else {
            if(typeof(selector) == 'object') {
                ce = new Array(selector);
            } else {
                if(aluk.checkHtml(selector) === true) {
                    ce = new Array(aluk.htmlToElement(selector));
                }
            }
        }
    }
    if(ce.length > 1) {
        ce.forEach(element => {
            this.push(element);
        });
        
    } else {
        this.push(ce[0]);
    }
    var fn = this;
    this.NormalResult = fn[0];
}
querylist.prototype = new Array();
querylist.prototype.createChildElement = function(index,options) {
    if(typeof(options) != 'object') {
        if(aluk.language != 'zh-cn') {
            throw new Error('Element Options Type Must as the Object');
        } else {
            throw new Error('Element选项必须是Object');
        }
    }
    if(options.ElementType == undefined) {
        if(aluk.language != 'zh-cn') {
            throw new Error('Element name not specified or empty')
        } else {
            throw new Error('Element类型不能为空');
        }
        

    }
    if(options.ElementType == '') {
        if(aluk.language != 'zh-cn') {
            throw new Error('Element name not specified or empty')
        } else {
            throw new Error('Element类型不能为空');
        }
    }
    var result = document.createElement(options.ElementType);
    if(options.Class == undefined) {

    } else {
        result.classList.value += options.Class;
    }
    if(options.id == undefined) {

    } else {
        result.id = options.id;
    }
    if(options.innerHTML == undefined) {

    } else {
        result.innerHTML = options.innerHTML;
    }
    this[index].appendChild(result);
    return Promise.resolve(this[index]);
}

aluk.objectToCss = function(obj) {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value};`)
      //.join('\n');
  }

querylist.prototype.SetCss = function(index,cssList) {
    if(index > this.length-1) {
        throw new Error('Index超出了预期范围');
    } else if(index == undefined || index == null) {
        throw new Error('Index为空或不存在');
    }
    if(typeof(cssList) != 'object') {
        throw new Error('Css列表必须为Object');
    }
    var csst = aluk.objectToCss(cssList);
    this[index].style.cssText= '';
    var cssaddcount = 0;
    csst.forEach(h => {
        this[index].style.cssText += h;
        cssaddcount++;
    })
    return cssaddcount;
}

querylist.prototype.AppendorMoveto = function(index,appender) {
    var append;
    if(appender instanceof querylist) {
        if(index > this.length-1) {
            throw new Error('Index超出了预期范围');
        } else if(index == undefined || index == null) {
            throw new Error('Index为空或不存在: 如果使用aluk querylist对象代替Element,那么请指定Index');
        }
        append = appender[index];
    } else {
        if(!aluk.isHtmlElement(appender)) {
            throw new Error('请指定html元素或者aluk querylist对象');
        }
        append = appender;
    }
    append.appendChild(this[index]);
}

querylist.prototype.RemoveX = function() {
    let count = 0;
    this.forEach(s => {
        s.remove();
        count++;
    })
    return count;
}

querylist.prototype.continue = function(select) {
    if(select == undefined || select == '') {
        if(aluk.language != 'zh-cn') {
            throw new Error('Your Selector was empty or undefined,please.');
        } else {
            throw new Error('您的选择器为空或未定义');
        }
    }
    var newElements = [];

  // 在当前 elements 数组中查找符合选择器的元素，并添加到 newElements 数组中
  for (var i = 0; i < this.length; i++) {
    var matches = this[i].querySelectorAll(select);
    newElements.push(matches);
  }
  var newQueryList = new querylist('<null>');
  newQueryList.shift()
    newElements.forEach(y => {
        y.forEach(z => {
            newQueryList.push(z)
        })
    })
    newQueryList.NormalResult = newQueryList[0];
  return newQueryList;
}

aluk.isHtmlElement = function(variable) {
    return variable instanceof Element || variable instanceof HTMLElement;
}

aluk.createElementX = function(options) {
    if(typeof(options) != 'object') {
        if(aluk.language != 'zh-cn') {
            throw new Error('Element Options Type Must as the Object');
        } else {
            throw new Error('Element选项必须是Object');
        }
    }
    if(options.ElementType == undefined) {
        if(aluk.language != 'zh-cn') {
            throw new Error('Element name not specified or empty')
        } else {
            throw new Error('Element类型不能为空');
        }
        

    }
    if(options.ElementType == '') {
        if(aluk.language != 'zh-cn') {
            throw new Error('Element name not specified or empty')
        } else {
            throw new Error('Element类型不能为空');
        }
    }
    var result = document.createElement(options.ElementType);
    if(options.Class == undefined) {

    } else {
        result.classList.value += options.Class;
    }
    if(options.id == undefined) {

    } else {
        result.id = options.id;
    }
    if(options.innerHTML == undefined) {

    } else {
        result.innerHTML = options.innerHTML;
    }
    return Promise.resolve(result);
}

aluk.htmlEscape = function(htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, match =>{
        switch(match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '&':
                return '&amp;';
        }
    })
}
aluk.htmlUnescape = function(html) {
    return html.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
        switch(match) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&quot;':
                return '"';
            case '&amp;':
                return '&';
        }
    })
}


aluk.appendHTMLX = function(appender,element,options) {
	if(appender == undefined) {
		if(aluk.language != 'zh-cn') {
            throw new Error('AppendElement name not specified or empty')
        } else {
            throw new Error('追加者Element类型不能为空');
        }
    }
    if(element == undefined) {
		if(aluk.language != 'zh-cn') {
            throw new Error('Append HTML not specified or empty')
        } else {
            throw new Error('追加的HTML不能为空');
        }
    }
    if(typeof(options) != 'boolean') {
        if(options != undefined) {
            if(aluk.language != 'zh-cn') {
                throw new Error('Options not specified or empty')
            } else {
            throw new Error('选项为空或不存在');
            }
        }
    }
    let fixr = element.innerHTML;
    let fixed = fixr;
    if(options) {
        fixed = aluk.htmlEscape(fixr);
    }
    appender.innerHTML += fixed;
    return Promise.resolve(appender.innerHTML);
}

aluk.checkHtml = function(htmlStr) {

    var reg = /<[a-z][\s\S]*>/i;
    
    return reg.test(htmlStr);
    
}
aluk.htmlToElement = function(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.firstChild;
  }

  aluk.WebUrlToBase64 = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  

aluk.ShowConsolePictures = function(url,options) {
    if(typeof(url) != 'string') {
        throw new Error('请指定URL!')
    }
    if(options != undefined && typeof(options) != 'object') {
        throw new Error('选项必须为Object')
    }
    if(document.querySelector('meta[content="no-referrer"]') == null) {
        document.head.innerHTML += '<meta name="referrer" content="no-referrer">';
    }
    var base64Regex = /^data:.*,/;
    if(base64Regex.test(url) == true) {
        console.log("%c ", "font-size:" + options.size + "%;line-height:" + options.height + "%;background:url(" + url + ") no-repeat" )
    } else {
    aluk.WebUrlToBase64(url, function(base64) {
        console.log("%c ", "font-size:" + options.size + "%;line-height:" + options.height + "%;background:url(" + base64 + ") no-repeat" )
      });
    }
}
