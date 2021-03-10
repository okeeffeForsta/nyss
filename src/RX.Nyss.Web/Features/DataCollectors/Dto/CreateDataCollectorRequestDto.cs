using FluentValidation;
using RX.Nyss.Common.Utils.DataContract;
using RX.Nyss.Data.Concepts;
using RX.Nyss.Web.Features.DataCollectors.Validation;
using RX.Nyss.Web.Utils.Extensions;

namespace RX.Nyss.Web.Features.DataCollectors.Dto
{
    public class CreateDataCollectorRequestDto
    {
        public DataCollectorType DataCollectorType { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public Sex? Sex { get; set; }

        public int? BirthGroupDecade { get; set; }

        public string PhoneNumber { get; set; }

        public string AdditionalPhoneNumber { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public int VillageId { get; set; }

        public int? ZoneId { get; set; }

        public int SupervisorId { get; set; }
        public bool Deployed { get; set; }

        public class Validator : AbstractValidator<CreateDataCollectorRequestDto>
        {
            public Validator(IDataCollectorValidationService dataCollectorValidationService)
            {
                RuleFor(dc => dc.DataCollectorType).IsInEnum();
                RuleFor(dc => dc.Name).NotEmpty().MaximumLength(100);
                RuleFor(dc => dc.PhoneNumber).NotEmpty().MaximumLength(20);
                RuleFor(dc => dc.PhoneNumber)
                    .MustAsync(async (model, phoneNumber, t) => !await dataCollectorValidationService.PhoneNumberExists(phoneNumber))
                    .WithMessageKey(ResultKey.DataCollector.PhoneNumberAlreadyExists);
                RuleFor(dc => dc.AdditionalPhoneNumber).MaximumLength(20);
                RuleFor(dc => dc.Latitude).InclusiveBetween(-90, 90);
                RuleFor(dc => dc.Longitude).InclusiveBetween(-180, 180);
                RuleFor(dc => dc.VillageId).GreaterThan(0);
                RuleFor(dc => dc.SupervisorId).GreaterThan(0);
                RuleFor(dc => dc.SupervisorId)
                    .MustAsync(async (model, supervisorId, t) => await dataCollectorValidationService.IsAllowedToCreateForSupervisor(supervisorId))
                    .WithMessageKey(ResultKey.DataCollector.NotAllowedToSelectSupervisor);

                When(dc => dc.DataCollectorType == DataCollectorType.Human, () =>
                {
                    RuleFor(dc => dc.DisplayName).NotEmpty().MaximumLength(100);
                    RuleFor(dc => dc.Sex).IsInEnum();
                    RuleFor(dc => dc.BirthGroupDecade).GreaterThan(0).Must(x => x % 10 == 0);
                });
                RuleFor(dc => dc.Deployed).NotNull();
            }
        }
    }
}
