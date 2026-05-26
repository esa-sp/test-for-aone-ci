module.exports = (app) => {
  const { router, controller } = app;
  router.get('/api/health', controller.home.health);
  router.get('/api/users/:id', controller.home.user);
  router.post('/api/echo', controller.home.echo);
};
