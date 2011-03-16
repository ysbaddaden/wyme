UI.Toolbar = function() {}
UI.Toolbar.prototype = new UI.Widget();

Eventable(UI.Toolbar, ['before', 'after']);

UI.Toolbar.prototype.initToolbar = function()
{
  this.initWidget();
  this.content.addClassName('toolbar');
  this.buttons = [];
  
  this.content.addEventListener('mousedown', this._dispatchBefore.bind(this), false);
  this.content.addEventListener('mouseup',   this._dispatchAfter.bind(this),  false);
}

UI.Toolbar.prototype.addButton = function(type, text, callback)
{
  if (typeof callback == 'undefined') {
    throw new Error("Missing required 'callback' argument.");
  }
  
  var button = new UI.Button();
  button.initButton(type, callback);
  button.setText(text);
  button._show();
  
  this.buttons.push(button);
  this.content.appendChild(button.getContent());
  
  return button;
}

UI.Toolbar.prototype._dispatchBefore = function(event) {
  this._dispatch(event, 'before');
}

UI.Toolbar.prototype._dispatchAfter  = function(event) {
  this._dispatch(event, 'after');
}

UI.Toolbar.prototype._dispatch = function(event, type)
{
  if (event.target.hasClassName('button') || $(event.target.parentNode).hasClassName('button'))
  {
    this.dispatchEvent(type);
    event.preventDefault();
  }
}

//UI.Toolbar.prototype.activate = function()
//{
//  for (var i=0; i<this.buttons.length; i++) {
//    this.buttons.addClassName('disabled');
//  }
//}

//UI.Toolbar.prototype.deactivate = function()
//{
//  for (var i=0; i<this.buttons.length; i++) {
//    this.buttons.removeClassName('disabled');
//  }
//}

