# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.
### Basic
## Get Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| participantId        | 10 digit number | 2071567765 |
| meetingId        | 10 digit number | 9087700997 |
| page              |integer|  0|
| pageSize         |integer   | 10|

### Response Body

```json
{
    "result": [
        {
            "meetingId": number (ten digits big integer),
            "availabilityId": number (ten digits big integer),
            "participantId": number (ten digits big integer),
            "startTime": string (four characters (HHMM)),
            "endTime": string (four characters (HHMM)),

        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/data?participantId=2071567765&meetingId=9087700997
```

### Sample Response

```json
{
    "result": [
        {
            "meetingId": 9087700997,
            "availabilityId": 1222430402,
            "participantId": 2071567765,
            "startTime": "1000",
            "endTime": "1200",

        }
    ]
}
```

### Sample Error

```json
{
	"error": "Internal Server Error",
	"code": 500
}
```











## Get Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/data |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| participantId        | 10 digit number | 2071567765 |
| meetingId        | 10 digit number | 9087700997 |
| page              |integer|  0|
| pageSize         |integer   | 10|

### Response Body

```json
{
    "result": [
        {
            "meetingId": number (ten digits big integer),
            "unavailabilityId": number (ten digits big integer),
            "participantId": number (ten digits big integer),
            "startTime": string (four characters (HHMM)),
            "endTime": string (four characters (HHMM)),

        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /advance/data?participantId=2071567765&meetingId=9087700997
```

### Sample Response

```json
{
    "result": [
        {
            "meetingId": 9087700997,
            "unavailabilityId": 3456789012,
            "participantId": 2071567765,
            "startTime": "1000",
            "endTime": "1200",

        }
    ]
}
```

### Sample Error

```json
{
	"error": "Internal Server Error",
	"code": 500
}
```