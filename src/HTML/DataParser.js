/* 
 *  Created by Somesh Chatterjee.
 */

var DataParser = (function ()
{   
    function ConvertToString(inputs)
    {
        return JSON.stringify(inputs);
    }
    
    function ConvertToArray(input)
    {
        return JSON.parse(input);
    }    
    
    return {
        ConvertToString: ConvertToString,
        ConvertToArray: ConvertToArray
    };
    
})();