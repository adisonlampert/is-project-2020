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

var button = $(".upload-button");
button.on("click", getValues);

function getValues() {
  event.preventDefault();
  var name = $("#name-opportunity").val();

  var category = $(".name-cat").val();
  var type = $(".name-type").val();
  var location = $("#location").val();

  var dateRange = $("input[name='date-range']:checked").val();
  if (dateRange == "Intermittent") {
    dateRange = `${$("#start-date").val()} to ${$("#end-date").val()}`;
  } else {
    dateRange = "Ongoing";
  }

  var deadline = $("input[name='deadline']:checked").val();
  if (deadline == "Yes") {
    deadline = $("#application-deadline").val();
  } else {
    deadline = "None";
  }
  var cost = $("input[name='cost']:checked").val();
  if (cost == "Yes") {
    cost = $("#price").val();
  } else {
    cost = "None";
  }

  var description = $("#description").val();

  var link = $("#link").val();

  var opp_description = {
//     name: name,
//     category: category,
//     type: type,
//     location: location,
//     dateRange: dateRange,
//     deadline: deadline,
//     cost: cost,
//     description: description,
//     link: link,
//     visible: true
//   };
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
