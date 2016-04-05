$(function() {


  $('a[href*="#"]:not([href="#"])').click(function() {

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 1000);
        return false;
      }
    }
  });

  $('#mail-btn').on('click tap', function(event) {

    event.preventDefault();
    var body_message = $('#body').val();
    var email = 'djtouchette199@gmail.com';
    var subject = $('#subject').val();

    console.log(subject);
    var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

    var win = window.open(mailto_link, 'emailWindow');

    function explode(){
      if (win && win.open && !win.closed) win.close();
    }
    setTimeout(explode, 100);
    $('#contact-form').trigger("reset");



  });

  function episodes(){
    $.ajax({
      url:'http://punchdrunkallies.libsyn.com/rss/',
      dataType: 'xml',
      success: function(data){

        var x2js = new X2JS();
        var jsonObj = x2js.xml2json(data);
        addEpisodes(jsonObj);

        }
      });
    }



    function addEpisodes(data) {

      var episode = data.rss.channel.item;

      for (var i = 0; i < episode.length; i++ ) {

        var  li = $('<li>');

        li.html('<a href='+ episode[i].link +' target="_blank"><span class="title">' + episode[i].title + '</span></a>' + episode[i].description);
        li.attr('data-link', episode[i].link);
        $(li).appendTo('#episode-list');

      }

    }


    episodes();


});
