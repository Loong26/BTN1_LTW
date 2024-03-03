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




// convert to pdf
(function () {
  var form = $(".form"),
    cache_width = form.width(),
    a4 = [841.89, 595.28]; // for a4 size paper width and height

  $("#create_pdf").on("click", function () {
    $("body").scrollTop(0);
    createPDF();
  });

  // Create PDF
  function createPDF() {
    getCanvas().then(function (canvas) {
      var img = canvas.toDataURL("image/png"),
        doc = new jsPDF({
          orientation: 'landscape', // Change to landscape mode
          unit: "px",
          format: "a4",
        });
      doc.addImage(img, "JPEG", 20, 20);
      doc.save("Thong ke.pdf");
      form.width(cache_width);
    });
  }

  // Create canvas object
  function getCanvas() {
    form.width(a4[0]+180).css("max-width", "none"); // Adjust canvas width for landscape mode
    return html2canvas(form, {
      imageTimeout: 2000,
      removeContainer: true,
    });
  }
})();

(function ($) {
  $.fn.html2canvas = function (options) {
    var date = new Date(),
      $message = null,
      timeoutTimer = false,
      timer = date.getTime();
    html2canvas.logging = options && options.logging;
    html2canvas.Preload(
      this[0],
      $.extend(
        {
          complete: function (images) {
            var queue = html2canvas.Parse(this[0], images, options),
              $canvas = $(html2canvas.Renderer(queue, options)),
              finishTime = new Date();

            $canvas
              .css({ position: "absolute", left: 0, top: 0 })
              .appendTo(document.body);
            $canvas.siblings().toggle();

            $(window).click(function () {
              if (!$canvas.is(":visible")) {
                $canvas.toggle().siblings().toggle();
                throwMessage("Canvas Render visible");
              } else {
                $canvas.siblings().toggle();
                $canvas.toggle();
                throwMessage("Canvas Render hidden");
              }
            });
            throwMessage(
              "Screenshot created in " +
                (finishTime.getTime() - timer) / 1000 +
                " seconds<br />",
              4000
            );
          },
        },
        options
      )
    );

    function throwMessage(msg, duration) {
      window.clearTimeout(timeoutTimer);
      timeoutTimer = window.setTimeout(function () {
        $message.fadeOut(function () {
          $message.remove();
        });
      }, duration || 2000);
      if ($message) $message.remove();
      $message = $("<div ></div>")
        .html(msg)
        .css({
          margin: 0,
          padding: 10,
          background: "#000",
          opacity: 0.7,
          position: "fixed",
          top: 10,
          right: 10,
          fontFamily: "Tahoma",
          color: "#fff",
          fontSize: 12,
          borderRadius: 12,
          width: "auto",
          height: "auto",
          textAlign: "center",
          textDecoration: "none",
        })
        .hide()
        .fadeIn()
        .appendTo("body");
    }
  };
})(jQuery);
// end convert to pdf