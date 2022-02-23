import createEl from '../utils/createEl.js'

class Chart {
    constructor(box, name, colors, textColor = '#fff', width, borderRadius = 10){
        this.box = box   
        this.name = name  
        this.fontSize = 10
        this.colors = colors
        this.textColor = textColor
        this.width = width
        this.borderRadius = borderRadius  
        this.box = box  
    }
    
    render(data){
        console.log(data)
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${data.front + data.back + data.db}px" class='chart__item'>
                <g>            
                    <path stroke-width="0" stroke="none" fill=${this.colors[0]}
                        d="M10,0 h${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},${this.borderRadius} v${this.#getSvgHeight(data.front)} h-${this.width} v-${this.#getSvgHeight(data.front)} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},-${this.borderRadius}" 
                    />
                    <svg y="0" width=${this.width} height="${this.#getMinHeight(data.front)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}" fill="${this.textColor}">${data.front}</text>
                    </svg>             
                </g>
                <g> 
                    <rect x="0" y="${this.#getY(data.front)}" width="${this.width}px" height="${this.#getMinHeight(data.back)}" fill=${this.colors[1]}></rect>
                    <svg y="${this.#getY(data.front)}" width=${this.width} height="${this.#getMinHeight(data.back)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}" fill="${this.textColor}">${data.back}</text>
                    </svg>            
                </g>
                <g>            
                    <path stroke-width="0" stroke="FF539C" fill=${this.colors[2]}
                        d="M0,${this.#getY(data.front) + this.#getMinHeight(data.back)} h${this.width} v${this.#getSvgHeight(data.db)} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},${this.borderRadius} h-${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},-${this.borderRadius} v-${this.#getSvgHeight(data.db)}" 
                    />
                    <svg y="${this.#getY(data.front) + this.#getMinHeight(data.back)}" width=${this.width} height="${this.#getMinHeight(data.db)}px">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}" fill="${this.textColor}">${data.db}</text>
                    </svg>             
                </g>
            </svg>`
        this.#getMaxTotal(data)
        this.box.insertAdjacentElement('beforeend', this.#getChartsWrapper(svg))
    }

    renderStandart(value, color){ 
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${value}px" class='chart__item'>                    
                <rect width="${this.width}px" height="${value}px" rx="${this.borderRadius}" fill="${color}"/>                                
            </svg>`       

        const chartWrapperStandart = createEl('div', 'chart__wrapper-standart')        

        const bg = createEl('p', 'bg')
        bg.style.height = `${value}px`
        bg.style.borderRadius = `${this.borderRadius}px`

        const chartStandartValue = createEl('p', 'chart__standartValue')
        chartStandartValue.style.fontSize = `${this.fontSize}px`
        chartStandartValue.textContent = `${value}`

        chartWrapperStandart.insertAdjacentHTML('beforeend', svg)
        chartWrapperStandart.insertAdjacentElement('beforeend', bg)
        chartWrapperStandart.insertAdjacentElement('beforeend', chartStandartValue)

        const wrapper = this.#getChartsWrapper(chartWrapperStandart, 'standart')
        wrapper.classList.add('chart__standart')

        this.box.insertAdjacentElement('beforeend', wrapper)
    }

    #getChartsWrapper(el, name = this.name){
        const chart = createEl('div', 'chart')
        chart.dataset.name = name    
        const chartName = createEl('p', 'chart__name')
        chartName.textContent = `${this.name}`
        typeof el === 'string' ? chart.insertAdjacentHTML('beforeend', el) : chart.insertAdjacentElement('beforeend', el)
        chart.insertAdjacentElement('beforeend', chartName)
        return chart
    }

    #getMinHeight(value){
        return value > this.fontSize ? value : this.fontSize + 4
    }

    #getSvgHeight(value){
        return value > this.fontSize ? value - this.borderRadius : 4
    }

    #getY(value){
        return value > this.fontSize ? value : this.fontSize
    }
    #getMaxTotal(obj){
        const total = Object.values(obj).reduce((sum, value) => sum += value, 0)
        const percents =  Object.values(obj).map(value => Math.round(100 / total * value) / 100)
        console.log(total, percents)
        return 
    }
}

export default Chart
