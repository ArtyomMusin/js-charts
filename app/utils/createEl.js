const createEl = (el, classes) => {
    const item = document.createElement(el)
    const classesList = Array.isArray(classes) ? classes.filter(item => item) : classes
    Array.isArray(classes) ? classesList.forEach(el => item.classList.add(el)) : item.classList.add(classesList)
    return item
}
 
export default createEl
