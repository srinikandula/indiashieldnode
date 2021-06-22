# indiashield node project

* Check out the code from repository
  * git clone git@github.com:srinikandula/indiashieldnode.git
* From project root directory run **npm install** to install the node module dependencies
* In the user home directory create a json file and set the properties as per your configuration(DB, port etc)
  * The template for this configuration is available at 'config/configTemplate.json' in the project
* To load sample data get the dump file from project admin and load it in to mongodb using the below command
  * mongorestore --host localhost --db indiashield --port 27017 ./indiashield 
* Start the node application by running the command  **node indiashield.js**  from the project root directory      
