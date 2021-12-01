import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUpdateUser,
  fetchCheckUsername,
  fetchCreateRecord,
  fetchRecords,
  fetchReplaceRecord,
  fetchRecordById,
  fetchDeleteRecord,
  fetchUpdateRecord,
} from './fake-services.js';

// Hello students!
//
// This is a set of unit tests I use to make sure the fake services work as intended
// You aren't expected to know any of this
// But if you are interested in unit tests, this is decent example
// it's a bit long, since I've put all the services into one file

describe('fetchLogin', () => {

  it('fails on user dog', () => {
    return expect(fetchLogin('dog')).rejects.toStrictEqual({ error: 'invalidPassword' });
  });

  it('fails without a match user', () => {
    return expect(fetchLogin('does-not-exist')).rejects.toStrictEqual({ error: 'noSuchUser' });
  });

  it('returns a matching user', () => {
    return expect(fetchLogin('cat', 'passwordignored')).resolves.toStrictEqual({
      username: 'cat',
      access: 'user',
      profile: {},
    });
  });

});

describe('fetchLogout', () => {
  it('returns an empty username', () => {
    return expect(fetchLogout()).resolves.toStrictEqual({
      username: ''
    });
  });
});

describe('fetchRegister', () => {
  it('fails on an existing user', () => {
    //FIXME
  });

  it('returns the new user info', () => {
    return expect(fetchRegister({ username: 'newUser' })).resolves.toStrictEqual({
      username: 'newUser',
      access: 'user',
      profile: {},
    });
  });

  it('recognizes the new user', async () => {
    // confirm behavior would fail
    try {
      await fetchLogin('secondUser');
    } catch (e) {
      expect(e).toStrictEqual({ error: 'noSuchUser'});
    }
    let result;
    // now register user and confirm behavior passes
    await fetchRegister({ username: 'secondUser'});
    result = await fetchLogin('secondUser');
    expect(result).toStrictEqual({
      username: 'secondUser',
      access: 'user',
      profile: {},
    });
  });
});

describe('fetchUpdateUser', () => {
  it('fails on unknown user', () => {
    // FIXME
  });
  it('returns the updated user', () => {
    return expect(fetchUpdateUser({
      username: 'cat',
      profile: {
        location: 'box',
      }
    })).resolves.toStrictEqual({
      username: 'cat',
      access: 'user',
      profile: {
        location: 'box',
      },
    });
  });
  it('can change access level', () => {
    //FIXME
  });
});

describe('fetchCheckUsername', () => {
  it('returns on a match', () => {
    return expect(fetchCheckUsername('cat')).resolves.toStrictEqual({
      result: 'exists',
    });
  });
  it('returns on no match', () => {
    return expect(fetchCheckUsername('betterthancat')).resolves.toStrictEqual({
      result: 'new',
    });
  });
});

describe('fetchCreateRecord', () => {
  it('returns a record with an id', async () => {
    const result = await fetchCreateRecord('set', { cat: true });
    expect(result).toMatchObject({
      cat: true,
    });
    expect(result).toHaveProperty('id');
  });

  it('increments the id', async () => {
    const result1 = await fetchCreateRecord('set', {});
    const result2 = await fetchCreateRecord('set', {});
    expect(result2.id).toEqual( (Number(result1.id)+1).toString());
  });
});

describe('fetchRecords', () => {
  it('returns an array of ids', async () => {
    const originalList = await fetchRecords('set');
    const createResult = await fetchCreateRecord('set', {});
    const id = createResult.id;
    const newList = await fetchRecords('set');
    expect(newList).toEqual([...originalList, id ]);
  });
});

describe('fetchRecordById', () => {
  it('returns the record', async () => {
    const createResult = await fetchCreateRecord('set', {
      status: 'created',
    });
    return expect(fetchRecordById('set', createResult.id)).resolves.toStrictEqual({
      status: 'created',
      id: createResult.id,
    });
  });

  it('fails with a bad id', async () => {
    const createResult = await fetchCreateRecord('set', {
      status: 'also-created',
    });
    return expect(fetchRecordById('set', 0)).rejects.toStrictEqual({
      error: 'noSuchRecord',
    });
  });

});


describe('fetchReplaceRecord', () => {
  it('replace the existing record', async () => {
    const result1 = await fetchCreateRecord('set', {
      onCatnip: false,
      location: 'box',
    });
    const id = result1.id;
    const modified = {
      id,
      onCatnip: true,
    };
    const replaceResult = await fetchReplaceRecord('set', modified);
    expect(replaceResult).toStrictEqual({
      id,
      onCatnip: true
    });
    const searchResult = await fetchRecordById('set', id);
    expect(searchResult).toStrictEqual({
      id,
      onCatnip: true
    });
  });
});

describe('fetchDeleteRecord', () => {
  it('deletes an existing record', async () => {
    const createResult = await fetchCreateRecord('set', {
      location: 'box',
    });
    const id = createResult.id;
    const deleteResult = await fetchDeleteRecord('set', id);
    expect(deleteResult).toBe('recordDeleted');
    return expect(fetchRecordById('set', id)).rejects.toStrictEqual({
      error: 'noSuchRecord',
    });
  });
});

describe('fetchUpdateRecord', () => {
  it('fails with a bad id', () => {
      // FIXME
  });

  it('updates a record without erasing existing properties', async () => {
    const result1 = await fetchCreateRecord('set', {
      onCatnip: false,
      location: 'box',
    });
    const id = result1.id;
    const modified = {
      id,
      onCatnip: true,
    };
    const replaceResult = await fetchUpdateRecord('set', modified);
    expect(replaceResult).toStrictEqual({
      id,
      onCatnip: true,
      location: 'box',
    });
    const searchResult = await fetchRecordById('set', id);
    expect(searchResult).toStrictEqual({
      id,
      onCatnip: true,
      location: 'box',
    });
  });
});

