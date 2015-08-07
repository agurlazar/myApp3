/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('fnCamera').addEventListener('click', this.fnCamera, false);
        document.getElementById('fnScan').addEventListener('click', this.fnScan, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        alert("test name item ");

         var db = window.sqlitePlugin.openDatabase({name: "my.db", androidDatabaseImplementation: 2});

  db.transaction(function(tx) {
    tx.executeSql('DROP TABLE IF EXISTS test_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, datas text, data_num integer, trythis text)');

    tx.executeSql("INSERT INTO test_table (datas, data_num,trythis) VALUES (?,?,?)", ["test", 100, "hmm"], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      alert("rowsAffected: " + res.rowsAffected + " -- should be 1");

      tx.executeSql("select data, data_num as cnt from test_table;", [], function(tx, res) {
        alert("res.rows.length: " + res.rows.length + " -- should be 1");
        alert("res.rows.item(0).data: " + res.rows.item(0).data + " -- should be test");
          alert("res.rows.item(1).data: " + res.rows.item(0).datas  + " -- should be 100");
         alert("res.rows.item(2).data: " + res.rows.trythis + " -- should be hmm");

      });

    }, function(e) {
      alert("ERROR: " + e.message);
    });
  });


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    fnCamera: function(){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    },
    fnScan: function(){
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
          },
          function (error) {
              alert("Scanning failed: " + error);
          }
       );

    }
};
