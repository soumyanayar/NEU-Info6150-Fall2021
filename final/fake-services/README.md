# Fake Services for Final Project

## Overview

### What does this "fake" mean

These are a set of "fake" services
- They are similar to "real" services in that they are asynchronous and return promises
- They are fake because they aren't making any actual fetch() calls
  - instead the fake service maintains a state inside itself to mimic a server
  - unlike a real service, if you reload the page the state is lost

### These fake services are not required
- You are not required to use any of these services as long as you meet the project requirements
- It be a very rare project that used MOST of these services
- These are just trying to cover scenarios that some people may need for their projects

### Built in delay

- Each service takes about a second to return, simulating an actual service
  - actual services can take far less and far more than a second, depending on many factors
  - for your projects, use this as a chance to show loading spinners or messages
  
### Failures

- Some of the fake services have situations where they will return a rejected promise
- Be sure to follow the requirements regarding showing error messages to the user
  - This means don't show the literal error message to the user! Translate it to more user-friendly language and appearance

### Importing

All of these can be used in your projects by copying the `fake-services.js` file into your projects `/src` directory and using the service names in an import statement
- example: `import { fetchLogin } from './fake-services';`

You can ignore the other files (`fake-services.test.js` and `package.json`) in this directory

## Login Services

These services are meant to simulate user login/registration
- You will have to maintain the state in your application for it to have any meaning
  - example: "logging in" doesn't do anything to the service.  Your app will have to track if the user is considered logged in or not

### No passwords

None of these services use passwords for users. This is because safe handling of passwords is a complex topic that is not covered in this course and I do not want to get you used to bad habits
- You can collect passwords on your login form for the full UI and use them with the services, just understand they will be ignored.
  - example: if I collect a username/password and call the `fetchLogin(username, password)` fake service, the password will not actually be checked.

### Pre-existing users

3 Users are predefined for you.  You can use them or ignore them:

#### dog

User "dog" is a special account.  Any attempt to login as username "dog" will fail with an "invalidPassword" error.  This will let you show an error situation in your UI, since otherwise no passwords are actually checked.

#### cat
  User "cat" already exists and has the default access level of "user" (see Access below).  User "cat" has an empty profile (see Profile below)

#### admin
  User "admin" already exists and has the default access level of "admin" (see Access below).  User "admin" has an empty profile (see Profile below)

### Access
  User accounts have an "access" property.  You do not need to use this - it is there if you want to show UI differences for admin users, and this is not meaningful for all projects.  If you make use of this property, be sure to note in your project README what UI changes you want to show.

### Profile
  User accounts have a "profile" property, which is a JS object (empty by default).  You do not need to use this - it is there if you want to show UI differences involving account information outside of username, and this is not meaningful for all projects.  If you make use of this property, be sure to note in your project README what UI changes you want to show.

### fetchLogin

`fetchLogin(username, password)`

Mimics logging a user in
- username is case-sensitive ('cat' and 'Cat' are different)

Returns a promise that will resolve with the user information object

example:
```
fetchLogin(cat, "notarealpassword")
.then( userInfo => { 
  console.log(userInfo);
});
```
gives:
```
{ 
  username: 'cat',
  access: 'user',
  profile: {}
}
```

If the user does not exist, the promise will reject with an error object: 
```
{ 
  error: 'noSuchUser'
}
```

If you attempt a login with user "dog", the promise will reject with an error object:
```
{ 
  error: 'invalidPassword'
}
```

### fetchLogout

`fetchLogout()`

Mimics logging a user out

