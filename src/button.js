UI.Button = function() {}
UI.Button.prototype = new UI.Widget();

UI.Button.prototype.initButton = function(type, callback)
{
  if (typeof type     == 'undefined') throw new Error("Missing required 'type' argument.");
  if (typeof callback == 'undefined') throw new Error("Missing required 'callback' argument.");
  
  this.active   = false;
  this.type     = type;
  this.callback = callback;
  
  this.initWidget();
  
  this.content.className = 'button ' + type;
  this.content.addEventListener('click', this.dispatch.bind(this), false);
  
  this.icon = document.createElement('span');
  this.icon.className = 'icon';
  this.content.appendChild(this.icon);
  
  this.text = document.createElement('span');
  this.text.className = 'text';
  this.content.appendChild(this.text);
}

UI.Button.prototype.dispatch = function(event) {
  this.callback(this);
}

UI.Button.prototype.setText = function(text) {
  this.text.innerText = text;
}

UI.Button.prototype.setActive = function(active)
{
  var method = (this.active = !!active) ? 'add' : 'remove';
  this[method + 'ClassName']('active');
}

UI.Button.prototype.getActive = function(active) {
  return this.active;
}

