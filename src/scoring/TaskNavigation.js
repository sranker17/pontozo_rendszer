import { Tabs, Tab } from "react-bootstrap";
import { Task } from "./Task";
import { DataContext } from "./DataContext";
import { useContext } from "react";

export function TaskNavigation({criteria}) {
  const [data, setData] = useContext(DataContext);

  const setTitle = (taskName, aspectCount) => {
    let counter = 0;
    for (const idx in data) {
      if (data[idx].taskName === taskName) {
        counter++;
      }
    }
    return `${taskName} ${counter}✔${aspectCount - counter}✖/${aspectCount}`;
  };
  
  return (
    <>
      {criteria["tasks"].length !== 0 ? (
        <Tabs defaultActiveKey={criteria["tasks"][0]["name"]} className="mb-3">
          {criteria["tasks"].map((task) => (
            <Tab
              key={task["name"]}
              eventKey={task["name"]}
              title={setTitle(task["name"], task["aspects"].length)}
            >
              <Task task={task} ></Task>
            </Tab>
          ))}
        </Tabs>
      ) : (
        <div>Nincsenek feladatok</div>
      )}
    </>
  );
}
