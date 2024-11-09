'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LadingSearchButton(){
    return(
        /* From Uiverse.io by 0xnihilism */ 
        <div className="input__container">
            <div className="shadow__input"></div>
            <button className="input__button__shadow">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
                type="text"
                name="search-input"
                className="input__search"
                placeholder="영상 url을 입력하세요!"
            />
        </div>

    )
}