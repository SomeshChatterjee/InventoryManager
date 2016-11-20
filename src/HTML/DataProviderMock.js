/* 
 *  Created by Somesh Chatterjee.
 */


var DataProviderMock = (function ()
{    
    function GetIncomingData()
    {
        var data = [];
        var row1 = ["1","1","1", "Thane",      "24", "200", "5",   "LoomNo1", "CH NO 1922", "354", "Jun 28, 2016",  "1", "Invoice1",  "Jun 28, 2016", "Very Good"];
        var row2 = ["2","2","2", "UnitNo: 42", "23", "500", "7",   "LoomNo7", "CH NO 1902", "361", "Jun 20, 2016",  "2", "Invoice2",  "Jan 28, 2016", "Useless"];
        var row3 = ["3","3","3", "UnitNo: 44", "42", "600", "200", "LoomNo3", "CH NO 192",  "351", "Jan 22, 2016",  "3", "Invoice89", "Sep 28, 2016", "Okay"];
        var row4 = ["4","4","4", "London",     "39", "100", "7",   "LoomNo2", "CH NO 5",    "154", "Apr 12, 2016",  "4", "Invoice0",  "Apr 1, 2016",  "Awesome"];
        var row5 = ["5","5","5", "New Delhi",  "50", "900", "45",  "LoomNo7", "CH NO 9843", "350", "Sep 19, 2016",  "5", "Invoice56", "Nov 28, 2016", "Baaaaad!!"];
        
        data.push(row1);
        data.push(row2);
        data.push(row3);
        data.push(row4);
        data.push(row5);
        
        return data;        
    }
    
    function GetMOCAndQualityCode()
    {
        var data = [];
        var row1 = ["1", "Nylon",       "100 MESH (HD)"];
        var row2 = ["2", "Polyester",   "150 MESH"];
        var row3 = ["3", "Silk",        "180 MESH"];
        var row4 = ["4", "Nylon HD2k4", "100 MESH (HD)"];
        var row5 = ["5", "Cotton",      "100 MESH"];        
        
        data.push(row1);
        data.push(row2);
        data.push(row3);
        data.push(row4);
        data.push(row5);
        
        return data;                
    }
    
    function GetOutgoingData()
    {
        var data = [];
        var row1 = ["1","1","1",   "Thane",      "24", "20",   "5",   "LoomNo1", "CH NO 1922", "354", "Jun 28, 2016",  "1", "Very Good"];
        var row2 = ["2","2","2",   "UnitNo: 42", "23", "5000", "7",   "LoomNo7", "CH NO 1902", "361", "Jun 20, 2016",  "2", "Useless"];
        var row3 = ["3","3","3",   "UnitNo: 44", "42", "480",  "200", "LoomNo3", "CH NO 192",  "351", "Jan 22, 2016",  "3", "Okay"];
        var row4 = ["4","4","4",   "London",     "39", "1000", "7",   "LoomNo2", "CH NO 5",    "154", "Apr 12, 2016",  "4", "Awesome"];
        var row5 = ["5","5","5",   "New Delhi",  "50", "10",   "45",  "LoomNo7", "CH NO 9843", "350", "Sep 19, 2016",  "5", "Baaaaad!!"];
        
        data.push(row1);
        data.push(row2);
        data.push(row3);
        data.push(row4);
        data.push(row5);
        
        return data;        
    }    
    
    function GetCompanyMaster()
    {
        var data = [];
        var row1 = ["1", "Mithun Industries Limited","New York USA 400600", "Mithun"];
        var row2 = ["2", "Somesh Foundation",        "Paris France 400600", "Somesh"];
        var row3 = ["3", "Captain America",          "London UK 400600", "Chris"];
        var row4 = ["4", "Mr India",                 "Thane India 400600", "Anil"];
        var row5 = ["5", "The Black Widow",          "Helsinki Finland 400600", "Scarlet"];
        
        data.push(row1);
        data.push(row2);
        data.push(row3);
        data.push(row4);
        data.push(row5);
        
        return data;                
    }
    
    function GetTransporterDetails()
    {
        var data = [];
        var row1 = ["1", "Santosh",    "Thane Mumbai India 400600", "Santosh"];
        var row2 = ["2", "Hulk",       "London UK 400600", "Hulk"];
        var row3 = ["3", "DarkKnight", "Gotham USA 400600", "DarkKnight"];
        var row4 = ["4", "Joker",      "Gotham Asylum USA 400600", "Joker"];
        var row5 = ["5", "Tesla",      "Amsterdam Netherlands 400600", "Tesla"];
        
        data.push(row1);
        data.push(row2);
        data.push(row3);
        data.push(row4);
        data.push(row5);
        
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