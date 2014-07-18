/*jshint browser:true*/
$(function() {
  'use strict';

  var room, listKey, items;
  var connectUrl = 'https://goinstant.net/ntassone/dn-motd-archive';

  // Initialize our homemade view
  var todoList = new TodoList({
    list: $("#list")
  });

  // Connect to the GoInstant platform
  var connect = goinstant.connect(connectUrl);

  // Lookup the connected user's info
  connect.then(function(res) {
    room = res.rooms[0];
    listKey = room.key('/motd-list');

    return listKey.get();

  // Populate the list with existing items
  }).then(function(res) {
    items = res.value || [];
    _.each(items, _loadItem);

  // Attach listeners for new items
  }).fail(function(err) {
    console.error(err);
  });

  function _loadItem(item, id) {
    todoList.addTask(item.title, id);
  }

  function _idFromKey(key) {
    var value = key.replace(listKey.name + '/', '');
    return value;
  }
});
