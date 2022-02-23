import createEl from '../utils/createEl.js'

class VisualProgress {
    constructor(box, dataObject){
        this.box = box
        this.boxX = dataObject.boxX
        this.boxY = dataObject.boxY
        this.boxWidth = dataObject.wrapperWidth
        this.boxHeight = dataObject.wrapperHeight
        this.boxTopPadding = dataObject.wrapperTopPadding
        this.x1 = dataObject.x1
        this.x2 = dataObject.x2
        this.x1point = dataObject.x1point
        this.y1point = dataObject.y1point
        this.height1 = dataObject.height1
        this.lineWidth = this.x2 - this.x1
        this.height2 = dataObject.height2        
        this.arrowX = this.x1point + this.lineWidth        
        this.progress = dataObject.progress > 0 ? `+${dataObject.progress}` : dataObject.progress
        this.arrowSize = 3        
        this.marginTopChart = 5
        this.valueLeft = dataObject.serial > 0 ? this.lineWidth / 2 + dataObject.chartWidth / 2 + dataObject.valueBetween : this.lineWidth / 2 + dataObject.chartWidth / 2
    }
    render(){
        const wrapper = createEl('div', 'wrapper-progress')
        wrapper.style.width = `${this.width}px`
        wrapper.style.height = `${this.height}px`
        wrapper.style.left = `${this.boxX}px`
        wrapper.style.top = `${this.boxY - this.marginTopChart}px`

        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" class='' width="${this.boxWidth}" height="${this.boxHeight}">  
                <g>                  
                    <path stroke-width="2" stroke="#9C93A0" fill="none"
                        d="M${this.x1point},${this.y1point} v-${this.height1} h${this.lineWidth} v${this.height2}"
                    />  
                    <path stroke-width="1" stroke="#9C93A0" fill="none"
                        d="M${this.arrowX - this.arrowSize },${this.height2 + this.boxTopPadding - this.arrowSize } L${this.arrowX},${this.height2 + this.boxTopPadding} L${this.arrowX + this.arrowSize },${this.height2 + this.boxTopPadding - this.arrowSize}"
                    />             
                </g>                
            </svg>`
        const value = createEl('p', ['progress-value', this.progress > 0 ? 'green' : (this.progress < 0) ? 'red' : ''])
        value.textContent = this.progress
        value.style.left = `${this.valueLeft}px`
        value.style.top = `${this.boxTopPadding}px`

        wrapper.insertAdjacentHTML('beforeend', svg)
        wrapper.insertAdjacentElement('beforeend', value)
        this.box.insertAdjacentElement('beforeend', wrapper)
    }
}

export default VisualProgress
