import { setupServer } from 'msw/node';
import { mockHandlers } from './mocks';

const server = setupServer(...mockHandlers);

// Set the `onUnhandledRequest` option to 'bypass' to suppress warnings
server.listen({
  onUnhandledRequest: 'bypass', // Other options: 'warn', 'error'
});

export function startMockServer() {
  server.listen();
}

export function stopMockServer() {
  server.close();
}

export function resetMockServer() {
  server.resetHandlers();
}