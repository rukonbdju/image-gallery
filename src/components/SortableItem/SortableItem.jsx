import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import './SortableItem.css'
const SortableItem = ({ item, setSelectedItems, selectedItems, isLarge }) => {
    const nodeRef = useRef(null);
    const [isDraggedOverFirst, setIsDraggedOverFirst] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, active, over } = useSortable({ id: item.id, item })
    const isOverFirstImage = over && over.id === item.id && isLarge;
    let initialStyle = {
        transform: CSS.Translate.toString(transform),
        transition: active ? transition : '',
        height: '100%',
    };

    const firstItemStyle = {
        gridRowStart: 'span 2',
        gridColumnStart: 'span 2',
    }

    const isAlreadySelected = selectedItems?.find(selectedItem => selectedItem.id === item.id);
    const handleOnChange = (e) => {
        console.log(isAlreadySelected)
        if (!isAlreadySelected) {
            setSelectedItems((items) => [...items, item])
        }
        else{
            setSelectedItems(selectedItems.filter(selectedItem=>selectedItem.id!==item.id))
        }
    }

    useEffect(()=>{
        if(selectedItems.length>0){
            const isSelected = selectedItems?.find(selectedItem => selectedItem.id === item.id);
        }
    },[])

    return (
        <div className="item" style={isLarge ? { gridRow: 'span 2', gridColumn: 'span 2' } : {}}  ref={(node) => {
            nodeRef.current = node;

            setNodeRef(node);
        }} >
            <div className="image-container" {...attributes}  {...listeners}  style={initialStyle}>
                <img draggable='false' src={item.url} width="100%" height="100%" alt="" />
                {isDragging || <span className={(selectedItems.length>0 &&isAlreadySelected)?'whiten':'darken'}></span>}
            </div>
            {isDragging ||<label>
                <input onChange={handleOnChange} type="checkbox" checked={(selectedItems.length>0 &&isAlreadySelected)&&true}/>
            </label>}
            

        </div>
    );
}
export default SortableItem;