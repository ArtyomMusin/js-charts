import Chart from './chart.js'
import VisualProgress from './visualProgress.js'
import createEl from '../utils/createEl.js'

class Charts {
    constructor(box){
        this.translatedTests = ['Клиентская часть', 'Серверная часть', 'База данных']
        this.colors = ['#00B7EA', '#BD6FB0', '#FF539C']
        this.container = box
        this.width = 65
        this.chartsBox = createEl('div', 'charts-box')
    }

    render(data){
        const title = createEl('h1', 'title')
        title.textContent = `Количество пройденных тестов "${data.title}"`
        
        const colorsMeans = createEl('div', 'colors-mean')
        const colorsMeansList = createEl('ul', 'colors-mean__list')

        Object.keys(data).forEach(item => {        
            if(typeof data[item] === "object"){
                new Chart(this.chartsBox, item, this.colors, '#fff', this.width).render(data[item])
            }
            if(item === 'norm'){
                new Chart(this.chartsBox, 'норматив', this.colors, '#fff', this.width).renderStandart(data[item], this.colors[0])
            }        
        })        

        Object.keys(data.test).map((item, i) => {
            const li = createEl('li', [`colors-mean__item`, item])
            li.style.color = this.colors[i]

            const span = createEl('span', 'colors-mean__text')
            span.textContent = this.translatedTests[i]

            li.insertAdjacentElement('beforeend', span)
            colorsMeansList.insertAdjacentElement('beforeend', li)
        })

        colorsMeans.insertAdjacentElement('beforeend', colorsMeansList)
        this.container.insertAdjacentElement('beforeend', title)
        this.container.insertAdjacentElement('beforeend', this.chartsBox)
        this.container.insertAdjacentElement('beforeend', colorsMeansList)       
    }
    
    showProgress(data){
        const allCharts = [...this.container.querySelectorAll('.chart')]
        const charts = allCharts.filter(item => item.dataset.name !== 'standart')
        if(charts.length < 2) return
        createEl('div', 'wrapper-progress')
        const arrCharts = charts.map(item => item.dataset.name)
        const segments = arrCharts.map((item, i) => i < arrCharts.length-1 && `${item}-${arrCharts[i+1]}`).filter(item => item)
        const highestChartY = Math.min.apply(null, charts.map(item => item.offsetTop))
        const boxY = highestChartY - 45
        const valueBetween = 7
        const boxTopPadding = 15
        console.log()
        const points = segments.reduce((obj, item, i) => {
            if(Object.keys(obj)){
                obj[item] = {
                    x1: i === 0 ? charts[i].offsetLeft + charts[i].offsetWidth / 2 : charts[i].offsetLeft + charts[i].offsetWidth / 2 + valueBetween,
                    x2: i < charts.length-2 ? charts[i+1].offsetLeft + charts[i+1].offsetWidth / 2 - valueBetween : charts[i+1].offsetLeft + charts[i+1].offsetWidth / 2,
                    x1point: i === 0 ? charts[i].offsetWidth / 2 : charts[i].offsetWidth / 2 + valueBetween,
                    y1point: charts[i].offsetTop - boxY,
                    height1: charts[i].offsetTop - boxY - boxTopPadding,
                    height2: charts[i+1].offsetTop - boxY - boxTopPadding,
                    boxX: charts[i].offsetLeft,
                    boxY: boxY,
                    wrapperWidth: charts[i+1].offsetLeft + charts[i+1].offsetWidth - charts[i].offsetLeft, 
                    wrapperHeight: Math.max(charts[i].offsetTop, charts[i+1].offsetTop) - boxY,
                    progress: this.#getTotal(data, charts[i+1].dataset.name) - this.#getTotal(data, charts[i].dataset.name),
                    wrapperTopPadding: boxTopPadding,
                    chartWidth: charts[i].offsetWidth,
                    serial: i,
                    valueBetween: valueBetween
                }
                return obj
            }            
        }, {})

        Object.keys(points).map(item => new VisualProgress(this.chartsBox, points[item]).render())
        this.#getScale()
    }

    #getTotal(obj, item){
        return Object.values(obj[item]).reduce((sum, value) => sum += value, 0)
    }
    #getScale(){ 
        let scale = 1             
        window.addEventListener(`resize`, event => {           
            if (window.innerWidth < this.chartsBox.offsetWidth * scale && window.innerWidth >= 300) {
                scale = scale > 0.3 ? scale - 0.1 : scale
            } 
            if (window.innerWidth > this.chartsBox.offsetWidth * (scale + 0.1) ) {
                scale = scale < 1 ? scale + 0.1 : scale             
            }
            this.chartsBox.style.transform = `scale(${scale})`
        }, false);
    }
}
 
export default Charts
