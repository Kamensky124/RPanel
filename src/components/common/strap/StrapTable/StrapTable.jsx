import React from 'react';
import {NavLink} from "react-router-dom";
import {Table} from 'reactstrap';

/*
 * state props: 
 * firstItemId  -   айди первой строки таблицы(остальные увеличиваются по инкременту) 
 * fields       -   поля таблицы(объект типа {"поле": "заголовок", ...})
 * items        -   строки таблицы(массив объектов)
 */

const StrapTable = (props) => {
    
    // Метод создания абстрактной строки таблицы
    let makeTableRow = (item, i, getColumn, getFirstColumn) => {
        let columns = [];                
        for(var key in props.fields) {
            columns.push(
                getColumn(key, item)                
            );            
        }               
    
        makeCustomItems(item, columns, props.customItems);
        
        return (         
                <tr>
                    {getFirstColumn(i)}
                    {columns}                    
                </tr>                                       
        );
    }
    
    // Метод создания кастомных элементов
    let makeCustomItems = (item, columns, customItems) => {
        customItems.forEach(function(customItem, i, arr) {            
            let customItemContent = '';
            if(item) {
                if(customItem.navLink) {            
                    customItemContent = 
                        <NavLink to={customItem.navLink.path+item.id}>
                            {customItem.content}
                        </NavLink>;       
                }
                else if(customItem.callBack) {
                    customItemContent = 
                        <div onClick={() => {customItem.callBack(item.id)} }>
                            {customItem.content}
                        </div>;
                }
                else {
                    customItemContent = customItem.content;
                }
                customItemContent = <td>{customItemContent}</td>;
            }
            else {
                customItemContent = <th>{customItem.title}</th>
            }      
            
            columns.splice(customItem.position, 0, customItemContent);            
        });       
    }
    
    // Получить столбец таблицы с ключом key для элемента item
    let getTableColumn = (key, item) => {
        return (            
            <td>{item[key]}</td>            
        );
    }
    // Получить заголовок таблицы с ключом key
    let getHeaderColumn = (key) => {
        return (
            <th>{props.fields[key].title}</th>
        );
    }    
    // Получить первый столбец таблицы с номером i
    let getFirstTableColumn = (i) => {
        // Если айди первой строки задан явно, берем его. В противном случае "0"
        let firstItemId = props.firstItemId ? props.firstItemId : 0;
    
        return (
            <th scope="row">{firstItemId + i + 1}</th>
        );
    }
    // Получить первый заголовок таблицы
    let getFirstHeaderColumn = () => {
        return (
            <th>#</th>
        );
    }    
        
    return (
        <Table {...props} >
            <thead>              
                {
                    makeTableRow(null, 0, getHeaderColumn, getFirstHeaderColumn)
                }                                  
            </thead>
            <tbody>
                {props.items && props.items.length
                ?
                    props.items.map(
                        (item, i) => makeTableRow(item, i, getTableColumn, getFirstTableColumn)
                    )
                : props.items !== null && props.emptyPage
                }
            </tbody>
        </Table>
    );
}

export default StrapTable;