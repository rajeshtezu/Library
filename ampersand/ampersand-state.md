# ampersand-state

It provides observable state.

[Official doc link: https://ampersandjs.com/learn/state/]

Eg

```
// Require the lib
var State = require('ampersand-state');

// Create a constructor to represent the state we want to store
var Person = State.extend({
  props: {
    name: 'string',
    isDancing: 'boolean'
  }
});

// Create an instance of our object
var person = new Person({name: 'henrik'});

// watch it
person.on('change:isDancing', function () {
  console.log('shake it!');
});

// set the value and the callback will fire
person.isDancing = true;
```

- **props** : Observable properties.
- **derived** :
  - Properties dependent on "props" or "read-only" and can not be set directly.
  - By **default** derived properties are cached. ie, once the value is computed it will not call the `fn()` to calculate the value again.
  - Cached, derived properties will only trigger a change if the resulting calculated value has changed.
  - Set `cache: false` in the derived property object to fire a change event any time any of the `deps` changes and re-calculate the derived property each time it is accessed.

## Event bubbling, derived properties based on children

Just the way browser bubbles the event up, ampersand-state also bubble event up the chain.

Eg

```
var Person = state.extend({
  children: {
    profile: Profile  // NOTICE THIS LINE
  },
  derived: {
    childsName: {
      deps: ['profile.name'],  // NOTICE THIS LINE
      fn: function() {
        return this.profile.name;
      }
    }
  }
});

var me = new Person();

me.on('change:childsName', (model, newValue) => {
  console.log(newValue);
});

me.profile.name = 'Some new name';
```
