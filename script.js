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

let repxvals
let repmvals

let plotpoints = []

function generatePlotPoints() {
  // Get input elements

  // Get values from input fields
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


  plotpoints = []

  for (let i = 0; i < xvaluesArray.length; i++) {
    for (let j = 0; j < mvaluesArray.length; j++) {
      plotpoints.push(
        interceptValue + xcoeffValue*xvaluesArray[i] + mcoeffValue*mvaluesArray[j] +
        intcoeffValue*xvaluesArray[i]*mvaluesArray[j]
      )
    }
  }


  repxvals = repeatArrayElements(xvaluesArray, mvaluesArray.length);
  repmvals = Array.from({ length: xvaluesArray.length }, () => mvaluesArray).flat()

  console.log('x vals:', repxvals)
  console.log('m vals:', repmvals)
  console.log('plotpoints:', plotpoints)

}

function repeatArrayElements(arr, repeatCount) {
  let repeatedArray = []
  arr.forEach(element => {
    for (let i = 0; i < repeatCount; i++) {
      repeatedArray.push(element)
    }
  })
  return repeatedArray
}


// Evaluate when page loads
document.addEventListener('DOMContentLoaded', generatePlotPoints)

// Track any changes in input
interceptInput.addEventListener('input', generatePlotPoints)
xcoeffInput.addEventListener('input', generatePlotPoints)
mcoeffInput.addEventListener('input', generatePlotPoints)
intcoeffInput.addEventListener('input', generatePlotPoints)
xvaluesInput.addEventListener('input', generatePlotPoints)
mvaluesInput.addEventListener('input', generatePlotPoints)


const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    labels: repxvals,
    datasets: [{
      data: plotpoints,
    }],
  },
  options: {
    devicePixelRatio: 4, // fixes blurry-on-firefox issue
    responsive: false,
  },
})

function updateChart() {
  myChart.data.datasets[0].data = plotpoints
  myChart.data.labels = repxvals
  myChart.update()
}

document.addEventListener('DOMContentLoaded', updateChart)
interceptInput.addEventListener('input', updateChart)
xcoeffInput.addEventListener('input', updateChart)
mcoeffInput.addEventListener('input', updateChart)
intcoeffInput.addEventListener('input', updateChart)
xvaluesInput.addEventListener('input', updateChart)
mvaluesInput.addEventListener('input', updateChart)
