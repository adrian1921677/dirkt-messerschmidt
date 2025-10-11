-- Fix booking status from REQUESTED to PENDING
UPDATE "Booking" 
SET status = 'PENDING' 
WHERE status = 'REQUESTED';
