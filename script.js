function unit_change_imperial() {
  document.getElementById("cm").textContent = "ft";
  document.getElementById("kgs").textContent = "lb";
  createNewElement();
}
function unit_change_metric() {
  removeNewElement();
  document.getElementById("cm").innerText = "cm";
  document.getElementById("kgs").innerText = "kg";
}
function createNewElement() {
  var d = document.createElement("div");
  d.innerHTML +=
    "<br /><input type='text' style='border: 2px solid pink' name='inches' id='height_in'/><span id='in'> in</span> ";
  document.getElementById("newElementId").appendChild(d);
  return;
}
function removeNewElement() {
  document.getElementById("newElementId").innerHTML = "";
  return;
}
function calculate_metric(ht, wt) {
  var ans = ~~(wt / (ht * ht));
  return ans;
}
function calculate_imperial(ht, wt) {
  var ans = (wt * 703) / (ht * ht);
  return ans;
}

function changeColor(n) {
  var x = document.getElementById("bmi_table").getElementsByTagName("td");
  x[n].style.backgroundColor = "red";
  x[n + 1].style.backgroundColor = "red";
  setTimeout(function () {
    x[n].style.backgroundColor = "#e6b3c4";
    x[n + 1].style.backgroundColor = "#e6b3c4";
  }, 2000);
}

function result_display() {
  var h = document.getElementById("bmi_form").elements["height"].value;
  var w = document.getElementById("bmi_form").elements["weight"].value;
  //alerts
  if ((w == "" || w == NaN) && (h == "" || h == NaN)) {
    alert("Please enter your height and weight.");
    return;
  } else if (w == "" || w == NaN) {
    alert("Please enter your weight.");
    return;
  } else if (h == "" || h == NaN) {
    alert("Please enter your height.");
    return;
  }
  //checking if input is in metric or imperial
  if (document.getElementById("bmi-metric").checked) {
    h = h * 0.01;
    var bm = calculate_metric(h, w);
  } else if (document.getElementById("bmi-imperial").checked) {
    var h_in = parseInt(document.querySelector('[name="inches"]').value);
    h = h * 12 + h_in;
    var bm = calculate_imperial(h, w);
  } else {
    alert("Please select a unit");
    return;
  }
  //for displaying the sentence
  var str = "2";
  var result = str.sup();
  var cell_to_color = -1;
  document.getElementById("result").innerHTML = " " + bm + " kg/m" + result;
  if (bm < 18.5) {
    cell_to_color = 0;
    document.getElementById("detail").innerHTML =
      "(Your weight belongs to the underweight category)";
  }
  if (bm > 18.5 && bm < 24.9) {
    cell_to_color = 2;
    document.getElementById("detail").innerHTML =
      "(Your weight lies in the normal range)";
  }
  if (bm > 25 && bm < 29.9) {
    cell_to_color = 4;
    document.getElementById("detail").innerHTML =
      "(Your weight belongs to the overweight category)";
  }
  if (bm > 30) {
    cell_to_color = 6;
    document.getElementById("detail").innerHTML =
      "(Your weight belongs to the obese category)";
  }
  changeColor(cell_to_color);
  return false;
}
