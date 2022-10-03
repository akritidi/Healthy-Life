// calCalc needed
const box = document.getElementById("show-result");
const resultp = document.createElement("p");
var foodcalInput = document.getElementById("foodcalories");
var foodquantityInput = document.getElementById("foodquantity");

const form = document.getElementById("forma");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    foodInput,
    foodcalInput,
    foodquantityInput,
    timezoneInput,
  } = getCaloriesFormData();

  fetch("/api/addCal", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      food: foodInput,
      foodsCal: foodcalInput,
      quantity: foodquantityInput,
      time: timezoneInput,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      var showhelpvariable = response.calories;
      resultp.textContent = `Your Calories for today are: ${showhelpvariable}`;
    });
});
flag3 = false;
// Adds up the total calories to the bottom of the page
function calCalc() {
  document.getElementById("show-result").style.visibility = "visible";
  box.appendChild(resultp);
}

//Adds the food with its information to the proper timezone-table

function getCaloriesFormData() {
  var foodInput = document.getElementById("food").value;
  var foodcalInput = document.getElementById("foodcalories").value;
  var foodquantityInput = parseFloat(
    document.getElementById("foodquantity").value
  );
  var timezoneInput = document.getElementById("timezones").value;

  return {
    foodInput,
    foodcalInput,
    foodquantityInput,
    timezoneInput,
  };
}

function putValuesInTable() {
  const {
    foodInput,
    foodcalInput,
    foodquantityInput,
    timezoneInput,
  } = getCaloriesFormData();

  var deleteButton = document.createElement("BUTTON");
  deleteButton.innerText = "x";
  deleteButton.style.color = "#fff";
  deleteButton.style.fontWeight = "400";
  deleteButton.style.width = "2em";
  deleteButton.style.fontFamily = "Arial, sans-serif";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.marginLeft = "33%";
  deleteButton.style.textAlign = "center";
  deleteButton.style.textDecoration = "none";
  deleteButton.style.borderRadius = "4px";
  deleteButton.style.border = "1px solid black";
  deleteButton.style.cursor = "pointer";

  var tableHelp = [
    foodInput,
    foodcalInput * foodquantityInput,
    foodquantityInput,
    timezoneInput,
    deleteButton.outerHTML,
  ];

  var table = document.getElementById("table");
  var i,
    row,
    cell,
    k,
    flag = false,
    flag2 = false;
  if (table.rows.length > 0) {
    for (i = 1, row; (row = table.rows[i]); i++) {
      var foodExists = row.cells[0].innerHTML;
      var zoneExists = row.cells[3].innerHTML;

      if (foodInput == foodExists) {
        var caloriesSame = row.cells[1].innerHTML / row.cells[2].innerHTML;
        if (caloriesSame != foodcalInput && flag3 == false) {
          if (
            confirm(
              "Your " +
                foodInput +
                " has " +
                caloriesSame +
                " calories so far. Press OK if you want to keep theese new calories. "
            )
          ) {
            flag2 = false;
            if (confirm("Don't show again. Ignore it the next time ")) {
              flag3 = true;
            }
          } else {
            flag2 = true;
          }
        }
      }
      if (
        foodInput == foodExists &&
        timezoneInput == zoneExists &&
        flag2 == false
      ) {
        flag = true;
        table.rows[i].cells[1].innerHTML =
          parseInt(table.rows[i].cells[1].innerHTML) +
          foodcalInput * foodquantityInput;
        table.rows[i].cells[2].innerHTML =
          parseInt(table.rows[i].cells[2].innerHTML) + foodquantityInput;
      }
    }
  }

  if (flag == false && flag2 == false) {
    row = table.insertRow();
    for (k of tableHelp) {
      cell = row.insertCell();
      cell.innerHTML = k;
      if (cell.innerText == "x") {
        cell.addEventListener("click", function () {
          deleteRow(this);
        });
      }
    }
    sortTable();
  }
}

