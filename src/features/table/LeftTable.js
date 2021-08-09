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
          // className={styles.themeContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}>
            <td
            //  key={row} 
            className={styles.leftRow}
            {...provided.dragHandleProps}
            style={{backgroundColor: row.theme.color}}>
              {row.theme.title} {index}
            </td>
            {themesArray.map((row, rowIndex) => (
              themeDragRows(row, index, rowIndex, snapshot)
            ))}
          </div>
        )}
      </Draggable>
      )
    }
    }

    const themeDragRows = (row, index, rowIndex, snapshot) => {
      if (row.row !== 0 && index < rowIndex && rowIndex < (index + 5) ) {
        console.log("row:", row.row, "index:", index, "rowIndex:", rowIndex)
        return (
          <React.Fragment>
            <div>
              <td
              //  key={row} 
              className={styles.leftRow} style={{width: "100%"}}>
                {row.row}
              </td>
            </div>
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

    const DNDdragEnd = () => {
      // 
    }

    useEffect(() => {
        dispatch(updateThemesArray({}));
        console.log(themesArray);
    }, [themes])

    return (
        <div className={styles.leftTableContainer}>
          <DragDropContext onDragEnd={DNDdragEnd()}>
            <Droppable droppableId={"droppable"}>
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
  