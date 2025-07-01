#!/bin/bash

# Load environment variables
set -a
source .env
set +a

ATLAS_API="https://cloud.mongodb.com/api/atlas/v1.0"
ACCESS_LIST_ENDPOINT="$ATLAS_API/groups/$PROJECT_ID/accessList"

# 1. Get current IP
CURRENT_IP=$(curl -s https://api.ipify.org)
echo "Current IP: $CURRENT_IP"

# 2. Add current IP to whitelist
echo "Adding current IP to MongoDB Atlas..."
curl -s -u "$PUBLIC_KEY:$PRIVATE_KEY" \
  --digest \
  -H "Content-Type: application/json" \
  -X POST "$ACCESS_LIST_ENDPOINT" \
  --data "[{\"ipAddress\": \"$CURRENT_IP\", \"comment\": \"$COMMENT\"}]"

echo "Added $CURRENT_IP to access list."

# 3. Fetch current access list
echo "Fetching current access list..."
ACCESS_LIST=$(curl -s -u "$PUBLIC_KEY:$PRIVATE_KEY" \
  --digest \
  "$ACCESS_LIST_ENDPOINT")

# 4. Extract and sort IPs with comment "Auto-whitelisted IP"
IP_ENTRIES=$(echo "$ACCESS_LIST" | jq -c '.results[] | select(.comment=="'"$COMMENT"'")' | jq -s 'sort_by(.created)')

TOTAL_IPS=$(echo "$IP_ENTRIES" | jq length)
echo "Total auto-whitelisted IPs: $TOTAL_IPS"

# 5. Delete oldest IPs if we exceed MAX_IPS
if [ "$TOTAL_IPS" -gt "$MAX_IPS" ]; then
  DELETE_COUNT=$((TOTAL_IPS - MAX_IPS))
  echo "Deleting $DELETE_COUNT old IP(s)..."

  echo "$IP_ENTRIES" | jq -c ".[:$DELETE_COUNT]" | while read entry; do
    OLD_IP=$(echo "$entry" | jq -r '.ipAddress')
    echo "Deleting $OLD_IP..."
    curl -s -u "$PUBLIC_KEY:$PRIVATE_KEY" \
      --digest \
      -X DELETE "$ACCESS_LIST_ENDPOINT/$OLD_IP"
  done
else
  echo "No cleanup needed."
fi

echo "Done."