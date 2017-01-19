var myModule = (function(win, doc, undefined){
    'use strict';

    var i, el;
    var defaults = {
            msg: 'lalala',
            selector: null,
            width: '200px',
            height: '200px',
            bgColor: '#ccc',
            child: null,
            action: {
                event: 'mouseover',
                handler: _rotate
            }
        };    

    function init(options) {  
        //extend defaults with options      
        _setupElements(_extend({}, defaults, options));        
    }

    //returns obj to use as settingsObj in _setupElements
    function _extend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
            }
        }
        return out;
    }

    function _setupElements(settingsObj){
        el = settingsObj.selector; //cache NodeList

        for(i=0; i<el.length; i++){
            _processElement(el[i], settingsObj);
        }
    }

    function _processElement(el, settingsObj){
        var childEl, childSettings, actionSettings;

        el.textContent = settingsObj.msg;
        el.style.height = settingsObj.height;
        el.style.width = settingsObj.width;
        el.style.backgroundColor = settingsObj.bgColor;

        if(settingsObj.child && Object.keys(settingsObj.child).length > 0){
            childSettings = settingsObj.child;
            childEl = doc.createElement(childSettings.tag);
            childEl.appendChild(doc.createTextNode(childSettings.value));

            if(childSettings.event && typeof childSettings.handler === 'function'){
                childEl.addEventListener(childSettings.event, childSettings.handler);
            }

            el.appendChild(childEl);
        }

        if(settingsObj.action && Object.keys(settingsObj.action).length > 0){
            actionSettings = settingsObj.action;

            if(actionSettings.event && typeof actionSettings.handler === 'function'){
                el.addEventListener(actionSettings.event, actionSettings.handler);
            }
        }
    }

    function _rotate(e){
        if (e.target.classList && e.target.classList.contains('myElement')){
            e.target.classList.add('rotating');
        }        
    }

    //expose only init
    return {
        init: init
    };
}(window, document));