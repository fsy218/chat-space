$(function(){
  function buildHTML(message) {
    img = message.image ? `<img class= "message__lower-info__image" src=${message.image} >` : "";
    html = `<div class="message" data-message="${message.id}">
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

  function scroll() {
    
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

  var message_update_time = -1;
  $(document).on('turbolinks:load', function() {
    if (message_update_time > 0) {clearInterval(message_update_time);}
    message_update_time = (location.href.match(/\/groups\/\d+\/messages/)) ? setInterval(message_update, 5000) : -1;
  });


  function message_update() {
    var last_message_id = $(".message__lower-info__image").last().data('message');
    console.log(last_message_id);
    $.ajax({
      url: location.href,
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
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

