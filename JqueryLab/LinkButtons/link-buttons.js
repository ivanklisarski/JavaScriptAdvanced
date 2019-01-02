function attachEvents() {
        $('a.button').on('click',buttonClicked);

    function buttonClicked() {
            $('a.selected').removeClass('selected');
            $(this).addClass('selected');
    }

}
