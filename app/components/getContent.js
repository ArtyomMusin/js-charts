import createEl from '../utils/createEl.js'
import App from '../app.js'

const getContent = () => {
    const container = document.querySelector('.container') 
    const links = ['https://rcslabs.ru/ttrp1.json', 'https://rcslabs.ru/ttrp2.json', 'https://rcslabs.ru/ttrp3.json', 'https://rcslabs.ru/ttrp4.json', 'https://rcslabs.ru/ttrp5.json']
    let count = 0  
    const wrapperContent = createEl('div', 'wrapper-content') 

    const contentWrapper = createEl('div', 'content-wrapper')
    const navWrapper = createEl('nav', 'nav')
    const currentLinkP = createEl('p', 'current-link-p')
    currentLinkP.textContent = 'Current link: '
    const currentLinkA = createEl('a', 'current-link')
    currentLinkA.href = links[count]
    currentLinkA.textContent = links[count]
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

    App(wrapperContent, links[count]) 

    prevLink.addEventListener('click', () => {
        wrapperContent.textContent = ''
        count > 0 ? count -= 1 : 0
        App(wrapperContent, links[count])   
        currentOf.textContent = `${count+1} of ${links.length}`
        currentLinkA.textContent = links[count]
    })
    nextLink.addEventListener('click', () => {
        wrapperContent.textContent = ''
        count < links.length -1 ? count += 1 : links.length - 1
        App(wrapperContent, links[count])  
        currentOf.textContent = `${count+1} of ${links.length}` 
        currentLinkA.textContent = links[count]
    })  
}
 
export default getContent
