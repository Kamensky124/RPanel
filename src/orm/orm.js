export const usersFields = 
    {
        login:        {title: 'Логин',      type: "text"},
        password:     {title: 'Пароль',     type: "text"}, 
        email:        {title: 'Почта',      type: "text"},
        updated_at:   {title: 'Обновлено',  type: "text"},
    };
    
export const userCardFields = 
    {
        login:        {title: 'Логин',  type: "text"},
        password:     {title: 'Пароль', type: "text"}, 
        email:        {title: 'Почта',  type: "text"},        
        latitude:     {title: 'Широта',     type: "text"},        
        longitude:    {title: 'Долгота',    type: "text"},        
    };    
    
export const loginFields = 
    {
        email:        {title: 'Логин(email)', type: "text"},
        password:     {title: 'Пароль',       type: "password"},         
    };
    
export const registerFields = 
    {
        name:                     {title: 'Имя',                  type: "text"},
        email:                    {title: 'Логин(email)',         type: "text"}, 
        password:                 {title: 'Пароль',               type: "password"},
        password_confirmation:    {title: 'Подтверждение пароля', type: "password"},
    };    