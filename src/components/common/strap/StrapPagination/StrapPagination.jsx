import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

/*
 * state props:
 * itemsCount       -   общее количество элементов
 * itemsPerPage     -   количество элементов на одной странице
 * currentPage      -   номер текущей страницы
 * showPagesCount   -   количество одновременно разрешенных к показу страниц
 * 
 * dispatch props:
 * currentPageChange    -   колбэк изменения номера текущей страницы
 */

const StrapPagination = (props) => {
    // Количество страниц(PaginationItem) в пагинации
    let pagesCount = Math.ceil(props.itemsCount / props.itemsPerPage);
    
    // Массив PaginationItem(ссылок с номерами страниц)
    let pages = [];
    
    // Вмещаются ли все страницы пагинации в количество одновременно разрешенных к показу
    let isFitted = pagesCount <= props.showPagesCount;
    // Располагается ли текущая страница в начале диапазона страниц, разрешенных к показу
    let isOnFitsBegin = (props.currentPage + props.showPagesCount) <= pagesCount;
    // Входит ли номер текущей страницы пагинации в диапазон номеров страниц,
    // разрешенных к показу в данный момент(относительно текущей страницы)
    let isInFit = (pageNumber) => {
        return isOnFitsBegin    
        ? (pageNumber >= props.currentPage && 
           pageNumber < (props.currentPage + props.showPagesCount))
        : (pageNumber > (pagesCount - props.showPagesCount));
    }
    
    // Страница-заглушка
    let mokePage = (mokeContent) => 
        <PaginationItem className="disabled">
            <PaginationLink href="#">{mokeContent}</PaginationLink>
        </PaginationItem>;
    
    // Показывать страницу-заглушку "..." в начале пагинации
    if(!isFitted && props.currentPage !== 1) {
        pages.push(mokePage('...'));
    }
    // Формирование массива pages[]
    for(let i=1; i <= pagesCount; i++) {
        if(isFitted || (!isFitted && isInFit(i))) {    
            pages.push(
                <PaginationItem className={i === props.currentPage && 'active'} >
                    <PaginationLink href="#" onClick={(e) => {props.currentPageChange(i)}} >
                      {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

    }
    // Показывать страницу-заглушку "..." в конце пагинации
    if(!isFitted && isOnFitsBegin) {
        pages.push(mokePage('...'));
    }    
    
    // Маркер дизактивации ссылок "В начало" и "Предыдущая"
    let prevDisabled = (props.currentPage === 1 && 'disabled');
    // Маркер дизактивации ссылок "В конец" и "Следующая"
    let nextDisabled = (props.currentPage === pagesCount && 'disabled');
    
    return (
        <Pagination aria-label="Page navigation">
            {mokePage(1)}
            
            <PaginationItem className={prevDisabled} >
                <PaginationLink first href="#" 
                    onClick={(e) => {props.currentPageChange(1)}} />
            </PaginationItem>
            
            <PaginationItem className={prevDisabled} >
                <PaginationLink previous href="#" 
                    onClick={(e) => {props.currentPageChange(props.currentPage - 1)}} />
            </PaginationItem>
            
            {pages}            
            
            <PaginationItem className={nextDisabled} >
                <PaginationLink next href="#" 
                    onClick={(e) => {props.currentPageChange(props.currentPage + 1)}} />
            </PaginationItem>
            
            <PaginationItem className={nextDisabled} >
                <PaginationLink last href="#" 
                    onClick={(e) => {props.currentPageChange(pagesCount)}} />
            </PaginationItem>
            
            {pagesCount > 0 && mokePage(pagesCount)}
        </Pagination>
    );
}

export default StrapPagination;