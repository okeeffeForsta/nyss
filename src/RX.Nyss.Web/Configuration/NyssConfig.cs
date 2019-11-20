﻿namespace RX.Nyss.Web.Configuration
{
    public interface IConfig
    {
        string BaseUrl { get; set; }
        string Environment { get; set; }
        NyssConfig.LoggingOptions Logging { get; set; }
        NyssConfig.ConnectionStringOptions ConnectionStrings { get; set; }
        NyssConfig.AuthenticationOptions Authentication { get; set; }
        NyssConfig.ServiceBusQueuesOptions ServiceBusQueues { get; set; }
        string SmsGatewayBlobContainerName { get; set; }
        string GeneralBlobContainerName { get; set; }
        string AuthorizedApiKeysBlobObjectName { get; set; }
        string StringsResourcesBlobObjectName { get; set; }
        int PaginationRowsPerPage { get; set; }
    }

    public class NyssConfig : IConfig
    {
        public string BaseUrl { get; set; }
        public string Environment { get; set; }
        public LoggingOptions Logging { get; set; }
        public ConnectionStringOptions ConnectionStrings { get; set; }
        public AuthenticationOptions Authentication { get; set; }
        public ServiceBusQueuesOptions ServiceBusQueues { get; set; }

        public string SmsGatewayBlobContainerName { get; set; }

        public string GeneralBlobContainerName { get; set; }

        public string AuthorizedApiKeysBlobObjectName { get; set; }

        public string StringsResourcesBlobObjectName { get; set; }

        public int PaginationRowsPerPage { get; set; }

        public class LoggingOptions 
        {
            public string LogsLocation { get; set; }
            public string LogMessageTemplate { get; set; }
        }

        public class AuthenticationOptions
        {
            public string Secret { get; set; }
            public string Issuer { get; set; }
            public string Audience { get; set; }
        }

        public class ConnectionStringOptions
        {
            public string NyssDatabase { get; set; }
            public string ServiceBus { get; set; }
            public string SmsGatewayBlobContainer { get; set; }
            public string GeneralBlobContainer { get; set; }
            public string Nominatim { get; set; }
        }

        public class ServiceBusQueuesOptions
        {
            public string SendEmailQueue { get; set; }
        }
    }
}
