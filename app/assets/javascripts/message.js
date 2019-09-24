$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var img = message.image ? `<img class= "message__lower-info__image" src=${message.image} >` : "";
    var html = `<div class="message" data-message="${message.id}">
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
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
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
    .done(function(data){
      if (data.length !== 0) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      scroll();
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

  var autoupdate = setInterval(function() {
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $(".message").last().data("message");
      debugger;
      $.ajax({
        url: location.pathname,
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(data) {
        data.forEach(function(message) {
          $('.massages').append(buildHTML(message));
          scroll();
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
    else {
      clearInterval(interval);
    }
  }, 5000 )
});

