<#
 .SYNOPSIS
    Deploys CBS reporter application to Azure

 .DESCRIPTION
    Deploys CBS reporter application using Azure Resource Manager template including parameters from selected environment

 .PARAMETER subscriptionId
    Optional. The subscription id where the template will be deployed.

 .PARAMETER complete
    Optional. Indicates if you want the resource deployment to wipe all resources in the resource group and create them again or incrementally, only creating the new resources. Incremental is default. 

 .PARAMETER environment
    The environment name.
#>

param(
    [string] $subscriptionId,
    [Parameter(Mandatory = $true)][string] $environment,
    [switch] $complete
)

$ErrorActionPreference = "Stop"
$resourceGroupName = "nrx-cbs-$environment-rg"
$AzModuleVersion = "2.0.0"

# Verify that the Az module is installed 
if (!(Get-InstalledModule -Name Az -MinimumVersion $AzModuleVersion -ErrorAction SilentlyContinue)) {
    Write-Host "This script requires to have Az Module version $AzModuleVersion installed..
It was not found, please install from: https://docs.microsoft.com/en-us/powershell/azure/install-az-ps"
    exit
} 

if ($subscriptionId) {
    # sign in
    Write-Host "Logging in...";
    Connect-AzAccount; 
    
    # select subscription
    Write-Host "Selecting subscription '$subscriptionId'";
    Select-AzSubscription -SubscriptionId $subscriptionId;
}

#Check that resource group exists
$resourceGroup = Get-AzResourceGroup -Name $ResourceGroupName -ErrorAction SilentlyContinue

if (!$resourceGroup) {
    Write-Error "Resource group $resourceGroupName not found!"serviceBusNamespaceName
}


if ($complete) {
    Write-Host "Deploying all resources (Complete mode)"
    New-AzResourceGroupDeployment `
        -Mode "Complete" `
        -ResourceGroupName $resourceGroupName `
        -TemplateFile "$PSScriptRoot\azuredeploy.json" `
        -TemplateParameterFile "$PSScriptRoot\azuredeploy.parameters.$environment.json";
}
else 
{
    Write-Host "Deploying new resources (Incremental mode)"
    New-AzResourceGroupDeployment `
        -Mode "Incremental" `
        -ResourceGroupName $resourceGroupName `
        -TemplateFile "$PSScriptRoot\azuredeploy.json" `
        -TemplateParameterFile "$PSScriptRoot\azuredeploy.parameters.$environment.json";
}