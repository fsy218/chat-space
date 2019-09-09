$(document).on('turbolinks:load', function() {
  var search_list = $('#user-search-result');
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

  var groupmember_list = $('#chat-member')
  function appendGroupUser(adduser) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${adduser.userId}>
                  <p class='chat-group-user__name'>${adduser.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    groupmember_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == "") {
      $('#user-search-result').empty();
    }
    else {
      $.ajax({
        type: "GET",
        url: "/users/search",
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0 ){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function(){
        alert('error');
      })
    }
  });

  $(document).on('click', '.chat-group-user__btn--add', function(){
    adduser = $(this).data();
    appendGroupUser(adduser);
    $(this).parent().remove();
  });
  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});