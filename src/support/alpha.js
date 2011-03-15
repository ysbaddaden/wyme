/**
 * http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array
 */

// JavaScript 1.6

if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len  = this.length;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++)
		{
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}

if (!Array.prototype.lastIndexOf)
{
	Array.prototype.lastIndexOf = function(elt /*, from*/)
	{
		var len  = this.length;
		var from = Number(arguments[1]);
		if (isNaN(from)) {
			from = len - 1;
		}
		else
		{
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) {
				from += len;
			}
			else if (from >= len) {
				from = len - 1;
			}
		}
		for (; from > -1; from--)
		{
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}

if (!Array.prototype.every)
{
	Array.prototype.every = function(fn /*, self*/)
	{
		if (typeof fn != "function") {
			throw new TypeError();
		}
		var self = arguments[1];
		for (var i = 0, len = this.length; i < len; i++)
		{
			if (i in this && !fn.call(self, this[i], i, this)) {
				return false;
			}
		}
		return true;
	};
}

if (!Array.prototype.filter)
{
	Array.prototype.filter = function(fn /*, self*/)
	{
		if (typeof fn != "function") {
			throw new TypeError();
		}
		var res  = new Array();
		var self = arguments[1];
		for (var i = 0, len = this.length; i < len; i++)
		{
			if (i in this)
			{
				var val = this[i]; // in case fn mutates this
				if (fn.call(self, val, i, this)) {
					res.push(val);
				}
			}
		}
		return res;
	};
}

if (!Array.prototype.forEach)
{
	Array.prototype.forEach = function(fn)
	{
		if (typeof fn != "function") {
			throw new TypeError();
		}
		var self = arguments[1];
		for (var i = 0, len = this.length; i < len; i++)
		{
			if (i in this) {
				fn.call(self, this[i], i, this);
			}
		}
	}
}

if (!Array.prototype.map)
{
	Array.prototype.map = function(fn /*, self*/)
	{
		if (typeof fn != "function") {
			throw new TypeError();
		}
		var res  = new Array(len);
		var self = arguments[1];
		for (var i = 0, len = this.length; i < len; i++)
		{
			if (i in this) {
				res[i] = fn.call(self, this[i], i, this);
			}
		}
		return res;
	};
}

if (!Array.prototype.some)
{
	Array.prototype.some = function(fn /*, self*/)
	{
		if (typeof fn != "function") {
			throw new TypeError();
		}
		var self = arguments[1];
		for (var i = 0, len = this.length; i < len; i++)
		{
			if (i in this && fn.call(self, this[i], i, this))
			return true;
		}
		return false;
	};
}


// JavaScript 1.8

if (!Array.prototype.reduce)
{
	Array.prototype.reduce = function(fn /*, initial*/)
	{
		var len = this.length;
		if (typeof fn != "function") {
			throw new TypeError();
		}

		// no value to return if no initial value and an empty array
		if (len == 0 && arguments.length == 1) {
			throw new TypeError();
		}

		var i = 0;
		if (arguments.length >= 2) {
			var rv = arguments[1];
		}
		else
		{
			do
			{
				if (i in this)
				{
					rv = this[i++];
					break;
				}

				// if array contains no values, no initial value to return
				if (++i >= len) {
					throw new TypeError();
				}
			}
			while (true);
		}

		for (; i < len; i++)
		{
			if (i in this) {
				rv = fn.call(null, rv, this[i], i, this);
			}
		}

		return rv;
	};
}

if (!Array.prototype.reduceRight)
{
	Array.prototype.reduceRight = function(fn /*, initial*/)
	{
		var len = this.length;
		if (typeof fn != "function") {
			throw new TypeError();
		}

		// no value to return if no initial value, empty array
		if (len == 0 && arguments.length == 1) {
			throw new TypeError();
		}

		var i = len - 1;
		if (arguments.length >= 2) {
			var rv = arguments[1];
		}
		else
		{
			do
			{
				if (i in this)
				{
					rv = this[i--];
					break;
				}

				// if array contains no values, no initial value to return
				if (--i < 0) {
					throw new TypeError();
				}
			}
			while (true);
		}

		for (; i >= 0; i--)
		{
			if (i in this) {
				rv = fn.call(null, rv, this[i], i, this);
			}
		}

		return rv;
	};
}
/* JavaScript 1.8 */

if (!String.prototype.trim)
{
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/, '');
  }
}

/**
 * Core JavaScript backward compatibility.
 */

var Alpha = {};

// Internet Explorer browser sniffing (comes handy sometimes).
Alpha.browser = {
  ie:  !!(window.VBArray),
  ie6: !!(window.VBArray && document.implementation)
};

// NodeList emulator
Alpha.NodeList = function(nodes)
{
  for(var i=0, len=nodes.length; i<len; i++) {
    this[i] = nodes[i];
  }
  this.length = nodes.length;
}
Alpha.NodeList.prototype.item = function(i) {
  return this[i];
}

// Shortcut for document.getElementById, and element extender for MSIE < 8.
Alpha.$ = function(element)
{
  if (typeof element == "string") {
    element = document.getElementById(element)
  }
  else if (Alpha.extendElement) {
    element = Alpha.extendElement(element);
  }
  return element;
}

// Shortcut: $ => Alpha.$
if (typeof window.$ == "undefined") {
  window.$ = Alpha.$;
}

/**
 * Tries to emulate the DOM Element prototype in MSIE < 8.
 */

// The following tries to fix the DOM Element in MSIE < 8.
if (typeof Element == 'undefined')
{
  // Garbage Collector, to prevent memory leaks
  Alpha.garbage = [];
  window.attachEvent('onunload', function()
  {
    for (var i=0, len=Alpha.garbage.length; i<len; i++)
    {
      var element = Alpha.garbage[i];
      if (element)
      {
        // FIXME: Calling elm.clearAttributes() on unload crashes IE7?!
//        if (element.clearAttributes) {
//          element.clearAttributes();
//        }
        if (element.clearEvents) {
          element.clearEvents();
        }
      }
      delete Alpha.garbage[i];
    }
  });
  
  // Generic Object prototype emulator
  Alpha.prototypeEmulator = function()
  {
    var Obj       = {};
    Obj.prototype = {};

    Obj._alpha_extend = function(o)
    {
      if (/*typeof o == 'object' &&*/ !o._alpha_extended)
      {
        Alpha.garbage.push(o);

        for (var method in Obj.prototype)
        {
          // saves the original method
          if (o[method] && !o['_alpha_' + method]) {
            o['_alpha_' + method] = o[method];
          }
          
          // creates (or overwrites) the method
          o[method] = Obj.prototype[method];
        }
        o._alpha_extended = true;
      }
      return o;
    }
    return Obj;
  }

  // Emulates the DOM Element prototype
  Element = new Alpha.prototypeEmulator();

  // Manually extends an element
  Alpha.extendElement = function(elm) {
    return Element._alpha_extend(elm);
  }

  // Manually extends many elements
  Alpha.extendElements = function(elms)
  {
    var rs = [];
    for (var i=0, len=elms.length; i<len; i++) {
      rs.push(Alpha.extendElement(elms[i]));
    }
    return rs;
  }

  // document.createElement should return an already extended element
  // also extends <canvas> elements if excanvas.js is loaded
  Alpha._msie_createElement = document.createElement;
  document.createElement = function(tagName)
  {
    var elm = Alpha._msie_createElement(tagName);
    if (tagName == 'canvas' && window.G_vmlCanvasManager) {
      elm = G_vmlCanvasManager.initElement(elm);
    }
    return Alpha.extendElement(elm);
  }

  // document.getElementById should return an extended element
  Alpha._msie_getElementById = document.getElementById;
  document.getElementById = function(id)
  {
    var elm = Alpha._msie_getElementById(id);
    return elm ? Alpha.extendElement(elm) : elm;
  }

  // document.getElementsByName should return extended elements
  Alpha._msie_getElementsByName = document.getElementsByName;
  document.getElementsByName = function(id)
  {
    var elms = Alpha._msie_getElementsByName(id);
    return elms.length ? new Alpha.NodeList(Alpha.extendElements(elms)) : elms;
  }

  // document.getElementsByTagName should return extended elements
  Alpha._msie_getElementsByTagName = document.getElementsByTagName;
  document.getElementsByTagName = function(id)
  {
    var elms = Alpha._msie_getElementsByTagName(id);
    return elms.length ? new Alpha.NodeList(Alpha.extendElements(elms)) : elms;
  }

  // elm.getElementsByTagName should return extended elements
  Element.prototype.getElementsByTagName = function(id)
  {
    var elms = this._alpha_getElementsByTagName(id);
    return elms.length ? new Alpha.NodeList(Alpha.extendElements(elms)) : elms;
  }

  // fixes a pseudo-leak in MSIE
  Element.prototype.removeChild = function(child)
  {
    var garbage = document.getElementById('_alpha_msie_leak_garbage');
    if (!garbage)
    {
      garbage = document.createElement('div');
      garbage.id = '_alpha_msie_leak_garbage';
      garbage.style.display    = 'none';
      garbage.style.visibility = 'hidden';
      document.body.appendChild(garbage);
    }
    
    // removes the child
    this._alpha_removeChild(child);
    
    // destroys the reference
    garbage.appendChild(child);
    garbage.innerHTML = '';
  }
}

(function()
{
  var elm = document.createElement('div');
  
//  if (typeof elm.textContent == 'undefined')
//  {
//    Element.prototype._alpha_get_textContent = function ()
//    {
//      if (typeof this.innerText != 'undefined') {
//        return this.innerText;
//      }
//      var r = this.ownerDocument.createRange();
//      r.selectNodeContents(this);
//      return r.toString();
//    }
//    
//    if (Object.defineProperty)
//    {
//      Object.defineProperty(Element.prototype, 'textContent', {
//        get: Element.prototype._alpha_get_textContent});
//    }
//    else if (Element.prototype.__defineGetter__)
//    {
//      Element.prototype.__defineGetter__('textContent',
//        Element.prototype._alpha_get_textContent);
//    }
//  }

  if (typeof elm.innerText == 'undefined')
  {
    Element.prototype._alpha_get_innerText = function() {
      return this.textContent;
    }
    
    Element.prototype._alpha_set_innerText = function(text) {
      return this.textContent = text;
    }
    
    if (Object.defineProperty)
    {
      Object.defineProperty(Element.prototype, 'innerText', {
        get: Element.prototype._alpha_get_innerText,
        set: Element.prototype._alpha_set_innerText
      });
    }
    else if (Element.prototype.__defineGetter__)
    {
      Element.prototype.__defineGetter__('innerText', Element.prototype._alpha_get_innerText);
      Element.prototype.__defineSetter__('innerText', Element.prototype._alpha_set_innerText);
    }
  }

  if (typeof elm.children == 'undefined')
  {
    Element.prototype._alpha_get_children = function()
    {
      var children = [];
      var child = this.firstChild;
      while (child)
      {
        if (child.nodeType == 1) {
          children.push(child);
        }
        child = child.nextSibling;
      }
      return Alpha.extendElements ? Alpha.extendElements(children) : children;
    }
    
    if (Object.defineProperty)
    {
      Object.defineProperty(Element.prototype, 'children', {
        get: Element.prototype._alpha_get_children});
    }
    else if (Element.prototype.__defineGetter__)
    {
      Element.prototype.__defineGetter__('children',
        Element.prototype._alpha_get_children);
    }
  }

  if (typeof elm.childElementCount == 'undefined')
  {
    Element.prototype._alpha_get_childElementCount = function() {
      return this.children.length;
    }

    Element.prototype._alpha_get_firstElementChild = function()
    {
      var child = this.firstChild;
      while (child && child.nodeType != 1) {
        child = child.nextSibling;
      }
      return (child && child.nodeType == 1) ? Alpha.$(child) : null;
    }

    Element.prototype._alpha_get_lastElementChild = function()
    {
      var child = this.lastChild;
      while (child && child.nodeType != 1) {
        child = child.previousSibling;
      }
      return (child && child.nodeType == 1) ? Alpha.$(child) : null;
    }

    Element.prototype._alpha_get_nextElementSibling = function()
    {
      var sibling = this.nextSibling;
      while (sibling && sibling.nodeType != 1) {
        sibling = sibling.nextSibling;
      }
      return (sibling && sibling.nodeType == 1) ? Alpha.$(sibling) : null;
    }

    Element.prototype._alpha_get_previousElementSibling = function()
    {
      var sibling = this.previousSibling;
      while (sibling && sibling.nodeType != 1) {
        sibling = sibling.previousSibling;
      }
      return (sibling && sibling.nodeType == 1) ? Alpha.$(sibling) : null;
    }
    
    if (Object.defineProperty)
    {
      Object.defineProperty(Element.prototype, 'childElementCount',      {get: Element.prototype._alpha_get_childElementCount});
      Object.defineProperty(Element.prototype, 'firstElementChild',      {get: Element.prototype._alpha_get_firstElementChild});
      Object.defineProperty(Element.prototype, 'lastElementChild',       {get: Element.prototype._alpha_get_lastElementChild});
      Object.defineProperty(Element.prototype, 'nextElementSibling',     {get: Element.prototype._alpha_get_nextElementSibling});
      Object.defineProperty(Element.prototype, 'previousElementSibling', {get: Element.prototype._alpha_get_previousElementSibling});
    }
    else if (Element.prototype.__defineGetter__)
    {
      Element.prototype.__defineGetter__('childElementCount',      Element.prototype._alpha_get_childElementCount);
      Element.prototype.__defineGetter__('firstElementChild',      Element.prototype._alpha_get_firstElementChild);
      Element.prototype.__defineGetter__('lastElementChild',       Element.prototype._alpha_get_lastElementChild);
      Element.prototype.__defineGetter__('nextElementSibling',     Element.prototype._alpha_get_nextElementSibling);
      Element.prototype.__defineGetter__('previousElementSibling', Element.prototype._alpha_get_previousElementSibling);
    }
  }
  
  // makes getAttribute('class') and setAttribute('class') to work in IE < 8
  elm.className = 'something';
  
  if (elm.getAttribute('class') != 'something')
  {
    Element.prototype.getAttribute = function(attr)
    {
      if (attr.toLowerCase() == 'class') {
        attr = 'className';
      }
      return this._alpha_getAttribute(attr);
    }
    
    Element.prototype.setAttribute = function(attr, value)
    {
      if (attr.toLowerCase() == 'class') {
        attr = 'className';
      }
      return this._alpha_setAttribute(attr, value);
    }
  }

  // elm.hasAttribute(name) is missing in IE < 8
  if (typeof elm.hasAttribute == 'undefined')
  {
    Element.prototype.hasAttribute = function(attr) {
      return (this.getAttribute(attr) === null) ? false : true;
    }
  }
})();

/**
 * Returns attributes as extended elements. Also permits
 * to create pseudo getters in MSIE < 8.
 * 
 * Use only if you want or need compatibility with MSIE < 8.
 * 
 *   elm.get('nextSibling');
 *   elm.get('parentNode');
 *   elm.get('children');
 *   elm.get('nextElementSibling');
 * 
 * You may also use the following syntax, in order to restricy loading of this
 * file only to Internet Explorer 6 and 7:
 * 
 *   elm.get ? elm.get('nextSibling') : elm.nextSibling
 */
Element.prototype.get = function(attribute)
{
  if (this['_alpha_get_' + attribute]) {
    return this['_alpha_get_' + attribute]();
  }
  
  if (typeof this[attribute] != 'undefined')
  {
    if (this[attribute] && this[attribute].nodeType == 1) {
      return Alpha.$(this[attribute]);
    }
    return this[attribute];
  }
}

/**
 * Emulates DOM Events in Internet Explorer.
 * 
 * - document.createEvent()
 * - Element.dispatchEvent()
 * - Element.addEventListener()
 * - Element.removeEventListener()
 * 
 * requires: compat/core.js
 * requires: compat/element/dom.js
 * requires: compat/element/element.js
 * 
 * Custom event dispatching is inspired by Prototype.js
 * by Sam Stephenson http://www.prototypejs.org/
 */

