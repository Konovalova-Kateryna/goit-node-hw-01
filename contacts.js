const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getDb() {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contactsList = JSON.parse(contacts);
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

async function listContacts() {
  try {
    const contactsList = await getDb();
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(id) {
  try {
    const contactList = await getDb();
    const contact = contactList.find((item) => item.id === id);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await getDb();
    const contactItem = contactsList.find((item) => item.id === contactId);
    if (!contactItem) {
      console.warn("Unknown id");
      return null;
    }
    const contacts = contactsList.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const contactItem = { id, name, email, phone };
    const contactsList = await getDb();
    contactsList.push(contactItem);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
