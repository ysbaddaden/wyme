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

RegExp.escape = function(str) {
  return str.replace(/[.*+?|()\[\]{}\\]/g, '\\$&');
}

/**
 * Inflector is mostly a port of ActiveSupport::Inflector from Ruby on Rails.
 */

var Inflector = {}

Inflector.transliterateMapping = {
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç':
  'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I',
  'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö':
  'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U',
  'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss', 'à':'a', 'á':'a', 'â': 'a', 'ã': 'a', 'ä':
  'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó':
  'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u',
  'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th', 'ÿ': 'y',
  'œ': 'oe', 'Œ': 'OE'
}

Inflector.pluralRules      = [];
Inflector.singularRules    = [];
Inflector.uncountableRules = [];

Inflector.plural = function(re, replacement) {
  Inflector.pluralRules.unshift([re, replacement]);
}

Inflector.singular = function(re, replacement) {
  Inflector.singularRules.unshift([re, replacement]);
}

Inflector.irregular = function(singular, plural)
{
  Inflector.plural(new RegExp(RegExp.escape(singular) + "$", 'i'), function(word) {
    return word.match(/^[A-Z]/) ? plural.capitalize() : plural;
  });
  Inflector.singular(new RegExp(RegExp.escape(plural) + "$", 'i'), function(word) {
    return word.match(/^[A-Z]/) ? singular.capitalize() : singular;
  });
}

Inflector.uncountable = function(words)
{
  for (var i=0; i<words.length; i++) {
    Inflector.uncountableRules.push(new RegExp(RegExp.escape(words[i]) + '$', 'i'));
  }
}

Inflector.is_countable = function(word)
{
  for (var i=0; i<Inflector.uncountableRules.length; i++)
  {
    if (word.match(Inflector.uncountableRules[i])) {
      return false;
    }
  }
  return true;
}

Inflector.applyRules = function(word, rules)
{
  var i, re;
  
  if (word.trim() != "" && Inflector.is_countable(word))
  {
    for (i=0; i<rules.length; i++)
    {
      re = rules[i][0];
      
      if (word.match(re)) {
        return word.replace(re, rules[i][1]);
      }
    }
  }
  return word;
}

Inflector.plural(/$/, 's');
Inflector.plural(/s$/i, 's');
Inflector.plural(/(ax|test)is$/i, '$1es');
Inflector.plural(/(octop|vir)us$/i, '$1i');
Inflector.plural(/(alias|status)$/i, '$1es');
Inflector.plural(/(bu)s$/i, '$1ses');
Inflector.plural(/(buffal|tomat)o$/i, '$1oes');
Inflector.plural(/([ti])um$/i, '$1a');
Inflector.plural(/sis$/i, 'ses');
Inflector.plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');
Inflector.plural(/(hive)$/i, '$1s');
Inflector.plural(/([^aeiouy]|qu)y$/i, '$1ies');
Inflector.plural(/(x|ch|ss|sh)$/i, '$1es');
Inflector.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
Inflector.plural(/([m|l])ouse$/i, '$1ice');
Inflector.plural(/^(ox)$/i, '$1en');
Inflector.plural(/(quiz)$/i, '$1zes');

Inflector.singular(/s$/i, '');
Inflector.singular(/(n)ews$/i, '$1ews');
Inflector.singular(/([ti])a$/i, '$1um');
Inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');
Inflector.singular(/(^analy)ses$/i, '$1sis');
Inflector.singular(/([^f])ves$/i, '$1fe');
Inflector.singular(/(hive)s$/i, '$1');
Inflector.singular(/(tive)s$/i, '$1');
Inflector.singular(/([lr])ves$/i, '$1f');
Inflector.singular(/([^aeiouy]|qu)ies$/i, '$1y');
Inflector.singular(/(s)eries$/i, '$1eries');
Inflector.singular(/(m)ovies$/i, '$1ovie');
Inflector.singular(/(x|ch|ss|sh)es$/i, '$1');
Inflector.singular(/([m|l])ice$/i, '$1ouse');
Inflector.singular(/(bus)es$/i, '$1');
Inflector.singular(/(o)es$/i, '$1');
Inflector.singular(/(shoe)s$/i, '$1');
Inflector.singular(/(cris|ax|test)es$/i, '$1is');
Inflector.singular(/(octop|vir)i$/i, '$1us');
Inflector.singular(/(alias|status)es$/i, '$1');
Inflector.singular(/^(ox)en/i, '$1');
Inflector.singular(/(vert|ind)ices$/i, '$1ex');
Inflector.singular(/(matr)ices$/i, '$1ix');
Inflector.singular(/(quiz)zes$/i, '$1');
Inflector.singular(/(database)s$/i, '$1');

Inflector.irregular('person', 'people')
Inflector.irregular('man', 'men')
Inflector.irregular('child', 'children')
Inflector.irregular('sex', 'sexes')
Inflector.irregular('move', 'moves')
Inflector.irregular('cow', 'kine')

Inflector.uncountable(['equipment', 'information', 'rice', 'money', 'species',
  'series', 'fish', 'sheep', 'jeans']);

/**
 * String inflections follow the rules of ActiveSupport::Inflector of Ruby on Rails.
 */

String.prototype.capitalize = function()
{
  var str = this.toLowerCase();
  return str.charAt(0).toUpperCase() + str.substr(1);
}

String.prototype.camelize = function(lower_case_and_underscored_word)
{
  var parts = this.split('_'), str = "";
  
  if (lower_case_and_underscored_word == 'lower') {
    str = parts.shift();
  }
  
  for (var i=0; i<parts.length; i++) {
    str += parts[i].capitalize();
  }
  return str;
}

String.prototype.underscore = function()
{
  var str = this;
  str = str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');
  str = str.replace(/([a-z\d])([A-Z])/g, '$1_$2');
  str = str.replace(/\-/g, '_')
  return str.toLowerCase();
}

String.prototype.dasherize = function() {
  return this.replace(/_/g, '-');
}

String.prototype.transliterate = function()
{
  var str = this, from, to;
  
  for (from in Inflector.transliterateMapping)
  {
    to = Inflector.transliterateMapping[from];
    str = str.replace(new RegExp(from, 'g'), to);
  }
  return str;
}