if (!Element.prototype.addEventListener)
{
  var ALPHA_CUSTOM_EVENTS_COUNT = 'data-alpha-custom-events-counter';
  
  // adds support for DOMContentLoaded
  if (document.attachEvent)
  {
    document.attachEvent('onreadystatechange', function()
    {
      if (document.readyState == 'complete')
      {
        var e = document.createEvent('HTMLEvents');
        e.initEvent('DOMContentLoaded', true, true);
        document.dispatchEvent(e);
      }
    });
  }

  // fixes the Event DOM prototype
  if (typeof Event == 'undefined') {
    Event = new Alpha.prototypeEmulator();
  }

  Event.prototype.preventDefault = function() {
    this.returnValue = false;
  }

  Event.prototype.stopPropagation = function() {
    this.cancelBubble = true;
  }

  Alpha.event = function(currentTarget)
  {
    // clones current event
    var event = {};
    for (var i in window.event) {
      event[i] = window.event[i];
    }
    
    // adds missing methods
    for (var method in Event.prototype) {
      event[method] = Event.prototype[method];
    }
    
    // custom event
    if (event._alpha_event_type) {
      event.type = event._alpha_event_type;
    }
    
    // target: the element the event happened on
    if (event.target) {
      event.target = Alpha.$(event.target);
    }
    else if (event.srcElement) {
      event.target = Alpha.$(event.srcElement);
    }
    
    // currentTarget: the element that handles the event
    if (!event.currentTarget && currentTarget) {
      event.currentTarget = Alpha.$(currentTarget);
    }
    
    if (event.type == 'mouseover')
    {
      // relatedTarget: the element the mouse came from
      event.relatedTarget = Alpha.$(event.fromElement);
    }
    else if (event.type == 'mouseout')
    {
      // relatedTarget: the element the mouse left to
      event.relatedTarget = Alpha.$(event.toElement);
    }
    else {
      event.relatedTarget = null;
    }
    
    // fixes values
    event.pageX = event.clientX + document.scrollLeft;
    event.pageY = event.clientY + document.scrollTop;
    
    return event;
  }

  Element.prototype.addEventListener = function(type, listener, useCapture)
  {
    if (useCapture) {
      throw new Error("Capture mode isn't supported by MSIE (and isn't emulated).");
    }

    // creates the list of listeners to call (per type)
    if (!this._alpha_events) {
      this._alpha_events = {};
    }

    // creates the real listener for event type
    if (!this._alpha_events[type])
    {
      var self = this;
      var _event    = '_alpha_event_' + type + '_event';
      var _listener = '_alpha_event_' + type + '_listener';
      
      this._alpha_events[type] = {
        listeners: [],
        real_listener: function()
        {
          // the event object
          self[_event] = Alpha.event(self);
          
          // runs the list of listeners for event type. we use a custom launcher
          // in order for failing listeners not to stop the event dispatch.
          // see http://deanedwards.me.uk/weblog/2009/03/callbacks-vs-events/ for explanations.
          for (var i = 0, len = self._alpha_events[type].listeners.length; i < len; i++) {
            self[_listener] = self._alpha_events[type].listeners[i];
          }
          
          // copies properties for preventDefault() and stopPropagation() to have any effect
          window.event.returnValue  = self[_event].returnValue;
          window.event.cancelBubble = self[_event].cancelBubble;
        },
        custom_launcher: function(evt)
        {
          if (evt.propertyName == _listener) {
            self[_listener].call(self, self[_event]);
          }
        }
      };
      
      // attaches the real listener
      if (typeof this['on' + type] != 'undefined') {
        this.attachEvent('on' + type, this._alpha_events[type].real_listener);
      }
      else
      {
        // We can't use custom event types in IE, we thus use uncommon types,
        // and we have to listen for both (one that bubbles, and one that doesn't).
        // 
        // We also use a counter in order to not multiply the listerners, which
        // would multiple the event calls, each time we listen for a new custom
        // event.
        if (this.getAttribute(ALPHA_CUSTOM_EVENTS_COUNT) === null)
        {
          this.attachEvent('ondataavailable', this._alpha_events[type].real_listener);
          this.attachEvent('onlosecapture',   this._alpha_events[type].real_listener);
        }
        this.setAttribute(ALPHA_CUSTOM_EVENTS_COUNT, this.getAttribute(ALPHA_CUSTOM_EVENTS_COUNT) + 1);
      }
      
      this.attachEvent('onpropertychange', this._alpha_events[type].custom_launcher);
    }

    // adds the listener to internal list
    this._alpha_events[type].listeners.push(listener);
  }

  Element.prototype.removeEventListener = function(type, listener, useCapture)
  {
    if (useCapture) {
      return new Error("Capture mode isn't supported by MSIE (and isn't emulated).");
    }
    
    if (this._alpha_events)
    {
      if (this._alpha_events[type])
      {
        // removes the listener
        var idx = this._alpha_events[type].listeners.indexOf(listener);
        if (idx > -1)
        {
          delete this._alpha_events[type].listeners[idx];
          this._alpha_events[type].listeners.splice(idx, 1);
        }
        
        // no more listeners: let's detach the real one and clean up
        if (this._alpha_events[type].listeners.length == 0)
        {
          this._alpha_remove_event_listener(type);
          delete this._alpha_events[type];
        }
      }
      
      // no more listeners: let's clean up
      if (this._alpha_events.length == 0) {
        delete this._alpha_events;
      }
    }
  }

  Element.prototype.clearEvents = function()
  {
    if (this._alpha_events)
    {
      for (var type in this._alpha_events)
      {
        if (this._alpha_events[type].listeners)
        {
          for (var i=0, len=this._alpha_events[type].listeners.length; i<len; i++) {
            delete this._alpha_events[type].listeners[i];
          }
          this._alpha_remove_event_listener(type);
        }
        delete this._alpha_events[type];
      }
    }
  }

  Element.prototype._alpha_remove_event_listener = function(type)
  {
    if (typeof this['on' + type] != 'undefined') {
      this.detachEvent('on' + type, this._alpha_events[type].real_listener);
    }
    else if (this.getAttribute(ALPHA_CUSTOM_EVENTS_COUNT) == 1)
    {
      // custom event: we listen for two event types (one that bubbles, and one that doesn't)
      this.detachEvent('ondataavailable', this._alpha_events[type].real_listener);
      this.detachEvent('onlosecapture',   this._alpha_events[type].real_listener);
      this.removeAttribute(ALPHA_CUSTOM_EVENTS_COUNT);
    }
    else {
      this.setAttribute(ALPHA_CUSTOM_EVENTS_COUNT, this.getAttribute(ALPHA_CUSTOM_EVENTS_COUNT) - 1);
    }
    this.detachEvent('onpropertychange', this._alpha_events[type].custom_launcher);
  }


  // custom events

  Alpha.events = {};

  Alpha.events.Event = function() {}
  Alpha.events.Event.prototype.initEvent = function(type, canBubble, cancelable)
  {
    this.type = type;
    this.event = document.createEventObject();
    this.event.eventType = canBubble ? 'ondataavailable' : 'onlosecapture';
    this.event._alpha_event_type = type;
  }
  Alpha.events.HTMLEvents = function() {}
  Alpha.events.HTMLEvents.prototype = new Alpha.events.Event();

  document.createEvent = function(className) {
    return new Alpha.events[className];
  }

  Element.prototype.dispatchEvent = function(event)
  {
    for (var i in event)
    {
      if (i != 'type' && i != 'event'
        && typeof event.event[i] == undefined)
      {
        event.event[i] = event;
      }
    }
    return this.fireEvent(event.event.eventType, event.event);
  }

  document.addEventListener    = Element.prototype.addEventListener;
  document.removeEventListener = Element.prototype.removeEventListener;
  document.clearEvents         = Element.prototype.clearEvents;
  document.dispatchEvent       = Element.prototype.dispatchEvent;

  document.documentElement.addEventListener    = Element.prototype.addEventListener;
  document.documentElement.removeEventListener = Element.prototype.removeEventListener;
  document.documentElement.clearEvents         = Element.prototype.clearEvents;
  document.documentElement.dispatchEvent       = Element.prototype.dispatchEvent;

  window.addEventListener = function(type, listener, useCapture) {
    return document.documentElement.addEventListener(type, listener, useCapture);
  }
  window.removeEventListener = function(type, listener, useCapture) {
    return document.documentElement.removeEventListener(type, listener, useCapture);
  }
  window.clearEvents = function() {
    return document.documentElement.clearEvents();
  }
  window.dispatchEvent = function(event) {
    return document.documentElement.dispatchEvent(event);
  }

  document.body.addEventListener    = Element.prototype.addEventListener;
  document.body.removeEventListener = Element.prototype.removeEventListener;
  document.body.clearEvents         = Element.prototype.clearEvents;
  document.body.dispatchEvent       = Element.prototype.dispatchEvent;
}
// window dimensions are undefined in IE
if (typeof window.innerWidth == 'undefined')
{
  if (Object.defineProperty)
  {
    // IE 8
    Object.defineProperty(window, 'innerWidth', {get: function() {
      return document.documentElement.clientWidth;
    }});
    Object.defineProperty(window, 'innerHeight', {get: function() {
      return document.documentElement.clientHeight;
    }});
    Object.defineProperty(window, 'pageXOffset', {get: function() {
      return document.documentElement.scrollWidth;
    }});
    Object.defineProperty(window, 'pageYOffset', {get: function() {
      return document.documentElement.scrollHeight;
    }});
  }
  else
  {
    // IE 6-7
    Alpha.__msie_onresize = function()
    {
      window.innerWidth  = document.documentElement.clientWidth;
      window.innerHeight = document.documentElement.clientHeight;
      window.pageXOffset = document.documentElement.scrollWidth;
      window.pageYOffset = document.documentElement.scrollHeight;
    }
    Alpha.__msie_onresize();
    window.attachEvent('onresize', Alpha.__msie_onresize);
  }
}

/**
 * Implements querySelectorAll and querySelector when missing.
 * 
 * This is a fork of Sly v1.0rc2 <http://sly.digitarald.com>
 * Copyright (c) 2009 Harald Kirschner <http://digitarald.de>
 * Open source under MIT License
 * 
 * Sly's code and pattern are inspired by several open source developers.
 * 
 * Valerio Proietti & MooTools contributors
 *  - Idea of modular combinator and pseudo filters
 *  - Code for several pseudo filters
 *  - Slickspeed benchmark framework
 * Steven Levithan
 *  - Improved Sly.parse expression
 * Diego Perini
 *  - Research on querySelectorAll and browser quirks
 *  - Patches for Sly.parse expression
 *  - Combined tests from jQuery and Prototype
 * Thomas Aylott & Slick contributors
 *   - Idea of using regular expressions in attribute filter.
 * John Resig & jQuery/Sizzle contributors
 *  - Browser feature/quirks detection
 *  - Additional pseudo filters
 *  - Extensive Unit Tests, (c) 2008 John Resig, Jörn Zaefferer, MIT/GPL dual license
 * Sam Stephenson & Prototype contributors
 *  - Extensive Unit Tests, (c) 2005-2008 Sam Stephenson, MIT-style license
 * Alan Kang & JSSpec contributors
 *  - JSSpec BDD framework
 * 
 * 
 * Modifications from original Sly:
 * 
 *  - implements querySelector() & querySelectorAll().
 *  - use of querySelectorAll() has been removed (no use, we actually replace it when missing or obviously limited).
 *  - non standard selectors/operators have been removed (ie :contains).
 *  - integrated missing CSS 3 pseudo selectors (ie. :root and :target).
 * 
 * Lacks:
 * 
 *  - support for HTML5 elements in IE (that's IE's fault).
 */

