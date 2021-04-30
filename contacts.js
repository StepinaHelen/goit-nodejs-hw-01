const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// дополнительная функция
async function getContacts() {
  try {
    const response = await fs.readFile(contactsPath, (err) => {
      if (err) return console.log(err.message);
    });
    let contacts = JSON.parse(response);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath, (err) => {
      if (err) return console.log(err.message);
    });

    let contacts = JSON.parse(response);
    console.table(contacts);
  } catch (err) {
    console.error(err.message);
  }
}
// listContacts();
async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const findContact = contacts.find(({ id }) => id === contactId);
    console.table(findContact);
  } catch (e) {
    console.error(e.message);
  }
}
// getContactById(3);
async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    let deleteContact = contacts.filter(({ id }) => id !== contactId);
    console.table(deleteContact);

    fs.writeFile(contactsPath, JSON.stringify(deleteContact), (err) => {
      if (err) return console.log(err.message);
    });
  } catch (e) {
    console.error(e.message);
  }
}
// removeContact(8);
async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
    let contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newContact = [...contacts, contact];
    console.table(newContact);
    fs.writeFile(contactsPath, JSON.stringify(newContact), (err) => {
      if (err) return console.log(err.message);
    });
  } catch (e) {
    console.error(e.message);
  }
}
// addContact("Lena", "email", "66644422");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
