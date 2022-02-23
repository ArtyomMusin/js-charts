import Chart from './chart.js'
import createEl from './createEl.js'

const Charts = (data) => {
    console.log(data)
    const translatedTests = ['Клиентская часть', 'Серверная часть', 'База данных']
    const colors = ['#00B7EA', '#BD6FB0', '#FF539C']
    const container = document.querySelector('.container')
    const title = createEl('h1', 'title')
    title.textContent = `Количество пройденных тестов "${data.title}"`

    const chartsBox = createEl('div', 'charts-box')
    Object.keys(data).forEach(item => {        
        if(typeof data[item] === "object"){
            new Chart().render(data[item])
        }
        if(item === 'norm'){
            new Chart().renderStandart(data[item])
        }        
    })
    const colorsMeans = createEl('div', 'colors-mean')
    const colorsMeansList = createEl('ul', 'colors-mean__list')

    Object.keys(data.test).map((item, i) => {
        const li = createEl('li', [`colors-mean__item`, item])
        li.style.color = colors[i]

        const span = createEl('span', 'colors-mean__text')
        span.textContent = translatedTests[i]

        li.insertAdjacentElement('beforeend', span)
        colorsMeansList.insertAdjacentElement('beforeend', li)
    })
    colorsMeans.insertAdjacentElement('beforeend', colorsMeansList)

    container.insertAdjacentElement('beforeend', title)
    container.insertAdjacentElement('beforeend', chartsBox)
    container.insertAdjacentElement('beforeend', colorsMeansList)
}
 
export default Charts
