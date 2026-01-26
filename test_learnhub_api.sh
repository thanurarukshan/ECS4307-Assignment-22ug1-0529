# LearnHub API Testing Script

#!/bin/bash

echo "====================================="
echo "  LEARNHUB EDTECH LMS API TESTS"
echo "====================================="
echo

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
API_URL="http://localhost:5000"

echo -e "${BLUE}1. Testing Root Endpoint${NC}"
curl -s $API_URL/
echo -e "\n"

echo -e "${BLUE}2. Get All Courses${NC}"
curl -s $API_URL/api/courses | python3 -m json.tool | head -50
echo -e "\n"

echo -e "${BLUE}3. Register New Student${NC}"
REGISTER_RESPONSE=$(curl -s -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testStudent","email":"test@learnhub.com","password":"password123"}')
echo $REGISTER_RESPONSE | python3 -m json.tool
TOKEN=$(echo $REGISTER_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))" 2>/dev/null)
echo -e "\n"

echo -e "${BLUE}4. Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@learnhub.com","password":"password123"}')
echo $LOGIN_RESPONSE | python3 -m json.tool
TOKEN=$(echo $LOGIN_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))" 2>/dev/null)
echo -e "\n"

if [ -n "$TOKEN" ]; then
    echo -e "${BLUE}5. Get User Profile (Authenticated)${NC}"
    curl -s -H "Authorization: Bearer $TOKEN" $API_URL/api/auth/profile | python3 -m json.tool
    echo -e "\n"

    echo -e "${BLUE}6. Request Enrollment in Course${NC}"
    curl -s -X POST $API_URL/api/enrollments \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"courseId":1,"paymentAmount":0}' | python3 -m json.tool
    echo -e "\n"

    echo -e "${BLUE}7. Get My Enrollments${NC}"
    curl -s -H "Authorization: Bearer $TOKEN" $API_URL/api/enrollments/my-enrollments | python3 -m json.tool
    echo -e "\n"

    echo -e "${BLUE}8. Get Notifications${NC}"
    curl -s -H "Authorization: Bearer $TOKEN" $API_URL/api/notifications | python3 -m json.tool | head -30
    echo -e "\n"
fi

echo -e "${BLUE}9. Get Course by ID${NC}"
curl -s $API_URL/api/courses/1 | python3 -m json.tool | head -30
echo -e "\n"

echo -e "${BLUE}10. Filter Courses by Category${NC}"
curl -s "$API_URL/api/courses?category=Web%20Development" | python3 -m json.tool | head -40
echo -e "\n"

echo -e "${BLUE}11. Filter Courses by Level${NC}"
curl -s "$API_URL/api/courses?level=beginner" | python3 -m json.tool | head -40
echo -e "\n"

echo -e "${GREEN}====================================="
echo "  ALL TESTS COMPLETED!"
echo "=====================================${NC}"