if (!Element.prototype.querySelectorAll || Alpha.browser.ie)
{
  var Sly   = (function()
  {
    var cache = {};

    /**
     * Sly::constructor
     * 
     * Acts also as shortcut for Sly::search if context argument is given.
     */
    var Sly = function(text, context, results, options) {
	    // normalise
	    text = (typeof(text) == 'string') ? text.replace(/^\s+|\s+$/, '') : '';
	
	    var cls = cache[text] || (cache[text] = new Sly.initialize(text));
	    return (context == null) ? cls : cls.search(context, results, options);
    };

    Sly.initialize = function(text) {
	    this.text = text;
    };

    var proto = Sly.initialize.prototype = Sly.prototype;


    /**
     * Sly.implement
     */
    Sly.implement = function(key, properties) {
	    for (var prop in properties) Sly[key][prop] = properties[prop];
    };


    /**
     * Sly.support
     *
     * Filled with experiment results.
     */
    var support = Sly.support = {};

    // Checks similar to NWMatcher, Sizzle
    (function() {
	
	    // Our guinea pig
	    var testee = document.createElement('div'), id = (new Date()).getTime();
	    testee.innerHTML = '<a name="' + id + '" class="€ b"></a>';
	    testee.appendChild(document.createComment(''));
	
	    // IE returns comment nodes for getElementsByTagName('*')
	    support.byTagAddsComments = (testee.getElementsByTagName('*').length > 1);
	
	    // Safari can't handle uppercase or unicode characters when in quirks mode.
//	    support.hasQsa = !!(testee.querySelectorAll && testee.querySelectorAll('.€').length);
	
	    support.hasByClass = (function() {
		    if (!testee.getElementsByClassName || !testee.getElementsByClassName('b').length) return false;
		    testee.firstChild.className = 'c';
		    return (testee.getElementsByClassName('c').length == 1);
	    })();
	
	    var root = document.documentElement;
	    root.insertBefore(testee, root.firstChild);
	
	    // IE returns named nodes for getElementById(name)
	    support.byIdAddsName = !!(document.getElementById(id));
	
	    root.removeChild(testee);
	
    })();


    var locateFast = function() {
	    return true;
    };

    /**
     * Sly::search
     */
    proto.search = function(context, results, options) {
	    options = options || {};
	
	    var iterate, i, item;

	    if (!context) {
		    context = document;
	    } else if (context.nodeType != 1 && context.nodeType != 9) {
		    if (typeof(context) == 'string') {
			    context = Sly.search(context);
			    iterate = true;
		    } else if (Object.prototype.toString.call(context) == '[object Array]' || (typeof(context.length) == 'number' && context.item)) { // simple isArray
			    var filtered = [];
			    for (i = 0; (item = context[i]); i++) {
				    if (item.nodeType == 1 || item.nodeType == 9) filtered.push(item);
			    }
			    iterate = (filtered.length > 1);
			    context = (iterate) ? filtered : (filtered[0] || document);
		    }
	    }
	
	    var mixed, // results need to be sorted, comma
		    combined, // found nodes from one iteration process
		    nodes, // context nodes from one iteration process
		    all = {}, // unique ids for overall result
		    state = {}; // matchers temporary state
	    var current = all; // unique ids for one iteration process

	    // unifiers
	    var getUid = Sly.getUid;
	    var locateCurrent = function(node) {
		    var uid = getUid(node);
		    return (current[uid]) ? null : (current[uid] = true);
	    };
	
	    if (results && results.length) { // fills unique ids, does not alter the given results
		    for (i = 0; (item = results[i]); i++) locateCurrent(item);
	    }
	    
      /*
	    if (support.hasQsa && !iterate && context.nodeType == 9 && !(/\[/).test(this.text)) {
		    try {
			    var query = context.querySelectorAll(this.text);
		    } catch(e) {}
		    if (query) {
			    if (!results) return Sly.toArray(query);
			    for (i = 0; (item = query[i]); i++) {
				    if (locateCurrent(item)) results.push(item);
			    }
			    if (!options.unordered) results.sort(Sly.compare);
			    return results;
		    }
	    }
	    */

	    var parsed = this.parse();
	    if (!parsed.length) return [];

	    for (var i = 0, selector; (selector = parsed[i]); i++) {

		    var locate = locateCurrent;

		    if (selector.first) {
			    if (!results) locate = locateFast;
			    else mixed = true;
			    if (iterate) nodes = context;
			    else if (selector.combinator) nodes = [context]; // allows combinators before selectors
		    }

		    if (selector.last && results) {
			    current = all;
			    combined = results;
		    } else {
			    // default stack
			    current = {};
			    combined = [];
		    }

		    if (!selector.combinator && !iterate) {
			    // without prepended combinator
			    combined = selector.combine(combined, context, selector, state, locate, !(combined.length));
		    } else {
			    // with prepended combinators
			    for (var k = 0, l = nodes.length; k < l; k++) {
				    combined = selector.combine(combined, nodes[k], selector, state, locate);
			    }
		    }

		    if (selector.last) {
			    if (combined.length) results = combined;
		    } else {
			    nodes = combined;
		    }
	    }

	    if (!options.unordered && mixed && results) results.sort(Sly.compare);

	    return results || [];
    };

    /**
     * Sly::find
     */
    proto.find = function(context, results, options) {
	    return this.search(context, results, options)[0];
    };


    /**
     * Sly::match
     */
    proto.match = function(node, parent) {
	    var parsed = this.parse();
	    if (parsed.length == 1) return !!(this.parse()[0].match(node, {}));
	    if (!parent) {
		    parent = node;
		    while (parent.parentNode) parent = parent.parentNode
	    }
	    var found = this.search(parent), i = found.length;
	    if (!i--) return false;
	    while (i--) {
		    if (found[i] == node) return true;
	    }
	    return false;
    };


    /**
     * Sly::filter
     */
    proto.filter = function(nodes) {
	    var results = [], match = this.parse()[0].match;
	    for (var i = 0, node; (node = nodes[i]); i++) {
		    if (match(node)) results.push(node);
	    }
	    return results;
    };


    /**
     * Sly.recompile()
     */
    var pattern;

    Sly.recompile = function() {

	    var key, combList = [','], operList = ['!'];

	    for (key in combinators) {
		    if (key != ' ') {
			    combList[(key.length > 1) ? 'unshift' : 'push'](Sly.escapeRegExp(key));
		    }
	    }
	    for (key in operators) operList.push(key);

	    /**
		    The regexp is a group of every possible selector part including combinators.
		    "|" separates the possible selectors.

		    Capturing parentheses:
		    1 - Combinator (only requires to allow multiple-character combinators)
		    2 - Attribute name
		    3 - Attribute operator
		    4, 5, 6 - The value
		    7 - Pseudo name
		    8, 9, 10 - The value
	     */

	    pattern = new RegExp(
		    // A tagname
		    '[\\w\\u00a1-\\uFFFF][\\w\\u00a1-\\uFFFF-]*|' +

		    // An id or the classname
		    '[#.](?:[\\w\\u00a1-\\uFFFF-]|\\\\:|\\\\.)+|' +

		    // Whitespace (descendant combinator)
		    '[ \\t\\r\\n\\f](?=[\\w\\u00a1-\\uFFFF*#.[:])|' +

		    // Other combinators and the comma
		    '[ \\t\\r\\n\\f]*(' + combList.join('|') + ')[ \\t\\r\\n\\f]*|' +

		    // An attribute, with the various and optional value formats ([name], [name=value], [name="value"], [name='value']
		    '\\[([\\w\\u00a1-\\uFFFF-]+)[ \\t\\r\\n\\f]*(?:([' + operList.join('') + ']?=)[ \\t\\r\\n\\f]*(?:"([^"]*)"|\'([^\']*)\'|([^\\]]*)))?]|' +

		    // A pseudo-class, with various formats
		    ':([-\\w\\u00a1-\\uFFFF]+)(?:\\((?:"([^"]*)"|\'([^\']*)\'|([^)]*))\\))?|' +

		    // The universial selector, not process
		    '\\*|(.+)', 'g'
	    );
    };


    // I prefer it outside, not sure if this is faster
    var create = function(combinator) {
	    return {
		    ident: [],
		    classes: [],
		    attributes: [],
		    pseudos: [],
		    combinator: combinator
	    };
    };

    var blank = function($0) {
	    return $0;
    };

    /**
     * Sly::parse
     *
     * Returns an array with one object for every selector:
     *
     * {
     *   tag: (String) Tagname (defaults to null for universal *)
     *   id: (String) Id
     *   classes: (Array) Classnames
     *   attributes: (Array) Attribute objects with "name", "operator" and "value"
     *   pseudos: (Array) Pseudo objects with "name" and "value"
     *   operator: (Char) The prepended operator (not comma)
     *   first: (Boolean) true if it is the first selector or the first after a comma
     *   last: (Boolean) true if it is the last selector or the last before a comma
     *   ident: (Array) All parsed matches, can be used as cache identifier.
     * }
     */
    proto.parse = function(plain) {
	    var save = (plain) ? 'plain' : 'parsed';
	    if (this[save]) return this[save];
	
	    var text = this.text;
	    var compute = (plain) ? blank : this.compute;

	    var parsed = [], current = create(null);
	    current.first = true;

	    var refresh = function(combinator) {
		    parsed.push(compute(current));
		    current = create(combinator);
	    };

	    pattern.lastIndex = 0; // to fix some weird behavior
	    var match, $0;
	
	    while ((match = pattern.exec(text))) {
		
		    if (match[11]) {
			    if (Sly.verbose) throw SyntaxError('Syntax error, "' + $0 + '" unexpected at #' + pattern.lastIndex + ' in "' + text + '"');
			    return (this[save] = []);
		    }
		
		    $0 = match[0];
		
		    switch ($0.charAt(0)) {
			    case '.':
				    current.classes.push($0.slice(1).replace(/\\/g, ''));
				    break;
			    case '#':
				    current.id = $0.slice(1).replace(/\\/g, '');
				    break;
			    case '[':
				    current.attributes.push({
					    name: match[2],
					    operator: match[3] || null,
					    value: match[4] || match[5] || match[6] || null
				    });
				    break;
			    case ':':
				    current.pseudos.push({
					    name: match[7],
					    value: match[8] || match[9] || match[10] || null
				    });
				    break;
			    case ' ': case '\t': case '\r': case '\n': case '\f':
				    match[1] = match[1] || ' ';
			    default:
				    var combinator = match[1];
				    if (combinator) {
					    if (combinator == ',') {
						    current.last = true;
						    refresh(null);
						    current.first = true;
						    continue;
					    }
					    if (current.first && !current.ident.length) current.combinator = combinator;
					    else refresh(combinator);
				    } else {
					    if ($0 != '*') current.tag = $0;
				    }
		    }
		    current.ident.push($0);
	    }

	    current.last = true;
	    parsed.push(compute(current));

	    return (this[save] = parsed);
    };


    // chains two given functions

    function chain(prepend, append, aux, unshift) {
	    return (prepend) ? ((unshift) ? function(node, state) {
		    return append(node, aux, state) && prepend(node, state);
	    } : function(node, state) {
		    return prepend(node, state) && append(node, aux, state);
	    }) : function(node, state) {
		    return append(node, aux, state);
	    };
	    // fn.$slyIndex = (prepend) ? (prepend.$slyIndex + 1) : 0;
    };


    // prepared match comperators, probably needs namespacing
    var empty = function() {
	    return true;
    };

    var matchId = function(node, id) {
	    return (node.id == id);
    };

    var matchTag = function(node, tag) {
	    return (node.nodeName.toUpperCase() == tag);
    };

    var prepareClass = function(name) {
	    return (new RegExp('(?:^|[ \\t\\r\\n\\f])' + name + '(?:$|[ \\t\\r\\n\\f])'));
    };

    var matchClass = function(node, expr) {
	    return node.className && expr.test(node.className);
    };

    var prepareAttribute = function(attr) {
	    attr.getter = Sly.lookupAttribute(attr.name) || Sly.getAttribute;
	    if (!attr.operator || !attr.value) return attr;
	    var parser = operators[attr.operator];
	    if (parser) { // @todo: Allow functions, not only regex
		    attr.escaped = Sly.escapeRegExp(attr.value);
		    attr.pattern = new RegExp(parser(attr.value, attr.escaped, attr));
	    }
	    return attr;
    };

    var matchAttribute = function(node, attr) {
	    var read = attr.getter(node, attr.name);
	    switch (attr.operator) {
		    case null: return read;
		    case '=': return (read == attr.value);
		    case '!=': return (read != attr.value);
	    }
	    if (!read && attr.value) return false;
	    return attr.pattern.test(read);
    };


    /**
     * Sly::compute
     *
     * Attaches the following methods to the selector object:
     *
     * {
     *   search: Uses the most convinient properties (id, tag and/or class) of the selector as search.
     *   matchAux: If search does not contain all selector properties, this method matches an element against the rest.
     *   match: Matches an element against all properties.
     *   simple: Set when matchAux is not needed.
     *   combine: The callback for the combinator
     * }
     */
    proto.compute = function(selector) {

	    var i, item, match, search, matchSearch, tagged,
		    tag = selector.tag,
		    id = selector.id,
		    classes = selector.classes;

	    var nodeName = (tag) ? tag.toUpperCase() : null;

	    if (id) {
		    tagged = true;

		    matchSearch = chain(null, matchId, id);

		    search = function(context) {
			    if (context.getElementById) {
				    var el = context.getElementById(id);
				    return (el
					    && (!nodeName || el.nodeName.toUpperCase() == nodeName)
					    && (!support.getIdAdds || el.id == id))
						    ? [el]
						    : [];
			    }

			    var query = context.getElementsByTagName(tag || '*');
			    for (var j = 0, node; (node = query[j]); j++) {
				    if (node.id == id) return [node];
			    }
			    return [];
		    };
	    }

	    if (classes.length > 0) {

		    if (!search && support.hasByClass) {

			    for (i = 0; (item = classes[i]); i++) {
				    matchSearch = chain(matchSearch, matchClass, prepareClass(item));
			    }

			    var joined = classes.join(' ');
			    search = function(context) {
				    return context.getElementsByClassName(joined);
			    };

		    } else if (!search && classes.length == 1) { // optimised for typical .one-class-only

			    tagged = true;

			    var expr = prepareClass(classes[0]);
			    matchSearch = chain(matchSearch, matchClass, expr);

			    search = function(context) {
				    var query = context.getElementsByTagName(tag || '*');
				    var found = [];
				    for (var i = 0, node; (node = query[i]); i++) {
					    if (node.className && expr.test(node.className)) found.push(node);
				    }
				    return found;
			    };

		    } else {

			    for (i = 0; (item = classes[i]); i++) {
				    match = chain(match, matchClass, prepareClass(item));
			    }

		    }
	    }

	    if (tag) {

		    if (!search) {
			    matchSearch = chain(matchSearch, matchTag, nodeName);

			    search = function(context) {
				    return context.getElementsByTagName(tag);
			    };
		    } else if (!tagged) { // search does not filter by tag yet
			    match = chain(match, matchTag, nodeName);
		    }

	    } else if (!search) { // default engine

		    search = function(context) {
			    var query = context.getElementsByTagName('*');
			    if (!support.byTagAddsComments) return query;
			    var found = [];
			    for (var i = 0, node; (node = query[i]); i++) {
				    if (node.nodeType === 1) found.push(node);
			    }
			    return found;
		    };

	    }

	    for (i = 0; (item = selector.pseudos[i]); i++) {

		    if (item.name == 'not') { // optimised :not(), fast as possible
			    var not = Sly(item.value);
			    match = chain(match, function(node, not) {
				    return !not.match(node);
			    }, (not.parse().length == 1) ? not.parsed[0] : not);
		    } else {
			    var parser = pseudos[item.name];
			    if (parser) match = chain(match, parser, item.value);
		    }

	    }

	    for (i = 0; (item = selector.attributes[i]); i++) {
		    match = chain(match, matchAttribute, prepareAttribute(item));
	    }

	    if ((selector.simple = !(match))) {
		    selector.matchAux = empty;
	    } else {
		    selector.matchAux = match;
		    matchSearch = chain(matchSearch, match);
	    }

	    selector.match = matchSearch || empty;

	    selector.combine = Sly.combinators[selector.combinator || ' '];

	    selector.search = search;

	    return selector;
    };

    // Combinators/Pseudos partly from MooTools 1.2-pre, (c) 2006-2009 Valerio Proietti, MIT License

    /**
     * Combinators
     */
    var combinators = Sly.combinators = {

	    ' ': function(combined, context, selector, state, locate, fast) {
		    var nodes = selector.search(context);
		    if (fast && selector.simple) return Sly.toArray(nodes);
		    for (var i = 0, node, aux = selector.matchAux; (node = nodes[i]); i++) {
			    if (locate(node) && aux(node, state)) combined.push(node);
		    }
		    return combined;
	    },

	    '>': function(combined, context, selector, state, locate) {
		    var nodes = selector.search(context);
		    for (var i = 0, node; (node = nodes[i]); i++) {
			    if (node.parentNode == context && locate(node) && selector.matchAux(node, state)) combined.push(node);
		    }
		    return combined;
	    },

	    '+': function(combined, context, selector, state, locate) {
		    while ((context = context.nextSibling)) {
			    if (context.nodeType == 1) {
				    if (locate(context) && selector.match(context, state)) combined.push(context);
				    break;
			    }

		    }
		    return combined;
	    },

	    '~': function(combined, context, selector, state, locate) {
		    while ((context = context.nextSibling)) {
			    if (context.nodeType == 1) {
				    if (!locate(context)) break;
				    if (selector.match(context, state)) combined.push(context);
			    }
		    }
		    return combined;
	    }

    };


    /**
     * Pseudo-Classes
     */
    var pseudos = Sly.pseudos = {

	    // w3c pseudo classes

	    'first-child': function(node) {
		    return pseudos.index(node, 0);
	    },

	    'last-child': function(node) {
		    while ((node = node.nextSibling)) {
			    if (node.nodeType === 1) return false;
		    }
		    return true;
	    },

	    'only-child': function(node) {
		    var prev = node;
		    while ((prev = prev.previousSibling)) {
			    if (prev.nodeType === 1) return false;
		    }
		    var next = node;
		    while ((next = next.nextSibling)) {
			    if (next.nodeType === 1) return false;
		    }
		    return true;
	    },

	    'nth-child': function(node, value, state) {
		    var parsed = Sly.parseNth(value || 'n');
		    if (parsed.special != 'n') return pseudos[parsed.special](node, parsed.a, state);
		    state = state || {}; // just to be sure
		    state.positions = state.positions || {};
		    var uid = Sly.getUid(node) ;
		    if (!state.positions[uid]) {
			    var count = 0;
			    while ((node = node.previousSibling)) {
				    if (node.nodeType != 1) continue;
				    count++;
				    var position = state.positions[Sly.getUid(node)];
				    if (position != undefined) {
					    count = position + count;
					    break;
				    }
			    }
			    state.positions[uid] = count;
		    }
		    return (state.positions[uid] % parsed.a == parsed.b);
	    },

	    'empty': function(node) {
		    return !(node.innerText || node.textContent || '').length;
	    },

	    'index': function(node, index) {
		    var count = 1;
		    while ((node = node.previousSibling)) {
			    if (node.nodeType == 1 && ++count > index) return false;
		    }
		    return (count == index);
	    },

	    'even': function(node, value, state) {
		    return pseudos['nth-child'](node, '2n+1', state);
	    },

	    'odd': function(node, value, state) {
		    return pseudos['nth-child'](node, '2n', state);
	    },

	    // http://www.w3.org/TR/css3-selectors/#root-pseudo
	    'root': function(node) {
		    return (node.parentNode == node.ownerDocument);
	    },

      // http://www.w3.org/TR/css3-selectors/#target-pseudo
      'target': function(node) {
        var hash = location.hash;
        return (node.id && hash && node.id == hash.slice(1));
      }
    };

    pseudos.first = pseudos['first-child'];
    pseudos.last = pseudos['last-child'];
    pseudos.nth = pseudos['nth-child'];
    pseudos.eq = pseudos.index;


    /**
     * Attribute operators
     */
    var operators = Sly.operators = {

	    '*=': function(value, escaped) {
		    return escaped;
	    },

	    '^=': function(value, escaped) {
		    return '^' + escaped;
	    },

	    '$=': function(value, escaped) {
		    return value + '$';
	    },

	    '~=': function(value, escaped) {
		    return '(?:^|[ \\t\\r\\n\\f])' + escaped + '(?:$|[ \\t\\r\\n\\f])';
	    },

	    '|=': function(value, escaped) {
		    return '(?:^|\\|)' + escaped + '(?:$|\\|)';
	    }

    };


    // public, overridable

    /**
     * Sly.getAttribute & Sly.lookupAttribute
     * 
     * @todo add more translations
     */
    var translate = {
	    'class': 'className'
    }

    Sly.lookupAttribute = function(name) {
	    var prop = translate[name];
	    if (prop) {
		    return function(node) {
			    return node[prop];
		    }
	    }
	    var flag = /^(?:src|href|action)$/.test(name) ? 2 : 0;
	    return function(node) {
		    return node.getAttribute(name, flag);
	    }
    };

    Sly.getAttribute = function(node, name) {
	    return node.getAttribute(name);
    };

    /**
     * Sly.toArray
     */
    var toArray = Array.slice || function(nodes) {
	    return Array.prototype.slice.call(nodes);
    };

    try {
	    toArray(document.documentElement.childNodes);
    } catch (e) {
	    toArray = function(nodes) {
		    if (nodes instanceof Array) return nodes;
		    var i = nodes.length, results = new Array(i);
		    while (i--) results[i] = nodes[i];
		    return results;
	    };
    }

    Sly.toArray = toArray;

    Sly.compare = (document.compareDocumentPosition) ? function (a, b) {
	    return (3 - (a.compareDocumentPosition(b) & 6));
    } : function (a, b) {
	    return (a.sourceIndex - b.sourceIndex);
    };

    /**
     * Sly.getUid
     */
    var nextUid = 1;

    Sly.getUid = (window.ActiveXObject) ? function(node) {
	    return (node.$slyUid || (node.$slyUid = {id: nextUid++})).id;
    } : function(node) {
	    return node.$slyUid || (node.$slyUid = nextUid++);
    };


    var nthCache = {};

    Sly.parseNth = function(value) {
	    if (nthCache[value]) return nthCache[value];

	    var parsed = value.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
	    if (!parsed) return false;

	    var a = parseInt(parsed[1], 10), b = (parseInt(parsed[3], 10) || 0) - 1;

	    if ((a = (isNaN(a)) ? 1 : a)) {
		    while (b < 1) b += a;
		    while (b >= a) b -= a;
	    }
	    switch (parsed[2]) {
		    case 'n': parsed = {a: a, b: b, special: 'n'}; break;
		    case 'odd': parsed = {a: 2, b: 0, special: 'n'}; break;
		    case 'even': parsed = {a: 2, b: 1, special: 'n'}; break;
		    case 'first': parsed = {a: 0, special: 'index'}; break;
		    case 'last': parsed = {special: 'last-child'}; break;
		    case 'only': parsed = {special: 'only-child'}; break;
		    default: parsed = {a: (a) ? (a - 1) : b, special: 'index'};
	    }

	    return (nthCache[value] = parsed);
    };


    Sly.escapeRegExp = function(text) {
	    return text.replace(/[-.*+?^${}()|[\]\/\\]/g, '\\$&');
    };


    // generic accessors

    Sly.generise = function(name) {
	    Sly[name] = function(text) {
		    var cls = Sly(text);
		    return cls[name].apply(cls, Array.prototype.slice.call(arguments, 1));
	    }
    };

    var generics = ['parse', 'search', 'find', 'match', 'filter'];
    for (var i = 0; generics[i]; i++)
      Sly.generise(generics[i]);

    // compile pattern for the first time
    Sly.recompile();

    return Sly;
  })();
  
  Element.prototype.querySelectorAll = function(cssRule) {
    return Sly.search(cssRule, this);
  }
  
  Element.prototype.querySelector = function(cssRule) {
    return Sly.find(cssRule, this);
  }
  
  document.querySelectorAll = function(cssRule) {
    return Sly.search(cssRule, document);
  }
  
  document.querySelector = function(cssRule) {
    return Sly.find(cssRule, document);
  }
}
  
