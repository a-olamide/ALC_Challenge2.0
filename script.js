if (!Object.prototype.forEach) {
    Object.defineProperty(Object.prototype, 'forEach', {
      value: function (callback, thisArg) {
        if (this == null) {
          throw new TypeError('Not an object');
        }
        thisArg = thisArg || window;
        for (var key in this) {
          if (this.hasOwnProperty(key)) {
            callback.call(thisArg, this[key], key, this);
          }
        }
      }
    });
  }
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  
  var open = indexedDB.open("MyDatabase", 1);
  open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
  };
  
  navigator.serviceWorker.register('sw.js', {
          scope: './'
        });
          var url = 'https://free.currencyconverterapi.com/api/v5/currencies';
  
           var request = new XMLHttpRequest();
  
  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', url, true);
  
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
            data.results.forEach(function (item, key) {
                                    
                let option = document.createElement("option");
                option.text = key;
                option.value = key;
                let option2 = document.createElement("option");
                option2.text = key;
                option2.value = key;
                let select1 = document.getElementById("fromCurrency");
                let select2 = document.getElementById("toCurrency");
                select1.appendChild(option); 
                select2.appendChild(option2); 

            });
            
                    open.onsuccess = function() {
                        var db = open.result;
                        var tx = db.transaction("MyObjectStore", "readwrite");
                        var store = tx.objectStore("MyObjectStore");
                    
                        store.put({id: 12345, curr: data.results});
                    
                        tx.oncomplete = function() {
                            db.close();
                        };
                    }  
    } else 
        {
            console.log('error');
            open.onsuccess = function() {
                    var db = open.result;
                    var tx = db.transaction("MyObjectStore", "readwrite");
                    var store = tx.objectStore("MyObjectStore");
                
                    var resObj = store.get(12345);
                
                    resObj.onsuccess = function() {
                
                        resObj.result.curr.forEach(function (item, key) {
                                            
                            const option = document.createElement("option");
                            option.text = key;
                            option.value = key;
                            const option2 = document.createElement("option");
                            option2.text = key;
                            option2.value = key;
                            const select1 = document.getElementById("fromCurrency");
                            const select2 = document.getElementById("toCurrency");
                            select1.appendChild(option); 
                            select2.appendChild(option2);                   
                        });
                    };
                
                    tx.oncomplete = function() {
                        db.close();
                    };
            } 
        }
    }
        
    request.send();
    function convertAmount() {
        if (document.getElementById('txtAmount').value == ""){ 
            alert("Field must not be empty");
            return;
            
        }
        if (isNaN(document.getElementById('txtAmount').value) == true) {
            alert("Only enter numbers");
            return;
        }
        var inputQuery =  `${document.getElementById('fromCurrency').value}_${document.getElementById('toCurrency').value}`
     //   var inputQuery = document.getElementById('fromCurrency').value + '_' + document.getElementById('toCurrency').value;
                var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + inputQuery;//USD_NGN';
                var request = new XMLHttpRequest();
           
           // Open a new connection, using the GET request on the URL endpoint
            request.open('GET', url, true);
           
            request.onload = function () {
             var data = JSON.parse(this.response);
           
                if (request.status >= 200 && request.status < 400) {
                       
                        const valu = data.results[inputQuery].val;
                        const convertedAmount=  parseFloat(valu) * parseFloat(document.getElementById('txtAmount').value)
                      
                        document.getElementById('returnVal').value = convertedAmount;
                        var open = indexedDB.open("MyDatabase", 1);
                        open.onsuccess = function() {
                    
                            var db = open.result;
                            var tx = db.transaction("MyObjectStore", "readwrite");
                            var store = tx.objectStore("MyObjectStore");
                            store.put({id: inputQuery, curr: valu});
                            
                            tx.oncomplete = function() {
                                db.close();
                            };
                        }
                
                } else 
                {
                    
                    var open = indexedDB.open("MyDatabase", 1);
                        open.onsuccess = function() {
                        // Start a new transaction
                        var db = open.result;
                        var tx = db.transaction("MyObjectStore", "readwrite");
                        var store = tx.objectStore("MyObjectStore");
                    
                        var resObj = store.get(inputQuery);
                        
                        resObj.onsuccess = function() {
                        const convertedAmount=  parseFloat(resObj.result.curr) * parseFloat(document.getElementById('txtAmount').value)                      
                        document.getElementById('returnVal').value = convertedAmount;
                        };
                        tx.oncomplete = function() {
                            db.close();
                        };
                    }
                }
            }
            request.onerror = function () {
                    var open = indexedDB.open("MyDatabase", 1);
                    open.onsuccess = function() {
                    var db = open.result;
                    var tx = db.transaction("MyObjectStore", "readwrite");
                    var store = tx.objectStore("MyObjectStore");
                    
                    var resObj = store.get(inputQuery);
                    
                    resObj.onsuccess = function() {
                        const convertedAmount=  parseFloat(resObj.result.curr) * parseFloat(document.getElementById('txtAmount').value)                       
                        document.getElementById('returnVal').value = convertedAmount;
                    };
                    tx.oncomplete = function() {
                        db.close();
                    };
                }
            }

            request.send();
                
                 
             
    }