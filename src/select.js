UI.Select = function() {}
UI.Select.prototype = new UI.Widget();

UI.Select.prototype.initSelect = function(name, options, callback)
{
  if (typeof name     == 'undefined') throw new Error("Missing required 'name' argument.");
  if (typeof callback == 'undefined') throw new Error("Missing required 'callback' argument.");
  
  this.name     = name;
  this.callback = callback;
  
  this.initWidget();
  
  this.content = document.createElement('select');
  this.content.className = name;
  this.content.addEventListener('change', this._dispatch.bind(this), false);
  
  for (var tag in options)
  {
    var option = document.createElement('option');
    option.value = tag;
    option.innerHTML = options[tag];
    this.content.appendChild(option);
  }
}

UI.Select.prototype.setDisabled = function(disabled) {
  this.content.disabled = disabled;
}

UI.Select.prototype.getSelectedOption = function() {
  return this.content[this.content.selectedIndex];
}

UI.Select.prototype.getSelectedValue = function() {
  return this.content.value;
}

UI.Select.prototype.selectValue = function(value)
{
  for (var i=0; i<this.content.options.length; i++)
  {
    var option = this.content.options[i];
    if (option.value == value) {
      option.selected = true;
    }
  }
}

// :nodoc:
UI.Select.prototype._dispatch = function(event)
{
  this.callback(this);
  event.preventDefault();
}

