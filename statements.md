# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT



SupEr's Answers:

```sql
INSERT INTO meetingInfo VALUES
(9087700997,1222430402,2071567765,'1000','1200'), 
(9977867543,1344657745,2933453368, '1130','1400'), 
(9455354555, 1255467354, 2333980007, '1200','1400'),
(9755465766,1765900542, 2099003455,'0900','1130')
```
## SELECT with Filtering and Pagination

SupEr's Answers:

```sql
SELECT * FROM meetingInfo WHERE
startTime >= '1000' AND endTime <= '1500'
LIMIT 2 OFFSET 1;
```