# Realtime and ambulance workflow

## Socket.IO authorization

The Socket.IO handshake carries the access token. The server validates signature, issuer, audience, account status, and email verification. Connected sockets join `user:<id>` and `role:<role>` rooms. Joining `request:<id>` requires ownership or an authorized DRIVER/ADMIN/DEVELOPER role.

## Request state machine

```text
REQUESTED → ASSIGNED → EN_ROUTE_PICKUP → ARRIVED_PICKUP
          → EN_ROUTE_HOSPITAL → COMPLETED
```

Active states may transition to `CANCELLED` only where allowed. The server rejects out-of-order transitions. Driver acceptance and status updates emit `ambulance:status` to the request and owner rooms. Authorized driver location updates emit `ambulance:location`.

## Simulation

The user-facing demo path creates a record with `simulation: true`. Only that path can be advanced by its owner, uses the clearly labeled `HG-SIM-01` unit, and does not claim dispatch, GPS, or a real ETA. Non-simulation requests require a real operations/driver integration.

## Production scaling

The current Socket.IO server is functional for one Node instance. Multi-instance deployment requires a shared Socket.IO adapter, durable event/state storage, authenticated driver devices, real geolocation consent, dispatch integration, observability, and retry/reconciliation logic.

