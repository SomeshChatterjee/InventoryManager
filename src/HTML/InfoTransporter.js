/* 
 *  Created by Somesh Chatterjee.
 */

function InfoTransporter()
{
    this.Data = DataProvider.GetTransporterTable;
    this.TableId = "Transporter";
    this.TableHeaderNames = TableHeaderNames.TransporterTableName;
    
    this.GetTable = function()
    {
        return TableCreator.GetTable(this.Data, this.TableId);
    };
    
    this.GetDataFor = function (index)
    {
        return FormHelper.GetDataValuesFromTable(this.Data, index);
    };    
}
