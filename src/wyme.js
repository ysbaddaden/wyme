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
    
//    this.toolbar.addSelect('tag', this.HTMLTags(), this.setTag.bind(this));
    this.toolbar.addToggleButton('p',             'P',             this.setTag.bind(this));
    this.toolbar.addToggleButton('h1',            'H1',            this.setTag.bind(this));
    this.toolbar.addToggleButton('h2',            'H2',            this.setTag.bind(this));
    this.toolbar.addToggleButton('h3',            'H3',            this.setTag.bind(this));
    
    this.toolbar.addToggleButton('bold',          'Bold',          this.setBold.bind(this));
    this.toolbar.addToggleButton('italic',        'Italic',        this.setItalic.bind(this));
    this.toolbar.addToggleButton('underline',     'Underline',     this.setUnderline.bind(this));
    this.toolbar.addToggleButton('strikethrough', 'Strikethrough', this.setStrikethrough.bind(this));
    this.toolbar.addToggleButton('link',          'Link',          this.insertLink.bind(this));
    this.toolbar.addToggleButton('image',         'Image',         this.insertImage.bind(this));
    
    this.toolbar.addToggleButton('unorderedlist', 'Bullets',       this.setUnorderedList.bind(this));
    this.toolbar.addToggleButton('orderedlist',   'Numbers',       this.setOrderedList.bind(this));
    
    this.toolbar.addToggleButton('toggle',        'Source',        this.toggleEditor.bind(this));
    
    this.editor.appendChild(this.toolbar.getContent());
  },

  HTMLTags: function()
  {
    return {
      'p':  'Paragraph',
      'h1': 'Heading 1',
      'h2': 'Heading 2',
      'h3': 'Heading 3',
    };
  },

  buttonNames: function() {
    return ['bold', 'italic', 'underline', 'strikethrough', 'link', 'image'];
  },

  defaultButtonStates: function()
  {
    var buttons = {}, names = this.buttonNames(), i;
    for (i=0; i<names.length; i++) {
      buttons[names[i]] = false;
    }
    return buttons;
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
    
    this.contents.addEventListener('click',   this.updateToolbarState.bind(this), false);
    this.contents.addEventListener('focus',   this.updateToolbarState.bind(this), false);
    this.contents.addEventListener('blur',    this.resetToolbarState.bind(this),  false);
    
    this.contents.addEventListener('keydown', this.onkeydown.bind(this), false);
    this.contents.addEventListener('keyup',   this.onkeyup.bind(this),   false);
    
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

  // Activates or deactivates toolbar buttons depending on the caret position.
  updateToolbarState: function()
  {
    var range, element, buttons, name;
    
    try { range = window.getSelection().getRangeAt(0); }
    catch (e) { return; }
    
    element = range.endContainer;
    buttons = this.defaultButtonStates();
    
    while (element && element.parentNode)
    {
      element = element.parentNode;
      if (element.nodeName == 'B') buttons['bold']          = true;
      if (element.nodeName == 'I') buttons['italic']        = true;
      if (element.nodeName == 'U') buttons['underline']     = true;
      if (element.nodeName == 'S') buttons['strikethrough'] = true;
      if (element.nodeName == 'A') buttons['link']          = true;
      if (element.nodeName == 'IMG') buttons['image']       = true;
      
//      if (element.nodeName == 'P')  tag = 'p';
//      if (element.nodeName == 'H1') tag = 'h1';
//      if (element.nodeName == 'H2') tag = 'h2';
//      if (element.nodeName == 'H3') tag = 'h3';
    }
    this._setButtonsState(buttons);
//    this.toolbar.getButton('tag').selectValue(tag);
//    this.toolbar.setDisabled(false);
  },

  _setButtonsState: function(buttons)
  {
    for (var name in buttons)
    {
      this.toolbar.getButton(name).setActive(buttons[name]);
//      this.toolbar.getButton('tag').selectValue('p');
    }
  },

  // Activates or deactivates toolbar buttons depending on the caret position.
  resetToolbarState: function()
  {
    this._setButtonsState(this.defaultButtonStates());
//    this.toolbar.setDisabled(true);
  },

  // Applies any given range.
  // FIXME: doesn't work as expected in IE < 9 (ierange bug?)
  setRange: function(range)
  {
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  },

  checkSelection: function(event)
  {
    var range, elm;
    
    // limited to the HTML editor right now
    if (this.currentEditor == 'source') {
      return false;
    }
    
    // no selection = failure
    try {
      range = window.getSelection().getRangeAt(0);
    }
    catch (e) {
      return false;
    }
    
    // checks if selection is within this editor
    if (range)
    {
      elm = range.startContainer;
      while (elm && elm.parentNode)
      {
        elm = elm.parentNode;
        if (elm == this.contents) return true;
      }
    }
    
    // not in this editor
    return false;
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

//  setTag: function(select)
//  {
//    if (this.checkSelection())
//    {
//      var tag   = select.getSelectedValue();
//      var range = window.getSelection().getRangeAt(0);
//      
//      var node = range.startContainer;
//      while (node && node.nodeName == '#text' && node.parentNode) {
//        node = node.parentNode;
//      }
//      
//      var element = document.createElement(tag);
//      element.innerHTML = node.innerHTML;
//      node.parentNode.insertBefore(element, node);
//      node.parentNode.removeChild(node);
//      
//      this.updateTextarea();
//    }
//  },

  setTag: function(button)
  {
    if (!this.checkSelection()) return;
    
    var tag   = button.name;
    var range = window.getSelection().getRangeAt(0);
    
    var node = range.startContainer;
    while (node && node.nodeName == '#text' && node.parentNode) {
      node = node.parentNode;
    }
    
    var element = document.createElement(tag);
    element.innerHTML = node.innerHTML;
    node.parentNode.replaceChild(element, node);
//    node.parentNode.removeChild(node);
    
    this.updateTextarea();
  },

  setUnorderedList: function()
  {
//    if (!this.checkSelection()) return;
    this.setStyle('insertunorderedlist');
    
//    var range = window.getSelection().getRangeAt(0);
//    var start = range.startContainer.parentNode;
//    var end   = range.endContainer.parentNode;
//    
//    var list = document.createElement('ul');
//    
//    var element = start.previousElementSibling;
//    var nodes = [];

//    while (element)
//    {
//      element = element.nextElementSibling;
//      
//      var li = document.createElement('li');
//      li.innerHTML = element.innerHTML;
//      list.appendChild(li);
//      
//      if (element == end) break;
//    }

//    start.parentNode.insertBefore(list, start);
//    
//    element = start;
//    while (element)
//    {
//      var sibling = element.nextElementSibling;
//      element.parentNode.removeChild(element);
//      element = sibling;
//    }
    
//    do
//    {
//      var li = document.createElement('li');
//      li.innerHTML = element.innerHTML;
//      list.appendChild(li);
//      element = element.get('nextElementSibling');
//    }
//    while (element && element.nextElementSibling);
//    
//    start.parentNode.insertBefore(list, start);
//    
//    element = start;
//    do
//    {
//      var sibling = element.nextElementSibling;
//      element.parentNode.removeChild(element);
//      element = sibling;
//    }
//    while (element && element.nextElementSibling != end);
    
    this.updateTextarea();
  },

  setOrderedList:   function()
  {
    this.setStyle('insertorderedlist');
  },

  setBold:          function() { this.setStyle('bold');          },
  setItalic:        function() { this.setStyle('italic');        },
  setUnderline:     function() { this.setStyle('underline');     },
  setStrikethrough: function() { this.setStyle('strikethrough'); },

  setStyle: function(command, showDefaultUI, valueArgument)
  {
    if (this.checkSelection())
    {
      console.log(command);
      document.execCommand(command, showDefaultUI, valueArgument);
      this.updateTextarea();
      this.updateToolbarState();
    }
  },

  // FIXME: closing the insertLink dialog should reapply the range selection.
  insertLink: function()
  {
    var range, dialog, form;
    if (!this.checkSelection()) return;
    
    range = window.getSelection().getRangeAt(0);
    
    dialog = new UI.Dialog();
    dialog.initDialog({className: "wyme-insert-link"});
    dialog.setTitle("Insert Link");
    
    form = document.createElement('form');
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
      var url, link, title, fragment;
      event.preventDefault();
      
      url = form.querySelectorAll('input[name=url]')[0].value.trim();
      if (url != '')
      {
        link = document.createElement('a');
        link.href = url;
        
        title = form.querySelectorAll('input[name=title]')[0].value.trim();
        if (title) link.setAttribute('title', title);
        
        fragment = null;
        
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

  // FIXME: closing the insertImage dialog should reapply the range selection.
  insertImage: function()
  {
    var range, dialog, form;
    if (!this.checkSelection()) return;
    
    range = window.getSelection().getRangeAt(0);
    
    dialog = new UI.Dialog();
    dialog.initDialog({className: "wyme-insert-image"});
    dialog.setTitle("Insert Image");
    
    form = document.createElement('form');
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
      var url, img, title;
      evt.preventDefault();
      
      url = form.querySelectorAll('input[name=url]')[0].value.trim();
      if (url != '')
      {
        img = document.createElement('img');
        img.src = url;
        img.setAttribute('alt', form.querySelectorAll('input[name=alt]')[0].value.trim());
        
        title = form.querySelectorAll('input[name=title]')[0].value.trim();
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
