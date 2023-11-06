import './Topbar.css'
const Topbar = ({setItems,selectedItems,setSelectedItems}) => {
    console.log(selectedItems.length)
    const handleDeleteItems = () => {
        setItems((items)=>{
            return items.filter(item=>!(selectedItems.find(selectedItem=>selectedItem.id==item.id)))
        })
        setSelectedItems([])
    }
    return (
        <div className="topbar-conatainer">
            <div className="topbar">
                {!selectedItems.length? <h3>Gallery</h3> : <><div className="topbar-left">
                    <h3>{selectedItems.length} {selectedItems.length>1 ?'files':'file'} selected</h3>
                </div>
                    <div className="topbar-right">
                        <button onClick={handleDeleteItems} className="delete-btn">Delete {selectedItems.length>1 ?'files':'file'}</button>
                    </div></>}
            </div>
        </div>
    )
}

export default Topbar;