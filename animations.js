$(document).ready(function() {

jQuery("time.timeago").timeago();

$('#char-count').show();

$('.tweet').hide().fadeIn('slow');

var userName = "semo";
var profilePic = "alagoon";

var newTweet;
var tweetText;


// SHOW / HIDE TWEET CONTROLS WHEN IN FOCUS
var buttonClicked = false;

$('#tweet-submit').on('click', function(){
  buttonClicked = true;
});

$('.tweet-compose').on('click', function(){
  $('#tweet-controls').fadeIn('fast');
  $(this).css({"height": "5em"});
});

$(document).on('focusin', '.tweet-compose-reply', function(){
  $(this).css({"height": "5em"});
});

$(document).on('focusout', '.tweet-compose-reply', function(){
  $(this).css({"height": "2.5em"});
});

$(document).on('mouseup', function(){
  if ((!$('#dashboard').is(event.target)) && !$('#tweet-submit').is(event.target)) {
    $('#tweet-controls').hide();
    $('.tweet-compose').css({"height": "2.5em"});
  }
//   else if(buttonClicked){
//     $('#tweet-controls').show();
//     $('.tweet-compose').css({"height": "5em"});
// }
});

// CHAR COUNT DECREASE
$('.tweet-compose').keyup(function () {
  var max = 140;

  var len = $(this).val().length;
  tweetText = $('.tweet-compose').val();
  if (len >= max) {
    // $('#tweet-controls').hide();
    $('#tweet-submit').attr('disabled', true);
  }
  else {
    var char2 = max - len;
    $('#char-count').text(char2);
    $('.button').attr('disabled', true);
    $('#char-count').css({"color": "#999"});
  }
  if (len >= 130){
    $('#char-count').css({"color": "red"});
  }
  if (len <= max) {
    $('#tweet-controls').show();
    $('#tweet-submit').attr('disabled', false);
  }
});

//SUBMIT TWEET
$('#tweet-submit').on('click', function(){
  newTweet = $('<div class="tweet"><div class="content"><img class="avatar" src="img/' + profilePic + '.jpg" /><strong class="fullname">' + userName + '</strong><span class="username"> @' + userName + '</span><span class="upperTime"><time class="timeago"> &sdot; ' + jQuery.timeago(new Date()) + '</time></span><p class="tweet-text">' + tweetText + '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="stats"><div class="retweets"><p class="num-retweets">30</p><p>RETWEETS</p></div><div class="favorites"><p class="num-favorites">6</p><p>FAVORITES</p></div><div class="users-interact"><div><img src="img/alagoon.jpg" /><img src="img/vklimenko.jpg" /></div></div><div class="time"><time class="timeago">' + jQuery.timeago(new Date()) + '</time></div><div class="reply"><img class="avatar" src="img/alagoon.jpg" /><textarea class="tweet-compose-reply" placeholder="Reply to @' + userName + '" /></textarea></div></div></div>'
);
  // $('#stream').prepend(newTweet).fadeIn(1000);
  if(tweetText){
  $(newTweet).prependTo('#stream').fadeIn(1000);
  tweetText = null;
  $('.tweet-compose').val(null);
  $('#char-count').text("140");
}
});

//TWEET STATS AND REPLY ON CLICK
var isClicked = false;
var replyClicked = false;

$(document).on('focusin', '.reply', function(){
  replyClicked = true;
});
$(document).on('focusout', '.reply', function(){
  replyClicked = false;
});

$(document).on('click', '.tweet', function(){
  if (replyClicked){
    $(this).find('.stats').show();
    $(this).find('.reply').show();
    $(this).find('.tweet-actions').show();
  }
  else if (!replyClicked){
  $(this).find('.stats').fadeToggle('fast');
  $(this).find('.reply').fadeToggle('fast');
  $(this).find('.tweet-actions').show();
  $(this).find('.upperTime').toggle();
//   isClicked = true;
}
// //   isClicked = false;
});

//TWEET ACTIONS ON HOVER
// if (!isClicked){
$(document).on('mouseenter', '.tweet',function(){
  $(this).find('.tweet-actions').css({"visibility": "visible"});
});
$(document).on('mouseleave', '.tweet',function(){
  $(this).find('.tweet-actions').css({"visibility": "hidden"});
});
// }

});
