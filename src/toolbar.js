UI.Toolbar = function() {}
UI.Toolbar.prototype = new UI.Widget();

UI.Toolbar.prototype.initToolbar = function()
{
  this.initWidget();
  this.content.addClassName('toolbar');
  this.buttons = [];
}

UI.Toolbar.prototype.addButton = function(name, text, callback)
{
  if (this.buttons[name]) {
    throw new Error("Toolbar already has a button named '" + name + "'.");
  }
  
  var button = new UI.Button();
  button.initButton(name, callback);
  button.setText(text);
  button._show();
  
  this.buttons[name] = button;
  this.content.appendChild(button.getContent());
  
  return button;
}

UI.Toolbar.prototype.getButton = function(name) {
  return this.buttons[name];
}

