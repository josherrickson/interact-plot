const interceptInput = document.getElementById('intercept')
const xcoeffInput = document.getElementById('xcoeff')
const mcoeffInput = document.getElementById('mcoeff')
const intcoeffInput = document.getElementById('intcoeff')
const xvaluesInput = document.getElementById('xvalues')
const mvaluesInput = document.getElementById('mvalues')

let interceptValue
let xcoeffValue
let mcoeffValue
let intcoeffValue
let xvaluesArray
let mvaluesArray

function computePoints(intercept,
                       xvals,
                       mval,
                       xcoeff,
                       mcoeff,
                       intcoeff) {

  let plotpoints = []

  for (let i = 0; i < xvals.length; i++) {
    plotpoints.push(
      intercept + xcoeff*xvals[i] + mcoeff*mval + intcoeff*xvals[i]*mval
    )
  }

  return plotpoints
}

const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Empty labels array
    datasets: [] // Empty datasets array
  },
  options: {
    devicePixelRatio: 4, // fixes blurry-on-firefox issue
    responsive: false,
    legend: {
      position: 'right',
    },
  },
})

// Colors for plotting. If it goes beyond 20, it'll just be grey
const colors = [
    'rgba(255, 99, 132, 1)',     // Red
    'rgba(54, 162, 235, 1)',      // Blue
    'rgba(255, 206, 86, 1)',      // Yellow
    'rgba(75, 192, 192, 1)',      // Teal
    'rgba(153, 102, 255, 1)',     // Purple
    'rgba(255, 159, 64, 1)',      // Orange
    'rgba(51, 204, 51, 1)',       // Green
    'rgba(255, 0, 255, 1)',       // Magenta
    'rgba(0, 255, 255, 1)',       // Cyan
    'rgba(128, 128, 128, 1)',     // Gray
    'rgba(255, 128, 0, 1)',       // Dark Orange
    'rgba(0, 153, 0, 1)',         // Dark Green
    'rgba(204, 0, 204, 1)',       // Dark Magenta
    'rgba(0, 204, 204, 1)',       // Dark Cyan
    'rgba(102, 51, 0, 1)',        // Brown
    'rgba(255, 102, 102, 1)',     // Light Red
    'rgba(102, 153, 255, 1)',     // Light Blue
    'rgba(255, 204, 102, 1)',     // Light Orange
    'rgba(204, 255, 102, 1)',     // Light Green
    'rgba(255, 102, 255, 1)'      // Light Magenta
];

function updateChart() {
  interceptValue = parseFloat(interceptInput.value)
  xcoeffValue = parseFloat(xcoeffInput.value)
  mcoeffValue = parseFloat(mcoeffInput.value)
  intcoeffValue = parseFloat(intcoeffInput.value)
  xvaluesArray = xvaluesInput.value.split(',').map(function(item) {
    return parseFloat(item.trim())
  })
  mvaluesArray = mvaluesInput.value.split(',').map(function(item) {
    return parseFloat(item.trim())
  })

  myChart.data.datasets = []
  for (let i = 0; i < mvaluesArray.length; i++) {
    newDataset = {
      label: `Line ${mvaluesArray[i]}`,
      data: computePoints(interceptValue,
                          xvaluesArray,
                          mvaluesArray[i],
                          xcoeffValue,
                          mcoeffValue,
                          intcoeffValue),
      fill: false,
      borderColor: colors[i],
      tension: 0.1
    }
    console.log('Adding', mvaluesArray[i])
    myChart.data.datasets.push(newDataset);
  }

  myChart.data.labels = xvaluesArray
  myChart.update()
}

document.addEventListener('DOMContentLoaded', updateChart)
interceptInput.addEventListener('input', updateChart)
xcoeffInput.addEventListener('input', updateChart)
mcoeffInput.addEventListener('input', updateChart)
intcoeffInput.addEventListener('input', updateChart)
xvaluesInput.addEventListener('input', updateChart)
mvaluesInput.addEventListener('input', updateChart)
