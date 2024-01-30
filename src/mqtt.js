import React, { useEffect } from 'react';
import mqtt from 'mqtt';

const AwsIotComponent = () => {
  useEffect(() => {
    // AWS IoT Core endpoint
    const iotEndpoint = 'YOUR_IOT_ENDPOINT';
    // Topic to subscribe to
    const topic = 'your/topic';

    // Initialize MQTT client
    const client = mqtt.connect({
      host: iotEndpoint,
      port: 443,
      protocol: 'wss',
      // Optional: AWS credentials if needed
      // username: 'YOUR_ACCESS_KEY_ID',
      // password: 'YOUR_SECRET_ACCESS_KEY'
    });

    // Subscribe to the topic
    client.on('connect', () => {
      console.log('Connected to AWS IoT');
      client.subscribe(topic, (err) => {
        if (err) {
          console.error('Subscription error:', err);
        } else {
          console.log('Subscribed to topic:', topic);
        }
      });
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      console.log('Received message from topic:', topic, message.toString());
      // Handle the incoming message data
    });

    // Cleanup on unmount
    return () => {
      console.log('Disconnecting from AWS IoT');
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>AWS IoT Core Example with WebSockets</h1>
      {/* Add your UI components and logic here */}
    </div>
  );
};

export default AwsIotComponent;
