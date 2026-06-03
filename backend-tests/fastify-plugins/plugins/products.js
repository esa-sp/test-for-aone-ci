async function productsPlugin(fastify) {
  // 模拟内存数据
  const products = Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    name: `product-${i + 1}`,
    category: i % 3 === 0 ? 'books' : i % 3 === 1 ? 'electronics' : 'clothing',
    price: (i + 1) * 10,
  }));

  fastify.get('/', async (request) => {
    const { category, page = '1', size = '10' } = request.query;
    let filtered = products;
    if (category) filtered = products.filter(p => p.category === category);
    const p = parseInt(page);
    const s = parseInt(size);
    return {
      category: category || 'all',
      page: p,
      size: s,
      items: filtered.slice((p - 1) * s, p * s),
      total: filtered.length,
    };
  });

  fastify.get('/:id', async (request) => {
    const p = products.find(x => x.id === request.params.id);
    return p || { id: request.params.id, name: 'unknown' };
  });
}

module.exports = productsPlugin;
