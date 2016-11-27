/* 
 *  Created by Somesh Chatterjee.
 */


var DataProviderSQLite = (function ()
{    
    var _dataProvider = parent.DataProviderSQLite;
    
    function GetIncomingData()
    {
        var result = _dataProvider.GetIncomingData();       
        return DataParser.ConvertToArray(result);        
    }
    
    function GetMOCAndQualityCode()
    {
        var result = _dataProvider.GetMOCAndQualityCode();       
        return DataParser.ConvertToArray(result);        
    }
    
    function GetOutgoingData()
    {
        var result = _dataProvider.GetOutgoingData();       
        return DataParser.ConvertToArray(result);              
    }    
    
    function GetCompanyMaster()
    {
        var result = _dataProvider.GetCompanyMaster();       
        return DataParser.ConvertToArray(result);
    }
    
    function GetTransporterDetails()
    {
        var result = _dataProvider.GetTransporterDetails();       
        return DataParser.ConvertToArray(result);
    }
    
    function SetIncomingData(newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.SetIncomingData(result);
    }
    
    function SetOutgoingData(newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.SetOutgoingData(result);
    }
    
    function SetCompanyMasterData(newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.SetCompanyMasterData(result);
    }
    
    function SetMOCAndQualityCodeData(newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.SetMOCAndQualityCodeData(result);
    }
    
    function SetTransporterValuesInTable(newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.SetTransporterValuesInTable(result);
    }
    
    function UpdateIncomingData(id, newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.UpdateIncomingData(id, result);
    }
    
    function UpdateOutgoingData(id, newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.UpdateOutgoingData(id, result);
    }
    
    function UpdateCompanyMasterData(id, newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.UpdateCompanyMasterData(id, result);
    }
    
    function UpdateMOCAndQualityCodeData(id, newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.UpdateMOCAndQualityCodeData(id, result);
    }
    
    function UpdateTransporterData(id, newRow)
    {
        var result = DataParser.ConvertToString(newRow);
        _dataProvider.UpdateTransporterData(id, result);
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