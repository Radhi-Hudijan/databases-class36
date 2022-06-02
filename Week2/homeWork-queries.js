// To delete Database if exist
const dropDatabase = `DROP DATABASE IF EXISTS week2`;

//To Create Database
const createDatabase = `CREATE DATABASE week2`;

// to use database
const useDatabase = `USE week2`;

// create author table
const createAuthorTable = `CREATE TABLE IF NOT EXISTS authors(
    author_no INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m','f')
    )`;

// add mentor column to the table
const addMentorColumn = `ALTER TABLE authors 
    ADD mentor INT 
`;

const exerciseOneQueries = [
  dropDatabase,
  createDatabase,
  useDatabase,
  createAuthorTable,
  addMentorColumn,
];

// Exercise 2
// creating research paper table
const createResearchPapersTable = `CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT PRIMARY KEY AUTO_INCREMENT,
    paper_title TEXT ,
    conference VARCHAR(255),
    publish_date DATE)`;

// Creating JOINT table
const createPaperAuthorTable = `CREATE TABLE IF NOT EXISTS Paper_Author(
    author_no INT NOT NULL ,
    paper_id INT NOT NULL,
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id) ,
    FOREIGN KEY (author_no) REFERENCES authors(author_no) ,
    PRIMARY KEY(paper_id,author_no))`;

//insert values to tables

const authorsToInsert = `INSERT INTO authors (author_name,university,date_of_birth,h_index,gender,mentor)
VALUES ('S.Ali','UTM','1988-12-22','11','m','13'),
('Renee Stewart','University of Hawai','1988-12-22','9','f','4'),
('Jessica Anderson','University of Chicago','1888-02-16','8','f','14'),
('Jassika Manis','Rice University','2000-01-01','10','m','8'),
('Candice Bolton','Yale University','1970-09-07','7','m','7'),
('Susan Gavin','Boston College','1870-08-11','5','f','1'),
('Katelyn Ogilvy','University of Michigan','1999-01-30','6','f','1'),
('Harry Middleton','University of Vermont','2001-03-31','6','m','2'),
('Luke Garcia','Clark University','1996-05-29','14','m','3'),
('Molly Clifton','George Washington University','1988-02-26','2','f','5'),
('Mina Vallins','Northwestern University','1900-03-20','6','f','7'),
('Boris Rixon','UM','1966-03-02','7','m','11'),
('Johnny Locke','IIUM','1970-07-07','5','m','4'),
('Adela Potts','Tanga University','1880-12-10','9','f','5'),
('Emmanuelle Vinton','UTP','1973-09-19','9','f','9')`;

const papersToInsert = `INSERT INTO research_Papers (paper_title,conference,publish_date)
VALUES ('Microcontroller Based Automatic','Collision','2020-12-10'),
('Unborn victims of violence','Collision','2012-11-03'),
('Partial birth abortion','Web Summit','2011-08-02'),
('Discrimination in education','Startup Grind Global','2010-07-03')
,('Policing schools','Summit','2009-08-04'),
('Permit corporal punishment','TEDWomen','2008-09-05'),
('Education and funding','South by Southwest ','2007-10-06'),
('Grade inflation','Hawkefest','2006-11-07'),
('Home schooling','The Human Gathering','2005-12-08'),
('Standardized tests','TOPO Summit','2004-01-12'),
('Low carbohydrate vs. low fat diets','Ernst Young Strategic Growth','2003-02-10'),
('Alternative medicine','SF Blockchain Week','2002-03-11'),
('Alzheimers disease','Pulse','2001-04-14'),
('Anorexia','Mobile World Congress','2000-05-15'),
('Downs syndrome','Internet of Things World','1999-06-16'),
('Autism','TEDx','1998-07-17'),
('Birth control','TechCrunch Disrupt','1997-12-18'),
('Bulimia','Consensus','1997-08-19'),
('Depression','Wisdom','1998-08-19'),
('Dietary supplements','Consumer Electronics','1996-10-20'),
('Dyslexia',' European Symposium','1995-11-21'),
('Exercise and fitness',' International Symposium','2019-12-22'),
('Fad diets',' International Conference on Compiler','2018-01-23'),
('Fast food',' European Conference on Object-Oriented Programming','2016-02-24'),
('Heart disease','Automated Software Engineering','2015-12-25'),
('Obesity','Fundamental Approaches to Software Engineering','2012-02-26'),
('Organic foods','CONCUR','2022-03-10'),
('Prescription drugs','DEBS','2023-02-02'),
('Vegetarianism','ICDCS - IEEE','2000-07-07'),
('Schizophrenia','IPDPS - IEEE ','1990-01-01')`;

