$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var image = message.image ? `<img src = '${message.image}' >` : '';
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.datetime}
                    </div>
                  </div>
                  <div class="message__lower-info">
                    <p class="message__lower-info__body"></p>
                      ${message.body}
                      ${image}
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

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("id"); 
      $.ajax({
        url: 'api/messages',
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow')
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});

