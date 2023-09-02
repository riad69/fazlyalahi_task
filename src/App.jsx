import React, { useEffect, useState } from "react";
import "./App.css";
import SingleRow from "./Components/SingleRow";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function DraggableRow({ id, index, moveRow, ...rest }) {
  const [, ref] = useDrag({
    type: "ROW",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "ROW",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <tr ref={(node) => ref(drop(node))} {...rest}>
      {rest.children}
    </tr>
  );
}

function App() {
  const [projectData, setProjectData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("project.json")
      .then((res) => res.json())
      .then((data) => setProjectData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = projectData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(projectData.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const moveRow = (fromIndex, toIndex) => {
    const newData = [...currentData];
    const [movedRow] = newData.splice(fromIndex, 1);
    newData.splice(toIndex, 0, movedRow);
    setProjectData((prevData) => {
      const newDataOrder = [...prevData];
      newDataOrder.splice(startIndex + fromIndex, 1);
      newDataOrder.splice(startIndex + toIndex, 0, movedRow);
      return newDataOrder;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="bg-gray-800 text-red-400">#</th>
            <th className="bg-gray-800 text-white">Name</th>
            <th className="bg-gray-800 text-white">Project Link</th>
            <th className="bg-gray-800 text-white">Project ID</th>
            <th className="bg-gray-800 text-white">Project Budget</th>
            <th className="bg-gray-800 text-white">Project Value</th>
            <th className="bg-gray-800 text-white">Created</th>
            <th className="bg-gray-800 text-white">Created By</th>
            <th className="bg-gray-800 text-white">Bidding Delay Time</th>
            <th className="bg-gray-800 text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((single_data, index) => (
            <DraggableRow
              id={index}
              index={index}
              moveRow={moveRow}
              key={index}
            >
              <SingleRow single_data={single_data} index={index}></SingleRow>
            </DraggableRow>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className={`page-button px-2 bg-gray-300 m-2 ${
            currentPage === 1 ? "disabled" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`page-button px-2 bg-gray-300 m-2 ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </DndProvider>
  );
}
export default App;