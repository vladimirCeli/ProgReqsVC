export default class SpiderGraph {
  constructor() {
    this.metaData = {
      labels: [],
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

  set_title_text(text) {
    this.layout_props.plugins.text += text;
  }
  reset_data() {
    this.metaData.datasets.data = [];
  }
}
