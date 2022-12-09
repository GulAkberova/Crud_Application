let company = document.getElementById("company");
let contact = document.getElementById("contact");
let contactTitle = document.getElementById("contactTitle");
let filterBtn = document.getElementById("filterBtn");
let body_div = document.getElementById("body_div");
let url = "https://northwind.vercel.app/api/suppliers";
let check = false;
let updateId;

function gonder() {
  let info = {
    companyName: company.value,
    contactName: contact.value,
    contactTitle: contactTitle.value,
  };
  if (check) {
    function updateProduct(id) {
      axios
        .put(`${url}/${updateId}`, {
          companyName: company.value,
          contactName: contact.value,
          contactTitle: contactTitle.value,
        })
        .then(() => {
          add_p();
        });
    }
    check = false;
  } else {
    axios.post(url, info).then((res) => {
      add_p();
    });
    check = false;
  }
}
gonder();

function add_p() {
  axios.get(url).then((response) => {
    response.data.forEach((element) => {
      let trElement = document.createElement("tr");

      let tdId = document.createElement("td");
      tdId.innerHTML = element.id;

      let tdCompany = document.createElement("td");
      tdCompany.innerHTML = element.companyName;

      let tdContact = document.createElement("td");
      tdContact.innerHTML = element.contactName;

      let tdContactTitle = document.createElement("td");
      tdContactTitle.innerHTML = element.contactTitle;

      let upTd = document.createElement("td");
      let updateBtn = document.createElement("button");
      updateBtn.id = element.id;
      updateBtn.innerHTML = "Update";
      upTd.appendChild(updateBtn);
      updateBtn.addEventListener("click", function (e) {
        updateId = e.target.id;
        let selectedRow = e.target.parentElement.parentElement;
        company.value = selectedRow.children[1].textContent;
        contact.value = selectedRow.children[2].textContent;
        contactTitle.value = selectedRow.children[3].textContent;
        check = true;

        console.log(updateId);
      });

      let deleteTd = document.createElement("td");
      let deleteBtn = document.createElement("button");
      deleteBtn.id = element.id;
      deleteBtn.innerHTML = "Delete";
      deleteTd.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function (e) {
        let deleteId = e.target.id;
        e.target.parentElement.parentElement.remove();

        removeProduct(deleteId);
      });

      trElement.appendChild(tdId);
      trElement.appendChild(tdCompany);
      trElement.appendChild(tdContact);
      trElement.appendChild(tdContactTitle);
      trElement.appendChild(deleteTd);
      trElement.appendChild(upTd);

      body_div.append(trElement);
      company.value = "";
      contact.value = "";
      contactTitle.value = "";

      // filterBtn.addEventListener('click',()=>{

      //   console.log('sefsef')

      // })
    });
    function removeProduct(id) {
      axios
        .delete(`https://northwind.vercel.app/api/suppliers/${id}`)
        .then((ress) => {
          console.log(ress.status);
        });
    }
  });
}