// Shortcut: $$ => document.querySelectorAll.
if (typeof window.$$ == "undefined") {
  window.$$ = document.querySelectorAll;
}

/**
 * Original code developed by Robert Nyman, http://www.robertnyman.com
 * Code/licensing: http://code.google.com/p/getelementsbyclassname/
 */

if (!document.getElementsByClassName)
{
  /*if (document.querySelectorAll)
  {
    // querySelectorAll (MSIE 8)
    // deactivated, because we will overwrite querySelectorAll (and there is
    // no way to call/apply a renamed native function).
    Element.prototype._msie_querySelectorAll = Element.prototype.querySelectorAll;
    Alpha.getElementsByClassName = function(parent, className)
    {
      var classes = className.split(" ");
      var cssRule = "";

      for (var i=0, ilen = classes.length; i<ilen; i++) {
        cssRule += (classes[i][0] == '.') ? classes[i] : '.' + classes[i];
      }
      return Element.prototype._msie_querySelectorAll.call(this, cssRule);
//      return this.querySelectorAll(cssRule);
    }
  }
  else*/ if (document.evaluate)
  {
    // XPATH
    Alpha.getElementsByClassName = function(parent, className)
    {
      var classes = className.split(" ");
      var classesToCheck = "";
      var xhtmlNamespace = "http://www.w3.org/1999/xhtml";
      var namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null;
      var returnElements = [];
      var elements;
      var node;

      for (var i=0, ilen = classes.length; i<ilen; i++) {
        classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[i] + " ')]";
      }

      try	{
        elements = document.evaluate(".//*" + classesToCheck, parent, namespaceResolver, 0, null);
      }
      catch (e) {
        elements = document.evaluate(".//*" + classesToCheck, parent, null, 0, null);
      }

      while ((node = elements.iterateNext())) {
        returnElements.push(node);
      }
      return new Alpha.NodeList(returnElements);
    }
  }
  else
  {
    // DOM PARSING (IE6+, IE7, etc.)
    Alpha.getElementsByClassName = function(parent, className)
    {
      var classes = className.split(" ");
      var classesToCheck = [];
      var elements = (parent.all) ? parent.all : parent.getElementsByTagName('*');
      var current;
      var returnElements = [];
      var match;

      for (var i=0, ilen=classes.length; i<ilen; i++) {
        classesToCheck.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)", 'i'));
      }

      for (var i=0, ilen=elements.length; i<ilen; i++)
      {
        current = elements[i];
        match   = false;

        for (var j=0, jlen=classesToCheck.length; j<jlen; j++)
        {
          match = classesToCheck[j].test(current.className);
          if (!match) {
            break;
          }
        }

        if (match) {
          returnElements.push(current);
        }
      }

      returnElements = Alpha.extendElements ? Alpha.extendElements(returnElements) : returnElements;
      return new Alpha.NodeList(returnElements);
    }
  }

  Element.prototype.getElementsByClassName = function(className) {
    return Alpha.getElementsByClassName(this, className);
  }

  document.getElementsByClassName = function(className) {
    return Alpha.getElementsByClassName(document, className);
  }
}

// Code extracted from http://en.wikipedia.org/wiki/XMLHttpRequest
if (typeof XMLHttpRequest == "undefined")
{
  XMLHttpRequest = function()
  {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP");     } catch(e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP");  } catch(e) {}
    throw new Error("This browser does not support XMLHttpRequest.");
  };
}
/*
    http://www.JSON.org/json2.js
    2008-11-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    JSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
})();
Alpha.mergeObjects = function()
{
  var obj = [];
  for (var i=0, len=arguments.length; i<len; i++)
  {
    for (var key in arguments[i]) {
      obj[key] = arguments[i][key];
    }
  }
  return obj;
}

Alpha.mergeArrays = function()
{
  var ary = [];
  var i = arguments.length;
  while (i--)
  {
    Array.prototype.forEach.call(arguments[i], function(member)
    {
      if (ary.indexOf(member) == -1) {
        ary.push(member);
      }
    });
  }
  return ary;
}

/**
 * Creates an anonymous function, binded to a particular scope.
 */
Function.prototype.bind = function(bind)
{
  var self = this;
  return function() {
	  self.apply(bind, arguments);
  }
}

/**
// * Creates an anonymous function, that will be called with
// * some arguments.
// */
//Function.prototype.pass = function(args, bind)
//{
//	var self = this;
//	return function() {
//		self.apply(bind || self, args || []);
//	}
//}

///**
// * Delays the execution of a function.
// */
//Function.prototype.delay = function(delay, bind, args)
//{
//	var self = this;
//	return setTimeout(function() {
//		self.apply(bind || self, args || []);
//	}, delay);
//}

///**
// * Bufferizes a call to a function.
// * 
// * The buffered function will be called once, and only once,
// * when the delay expires. Just debounce it again to delay the
// * execution again and again.
// * 
// * Eg: you want to run function once the user stops to write
// * something.
// *
// * <code>
// * elm.addEventListener('keyup', my_listener.debounce(300, elm), false);
// * </code>
// */
//Function.prototype.debounce = function(delay, bind, args)
//{
//	var self = this, timer;
//	return function()
//	{
//		clearTimeout(timer);
//		timer = self.delay(delay, bind, args || []);
//	}
//}

String.prototype.camelize = function(index)
{
  var parts = this.split(/[-_]/);
  var str = '';
  if (typeof index == 'undefined') {
    index = 1;
  }
  for (var i=0; i<index; i++) {
    str += parts[i];
  }
  for (var i=index; i<parts.length; i++)
  {
    str += parts[i].substr(0, 1).toUpperCase();
    str += parts[i].substr(1);
  }
  return str;
}

String.prototype.hyphenize = function()
{
  var parts = this.split(/([A-Z].+)/);
  var str = '';
  for (var i=0; i<parts.length; i++)
  {
    if (parts[i] != '') {
      str += parts[i].toLowerCase() + '-';
    }
  }
  return str.replace(/[-]+$/, '');
}
Element.prototype.insertAfter = function(newElement, referenceElement)
{
  if (!referenceElement) {
    this.appendChild(newElement);
  }
  else
  {
    var nextSibling = referenceElement.nextSibling;
    this.insertBefore(newElement, nextSibling);
  }
  return newElement;
}

Element.prototype.getPosition = function(parent)
{
  var position = {x: 0, y: 0};
  if (this.offsetParent)
  {
    var obj = this;
    do
    {
      position.x += obj.offsetLeft;
      position.y += obj.offsetTop;
    }
    while (obj = obj.offsetParent)
  }
  return position;
}

if (!Element.prototype.hasClassName)
{
  Element.prototype.hasClassName = function(className)
  {
	  var re = new RegExp("(^|\\s)" + className + "(\\s|$)", 'i');
	  return re.test(this.className);
  }
}

if (!Element.prototype.addClassName)
{
  Element.prototype.addClassName = function(className)
  {
	  if (!this.hasClassName(className))
	  {
		  this.className += ' ' + className;
		  this.className = this.className.replace(/\s+/g, ' ');
	  }
  }
}

if (!Element.prototype.removeClassName)
{
  Element.prototype.removeClassName = function(className)
  {
	  var re = new RegExp("(^|\\s)" + className + "(\\s|$)", 'i');
	  this.className = this.className.replace(re, ' ').replace(/\s+/g, ' ');
  }
}

if (!Element.prototype.toggleClassName)
{
  Element.prototype.toggleClassName = function(className)
  {
    if (this.hasClassName(className)) {
      this.removeClassName(className);
    }
    else {
      this.addClassName(className);
    }
  }
}

// I don't like this, but Alpha.getStyle(element, property) wouldn't be any
// prettier, and there is the cross-browser opacity property problem :(

Element.prototype.setStyle = function(property, value)
{
  if (typeof property == 'object')
  {
    for (var p in property) {
      this.setStyle(p, property[p]);
    }
  }
  else
  {
    if (property == 'opacity')
    {
      this.style.cssText += ';-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (value * 100) + ')";' +
        'filter:alpha(opacity=' + Math.round(value * 100) + ');zoom:1;opacity:' + value;
    }
    else {
      this.style.cssText += ';' + property.hyphenize() + ':' + value;
    }
  }
}

Element.prototype.getStyle = function(property)
{
  if (window.getComputedStyle) {
    var v = document.defaultView.getComputedStyle(this, null).getPropertyValue(property);
  }
  else if (this.currentStyle)
  {
    if (property == 'opacity')
    {
      var alpha = this.filters["DXImageTransform.Microsoft.Alpha"] || this.filters.alpha || {};
      return (alpha.opacity || 100) / 100.0;
    }
    var v = this.currentStyle[property.camelize()];
  }

  if (Alpha.Color
    && (v.indexOf('#') > -1 || v.indexOf('rgb') > -1 || v.indexOf('rgba') > -1))
  {
    var v = new Alpha.Color(v);
  }
  return v;
}

/**
 * Linearizes a color, whatever it's input format (hex or RGB).
 * 
 * new Alpha.Color('#FFF');
 * new Alpha.Color('#0000FA');
 * new Alpha.Color('rgb(128, 78, 34)');
 * new Alpha.Color('rgba(128, 78, 34, 0.5)');
 * new Alpha.Color([0, 0, 0])
 * new Alpha.Color([0, 0, 0, 1.0])
 * new Alpha.Color({r: 0, g: 0, b: 0})
 * new Alpha.Color({r: 0, g: 0, b: 0, a: 1.0})
 * 
 * new Alpha.Color('#FFF').toHex()      // '#FFFFFF'
 * new Alpha.Color('#FFF').toRGB()      // 'rgba(255, 255, 255)'
 * new Alpha.Color('#FFF').toRGBA()     // 'rgba(255, 255, 255, 1.0)'
 * new Alpha.Color('#FFF').toRGBA(0.75) // 'rgba(255, 255, 255, 0.75)'
 * new Alpha.Color([r: 0, g: 0, b: 0, a: 1.0]).toRGBA() // 'rgba(0, 0, 0, 1.0)'
 * 
 * TODO: Accept HSV input colors like hsv(0, 0, 0), hsva(0, 0, 0, 1.0), {h:0 s:0, v:0} and  {h:0 s:0, v:0, a:1.0}.
 * TODO: toHSV() and toHSVA().
 */
Alpha.Color = function(color)
{
  if (color instanceof Alpha.Color) {
    return color;
  }
  else if (typeof color == 'string')
  {
    color = color.trim();
    if (color.indexOf('#') > -1)
    {
      if (color.length == '4')
      {
        // #FFF
        this.r = parseInt(color[1] + color[1], 16);
        this.g = parseInt(color[2] + color[2], 16);
        this.b = parseInt(color[3] + color[3], 16);
      }
      else if (color.length == '7')
      {
        // #0000FA
        this.r = parseInt(color.substr(1, 2), 16);
        this.g = parseInt(color.substr(3, 2), 16);
        this.b = parseInt(color.substr(5, 2), 16);
      }
    }
    else 
    {
      var parts = color.match(/rgb[a]?\(([\d\s]+),([\d\s]+),([\d\s]+)(?:,([\d\s\.]+))?\)/i);
      if (parts)
      {
        // rgb(0, 0, 0) or rgba(0, 0, 0, .5)
        this.r = parseInt(parts[1].trim(), 10);
        this.g = parseInt(parts[2].trim(), 10);
        this.b = parseInt(parts[3].trim(), 10);
        this.a = parts[4] ? parseFloat(parts[4].trim(), 10) : null;
      }
      else {
        throw new Error("Not a color: " + color);
      }
    }
  }
  else if (typeof (color) == 'object' && color.r && color.g && color.b)
  {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a;
  }
  else if (color instanceof Array && color.length >= 3)
  {
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];
    this.a = color[3];
  }
  else {
    throw new Error("Not a color: " + color);
  }

  // RGB to HSV (HSB)
	var max   = Math.max(this.r, this.g, this.b);
	var min   = Math.min(this.r, this.g, this.b);
	var delta = (max - min);
	
	this.v = max;
	this.s = (max != 0) ? 255 * delta / max : 0;
	if (this.s != 0)
	{
		if (max == this.r) {
			this.h = (this.g - this.b) / delta;
		}
		else if (max == this.g) {
			this.h = 2.0 + (this.b - this.r) / delta;
		}
		else if (max == this.b) {
			this.h = 4.0 + (this.r - this.g) / delta;
		}
	}
	else {
		this.h = 0;
	}
	this.h *= 60;
	if (this.h < 0) {
		this.h += 360;
	}
	this.h = Math.round(this.h);
	this.s = Math.round(this.s * 100 / 255);
	this.v = Math.round(this.v * 100 / 255);
}

