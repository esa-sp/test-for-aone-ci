export default {
  async fetch(request) {
    return new Response('Hello from upload single JS!', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
