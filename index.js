const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await getContacts();
      console.table(list);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id:${id} not found`);
      }
      console.table(contactById);
      break;

    case "remove":
      const removeById = await removeContact(id);
      console.table(removeById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "update":
      const updateById = await updateContactById(id, name, email, phone);
      if (!updateById) {
        throw new Error(`Contact with id:${id} not found`);
      }
      console.table(updateById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
