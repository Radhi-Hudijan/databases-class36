1. What columns violate 1NF?

The column that violate 1NF is :
food_code
food_description

they violate rule number 1 that All data must be atomic (every column should only contain a single value) .

2. What entities do you recognize that could be extracted?
   the entities are : food , venue, memebers and dinners .

3. Name all the tables and columns that would make a 3NF compliant solution.

At first , I will create a table for each entity and its relations:

members => member_id(PK) ,member_name
members_Addresses => id(PK),member_address,member_id(FK)

dinners => dinner_id(PK),dinner_date

venue => venue_code(PK), venue_description

food => food_code(PK), food_description

Junction Table:
Reservation Table => id(PK),member_id(FK),dinner_id(FK),venue,id(FK)
FoodDinner Table => id(PK),dinner_id(FK),food_code(FK)
