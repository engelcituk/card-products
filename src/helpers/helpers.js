import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

const handlerErrors = (errorMessage, errorResponse) => {
    let stringError = ''
    const responseStatus = errorResponse.status || false
    const responseStatusText = errorResponse.statusText || false
    const responseStatusDataDetail = errorResponse.data.detail || false

    stringError += '<strong>Error message:</strong> ' + errorMessage + '<br>'

    if (responseStatus) {
        stringError += '<strong>Error code:</strong> ' + responseStatus + '<br>'
    }

    if (responseStatusText) {
        stringError += '<strong>Status text:</strong> ' + responseStatusText + '<br>'
    }

    if (responseStatusDataDetail) {
        stringError += '<strong>Detail:</strong> ' + responseStatusDataDetail + '<br>'
    }

    return stringError
}

const currentDate = () => {
    let date = new Date();
    // adjust 0 before single digit date
    let day = ("0" + date.getDate()).slice(-2);
    // current month
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
        // current year
    let year = date.getFullYear()

    return year + "-" + month + "-" + day
}

const formatDate = (fecha, locale) => {

    const date = new Date(fecha + 'T00:00:00')

    const mesesSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const mesesIngles = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const dia = date.getDate()
    const mes = date.getMonth()
    const yyy = date.getFullYear()

    const stringEs = dia + '  ' + mesesSpanish[mes] + ' ' + yyy
    const stringEn = mesesIngles[mes] + ' ' + dia + ', ' + yyy

    const stringDate = locale == "es" ? stringEs : stringEn

    return stringDate
}

const formatDateOnly = (fecha, locale) => {

    const date = new Date(fecha)
    const mesesIngles = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const dia = date.getDate()
    const mes = ("0" + (date.getMonth() + 1)).slice(-2)
    const yyy = date.getFullYear()

    const stringEs = yyy + '-' + mes + '-' + dia
    const stringEn = mesesIngles[mes] + ' ' + dia + ', ' + yyy

    const stringDate = locale == "es" ? stringEs : stringEn

    return stringDate
}
const hoursOnly = (fecha) => {

    const date = new Date(fecha)
    const hora = date.getHours()
    const minutos = date.getMinutes()
    const tiempo = hora + ':' + minutos
    const stringHours = tiempo

    return stringHours
}

const formatBeoProductToSave = (detalles, id, infobeo) => {
    detalles.forEach((detalle) => {
        delete detalle.infobeo
        detalle.ordersdetail = id
        detalle.infobeo = infobeo
        detalle.departamento = detalle.departamentoid,
        delete detalle.departamentoid
        delete detalle.departamentoname
    })
    return detalles
}
const transfersIsValid = (detailOrder) => {
    let valiTranfers = detailOrder.filter(item => item.coupon != '')
    let resultados = valiTranfers.filter(item => item.itinerary.airline == '' || item.itinerary.pickup == '' || item.itinerary.flight == '')
    
    if (resultados.length > 0) {
        return true
    } else {
        return false
    }
}

const transfersIsValidNull = (detailOrder) => {
    let transfersIsValidNull = detailOrder
    let resultados = transfersIsValidNull.filter(item => item.itinerary.airline == '' || item.itinerary.pickup == '' || item.itinerary.flight == '' || item.itinerary.flighttime == '' || item.itinerary.ito == '' || item.itinerary.ifrom == '')    
    if (resultados.length > 0) {
        return true
    } else {
        return false
    }
}

const stringAleatorio = () => {    
    return uuidv4() 
}

const camposRequeridosPorLLenar = (product) => {
    let camposFaltantes = []    
    const { categoryName, itinerario, operationdate, NamePrefix, GivenName, Surname, PhoneNumber, Email, term, typeDiscount, isIncludenIn, requiresAuthorization } = product
    if (categoryName == "Transfer") {
        if (!operationdate || operationdate == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Date" })
        }
        if (!itinerario.ifrom || itinerario.ifrom == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Origen" })
        }
        if (!itinerario.ito || itinerario.ito == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Destino" })
        }
        if (!itinerario.pax || itinerario.pax == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Pax" })
        }
        if (!itinerario.trip || itinerario.trip == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Tipo de servicio" })
        }
    }

    if (categoryName == "Reservas") {
        if (!NamePrefix || NamePrefix == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Prefijo" })
        }
        if (!GivenName || GivenName == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Nombre" })

        }
        if (!Surname || Surname == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Apellido" })
        }
        if (!PhoneNumber || PhoneNumber == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Número de télefono" })
        }
        if (!Email || Email == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Email" })
        }
        if (!term || term == null) {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Termino y condición" })
        }
        if (requiresAuthorization) {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Falta autorizar el booking" })

        }
    }

    if (categoryName != "Transfer" && categoryName != "Reservas") {
        if (!operationdate || operationdate == '') {
            camposFaltantes.push({ key: stringAleatorio(), campo: "Date" })
        }
    }
    if (typeDiscount == 'Incluido en el paquete' && !isIncludenIn) {
        camposFaltantes.push({ key: stringAleatorio(), campo: "Reserva donde se incluye" })
    }
    return camposFaltantes
}
const toDecimal = (stringToDecimal) => {
    return String((Math.round(stringToDecimal * 100) / 100).toFixed(2))
}

