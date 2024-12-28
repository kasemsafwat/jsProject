// Function to change content dynamically
function changeContent(section) {
  const content = document.getElementById("content");

  let contentHtml = "";
  switch (section) {
    case "home":
      contentHtml = `
        <h1> Edit Home Page : </h1>
        <br>
        <p> 1 : Edit offers displayed in home page </p>
        <button>Edit Offers</button>
      `;
      break;
    case "shop":
      contentHtml = `
       <h1>Edit shop Page :</h1>
      <br />
       <form id="shopForm">
  <div class="seccontainer">
  <div class="sec">
  
  <label><strong>1 : Edit products displayed in shop page</strong></label>
  <input type="text" name="title" placeholder="product name" required />
  <input type="text" name="price" placeholder="product price" required />
  <input type="text" name="desc" placeholder="product description" required />
  <label><strong>Upload Product Images:</strong></label><br/>
  <input 
    type="file" 
    name="images[]" 
    multiple 
    accept="image/*" 
    required
  />
  <!-- This is the color input, see next section. -->
  <label><strong>Colors (comma-separated):</strong></label>
<input
    type="text"
    name="colors"
    placeholder="e.g. red,blue,green"
    required
  />  

  <label><strong>Sizes:</strong></label><br/>
<div id="size" class="size-choices">
  <!-- Each checkbox is hidden, and each label acts like a chip -->
  
  <input type="checkbox" id="size-s" name="size[]" value="S" style="display:none;">
  <label for="size-s" class="size-chip">S</label>

  <input type="checkbox" id="size-m" name="size[]" value="M" style="display:none;">
  <label for="size-m" class="size-chip">M</label>

  <input type="checkbox" id="size-l" name="size[]" value="L" style="display:none;">
  <label for="size-l" class="size-chip">L</label>

  <input type="checkbox" id="size-xl" name="size[]" value="XL" style="display:none;">
  <label for="size-xl" class="size-chip">XL</label>

  <input type="checkbox" id="size-xxl" name="size[]" value="XXL" style="display:none;">
  <label for="size-xxl" class="size-chip">XXL</label>
</div>
 <!-- error message for sizes -->
<span id="size-error" class="error-message"></span>

  <label><strong>Stock:</strong></label>
  <input type="number" name="stock" min="1" placeholder="available stock" required />
  <label><strong>Applied Discount (0-100):</strong></label>
  <input
  type="number"
  name="appliedDiscount"
  min="0"
  max="100"
  placeholder="Discount %"
  />
  <p class="category-info">
  <strong>Note:</strong> Please choose the category where you'll add this product:</p>
  <select class="category-select" required>
  <option value="" disabled selected >-- Select a Category --</option >
  <option value="dresses">Dresses</option>
  <option value="t-shirts">T-shirts</option>
  <option value="sleevelss Shirt">Sleevless-Shirts</option>
  <option value="socks">Socks</option>
  <option value="vest">Vests</option>
  <option value="blouse">Blouses</option>
  </select>
  <button >Add product</button>
  <button>Remove product</button>
  <button type="reset">Reset All</button>
  </form>
  </div>
  </div>
  </div>
  <div class="sec">
  <form id="catForm">
  <lable> <strong>2 : Edit categorys displayed in shop page</strong> </lable>
  <input type="text" name="add" placeholder="category name"  required/>
  <input 
    type="file" 
    name="images[]" 
    multiple 
    accept="image/*" 
    required
  />
  <button type="submit">Add category</button>
<button>remove category</button>
<button type="reset">Reset All</button>
</form>
</div>
  `;
      break;
    case "order":
      contentHtml = `
    <h1>hello </h1>
    `;
      break;
    case "contact":
      contentHtml = `
      <h1>Contact</h1>
        <p>Get in touch with us. We'd love to hear from you!</p>
      `;
      break;
    default:
      contentHtml = `
        <h1>asd asd asd asd</h1>
      `;
      break;
  }

  content.innerHTML = contentHtml;
  // Attach the event listener for shopForm
  if (section === "shop") {
    const shopForm = document.getElementById("shopForm");
    shopForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      const formData = new FormData(this);

      // Log each key-value pair
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    });

    // Attach the event listener for catForm
    const catForm = document.getElementById("catForm");
    catForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      const formData = new FormData(this);

      // Log each key-value pair
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    });
  }
}
