import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Lines = () => {
    const [cardList, setCardList] = useState([
        { id: 1, order: 3, side: 'left', text: 'Левый вариант 1', merge: 5 },
        { id: 2, order: 2, side: 'left', text: 'Левый вариант 2', merge: 0 },
        { id: 3, order: 1, side: 'left', text: 'Левый вариант 3', merge: 0 },
        { id: 4, order: 3, side: 'right', text: 'Правый вариант 1', merge: 0 },
        { id: 5, order: 2, side: 'right', text: 'Правый вариант 2', merge: 1 },
        { id: 6, order: 1, side: 'right', text: 'Правый вариант 3', merge: 0 }
    ])

    const [hideElement, setElements] = useState(false)
    let movingElement
    let isDraggingStarted = false
    let placeholder
    let elementBelow
    let currentDroppable = null
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
    const isAbove = (nodeA, nodeB) => {
        // Returns the bounding rectangle of nodes
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
    }
    const getElementCoordinates = (node, searchCoordsBy) => {
        // Returns left and top coordinates of node
        const rect = node.getBoundingClientRect();
        return {
            top:
                searchCoordsBy == "by-center"
                    ? rect.top + rect.height / 2
                    : rect.top + 10,
            left: rect.left + rect.width / 2,
        };
    };
    const getElementBelow = (movingElement, searchCoordsBy) => {
        // Get element below movingElement now
        const movingElementCenter = getElementCoordinates(
            movingElement,
            searchCoordsBy
        );
        movingElement.hidden = true;
        let elementBelow = document.elementFromPoint(
            movingElementCenter.left,
            movingElementCenter.top
        );
        movingElement.hidden = false;
        return elementBelow;
    };

    const createPlaceholder = () => {
        // console.log("I'm created!");
        placeholder = document.createElement('div')
        placeholder.classList.add('rounded-lg')
        placeholder.classList.add('h-11')
        placeholder.classList.add('w-44')
        placeholder.classList.add('px-5')
        placeholder.classList.add('py-2.5')
        placeholder.classList.add('mr-2')
        placeholder.classList.add('mb-2')
        movingElement.parentNode.insertBefore(placeholder, movingElement)
    }
    const onMouseMove = (event) => {
        if (!isDraggingStarted) {
            isDraggingStarted = true;
            createPlaceholder();
            Object.assign(movingElement.style, {
                position: "absolute",
                zIndex: 1,
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
        // console.log(card);

        setMovingElement(e);
        shifts.set(e.clientX, e.clientY, movingElement);
        initialMovingElementPageXY.set(movingElement);
        document.addEventListener("mousemove", onMouseMove);
        movingElement.onmouseup = dropHandler;
        

        // e.target.classList.add('hold')
        // setTimeout(() => e.target.classList.add('invisible'))
    }
    function dragLeaveHandler(e, card) {

    }
    function dragCaptureHandler(e, card) {

        // setMovingElement(e);
        // shifts.set(e.clientX, e.clientY, movingElement);
        // initialMovingElementPageXY.set(movingElement);
        // document.addEventListener("mousemove", onMouseMove);
        // setMovingElement(e);
    }
    function dragEndHandler(e, card) {
        // e.target.classList.remove('hold', 'invisible')
    }
    function dragExit(e, card) {
        console.log(card);
        // e.target.classList.remove('hold', 'invisible')
    }
    function dropCaptureHandler(e, card) {
        console.log(e.clientX, e.clientY);
        // e.target.classList.remove('hold', 'invisible')
    }
    function dragOverHandler(e, card) {
        // e.preventDefault()

    }
    function dropHandler(e, card) {
        elementBelow = getElementBelow(movingElement, "by-center");
        var elementOne
        var elementTwo
        var newCardList = []
        cardList.map(el => {
            if(el.text===e.path[0].innerHTML){
                elementOne = el
            }
            if(el.text===elementBelow.innerHTML){
                elementTwo = el
            }
        })
        cardList.map(el => {
            if(el.id!==elementOne.id && el.id!==elementTwo.id){
                newCardList.push(el)
            }
        })
        setCardList(newCardList);
        
        // e.preventDefault()
        // if (!isDraggingStarted) {
        //     document.removeEventListener("mousemove", onMouseMove);
        //     movingElement.onmouseup = null;
        //     return;
        // }
        // placeholder.parentNode.insertBefore(movingElement, placeholder);

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
        // console.log(card);
    }

    useEffect(() => {
        // console.log(cardList);
    }, [])
    return (
        <div className='container mx-auto px-4 flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-sm'>
            <div className='max-w-xl text-2xl font-bold pb-2 flex text-white select-none' >
                <div className='flex flex-col'>
                    {cardList &&
                        cardList.map(card => {
                            if (card.side === 'left')
                                return <button
                                    onDragStart={(e) => dragStartHandler(e, card)}
                                    onDragLeave={(e) => dragLeaveHandler(e, card)}
                                    onDragEnd={(e) => dragEndHandler(e, card)}
                                    onDragOver={(e) => dragOverHandler(e, card)}
                                    onDrop={(e) => dropHandler(e, card)}
                                    onDragCapture={(e) => dragCaptureHandler(e, card)}
                                    onDropCapture={(e) => dropCaptureHandler(e, card)}
                                    onDragExit={(e) => dragExit(e, card)}
                                    type="button" key={card.text} draggable={true} className="h-11 w-44 text-white cursor-grab bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{card.text}</button>
                        })}
                </div>
                <div className='ml-20 flex flex-col'>
                    {cardList &&
                        cardList.map(card => {
                            if (card.side === 'right')
                                return <button
                                    onDragStart={(e) => dragStartHandler(e, card)}
                                    onDragLeave={(e) => dragLeaveHandler(e, card)}
                                    onDragEnd={(e) => dragEndHandler(e, card)}
                                    onDragOver={(e) => dragOverHandler(e, card)}
                                    onDrop={(e) => dropHandler(e, card)}
                                    onDragCapture={(e) => dragCaptureHandler(e, card)}
                                    onDropCapture={(e) => dropCaptureHandler(e, card)}
                                    onDragExit={(e) => dragExit(e, card)}
                                    type="button" key={card.text} draggable={true} className="h-11 w-44 text-white cursor-grab bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{card.text}</button>
                        })}
                </div>
            </div>
        </div>
    )
}

export default Lines