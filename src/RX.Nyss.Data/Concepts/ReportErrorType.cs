namespace RX.Nyss.Data.Concepts
{
    public enum ReportErrorType
    {
        FormatError,
        HealthRiskNotFound,
        DataCollectorNotFound,
        TooLong,
        GlobalHealthRiskCodeNotFound,
        DataCollectorUsedCollectionPointFormat,
        CollectionPointUsedDataCollectorFormat,
        CollectionPointNonHumanHealthRisk,
        SingleReportNonHumanHealthRisk,
        AggregateReportNonHumanHealthRisk,
        EventReportHumanHealthRisk,
        GenderAndAgeNonHumanHealthRisk,
        Gateway,
        Other
    }
}