function deleteRow(r) {
  var i = r.parentNode.rowIndex;
  foodDel = table.rows[i].cells[0].innerText;
  timeDel = table.rows[i].cells[3].innerText;
  fetch("/api/delCal", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      foodDel,
      timeDel,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      var showhelpvariable = response.calories;
      resultp.textContent = `Your Calories for today are: ${showhelpvariable}`;
      table.deleteRow(i);
    });
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  first = 0;
  second = 0;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      if (x.innerHTML == "Breakfast") {
        x = 1;
      }
      if (y.innerHTML == "Breakfast") {
        y = 1;
      }
      if (x.innerHTML == "Mid Morning Snack") {
        x = 2;
      }
      if (y.innerHTML == "Mid Morning Snack") {
        y = 2;
      }
      if (x.innerHTML == "Lunch") {
        x = 3;
      }
      if (y.innerHTML == "Lunch") {
        y = 3;
      }
      if (x.innerHTML == "Afternoon Snack") {
        x = 4;
      }
      if (y.innerHTML == "Afternoon Snack") {
        y = 4;
      }
      if (x.innerHTML == "Dinner") {
        x = 5;
      }
      if (y.innerHTML == "Dinner") {
        y = 5;
      }
      if (x > y) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function dualFunction() {
  calCalc();
  putValuesInTable();
}

//Submit Button Pressed
document.getElementById("calbtn").addEventListener("click", dualFunction);

var dt = new Date();
function renderDate() {
  dt.setDate(1);
  var day = dt.getDay();
  var today = new Date();
  var endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();

  var prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById("month").innerHTML = months[dt.getMonth()];
  document.getElementById("date_str").innerHTML = today.toDateString();
  var cells = "";
  for (x = day; x > 0; x--) {
    cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
  }
  for (i = 1; i <= endDate; i++) {
    if (i == today.getDate() && dt.getMonth() == today.getMonth()) {
      cells += "<div class='today'>" + i + "</div>";
    } else cells += "<div>" + i + "</div>";
  }
  document.getElementsByClassName("days")[0].innerHTML = cells;

  daysClick = [];
  for (i = 0; i <= endDate + day - 1; i++) {
    dayClick = document.getElementsByClassName("days")[0].children[i];
    daysClick.push(dayClick);
  }
  for (let j = 0; j <= daysClick.length - 1; j++) {
    daysClick[j].addEventListener("click", dayClicked(j));
  }
  function dayClicked(j) {
    return function () {
      document.querySelector("#selectedDayCal").style.visibility = "visible";
      let month = dt.getMonth() + 1;
      askedDate = JSON.stringify(
        daysClick[j].innerText + "/" + month + "/2020"
      );
      fetch("/api/takeDate", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          askedDate,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            document.querySelector("#selectedDayCal").innerHTML =
              "Calories at selected date : " + response.calories;
          } else {
            document.querySelector("#selectedDayCal").innerHTML =
              "Calories at selected date : " + response.message;
          }
        })
        .catch((error) => {
          res.json({
            message: "An error occured",
          });
        });
    };
  }
}

function moveDate(para) {
  if (para == "prev") {
    dt.setMonth(dt.getMonth() - 1);
  } else if (para == "next") {
    dt.setMonth(dt.getMonth() + 1);
  }
  renderDate();
}

function takeTable() {
  fetch("/api/giveTable", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      var retTable = response.table;
      var deleteButton = document.createElement("BUTTON");
      deleteButton.innerText = "x";
      deleteButton.style.color = "#fff";
      deleteButton.style.fontWeight = "400";
      deleteButton.style.width = "2em";
      deleteButton.style.fontFamily = "Arial, sans-serif";
      deleteButton.style.backgroundColor = "red";
      deleteButton.style.marginLeft = "33%";
      deleteButton.style.textAlign = "center";
      deleteButton.style.textDecoration = "none";
      deleteButton.style.borderRadius = "4px";
      deleteButton.style.border = "1px solid black";
      deleteButton.style.cursor = "pointer";
      var tableHelpDB = [];
      for (i of retTable) {
        if (i.calPerFood == 0) {
          continue;
        }
        tableHelpDB = [
          i.foods,
          i.calPerFood,
          i.quantity,
          i.timezone,
          deleteButton.outerHTML,
        ];
        rowDB = table.insertRow();
        for (k of tableHelpDB) {
          celldb = rowDB.insertCell();
          celldb.innerHTML = k;
          if (celldb.innerText == "x") {
            celldb.addEventListener("click", function () {
              deleteRow(this);
            });
          }
        }
      }
      sortTable();
    });
}

function loading() {
  if (!(document.cookie = "")) {
    let cookie = document.cookie;
    let fields = cookie.split("=");
    let name = fields[1];
    fetch("/api/show", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.response == null) {
          alert("You have to log in");
          setTimeout(function () {
            window.location.href = "/";
          }, 600);
        } else {
          renderDate();
          takeTable();
        }
      });
  } else {
    alert("You have to log in");
    setTimeout(function () {
      window.location.href = "/";
    }, 600);
  }
}
