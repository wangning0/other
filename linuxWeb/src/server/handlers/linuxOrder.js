const exec = require('child_process').exec;

export default {
  method: 'POST',
  path: '/postLinuxOrder',
  config: {
    handler(request, reply) {
      const linuxOrder = request.payload.linuxOrder;
      const order = exec(linuxOrder);
      order.stdout.on('data', (data) => {
        reply({
          data: `exec info:\n${data}`,
        });
      });
      order.stderr.on('data', (data) => {
        reply({
          data: `exec stderr:\n${data}`,
        });
      });
    },
  },
};
