/* original Copyright Brett Ritter, 2021.  Available for use, modification, and redistribution under the terms of the MIT License */

const RESOLVE_TIMEOUT_MSEC = 100;

const recordsForSet= {};
const users = {
  cat: {
    username: 'cat',
    access: 'user',
    profile: {},
  },
  dog: {
    username: 'dog',
    // This user will always fail!
  },
  admin: {
    username: 'admin',
    access: 'admin',
    profile: {},
  },
};

const getNextId = (
  function generateId() {
    let currentId = 1;
    return () => (currentId++).toString();
  }
)();


function pinkySwear({ value, withError }={}) {
  // Returns a promise that resolves with value in RESOLVE_TIMEOUT_MSEC
  let resolve;
  let reject
  const promise = new Promise( (res, rej) => {
    resolve = res;
    reject = rej
  });
  setTimeout(
    () => {
      if( withError ) {
        reject({ error: withError });
      } else {
        resolve(value)
      }
    },
    RESOLVE_TIMEOUT_MSEC
  );
  return promise;
}

export function fetchLogin(username) {
  // We ignore passwords because security is outside scope of course
  if(username === 'dog') {
    return pinkySwear({ withError: 'invalidPassword' });
  }
  if(!users[username]) {
    return pinkySwear({ withError: 'noSuchUser' });
  }
  // returns a copy of the stored values
  // uses a copy so app can't change stored values by changing these varibles
  return pinkySwear({ value: { ...users[username], profile: { ...users[username].profile } }  });
}

export function fetchLogout() {
  return pinkySwear({ value: { username: '' } });
}

export function fetchRegister({ username, password, access = 'user', profile = {} }) {
  if(users[username]) {
    return pinkySwear({ withError: 'userExists' });
  }
  return pinkySwear().then( () => {
    users[username] = {
      username,
      access,
      profile: { ...profile },
    };
    return {
      username,
      access,
      profile: { ...profile },
    };
  });
}

export function fetchUpdateUser({ username, access, profile }) {
  if(!users[username]) {
    return pinkySwear({ withError: 'noSuchUser' });
  }
  return pinkySwear().then( () => {
    users[username].access = access ?? users[username].access;
    users[username].profile = { ...users[username].profile, ...profile };
    return {
      ...users[username],
      profile: { ...users[username].profile },
    };
  });
}

export function fetchCheckUsername(username) {
  return pinkySwear().then( () => {
    if(users[username]) {
      return { result: 'exists' };
    }
    return { result: 'new' };
  });
}

export function fetchCreateRecord(set, partial) {
  recordsForSet[set] = recordsForSet[set] || {};
  return pinkySwear().then( () => {
    const id = getNextId();
    recordsForSet[set][id] = {
      ...partial,
      id
    };
    return recordsForSet[set][id];
  });
}

export function fetchReplaceRecord(set, record) {
  recordsForSet[set] = recordsForSet[set] || {};
  const id = record.id;
  if(!recordsForSet[set][id]) {
    return pinkySwear({ withError: 'noSuchRecord' });
  }
  return pinkySwear().then( () => {
    recordsForSet[set][id] = {
      ...record,
      id
    };
    return recordsForSet[set][id];
  });
}

export function fetchRecordById(set, id) {
  recordsForSet[set] = recordsForSet[set] || {};
  if(!recordsForSet[set][id]) {
    return pinkySwear({ withError: 'noSuchRecord' });
  }
  return pinkySwear().then( () => {
    return recordsForSet[set][id];
  });
}

export function fetchDeleteRecord(set, id) {
  recordsForSet[set] = recordsForSet[set] || {};
  if(!recordsForSet[set][id]) {
    return pinkySwear({ value: 'noSuchRecord' });
  }
  return pinkySwear().then( () => {
    delete recordsForSet[set][id];
    return 'recordDeleted';
  });
}

export function fetchUpdateRecord(set, partial) {
  recordsForSet[set] = recordsForSet[set] || {};
  const id = partial.id;
  if(!recordsForSet[set][id]) {
    return pinkySwear({ withError: 'noSuchRecord' });
  }
  return pinkySwear().then( () => {
    recordsForSet[set][id] = {
      ...recordsForSet[set][id],
      ...partial,
      id
    };
    return recordsForSet[set][id];
  });
}

export function fetchRecords(set) {
  recordsForSet[set] = recordsForSet[set] || {};
  return pinkySwear().then( () => {
    return Object.keys(recordsForSet[set]);
  });
}