Alpha.Color.prototype.a = 1.0;

Alpha.Color.prototype.r = 1.0;
Alpha.Color.prototype.g = 1.0;
Alpha.Color.prototype.b = 1.0;

Alpha.Color.prototype.h = 1.0;
Alpha.Color.prototype.s = 1.0;
Alpha.Color.prototype.v = 1.0;

Alpha.Color.prototype.toRGB = function() {
  return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
}

Alpha.Color.prototype.toRGBA = function(a) {
  return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + (a || this.a) + ')';
}

Alpha.Color.prototype.toHex = function()
{
  var r = this.r.toString(16).toUpperCase();
  var g = this.g.toString(16).toUpperCase();
  var b = this.b.toString(16).toUpperCase();
  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

Alpha.Color.prototype.toString = function() {
  return this.toHex();
}

/**
 * Serializes an HTML form into an application/x-www-form-urlencoded string.
 * 
 * Example:
 * 
 *   var form = document.getElementById('update_product_1');
 *   
 *   var params = new Serializer();
 *   params.serialize(form);
 *   params.append('_method', 'put');
 *   
 *   var xhr = new XMLHttpRequest();
 *   xhr.open('POST', form);
 *   xhr.send(params.toString());
 * 
 * IMPROVE: use selectedOptions for <select multiple/>
 */

Alpha.Serializer = function() {
  this.data = '';
}

Alpha.Serializer.prototype.serialize = function(form)
{
  var inputs = form.querySelectorAll('input,select,textarea');
  Array.prototype.forEach.call(inputs, function(input)
  {
    if (!input.name
      || input.disabled
      || input.type == 'file'
      || (input.type == 'checkbox' && !input.checked)
      || (input.type == 'submit' && !input.hasAttribute('submitted')))
    {
      return;
    }
    if (input.type == 'select' && input.multiple)
    {
      for (var i=0, len=this.selectedOptions.length; i<len; i++) {
        this.append(input.name, this.selectedOptions[i].value);
      }
    }
    else {
      this.append(input.name, input.value);
    }
  }, this);
}

Alpha.Serializer.prototype.append = function(key, value)
{
  if (value !== null) {
    this.data += (this.data ? '&' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }
}

Alpha.Serializer.prototype.toString = function() {
  return this.data;
}

var UI = {};
Alpha.UI = UI;

UI.Overlay = function()
{
  this.element = document.createElement('div');
  
  if (!Alpha.browser.ie6) {
    this.element.className = 'overlay';
  }
  else
  {
    // iframe tricks IE6, which places select inputs over positionned divs :/
    var iframe = document.createElement('iframe');
    iframe.src = "javascript:'<html></html>';";
    iframe.style.cssText += ';position:absolute;border:0;' +
      'top:0;left:0;width:100%;height:100%;overflow:hidden;filter:alpha(opacity=0);';
    this.element.appendChild(iframe);
    
    var div = document.createElement('div');
    div.className = 'overlay';
    div.style.cssText += ';position:absolute;border:0;top:0;left:0;width:100%;height:100%;';
    this.element.appendChild(div);
  }
}

UI.Overlay.prototype.display = function()
{
  if (!this.element.parentNode || !this.element.parentNode.tagName) {
    document.body.appendChild(this.element);
  }
  
  var innerWidth  = (window.innerWidth  || document.documentElement.clientWidth);
  var innerHeight = (window.innerHeight || document.documentElement.clientHeight);
  
  var width  = ((document.body.clientWidth  > innerWidth)  ? document.body.clientWidth  : innerWidth);
  var height = ((document.body.clientHeight > innerHeight) ? document.body.clientHeight : innerHeight);
  
  this.element.setStyle({display: '', position: 'absolute',
    top:  0, left: 0, width: width  + 'px', height: height + 'px'});
}

UI.Overlay.prototype.hide = function() {
  this.element.setStyle('display', 'none');
}

UI.Overlay.prototype.destroy = function()
{
  this.hide(); // fix for IE: hide before removing
  this.element.parentNode.removeChild(this.element);
  delete this.element;
}

UI.Window = function() {}
UI.Window.prototype.bounds = {};

UI.Window.prototype.createContainer = function()
{
  this.container = document.createElement('div');
  if (this.options.id) {
    this.container.id = this.options.id;
  }
  
  if (this.options.closeOnEscape)
  {
    this.bounds.closeOnEscape = this.onClose.bind(this);
    window.addEventListener('keyup', this.bounds.closeOnEscape, false);
  }
}

UI.Window.prototype.createContent = function()
{
  this.content = document.createElement('div');
  this.content.className = 'content';
  this.container.appendChild(this.content);
  /*
  if (Alpha.browser.ie6)
  {
    // iframe tricks IE6, which places select inputs over positionned divs :/
    var iframe = document.createElement('iframe');
    iframe.src = "javascript:'<html></html>';";
    iframe.style.cssText += ';position:absolute;border:0;' +
      'top:0;left:0;width:100%;height:100%;overflow:hidden;';
    
    this.container.firstChild ?
      this.container.insertBefore(iframe, this.container.firstChild) :
      this.container.appendChild(iframe);
  }
  */
}

UI.Window.prototype.destroy = function()
{
  this.container.parentNode.removeChild(this.container);
  
  if (this.bounds.closeOnEscape) {
    window.removeEventListener('keyup', this.bounds.closeOnEscape, false);
  }
  delete this.content;
  delete this.container;
}

UI.Window.prototype.onClose = function(evt)
{
  if (evt
    && evt.type == 'keyup'
    && evt.keyCode != 27)
  {
    return;
  }

  switch(this.options.onClose)
  {
    case 'hide':    this.hide();    break;
    case 'destroy': this.destroy(); break;
    default: throw new Error("Unknown onClose option: " + this.options.onClose);
  }
}

UI.Window.prototype.setContent = function(content)
{
  if (content.tagName) {
    this.content.appendChild(content);
  }
  else {
    this.content.innerHTML = content;
  }
}

UI.Window.prototype.getContent = function(content) {
  return this.content;
}

UI.Window.prototype.display = function()
{
  if (!this.container.parentNode || !this.container.parentNode.tagName)
  {
    this.container.style.visibility = 'hidden';
    this.attachToDocument();
    this.setPosition();
    this.container.style.visibility = 'visible';
  }
  this.container.style.display = 'block';
}

UI.Window.prototype.attachToDocument = function() {
  document.body.appendChild(this.container);
}

UI.Window.prototype.hide = function()
{
  this.container.style.display = 'none';
  if (this.options.modal) {
    this.overlay.hide();
  }
}

UI.Window.prototype.displayed = function() {
  return this.container.style.display != 'none';
}

UI.Window.prototype.setPosition = function(position) {
  this.container.setStyle(position);
}

// TODO: Handle dialog buttons (cancel, ok, and customs).
// TODO: Handle some callbacks.
// TODO: UI.Dialog: Permit to behave like a real popup, or like an iframe, using AJAX to load it's content as well as any further click.

UI.Dialog = function(options)
{
  this.options = Alpha.mergeObjects({
    id:            '',
    className:     '',
    titlebar:      true,
    title:         '',
    position:      'center',
    onClose:       'destroy',
    modal:         false,
    closeOnEscape: true
  }, options || {});
  
  this.bounds = {};
  
  UI.Window.prototype.createContainer.call(this);
  this.container.className = 'dialog ' + this.options.className;
  
  if (this.options.titlebar) {
    this.createTitlebar();
  }
  UI.Window.prototype.createContent.call(this);
  
  if (this.options.modal)
  {
    this.overlay = new UI.Overlay();
    this.overlay.display();
  }
}

UI.Dialog.prototype = new UI.Window();

UI.Dialog.prototype.createTitlebar = function()
{
  this.title = document.createElement('span');
  this.title.className = 'title';
  this.title.innerHTML = this.options.title;
  
  var close = document.createElement('a');
  close.innerHTML = '<span>X</span>';
  
  close.addEventListener('click', this.onClose.bind(this), false);
  
  this.titlebar = document.createElement('div');
  this.titlebar.className = 'titlebar';
  this.titlebar.appendChild(this.title);
  this.titlebar.appendChild(close);
  
  this.container.insertBefore(this.titlebar, this.container.firstChild);
}

UI.Dialog.prototype.setPosition = function()
{
  var position = {top: false, right: false, bottom: false, left: false};
  if (this.options.position.forEach)
  {
    this.options.position.forEach(function(pos) {
      position[pos] = true;
    });
  }
  else {
    position[this.options.position] = true;
  }
  
  this.container.setStyle({position: 'absolute'});
  var style = {};
  
  if (position.top) {
    style.top = 0;
  }
  else if (position.bottom) {
    style.bottom = 0;
  }
  else
  {
    style.top = Math.max(0, (window.innerHeight || document.documentElement.clientHeight) - this.container.offsetHeight) / 2
      + (document.documentElement ? document.documentElement.scrollTop : window.pageYOffset) + 'px';
  }
  
  if (position.left) {
    style.left = 0;
  }
  else if (position.right) {
    style.right = 0;
  }
  else
  {
    style.left = Math.max(0, (window.innerWidth || document.documentElement.clientWidth) - this.container.offsetWidth) / 2
      + (document.documentElement ? document.documentElement.scrollLeft : window.pageXOffset) + 'px';
  }
  
  UI.Window.prototype.setPosition.call(this, style);
}

UI.Dialog.prototype.display = function()
{
  if (this.options.modal) {
    this.overlay.display();
  }
  UI.Window.prototype.display.call(this);
}

UI.Dialog.prototype.destroy = function()
{
  if (this.options.modal) {
    this.overlay.destroy();
  }
  delete this.title;
  delete this.titlebar;
  
  UI.Window.prototype.destroy.call(this);
}

UI.Dialog.prototype.setTitle = function(title) {
  this.title.innerHTML = title;
}

/*
Generic picker widget. A picker is the basis for windows attached to
another element. It's actually used for tooltips (attached to any element)
as well as date, list and color pickers (attached to form inputs).

By default a picker is displayed on the bottom of the element it's attached to.

TODO: Implement a 'auto' position case, where the tooltip is displayed at the best place in the visible area (starting from the top-right).
*/
UI.Picker = function(relativeElement, options)
{
  if (typeof relativeElement == 'undefined') {
    throw new Error('Missing required parameter: relativeElement.');
  }
  this.relativeElement = Alpha.$(relativeElement);
  
  this.options = Alpha.mergeObjects({
    id: null,
    className: '',
    position: null,
    onClose: 'hide',
    closeOnEscape: true,
    closeOnOuterClick: true
  }, options || {});
  
  this.createPicker();
}

UI.Picker.prototype = new UI.Window();

UI.Picker.prototype.createPicker = function()
{
  UI.Window.prototype.createContainer.call(this);
  this.container.className = 'picker ' + this.options.className;
  if (this.options.id) {
    this.container.id = this.options.id;
  }
  
  UI.Window.prototype.createContent.call(this);
  
  if (this.options.closeOnOuterClick)
  {
    this.bounds.closeOnOuterClick = function(evt)
    {
      var obj = evt.target;
      do
      {
        if (obj == this.container
          || obj == this.relativeElement)
        {
          return;
        }
      }
      while(obj = obj.parentNode);
      this.onClose();
    }.bind(this);
//    var elm = document.documentElement ? document.documentElement : window;
//    elm.addEventListener('click', function(evt)
    window.addEventListener('click', this.bounds.closeOnOuterClick, false);
  }
}

UI.Picker.prototype.computePosition = function()
{
//  var relativePosition = this.relativeElement.getPosition();
//  var pos = {
//    left: relativePosition.x,
//    top:  relativePosition.y
//  };
  var pos = {
    left: this.relativeElement.offsetLeft,
    top:  this.relativeElement.offsetTop
  };
  
  if (this.options.position && this.options.position.indexOf)
  {
    // vertical position
    if (this.options.position.indexOf('top') > -1) {
      pos.top -= this.container.offsetHeight;
    }
    else if (this.options.position.indexOf('bottom') > -1) {
      pos.top += this.relativeElement.offsetHeight;
    }
    else
    {
      pos.top += this.relativeElement.offsetHeight / 2;
      pos.top -= this.container.offsetHeight / 2;
    }
    
    // horizontal position
    if (this.options.position.indexOf('left') > -1) {
      pos.left -= this.container.offsetWidth;
    }
    else if (this.options.position.indexOf('right') > -1) {
      pos.left += this.relativeElement.offsetWidth;
    }
    else
    {
      pos.left += this.relativeElement.offsetWidth / 2;
      pos.left -= this.container.offsetWidth / 2;
    }
  }
  else {
    pos.top += this.relativeElement.offsetHeight;
  }
  
  // normalizes the position
  if (this.options.position && this.options.position.indexOf)
  {
    var className = [];
    if (this.options.position.indexOf('top') > -1) {
      className.push('top');
    }
    else if (this.options.position.indexOf('bottom') > -1) {
      className.push('bottom');
    }
    if (this.options.position.indexOf('left') > -1) {
      className.push('left');
    }
    else if (this.options.position.indexOf('right') > -1) {
      className.push('right');
    }
    pos.position = className.join('-');
  }
  return pos;
}

UI.Picker.prototype.setPosition = function()
{
  this.container.style.position = 'absolute';
  
  var pos = this.computePosition();
  var style = {
    left: pos.left + 'px',
    top:  pos.top  + 'px'
  };
  
  if (!pos.position) {
    style['min-width'] = this.relativeElement.offsetWidth + 'px';
  }
  else {
    this.container.className += ' ' + pos.position;
  }
  
  this.container.setStyle(style);
}

UI.Picker.prototype.destroy = function()
{
  window.removeEventListener('click', this.bounds.closeOnOuterClick, false);
  UI.Window.prototype.destroy.call(this);
}

UI.Picker.prototype.display = function()
{
  UI.Window.prototype.display.call(this);
  this.setPosition();
}

UI.Picker.prototype.attachToDocument = function() {
  this.relativeElement.parentNode.appendChild(this.container);
}

// TODO: Change the default position to auto, when UI.Picker supports it.
// FIXME: Arrows are broken in IE6? It looks like it doesn't support transparent borders.

UI.Tooltip = function(relativeElement, options)
{
  if (typeof relativeElement == 'undefined') {
    throw new Error('Missing required parameter: relativeElement.');
  }
  this.relativeElement = Alpha.$(relativeElement);
  
  this.options = Alpha.mergeObjects({
    id: null,
    className: '',
    position: 'top right',
    onClose: 'hide',
    closeOnEscape: true,
    closeOnOuterClick: true
  }, options || {});
  this.options.className += ' tooltip';
  
  UI.Picker.prototype.createPicker.call(this);
  this.createArrow();
}

UI.Tooltip.prototype.bounds = {};

UI.Tooltip.prototype.createArrow = function()
{
  this.arrow = document.createElement('div');
  this.arrow.className = 'arrow';
  this.container.appendChild(this.arrow);
}

UI.Tooltip.prototype.setContainerPosition = function(pos)
{
  var style = {};
  switch(pos.position)
  {
    case 'top':
      style.top  = pos.top - this.arrow.offsetHeight + 'px';
      style.left = pos.left + 'px';
      break;
    case 'bottom':
      style.top  = pos.top + this.arrow.offsetHeight + 'px';
      style.left = pos.left + 'px';
      break;
    case 'left':
      style.left = pos.left - this.arrow.offsetWidth  + 'px';
      style.top  = pos.top + 'px';
      break;
    case 'right':
      style.left = pos.left + this.arrow.offsetWidth  + 'px';
      style.top  = pos.top + 'px';
      break;
    case 'top-left':
      style.left = pos.left + 3 * this.arrow.offsetWidth + 'px';
      style.top  = pos.top - this.arrow.offsetHeight + 'px';
      break;
    case 'top-right':
      style.left = pos.left - 3 * this.arrow.offsetWidth + 'px';
      style.top  = pos.top - this.arrow.offsetHeight + 'px';
      break;
    case 'bottom-left':
      style.left = pos.left + 3 * this.arrow.offsetWidth + 'px';
      style.top  = pos.top + this.arrow.offsetHeight + 'px';
      break;
    case 'bottom-right':
      style.left = pos.left - 3 * this.arrow.offsetWidth + 'px';
      style.top  = pos.top + this.arrow.offsetHeight + 'px';
      break;
  }
  this.container.setStyle(style);
}

UI.Tooltip.prototype.setArrowPosition = function(pos)
{
  var style = {};
  switch(pos.position)
  {
    case 'bottom':
      style.top  = -this.arrow.offsetWidth + 'px';
      style.left = (this.container.offsetWidth - this.arrow.offsetWidth) / 2 + 'px';
      break;
    case 'top':
      style.left = (this.container.offsetWidth - this.arrow.offsetWidth) / 2 + 'px';
      break;
    case 'left':
      style.right = -this.arrow.offsetWidth + 'px';
      style.top   = (this.container.offsetHeight - this.arrow.offsetHeight) / 2 + 'px';
      break;
    case 'right':
      style.left = -this.arrow.offsetWidth + 'px';
      style.top  = (this.container.offsetHeight - this.arrow.offsetHeight) / 2 + 'px';
      break;
    
    case 'top-left':
      style.right = 2 * this.arrow.offsetWidth + 'px';
      break;
    case 'top-right':
      style.left  = 2 * this.arrow.offsetWidth + 'px';
      break;
    
    case 'bottom-left':
      style.right = 2 * this.arrow.offsetWidth + 'px';
      style.top   = -this.arrow.offsetHeight + 'px';
      break;
    case 'bottom-right':
      style.left  = 2 * this.arrow.offsetWidth + 'px'
      style.top   = -this.arrow.offsetHeight + 'px';
      break;
  }
  this.arrow.setStyle(style);
}

UI.Tooltip.prototype.setPosition = function()
{
  this.container.setStyle('position', 'absolute');
  this.arrow.setStyle('position', 'absolute');
  
  var pos = UI.Picker.prototype.computePosition.call(this);
  this.container.className += ' ' + pos.position;
  
  this.setContainerPosition(pos);
  this.setArrowPosition(pos);
}

UI.Tooltip.prototype.onClose = UI.Picker.prototype.onClose;
UI.Tooltip.prototype.display = UI.Picker.prototype.display;
UI.Tooltip.prototype.hide    = UI.Picker.prototype.hide;

UI.Tooltip.prototype.destroy = function()
{
  UI.Picker.prototype.destroy.call(this);
  delete this.arrow;
}

UI.Tooltip.prototype.setContent = UI.Picker.prototype.setContent;
UI.Tooltip.prototype.attachToDocument = UI.Window.prototype.attachToDocument;

/*
   new UI.Notification({autoHide: 5000}, 'my custom message');
   
   var n = new UI.Notification({autoHide: 2500});
   n.setMessage(document.getElementById('notification-message').innerHTML);
   
   Check http://leaverou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/
 */
UI.Notification = function(options, mesg)
{
  this.options = Alpha.mergeObjects({
    autoHide: 1000,
    position: ['top', 'right'],
    className: ''
  }, options || {});
  
  this.container = document.createElement('div');
  this.container.className = 'notification ' + this.options.className;
  
  if (mesg) {
    this.setMessage(mesg);
  }
}

UI.Notification.prototype.setPosition = function()
{
  if (Alpha.browser.ie6)
  {
    this.container.setStyle({
      position: 'absolute',
      top:  this.container.getStyle('top')  + document.documentElement.scrollTop  + 'px',
      left: this.container.getStyle('left') + document.documentElement.scrollLeft + 'px'
    });
  }
}

UI.Notification.prototype.display = function()
{
  if (!this.container.parentNode || !this.container.parentNode.tagName) {
    document.body.appendChild(this.container);
  }
  
  this.setPosition();
  this.container.style.display = 'block';
  
  if (this.options.autoHide > 0) {
    setTimeout(this.hide.bind(this), this.options.autoHide);
  }
}

UI.Notification.prototype.hide = function()
{
  if (this.container.fx && !Alpha.browser.ie)
  {
    var onComplete = function() {
      this.container.style.display = 'none';
    }
    this.container.fx({opacity: [1.0, 0.0]}, {onComplete: onComplete.bind(this)});
  }
  else {
    this.container.style.display = 'none';
  }
}

UI.Notification.prototype.destroy = function()
{
  this.container.parentNode.removeChild(this.container);
  delete this.container;
}

UI.Notification.prototype.setMessage = function(msg)
{
  this.container.innerHTML = msg;
  this.display();
}

/*
A ListPicker is an abstract widget that allows the selection of an
entry within a list.

It's similar to the HTML5 Datalist element, and actually serves as
a basis for Alpha's emulation of the Datalist element. But it's not
limited to a combobox widget, you can use it for advanced auto-
completion like:

- populating a +city_id+ hidden input, while using a +city+ text
  input for autocompeting the name,
- displaying a clickable list of articles results, while the user
  types in a search input,
- etc.
*/
UI.ListPicker = function(input, options)
{
  this.input = input;
  this.input.setAttribute('autocomplete', 'off');
  this.options = Alpha.mergeObjects({
    className: '',
    autoMarkFirst: false
  }, options);
  this.createList();
  this.attachEvents();
}

UI.ListPicker.prototype = {

  // public

  items: function() {
    return this.list.getElementsByTagName('li');
  },

  hasItems: function() {
    return this.items().length > 0;
  },

  // +list+ must be an Array, HTMLCollection or HTML string of LI elements.
  setItems: function(items)
  {
    if (typeof items == 'string') {
      this.list.innerHTML = items;
    }
    else
    {
      this.list.innerHTML = '';
      
      for (var i=0, len=items.length; i<len; i++) {
        this.list.appendChild(items[i]);
      }
    }
    
    if (this.options.autoMarkFirst) {
      this.markSelection(this.items()[0]);
    }
    else {
      this.unmarkSelection();
    }
  },

  show: function() {
    this.picker.display();
  },

  hide: function() {
    this.picker.hide();
  },

  showOrHide: function()
  {
    if (this.hasItems()) {
      this.show();
    }
    else {
      this.hide();
    }
  },

  // Callback to overwrite to receive the selected item. This is required.
  onselect: function(item) {
    throw new Error("you must overwrite the onselect(item) method.");
  },

  onactivate:   function() {},
  ondeactivate: function() {},

  // protected

  createList: function(options)
  {
    this.list = document.createElement('ul');
    this.list.addEventListener('click', this.onchoice.bind(this), false);
    
    this.picker = new UI.Picker(this.input, {
      onClose: 'hide',
      closeOnEscape: true,
      closeOnOuterClick: true,
      className: 'list-picker ' + this.options.className
    });
    this.picker.setContent(this.list);
  },

  attachEvents: function()
  {
    this.input.addEventListener('focus',    this.activate.bind(this),   false);
    this.input.addEventListener('click',    this.activate.bind(this),   false);
    this.input.addEventListener('blur',     this.deactivate.bind(this), false);
    this.input.addEventListener('keypress', this.onkeypress.bind(this), false);
    this.input.addEventListener('keyup',    this.onkeyup.bind(this),    false);
  },

  activate: function(evt)
  {
    if (this.hasItems()) {
      this.show();
    }
    this.onactivate();
  },

  deactivate: function(evt) {
    this.ondeactivate();
  },

  onkeypress: function(evt)
  {
    switch(evt.keyCode)
    {
      case 13: this.onenter(evt);  return; // enter
      case 27: this.onescape(evt); return; // esc
    }
  },

  onkeyup: function(evt)
  {
    switch(evt.keyCode)
    {
      case 38: this.moveSelectionUp();   return; // up
      case 40: this.moveSelectionDown(); return; // down
      case 13: return;                           // enter
      case 27: this.onescape(evt); return;       // esc
    }
    this.showOrHide();
  },

  onenter: function(evt)
  {
    if (this.picker.displayed())
    {
      this.selectSelection();
      evt.stopPropagation();
      evt.preventDefault();
    }
  },

  onescape: function(evt)
  {
    this.hide();
    evt.stopPropagation();
    evt.preventDefault();
  },

  onchoice: function(evt)
  {
    // IMPROVE: search for a parent LI if target isn't an LI.
    
    if (evt.target.tagName.toLowerCase() == 'li')
    {
      this.selection = evt.target;
      this.selectSelection();
    }
  },

  markSelection: function(item)
  {
    if (item)
    {
      if (this.selection) {
        this.selection.removeClassName('selected');
      }
      this.selection = item;
      this.selection.addClassName('selected');
    }
  },

  unmarkSelection: function()
  {
    if (this.selection)
    {
      this.selection.removeClassName('selected');
      this.selection = null;
    }
  },

  moveSelectionUp: function()
  {
    var item;
    
    if (this.selection)
    {
      item = this.selection.get ?
        this.selection.get('previousElementSibling') :
        this.selection.previousElementSibling;
    }
    else if (this.hasItems()) {
      item = this.items()[this.items().length - 1];
    }
    
    this.markSelection(item)
  },

  moveSelectionDown: function()
  {
    var item;
    
    if (this.selection)
    {
      item = this.selection.get ?
        this.selection.get('nextElementSibling') :
        this.selection.nextElementSibling;
    }
    else if (this.hasItems()) {
      item = this.items()[0];
    }
    
    this.markSelection(item)
  },

  selectSelection: function()
  {
    this.hide();
    
    if (this.selection)
    {
      this.onselect(this.selection);
      this.unmarkSelection();
    }
  }
}
// TODO: Test in all browsers.
// TODO: Propose a display:'replace' option that will display the picker in place of the text input.
// TODO: Add support for setting the time.
// IMPROVE: Update calendar when date is manually modified in input (and is valid).
// IMPROVE: Add capping dates (eg: from 2008-01-01 to 2009-12-31) and do not allow to choose dates that are outside this scope.
// IMPROVE: Localize months and days.

UI.DatePicker = function(input, options)
{
  this.input   = Alpha.$(input);
  this.options = Alpha.mergeObjects({
    className: ''
  }, options || {});
  
	this.months   = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	this.weekdays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  this.input.addEventListener('click', this.display.bind(this), false);
}

UI.DatePicker.prototype.display = function()
{
  if (!this.picker)
  {
    this.picker = new UI.Picker(this.input, {
      className: 'date-picker ' + this.options.className
    });
  }
  
  this.selectedDate = this.parseDate(this.input.value);
  this.setDate(this.selectedDate);
  
  this.picker.display();
}

UI.DatePicker.prototype.setDate = function(datetime)
{
	var date = datetime instanceof Date ? datetime : this.parseDate(datetime);
  this.setCalendar(date);
}

UI.DatePicker.prototype.setCalendar = function(date)
{
  var today = new Date();
	var first = new Date(date.getFullYear(), date.getMonth(), 1);
	
	this.currentDate = date;
	
  // date picker
  var html = '<table>' +
    '<tr class="date">' +
    '<th class="before">&laquo;</th>' +
    '<th class="now" colspan="5"> ' +
    this.months[date.getMonth()] + ' ' +
    date.getFullYear() +
    ' </th>' +
    '<th class="after">&raquo;</th>' +
    '</tr><tr class="weekdays">';
  for (i=0; i<7; i++)
  {
    html += '<td>' + this.weekdays[i] + '</td>';
  }
  html += '</tr><tr class="days">';

  var wd = 0;
  var nb = this.computeDaysInMonth(first.getFullYear(), first.getMonth() - 1);
  for (var d = nb - first.getDay() + 1; d <= nb; d++)
  {
    html += '<td class="wrong">' + d + '</td>';
    wd++;
  }
  
  for (var d=1; d <= this.computeDaysInMonth(date.getFullYear(), date.getMonth()); d++)
  {
    var classes = '';
    if (today.getFullYear() == date.getFullYear()
      && today.getMonth() == date.getMonth()
      && today.getDate()  == d)
    {
      classes = 'today';
    }
    
    if (date.getFullYear() == this.selectedDate.getFullYear()
      && date.getMonth() == this.selectedDate.getMonth()
      && date.getDate()  == d)
    {
      classes += ' selected ';
    }
    
    html += '<td' + (classes != '' ? ' class="' + classes + '"' : '') + '>' + d + '</td>';
    wd++;
    if (wd == 7)
    {
      wd = 0;
      html += '</tr><tr class="days">';
    }
  }

  if (wd > 0)
  {
    for (var d = 1; d < 8 - wd; d++) {
      html += '<td class="wrong">' + d + '</td>';
    }
  }
  html += '</tr></table>';
  
  this.picker.setContent(html);
  
  var content = this.picker.getContent();
  var table = content.getElementsByTagName('table')[0];
  table.addEventListener('click', this.onClick.bind(this), false);
}

UI.DatePicker.prototype.onClick = function(evt)
{
  evt.stopPropagation();

  if (evt.target.className == 'before') {
    this.setPreviousMonth();
  }
  else if (evt.target.className == 'after') {
    this.setNextMonth();
  }
  else
  {
    var td = evt.target;
    while (td && td.tagName && td.tagName.toUpperCase() != 'TD' && td.parentNode) {
      td = td.get('parentNode');
    }
    
    if (td.tagName == 'TD' && td.parentNode.className == 'days')
    {
      var day   = parseInt(td.innerHTML);
      var month = this.currentDate.getMonth() + 1;
      if (td.hasClassName('wrong')) {
        month = month + (day > 15 ? -1 : 1);
      }
      var date = this.formatDate(this.currentDate.getFullYear(), month, day);
      
      this.selectedDate = this.parseDate(date);
      this.input.value = date;
      this.picker.hide();
    }
  }
}

UI.DatePicker.prototype.setPreviousMonth = function()
{
  var date = this.formatDate(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
	this.setDate(date);
}

UI.DatePicker.prototype.setNextMonth = function()
{
  var date = this.formatDate(this.currentDate.getFullYear(), this.currentDate.getMonth() + 2, this.currentDate.getDate());
	this.setDate(date);
}

UI.DatePicker.prototype.computeDaysInMonth = function(year, month)
{
  // leap year?
  if (month == 1 && ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)) {
   return 29;
  }

  // standard year
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month];
}

UI.DatePicker.prototype.formatDate = function(y, m, d) {
	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
}


UI.DatePicker.prototype.parseDate = function(datetime)
{
  var date = datetime.trim().substring(0, 10).split('-');
  return new Date(date[0], date[1] - 1, date[2]);
}

// TODO: Test in all browsers.
// TODO: Propose a display:'replace' option that will display the picker in place of the text input.
// TODO: Colorize input's background (choosing the right color for foreground, either white or black).

UI.ColorPicker = function(input, options)
{
  this.options = Alpha.mergeObjects({
    className: ''
  }, options || {});
  
  this.input = Alpha.$(input);
  this.input.addEventListener('click', this.display.bind(this), false);
}

UI.ColorPicker.prototype.display = function()
{
  if (!this.picker)
  {
    this.picker = new UI.Picker(this.input, {
      className: 'color-picker ' + this.options.className
    });
    this.createWidget(this.picker.getContent());
  }
  
	if (this.input.value != '') {
		this.setColor(this.input.value);
	}
  this.picker.display();
}

// Sets the initial color or forces color.
// Positions the crosshair and slider according to color.
UI.ColorPicker.prototype.setColor = function(color)
{
	color = new Color(color);
  
	// positions the crosshair
	var x = Math.round(this.data.gradient_w / 100 * color.s);
	var y = Math.round(this.data.gradient_h / 100 * (100 - color.v));
	this.putCrosshair(x, y);
	
	// positions the slider
	var i = Math.round(this.data.hue_h / 360 * color.h);
	this.putSlider(i);
	
	// base color
  this.setBaseColor(this.getHueColor(i));
  this.applyColor(color);
}

// Sets the base color used by the [H]SV gradient.
UI.ColorPicker.prototype.setBaseColor = function(color)
{
  var color = new Color(color);
  this.data.base = color;
	this.gradient.style.backgroundColor = color.toString();
}

// Sets picked color
UI.ColorPicker.prototype.applyColor = function(color)
{
	color = new Color(color);
	
	this.preview.style.backgroundColor = color.toString();
  this.input.value = color.toString();
  
	if (this.options && this.options.onChange) {
		this.options.onChange(color);
	}
}

UI.ColorPicker.prototype.getGradientColor = function(x, y)
{
	this.data.x = x;
	this.data.y = y;
	
	// checks min & max, then linerizes gradient to full 255 colors.
	x = 255 / (this.data.gradient_w - 1) * Math.max(0, Math.min(x, this.data.gradient_w - 1));
	y = 255 / (this.data.gradient_h - 1) * Math.max(0, Math.min(y, this.data.gradient_h - 1));
	
	// computes color
	var r = Math.round((1 - (1 - (this.data.base.r / 255)) * (x / 255)) * (255 - y));
	var g = Math.round((1 - (1 - (this.data.base.g / 255)) * (x / 255)) * (255 - y));
	var b = Math.round((1 - (1 - (this.data.base.b / 255)) * (x / 255)) * (255 - y));
	
	return new Color([r, g, b]);
}

UI.ColorPicker.prototype.getHueColor = function(i)
{
	i -= (this.hue.offsetHeight - this.hue.clientHeight) / 2;
	i = Math.max(0, Math.min(i, this.data.hue_h));
	
	var section = this.data.hue_h / 6; // separates each sections
	var c  = i % this.data.hue_h;      // row
	var cs = i % section;              // row in current group
	var l  = (255 / section) * cs;     // color percentage
	
	var h = 255 - l;
	var r = Math.round(c < section ? 255 : c < section * 2 ? h : c < section * 4 ? 0 : c < section * 5 ? l : 255);
	var g = Math.round(c < section ? l : c < section * 3 ? 255 : c < section * 4 ? h : 0);
	var b = Math.round(c < section * 2 ? 0 : c < section * 3 ? l : c < section * 5 ? 255 : h);
	
	return new Color([r, g, b]);
}

UI.ColorPicker.prototype.createWidget = function(container)
{
  function new_canvas(className, width, height)
  {
    var c = document.createElement('canvas');
    c.className = className;
    c.setAttribute('width',  width);
    c.setAttribute('height', height);
    return c;
  }
  
  this.gradient  = new_canvas('gradient', 150, 150);
  this.crosshair = new_canvas('crosshair', 15, 15);
  this.hue       = new_canvas('hue', 15, 150);
  this.slider    = new_canvas('slider', 25, 5);
  
  this.preview = document.createElement('div');
  this.preview.className = 'preview';
  
  var gradient_wrapper = document.createElement('div');
  gradient_wrapper.className = 'gradient-wrapper';
  gradient_wrapper.appendChild(this.gradient);
  gradient_wrapper.appendChild(this.crosshair);

  var hue_wrapper = document.createElement('div');
  hue_wrapper.className = 'hue-wrapper';
  hue_wrapper.appendChild(this.hue);
  hue_wrapper.appendChild(this.slider);
  
  container.appendChild(gradient_wrapper);
  container.appendChild(hue_wrapper);
  container.appendChild(this.preview);
  
  
  // values
  // TODO: Move data to options.
  this.data = {
	  x: this.gradient.getAttribute('width'),
	  y: this.gradient.getAttribute('height'),
	  base: {
	    r: 255,
	    g: 0,
	    b: 0
    },
	  gradient_w: this.gradient.getAttribute('width'),
	  gradient_h: this.gradient.getAttribute('height'),
	  hue_w: this.hue.getAttribute('width'),
	  hue_h: this.hue.getAttribute('height')
  };

  // the big gradient
  var ctx = this.gradient.getContext('2d');

  var grad_white = ctx.createLinearGradient(0, 0, this.data.gradient_w, 0);
  grad_white.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad_white.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = grad_white;
  ctx.fillRect(0, 0, this.data.gradient_w, this.data.gradient_h);

  var grad_black = ctx.createLinearGradient(0, 0, 0, this.data.gradient_h);
  grad_black.addColorStop(1, 'rgba(0, 0, 0, 1.0)');
  grad_black.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
  ctx.fillStyle = grad_black;
  ctx.fillRect(0, 0, this.data.gradient_w, this.data.gradient_h);

  // the small gradient
  var ctx = this.hue.getContext('2d');

  var grad = ctx.createLinearGradient(0, 0, 0, this.data.hue_h);
  var section = 1.0 / 6;
  grad.addColorStop(0.0,         'rgba(255,   0,   0, 1.0)');
  grad.addColorStop(section * 1, 'rgba(255, 255,   0, 1.0)');
  grad.addColorStop(section * 2, 'rgba(0,   255,   0, 1.0)');
  grad.addColorStop(section * 3, 'rgba(0,   255, 255, 1.0)');
  grad.addColorStop(section * 4, 'rgba(0,     0, 255, 1.0)');
  grad.addColorStop(section * 5, 'rgba(255,   0, 255, 1.0)');
  grad.addColorStop(1.0,         'rgba(255,   0,   0, 1.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, this.data.hue_w, this.data.hue_h);

  // the crosshair
  var ctx         = this.crosshair.getContext('2d');
  ctx.lineWidth   = 1;
  ctx.lineCap     = 'butt';
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(7.5, 0); ctx.lineTo(7.5, 7); ctx.moveTo(7.5, 8); ctx.lineTo(7.5, 15);
  ctx.moveTo(0, 7.5); ctx.lineTo(7, 7.5); ctx.moveTo(8, 7.5); ctx.lineTo(15, 7.5);
  ctx.stroke();

  // the slider
  var ctx       = this.slider.getContext('2d');
  ctx.lineWidth = 1;
  ctx.lineCap   = 'round';
  ctx.lineJoin  = 'round';
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.moveTo(0, 0);  ctx.lineTo(5, 2.5);  ctx.lineTo(0, 5);  ctx.lineTo(0, 0);
  ctx.moveTo(25, 0); ctx.lineTo(20, 2.5); ctx.lineTo(25, 5); ctx.lineTo(25, 0);
  ctx.fill();
  
  new UI.ColorPicker.Crosshair(this);
  new UI.ColorPicker.Slider(this);
}

UI.ColorPicker.prototype.putCrosshair = function(x, y)
{
	this.crosshair.style.left = x - Math.floor(this.crosshair.getAttribute('width')  / 2) + 'px';
	this.crosshair.style.top  = y - Math.floor(this.crosshair.getAttribute('height') / 2) + 'px';
}

UI.ColorPicker.prototype.putSlider = function(pos) {
	this.slider.style.top = pos - Math.floor(this.slider.getAttribute('height') / 2) + 'px';
}

// handles the slider
UI.ColorPicker.Slider = function(picker)
{
	var dragging = false;
	
	function getPosition(evt)
	{
		var pos = picker.hue.getPosition();
		return Math.min(picker.data.hue_h - 1, Math.max(0, evt.pageY - pos.y));
	}
	
  function getCrosshairPosition()
  {
	  var pos   = picker.crosshair.getPosition();
	  var g_pos = picker.gradient.getPosition();
	  pos.x -= g_pos.x;
	  pos.y -= g_pos.y;
    return pos;
  }

	function start(evt)
	{
		dragging = true;
		picker.hue.addEventListener('mousemove', move, null);
		window.addEventListener('mouseup', stop, null);
		move(evt);
	}
	
	function stop(evt)
	{
		dragging = false;
		picker.hue.removeEventListener('mousemove', move, null);
		window.removeEventListener('mouseup', stop, null);
	}
	
	function move(evt)
	{
		if (dragging)
		{
			evt.preventDefault();
			
			var s_pos = getPosition(evt);
			var c_pos = getCrosshairPosition();
			
			picker.putSlider(s_pos);
			picker.setBaseColor(picker.getHueColor(s_pos));
			picker.applyColor(picker.getGradientColor(c_pos.x, c_pos.y));
		}
	}
	
	picker.hue.addEventListener('mousedown', start, null);
	picker.slider.addEventListener('mousedown', start, null);
}

UI.ColorPicker.Crosshair = function(picker)
{
  var dragging = false;
  
  function getPosition(evt)
  {
    var pos = picker.gradient.getPosition();
    var x = Math.min(picker.data.gradient_w - 1, Math.max(0, evt.pageX - pos.x));
    var y = Math.min(picker.data.gradient_h - 1, Math.max(0, evt.pageY - pos.y));
    return {x: x, y: y};
  }
  
  function start(evt)
  {
  	dragging = true;
    picker.gradient.addEventListener('mousemove', move, false);
    window.addEventListener('mouseup', stop, false);
    move(evt);
  }
  
  function stop(evt)
  {
    dragging = false;
    picker.gradient.removeEventListener('mousemove', move, false);
    window.removeEventListener('mouseup', stop, false);
  }
  
  function move(evt)
  {
    if (dragging)
    {
	    evt.preventDefault();
		
	    var pos = getPosition(evt);
	    picker.putCrosshair(pos.x, pos.y);
	    picker.applyColor(picker.getGradientColor(pos.x, pos.y));
    }
  }
  
  picker.gradient.addEventListener('mousedown', start, false);
  picker.crosshair.addEventListener('mousedown', start, false);
}

// TODO: Extract UI.RemoteAutocompleter from UI.Autocompleter & UI.RemoteDatalistAutocompleter.

UI.Autocompleter = function(input, options)
{
  if (typeof input == 'undefined') {
    return;
  }
  
  this.options = Alpha.mergeObjects({
    url: null,
    param: input.name,
    minChars: 2,
    autoMarkFirst: false,
    className: ""
  }, options);
  
  this.input = input;
  this.input.addEventListener('keyup', this.ontype.bind(this), false);
  this.createListPicker();
}

UI.Autocompleter.prototype = {
  createListPicker: function()
  {
    this.picker = new UI.ListPicker(this.input, {
      className: 'autocomplete ' + this.options.className,
      autoMarkFirst: this.options.autoMarkFirst
    });
    this.picker.onselect = function(item) {
      this.onselect(item);
    }.bind(this);
  },

  onselect: function(item) {
    this.input.value = item.innerText.trim();
  },

  ontype: function(event)
  {
    if (event.keyCode == 13) { return; }  // esc
    
    if (this.input.value.length >= this.options.minChars)
    {
      if (this.previousValue != this.input.value)
      {
        this.previousValue = this.input.value;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.callRemote.bind(this), 300);
      }
    }
    else {
      this.picker.setItems('');
    }
  },

  requestURL: function()
  {
    var data = encodeURIComponent(this.options.param) + '=' + encodeURIComponent(this.input.value.trim());
    return this.options.url + ((this.options.url.indexOf('?') == -1) ? '?' : '&') + data;
  },

  callRemote: function()
  {
    if (this.xhr) {
      this.xhr.abort
    }
    this.xhr = new XMLHttpRequest();
    this.xhr.open('GET', this.requestURL(), true);
    this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.xhr.onreadystatechange = this.callback.bind(this);
    this.xhr.send('');
  },

  callback: function(html)
  {
    if (this.xhr.readyState == 4
      && this.xhr.status == 200)
    {
      this.picker.setItems(this.xhr.responseText);
      this.picker.showOrHide();
    }
  }
}

/*
UI.Autocompleter: function(input, url, options) {
  this.initialize(input, url, options);
}

UI.Autocompleter.prototype.initialize: function(input, url, options)
{
  if (typeof input == 'undefined') {
    throw new Error("UI.Autocompleter: missing parameter 'input'.");
  }
  if (typeof url == 'undefined') {
    throw new Error("UI.Autocompleter: missing parameter 'url'.");
  }
  
  this.options = {
    method:   'get',
    param:    'token',
    minChars: 1,
    multipleTokens: false,
    tokenSeparator: ',',
    className: '',
    onSelection: function(selection, token) {}
  };
  Alpha.mergeObjects(this.options, options || {});
  
  this.list = document.createElement('ul');
  this.list.addEventListener('click',     this.onChoice.bind(this),       false);
  this.list.addEventListener('mouseover', this.hoverSelection.bind(this), false);
  
  this.input = Alpha.$(input);
  this.input.addEventListener('keypress', this.onInput.bind(this), false);
  
  this.ajax = new Alpha.Ajax({
    url: url,
    onSuccess: this.updateList.bind(this)
  });
  this.debouncedRequest = this.request.debounce(500, this);
  this.picker = new UI.Picker(this.input, {
    className: 'autocompleter ' + this.options.className
  });
  
  this.selection = null;
}

UI.Autocompleter.prototype.setUrl: function(url) {
  this.ajax.options.url = url;
}

UI.Autocompleter.prototype.getToken: function()
{
  var token;
  
	if (this.options.multipleTokens &&
	  this.input.value.indexOf(this.options.tokenSeparator) > -1)
	{
		// gets caret position
		var caretPosition = this.input.value.length;
		if (document.selection)
		{
			// IE
			this.input.focus();
			var sel = document.selection.createRange();
			sel.moveStart('character', -this.input.value.length);
			caretPosition = sel.text.length;
		}
		else if (this.input.selectionStart || this.input.selectionStart == '0') {
			caretPosition = this.input.selectionStart;
		}
		
		// gets currently edited token
		this.tokenIndex = this.input.value.substr(0, caretPosition).split(this.options.tokenSeparator).length - 1;
		token = this.input.value.split(this.options.tokenSeparator)[this.tokenIndex];
	}
	else {
	  token = this.input.value;
	}
  return token.trim();
}

UI.Autocompleter.prototype.setToken: function(token)
{
	if (this.options.multipleTokens &&
	  this.input.value.indexOf(this.options.tokenSeparator) > -1)
	{
		// updates edited token
		var tokens = this.input.value.split(this.options.tokenSeparator);
		tokens[this.tokenIndex] = token;
		
		// updates input
	  var separator = this.options.tokenSeparator + ' ';
		var value = '';
		for (var i = 0; i < tokens.length; i++)
		{
			tokens[i] = tokens[i].trim();
			if (tokens[i] != '') {
				value += tokens[i] + separator;
			}
		}
		this.input.value = value;
	}
	else {
    return this.input.value = token;
  }
}

// IMPROVE: If multipleTokens & left/right keyCode: cancel if we changed from one token to another.
UI.Autocompleter.prototype.onInput: function(evt)
{
  switch(evt.keyCode)
  {
    case 8: case 37: case 39: case 46: return; // backspace, left, right, delete
    case 38: this.moveSelectionUp();   return; // up
    case 40: this.moveSelectionDown(); return; // down
    case 13: this.selectSelection(); evt.stopPropagation(); evt.preventDefault(); return; // enter
    case 27: this.cancel(); evt.stopPropagation(); evt.preventDefault(); return; // esc
    default:
      if (this.options.multipleTokens
        && String.fromCharCode(evt.which) == this.options.tokenSeparator)
      {
        this.cancel();
        return;
      }
  }
  this.debouncedRequest();
}

UI.Autocompleter.prototype.request: function()
{
  this.ajax.abort();
  
  var token = this.getToken();
  if (token.length >= this.options.minChars)
  {
    var data = {};
    data[this.options.param] = token;
    this.ajax.send(this.options.method, data);
  }
}

UI.Autocompleter.prototype.updateList: function(html)
{
  this.list.innerHTML = html;
  
  var elements = this.list.getElementsByTagName('li');
  if (elements.length > 0)
  {
    this.markSelection(elements[0]);
    this.picker.setContent(this.list);
    this.picker.display();
  }
  else {
    this.cancel();
  }
}

UI.Autocompleter.prototype.onChoice: function(evt)
{
  if (evt.target.tagName.toUpperCase() == 'LI')
  {
    this.selection = evt.target;
    this.selectSelection();
  }
}

UI.Autocompleter.prototype.markSelection: function(selection)
{
  if (this.selection) {
    this.selection.removeClassName('selected');
  }
  this.selection = selection;
  this.selection.addClassName('selected');
}

UI.Autocompleter.prototype.hoverSelection: function(evt)
{
  if (evt.target.tagName.toUpperCase() == 'LI') {
    this.markSelection(evt.target);
  }
}

UI.Autocompleter.prototype.moveSelectionUp: function()
{
  if (this.selection)
  {
    var previousElementSibling = this.selection.get ?
      this.selection.get('previousElementSibling') :
      this.selection.previousElementSibling;
    if (previousElementSibling) {
      this.markSelection(previousElementSibling)
    }
  }
}

UI.Autocompleter.prototype.moveSelectionDown: function()
{
  if (this.selection)
  {
    var nextElementSibling = this.selection.get ?
      this.selection.get('nextElementSibling') :
      this.selection.nextElementSibling;
    if (nextElementSibling) {
      this.markSelection(nextElementSibling)
    }
  }
}

UI.Autocompleter.prototype.selectSelection: function()
{
  if (this.selection)
  {
    var token = this.selection.innerText;
    this.setToken(token);
    this.options.onSelection(this.selection, token);
    this.cancel();
  }
}

UI.Autocompleter.prototype.cancel: function()
{
  this.picker.hide();
  this.list.innerHTML = '';
  this.selection = null;
}
*/
// Autocompletes within the options of a fixed datalist.
UI.LocalDatalistAutocompleter = function(input)
{
  this.input    = input;
  this.datalist = document.getElementById(input.getAttribute('list'));
  this.select   = this.datalist.getElementsByTagName('select')[0];
  
  this.parseDatalistOptions();
  this.previous_value = '';
  
  this.input.addEventListener('keyup', this.onType.bind(this), false);
}

UI.LocalDatalistAutocompleter.prototype.onType = function(evt)
{
  var value = this.input.value.trim();
  if (value != this.previous_value)
  {
//    var fragment = Alpha.browser.ie ? document.createDocumentFragment() : document.createElement('div');
    var fragment = document.createDocumentFragment();
    
    var re = new RegExp('^' + value.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, '\\$1'), 'i');
    this.options.forEach(function(opt)
    {
      if (opt.html.match(re))
      {
        var option = document.createElement('option');
        option.value = opt.value;
        option.innerHTML = opt.html;
        fragment.appendChild(option);
      }
    }, this);
    
//    if (Alpha.browser.ie)
//    {
      this.select.innerHTML = '';
      (this.select || this.datalist).appendChild(fragment);
//    }
//    else {
//      this.select.innerHTML = fragment.innerHTML;
//    }
    
    this.previous_value = value;
  }
}

