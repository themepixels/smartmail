$(function(){
  'use strict'

  new PerfectScrollbar('#mailGroup', {
    suppressScrollX: true
  });

  const mc = new PerfectScrollbar('#mailContent', {
    suppressScrollX: true
  });

  $('.sidebar .nav-link').on('click', function(e){
    e.preventDefault();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    $(this).closest('.nav').siblings('.nav').find('.nav-link').removeClass('active');
  });

  $('.mailbox-menu').on('click', function(e){
    e.preventDefault();
    $('body').toggleClass('sidebar-toggle');
    mc.update();
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
  });

  $('.mail-item').on('click', function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    $(this).removeClass('unread');

    $('.mailcontent-placeholder').siblings().removeClass('d-none');
    $(',mailcontent-placeholder').addClass('d-none');
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

})
