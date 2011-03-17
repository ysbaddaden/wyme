UI.Toolbar = function() {}
UI.Toolbar.prototype = new UI.Widget();

UI.Toolbar.prototype.initToolbar = function()
{
  this.initWidget();
  this.content.addClassName('toolbar');
  this.buttons = [];
}

UI.Toolbar.prototype.addButton = function(name, text, callback) {
  return this._addButton(name, text, callback, false);
}

UI.Toolbar.prototype.addToggleButton = function(name, text, callback) {
  return this._addButton(name, text, callback, true);
}

UI.Toolbar.prototype.getButton = function(name) {
  return this.buttons[name];
}

// :nodoc:
UI.Toolbar.prototype._addButton = function(name, text, callback, toggle)
{
  if (this.buttons[name]) {
    throw new Error("Toolbar already has a button named '" + name + "'.");
  }
  
  var button = toggle ? new UI.ToggleButton() : new UI.Button();
  button.initButton(name, callback);
  button.setText(text);
  button._show();
  
  this.buttons[name] = button;
  this.content.appendChild(button.getContent());
  
  return button;
}

