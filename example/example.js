'use strict';

var logger = require('./log.js');

logger.log('error', 'error message');
logger.log('warn', 'warn message');
logger.log('info', 'info message');
logger.log('debug', 'debug message');

logger.error('error message');
logger.warn('warn message');
logger.info('info message');
logger.debug('debug message');

logger.error({
    'foo': 'bar'
});

logger.error(['foo', 'bar']);

// direct calls
logger.log('error', ['foo', 'bar']);
logger.log('error', {
    'foo': 'bar'
});

logger.isDebugEnabled();
logger.isInfoEnabled();
logger.isWarnEnabled();
logger.isErrorEnabled();
