#include <Arduino.h>
#include <painlessMesh.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define MESH_PREFIX "farmville"
#define MESH_PASSWORD "noyoucantconnect"
#define MESH_PORT 5555

#define STATION_SSID "auiGuest"
#define STATION_PASSWORD ""

#define HOSTNAME "HeadNode"
#define API_URL "http://10.126.13.173:3000/api/sensor-data"

// Prototypes
void receivedCallback(const uint32_t &from, const String &msg);
IPAddress getlocalIP();

IPAddress myIP(0, 0, 0, 0);
painlessMesh mesh;

void setup() {
  Serial.begin(115200);

  mesh.setDebugMsgTypes(ERROR | STARTUP | CONNECTION);


  mesh.init(MESH_PREFIX, MESH_PASSWORD, MESH_PORT, WIFI_AP_STA, 6, 1);
  mesh.onReceive(&receivedCallback);

  mesh.stationManual(STATION_SSID, STATION_PASSWORD);
  mesh.setHostname(HOSTNAME);

  mesh.setRoot(true);
  mesh.setContainsRoot(true);
}

void loop() {
  mesh.update();

  if (myIP != getlocalIP()) {
    myIP = getlocalIP();
    Serial.println("My IP is " + myIP.toString());
  }
}


void receivedCallback(const uint32_t &from, const String &msg) {
  Serial.printf("bridge: Received from %u msg=%s\n", from, msg.c_str());

  // Send data to the API
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(API_URL);
    http.addHeader("Content-Type", "application/json");

    // Parse the received message and prepare JSON
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, msg);
    if (!error) {
      String payload;
      serializeJson(doc, payload);

      int httpResponseCode = http.POST(payload);
      if (httpResponseCode == 201) {
        Serial.println("Data sent to API successfully");
      } else {
        Serial.print("Error sending data to API: ");
        Serial.println(httpResponseCode);
      }
    } else {
      Serial.println("Error parsing JSON");
    }

    http.end();
  } else {
    Serial.println("Not connected to WiFi");
  }
}

IPAddress getlocalIP() {
  return IPAddress(mesh.getStationIP());
}
