UI.Button = function() {}
UI.Button.prototype = new UI.Widget();

UI.Button.prototype.initButton = function(name, callback)
{
  if (typeof name     == 'undefined') throw new Error("Missing required 'name' argument.");
  if (typeof callback == 'undefined') throw new Error("Missing required 'callback' argument.");
  
  this.name     = name;
  this.callback = callback;
  
  this.initWidget();
  
  this.content.className = 'button ' + name;
  this.content.addEventListener('mousedown', this._dispatch.bind(this), false);
  
  this.icon = document.createElement('span');
  this.icon.className = 'icon';
  this.content.appendChild(this.icon);
  
  this.text = document.createElement('span');
  this.text.className = 'text';
  this.content.appendChild(this.text);
}

UI.Button.prototype.setText = function(text) {
  this.text.innerText = text;
}

UI.Button.prototype.setDisabled = function(disabled)
{
  var method = (this.disabled = !!disabled) ? 'add' : 'remove';
  this.content[method + 'ClassName']('disabled');
}

// :nodoc:
UI.Button.prototype._dispatch = function(event)
{
  this.callback(this);
  event.preventDefault();
}

UI.ToggleButton = function() {}
UI.ToggleButton.prototype = new UI.Button();

UI.Button.prototype.initToggleButton = function(name, callback)
{
  this.initButton(name, callback);
  this.active = false;
}

UI.Button.prototype.setActive = function(active)
{
  var method = (this.active = !!active) ? 'add' : 'remove';
  this.content[method + 'ClassName']('active');
}

