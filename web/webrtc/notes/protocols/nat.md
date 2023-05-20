# NAT

Network Address Translation

Allows multiple devices inside a private network to access the internet through a single public IP.

--- Work in progress ---

## NAT Traversal Method

**One to One NAT (Full-Cone NAT)**

- Packets to external `IP:Port` on the router always maps to internal `IP:Port` without exception

**Address restricted NAT**

- Packets to external `IP:Port` on the router always maps to internal `IP:Port` as long as source address from packet matches the tables (regardless of port)
- Allows if we have communicated with this host before

**Port restricted NAT**

- Packets to external `IP:Port` on the router always maps to internal `Ip:Port` as long as source address and port from packet matches the tables
- Allows if we communicated with this `host:port` before

**Symmetric NAT**

- Allows only if the full pair matches
