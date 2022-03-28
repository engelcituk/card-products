import Vue from 'vue'

export async function loginWeb(context, token){ 
    const user = { idUser: null, name : null, lastname : null, canalventa : null, puntosventa : null }          
    try {        
        const response =  await Vue.axios({
            method: 'POST', 
            headers: {
                'Authorization': `Token ${token}` 
            },           
            url:'/weblogin/',
            data: {}
        })        
        //desestructuración de lo que me regresa en el respose payload      
        const {id, name, lastname, canalventa, puntosventa, seccioncanalventa } = response && response.data
       
            //ordeno pv en orden alfabetico        
            puntosventa.sort(function (a, b) { if (a.name > b.name) { return 1 } if (a.name < b.name) { return -1 } return 0 })
            user.idUser = id
            user.name = name
            user.lastname = lastname
            // user.fp = fp         
            user.canalventa = canalventa         
            user.puntosventa = puntosventa  
            user.sectionCanal = seccioncanalventa       
            delete user.password //del user elimino el password, para guardarlo en el state                   
            return {ok: true, user, message: 'Login exitoso'}                                                                                        
    } catch (error) {  
        if (error.response) {
            if (error.response.statusText == 'Unauthorized') {
                return {ok: false, user: null, message:'Token inválido.'} 
            }
            if (error.response.statusText == 'Bad Request') {                
                return {ok: false, user: null, message:'Token inválido.'}                            
            }
        }
                                                                                             
    } finally {
        console.log('loginWeb terminada')   
    }
}