export const selectProduct = (product) => {
    return {
        type: 'select_product',
        payload: product
    };
};