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
    const { isSelected, key } = payload
    if(isSelected){  
        const itemExist =  state.itemsSelected.find( item => item.key === key )        
        if( !itemExist ){
            state.itemsSelected = [...state.itemsSelected, payload]
        }
    }
    if(!isSelected){
        state.itemsSelected = state.itemsSelected.filter( item => item.key !== key )       
    }    
} 