String.prototype.parameterize = function()
{
  var str = this.transliterate();
  str = str.replace(/[^\w\d\_\-]/g, '-');
  str = str.replace(/\-{2,}/g, '-').replace(/^\-/g, '').replace(/\-$/g, '');
  return str.toLowerCase();
}

String.prototype.titleize = function()
{
  var str = this.underscore().humanize();
  str = str.replace(/\s\b[\w]/g, function(chr) {
    return chr.toUpperCase();
  });
  return str;
}

String.prototype.humanize = function() {
  return this.capitalize().replace(/_id$/, '').replace(/_/g, ' ');
}

String.prototype.pluralize = function() {
  return Inflector.applyRules(this, Inflector.pluralRules);
}

String.prototype.singularize = function() {
  return Inflector.applyRules(this, Inflector.singularRules);
}

String.prototype.tableize = function() {
  return this.underscore().pluralize();
}

String.prototype.classify = function() {
  return this.singularize().camelize();
}

String.prototype.constantize = function()
{
  eval("var c = " + this + ";");
  return c;
}

Element.prototype.findParentNode = function(nodeName)
{
  var element = this; nodeName = nodeName.toUpperCase();
  while(element && element.nodeName != nodeName && element.parentNode) {
    element = element.get ? element.get('parentNode') : element.parentNode;
  }
  return element.nodeName == nodeName ? element : null;
}

Element.prototype.insertAfter = function(newElement, referenceElement)
{
  if (!referenceElement) {
    this.appendChild(newElement);
  }
  else {
    this.insertBefore(newElement, referenceElement.nextSibling);
  }
  return newElement;
}

Element.prototype.getPosition = function(parent)
{
  var pos = {left: 0, top: 0};
  if (this.offsetParent)
  {
    var obj = this;
    do
    {
      pos.left += obj.offsetLeft;
      pos.top  += obj.offsetTop;
    }
    while (obj = obj.offsetParent)
  }
  return pos;
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
 * Linearizes a color, whatever it's input format (Hex, RGB or RGBA).
 * 
 * new Color('#FFF');
 * new Color('#0000FA');
 * new Color('rgb(128, 78, 34)');
 * new Color('rgba(128, 78, 34, 0.5)');
 * new Color([0, 0, 0])
 * new Color([0, 0, 0, 1.0])
 * new Color({r: 0, g: 0, b: 0})
 * new Color({r: 0, g: 0, b: 0, a: 1.0})
 * 
 * new Color('#FFF').toHex()      // '#FFFFFF'
 * new Color('#FFF').toRGB()      // 'rgba(255, 255, 255)'
 * new Color('#FFF').toRGBA()     // 'rgba(255, 255, 255, 1.0)'
 * new Color('#FFF').toRGBA(0.75) // 'rgba(255, 255, 255, 0.75)'
 * new Color([r: 0, g: 0, b: 0, a: 1.0]).toRGBA() // 'rgba(0, 0, 0, 1.0)'
 * 
 * TODO: Accept HSV input colors like hsv(0, 0, 0), hsva(0, 0, 0, 1.0), {h:0, s:0, v:0} and {h:0, s:0, v:0, a:1.0}.
 * TODO: toHSV() and toHSVA().
 */
var Color = function(color)
{
  if (color instanceof Color) {
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
      else {
        throw new Error("Not a color: " + color);
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
        this.a = parts[4] ? parseFloat(parts[4].trim(), 10) : 1.0;
      }
      else {
        throw new Error("Not a color: " + color);
      }
    }
  }
  else if (color instanceof Array && (color.length == 3 || color.length == 4))
  {
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];
    this.a = color[3] || 1.0;
  }
  else if (typeof (color) == 'object'
    && typeof color.r != 'undefined'
    && typeof color.g != 'undefined'
    && typeof color.b != 'undefined')
  {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a || 1.0;
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
  this.l = Math.round((100 / 255 * max + 100 / 255 * min) / 2);
}

Color.prototype.a = 1.0;

Color.prototype.r = 0;
Color.prototype.g = 0;
Color.prototype.b = 0;

Color.prototype.h = 0;
Color.prototype.s = 100;
Color.prototype.v = 100;
Color.prototype.l = 50;

Color.prototype.toRGB = function() {
  return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
}

Color.prototype.toRGBA = function(a) {
  return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + (a || this.a) + ')';
}

Color.prototype.toHSL = function() {
  return 'hsl(' + this.h + ', ' + this.s + '%, ' + this.l + '%)';
}

Color.prototype.toHSLA = function(a) {
  return 'hsla(' + this.h + ', ' + this.s + '%, ' + this.l + '%, ' + (a || this.a) + ')';
}

