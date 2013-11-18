function Product(code, name, price, qty) {
    var self = this;
    self.productCode = ko.observable(code);
    self.productName = ko.observable(name);
    self.productPrice = ko.observable(price);
    self.productQty = ko.observable(qty);
}

function ProductViewModel() {

    var self = this;
    self.products = ko.observableArray([new Product('P1', 'LCD TV', 4000.00, 20), new Product("P2", 'Washing Machine', 3000.00, 30)]);
    self.currentProduct = ko.observable(new Product('', "", 0, 0));

    Sammy(function () {
        this.get('#:product/:productCode', function () {
            $("#divProductList").hide(2);
            $("#divEditProduct").show(2);
            self.getProduct(this.params.productCode);
        });
    }).run();

    self.editProduct = function (product) {
        location.hash = "product/" + product.productCode();
    };

    self.removeProduct = function (product) {
        self.products.remove(product);
    };

    self.getProduct = function(productCode) {
        for (var i = 0; i < self.products._latestValue.length; i++) {
            if (self.products._latestValue[i].productCode() == productCode) {
                self.currentProduct(self.products._latestValue[i]);
            }
        }
    };
}