UI.LocalDatalistAutocompleter.prototype.parseDatalistOptions = function()
{
  this.options = [];
  var options = this.datalist.getElementsByTagName('option');
  
  Array.prototype.forEach.call(options, function(option) {
    this.options.push({value: option.value, html: option.innerHTML});
  }, this);
}

// Updates a datalist through remote HTTP calls like:
// 
//   GET /users/autocomplete?q=ju
// 
// Options:
// 
// - url   - (required)
// - param - (defaults to +input.name+)
// 
// Server is supposed to return an HTML fragment like:
// 
//   <option>Jules</option>
//   <option>Julien</option>
// 
UI.RemoteDatalistAutocompleter = function(input, options)
{
  this.url      = options.url;
  this.param    = options.param || input.name;
  this.minChars = options.minChars || 2;
  
  this.input    = input;
  this.datalist = document.getElementById(input.getAttribute('list'));
  this.select   = this.datalist.getElementsByTagName('select')[0];
  
  this.input.addEventListener('keyup', this.onType.bind(this), false);
}

UI.RemoteDatalistAutocompleter.prototype.onType = function(event)
{
  if (event.keyCode == 13) { return; }  // esc
  
  if (this.input.value.length >= this.minChars)
  {
    if (this.previousValue != this.input.value)
    {
      this.previousValue = this.input.value;
      clearTimeout(this.timer);
      this.timer = setTimeout(this.callRemote.bind(this), 300);
    }
  }
  else {
    this.resetDatalistOptions();
  }
}

