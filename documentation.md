# Documentation






# Best Practices
  ### Database Table Design
      Use field prefix for fiels ( prefer 3 letters eg:- usr_name)
      Standerd Field names should not contain field prefix
      Primary key should start with'_'  eg:- '_id'
      Foreign key should end with '_'   eg:- 'owner_'




## Response related:-
   ### status codes
        200 OK
        400 Bad request
        401 Unauthorized
        404 Not Found
        500 Server Error;

### sending data
    success --> res.json({data,rest..., message:'text')
    failure --> res.status(code).send({errors:{obj},error:"msg"})