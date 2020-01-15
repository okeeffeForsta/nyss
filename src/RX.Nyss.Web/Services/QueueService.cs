﻿using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.ServiceBus;
using Newtonsoft.Json;
using RX.Nyss.Common.Configuration;
using RX.Nyss.Web.Configuration;

namespace RX.Nyss.Web.Services
{
    public interface IQueueService
    {
        Task Send<T>(string queueName, T data);
    }

    public class QueueService : IQueueService
    {
        private readonly INyssWebConfig _config;

        public QueueService(INyssWebConfig config)
        {
            _config = config;
        }

        public async Task Send<T>(string queueName, T data)
        {
            var queueClient = new QueueClient(_config.ConnectionStrings.ServiceBus, queueName);

            var message = new Message(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data)))
            {
                Label = "RX.Nyss.Web",
            };

            await queueClient.SendAsync(message);
        }

    }
}
