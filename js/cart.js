let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = ""; //Clear previous items

  let totalPrice = 0;
  //Fetch each product details and add them to the cart
  Promise.all(
    cart.map((id) =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json())
    )
  ).then((products) => {
    products.forEach((product) => {
      //add your code here to display items in cart
      totalPrice += product.price; // Update total price
    });
    document.getElementById("total-price").textContent = totalPrice.toFixed(2); //toFixed(2) for 2 decimal places
  });
}

updateCart(); //Initial Display
