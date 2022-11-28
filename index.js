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
      try {
        const list = await getContacts();
        console.table(list);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        if (!contactById) {
          throw new Error(`Contact with id:${id} not found`);
        }
        console.table(contactById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "remove":
      try {
        const removeById = await removeContact(id);
        console.table(removeById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "update":
      try {
        const updateById = await updateContactById(id, name, email, phone);
        if (!updateById) {
          throw new Error(`Contact with id:${id} not found`);
        }
        console.table(updateById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
