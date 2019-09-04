$(function(){
  function buildHTML(message) {
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__lower-info">
                    <p class="message__lower-info__body">
                      ${message.body}
                    </p>
                      <image=${message.image}, class: 'message__lower-info__image' if message.image.present? >
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      var $scrollAuto = $('.messages');
      $scrollAuto.animate({scrollTop: $scrollAuto[0].scrollHeight}, 'fast');
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });
});

