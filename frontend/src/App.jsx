  import { useState } from "react";
  import axios from "axios";

  function App() {

    const [prompt, setPrompt] = useState("");
    const [logs, setLogs] = useState([]);
    const [response, setResponse] = useState(null);

    const sendPrompt = async () => {

      try {

        const result = await axios.post(
          "http://localhost:3000/api/ai/chat",
          {
            prompt
          }
        );
        console.log(result.data);
        setResponse(result.data);
        await loadLogs();
        console.log("AFTER LOAD:", logs);

      } catch (error) {

        console.error(error);

      }
    };

    const loadLogs = async () => {

    const result = await axios.get(
      "http://localhost:3000/api/files/logs"
    );
    console.log("LOGS:", result.data);
    setLogs(result.data);

  };

  const getRiskColor = (level) => {

  switch (level) {

    case "LOW":
      return "green";

    case "MEDIUM":
      return "orange";

    case "HIGH":
      return "red";

    case "CRITICAL":
      return "darkred";

    default:
      return "black";
  }
};

const totalRequests = logs.length;

const allowedRequests = logs.filter(
  (log) => log.decision === "ALLOW"
).length;

const deniedRequests = logs.filter(
  (log) => log.decision === "DENY"
).length;

    return (
      <div style={{ padding: "20px" }}>

        <h1>AI Gatekeeper Dashboard</h1>

        <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  }}
>

  <div>
    <h3>Total Requests</h3>
    <p>{totalRequests}</p>
  </div>

  <div>
    <h3>Allowed</h3>
    <p>{allowedRequests}</p>
  </div>

  <div>
    <h3>Denied</h3>
    <p>{deniedRequests}</p>
  </div>

</div>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter command..."
          style={{
            width: "400px",
            padding: "10px"
          }}
        />

        <button
          onClick={sendPrompt}
          style={{
            marginLeft: "10px",
            padding: "10px"
          }}
        >
          Send
        </button>

        <hr />

        <h2>AI Decision</h2>

{response && (

  <div>

    <p>
      <strong>Action:</strong>{" "}
      {response.decision?.action}
    </p>

    <p>
      <strong>Path:</strong>{" "}
      {response.decision?.filePath}
    </p>

  </div>

)}


<h2>Risk Assessment</h2>

{response?.risk && (

  <div>

   <span
  style={{
    color: getRiskColor(
      response.risk.level
    ),
    fontWeight: "bold"
  }}
>
  {response.risk.score}/100
</span>

    <p>
  <strong>Level:</strong>{" "}

  <span
    style={{
      color: getRiskColor(
        response.risk.level
      ),
      fontWeight: "bold"
    }}
  >
    {response.risk.level}
  </span>

</p>

    <p>
      <strong>Reason:</strong>{" "}
      {response.risk.reasons.join(", ")}
    </p>

  </div>

)}

<h2>Gatekeeper Result</h2>

{response && (

  <div>

    <p>
      <strong>Status:</strong>{" "}
      {response.result?.success
        ? "ALLOW"
        : "DENY"}
    </p>

    <p>
      <strong>Message:</strong>{" "}
      {response.result?.message}
    </p>

  </div>

)}
        <h2>Logs</h2>

  <table border="1" cellPadding="10">

    <thead>
      <tr>
        <th>Action</th>
        <th>Path</th>
        <th>Decision</th>
      </tr>
    </thead>

    <tbody>

      {logs.map((log, index) => (

        <tr key={index}>
          <td>{log.action}</td>
          <td>{log.path}</td>
          <td>{log.decision}</td>
        </tr>

      ))}

    </tbody>

  </table>

      </div>
    );
  }

  export default App;