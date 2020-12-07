var oppsList = [];
var pendingList = [];

function getOpps() {
  var oppsList = [];
  fetch("/getOpps", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        oppsList.push({
          name: html_unescape(row.name),
          category: row.category,
          type: row.type,
          country: html_unescape(row.country),
          state: html_unescape(row.state),
          city: html_unescape(row.city),
          startDate: row.startDate,
          endDate: row.endDate,
          deadline: row.deadline,
          cost: html_unescape(row.cost),
          currency: row.currency,
          description: html_unescape(row.description),
          link: html_unescape(row.link),
          id: row.id
        });
        localStorage.setItem("oppsList", JSON.stringify(oppsList));
      });
    });
}

function getPending() {
  var pendingList = [];
  fetch("/getPending", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        var date = "";
        var deadline = "";
        var currency = "";
        var location = "";
        var price = "";
        var currency = "";
        if(row.startDate == ""){
          date = "Ongoing";
        }
        else {
          date = `${row.startDate} - `;
        }
        if(row.deadline == ""){
          deadline = "None";
        }
        else {
          deadline = row.deadline;
        }
        if(row.country == "" && row.state == "" && row.state == ""){
          country = "Virtual";
        }
        else {
          country = row.country;
        }
        if(row.cost == ""){
          price = "Free";
          currency = "";
        }
        else {
          price = row.cost;
          currency = row.currency;
        }
        pendingList.push({
          name: html_unescape(row.name),
          category: row.category,
          type: row.type,
          country: html_unescape(country),
          state: html_unescape(row.state),
          city: html_unescape(row.city),
          startDate: date,
          endDate: row.endDate,
          deadline: deadline,
          cost: html_unescape(price),
          currency: currency,
          description: html_unescape(row.description),
          link: html_unescape(row.link),
          id: row.id
        });
        localStorage.setItem("pendingList", JSON.stringify(pendingList));
      });
    });
}

function html_unescape(s) {
  var div = document.createElement("div");
  div.innerHTML = s;
  return div.textContent || div.innerText; // IE is different
}

getOpps();
getPending();