Returns a promise that will always resolve with a user object that has a blank username
(This resolved object isn't very useful)

### fetchRegister

`fetchRegister({ username, password })`
- notice `fetchRegister()` is passed an object with the username and password properties
- can optionally accept `access` as a string as well
- can optionally accept `profile` as an object as well

Returns a promise that resolves to the created userInfo object
```
fetchRegister({ username: 'maru', password: 'dogsdrool'})
.then( userInfo => { 
  console.log(userInfo);
});
```
gives:
```
{ 
  username: 'maru',
  access: 'user', // the default
  profile: {} // the default
}
```

Promise rejects if the username already exists
```
fetchRegister({ username: 'cat', password: 'zzzzz'})
```
would give a promise that rejects with:
```
{ 
  error: 'userExists'
}
```

### fetchUpdateUser

`fetchUpdateUser({ username, access, profile })`
- notice `fetchUpdateUser()` is passed an object with properties
- access is optional and not required
- profile is optional and not required

Updates the user access level and/or profile object

Returns a promise that resolves into the new userInfo object (see `fetchRegister()`)

### fetchCheckUsername

`fetchCheckUsername(username)`

Used to see if a username is taken
- this would be used if you wanted to confirm a username is available before submitting a large user registration form
- registering a user without using this is completely fine
  - as is not having any users register

Returns a promise that resolves into one of two options:

```
{ 
  result: 'exists'
}
```
or
```
{ 
  result: 'new'
}
```

Neither of these are considered an error (the promise will not reject)

## Record Services

In addition or instead of user registration/profiles, you may have an app that tracks other data.

These services allow for you to save and update generic data objects.

These calls have the concept of a 'set', which is just a label for related data.  An app might have several 'sets', for example, a site allowing recipe site might have a set of 'recipes' as well as 'meals' set - each set is a collection of related data, but the two sets are not really related to one another.

It is entirely possible that an may keep all the data in a single set, in which case the same string value would be used for 'set' in all of the service calls.

### fetchCreateRecord

`fetchCreateRecord(set, partial)`
- `set` is the string that identifies the set of these records
- `partial` is an object that is whatever individual record you are creating
  - it is called "partial" because it should not have any `id` property.  That will be generated by the service and returned in the promise result

Returns a promise that resolves to the created record (including the newly created `id` property)

Example:
```
fetchCreateRecord('cats', { name: 'Maru', color: 'white' })
.then( createdRecord => { 
  console.log(createdRecord);
});
```
gives:
```
{ 
  name: 'Maru', 
  color: 'white',
  id: '1',
}
```

### fetchRecords

`fetchRecords(set)`
- `set` is the string that identifies the set of records

Returns a promise that resolves to an array of ids in the set

Example: (if we created only Maru in the above example)
```
fetchRecords('cats')
.then( returnedIds => { 
  console.log(returnedIds);
});
```
gives: 
```
[ 
  "1"
]
```

### fetchRecordById
`fetchRecordById(set, id)`
- `set` is the string that identifies the set of records
- `id` is the id of the record you are trying to retrieve (possibly taken from fetchRecords())

Returns a promise that resolves to the record object

Promise will reject if the id does not exist in that set

Example: (continuing the Maru example)
```
fetchRecordById('cats', '1')
.then( record => { 
  console.log(record);
});
```
gives:
```
{ 
  name: 'Maru', 
  color: 'white',
  id: '1',
}
```

Error example:
```
{ 
  error: 'noSuchRecord'
}
```

### fetchReplaceRecord

`fetchReplaceRecord(set, record)`
- `set` is the string that identifies the set of records
- `record` is the new record object.  The `id` property will be used to identify which record to replace

Completely replaces the stored object for that record.id.  Any values not in `record` will no longer be stored under that id.

Returns a promise that resolves to the stored record object
- which you just passed in, so this value isn't very useful

Promise will reject if there is no matching id in that set

Example: (continuing the Maru example)
```
fetchReplaceRecord('cats', { 
  name: 'maru', // now lowercase
  toy: 'boxes', 
  id: '1'
})
.then( newRecord => { 
  console.log(record);
});
```
gives (notice the `color` property is gone):
```
{
  name: 'maru', 
  toy: 'boxes', 
  id: '1'
}
```

Error example:
```
{ 
  error: 'noSuchRecord'
}
```

### fetchUpdateRecord

`fetchUpdateRecord(set, partial)`
- `set` is the string that identifies the set of records
- `partial` is the object with new property values.  The `id` property will be used to identify which record to update.

Adds any new properties from partial to the record, overwriting any that already exist.  Properties stored in the record that are not in partial are left unchanged.

Returns a promise that resolves to the stored record object

Promise will reject if there is no matching id in that set

Example: (continuing the Maru example)
```
fetchUpdateRecord('cats', { 
  name: 'Maru', // back to uppercase
  color: 'mixed',
  id: '1'
})
.then( newRecord => { 
  console.log(record);
});
```
gives (notice the "toy" property from the previous example):
```
{
  name: 'Maru',  // replaced existing property
  toy: 'boxes',  // from previously existing record
  color: 'mixed', // added as new property
  id: '1'
}
```

Error example:
```
{ 
  error: 'noSuchRecord'
}
```

### fetchDeleteRecord
`fetchDeleteRecord(set, id)`
- `set` is the string that identifies the set of records
- `id` is the id of the record you wish to remove from the set

This removes a record from the set

Returns a promise that resolves to a string (not an object)
- 'recordDeleted' if the id existed
- 'noSuchRecord' if the id did not exist
- The promise should not reject, as noSuchRecord isn't an error when you wanted to delete it anyway

Example: (continuing the Maru example)
```
fetchDeleteRecord('cats', '1')
.then( result => { 
  console.log(result);
});
```
gives:
```
'recordDeleted'
```

