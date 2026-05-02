# Stage 1 – Priority Inbox for Campus Notifications

## Problem
Students receive many notifications and may miss important ones.

We need to always show the **Top 10 unread important notifications**.

Priority depends on:

1. **Weight**
- Placement = Highest priority
- Result = Medium priority
- Event = Lowest priority

2. **Recency**
- Newer notifications should rank higher.

---

## Approach
I assigned weights:

- Placement = 3
- Result = 2
- Event = 1

Then I calculate priority using:

Priority Score = Weight + Recency

Notifications are sorted in descending order.

Then top 10 are selected.

---

## Efficient Maintenance for New Notifications
To maintain Top 10 efficiently when new notifications arrive:

Use a **Min Heap (Priority Queue)** of size 10.

Logic:
- Insert new notification
- If heap size > 10 → remove lowest priority notification
- Heap always stores best 10 notifications

Time Complexity:
- Insert → O(log 10)
- Very efficient

---

## API Usage
Notifications are fetched using protected API endpoint:

GET /evaluation-service/notifications

Authorization token is used in header.

---

## Implementation
Implemented using JavaScript.

Used:
- Fetch API
- Sorting
- Weight mapping
- Top 10 selection