export default class SpiderGraph {
  constructor() {
    this.metaData = {
      labels: [],
      datasets: [
        {
          label: "Evaluación actual",
          backgroundColor: "rgba(255, 24, 0, 0.2)",
          borderColor: "rgba(255, 99, 132)",
          pointBackgroundColor: "rgba(255, 99, 132, 0.2)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 0.2)",
          data: [],
        },
        {
          label: "Evaluación anterior",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [],
        },
      ],
    };
    this.layout_props = {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 3,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Puntuación para cada práctica",
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    };
  }

  // Método para cambiar el color de las líneas de la 'Evaluación actual'
  changeActualEvaluationLineColor(newColor) {
    this.metaData.datasets[0].borderColor = newColor;
  }

  // Método para cambiar el color de las líneas de la 'Evaluación anterior'
  changePreviousEvaluationLineColor(newColor) {
    this.metaData.datasets[1].borderColor = newColor;
  }

  set_title_text(text) {
    this.layout_props.plugins.text += text;
  }
  reset_data() {
    this.metaData.datasets.data = [];
  }
}
