export function setLoadingProducts( state, bool) {
    state.isloadingProducts = bool
}
export function setProducts( state, products) {
    state.products = products
}
export function unsetProducts(state) {
    state.products = []
}
export function setSortBy( state, option) {
    state.orderBy = option.value
}
//errors bestSeller
export function setErrorBSproducts(state, errorMessage){
    state.errors.bestSeller.error = true
    state.errors.bestSeller.message = errorMessage
}
export function unsetErrorBSproducts(state){
    state.errors.bestSeller.error = false
    state.errors.bestSeller.message = ''
}
//errors byCategories
export function setErrorByCategoriesProducts(state, errorMessage){
    state.errors.byCategories.error = true
    state.errors.byCategories.message = errorMessage
}
export function unsetErroByyCategoriesProducts(state){
    state.errors.byCategories.error = false
    state.errors.byCategories.message = ''
}
//errors packages
export function setErrorPackagesProducts(state, errorMessage){
    state.errors.packages.error = true
    state.errors.packages.message = errorMessage
}
export function unsetErrorPackagesProducts(state){
    state.errors.packages.error = false
    state.errors.packages.message = ''
}
//errors events
export function setErrorEventsProducts(state, errorMessage){
    state.errors.events.error = true
    state.errors.events.message = errorMessage
}
export function unsetErrorEventsProducts(state){
    state.errors.events.error = false
    state.errors.events.message = ''
}
//errors product detail
export function setErrorProductDetail(state, errorMessage){
    state.errors.productDetail.error = true
    state.errors.productDetail.message = errorMessage
}
export function unsetErrorProductDetail(state){
    state.errors.productDetail.error = false
    state.errors.productDetail.message = ''
}
// para ocupar en el buscador, filter
export function setFilter(state, data){
    state.filter[data['filter']] = data.value
}
export function setDetailProduct(state, detail) {
    state.productDetail = detail
}
export function unsetDetailProduct(state) {
    state.productDetail = null
}
//un producto al seleccionar su detalle, actualizo su propiedad detailSelected
export function setDetailSelectedInProduct(state, product) {
    let prod = state.products.find( p => p.id === product.id )
    prod.detailSelected = product.detailSelected
}
//propiedad detailSelected en un la vista a detalle de un producto
export function setDetailSelectedProductDetail(state, detail) {    
    state.productDetail.detailSelected = detail
}