Color.prototype.toHex = function()
{
  var r = this.r.toString(16).toUpperCase();
  var g = this.g.toString(16).toUpperCase();
  var b = this.b.toString(16).toUpperCase();
  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

Color.prototype.toString = function() {
  return this.toHex();
}

var Optionable = function(klass)
{
  // Inits options as empty hash unless it was already defined.
  klass.prototype.initOptions = function()
  {
    if (typeof this.options == 'undefined') {
      this.options = {};
    }
  },

  // Sets options, overwriting those already in place.
  klass.prototype.setOptions = function(options)
  {
    this.initOptions();
    
    for (var i in (options || {})) {
      this.options[i] = options[i];
    }
  }

  // Sets options unless they're already defined.
  klass.prototype.setDefaultOptions = function(options)
  {
    this.initOptions();
    
    for (var i in (options || {}))
    {
      if (typeof this.options[i] == 'undefined') {
        this.options[i] = options[i];
      }
    }
  }
}

/**
 * Adds support for events to any Object prototype.
 * 
 * Example:
 * 
 *   var MyClass = function() {}
 *   Eventable(MyClass, ['something']);
 *   
 *   MyClass.prototype.doSomething = function()
 *   {
 *     var event = this.createEvent('something');
 *     this.dispatchEvent(event);
 *   }
 *   
 *   MyClass.addEventListener('something', function(event) {});
 *   MyClass.onsomething = function(event) {};
 *   
 *   MyClass.doSomething();
 */
var Eventable = function(object, types)
{
  types.forEach(function(type)
  {
    if (typeof object.prototype['on' + type] != 'undefined') {
      throw new Error("Event type '" + type + "' already defined.");
    }
    object.prototype['on' + type] = function(event) {}
  });

  if (typeof object.prototype.addEventListener == 'undefined')
  {
    // Adds an event listener to this object.
    object.prototype.addEventListener = function(type, callback)
    {
      if (typeof this['on' + type] == 'undefined') {
        throw new Error("No such event type '" + type + "'");
      }
      if (typeof this._eventListeners == 'undefined') {
        this._eventListeners = {};
      }
      if (typeof this._eventListeners[type] == 'undefined') {
        this._eventListeners[type] = [];
      }
      this._eventListeners[type].push(callback)
    }
  }

  if (typeof object.prototype.removeEventListener == 'undefined')
  {
    // Removes an event listener from this object.
    object.prototype.removeEventListener = function(type, callback)
    {
      if (typeof this['on' + type] == 'undefined') {
        throw new Error("No such event type '" + type + "'");
      }
      var pos = this._eventListeners[type].indexOf(callback);
      if (pos != -1) {
        this._eventListeners[type].splice(pos, 1)
      }
    }
  }

  if (typeof object.prototype.createEvent == 'undefined')
  {
    /**
     * Simple wrapper to create and initialize a basic Event, to leverage the
     * hassle of manually creating and initializing an event object each and
     * every time you need to dispatch an event.
     * 
     * You may overwrite it to return your own custom event objects.
     */
    object.prototype.createEvent = function(type, cancelable)
    {
      if (typeof cancelable == 'undefined') {
        cancelable = true
      }
      
      var event = new Eventable.Event();
      event.initEvent(type, cancelable);
      return event;
    }
  }
  
  if (typeof object.prototype.dispatchEvent == 'undefined')
  {
    /**
     * Dispatches an event on this object.
     * 
     * Examples:
     * 
     *   // actually calls this.createEvent('something')
     *   this.dispatchEvent('something');
     *   
     *   // manual call to this.createEvent
     *   this.dispatchEvent(this.createEvent('something', false));
     *   
     *   // manual creation and initialization of event:
     *   var event = new Eventable.Event();
     *   event.initEvent('something', true);
     *   this.dispatchEvent(event);
     * 
     * FIXME: A callback throwing an exception shouldn't break the chain.
     */
    object.prototype.dispatchEvent = function(event_or_type)
    {
      var event = (typeof event_or_type == 'string') ? this.createEvent(event_or_type) : event_or_type;
      event.target = this;
      
      if (typeof this['on' + event.type] == 'undefined') {
        throw new Error("No such event type '" + event.type + "'");
      }
      
      if (this['on' + event.type](event) === true) {
        event.preventDefault();
      }
      
      if (this._eventListeners && this._eventListeners[event.type])
      {
        for (var i=0, len = this._eventListeners[event.type].length; i<len; i++)
        {
          if (event.propagationStopped === true) {
            break;
          }
          this._eventListeners[event.type][i](event);
        }
      }
      return event.defaultPrevented;
    }
  }
}

/**
 * Basic Event object. Any custom Event object for Eventable must inheritate
 * from it.
 * 
 * Example:
 * 
 *   var MyEvent = function() {}
 *   MyEvent.prototype = new Eventable.Event();
 *   
 *   MyEvent.prototype.initMyEvent = function(type, cancelable, target)
 *   {
 *     Eventable.Event.initEvent.call(this, type, cancelable);
 *     this.target = target;
 *   }
 *   
 *   var event = new MyEvent();
 *   event.initMyEvent('type', true, element);
 */
Eventable.Event = function() {}
Eventable.Event.prototype = {
  initEvent: function(type, cancelable)
  {
    this.type = type;
    this.cancelable = cancelable;
    this.defaultPrevented   = null;
    this.propagationStopped = null;
  },

  preventDefault: function()
  {
    if (this.cancelable) {
      this.defaultPrevented = true;
    }
  },

  stopPropagation: function() {
    this.propagationpropagationStopped = true;
  }
}

var JSONP = {};

JSONP.Request = function() {};
JSONP.Request.counter = 0;

Optionable(JSONP.Request);

JSONP.Request.prototype.open = function(uri, callback, options)
{
  this.setDefaultOptions({ param: 'callback' });
  this.setOptions(options);
  
  this.uri      = uri;
  this.callback = callback;
  this.counter  = JSONP.Request.counter += 1;
  
  var self = this;
  window[this.callbackName()] = function(responseJSON)
  {
    callback(responseJSON);
    self.abort();
  }
}

JSONP.Request.prototype.callbackName = function() {
  return 'jsonp_request_' + this.counter;
}

JSONP.Request.prototype.url = function()
{
  return this.uri + (this.uri.match(/\?/) ? '&' : '?') +
    encodeURIComponent(this.options.param) + '=' + this.callbackName();
}

JSONP.Request.prototype.send = function()
{
  var node = document.createElement('script');
  node.setAttribute('type', 'text/javascript');
  node.setAttribute('src', this.url());
  node.setAttribute('charset', 'UTF-8');
  node.setAttribute('id', 'jsonp-' + this.counter);
  document.getElementsByTagName('head')[0].appendChild(node);
}

JSONP.Request.prototype.abort = function()
{
  var node = document.getElementById('jsonp-' + this.counter);
  if (node) {
    node.parentNode.removeChild(node);
  }
  window[this.callbackName()] = null;
}

var Rails = {};

/**
 * Executes an HTTP request to a Ruby on Rails server. This object is made
 * necessary by the request forgery protection of ruby on rails, which requires
 * either an unique token to be passed either as a parameter or as a
 * X-CSRF-Token HTTP header.
 * 
 * The implementation is based on XMLHttpRequest 2 which uses events for
 * callbacks. If you overwrite the onreadystatechange method please be sure
 * to call Rails.Request.prototype.onreadystatechange or events won't be
 * dispatched!
 * 
 * Example:
 * 
 *   var r = new Rails.Request();
 *   r.open('get', '/posts');
 *   r.addEventListener('loadstart', onrequest);   // readyState = 3
 *   r.addEventListener('abort',     onabort);     // abort()
 *   r.addEventListener('error',     onfailure);   // readyState = 4 && status >= 400
 *   r.addEventListener('load',      onsuccess);   // readyState = 4 && status < 400
 *   r.addEventListener('loadend',   oncomplete);  // readyState = 4
 *   r.send();
 */
Rails.Request = function() {
  this.xhr = new XMLHttpRequest();
}
Eventable(Rails.Request, ['loadstart', 'abort', 'load', 'error', 'loadend']);

Rails.Request.prototype.createEvent = function(type)
{
  var event = new Eventable.Event();
  event.initEvent(type, false, true);
  event.request = this.xhr;
  return event;
}

Rails.Request.prototype.open = function(method, url)
{
  method = method.toLowerCase();
  this.xhr.open(method.toUpperCase(), url, true);
  this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
  if (method != 'get')
  {
    if (method == 'post' || method == 'put') {
      this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }  
    
    var csrf_token = Rails.readMeta('csrf-token');
    if (csrf_token) {
      this.xhr.setRequestHeader('X-CSRF-Token', csrf_token);
    }
  }
  this.xhr.onreadystatechange = this.onreadystatechange.bind(this);
}

Rails.Request.prototype.onreadystatechange = function()
{
  if (this.xhr.readyState == 3) {
    this.dispatchEvent('loadstart');
  }
  else if (this.xhr.readyState == 4)
  {
    this.dispatchEvent((this.xhr.status < 400) ? 'load' : 'error');
    this.dispatchEvent('loadend');
    this._clear();
  }
}

Rails.Request.prototype.send = function(body)
{
  if (typeof body == 'object') {
    body = Rails.toURLEncoded(body);
  }
  this.xhr.send(body || '');
}

Rails.Request.prototype.abort = function()
{
  if (this.xhr)
  {
    this.xhr.abort();
    this.dispatchEvent('abort');
    this._clear();
  }
}

Rails.Request.prototype._clear = function() {
  this.xhr = null;
}

// IMPROVE: move to a HTTP object in AlphaControl?
Rails.toURLEncoded = function(params)
{
  if (typeof params == 'string') {
    return params;
  }
  
  var query_string = [];
  for (var k in params) {
    query_string.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
  }
  return query_string.join('&');
}

Rails.readMeta = function(name)
{
  var meta = document.querySelectorAll("meta[name=" + name + "]");
  return (meta.length > 0) ? meta[0].getAttribute('content') : null;
}

// FIXME: [data-remote] forms with GET method: are params passed?

var UJS = {
  init: function()
  {
    document.body.addEventListener("click", UJS.onclick, false);
    document.body.addEventListener('ajax:complete', UJS.afterRemoteRequest, false);
    
    var div = document.createElement("div");
    
//    if (typeof div.onsubmit != "undefined") { // disabled since firefox says 'undefined' too :(
      document.body.addEventListener("submit", UJS.onsubmit, false);
//    }
//    else {
    if (typeof div.onsubmit == "undefined") {
      document.body.addEventListener('focusin', UJS.IEFocusMonitor, false);
    }
  },

  onclick: function(event)
  {
    var target = event.target;
    do
    {
      if (target.hasAttribute('data-confirm')
        && !confirm(target.getAttribute('data-confirm')))
      {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      
      if (target.nodeName == 'A')
      {
        if (target.getAttribute('data-remote') == 'true')
        {
          event.preventDefault();
          UJS.remoteRequest(event.target);
          break;
        }
        else if (target.hasAttribute('data-method'))
        {
          event.preventDefault();
          UJS.methodRequest(event.target);
          break;
        }
      }
      else if (target.nodeName == 'INPUT' && target.type == 'submit') {
        target.setAttribute('submitted', true);
      }
      target = target.get ? target.get('parentNode') : target.parentNode;
    }
    while (target.parentNode && target != this);
  },

  onsubmit: function(event)
  {
    var inputs = event.target.querySelectorAll('input[type=submit][data-disable-with]');
    Array.prototype.forEach.call(inputs, function(input)
    {
      input.disabled = true;
      input.setAttribute('data-original-value', input.value);
      input.value = input.getAttribute('data-disable-with');
    });
    
    if (event.target.getAttribute('data-remote') == 'true')
    {
      event.preventDefault();
      UJS.remoteRequest(event.target);
    }
  },

  remoteRequest: function(target)
  {
    var self = this, method, url, request, body;
    this.dispatchEvent(target, 'ajax:before');
    
    if (target.nodeName == 'FORM')
    {
      url    = target.action;
      method = target.getAttribute('method') || 'post';
      body   = UJS.serialize(target);
    }
    else
    {
      url    = target.href;
      method = target.getAttribute('data-method') || 'get';
    }
    
    request = new Rails.Request();
    request.open(method, url);
    request.addEventListener('loadend', function(event) { self.dispatchEvent(target, 'ajax:complete', request); });
    request.addEventListener('load',    function(event) { self.dispatchEvent(target, 'ajax:success',  request); });
    request.addEventListener('error',   function(event) { self.dispatchEvent(target, 'ajax:failure',  request); });
    request.send(body);
    
    this.dispatchEvent(target, 'ajax:after');
  },

  // IMPROVE: use a well tested HTMLFormElement.prototype.serialize() method instead.
  serialize: function(form)
  {
    var params = [];
    
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
          params.push(encodeURIComponent(input.name) + '=' + encodeURIComponent(this.selectedOptions[i].value));
        }
      }
      else {
        params.push(encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value));
      }
    }, this);
    
    return params.join('&');
  },

  methodRequest: function(target)
  {
    var form = document.createElement('form');
    form.setAttribute('action', target.href);
    
    var method = target.getAttribute('data-method').toLowerCase();
    
    if (method == 'get' || method == 'post') {
      form.setAttribute('method', method);
    }
    else
    {
      var input = document.createElement('input');
      input.setAttribute('type',  'hidden');
      input.setAttribute('name',  '_method');
      input.setAttribute('value', method);
      
      form.appendChild(input);
      form.setAttribute('method', 'post');
    }
    
    var input = document.createElement('input');
    input.setAttribute('type',  'hidden');
    input.setAttribute('name',  Rails.readMeta('csrf-param'));
    input.setAttribute('value', Rails.readMeta('csrf-token'));
    form.appendChild(input);
    
    document.body.appendChild(form);
    form.submit();
  },

  dispatchEvent: function(target, type, request)
  {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.memo = request;
    return target.dispatchEvent(event);
  },

  afterRemoteRequest: function(event)
  {
    var inputs = event.target.querySelectorAll('input[type=submit]');
    Array.prototype.forEach.call(inputs, function(input) {
      input.removeAttribute('submitted');
    });
    
    var inputs = event.target.querySelectorAll('input[type=submit][data-disable-with]');
    Array.prototype.forEach.call(inputs, function(input)
    {
      if (!input.disabled) return;
      input.value = input.getAttribute('data-original-value');
      input.removeAttribute('data-original-value');
      input.disabled = false;
    });
  },

  // submit events don't bubble in IE6, we thus listen for focus,
  // which bubbles, to manually attach one.
  IEFocusMonitor: function(event)
  {
    var types = ['INPUT', 'SELECT', 'TEXTAREA', 'FORM'];
    if (types.indexOf(event.target.nodeName) != -1)
    {
      var form = event.target;
      while (form && form.nodeName != 'FORM') {
        form = form.parentNode;
      }
      form = Alpha.$(form);
      
      if (form && !form.hasAttribute('data-rails-onsubmit'))
      {
        form.setAttribute('data-rails-onsubmit', '1');
        form.addEventListener('submit', UJS.onsubmit, false);
      }
    }
  }
};

