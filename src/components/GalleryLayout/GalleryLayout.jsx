import { DndContext, closestCenter } from '@dnd-kit/core';
import './GalleryLayout.css'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import initialData from '../../data/data';
import SortableItem from '../SortableItem/SortableItem';
import { useState } from 'react';
import Topbar from '../Topbar/Topbar';
const GalleryLayout = () => {
    const [items, setItems] = useState(initialData)
    const [selectedItems,setSelectedItems]=useState([])
    const handleDragEnd = (event) => {
        const { over, active } = event;
        if (over.id === active.id) return;
        setItems((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id)
            const newIndex = items.findIndex(item => item.id === over.id)
            console.log(oldIndex, newIndex)
            return arrayMove(items, oldIndex, newIndex)
        })
    }

    return (
        <div className='main-layout'>
            <Topbar selectedItems={selectedItems} setItems={setItems}></Topbar>
            <div className="gallery-layout">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={items} strategy={rectSortingStrategy} >
                    <div className='items-container'>
                        {
                            items.map((item, index) => <SortableItem key={index} setSelectedItems={setSelectedItems} item={item}></SortableItem>)
                        }
                    </div>
                </SortableContext>
            </DndContext>
        </div>
        </div>
    )
}
export default GalleryLayout;