function WYME(textarea)
{
  this.textarea = textarea;
  this.buildEditor();
}

WYME.prototype =
{
  buildEditor: function()
  {
    this.editor = document.createElement('div');
    this.editor.className = 'wyme';
    
    this.buildToolbar();
    this.buildContents();
    
    this.textarea.style.display = 'none';
    this.textarea.parentNode.insertAfter(this.editor, this.textarea);
    this.editor.appendChild(this.textarea);
    
    this.textarea.addEventListener('keyup',    this.updateContents.bind(this), false);
    this.contents.addEventListener('keydown',  this.onkeydown.bind(this), false);
    this.contents.addEventListener('keyup',    this.onkeyup.bind(this), false);
    this.toolbar.addEventListener('mousedown', this.ontoolbarmousedown.bind(this), false);
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
    this.editor.appendChild(this.contents);
  },

  buildToolbar: function()
  {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'toolbar';
    
    var switcher = document.createElement('a');
    switcher.className = 'switcher';
    switcher.href = '#';
    switcher.addEventListener('click', this.changeEditorFormat.bind(this), false);
    switcher.setAttribute('data-value', 'source');
    switcher.innerText = 'source';
    this.toolbar.appendChild(switcher);
    
//    var select = document.createElement('select');
//    select.innerHTML = "<option>HTML</option><option>Source</option>";
//    select.addEventListener('change', this.changeEditorFormat.bind(this), false);
//    this.toolbar.appendChild(select);
    
    this.buildToolbarButton('<b>bold</b>',   'bold');
    this.buildToolbarButton('<i>italic</i>', 'italic');
    this.buildToolbarButton('link',          'createLink');
    this.buildToolbarButton('image',         'insertImage');
    
    this.editor.appendChild(this.toolbar);
  },

  buildToolbarButton: function(text, command)
  {
    var btn = document.createElement('span');
    btn.className = 'button';
    btn.setAttribute('data-command', command);
    btn.innerHTML = text;
    this.toolbar.appendChild(btn);
  },

  // helpers

  changeEditorFormat: function(evt)
  {
    evt.preventDefault();
    
    switch (evt.target.getAttribute('data-value'))
    {
      case 'source':
        evt.target.innerText = 'HTML';
        evt.target.setAttribute('data-value', 'HTML');
        this.textarea.style.display = 'block';
        this.contents.style.display = 'none';
      break;
      
      case 'HTML':
        evt.target.innerText = 'source';
        evt.target.setAttribute('data-value', 'source');
        this.textarea.style.display = 'none';
        this.contents.style.display = 'block';
      break;
    }
  },

  updateTextarea: function()
  {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    this.timer = setTimeout(function() {
      this.textarea.value = this.contents.innerHTML.trim();
    }.bind(this), 200);
  },

  updateContents: function()
  {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    this.timer = setTimeout(function() {
      this.contents.innerHTML = this.textarea.value;
    }.bind(this), 200);
  },

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

  onkeyup: function(evt) {
    this.updateTextarea();
  },

  // toolbar events

  /**
   * Executed on toolbar button click.
   * 
   * Checks if current selection is a child of this editor before
   * executing the command.
   */
  ontoolbarmousedown: function(evt)
  {
    var parent = window.getSelection().anchorNode;
    while (parent && parent.parentNode)
    {
      parent = parent.parentNode;
      
      if (parent == this.contents)
      {
        var btn = evt.target;
        if (btn && btn.nodeName && btn.nodeName.toLowerCase() != 'span') {
          btn = btn.get('parentNode');
        }
        
        if (btn && btn.hasAttribute('data-command'))
        {
          this.execToolbarCommand(btn.getAttribute('data-command'));
          evt.preventDefault();
        }
      }
    }
  },

  execToolbarCommand: function(command)
  {
    switch(command)
    {
      case 'createLink':    this.createLink();          break;
      case 'insertImage':   this.insertImage();         break;
      case 'ul': case 'ol': this.insertList(command);   break;
      default:              this.execCommand(command);  break;
    }
  },

  execCommand: function(command, showDefaultUI, valueArgument)
  {
    document.execCommand(command, showDefaultUI, valueArgument);
    this.updateTextarea();
  },

//  insertList: function(type)
//  {
//    var sel = window.getSelection();
//    var ul = document.createElement(type);
//    var li = document.createElement('li');
//    li.appendChild(document.createElement('br'));
//    ul.appendChild(li);
//    
//    var parent = sel.anchorNode.parentNode;
//    parent.insertAfter(ul, sel.anchorNode);
//    
//    if (sel.getRangeAt(0).isCollapsed) {
//      parent.removeChild(sel.anchorNode);
//    }
//    
//    this.updateTextarea();
//  },

  createLink: function()
  {
    var range = window.getSelection().getRangeAt(0);
    var dialog = new UI.Dialog();
    dialog.initDialog({id: "wyme-create-link"});
    
    dialog.setTitle("Insert Link");
    dialog.setContent('<form action="#">\
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
      </p>\
    </form>');
    
    var form = dialog.getContent().getElementsByTagName('form').item(0);
    form.addEventListener('submit', function(evt)
    {
      evt.preventDefault();
      
      var url = form.querySelectorAll('input[name=url]').item(0).value.trim();
      if (url != '')
      {
        var link = document.createElement('a');
        link.href = url;
        
        var title = form.querySelectorAll('input[name=title]').item(0).value.trim();
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
      }
      
      dialog.hide();
    }.bind(this), false);
    
    dialog.show();
    form.querySelectorAll('input[name=url]').item(0).focus();
  },

  insertImage: function()
  {
    var range = document.getSelection().getRangeAt(0);
    var dialog = new UI.Dialog({id: "wyme-create-link"});
    
    dialog.setTitle("Insert Image");
    dialog.setContent('<form action="#">\
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
      </p>\
    </form>');
    
    var form = dialog.getContent().getElementsByTagName('form').item(0);
    form.addEventListener('submit', function(evt)
    {
      evt.preventDefault();
      
      var url = form.querySelectorAll('input[name=url]').item(0).value.trim();
      if (url != '')
      {
        var img = document.createElement('img');
        img.src = url;
        img.setAttribute('alt', form.querySelectorAll('input[name=alt]').item(0).value.trim());
        
        var title = form.querySelectorAll('input[name=title]').item(0).value.trim();
        if (title) img.setAttribute('title', title);
        
        range.insertNode(img);
        this.updateTextarea();
      }
      
      dialog.hide();
    }.bind(this), false);
    
    dialog.display();
    form.querySelectorAll('input[name=url]').item(0).focus();
  }
//  ,

//  insertHTML: function(html)
//  {
//    if (document.selection) {
//      document.selection.createRange().pasteHtML(html);
//    }
//    else {
//      document.execCommand('insertHTML', false, html);
//    }
//  }
}
