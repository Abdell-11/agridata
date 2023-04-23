#include <Wire.h>
#include "painlessMesh.h"
#include <Arduino_JSON.h>


// MESH Details
#define MESH_PREFIX "farmville"
#define MESH_PASSWORD "noyoucantconnect"
#define MESH_PORT 5555

#define soilPin A0

//Number for this node
int nodeNumber = 3;

//String to send to other nodes with sensor readingsN
String readings;

Scheduler userScheduler;  // to control your personal task
painlessMesh mesh;

// User stub
void sendMessage();    // Prototype so PlatformIO doesn't complain
String getReadings();  // Prototype for sending sensor readings


//Create tasks: to send messages and get readings;
Task taskSendMessage(TASK_SECOND * 5, TASK_FOREVER, &sendMessage);


String getReadings() {
  JSONVar jsonReadings;
  
  int soilSensorValue = analogRead(soilPin);
  int soilHumidityPercentage = map(soilSensorValue, 0, 1023, 100, 0);
  
  jsonReadings["node"] = nodeNumber;
  jsonReadings["moisture"] = NULL;
  jsonReadings["temperature"] = NULL;
  jsonReadings["pressure"] = NULL;
  jsonReadings["humidity"] = NULL;
  jsonReadings["gas"] = NULL;
  jsonReadings["soil"] = soilHumidityPercentage;
  readings = JSON.stringify(jsonReadings);
  return readings;
}

void sendMessage() {
  String msg = getReadings();
  Serial.println(msg);
  mesh.sendBroadcast(msg);
}



// Needed for painless library
void receivedCallback(uint32_t from, String &msg) {
  Serial.printf("Received from %u msg=%s\n", from, msg.c_str());
  JSONVar myObject = JSON.parse(msg.c_str());
  int node = myObject["node"];
  double temperature = myObject["temperature"];
  double pressure = myObject["pressure"];
  double humidity = myObject["humidity"];
  int gas = myObject["gas"];
  int soil = myObject["soil"];


  Serial.print("Node: ");
  Serial.println(node);
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" *C, Humidity: ");
  Serial.print(humidity);
  Serial.print("%, Gas: ");
  Serial.print(gas);
  Serial.print(", Pressure: ");
  Serial.print(pressure);
  Serial.print(", Soil: ");
  Serial.print(soil);
  Serial.println("%");

}

void newConnectionCallback(uint32_t nodeId) {
  Serial.printf("New Connection, nodeId = %u\n", nodeId);
}

void changedConnectionCallback() {
  Serial.printf("Changed connections\n");
}

void nodeTimeAdjustedCallback(int32_t offset) {
  Serial.printf("Adjusted time %u. Offset = %d\n", mesh.getNodeTime(), offset);
}

void setup() {
  Serial.begin(115200);

  pinMode(soilPin, INPUT);

  //mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes(ERROR | STARTUP);  // set before init() so that you can see startup messages

  mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT, WIFI_AP_STA, 6, 1);
  mesh.onReceive(&receivedCallback);
  mesh.onNewConnection(&newConnectionCallback);
  mesh.onChangedConnections(&changedConnectionCallback);
  mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  userScheduler.addTask(taskSendMessage);
  taskSendMessage.enable();
  
  mesh.setContainsRoot(true);
}

void loop() {
  // it will run the user scheduler as well
  
  mesh.update();
}