UJS.init();

// TODO: Add events to UI.Widget

var UI = {};

UI.Widget = function() {}

Optionable(UI.Widget);
Eventable(UI.Widget, ['show', 'close', 'hide', 'destroy']);

/**
 * Initializes a Widget.
 * 
 * Options:
 * 
 * - +id+            - widget's Element ID
 * - +className+     - widget's Element className
 * - +onClose+       - the strategy to adopt on close: either +'hide'+ or +'destroy'+.
 * - +closeOnEscape+ - boolean, defaults to false
 */
UI.Widget.prototype.initWidget = function(options)
{
  this.setOptions(options);
  
  this.container = document.createElement('div');
  if (this.options.id) this.container.id = this.options.id;
  if (this.options.className) this.container.className = this.options.className;
  
  this.content = document.createElement('div');
  this.content.className = 'content';
  this.container.appendChild(this.content);
  
  if (this.options.closeOnEscape)
  {
    this._closeOnEscape = this.close.bind(this);
    window.addEventListener('keyup', this._closeOnEscape, false);
  }
  
  this._hide();
}

/**
 * Sets Widget's content. Accepts either a String or a DOM Element.
 */
UI.Widget.prototype.setContent = function(content)
{
  if (content.tagName)
  {
    this.content.innerHTML = '';
    this.content.appendChild(content);
  }
  else {
    this.content.innerHTML = content;
  }
}

