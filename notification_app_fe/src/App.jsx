import { useEffect } from "react";
import Log from "../../logging_middleware/logger";
import TOKEN from "./token";

function App() {
  useEffect(() => {
    Log("frontend", "info", "page", "Homepage loaded", TOKEN);
  }, []);

  const handleClick = () => {
    Log("frontend", "info", "component", "Test button clicked", TOKEN);
    alert("Button clicked!");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial",
      }}
    >
      <h1>Notification App</h1>
      <p>Logging middleware connected ✅</p>
      <button onClick={handleClick}>Test Button</button>
    </div>
  );
}

export default App;