import {instance, setAuthHeader} from '../instance';

export const authAPI = {
    getAuthData() {        
        return instance.get(`auth/profile`)
            .then(response => {            
                return response.data;                
            })
            .catch(error => {return null;});        
    },
    login(data) {
        return instance.post(`auth/login`, data)
            .then(response => {            
                setAuthHeader(response.data.access_token);            
                return response.data;            
            })
            .catch(error => {return {user: null, error}});              
    },
    logout() {
        return instance.post(`auth/logout`)
            .then(response => {            
                setAuthHeader('');            
                return {user: null};            
            })
            .catch(error => {return {user: null};});              
    },
    register(data) {
        return instance.post(`auth/register`, data)
            .then(response => {                
                return response.data;            
            })
            .catch(error => {return {user: null, error}});              
    },    
}