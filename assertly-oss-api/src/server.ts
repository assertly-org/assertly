
import app from './app';

let PORT: number;
if (process.env.PORT !== undefined) {
  PORT = parseInt(process.env.PORT);
} else {
  PORT = 3002;
}

/**
 * Start Express server.
 */
function initServer() {
  const server = app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT} in ${app.get('env')} mode`);
    console.log('  Press CTRL-C to stop\n');
  });

  return server;
}

const server = initServer();

export default server;
