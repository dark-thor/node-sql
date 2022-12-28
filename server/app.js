const Fastify = require("fastify");
const { routes } = require("../routes/static");
const { getUser } = require("../routes/db");

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

fastify.register(require('@fastify/postgres'), {
  connectionString: process.env.CONN_URL
})
fastify.register(getUser)

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
