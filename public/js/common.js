function selectElement(){
    d
}

$(document).ready(function() {
    $('[id^=segment]').click(
        function(){
            $(this).css('background-color', '#573696').attr('checked');
            $(this).css('color', '#FFFFFF').attr('checked');
            $(this).find('a').css('color', '#FFFFFF').attr('checked');
            $(this).css('font-color', '#FFFFFF').attr('checked');
        });
});
