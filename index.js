import {menuArray} from './data.js'

const listings = document.getElementById('listings')
const cartEL = document.getElementById('cart')
const checkoutBtn = document.getElementById('checkout')
const paymentForm = document.getElementById('payment-form')
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const cart = []

function renderItems() {
    try {
        console.log('Starting renderItems')
        console.log('menuArray type: ', typeof menuArray)
        console.log('menuArray value: ', menuArray)
        listings.replaceChildren()
        
        if (!Array.isArray(menuArray)) {
            console.error('menuArray is not an array: ', menuArray) 
            return
        }
        
        menuArray.forEach(item => {
            const li = document.createElement('li')
            li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <span class="emoji">${item.emoji}</span>
            <p>${item.ingredients}</p>
            <button data-id="${item.id}">+</button>
            `
            listings.appendChild(li)
        })
    } catch (error) {
        console.error('Error rendering items: ', error)
    }
}

function renderCart() {
    cartEL.replaceChildren()

    if (cart.length === 0) {
        cartEL.textContent = 'Your cart is empty.'
        return
    }

    cart.forEach((item, index) => {
        const div = document.createElement('div')
        div.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="remove-btn" data-index="${index}">Remove</button>
        `
        cartEL.appendChild(div)
    })
}

function addToCart(item) {
    cart.push(item)
    renderCart()
}

function removeFromCart(index) {
    cart.splice(index, 1)
    renderCart()
}

// implement functionality for add to cart button
listings.addEventListener('click', (e) => {
    if (!e.target.matches('button[data-id]')) return
    
    const id = Number(e.target.dataset.id) 
    const menuItem = menuArray.find(i => i.id === id)
    if (menuItem) addToCart(menuItem)
})

cartEL.addEventListener('click', (e) => {
    if (!e.target.matches('.remove-btn')) return
    const index = Number(e.target.dataset.index)
    removeFromCart(index)
})

checkoutBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
})

modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hidden')
})

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    modal.classList.add('hidden')
    // clear cart
    cart.length = 0 
    renderCart()
})

renderItems()
renderCart()