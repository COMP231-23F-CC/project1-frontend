



Login
RoomList




Booking 


Room Manage


curl -X 'POST' \
'http://192.168.2.10:8306/api/Booking' \
-H 'accept: text/plain' \
-H 'Content-Type: application/json-patch+json' \
-d '{
"id": 0,
"userId": 1,
"roomId": 3,
"startDate": "2023-12-04",
"endDate": "2023-12-09",
"guestName": "string",
"guestPhone": "string",
"totalPrice": 0,
"status": "string",
"remark": "string"
}'
