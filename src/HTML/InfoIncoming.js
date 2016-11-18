/* 
 *  Created by Somesh Chatterjee.
 */

function InfoIncoming()
{
    this.Data = DataProvider.GetIncomingTable();
    this.TableId = "Incoming";
    this.TableHeaderNames = TableHeaderNames.IncomingHeaderNames;
    
    this.GetTable = function()
    {
        return TableCreator.GetTable(this.Data, this.TableId);
    };
    
    this.GetDataFor = function (index)
    {
        return FormHelper.GetDataValuesFromTable(this.Data, index);
    };
    
    this.SetIncomingData = function (infoIncoming, newRow)
    {
        DataProvider.SetIncomingValuesInTable(infoIncoming, newRow);
    };
    
    this.GetMOCAndQualityValuesIndex = DataProvider.GetMOCAndQualityValuesIndex;    
    
    this.GetMOCAndQualityValues = DataProvider.GetMOCAndQualityValues();
    
    this.GetCompanyValuesIndex = DataProvider.GetCompanyValuesIndex;    
    
    this.GetCompanyValues = DataProvider.GetCompanyValues();
    
    this.GetTransporterTableIndexWithoutId = DataProvider.GetTransporterTableIndexWithoutId;            
    
    this.GetTransporterValues = DataProvider.GetTransporterValues();
    
    this.GetTableColsToShowByDefault = function ()
    {
        var colNames = [];
        colNames.push(this.TableHeaderNames.ID);
        colNames.push(this.TableHeaderNames.CompanyName);
        colNames.push(this.TableHeaderNames.MOC);
        colNames.push(this.TableHeaderNames.Remarks);
        colNames.push(this.TableHeaderNames.QualityCode);
        colNames.push(this.TableHeaderNames.Width);
        colNames.push(this.TableHeaderNames.Length);
        colNames.push(this.TableHeaderNames.NoOfRolls);
        colNames.push(this.TableHeaderNames.IncomingDate);
        return colNames;
    };
}
