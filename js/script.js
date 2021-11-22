$(document).ready(function () {
    $('.header__burger').click(function (event){
        $('.tasks-list-section').addClass('active_menu')
    });
    $('.task-list__remove-btn').click(function (event){
        $('.tasks-list-section').removeClass('active_menu')
    });

});
