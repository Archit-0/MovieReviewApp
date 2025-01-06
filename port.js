import net from "net";

function isPortAvailable(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.unref(); // Ensures the server won't block the process

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false); // Port is in use
      } else {
        reject(err); // Some other error
      }
    });

    server.listen(port, "127.0.0.1", () => {
      resolve(true); // Port is available
      server.close(); // Close server after check
    });
  });
}

// Port to check
const port = 3001;

isPortAvailable(port)
  .then((isAvailable) => {
    if (isAvailable) {
      console.log(`Port ${port} is available.`);
    } else {
      console.log(`Port ${port} is in use.`);
    }
  })
  .catch((err) => {
    console.error("Error checking port:", err);
  });
