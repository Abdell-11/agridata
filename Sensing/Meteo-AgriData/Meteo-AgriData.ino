#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_BMP085.h>
#include "painlessMesh.h"
#include <Arduino_JSON.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>


// MESH Details
#define MESH_PREFIX "farmville"
#define MESH_PASSWORD "noyoucantconnect"
#define MESH_PORT 5555

#define dhtPin 33
#define gasPin 4

// Initialize the DHT sensor
#define DHTTYPE DHT22
DHT dht(dhtPin, DHTTYPE);

//BME object on the default I2C pins
Adafruit_BMP085 bmp;

//Number for this node
int nodeNumber = 1;

String readings;

Scheduler userScheduler;
painlessMesh mesh;

// User stub
void sendMessage();    
String getReadings();  



Task taskSendMessage(TASK_SECOND * 5, TASK_FOREVER, &sendMessage);


String getReadings() {
  JSONVar jsonReadings;
  int gas = analogRead(gasPin);

  jsonReadings["node"] = nodeNumber;
  jsonReadings["temperature"] = dht.readTemperature();
  jsonReadings["pressure"] = bmp.readPressure() / 100.0F;
  jsonReadings["humidity"] = dht.readHumidity();
  jsonReadings["gas"] = gas;
  jsonReadings["soil"] = NULL;
  readings = JSON.stringify(jsonReadings);
  return readings;
}

void sendMessage() {
  String msg = getReadings();
  Serial.println(msg);
  mesh.sendBroadcast(msg);
}

// Init BMP180
void initBMP() {
  if (!bmp.begin()) {
    Serial.println("Could not find a valid BMP085/BMP180 sensor, check wiring!");
    while (1) {}
  }
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

  initBMP();

  dht.begin();

  pinMode(gasPin, INPUT);

  mesh.setDebugMsgTypes(ERROR | STARTUP);

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

  mesh.update();
}