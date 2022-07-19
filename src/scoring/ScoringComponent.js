import { TaskNavigation } from "./TaskNavigation";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import { Errors } from "./Errors";
import { ErrorContext } from "./ErrorContext";

export function ScoringComponent({ criteria, onSubmit, onCancel }) {
  const [data, setData] = useContext(DataContext);
  const [errors, setErrors] = useContext(ErrorContext);

  let required = [];
  const maxPoints = () => {
    let maxPoint = 0;
    criteria["tasks"].map((task) =>
      task["aspects"].map(function (aspect) {
        if (
          aspect["required"] &&
          aspect["maxValue"] &&
          aspect["type"] === "number"
        ) {
          maxPoint += aspect["maxValue"];
          required.push({
            taskName: task["name"],
            aspectName: aspect["name"],
            aspectId: aspect["id"],
          });
        }
        if (
          aspect["required"] &&
          aspect["values"] &&
          aspect["type"] === "list"
        ) {
          let maxValue = 0;
          for (const key in aspect["values"]) {
            if (aspect["values"][key] > maxValue) {
              maxValue = aspect["values"][key];
            }
          }
          maxPoint += maxValue;
          required.push({
            taskName: task["name"],
            aspectName: aspect["name"],
            aspectId: aspect["id"],
          });
        }
      })
    );
    return maxPoint;
  };

  const getRequiredFilledCount = () => {
    let counter = 0;
    data.map(function (info) {
      if (info["required"] && info["type"] !== "boolean") {
        counter++;
      }
    });
    return counter;
  };

  const getGivenPoints = () => {
    let points = 0;
    data.map(function (info) {
      if (info["required"] && info["type"] !== "boolean") {
        points += parseInt(info["inputValue"]);
      }
    });
    return points;
  };

  function submit() {
    const result = { results: [] };
    data.map(function (info) {
      result["results"].push({ id: info.id, value: info.inputValue });
    });
    return result;
  }

  return (
    <>
      <TaskNavigation criteria={criteria} />

      <div className="d-flex justify-content-center mt-2 mb-3 ">
        Kötelező összpontszám: {getGivenPoints()}/{maxPoints()}
      </div>

      <div className="d-flex justify-content-center">
        <Button
          variant="secondary"
          onClick={() => onSubmit(submit())}
          disabled={
            getRequiredFilledCount() !== required.length || errors.length !== 0
          }
        >
          Mentés
        </Button>
        <Button variant="secondary" onClick={() => onCancel(submit())}>
          Mégsem
        </Button>
      </div>
      <Errors required={required}></Errors>
    </>
  );
}
