import Vue from 'vue'

Vue.component('line-chart', {
  extends: VueChartJs.Bar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        },
        {
          label: 'Data Two',
          backgroundColor: '#3D5B96',
          data: [40, 39, 10, 40, 39, 80, 40]
        },
         {
          label: 'Data Three',
          backgroundColor: '#1EFFFF',
          data: [20, 10, 12, 33, 22, 4, 0]
        }
      ]
    }, {
      responsive: true, 
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true,
          categoryPercentage: 0.5,
          barPercentage: 1
        }],
        yAxes: [{
          stacked: true
        }]
      }
    })
  }
  
})

var vm = new Vue({
  el: '.app',
  data: {
    message: 'Hello World'
  }
})