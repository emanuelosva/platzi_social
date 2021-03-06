// db Mock
const db = {
  'user': [
    {
      id: '1',
      name: "Koala",
      username: "koala",
    },
  ],
  'auth': [],
};

const list = async (table) => {
  try {
    return db[table];
  } catch (e) {
    console.error('[db] List Error:' + e)
  }
};

const get = async (table, id) => {
  try {
    let collection = await db[table];
    return collection.filter(item => item.id === id) || null;
  } catch (e) {
    console.error('[db] Get Error:' + e)
  }
};

const query = async (table, querySelctor) => {
  try {
    let collection = db[table];
    let keys = Object.keys(querySelctor);
    let key = keys[0];

    return collection.filter(item => item[key] === querySelctor[key])[0] || null;
  } catch (e) {
    console.error('[db] Query Error:' + e)
  }
};

const upsert = async (table, user) => {
  try {
    await db[table].push(user);
  } catch (e) {
    console.error('[db] Upsert Error:' + e)
  }
};

const remove = async (table, id) => {
  try {
    db[table] = await db[table].filter(item => item.id !== id)
  } catch (e) {
    console.error('[db] Remove Error:' + e)
  }
};

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
