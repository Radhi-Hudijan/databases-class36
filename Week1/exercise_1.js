const mysql = require("mysql");
const DBLogin = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const connection = mysql.createConnection(DBLogin);

// Creating Tables

const createInviteeTable = `CREATE TABLE IF NOT EXISTS Invitee(
     invitee_no INT PRIMARY KEY AUTO_INCREMENT,
     invitee_name VARCHAR(255),
     invited_by VARCHAR(255))`;

const createRoomTable = `CREATE TABLE IF NOT EXISTS Room(
     room_no INT PRIMARY KEY AUTO_INCREMENT,
     room_name VARCHAR(255),
     floor_number INT)`;

const createMeetingTable = `CREATE TABLE IF NOT EXISTS Meeting(
     meeting_no INT PRIMARY KEY AUTO_INCREMENT,
     meeting_title VARCHAR(255),
     starting_time TIME,
     ending_time TIME,
     room_no INT ,
     FOREIGN KEY(room_no) REFERENCES Room(room_no)
     )`;

const tables = [createInviteeTable, createRoomTable, createMeetingTable];

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected");
  }
});

// To delete Database if exist
connection.query("DROP DATABASE IF EXISTS meetup", (error) => {
  if (error) throw error;
});

connection.query("CREATE DATABASE meetup", (error) => {
  if (error) throw error;
});

connection.query("use meetup", (error) => {
  if (error) throw error;
});

// To create tables
const createTables = (connection, query) => {
  connection.query(query, (error) => {
    if (error) throw error;

    console.log(`Table created`, query);
  });
};

tables.forEach((table) => {
  createTables(connection, table);
});

// inserted rows

const inviteeData = `INSERT INTO Invitee (invitee_name, invited_by)
VALUES ('Radhi', 'Ali') ,('Ahmed', 'Salem'),('Mo', 'Li'),('Ahmed 2', 'Ali'),('Khalid', 'Mo')`;

const roomDetails = `INSERT INTO Room (room_name, floor_number)
  VALUES ('Lounge Room', '2') ,('wedding', '4'),('casa', '7'),('VIP room', '15'),('Quick Room', '1')`;

const meetingTable = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
  VALUES ('Business', '12:30:00','01:30:00',1) ,('Travel Dep', '03:30:00','05:30:00',4),('Discussion', '17:30:00','20:30:00',3),('standup', '08:00:00','10:00:00',2),('Submission', '20:45:00','23:45:00',5)`;

const dataToInsert = [inviteeData, roomDetails, meetingTable];

const insert = (connection, data) => {
  connection.query(data, (error) => {
    if (error) throw error;

    console.log(`Data inserted`, data);
  });
};

dataToInsert.forEach((data) => {
  insert(connection, data);
});
connection.end();
