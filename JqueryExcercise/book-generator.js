function createBook(selector, strTitle, strAuthor, numIsbn) {
    let id = (function (counter) {
        return function () {
            return ++counter;
        }
    })(0);

    let div = $("<div>");
    let title = $(`<p class="title">${strTitle}</p>`);
    let author = $(`<p class="author">${strAuthor}</p>`);
    let isbn = $(`<p class='isbn'>${numIsbn}</p>`);

    let selectBtn = $("<button>Select</button>");
    selectBtn.on("click",showBorder);

    let deselectBtn = $("<button>Deselect</button>");
    deselectBtn.on("click", hideBorder);

    div
        .attr(`id`, `book${id()}`)
        .append(title)
        .append(author)
        .append(isbn)
        .append(selectBtn)
        .append(deselectBtn)
        .appendTo($(selector));

    function showBorder() {
        $(this).parent().css("border", "2px solid blue");
    }
    function hideBorder() {
        $(this).parent().css("border", "");
    }
}