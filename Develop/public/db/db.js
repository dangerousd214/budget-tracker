let db;
let MyLocaldb;
const request = window.indexedDB.open(MyLocaldb, 1);

request.onsuccess = function(event) {
  db = event.target.result;
};

async function openDatabase() {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open("MyLocaldb");
      request.onsuccess = function(event) {
          resolve(event.target.result);
      }

      request.onupgradeneeded = function() {
          const db = event.target.result;
          const userObjectStore = db.createObjectStore( ['MyLocaldb'], {keyPath: "userid"});
          userObjectStore.createIndex("name", "name", { unique: false });
          userObjectStore.createIndex("value", "value", { unique: false });
          userObjectStore.createIndex("date", "date",  {unique: false});
      }       
  }) 
}

// openDatabase()
//   .then(db => {
//       // db instance accessible here
//     console.log(db "is open");
//   })
// add data
  (async function() {
    const db = await openDatabase();

    // Add
    const transaction = db.transaction( ['MyLocaldb'], "readwrite");
    const newObjectStore = transaction.objectStore( ['MyLocaldb']);

    newObjectStore.add({
        userid: "4",
        name: "John Doe",
        email: "josn@gmail.com"
    });

   transaction.onsuccess = function(e) {
        console.log("Data Added");
    }

})();

//remove data
const remove = db.transaction( ['MyLocaldb'], "readwrite")
    .objectStore( ['MyLocaldb'])
    .delete("4");

request.onsuccess = function(event) {
    console.log("Deleted!");
};

//read and update data
const readTransaction = db.transaction([ ['MyLocaldb']]);
const objectStore = transaction.objectStore("customers");
const read = objectStore.get("4");

request.onsuccess = function(event) {
    console.log("User is " + request.result.name);
    const data = event.target.result;
    data.name = "John Doe";

    const updateRequest = objectStore.put(data);
    updateRequest.onsuccess = function(event) {
        console.log("Data Updated!");
    }
};

const saveRecord = (record) => {
    console.log('Save record invoked');
    // Create a transaction on the MyLocaldb db with readwrite access
    const transaction = db.transaction(['MyLocaldb'], 'readwrite');
  
    // Access your MyLocaldb object store
    const store = transaction.objectStore('MyLocaldb');
  
    // Add record to your store with add method.
    store.add(record);
  };
  
  // Listen for app coming back online
  window.addEventListener('online', checkDatabase);