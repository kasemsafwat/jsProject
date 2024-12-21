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
      <div class="seccontainer">
        <div class="sec">
          <lable> 1 : Edit categorys displayed in shop page </lable>
          <input type="text" name="add" placeholder="category name" />
          <input type="text" name="add" placeholder="categorys title" />
          <input type="text" name="add" placeholder="categorys description" />
          <button>Add category</button>
          <select>
            <option value="Living">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining Room</option>
            <option value="HomeOffice">Home Office</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Kids">Kids</option>
            <option value="Chair">Chair</option>
          </select>
          <button>remove category</button>
        </div>
        <div class="sec">
          <label>2 : Edit products displayed in shop page</label>
          <input type="text" name="add" placeholder="product name" required />
          <input type="text" name="add" placeholder="product price" required />
          <input
            type="text"
            name="add"
            placeholder="product description"
            required
          />
          <input
            type="file"
            name="add"
            placeholder="product description"
            required
          />
          <button>add product</button>
          <select>
            <option value="Living">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining Room</option>
            <option value="HomeOffice">Home Office</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Kids">Kids</option>
            <option value="Chair">Chair</option>
          </select>
          <button>remove product</button>
        </div>
      </div>
      `;
      break;
    case "order":
      contentHtml = `
      <h1>fuck you </h1>
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
        <h1>asd asd asd s</h1>
        
      `;
      break;
  }

  content.innerHTML = contentHtml;
}
