import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import './SortableItem.css'
const SortableItem = ({ item,setSelectedItems }) => {
    const [isChecked, setIsChecked] = useState(false)
    console.log({item,isChecked})
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, active } = useSortable({ id: item.id, item })
    let initialStyle = {
        transform: CSS.Translate.toString(transform),
        transition: active ? transition : '',
        height: '100%',
    };
    let labelStyle = {}
    if (isChecked) {
        labelStyle = {
            display: 'block'
        }
    }
    const handleOnChange = () => {
        setIsChecked(!isChecked)
        if (!isChecked) {
            console.log(isChecked)
            console.log('Select for delete')
            setSelectedItems((items)=>[...items,item])
        }
        else {
            console.log('unselected')
        }
        console.log(item)
    }

    return (
        <div className="item" ref={setNodeRef}  >
            <div className="image-container"   {...listeners} style={initialStyle}>
                <img draggable='false' src={item.url} width="100%" height="100%" alt="" />
                {isDragging || <span className={`${isChecked ? 'whiten' : 'darken'}`}></span>}
            </div>
            {isDragging || <label style={labelStyle}>
                <input onChange={handleOnChange} type="checkbox" checked={isChecked} />
            </label>}
        </div>
    );
}
export default SortableItem;