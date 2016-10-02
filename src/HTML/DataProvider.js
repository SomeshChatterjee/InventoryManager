/* 
 *  Created by Somesh Chatterjee.
 */

var DataProvider = (function ()
{
    var _dataProvider = DataProviderMock;
    var _mocHeaderNames = TableHeaderNames.MOCAndQualityCodeHeaderName;
    var _mocAndQualityCodeTable = GetMOCAndQualityCodeTable();    
    var _companyMasterHeaderNames = TableHeaderNames.CompanyMasterTableName;
    var _companyMasterTable = GetCompanyMasterTable();    
    var _transporterHeaderNames = TableHeaderNames.TransporterTableName;
    var _transporterTable = GetTransporterTable();        
    
    function GetIncomingTable()
    {
        var inputData = _dataProvider.GetIncomingData();
        
        var companyData = _dataProvider.GetCompanyMaster();
        MergeData(inputData, 1, companyData, 0, [1, 2]);
        
        var mocData = _dataProvider.GetMOCAndQualityCode();
        MergeData(inputData, 2 + 1, mocData, 0, [1, 2]);        
        
        var transporterData = _dataProvider.GetTransporterDetails();
        MergeData(inputData, 11 + 2, transporterData, 0, [1, 2, 3]); 
        
        //AddDataForLoadTest(inputData, 10000);
        
        var headerNames = TableHeaderNames.IncomingHeaderNames;
        var tableHeaders = [headerNames.ID ,headerNames.CompanyName, headerNames.CompanyAddress, headerNames.MOC, headerNames.QualityCode, headerNames.StockLoc, headerNames.Width, headerNames.Length, headerNames.NoOfRolls, headerNames.LoomNo, headerNames.BatchNo, headerNames.PieceNo, headerNames.IncomingDate, headerNames.TransporterName, headerNames.TransporterAddr, headerNames.TransporterContact, headerNames.InvoiceNo, headerNames.InvoiceDate, headerNames.Remarks];
        return GetTable(inputData, tableHeaders);        
    }
    
    function GetOutgoingTable()
    {
        var inputData = _dataProvider.GetOutgoingData();
        
        var companyData = _dataProvider.GetCompanyMaster();
        MergeData(inputData, 1, companyData, 0, [1, 2]);
        
        var mocData = _dataProvider.GetMOCAndQualityCode();
        MergeData(inputData, 2 + 1, mocData, 0, [1, 2]);        
        
        var transporterData = _dataProvider.GetTransporterDetails();
        MergeData(inputData, 11 + 2, transporterData, 0, [1, 2, 3]);
        
        var headerNames = TableHeaderNames.OutgoingHeaderNames; 
        var tableHeaders = [headerNames.ID ,headerNames.CompanyName, headerNames.CompanyAddress, headerNames.MOC, headerNames.QualityCode, headerNames.StockLoc, headerNames.Width, headerNames.Length, headerNames.NoOfRolls, headerNames.LoomNo, headerNames.BatchNo, headerNames.PieceNo, headerNames.OutgoingDate, headerNames.TransporterName, headerNames.TransporterAddr, headerNames.TransporterContact, headerNames.Remarks];        
        return GetTable(inputData, tableHeaders);        
    }    
    
    function GetCompanyMasterTable()
    {
        var headerNames = TableHeaderNames.CompanyMasterTableName;
        var inputData = _dataProvider.GetCompanyMaster();
        return GetTable(inputData, [headerNames.ID, headerNames.CompanyName, headerNames.CompanyAddress, headerNames.Contact]);        
    }
    
    function GetMOCAndQualityCodeTable()
    {
        var headerNames = TableHeaderNames.MOCAndQualityCodeHeaderName;
        var inputData = _dataProvider.GetMOCAndQualityCode();
        return GetTable(inputData, [headerNames.ID, headerNames.MOC, headerNames.QualityCode]);                
    }
    
    function GetTransporterTable()
    {
        var headerNames = TableHeaderNames.TransporterTableName;
        var inputData = _dataProvider.GetTransporterDetails();
        return GetTable(inputData, [headerNames.ID, headerNames.TransporterName, headerNames.TransporterAddress, headerNames.Contact]);                        
    }
    
    function GetTable(inputData, header)
    {
        var numberOfRows = inputData.length;
        var numberOfColumns = inputData[0].length;
        var table = new TableStructure(numberOfRows);
        table.TableHeader = header;
        for (var i = 0; i < numberOfRows; ++i)
        {
            for (var j = 0; j < numberOfColumns; ++j)
            {
                table.TableData[i][j] = inputData[i][j];
            }
        }
        return table;        
    }
    
    function TableStructure(numberOfRows)
    {
        this.TableHeader = [];
        this.TableData = [numberOfRows];
        for (var i = 0; i < numberOfRows; ++i)
        {
            this.TableData[i] = [];
        }
    }    
    
    function MergeData(destTable, foreignKey, sourceTable, key, columnsToAdd)
    {
        for (var i = 0; i < destTable.length; i++)
        {
            for (var j = 0; j < sourceTable.length; j++)
            {
                if (destTable[i][foreignKey] === sourceTable[j][key])
                {
                    destTable[i].splice(foreignKey, 1, sourceTable[j][columnsToAdd[0]]);
                    for (var k = 1; k < columnsToAdd.length; k++)
                    {
                        destTable[i].splice(foreignKey + k, 0, sourceTable[j][columnsToAdd[k]]);
                    }
                    break;
                }
            }
        }
    }
    
    function AddDataForLoadTest(data, noOfEntries)
    {
        for (var i = 0; i < noOfEntries; i++)
        {
            data.push(data[i]);
        }
    }    
    
    var GetMOCAndQualityValuesIndex = {
        MOC: _mocAndQualityCodeTable.TableHeader.indexOf(_mocHeaderNames.MOC) - 1,
        Quality: _mocAndQualityCodeTable.TableHeader.indexOf(_mocHeaderNames.QualityCode) - 1
    };    
    
    function GetMOCAndQualityValues()
    {
        var mocIndex = GetMOCAndQualityValuesIndex.MOC + 1;
        var qualityIndex = GetMOCAndQualityValuesIndex.Quality + 1;
        var result = [];
        var tableData = _mocAndQualityCodeTable.TableData;
        for (var i = 0; i < tableData.length; ++i)
        {
            var row = [tableData[i][mocIndex], tableData[i][qualityIndex]];
            result.push(row);
        }
        return result;
    };    
    
    var GetCompanyValuesIndex = {
        CompanyName: _companyMasterTable.TableHeader.indexOf(_companyMasterHeaderNames.CompanyName) - 1,
        CompanyAddr: _companyMasterTable.TableHeader.indexOf(_companyMasterHeaderNames.CompanyAddress) - 1,
        CompanyContact: _companyMasterTable.TableHeader.indexOf(_companyMasterHeaderNames.Contact) - 1
    };    
    
    function GetCompanyValues()
    {
        var companyNameIndex = this.GetCompanyValuesIndex.CompanyName + 1;
        var companyAddrIndex = this.GetCompanyValuesIndex.CompanyAddr + 1;
        var companyContactIndex = this.GetCompanyValuesIndex.CompanyContact + 1;
        
        var result = [];
        var tableData = _companyMasterTable.TableData;
        for (var i = 0; i < tableData.length; ++i)
        {
            var row = [tableData[i][companyNameIndex], tableData[i][companyAddrIndex], tableData[i][companyContactIndex]];
            result.push(row);
        }
        return result;        
    };    
    
    var GetTransporterTableIndexWithoutId = {
        TransporterName: _transporterTable.TableHeader.indexOf(_transporterHeaderNames.TransporterName) - 1,
        TransporterAddr: _transporterTable.TableHeader.indexOf(_transporterHeaderNames.TransporterAddress) - 1,
        Contact: _transporterTable.TableHeader.indexOf(_transporterHeaderNames.Contact) - 1
    };            
    
    function GetTransporterValues()
    {
        var transporterNameIndex = this.GetTransporterTableIndexWithoutId.TransporterName + 1;
        var transporterAddressIndex = this.GetTransporterTableIndexWithoutId.TransporterAddr + 1;
        var transporterContactIndex = this.GetTransporterTableIndexWithoutId.Contact + 1;
        
        var result = [];
        var tableData = _transporterTable.TableData;
        for (var i = 0; i < tableData.length; ++i)
        {
            var row = [tableData[i][transporterNameIndex], tableData[i][transporterAddressIndex], tableData[i][transporterContactIndex]];
            result.push(row);
        }
        return result;        
    };
    
    return {
        GetIncomingTable: GetIncomingTable,
        GetOutgoingTable: GetOutgoingTable,
        GetCompanyMasterTable: _companyMasterTable,
        GetMOCAndQualityCodeTable: _mocAndQualityCodeTable,
        GetTransporterTable: _transporterTable,
        GetMOCAndQualityValuesIndex: GetMOCAndQualityValuesIndex,
        GetMOCAndQualityValues: GetMOCAndQualityValues,
        GetCompanyValuesIndex: GetCompanyValuesIndex,
        GetCompanyValues: GetCompanyValues,
        GetTransporterTableIndexWithoutId: GetTransporterTableIndexWithoutId,
        GetTransporterValues: GetTransporterValues,
        GetTable: GetTable
    };
})();
