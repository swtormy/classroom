import React, { useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Rearrange = () => {


    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    function handleOnDragEnd(result){
        const items = Array.from(list)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setList(items)
    }

    return (
        <>
            <div className='container mx-auto px-4 flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-sm'>
                < div className='text-2xl font-bold pb-2' >
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='list'>
                            {(provided) => (
                                <ul
                                    className='text-white select-none cursor-pointer'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {list.map((name, index) => {
                                        return (
                                            <Draggable key={name} draggableId={name+index} index={index}>
                                                {(provided) => (
                                                    <li 
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >{name}</li>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>


        </>
    );
}

export default Rearrange