/**
 * Returns the DOM Element of the Widget's content.
 */
UI.Widget.prototype.getContent = function(content) {
  return this.content;
}

/**
 * Inserts the widget into the DOM. Actually appends the widget to
 * document's body.
 */
UI.Widget.prototype.attachToDOM = function() {
  document.body.appendChild(this.container);
}

/**
 * Actually does nothing by itself. It's just called everytime a Widget is
 * showed, allowing the widgets to position themselves.
 */
UI.Widget.prototype.setPosition = function() {}

/**
 * Attaches the Widget to the DOM (unless it's already attached to it),
 * then positions it and displays it.
 */
UI.Widget.prototype.show = function()
{
  if (!this.container.parentNode || !this.container.parentNode.tagName) {
    this.attachToDOM();
  }
  this.setPosition();
  
  if (!this.dispatchEvent('show')) {
    this._show();
  }
}

// Hides the Widget.
UI.Widget.prototype.hide = function() {
  this._close('hide');
}

// Closes the widgets, using the +onClose+ strategy.
UI.Widget.prototype.close = function(event)
{
  if (event && event.type == 'keyup' && event.keyCode != 27) return;
  this._close(this.options.onClose);
}

// Removes the Widget from the DOM and destroys it.
UI.Widget.prototype.destroy = function() {
  this._close('destroy');
}

// :nodoc:
UI.Widget.prototype._show = function() {
  if (this.container) this.container.style.display = 'block';
}

// :nodoc:
UI.Widget.prototype._hide = function() {
  if (this.container) this.container.style.display = 'none';
}

// :nodoc:
UI.Widget.prototype._destroy = function()
{
  if (this.container)
  {
    if (this.container.parentNode)
    {
      this._hide(); // IE trick: hide before removing
      this.container.parentNode.removeChild(this.container);
    }
    
    if (this._bound_destroy) {
      window.removeEventListener('keyup', this._closeOnEscape, false);
    }
    
    delete this.content;
    delete this.container;
  }
}

// :nodoc:
UI.Widget.prototype._close = function(type)
{
  if (!this.dispatchEvent('close'))
  {
    switch (type)
    {
      case 'hide':    if (!this.dispatchEvent('hide'))    this._hide();    break;
      case 'destroy': if (!this.dispatchEvent('destroy')) this._destroy(); break;
      default: throw new Error("Unknown onClose option: " + type);
    }
  }
}

// Returns true if Widget is currently displayed, false otherwise.
UI.Widget.prototype.displayed = function() {
  return (!!this.container && this.container.style.display != 'none');
}

// Returns true if Widget is currently displayed, false otherwise.
UI.Widget.prototype.attached = function() {
  return !!(this.container && this.container.parentNode);
}

UI.Overlay = function() {}
UI.Overlay.prototype = new UI.Widget();

UI.Overlay.prototype.initOverlay = function(options)
{
  this.setDefaultOptions({
    onClose: 'destroy',
    closeOnEscape: false
  });
  this.initWidget(options);
  this.content.className = 'overlay';

  if (!!(window.VBArray && document.implementation))
  {
    // we need to trick IE6 with an iframe, otherwise it places SELECT element _over_ the overlay.
    var iframe = document.createElement('iframe');
    iframe.src = "javascript:'<html></html>';";
    iframe.style.cssText += ';position:absolute;border:0;' +
      'top:0;left:0;width:100%;height:100%;overflow:hidden;filter:alpha(opacity=0);';
    this.container.insertBefore(iframe, this.content);
    
    this.content.style.cssText += ';position:absolute;border:0;top:0;left:0;width:100%;height:100%;';
  }
}

UI.Overlay.prototype.setPosition = function()
{
  var innerWidth, innerHeight, width, height;
  innerWidth  = (window.innerWidth  || document.documentElement.clientWidth);
  innerHeight = (window.innerHeight || document.documentElement.clientHeight);
  width  = ((document.body.clientWidth  > innerWidth)  ? document.body.clientWidth  : innerWidth);
  height = ((document.body.clientHeight > innerHeight) ? document.body.clientHeight : innerHeight);
  
  this.content.width    = width  + 'px';
  this.content.height   = height + 'px';
  this.content.position = 'absolute';
}

