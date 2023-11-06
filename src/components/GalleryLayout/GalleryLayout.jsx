import { DndContext, closestCenter } from '@dnd-kit/core';
import './GalleryLayout.css'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import initialData from '../../data/data';
import SortableItem from '../SortableItem/SortableItem';
import { useState } from 'react';
import Topbar from '../Topbar/Topbar';

const GalleryLayout = () => {
    const [items, setItems] = useState(initialData)
    const [selectedItems, setSelectedItems] = useState([])
    /* 
    On drag end over and active element change their position
     */
    const handleDragEnd = (event) => {
        const { over, active } = event;
        if (over.id === active.id) return;
        setItems((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id)
            const newIndex = items.findIndex(item => item.id === over.id)
            return arrayMove(items, oldIndex, newIndex)
        })
    }

    return (
        <div className='main-layout'>
            <Topbar selectedItems={selectedItems} setSelectedItems={setSelectedItems} setItems={setItems}></Topbar>
            <div className="gallery-layout">
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <SortableContext items={items} strategy={rectSortingStrategy} >
                        <div className='items-container'>
                            {
                                items.map((item, index) => <SortableItem index={index} key={index} item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} ></SortableItem>
                                )
                            }
                            <div className='upload-image'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                </div>
                                <button className='upload-btn'>Add image</button>
                            </div>
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}
export default GalleryLayout;