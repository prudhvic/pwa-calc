import "./App.css";
import { calculateActions } from "./store/operationSlice";
import { useSelector, useDispatch } from "react-redux";
let symbols = [
  "C",
  "(",
  ")",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "x",
  "=",
];

function App() {
  let dispatch = useDispatch();
  let resultList = useSelector((state) => state.resultList);

  const result = useSelector((state) => state.result);
  console.log(result);
  let handleClick = (val) => {
    // console.log(resultList.includes(["+", "-", ".", "/", "*", "%"].join("")));
    if (
      val === "+" ||
      val === "-" ||
      val === "%" ||
      val === "/" ||
      val === "*" ||
      val === "."
    ) {
      let val2 = resultList[resultList.length - 1];
      if (val2 === val) {
        return;
      } else if (
        (resultList.includes("+") ||
          resultList.includes("/") ||
          resultList.includes("*") ||
          resultList.includes(".") ||
          resultList.includes("%") ||
          resultList.includes("-")) &&
        (val === "-" ||
          val === "+" ||
          val === "." ||
          val === "%" ||
          val === "/" ||
          val === "*")
      ) {
        return;
      }
    }

    if (val === "x" || val === "X") {
      dispatch(calculateActions.clearLastItem());
      return;
    }
    if (val === "c" || val === "C") {
      dispatch(calculateActions.clearItem());
      return;
    }
    if (val === "=") {
      dispatch(calculateActions.resultDeclare());
      return;
    }
    dispatch(calculateActions.calculate(val));
  };
  return (
    <div className="App">
      <main>
        <section className="result-section">
          <div className="result">{result}</div>
        </section>
        <section>
          {symbols.map((symbol) => (
            <button onClick={() => handleClick(symbol)} key={symbol}>
              {symbol}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
