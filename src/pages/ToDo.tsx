import { useEffect, useState } from "react";
import { getAllTasks } from "../utils/apiUtils";

function Products() {
  const [tasks, setTasks] = useState();

  return (
    <div className="inline-block w-screen p-16">
      <p className="text-gray-300 font-bold text-2xl">Overview of the tasks</p>
      <p className="text-gray-300 font-bold mt-7 text-2xl">Due Today</p>
    </div>
  );
}

export default Products;
