/* 
 *  Created by Somesh Chatterjee.
 */

var DataParser = (function ()
{
    var _dataProvider = parent.DataProviderSQLite;
    var _seperator = _dataProvider.GetSeperator();
    
    function ConvertToString(inputs)
    {
        var result = "";
        for (var i = 0; i < inputs.length; ++i)
        {
            result += inputs[i];
            if (i < inputs.length - 1)
            {
                result += _seperator;
            }
        }
        return result;
    }
    
    function ConvertToArray(input)
    {
        return input.split(_seperator);
    }    
    
    return {
        ConvertToString: ConvertToString,
        ConvertToArray: ConvertToArray
    };
    
})();