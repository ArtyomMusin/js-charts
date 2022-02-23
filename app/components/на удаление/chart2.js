class Charts {
    constructor(box, name, textColor = '#fff', colors, borderRadius = 10, width = 65){
        this.name = name
        this.ratio = 10
        this.colors = colors
        this.textColor = textColor
        this.width = width
        this.borderRadius = borderRadius  
        this.box = box     
    }
    
    render(front = 0, back = 0, db = 0){ 
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${front + back + db}px" class='chart__item'>
                <g>            
                    <path stroke-width="0" stroke="none" fill=${this.colors[0]}
                        d="M10,0 h${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},${this.borderRadius} v${this.#getSvgHeight(front)} h-${this.width} v-${this.#getSvgHeight(front)} a${this.borderRadius},${this.borderRadius} 0 0 1 ${this.borderRadius},-${this.borderRadius}" 
                    />
                    <svg y="0" width=${this.width} height="${this.#getMinHeight(front)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.ratio}" fill="${this.textColor}">${front}</text>
                    </svg>             
                </g>
                <g> 
                    <rect x="0" y="${this.#getY(front)}" width="${this.width}px" height="${this.#getMinHeight(back)}" fill=${this.colors[1]}></rect>
                    <svg y="${this.#getY(front)}" width=${this.width} height="${this.#getMinHeight(back)}">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.ratio}" fill="${this.textColor}">${back}</text>
                    </svg>            
                </g>
                <g>            
                    <path stroke-width="0" stroke="#FF539C" fill=${this.colors[2]}
                        d="M0,${this.#getY(front) + this.#getMinHeight(back)} h${this.width} v${this.#getSvgHeight(db)} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},${this.borderRadius} h-${this.width - this.borderRadius * 2} a${this.borderRadius},${this.borderRadius} 0 0 1 -${this.borderRadius},-${this.borderRadius} v-${this.#getSvgHeight(db)}" 
                    />
                    <svg y="${this.#getY(front) + this.#getMinHeight(back)}" width=${this.width} height="${this.#getMinHeight(db)}px">
                        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${this.ratio}" fill="${this.textColor}">${db}</text>
                    </svg>             
                </g>
            </svg>`

        this.box.insertAdjacentElement('beforeend', this.#getChartsWrapper(svg))
    }

    renderStandart(value, color){ 
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height="${value}px" class='chart__item'>                    
                <rect width="${this.width}px" height="${value}px" rx="${this.borderRadius}" fill="${color}"/>                                
            </svg>`       

        const chartWrapperStandart = document.createElement('div')
        chartWrapperStandart.classList.add('chart__wrapper-standart')

        const bg = document.createElement('p')
        bg.classList.add('bg')
        bg.style.height = `${value}px`
        bg.style.borderRadius = `${this.borderRadius}px`

        const chartStandartValue = document.createElement('p')
        chartStandartValue.classList.add('chart__standartValue')
        chartStandartValue.style.fontSize = `${this.ratio}px`
        chartStandartValue.textContent = `${value}`

        chartWrapperStandart.insertAdjacentHTML('beforeend', svg)
        chartWrapperStandart.insertAdjacentElement('beforeend', bg)
        chartWrapperStandart.insertAdjacentElement('beforeend', chartStandartValue)
        const wrapper = this.#getChartsWrapper(chartWrapperStandart, 'standart')
        wrapper.classList.add('chart__standart')

        this.box.insertAdjacentElement('beforeend', wrapper)
    }

    getProgress(box){
        const allCharts = document.querySelectorAll('.chart')
        const charts = [...allCharts].filter(item => !item.classList.contains('chart__standart'))
        if(this.name === charts[0].dataset.name){
            console.log('Нет предыдущих графиков')
            return
        }

        const highestChartY = Math.min.apply(null, charts.map(item => item.offsetTop))
        const smallestСhartY = Math.max.apply(null, charts.map(item => item.offsetTop))
        const indexElement = charts.findIndex(item => item.dataset.name === this.name)
        const chartsCompared = charts.filter((item, i) => i === indexElement || i === indexElement-1 && item)

        const points = chartsCompared.reduce((obj, item) => {
            if(Object.keys(obj)){
                console.log(item)
                obj[item.dataset.name] = {
                    xbox1:item.offsetLeft,
                    xbox2:item.offsetLeft + item.offsetWidth,
                    x: item.offsetLeft + item.offsetWidth / 2,
                    y1: item.offsetTop,
                    y2: smallestСhartY
                }
                return obj
            }
        }, {})     

        this.#getVisualProgress(box, points, highestChartY)
    }

    #getVisualProgress(box, points, highestChartY){
        console.log(points)
        const svgPointsX = Object.keys(points).map(item => points[item].x)
        const svgWidth = svgPointsX[1] - svgPointsX[0] + 10
        const svgHeight = points[Object.keys(points)[0]].y2 - highestChartY + 10
        const wrapper = document.createElement('div')
        const wrapperX1 = points[Object.keys(points)[0]].xbox1
        const wrapperWidth = points[Object.keys(points)[1]].xbox2 - points[Object.keys(points)[0]].xbox1
        wrapper.classList.add('wrapper-progress')
        wrapper.style.left = `${wrapperX1}px`
        wrapper.style.width = `${wrapperWidth}px`
        wrapper.style.top = `${Math.max.apply(null, Object.keys(points).map(item => points[item].y1)) - svgHeight}px`
        console.log(Math.min.apply(null, Object.keys(points).map(item => points[item].y1)))

        console.log(svgWidth, svgHeight)

        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" class='' width="${svgWidth}" height="${svgHeight}">  
                <g>                  
                    <path M0,0/>  
                    <text>100</text>              
                </g>                
            </svg>`
        
        wrapper.insertAdjacentHTML('beforeend', svg)
        box.insertAdjacentElement('beforeend', wrapper)
    }

    #getChartsWrapper(el, name = this.name){
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

    #getMinHeight(value){
        return value > this.ratio ? value : this.ratio + 4
    }

    #getSvgHeight(value){
        return value > this.ratio ? value - this.borderRadius : 4
    }

    #getY(value){
        return value > this.ratio ? value : this.ratio
    }
}

export default Charts
