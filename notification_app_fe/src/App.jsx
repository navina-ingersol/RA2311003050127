import { useEffect, useState } from "react";
import TOKEN from "./token";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    fetch("http://20.207.122.201/evaluation-service/notifications", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch((err) => console.log(err));
  }, []);

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const priority = [...notifications]
    .sort((a, b) => {
      const scoreA =
        weights[a.Type] * 1000000000 + new Date(a.Timestamp).getTime();
      const scoreB =
        weights[b.Type] * 1000000000 + new Date(b.Timestamp).getTime();
      return scoreB - scoreA;
    })
    .slice(0, 10);

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  const markViewed = (id) => {
    if (!viewed.includes(id)) {
      setViewed([...viewed, id]);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Campus Notifications</h1>

      <h2>Priority Inbox (Top 10)</h2>
      {priority.map((item) => (
        <div
          key={item.ID}
          style={{
            background: "#fff8dc",
            border: "1px solid orange",
            padding: 12,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <b>{item.Type}</b> — {item.Message}
        </div>
      ))}

      <h2>Filter</h2>
      <button onClick={() => setFilter("All")}>All</button>{" "}
      <button onClick={() => setFilter("Placement")}>Placement</button>{" "}
      <button onClick={() => setFilter("Result")}>Result</button>{" "}
      <button onClick={() => setFilter("Event")}>Event</button>

      <h2>All Notifications</h2>
      {filtered.map((item) => (
        <div
          key={item.ID}
          onClick={() => markViewed(item.ID)}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 12,
            borderRadius: 10,
            background: viewed.includes(item.ID) ? "#f1f1f1" : "#e8f5ff",
            cursor: "pointer",
          }}
        >
          <h3>
            {item.Type} {viewed.includes(item.ID) ? "(Viewed)" : "(New)"}
          </h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
