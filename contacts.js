const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join('./db', 'contacts.json');

async function listContacts() {
  // ...twój kod
}

async function getContactById(contactId) {
  // ...twój kod
}

async function removeContact(contactId) {
  // ...twój kod
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
