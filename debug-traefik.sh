#!/bin/bash

echo "=== Checking Traefik Configuration ==="
echo ""

echo "1. Checking if containers are running:"
docker ps --filter "name=pmv" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "2. Checking Traefik routers:"
docker exec dokploy-traefik traefik healthcheck 2>/dev/null || echo "Traefik healthcheck not available"
echo ""

echo "3. Checking backend container labels:"
docker inspect pmv-monorepo --format '{{range $key, $value := .Config.Labels}}{{$key}}={{$value}}{{println}}{{end}}' | grep traefik | grep backend
echo ""

echo "4. Testing backend directly (should work):"
curl -I http://localhost:5010/api-docs 2>/dev/null | head -5
echo ""

echo "5. Testing through Traefik (this is failing):"
curl -I https://pmv-docs-api.nibrasoft.com/api-docs 2>/dev/null | head -5
echo ""

echo "6. Checking Traefik logs for errors:"
docker logs dokploy-traefik --tail=50 2>/dev/null | grep -i "error\|pmv-docs"
echo ""

echo "=== Diagnostic Complete ==="
