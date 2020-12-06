var oppsList = [];
var pendingList = [];

fetch("/getOpps", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      oppsList.push({
        name: row.name,
        category: row.category,
        type: row.type,
        country: country,
        state: row.state,
        city: row.city,
        startDate: date,
        endDate: row.endDate,
        deadline: deadline,
        cost: price,
        currency: currency,
        description: row.description,
        link: row.link,
        id: row.id
      });
      localStorage.setItem("oppsList", JSON.stringify(oppsList));
    });
  });

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
        name: row.name,
        category: row.category,
        type: row.type,
        country: row.country,
        state: row.state,
        city: row.city,
        startDate: row.startDate,
        endDate: row.endDate,
        deadline: row.deadline,
        cost: row.cost,
        currency: row.currency,
        description: row.description,
        link: row.link,
        id: row.id
      });
      localStorage.setItem("pendingList", JSON.stringify(pendingList));
    });
  });
