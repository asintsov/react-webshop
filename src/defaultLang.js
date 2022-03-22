export default {
    aboutPage: {
        title: "О нас",
        line1: "Интернет магазин открыт в 2021 году",
        line2: "Мы специализируется на продаже экологически чистых продуктов из лесов, садов и пасек Нижегородской области",
        line3: "Наша цель - обеспечить народ нашей страны чистыми витаминами и необходимыми элементами для здоровья их самих, их детей и близких.",
        line4: "Мы - за здоровую нацию!",
    },
    basketPage: {
        price: 'Цена: ',
        unit: 'руб.',
        delete: 'удалить',
        summary: 'Общая стоимость',
        makeOrder: 'Оформить заказ',
        empty: 'В корзине пока ничего нет'
    },
    contactsPage: {
        addressLabel: 'Юридический адрес',
        address: '',
        phonesTitle: 'Связаться с нами Вы всегда можетe по телефонам:',
        phone1: '+ 7 (111) 111-1111',
        phone2: '+ 7 (222) 222-2222',
        phone3: '+ 7 (333) 333-3333'
    },
    itemPage: {
        characteristics: 'Характеристики',
        price: 'Цена: ',
        unit1: 'руб.',
        intoBasket: 'В корзине: ',
        unit2: 'шт.',
        add: 'Добавить в корзину',
        description: 'Описание'
    },
    searchPage: {
        price: 'Цена: ',
        unit: 'руб.',
        add: 'Добавить',
        showMore: 'Показать еще',
        nothingFound: (searchString) => `По запросу "${searchString}" ничего не найдено`,
        found: (searchString,totalCount,filterMinPrice,minPrice,filterMaxPrice,maxPrice) => `По запросу 
        "${searchString}" найдено ${totalCount} товаров с ценой от ${filterMinPrice || minPrice}
        руб. до ${filterMaxPrice || maxPrice} руб. `
    },
    genderField: {
        maleLabel: 'муж.',
        male: 'Мужской',
        femaleLabel: 'жен.',
        female: 'Женский',
    },
    selectField: {
        choice: 'Выбрать'
    },
    basketButton: {
        title: 'Корзина',
    },
    catalogue: {
        title: 'Каталог',
    },
    loginForm: {
        inputLogin: 'Введите логин и пароль для авторизации. Или пройдите регистрацию если еще не зарегестрированы',
        in: 'Войти',
        register: 'Регистрация',
        cancel: 'Отменить',
        loginLabel: 'Логин',
        passwordLabel: 'Пароль',
        loginMaxNotice: 'Не более 15 символов',
        passwordMaxNotice: 'Не более 20 символов',
        requiredNotice: 'Обязательно для заполнения',
    },
    logo: {
        title: 'Мой магазин',
    },
    loginButton: {
        title: 'Войти',
    },
    logoutButton: {
        title: 'Выйти',
    },
    settingsBar: {
        changeColor: 'Сменить цветовую схему'
    },
    settingsButton: {
        title: 'Настройки',
    },
    addItemForm: {
        name: 'Имя товара',
        category: 'Категория',
        characteristics: 'Характеристики',
        specification: 'Описание',
        price: 'Цена',
        quantity: 'Количество',
        image: 'Изображение',
        submit: 'Готово',
    },
    filterBox: {
        filter: 'Фильтр',
        minPrice: 'Мин. цена',
        maxPrice: 'Макс. цена',
        unit: 'руб.',
        apply: 'Применить',
    },
    endless: {
        price: 'Цена: ',
        unit: 'руб.'
    },
    registrationForm: {
        gender: 'Ваш пол',
        male: 'Мужской',
        name: 'Имя',
        mail: 'Электронная почта',
        phone: 'Номер телефона',
        login: 'Логин',
        password: 'Пароль',
        submit: 'Готово',
        comeBack: 'Назад',
        invalidMail: 'Не верный формат адреса',
        invalidPhone: 'Не верный формат',
    },
    sortBox: {
        sortByPrice: 'Сортировать по цене',
        upToDown: 'По убыванию',
        downToUp: 'По возрастанию',
    },
    error: {
        badRequest: 'Что-то пошло не так'
    },
    pageTitles: {
        home: 'Домашняя',
        actions: 'Акции',
        contacts: 'Контакты',
        about: 'О нас',
        registration: 'Регистрация',
        item: 'Страница товара',
        basket: 'Корзина покупателя',
        addItem: 'Добавить новую запись в базу данных',
        search: 'Результаты поиска',
        catalogue: 'Результаты выбора категории или типа',
    },
    server: {
        itemExists: (name) => `Item ${name} already exists`,
        itemCreated: (name) => `Item ${name} has been created`,
        userExists: (login) => `User ${login} is already exists`,
        userCreated: (login) => `User ${login} has been created`,
        userNotFound: (login) => `User ${login} not found`,
        authFailed: 'Authentication failed. Check login or password',
        userWelcome: (name) => `Welcome back, ${name}!`,
        basketUpdated: 'Basket has been updated',
        loginAgain: 'Please login again',
        notAuth: 'Unauthorized',
    },
}