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
      borderColor: 'rgb(75, 192, 192)',
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
