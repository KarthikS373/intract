Tech used
 - Kafka
 - Redis
 - Postgres


http://localhost:5001/api/notifications/send
{
  "message": "Hello world"
}
Only sent by admin

```bash
Notification sent: {"notifications":{"0":23}}
intract-notifications-dev-server-1     | [2024-09-27T13:01:37.660Z] info: Received notification: Hello world
intract-notifications-dev-server-1     | Received notification: { message: 'Hello world' }
intract-notifications-dev-server-1     | [2024-09-27T13:01:37.661Z] info: Broadcasting notification to all users
```