const toJson = (stringToJson) => {
    return JSON.parse(JSON.stringify(stringToJson))
}



const addFormatPay = (payInfo, amount) => {
    let formaPagoInfo = {}
    formaPagoInfo = {
        'id': payInfo.id,
        'name': payInfo.name,
        'total': amount

    }
    return formaPagoInfo
}
const consoleMsgFinally = (action, message) => {
    if (process.env.NODE_ENV == 'development' ) {
        console.log(`[${action}] ${message}`)
    }
}


const makeArrayCategories = ( categories ) => {

    let hotels = []
    let defaults = []
    let services = [
        { section:'Servicios', action: 'get-events',  text: 'Eventos', value: 'e634becc-7d3e-11ec-90d6-0242ac120003'  },
        { section:'Servicios', action: 'get-packages', text: 'Paquetes', value: 'f20a5f0e-7d3e-11ec-90d6-0242ac120003'  },
    ]

    categories.forEach( ( category ) => {
        const { section, id, name } = category 
        category.action = 'get-products-by-category'
        category.text = name
        category.value = id
        delete category.id
        delete category.name
        if( section == 'Servicios Hoteleros' ){
            hotels.push( category )
        }
        if( section == 'Categorías' ){
            defaults.push( category )
            defaults.sort((a, b) => a.text > b.text ? 1 : -1) //ordeno alfabeticamente
        } 
    })
    const bestSeller = { section:'Categorías', action: 'get-products-best-seller',text: 'Best Seller', value: 'BestSeller-01'}
    defaults.unshift( bestSeller )
    return { hotels, defaults, services }
}

const formatItems = ( products, type, valueCategory ) => {    
    if( type === 'products'){
        return formatListProducts(products, valueCategory ) 
    }
    if( type === 'events'){
        return formatListEvents(products, valueCategory ) 
    } 
    if( type === 'packages'){
        return formatListPackage(products, valueCategory ) 
    }        
}

const formatListProducts = ( products, valueCategory ) => {
    let items = []
    products.forEach((product, index ) => {        
        product.modelType = 'product'
        product.valueFromCategory = valueCategory
        product.isSelected = false
        product.uuid = `product-${product.id}`
        product.categoryName = product.category.name || ''
        product.detailSelected = product.detail[0] ? product.detail[0] : null
        delete product.gallery
        delete product.videolink
        delete product.weblink
        delete product.type
        delete product.category
        delete product.productinfo
        delete product.detailId 

        if(product.detailSelected && index < 4 ){
            items.push(product) 
        }     
    })

    return items
}

const formatListPackage = ( packages, valueCategory) => {
    let items = []
    packages.forEach((product, index) => {
        product.modelType = 'package'    
        product.valueFromCategory = valueCategory
        product.isSelected = false
        product.uuid = `package-${product.id}`
        product.detailSelected = {
            descmax: 0,
            detaildisplay: product.name,
            id: product.id,
            saleprice: product.saleprice,
        }
        delete product.products
        delete product.gallery
        delete product.videolink
        delete product.weblink
        delete product.category
        delete product.productinfo
        if(index < 4 ){
            items.push(product)             
        }
    })

    return items
}

