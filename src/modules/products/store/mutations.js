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

export function addToItemsSelected(state, payload){
    const { isSelected, product, detail, type } = payload
    if(isSelected){        
        state.itemsSelected = [...state.itemsSelected, payload]
    }
    if(!isSelected){
        state.itemsSelected = state.itemsSelected.filter( item => item.product === product && item.detail === detail && item.type === type )
    }    
} 

export function removeToItemsSelected(state, product){
    
} 
