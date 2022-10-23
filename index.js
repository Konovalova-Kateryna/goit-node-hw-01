const argv = require("yargs").argv;
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      const contactsAfterAdd = await contacts.listContacts();
      console.table(contactsAfterAdd);
      break;

    case "remove":
      await contacts.removeContact(id);
      const contactsAfterRemove = await contacts.listContacts();
      console.table(contactsAfterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
// invokeAction({ action: "list" });
// invokeAction({
//   action: "add",
//   name: "Mango",
//   email: "Mango@i.ua",
//   phone: "111-11-11",
// });
// invokeAction({ action: "remove", id: "f8jpiye5BlKJazQKiBBWb" });
// invokeAction({ action: "get", id: "3" });
