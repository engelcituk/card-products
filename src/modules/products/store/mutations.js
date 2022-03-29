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