UI.RemoteDatalistAutocompleter.prototype.requestURL = function()
{
  var data = encodeURIComponent(this.param) + '=' + encodeURIComponent(this.input.value.trim());
  return this.url + ((this.url.indexOf('?') == -1) ? '?' : '&') + data;
}

UI.RemoteDatalistAutocompleter.prototype.callRemote = function()
{
  if (this.xhr) {
    this.xhr.abort
  }
  this.xhr = new XMLHttpRequest();
  this.xhr.open('GET', this.requestURL(), true);
  this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  this.xhr.onreadystatechange = this.callback.bind(this);
  this.xhr.send('');
}

UI.RemoteDatalistAutocompleter.prototype.callback = function(html)
{
  if (this.xhr.readyState == 4 && this.xhr.status == 200) {
    this.setDatalistOptions(this.xhr.responseText);
  }
}

UI.RemoteDatalistAutocompleter.prototype.setDatalistOptions = function(html) {
  (this.select || this.datalist).innerHTML = html;
}

UI.RemoteDatalistAutocompleter.prototype.resetDatalistOptions = function() {
  this.setDatalistOptions('');
}

// IMPROVE: Cap textarea's height using minHeight and maxHeight styles.

UI.Autoresize = function(textarea, callback)
{
  this.textarea = textarea;
  this.textarea.addEventListener('keyup', this.resize.bind(this), false);
}

