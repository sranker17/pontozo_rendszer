import { Table } from "react-bootstrap";
import { Aspect } from "./Aspect";

export function Task({ task }) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">Szempontok megnevezése</th>
            <th className="text-center">Elért pontszám / Maximális pontszám</th>
            <th className="text-center">Szempont leírása</th>
          </tr>
        </thead>
        <tbody>
          {task["aspects"].map((aspect) => (
            <Aspect
              key={aspect["id"]}
              aspect={aspect}
              taskName={task["name"]}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
