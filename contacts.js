const fs = require("fs").promises;
const { Console } = require("console");
const path = require("path");

const contactsPath = path.join("./db", "contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsData);
    console.log("Contacts loading ended with success");
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log("Contacts loading ended with error.", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts;
    const contact = contacts.find((element) => element.id === contactId);
    if (contact) {
      console.log(`Contact with id= ${contactId} is ${contact}`);
    } else {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    return contact;
  } catch (error) {
    console.log("Contact search ended with error.", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((element) => element.id !== contactId);
    if (JSON.stringify(newContacts) !== JSON.stringify(contacts)) {
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log("Contact removed successfully");
    } else {
      throw new Error(`Contact with id: ${contactId} was not found, try again`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  // ...twój kod
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
