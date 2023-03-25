const products = {
    crazy: {
        title: "Crazy",
        price: 31000,
        amount: 0,
        image: "/images/products/burger-1.png",
        get summ() {
            return this.amount * this.price
        }
    },
    light: {
        title: "Light",
        price: 26000,
        amount: 0,
        image: "/images/products/burger-2.png",
        get summ() {
            return this.amount * this.price
        }
    },
    cheeseburger: {
        title: "cheeseBurger",
        price: 29000,
        amount: 0,
        image: "/images/products/burger-3.png",
        get summ() {
            return this.amount * this.price
        }
    },
    dburger: {
        title: "dBurger",
        price: 24000,
        amount: 0,
        image: "/images/products/burger-4.png",
        get summ() {
            return this.amount * this.price
        }
    }
}

const basketBtn = document.querySelector('.wrapper__navbar-btn');
const productBtns = document.querySelectorAll('.wrapper__list-btn');
const basketCount = document.querySelector('.warapper__navbar-count');
const basketModal = document.querySelector('.wrapper__navbar-basket');
const basketClose = document.querySelector('.wrapper__navbar-close');
const basketList = document.querySelector('.wrapper__navbar-checklist');
const basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice');
const basketOrder = document.querySelector('.wrapper__navbar-bottom');
const printBody = document.querySelector('.print__body');
const printFooter = document.querySelector('.print__footer');

productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        addProduct(this)
    })
})

function addProduct(btn) {
    let parent = btn.closest('.wrapper__list-card')
    let parentId = parent.getAttribute('id')
    products[parentId].amount++
    basket()
}

function basket() {
    const productList = []
    let totalCount = 0
    for (const key in products) {
        const product = products[key]
        const productCard = document.querySelector(`#${product.title.toLowerCase()}`);
        const productCount = productCard.querySelector('.wrapper__list-count');

        if (product.amount > 0) {
            productList.push(product)
            totalCount += product.amount
            basketCount.classList.add('active')
            productCount.classList.add('active')
            productCount.innerHTML = product.amount
        } else {
            productCount.classList.remove('active')
            productCount.innerHTML = 0
        }
        basketCount.innerHTML = totalCount
    }
    basketList.innerHTML = ''
    for (let i = 0; i < productList.length; i++) {
        basketList.innerHTML += basketCardItem(productList[i])
    }
    basketTotalPrice.innerHTML = productTotalPrice()
    let count = productTotalCount()
    if (count > 0) {
        basketCount.classList.add('active')
    } else {
        basketCount.classList.remove('active')
    }
    basketCount.innerHTML = count
}

function productTotalCount() {
    let total = 0
    for (const key in products) {
        total += products[key].amount
    }
    return total
}

function productTotalPrice() {
    let total = 0
    for (const key in products) {
        total += products[key].summ
    }
    return total + ' sum'
}

function basketCardItem(item) {
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src=".${item.image}" alt="${item.title}" class="wrapper__navbar-productImage">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${item.title}</p>
                <p class="wrapper__navbar-infoPrice"><span>${item.summ}</span>sum</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${item.title.toLowerCase()}__card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${item.amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `
}
basketBtn.addEventListener('click', function () {
    basketModal.classList.add('active')
})
basketClose.addEventListener('click', function () {
    basketModal.classList.remove('active')
})
window.addEventListener('click', function (e) {
    let btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        let btnAttr = btn.getAttribute('data-symbol')
        let btnParent = btn.closest('.wrapper__navbar-option')
        if (btnParent) {
            let btnParentId = btnParent.getAttribute('id').split('__')[0]
            if (btnAttr === '+') products[btnParentId].amount++
            else if (btnAttr === '-') products[btnParentId].amount--
            basket()
        }
    }
})

basketOrder.addEventListener('click', function () {
    printBody.innerHTML = ''
    for (const key in products) {
        const element = products[key];
        if (element.amount) {
            printBody.innerHTML += `
            <div class="print__body-item">
            <p class="print__body-item_name">
                <span>${element.title}</span>
                <span>${element.amount}</span>
            </p>
            <p class="print__body-item_sum">${element.summ}</p>
        </div>
        `
    }
    }
    printFooter.innerHTML = productTotalPrice()
    window.print()
})