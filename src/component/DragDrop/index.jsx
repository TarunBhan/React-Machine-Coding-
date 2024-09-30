import React, { createRef, useEffect, useRef, useState } from "react";
import NotesItem from "./Notes";

const DragDrop = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      notes: "hey there is tarun"
    },
    {
      id: 2,
      notes: "Hey My Name is Bhan Singh"
    }
  ])
  //purana wala logic
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage?.getItem('notes')) || []
    const updatedNotes = notes.map((item) => {
      const saveItem = savedNotes.find((ss) => ss.id === item.id)
      if (saveItem) return { ...item, position: saveItem?.position }
      else {
        const position = determinePos()
        return { ...item, position }
      }
    })
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  }, [])

  const notesRef = useRef([])

  // const handleDragStart = (e, note) => {
  //   const { id, position } = note
  //   const noteRef = notesRef.current?.[id]?.current;
  //   console.log('noteRef', noteRef);
  //   const rect = noteRef?.getBoundingClientRect()
  //   const offSetX = e.clientX - rect.left;
  //   const offSetY = e.clientY - rect.top;
  //   const startPos = position;

  //   const handleMouseMove = (e) => {
  //     const newX = e.clientX - offSetX
  //     const newY = e.clientY - offSetY
  //     noteRef.style.left = `${newX}px`;
  //     noteRef.style.top = `${newY}px`;

  //   }

  //   const handleMouseUp = () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //     const finalRect = noteRef.getBoundingClientRect();
  //     const newPosition = { x: finalRect.left, y: finalRect.top };
  //     if (false) {

  //     } else {
  //       updatedNewNotes(id, newPosition)
  //     }
  //   }

  //   document.addEventListener('mousemove', handleMouseMove)
  //   document.addEventListener('mouseup', handleMouseUp)
  // }
  const handleDragStart = (e, note) => {
    const { id, position } = note;
    const noteRef = notesRef?.current[id]?.current;
    const rect = noteRef?.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = position;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkOverlap(id)) {
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updatedNewNotes(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkOverlap = (id) => {
    const currentNoteRef = notesRef.current[id].current;
    const currentRect = currentNoteRef.getBoundingClientRect();
    return notes.some((note) => {
      if (note.id === id) return false;
      const otherNoteRef = notesRef.current[note.id].current;
      const otherRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );
      console.log('overlap', overlap);
      return overlap;
    })
  }



  const updatedNewNotes = (id, newpos) => {
    const updatedNotesPos = notes.map((item) => item.id === id ? { ...item, position: newpos } : item)
    setNotes(updatedNotesPos);
    localStorage.setItem('notes', JSON.stringify(updatedNotesPos))

  }

  //generate the random Height and width
  const determinePos = () => {
    const maxX = window.innerWidth - 250
    const maxY = window.innerHeight - 250
    return { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) }
  }

  return <div>
    {notes.map((item) => {
      return <NotesItem key={item.id} content={item} ref={
        notesRef.current[item.id]
          ? notesRef.current[item.id]
          : (notesRef.current[item.id] = createRef())
      }
        onMouseDown={(e) => handleDragStart(e, item)}
      />
    })}
  </div>;
};
export default DragDrop;
