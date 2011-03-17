function WYME(textarea)
{
  this.textarea = textarea;
  this.buildEditor();
}

WYME.prototype =
{
  buildEditor: function()
  {
    this.currentEditor = 'html';
    
    this.editor = document.createElement('div');
    this.editor.className = 'wyme';
    
    this.buildToolbar();
    this.buildContents();
    this.moveTextarea();
  },

  buildToolbar: function()
  {
    this.toolbar = new UI.Toolbar();
    this.toolbar.initToolbar();
    
    this.toolbar.addButton('bold',          'Bold',          this.setBold.bind(this));
    this.toolbar.addButton('italic',        'Italic',        this.setItalic.bind(this));
    this.toolbar.addButton('underline',     'Underline',     this.setUnderline.bind(this));
    this.toolbar.addButton('strikethrough', 'Strikethrough', this.setStrikethrough.bind(this));
    this.toolbar.addButton('link',          'Link',          this.insertLink.bind(this));
    this.toolbar.addButton('image',         'Image',         this.insertImage.bind(this));
    this.toolbar.addButton('toggle',        'Source',        this.toggleEditor.bind(this));
    
    this.editor.appendChild(this.toolbar.getContent());
  },

  buildContents: function()
  {
    this.contents = document.createElement('div');
    this.contents.className = 'contents';
    this.contents.contentEditable = true;
    
    if (this.textarea.value.trim() != '') {
      this.contents.innerHTML = this.textarea.value;
    }
    else {
      this.contents.innerHTML = '<p><br/></p>';
    }
    
    this.contents.addEventListener('keydown', this.onkeydown.bind(this), false);
    this.contents.addEventListener('keyup',   this.onkeyup.bind(this), false);
    
    this.editor.appendChild(this.contents);
  },

  moveTextarea: function()
  {
    this.textarea.style.display = 'none';
    this.textarea.parentNode.insertAfter(this.editor, this.textarea);
    this.textarea.addEventListener('keyup', this.updateContents.bind(this), false);
    this.editor.appendChild(this.textarea);
  },

  // helpers

  toggleEditor: function(button)
  {
    if (this.currentEditor == 'html')
    {
      button.setActive(true);
      this.currentEditor = 'source';
      this.textarea.style.display = 'block';
      this.contents.style.display = 'none';
    }
    else
    {
      button.setActive(false);
      this.currentEditor = 'html';
      this.textarea.style.display = 'none';
      this.contents.style.display = 'block';
    }
  },

  // Updates the textarea with the contentEditable HTML.
  updateTextarea: function()
  {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    this.timer = setTimeout(function() {
      this.textarea.value = this.contents.innerHTML.trim();
    }.bind(this), 200);
  },

  // Updates the contentEditable with the textarea value.
  updateContents: function()
  {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    this.timer = setTimeout(function() {
      this.contents.innerHTML = this.textarea.value;
    }.bind(this), 200);
  },

  // Applies any given range.
  // FIXME: doesn't work as expected in IE < 9 (ierange bug?)
  setRange: function(range)
  {
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  },

  updateToolbarState: function()
  {
    var selection = window.getSelection();
    
    // TODO: Wyme.prototype.updateToolbarState
    // ...
    // ...
  },

//  // Records the current range (before button click).
//  storeCurrentRange: function(event) {
//    this.currentRange = window.getSelection().getRangeAt(0);
//  },

//  // Applies the stored range (after button click).
//  popCurrentRange: function()
//  {
//    if (this.currentRange)
//    {
//      this.contents.focus();
//      this.setRange(this.currentRange);
//      this.currentRange = null;
//    }
//  },

  // content editable events

  onkeydown: function(evt)
  {
    // prevents deletion of minimum P element (which would lead to have a DIV).
    if (evt.keyCode == 8)
    {
      if (this.contents.innerHTML.trim() == '<p><br></p>') {
        evt.preventDefault();
      }
    }
  },

  onkeyup: function(evt)
  {
    this.updateToolbarState();
    this.updateTextarea();
  },

  onfocus: function(evt) {
    this.updateToolbar();
  },

  // toolbar events

  setBold:          function() { this.setStyle('bold'); },
  setItalic:        function() { this.setStyle('italic'); },
  setUnderline:     function() { this.setStyle('underline'); },
  setStrikethrough: function() { this.setStyle('strikethrough'); },

  checkSelection: function(event)
  {
    // limited to the HTML editor right now
    if (this.currentEditor == 'source') {
      return false;
    }
    
    // no selection = failure
    try {
      var range = window.getSelection().getRangeAt(0);
    }
    catch (e) {
      return false;
    }
    
    // checks if selection is within this editor
    if (range)
    {
      var elm = range.startContainer;
      while (elm && elm.parentNode)
      {
        elm = elm.parentNode;
        if (elm == this.contents) return true;
      }
    }
    
    // not in this editor
    return false;
  },

  setStyle: function(command, showDefaultUI, valueArgument)
  {
    if (this.checkSelection())
    {
      document.execCommand(command, showDefaultUI, valueArgument);
      this.updateTextarea();
    }
  },

  insertLink: function()
  {
    if (!this.checkSelection()) return;
    
    var range = window.getSelection().getRangeAt(0);
    
    var dialog = new UI.Dialog();
    dialog.initDialog({className: "wyme-insert-link"});
    dialog.setTitle("Insert Link");
    
    var form = document.createElement('form');
    form.innerHTML = '\
      <p>\
        <label for="wyme-link-url">URL</label>\
        <input type="text" name="url" id="wyme-link-url" placeholder="http://"/>\
      </p>\
      <p>\
        <label for="wyme-link-title">Title</label>\
        <input type="text" name="title" id="wyme-link-title"/>\
      </p>\
      <p class="actions">\
        <input type="submit" value="OK"/>\
      </p>';
    dialog.setContent(form);
    
    form.addEventListener('submit', function(event)
    {
      event.preventDefault();
      
      var url = form.querySelectorAll('input[name=url]')[0].value.trim();
      if (url != '')
      {
        var link = document.createElement('a');
        link.href = url;
        
        var title = form.querySelectorAll('input[name=title]')[0].value.trim();
        if (title) link.setAttribute('title', title);
        
        var fragment = null;
        
        if (range.collapsed) {
          fragment = document.createTextNode(url.replace(/^http:\/\//, '').replace(/\/$/, ''));
        }
        else {
          fragment = range.extractContents();
        }
        
        link.appendChild(fragment);
        range.insertNode(link);
        this.updateTextarea();
        
        this.setRange(range);
      }
      
      dialog.hide();
    }.bind(this), false);
    
    dialog.show();
    console.log(form.querySelectorAll);
    form.querySelectorAll('input[name=url]')[0].focus();
  },

  insertImage: function()
  {
    if (!this.checkSelection()) return;
    
    var range = window.getSelection().getRangeAt(0);
    
    var dialog = new UI.Dialog();
    dialog.initDialog({className: "wyme-insert-image"});
    dialog.setTitle("Insert Image");
    
    var form = document.createElement('form');
    form.innerHTML = '\
      <p>\
        <label for="wyme-link-url">URL</label>\
        <input type="text" name="url" id="wyme-link-url"/>\
      </p>\
      <p>\
        <label for="wyme-link-alt">ALT</label>\
        <input type="text" name="alt" id="wyme-link-alt"/>\
      </p>\
      <p>\
        <label for="wyme-link-title">Title</label>\
        <input type="text" name="title" id="wyme-link-title"/>\
      </p>\
      <p>\
        <input type="submit" value="OK"/>\
      </p>';
    dialog.setContent(form);
    
    form.addEventListener('submit', function(evt)
    {
      evt.preventDefault();
      
      var url = form.querySelectorAll('input[name=url]')[0].value.trim();
      if (url != '')
      {
        var img = document.createElement('img');
        img.src = url;
        img.setAttribute('alt', form.querySelectorAll('input[name=alt]')[0].value.trim());
        
        var title = form.querySelectorAll('input[name=title]')[0].value.trim();
        if (title) img.setAttribute('title', title);
        
        range.insertNode(img);
        this.updateTextarea();
        
        this.setRange(range);
      }
      
      dialog.hide();
    }.bind(this), false);
    
    dialog.show();
    form.querySelectorAll('input[name=url]')[0].focus();
  }
}
