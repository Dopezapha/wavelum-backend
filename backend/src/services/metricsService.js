const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'vesting-vault-backend'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
const apiResponseTime = new client.Histogram({
  name: 'api_response_time_seconds',
  help: 'Response time of API endpoints in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 0.7, 1, 3, 5, 10]
});

const activeDbConnections = new client.Gauge({
  name: 'active_db_connections',
  help: 'Total number of active database connections'
});

const totalIndexedBlocks = new client.Gauge({
  name: 'total_indexed_ledger_blocks',
  help: 'Total number of ledger blocks indexed'
});

const cacheOperationsTotal = new client.Counter({
  name: 'cache_operations_total',
  help: 'Total number of cache operations (hits/misses/sets/invalidations)',
  labelNames: ['operation', 'key_prefix', 'status']
});

const cacheOperationDurationSeconds = new client.Histogram({
  name: 'cache_operation_duration_seconds',
  help: 'Duration of cache operations in seconds',
  labelNames: ['operation', 'key_prefix'],
  buckets: [0.0001, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5]
});

register.registerMetric(apiResponseTime);
register.registerMetric(activeDbConnections);
register.registerMetric(totalIndexedBlocks);
register.registerMetric(cacheOperationsTotal);
register.registerMetric(cacheOperationDurationSeconds);

module.exports = {
  register,
  apiResponseTime,
  activeDbConnections,
  totalIndexedBlocks,
  cacheOperationsTotal,
  cacheOperationDurationSeconds
};
