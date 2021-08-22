$(function(){
  'use strict'

  new PerfectScrollbar('#mailGroup', {
    suppressScrollX: true
  });

  const mc = new PerfectScrollbar('#mailContent', {
    suppressScrollX: true
  });

  $('[data-bs-toggle="tooltip"]').tooltip();

  $('.sidebar .nav-link').on('click', function(e){
    e.preventDefault();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    $(this).closest('.nav').siblings('.nav').find('.nav-link').removeClass('active');
  });

  $('.mailbox-menu').on('click', function(e){
    e.preventDefault();

    if (window.matchMedia('(max-width: 767px)').matches) {
      $('body').toggleClass('sidebar-show');
    } else {
      $('body').toggleClass('sidebar-hide');
    }

    mc.update();
  });

  $('.backdrop').on('click', function(e){
    $('body').removeClass('sidebar-show');
  });

  $('.mailbox-search .form-control').on('focusin focusout', function(e){
    if(e.type === 'focusin') {
      $(this).parent().addClass('onfocus');
    } else {
      $(this).parent().removeClass('onfocus');
    }
  });

  $('.mailbox-select').on('mouseenter mouseleave', '.dropdown-check, .dropdown-link', function(e){
    if(e.type === 'mouseenter') {
      $(this).parent().addClass('onhover');
    } else {
      $(this).parent().removeClass('onhover');
    }
  });

  $('.dropdown-check').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('checkall');

    $('#mailGroup .mail-item').toggleClass('selected');

    var m = $(this).hasClass('checkall')? '.all' : '.none';
    $('.mailbox-select '+m).addClass('active').siblings().removeClass('active');

  });

  $('.mailbox-select .dropdown-item').on('click', function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');

    if($(this).hasClass('all')) {
      $('#mailGroup .mail-item').addClass('selected');
      $('.dropdown-check').addClass('checkall');
    }

    if($(this).hasClass('none')) {
      $('#mailGroup .mail-item').removeClass('selected');
      $('.dropdown-check').removeClass('checkall');
    }

    if($(this).hasClass('read')) {
      $('#mailGroup .mail-item').removeClass('selected');
      $('#mailGroup .mail-item:not(.unread)').addClass('selected');
    }

    if($(this).hasClass('unread')) {
      $('#mailGroup .mail-item').removeClass('selected');
      $('#mailGroup .mail-item.unread').addClass('selected');
    }

    if($(this).hasClass('starred')) {
      $('#mailGroup .mail-item').removeClass('selected');
      $('#mailGroup .mail-star.active').each(function(){
        $(this).closest('.mail-item').addClass('selected');
      });
    }
  });

  $('.mail-item').on('click', function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    $(this).removeClass('unread');

    $('.mailcontent-placeholder').siblings().removeClass('d-none');
    $('.mailcontent-placeholder').addClass('d-none');

    if (window.matchMedia('(max-width: 1199px)').matches) {
      $('body').addClass('mailcontent-show');
    }
  });

  $('.mail-star').on('click', function(){
    $(this).toggleClass('active');
  });


  // Mail Content
  $('.mailcontent-header').on('click', function(){
    $(this).siblings('.mailcontent-body').toggleClass('d-none');
    mc.update();
  });

  $('.menu-compose').on('click', function(e){
    e.preventDefault();
    $(this).addClass('d-none');
    $('.compose').removeClass('d-none');
  });

  $('.compose-title, .nav-link-minimize').on('click', function(e){
    $(this).closest('.compose').toggleClass('minimize');
  });

  $('.nav-link-fullscreen').on('click', function(e){
    e.preventDefault();
    $(this).closest('.compose').toggleClass('fullscreen');
  });

  $('.nav-link-close').on('click', function(e){
    e.preventDefault();
    $(this).closest('.compose').addClass('d-none').removeClass('minimize fullscreen');
    $('.menu-compose').removeClass('d-none');
  });

  $('#mailBack').on('click touch', function(e){
    e.preventDefault();

    $('body').removeClass('mailcontent-show');
  });

})
