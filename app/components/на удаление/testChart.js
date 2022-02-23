import Chart from './chart.js'

class testChart extends Chart{
    constructor(box, name, colors, textColor, borderRadius, width){
        super(box, name, colors, textColor, borderRadius, width) 
    }
    
    render(data){ 
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${data.front + data.back + data.db}px" class='chart__item'>
                <g>            
                    <path stroke-width="0" stroke="none" fill=${this.colors[0]}
                        d="M10,0 h${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},${this.borderRadius} v${this.getSvgHeight(data.front)} h-${this.width} v-${this.getSvgHeight(data.front)} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},-${this.borderRadius}" 
                    />
                    <svg y="0" width=${this.width} height="${this.getMinHeight(data.front)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.ratio}" fill="${this.textColor}">${data.front}</text>
                    </svg>             
                </g>
                <g> 
                    <rect x="0" y="${this.getY(data.front)}" width="${this.width}px" height="${this.getMinHeight(data.back)}" fill=${this.colors[1]}></rect>
                    <svg y="${this.getY(data.front)}" width=${this.width} height="${this.getMinHeight(data.back)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.ratio}" fill="${this.textColor}">${data.back}</text>
                    </svg>            
                </g>
                <g>            
                    <path stroke-width="0" stroke="FF539C" fill=${this.colors[2]}
                        d="M0,${this.getY(data.front) + this.getMinHeight(data.back)} h${this.width} v${this.getSvgHeight(data.db)} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},${this.borderRadius} h-${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},-${this.borderRadius} v-${this.getSvgHeight(data.db)}" 
                    />
                    <svg y="${this.getY(data.front) + this.getMinHeight(data.back)}" width=${this.width} height="${this.getMinHeight(data.db)}px">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.ratio}" fill="${this.textColor}">${data.db}</text>
                    </svg>             
                </g>
            </svg>`

        this.box.insertAdjacentElement('beforeend', this.getChartsWrapper(svg))
    }

    getChartsWrapper(el, name = this.name){
        const chart = document.createElement('div')
        chart.classList.add('chart') 
        chart.dataset.name = name    
        const chartName = document.createElement('p')
        chartName.classList.add('chart__name')
        chartName.textContent = `${this.name}`
        typeof el === 'string' ? chart.insertAdjacentHTML('beforeend', el) : chart.insertAdjacentElement('beforeend', el)
        chart.insertAdjacentElement('beforeend', chartName)
        return chart
    }

    getMinHeight(value){
        return value > this.ratio ? value : this.ratio + 4
    }

    getSvgHeight(value){
        return value > this.ratio ? value - this.borderRadius : 4
    }

    getY(value){
        return value > this.ratio ? value : this.ratio
    }
}

export default testChart
