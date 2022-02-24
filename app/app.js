import Charts from './components/charts.js'

const App = () => {   
    const url = 'https://rcslabs.ru/ttrp1.json' //change figure 1 to any other from 1 to 5
    const container = document.querySelector('.container') 
    const data = fetch(url, {
        method: 'GET',
    })
    
    data.then(response => response.json()).then(result => {
        const charts = new Charts(container, result, 200)
        charts.render()
        charts.showProgress()
    }) 
}

export default App
