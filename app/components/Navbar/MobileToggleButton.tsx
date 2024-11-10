import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface PropsType{
    isMobileBtnClick: boolean;
    setIsMobileBtnClick: Dispatch<SetStateAction<boolean>>;
}

export default function MobileToggleButton(
    {isMobileBtnClick, setIsMobileBtnClick} : PropsType
){
    return (
        <button 
            className="text-center hidden-button d-sm-none d-block"
            onClick={() => {
                if(!isMobileBtnClick){
                    setIsMobileBtnClick(true);
                }
            }}
        >
            <FontAwesomeIcon icon={faSearch}/>
        </button>
    )
}