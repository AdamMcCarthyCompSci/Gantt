// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   rowCountTable,
//   themesTable,
//   themesArrayTable,
//   updateThemesArray,
// } from './TableSlice';
// import styles from './Table.module.css';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// export function DraggableContainer({row}) {
//     const dispatch = useDispatch();
//     const themesArray = useSelector(themesArrayTable);
//     const count = useSelector(rowCountTable);
//     const themes = useSelector(themesTable);

//     const leftTableRow = (theme, row, index) => {
//         console.log(theme, row, index);
//         if (row == 0) {
//           return (
//             <Draggable draggableId={row.toString()} index={row}>
//             {(provided) => (
//             <tr
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             innerRef={provided.innerRef}>
//               <td
//               //  key={row} 
//               className={styles.leftRow} style={{backgroundColor: theme.color}}>
//                 {theme.title}
//               </td>
//             </tr>)}
//             </Draggable>
//           )
//         }
//         else {
//           return (
//             <Draggable draggableId={row.toString()} index={row}>
//             {(provided) => (
//             <tr
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             innerRef={provided.innerRef}>
//               <td
//               //  key={row} 
//               className={styles.leftRow}>
//                 {index.title}
//               </td>
//               </tr>)}
//             </Draggable>
//           )
//         }
//       }

//     return (
//         <Draggable draggableId={row.row.toString()} index={row.row}>
//         {(provided) => (
//         <tr
//         {...provided.draggableProps}
//         {...provided.dragHandleProps}
//         innerRef={provided.innerRef}>
//           <td
//           //  key={row} 
//           className={styles.leftRow} style={{backgroundColor: row.theme.color}}>
//             {row.theme.title}
//           </td>
//         </tr>)}
//         </Draggable>
//     )
// }