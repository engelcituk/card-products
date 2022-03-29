export function setProducts( state, products) {
    state.products = products
}

export function setCategories(state, categories) {
    const { hotels, defaults, services } = categories
    state.categories.hotels = hotels
    state.categories.defaults = defaults
    state.categories.services = services
}


export function setLoadingProducts( state, bool) {
    state.isloadingProducts = bool
}


export function setSelectedCategory(state, category ){
    state.selectedCategory = category
} 

export function setIsSelected(state, data){
    const { uuid, boolean } = data 
    const products = [...state.products ]    
    console.log( { uuid, boolean } )
    const idx = products.findIndex( item => item.uuid === uuid )
    console.log( products )

    // return 
    // const item = state.products.filter( item => item.uuid === uuid )
    // item.isSelected = boolean
} 