const formatListEvents = ( events, valueCategory ) => {
    let items = []
    events.forEach((product, index) => {        
        const timeInitFormat = product.startTime.slice(0, -3)
        const timeEndFormat = product.endTime.slice(0, -3)
        const ampmInit = (timeInitFormat.slice(0, -3) >= 12) ? "PM" : "AM"
        const ampmEnd = (timeEndFormat.slice(0, -3) >= 12) ? "PM" : "AM"
        product.modelType = 'event'
        product.categoryName = 'Events'  
        product.valueFromCategory = valueCategory
        product.isSelected = false
        product.uuid = `event-${product.id}`                               
        const detalleIngles = product.eventdetail[1]
        product.detailSelected = {
            descmax: detalleIngles ? parseInt(detalleIngles.descmax) : 0,
            detaildisplay: product.name,
            id: detalleIngles ? detalleIngles.id : product.id,
            saleprice: product.saleprice,
            
        }
        product.startDateFormat = formatDate(product.startDate, 'en')
        product.endDateFormat = formatDate(product.endDate, 'en')
        product.startTimeFormat = String(timeInitFormat) + ' ' + ampmInit
        product.endTimeFormat = String(timeEndFormat) + ' ' + ampmEnd
        product.currencyCode = product.currency.code
        product.hotelName = product.hotel.name
        product.locationName = product.location.name
        product.description = detalleIngles ? detalleIngles.description : ''
        delete product.eventdetail
        delete product.gallery
        delete product.currency
        delete product.hotel
        delete product.location
        delete product.category
        delete product.productinfo
        if(product.detailSelected && index < 4 ){
            items.push(product) 
        } 
    })

    return items
}

const setParamsGetProducts = ( parametros, idseccanal ) => {
    const { type, language }  = parametros        
    if( language && type === 'products'){
        return { language, idseccanal }
    }else {
        if(type === 'products'){
           return { bs: 1, idseccanal } 
        }
        if(type !== 'products'){
           return { idseccanal }
        }
    }
}

const formatItemProduct = (item, type) => {
    if ( type == 'packages') {
        return formatPackage(item)            
    }
    if ( type == 'products') {
        return formatProduct(item)            
    }

    if ( type == 'events') {
        return formatEvent(item)
    }
}
const formatPackage = (item) => {
    item.categoryName = 'Packages'
    item.modelType = 'package'    
    item.detaildisplay = item.name
    if (item.gallery) {
        item.gallery.forEach((item) => {
            item.key = stringAleatorio()
        })
    }
    if (item.products) {
        item.products.forEach((item) => {
            item.keyItem = stringAleatorio()
        })
    }
    item.detailSelected = {
        cost: item.cost || 0,
        descmax: 0,
        detailDesc: item.name,
        detaildisplay: item.name,
        
        id: item.id,
        saleprice: item.saleprice, 

    }
    return item
}

const formatProduct = (item) => {
    item.categoryName = 'Products'
    item.modelType = 'package'
    
    if (item.gallery) {
        item.gallery.forEach((item) => {
            item.key = stringAleatorio()
        })
    }
    if (item.products) {
        item.products.forEach((item) => {
            item.keyItem = stringAleatorio()
        })
    }
    item.detailSelected = item.detail[0] ? item.detail[0] : null

    delete item.productavailability
    delete item.rulesProduct
    delete item.supplier
    delete item.supplierPromo
    delete item.videolink
    delete item.weblink    

    return item
}

const formatEvent = event => {
    delete event.currency
    event.categoryName = 'Events'
    event.modelType = 'event'
    event.hotelName = event.hotel.name
    event.locationName = event.hotel.name
    event.description = event.name
    event.detailDesc = event.name
    event.detaildisplay = event.name
    const timeInitFormat = event.startTime.slice(0, -3)
    const timeEndFormat = event.endTime.slice(0, -3)
    const ampmInit = (timeInitFormat.slice(0, -3) >= 12) ? "PM" : "AM"
    const ampmEnd = (timeEndFormat.slice(0, -3) >= 12) ? "PM" : "AM"
    event.startDateFormat = formatDate(event.startDate, 'en')
    event.endDateFormat = formatDate(event.endDate, 'en')
    event.startTimeFormat = String(timeInitFormat) + ' ' + ampmInit
    event.endTimeFormat = String(timeEndFormat) + ' ' + ampmEnd
    event.detailSelected = {
        cost: event.cost || 0,
        descmax: 0,
        detailDesc: event.name,
        detaildisplay: event.name,
        id: event.id,
        saleprice: event.saleprice,   
        
    }    
    delete event.endDate
    delete event.endTime
    delete event.startDate
    delete event.startTime
    delete event.location

    return event
}

const generarJWT = (string) => {
    return jwt.sign({ string }, process.env.VUE_APP_JWT_SECRET, {
        expiresIn: '30d'
    })
} 

export {    
    handlerErrors,
    currentDate,
    formatDate,
    formatDateOnly,
    hoursOnly,
    addFormatPay,
    formatBeoProductToSave,
    transfersIsValid,
    transfersIsValidNull,    
    stringAleatorio,
    camposRequeridosPorLLenar,
    toDecimal,
    toJson,
    consoleMsgFinally,    
    makeArrayCategories,
    formatListProducts,
    formatListPackage,
    formatListEvents,
    formatItems,
    setParamsGetProducts,
    formatItemProduct,  
    generarJWT
}