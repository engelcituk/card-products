export function filteredProducts( state ) {
    let products = state.products
    const orderBY = state.orderBy
    //con esto filtro los resultado por el name del producto, no es case sensitive
    if( state.filter.query.length > 1 ){
        products = products.filter(
            product => product.name.toLowerCase().includes(state.filter.query.toLowerCase()) ||
                       product.metatag.toLowerCase().includes(state.filter.query.toLowerCase())            
        )        
    }
    if( orderBY == "alfabetico" ){
        return products.sort((a,b) => a.name > b.name ? 1 : -1)
    } else if( orderBY == "price-asc" ){
        return products.sort((a, b) => parseFloat(a.detailSelected.saleprice)-parseFloat(b.detailSelected.saleprice))
    } else if( orderBY == "price-desc"){
        return products.sort((a, b) => parseFloat(b.detailSelected.saleprice)-parseFloat(a.detailSelected.saleprice))
    } else {
        return products        
    }
}

