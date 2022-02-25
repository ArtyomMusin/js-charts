import Charts from "../components/charts.js"

const requset = (container, link) => {   
    const url = link
    const data = fetch(url, {
        method: 'GET',
    })
    
    data.then(response => response.json()).then(result => {
        const charts = new Charts(container, result, 200)
        charts.render()
        charts.showProgress()
    })     
}

export default requset

