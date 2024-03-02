// option select
const selectElement = document.querySelector('select[sort-select="sort-select"]');
if(selectElement) {
  selectElement.addEventListener("change", () => {
    const option = selectElement.value;

    const buttonExam = document.querySelector("#button-exam");
    const timeCheck = document.querySelector("#time-check");

    if(option == "all") {
      buttonExam.classList.add("time-hidden");
      timeCheck.classList.add("time-hidden");
    } else if(option == "exam") {
      buttonExam.classList.remove("time-hidden");
      timeCheck.classList.add("time-hidden");

      const arrButtonExam = buttonExam.querySelectorAll(`[button-option-exam]`);
      arrButtonExam.forEach((button) => {
        button.addEventListener("click", () => {
          if (!button.classList.contains("active")) {
            arrButtonExam.forEach(item => {
              item.classList.remove("active");
            });

            button.classList.add("active");
          }
        });
      });
    } else {
      buttonExam.classList.add("time-hidden");
      timeCheck.classList.remove("time-hidden");
    }
  });
}
// end option select

// bar chart
const data = {
  labels: ["0-10", "11-20", "21-30", "31-40", "41-50"],
  datasets: [
    {
      label: "Phân phối điểm số",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "#CC0D00",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ctx = document.getElementById("histogram-chart").getContext("2d");
const histogramChart = new Chart(ctx, {
  type: "bar",
  data: data,
  options: options,
});

// end bar chart