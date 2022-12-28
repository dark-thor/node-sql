async function getUser(fastify, options) {
  fastify.get("/user/:id", async (req, reply) => {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, username FROM users WHERE id=$1",
        [req.params.id]
      );
      return rows;
    } finally {
      client.release();
    }
  });
}

module.exports = { getUser };
