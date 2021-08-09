import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  rowCountTable,
  themesTable,
  themesArrayTable,
  updateThemesArray,
} from './TableSlice';
import styles from './Table.module.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { DroppableContainer } from "./DroppableContainer";

export function LeftTable() {

    const dispatch = useDispatch();
    const themesArray = useSelector(themesArrayTable);
    const count = useSelector(rowCountTable);
    const themes = useSelector(themesTable);
    
    const themeDragTitles = (row, index, snapshot) => {
      if (row.row === 0) {
      return (
        <Draggable key={index} draggableId={index.toString()} index={index}>
        {(provided) => (
          <div
          {...provided.draggableProps}
          ref={provided.innerRef}>
            <td
            //  key={row} 
            className={styles.leftRow}
            {...provided.dragHandleProps}
            style={{backgroundColor: row.theme.color}}>
              {row.theme.title} {index}
            </td>
            <DragDropContext onDragEnd={rowDragEnd()}>
            <Droppable droppableId={"droppableRows"}>
          {(provided, snapshot) => (
            <div
            ref={provided.innerRef} 
            {...provided.droppableProps}>
            {themesArray.map((row, rowIndex) => (
              themeDragRows(row, index, rowIndex, snapshot)
            ))}
            {provided.placeholder}
            </div>
          )}
            </Droppable>
            </DragDropContext>
          </div>
        )}
      </Draggable>
      )
    }
    }

    const themeDragRows = (row, index, rowIndex, snapshot) => {
      if (row.row !== 0 && index < rowIndex && rowIndex < (index + 5) ) {
        // console.log("row:", row.row, "index:", index, "rowIndex:", rowIndex)
        return (
          <React.Fragment>
            <Draggable key={rowIndex} draggableId={rowIndex.toString()} index={rowIndex}>
            {(provided) => (
            <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
              <td
              //  key={row} 
              className={styles.leftRow} style={{width: "100%"}}>
                {row.row}
              </td>
            </div>
            )}
          </Draggable>
          </React.Fragment>
        )
      }
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
    
      // change background colour if dragging
      background: isDragging ? "lightgreen" : "grey",
    
      // styles we need to apply on draggables
      ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? "lightblue" : "lightgrey",
      // padding: grid,
      width: "100%",
    });

    const themeDragEnd = () => {
      // 
    }
    const rowDragEnd = () => {
      // 
    }

    useEffect(() => {
        dispatch(updateThemesArray({}));
    }, [themes])

    return (
        <div className={styles.leftTableContainer}>
          <DragDropContext onDragEnd={themeDragEnd()}>
            <Droppable droppableId={"droppableThemes"}>
        {(provided, snapshot) => (
          <table
          className={styles.leftTable}
          ref={provided.innerRef} 
          // style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}>
            <thead>
              <tr>
                <th className={styles.leftHeader}>
                    test1
                </th>
              </tr>
              <tr>
                <th className={styles.leftHeader}>
                    test1
                </th>
              </tr>
            </thead>
            <tbody>
            {themesArray.map((row, index) => (
              themeDragTitles(row, index, snapshot)
            ))}
            {provided.placeholder}
            </tbody>
            </table>
        )}
          </Droppable>
        </DragDropContext>
        </div>
    );
  }
  