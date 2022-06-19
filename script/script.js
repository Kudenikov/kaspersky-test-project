const MIN_SCREEN_WIDTH = 640;
let lastScroll = 0;

const header = document.querySelector('.header');
const selectButton = document.querySelector('.buy-block__select-button');
const menuContent = document.querySelector('.buy-block__menu-content');
const menuItem = Array.from(document.querySelectorAll('.buy-block__menu-item'));
const newPrice = document.querySelector('.buy-block__new-price-integer');
const oldPrice = document.querySelector('.buy-block__old-price-integer');
const currentCurrency = document.querySelector('.header__currency');
const currencyInPriceBlock = Array.from(document.querySelectorAll('.buy-block__currency'));
const mainSubtitle = document.querySelector('.main__subtitle');
const currentProduct = document.querySelector('.buy-block-small__product-name');
const currentOption = document.querySelector('.buy-block-small__options');
const fullBlock = document.querySelector('.buy-block');
const smallBlock = document.querySelector('.buy-block-small');
const priceSmallBlock = smallBlock.querySelector('.buy-block-small__price');
const optionSmallBlock = smallBlock.querySelector('.buy-block-small__option');

function selectButtonClick() {
    menuContent.classList.toggle('buy-block__menu-content_opened');
}

function closeMenu() {
    menuContent.classList.remove('buy-block__menu-content_opened');
}

function selectItem(item) {
    const option = item.querySelector('.buy-button__option');
    const optionPrice = item.querySelector('.buy-block__option-price');
    selectButton.textContent = option.textContent;
    newPrice.textContent = optionPrice.textContent;
    oldPrice.textContent = (Math.floor(1.2*optionPrice.textContent));
    priceSmallBlock.textContent = optionPrice.textContent;
    optionSmallBlock.textContent = ' - ' + option.textContent;
    closeMenu();
}

function changeCurrency() {
    const selectedCurrency = currentCurrency.options[currentCurrency.selectedIndex];
    const currency = selectedCurrency.value;
    currencyInPriceBlock.forEach(item => {
        item.textContent = currency;
    })
}

function resizeHandler() {
    if (window.innerWidth <= MIN_SCREEN_WIDTH) {
        mainSubtitle.textContent = 'Protect your devices with anti-malware made for gamers.';
    } else {
        mainSubtitle.textContent = 'Protect your devices with a security suite made for gamers';
    }
}

const onResize = () => {
    setTimeout(() => {
        resizeHandler()
    }, 2000)
}

menuItem.forEach((item) => {
    item.addEventListener('click', () => selectItem(item));
});

function openFullBlock() {
    fullBlock.classList.add('buy-block_opened');
    smallBlock.classList.add('buy-block-small_closed');
    currentProduct.removeEventListener('click', openFullBlock);
    currentOption.removeEventListener('click', openFullBlock);
}

const scrollPosition = () => {
    return window.pageYOffset || document.documentElement.scrollTop;
}

const containFixed = () => {
    return header.classList.contains('header_fixed');
}

selectButton.addEventListener('click', selectButtonClick);
currentCurrency.addEventListener('change', changeCurrency);
window.addEventListener('resize', onResize);
currentProduct.addEventListener('click', openFullBlock);
currentOption.addEventListener('click', openFullBlock);
document.addEventListener('click', (evt) => {
    if (!menuContent.contains(evt.target) && !selectButton.contains(evt.target)) {
        closeMenu();
    }
})
window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containFixed()) {
        header.classList.add('header_fixed');
    } else if (scrollPosition() < lastScroll && containFixed()) {
        header.classList.remove('header_fixed');
    }
    lastScroll = scrollPosition();
})