const fs = require("fs").promises;
const path = require("path");
const {nanoid}= require("./nanoid/nanoid");

const contactsPath = path.resolve("db/contacts.json");


const readContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsData);
    return contacts;
  } catch {
    console.log("Contacts loading ended with error.", error.message);
  }
};

async function listContacts() {
  try {
    const contacts = await readContacts();
    console.log("Contacts loading ended with success");
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log("Loading list of contacts ended with error.", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.log(`Contact with id= ${contactId} is ${contact.name}`);
      console.log(contact)
    } else {
      throw new Error(`Contact with id=${contactId} was not found, try again`);
    }
    return contact;
  } catch (error) {
    console.log("Contact search ended with error.", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const newContacts = contacts.filter((element) => element.id !== contactId);
    if (JSON.stringify(newContacts) !== JSON.stringify(contacts)) {
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log("Contact removed successfully");
    } else {
      throw new Error(`Contact with id ${contactId} was not found, try again`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newId = nanoid();
    const newContact = {
      id: newId,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`You added ${name} to contacts`);
    console.log(newContact);
    return newContact;
  } catch (error) {
    console.log("Error, contact can't be add", error.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
