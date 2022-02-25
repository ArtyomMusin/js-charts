import createEl from './utils/createEl.js'
import request from './api/request.js'

const App = (container, links) => {
    let count = 0  
    const wrapperContent = createEl('div', 'wrapper-content') 
    const contentWrapper = createEl('div', 'content-wrapper')

    const navWrapper = createEl('nav', 'nav')

    const currentLinkP = createEl('p', 'current-link-p')
    currentLinkP.textContent = 'Current link: '

    const currentLinkA = createEl('a', 'current-link')
    currentLinkA.href = links[count]
    currentLinkA.textContent = links[count]
    currentLinkA.target = '_blank'

    const nav = createEl('div', 'nav-buttons')

    const prevLink = createEl('button', ['button', 'prev-link'])
    prevLink.textContent = 'Prev Link'

    const nextLink = createEl('button', ['button', 'next-link'])
    nextLink.textContent = 'Next Link'

    const currentOf = createEl('p', 'current-of')
    currentOf.textContent = `${count+1} of ${links.length}`

    currentLinkP.insertAdjacentElement('beforeend', currentLinkA)
    nav.insertAdjacentElement('beforeend', prevLink)
    nav.insertAdjacentElement('beforeend', nextLink)
    navWrapper.insertAdjacentElement('beforeend', currentLinkP)
    navWrapper.insertAdjacentElement('beforeend', nav)    
    navWrapper.insertAdjacentElement('beforeend', currentOf) 
    contentWrapper.insertAdjacentElement('beforeend', navWrapper)
    contentWrapper.insertAdjacentElement('afterbegin', wrapperContent)       
    container.insertAdjacentElement('beforeend', contentWrapper)

    request(wrapperContent, links[count]) 

    prevLink.addEventListener('click', () => {
        wrapperContent.textContent = ''
        count > 0 ? count -= 1 : 0
        request(wrapperContent, links[count])   
        currentLinkA.href = links[count]
        currentOf.textContent = `${count+1} of ${links.length}`
        currentLinkA.textContent = links[count]
    })
    nextLink.addEventListener('click', () => {
        wrapperContent.textContent = ''
        count < links.length -1 ? count += 1 : links.length - 1
        request(wrapperContent, links[count])  
        currentOf.textContent = `${count+1} of ${links.length}` 
        currentLinkA.textContent = links[count]
        currentLinkA.href = links[count]
    })  
}
 
export default App