// FIXME: notification may not work as expected on IE6 (since position:fixed isn't available)
// Check http://leaverou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/

UI.Notification = function() {}
UI.Notification.prototype = new UI.Widget();

UI.Notification.prototype.initNotification = function(options)
{
  this.setOptions({timeout: 2500});
  this.initWidget(options);
  this.container.addClassName('notification');
}

UI.Notification.prototype.setMessage = function(html, timeout)
{
  timeout = timeout || this.options.timeout;
  
  if (this.timer) {
    clearTimeout(this.timer);
  }
  
  this.setContent(html);
  this.show();
  
  if (timeout > 0) {
    this.timer = setTimeout(this.hide.bind(this), timeout);
  }
}

UI.Notification.prototype.getMessage = function() {
  return this.getContent().innerHTML;
}

UI.Dialog = function() {}
UI.Dialog.prototype = new UI.Widget();

UI.Dialog.prototype.initDialog = function(options)
{
  this.setDefaultOptions({
    titlebar:      true,
    position:      ['center', 'middle'],
    onClose:       'destroy',
    closeOnEscape: true
  });
  this.initWidget(options);
  this.container.addClassName('dialog');
  
  if (this.options.titlebar)
  {
    // titlebar
    this.titlebar = document.createElement('div');
    this.titlebar.className = 'titlebar';
    this.container.insertBefore(this.titlebar, this.content);
    
    // title
    this.title = document.createElement('span');
    this.title.className = 'title';
    this.titlebar.appendChild(this.title);
    
    // close button
    this.closeButton = document.createElement('a');
    this.closeButton.className = 'close';
    this.closeButton.innerHTML = '<span>X</span>';
    this.closeButton.addEventListener('click', this.close.bind(this), false);
    this.titlebar.appendChild(this.closeButton);
  }
}

UI.Dialog.prototype.setTitle = function(title)
{
  if (title.tagName) {
    this.title.appendChild(title);
  }
  else {
    this.title.innerHTML = title;
  }
}

UI.Dialog.prototype.getTitle = function() {
  return this.title;
}

/**
 * Positions the Dialog within the page. Position is defined by the +position+
 * option, which can be any of 'center', 'middle', 'left', 'right', 'top',
 * 'bottom', or a collection of it, like ['top', 'left'].
 * 
 * The default is ['center', 'middle'].
 */
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
  
  var _display    = this.container.style.display;
  var _visibility = this.container.style.visibility;
  
  this.container.style.position   = 'absolute';
  this.container.style.display    = 'block';
  this.container.style.visibility = 'hidden';
  
  if (position.top) {
    this.container.style.top = '0px';
  }
  else if (position.bottom) {
    this.container.style.bottom = '0px';
  }
  else
  {
    var top = ((window.innerHeight || document.documentElement.clientHeight) - this.container.offsetHeight) / 2;
    top += document.documentElement.scrollTop || window.pageYOffset;
    this.container.style.top = Math.round(top) + 'px';
  }
  
  if (position.left) {
    this.container.style.left = '0px';
  }
  else if (position.right) {
    this.container.style.right = '0px';
  }
  else
  {
    var left = ((window.innerWidth || document.documentElement.clientWidth) - this.container.offsetWidth) / 2;
    left += document.documentElement.scrollLeft || window.pageXOffset;
    this.container.style.left = Math.round(left) + 'px';
  }
  
  this.container.style.display    = _display;
  this.container.style.visibility = _visibility;
}

UI.Dialog.prototype.destroy = function()
{
  delete this.title;
  delete this.titlebar;
  UI.Widget.prototype.destroy.call(this);
}

UI.ModalDialog = function() {}
UI.ModalDialog.prototype = new UI.Dialog();

UI.ModalDialog.prototype.initModalDialog = function(options)
{
  this.initDialog(options);
  this.container.addClassName('modal');
  
  this.overlay = new UI.Overlay();
  this.overlay.initOverlay();
  
  this.addEventListener('show',    this.overlay.show.bind(this.overlay));
  this.addEventListener('hide',    this.overlay.hide.bind(this.overlay));
  this.addEventListener('destroy', this.overlay.destroy.bind(this.overlay));
}

UI.ModalDialog.prototype.attachToDOM = function()
{
  this.overlay.attachToDOM();
  UI.Dialog.prototype.attachToDOM.call(this);
}

// TODO: Add events to UI.Picker
// TODO: Implement an 'auto' position for UI.Picker

UI.Picker = function() {}
UI.Picker.prototype = new UI.Widget();

UI.Picker.prototype.initPicker = function(relativeElement, options)
{
  if (typeof relativeElement == 'undefined') {
    throw new TypeError('Missing required parameter: relativeElement.');
  }
  this.relativeElement = relativeElement;
  
  this.setDefaultOptions({
    position:          null,
    onClose:           'hide',
    closeOnEscape:     true,
    closeOnOuterClick: true
  });
  this.initWidget(options);
  this.container.className = 'picker';
  
  if (this.options.closeOnOuterClick)
  {
    this._bound_closeOnOuterClick = this._closeOnOuterClick.bind(this);
    
//    var elm = document.documentElement ? document.documentElement : window;
//    elm.addEventListener('click', this._bound_closeOnOuterClick, false)
    window.addEventListener('click', this._bound_closeOnOuterClick, false);
  }
}

UI.Picker.prototype._closeOnOuterClick = function(event)
{
  var obj = event.target;
  do
  {
    if (obj == this.container || obj == this.relativeElement) {
      return;
    }
  }
  while(obj = obj.parentNode);
  
  this.close();
}

UI.Picker.prototype.attachToDOM = function() {
  this.relativeElement.parentNode.appendChild(this.container);
}

UI.Picker.prototype.initialPosition = function(absolute)
{
  return {
    left: this.relativeElement.offsetLeft,
    top:  this.relativeElement.offsetTop
  };
}

