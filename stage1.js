const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuaTA5ODIwQHNybWlzdC5lZHUuaW4iLCJleHAiOjE3Nzc3MDQ4NTMsImlhdCI6MTc3NzcwMzk1MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImZlNWVmMTQzLTJlOGEtNGRmMS1iZGU3LTFlYzRhOTVhOGM1MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5hdmluYSBpbmdlcnNvbCIsInN1YiI6ImYzOGEyMmQ2LTExMWYtNDdhYS05ODBmLTY2MmE2MmVjZDgzNiJ9LCJlbWFpbCI6Im5pMDk4MjBAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJuYXZpbmEgaW5nZXJzb2wiLCJyb2xsTm8iOiJyYTIzMTEwMDMwNTAxMjciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJmMzhhMjJkNi0xMTFmLTQ3YWEtOTgwZi02NjJhNjJlY2Q4MzYiLCJjbGllbnRTZWNyZXQiOiJkcXFlalFuR1ZSY0d2cmNlIn0.xYsE0XErywvhLJFbMvbXz72JjbkYl5Pu381sxRlf5Ws";

async function getTop10Notifications() {
  try {
    const response = await fetch(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const data = await response.json();
    const notifications = data.notifications;

    const weights = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    notifications.sort((a, b) => {
      const scoreA =
        weights[a.Type] * 1000000000 + new Date(a.Timestamp).getTime();
      const scoreB =
        weights[b.Type] * 1000000000 + new Date(b.Timestamp).getTime();

      return scoreB - scoreA;
    });

    const top10 = notifications.slice(0, 10);

    console.table(top10);
  } catch (error) {
    console.error(error);
  }
}

getTop10Notifications();