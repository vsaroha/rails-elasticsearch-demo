

import Vue from 'vue/dist/vue.esm'
//import App from '../app.vue'
import { Bar, mixins } from 'vue-chartjs'
import axios from 'axios';



Vue.component('line-chart', {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  watch: {
    chartData: function(){
      return this.chartData
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})


document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#chart',
    data: {
      urls: [
            "http://www.smh.com.au/nsw/premier-gladys-berejiklian-announces-housing-affordability-reforms-20170601-gwi0jn.html",
            "http://www.smh.com.au/sport/tennis/an-open-letter-from-martina-navratilova-to-margaret-court-arena-20170601-gwhuyx.html",
            "http://www.news.com.au/technology/environment/trump-pulls-us-out-of-paris-climate-agreement/news-story/f5c30a07c595a10a81d67611d0515a0a",
            "http://www.news.com.au/travel/travel-updates/incidents/disruptive-passenger-grounds-flight-after-storming-cockpit/news-story/5949c1e9542df41fb89e6cdcdc16b615"
          ],
      after: "2017-06-01",
      before: "2017-06-02",
      interval: "1h",
      chartData: {
        labels: ["2017-06-01 00:00", "2017-06-01 01:00", "2017-06-01 02:00", "2017-06-01 03:00", "2017-06-01 04:00", "2017-06-01 05:00", "2017-06-01 06:00", "2017-06-01 07:00", "2017-06-01 08:00", "2017-06-01 09:00", "2017-06-01 10:00", "2017-06-01 11:00", "2017-06-01 12:00", "2017-06-01 13:00", "2017-06-01 14:00", "2017-06-01 15:00", "2017-06-01 16:00", "2017-06-01 17:00", "2017-06-01 18:00", "2017-06-01 19:00", "2017-06-01 20:00", "2017-06-01 21:00", "2017-06-01 22:00", "2017-06-01 23:00" ],
        datasets: [ { "label": "http://www.smh.com.au/nsw/premier-gladys-berejiklian-announces-housing-affordability-reforms-20170601-gwi0jn.html", "data": [ 0, 0, 0, 10825, 24544, 19141, 14575, 10950, 8795, 6624, 5418, 4864, 3618, 2098, 792, 396, 285, 253, 314, 635, 1279, 1657, 1817, 1558 ], "backgroundColor": "#d82d6e" }, { "label": "http://www.smh.com.au/sport/tennis/an-open-letter-from-martina-navratilova-to-margaret-court-arena-20170601-gwhuyx.html", "data": [ 0, 276, 20222, 21310, 16352, 14105, 11331, 10436, 9608, 8690, 8271, 8342, 6777, 6387, 4556, 3378, 2937, 3887, 2774, 3049, 3781, 4565, 3872, 3467 ], "backgroundColor": "#219c7e" }, { "label": "http://www.news.com.au/technology/environment/trump-pulls-us-out-of-paris-climate-agreement/news-story/f5c30a07c595a10a81d67611d0515a0a", "data": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1976, 18467, 37242, 31159, 22888 ], "backgroundColor": "#25A1F3" }, { "label": "http://www.news.com.au/travel/travel-updates/incidents/disruptive-passenger-grounds-flight-after-storming-cockpit/news-story/5949c1e9542df41fb89e6cdcdc16b615", "data": [ 17576, 15365, 24230, 31504, 9552, 5397, 2541, 5565, 5451, 3329, 3576, 3848, 2859, 1708, 921, 682, 544, 432, 477, 733, 1303, 2212, 1716, 1159 ], "backgroundColor": "#FF5733" } ]
      },
      options: {
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
      },
      response_data: {},
      message: "This is a Histogram of page_views",
    },
    methods: {
      fetchData: function (event) {
        axios.get(`https://streemvue.herokuapp.com/page_views`,
        //axios.get(`http://localhost:3002/page_views`,
          {
            params: {
              urls: this.urls,
              after: this.after,
              before: this.before,
              interval: this.interval,
              formatted: "true"
            }
        })
        .then(response => {
          var resp = JSON.parse(response.data);
          this.response_data = resp;
          this.chartData= {labels: resp.labels, datasets: resp.datasets};
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  })
})
