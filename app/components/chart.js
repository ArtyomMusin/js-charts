import createEl from '../utils/createEl.js'

class Chart {
    constructor(dataVisual, data, box, name, colors, textColor = '#fff', width, borderRadius = 10){
        this.dataVisual = dataVisual
        this.data = data        
        this.box = box   
        this.name = name  
        this.fontSize = 10
        this.colors = colors
        this.textColor = textColor
        this.width = width
        this.borderRadius = borderRadius 
    }
    
    render(){
        console.log(this.data)
        console.log(this.dataVisual)
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${this.dataVisual.front + this.dataVisual.back + this.dataVisual.db}px" class='chart__item'>
                <g>            
                    <path stroke-width="0" stroke="none" fill=${this.colors[0]}
                        d="M10,0 h${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},${this.borderRadius} v${this.#getSvgHeight(this.dataVisual.front)} h-${this.width} v-${this.#getSvgHeight(this.dataVisual.front)} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},-${this.borderRadius}" 
                    />
                    <svg y="0" width=${this.width} height="${this.#getMinHeight(this.dataVisual.front)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}" fill="${this.textColor}">${this.data.front}</text>
                    </svg>             
                </g>
                <g> 
                    <rect x="0" y="${this.#getY(this.dataVisual.front)}" width="${this.width}px" height="${this.#getMinHeight(this.dataVisual.back)}" fill=${this.colors[1]}></rect>
                    <svg y="${this.#getY(this.dataVisual.front)}" width=${this.width} height="${this.#getMinHeight(this.dataVisual.back)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}" fill="${this.textColor}">${this.data.back}</text>
                    </svg>            
                </g>
                <g>            
                    <path stroke-width="0" stroke="FF539C" fill=${this.colors[2]}
                        d="M0,${this.#getY(this.dataVisual.front) + this.#getMinHeight(this.dataVisual.back)} h${this.width} v${this.#getSvgHeight(this.dataVisual.db)} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},${this.borderRadius} h-${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},-${this.borderRadius} v-${this.#getSvgHeight(this.dataVisual.db)}" 
                    />
                    <svg y="${this.#getY(this.dataVisual.front) + this.#getMinHeight(this.dataVisual.back)}" width=${this.width} height="${this.#getMinHeight(this.dataVisual.db)}px">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.fontSize}" fill="${this.textColor}">${this.data.db}</text>
                    </svg>             
                </g>
            </svg>`
        this.box.insertAdjacentElement('beforeend', this.#getChartsWrapper(svg))
    }

    renderStandart(color){
        console.log(this.dataVisual)
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${this.dataVisual}px" class='chart__item'>                    
                <rect width="${this.width}px" height="${this.dataVisual}px" rx="${this.borderRadius}" fill="${color}"/>                                
            </svg>`       

               

        const bg = createEl('p', 'bg')
        bg.style.height = `${this.dataVisual}px`
        bg.style.borderRadius = `${this.borderRadius}px`

        const chartStandartValue = createEl('p', 'chart__standartValue')
        chartStandartValue.style.fontSize = `${this.fontSize}px`
        chartStandartValue.textContent = `${this.data}`

        const wrapper = this.#getChartsWrapper([svg, bg, chartStandartValue], 'standart')
        wrapper.classList.add('chart__standart')

        this.box.insertAdjacentElement('beforeend', wrapper)
    }

    #getChartsWrapper(el, name = this.name){        
        const chartWrapperStandart = createEl('div', 'chart__wrapper') 
        const chart = createEl('div', 'chart')
        chart.dataset.name = name  
        

        const chartName = createEl('p', 'chart__name')
        chartName.textContent = `${this.name}`
        if(Array.isArray(el)) {
            el.forEach(item => typeof item === 'string' ? chartWrapperStandart.insertAdjacentHTML('beforeend', item) : chartWrapperStandart.insertAdjacentElement('beforeend', item))
        } else {
            typeof el === 'string' ? chartWrapperStandart.insertAdjacentHTML('beforeend', el) : chartWrapperStandart.insertAdjacentElement('beforeend', el)
        }    
        chart.insertAdjacentElement('beforeend', chartWrapperStandart)  
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
}

export default Chart
