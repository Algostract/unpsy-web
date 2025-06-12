<p align="center">
  <img src="./public/logo.png" lt="Logo" width="65" />
<p>

# UnPsy

<p align="center">
  <a href="https://uptime.betterstack.com/?utm_source=status_badge">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10kju.svg" alt="uptime status">
  </a>
</p>

![Landing](public/previews/landing.webp)

> A psychoanalytical web tool for diverse assessments and automatic analysis with a built-in scanner

- 📦 SSR
- 🖼️ OG Tags
- 🚀 PWA
- ✋ Push Notification
- 🌙 Light/Dark Mode
- 🗂️ CMS (Notion)
- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- ⚡️ API Route Caching
- 📐 Analytics

# Scales

| Scale   | Created | Tested | Published |
| ------- | ------- | ------ | --------- |
| EPQ     | ✓       | ✓      | ✓         |
| EPQ-R   | ✓       | ✓      | ✓         |
| JTCI    | ✓       | ✓      | ✓         |
| MACI    | ✓       | ✓      | ✓         |
| MCMI    | ✓       | ✓      | ✓         |
| MMPI-RF | ✓       | ✓      | ✓         |
| MPQ     | ✓       | ✓      | ✓         |
| TCI     | ✓       | ✓      | ✓         |
| SCL-90R | ✓       | ✓      | ✓         |
| DSMD-A  | ✓       | ✓      | ✓         |
| DSMD-C  | ✓       | ✓      | ✓         |
| JEPQ    | -       | -      | -         |
| LEYTON  | -       | -      | -         |
| BAI     | -       | -      | -         |

## How to Deploy

1. Initialize Swarm on the Manager Node

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

2. Join Worker Nodes to the Swarm

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

3. Check Node Status

```bash
docker node ls
```

4. Create a docker volume

```bash
docker volume create \
  --name unpsy_static \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/unpsy/static \
  --opt o=bind
```

5. Use Docker Stack to deploy multi-container application

```bash
docker stack deploy --compose-file docker-compose.prod.yml unpsy
```

6. Scale service

```bash
docker service scale unpsy_app=2
```

7. Verify

```bash
docker service ls
docker service ps unpsy_app
```
