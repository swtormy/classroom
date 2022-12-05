import React from 'react'
import { useState } from 'react'

const NewReorder = () => {
    const [cardList, setCardList] = useState([
        { id: 1, order: 4, text: 'item1' },
        { id: 2, order: 3, text: 'item2' },
        { id: 3, order: 2, text: 'item3' },
        { id: 4, order: 1, text: 'item4' },
    ])
    const [currentCard, setCurrentCard] = useState(null)

    let movingElement
    let isDraggingStarted = false
    let placeholder
    const initialMovingElementPageXY = {
        x: 0,
        y: 0,
        set: (movingElement) => {
            const rect = movingElement.getBoundingClientRect();
            initialMovingElementPageXY.x = rect.x + window.scrollX;
            initialMovingElementPageXY.y = rect.y + window.scrollY;
        },
    }
    const shifts = {

        shiftX: 0,
        shiftY: 0,
        set: (clientX, clientY, movingElement) => {
            shifts.shiftX = clientX - movingElement.getBoundingClientRect().left
            shifts.shiftY = clientY - movingElement.getBoundingClientRect().top
        }
    }
    const moveAt = (element, pageX, pageY) => {
        element.style.left = pageX - shifts.shiftX + 'px'
        element.style.top = pageY - shifts.shiftY + 'px'

    }

    const createPlaceholder = () => {
        // console.log("I'm created!");
        placeholder = document.createElement('div')
        placeholder.classList.add('rounded-lg')
        placeholder.classList.add('h-10')
        placeholder.classList.add('w-20')
        movingElement.parentNode.insertBefore(placeholder, movingElement)
    }
    const onMouseMove = (event) => {
        if (!isDraggingStarted) {
            isDraggingStarted = true;
            createPlaceholder();
            Object.assign(movingElement.style, {
                position: "absolute",
                zIndex: 1000,
                left: `${initialMovingElementPageXY.x}px`,
                top: `${initialMovingElementPageXY.y}px`,
            });
        }
        moveAt(movingElement, event.pageX, event.pageY);
    }
    const setMovingElement = (e) => {
        movingElement = e.target
    }


    function dragStartHandler(e, card) {
        e.preventDefault();
        // console.log('drag', card);

        setMovingElement(e);
        shifts.set(e.clientX, e.clientY, movingElement);
        initialMovingElementPageXY.set(movingElement);
        document.addEventListener("mousemove", onMouseMove);
        movingElement.onmouseup = dropHandler;
    }
    function dragLeaveHandler(e, card) {
        e.target.style.background = ''
        
    }

    function dragEndHandler(e, card) {
        
    }
    function dragOverHandler(e, card) {
        e.preventDefault()
        e.target.style.background = 'lightgray'

        
    }
    function dropHandler(e, card) {
        Object.assign(movingElement.style, {
            position: "static",
            left: "auto",
            top: "auto",
            zIndex: "auto",
            transform: "none",
        });
        document.removeEventListener("mousemove", onMouseMove);
        isDraggingStarted = false;
        placeholder && placeholder.parentNode.removeChild(placeholder);
        movingElement.onmouseup = null;
        movingElement = null;
        console.log(e.target);
    }
    return (
        <>
            <div className='container mx-auto px-4 flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-sm'>
                <div className='max-w-xl text-2xl font-bold pb-2 flex text-white select-none' >

                    {cardList.map(card => (
                        <div
                            key={card.text + '_id'}
                            className={'card mx-2 px-2'}
                            onDragStart={(e) => dragStartHandler(e, card)}
                            onDragLeave={(e) => dragLeaveHandler(e, card)}
                            onDragEnd={(e) => dragEndHandler(e, card)}
                            onDragOver={(e) => dragOverHandler(e, card)}
                            onDrop={(e) => dropHandler(e, card)}
                            draggable={true}
                        >
                            {card.text}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NewReorder