UI.Autoresize.prototype.resize = function()
{
  if (!this.fake) {
    this.createFake();
  }
  this.fake.value  = this.textarea.value + "\n";
  this.textarea.style.height = this.fake.scrollHeight + 'px';
}

UI.Autoresize.prototype.createFake = function(evt)
{
  this.fake = document.createElement('textarea');
  
  var s = this.textarea.currentStyle ? this.textarea.currentStyle :
    ((document.defaultView && document.defaultView.getComputedStyle) ? document.defaultView.getComputedStyle(this.textarea, "") : this.textarea.style);
  
  this.fake.style.overflow          = 'hidden';
  this.fake.style.visibility        = 'hidden';
  this.fake.style.position          = 'absolute';
  this.fake.style.zIndex            = -1;
  
  this.fake.style.fontFamily        = s.fontFamily;
  this.fake.style.fontWeight        = s.fontWeight;
  this.fake.style.fontStyle         = s.fontStyle;
  this.fake.style.fontSize          = s.fontSize;
  this.fake.style.lineHeight        = s.lineHeight;
  
  this.fake.style.paddingTop        = s.paddingTop;
  this.fake.style.paddingBottom     = s.paddingBottom;
  this.fake.style.paddingLeft       = s.paddingLeft;
  this.fake.style.paddingRight      = s.paddingRight;
  
  this.fake.style.borderTopWidth    = s.borderTopWidth;
  this.fake.style.borderBottomWidth = s.borderBottomWidth;
  this.fake.style.borderLeftWidth   = s.borderLeftWidth;
  this.fake.style.borderRightWidth  = s.borderRightWidth;
  
  this.textarea.style.overflowY  = 'hidden';
  this.textarea.style.resize     = 'none';
  this.textarea.parentNode.insertBefore(this.fake, this.textarea);
  this.fake.style.width = s.width;
}

UI.InPlaceEditor = function(element, callback)
{
  this.element      = element;
  this.callback     = callback;
  this.text_wrapper = this.element.getElementsByClassName('text-wrapper')[0];
  this.edit_link    = this.element.getElementsByClassName('edit-link')[0];
  this.edit_link.addEventListener('click', this.start.bind(this), false);
}

UI.InPlaceEditor.prototype.start = function(evt)
{
  evt.preventDefault();
  
  if (!this.textarea)
  {
    this.textarea = document.createElement('textarea');
    this.textarea.addEventListener('blur', this.stop.bind(this), false);
    new UI.Autoresize(this.textarea);
  }
  
  this.originaltext = this.textarea.value = this.text_wrapper.innerHTML;
  
  this.textarea.style.cssText     += ';visibility:visible;display:block;';
  this.textarea.style.cssText     += ';min-height:' + this.text_wrapper.offsetHeight + 'px;';
  
  this.text_wrapper.style.cssText += ';visibility:hidden;display:none;';
  this.element.className           = 'editable editing';
  this.element.insertBefore(this.textarea, this.text_wrapper);
  this.textarea.focus();
}

UI.InPlaceEditor.prototype.stop = function()
{
  if (this.textarea.value != this.originaltext)
  {
    this.callback(this.textarea.value);
    this.text_wrapper.innerHTML = this.textarea.value;
  }
  
  this.element.className           = 'editable';
  this.text_wrapper.style.cssText += ';visibility:visible;display:block;';
  this.textarea.style.cssText     += ';visibility:hidden;display:none;';
}

var HTML5 = {};

HTML5.checkInputProperty = function(property)
{
  var i = document.createElement('input');
  return property in i;
}

HTML5.supportsDOMSubtreeModifiedEvent = function()
{
  var div = document.createElement('div'), test = false;
  div.addEventListener('DOMSubtreeModified', function() { test = true }, false);
  div.appendChild(document.createElement('div'));
  return test;
}

// TODO: fix potential problems with the password type!

if (!HTML5.checkInputProperty('placeholder'))
{
  HTML5.Placeholder = function(element)
  {
    /*@cc_on if (element.type == 'password') { return; } @*/
    
    this.element = element;
    this.elementType = this.element.type;
    
    this.element.addEventListener('focus', this.removePlaceholder.bind(this), false);
    this.element.addEventListener('blur',  this.setPlaceholder.bind(this),    false);
    
    var parent = this.element.get('parentNode');
    while (parent && parent.tagName.toLowerCase() != 'form') {
      parent = parent.get('parentNode');
    }
    if (parent && parent.tagName.toLowerCase() == 'form') {
      parent.addEventListener('submit', this.removePlaceholder.bind(this), false);
    }
    
    this.setPlaceholder();
  }

  HTML5.Placeholder.prototype.removePlaceholder = function()
  {
    if (this.element.value == this.element.getAttribute('placeholder')) {
      this.element.value = '';
    }
    if (this.elementType == 'password') {
      this.element.type = 'password';
    }
    this.element.removeClassName('placeholder');
  }

  HTML5.Placeholder.prototype.setPlaceholder = function()
  {
    if (/^[\s]*$/.test(this.element.value))
    {
      if (this.elementType == 'password') {
        this.element.type = 'text';
      }
      this.element.addClassName('placeholder');
      this.element.value = this.element.getAttribute('placeholder');
    }
  }

  window.addEventListener('load', function()
  {
    var elements = document.querySelectorAll('[placeholder]');
    Array.prototype.forEach.call(elements, function(element) {
      new HTML5.Placeholder(element);
    });
  }, false);
}
// TODO: Check for native browser support!
// TODO: WAI-ARIA.

HTML5.details = function(detail)
{
  var opened  = false;
  var summary = detail.getElementsByTagName('summary');
  
  if (summary.length > 0) {
    summary = summary[0];
  }
  else {
    summary = document.createElement('summary');
    summary.innerHTML = 'details';
    if (detail.firstChild) {
      detail.insertBefore(summary, detail.firstChild);
    }
    else {
      detail.appendChild(summary);
    }
  }
  close();
  
  summary.addEventListener('click', function() {
    opened ? close() : open();
  }, false);
  
  function open()  { opened = true;  set('display:;visibility:'); }
  function close() { opened = false; set('display:none;visibility:hidden'); }
  function set(css)
  {
    Array.prototype.forEach.call(detail.get('children'), function(child)
    {
      if (child != summary) {
        child.style.cssText = css;
      }
    });
  }
}

Array.prototype.forEach.call(document.getElementsByTagName('details'),
  function(detail)
{
  new HTML5.details(detail);
});

// HTML5 spec:
// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-button-element.html#the-datalist-element
// 
// IMPROVE: use DOMSubtreeModified whenever possible.
// NOTE: Safari doesn't fire the DOMSubtreeModified event properly?
// NOTE: do not auto select the first choice, and have a nil selection instead?
// NOTE: should the list be displayed on focus, or just on click (like a select)?
// 
// Only opera supports datalist, but not with options within a select within
// a datalist. We thus can't rely on it at the moment.
HTML5.Datalist = function(input)
{
  this.input = input;
  
  this.datalist = document.getElementById(this.input.getAttribute('list'));
  this.datalist.getElementsByTagName('label')[0].style.display = 'none';
  this.datalist.getElementsByTagName('select')[0].style.display = 'none';
  
  this.createListPicker();
}

HTML5.Datalist.prototype = {
  createListPicker: function()
  {
    this.picker = new UI.ListPicker(this.input, {
      className: 'datalist',
    });
    
    this.picker.onselect     = this.onselect.bind(this);
    this.picker.onactivate   = this.onactivate.bind(this);
    this.picker.ondeactivate = this.ondeactivate.bind(this);
    
    this.populateOptions();
  },

  onactivate: function(evt) {
    this.startOptionsMonitoring();
  },

  ondeactivate: function(evt) {
    this.stopOptionsMonitoring();
  },

  onselect: function(li) {
    this.input.value = li.getAttribute('data-value');
  },

  populateOptions: function()
  {
    var li, items = [],
      options = this.datalist.getElementsByTagName('option');
    
    for (var i=0, len=options.length; i<len; i++)
    {
      li = document.createElement('li');
      li.setAttribute('data-value', options[i].value);
      li.innerHTML = options[i].label == "" ? options[i].value : options[i].label;
      items.push(li);
    }
    
    this.picker.setItems(items);
  },

  // Monitors the datalist options for any changes.
  // 
  // Tries to use DOMSubtreeModified whenever possible, otherwise polls for
  // HTML changes every 100ms.
  startOptionsMonitoring: function()
  {
//    if (HTML5.supportsDOMSubtreeModifiedEvent()) {
//      // the proper way (disabled because of Safari bug)
//      this.tracker = this.populateOptions.bind(this);
//      this.datalist.addEventListener('DOMSubtreeModified', this.tracker, false);
//    }
//    else
//    {
      // the ugly way: polls at regular intervals for subtree changes
      this.optionsPreviousHTML = this.datalist.innerHTML;
      this.tracker = setInterval(this.monitoring.bind(this), 100);
//    }
  },

  stopOptionsMonitoring: function()
  {
//    if (HTML5.supportsDOMSubtreeModifiedEvent()) {
//      this.datalist.removeEventListener('DOMSubtreeModified', this.tracker, false);
//    }
//    else {
      clearInterval(this.tracker);
//    }
  },

  monitoring: function()
  {
    if (this.optionsPreviousHTML != this.datalist.innerHTML)
    {
      this.optionsPreviousHTML = this.datalist.innerHTML;
      this.populateOptions();
    }
  }
}

Array.prototype.forEach.call(document.querySelectorAll('input[list]'), function(input) {
  new HTML5.Datalist(input);
});
