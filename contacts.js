const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log(contactsPath);

async function getDb() {
  const contacts = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(contacts);
  return contactsList;
}

async function listContacts() {
  const contactsList = await getDb();
  return contactsList;
}

async function getContactById(id) {
  const contactList = await getDb();
  const contact = contactList.find((item) => item.id === id);
  return contact;
}

async function removeContact(contactId) {
  const contactsList = await getDb();
  const contactItem = contactsList.find((item) => item.id === contactId);
  if (!contactItem) {
    return null;
  }
  const contacts = contactsList.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactItem;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contactItem = { id, name, email, phone };
  const contactsList = await getDb();
  contactsList.push(contactItem);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactItem;
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
