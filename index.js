const argv = require("yargs").argv;
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await contacts.getContactById(id.toString());
      console.log(contact);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      const contactsAfterAdd = await contacts.listContacts();
      console.table(contactsAfterAdd);
      break;

    case "remove":
      await contacts.removeContact(id.toString());
      const contactsAfterRemove = await contacts.listContacts();
      console.table(contactsAfterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
