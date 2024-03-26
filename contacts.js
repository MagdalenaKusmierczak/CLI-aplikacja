const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");


const fetchContacts = async () => {
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
    const contacts = await fetchContacts();
    console.log("Contacts loading ended with success");
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log("Loading list of contacts ended with error.", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fetchContacts();
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
    const contacts = await fetchContacts();
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
    const contacts = await fetchContacts();
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

let urlAlphabet =
  "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
  let step = -~((1.6 * mask * size) / alphabet.length);
  return () => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random);
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    let byte = bytes[size] & 63;
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36);
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += "_";
    } else {
      id += "-";
    }
  }
  return id;
};