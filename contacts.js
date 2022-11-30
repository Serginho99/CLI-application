const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getContacts() {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
}

async function getContactById(contactId) {
  const strContactId = String(contactId);
  const contacts = await getContacts();
  const contactById = await contacts.find(
    (contact) => contact.id === strContactId
  );
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const strContactId = String(contactId);
  const contacts = await getContacts();
  const idx = contacts.findIndex((contact) => contact.id === strContactId);
  if (idx === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = { id: nanoid(), name, email, phone: String(phone) };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContactById(id, name, email, phone) {
  const strContactId = String(id);
  const contacts = await getContacts();
  const idxContact = contacts.findIndex(
    (contact) => contact.id === strContactId
  );
  if (idxContact === -1) {
    return null;
  }
  contacts[idxContact] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[idxContact];
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
