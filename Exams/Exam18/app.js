function acceptance() {
    let company = $('input[name="shippingCompany"]').val();
    let productName = $('input[name="productName"]').val();
    let quantity = $('input[name="productQuantity"]').val();
    let scrape = $('input[name="productScrape"]').val();

    let availableProduct = +quantity - +scrape;

    if (company !== "" && productName !== "" && quantity !== "" && scrape !== "" && quantity > scrape && quantity > 0) {
        let div = $('<div>');
        let p = $('<p>');
        let outOfStock = $("<button>Out of stock</button>");
        outOfStock.on("click", removeContent);


        p.text(`[${company}] ${productName} - ${availableProduct} pieces`);
        div.append(p);
        div.append(outOfStock);
        $('#warehouse').append(div);

        $('input[name=shippingCompany]').val('');
        $('input[name=productName]').val('');
        $('input[name=productQuantity]').val('');
        $('input[name=productScrape]').val('');
    }

    function removeContent() {
        $(this).parent().remove();

    }
}