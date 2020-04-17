# node-pg-query-template

*Query Templates for Postgres in Node.js*

#### TL;DR

Better SQL strings in NodeJS
In Node.js, if you're writing SQL by hand (i.e. without an ORM, mongoDB or jQuery-styled query builder), then multiline strings and callbacks can be difficult to build and maintain.

Lets take a common SQL query using the excellent node-postgres package:

```
pgClient.query(""+
"insert into sample_table "+
"    (obj_name, obj_description, creator_user_id, some_number, json_column) "+
"  values "+
" ($1, $2, $3, $4, $5)",
[obj_name, obj_desc, req.session.user_id, num_array[0]],
function(err, results) {
  //do something with results
});
```

This contrasts with the new SQL statement syntax we've implemented:

```
var insertResult = yield pgClient.queryTmpl(sql`
  insert into sample_table
    (obj_name, obj_description, creator_user_id, some_number, json_column)
  values
    (${obj_name},  ${obj_desc}, ${req.session.user_id}, ${num_array[0]}
    )`
);
```

#### Why?

Further inspection of the first query:

The first annoyance and notable contrast between the two is the strinct concatenation of the former. It makes it hard to take a plain .sql query and drop it into node.js, or debug in psql. There are other style syntaxes possible, such as :

```
insert into sample_table \
```

but it still is fragile. An extra space after newline escape breaks the whole query and is invisible to see.

Also, existing asyncronous methods such as callbacks (as seen above), the async package, or Promises are harder to deal with for a complex series of sql statements. They are not necessarily unweidly, but it certainly takes extra control structure than syncronous code.

Another issue is $1, $2, ..., $N can be hard to maintain in a larger query. What if you want a new parameter near the beginning (for logic readability)?

They could be renamed $2 to $3, $3 to $4, etc. Or of course have them out of order. Another option is to have a counter and litter the query building code ahead of time:

```
bind_vars.push(new_where_clause);
bind_cntr++;
```

#### How to improve?

New Javascript features allow for a better design:

- Template Strings - allows for multiline strings as well as variable binding. (docs)
Generators - functions that allow syncronous-style programming, but still preserve asyncronous i/o handling. (docs)

- Generators
The "yield" keyword in the first line allows the query to run asyncronously, but the code to pause at this line until the insert finishes. That means Node is still non-blocking and other functions can be run in parallel as well as other requests to this function.

We're using the Bluebird Promises library to wrap node-postgres into a Promise:

```
var pg = Promise.promisifyAll(require('pg'));
and running this sql statement in a generator function:

exports.create = Promise.coroutine(function *(inputData) {

// some code here to validate incoming data

var insertResult = yield app.pgClient.query(sql`
  ...
  ) `
});

```

### Template Strings
First, the backquote character (`) is what allows multi-line strings. Its the one that shares the key with tilde (~) :}

The special trick to making this all work is the 'sql' word before the template string. This is called a "Tagged Template", which you can read more about here:

http://updates.html5rocks.com/2015/01/ES6-Template-Strings#tagged-templates

Basically, we need to convert the template string into a prepared statement (to prevent SQL-Injection) via a custom tagged template:

```
  var sql = function(pieces) {
  var result = '';
  var vals = [];
  var substitutions = [].slice.call(arguments, 1);  
  for (var i = 0; i < substitutions.length; ++i) {
    result += pieces[i] + '$' + (i + 1);
    vals.push(substitutions[i]);
  }

  result += pieces[substitutions.length];
  return {query: result, values: vals};
  }
```
  
From there, we need to convert this object into the string and array paremeters to the original query function:

```
  pg.Client.prototype.queryTmpl = function(obj) {
    return pg.Client.prototype.queryAsync.call(this, obj.query, obj.values);
  }
```
 

### A few notes:
-  You might have noticed the array lookup in the sql statement:

    ${num_array[0]}
    
    Yes, you can do all sorts of things like function lookups:
    
    ${foo()}
    
    or truth tests:
    
    ${num_array[0] === 1}
    
    and also nested javascript objects can be used:
    
    ${req.session.user_id}

- The code will error out if any variable is not instantiated (but an undefined property of an object is alright).

