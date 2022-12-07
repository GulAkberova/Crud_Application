let company = document.getElementById("company");
let contact = document.getElementById("contact");
let contactTitle = document.getElementById("contactTitle");
let filterBtn = document.getElementById("filterBtn");
let body_div = document.getElementById("body_div");
let url = "https://northwind.vercel.app/api/suppliers";
function gonder() {
  let info = {
    companyName: company.value,
    contactName: contact.value,
    contactTitle: contactTitle.value,
  };
  axios.post(url, info).then((res) => {
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
          let updateId = e.target.id;
          let selectedRow=e.target.parentElement.parentElement
           company.value=selectedRow.children[1].textContent
           contact.value=selectedRow.children[2].textContent
           contactTitle.value=selectedRow.children[3].textContent
           console.log(selectedRow.children[1])

          
          updateProduct(updateId);
        });

        let deleteTd = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.id = element.id;
        deleteBtn.innerHTML = "Delete";
        deleteTd.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function (e) {
          let deleteId = e.target.id;
          e.target.parentElement.parentElement.remove()

          removeProduct(deleteId);
        });

        trElement.appendChild(tdId);
        trElement.appendChild(tdCompany);
        trElement.appendChild(tdContact);
        trElement.appendChild(tdContactTitle);
        trElement.appendChild(deleteTd);
        trElement.appendChild(upTd);

        body_div.append(trElement);
        company.value=""
        contact.value=""
        contactTitle.value=""

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

      function updateProduct(id) {
        console.log('scs');
        fetch(`https://northwind.vercel.app/api/suppliers/${info.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Data ", res.data);
          
            
          });
      }
    });
  });
}
gonder();