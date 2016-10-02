/* 
 *  Created by Somesh Chatterjee.
 */

function InfoCompanyMaster()
{
    this.Data = DataProvider.GetCompanyMasterTable;
    this.TableId = "CompanyMaster";
    this.TableHeaderNames = TableHeaderNames.CompanyMasterTableName;
    
    this.GetTable = function()
    {
        return TableCreator.GetTable(this.Data, this.TableId);
    };
    
    this.GetDataFor = function (index)
    {
        return FormHelper.GetDataValuesFromTable(this.Data, index);
    };    
}
