/* 
 *  Created by Somesh Chatterjee.
 */

function InfoItemMaster()
{
    this.Data = DataProvider.GetMOCAndQualityCodeTable;
    this.TableId = "ItemMaster";
    this.TableHeaderNames = TableHeaderNames.MOCAndQualityCodeHeaderName;
    
    this.GetTable = function()
    {
        return TableCreator.GetTable(this.Data, this.TableId);
    };
    
    this.GetDataFor = function (index)
    {
        return FormHelper.GetDataValuesFromTable(this.Data, index);
    };
    
    this.SetItemMasterData = function (infoItemMaster, newRow)
    {
        DataProvider.SetMOCAndQualityCodeValuesInTable(infoItemMaster, newRow);
    };
}
