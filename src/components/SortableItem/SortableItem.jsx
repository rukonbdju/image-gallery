import { useSortable } from "@dnd-kit/sortable"; //react hooks from `DND kit` library
import { CSS } from "@dnd-kit/utilities"; // css style from `DND kit` library
import { useEffect, useState } from "react";
import './SortableItem.css'; //import css style

const SortableItem = ({ index, item, setSelectedItems, selectedItems }) => {
    /* 
        useSortable is a react hooks from the `DND kit` library. It takes an object of {unique id} as an argument and return an object of {attributes, listeners, setNodeRef, transform, transition, isDragging, active, over} and so on. See `DND kit` documentation here https://dndkit.com/
     */
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, active, over } = useSortable({ id: item.id, item })

    //State for item is selected or not. Initialy set to false. 
    const [isChecked, setIsChecked] = useState(false)

    // initial style from useSortable hook
    let initialStyle = {
        transform: CSS.Translate.toString(transform),
        transition: active ? transition : '',
        height: '100%',
    };

    //checking this item is already selected or not with two dependancies and setIschecked acoording to condition
    useEffect(() => {
        const isAlreadySelected = selectedItems?.find(selectedItem => selectedItem.id === item.id);
        if (selectedItems.length > 0 && isAlreadySelected) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [selectedItems, item])
    /* 
    Event listener in checkbox element. If checkbox is checked this item will be selected for delete if unchecked item will be
    removed from the selected items.  
    */
    const handleOnChange = () => {
        if (!(isChecked)) {
            setSelectedItems((items) => [...items, item])
        }
        else {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id))
        }
    }

    return (
        <div className="item" style={(!index) ? { gridRow: 'span 2', gridColumn: 'span 2' } : {}} ref={setNodeRef} >
            <div className="image-container" {...attributes}  {...listeners} style={initialStyle}>
                <img draggable='false' src={item.url} width="100%" height="100%" alt="" />
                {isDragging || <span className={isChecked ? 'whiten' : 'darken'}></span>}
            </div>
            {(over?.id) ? <></> : <label style={isChecked?{display:"block"}:{}}>
                <input onChange={handleOnChange} type="checkbox" checked={isChecked} />
            </label>}
        </div>
    );
}

export default SortableItem;