/*
  Converting select multiple into many checkboxes.
  Original code taken from Stefano Contini
  http://www.abidibo.net/blog/2013/04/10/convert-select-multiple-widget-checkboxes-django-admin-form/

  Refactored by Venelin Stoykov
*/
(function($) {
  "use strict";

  var getOptionRow = function getOptionRow(id, name, value, label, checked){
    var inputOptions = {
      'type': 'checkbox',
      'id': id,
      'name': name,
      'value': value
    }
    if (checked) {
      inputOptions.checked = 'checked';
    }
    return $('<tr>').append(
      $('<td>').append($('<input>', inputOptions))
    ).append(
      $('<td>').append($('<label>', {'for': id, 'class': 'mcheckbox-label'}).text(label))
    );
  }


  // convert a multiple select in a multiple checkbox
  var mselectTOmcheckbox = function mselectTOmcheckbox(selector) {

    var elements = $(selector);

    elements.each(function(index, item) {
      var mcheckbox_container;
      var $item = $(item),
          id = $item.attr('id'),
          name = $item.attr('name'),
          options = $item.children();

      var mcheckbox_table = $('<table/>', {
        id: 'mcheckbox-' + id,
        'class': 'mcheckbox-table'
      }).appendTo(
        mcheckbox_container = $('<div/>', {
            'class': 'mcheckbox-container'
        })
      );

      options.each(function(index, option) {
        var value = $(option).attr('value'),
            label = $(option).text(),
            selected = $(option).attr('selected');
        var checkbox_row = getOptionRow(id + '_' + value, name, value, label, selected).appendTo(mcheckbox_table);
      })

      mcheckbox_container.insertAfter(item);

      try {
        mcheckbox_container.resizable({handles: "se"});
      }
      catch(e) {
        // resizing not supported
        console.log('resizing not supported');
      }

      $(item).nextAll('.help').hide();
      $(item).remove();

    })

  };


  // Store original function as different name for later usage
  if (typeof dismissAddAnotherPopup === 'function') {
    var dismissAddAnotherPopupCopy = dismissAddAnotherPopup;

    // overwrite the original function used by django to add the realted field
    dismissAddAnotherPopup = function dismissAddAnotherPopup(win, newId, newRepr) {
      newId = html_unescape(newId);
      newRepr = html_unescape(newRepr);
      var id = windowname_to_id(win.name);
      var name = id.replace(/^id_/, '')
      var elem = document.getElementById('mcheckbox-' + id);
      // if the field was a multiple checkbox
      if(elem) {
        getOptionRow(id + '_' + newId, name, newId, newRepr, true).appendTo(elem);
        win.close();
      }
      // else call the default function previously copied
      else {
        dismissAddAnotherPopupCopy(win, newId, newRepr);
      }
    }
  }


  // apply the conversion to the desired elements
  $(document).ready(function() {
    mselectTOmcheckbox('select[data-checkboxselect]');
  });

}(jQuery || django.jQuery));