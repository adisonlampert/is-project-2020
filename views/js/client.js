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

fetch("/getPending", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
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
        description: row.description,
        link: row.link,
        visible: row.visibility
      });
    });
  });
