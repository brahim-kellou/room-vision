# RoomVision

Room Vision is a solution that assists in obtaining meaningful data about on-site stores via CCTV recordings, which can then be used in data-driven retail optimization.

## Architecture

To build RoomVision, we used the latest cutting edge technologies, including machine learning and cloud computing. We used TensorFlow to detect people's positions and their movements, combined with our trained model built with Azure Custom Vision. We also used Azure SQL Database to store data gathered with end devices like IP Cameras or IoT devices. These data are provided and retrieved using Azure Functions, which provides a fine control over hardware usage and system scalability.

![Architecture](./docs/room-vision-architecture.jpg)
