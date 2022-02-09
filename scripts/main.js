 
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
 
function openInfo(evt, tabName) {
 
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
 
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
 
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
 
}
 
 
   
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos
 
function populateListProductChoices(slct1, slct2) {
    var s2 = document.getElementById(slct2);
    var l1 =document.querySelector('.vegetarian_checkbox').checked;
    var l2 = document.querySelector('.glutenfree_checkbox').checked;
    var l3 = document.querySelector('.organic_checkbox').checked;
    var l4 = document.querySelector('.none_checkbox').checked;
 
 
    res = [l1, l2, l3, l4]
    console.log(res)
   
    // s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
   
    // obtain a reduced list of products based on restrictions
    var optionArray  = restrictListProducts(products, res);
    // for each item in the array, create a checkbox element, each containing information such as:
    // <input type="checkbox" name="product" value="Bread">
    // <label for="Bread">Bread/label><br>
   
   
    var sortedArray = optionArray.sort((a, b) => (a.price > b.price) ? 1 : -1)
 
 
 
    for (i = 0; i < optionArray.length; i++) {
        var productName = sortedArray[i].name;
        var productPrice = sortedArray[i].price;
        var productCategory = sortedArray[i].category
        var productImage = sortedArray[i].image
 
        var div_product = document.createElement("div");
        var div_category = document.createElement("div");
        var div_image = document.createElement("div");
        var div_price = document.createElement("div");
        var div_checkbox = document.createElement("div");
        div_product.className = "product"
        div_category.className = "product-category"
        div_image.className = "product-image";
        div_price.className = "product-price"
        div_checkbox.className = "product-checkbox"
 
        // create the checkbox and add in HTML DOM
        var image = document.createElement("IMG");
        image.setAttribute("src", productImage)
        image.setAttribute("width", "100");
        image.setAttribute("height", "100");
 
        image.setAttribute("alt", "The Pulpit Rock");
        div_image.appendChild(image);
 
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "product";
        checkbox.value = productName;
        div_checkbox.appendChild(checkbox);
        var add = document.getElementById("p");
        var text = document.createTextNode("  Check to add");
        div_checkbox.appendChild(text);
       
       
        // create a label for the checkbox, and also add in HTML DOM
        var label = document.createElement('label')
        label.htmlFor = productName;
        var div_div_name = document.createTextNode(productName)
        var div_div_dot = document.createTextNode(" - $")
        var div_div_price = document.createTextNode(productPrice)
        var div_div_currrency = document.createTextNode("CAD")
 
        label.appendChild(div_div_name);
        label.appendChild(div_div_dot);
        label.appendChild(div_div_price);
        label.appendChild(div_div_currrency);
 
        div_price.appendChild(label);
 
        // create a label for the product category
        var category_label = document.createElement('label')
        label.htmlFor = productName;
        var div_cat_name = document.createTextNode(productCategory)
 
        category_label.appendChild(div_cat_name)
        div_category.appendChild(category_label)
 
       
        // create a breakline node and add in HTML DOM
        div_product.appendChild(div_category)
        div_product.appendChild(div_image)
        div_product.appendChild(div_price)
        div_product.appendChild(div_checkbox)
        s2.appendChild(div_product)
 
    }
}
   
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph)
// We build a paragraph to contain the list of selected items, and the total price
 
function selectedItems(){
   
    var ele = document.getElementsByName("product");
    var chosenProducts = [];
   
    var c = document.getElementById('displayCart');
    c.innerHTML = "";
   
    // build list of selected item
    var para = document.createElement("P");
    para.innerHTML = "You selected : ";
    para.appendChild(document.createElement("br"));
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            para.appendChild(document.createTextNode(ele[i].value));
            for(j=0;j<products.length;j++){
                if (products[j].name == ele[i].value){
                    var price = products[j].price;
                    para.appendChild(document.createTextNode(" ~ "+price));
                }
            }
            para.appendChild(document.createElement("br"));
            chosenProducts.push(ele[i].value);
        }
    }
       
    // add paragraph and total price
    c.appendChild(para);
    c.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts)));
       
}
 
 