UI.Picker.prototype.computePosition = function()
{
  var position = this.initialPosition();
  
  if (this.options.position && this.options.position.indexOf)
  {
    // vertical position
    if (this.options.position.indexOf('top') > -1) {
      position.top -= this.container.offsetHeight;
    }
    else if (this.options.position.indexOf('bottom') > -1) {
      position.top += this.relativeElement.offsetHeight;
    }
    else
    {
      position.top += this.relativeElement.offsetHeight / 2;
      position.top -= this.container.offsetHeight / 2;
    }
    
    // horizontal position
    if (this.options.position.indexOf('left') > -1) {
      position.left -= this.container.offsetWidth;
    }
    else if (this.options.position.indexOf('right') > -1) {
      position.left += this.relativeElement.offsetWidth;
    }
    else
    {
      position.left += this.relativeElement.offsetWidth / 2;
      position.left -= this.container.offsetWidth / 2;
    }
    
    // normalizes the position
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
    position.className = className.join('-');
  }
  else {
    position.top += this.relativeElement.offsetHeight;
  }

  return position;
}

UI.Picker.prototype.setPosition = function()
{
  this.container.style.position = 'absolute';
  var position = this.computePosition();
  
  this.container.style.top  = parseInt(position.top)  + 'px';
  this.container.style.left = parseInt(position.left) + 'px';
  
  if (!position.className) {
    this.container.style.minWidth = this.relativeElement.offsetWidth + 'px';
  }
  else {
    this.container.addClassName(position.className);
  }
}

UI.Picker.prototype.destroy = function()
{
  window.removeEventListener('click', this._bound_closeOnOuterClick, false);
  UI.Widget.prototype.destroy.call(this);
}

// TODO: Dispatch activate/deactivate events
// IMPROVE: shall we move activate/deactivate to UI.Picker itself?

UI.ListPicker = function() {}
UI.ListPicker.prototype = new UI.Picker();

Eventable(UI.ListPicker, ['activate', 'deactivate', 'select']);

UI.ListPicker.prototype.initListPicker = function(input, options)
{
  this.setDefaultOptions({autoMarkFirst: false});
  this.initPicker(input, options);
  this.container.addClassName('list-picker');
  
  this.relativeElement.setAttribute('autocomplete', 'off');
  this.relativeElement.addEventListener('focus',    this.activate.bind(this),    false);
  this.relativeElement.addEventListener('click',    this.activate.bind(this),    false);
  this.relativeElement.addEventListener('blur',     this.deactivate.bind(this),  false);
  this.relativeElement.addEventListener('keypress', this.keypress_cb.bind(this), false);
  this.relativeElement.addEventListener('keyup',    this.keyup_cb.bind(this),    false);
  
  this.list = document.createElement('ul');
  this.list.addEventListener('click', this.click_cb.bind(this), false);
  this.setContent(this.list);
}

// items

UI.ListPicker.prototype.setItems = function(items)
{
  if (typeof items == 'string') {
    this.list.innerHTML = items;
  }
  else if (items.nodeName == '#document-fragment')
  {
    this.list.innerHTML = '';
    this.list.appendChild(items);
  }
  else
  {
    this.list.innerHTML = '';
    
    for (var i=0, len=items.length; i<len; i++) {
      this.list.appendChild(items[i]);
    }
  }
  
  if (this.options.autoMarkFirst && this.hasItems()) {
    this.markSelection(this.getItem(0));
  }
  else {
    this.unmarkSelection();
  }
}

UI.ListPicker.prototype.getItems = function() {
  return this.list.getElementsByTagName('li');
}

UI.ListPicker.prototype.getItem = function(index) {
  return this.list.getElementsByTagName('li')[index];
}

UI.ListPicker.prototype.hasItems = function(items) {
  return this.getItems().length > 0;
}

UI.ListPicker.prototype.clearItems = function() {
  this.list.innerHTML = '';
}

// selection

UI.ListPicker.prototype.markSelection = function(item)
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

UI.ListPicker.prototype.unmarkSelection = function()
{
  if (this.selection)
  {
    this.selection.removeClassName('selected');
    this.selection = null;
  }
},

UI.ListPicker.prototype.moveSelectionUp = function()
{
  var item, items;
  
  if (this.selection)
  {
    item = this.selection.get ?
      this.selection.get('previousElementSibling') :
      this.selection.previousElementSibling;
  }
  else if (this.hasItems())
  {
    items = this.getItems();
    item  = items[items.length - 1];
  }
  
  this.markSelection(item)
},

UI.ListPicker.prototype.moveSelectionDown = function()
{
  var item;
  
  if (this.selection)
  {
    item = this.selection.get ?
      this.selection.get('nextElementSibling') :
      this.selection.nextElementSibling;
  }
  else if (this.hasItems()) {
    item = this.getItems()[0];
  }
  
  this.markSelection(item)
},

UI.ListPicker.prototype.selectSelection = function()
{
  this.hide();
  
  if (this.selection)
  {
    var event = this.createEvent('select');
    event.target = this.selection;
    this.dispatchEvent(event);
    this.unmarkSelection();
  }
}

// display

UI.ListPicker.prototype.showOrHide = function()
{
  var method = this.hasItems() ? 'show' : 'hide';
  this[method]();
}

UI.ListPicker.prototype.activate = function(event)
{
//  if (!this.dispatchEvent('activate') && this.hasItems()) {
  if (this.hasItems()) {
    this.show();
  }
}

UI.ListPicker.prototype.deactivate = function(event) {
//  this.dispatchEvent('deactivate');
}

UI.ListPicker.prototype.cancel = function(event)
{
  this.hide();
  
  if (event)
  {
    event.stopPropagation();
    event.preventDefault();
  }
}

// callbacks

// IMPROVE: search for a parent LI if target isn't an LI.
UI.ListPicker.prototype.click_cb = function(event)
{
  if (event.target.tagName.toLowerCase() == 'li')
  {
    this.selection = event.target;
    this.selectSelection();
  }
}

UI.ListPicker.prototype.keypress_cb = function(event)
{
  switch(event.keyCode)
  {
    case 27: // esc
      this.cancel(event);
      return;
    
    case 13: // enter
      if (this.displayed())
      {
        this.selectSelection();
        event.stopPropagation();
        event.preventDefault();
      }
      return;
  }
}

UI.ListPicker.prototype.keyup_cb = function(event)
{
  switch(event.keyCode)
  {
    case 38: this.moveSelectionUp();   return; // up
    case 40: this.moveSelectionDown(); return; // down
    case 13: return;                           // enter
    case 27: this.cancel(event); return;       // esc
  }
  this.showOrHide();
}

