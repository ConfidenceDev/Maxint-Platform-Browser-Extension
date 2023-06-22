const siginContainer = document.querySelector(".sigin_container");
const dashboardContainer = document.querySelector(".dashboard_container");
const emailField = document.querySelector(".email");
const signInBtn = document.querySelector(".signin_btn");
const ctx = document.querySelector("#line_chart");
const growthField = document.querySelector(".growth");
const yearOptions = document.querySelector(".year");
const signOutBtn = document.querySelector(".signout");

const demo_email = "admin";
const defaultColor = "white";
const gridColor = "rgb(255, 255, 255, 0.1)";

const loadDefault = {
  growth: [1, 0, 3, 2],
  peroid: [2020, 2021, 2022, 2023],
};

loadData(loadDefault);

emailField.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    signInBtn.click();
  }
});

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailField.value;
  if (email === "" || email === null) {
    alert("Enter your email address!");
    return;
  }

  if (email !== demo_email) {
    alert("Invalid email!");
    return;
  }

  dashboardContainer.style.display = "flex";
  siginContainer.style.display = "none";
  loadData(loadDefault);
  chrome.runtime.sendMessage({ tag: "back", email: email });
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.tag === "front") {
      loadData(obj.data);
    }
    response({ status: "ok" });
  });
});

selectElement.addEventListener("change", () => {
  const selectedValue = selectElement.value;
});

signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dashboardContainer.style.display = "none";
  siginContainer.style.display = "flex";
});

function loadData(obj) {
  const data = {
    labels: obj.peroid,
    datasets: [
      {
        data: obj.growth,
        borderColor: ["rgb(255, 99, 132)", "rgb(123, 114, 226)"],
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgb(123, 114, 226, 0.5)",
        tension: 0.1,
        hoverBorderColor: "red",
      },
    ],
  };

  new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          display: true,
          grid: {
            color: gridColor,
          },
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
          ticks: {
            color: defaultColor,
            font: {
              size: 12,
            },
            stepSize: 1,
            maxTicksLimit: 7,
            beginAtZero: true,
            callback: (label, index, labels) => {
              switch (label) {
                case 0:
                  return "$5k";
                case 1:
                  return "$25k";
                case 2:
                  return "$82k";
                case 3:
                  return "$110k";
              }
            },
          },
        },
        x: {
          ticks: {
            color: defaultColor,
            font: {
              size: 12,
            },
            stepSize: 1,
            beginAtZero: true,
          },
          grid: {
            color: gridColor,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "",
          color: defaultColor,
        },
        legend: {
          display: false,
          fontColor: defaultColor,
          labels: {
            color: defaultColor,
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}
