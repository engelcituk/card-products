import Vue from 'vue'
import store from '../../../store' //para acceder a state
import {  formatItems, formatItemProduct, currentDate, consoleMsgFinally, makeArrayCategories} from '../../../helpers/helpers'

export async function getInitialContent(context){
    const content = await Promise.all([        
        fetchCategories(), fetchProducts()
    ])                            
    const [ categories, products ] = content 
    context.commit('setCategories', categories) //muto state categories  
    context.commit('setProducts', products )   // set State products
    return { categories,  products }
}

export async function getAnotherInitialContent( context ){             
     
    context.commit('start/setLoadingCategories', true, { root: true }) //loader para categorías      
    const content = await Promise.all([        
        fetchCategories(),  fetchPaymentMethods(),  //make 3 requests
    ])    
    const [ categories, currencies ] = content  
    context.commit('start/setCategories', categories, { root: true }) //muto state categories en start   
    context.commit('start/setLoadingCategories', false, { root: true }) //quito loader para categorías     
    context.commit('start/setCurrencies', currencies, { root: true }) //muto state currencies en start 
  
    return content
}

export async function fetchCategories() {
    const idseccanal =  store.state.auth.user?.sectionCanal?.id
    try {
        
        const response = await Vue.axios({
            url: '/catalogs/category/',
            params: {idseccanal
             }
        })
        const payload = response && response.data
     
        const categories = makeArrayCategories( payload )

        return categories

    } catch (error) {
        console.log(error)
    } finally {
        consoleMsgFinally('start/fetchCategories', 'La petición para obtener las categorías se ha terminado')
    }
}
//para peticiones asyncronas para obtener lista de productos best seller
export async function fetchProducts() {
    const idseccanal =  store.state.auth.user?.sectionCanal?.id          
    try {        
        const response = await Vue.axios({
            url: `/products/`,
            params: { bs: 1, idseccanal }
        })        
        const payload = response && response.data        
        return formatItems( payload, 'products', 'BestSeller-01' ) 
    } catch (error) {
        console.log( error )
    } finally {    
        console.log('fetchProducts ha terminado')
    }
}

//peticiones para obtener lista de productos por categorias
export async function fetchProductsByCategories(context, category) {
    const { value } = category 
    const idseccanal =  store.state.auth.user?.sectionCanal?.id       
    try {
        
        const response = await Vue.axios({
            url: `/products/`,
            params: {
                idcat: value,
                idseccanal
            }
        })
        const payload = response && response.data
        return formatItems( payload, 'products', value )        
    } catch (error) {
        console.log(error.response)
    } finally {        
        console.log('fetchProductsByCategories end')
    }
}

//peticiones para obtener lista de paquetes
export async function fetchPackages({ commit } ) {
    const idseccanal =  store.state.auth.user?.sectionCanal?.id
    try {
        commit('products/setLoadingProducts', true, { root: true })
        const response = await Vue.axios({
            url: `/packages/`,
            params: { idseccanal }
        })
        const payload = response && response.data
        //le agrego el tipo (productos, eventos, paquetes)
        return formatItems( payload, 'packages', 'f20a5f0e-7d3e-11ec-90d6-0242ac120003')
        
    } catch (error) {
        console.log( error )
    } finally {
        commit('products/setLoadingProducts', false, { root: true })
        console.log('fetchPackages end')
    }
}

//peticiones para obtener lista de eventos
export async function fetchEvents({ commit }) {
    const idseccanal =  store.state.auth.user?.sectionCanal?.id
    try {
        commit('products/setLoadingProducts', true, { root: true })
        const response = await Vue.axios({
            url: `/events/`,
            params: { idseccanal }
        })
        const payload = response && response.data
        const todayDate = currentDate()
        const fecha = new Date(todayDate)
        //se filtra los eventos que sean iguales o mayores a la fecha actual
        const result = payload.filter(item => new Date(item.endDate) >= fecha)
        return formatItems( result, 'events', 'e634becc-7d3e-11ec-90d6-0242ac120003')    
    } catch (error) {
        console.log(error)
    } finally {
        commit('products/setLoadingProducts', false, { root: true })
        console.log('fetchEvents end')
    }
}

export async function fetchProductDetail(context, payload) {

    const { idProducto, endPoint } = payload
    const idseccanal =  store.state.auth.user?.sectionCanal?.id
    const endPointRequest = endPoint === 'productswebsites' ? 'products' : endPoint
    try {
        const response = await Vue.axios({
            url: `/${endPointRequest}/`,
            params: { id: idProducto, idseccanal }
        })
        const payload = response && response.data
        const item = formatItemProduct(payload[0], endPointRequest) 
        delete item.type
        delete item.category
        delete item.active
        delete item.eventdetail
        delete item.productinfo
        delete item.products
        delete item.gallery
        
        return item 
    } catch (error) {
        console.log( error.response )        
    } finally {
        console.log('fetchProductDetail end')
    }
}