// FIXME: find better method names than autocomplete & setValue.

UI.Autocomplete = function() {}
UI.Autocomplete.prototype = new UI.ListPicker();

UI.Autocomplete.prototype.initAutocomplete = function(input, options)
{
  if (!options || !options.url) {
    throw new Error("Missing required url option.");
  }
  this.setDefaultOptions({
    param: 'param',
    delay: 200,
    callback: 'callback'
  });
  
  this.initListPicker(input, options);
  this.addEventListener('select', this.autocomplete.bind(this));
  
  this.relativeElement.addEventListener('keyup', this.delayedSearch.bind(this), false);
}

UI.Autocomplete.prototype.delayedSearch = function(event)
{
  var self = this;
  
  if (this.delayedSearchTimer) {
    clearTimeout(this.delayedSearchTimer);
  }
  
  this.delayedSearchTimer = setTimeout(function() {
    self.search(event);
  }, this.options.delay);
}

UI.Autocomplete.prototype.search = function(event)
{
  // shall we make remote request?
  if (this.relativeElement.value.trim() == "")
  {
    this.setItems('');
    this.hide();
    return;
  }
  else if (this.relativeElement.value == this.previousValue) {
    return;
  }
  this.relativeElement.addClassName('loading');
  
  // remote request
  if (this.options.jsonp) {
    this.jsonp_request();
  }
  else {
    this.xhr_request()
  }
  
  this.previousValue = this.relativeElement.value;
}

UI.Autocomplete.prototype.jsonp_request = function()
{
  var self = this;
  
  if (this.request) {
    this.request.abort();
  }
  this.request = new JSONP.Request();
  this.request.open(this.url(), function(responseJSON)
  {
    self.relativeElement.removeClassName('loading');
    self.setItems(responseJSON);
    self.showOrHide();
  }, {param: this.options.callback});
  this.request.send();
}

UI.Autocomplete.prototype.xhr_request = function()
{
  var self = this;
  
  if (this.request) {
    this.request.abort();
  }
  this.request = new XMLHttpRequest();
  this.request.open('GET', this.url(), true);
  this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  this.request.onreadystatechange = function()
  {
    if (this.readyState == 4)
    {
      self.relativeElement.removeClassName('loading');
      
      if (this.status >= 200 && this.status < 400)
      {
        self.setItems();
        self.showOrHide();
      }
      else {
        console && console.error("HTTP Error: " + this.status, self.url());
      }
    }
  };
  
  this.request.send("");
}

UI.Autocomplete.prototype.setItems = function(items)
{
  if (typeof items == 'undefined') {
    items = this.request.responseText;
  }
  UI.ListPicker.prototype.setItems.call(this, items);
}

// Called whenever a selection is selected. Tries to read a data-value
// attribute and falls back to innerText.
UI.Autocomplete.prototype.autocomplete = function(event) {
  this.setValue(event.target.getAttribute('data-value') || event.target.innerText);
}

// Sets the autocompleted input value and empties the the list picker.
UI.Autocomplete.prototype.setValue = function(value)
{
  this.previousValue = this.relativeElement.value = value;
  this.clearItems();
}

UI.Autocomplete.prototype.url = function()
{
  return this.options.url + "?" + this.options.param + "=" +
    encodeURIComponent(this.relativeElement.value)
}

// NOTE: shall UI.Sortable inherit from UI.Widget?

UI.Sortable = function() {}
Optionable(UI.Sortable);
Eventable(UI.Sortable, ['dragstart', 'drop']);

UI.Sortable.prototype.initSortable = function(list, options)
{
  this.setDefaultOptions({selector: 'li'});
  this.setOptions(options);
  
  this.list = list;
  this.list.addEventListener('mousedown', this.start.bind(this), false);
  
  this._drag = this.drag.bind(this);
  this._drop = this.drop.bind(this);
}

UI.Sortable.prototype.start = function(event)
{
  var item = this.findItem(event.target);
  if (item)
  {
    this.dragged = item;
    
    var _event = new Eventable.Event();
    _event.initEvent('dragstart', true);
    if (this.dispatchEvent(_event))
    {
      this.dragged = null;
      return;
    }
    
    this.dragged.addClassName('dragged');
    this.draggedIdx = this.getItemIndex(this.dragged);
    
    document.body.addEventListener('mousemove', this._drag, false);
    document.body.addEventListener('mouseup',   this._drop, false);
    
    event.preventDefault();
  }
}

UI.Sortable.prototype.drag = function(event)
{
  var y, idx, target, parent;
  
  if (this.dragged)
  {
    y = event.clientY || event.pageY;
    
    target = this.findItem(event.target);
    if (target)
    {
      idx = this.getItemIndex(target);
      
      if (idx !== undefined)
      {
        var parent = target.get ? target.get('parentNode') : target.parentNode;
        if (idx > this.draggedIdx && y > this.previousY)
        {
          parent.insertAfter(this.dragged, target);
          this.draggedIdx = idx;
        }
        else if (idx < this.draggedIdx && y < this.previousY)
        {
          parent.insertBefore(this.dragged, target);
          this.draggedIdx = idx;
        }
      }
    }
    
    event.preventDefault();
    this.previousY = y;
  }
  
  event.preventDefault();
}

UI.Sortable.prototype.drop = function(event)
{
  if (this.dragged)
  {
    var _event = new Eventable.Event();
    _event.initEvent('drop', true);
    if (this.dispatchEvent(_event)) return;
    
    this.dragged.removeClassName('dragged');
    this.dragged = null;
    
    document.body.removeEventListener('mousemove', this._drag, false);
    document.body.removeEventListener('mouseup',   this._drop, false);
    
    event.preventDefault();
  }
}

UI.Sortable.prototype.getItems = function() {
  return this.list.querySelectorAll(this.options.selector);
}

// browses target -> parent until we find an item.
UI.Sortable.prototype.findItem = function(target)
{
  var items = this.getItems();
  do
  {
    for (var i=0; i<items.length; i++)
    {
      if (target == items[i]) {
        return items[i];
      }
    }
    target = target.parentNode;
  }
  while(target && target.parentNode);
}

UI.Sortable.prototype.getItemIndex = function(item)
{
  var items = this.getItems();
  for (var i=0; i<items.length; i++)
  {
    if (items[i] == item) {
      return i;
    }
  }
}

