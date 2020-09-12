export function checkIsServer() {
  let isServer;
  try {
    isServer = !window;
  } catch (e) {
    isServer = true;
  }
  return isServer;
}

export default {};
