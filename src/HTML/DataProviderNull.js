/* 
 *  Created by Somesh Chatterjee.
 */


var DataProviderNull = (function ()
{    
    function GetIncomingData()
    {
        var data = [];       
        return data;        
    }
    
    function GetMOCAndQualityCode()
    {
        var data = [];
        return data;                
    }
    
    function GetOutgoingData()
    {
        var data = [];
        return data;        
    }    
    
    function GetCompanyMaster()
    {
        var data = [];
        return data;                
    }
    
    function GetTransporterDetails()
    {
        var data = [];
        return data;                       
    }
    
    function SetIncomingData(newRow)
    {
        LogWarningMessage();
    }
    
    function SetOutgoingData(newRow)
    {
        LogWarningMessage();
    }
    
    function SetCompanyMasterData(newRow)
    {
        LogWarningMessage();
    }
    
    function SetMOCAndQualityCodeData(newRow)
    {
        LogWarningMessage();
    }
    
    function SetTransporterValuesInTable(newRow)
    {
        LogWarningMessage();
    }
    
    function UpdateIncomingData(id, newRow)
    {
        LogWarningMessage();
    }
    
    function UpdateOutgoingData(id, newRow)
    {
        LogWarningMessage();
    }
    
    function UpdateCompanyMasterData(id, newRow)
    {
        LogWarningMessage();
    }
    
    function UpdateMOCAndQualityCodeData(id, newRow)
    {
        LogWarningMessage();
    }
    
    function UpdateTransporterData(id, newRow)
    {
        LogWarningMessage();
    }
    
    function LogWarningMessage()
    {
        console.warn("Using mock data source. No data saved.");
    }
    
    return {
        GetIncomingData : GetIncomingData,
        GetCompanyMaster: GetCompanyMaster,
        GetTransporterDetails: GetTransporterDetails,
        GetOutgoingData: GetOutgoingData,
        GetMOCAndQualityCode: GetMOCAndQualityCode,
        SetIncomingData: SetIncomingData,
        SetOutgoingData: SetOutgoingData,
        SetCompanyMasterData: SetCompanyMasterData,
        SetMOCAndQualityCodeData: SetMOCAndQualityCodeData,
        SetTransporterValuesInTable: SetTransporterValuesInTable,
        UpdateIncomingData: UpdateIncomingData,
        UpdateOutgoingData: UpdateOutgoingData,
        UpdateCompanyMasterData: UpdateCompanyMasterData,
        UpdateMOCAndQualityCodeData: UpdateMOCAndQualityCodeData,
        UpdateTransporterData: UpdateTransporterData
    };
    
})();