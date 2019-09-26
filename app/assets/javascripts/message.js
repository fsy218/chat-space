$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    img = message.image ? `<img class= "message__lower-info__image" src=${message.image} >` : "";
    html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.datetime}
                    </div>
                  </div>
                  <div class="message__lower-info">
                    <p class="message__lower-info__body">
                      ${message.body}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(send_message){
      debugger;
      if (send_message.length !== 0) {
      var html = buildHTML(send_message);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      $('#new_message')[0].reset();
      }
      else {
        alert('メッセージを入力してください');
        $('.submit-btn').prop('disabled', false);
      }
    })
    .fail(function(){
      alert('error');
    })
  });

  // var messageUpdateTime = -1;
  // $(document).on('turbolinks:load', function() {
  //   if (messageUpdateTime > 0) {clearInterval(messageUpdateTime);}
  //   messageUpdateTime = (location.href.match(/\/groups\/\d+\/messages/)) ? setInterval(message_update, 5000) : -1;
  // });


  // function message_update() {
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("id"); 
    // var last_message_id = $(".message").last().data('id');
      $.ajax({
        url: 'api/messages',
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        debugger;
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow')
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert('自動更新に失敗しました');
        // console.log("ajax通信に失敗しました");
        // console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
        // console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
        // console.log("errorThrown    : " + errorThrown.message); // 例外情報
      });
    }
  };
  setInterval(reloadMessages, 5000);
});

