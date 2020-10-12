var oppsList = [];

fetch("/getOpps", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      oppsList.push({
        name: row.name,
        category: row.category,
        type: row.type,
        location: row.location,
        dateRange: row.dateRange,
        deadline: row.deadline,
        cost: row.cost,
        description: row.description,
        link: row.link,
        visible: true
      });
      localStorage.setItem("oppsList", JSON.stringify(oppsList));
    });
  });

function getValues() {
  console.log("Doing something");
  event.preventDefault();
  var name = $("#name-opportunity").val();

  var category = $("#category").select2('data')[0].text;
  var type = $("#type").select2('data')[0].text;

  var country = $("#country").val();
  var state = $("#state").val();
  var city = $("#city").val();

  var dateRange = $("input[name='date-range']:checked").val();
  if (dateRange != "Ongoing") {
    var startDate = `${$("#start-date").val()}`;
    var endDate = `${$("#end-date").val()}`;
  } else {
    var startDate = "";
    var endDate = "";
  }

  var deadline = $("input[name='deadline']:checked").val();
  if (deadline == "Yes") {
    deadline = $("#application-deadline").val();
  } else {
    deadline = "None";
  }
  var cost = $("input[name='cost']:checked").val();
  if (cost == "No") {
    cost = "None";
  } else {
    cost = `${$("#price").val()} ${$("#currency-type").select2('data')[0].text}`;
  }

  var description = $("#description").val();

  var link = $("#link").val();

  var opp_description = {
    name: name,
    category: category,
    type: type,
    country: country,
    state: state,
    city: city,
    startDate: startDate,
    endDate: endDate,
    deadline: deadline,
    cost: cost,
    description: description,
    link: link,
    visible: false
  };

  console.log(opp_description);
  $("#upload-formid")[0].reset();

}
//
//   fetch("/addOpps", {
//     method: "POST",
//     body: JSON.stringify(opp_description),
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(res => res.json())
//     .then(response => {
//       console.log(JSON.stringify(response));
//     });
//   // get dream value and add it to the list
//   oppsList.push(opp_description);
//   localStorage.setItem("oppsList", JSON.stringify(oppsList));
//
// };
