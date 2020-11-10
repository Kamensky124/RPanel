import {instance} from '../instance';

import {setupCache} from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

export const usersAPI = {
    getUsers(page = 1) {
        return instance.get(`customers?page=${page}`, {adapter: cache.adapter}).then(response => {              
            return response.data;                
        });        
    },
    searchUsers(page = 1, login = '') {
        return instance.get(`customers/search?page=${page}&login=${login}`).then(response => {              
            return response.data;                
        });        
    },    
    getUserCard(userId = 1) {
        return instance.get(`customers/${userId}`).then(response => {              
            return response.data;                
        });        
    },
    deleteUser(userId) {
        return instance.delete(`customers/${userId}`).then(response => {            
            return response.status;                
        });        
    },
    updateUserCard(user) {
        return instance.put(`customers/${user.id}`, user).then(response => {            
            return response.status;                
        });        
    },
    createUserCard(user) {
        return instance.post(`customers`, user).then(response => {            
            return response;            
        });        
    }    
}