var ctab = chrome.tabs;

var UA = 'googlebot';
var description = null;

var requestFilter = {
    urls: ["http://wenku.baidu.com/view/*","http://wk.baidu.com/view/*"]
},

extraInfoSpec = ['requestHeaders', 'blocking'],

handler = function (details) {

    if (UA == null) {
        return;
    }
    
    var headers = details.requestHeaders,
    blockingResponse = {};

    for (var i = 0, l = headers.length; i < l; ++i) {
        console.log(headers[i].name);
        if (headers[i].name == 'User-Agent') {
            headers[i].value = UA;
            break;
        }
    }

    blockingResponse.requestHeaders = headers;
    return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);

function setUA(ua, desc) {
    UA = ua;
    description = desc;
}

function clearUA() {
    UA = null;
    description = null;
}

function getUA() {
    return UA;
}

function getDescription() {
    return description;
}

function convertContent(tab) {
    chrome.contextMenus.create({
        type : "normal" ,
        title : "切换文档" ,
        documentUrlPatterns : ["http://*.wenku.baidu.com/view/*"] ,
        onclick : function (info, tab) {
            convertContent(tab);
        }
    });
    ctab.executeScript(tab.id, {
            code : ''},function (){
        });
}