const formAddBtn = document.querySelector('.form__add-btn'),
    form = document.querySelector('.form'),
    formItem = document.querySelector('.form__item-prod'),
    products = document.querySelector('.form__products'),
    productsButton = document.querySelector('.products__button'),
    prodInput = document.querySelectorAll('.prod__input'),
    buttonPrice = document.querySelector('.button__price'),
    errorBtn = document.querySelector('.error__btn'),
    formError = document.querySelector('.form__error'),
    formSuccess = document.querySelector('.form__success'),
    successButton = document.querySelector('.success__button'),
    errorButton = document.querySelector('.error__button');

const option = {
    prodArr: [{
        name: 1,
        id: 1
    }],
    err: false,
    loading: false,
    paymentSuccess: true,
    paymentError: false,
    price: 24.99,
    path: "https://jsonplaceholder.typicode.com/posts"
}


// создаю ошибку в адресе
errorBtn.addEventListener('click', () => {
    option.err = !option.err

    if (option.err) {
        option.path = 'https://jsonplaceholder.typicode.com/posts1111'
        errorBtn.style.backgroundColor = 'tomato'
    } else {
        option.path = 'https://jsonplaceholder.typicode.com/posts'
        errorBtn.style.backgroundColor = 'var(--basic-green)'
    }
})

formAddBtn.addEventListener('click', () => {
    products.style.left = 0;
    option.prodArr = [{
        name: 1,
        id: 1
    }]
})
successButton.addEventListener('click', () => {
    option.prodArr = [{
        name: 1,
        id: 1
    }]
    option.loading = false;
    loading(option.loading)
    formSuccess.style.left = '-420px';
    window.location.hash = 'home'
})
errorButton.addEventListener('click', () => {

    option.prodArr = [{
        name: 1,
        id: 1
    }]
    option.loading = false;
    loading(option.loading)
    formError.style.left = '-420px';
    window.location.hash = 'home'
})

productsButton.addEventListener('click', () => {
    products.style.left = '-420px';

    let str = ''

    for (let i = 1; i <= form.prod.value - 1; i++) {
        option.prodArr.push({
            name: i + 1,
            id: i + 1
        })
    }

    option.prodArr.forEach(value => {
        str += getProd(value.name)
    })

    formItem.innerHTML = str

    getSumPrice(option.prodArr.length, buttonPrice)



    // удаление продуктов из списка

    document.querySelectorAll('.prod__close').forEach(element => {

        element.addEventListener('click', (event) => {

            const elID = +event.target.dataset.id

            option.prodArr = option.prodArr.filter(x => x.id !== elID) // убираю из массива удаленный продукт

            event.path[2].style.display = 'none' // удаляю элемент на экране
            getSumPrice(option.prodArr.length, buttonPrice) //перещитоваю сумму

        })
    })


})

// отправка формы

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    option.loading = true;
    loading(option.loading)

    try {
        await fetch(option.path, {
                method: "POST",
                body: JSON.stringify(option.prodArr),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => {
                const status = response.status;
                console.log(status);
                

                if (status >= 200 && status < 300) {

                    formSuccess.style.left = '0px'
                    window.location.hash = 'paymentsuccess'
                } else if (status === 404) {
                    formError.style.left = '0px';
                    window.location.hash = 'paymenterror'
                }

                return response.json();
            })
            .then((data) => {
                option.loading = false;

                console.log(data);
            });
    } catch (error) {
        console.log(error);
    }
});

function getProd(name) {
    return `
    <div>
        <h3 class="form__title">Product ${name}<span class='prod__close' data-id="${name}"></span></h3>
        <label class="form__label">
            Enter main keyword for the product
            <input type="text" name="keyword" class="form__input" placeholder="for example, sylicon wine cup">
        </label>
        <label class="form__label">
            Enter link to the similar product as a reference
            <input type="text" name="link" class="form__input" placeholder="https://...">
        </label>
    </div>
        
    `
}

// loader
function loading(bool) {
    if (bool) {
        document.querySelector('.button__loading').style.left = '50%'
        document.querySelector('.button__info').style.left = '150%'
    } else {
        document.querySelector('.button__loading').style.left = '-50%'
        document.querySelector('.button__info').style.left = '50%'
    }
}

// функция определения стоимости продуктов

function getSumPrice(length, element) {
    switch (length) {
        case 1:
            option.price = 24.99
            break;
        case 2:
            option.price = 44
            break;
        case 3:
            option.price = 60
            break;
        case 4:
            option.price = 72
            break;
        case 5:
            option.price = 80
            break;
        default:
            option.price = 0
            break;
    }
    element.innerHTML = option.price
}

// перекрашиваю точки у кастомных radio button так и не получилось это сделать на чистом css
prodInput.forEach(prod => {
    prod.addEventListener('change', () => {
        const x = document.querySelectorAll('.rad__dot')
        x.forEach(z => z.style.backgroundColor = '#E1E3EE')
        x[4 - (prod.value - 1)].style.backgroundColor = 'var(--basic-green)'
    })
});