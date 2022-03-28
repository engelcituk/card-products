export default {
    products: [],
    filter: {
        query: '',
    },
    orderBy: 'alfabetico',
    isloadingProducts: false,
    productDetail: null,    
    errors: {
        bestSeller: { error: false, message: '' },              
        byCategories: { error: false, message: '' },              
        packages: { error: false, message: '' },
        events: { error: false, message: '' },
        productDetail: { error: false, message: '' },
    }, 
          
}