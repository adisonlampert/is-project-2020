var pending = JSON.parse(localStorage.getItem("pendingList"));
var approved = JSON.parse(localStorage.getItem("oppsList"));

function deletePending(num) {
  var id = pending[num].id;
  fetch(`/deletePending/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  window.location.href = window.location.href;
  event.stopPropagation();
}

function deleteOpportunities(num) {
  var id = approved[num].id;
  fetch(`/deleteOpportunities/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  window.location.href = window.location.href;
  event.stopPropagation();
}

$("#update").on('click', function() {

  var createChange = {
		name: $("#name").val(),
		category: $("#category").val(),
		type: $("#type").val(),
		country: $("#country").val(),
		state: $("#state").val(),
		city: $("#city").val(),
		startDate: $("#startDate").val(),
		endDate: $("#endDate").val(),
		deadline: $("#deadline").val(),
		cost: $("#cost").val(),
		currency: $("#currency").val(),
		description: $("#description").val(),
		link: $("#link").val(),
    id: $("#id").val(),
		visibility: $("#visibility").val(),
	}

  fetch("/updatePending", {
    method: 'POST',
    body: JSON.stringify(createChange),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  getOpps();
  getPending();
});

$("#move").on('click', function() {

  var createChange = {
		name: $("#name").val(),
		category: $("#category").val(),
		type: $("#type").val(),
		country: $("#country").val(),
		state: $("#state").val(),
		city: $("#city").val(),
		startDate: $("#startDate").val(),
		endDate: $("#endDate").val(),
		deadline: $("#deadline").val(),
		cost: $("#cost").val(),
		currency: $("#currency").val(),
		description: $("#description").val(),
		link: $("#link").val(),
    id: $("#id").val(),
		visibility: $("#visibility").val(),
	}

  fetch("/movePending", {
    method: 'POST',
    body: JSON.stringify(createChange),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  window.location.href = window.location.href;
  event.stopPropagation();
});

$('#editModal').on('hidden.bs.modal', function () {
 window.location.href = "/";
 window.location.href = "/admin";
})
