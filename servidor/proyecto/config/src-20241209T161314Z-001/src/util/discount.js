export function calculatePriceDiscountProduct(price, percentDiscount, decimals){
    if(!percentDiscount) return decimals?price.toFixed(decimals):price;

    let discount = (price * percentDiscount) / 100;
    let discountedPrice = price - discount;
    
    return decimals?discountedPrice.toFixed(decimals):discountedPrice;
}