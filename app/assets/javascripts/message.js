$(function(){
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
      // if (send_message.length !== 0) {
      var html = buildHTML(send_message);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      $('#new_message')[0].reset();
      // }
      // else {
      //   alert('メッセージを入力してください');
      //   $('.submit-btn').prop('disabled', false);
      // }
    })
    .fail(function(){
      alert('error');
    })
  });

  var messageUpdateTime = -1;
  $(document).on('turbolinks:load', function() {
    if (messageUpdateTime > 0) {clearInterval(messageUpdateTime);}
    messageUpdateTime = (location.href.match(/\/groups\/\d+\/messages/)) ? setInterval(message_update, 5000) : -1;
  });


  function message_update() {
    var lastMessageId = $(".message").last().data('id');
    console.log(lastMessageId);
    $.ajax({
      url: location.href,
      type: "GET",
      dataType: 'json',
      data: {id: lastMessageId}
    })
    .done(function(data) {
      var insertHTML = "";
      data.forEach(function(message) {
        insertHTML += buildHTML(message);
        $('.massages').append(insertHTML);
      });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert('自動更新に失敗しました');
      // console.log("ajax通信に失敗しました");
      // console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
      // console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
      // console.log("errorThrown    : " + errorThrown.message); // 例外情報
    });
  }
});

