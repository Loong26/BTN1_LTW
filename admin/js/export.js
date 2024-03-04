const exportToPDF = (pdf) => {
  const element = document.getElementById(`${pdf}`);
  // console.log(element);
  const options = {
    margin: 0,
    filename: "exported-document.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf(element, options);
}

const buttonPdf = document.querySelector("#create-pdf");
if(buttonPdf) {
  buttonPdf.addEventListener("click", () => {
    exportToPDF("form-pdf");
  });
}