const paperAuthorDataToInsert = `INSERT INTO Paper_Author(author_no,paper_id)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (1, 16), (2, 17), (3, 18), (4, 19), (5, 20), (6, 21), (7, 22), (8, 23), (9, 24), (10, 25), (11, 26), (12, 27), (13, 28), (14, 29), (15, 30); `;

const addForeignKeyToMentorColumn = `ALTER TABLE authors 
    ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no)
`;
const exerciseTwoQueries = [
  createResearchPapersTable,
  createPaperAuthorTable,
  authorsToInsert,
  papersToInsert,
  paperAuthorDataToInsert,
  addForeignKeyToMentorColumn,
];

// Exercise 3
// printing authors and their corresponding mentors
const authorsWithMentors = `SELECT a.author_name AS Author, b.author_name AS Mentor FROM authors a JOIN authors b ON a.mentor = b.author_no`;
//prints all columns of authors and their published paper_title
const authorsWithPublishedPaper = `SELECT authors.author_name,authors.date_of_birth,authors.h_index,authors.gender, authors.university, research_Papers.paper_title 
FROM authors 
LEFT JOIN Paper_Author  
ON authors.author_no = Paper_Author.Author_no 
LEFT JOIN research_Papers 
ON research_Papers.paper_id = Paper_Author.paper_id`;

// Exercise 4
const AllResearchPapersWithAuthors = `SELECT research_Papers.paper_title AS Total_Papers,COUNT(author_name) AS Total_Authors
FROM authors 
JOIN Paper_Author 
ON authors.author_no = Paper_Author.Author_no 
JOIN research_Papers 
ON research_Papers.paper_id = Paper_Author.paper_id 
GROUP BY research_Papers.paper_title`;

const papersByFemaleAuthors = `SELECT COUNT(research_Papers.paper_title) AS papers_by_FemaleAuthors
FROM research_Papers 
JOIN Paper_Author 
ON research_Papers.paper_id = Paper_Author.paper_id  
JOIN authors 
ON authors.author_no = Paper_Author.Author_no 
WHERE authors.gender = 'f'`;

const indexAveragePerUniversity = `SELECT AVG(authors.h_index) AS Average_Index 
FROM authors
GROUP By university`;

const paperPerUniversity = `SELECT COUNT(research_Papers.paper_title) AS Paper_Per_University,authors.university 
FROM research_Papers 
JOIN Paper_Author 
ON research_Papers.paper_id = Paper_Author.paper_id 
JOIN authors 
ON authors.author_no = Paper_Author.Author_no 
GROUP BY authors.university`;

const maxMinIndexPerUniversity = `SELECT MIN(h_index) AS Min_Index, MAX(h_index) AS Max_Index,university
FROM authors 
GROUP BY university`;

const exerciseQueries = [
  authorsWithMentors,
  authorsWithPublishedPaper,
  AllResearchPapersWithAuthors,
  papersByFemaleAuthors,
  indexAveragePerUniversity,
  paperPerUniversity,
  maxMinIndexPerUniversity,
];

module.exports = {
  exerciseOneQueries,
  exerciseTwoQueries,
  exerciseQueries,
};
